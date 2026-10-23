# The persistence context: one cart per transaction

> [!PICTURE]
> A **librarian's cart**. Every book you ask for during one visit goes on the cart. Ask for the same book twice and she points at the cart — one copy, not two. Scribble in a book on the cart and at closing time she copies every scribble into the catalogue.

## The idea

While a transaction runs, Hibernate keeps a **persistence context** (also called the session): a small cache of every entity it loaded or saved.

**Entity states:**

| State | Means |
|-------|-------|
| transient | `new Book()` — Hibernate has never seen it |
| managed | on the cart: loaded or persisted inside the transaction |
| detached | the transaction ended; the object still exists, the cart is gone |
| removed | marked for `DELETE` at flush |

Two rules follow from the cart:

1. **Identity map** — one database row is exactly one Java object per context. `findById(1)` twice gives the same object.
2. **Dirty checking** — at **flush** Hibernate compares every managed entity with its loaded state and writes an `UPDATE` for what changed. You never call "update".

```java
@Transactional
void rename(Long id, String title) {
    Book book = repo.findById(id).orElseThrow();   // managed
    book.setTitle(title);                          // that is all: UPDATE at flush
}
```

`persist(new)` puts a new object on the cart. `merge(detached)` **copies** its state into a managed copy and returns that copy — keep using the returned one, not the original.

**Flush** pushes pending SQL to the database; **commit** flushes and ends the transaction. `save()` does not mean "INSERT now": the SQL may run later, and an error can appear lines after the `save` call.

> [!WARN]
> `@Transactional` rolls back only for **unchecked** exceptions by default (`rollbackFor` changes that). Catching an exception inside the method hides it — the transaction commits anyway. And calling `this.transactionalMethod()` from inside the same class skips the proxy: the annotation does nothing.

> [!NOTE]
> Put `@Transactional` on the **service** method: one use case, one transaction. Repositories are not the transaction boundary. `readOnly = true` lets Hibernate skip dirty checking.

> [!CHECK]
> 1. You load a book, change its title, and the method ends without `save`. Is the title updated?
>    <details><summary>Answer</summary>Yes — the book was managed; dirty checking writes the UPDATE at flush.</details>
> 2. What does `merge` return?
>    <details><summary>Answer</summary>A managed copy. The detached object you passed stays detached.</details>

**Next:** [Fetching and N+1](fetching-and-n-plus-one.md)
