from fastapi import HTTPException, Request


def security(request: Request):
    user = getattr(request.state, "user", None)
    if user is None:
        raise HTTPException(status_code=401, detail="Please sign in first")
    return user


def admin_security(request: Request):
    user = security(request)
    if not isinstance(user, dict) or user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    return user