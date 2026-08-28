from fastapi import APIRouter, HTTPException
from sqlalchemy.orm import Session

from ..database import db_dependency
from ..schemas.student_schemas import StudentBase
from ..schemas.update_student_schemas import UpdateStudentBase
from ..services import student_services

router = APIRouter(
    prefix="/students",
    tags=["Students"]
)

@router.get("/search")
async def get_student(db:db_dependency, student_name:str):
    result = student_services.get_student_name(db, student_name)
    if result is None:
            raise HTTPException(status_code=404, detail="student not found")
    return result

@router.get("/{student_id}")    
async def get_student(db:db_dependency, student_id:int):
      result = student_services.get_student(db, student_id)
      if result is None:
              raise HTTPException(status_code=404, detail="student not found")
      return result

@router.post("/")
async def create_student(db:db_dependency, student:StudentBase):
       return student_services.create_student(db, student)

@router.put("/{student_id}")
async def update_student(db:db_dependency, student_id:int, student:UpdateStudentBase):
       result = student_services.update_student(db, student_id, student)
       if result is None:
               raise HTTPException(status_code=404, detail="student not found")
       return result

@router.delete("/{student_id}")
async def delete_student(db:db_dependency, student_id:int):
       result, error = student_services.delete_student(db, student_id)
       if error == "student not found":
            raise HTTPException(status_code=404, detail="student not found")

       if error == "delete preferences first":
              raise HTTPException(status_code=404, detail="delete preferences made by this student first")

       if error == "delete allocated seats first ":
              raise HTTPException(status_code=404, detail="cancel the seats allocated to this student first")
              
              
       return {"message":"student deleted successfully", "deleted_student":result}
