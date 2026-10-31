import os
import re

from dotenv import load_dotenv


load_dotenv()


DEFAULT_ALLOWED_ORIGINS = (
    "http://localhost:5173",
    "http://127.0.0.1:5173",

    "https://centralized-college-counseling-seat-kappa.vercel.app",
)

ALLOWED_ORIGINS = tuple(
    origin.strip().rstrip("/")
    for origin in os.getenv(
        "CORS_ALLOWED_ORIGINS",
        ",".join(DEFAULT_ALLOWED_ORIGINS),
    ).split(",")
    if origin.strip()
)
ALLOWED_ORIGIN_REGEX = os.getenv(
    "CORS_ALLOWED_ORIGIN_REGEX",
    r"https://centralized-college-counseling-seat-kappa\.vercel\.app",
)


def is_allowed_origin(origin: str) -> bool:
    return origin.rstrip("/") in ALLOWED_ORIGINS or bool(
        ALLOWED_ORIGIN_REGEX and re.fullmatch(ALLOWED_ORIGIN_REGEX, origin)
    )
