from pydantic import BaseModel, EmailStr
from typing import List

class CollegeBase(BaseModel):
    college_name:str
    college_address:str
    code:int
    email:EmailStr
    affiliation:str
    