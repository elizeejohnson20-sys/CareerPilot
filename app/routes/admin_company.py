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