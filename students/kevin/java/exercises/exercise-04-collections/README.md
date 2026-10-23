# Exercise 04 · Collections

| | |
|---|---|
| Student | Kevin |
| Subject | Java |
| Language | Java 25 |
| Created | 2026-10-22 |

## The story in one sentence

You know arrays — but their size is fixed on the day you make them. The post office now needs lists that grow and shrink all day: what the team has read, which words appear in the mail. Java has shelves for that: **collections**.

## Before you code

Deep lesson (read the parts you need): [Collections](../../../../../tracks/java/topics/collections/index.html) in the Java track.

Map of all Java homes: [sheets/java](../../../../../sheets/java/README.md).

## Tasks

Do them in order: each one is a bit harder than the one before. Every task has its own folder with the task, a desk for your code (`my-solution/`) and the sample solution (`solution/`).

<!-- index:start -->
| Task | Topic | Status |
|------|-------|--------|
| 04_1 | [Reading log](task-04-1-reading-log/README.md) | todo |
| 04_2 | [Word count](task-04-2-word-count/README.md) | todo |
| 04_3 | [Safe removal](task-04-3-safe-removal/README.md) | todo |
<!-- index:end -->

Status words: `todo` → `in progress` → `done`. Change them here when you finish a task (or let `/done` do it).

## How to work

1. Read this page to the end: it explains every new idea once, for all tasks.
2. Open the first task and read its `README.md`.
3. Write your code in its `my-solution/` folder. That is your desk.
4. Try every test example from the task's `README.md`.
5. Only when you are done (or really stuck for a long time): look at `solution/`.

```bash
java --version   # want 25 (21 also fine)
```

In Cursor you can ask for help at any time, without getting the answer: `/next` (where am I?), `/stuck` (stuck, red text or a new word), `/check` (is it right?), `/done` (finished).

---

## What you will learn

### 1. ArrayList — a shopping list that grows

Picture a shopping list in a notebook. You write bread at the bottom. You cross out milk. The list gets longer and shorter all day. An array cannot do that — its size is fixed. An `ArrayList` can.

```java
ArrayList<String> books = new ArrayList<>();
books.add("hamlet");                 // write at the bottom
books.add("dune");
books.remove("hamlet");              // cross out
System.out.println(books.contains("dune"));  // true: still on the list
System.out.println(books.size());            // 1
```

- `add` writes at the bottom, `remove` crosses out, `contains` asks "is it on the list?", `size` counts.
- The list keeps the order you added in.

**In task 04_1** you keep the reading log in an `ArrayList<String>` and answer ADD, DROP, HAS, SHOW and COUNT with these four methods. **In task 04_3** you remove many words at once — with `removeIf`, never with `remove` inside a loop.

### 2. HashMap — the coat check

Picture the coat check at the theatre. You hand in your coat and get a ticket with a name on it. Later you say the name and your coat comes back. A `HashMap` works like that: it pairs a **key** (the ticket name) with a **value** (the coat).

```java
HashMap<String, Integer> counts = new HashMap<>();
counts.put("parcel", 1);                        // hand in: parcel -> 1
counts.put("parcel", counts.get("parcel") + 1); // same name again -> 2
System.out.println(counts.get("parcel"));       // 2
System.out.println(counts.containsKey("mail")); // false
```

- `put` stores a pair, `get` fetches the value by key, `containsKey` asks "do we hold this name?".

**In task 04_2** you count words: the word is the ticket name, the count is the coat hanging behind it.

### 3. HashSet — a stamp collection

Picture a stamp collection. You may own a stamp or not — but never two of the same. A `HashSet` holds each thing **at most once**, and it does not remember order.

```java
HashSet<String> stamps = new HashSet<>();
stamps.add("paris");                   // in the album
stamps.add("paris");                   // still one paris, not two
System.out.println(stamps.contains("paris"));  // true
System.out.println(stamps.size());             // 1
```

**In task 04_2** the distinct words are exactly this stamp rule: each word counts once — `counts.size()` already knows that number. Its brother `TreeSet` is the same album sorted A to Z; you use it to print the words in alphabetical order.

### 4. Reading `<String>` — the label on the box

`ArrayList<String>` reads aloud as "an ArrayList of strings". The angle brackets are a label on the box: they say what goes in. Only strings fit — `books.add(42)` does not compile. The label works for every collection: `HashMap<String,Integer>` holds pairs of a String key and an Integer value (`Integer` is the box version of a number; the label must say `Integer`, not `int`). The deep lesson linked above tells the whole story; for today, reading the label aloud is enough.

### 5. Removing while looping — pull books off a shelf you are counting

Picture counting a shelf of books and pulling some off as you go. You lose your place: which book is next? An `ArrayList` feels the same. Remove inside a for-each loop and Java stops your program with a `ConcurrentModificationException`.

```java
for (String word : words) {
    if (word.contains("a")) {
        words.remove(word);      // crash: the list changed under the loop
    }
}
```

The removing is safe when **the list** does the walking. One line with `removeIf` and a rule:

```java
words.removeIf(word -> word.contains("a"));   // a lambda: a tiny method without a name
```

Or the older way: an `Iterator` — the loop's own finger. Only the finger may remove.

```java
Iterator<String> it = words.iterator();
while (it.hasNext()) {
    if (it.next().contains("a")) {
        it.remove();             // the finger removes; the walk stays valid
    }
}
```

- `removeIf(rule)` throws out every entry the rule is true for; the kept ones stay in order.
- `word -> word.contains("a")` is a **lambda**: a tiny method without a name. For each word, is this true?

**In task 04_3** you pull every word with the forbidden letter off the list and report what stayed.

---

## Words to know

| Word | Means |
|------|-------|
| **collection** | A Java shelf that holds many things: a list, a set or a map |
| **ArrayList** | A list that grows and shrinks; keeps the add order |
| **`add` / `remove`** | Put a thing in / take it out |
| **`contains` / `size`** | Is it in there? / how many are in there? |
| **HashMap** | Pairs of key and value; `put` stores, `get` fetches |
| **`containsKey`** | Does the map hold this key? |
| **HashSet / TreeSet** | Each thing at most once; TreeSet keeps them sorted A to Z |
| **generics** | The `<...>` label on a collection: what it holds |
| **removeIf** | Throws out every entry the rule is true for; the rest keep their order |
| **Iterator** | The loop's own finger; only its `remove()` may take things out mid-walk |
| **ConcurrentModificationException** | The crash when you change a list while a for-each walks it |
| **lambda** | A tiny method without a name, written `word -> word.contains("a")` |

## Source

Written for Kevin: practice for the [Collections](../../../../../tracks/java/topics/collections/index.html) topic of the Java track.

Back to [all exercises](../README.md).
