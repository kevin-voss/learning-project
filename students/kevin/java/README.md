# Kevin · Java

You already program, and you know **classes, objects, fields, methods, `new` and `main`**. This subject starts right there and walks to a solid, modern **Java 25**: the everyday middle of the language first, then the new features, then the craft.

| Folder | What is inside |
|--------|----------------|
| [`exercises/`](exercises/README.md) | Exercise sheets and tasks, numbered in the order to do them |

## The order

Do the exercises **in number order**. Every exercise uses only what the ones before it taught. For each row: read the home first (the deep lesson or short sheet), then do the exercise.

### 1 · After objects (exercises 01–03)

| Topic | Read | Do |
|-------|------|----|
| Inheritance, `super`, override, abstract, polymorphism | [Classes and objects](../../../tracks/java/topics/classes-and-objects/index.html) (inheritance + polymorphism parts) | [Exercise 01](exercises/exercise-01-inheritance-and-polymorphism/README.md) |
| Interfaces, default methods, `Comparable` | [Interfaces](../../../tracks/java/topics/interfaces/index.html) | [Exercise 02](exercises/exercise-02-interfaces/README.md) |
| Enums, enums with fields and methods; **switch expressions** (`->`, `yield`) | [Enums](../../../tracks/java/topics/enums/index.html); the expression form is taught in the exercise page | [Exercise 03](exercises/exercise-03-enums/README.md) |

### 2 · Everyday Java (exercises 04–07)

| Topic | Read | Do |
|-------|------|----|
| `ArrayList`, `HashMap`, `HashSet`, reading generics; safe removal (`removeIf`) | [Collections](../../../tracks/java/topics/collections/index.html) | [Exercise 04](exercises/exercise-04-collections/README.md) |
| Exceptions: `try` / `catch`, `throw`, checked vs unchecked | [Exceptions](../../../tracks/java/topics/exceptions/index.html) | [Exercise 05](exercises/exercise-05-exceptions/README.md) |
| `equals`, `hashCode`, `toString`, the `Integer` cache — and why records win | [Classes and objects](../../../tracks/java/topics/classes-and-objects/index.html) (identity part), [Types and variables](../../../tracks/java/topics/types-and-variables/index.html) (wrappers) | [Exercise 06](exercises/exercise-06-equals-and-hashcode/README.md) |
| Files with `Path` and `Files`, text blocks | [Files](../../../tracks/java/topics/io-basics/index.html), [Strings](../../../tracks/java/topics/strings/index.html) | [Exercise 07](exercises/exercise-07-files-and-text/README.md) |

### 3 · Modern Java 25 (exercise 08)

| Topic | Read | Do |
|-------|------|----|
| Records | [Records](../../../sheets/java/modern/records.md) | [Exercise 08](exercises/exercise-08-modern-java-25/README.md) |
| Sealed types + pattern matching `switch` | [Sealed types and pattern matching](../../../sheets/java/modern/sealed-patterns.md) | Exercise 08 |
| Virtual threads | [Virtual threads](../../../sheets/java/concurrency/virtual-threads.md) | Exercise 08 |
| Sequenced collections (`getFirst`, `getLast`, `reversed`) | [Sequenced collections](../../../sheets/java/modern/sequenced-collections.md) | Exercise 08 |
| The short `main`, one-file programs | [Compact main](../../../sheets/java/modern/compact-main.md) | read only (tests need the classic `main`) |
| Structured concurrency (preview) | [Structured concurrency](../../../sheets/java/concurrency/structured-concurrency.md) | read only |

### 4 · Craft (exercises 09–10)

| Topic | Read | Do |
|-------|------|----|
| Naming and style | [Naming and style](../../../sheets/java/advanced/naming-and-style.md) | [Exercise 09](exercises/exercise-09-clean-java-habits/README.md) |
| Optional: return "maybe" without `null` | [Optional](../../../sheets/java/advanced/optional.md) | Exercise 09 |
| Immutability, frozen lists | [Immutability](../../../sheets/java/advanced/immutability.md) | [Exercise 10](exercises/exercise-10-streams-and-frozen-lists/README.md) |
| Streams: filter, map, reduce | [Streams](../../../sheets/java/advanced/streams.md) | Exercise 10 |

### 5 · Job-ready (exercises 11–13)

| Topic | Read | Do |
|-------|------|----|
| Dates: `LocalDate`, `ChronoUnit`, formatting | [java.time](../../../sheets/java/apis/java-time.md) | [Exercise 11](exercises/exercise-11-dates-and-money/README.md) |
| Money: `BigDecimal`, `setScale`, why not `double` | [Money](../../../sheets/java/apis/money.md) | Exercise 11 |
| `Collectors`: `joining`, `groupingBy`, `averagingDouble`; `Comparator.comparing` chains | [Collectors](../../../sheets/java/apis/collectors.md), [Collections](../../../tracks/java/topics/collections/index.html) (sorting) | [Exercise 12](exercises/exercise-12-streams-workout/README.md) |
| `CompletableFuture`: `supplyAsync`, `thenApply`, `join` | [CompletableFuture](../../../sheets/java/concurrency/completable-futures.md) | [Exercise 13](exercises/exercise-13-concurrency-next-steps/README.md) |
| `ConcurrentHashMap.merge`, the lost-update bug | [Concurrent collections](../../../sheets/java/concurrency/concurrent-collections.md) | Exercise 13 |

## Depth links (read when you meet them, practised elsewhere)

These topics have a deep home but no Kevin task. Each line says where you will practise it.

