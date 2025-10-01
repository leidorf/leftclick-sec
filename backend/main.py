from fastapi import FastAPI, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy import MetaData, Table, Column, Integer, String, Text, TIMESTAMP, text
from urllib.parse import urlparse
from predict import predict
import os
import httpx
import logging
import tldextract

from dotenv import load_dotenv
load_dotenv()

app = FastAPI()

USOM_API_URL = "https://www.usom.gov.tr/api/address/index"

# Database Configuration
DB_USER = os.getenv("MYSQL_USER", "root")
DB_PASSWORD = os.getenv("MYSQL_PASSWORD", "password")
DB_HOST = os.getenv("DB_HOST", "db")
DB_NAME = os.getenv("MYSQL_DATABASE", "test_db")
DATABASE_URL = f"mysql+asyncmy://{DB_USER}:{DB_PASSWORD}@{DB_HOST}/{DB_NAME}"

# SQLAlchemy setup
engine = create_async_engine(DATABASE_URL, echo=True)
async_session = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

logging.basicConfig(level=logging.INFO)

# Define Metadata and Table
metadata = MetaData()

suspicious_domains = Table(
    "suspicious_domains",
    metadata,
    Column("id", Integer, primary_key=True, autoincrement=True),
    Column("domain", String(255), nullable=False, unique=True),
    Column("reason", Text),
    Column("date_added", TIMESTAMP, server_default=text("CURRENT_TIMESTAMP"))
)

def get_root_domain(url):
    extracted = tldextract.extract(url)
    return f"{extracted.domain}.{extracted.suffix}"

async def ensure_table_exists():
    """
    Ensures the table exists in the database. If not, it creates the table.
    """
    async with engine.begin() as conn:
        logging.info("Checking and creating tables if they do not exist...")
        await conn.run_sync(metadata.create_all)
        logging.info("Table check and creation completed.")

@app.on_event("startup")
async def startup_event():
    """
    Called when the FastAPI application starts. Ensures the database table exists.
    """
    await ensure_table_exists()

@app.get("/")
def read_root():
    return {"message": "LeftClick Sec Backend is Running"}

@app.post("/check")
async def check_url_or_db(request: URLRequest):
    """
    Check the URL against the whitelist, external API, and database.
    If not found, fallback to the model prediction.
    """
    try:
        # Parse the URL and extract the domain
        q = request.url
        parsed_url = urlparse(q)
        domain = parsed_url.netloc if parsed_url.netloc else parsed_url.path
        root_domain = get_root_domain(parsed_url.netloc if parsed_url.netloc else parsed_url.path)
        
        if not domain:
            raise HTTPException(status_code=400, detail="Invalid URL format")

        # Step 1: Check the external API
        logging.info(f"Querying USOM API for domain: {domain}")
        params = {"q": domain}
        async with httpx.AsyncClient() as client:
            response = await client.get(USOM_API_URL, params=params)

        if response.status_code == 200:
            usom_data = response.json()
            logging.info(f"USOM API response: {usom_data}")

            # Look for the domain in the API results
            suspicious_entry = next(
                (entry for entry in usom_data.get("models", []) if entry.get("url") == domain), None
            )

            if suspicious_entry:
                return {"result": "suspicious",
                        "source": "API",
                        "data": suspicious_entry,
                        "domain": domain,
                        "current":"USOM",
                        "progress":[""]}
            
        # Step 2: Check the whitelist
        logging.info(f"Checking whitelist for domain: {root_domain}")
        async with async_session() as session:
            whitelist_query = "SELECT 1 FROM whitelist_domains WHERE domain = :domain LIMIT 1"
            whitelist_result = await session.execute(text(whitelist_query), {"domain": root_domain})
            if whitelist_result.scalar():
                return {
                    "result": "whitelisted",
                    "source": "whitelist",
                    "message": "The root domain is in the whitelist and considered safe.",
                    "domain": root_domain,
                    "current": "Whitelist",
                    "progress": ["Checked USOM - not found"]
                }  

        # Step 3: Fallback to the local database
        async with async_session() as session:
            db_query = "SELECT * FROM suspicious_domains WHERE domain = :domain"
            db_result = await session.execute(text(db_query), {"domain": domain})
            rows = db_result.fetchall()
            
            if rows:
                results = [
                    {"id": row[0], "domain": row[1], "reason": row[2], "date_added": row[3]} 
                    for row in rows
                ]
                return {
                    "result": "suspicious",
                    "source": "Blacklist",
                    "data": results,
                    "message": "The link is in the blacklist and considered suspicious.",
                    "domain": domain,
                    "current": "Blacklist",
                    "progress": [
                        "Checked USOM - not found",
                        "Checked whitelist - not found"
                    ]
                }
            
        # Step 4: Use the model prediction
        prediction_result = predict(domain)
        phishing_score = prediction_result.get("phishing_score", 0)
        if phishing_score < 25:
            risk_level = "Safe"
        elif 25 <= phishing_score < 50:
            risk_level = "Moderate"
        elif 50 <= phishing_score < 75:
            risk_level = "Caution"
        else:
            risk_level = "High Risk"
            
        if phishing_score >= 50:
            async with async_session() as session:
                db_query = "INSERT INTO suspicious_domains (domain, reason, date_added) VALUES (:domain, :reason, NOW())"
                reason = f"The link considered {str(risk_level)} (%{phishing_score:.2f}) by ML model"                
                params = {"domain":domain, "reason":reason}
                db_result = await session.execute(text(db_query),params)
                await session.commit()
        return {
            "result": risk_level,
            "source": "Model",
            "data": {
                "phishing_score": phishing_score,
                "risk_level": risk_level,
                "domain": domain
            },
            "current":"Prediction Model",
            "progress":["Checked USOM - not found",
                        "Checked whitelist - not found",
                        "Checked blacklist - not found"]
        }

    except Exception as e:
        logging.error(f"An error occurred: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
