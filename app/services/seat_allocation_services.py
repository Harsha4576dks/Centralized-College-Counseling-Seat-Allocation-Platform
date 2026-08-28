from sqlalchemy.orm import Session
from ..repositories import seat_allocation_repository


def get_seat_allocation(db:Session, seat_allocation_id: int):
    return seat_allocation_repository.get_seat_allocation(db, seat_allocation_id)


def search_seat_allocation_by_student(db:Session, student_id: int):
    return seat_allocation_repository.search_seat_allocation_by_student( db, student_id)


def create_seats(db:Session, seats):
    db_student = seat_allocation_repository.get_student(db, seats.student_id)
    if db_student is None:
        return None, "student not found"

    db_college_branch = seat_allocation_repository.get_college_branch(db, seats.college_branch_id)
    if db_college_branch is None:
        return None, "branch doesn't exist"

    db_counselling = seat_allocation_repository.get_counselling_details(db, seats.counselling_round_id)
    if db_counselling is None:
        return None, "counselling details not found"
    
    return seat_allocation_repository.create_seats(db, seats),None


def delete_seat_allocation(db:Session, seat_allocation_id: int):
    seat_allocation = seat_allocation_repository.get_seat_allocation(db, seat_allocation_id)
    if seat_allocation is None:
        return None, "no seats found on this id"

    seat_allocation_repository.delete_seat_allocation( db, seat_allocation )
    return seat_allocation, None