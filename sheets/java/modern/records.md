# Records: a box with a fixed label

> [!PICTURE]
> A **library card**. It always has the same fields: name, book title, due date. Nobody invents a fourth field on the fly. The card is small data with a clear shape.

## The idea

A normal class for "just data" needs a constructor, getters, `equals`, `hashCode` and `toString`. That is a lot of typing for a box that only holds values.

A **record** is a short class that holds named values and nothing else. Java builds the boring parts for you.

You need **Java 16+**. On this computer that means **Java 25** is fine.

```java
record Parcel(String id, String city) {}

var p = new Parcel("mail-1", "Berlin");
System.out.println(p.id());    // mail-1
System.out.println(p);         // Parcel[id=mail-1, city=Berlin]
```

- The words in `( )` are the **components**.
- You read them with `id()` and `city()`, not `getId()`.
- Two records with the same values are **equal**.

> [!TRY]
> 1. Create a file `HelloRecord.java` with a `record Point(int x, int y) {}` and a `main` that prints `new Point(3, 4)`.
> 2. Compile and run with Java 25: `javac HelloRecord.java` then `java HelloRecord`.
>
> You should see: `Point[x=3, y=4]`.

> [!WARN]
> A record's components are **final**. After `new Parcel(...)` you cannot change `id`. Make a new record instead.

> [!CHECK]
> 1. What does `p.city()` return for `new Parcel("a", "Oslo")`?
>    <details><summary>Answer</summary><code>Oslo</code>.</details>
> 2. Do you write `getId()` on a record?
>    <details><summary>Answer</summary>No. You write <code>id()</code>.</details>

**Next:** [Sealed types and pattern matching](sealed-patterns.md)
