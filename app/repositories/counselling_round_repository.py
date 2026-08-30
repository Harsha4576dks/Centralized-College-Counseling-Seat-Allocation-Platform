from sqlalchemy.orm import Session
from ..import models

def get_college_id(db:Session, college_id:int):
    return db.query(models.College).filter(models.College.id == college_id).all()

def get_college_branch(db:Session, college_branch_id:int):
    return db.query(models.CollegeBranches).filter(models.CollegeBranches.id == college_branch_id).first()

def get_available_seats_in_college(db:Session, available_seats):
    return db.query(models.CollegeBranches).filter(models.CollegeBranches.available_seats == available_seats).all()

def get_student_id(db:Session, student_id:int):
    return db.query(models.Student).filter(models.Student.id == student_id).all()

def get_student_rank(db:Session, student_rank):
    return db.query(models.Student).filter(models.Student.rank == student_rank).first()

def get_student_preference(db:Session, student_preference_order):
    return db.query(models.StudentPreferences).filter(models.StudentPreferences.preference_order == student_preference_order).all()