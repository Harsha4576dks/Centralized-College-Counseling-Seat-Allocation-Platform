from pydantic import BaseModel
from typing import List
from datetime import date

class CounsellingBase(BaseModel):
    round_number:int
    status:str
    start_date:date
    end_date:date