from fastapi import FastAPI, HTTPException
import httpx

app = FastAPI()

USOM_API_URL = "https://www.usom.gov.tr/api/address-description/index" 

@app.get("/")
def read_root():
    return {"message": "LeftClick Sec Backend is Running"}

@app.get("/check_url")
async def check_url(url: str):
    async with httpx.AsyncClient() as client:
        response = await client.get(USOM_API_URL, headers={"Content-Type": "application/json"}, params={"url": url})

        if response.status_code == 200:
            return response.json()
        else:
            raise HTTPException(status_code=response.status_code, detail="Error calling USOM API")
