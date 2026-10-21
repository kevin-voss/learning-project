# Step 14 solution: Compose and observing

These are the files that are **new or changed** in step 14. Paths are relative to `applications/parcelpilot-services/`. Every file not listed stays as it was after step 13. Try the step on your own first, then compare.

| File | What changed |
|---|---|
| [compose.yaml](compose.yaml) | **new**: two databases, RabbitMQ, both services, health checks, volumes |

## parcel-service

| File | What changed |
|---|---|
| [pom.xml](parcel-service/pom.xml) | `spring-boot-starter-actuator` |
| [application.properties](parcel-service/src/main/resources/application.properties) | exposes `health` and `metrics`, shows health details |
| [RequestIdFilter.java](parcel-service/src/main/java/com/parcelpilot/RequestIdFilter.java) | `@Order(Ordered.HIGHEST_PRECEDENCE)`: the id exists before any other filter runs |
| [RabbitNotifier.java](parcel-service/src/main/java/com/parcelpilot/parcel/internal/RabbitNotifier.java) | copies the request id into the `correlationId` message header |
| [RabbitNotifierTest.java](parcel-service/src/test/java/com/parcelpilot/RabbitNotifierTest.java) | **new**: unit test for the header (no Docker) |
| [HealthEndpointTest.java](parcel-service/src/test/java/com/parcelpilot/HealthEndpointTest.java) | **new**: `/actuator/health` is `UP` with `db` and `rabbit` |

## notification-service

| File | What changed |
|---|---|
| [pom.xml](notification-service/pom.xml) | `spring-boot-starter-web` and `spring-boot-starter-actuator` |
| [application.properties](notification-service/src/main/resources/application.properties) | `server.port=8081`, exposes `health` and `metrics` |
| [ParcelDeliveredListener.java](notification-service/src/main/java/com/parcelpilot/notification/ParcelDeliveredListener.java) | reads the `correlationId` header into the MDC, cleans up in `finally` |

## Check that it works

```bash
cd applications/parcelpilot-services
(cd parcel-service && mvn test)
(cd notification-service && mvn test)
docker compose up --build -d
docker compose ps
curl -s http://localhost:8080/actuator/health
```

Back to [step 14](../README.md).
