from fastapi import APIRouter, HTTPException
from sqlalchemy.orm import Session

from ..database import db_dependency
from ..schemas.student_preferences_schemas import Student_PreferencesBase
from ..schemas.update_student_preferences_schemas import Update_studentpreferencesBase
from ..services import student_preference_services

router = APIRouter(
    prefix="/course_preferences",
    tags=["Student_preferences"]
)

@router.get("/{student_preferences_id}")
async def get_student_preferences(db:db_dependency, student_preferences_id:int):
    result  = student_preference_services.get_studentpreferences(db, student_preferences_id)
    if result is None:
                raise HTTPException(status_code=404, detail="choices not found")
    return result

@router.post("/")
async def create_studentpreferences(db:db_dependency, studentpreferences:Student_PreferencesBase):
        return student_preference_services.create_studentpreferences(db, studentpreferences)

@router.put("/{student_preferences_id}")
async def update_studentpreferences(db:db_dependency, student_preferences_id:int, studentpreferences:Update_studentpreferencesBase):
        result = student_preference_services.update_studentpreferences(db, student_preferences_id, studentpreferences)
        if result is None:
                    raise HTTPException(status_code=404, detail="preferences not found")
        return result

@router.delete("/{student_preferences_id}")
async def delete_studentpreferences(db:db_dependency, student_preferences_id:int):
        result, error = student_preference_services.delete_studentpreferences(db, student_preferences_id)
        if error == "preferences does not exist":
                raise HTTPException(status_code=404, detail="student not found")
        return {"message":"preferences deleted successfully", "deleted_preference":result}
                