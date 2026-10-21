package com.parcelpilot.notification;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.json.JsonTest;
import org.springframework.boot.test.json.JacksonTester;

import java.time.Instant;

import static org.assertj.core.api.Assertions.assertThat;

/** Consumer side of the contract: we can read what parcel-service sends, even with extra fields. */
@JsonTest
class ParcelDeliveredContractTest {

    @Autowired
    JacksonTester<ParcelDelivered> json;

    @Test
    void readsTheAgreedJson_andIgnoresUnknownFields() throws Exception {
        String fromParcelService = """
                {"eventId":"11111111-1111-1111-1111-111111111111",
                 "parcelId":"P-7","recipient":"Ava",
                 "occurredAt":"2026-07-14T16:22:31Z",
                 "addedLater":"consumers must ignore this"}
                """;

        ParcelDelivered event = json.parseObject(fromParcelService);

        assertThat(event.parcelId()).isEqualTo("P-7");
        assertThat(event.recipient()).isEqualTo("Ava");
        assertThat(event.occurredAt()).isEqualTo(Instant.parse("2026-07-14T16:22:31Z"));
    }
}
