-- notification-service owns this table, in its own database.
CREATE TABLE notifications (
    event_id     UUID PRIMARY KEY,
    parcel_id    VARCHAR(64) NOT NULL,
    processed_at TIMESTAMP   NOT NULL DEFAULT now()
);
