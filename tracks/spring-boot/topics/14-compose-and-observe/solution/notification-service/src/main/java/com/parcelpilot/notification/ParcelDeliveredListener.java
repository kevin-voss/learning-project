package com.parcelpilot.notification;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.MDC;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.messaging.handler.annotation.Header;
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
    public void handle(ParcelDelivered event,
                       @Header(name = "correlationId", required = false) String correlationId) {
        // same MDC key as parcel-service, so both logs show the same [id]
        MDC.put("requestId", correlationId != null ? correlationId : "no-correlation-id");
        try {
            log.info("Received ParcelDelivered for {} (eventId {})", event.parcelId(), event.eventId());

            // Record first, act second. 1 row = first time, 0 rows = duplicate.
            int inserted = jdbc.update("""
                    INSERT INTO notifications (event_id, parcel_id)
                    VALUES (?, ?) ON CONFLICT (event_id) DO NOTHING
                    """, event.eventId(), event.parcelId());

            if (inserted == 0) {
                log.info("Duplicate event {} for parcel {}, skipping", event.eventId(), event.parcelId());
                return;
            }
            log.info("notification sent for {} to {}", event.parcelId(), event.recipient());
        } finally {
            MDC.remove("requestId");   // listener threads are reused: always clean up
        }
    }
}
