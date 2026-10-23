# Spring: the ideas under the annotations

> [!PICTURE]
> A **theatre**. You write the play (your classes). The theatre hires the actors, hands each one their props and puts them on stage at the right time. You never call `new Actor()` yourself.

These sheets explain the **two ideas people mix up most** in Spring: the container that holds your objects, and the many things called "session" or "context". The hands-on course is the deep home: [Spring Boot course](../../tracks/spring-boot/README.md).

## Where each topic lives

| Topic | Home |
|-------|------|
| The container, beans, injection, scopes | [Beans and scopes](beans-and-scopes.md) |
| `ApplicationContext`, `HttpSession`, `SecurityContextHolder` and friends; session vs JWT | [The session family](session-family.md) |
| Injection walkthrough, DTOs, first API | Course [step 04](../../tracks/spring-boot/topics/04-first-spring-api/README.md) |
| Validation (`@Valid`) | Course [step 05](../../tracks/spring-boot/topics/05-validation-and-inputs/README.md) |
| Error handling, `ProblemDetail` | Course [step 06](../../tracks/spring-boot/topics/06-error-handling/README.md) |
| Logging, testing, Docker | Course steps [07](../../tracks/spring-boot/topics/07-logging-and-observability-basics/README.md), [08](../../tracks/spring-boot/topics/08-testing/README.md), [09](../../tracks/spring-boot/topics/09-docker/README.md) |
| JWT login | Course [step 16](../../tracks/spring-boot/topics/16-jwt-authentication/README.md) |
| What Hibernate does with your entities | [Hibernate sheets](../hibernate/README.md) |

> [!CHECK]
> 1. Who creates a `@Service` object?
>    <details><summary>Answer</summary>The container (the <code>ApplicationContext</code>), not your code.</details>

**Next:** [Beans and scopes](beans-and-scopes.md)
