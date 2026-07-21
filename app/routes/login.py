from fastapi import APIRouter
from app.database.database import get_connection
from app.models.user import UserLogin

router = APIRouter()


@router.post("/login")
def login_user(data: UserLogin):

    connection = get_connection()
    cursor = connection.cursor(dictionary=True)

    query = """
    SELECT * FROM users
    WHERE email=%s AND password=%s
    """

    values = (
        data.email,
        data.password
    )

    cursor.execute(query, values)

    user = cursor.fetchone()

    cursor.close()
    connection.close()


    if user:
        return {
            "message": "Login Successful",
            "user": user["full_name"]
        }

    return {
        "message": "Invalid Email or Password"
    }