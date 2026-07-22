from fastapi import APIRouter
from app.database.database import get_connection

router = APIRouter()


@router.get("/admin/dashboard")
def admin_dashboard():

    connection = get_connection()
    cursor = connection.cursor(dictionary=True)

    cursor.execute("SELECT COUNT(*) AS total_students FROM users")
    students = cursor.fetchone()["total_students"]

    cursor.execute("SELECT COUNT(*) AS total_companies FROM companies")
    companies = cursor.fetchone()["total_companies"]

    cursor.execute("SELECT COUNT(*) AS total_applications FROM applications")
    applications = cursor.fetchone()["total_applications"]

    cursor.close()
    connection.close()

    return {
        "total_students": students,
        "total_companies": companies,
        "total_applications": applications
    }