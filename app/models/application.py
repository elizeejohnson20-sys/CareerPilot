from pydantic import BaseModel

class Application(BaseModel):
    student_email: str
    company_id: int