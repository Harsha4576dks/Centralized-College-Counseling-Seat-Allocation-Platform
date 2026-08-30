from sqlalchemy.orm import Session
from .. import models


def create_seats(db: Session, seats):
    db_seats = models.SeatAllocation(student_id=seats.student_id, college_branch_id=seats.college_branch_id,
                                             counselling_round_id=seats.counselling_round_id, status=seats.status,
                                                             allocated_at=seats.allocated_at)

    db.add(db_seats)
    db.commit()
    db.refresh(db_seats)
    return db_seats

def get_seat_allocation(db: Session, seat_allocation_id: int):
    return db.query(models.SeatAllocation).filter(models.SeatAllocation.id == seat_allocation_id).first()
    

def search_seat_allocation_by_student(db: Session, student_id: int):
    return db.query(models.SeatAllocation).filter(models.SeatAllocation.student_id == student_id).first()


def delete_seat_allocation(db: Session, seat_allocation):
    db.delete(seat_allocation)
    db.commit()

    return {"message": "seat allocation deleted successfully",  "deleted_seat_allocation": seat_allocation }


def get_student(db: Session, student_id: int):
    return db.query(models.Student).filter(models.Student.id == student_id).first()


def get_college_branch(db: Session, college_branch_id: int):
    return db.query(models.CollegeBranches).filter(models.CollegeBranches.id == college_branch_id).first()


def get_counselling_details(db: Session, counselling_round_id: int):
    return db.query(models.CounsellingRound).filter(models.CounsellingRound.id == counselling_round_id).first()



def bulk_create_seat_allocations(db: Session, new_allocations: list):
    db.bulk_save_objects(new_allocations)
    db.commit()
    return len(new_allocations)


def get_allocations_by_counselling_round(db: Session, counselling_round_id: int):
    return db.query(models.SeatAllocation).filter(models.SeatAllocation.counselling_round_id == counselling_round_id).all()


def delete_allocations_by_counselling_round(db: Session, counselling_round_id: int):
    allocations = get_allocations_by_counselling_round(db, counselling_round_id )
    for allocation in allocations:
        db.delete(allocation)
    db.commit()
    return len(allocations)