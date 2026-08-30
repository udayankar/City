from fastapi import APIRouter , status , Response , HTTPException , Depends
from ..databse import get_db
from ..oauth2 import get_current_user , get_current_user_optional
from sqlalchemy import or_ , func
from sqlalchemy.orm import Session
from typing import List
from ..schemas import Events , Return_Events
from ..models import Events , Saved_Events

router = APIRouter(tags=["Events"])

@router.get("/events" , response_model=List[Return_Events])
async def allEvents(response : Response , db : Session = Depends(get_db) , current_user = Depends(get_current_user_optional) , search : str = "" , category : str = "" , sort : str = ""):
    events = db.query(Events).filter(or_(Events.Title.ilike(f"%{search}%"),Events.Description.ilike(f"%{search}%")))
    if category :
        events = events.filter(Events.Category == category)
    sort_column = (Events.Start_Date.desc() if sort == "Latest"
                else Events.Title.asc() if sort == "A-Z"
                else Events.Start_Date.asc())
    events = events.order_by(sort_column).all()
    saved_counts = db.query(Saved_Events.Event_ID , func.count(Saved_Events.User_ID).label("Saved_Count")).group_by(Saved_Events.Event_ID).all()
    saved_counts = {event_id : count for event_id , count in saved_counts}
    saved_id = set()
    if current_user :
        saved = db.query(Saved_Events).filter(Saved_Events.User_ID == current_user.ID).all()
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
