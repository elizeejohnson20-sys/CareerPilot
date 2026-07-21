from fastapi import APIRouter
from app.database.database import get_connection

router = APIRouter()

@router.get("/profile/{email}")
def get_profile(email: str):

    connection = get_connection()
    cursor = connection.cursor(dictionary=True)

    query = """
    SELECT full_name,
           email,
           skills,
           experience,
           cgpa,
           department,
           phone
    FROM users
    WHERE email=%s
    """

    cursor.execute(query, (email,))

    user = cursor.fetchone()

    cursor.close()
    connection.close()

    if user:
        return user

    return {"message": "User Not Found"}