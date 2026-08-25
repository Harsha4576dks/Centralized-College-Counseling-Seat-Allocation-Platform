from sqlalchemy import Integer, String, Column
from sqlalchemy.orm import relationship
from ..database import Base

class College(Base):
    __tablename__ = "college"

    id = Column(Integer, primary_key=True, index=True)
    college_name = Column(String, index=True)
    college_address = Column(String, index=True)
    code = Column(Integer, index=True)
    email = Column(String, index=True)
    affiliation = Column(String, index=True)
    college_branches = relationship("CollegeBranches", back_populates="college")