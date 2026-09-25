from fastapi import APIRouter , status , Response , HTTPException , Depends , Request 
from .. import schemas
from sqlalchemy.orm import Session
from ..oauth2 import create_access_token , get_current_user ,ACCESS_TOKEN_COOKIE
from ..databse import get_db
from ..utils import hashed_password , verify_password
from .. import models
import os
from ..limit import limiter

router = APIRouter(prefix="/users")

COOKIE_SECURE = os.getenv("COOKIE_SECURE", "false").lower() == "true"

_DUMMY_HASH = hashed_password("dummy-password-for-timing")

@router.post("/login")
@limiter.limit("5/minute")
async def login(request : Request , userinfo : schemas.LoginUser , response : Response , db : Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.Email == userinfo.Email).first()
    invalid_credentials = HTTPException(status_code=status.HTTP_401_UNAUTHORIZED , detail="Incorrect email or password",)
    if user is None :
        verify_password(userinfo.Password , _DUMMY_HASH)
        raise invalid_credentials
    if not verify_password(userinfo.Password , user.Password) :
        raise invalid_credentials
    token = create_access_token({"sub": str(user.ID) , "token_version" : user.Token_Version})
    response.set_cookie(key=ACCESS_TOKEN_COOKIE , value=token , httponly=True , secure=COOKIE_SECURE , samesite="lax")
    return {"message":"Login successful"}

@router.get("/me" , response_model=schemas.ReturnSignupUser)
def me(current_user = Depends(get_current_user)):
    return current_user

@router.post("/logout")
async def logout(response : Response , db : Session = Depends(get_db) , current_user = Depends(get_current_user)):
    current_user.Token_Version += 1
    db.commit()
    response.delete_cookie(ACCESS_TOKEN_COOKIE , httponly=True, secure=COOKIE_SECURE , samesite="lax")
    return {"message": "Logged out successfully"}
