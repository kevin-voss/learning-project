package com.parcelpilot.notification;

import org.junit.jupiter.api.Test;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
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
class ParcelDeliveredListenerTest {

    @Autowired
    RabbitTemplate rabbit;

    @Autowired
    JdbcTemplate jdbc;

    @Test
    void anEventSentTwice_givesOneNotification() {
        ParcelDelivered event = new ParcelDelivered(UUID.randomUUID(), "P-N1", "Ava", Instant.now());

        // act like parcel-service, and like a broker that redelivers
        rabbit.convertAndSend(MessagingConfig.PARCEL_DELIVERED_QUEUE, event);
        rabbit.convertAndSend(MessagingConfig.PARCEL_DELIVERED_QUEUE, event);

        await().atMost(Duration.ofSeconds(10))
                .untilAsserted(() -> assertThat(notificationsFor("P-N1")).isEqualTo(1));
        // give a late duplicate a moment, then check again: still exactly one
        await().pollDelay(Duration.ofSeconds(1)).untilAsserted(
                () -> assertThat(notificationsFor("P-N1")).isEqualTo(1));
    }

    private int notificationsFor(String parcelId) {
        return jdbc.queryForObject(
                "SELECT count(*) FROM notifications WHERE parcel_id = ?", Integer.class, parcelId);
    }
}
