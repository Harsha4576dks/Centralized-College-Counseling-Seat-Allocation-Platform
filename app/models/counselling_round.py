from sqlalchemy import String, Integer, Column, Date
from sqlalchemy.orm import relationship
from ..database import Base

class CounsellingRound(Base):
    __tablename__ = "counselling_round"

    id = Column(Integer, primary_key=True, index=True)
    round_number = Column(Integer, index=True)
    status = Column(String, index=True)
    start_date = Column(Date, index=True)
    end_date = Column(Date, index=True)
    seat_allocation = relationship("SeatAllocation", back_populates="counselling_round")