from fastapi import APIRouter , Response , HTTPException , Depends , status
from .. import models
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from ..oauth2 import get_current_user
from ..databse import get_db

router = APIRouter(tags=["Liked"])

@router.get("/liked")
async def likedCount(response : Response , db : Session = Depends(get_db) , current_user = Depends(get_current_user)):
    liked = db.query(models.Liked_Posts.Post_ID).filter(models.Liked_Posts.User_ID == current_user.ID).all()
    return [item.Post_ID for item in liked]

@router.post("/posts/{id}/like")
async def addLiked(id : int , response : Response , db : Session = Depends(get_db) , current_user = Depends(get_current_user)):
    post = db.query(models.Posts).filter(models.Posts.ID == id).first()
    if post is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND ,detail="Post not found")
    existing = db.query(models.Liked_Posts).filter(models.Liked_Posts.Post_ID == id , models.Liked_Posts.User_ID == current_user.ID).first()
    if existing:
        response.status_code = status.HTTP_200_OK
        return existing
    new_liked = models.Liked_Posts(Post_ID=id , User_ID=current_user.ID)
    db.add(new_liked)
    try:
        db.commit()
    except IntegrityError:
        db.rollback()
        response.status_code = status.HTTP_200_OK
        return {"message": "Already liked"}
    db.refresh(new_liked)
    response.status_code = status.HTTP_201_CREATED
    return new_liked

@router.post("/posts/{id}/unlike")
async def removeLike(id : int , response : Response , db : Session = Depends(get_db) , current_user = Depends(get_current_user)):
    liked = db.query(models.Liked_Posts).filter(models.Liked_Posts.Post_ID == id , models.Liked_Posts.User_ID == current_user.ID).first()
    if liked is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND ,detail="Not currently liked")
    db.delete(liked)
    db.commit()
    return "Unliked successfully"
