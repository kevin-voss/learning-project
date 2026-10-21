-- Who may log in. Passwords are stored ONLY as salted bcrypt hashes.
CREATE TABLE operators (
    username      VARCHAR(64)  PRIMARY KEY,
    password_hash VARCHAR(100) NOT NULL,
    role          VARCHAR(32)  NOT NULL
);

-- Local practice users. Both passwords are "local-password".
-- Never seed real accounts in a migration.
INSERT INTO operators (username, password_hash, role) VALUES
    ('operator', '$2a$10$ag/mhGSiF5yZwMFf/22vDemJ0wONGeoznPdASt4k7FhY2UXKe6sxu', 'OPERATOR'),
    ('ava',      '$2a$10$JIrG/WTcC2UbIjZGiCJqM.FsaDrThyt2.cdR2CgRvEHznlZ95SuiG', 'CUSTOMER');
