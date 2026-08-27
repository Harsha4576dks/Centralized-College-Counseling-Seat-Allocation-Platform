from sqlalchemy.orm import Session
from ..repositories import counselling_round_repository

def get_counselling(db:Session, counselling_round_id:int):
    return counselling_round_repository.get_counselling(db, counselling_round_id)

def search_counselling_round(db:Session, round_number:int):
    return counselling_round_repository.search_counselling_round(db, round_number)

def create_counselling(db:Session, counselling):
    return counselling_round_repository.create_counselling(db, counselling)

def delete_counselling(db:Session, counselling_round_id:int):
    counselling = counselling_round_repository.delete_counselling(db, counselling_round_id)
    if counselling is None:
        return None, "counselling details deleted successfully"

    counselling_round_repository.delete_counselling(db, counselling)
    return counselling_round_id, None
