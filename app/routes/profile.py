from app.models.user import UserUpdate
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
@router.put("/profile")
def update_profile(user: UserUpdate):

    connection = get_connection()
    cursor = connection.cursor()

    query = """
    UPDATE users
    SET
        full_name=%s,
        skills=%s,
        experience=%s,
        cgpa=%s,
        department=%s,
        phone=%s
    WHERE email=%s
    """

    values = (
        user.full_name,
        user.skills,
        user.experience,
        user.cgpa,
        user.department,
        user.phone,
        user.email
    )

    cursor.execute(query, values)
    connection.commit()

    cursor.close()
    connection.close()

    return {
        "message": "Profile Updated Successfully"
    }