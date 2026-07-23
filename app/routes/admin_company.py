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
@router.delete("/admin/company/{company_id}")
def delete_company(company_id: int):

    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute(
        "DELETE FROM companies WHERE company_id=%s",
        (company_id,)
    )

    connection.commit()

    cursor.close()
    connection.close()

    return {
        "message": "Company Deleted Successfully"
    }
@router.put("/admin/company/{company_id}")
def update_company(company_id: int, company: Company):

    connection = get_connection()
    cursor = connection.cursor()

    query = """
    UPDATE companies
    SET
        company_name=%s,
        location=%s,
        package_lpa=%s,
        eligibility_cgpa=%s
    WHERE company_id=%s
    """

    cursor.execute(
        query,
        (
            company.company_name,
            company.location,
            company.package_lpa,
            company.eligibility_cgpa,
            company_id
        )
    )

    connection.commit()

    cursor.close()
    connection.close()

    return {
        "message": "Company Updated Successfully"
    }