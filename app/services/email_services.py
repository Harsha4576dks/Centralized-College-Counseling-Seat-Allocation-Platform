import  io
import os
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.application  import MIMEApplication
import matplotlib.pyplot as plt
import matplotlib
matplotlib.use('Agg')

from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List,  Any
from dotenv import load_dotenv

from ..repositories import email_repository
from ..models.student import Student
from ..models.student_preferences import StudentPreferences
from ..models.seat_allocation import SeatAllocation
from ..models.college_branch import CollegeBranches
from ..models.college import College

load_dotenv()

def get_allotted_students_data(db:Session, counselling_round_id:int) -> List[dict[str, Any]]:
    results = (
        db.query(
            Student.name.label("student_name"),
            Student.email.label("student_email"),
            Student.roll_number,
            Student.phone,
            Student.rank,
            College.college_name,
            CollegeBranches.branch_name
        )
        .join(SeatAllocation, SeatAllocation.student_id == Student.id)
        .join(CollegeBranches, SeatAllocation.college_branch_id == CollegeBranches.id)
        .join(College, CollegeBranches.college_id == College.id)
        .filter(SeatAllocation.counselling_round_id== counselling_round_id)
        .filter(func.upper(SeatAllocation.status) == "SUCCESSFUL")
        .all()
    )

    allocation_list = []
    for row in results:
        student_data = {
           "student_name": row.student_name,
            "student_email": row.student_email,
            "roll_number": row.roll_number,
            "phone": row.phone,
            "rank": row.rank,
            "college_name": row.college_name,
            "branch_name": row.branch_name, 
        }
        allocation_list.append(student_data)

    return allocation_list


def generate_admission_pdf_matplotlib(student_data: dict) -> bytes:

    fig, ax = plt.subplots(figsize=(8.5, 11))
    ax.axis("off")

    ax.text(0.5, 0.93, "CET ADMISSION & COUNSELLLING CELL", fontsize=18, fontweight="bold", ha="center")
    ax.text(0.5, 0.89, "PROVISIONAL SEAT ALLOTMENT LETTER", fontsize=14, fontweight="bold", color="#1a365d", ha="center")

    rect = plt.Rectangle((0.05, 0.05), 0.9, 0.9, fill=False, edgecolor="#1a365d", linewidth=2, transform=ax.transAxes)
    ax.add_patch(rect)

    table_data = [
        ["Candidate Name", str(student_data["student_name"])],
        ["CET ROll Number", str(student_data["roll_number"])],
        ["CET Rank", str(student_data["rank"])],
        ["Contact Phone", str(student_data["phone"])],
        ["Alloted College", str(student_data["college_name"])],
        ["Alloted Branch", str(student_data["branch_name"])],
        ["Allotment status", "PROVISIONALLY CONFIRMED"]
    ]

    table = ax.table(
        cellText=table_data,
        colWidths=[0.35, 0.55],
        loc="center",
        cellLoc="left",
        bbox=[0.08, 0.45, 0.84, 0.38]
    )
    table.auto_set_font_size(False)
    table.set_fontsize(11)

    for key, cell in table.get_celld().items():
        cell.set_height(0.88)
        if key[1] == 0:
            cell.set_facecolor("#f1f5f9")
            cell.get_text().set_fontweight("bold")

    instructions = (
        "IMPORTANT INSTRUCTIONS FFOR CANDIDATES:\n"
        "1. Report to the allotted institution within the specified deadline.\n"
        "2. Carry this allotment letter along with original verification documents.\n"
        "3. Complete the requisite admission fee payment at the allotted college counter."
    )
    ax.text(0.08, 0.25, instructions, fontsize=10, bbox=dict(boxstyle="round,pad=0.5", facecolor="#fffbe0", edgecolor="#d97706"))

    pdf_buffer = io.BytesIO()
    plt.savefig(pdf_buffer, format="pdf", bbox_inches="tight", dpi=300)
    plt.close(fig)

    pdf_buffer.seek(0)
    return pdf_buffer.getvalue()


def send_bulk_allocation_emails(allocations: List[dict[str, Any]], smtp_username: str, smtp_password: str):
  
    try:
        with smtplib.SMTP("smtp.gmail.com", 587) as server:
            server.starttls()
            server.login(smtp_username, smtp_password)

            for student_data in allocations:
                email = student_data.get("student_email")
                student_name = student_data.get("student_name", "Candidate")
                roll_number = student_data.get("roll_number", "N/A")

                if not email or not isinstance(email, str) or "@" not in email.strip():
                    print(f"[SKIP] Student '{student_name}' (Roll: {roll_number}) has no valid email address.")
                    continue

                try:
                    pdf_bytes = generate_admission_pdf_matplotlib(student_data)

                    msg = MIMEMultipart()
                    msg['From'] = f"CET Counseling Cell <{smtp_username}>"
                    msg['To'] = email.strip()
                    msg['Subject'] = f"CET Seat Allotment Letter - {student_data['college_name']}"

                    body = (
                        f"Dear {student_name},\n\n"
                        f"Congratulations! Based on your rank ({student_data['rank']}), you have been "
                        f"provisionally allotted a seat at {student_data['college_name']} "
                        f"for {student_data['branch_name']}.\n\n"
                        f"Your official allotment letter is attached directly to this email.\n\n"
                        f"Regards,\nCET Admissions Team"
                    )
                    msg.attach(MIMEText(body, 'plain'))

                    pdf_attachment = MIMEApplication(pdf_bytes, _subtype="pdf")
                    pdf_attachment.add_header(
                        'Content-Disposition', 
                        'attachment', 
                        filename=f"Allotment_Letter_{roll_number}.pdf"
                    )
                    msg.attach(pdf_attachment)

                    server.send_message(msg)
                    print(f"[SUCCESS] Allotment letter sent to {email} ({student_name})")

                except smtplib.SMTPRecipientsRefused:
                    print(f"[SKIP] Recipient address refused by server for {student_name} ({email}). Skipping...")
                except Exception as student_err:
                    print(f"[ERROR] Failed to dispatch email for {student_name} ({email}): {str(student_err)}")

    except Exception as server_err:
        print(f"[CRITICAL ERROR] Failed to initialize SMTP connection: {str(server_err)}")


def execute_counseling_pipeline_service(db: Session, round_id: int):
   
    try:
        smtp_username = os.getenv("SMTP_USERNAME")
        smtp_password = os.getenv("SMTP_PASSWORD")

        if not smtp_username or not smtp_password:
            raise ValueError("SMTP credentials missing from .env environment configuration.")

        allocations = get_allotted_students_data(db=db, counselling_round_id=round_id)

        if not allocations:
            print(f"No allocated students found for Round {round_id}.")
            return

        send_bulk_allocation_emails(
            allocations=allocations,
            smtp_username=smtp_username,
            smtp_password=smtp_password
        )

        print(f"Successfully processed and emailed {len(allocations)} candidates for Round {round_id}.")

    except Exception as e:
        print(f"Error inside counseling service execution: {str(e)}")