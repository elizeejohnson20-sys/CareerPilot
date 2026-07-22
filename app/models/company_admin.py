from pydantic import BaseModel


class Company(BaseModel):
    company_name: str
    location: str
    package_lpa: float
    eligibility_cgpa: float