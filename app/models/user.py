from pydantic import BaseModel

class UserRegister(BaseModel):
    full_name: str
    email: str
    password: str
    skills: str
    experience: int
class UserLogin(BaseModel):
    email: str
    password: str