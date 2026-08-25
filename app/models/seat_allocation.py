from sqlalchemy import String, Integer, Column, ForeignKey
from sqlalchemy.orm import relationship
from ..database import Base

class SeatAllocation(Base):
    __tablename__ = "seat_allocation"

    id  = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("student.id"))
    college_branch_id = Column(Integer, ForeignKey("college_branches.id"))
    counselling_round_id = Column(Integer, ForeignKey("counselling_round.id"))
    status = Column(String, index=True)
    allocated_at = Column(String, index=True)
    student = relationship("Student", back_populates="seat_allocation")
    college_branch = relationship("CollegeBranches", back_populates="seat_allocation")
    counselling_round = relationship("CounsellingRound", back_populates="seat_allocation")