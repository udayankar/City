from .databse import Base
from sqlalchemy import Column , String 

class User(Base):
    __tablename__ = "Users"
    Username = Column(String , nullable=False)
    Email = Column(String , nullable=False , unique=True , primary_key=True)
    Password = Column(String , nullable=False)


# class Post(Base):
#     __tablename__ = "Posts"