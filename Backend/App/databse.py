from sqlalchemy import create_engine , URL
from sqlalchemy.orm import sessionmaker, DeclarativeBase
from dotenv import load_dotenv
import os

# load_dotenv()

# DATABASE_URL = os.getenv("DATABASE_URL")

DATABASE_URL = URL.create(
    drivername = "postgresql+psycopg",
    username = "postgres",
    password = "Udayan@2007",
    host = "localhost",
    database = "City",
)

engine = create_engine(DATABASE_URL , echo=True)

SessionLocal = sessionmaker(bind=engine , autoflush=False , autocommit=False)

class Base(DeclarativeBase):
    pass

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()