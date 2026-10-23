# Fetching and N+1: ask the database once

> [!PICTURE]
> A **class list with lockers**. To print every pupil with their books, you could open the list once and then walk to each pupil's locker one by one — 1 + 30 trips. Or you could ask the caretaker for the list **with** the locker contents in one trip.

## The idea

A relation such as `author.getBooks()` is **LAZY** by default for collections: Hibernate loads the books only when you touch them. Touching them inside a loop over authors makes the **N+1 problem**: one query for the authors, then one query per author.

```text
select * from authors                -- 1
select * from books where author_id = 1
select * from books where author_id = 2   -- N more
```

Fixes, in the order to try them:

1. **`JOIN FETCH`** in a JPQL query for this use case.
2. **`@EntityGraph`** on the repository method, for a reusable fetch plan.
3. **`@BatchSize`** / `hibernate.default_batch_fetch_size` — N+1 becomes N/size + 1.
4. **DTO projection** — select the three columns you need; no entities at all. Often the fastest.

```java
@Query("""
    select a from Author a
    join fetch a.books
    where a.id = :id
""")
Optional<Author> findByIdWithBooks(Long id);
```

**`LazyInitializationException`** appears when you touch a lazy relation **after** the transaction ended (for example in a controller, or in `toString()`). Right fixes: fetch inside the transaction, an entity graph, or a DTO. Wrong fixes: making everything EAGER, or leaning on **open-in-view** (`spring.jpa.open-in-view`, on by default) — it hides the bug and holds a database connection while JSON is written. Turn it off.

`@ManyToOne` is EAGER by default — set it LAZY on purpose. Two `List` collections cannot be join-fetched at once (`MultipleBagFetchException`): fetch one after the other, or use `Set`.

> [!NOTE]
> **Pagination:** `Pageable` / `Page` in the controller, `findAll(PageRequest.of(page, size, Sort.by("title")))`. Always include an order, or page 2 may repeat rows of page 1.
>
> Three more query shapes, awareness level: **Criteria API** builds type-safe dynamic queries (Spring Data specs use it); **native SQL** (`@Query(nativeQuery = true)`) for what JPQL cannot say (window functions, JSONB); and **bulk JPQL** (`update Book b set b.title = :t where …`) runs straight on the database — it skips the persistence context, so loaded entities go stale; follow with `@Modifying(clearAutomatically = true)`. A second-level cache exists but hurts more than it helps until you can measure — skip it.

> [!TRY]
> 1. Set `spring.jpa.properties.hibernate.generate_statistics=true` and log `org.hibernate.SQL` at DEBUG in dev.
> 2. Call an endpoint that lists authors with books; count the SELECT lines.
> 3. Add `join fetch`; count again.
>
> You should see: N+1 lines, then 1.

> [!CHECK]
> 1. Which query count tells you N+1 is happening for 20 authors?
>    <details><summary>Answer</summary>21 — one for the list, one per author.</details>
> 2. Is making the relation EAGER a fix?
>    <details><summary>Answer</summary>No. It loads the books on every path, even where you do not need them.</details>

**Next:** [Mapping rules](mapping-rules.md)
