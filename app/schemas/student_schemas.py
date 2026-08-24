from pydantic import BaseModel
from typing import List

class StudentBase(BaseModel):
    name:str
    roll_number:int
    email:str
    phone:int
    rank:int
    