import logging
from predict import predict
from database import async_session, suspicious_domains
from sqlalchemy import text

async def get_prediction_result(domain):
    try:
        prediction_result = predict(domain)
        phishing_score = prediction_result.get("phishing_score", 0)

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

        if phishing_score >= 50:
            await insert_suspicious_domain(domain, risk_level, phishing_score)

        return {
            "risk_level": risk_level,
            "message_code": message_code,
            "message_type": message_type,
            "phishing_score": phishing_score
        }
    except Exception as e:
        logging.error(f"Model prediction failed: {e}")
        raise e

async def insert_suspicious_domain(domain, risk_level, phishing_score):
    try:
        async with async_session() as session:
            db_query = """
                INSERT INTO suspicious_domains (domain, reason, date_added) 
                VALUES (:domain, :reason, NOW())
            """
            reason = f"The link considered {risk_level} (%{phishing_score:.2f}) by Prediction Model"
            params = {"domain": domain, "reason": reason}
            await session.execute(text(db_query), params)
            await session.commit()
    except Exception as e:
        logging.warning(f"Failed to insert into suspicious_domains: {e}")