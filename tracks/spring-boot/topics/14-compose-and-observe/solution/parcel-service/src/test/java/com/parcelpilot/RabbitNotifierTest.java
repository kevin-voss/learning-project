package com.parcelpilot;

import com.parcelpilot.messaging.MessagingConfig;
import com.parcelpilot.parcel.ParcelDelivered;
import com.parcelpilot.parcel.internal.RabbitNotifier;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.slf4j.MDC;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.core.MessagePostProcessor;
import org.springframework.amqp.core.MessageProperties;
import org.springframework.amqp.rabbit.core.RabbitTemplate;

import java.time.Instant;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;

/** Plain unit test: no Spring, no Docker. Does the request id ride along as a header? */
class RabbitNotifierTest {

    @AfterEach
    void cleanUp() {
        MDC.clear();
    }

    @Test
    void publishedMessage_carriesTheRequestIdAsCorrelationHeader() {
        RabbitTemplate rabbit = mock(RabbitTemplate.class);
        RabbitNotifier notifier = new RabbitNotifier(rabbit);
        ParcelDelivered event = new ParcelDelivered(UUID.randomUUID(), "P-7", "Ava", Instant.now());
        MDC.put("requestId", "req-42");   // what RequestIdFilter does for a real request

        notifier.parcelDelivered(event);

        ArgumentCaptor<MessagePostProcessor> postProcessor = ArgumentCaptor.forClass(MessagePostProcessor.class);
        verify(rabbit).convertAndSend(eq(MessagingConfig.PARCEL_DELIVERED_QUEUE), eq(event), postProcessor.capture());

        Message message = postProcessor.getValue().postProcessMessage(new Message(new byte[0], new MessageProperties()));
        assertThat((String) message.getMessageProperties().getHeader("correlationId")).isEqualTo("req-42");
    }
}
