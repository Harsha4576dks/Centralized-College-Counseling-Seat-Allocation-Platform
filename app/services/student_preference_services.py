from sqlalchemy.orm import Session
from ..repositories import student_preferences_repository

def get_studentpreferences(db:Session, student_preferences_id:int):
    return student_preferences_repository.get_studentpreferences(db, student_preferences_id)

def create_studentpreferences(db:Session, studentpreferences):
    return student_preferences_repository.create_studentpreferences(db, studentpreferences)

def update_studentpreferences(db:Session, student_preferences_id, studentpreferences):
    db_studentpreferences = student_preferences_repository.update_studentpreferences(db, student_preferences_id, studentpreferences)
    if db_studentpreferences is None:
        return None

    update_data = studentpreferences.model_dump(exclude_unset=True)
    return student_preferences_repository.update_studentpreferences(db, student_preferences_id, studentpreferences)

def delete_studentpreferences(db:Session, student_preferences_id:int):
    studentpreferences = student_preferences_repository.get_studentpreferences(db, student_preferences_id)
    if studentpreferences is None:
        return None, "preferences does not exist"

    student_preferences_repository.delete_studentpreferences(db, studentpreferences)
    return student_preferences_id, None