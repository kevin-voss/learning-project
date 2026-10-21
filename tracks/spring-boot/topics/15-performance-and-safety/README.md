# Step 15: Caching, version checks and rate limiting

> [!PICTURE]
> Three small things at the depot counter. A **sticky note**: the clerk writes "P-1 is PICKED_UP" on a note, so she does not walk to the warehouse for every customer who asks; when the parcel moves, she tears the note off. A **version number on the parcel label**: every change writes a new number, and a form that brings an old number is sent back. And a **door guard** who lets each visitor in only twenty times a minute.

## The problem right now

The system works, so real pressure arrives. Three different problems need three different tools:

| Problem | Tool | Answer when it bites |
|---|---|---|
| The same parcel is read again and again, and every read hits PostgreSQL | **Cache** in Redis | (faster `200`) |
| Two operators change the same parcel; the second silently overwrites the first | **Version check** (optimistic locking) | `409 Conflict` |
| A broken scanner sends hundreds of requests per second | **Rate limit** | `429 Too Many Requests` |

## Key words

| Word | Beginner meaning |
|---|---|
| **Cache** | A fast, temporary copy of an answer, so slow work is not repeated. |
| **Redis** | A very fast in-memory store, often used as a cache. |
| **Cache-aside** | Look in the cache first; on a **miss**, read the database and write the answer into the cache. |
| **TTL** | Time to live: how long a cache entry may stay. |
| **Invalidation (evict)** | Throwing a cache entry away because the data changed. |
| **Optimistic locking** | Every change bumps a `version`; a change based on an old version is refused. |
| **Rate limiting** | Capping how many requests one client may send per time window. |

Theory homes: caching patterns and their trade-offs in the [architecture track](../../../architecture/index.html); locking in [Locking explained](../10-persistence/locking-explained.md) (step 10).

```mermaid
flowchart LR
  C[curl] --> L[RateLimitFilter: 429 if over the limit]
  L --> A[ParcelController]
  A --> S[ParcelService]
  S -->|@Cacheable read| R[(Redis: sticky notes + counters)]
  S -->|on a miss, and every write| P[(PostgreSQL: the truth + version)]
```

## Build it in parcel-service (do this exactly)

All changes are in `applications/parcelpilot-services/parcel-service`, plus one new service in `compose.yaml`. The full files are in [solution/](solution/README.md).

### 1. Add Redis to Compose

In `compose.yaml`, add a service and tell parcel-service where it is:

```yaml
  redis:
    image: redis:7-alpine
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 5s
      timeout: 3s
      retries: 10
```

Under `parcel-service:`, add `REDIS_HOST: redis` to `environment:` and `redis: {condition: service_healthy}` to `depends_on:` (see the [solution compose.yaml](solution/compose.yaml)).

### 2. Dependencies and settings

`pom.xml`:

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-cache</artifactId>
</dependency>
```

`application.properties`:

```properties
spring.data.redis.host=${REDIS_HOST:localhost}
spring.data.redis.port=6379
parcelpilot.rate-limit.per-minute=${RATE_LIMIT_PER_MINUTE:20}
```

### 3. The sticky notes: a `parcels` cache

Create `parcel/internal/ParcelCacheConfig.java`:

```java
package com.parcelpilot.parcel.internal;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.autoconfigure.cache.RedisCacheManagerBuilderCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.cache.RedisCacheConfiguration;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.RedisSerializationContext.SerializationPair;

import java.time.Duration;

@Configuration
@EnableCaching
public class ParcelCacheConfig {

    /** JSON values in Redis, and every sticky note is thrown away after 10 minutes. */
    @Bean
    RedisCacheManagerBuilderCustomizer parcelsCache(ObjectMapper objectMapper) {
        var json = new Jackson2JsonRedisSerializer<>(objectMapper, ParcelResponse.class);
        return builder -> builder.withCacheConfiguration("parcels",
                RedisCacheConfiguration.defaultCacheConfig()
                        .entryTtl(Duration.ofMinutes(10))
                        .serializeValuesWith(SerializationPair.fromSerializer(json)));
    }
}
```

JSON (instead of Java's binary format) lets you read a cached parcel with `redis-cli`. The TTL is a safety net: even a forgotten eviction heals after 10 minutes.

### 4. The version number on the label

The client must **see** the version and **send it back**. Add it to the two records in `parcel/internal/`:

```java
public record ParcelResponse(String id, String recipient, String status, long version) {}
```

```java
public record UpdateStatusRequest(
        @NotBlank(message = "status must not be blank")
        @Pattern(regexp = "CREATED|PICKED_UP|DELIVERED",
                 message = "status must be one of CREATED, PICKED_UP, DELIVERED")
        String status,
        Long version          // optional: the version the client last saw
) {}
```

In `ParcelController`, pass it on: `service.changeStatus(id, Status.valueOf(request.status()), request.version())`.

### 5. Cache and version check in `ParcelService`

Three changes: `@Cacheable` on the read, `@CacheEvict` on the write, and the version check.

```java
// The sticky note: look in the "parcels" cache first; only on a miss run this method.
@Cacheable(value = "parcels", key = "#id")
@Transactional(readOnly = true)
public ParcelResponse get(String id) {
    return toResponse(load(id));
}