| Topic | Home | Practised in |
|-------|------|--------------|
| Packages and visibility (`public`, package-private, `private`) | [Classes and objects](../../../tracks/java/topics/classes-and-objects/index.html) (access modifiers), [Getting started](../../../tracks/java/topics/getting-started/index.html) | every solution you write; [Naming and style](../../../sheets/java/advanced/naming-and-style.md) |
| Wrappers, autoboxing, `StringBuilder` vs `+`, pass-by-value | [Types and variables](../../../tracks/java/topics/types-and-variables/index.html) (wrappers), [Strings](../../../tracks/java/topics/strings/index.html) (StringBuilder), [Methods](../../../tracks/java/topics/methods/index.html) | Exercise 06 (cache), Exercise 07 (text) |
| Overloading, varargs, static vs instance | [Methods](../../../tracks/java/topics/methods/index.html) | every exercise |
| Lambdas, method references, `Function` / `Predicate` / `Consumer` / `Supplier` | [Interfaces](../../../tracks/java/topics/interfaces/index.html) (lambdas part) | Exercises 04, 10, 12 |
| Generics in depth: bounded types, wildcards (PECS), erasure | [Collections](../../../tracks/java/topics/collections/index.html) (generics part) | Exercise 04 reads them; write them when you build a library class |
| `HashMap` internals, `TreeMap`, `LinkedHashMap` | [Collections](../../../tracks/java/topics/collections/index.html), CS lesson hash tables | Exercises 04, 06 (`LinkedHashSet`), 13 |
| JVM: bytecode, stack vs heap, GC, `OutOfMemoryError` vs `StackOverflowError` | [JVM memory](../../../tracks/java/topics/jvm-memory/index.html) | interview prep; read after exercise 08 |
| Debugging mindset, the IDE debugger | [Debugging](../../../tracks/java/topics/debugging/index.html) | whenever a test is red |
| Git: the daily loop | [Git sheet](../../../sheets/git/README.md) | every commit you make |
| Maven: a repeatable build | [Build tools](../../../tracks/java/topics/build-tools/index.html) | [Project 09 · Household budget](../../../projects/09-household-budget/README.md) |
| JUnit, test doubles (Mockito idea) | [Testing](../../../tracks/java/topics/testing/index.html) | Project 09; Spring Boot course, step 08 |
| Design patterns | [Design patterns](../../../tracks/java/topics/design-patterns/index.html) | Spring Boot course, step 02 |
| HTTP in Java, then Spring Boot and JPA | [REST and HTTP](../../../tracks/java/topics/rest-and-http/index.html), [Server layers](../../../sheets/java/server-layers.md) | [Project 10](../../../projects/10-java-weather-cli/README.md), then the [Spring Boot course](../../../tracks/spring-boot/README.md) — after exercise 13 |

## New in Java 25 (read only)

All three run on this computer's JDK 25; none is needed for a graded task.

| Feature | One sentence | Where |
|---------|--------------|-------|
| Compact source files, instance `main`, `IO.println` (JEP 512) | A one-file program without the class shell | [Compact main](../../../sheets/java/modern/compact-main.md) |
| Flexible constructor bodies (JEP 513) | Check or compute *before* calling `this(...)` / `super(...)` | [Compact main](../../../sheets/java/modern/compact-main.md) (note) |
| Module imports (JEP 511), unnamed variables `_` (Java 22) | One import line for all of `java.base`; `_` for a value you never read | [Compact main](../../../sheets/java/modern/compact-main.md) (note) |
| Scoped values (final), structured concurrency (preview, JEP 505) | A read-only notebook per thread crew; threads that start and end as one block | [Structured concurrency](../../../sheets/java/concurrency/structured-concurrency.md) |
| Stream gatherers (Java 24) | Your own intermediate stream steps (windows, scans) | [Collectors](../../../sheets/java/apis/collectors.md) (note) |

## The ten interview pitfalls, and where you meet them

| Pitfall | Where it is taught |
|---------|--------------------|
| `==` vs `equals` on objects; the `Integer` cache (127 is `==`, 128 is not) | Exercise 06 (tasks 06_1, 06_3) |
| `equals` without `hashCode` breaks `HashMap` / `HashSet` | Exercise 06 (task 06_1) |
| `ConcurrentModificationException`: removing while iterating | Exercise 04 (task 04_3) |
| `double` for money → `BigDecimal` from a `String` | Exercise 11 (task 11_2) |
| Side effects inside `map`, mutating shared state from lambdas | [Streams](../../../sheets/java/advanced/streams.md), [Immutability](../../../sheets/java/advanced/immutability.md); exercises 10, 12 |
| Swallowing exceptions (`catch (Exception e) {}`) | Exercise 05 (every catch prints or rethrows) |
| Resource leaks → try-with-resources | Exercise 05 (note), [Files](../../../tracks/java/topics/io-basics/index.html) |
| `List.of()` (immutable) vs `Arrays.asList()` (fixed-size) | [Immutability](../../../sheets/java/advanced/immutability.md), [Sequenced collections](../../../sheets/java/modern/sequenced-collections.md) (warn box) |
| `Optional.get()` without a check → `orElse` / `orElseThrow` / `map` | Exercise 09 |
| `.parallelStream()` is not automatically faster | [Collectors](../../../sheets/java/apis/collectors.md) (note) |

All Java homes on one map: [sheets/java](../../../sheets/java/README.md).

**After exercise 13:** the [Spring Boot subject](../spring-boot/README.md) — the ideas under Spring and Hibernate, built by hand first, then the real course.

Back to [Kevin](../README.md).
