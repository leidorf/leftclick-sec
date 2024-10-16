from fastapi import FastAPI, HTTPException
from urllib.parse import urlparse
import httpx
import logging

app = FastAPI()

USOM_API_URL = "https://www.usom.gov.tr/api/address/index"

# Configure logging
logging.basicConfig(level=logging.INFO)

@app.get("/")
def read_root():
    return {"message": "LeftClick Sec Backend is Running"}

@app.get("/check-url")
async def check_url(q: str):
    try:
        logging.info(f"Received URL to check: {q}")

        parsed_url = urlparse(q)
        domain = parsed_url.netloc if parsed_url.netloc else parsed_url.path

        # Log extracted domain
        logging.info(f"Extracted domain: {domain}")

        if not domain:
            raise HTTPException(status_code=400, detail="Invalid URL format")

        # Prepare the parameters for the USOM API call
        params = {"q": domain}

        # Log the API call
        logging.info(f"Calling USOM API with parameters: {params}")

        # Query the USOM API with the domain
        async with httpx.AsyncClient() as client:
            response = await client.get(USOM_API_URL, params=params)

        # Check if the request to USOM was successful
        if response.status_code == 200:
            usom_data = response.json()
            logging.info(f"USOM API response: {usom_data}")

            # Check if the domain is in the USOM data
            suspicious_entry = next(
                (entry for entry in usom_data.get("models", []) if entry.get("url") == domain), None
            )

            if suspicious_entry:
                return {"result": "suspicious", "data": suspicious_entry}
            else:
                return {"result": "clean", "message": "The URL is not found in USOM's list."}
        else:
            logging.error(f"USOM API returned an error: {response.status_code} {response.text}")
            raise HTTPException(status_code=response.status_code, detail="Error calling USOM API")
    except Exception as e:
        logging.error(f"An error occurred: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
