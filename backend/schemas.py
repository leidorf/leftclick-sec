from pydantic import BaseModel

class URLRequest(BaseModel):
    url: str

class URLResponse(BaseModel):
    success: bool
    messages: dict
    data: dict
    progress: list = []