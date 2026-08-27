from pydantic import BaseModel
from typing import List

class Seat_AllocationBase(BaseModel):
    student_id:int
    college_branch_id:int
    counselling_round_id:int
    status:str
    allocated_at:str
    