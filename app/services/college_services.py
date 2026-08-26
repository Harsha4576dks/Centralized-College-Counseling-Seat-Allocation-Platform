from sqlalchemy.orm import Session
from ..repositories import college_repository

def get_college(db:Session, college_id:int):
    return college_repository.get_college(db, college_id)

def get_college_name(db:Session, college_name:str):
    return college_repository.search_college_name(db, college_name)

def create_college(db:Session, college):
    return college_repository.create_college(db, college)

def delete_college(db:Session, college_id:int):
    college = college_repository.delete_college(db, college_id)
    if college is None:
        return None, "college not found"
    
    college_repository.delete_college(db, college)
    return college_id, None