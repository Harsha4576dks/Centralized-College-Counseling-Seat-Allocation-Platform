from sqlalchemy.orm import Session
from ..import models

def create_student(db:Session, student):
    db_student = models.Student(name=student.name, roll_number=student.roll_number, email=student.email,
                                phone=student.phone, rank=student.rank)

    db.add(db_student)
    db.commit()
    db.refresh(db_student)
    return db_student

def get_student(db:Session, student_id:int):
    return db.query(models.Student).filter(models.Student.id == student_id).first()

def search_student(db:Session, student_name:str):
    return db.query(models.Student).filter(models.Student.name == student_name).first()

def update_student(db: Session, student_id: int, update_data):
    db_student = db.query(models.Student).filter( models.Student.id == student_id).first()
    if db_student is None:
        return None

    for key, value in update_data.model_dump(exclude_unset=True).items():
        setattr(db_student, key, value)

    db.commit()
    db.refresh(db_student)

    return db_student
def delete_student(db:Session, student):
    db.delete(student)
    db.commit()
    return {"message":"students deleted successfully", "deleted_student":student}
