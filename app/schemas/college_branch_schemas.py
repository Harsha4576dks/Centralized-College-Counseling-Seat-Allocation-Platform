from pydantic import BaseModel
from typing import List

class College_BranchBase(BaseModel):
    college_id:int
    branch_name:str
    total_seats:int
    available_seats:int
    