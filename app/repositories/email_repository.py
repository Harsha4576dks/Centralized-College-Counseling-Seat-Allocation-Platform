from typing import Optional,Tuple, List
from sqlalchemy.orm import Session
from ..models.student import Student
from ..models.student_preferences import StudentPreferences

def get_student_details(db:Session, student_id:int)  -> Optional[Tuple[str, str, int, int, int]]:
    stuent = db.query(Student).filter(Student.id == student_id).first()
    if not Student:
        return None

    name = Student.name
    email = Student.email
    roll_number  = Student.roll_number
    phone = Student.phone
    rank = Student.rank

    if None in (name, email, roll_number, phone, rank):
        return None

    return name, email, roll_number, phone, rank
    
def get_student_prefernces(db:Session, student_id:int) -> Optional[List[StudentPreferences]]:
        student_preferences = db.query(StudentPreferences).filter(StudentPreferences.student_id == student_id).order_by(StudentPreferences.preference_order.asc()).all()
        if not student_preferences:
            return None
        
        return student_preferences