package com.parcelpilot.parcel;

import java.time.Instant;
import java.util.UUID;

/**
 * Event: a parcel WAS delivered (past tense = a fact).
 * eventId is new in step 12: it lets the consumer spot a message it has already handled.
 */
public record ParcelDelivered(UUID eventId, String parcelId, String recipient, Instant occurredAt) {}
