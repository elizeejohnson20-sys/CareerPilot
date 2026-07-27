from fastapi import APIRouter
from app.database.database import get_connection

router = APIRouter()


@router.get("/admin/students")
def get_students():

    connection = get_connection()

    cursor = connection.cursor(dictionary=True)

    query = """
    SELECT
        full_name,
        email,
        department,
        cgpa,
        skills
    FROM users
    ORDER BY full_name
    """

    cursor.execute(query)

    students = cursor.fetchall()

    cursor.close()
    connection.close()

    return students