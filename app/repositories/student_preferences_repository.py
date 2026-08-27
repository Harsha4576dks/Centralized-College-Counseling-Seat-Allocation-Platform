from sqlalchemy.orm import Session
from ..import models

def create_studentpreferences(db:Session, studentprefernces):
    db_studentpreferences = models.StudentPreferences(student_id=studentprefernces.student_id, college_branch_id=studentprefernces.college_branch_id, preference_order=studentprefernces.preference_order)

    db.add(db_studentpreferences)
    db.commit()
    db.refresh(db_studentpreferences)
    return db_studentpreferences

def get_studentpreferences(db:Session, student_preferences_id:int):
    return db.query(models.StudentPreferences).filter(models.StudentPreferences.id == student_preferences_id).first()

def update_studentpreferences(db:Session, student_preferences_id:int, update_data):
    db_studentpreferences = db.query(models.StudentPreferences).filter(models.StudentPreferences.id == student_preferences_id).first()
    if db_studentpreferences is None:
        return None

    for key, value in update_data.model_dump(exclude_unset=True).items():
        setattr(db_studentpreferences, key, value)

        db.commit()
        db.refresh(db_studentpreferences)
        return db_studentpreferences

def delete_studentpreferences(db:Session, studentpreferences):
    db.delete(studentpreferences)
    db.commit()
    return {"message":"preferences deleted successfully", "deleted_preferences":studentpreferences}