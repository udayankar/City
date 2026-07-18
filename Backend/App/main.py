from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .databse import engine
from . import models
from .Routers import signup

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:1234",
        "http://127.0.0.1:1234",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(signup.router)

models.Base.metadata.create_all(bind=engine)

@app.get("/hello")
async def test():
    return "hello"