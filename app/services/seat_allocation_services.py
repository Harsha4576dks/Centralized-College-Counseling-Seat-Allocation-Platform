from sqlalchemy.orm import Session
from ..repositories import seat_allocation_repository

def get_seat_allocation_service(db: Session, seat_allocation_id: int):
    return seat_allocation_repository.get_seat_allocation(db, seat_allocation_id)

def search_seat_allocation_by_student_service(db: Session, student_id: int):
    student = seat_allocation_repository.get_student(db, student_id)
    if not student:
        return None, "student not found"
        
    allocation = seat_allocation_repository.search_seat_allocation_by_student(db, student_id)
    if not allocation:
        return None, "seat allocation details not found"
        
    return allocation, None

def delete_seat_allocation_service(db: Session, seat_allocation_id: int):
    allocation = seat_allocation_repository.get_seat_allocation(db, seat_allocation_id)
    if not allocation:
        return None, "seat allocation not found"
        
    result = seat_allocation_repository.delete_seat_allocation(db, allocation)
    return result, None