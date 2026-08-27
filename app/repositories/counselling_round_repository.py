from sqlalchemy.orm import Session
from ..import models

def create_counselling(db:Session, counselling_round):
    db_counselling = models.CounsellingRound(round_number=counselling_round.round_number, status=counselling_round.status, 
                                             start_date=counselling_round.start_date, end_date=counselling_round.end_date)

    db.add(db_counselling)
    db.commit()
    db.refresh(db_counselling)
    return db_counselling

def get_counselling(db:Session, counselling_round_id:int):
    return db.query(models.CounsellingRound).filter(models.CounsellingRound.id == counselling_round_id).first()

def search_counselling_round(db:Session, round_number:str):
    return db.query(models.CounsellingRound).filter(models.CounsellingRound.round_number == round_number).first()

def delete_counselling(db:Session, counselling):
    db.delete(counselling)
    db.commit()
    return {"message":"counselling deleted successfully", "deleted_counselling":counselling}
