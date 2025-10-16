import os
from dotenv import load_dotenv

load_dotenv()

DB_USER = os.getenv("MYSQL_USER", "root")
DB_PASSWORD = os.getenv("MYSQL_PASSWORD", "password")
DB_HOST = os.getenv("MYSQL_HOST", "db")
DB_NAME = os.getenv("MYSQL_DATABASE", "test_db")
DATABASE_URL = f"mysql+asyncmy://{DB_USER}:{DB_PASSWORD}@{DB_HOST}/{DB_NAME}"
USOM_API_URL = "https://www.usom.gov.tr/api/address/index"

MESSAGE_CODES = {
    "error": {
        "ERR_INVALID_URL": "Invalid URL format.",
        "ERR_NETWORK": "Network error, please check your internet connection.",
        "ERR_SERVER": "Server error, please try again later.",
        "ERR_URL_CHECK_FAILED": "URL check failed.",
        "ERR_EMPTY_URL": "Please enter an URL.",
        "ERR_BAD_REQUEST": "Bad request, please try again later.",
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
