from fastapi import FastAPI
from app.database.database import get_connection
from app.routes import user, login

app = FastAPI()
app.include_router(user.router)
app.include_router(login.router)

@app.get("/")
def home():

    connection = get_connection()

    if connection:
        return {
            "message": "CareerPilot Connected Successfully"
        }

    return {
        "message": "Database Connection Failed"
    }