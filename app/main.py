from fastapi import FastAPI

from .database import Base, engine
from .controllers.college_controller import router as college_router
from .controllers.college_branch_controller import router as college_branch_router
from .controllers.student_controller import router as student_router

from .models import college
from .models import college_branch
from .models import student

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.include_router(college_router)
app.include_router(college_branch_router)
app.include_router(student_router)