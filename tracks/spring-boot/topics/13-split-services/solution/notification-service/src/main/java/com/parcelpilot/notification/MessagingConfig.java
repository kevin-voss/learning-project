package com.parcelpilot.notification;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.QueueBuilder;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MessagingConfig {

    public static final String PARCEL_DELIVERED_QUEUE = "parcel-delivered";
    public static final String PARCEL_DELIVERED_DLQ = "parcel-delivered.dlq";

    /** The conveyor belt. Messages that fail too often slide into the dead-letter bin. */
    @Bean
    Queue parcelDeliveredQueue() {
        return QueueBuilder.durable(PARCEL_DELIVERED_QUEUE)
                .withArgument("x-dead-letter-exchange", "")
                .withArgument("x-dead-letter-routing-key", PARCEL_DELIVERED_DLQ)
                .build();
    }

    /** The "dead letters" bin: kept for a human to inspect and replay. */
    @Bean
    Queue parcelDeliveredDeadLetterQueue() {
        return QueueBuilder.durable(PARCEL_DELIVERED_DLQ).build();
    }

    /** Send events as readable JSON (not Java bytes), using Spring's ObjectMapper. */
    @Bean
    MessageConverter jsonMessageConverter(ObjectMapper objectMapper) {
        return new Jackson2JsonMessageConverter(objectMapper);
    }
}
