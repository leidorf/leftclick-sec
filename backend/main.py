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
from pydantic import BaseModel
from dotenv import load_dotenv

load_dotenv()
app = FastAPI()


class URLRequest(BaseModel):
    url: str


MESSAGE_CODES = {
    "error": {
        "ERR_INVALID_URL": "Invalid URL format.",
        "ERR_NETWORK": "Network error, please check your internet connection.",
        "ERR_SERVER": "Server error, please try again later.",
        "ERR_URL_CHECK_FAILED": "URL check failed.",
        "ERR_EMPTY_URL": "Please enter an URL.",
    },
    "success": {
        "URL_SAFE": "URL looks safe.",
        "URL_CHECK_COMPLETED": "URL check completed.",
        "URL_WHITELISTED": "URL is in whitelist and considered safe.",
    },
    "warning": {
        "URL_SUSPICIOUS": "URL looks suspicious, be cautious.",
        "URL_MALICIOUS": "URL marked as malicious, avoid visiting!",
        "URL_BLACKLISTED": "URL is in blacklist and flagged as suspicious.",
    },
}

USOM_API_URL = "https://www.usom.gov.tr/api/address/index"
DB_USER = os.getenv("MYSQL_USER", "root")
DB_PASSWORD = os.getenv("MYSQL_PASSWORD", "password")
DB_HOST = os.getenv("DB_HOST", "db")
DB_NAME = os.getenv("MYSQL_DATABASE", "test_db")
DATABASE_URL = f"mysql+asyncmy://{DB_USER}:{DB_PASSWORD}@{DB_HOST}/{DB_NAME}"

print(f"🔗 Database URL: {DATABASE_URL.replace(DB_PASSWORD, '***')}")

# --------------------------------------- Sqlalchemy Setup --------------------------------------- #
engine = create_async_engine(DATABASE_URL, echo=True)
async_session = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

logging.basicConfig(level=logging.INFO)
metadata = MetaData()

suspicious_domains = Table(
    "suspicious_domains",
    metadata,
    Column("id", Integer, primary_key=True, autoincrement=True),
    Column("domain", String(255), nullable=False, unique=True),
    Column("reason", Text),
    Column("date_added", TIMESTAMP, server_default=text("CURRENT_TIMESTAMP")),
)


def get_root_domain(url):
    extracted = tldextract.extract(url)
    return f"{extracted.domain}.{extracted.suffix}"


# ------------ Ensures the table exists in the database. If not, it creates the table. ----------- #
async def ensure_table_exists():
    try:
        async with engine.begin() as conn:
            logging.info("Checking and creating tables if they do not exist...")
            await conn.run_sync(metadata.create_all)
            logging.info("Table check and creation completed.")
    except Exception as e:
        logging.error(f"❌ Table creation failed: {e}")
        raise


# -------- Called when the FastAPI application starts. Ensures the database table exists. -------- #
@app.on_event("startup")
async def startup_event():
    print("🔧 Starting backend application...")
    try:
        await ensure_table_exists()
        print("✅ Database tables ready")
    except Exception as e:
        print(f"❌ Startup failed: {e}")


@app.get("/")
def read_root():
    return {"message": "LeftClick Sec Backend is Running"}


# ------------------------------------- Health check endpoint ------------------------------------ #
@app.get("/health")
async def health_check():
    try:
        async with async_session() as session:
            await session.execute(text("SELECT 1"))
        return {"status": "healthy", "database": "connected"}
    except Exception as e:
        return {
            "status": "unhealthy",
            "database": "disconnected",
            "error": str(e),
        }


