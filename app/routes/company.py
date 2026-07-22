from fastapi import APIRouter
from app.database.database import get_connection

router = APIRouter()

@router.get("/companies")
def get_companies():

    connection = get_connection()
    cursor = connection.cursor(dictionary=True)

    query = "SELECT * FROM companies"

    cursor.execute(query)

    companies = cursor.fetchall()

    cursor.close()
    connection.close()

    return companies