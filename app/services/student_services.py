from sqlalchemy.orm import Session
from ..repositories import student_repository

def get_student(db:Session, student_id:int):
    return student_repository.get_student(db, student_id)

def get_student_name(db:Session, student_name:str):
    return student_repository.search_student(db, student_name)

def create_student(db:Session, student):
    return student_repository.create_student(db, student)

def update_student(db:Session, student_id, student):
    db_student = student_repository.update_student(db, student_id, student)
    if db_student is None:
        return None

    update_data = student.model_dump(exclude_unset=True)
    return student_repository.update_student(db, student_id, student)

def delete_student(db:Session, student_id:int):
    student = student_repository.get_student(db, student_id)
    if student is None:
        return None, "student not found"

    student_repository.delete_student(db, student)
    return student_id, None