# --------------- Check the URL against the whitelist, external API, and database. --------------- #
# ------------------------ If not found, fallback to the model prediction. ----------------------- #
@app.post("/check")
async def check_url_or_db(request: URLRequest):
    try:
        # ----------------------------- Parse The Url And Extract The Domain ----------------------------- #
        q = request.url
        parsed_url = urlparse(q)
        domain = parsed_url.netloc if parsed_url.netloc else parsed_url.path
        root_domain = get_root_domain(
            parsed_url.netloc if parsed_url.netloc else parsed_url.path
        )

        if not domain:
            raise HTTPException(
                status_code=400,
                detail={
                    "success": False,
                    "messages": {
                        "type": "error",
                        "code": "ERR_INVALID_URL",
                        "message": "Invalid URL format",
                    },
                },
            )

        print(f"🔍 Checking domain: {domain}, root: {root_domain}")

        # -------------------------------------- Check the USOM API -------------------------------------- #
        logging.info(f"Querying USOM API for domain: {domain}")
        try:
            params = {"q": domain}
            async with httpx.AsyncClient() as client:
                response = await client.get(USOM_API_URL, params=params, timeout=10.0)

            if response.status_code == 200:
                usom_data = response.json()
                logging.info(f"USOM API response: {usom_data}")

                suspicious_entry = next(
                    (
                        entry
                        for entry in usom_data.get("models", [])
                        if entry.get("url") == domain
                    ),
                    None,
                )

                if suspicious_entry:
                    return {
                        "success": True,
                        "messages": {
                            "type": "warning",
                            "code": "URL_MALICIOUS",
                            "message": MESSAGE_CODES["warning"]["URL_MALICIOUS"],
                        },
                        "data": {
                            "result": "suspicious",
                            "domain": domain,
                            "source": "USOM API",
                            "details": suspicious_entry,
                        },
                        "progress": [""],
                    }
        except Exception as api_error:
            logging.warning(f"USOM API check failed: {api_error}")

        # -------------------------------------- Check the whitelist ------------------------------------- #
        logging.info(f"Checking whitelist for domain: {root_domain}")
        try:
            async with async_session() as session:
                whitelist_query = (
                    "SELECT 1 FROM whitelist_domains WHERE domain = :domain LIMIT 1"
                )
                whitelist_result = await session.execute(
                    text(whitelist_query), {"domain": root_domain}
                )
                if whitelist_result.scalar():
                    return {
                        "success": True,
                        "messages": {
                            "type": "success",
                            "code": "URL_WHITELISTED",
                            "message": MESSAGE_CODES["success"]["URL_WHITELISTED"],
                        },
                        "data": {
                            "result": "whitelisted",
                            "domain": root_domain,
                            "source": "Whitelist",
                        },
                        "progress": ["Checked USOM"],
                    }
        except Exception as db_error:
            logging.warning(f"Whitelist check failed: {db_error}")

        # --------------------------- Fallback to the local blacklist database --------------------------- #
        try:
            async with async_session() as session:
                db_query = "SELECT * FROM suspicious_domains WHERE domain = :domain"
                db_result = await session.execute(text(db_query), {"domain": domain})
                rows = db_result.fetchall()

                if rows:
                    results = [
                        {
                            "id": row[0],
                            "domain": row[1],
                            "reason": row[2],
                            "date_added": row[3],
                        }
                        for row in rows
                    ]
                    return {
                        "success": True,
                        "messages": {
                            "type": "warning",
                            "code": "URL_BLACKLISTED",
                            "message": MESSAGE_CODES["warning"]["URL_BLACKLISTED"],
                        },
                        "data": {
                            "result": "suspicious",
                            "domain": domain,
                            "source": "Blacklist",
                            "details": results,
                        },
                        "progress": ["Checked USOM", "Checked whitelist"],
                    }
        except Exception as db_error:
            logging.warning(f"Blacklist check failed: {db_error}")

        # ----------------------------------- Use the model prediction ----------------------------------- #
        try:
            prediction_result = predict(domain)
            phishing_score = prediction_result.get("phishing_score", 0)

            # ---------------------- Determine risk level and corresponding message code --------------------- #
            if phishing_score < 25:
                risk_level = "Safe"
                message_code = "URL_SAFE"
                message_type = "success"
            elif 25 <= phishing_score < 50:
                risk_level = "Moderate"
                message_code = "URL_SUSPICIOUS"
                message_type = "warning"
            elif 50 <= phishing_score < 75:
                risk_level = "Caution"
                message_code = "URL_SUSPICIOUS"
                message_type = "warning"
            else:
                risk_level = "High Risk"
                message_code = "URL_MALICIOUS"
                message_type = "warning"

            # -------------------------- Insert into suspicious domains if high risk ------------------------- #
            if phishing_score >= 50:
                try:
                    async with async_session() as session:
                        db_query = "INSERT INTO suspicious_domains (domain, reason, date_added) VALUES (:domain, :reason, NOW())"
                        reason = f"The link considered {str(risk_level)} (%{phishing_score:.2f}) by Prediction Model"
                        params = {"domain": domain, "reason": reason}
                        await session.execute(text(db_query), params)
                        await session.commit()
                except Exception as insert_error:
                    logging.warning(
                        f"Failed to insert into suspicious_domains: {insert_error}"
                    )

            return {
                "success": True,
                "messages": {
                    "type": message_type,
                    "code": message_code,
                    "message": MESSAGE_CODES[message_type][message_code],
                },
                "data": {
                    "result": risk_level,
                    "domain": domain,
                    "source": "Prediction Model",
                    "phishing_score": phishing_score,
                },
                "progress": [
                    "Checked USOM",
                    "Checked whitelist",
                    "Checked blacklist",
                ],
            }
        except Exception as model_error:
            logging.error(f"Model prediction failed: {model_error}")
            raise HTTPException(
                status_code=500,
                detail={
                    "success": False,
                    "messages": {
                        "type": "error",
                        "code": "ERR_URL_CHECK_FAILED",
                        "message": "Model prediction failed",
                    },
                },
            )

    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"An error occurred: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail={
                "success": False,
                "messages": {
                    "type": "error",
                    "code": "ERR_SERVER",
                    "message": "Internal Server Error",
                },
            },
        )
