package com.parcelpilot.parcel.internal;

/** version is new in step 15: the number on the parcel label. Send it back when you change the parcel. */
public record ParcelResponse(String id, String recipient, String status, long version) {}
