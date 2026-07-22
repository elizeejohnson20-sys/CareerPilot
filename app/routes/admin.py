from fastapi import APIRouter
from app.database.database import get_connection
from app.models.admin import AdminLogin

router = APIRouter()


@router.post("/admin/login")
def admin_login(admin: AdminLogin):

    connection = get_connection()
    cursor = connection.cursor(dictionary=True)

    query = """
    SELECT *
    FROM admin
    WHERE email=%s
    AND password=%s
    """

    cursor.execute(
        query,
        (admin.email, admin.password)
    )

    result = cursor.fetchone()

    cursor.close()
    connection.close()

    if result:
        return {
            "message": "Admin Login Successful"
        }

    return {
        "message": "Invalid Admin Credentials"
    }