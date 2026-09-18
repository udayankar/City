from pydantic import BaseModel, EmailStr , Field , model_validator , field_validator
from pydantic.config import ConfigDict
from typing import Optional
from datetime import datetime
from urllib.parse import urlparse

def _validate_safe_url(value: Optional[str]) -> Optional[str]:
    if value is None :
        return value
    parsed = urlparse(value)
    if parsed.scheme not in ("http", "https") or not parsed.netloc :
        raise ValueError("Must be a valid http:// or https:// URL")
    return value

class SignupUser(BaseModel):
    Username : str = Field(min_length=3, max_length=50)
    Email : EmailStr
    Password : str = Field(min_length=8, max_length=128)
    @field_validator("Email")
    @classmethod
    def normalize_email(cls, value: str) -> str:
        return value.strip().lower()


class ReturnSignupUser(BaseModel):
    ID : int
    Username : str
    Email : EmailStr
    Bio : Optional[str] = None
    DP : Optional[str] = None
    Created_at : datetime

    model_config = ConfigDict(from_attributes=True)


class UpdateUser(BaseModel):
    Username : Optional[str] = Field(default=None , min_length=3 , max_length=50)
    Bio : Optional[str] = Field(default=None , max_length=200)
    DP : Optional[str] = Field(default=None , max_length=2000)
    @field_validator("DP")
    @classmethod
    def dp_is_safe_url(cls, value: Optional[str]) -> Optional[str]:
        return _validate_safe_url(value)

class UpdatePassword(BaseModel):
    CurrPass : str = Field(max_length=128)
    NewPass : str = Field(min_length=8, max_length=128)

class LoginUser(BaseModel):
    Email : EmailStr
    Password : str = Field(max_length=128)
    @field_validator("Email")
    @classmethod
    def normalize_email(cls, value: str) -> str:
        return value.strip().lower()

class Post(BaseModel):
    Title : str = Field(min_length=1, max_length=200)
    Content : str = Field(min_length=1, max_length=5000)
    Location : str = Field(min_length=1, max_length=200)

class UpdatePost(BaseModel):
    Title : Optional[str] = Field(default=None , min_length=1 , max_length=200)
    Content : Optional[str] = Field(default=None , min_length=1 , max_length=5000)
    Location: Optional[str] = Field(default=None , min_length=1 , max_length=200)

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
    Title : str = Field(min_length=1, max_length=200)
    Description : str = Field(min_length=1, max_length=5000)
    Category : str = Field(min_length=1, max_length=100)
    Location : str = Field(min_length=1, max_length=200)
    Start_Date : datetime
    End_Date : datetime
    Organiser : str = Field(min_length=1, max_length=200)
    Image : Optional[str] = Field(default=None , max_length=2000)
    @field_validator("Image")
    @classmethod
    def image_is_safe_url(cls, value: Optional[str]) -> Optional[str]:
        return _validate_safe_url(value)
    @model_validator(mode="after")
    def check_dates(self):
        if self.End_Date < self.Start_Date :
            raise ValueError("End_Date must be on or after Start_Date")
        return self

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





