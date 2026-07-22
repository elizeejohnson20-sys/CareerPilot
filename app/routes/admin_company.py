from fastapi import APIRouter
from app.database.database import get_connection
from app.models.company_admin import Company

router = APIRouter()


@router.post("/admin/company")
def add_company(company: Company):

    connection = get_connection()
    cursor = connection.cursor()

    query = """
    INSERT INTO companies
    (company_name, location, package_lpa, eligibility_cgpa)
    VALUES (%s,%s,%s,%s)
    """

    cursor.execute(
        query,
        (
            company.company_name,
            company.location,
            company.package_lpa,
            company.eligibility_cgpa
        )
    )

    connection.commit()

    cursor.close()
    connection.close()

    return {
        "message": "Company Added Successfully"
    }
@router.get("/admin/companies")
def get_companies():

    connection = get_connection()
    cursor = connection.cursor(dictionary=True)

    cursor.execute("""
        SELECT *
        FROM companies
        ORDER BY company_name
    """)

    companies = cursor.fetchall()

    cursor.close()
    connection.close()

    return companies