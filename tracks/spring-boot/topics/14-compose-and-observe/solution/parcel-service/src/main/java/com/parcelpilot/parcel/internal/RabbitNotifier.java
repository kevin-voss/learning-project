package com.parcelpilot.parcel.internal;

import com.parcelpilot.messaging.MessagingConfig;
import com.parcelpilot.parcel.Notifier;
import com.parcelpilot.parcel.ParcelDelivered;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.MDC;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Component;

/** Adapter: implements the parcel module's Notifier port by putting the event on the queue. */
@Component
public class RabbitNotifier implements Notifier {

    public static final String CORRELATION_HEADER = "correlationId";

    private static final Logger log = LoggerFactory.getLogger(RabbitNotifier.class);
    private final RabbitTemplate rabbit;

    public RabbitNotifier(RabbitTemplate rabbit) {
        this.rabbit = rabbit;
    }

    @Override
    public void parcelDelivered(ParcelDelivered event) {
        String correlationId = MDC.get("requestId");   // set by RequestIdFilter
        rabbit.convertAndSend(MessagingConfig.PARCEL_DELIVERED_QUEUE, event, message -> {
            if (correlationId != null) {
                // a header travels next to the JSON, so the event contract stays the same
                message.getMessageProperties().setHeader(CORRELATION_HEADER, correlationId);
            }
            return message;
        });
        log.info("Published ParcelDelivered for {} (eventId {})", event.parcelId(), event.eventId());
    }
}
