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
    isLiked : bool
    Likes : int
    Created_at : datetime
    isMine : bool

    model_config = ConfigDict(from_attributes=True)

class Events(BaseModel):
    Title : str
    Description : str
    Category : str
    Location : str
    Start_Date : datetime
    End_Date : datetime
    Organiser : str
    Image : Optional[str] = None

class Return_Events(BaseModel):
    ID : int
    Title : str
    Description : str
    Category : str
    Location : str
    Start_Date : datetime
    End_Date : datetime
    Organiser : str
    Image : Optional[str] = None
    isSaved : bool

    model_config = ConfigDict(from_attributes=True)




