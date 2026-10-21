-- One row per handled event. The primary key makes a second insert impossible.
CREATE TABLE notifications (
    event_id     UUID PRIMARY KEY,
    parcel_id    VARCHAR(64) NOT NULL,
    processed_at TIMESTAMP   NOT NULL DEFAULT now()
);
