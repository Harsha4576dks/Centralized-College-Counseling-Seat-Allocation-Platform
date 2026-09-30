from fastapi import FastAPI
import os
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

from .database import Base, engine

from .middleware.authorization import AuthorizationMiddleware

from .controllers.college_controller import router as college_router
from .controllers.college_branch_controller import router as college_branch_router
from .controllers.student_controller import router as student_router
from .controllers.student_preferences_controller import router as student_preferences_router
from .controllers.counselling_round_controller import router as counselling_round_router
from .controllers.seat_allocation_controller import router as seat_allocation_router
from .controllers.auth_controller import router as authentication_router
from .controllers.email_controller import router as email_router

from .models import college
from .models import college_branch
from .models import student
from .models import student_preferences
from .models import counselling_round
from .models import seat_allocation
from .models import user


app = FastAPI(
    title="CET Counseling & Allocation Engine",
    description="Backend service running Gale-Shapley seat allocation and automated PDF allotment email dispatch.",
    version="1.0.0"
)

Base.metadata.create_all(bind=engine)


app.add_middleware( AuthorizationMiddleware)
app.include_router(authentication_router)
app.include_router(college_router)
app.include_router(college_branch_router)
app.include_router(student_router)
app.include_router(student_preferences_router)
app.include_router(counselling_round_router)
app.include_router(seat_allocation_router)
app.include_router(email_router)

@app.get("/")
def read_root():
    return {
        "status": "online",
        "message": "CET Counseling API Service is active."
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)