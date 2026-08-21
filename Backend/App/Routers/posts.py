from fastapi import status , HTTPException , Response , Depends , APIRouter
from sqlalchemy.orm import Session
from sqlalchemy import or_ , func
from typing import List
from .. import models
from .. import schemas
from ..databse import get_db
from ..oauth2 import get_current_user_optional , get_current_user

router = APIRouter(tags=["Posts"])

@router.get("/posts" , response_model=List[schemas.ReturnPosts])
async def allPosts(response : Response , db : Session = Depends(get_db) , current_user = Depends(get_current_user_optional) , search : str = ""):
    posts = db.query(models.Posts,models.User,func.count(models.Liked_Posts.User_ID).label("likes")).join(models.User,models.Posts.Author_ID == models.User.ID).outerjoin(models.Liked_Posts,models.Posts.ID == models.Liked_Posts.Post_ID).filter(or_(models.Posts.Title.ilike(f"%{search}%"),models.Posts.Content.ilike(f"%{search}%"))).group_by(models.Posts.ID, models.User.ID).order_by(models.Posts.Created_at.desc()).all()
    saved_id = set()
    liked_id = set()
    if current_user:
        saved = db.query(models.Saved_Posts.Post_ID).filter(models.Saved_Posts.User_ID == current_user.ID).all()
        saved_id = {item.Post_ID for item in saved}
        liked = db.query(models.Liked_Posts.Post_ID).filter(models.Liked_Posts.User_ID == current_user.ID).all()
        liked_id = {item.Post_ID for item in liked}

    return [{
        "ID" : post.ID,
        "Username" : user.Username,
        "Title" : post.Title,
        "Content" : post.Content,
        "Location" : post.Location,
        "isSaved" : post.ID in saved_id,
        "isLiked" : post.ID in liked_id,
        "Likes" : likes,
        "Created_at" : post.Created_at,
        "isMine" : current_user.ID == user.ID if current_user else False
    } for post , user , likes in posts]

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

@router.get("/me/posts" , response_model=List[schemas.ReturnPosts])
async def myPosts(response : Response , db : Session = Depends(get_db) , current_user = Depends(get_current_user)):
    myposts = db.query(models.Posts , func.count(models.Liked_Posts.User_ID).label("likes")).outerjoin(models.Liked_Posts,models.Posts.ID == models.Liked_Posts.Post_ID).filter(models.Posts.Author_ID == current_user.ID).group_by(models.Posts.ID)
    return [{
        "ID" : post.ID,
        "Username" : current_user.Username,
        "Title" : post.Title,
        "Content" : post.Content,
        "Location" : post.Location,
        "isSaved" : False,
        "Likes" : likes,
        "Created_at" : post.Created_at,
        "isMine" : True
    } for post , likes in myposts]