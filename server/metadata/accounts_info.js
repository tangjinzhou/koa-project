const sql = `CREATE TABLE IF NOT EXISTS accounts_info (
  id INT NOT NULL AUTO_INCREMENT,
  account_id INT NOT NULL,
  account_name VARCHAR(40) NOT NULL,
  account_email VARCHAR(40),
  deleted BOOL DEFAULT false,
  add_date DATE,
  PRIMARY KEY (id),
  INDEX (account_id, account_name, account_email)
)`