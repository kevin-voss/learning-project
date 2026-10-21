# Step 12 solution: queues

These are the files that are **new or changed** in step 12. The paths are the same as in your project `applications/parcelpilot`. Every file you do not see here stays as it was after step 11.

Try the step on your own first. Open a file here when you are stuck, or to compare at the end.

| File | What changed |
|---|---|
| [pom.xml](pom.xml) | `spring-boot-starter-amqp`; test helpers `testcontainers:rabbitmq` and `awaitility` |
| [application.properties](src/main/resources/application.properties) | RabbitMQ address, retries, dead-lettering |
| [V2__create_notifications.sql](src/main/resources/db/migration/V2__create_notifications.sql) | the table that remembers handled events |
| [ParcelDelivered.java](src/main/java/com/parcelpilot/parcel/ParcelDelivered.java) | new first field `eventId` |
| [ParcelService.java](src/main/java/com/parcelpilot/parcel/internal/ParcelService.java) | `saveAndFlush`, then publish the event with a fresh `eventId` |
| [RabbitNotifier.java](src/main/java/com/parcelpilot/parcel/internal/RabbitNotifier.java) | **new**: the producer, implements `Notifier` |
| [MessagingConfig.java](src/main/java/com/parcelpilot/messaging/MessagingConfig.java) | **new**: the queue, the dead-letter queue, JSON messages |
| [ParcelDeliveredListener.java](src/main/java/com/parcelpilot/notification/internal/ParcelDeliveredListener.java) | **new**: the idempotent consumer |
| [TestcontainersConfiguration.java](src/test/java/com/parcelpilot/TestcontainersConfiguration.java) | **new**: real PostgreSQL and RabbitMQ for tests |
| [ParcelDeliveredFlowTest.java](src/test/java/com/parcelpilot/ParcelDeliveredFlowTest.java) | **new**: deliver a parcel, expect exactly one notification |

**Deleted:** `src/main/java/com/parcelpilot/notification/LoggingNotifier.java` (the listener does its job now).

## Check that it works

```bash
cd applications/parcelpilot
mvn test        # Docker must be running: Testcontainers starts PostgreSQL and RabbitMQ
```

You should see `BUILD SUCCESS`, and in the log `notification sent for P-Q1 to Ava` once and `Duplicate event … for parcel P-Q2, skipping` once.

Back to [step 12](../README.md).
