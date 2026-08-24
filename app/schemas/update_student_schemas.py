from pydantic import BaseModel
from typing import List, Optional

class UpdateStudentBase(BaseModel):
    name:Optional[str]=None
    roll_number:Optional[int]=None
    email:Optional[str]=None
    phone:Optional[int]=None
    rank:Optional[int]=None
    