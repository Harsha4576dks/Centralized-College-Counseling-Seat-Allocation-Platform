from sqlalchemy.orm import Session
from .. import models
from ..repositories import counselling_round_repository

def execute_counselling_algorithm(db: Session):
    db.query(models.SeatAllocation).delete()
    db.commit()

    students = db.query(models.Student).all()
    if not students:
        return None, "no students found"

    sorted_ranks = sorted([s.rank for s in students if s.rank is not None])
    branches = db.query(models.CollegeBranches).all()
    inventory = {branch.id: branch.available_seats for branch in branches}

    created_allocations = []

    for rank in sorted_ranks:
        student = counselling_round_repository.get_student_rank(db, rank)
        if not student:
            continue

        student_preferences = db.query(models.StudentPreferences).filter(models.StudentPreferences.student_id == student.id).all()
        sorted_pref_orders = sorted([p.preference_order for p in student_preferences if p.preference_order is not None])
    
        for pref_order in sorted_pref_orders:
            prefs_list = counselling_round_repository.get_student_preference(db, pref_order)
            target_pref = next((p for p in prefs_list if p.student_id == student.id), None)
            if not target_pref:
                continue

            target_branch_id = target_pref.college_branch_id
            seats_left = inventory.get(target_branch_id, 0)

            if seats_left > 0:
                inventory[target_branch_id] -= 1

                allocation = models.SeatAllocation( student_id=student.id, college_branch_id=target_branch_id, counselling_round_id=1,
                                                                       status="successful", allocated_at="Allocation Processed")
                
                db.add(allocation)
                db.flush()
                db.refresh(allocation)
                
                created_allocations.append({
                    "id": allocation.id,
                    "student_id": student.id,
                    "college_branch_id": target_branch_id
                })
                break

    if created_allocations:
        for branch in branches:
            branch.available_seats = inventory[branch.id]
        db.commit()

    return created_allocations, None