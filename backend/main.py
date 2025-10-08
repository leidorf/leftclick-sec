import os
from fastapi import FastAPI, HTTPException, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from fastapi.middleware.gzip import GZipMiddleware
import logging
from database import ensure_table_exists
from schemas import URLRequest, URLResponse
from services.url_checker import check_url
from config import MESSAGE_CODES, DATABASE_URL

environment = os.getenv("ENVIRONMENT", "development")
api_router = APIRouter(prefix="/api/v1")

if environment == "development":
    origins = ["http://localhost:3000", "http://127.0.0.1:3000", "http://frontend:3000"]
else:
    origins = os.getenv("ALLOWED_ORIGINS", "").split(",")

logging.basicConfig(level=logging.INFO)
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

if environment == "development":
    allowed_hosts = ["localhost", "127.0.0.1", "frontend", "backend", "0.0.0.0"]
else:
    allowed_hosts = ["leftclicksec.org", "www.leftclicksec.org", "api.leftclicksec.org"]

app.add_middleware(TrustedHostMiddleware, allowed_hosts=allowed_hosts)

app.add_middleware(GZipMiddleware, minimum_size=1000)

print(f"🔗 Database URL: {DATABASE_URL.replace('password', '***')}")


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


@app.get("/health")
async def health_check():
    try:
        from database import async_session
        from sqlalchemy import text

        async with async_session() as session:
            await session.execute(text("SELECT 1"))
        return {"status": "healthy", "database": "connected"}
    except Exception as e:
        return {"status": "unhealthy", "database": "disconnected", "error": str(e)}


@api_router.post("/check", response_model=URLResponse)
async def check_url_endpoint(request: URLRequest):
    try:
        return await check_url(request.url)
    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail={
                "success": False,
                "messages": {
                    "type": "error",
                    "code": "ERR_INVALID_URL",
                    "message": str(e),
                },
            },
        )
    except Exception as e:
        logging.error(f"An error occurred: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail={
                "success": False,
                "messages": {
                    "type": "error",
                    "code": "ERR_SERVER",
                    "message": MESSAGE_CODES["error"]["ERR_SERVER"],
                },
            },
        )


app.include_router(api_router, prefix="/api/v1")
