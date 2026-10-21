package com.parcelpilot;

import com.parcelpilot.parcel.ParcelDelivered;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.json.JsonTest;
import org.springframework.boot.test.json.JacksonTester;
import org.springframework.boot.test.json.JsonContent;

import java.time.Instant;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;

/** Producer side of the contract: the JSON we send must keep these names and types. */
@JsonTest
class ParcelDeliveredContractTest {

    @Autowired
    JacksonTester<ParcelDelivered> json;

    @Test
    void eventJson_hasTheAgreedFieldNames() throws Exception {
        ParcelDelivered event = new ParcelDelivered(
                UUID.fromString("11111111-1111-1111-1111-111111111111"),
                "P-7", "Ava", Instant.parse("2026-07-14T16:22:31Z"));

        JsonContent<ParcelDelivered> written = json.write(event);

        assertThat(written).extractingJsonPathStringValue("$.eventId")
                .isEqualTo("11111111-1111-1111-1111-111111111111");
        assertThat(written).extractingJsonPathStringValue("$.parcelId").isEqualTo("P-7");
        assertThat(written).extractingJsonPathStringValue("$.recipient").isEqualTo("Ava");
        assertThat(written).extractingJsonPathStringValue("$.occurredAt").isEqualTo("2026-07-14T16:22:31Z");
    }
}
