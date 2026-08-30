from pydantic import BaseModel, field_validator, model_validator
from typing import Optional

class StudentResponse(BaseModel):
    id: int
    name: str
    rank: int
    class Config:
        from_attributes = True

class CollegeResponse(BaseModel):
    id: int
    code: int
    college_name: str
    location: Optional[str] = None
    class Config:
        from_attributes = True

class SeatAllocationResponse(BaseModel):
    id: int
    counselling_round_id: int
    status: str = "successful"
    allocated_at: Optional[str] = None
    
    student: Optional[StudentResponse] = None
    college: Optional[CollegeResponse] = None  # Added college field

    class Config:
        from_attributes = True

    @field_validator('status', mode='before')
    def set_status(cls, v):
        return "successful"

    @model_validator(mode='before')
    def extract_allocation_details(cls, values):
        # Handle branch and college extraction
        if hasattr(values, "college_branch") and values.college_branch:
            branch = values.college_branch
            
            # Extract branch name into allocated_at
            if hasattr(branch, "branch_name"):
                values.allocated_at = branch.branch_name
                
            # Extract parent college object
            if hasattr(branch, "college") and branch.college:
                values.college = branch.college
                
        return values