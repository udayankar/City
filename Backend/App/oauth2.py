import os
import jwt
from datetime import datetime, UTC, timedelta
from jwt.exceptions import InvalidTokenError
from fastapi import status, Depends, HTTPException, Cookie, Request
from sqlalchemy.orm import Session
from App import models
from .databse import get_db

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
EXPIRE_RAW = os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES")

if not SECRET_KEY or not ALGORITHM or not EXPIRE_RAW:
    raise RuntimeError("SECRET_KEY, ALGORITHM and ACCESS_TOKEN_EXPIRE_MINUTES " "must all be set in your .env file.")

ALLOWED_ALGORITHMS = {"HS256"}

if ALGORITHM not in ALLOWED_ALGORITHMS :
    raise RuntimeError(f"Unsupported JWT algorithm: {ALGORITHM}. " f"Allowed algorithms: {', '.join(ALLOWED_ALGORITHMS)}")
try :
    ACCESS_TOKEN_EXPIRE_MINUTES = int(EXPIRE_RAW)
except ValueError :
    raise RuntimeError("ACCESS_TOKEN_EXPIRE_MINUTES must be an integer.")

ACCESS_TOKEN_COOKIE = "access_token"

def create_access_token(data: dict):
    payload = data.copy()
    expire = datetime.now(UTC) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    payload.update({"exp": expire})
    return jwt.encode(payload , SECRET_KEY , algorithm=ALGORITHM)

def verify_token(token : str , error : HTTPException):
    try :
        payload = jwt.decode(token , SECRET_KEY , algorithms=[ALGORITHM])
        subject = payload.get("sub")
        token_version = payload.get("token_version")
        if subject is None or token_version is None :
            raise error
        try :
            user_id = int(subject) 
            token_version = int(token_version)
        except (TypeError , ValueError) :
            raise error
        return user_id , token_version
    except InvalidTokenError :
        raise error

def get_current_user(access_token : str = Cookie(None) , db : Session = Depends(get_db)):
    credentials_exception = HTTPException(status_code=status.HTTP_401_UNAUTHORIZED , detail="Could not validate credentials" , headers={"WWW-Authenticate": "Bearer"},)
    if access_token is None :
        raise credentials_exception
    user_id , token_version = verify_token(access_token , credentials_exception)
    user = db.query(models.User).filter(models.User.ID == user_id).first()
    if user is None :
        raise credentials_exception
    if user.Token_Version != token_version : 
        raise credentials_exception
    return user

def get_current_user_optional(request : Request , db : Session = Depends(get_db)):
    token = request.cookies.get(ACCESS_TOKEN_COOKIE)
    if not token :
        return None
    try :
        payload = jwt.decode(token , SECRET_KEY , algorithms=[ALGORITHM])
        subject = payload.get("sub")
        token_version = payload.get("token_version")
        if subject is None or token_version is None :
            return None
        try :
            user_id = int(subject)
            token_version = int(token_version)
        except (TypeError, ValueError) :
            return None
        user = db.query(models.User).filter(models.User.ID == user_id).first()
        if user is None :
            return None
        if user.Token_Version != token_version :
            return None 
        return user
    except InvalidTokenError :
        return None


