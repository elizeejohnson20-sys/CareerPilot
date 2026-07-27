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
@router.get("/admin/applications")
def get_applications():

    connection = get_connection()

    cursor = connection.cursor(dictionary=True)


    query = """
    SELECT 
        applications.application_id,
        applications.student_email,
        companies.company_name,
        companies.location,
        applications.status,
        applications.applied_date

    FROM applications

    JOIN companies
    ON applications.company_id = companies.company_id
    """


    cursor.execute(query)


    applications = cursor.fetchall()


    cursor.close()
    connection.close()


    return applications
@router.put("/admin/applications/{application_id}")
def update_application_status(application_id: int, data: dict):

    connection = get_connection()

    cursor = connection.cursor()


    query = """
    UPDATE applications
    SET status=%s
    WHERE application_id=%s
    """


    cursor.execute(
        query,
        (
            data["status"],
            application_id
        )
    )


    connection.commit()


    cursor.close()
    connection.close()


    return {
        "message": "Application status updated successfully"
    }
@router.get("/admin/students")
def get_students():

    connection = get_connection()
    cursor = connection.cursor(dictionary=True)

    query = """
    SELECT
        user_id,
        full_name,
        email,
        skills,
        experience,
        cgpa,
        department
    FROM users
    ORDER BY user_id
    """

    cursor.execute(query)

    students = cursor.fetchall()

    cursor.close()
    connection.close()

    return students