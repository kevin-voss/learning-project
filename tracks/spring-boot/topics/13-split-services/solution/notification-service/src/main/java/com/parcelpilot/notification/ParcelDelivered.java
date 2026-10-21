package com.parcelpilot.notification;

import java.time.Instant;
import java.util.UUID;

/**
 * notification-service's OWN copy of the event. It matches the contract
 * (field names and types), not parcel-service's Java class.
 */
public record ParcelDelivered(UUID eventId, String parcelId, String recipient, Instant occurredAt) {}