// The parcel changes, so tear off its sticky note. The next read gets fresh data.
@CacheEvict(value = "parcels", key = "#id")
@Transactional
public ParcelResponse changeStatus(String id, Status target, Long expectedVersion) {
    ParcelEntity parcel = load(id);

    // The client says "I saw version 3". If the label now says 4, someone was faster.
    if (expectedVersion != null && expectedVersion != parcel.version()) {
        throw new ObjectOptimisticLockingFailureException(ParcelEntity.class, id);
    }
    switch (target) {
        case PICKED_UP -> parcel.markPickedUp();
        case DELIVERED -> parcel.markDelivered();
        case CREATED -> throw new IllegalStateException("a parcel cannot go back to CREATED");
    }
    // flush now: if another request saved first, @Version makes this throw HERE
    ParcelEntity saved = repository.saveAndFlush(parcel);
    // ... publish ParcelDelivered as in step 12, then:
    return toResponse(saved);
}
```

`toResponse` now also passes `parcel.version()`. `ObjectOptimisticLockingFailureException` comes from `org.springframework.orm`. You do not need a new error handler: step 10 already maps it to `409` with the code `VERSION_CONFLICT`. Two guards now work together:

- the **explicit check** catches a client that read the parcel long ago (a stale screen);
- `@Version` catches two requests that read at the same moment and both pass the check; the second `saveAndFlush` updates 0 rows and throws.

> [!WARN]
> `@Cacheable` and `@CacheEvict` only work when the call comes **from outside** the class (through Spring's proxy). If a method of `ParcelService` calls `this.get(id)`, the cache is skipped. Call the repository inside the class, as `changeStatus` does with `load(id)`.

### 6. The door guard: a rate-limit filter

Create `ratelimit/RateLimitFilter.java`:

```java
package com.parcelpilot.ratelimit;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.parcelpilot.ErrorResponse;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.http.MediaType;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.time.Clock;
import java.time.Duration;
import java.util.Map;

/** Fixed window: each IP may send limitPerMinute requests per minute. Counters live in Redis. */
public class RateLimitFilter extends OncePerRequestFilter {

    private final StringRedisTemplate redis;
    private final ObjectMapper objectMapper;
    private final int limitPerMinute;
    private final Clock clock;

    public RateLimitFilter(StringRedisTemplate redis, ObjectMapper objectMapper, int limitPerMinute, Clock clock) {
        this.redis = redis;
        this.objectMapper = objectMapper;
        this.limitPerMinute = limitPerMinute;
        this.clock = clock;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain chain) throws ServletException, IOException {
        long nowSeconds = clock.instant().getEpochSecond();
        String key = "rate:" + request.getRemoteAddr() + ":" + (nowSeconds / 60);

        Long count = redis.opsForValue().increment(key);      // +1, atomic in Redis
        if (count != null && count == 1) {
            redis.expire(key, Duration.ofSeconds(60));         // old windows clean themselves up
        }
        if (count != null && count > limitPerMinute) {
            long retryAfter = 60 - (nowSeconds % 60);          // seconds until the next window
            response.setStatus(429);
            response.setHeader("Retry-After", String.valueOf(retryAfter));
            response.setContentType(MediaType.APPLICATION_JSON_VALUE);
            objectMapper.writeValue(response.getOutputStream(), new ErrorResponse("RATE_LIMITED",
                    "Too many requests. Try again in " + retryAfter + " seconds.", Map.of(), request.getRequestURI()));
            return;                                            // the controller never runs
        }
        chain.doFilter(request, response);
    }
}
```

`java.time.Clock` (not your own step-02 `Clock`) makes the time testable. Register the filter for `/parcels` only, right after `RequestIdFilter`, in `ratelimit/RateLimitConfig.java`:

```java
@Configuration
public class RateLimitConfig {

