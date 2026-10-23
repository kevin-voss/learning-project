# Hibernate: what happens to your entities

> [!PICTURE]
> A **librarian with a cart**. You ask for a book; she fetches it once and keeps it on her cart. Scribble in it and she notices at closing time and writes the change into the catalogue. You never fill in an "update" form.

Three layers, one picture: your code → **Spring Data JPA** (repositories) → **JPA** (`jakarta.persistence`, the rules) → **Hibernate** (the engine) → JDBC → the database. You write Spring Data daily; interviews ask about the two layers underneath.

## Where each topic lives

| Topic | Home |
|-------|------|
| Entity states, identity map, dirty checking, flush, `@Transactional` | [The persistence context](persistence-context.md) |
| LAZY, N+1, `JOIN FETCH`, `LazyInitializationException`, pagination | [Fetching and N+1](fetching-and-n-plus-one.md) |
| Owning side, cascades, enums, ids, inheritance | [Mapping rules](mapping-rules.md) |
| Repositories, Flyway, locking | Course [step 10](../../tracks/spring-boot/topics/10-persistence/README.md), [locking explained](../../tracks/spring-boot/topics/10-persistence/locking-explained.md) |
| Optimistic locking lab | Course [step 15](../../tracks/spring-boot/topics/15-performance-and-safety/optimistic-locking-lab.md) |

> [!WARN]
> Old tutorials import `javax.persistence`. Since Spring Boot 3 it is **`jakarta.persistence`**.

**Next:** [The persistence context](persistence-context.md)
