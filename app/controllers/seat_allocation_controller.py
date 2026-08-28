from fastapi import APIRouter, HTTPException

from ..database import db_dependency
from ..schemas.seat_allocation_schemas import Seat_AllocationBase
from ..services import seat_allocation_services


router = APIRouter(
    prefix="/seat_allocation",
    tags=["Seats_Allocated"]
)


@router.get("/search")
async def search_seat_allocation( db: db_dependency, student_id: int):
    result = seat_allocation_services.search_seat_allocation_by_student( db, student_id)
    if result is None:
        raise HTTPException(status_code=404, detail="seat allocation details not found")
    return result


@router.get("/{seat_allocation_id}")
async def get_seat_allocation( db: db_dependency, seat_allocation_id: int):
    result = seat_allocation_services.get_seat_allocation(db,seat_allocation_id)
    if result is None:
        raise HTTPException(status_code=404, detail="seat allocation details not found")
    return result


@router.post("/")
async def create_seat_allocation(db: db_dependency, seats: Seat_AllocationBase):
    result, error = seat_allocation_services.create_seats(db, seats)
    if error == "student not found":
        raise HTTPException(status_code=404, detail="student details not found" )

    if error == "branch doesn't exist":
        raise HTTPException(status_code=404, detail="branch not found" )
    
    if error == "counselling details not found":
        raise HTTPException(status_code=404, detail="counselling details not found" )

    return result
        

@router.delete("/{seat_allocation_id}")
async def delete_seat_allocation(db: db_dependency, seat_allocation_id: int):
    result, error = seat_allocation_services.delete_seat_allocation( db, seat_allocation_id)
    if error == "no seats found on this id":
        raise HTTPException(status_code=404, detail="seat allocation details not found" )

    return {"message": "seat allocation details deleted successfully", "deleted_details": result}