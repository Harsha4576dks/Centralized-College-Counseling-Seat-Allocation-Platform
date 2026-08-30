from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session

from ..database import db_dependency
from ..services import seat_allocation_services
from ..schemas.seat_allocation_schemas import SeatAllocationResponse


router = APIRouter(
    prefix="/seat_allocations",
    tags=["seat allocation"]
)

@router.get("/{counselling_id}", response_model=SeatAllocationResponse)
async def get_seat_allocation(counselling_id: int, db: db_dependency):
    result = seat_allocation_services.get_seat_allocation_service(db, counselling_id)
    if result is None:
        raise HTTPException(status_code=404, detail="seat allocation details not found")
    return result



@router.get("/search/student/{student_id}", response_model=SeatAllocationResponse)
async def search_allocation_by_student(student_id: int, db: db_dependency):
    allocation, error = seat_allocation_services.search_seat_allocation_by_student_service(db, student_id)
    
    if error == "student not found":
        raise HTTPException(status_code=404, detail="Student not found")
    if error == "seat allocation details not found":
        raise HTTPException(status_code=404, detail="Seat allocation details not found for this student")
        
    return allocation


@router.delete("/{seat_allocation_id}")
async def delete_seat_allocation(seat_allocation_id: int, db: db_dependency):
    result, error = seat_allocation_services.delete_seat_allocation_service(db, seat_allocation_id)
    
    if error == "seat allocation not found":
        raise HTTPException(status_code=404, detail="Seat allocation not found")
        
    return {
        "status": "Success",
        "message": f"Seat allocation with ID {seat_allocation_id} successfully deleted."
    }