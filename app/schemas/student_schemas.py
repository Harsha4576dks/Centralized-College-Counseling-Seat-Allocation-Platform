from pydantic import BaseModel, EmailStr
from typing import List

class StudentBase(BaseModel):
    name:str
    roll_number:int
    email:EmailStr
    phone:int
    rank:int
    