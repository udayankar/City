from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .databse import engine
from . import models
from .Routers import signup , auth , saved , posts , profile , liked

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:1234" , "http://127.0.0.1:1234"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(signup.router)
app.include_router(auth.router)
app.include_router(saved.router)
app.include_router(posts.router)
app.include_router(profile.router)
app.include_router(liked.router)

models.Base.metadata.create_all(bind=engine)

@app.get("/hello")
def hello():
    return {"message": "NEW SERVER"}