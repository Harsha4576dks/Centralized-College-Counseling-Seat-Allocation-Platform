from sqlalchemy import Integer, String, Column
from sqlalchemy.orm import relationship
from ..database import Base

class Student(Base):
    __tablename__ = "student"

    id  = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    roll_number = Column(Integer, index=True)
    email = Column(String, index=True)
    phone = Column(Integer, index=True)
    rank = Column(Integer, index=True)
    seat_allocation = relationship("SeatAllocation", back_populates="student")
    student_preferences = relationship("StudentPreferences", back_populates="student")