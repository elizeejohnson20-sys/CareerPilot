from fastapi import APIRouter
from app.database.database import get_connection

router = APIRouter()

@router.get("/companies")
def get_companies():

    connection = get_connection()
    cursor = connection.cursor(dictionary=True)

    query = "SELECT * FROM companies"

    cursor.execute(query)

    companies = cursor.fetchall()

    cursor.close()
    connection.close()

    return companies
@router.get("/companies/{company_id}")
def get_company(company_id: int):

    connection = get_connection()

    cursor = connection.cursor(dictionary=True)


    cursor.execute(
        "SELECT * FROM companies WHERE company_id=%s",
        (company_id,)
    )


    company = cursor.fetchone()


    cursor.close()
    connection.close()


    if company is None:
        return {
            "message": "Company not found"
        }


    return company
@router.put("/companies/{company_id}")
def update_company(company_id: int, company: dict):

    connection = get_connection()

    cursor = connection.cursor()


    query = """
    UPDATE companies
    SET company_name=%s,
        location=%s,
        package_lpa=%s,
        eligibility_cgpa=%s
    WHERE company_id=%s
    """


    values = (
        company["company_name"],
        company["location"],
        company["package_lpa"],
        company["eligibility_cgpa"],
        company_id
    )


    cursor.execute(query, values)

    connection.commit()


    cursor.close()
    connection.close()


    return {
        "message": "Company updated successfully"
    }