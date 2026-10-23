# Collectors: from a stream into a box

> [!PICTURE]
> The **end of the sorting belt**. Parcels roll past; at the end a helper drops them into boxes: one box per city, or one box with all the labels glued into a list.

## The idea

A [stream](../advanced/streams.md) ends with a **terminal** step. `toList()` gives a list. `collect(Collectors.…)` can build almost anything else.

```java
import java.util.stream.Collectors;

record Book(String title, String author, double rating) {}
var books = List.of(
    new Book("Dune", "Herbert", 4.5),
    new Book("Emma", "Austen", 4.1),
    new Book("Persuasion", "Austen", 4.3));
```

| Collector | Builds | Example result |
|-----------|--------|----------------|
| `joining(", ")` | one `String` | `"Dune, Emma, Persuasion"` |
| `groupingBy(Book::author)` | `Map<String, List<Book>>` | `{Austen=[Emma, Persuasion], Herbert=[Dune]}` |
| `groupingBy(Book::author, counting())` | `Map<String, Long>` | `{Austen=2, Herbert=1}` |
| `groupingBy(Book::author, averagingDouble(Book::rating))` | `Map<String, Double>` | `{Austen=4.2, Herbert=4.5}` |
| `toMap(Book::title, Book::rating)` | `Map<String, Double>` | `{Dune=4.5, …}` |

```java
String titles = books.stream().map(Book::title).collect(Collectors.joining(", "));

Map<String, Double> avg = books.stream()
    .collect(Collectors.groupingBy(Book::author,
             Collectors.averagingDouble(Book::rating)));
```

Sorting objects on the belt uses a **`Comparator`** — the deep lesson is in the [Collections](../../../tracks/java/topics/collections/index.html) topic:

```java
books.stream()
    .sorted(Comparator.comparing(Book::rating).reversed()
                      .thenComparing(Book::title))
    .limit(2)                                   // top 2
    .forEach(b -> System.out.println(b.title()));
```

> [!TRY]
> 1. With the three books above, print `groupingBy(Book::author, Collectors.counting())`.
>
> You should see: `{Austen=2, Herbert=1}` (map order may differ; `TreeMap` keeps it sorted: `groupingBy(Book::author, TreeMap::new, counting())`).

> [!WARN]
> A stream is **lazy**: nothing runs until the terminal step. And a stream is **used once** — collect, then start a new one for the next question.

> [!NOTE]
> Prefer a plain loop when the job is one `if` inside a `for`, or when you mutate things on the way. `.parallelStream()` is not automatically faster; measure first. Java 24 added **Gatherers** (`Stream.gather`) for custom intermediate steps such as sliding windows — a read-only extra.

> [!CHECK]
> 1. Which collector turns names into `"a, b, c"`?
>    <details><summary>Answer</summary><code>Collectors.joining(", ")</code>.</details>
> 2. `groupingBy(Book::author)` — what is the value type of the map?
>    <details><summary>Answer</summary><code>List&lt;Book&gt;</code>: every book of that author.</details>

Back to [Everyday APIs](README.md).
