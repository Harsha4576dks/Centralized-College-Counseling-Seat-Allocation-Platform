from sqlalchemy import Integer, String, Column, ForeignKey
from sqlalchemy.orm import relationship
from ..database import Base

class CollegeBranches(Base):
    __tablename__ = "college_branches"

    id  = Column(Integer, primary_key=True, index=True)
    college_id = Column(Integer, ForeignKey("college.id"))
    branch_name = Column(String, index=True)
    total_seats = Column(Integer, index=True)
    available_seats = Column(Integer, index=True)
    seat_allocation = relationship("SeatAllocation", back_populates="college_branch")
    student_preferences = relationship("StudentPreferences", back_populates="college_branch")
    college = relationship("College", back_populates="college_branches")