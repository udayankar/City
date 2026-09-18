from fastapi import APIRouter , status , HTTPException , Response , Depends , Query
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from .. import models
from ..databse import get_db
from ..oauth2 import get_current_user

router = APIRouter(tags=["Saved"])

MAX_PAGE_SIZE = 100

@router.get("/saved")
async def savedCount(db : Session = Depends(get_db) , current_user = Depends(get_current_user) , post_limit: int = Query(default=50 , ge=1, le=MAX_PAGE_SIZE) , post_offset : int = Query(default=0 , ge=0) , event_limit : int = Query(default=50 , ge=1 , le=MAX_PAGE_SIZE) , event_offset : int = Query(default=0 , ge=0)):
    posts = db.query(models.Saved_Posts.Post_ID).filter(models.Saved_Posts.User_ID == current_user.ID).order_by(models.Saved_Posts.ID.desc()).offset(post_offset).limit(post_limit).all() 
    events = db.query(models.Saved_Events.Event_ID).filter(models.Saved_Events.User_ID == current_user.ID).order_by(models.Saved_Events.ID.desc()).offset(event_offset).limit(event_limit).all()
    return {
        "posts": [item.Post_ID for item in posts],
        "events": [item.Event_ID for item in events]
    }
    
@router.post("/posts/{id}/save")
async def addSaved(id : int , response : Response , db : Session = Depends(get_db) , current_user = Depends(get_current_user)):
    post = db.query(models.Posts).filter(models.Posts.ID == id).first()
    if post is None :
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND ,detail="Post not found")
    existing = db.query(models.Saved_Posts).filter(models.Saved_Posts.User_ID
     == current_user.ID , models.Saved_Posts.Post_ID == id).first()
    if existing :
        response.status_code = status.HTTP_200_OK
        return {"message": "Already saved"}
    new_saved = models.Saved_Posts(User_ID = current_user.ID , Post_ID = id)
    db.add(new_saved)
    try :
        db.commit()
    except IntegrityError :
        db.rollback()
        response.status_code = status.HTTP_200_OK
        return {"message": "Already saved"}
    db.refresh(new_saved)
    response.status_code = status.HTTP_201_CREATED
    return new_saved

@router.delete("/posts/{id}/unsave")
async def removeSaved(id : int ,  db : Session = Depends(get_db) , current_user = Depends(get_current_user)):
    saved = db.query(models.Saved_Posts).filter(models.Saved_Posts.User_ID == current_user.ID , models.Saved_Posts.Post_ID == id).first()
    if saved is None :
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND , detail="Not currently saved")
    db.delete(saved)
    db.commit()
    return {"message": "Unsaved successfully"}

@router.post("/events/{id}/save")
async def addSavedEvent(id : int , response : Response , db : Session = Depends(get_db) , current_user = Depends(get_current_user)):
    event = db.query(models.Events).filter(models.Events.ID == id).first()
    if event is None :
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND , detail="Event not found")
    existing = db.query(models.Saved_Events).filter(models.Saved_Events.User_ID == current_user.ID ,models.Saved_Events.Event_ID == id).first()
    if existing :
        response.status_code = status.HTTP_200_OK
        return existing
    new_saved = models.Saved_Events(User_ID = current_user.ID , Event_ID = id)
    db.add(new_saved)
    try :
        db.commit()
    except IntegrityError :
        db.rollback()
        response.status_code = status.HTTP_200_OK
        return {"message": "Already saved"}
    db.refresh(new_saved)
    response.status_code = status.HTTP_201_CREATED
    return new_saved

@router.delete("/events/{id}/unsave")
async def removeSavedEvent(id : int , response : Response , db : Session = Depends(get_db) , current_user = Depends(get_current_user)):
    saved = db.query(models.Saved_Events).filter(models.Saved_Events.Event_ID == id , models.Saved_Events.User_ID == current_user.ID).first()
    if saved is None :
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND ,detail="Not currently saved")
    db.delete(saved)
    db.commit()
    return {"message": "Unsaved successfully"}