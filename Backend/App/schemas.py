from pydantic import BaseModel , EmailStr
from pydantic.config import ConfigDict
from typing import Optional
from datetime import datetime

class SignupUser(BaseModel):
    Username : str
    Email : EmailStr
    Password : str

class ReturnSignupUser(BaseModel):
    Username : str
    Email : EmailStr
    Bio : Optional[str] = None
    DP : Optional[str] = None
    Created_at : datetime

    model_config = ConfigDict(from_attributes=True)

class UpdateUser(BaseModel):
    Username : Optional[str] = None
    Bio : Optional[str] = None
    DP : Optional[str] = None

class UpdatePassword(BaseModel):
    CurrPass : str
    NewPass : str

class LoginUser(BaseModel):
    Email : EmailStr
    Password : str

class Post(BaseModel):
    Title : str
    Content : str
    Location : str

class UpdatePost(BaseModel):
    Title : Optional[str] = None
    Content : Optional[str] = None
    Location : Optional[str] = None

class ReturnPosts(BaseModel):
    ID : int
    Username : str
    Title : str
    Content : str
    Location : str
    isSaved : bool
    Created_at : datetime
    isMine : bool

    model_config = ConfigDict(from_attributes=True)




