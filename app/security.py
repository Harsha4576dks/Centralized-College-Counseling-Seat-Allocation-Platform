from fastapi import HTTPException, Request


def security(request: Request):
    user = getattr(request.state, "user", None)
    if user is None:
        raise HTTPException(status_code=401, detail="Please sign in first")
    return user