from pydantic import BaseModel , EmailStr , Field
from pydantic.config import ConfigDict
from typing import Optional
from datetime import datetime

class SignupUser(BaseModel):
    Username : str = Field(min_length=3 , max_length=50)
    Email : EmailStr
    Password : str = Field(min_length=8 , max_length=128)

class ReturnSignupUser(BaseModel):
    Username : str
    Email : EmailStr
    Bio : Optional[str] = None
    DP : Optional[str] = None
    Created_at : datetime

    model_config = ConfigDict(from_attributes=True)

class UpdateUser(BaseModel):
    Username : Optional[str] = Field(default=None , min_length=3 , max_length=50)
    Bio : Optional[str] = Field(default=None , max_length=200)
    DP : Optional[str] = Field(default=None , max_length=500)

class UpdatePassword(BaseModel):
    CurrPass : str = Field(max_length=128)
    NewPass : str = Field(min_length=8 , max_length=128)

class LoginUser(BaseModel):
    Email : EmailStr
    Password : str = Field(max_length=128)

class Post(BaseModel):
    Title : str = Field(min_length=1 , max_length=200)
    Content : str = Field(min_length=1 , max_length=10000)
    Location : str = Field(min_length=1 , max_length=200)

class UpdatePost(BaseModel):
    Title : Optional[str] = Field(default=None , min_length=1 , max_length=200)
    Content : Optional[str] = Field(default=None , min_length=1 ,max_length=10000)
    Location : Optional[str] = Field(default=None , min_length=1 ,max_length=200)

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
    Title : str = Field(min_length=1 , max_length=200)
    Description : str = Field(min_length=1 , max_length=10000)
    Category : str = Field(min_length=1 , max_length=100)
    Location : str = Field(min_length=1 , max_length=200)
    Start_Date : datetime 
    End_Date : datetime
    Organiser : str = Field(min_length=1 , max_length=200)
    Image : Optional[str] = Field(default=None , max_length=500)

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
    Saved_Counts : int

    model_config = ConfigDict(from_attributes=True)




