import tldextract
from urllib.parse import urlparse

def get_root_domain(url):
    extracted = tldextract.extract(url)
    return f"{extracted.domain}.{extracted.suffix}"

def parse_domain(url):
    parsed_url = urlparse(url)
    domain = parsed_url.netloc if parsed_url.netloc else parsed_url.path
    root_domain = get_root_domain(domain)
    return domain, root_domain