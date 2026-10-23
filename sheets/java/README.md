# Java: where each topic lives

> [!PICTURE]
> A **class** is a cookie cutter. Every cookie you cut with it is an **object**. Same shape, but each cookie can have its own sprinkles.

This page is a map, not a lesson. Each Java topic is taught in one place. Find it here, then go there.

## The toy words

| Word | Picture |
|------|---------|
| **Class** | the cookie cutter: the shape |
| **Object** | one cookie, made with `new` |
| **Field** | the sprinkles on one cookie: data it keeps |
| **Method** | what a cookie can do, like `bark()` for a dog |
| **`main`** | the front door: Java starts the program here |
| **Package** | a folder of classes that belong together |

## Where each topic lives

Everyday Java (deep lessons in the [Java track](../../tracks/java/index.html)):

| Topic | Home |
|-------|------|
| Install Java, first program | [Getting started](../../tracks/java/topics/getting-started/index.html) |
| How Java code is written | [Syntax fundamentals](../../tracks/java/topics/syntax-fundamentals/index.html) |
| Types and variables | [Types and variables](../../tracks/java/topics/types-and-variables/index.html) |
| `+`, `==`, `&&` and friends | [Operators](../../tracks/java/topics/operators/index.html) |
| `if`, `switch`, loops | [Control flow](../../tracks/java/topics/control-flow/index.html) |
| Methods | [Methods](../../tracks/java/topics/methods/index.html) |
| Arrays | [Arrays](../../tracks/java/topics/arrays/index.html) |
| Strings | [Strings](../../tracks/java/topics/strings/index.html) |
| Classes and objects, inheritance, `equals` / `hashCode` | [Classes and objects](../../tracks/java/topics/classes-and-objects/index.html) |
| Interfaces, lambdas | [Interfaces](../../tracks/java/topics/interfaces/index.html) |
| Enums | [Enums](../../tracks/java/topics/enums/index.html) |
| `ArrayList`, `HashMap`, `HashSet`, generics | [Collections](../../tracks/java/topics/collections/index.html) |
| Errors: `try` / `catch` | [Exceptions](../../tracks/java/topics/exceptions/index.html) |
| Reading and writing files | [Files](../../tracks/java/topics/io-basics/index.html) |
| Finding bugs | [Debugging](../../tracks/java/topics/debugging/index.html) |
| Maven | [Build tools](../../tracks/java/topics/build-tools/index.html) |
| JUnit tests | [Testing](../../tracks/java/topics/testing/index.html) |
| HTTP in Java | [REST and HTTP](../../tracks/java/topics/rest-and-http/index.html) |
| Design patterns | [Design patterns](../../tracks/java/topics/design-patterns/index.html) |
| Controller, service, repository | [How a Java server is structured](server-layers.md) |
| Spring container, scopes, sessions, JWT | [Spring sheets](../spring/README.md) |
| Persistence context, N+1, mapping rules | [Hibernate sheets](../hibernate/README.md) |
| A real Spring Boot product | [Spring Boot course](../../tracks/spring-boot/README.md) |

Modern Java 16–25 (short sheets here):

| Topic | Home |
|-------|------|
| Records (Java 16) | [Records](modern/records.md) |
| Sealed types + pattern `switch` (Java 17/21) | [Sealed types and pattern matching](modern/sealed-patterns.md) |
| `getFirst` / `getLast` / `reversed()` (Java 21) | [Sequenced collections](modern/sequenced-collections.md) |
| The short `main`, one-file programs (Java 25) | [Compact main](modern/compact-main.md) |
| Virtual threads (Java 21) | [Virtual threads](concurrency/virtual-threads.md) |
| `CompletableFuture`, `ConcurrentHashMap` | [Concurrency](concurrency/README.md) |
| Threads as one crew (preview) | [Structured concurrency](concurrency/structured-concurrency.md) |
| Naming, Optional, immutability, streams | [Advanced Java craft](advanced/README.md) |
| `java.time`, `BigDecimal` money, `Collectors` | [Everyday APIs](apis/README.md) |

All topics on one page: the [Java track](../../tracks/java/index.html). Words you do not know are in the [glossary](../start/glossary.md).

For **Java 25** advanced practice:

1. [Records](modern/records.md) → [Sealed types and pattern matching](modern/sealed-patterns.md) → [Sequenced collections](modern/sequenced-collections.md) → [Compact main](modern/compact-main.md)
2. [Virtual threads](concurrency/virtual-threads.md) → [CompletableFuture](concurrency/completable-futures.md) → [Concurrent collections](concurrency/concurrent-collections.md), then [structured concurrency](concurrency/structured-concurrency.md) (preview)
3. Then the craft shelf: [Advanced Java](advanced/README.md) (conventions, Optional, immutability, streams) and the [everyday APIs](apis/README.md) (dates, money, collectors)

> [!CHECK]
> 1. You make three dogs with `new Dog()`. How many classes and how many objects is that?
>    <details><summary>Answer</summary>One class (the cutter) and three objects (the cookies).</details>
> 2. Where do you learn to install Java?
>    <details><summary>Answer</summary>On the <a href="../../tracks/java/topics/getting-started/index.html">Getting started</a> topic.</details>
> 3. Which sheet shows `getFirst()` and `reversed()`?
>    <details><summary>Answer</summary><a href="modern/sequenced-collections.md">Sequenced collections</a>.</details>

**Next:** go back to the path. It tells you which topic comes now.
