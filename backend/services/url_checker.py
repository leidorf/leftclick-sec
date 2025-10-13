import logging
from database import async_session
from sqlalchemy import text
from .usom_service import check_usom
from .prediction_service import get_prediction_result
from utils.url_utils import parse_domain
from config import MESSAGE_CODES

async def check_url(url):
    domain, root_domain = parse_domain(url)
    
    if not domain:
        raise ValueError("Invalid URL format")

    # Check USOM
    suspicious_entry = await check_usom(domain)
    if suspicious_entry:
        return create_response("warning", "URL_MALICIOUS", "suspicious", domain, "USOM API", details=suspicious_entry)

    # Check Whitelist
    if await check_whitelist(root_domain):
        return create_response("success", "URL_WHITELISTED", "whitelisted", root_domain, "Whitelist")

    # Check Blacklist
    blacklist_result = await check_blacklist(domain)
    if blacklist_result:
        return create_response("warning", "URL_BLACKLISTED", "suspicious", domain, "Blacklist", details=blacklist_result)

    # Use Prediction Model
    prediction = await get_prediction_result(domain)
    return create_response(
        prediction["message_type"],
        prediction["message_code"],
        prediction["risk_level"],
        domain,
        "Prediction Model",
        phishing_score=prediction["phishing_score"],
        progress=["Checked USOM", "Checked whitelist", "Checked blacklist"]
    )

async def check_whitelist(domain):
    try:
        async with async_session() as session:
            query = "SELECT 1 FROM whitelist_domains WHERE domain = :domain LIMIT 1"
            result = await session.execute(text(query), {"domain": domain})
            return result.scalar()
    except Exception as e:
        logging.warning(f"Whitelist check failed: {e}")
        return False

async def check_blacklist(domain):
    try:
        async with async_session() as session:
            query = "SELECT * FROM suspicious_domains WHERE domain = :domain"
            result = await session.execute(text(query), {"domain": domain})
            rows = result.fetchall()
            if rows:
                return [
                    {
                        "id": row[0],
                        "domain": row[1],
                        "reason": row[2],
                        "date_added": row[3],
                    }
                    for row in rows
                ]
    except Exception as e:
        logging.warning(f"Blacklist check failed: {e}")
    return None

def create_response(message_type, code, result, domain, source, details=None, phishing_score=None, progress=None):
    response = {
        "success": True,
        "messages": {
            "type": message_type,
            "code": code,
            "message": MESSAGE_CODES[message_type][code],
        },
        "data": {
            "result": result,
            "domain": domain,
            "source": source,
        },
        "progress": progress or [],
    }
    
    if details:
        response["data"]["details"] = details
    if phishing_score is not None:
        response["data"]["phishing_score"] = phishing_score
        
    return response