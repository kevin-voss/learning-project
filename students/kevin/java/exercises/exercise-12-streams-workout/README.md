# Exercise 12 · Streams workout

| | |
|---|---|
| Student | Kevin |
| Subject | Java |
| Language | Java |
| Created | 2026-10-22 |

## The story in one sentence

The post office library owns a shelf of rated books, and you answer the team's questions — which books are good, who writes best — by describing the steps on the sorting belt instead of writing loops by hand.

## Before you code

1. [Collectors](../../../../../sheets/java/apis/collectors.md)
2. [Streams](../../../../../sheets/java/advanced/streams.md)
3. Deep lesson on sorting with a `Comparator`: [Collections](../../../../../tracks/java/topics/collections/index.html) (the sorting part).

Map of all sheets: [sheets/java](../../../../../sheets/java/README.md).

## Tasks

Do them in order: each one is a bit harder than the one before. Every task has its own folder with the task, a desk for your code (`my-solution/`) and the sample solution (`solution/`).

<!-- index:start -->
| Task | Topic | Status |
|------|-------|--------|
| 12_1 | [Book finder](task-12-1-book-finder/README.md) | todo |
| 12_2 | [Author league](task-12-2-author-league/README.md) | todo |
<!-- index:end -->

Status words: `todo` → `in progress` → `done`. Change them here when you finish a task (or let `/done` do it).

## How to work

1. Read this page to the end: it explains every new idea once, for all tasks.
2. Open the first task and read its `README.md`.
3. Write your code in its `my-solution/` folder. That is your desk.
4. Try every test example from the task's `README.md`.
5. Only when you are done (or really stuck for a long time): look at `solution/`.

In Cursor you can ask for help at any time, without getting the answer: `/next` (where am I?), `/stuck` (stuck, red text or a new word), `/check` (is it right?), `/done` (finished).

---

## What you will learn

Both tasks read books like `Dune Herbert 4.5`: title, author, rating. You know streams from [exercise 10](../exercise-10-streams-and-frozen-lists/README.md) — here the belt learns new end-of-belt tricks and new ways to line things up.

### 1. A record as the stream element — one card per book

Picture the library catalogue: one card per book, with title, author and rating written on it. The belt carries whole cards, not three loose piles of facts.

```java
record Book(String title, String author, double rating) {}

List<Book> shelf = List.of(
    new Book("Dune", "Herbert", 4.5),
    new Book("Emma", "Austen", 4.1));

shelf.stream()
    .filter(book -> book.rating() >= 4.5)
    .map(Book::title)
    .forEach(System.out::println);   // Dune
```

**In task 12_1** you read every shelf line into one `Book` and send the books down the belt.

### 2. `Collectors.joining` — glue the labels into one sentence

Picture the end of the sorting belt: a helper glues all the address labels into one line, with `", "` between them.

```java
String titles = shelf.stream()
    .map(Book::title)
    .collect(Collectors.joining(", "));
System.out.println(titles);          // Dune, Emma
```

**In task 12_1** you glue the distinct author names into the one `authors:` line.

### 3. `groupingBy` + a summary collector — one box per author

Picture parcels sorted into one box per city, and on every box a note with the summary: how many, how good on average. `groupingBy` builds the boxes; the second collector writes the note.

```java
Map<String, Double> avg = shelf.stream()
    .collect(Collectors.groupingBy(Book::author,
             Collectors.averagingDouble(Book::rating)));
Map<String, Long> count = shelf.stream()
    .collect(Collectors.groupingBy(Book::author, Collectors.counting()));
// {Austen=4.1, Herbert=4.5} and {Austen=1, Herbert=1}
```

**In task 12_2** you build one league row per author: average rating and book count.

### 4. A `Comparator` chain — sort by one key, break ties with another

Picture a league table: the better average sits higher, and two teams with the same points sit in name order. `comparing` picks the key, `reversed()` turns it around, `thenComparing` breaks ties.

```java
Comparator<Book> bestFirst = Comparator.comparing(Book::rating).reversed();

shelf.stream()
    .sorted(bestFirst.thenComparing(Book::title))
    .limit(1)                        // keep only the first one: a top list
    .forEach(book -> System.out.println(book.title()));
```

**In task 12_2** you order the league by average, best first, and break ties by author name.

### 5. `max(comparator)` returns an `Optional` — the empty shelf

Picture picking the tallest kid in an empty room: there is no tallest kid, so you need a plan B. `max` hands you a "maybe" box (`Optional`) instead of a book.

```java
Optional<Book> best = shelf.stream()
    .max(Comparator.comparing(Book::rating));
String title = best.map(Book::title).orElse("(none)");
```

**In task 12_2** you print the best book's title — or `(none)` when the shelf is empty.

---

## Words to know

| Word | Means |
|------|-------|
| **collector** | A helper that ends a stream by building something: a `String`, a `Map` |
| **`Collectors.joining(sep)`** | Glues the stream's Strings into one String, with `sep` between |
| **`groupingBy(key, …)`** | One map entry per key; every item lands in its key's box |
| **`averagingDouble(…)` / `counting()`** | The box summary: the average of one value / how many items |
| **`Comparator.comparing(f)`** | Orders items by one value (a name, a rating) |
| **`.reversed()`** | Flips the order: best first instead of worst first |
| **`.thenComparing(f)`** | Breaks ties with a second value |
| **`max(comparator)`** | The greatest item, as an `Optional` (empty when nothing is there) |
| **`orElse(x)`** | The value to use when the `Optional` is empty |
| **`limit(n)`** | Keeps only the first `n` items of the stream |

## Source

Written for Kevin: practice for the [Collectors](../../../../../sheets/java/apis/collectors.md) sheet.

Back to [all exercises](../README.md).
