from fastapi import APIRouter, Depends, BackgroundTasks, HTTPException, status
from sqlalchemy.orm import Session

from ..database import get_db

from ..services.email_services import execute_counseling_pipeline_service
from ..security import security

router = APIRouter(
    prefix="/counseling",
    tags=["Counseling Execution"],
    dependencies=[Depends(security)]
)


@router.post("/execute/{round_id}", status_code=status.HTTP_202_ACCEPTED)
def execute_counseling_button_click( round_id: int, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
   
    try:
        background_tasks.add_task(execute_counseling_pipeline_service, db, round_id)

        return {
            "status": "success",
            "message": f"Counseling execution request initiated for Round {round_id}."
        }

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to submit execution request: {str(e)}"
        )