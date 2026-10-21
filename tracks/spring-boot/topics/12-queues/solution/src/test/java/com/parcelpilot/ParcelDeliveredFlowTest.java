package com.parcelpilot;

import com.parcelpilot.notification.internal.ParcelDeliveredListener;
import com.parcelpilot.parcel.ParcelDelivered;
import com.parcelpilot.parcel.internal.CreateParcelRequest;
import com.parcelpilot.parcel.internal.ParcelService;
import com.parcelpilot.parcel.internal.Status;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.jdbc.core.JdbcTemplate;

import java.time.Duration;
import java.time.Instant;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.awaitility.Awaitility.await;

@SpringBootTest
@Import(TestcontainersConfiguration.class)
class ParcelDeliveredFlowTest {

    @Autowired
    ParcelService parcels;

    @Autowired
    ParcelDeliveredListener listener;

    @Autowired
    JdbcTemplate jdbc;

    @Test
    void deliveringAParcel_leadsToExactlyOneNotification() {
        parcels.create(new CreateParcelRequest("P-Q1", "Ava"));
        parcels.changeStatus("P-Q1", Status.PICKED_UP);
        parcels.changeStatus("P-Q1", Status.DELIVERED);

        // the listener runs on another thread, a moment later: wait for it
        await().atMost(Duration.ofSeconds(10))
                .untilAsserted(() -> assertThat(notificationsFor("P-Q1")).isEqualTo(1));
    }

    @Test
    void theSameEventTwice_isHandledOnlyOnce() {
        ParcelDelivered event = new ParcelDelivered(UUID.randomUUID(), "P-Q2", "Ben", Instant.now());

        listener.handle(event);
        listener.handle(event);   // a redelivered duplicate

        assertThat(notificationsFor("P-Q2")).isEqualTo(1);
    }

    private int notificationsFor(String parcelId) {
        return jdbc.queryForObject(
                "SELECT count(*) FROM notifications WHERE parcel_id = ?", Integer.class, parcelId);
    }
}
