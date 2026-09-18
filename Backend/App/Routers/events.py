from fastapi import APIRouter , Depends , Query
from ..databse import get_db
from ..oauth2 import get_current_user_optional
from sqlalchemy import or_ , func
from sqlalchemy.orm import Session
from typing import List
from .. import models
from .. import schemas

router = APIRouter(tags=["Events"])

MAX_PAGE_SIZE = 50
MAX_SEARCH_LENGTH = 100

def _escape_like(value: str) -> str:
    return value.replace("\\", "\\\\").replace("%", "\\%").replace("_", "\\_")

@router.get("/events", response_model=List[schemas.Return_Events])
async def allEvents(db: Session = Depends(get_db) , current_user=Depends(get_current_user_optional) , search: str = Query(default="" ,  max_length=MAX_SEARCH_LENGTH) , category: str = Query(default="" ,  max_length=100) , sort: str = Query(default="" , max_length=20) , limit: int = Query(default=20 , ge=1 , le=MAX_PAGE_SIZE) , offset: int = Query(default=0 , ge=0)
):
    escaped = _escape_like(search)
    query = db.query(models.Events).filter(or_(models.Events.Title.ilike(f"%{escaped}%",escape="\\"),models.Events.Description.ilike(f"%{escaped}%",escape="\\")))
    if category :
        query = query.filter(models.Events.Category == category)
    sort_column = (models.Events.Start_Date.desc() if sort == "Latest" else models.Events.Title.asc() if sort == "A-Z" else models.Events.Start_Date.asc())
    events = query.order_by(sort_column, models.Events.ID.asc()).offset(offset).limit(limit).all()
    event_ids = [event.ID for event in events]
    saved_counts = {}
    saved_id = set()
    if event_ids :
        counts = db.query(models.Saved_Events.Event_ID , func.count(models.Saved_Events.User_ID).label("Saved_Count")).filter(models.Saved_Events.Event_ID.in_(event_ids)).group_by(models.Saved_Events.Event_ID).all()
        saved_counts = {event_id : count for event_id , count in counts}
        if current_user :
            saved = db.query(models.Saved_Events.Event_ID).filter(models.Saved_Events.User_ID == current_user.ID , models.Saved_Events.Event_ID.in_(event_ids)).all()
            saved_id = {item.Event_ID for item in saved}
    return [
        {
            "ID": event.ID,
            "Title": event.Title,
            "Description": event.Description,
            "Category": event.Category,
            "Location": event.Location,
            "Start_Date": event.Start_Date,
            "End_Date": event.End_Date,
            "Organiser": event.Organiser,
            "Image": event.Image,
            "isSaved": event.ID in saved_id,
            "Saved_Counts": saved_counts.get(event.ID, 0)
        } for event in events]
