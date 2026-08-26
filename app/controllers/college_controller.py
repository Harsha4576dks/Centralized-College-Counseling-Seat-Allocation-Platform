from fastapi import APIRouter, HTTPException
from sqlalchemy.orm import Session

from ..database import db_dependency
from ..schemas.college_schemas import CollegeBase
from ..services import college_services

router = APIRouter(
    prefix="/colleges",
    tags=["Colleges_List"]
)

@router.get("/search")
async def get_college_name(db:db_dependency, college_name:str):
    result = college_services.get_college_name(db, college_name)
    if result is None:
        raise HTTPException(status_code=404, detail="college not found")
    return result

@router.get("/{college_id}")
async def get_college(db:db_dependency, college_id:int):
    result = college_services.get_college(db, college_id)
    if result is None:
        raise HTTPException(status_code=404, detial="college not found")
    return result


@router.post("/")
async def create_college(db:db_dependency, college:CollegeBase):
    return college_services.create_college(db, college)

@router.delete("/{college_id}")
async def delete_college(db:db_dependency, college_id:int):
    result, error = college_services.delete_college(db, college_id)
    if error == "college not found":
        raise HTTPException(status_code=400, detail="college not found")

    return {"messsage":"college deleted successfully", "deleted_college":result}