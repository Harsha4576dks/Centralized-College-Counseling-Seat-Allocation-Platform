from sqlalchemy.orm import Session
from ..repositories import counselling_round_repository

def get_counselling(db:Session, counselling_round_id:int):
    return counselling_round_repository.get_counselling(db, counselling_round_id)

def search_counselling_round(db:Session, round_number:int):
    return counselling_round_repository.search_counselling_round(db, round_number)

def create_counselling(db:Session, counselling):
    if counselling.end_date <= counselling.start_date:
        return None, "end date must be greater than start date"
    
    return counselling_round_repository.create_counselling(db, counselling), None

def delete_counselling(db:Session, counselling_round_id:int):
    counselling = counselling_round_repository.get_counselling(db, counselling_round_id)
    if counselling is None:
        return None, "counselling details deleted successfully"

    seat_allocation = counselling_round_repository.get_seat_allocation(db, counselling_round_id)
    if seat_allocation is not None:
        return None, "seats not found"

    counselling_round_repository.delete_counselling(db, counselling)
    return counselling_round_id, None
