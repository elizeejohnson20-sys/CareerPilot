from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.database import get_connection
from app.routes import user, login, profile, company, application, admin, dashboard, admin_company

app = FastAPI()

# Allow frontend (Live Server) to access the API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # For development only
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user.router)
app.include_router(login.router)
app.include_router(profile.router)
app.include_router(company.router)
app.include_router(application.router)
app.include_router(admin.router)
app.include_router(dashboard.router)
app.include_router(admin_company.router)


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
