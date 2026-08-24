from pydantic import BaseModel
from typing import List, Optional

class Update_studentpreferencesBase(BaseModel):
    student_id:Optional[int]=None
    college_id:Optional[int]=None
    preference_order:Optional[int]=None