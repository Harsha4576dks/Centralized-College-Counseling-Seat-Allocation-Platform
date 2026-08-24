from pydantic import BaseModel
from typing import List, Optional

class Update_CollegeBranchBase(BaseModel):
    college_id:Optional[int]=None
    branch_code:Optional[int]=None
    branch_name:Optional[str]=None
    total_seats:Optional[int]=None
    available_seats:Optional[int]=None
    