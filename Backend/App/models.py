from .databse import Base
from sqlalchemy import Column , String , Integer , ForeignKey , TIMESTAMP , UniqueConstraint , DateTime , Date
from sqlalchemy.sql import func

class User(Base):
    __tablename__ = "Users"
    ID = Column(Integer , primary_key=True)
    Username = Column(String(200) , nullable=False)
    Email = Column(String(200) , nullable=False , unique=True , index=True)
    Password = Column(String(500) , nullable=False)
    Bio = Column(String(2000) , nullable=True)
    DP = Column(String(2000) , nullable=True)
    Token_Version = Column(Integer , nullable=False , default=0 , server_default="0")
    Created_at = Column(TIMESTAMP(timezone=True) , nullable=False , server_default=func.NOW())

class Posts(Base):
    __tablename__ = "Posts"
    ID = Column(Integer , primary_key=True)
    Title = Column(String(200) , nullable=False)
    Content = Column(String(5000) , nullable=False)
    Location = Column(String(200) , nullable=True)
    Author_ID = Column(Integer , ForeignKey("Users.ID" , ondelete="CASCADE") , nullable=False , index=True)
    Created_at = Column(TIMESTAMP(timezone=True) , nullable=False , server_default=func.NOW())

class Saved_Posts(Base):
    __tablename__ = "Saved_Posts"
    ID = Column(Integer , primary_key=True)
    User_ID = Column(Integer , ForeignKey("Users.ID" , ondelete="CASCADE") , nullable=False)
    Post_ID = Column(Integer , ForeignKey("Posts.ID" , ondelete="CASCADE") , nullable=False)
    Saved_at = Column(TIMESTAMP(timezone=True) , nullable=True , server_default=func.NOW())

    __table_args__ = (UniqueConstraint("User_ID", "Post_ID", name="unique_saved_post"),)

class Liked_Posts(Base):
    __tablename__ = "Liked_Posts"
    ID = Column(Integer , primary_key=True)
    Post_ID = Column(Integer , ForeignKey("Posts.ID" ,  ondelete="CASCADE") , nullable=False)
    User_ID = Column(Integer , ForeignKey("Users.ID" , ondelete="CASCADE") , nullable=False , index=True)
    Liked_at = Column(TIMESTAMP(timezone=True) , nullable=True , server_default=func.NOW())

    __table_args__ = (UniqueConstraint("Post_ID" , "User_ID" , name="unique_liked_post"),)

class Events(Base):
    __tablename__ = "Events"
    ID = Column(Integer , primary_key=True)
    Title = Column(String(200) , nullable=False)
    Description = Column(String(5000) , nullable=False)
    Category = Column(String(100) , nullable=False , index=True)
    Location = Column(String(200) , nullable=False)
    Start_Date = Column(DateTime , nullable=False , index=True)
    End_Date = Column(DateTime , nullable=False)
    Organiser = Column(String(200) , nullable=False)
    Image = Column(String(2000) , nullable=True)

class Saved_Events(Base):
    __tablename__ = "Saved_Events"
    ID = Column(Integer , primary_key=True)
    User_ID = Column(Integer , ForeignKey("Users.ID" , ondelete="CASCADE") , nullable=False)
    Event_ID = Column(Integer , ForeignKey("Events.ID" , ondelete="CASCADE") , nullable=False)
    Saved_at = Column(TIMESTAMP(timezone=True) , nullable=True , server_default=func.NOW())

    __table_args__ = (UniqueConstraint("User_ID", "Event_ID", name="unique_saved_event"),)
