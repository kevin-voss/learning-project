-- Notifications now live in notification-service's own database.
-- parcel-service no longer owns this table.
DROP TABLE notifications;
