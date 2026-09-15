from fastapi import APIRouter, HTTPException, Request, Depends
from fastapi.security import HTTPAuthorizationCredentials

from ..database import db_dependency
from ..schemas.auth_schemas import RegisterUser, LoginUser, UserResponse
from ..services import auth_services
from ..security import security

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


@router.post("/register", response_model=UserResponse)
def register(user: RegisterUser, db: db_dependency):

    new_user, error = auth_services.register_user( db, user)
    if error:
        raise HTTPException( status_code=400, detail=error)
    return new_user


@router.post("/login")
def login( user: LoginUser, db: db_dependency):
    token, error = auth_services.login_user( db,  user.username, user.password)

    if error:
        raise HTTPException( status_code=401, detail=error )

    return {"access_token": token, "token_type": "bearer" }

@router.get("/user", response_model=UserResponse)
def get_logged_user(request: Request, credentials: HTTPAuthorizationCredentials = Depends(security)):

    return request.state.user