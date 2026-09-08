from fastapi import APIRouter , status , Response , HTTPException , Depends , Query
from ..databse import get_db
from ..oauth2 import get_current_user , get_current_user_optional
from sqlalchemy import or_ , func
from sqlalchemy.orm import Session
from typing import List
from .. import models
from .. import schemas

router = APIRouter(tags=["Events"])

@router.get("/events" , response_model=List[schemas.Return_Events])
async def allEvents(response : Response , db : Session = Depends(get_db) , current_user = Depends(get_current_user_optional) , search : str = "" , category : str = "" , sort : str = "" , limit : int = Query(default=20 , ge=1 , le=50) , offset : int = Query(default=0 , ge=0)):
    events = db.query(models.Events).filter(or_(models.Events.Title.ilike(f"%{search}%"),models.Events.Description.ilike(f"%{search}%")))
    if category :
        events = events.filter(models.Events.Category == category)
    sort_column = (models.Events.Start_Date.desc() if sort == "Latest" else models.Events.Title.asc() if sort == "A-Z" else models.Events.Start_Date.asc())
    events = events.order_by(sort_column).offset(offset).limit(limit).all()
    event_ids = [event.ID for event in events]
    saved_counts = {}
    if event_ids :
        counts = db.query(models.Saved_Events.Event_ID,func.count(models.Saved_Events.User_ID).label("Saved_Count")).filter(models.Saved_Events.Event_ID.in_(event_ids)).group_by(models.Saved_Events.Event_ID).all()
        saved_counts = {event_id : count for event_id, count in counts}
    saved_id = set()
    if current_user :
        saved = db.query(models.Saved_Events.Event_ID).filter(models.Saved_Events.User_ID == current_user.ID).all()
        saved_id = {item.Event_ID for item in saved}
    return [{
        "ID" : event.ID,
        "Title" : event.Title,
        "Description" : event.Description,
        "Category" : event.Category,
        "Location" : event.Location,
        "Start_Date" : event.Start_Date,
        "End_Date" : event.End_Date,
        "Organiser" : event.Organiser,
        "Image" : event.Image,
        "isSaved" : event.ID in saved_id,
        "Saved_Counts" : saved_counts.get(event.ID, 0)
    } for event in events]
