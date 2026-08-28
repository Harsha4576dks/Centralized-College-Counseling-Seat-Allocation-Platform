from sqlalchemy.orm import Session
from ..import models

def create_branches(db:Session, college_branch):
    db_collegeBranch = models.CollegeBranches(college_id = college_branch.college_id, branch_name=college_branch.branch_name, 
                                              total_seats=college_branch.total_seats, available_seats=college_branch.available_seats)

    db.add(db_collegeBranch)
    db.commit()
    db.refresh(db_collegeBranch)
    return db_collegeBranch

def get_collegeBranch(db:Session, college_branch_id:int):
    return db.query(models.CollegeBranches).filter(models.CollegeBranches.id == college_branch_id).first()

def search_college_branch(db:Session, college_branch_name:str):
    return db.query(models.CollegeBranches).filter(models.CollegeBranches.branch_name == college_branch_name).first()

def update_college_branch(db: Session, college_branch_id: int, update_data):

    db_collegeBranch = db.query(models.CollegeBranches).filter(models.CollegeBranches.id == college_branch_id).first()

    if db_collegeBranch is None:
        return None

    for key, value in update_data.model_dump(exclude_unset=True).items():
        setattr(db_collegeBranch, key, value)

    db.commit()
    db.refresh(db_collegeBranch)

    return db_collegeBranch
def delete_college_branch(db:Session, college_branch):
    db.delete(college_branch)
    db.commit()
    return {"message":"branches deleted successfully", "deleted_branches":college_branch}

def get_college(db:Session, college_id:int):
    return db.query(models.College).filter(models.College.id == college_id).first()

def get_student_preferences(db:Session, student_preferences_id:int):
    return db.query(models.StudentPreferences).filter(models.StudentPreferences.college_branch_id == student_preferences_id).first()

def get_seat_allocation(db:Session, seat_allocation_id:int):
    return db.query(models.SeatAllocation).filter(models.SeatAllocation.college_branch_id == seat_allocation_id).first()