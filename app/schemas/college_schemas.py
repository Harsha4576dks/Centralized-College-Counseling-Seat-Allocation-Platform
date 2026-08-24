from pydantic import BaseModel
from typing import List

class CollegeBase(BaseModel):
    college_name:str
    college_address:str
    code:int
    email:str
    affiliation:str
    