from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel, EmailStr
from typing import Dict

app = FastAPI()

# Mount static files and templates
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

# Simulated database
comments_db: Dict[int, Dict] = {}
comment_id_counter = 1

# Comment data model
class Comment(BaseModel):
    username: str
    email: EmailStr
    comments: str

@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.post("/add_comment/")
async def add_comment(comment: Comment):
    global comment_id_counter
    comments_db[comment_id_counter] = comment.dict()
    comment_id_counter += 1
    return {"message": "Comment added successfully!"}

@app.get("/all_comments/")
async def all_comments():
    return comments_db
