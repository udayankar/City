from fastapi import FastAPI 
from .databse import engine
from . import models
from .Routers import signup

app = FastAPI()
app.include_router(signup.router)

models.Base.metadata.create_all(bind=engine)

@app.get("/hello")
async def test():
    return "hello"