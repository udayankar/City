from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase
from dotenv import load_dotenv
import os

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise RuntimeError("DATABASE_URL is not set. Add it to your .env file, e.g. " "DATABASE_URL=postgresql://user:password@localhost:5432/city")

SQL_ECHO = os.getenv("SQL_ECHO", "false").lower() == "true"

engine = create_engine(DATABASE_URL,echo=SQL_ECHO , pool_pre_ping=True ,pool_size=int(os.getenv("DB_POOL_SIZE", "5")) , max_overflow=int(os.getenv("DB_MAX_OVERFLOW" , "10")))

SessionLocal = sessionmaker(bind=engine , autoflush=False , autocommit=False)

class Base(DeclarativeBase):
    pass

def get_db():
    db = SessionLocal()
    try :
        yield db
    except Exception :
        db.rollback()
        raise
    finally :
        db.close()
