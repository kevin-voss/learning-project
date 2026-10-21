package com.parcelpilot;

import com.parcelpilot.messaging.MessagingConfig;
import com.parcelpilot.parcel.ParcelDelivered;
import com.parcelpilot.parcel.internal.CreateParcelRequest;
import com.parcelpilot.parcel.internal.ParcelService;
import com.parcelpilot.parcel.internal.Status;
import org.junit.jupiter.api.Test;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.core.ParameterizedTypeReference;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Import(TestcontainersConfiguration.class)
class ParcelEventsTest {

    @Autowired
    ParcelService parcels;

    @Autowired
    RabbitTemplate rabbit;

    @Test
    void deliveringAParcel_putsOneParcelDeliveredOnTheQueue() {
        parcels.create(new CreateParcelRequest("P-E1", "Ava"));
        parcels.changeStatus("P-E1", Status.PICKED_UP, null);
        parcels.changeStatus("P-E1", Status.DELIVERED, null);

        // nobody consumes in this service any more, so we can take the message ourselves
        ParcelDelivered event = rabbit.receiveAndConvert(
                MessagingConfig.PARCEL_DELIVERED_QUEUE, 5_000,
                new ParameterizedTypeReference<ParcelDelivered>() {});

        assertThat(event).isNotNull();
        assertThat(event.parcelId()).isEqualTo("P-E1");
        assertThat(event.eventId()).isNotNull();
    }
}
