from sqlalchemy.orm import Session
from pwdlib import PasswordHash

from ..repositories import user_repository


password_hash = PasswordHash.recommended()


def register_user(db: Session, user):

    existing_username = user_repository.get_user_by_username(
        db,
        user.username
    )

    if existing_username:
        return None, "username already exists"

    existing_email = user_repository.get_user_by_email(
        db,
        user.email
    )

    if existing_email:
        return None, "email already exists"

    hashed_password = password_hash.hash(user.password)

    user.password = hashed_password

    new_user = user_repository.create_user(db, user)

    return new_user, None