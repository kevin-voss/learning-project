package com.parcelpilot.notification.internal;

import com.parcelpilot.messaging.MessagingConfig;
import com.parcelpilot.parcel.ParcelDelivered;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

/** The worker at the end of the belt. Safe to call twice with the same event. */
@Component
public class ParcelDeliveredListener {

    private static final Logger log = LoggerFactory.getLogger(ParcelDeliveredListener.class);
    private final JdbcTemplate jdbc;

    public ParcelDeliveredListener(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    @RabbitListener(queues = MessagingConfig.PARCEL_DELIVERED_QUEUE)
    public void handle(ParcelDelivered event) {
        // Record first, act second. 1 row = first time we see this event, 0 rows = duplicate.
        int inserted = jdbc.update("""
                INSERT INTO notifications (event_id, parcel_id)
                VALUES (?, ?) ON CONFLICT (event_id) DO NOTHING
                """, event.eventId(), event.parcelId());

        if (inserted == 0) {
            log.info("Duplicate event {} for parcel {}, skipping", event.eventId(), event.parcelId());
            return; // returning normally = ack, the duplicate leaves the queue
        }

        // the "slow work": a real app would call an email or SMS provider here
        log.info("notification sent for {} to {}", event.parcelId(), event.recipient());
    }
}
