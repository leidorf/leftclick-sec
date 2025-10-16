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

# ----------------------------------- Environment configuration ---------------------------------- #
environment = os.getenv("ENVIRONMENT", "development")
allowed_hosts_str = os.getenv("ALLOWED_HOSTS", "*")
origins_str = os.getenv("ALLOWED_ORIGINS", "*")

# ------------------------------------ Parse hosts and origins ----------------------------------- #
allowed_hosts = [h.strip() for h in allowed_hosts_str.split(",") if h.strip()]
origins = [o.strip() for o in origins_str.split(",") if o.strip()]

# ------------------------------------- Logging configuration ------------------------------------ #
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# -------------------------------------- Initialize FastAPI -------------------------------------- #
app = FastAPI(
    title="LeftClick Sec API",
    version="1.0.0",
    docs_url="/api/v1/docs" if environment == "development" else None,  # Prod'da docs kapalı
    redoc_url="/api/v1/redoc" if environment == "development" else None,
)

# ------------------------------------------ API Router ------------------------------------------ #
api_router = APIRouter()

# ------------------------------------------ Middleware ------------------------------------------ #
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

if environment == "production":
    app.add_middleware(TrustedHostMiddleware, allowed_hosts=allowed_hosts)

app.add_middleware(GZipMiddleware, minimum_size=1000)

# ----------------------------------------- Startup event ---------------------------------------- #
@app.on_event("startup")
async def startup_event():
    logger.info("🔧 Starting backend application...")
    logger.info(f"📍 Environment: {environment}")
    logger.info(f"🌐 Allowed Origins: {origins}")
    logger.info(f"🔗 Database URL: {DATABASE_URL.split('@')[1] if '@' in DATABASE_URL else 'configured'}")
    
    try:
        await ensure_table_exists()
        logger.info("✅ Database tables ready")
    except Exception as e:
        logger.error(f"❌ Startup failed: {e}")
        if environment == "development":
            raise

# ----------------------------------------- Root endpoint ---------------------------------------- #
@app.get("/")
def read_root():
    return {
        "message": "LeftClick Sec Backend is Running",
        "version": "1.0.0",
        "environment": environment
    }

# ------------------------------------- Health check endpoint ------------------------------------ #
@app.get("/health")
async def health_check():
    """Health check endpoint for monitoring and load balancers"""
    try:
        from database import async_session
        from sqlalchemy import text
        
        async with async_session() as session:
            await session.execute(text("SELECT 1"))
        
        return {
            "status": "healthy",
            "database": "connected",
            "environment": environment
        }
    except Exception as e:
        logger.error(f"Health check failed: {e}")
        return {
            "status": "unhealthy",
            "database": "disconnected",
            "error": str(e)
        }

# ------------------------------------------ API Routes ------------------------------------------ #
@api_router.post("/check", response_model=URLResponse)
async def check_url_endpoint(request: URLRequest):
    """Check if a URL is safe or malicious"""
    try:
        logger.info(f"Checking URL: {request.url}")
        result = await check_url(request.url)
        return result
    except ValueError as e:
        logger.warning(f"Invalid URL: {request.url} - {str(e)}")
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
        logger.error(f"Error checking URL {request.url}: {str(e)}", exc_info=True)
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

# -------------------------------------- Include API router -------------------------------------- #
app.include_router(api_router, prefix="/api/v1")