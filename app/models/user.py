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

class UserProfile(BaseModel):
    full_name: str
    email: str
    skills: str
    experience: int
    cgpa: float
    department: str
    phone: str

class UserUpdate(BaseModel):
    full_name: str
    skills: str
    experience: int
    cgpa: float
    department: str
    phone: str
    email: str