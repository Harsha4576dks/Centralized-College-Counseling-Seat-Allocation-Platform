from sqlalchemy import Integer, String, Column, ForeignKey
from sqlalchemy.orm import relationship
from ..database import Base

class StudentPreferences(Base):
    __tablename__ = "StudentPreferences"

    id  = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("student.id"))
    college_id=Column(Integer, ForeignKey("college.id"))
    college_branch_id = Column(Integer, ForeignKey("college_branches.id"))
    preference_order = Column(Integer, index=True)
    college_branch = relationship("CollegeBranches", back_populates="student_preferences")
    student = relationship("Student", back_populates="student_preferences")
    college = relationship("College", back_populates="student_preferences")