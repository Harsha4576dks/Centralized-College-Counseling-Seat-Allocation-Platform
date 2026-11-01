import os
from datetime import datetime, timedelta, timezone
from typing import Optional, Tuple

from jose import JWTError, jwt


ADMIN_TOKEN_EXPIRE_HOURS = 8
ADMIN_TOKEN_COOKIE = "admin_access_token"
ADMIN_TOKEN_ALGORITHM = "HS256"


def get_admin_credentials() -> Optional[Tuple[str, str, str]]:
    username = os.getenv("ADMIN_USERNAME")
    password = os.getenv("ADMIN_PASSWORD")
    secret = os.getenv("ADMIN_AUTH_SECRET")

    if not username or not password or not secret or len(secret) < 32:
        return None

    return username, password, secret


def create_admin_token(username: str, secret: str) -> str:
    expires_at = datetime.now(timezone.utc) + timedelta(hours=ADMIN_TOKEN_EXPIRE_HOURS)
    return jwt.encode(
        {
            "sub": username,
            "role": "admin",
            "exp": expires_at,
        },
        secret,
        algorithm=ADMIN_TOKEN_ALGORITHM,
    )


def verify_admin_token(token: str) -> Optional[str]:
    credentials = get_admin_credentials()
    if not credentials:
        return None

    expected_username, _, secret = credentials
    try:
        payload = jwt.decode(token, secret, algorithms=[ADMIN_TOKEN_ALGORITHM])
    except JWTError:
        return None

    username = payload.get("sub")
    if payload.get("role") != "admin" or username != expected_username:
        return None

    return username
