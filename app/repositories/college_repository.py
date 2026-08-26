from sqlalchemy.orm import Session
from ..import models

def create_college(db:Session, college):
    db_college = models.College(college_name = college.college_name, college_address = college.college_address,
                                 code=college.code, email=college.email, affiliation=college.affiliation)
    db.add(db_college)
    db.commit()
    db.refresh(db_college)
    return db_college

def get_college(db:Session, college_id:int):
    return db.query(models.College).filter(models.College.id == college_id).first()

def delete_college(db:Session, college):
    db.delete(college)
    db.commit()
    return {"message":"college deleted successfully", "deleted_college":college}

def search_college_name(db:Session, college_name:str):
    return db.query(models.College).filter(models.College.college_name == college_name).first()