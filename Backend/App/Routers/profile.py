from fastapi import APIRouter , status , HTTPException , Response , Depends
from sqlalchemy.orm import Session
from ..schemas import UpdateUser , UpdatePassword
from ..oauth2 import get_current_user
from ..databse import get_db
from ..utils import verify_password , hashed_password
from .. import models

router = APIRouter(prefix="/users/me")

@router.put("/profile")
async def editProfile(payload : UpdateUser , response : Response , db : Session = Depends(get_db) , current_user = Depends(get_current_user)):
    data = payload.model_dump(exclude_unset=True)
    if not data:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST , detail="No changes provided")
    for field, value in data.items():
        setattr(current_user, field, value)
    db.commit()
    db.refresh(current_user)
    response.status_code = status.HTTP_200_OK
    return {"message": "Profile updated successfully"}

@router.put("/password")
async def editPassword(payload : UpdatePassword , response : Response , db : Session = Depends(get_db) , current_user = Depends(get_current_user)):
    print("Current password received:", bool(payload.CurrPass))
    print("Current password length:", len(payload.CurrPass))
    print("Stored hash:", current_user.Password)
    if not verify_password(payload.CurrPass, current_user.Password) :
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED , detail="Current password is incorrect")
    current_user.Password = hashed_password(payload.NewPass)
    db.commit()
    db.refresh(current_user)
    response.status_code = status.HTTP_200_OK
    return {"message": "Password changed successfully"}
          

