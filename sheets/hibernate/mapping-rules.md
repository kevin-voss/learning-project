# Mapping rules: the ones that silently bite

> [!PICTURE]
> A **two-sided index card**. The library card for a book names its author; the author card lists her books. Only **one** side is the truth in the drawer: the book card, with the author's number on it. Writing on the author card alone changes nothing in the drawer.

## Owning side and `mappedBy`

The foreign key lives on **one** side — the owning side. The other side says `mappedBy`:

```java
@Entity class Book {
    @ManyToOne(fetch = FetchType.LAZY)      // owning side: books.author_id
    private Author author;
}

@Entity class Author {
    @OneToMany(mappedBy = "author", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Book> books = new ArrayList<>();

    void addBook(Book b) { books.add(b); b.setAuthor(this); }     // keep both sides in sync
    void removeBook(Book b) { books.remove(b); b.setAuthor(null); }
}
```

- Forgetting `mappedBy` gives two separate relations and a second foreign key.
- Set only the inverse side, and nothing is saved. Use helper methods.
- `cascade` and `orphanRemoval` belong on the parent (`@OneToMany`). Never cascade `REMOVE`/`ALL` from a `@ManyToOne`: deleting one book must not delete the author.
- Prefer a **join entity** (`BookAuthor` with its own columns) over `@ManyToMany`; you will need the extra columns.

## Small rules with big consequences

| Rule | Why |
|------|-----|
| `@Enumerated(EnumType.STRING)` — never the default ORDINAL | reordering the enum rewrites the meaning of every row |
| ids: `SEQUENCE` for batch inserts; `IDENTITY` turns batching off | IDENTITY must hit the DB per row to learn the id |
| ids for public APIs: `@Uuid` (Hibernate 6.5+) | sequential ids leak how many rows you have |
| a no-arg constructor on every entity | Hibernate builds entities and proxies by reflection |
| `equals` / `hashCode` on a business key or a stable id rule, not Lombok | generated versions break `Set`s and recurse through both sides |
| no lazy getters inside `toString()` or log lines | a surprise query — or a `LazyInitializationException` |
| JSON columns: `@JdbcTypeCode(SqlTypes.JSON)` on the field | maps a `Map`/record to a real JSON column (Postgres `jsonb`) |
| composite keys: `@EmbeddedId` + an `@Embeddable` id class | awareness level — prefer a single generated id |
| `@Version` for optimistic locking | course [locking explained](../../tracks/spring-boot/topics/10-persistence/locking-explained.md) |
| `ddl-auto=validate` (or `none`) in prod; Flyway owns the schema | course [Flyway](../../tracks/spring-boot/topics/10-persistence/flyway-migrations-explained.md) |

## Inheritance and value objects

| Strategy | Tables | Trade-off |
|----------|--------|-----------|
| `SINGLE_TABLE` (default) | one table + discriminator | fast; nullable columns |
| `JOINED` | one per class, joined | normalised; more joins |
| `TABLE_PER_CLASS` | one per concrete class | unions; rarely worth it |

`@MappedSuperclass` for a `BaseEntity` (id, created/updated dates, version). `@Embeddable` for value objects such as money, address or ISBN. `@ElementCollection` for simple lists (tags).

> [!CHECK]
> 1. You add a book to `author.getBooks()` only. Is `books.author_id` set?
>    <details><summary>Answer</summary>No. The book is the owning side; set <code>book.setAuthor(author)</code> too (a helper method does both).</details>
> 2. Why STRING for enums?
>    <details><summary>Answer</summary>ORDINAL stores the position; inserting a constant in the middle changes what every stored number means.</details>

Back to [Hibernate](README.md).
