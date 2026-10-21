# Step 13 solution: two services

These are the files that are **new or changed** in step 13. Paths are relative to `applications/parcelpilot-services/`. Try the step on your own first, then compare.

## parcel-service (copy of the step-12 monolith)

| File | What changed |
|---|---|
| [pom.xml](parcel-service/pom.xml) | `artifactId` is now `parcel-service` |
| [application.properties](parcel-service/src/main/resources/application.properties) | `spring.application.name=parcel-service` |
| [V3__drop_notifications.sql](parcel-service/src/main/resources/db/migration/V3__drop_notifications.sql) | **new**: the table moves to notification-service |
| [ParcelEventsTest.java](parcel-service/src/test/java/com/parcelpilot/ParcelEventsTest.java) | **new**: delivering a parcel puts one event on the queue |
| [ParcelDeliveredContractTest.java](parcel-service/src/test/java/com/parcelpilot/ParcelDeliveredContractTest.java) | **new**: producer side of the JSON contract |

**Deleted:** the whole `src/main/java/com/parcelpilot/notification/` folder and `src/test/java/com/parcelpilot/ParcelDeliveredFlowTest.java`. The `Dockerfile` is the one from step 09.

## notification-service (new)

| File | What it is |
|---|---|
| [pom.xml](notification-service/pom.xml) | AMQP, JSON, JDBC, PostgreSQL, Flyway; tests with Testcontainers |
| [Dockerfile](notification-service/Dockerfile) | the step-09 Dockerfile, port 8081 |
| [application.properties](notification-service/src/main/resources/application.properties) | its own database, the same broker, the retry settings |
| [V1__create_notifications.sql](notification-service/src/main/resources/db/migration/V1__create_notifications.sql) | the `notifications` table, now owned here |
| [NotificationServiceApplication.java](notification-service/src/main/java/com/parcelpilot/notification/NotificationServiceApplication.java) | entry point |
| [ParcelDelivered.java](notification-service/src/main/java/com/parcelpilot/notification/ParcelDelivered.java) | its own copy of the event (matches the contract) |
| [MessagingConfig.java](notification-service/src/main/java/com/parcelpilot/notification/MessagingConfig.java) | identical queue declarations |
| [ParcelDeliveredListener.java](notification-service/src/main/java/com/parcelpilot/notification/ParcelDeliveredListener.java) | the listener from step 12, new package |
| [TestcontainersConfiguration.java](notification-service/src/test/java/com/parcelpilot/notification/TestcontainersConfiguration.java) | PostgreSQL and RabbitMQ for tests |
| [ParcelDeliveredContractTest.java](notification-service/src/test/java/com/parcelpilot/notification/ParcelDeliveredContractTest.java) | consumer side of the JSON contract |
| [ParcelDeliveredListenerTest.java](notification-service/src/test/java/com/parcelpilot/notification/ParcelDeliveredListenerTest.java) | the same event twice gives one row |

## Check that it works

```bash
cd applications/parcelpilot-services
(cd parcel-service && mvn test)
(cd notification-service && mvn test)
```

Both end with `BUILD SUCCESS` (Docker must be running).

Back to [step 13](../README.md).
