# Compact main: the short way to start (Java 25)

> [!PICTURE]
> A **hotel with a revolving door**. Old hotels made everyone enter through the big formal lobby door: stairs, reception, sign the book. The new door is right on the street. Same hotel, less walking.

## The idea

A Java program has always needed this ceremony:

```java
public class Hello {
    public static void main(String[] args) {
        System.out.println("hello");
    }
}
```

Since **Java 25** (JEP 512, final) both rules relax:

1. **Instance main methods.** `main` no longer has to be `static` and `public`. An instance `void main()` is found — the class is created for you, so you can use its fields without `static`.

```java
class Hello {
    void main() {
        System.out.println("hello");
    }
}
```

2. **Compact source files.** A small program can be one file with **no class shell at all** — the file *is* the class. Save as `Hello.java`:

```java
void main() {
    System.out.println("hello");
}
```

Run it directly:

```bash
java Hello.java
```

No `javac` step, no class wrapper. Java compiles it in memory and starts.

Compact files also get **`IO`** implicitly imported — Java 25's short console helper (`IO.println`, `IO.read`):

```java
void main() {
    IO.println("Hello, Java 25!");
}
```

> [!TRY]
> 1. Put exactly `void main() { IO.println("I am tiny"); }` in a file `Tiny.java`.
> 2. Run `java Tiny.java`.
>
> You should see: `I am tiny`.

> [!WARN]
> **Graded tasks still need the classic form.** The repo's test runner (`make test-task`) looks for `public static void main(String[] args)`. Use the compact form for little experiments and one-file tools; switch to the classic `main` when a task says so.

> [!NOTE]
> Two more small Java 22–25 conveniences you will meet in modern code:
>
> - **Unnamed variables** (Java 22): write `_` for a value you must declare but never read — `catch (NumberFormatException _) { … }` or `for (var _ : list) count++;`.
> - **Module imports** (Java 25, JEP 511): `import module java.base;` brings in the whole `java.base` module — no more five `import java.util.*` lines in a tiny program.
> - **Flexible constructor bodies** (Java 25, JEP 513): a constructor may run checks and compute values *before* `this(...)` / `super(...)`, as long as it does not touch `this` yet.

> [!CHECK]
> 1. What is the smallest `main` Java 25 accepts?
>    <details><summary>Answer</summary>An instance method like <code>void main()</code>.</details>
> 2. Which command runs `Tiny.java` without `javac`?
>    <details><summary>Answer</summary><code>java Tiny.java</code>.</details>

**Next:** [Virtual threads](../concurrency/virtual-threads.md)
