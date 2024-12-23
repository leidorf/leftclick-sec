import re
import pandas as pd
import pickle

with open("./model/scaler.pkl", "rb") as f:
    scaler = pickle.load(f)

with open("./model/encoder.pkl", "rb") as f:
    encoder = pickle.load(f)

with open("./model/random-forest.pkl", "rb") as f:
    loaded_model = pickle.load(f)

with open("./model/feature_names.pkl", "rb") as f:
    feature_names = pickle.load(f)

def extract_features(domain):

    tld_match = re.search(r"\.([a-zA-Z]{2,})$", domain)
    tld = tld_match.group(1) if tld_match else "unknown"

    domain_parts = domain.split(".")
    main_domain = domain_parts[0] if len(domain_parts) > 0 else ""
    subdomains = domain_parts[:-2] if len(domain_parts) > 2 else []

    domain_length = len(domain)
    domain_digit_count = sum(c.isdigit() for c in domain)
    subdomain_count = len(subdomains)

    return {
        "domain_length": domain_length,
        "domain_digit_count": domain_digit_count,
        "subdomain_count": subdomain_count,
        "tld": tld
    }

def predict(domain):
    """
    Predict phishing score for a given domain.
    """
    try:
        features = extract_features(domain)
        data = pd.DataFrame([features])

        tld_encoded = encoder.transform(data[["tld"]])
        tld_encoded_df = pd.DataFrame(tld_encoded, columns=encoder.get_feature_names_out(["tld"]))
        data = pd.concat([data.drop("tld", axis=1), tld_encoded_df], axis=1)

        data = data.reindex(columns=feature_names, fill_value=0)

        data = data.astype(float)

        data = data[feature_names]

        probabilities = loaded_model.predict_proba(data)
        phishing_score = probabilities[0][1] * 100

        return {"domain": domain, "phishing_score": phishing_score}
    except Exception as e:
        return {"error": str(e)}

print(predict("google.com"))