from sqlalchemy.orm import Session
from ..repositories import college_branch_repository

def get_college_branch(db:Session, college_branch_id:int):
    return college_branch_repository.get_collegeBranch(db, college_branch_id)

def get_branch_name(db:Session, branch_name:str):
    return college_branch_repository.search_college_branch(db, branch_name)

def create_college_branch(db:Session, college_branch):
    return college_branch_repository.create_branches(db, college_branch)

def update_college_branch(db:Session, college_branch_id:int, college_branch):
    db_collegeBranch = college_branch_repository.update_college_branch(db, college_branch_id, college_branch)
    if db_collegeBranch is None:
        return None

    update_data = college_branch.model_dump(exclude_unset=True)
    return college_branch_repository.update_college_branch(db, college_branch_id, college_branch)

def delete_college_branch(db:Session, college_branch_id:int):
    college_branch = college_branch_repository.get_collegeBranch(db, college_branch)
    if college_branch is None:
        return None, "branch not found"

    college_branch_repository.delete_college_branch(db, college_branch)
    return college_branch_id, None