from fastapi import APIRouter
from app.database.database import get_connection
from app.models.application import Application

router = APIRouter()


@router.post("/apply")
def apply_company(data: Application):

    connection = get_connection()
    cursor = connection.cursor()

    # Check if the student has already applied
    check_query = """
    SELECT 1
    FROM applications
    WHERE student_email=%s
    AND company_id=%s
    LIMIT 1
    """

    cursor.execute(
        check_query,
        (data.student_email, data.company_id)
    )

    existing = cursor.fetchone()

    # Read any remaining rows
    cursor.fetchall()

    if existing:
        cursor.close()
        connection.close()

        return {
            "message": "You have already applied to this company."
        }

    # Insert new application
    query = """
    INSERT INTO applications
    (student_email, company_id)
    VALUES (%s, %s)
    """

    cursor.execute(
        query,
        (data.student_email, data.company_id)
    )

    connection.commit()

    cursor.close()
    connection.close()

    return {
        "message": "Application Submitted Successfully"
    }
@router.get("/applications/{email}")
def my_applications(email: str):

    connection = get_connection()
    cursor = connection.cursor(dictionary=True)

    query = """
SELECT
    c.company_id,
    c.company_name,
    c.location,
    c.package_lpa,
    c.logo,
    a.status,
    a.applied_date
FROM applications a
JOIN companies c
    ON a.company_id = c.company_id
WHERE a.student_email=%s
ORDER BY a.applied_date DESC
"""

    cursor.execute(query, (email,))

    data = cursor.fetchall()

    cursor.close()
    connection.close()

    return data