    @Bean
    FilterRegistrationBean<RateLimitFilter> rateLimitFilter(StringRedisTemplate redis, ObjectMapper objectMapper,
            @Value("${parcelpilot.rate-limit.per-minute}") int limitPerMinute) {
        var registration = new FilterRegistrationBean<>(
                new RateLimitFilter(redis, objectMapper, limitPerMinute, Clock.systemUTC()));
        registration.addUrlPatterns("/parcels", "/parcels/*");
        registration.setOrder(Ordered.HIGHEST_PRECEDENCE + 1);
        return registration;
    }
}
```

Why a `@Bean` and not `@Component` on the filter: your step-08 `@WebMvcTest` loads every `@Component` filter, and this one needs Redis. A bean in a `@Configuration` class stays out of that slice. Why Redis and not a `Map`: with two copies of parcel-service, each `Map` would count only half the requests. Algorithms and limits: [rate-limiting lab](rate-limiting.md).

### 7. Tests

Add Redis to `TestcontainersConfiguration`:

```java
@Bean
@ServiceConnection(name = "redis")
GenericContainer<?> redis() {
    return new GenericContainer<>("redis:7-alpine").withExposedPorts(6379);
}
```

Then two test classes from the solution:

- [ParcelCacheAndLockTest](solution/parcel-service/src/test/java/com/parcelpilot/ParcelCacheAndLockTest.java) (MockMvc, real containers): a read fills the cache, a change empties it, and a `PATCH` with an old `version` gets `409 VERSION_CONFLICT`.
- [RateLimitFilterTest](solution/parcel-service/src/test/java/com/parcelpilot/RateLimitFilterTest.java) (plain unit test, Redis faked with Mockito): request 20 passes, request 21 gets `429` and `Retry-After: 18`.

Your step-13 `ParcelEventsTest` calls `changeStatus(id, status)`; add the third argument `null`.

## Test it

> [!TRY]
> 1. `mvn test` in parcel-service, then `docker compose up --build -d`.
> 2. Create `P-15` and read it twice: `curl -s http://localhost:8080/parcels/P-15`. The answer shows `"version":0`.
> 3. Look at the sticky note: `docker compose exec redis redis-cli GET parcels::P-15`
> 4. Change it **with** the version you saw:
>    ```bash
>    curl -s -X PATCH http://localhost:8080/parcels/P-15/status \
>      -H 'Content-Type: application/json' -d '{"status":"PICKED_UP","version":0}'
>    ```
>    Run step 3 again: the note is gone (`(nil)`). Read the parcel: `PICKED_UP`, `"version":1`.
> 5. Send a change with the **old** version: `-d '{"status":"DELIVERED","version":0}'`
> 6. Hammer the door: `for i in $(seq 1 25); do curl -s -o /dev/null -w "%{http_code} " http://localhost:8080/parcels/P-15; done`
>
> You should see the JSON parcel in step 3, `409` with `"code":"VERSION_CONFLICT"` in step 5, and in step 6 a row of `200`s that turns into `429`s. `curl -si http://localhost:8080/parcels/P-15 | grep Retry-After` tells you how long to wait.

## Go deeper (labs)

- [Cache invalidation lab](cache-invalidation-lab.md): feel the stale-data bug before you fix it.
- [Optimistic locking lab](optimistic-locking-lab.md): race two operators and handle the `409` like a client.
- [Rate limiting lab](rate-limiting.md): fixed window vs token bucket, and what a good `429` says.

## Done when

- [ ] A second `GET /parcels/{id}` is served from Redis (`redis-cli GET parcels::<id>` shows it).
- [ ] A status change removes the entry, so the next read is fresh.
- [ ] A `PATCH` with an old `version` returns `409` with `VERSION_CONFLICT`.
- [ ] More than 20 requests in a minute return `429` with `Retry-After`; after waiting, `200` again.
- [ ] `mvn test` is green, including `ParcelCacheAndLockTest` and `RateLimitFilterTest`.

## Check yourself

> [!CHECK]
> 1. Describe cache-aside in order.
>    <details><summary>Answer</summary>Look in the cache. On a hit, return it. On a miss, read the database, write the answer into the cache (with a TTL), return it. On a change, evict the entry.</details>
> 2. Why do we need **both** the explicit version check and `@Version`?
>    <details><summary>Answer</summary>The explicit check catches a client whose screen is old (it sends version 0 while the database has 1). <code>@Version</code> catches two requests that read the same version at the same moment: both pass the check, but the second save updates 0 rows and fails.</details>
> 3. Why are the rate-limit counters in Redis and not in a `Map` inside the app?
>    <details><summary>Answer</summary>With several copies of parcel-service, each <code>Map</code> would only see its own share of the requests. Redis is shared, so the limit counts all requests of a client.</details>
> 4. Which status codes go with "your version is old" and "you are too fast"?
>    <details><summary>Answer</summary><code>409 Conflict</code> for the old version; <code>429 Too Many Requests</code>, with <code>Retry-After</code>, for the rate limit.</details>

## Reflect

The API is fast and fair now, but anyone who can reach the port can still change any parcel. The last step adds logins.

## Next

[Step 16](../16-jwt-authentication/README.md): password login and JWT-protected actions.
