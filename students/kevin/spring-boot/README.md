# Kevin · Spring Boot

You finished the Java subject (and you know `SELECT`, `JOIN` and `GROUP BY` from the [SQL subject](../sql/README.md) — exercise 03 onward builds on it). This subject is the bridge to **Spring Boot and Hibernate**: the ideas under the annotations, each one built by hand in plain Java first, so that the real framework never feels like magic.

| Folder | What is inside |
|--------|----------------|
| [`exercises/`](exercises/README.md) | Six exercises, numbered in the order to do them |

## Why plain Java here

The test runner compiles one folder and checks what the program prints. Real Spring needs Maven, a server and a database. So every task **simulates one mechanism** — a tiny container, a router, a session with an identity map, a version check, a signed token — and the exercise page shows the real Spring or JPA code next to it. When you then open the [Spring Boot course](../../../tracks/spring-boot/README.md), you will know what each annotation does underneath.

Test a task with both names, because the Java subject uses the same task numbers:

```bash
make test-task TASK=01_1 STUDENT=kevin SUBJECT=spring-boot
```

## The order

| # | Exercise | You build by hand | Read first |
|---|----------|-------------------|------------|
| 01 | [Your own Spring](exercises/exercise-01-your-own-spring/README.md) | a container with singleton and prototype scopes; constructor injection with a qualifier | [Beans and scopes](../../../sheets/spring/beans-and-scopes.md), course [DI walkthrough](../../../tracks/spring-boot/topics/04-first-spring-api/dependency-injection-walkthrough.md) |
| 02 | [A small web layer](exercises/exercise-02-a-small-web-layer/README.md) | a router with path variables and status codes; validation plus one error handler (`ProblemDetail`) | course [step 04](../../../tracks/spring-boot/topics/04-first-spring-api/README.md), [05](../../../tracks/spring-boot/topics/05-validation-and-inputs/README.md), [06](../../../tracks/spring-boot/topics/06-error-handling/README.md) |
| 03 | [The persistence context](exercises/exercise-03-the-persistence-context/README.md) | a session with an identity map; dirty checking at flush; detached objects | [The persistence context](../../../sheets/hibernate/persistence-context.md) |
| 04 | [Fetching and N+1](exercises/exercise-04-fetching-and-n-plus-1/README.md) | a lazy collection that counts queries, lazy vs join fetch; a page request with a sort | [Fetching and N+1](../../../sheets/hibernate/fetching-and-n-plus-one.md) |
| 05 | [Locking and transactions](exercises/exercise-05-locking-and-transactions/README.md) | optimistic locking with a version stamp; pessimistic locking with a waiting line | course [Locking explained](../../../tracks/spring-boot/topics/10-persistence/locking-explained.md), [lab](../../../tracks/spring-boot/topics/15-performance-and-safety/optimistic-locking-lab.md) |
| 06 | [Sessions and tokens](exercises/exercise-06-sessions-and-tokens/README.md) | a session store with cookies; a signed, self-carrying token checked on every request | [The session family](../../../sheets/spring/session-family.md), course [step 16](../../../tracks/spring-boot/topics/16-jwt-authentication/README.md) |

Then do the real thing: the [Spring Boot course](../../../tracks/spring-boot/README.md), steps 00–16, builds ParcelPilot with Maven, Postgres, tests, Docker and JWT. Its practice path matches the roadmap: plain REST API → JPA + Postgres + Flyway → security (session, then JWT) → tests → ship it with Docker.

## Read-only map: the rest of the roadmap

These topics have a hands-on home in the course; no simulation needed.

| Topic | Where |
|-------|-------|
| What Boot adds: starters, auto-configuration, `@SpringBootApplication`, `application.yml`, profiles, `@ConfigurationProperties` | course [step 03](../../../tracks/spring-boot/topics/03-maven/README.md), [step 04](../../../tracks/spring-boot/topics/04-first-spring-api/README.md) |
| Logging with SLF4J, Actuator health | course [step 07](../../../tracks/spring-boot/topics/07-logging-and-observability-basics/README.md) |
| `@WebMvcTest` + MockMvc, `@DataJpaTest`, `@SpringBootTest`, Testcontainers | course [step 08](../../../tracks/spring-boot/topics/08-testing/README.md), [testing reference](../../../tracks/spring-boot/references/web-and-api/testing.md) |
| Docker, docker-compose | course [step 09](../../../tracks/spring-boot/topics/09-docker/README.md), [step 14](../../../tracks/spring-boot/topics/14-compose-and-observe/README.md) |
| Entities, repositories, `@Query`, Flyway migrations, `ddl-auto` | course [step 10](../../../tracks/spring-boot/topics/10-persistence/README.md) |
| Mapping rules: owning side, cascades, enum STRING, SEQUENCE vs IDENTITY, inheritance, value objects | [Mapping rules](../../../sheets/hibernate/mapping-rules.md) |
| Caching, rate limiting, `@Async`, `@Scheduled` | course [step 15](../../../tracks/spring-boot/topics/15-performance-and-safety/README.md) |
| Queues, splitting services | course [step 12](../../../tracks/spring-boot/topics/12-queues/README.md), [step 13](../../../tracks/spring-boot/topics/13-split-services/README.md) |
| Spring Security: filter chain, `UserDetailsService`, BCrypt, CORS and CSRF | course [step 16](../../../tracks/spring-boot/topics/16-jwt-authentication/README.md) |

## The pitfalls, and where you meet them

| Pitfall | Where it is taught |
|---------|--------------------|
| State in a singleton service (race conditions) | Exercise 01; [Beans and scopes](../../../sheets/spring/beans-and-scopes.md) warn box |
| Field injection hides dependencies | Exercise 01 (task 01_2) |
| Exposing entities as responses; no DTOs | Exercise 02; course [JSON and DTOs](../../../tracks/spring-boot/topics/04-first-spring-api/json-and-dtos.md) |
| `this.transactionalMethod()` bypasses the proxy; catching inside hides the rollback | [The persistence context](../../../sheets/hibernate/persistence-context.md) warn box; Exercise 05 |
| `save()` is not an immediate INSERT | Exercise 03 (task 03_2) |
| Misusing `merge()`'s return value; detached entities | Exercise 03; persistence context sheet |
| N+1, `LazyInitializationException`, EAGER everywhere, open-in-view | Exercise 04; [Fetching and N+1](../../../sheets/hibernate/fetching-and-n-plus-one.md) |
| Forgetting `mappedBy`; cascades on the wrong side; `@Enumerated` ORDINAL; IDENTITY ids; Lombok `equals` on entities; lazy getters in `toString` | [Mapping rules](../../../sheets/hibernate/mapping-rules.md) |
| Lost updates | Exercise 05 |
| Auth state kept by hand in `HttpSession` when the API should be stateless | Exercise 06 |
| Credentials committed in `application.yml`; `ddl-auto=update` in prod | course steps [10](../../../tracks/spring-boot/topics/10-persistence/README.md) and [09](../../../tracks/spring-boot/topics/09-docker/README.md) |

Back to [Kevin](../README.md).
