from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session

from ..database import db_dependency
from ..services import counselling_round_services

router = APIRouter(
    prefix="/counselling_details",
    tags=["counselling"]
)

@router.post("/execute")
async def execute_counselling_round(db: db_dependency):
    allocations, error = counselling_round_services.execute_counselling_algorithm(db)

    if error == "no students found":
        raise HTTPException(status_code=404, detail="No students found to process allotment")

    return {"status": "Success",  "message": f"Counselling round executed successfully. Total {len(allocations)} seats allocated.",
             "allocations": allocations }