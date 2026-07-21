from fastapi import APIRouter
from app.database.database import get_connection
from app.models.user import UserRegister

router = APIRouter()


@router.post("/register")
def register_user(user: UserRegister):

    connection = get_connection()
    cursor = connection.cursor()

    query = """
    INSERT INTO users
    (full_name, email, password, skills, experience)
    VALUES (%s, %s, %s, %s, %s)
    """

    values = (
        user.full_name,
        user.email,
        user.password,
        user.skills,
        user.experience
    )

    cursor.execute(query, values)

    connection.commit()

    cursor.close()
    connection.close()

    return {
        "message": "User Registered Successfully"
    }