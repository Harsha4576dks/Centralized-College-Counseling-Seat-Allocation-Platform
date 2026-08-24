from pydantic import BaseModel
from typing import List

class Student_PreferencesBase(BaseModel):
    student_id:int
    college_branch_id:int
    preference_order:int

    