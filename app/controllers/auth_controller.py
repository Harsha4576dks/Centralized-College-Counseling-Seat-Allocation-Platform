import secrets

from fastapi import APIRouter, HTTPException, Request, Response

from ..admin_auth import (
    ADMIN_TOKEN_COOKIE,
    ADMIN_TOKEN_EXPIRE_HOURS,
    create_admin_token,
    get_admin_credentials,
    verify_admin_token,
)
from ..database import db_dependency
from ..schemas.admin_auth_schemas import AdminLogin
from ..schemas.auth_schemas import RegisterUser, LoginUser, UserResponse
from ..services import auth_services
from ..user_auth import ACCESS_TOKEN_EXPIRE_MINUTES

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
def login(user: LoginUser, db: db_dependency, response: Response):
    token, error = auth_services.login_user( db,  user.username, user.password)
    if error:
        raise HTTPException( status_code=401, detail=error )

    response.delete_cookie(
        key=ADMIN_TOKEN_COOKIE,
        path="/",
        secure=True,
        httponly=True,
        samesite="none",
    )
    response.set_cookie(
        key="access_token",
        value=token,
        max_age=ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        httponly=True,
        secure=True,
        samesite="none",
        path="/",
    )
    return {"message": "Login successful"}


@router.post("/logout")
def logout(response: Response):
    response.delete_cookie(
        key="access_token",
        path="/",
        secure=True,
        httponly=True,
        samesite="none",
    )
    response.delete_cookie(
        key=ADMIN_TOKEN_COOKIE,
        path="/",
        secure=True,
        httponly=True,
        samesite="none",
    )
    return {"message": "Logged out"}


@router.post("/admin/login")
def admin_login(credentials: AdminLogin, response: Response):
    configured_credentials = get_admin_credentials()
    if not configured_credentials:
        raise HTTPException(
            status_code=503,
            detail="Admin authentication is not configured on the server.",
        )

    username, password, secret = configured_credentials
    if not (
        secrets.compare_digest(credentials.username.encode("utf-8"), username.encode("utf-8"))
        and secrets.compare_digest(credentials.password.encode("utf-8"), password.encode("utf-8"))
    ):
        raise HTTPException(status_code=401, detail="Invalid admin username or password.")

    response.delete_cookie(
        key="access_token",
        path="/",
        secure=True,
        httponly=True,
        samesite="none",
    )
    response.set_cookie(
        key=ADMIN_TOKEN_COOKIE,
        value=create_admin_token(username, secret),
        max_age=ADMIN_TOKEN_EXPIRE_HOURS * 60 * 60,
        httponly=True,
        secure=True,
        samesite="none",
        path="/",
    )
    return {"message": "Admin login successful"}


@router.get("/admin/session")
def get_admin_session(request: Request):
    token = request.cookies.get(ADMIN_TOKEN_COOKIE)
    username = verify_admin_token(token) if token else None
    if username is None:
        raise HTTPException(status_code=401, detail="Admin sign-in required.")
    return {"username": username, "role": "admin"}


@router.post("/admin/logout")
def admin_logout(response: Response):
    response.delete_cookie(
        key=ADMIN_TOKEN_COOKIE,
        path="/",
        secure=True,
        httponly=True,
        samesite="none",
    )
    response.delete_cookie(
        key="access_token",
        path="/",
        secure=True,
        httponly=True,
        samesite="none",
    )
    return {"message": "Admin logged out"}


@router.get("/user", response_model=UserResponse)
def get_logged_user(request: Request):
    return request.state.user