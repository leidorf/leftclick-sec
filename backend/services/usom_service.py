import httpx
import logging
from config import USOM_API_URL

async def check_usom(domain):
    try:
        params = {"q": domain}
        async with httpx.AsyncClient() as client:
            response = await client.get(USOM_API_URL, params=params, timeout=10.0)

        if response.status_code == 200:
            usom_data = response.json()
            return next(
                (entry for entry in usom_data.get("models", []) if entry.get("url") == domain),
                None,
            )
    except Exception as e:
        logging.warning(f"USOM API check failed: {e}")
    return None