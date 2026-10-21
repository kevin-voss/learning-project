-- The parcels table. Run it inside psql (see step-by-step.md, step 3).
-- Same fields as ParcelPilot in the Spring Boot course, plus a tracking code people can read.

CREATE TABLE parcels (
    id            SERIAL       PRIMARY KEY,
    tracking_code VARCHAR(20)  NOT NULL UNIQUE,
    recipient     VARCHAR(255) NOT NULL,
    status        VARCHAR(32)  NOT NULL DEFAULT 'CREATED'
);

INSERT INTO parcels (tracking_code, recipient) VALUES ('PP-1001', 'Ava');
INSERT INTO parcels (tracking_code, recipient) VALUES ('PP-1002', 'Ben');
