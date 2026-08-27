from fastapi import FastAPI

from .database import Base, engine
from .controllers.college_controller import router as college_router
from .controllers.college_branch_controller import router as college_branch_router
from .controllers.student_controller import router as student_router
from .controllers.student_preferences_controller import router as student_preferences_router
from .controllers.counselling_round_controller import router as counselling_round_router
from .controllers.seat_allocation_controller import router as seat_allocation_router

from .models import college
from .models import college_branch
from .models import student
from .models import student_preferences
from .models import counselling_round
from .models import seat_allocation

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.include_router(college_router)
app.include_router(college_branch_router)
app.include_router(student_router)
app.include_router(student_preferences_router)
app.include_router(counselling_round_router)
app.include_router(seat_allocation_router)