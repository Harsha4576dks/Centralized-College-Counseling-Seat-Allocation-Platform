from fastapi import APIRouter

from ..database import db_dependency
from ..schemas.auth_schemas import RegisterUser, UserResponse
from ..services import auth_services


router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


@router.post("/register", response_model=UserResponse)
def register(user: RegisterUser, db: db_dependency):

    new_user, error = auth_services.register_user(db, user)

    if error:
        return {
            "error": error
        }

    return new_user