CREATE TABLE IF NOT EXISTS suspicious_domains (
    id INT AUTO_INCREMENT PRIMARY KEY,
    domain VARCHAR(255) NOT NULL UNIQUE,
    reason TEXT,
    date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS whitelist_domains (
    id INT AUTO_INCREMENT PRIMARY KEY,
    domain VARCHAR(255) NOT NULL UNIQUE
);

LOAD DATA INFILE '/var/lib/mysql-files/whitelist.csv'
INTO TABLE whitelist_domains
LINES TERMINATED BY '\n'
(domain);

