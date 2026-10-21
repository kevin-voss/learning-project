package com.parcelpilot.parcel.internal;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

/**
 * version (new in step 15, optional): the version the client last saw.
 * If the parcel changed since then, the update is refused with 409.
 */
public record UpdateStatusRequest(
        @NotBlank(message = "status must not be blank")
        @Pattern(regexp = "CREATED|PICKED_UP|DELIVERED",
                 message = "status must be one of CREATED, PICKED_UP, DELIVERED")
        String status,
        Long version
) {}
