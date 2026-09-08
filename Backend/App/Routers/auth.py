from fastapi import APIRouter , status , Response , HTTPException , Depends 
from .. import schemas
from sqlalchemy.orm import Session
from ..oauth2 import create_access_token , get_current_user
from ..databse import get_db
from ..utils import verify_password
from .. import models
from dotenv import load_dotenv
import os

load_dotenv()

COOKIE_SECURE = os.getenv("COOKIE_SECURE", "false").lower() == "true"

ACCESS_TOKEN_COOKIE = "access_token"

DUMMY_HASH = os.getenv("DUMMY_HASH")

if not DUMMY_HASH:
    raise RuntimeError("DUMMY_HASH is not set. Add it to your .env file.")

router = APIRouter(prefix="/users")

@router.post("/login")
async def login(userinfo : schemas.LoginUser , response : Response , db : Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.Email == userinfo.Email).first()
    if user == None:
        verify_password(userinfo.Password, DUMMY_HASH)
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED , detail="Incorrect email or password")
    if not verify_password(userinfo.Password , user.Password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED ,detail="Incorrect email or password")
    token = create_access_token({"Email" : user.Email})
    response.set_cookie(
        key=ACCESS_TOKEN_COOKIE,
        value=token,
        httponly=True,
        secure=COOKIE_SECURE,
        samesite="lax"
    )
    return {"message":"Login successful"}

@router.get("/me" , response_model=schemas.ReturnSignupUser)
def me(current_user = Depends(get_current_user)):
    return current_user

@router.post("/logout")
async def logout(response : Response):
    response.delete_cookie(
        key=ACCESS_TOKEN_COOKIE,
        secure=COOKIE_SECURE,
        httponly=True,
        samesite="lax"
    )
    return {"message": "Logged out successfully"}