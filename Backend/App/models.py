from .databse import Base
from sqlalchemy import Column , String , Integer , ForeignKey , TIMESTAMP
from sqlalchemy.sql import func

class User(Base):
    __tablename__ = "Users"
    ID = Column(Integer , primary_key=True)
    Username = Column(String(200) , nullable=False)
    Email = Column(String(200) , nullable=False , unique=True , index=True)
    Password = Column(String(200) , nullable=False)

class Posts(Base):
    __tablename__ = "Posts"
    ID = Column(Integer , primary_key=True)
    Title = Column(String(200) , nullable=False)
    Content = Column(String , nullable=False)
    Author_ID = Column(Integer , ForeignKey("Users.ID" , ondelete="CASCADE") , nullable=False)
    Created_at = Column(TIMESTAMP(timezone=True) , nullable=False , server_default=func.NOW())

class Saved_Posts(Base):
    __tablename__ = "Saved_Posts"
    ID = Column(Integer , primary_key=True)
    User_ID = Column(Integer , ForeignKey("Users.ID" , ondelete="CASCADE") , nullable=False)
    Post_ID = Column(Integer , ForeignKey("Posts.ID" , ondelete="CASCADE"))
    Saved_at = Column(TIMESTAMP(timezone=True) , nullable=True , server_default=func.NOW())