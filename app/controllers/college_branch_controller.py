from fastapi import APIRouter, HTTPException
from sqlalchemy.orm import Session

from ..database import db_dependency
from ..schemas.college_branch_schemas import College_BranchBase
from ..schemas.update_collegebranch_schemas import Update_CollegeBranchBase
from ..services import college_branches_services

router = APIRouter(
    prefix="/branches",
    tags=["College_branches"]
)

@router.get("/search")
async def get_branch_name(db:db_dependency, branch_name:str):
    result = college_branches_services.get_branch_name(db, branch_name)
    if result is None:
        raise HTTPException(status_code=404, detail="branch not found")
    return result

@router.get("/{branch_id}")
async def get_college_branch(db:db_dependency, college_branch_id:int):
    result = college_branches_services.get_college_branch(db, college_branch_id)
    if result is None:
            raise HTTPException(status_code=404, detail="branch not found")
    return result

@router.post("/")
async def create_branch(db:db_dependency, college_branch:College_BranchBase):
     result, error = college_branches_services.create_college_branch(db, college_branch)
     if error == "college doesn't exist":
          raise HTTPException(status_code=404, detail="college not found")
     return result

@router.put("/{college_branch_id}")
async def update_college_branch(db:db_dependency, college_branch_id:int, college_branch:Update_CollegeBranchBase):
     result = college_branches_services.update_college_branch(db, college_branch_id, college_branch)
     if result is None:
          raise HTTPException(status_code=404, detail="branch not found")
     return result

@router.delete("/{college_branch_id}")
async def delete_branch(db:db_dependency, college_branch_id:int):
     result, error = college_branches_services.delete_college_branch(db, college_branch_id)
     if error == "branch not found":
          raise HTTPException(status_code=404, detail="branch not found")

     return {"message":"branch deleted successfully", "deleted_branch":result}
