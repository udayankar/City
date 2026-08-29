from fastapi import APIRouter , status , Response , HTTPException , Depends
from ..databse import get_db
from ..oauth2 import get_current_user , get_current_user_optional
from sqlalchemy.orm import Session
from typing import List
from ..schemas import Events , Return_Events
from ..models import Events

router = APIRouter(tags=["Events"])

@router.get("/events" , response_model=List[Return_Events])
async def allEvents(response : Response , db : Session = Depends(get_db) , current_user = Depends(get_current_user_optional)):
    events = db.query(Events).order_by(Events.Start_Date).all()
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
        "isSaved" : False,
    } for event in events] 
