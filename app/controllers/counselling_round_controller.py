from fastapi import APIRouter, HTTPException
from sqlalchemy.orm import Session

from ..database import db_dependency
from ..schemas.counselling_round_schemas import CounsellingBase
from ..services import counselling_round_services

router = APIRouter(
    prefix="/counselling_details",
    tags=["counselling"]
)

@router.get("/search")
async def get_counselling_round_number(db:db_dependency, round_number:int):
    result = counselling_round_services.search_counselling_round(db, round_number)
    if result is None:
                raise HTTPException(status_code=404, detail="counselling details not found")
    return result

@router.get("/{counselling_round_id}")
async def get_counselling_round(db:db_dependency, counselling_round_id:int):
        result = counselling_round_services.get_counselling(db, counselling_round_id)
        if result is None:
                    raise HTTPException(status_code=404, detail="counselling details not found")
        return result

@router.post("/")
async def create_counselling(db:db_dependency, counselling:CounsellingBase):
        return counselling_round_services.create_counselling(db, counselling)

@router.delete("/{counselling_round_id}")
async def delete_counselling(db:db_dependency, counselling_round_id:int):
        result, error = counselling_round_services.delete_counselling(db, counselling_round_id)
        if error == "counselling details deleted successfully":
                raise HTTPException(status_code=404, detail="counselling details not found")
        return {"message":"counselling details deleted successfully", "deleted_details":result}
                