from pydantic import BaseModel , EmailStr
from pydantic.config import ConfigDict
from typing import Optional

class SignupUser(BaseModel):
    Username : str
    Email : EmailStr
    Password : str

class ReturnSignupUser(BaseModel):
    Username : str
    Email : EmailStr

    model_config = ConfigDict(from_attributes=True)

class LoginUser(BaseModel):
    Email : EmailStr
    Password : str



