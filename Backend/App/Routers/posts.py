from fastapi import status , HTTPException , Response , Depends , APIRouter , Request
from sqlalchemy.orm import Session
from typing import List
from .. import models
from .. import schemas
from ..databse import get_db
from ..oauth2 import get_current_user_optional , get_current_user

router = APIRouter(tags=["Posts"])

@router.get("/posts" , response_model=List[schemas.ReturnPosts])
async def allPosts(response : Response , request : Request , db : Session = Depends(get_db) , current_user = Depends(get_current_user_optional)):
    posts = db.query(models.Posts , models.User).join(models.User , models.Posts.Author_ID == models.User.ID).order_by(models.Posts.Created_at.desc()).all()
    saved_id = set()
    if current_user:
        saved = db.query(models.Saved_Posts.Post_ID).filter(models.Saved_Posts.User_ID == current_user.ID).all()
        saved_id = {item.Post_ID for item in saved}

    return [{
        "ID" : post.ID,
        "Username" : user.Username,
        "Title" : post.Title,
        "Content" : post.Content,
        "Location" : post.Location,
        "isSaved" : post.ID in saved_id,
        "Created_at" : post.Created_at
    } for post , user in posts]

@router.post("/me/addpost" , response_model=schemas.ReturnPosts)
async def addPost(payload : schemas.Post , response : Response , db : Session = Depends(get_db) , current_user = Depends(get_current_user)):
    new_post = models.Posts(**payload.model_dump() , Author_ID = current_user.ID)
    db.add(new_post)
    db.commit()
    db.refresh(new_post)
    response.status_code = status.HTTP_201_CREATED
    return {
        "ID" : new_post.ID,
        "Username" : current_user.Username,
        "Title" : new_post.Title,
        "Content" : new_post.Content,
        "Location" : new_post.Location,
        "Created_at" : new_post.Created_at
    }