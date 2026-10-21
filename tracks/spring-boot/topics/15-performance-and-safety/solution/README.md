# Step 15 solution: cache, version checks, rate limit

These are the files that are **new or changed** in step 15. Paths are relative to `applications/parcelpilot-services/`. notification-service does not change. Try the step on your own first, then compare.

| File | What changed |
|---|---|
| [compose.yaml](compose.yaml) | new `redis` service; parcel-service gets `REDIS_HOST` and waits for Redis |

## parcel-service

| File | What changed |
|---|---|
| [pom.xml](parcel-service/pom.xml) | `spring-boot-starter-data-redis`, `spring-boot-starter-cache` |
| [application.properties](parcel-service/src/main/resources/application.properties) | Redis address, `parcelpilot.rate-limit.per-minute` |
| [ParcelCacheConfig.java](parcel-service/src/main/java/com/parcelpilot/parcel/internal/ParcelCacheConfig.java) | **new**: the `parcels` cache, JSON values, 10-minute TTL |
| [ParcelService.java](parcel-service/src/main/java/com/parcelpilot/parcel/internal/ParcelService.java) | `@Cacheable` read, `@CacheEvict` write, explicit version check |
| [ParcelResponse.java](parcel-service/src/main/java/com/parcelpilot/parcel/internal/ParcelResponse.java) | new field `version` |
| [UpdateStatusRequest.java](parcel-service/src/main/java/com/parcelpilot/parcel/internal/UpdateStatusRequest.java) | new optional field `version` |
| [ParcelController.java](parcel-service/src/main/java/com/parcelpilot/parcel/internal/ParcelController.java) | passes `request.version()` on |
| [RateLimitFilter.java](parcel-service/src/main/java/com/parcelpilot/ratelimit/RateLimitFilter.java) | **new**: fixed-window limit per IP, counters in Redis, `429` + `Retry-After` |
| [RateLimitConfig.java](parcel-service/src/main/java/com/parcelpilot/ratelimit/RateLimitConfig.java) | **new**: registers the filter for `/parcels` right after `RequestIdFilter` |
| [TestcontainersConfiguration.java](parcel-service/src/test/java/com/parcelpilot/TestcontainersConfiguration.java) | adds a Redis container |
| [ParcelCacheAndLockTest.java](parcel-service/src/test/java/com/parcelpilot/ParcelCacheAndLockTest.java) | **new**: cache fill and evict, `409` on an old version |
| [RateLimitFilterTest.java](parcel-service/src/test/java/com/parcelpilot/RateLimitFilterTest.java) | **new**: request 21 gets `429` |
| [ParcelEventsTest.java](parcel-service/src/test/java/com/parcelpilot/ParcelEventsTest.java) | `changeStatus` has a third argument now |

`GlobalErrorHandler` does not change: it maps `ObjectOptimisticLockingFailureException` to `409 VERSION_CONFLICT` since step 10.

## Check that it works

```bash
cd applications/parcelpilot-services/parcel-service
mvn test
```

Back to [step 15](../README.md).
