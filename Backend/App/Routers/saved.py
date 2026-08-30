from fastapi import APIRouter , status , HTTPException , Response , Depends
from sqlalchemy.orm import Session
from .. import models
from ..databse import get_db
from ..oauth2 import get_current_user

router = APIRouter(tags=["Saved"])

@router.get("/saved")
async def savedCount(response : Response , db : Session = Depends(get_db) , current_user = Depends(get_current_user)):
    posts = db.query(models.Saved_Posts.Post_ID).filter(models.Saved_Posts.User_ID == current_user.ID).all()
    events = db.query(models.Saved_Events.Event_ID).filter(models.Saved_Events.User_ID == current_user.ID).all()
    return {
        "posts": [item.Post_ID for item in posts],
        "events": [item.Event_ID for item in events]
    }
    
@router.post("/posts/{id}/save")
async def addSaved(id : int , response : Response , db : Session = Depends(get_db) , current_user = Depends(get_current_user)):
    new_saved = models.Saved_Posts(User_ID = current_user.ID , Post_ID = id)
    db.add(new_saved)
    db.commit()
    db.refresh(new_saved)
    response.status_code = status.HTTP_201_CREATED
    return new_saved

@router.post("/posts/{id}/unsave")
async def removeSaved(id : int , response : Response , db : Session = Depends(get_db) , current_user = Depends(get_current_user)):
    saved = db.query(models.Saved_Posts).filter(models.Saved_Posts.User_ID == current_user.ID , models.Saved_Posts.Post_ID == id).first()
    if saved:
        db.delete(saved)
        db.commit()
        return "Unsaved succesfully"

@router.post("/events/{id}/save")
async def addSavedEvent(id : int , response : Response , db : Session = Depends(get_db) , current_user = Depends(get_current_user)):
    new_saved = models.Saved_Events(User_ID = current_user.ID , Event_ID = id)
    db.add(new_saved)
    db.commit()
    db.refresh(new_saved)
    response.status_code = status.HTTP_201_CREATED
    return new_saved

@router.delete("/events/{id}/unsave")
async def removeSavedEvent(id : int , response : Response , db : Session = Depends(get_db) , current_user = Depends(get_current_user)):
    saved = db.query(models.Saved_Events).filter(models.Saved_Events.Event_ID == id , models.Saved_Events.User_ID == current_user.ID).first()
    if saved:
        db.delete(saved)
        db.commit()
        return "Unsaved succesfully"

    