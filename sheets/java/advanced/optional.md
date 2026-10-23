# Optional: a box that may be empty

> [!PICTURE]
> A **gift box**. Sometimes there is a present inside. Sometimes the box is empty. You always open the box on purpose — you never pretend an empty box is a present.

## The idea

`null` means “no value”, but it hides. One forgotten check and the program crashes with `NullPointerException`.

**`Optional<T>`** is a box: either it holds a `T`, or it is empty. Callers must deal with both cases.

```java
Optional<String> city = Optional.of("Berlin");
Optional<String> missing = Optional.empty();

System.out.println(city.orElse("unknown"));      // Berlin
System.out.println(missing.orElse("unknown"));   // unknown
```

Useful moves:

```java
Optional.ofNullable(maybeNull);           // empty if null
opt.map(String::toUpperCase);             // transform if present
opt.ifPresent(System.out::println);       // run only when present
opt.orElseThrow();                        // fail if empty
```

> [!TRY]
> 1. Write a method `Optional<Integer> parsePositive(String s)` that returns empty when the number is missing or ≤ 0.
> 2. Print `parsePositive("4").orElse(-1)` and `parsePositive("0").orElse(-1)`.
>
> You should see: `4` then `-1`.

> [!WARN]
> Do not use `Optional` as a field or a method parameter for everything. It shines as a **return type** when “no answer” is normal.

> [!CHECK]
> 1. What does `Optional.empty().orElse("x")` return?
>    <details><summary>Answer</summary><code>x</code>.</details>
> 2. Why not return `null` from a lookup method?
>    <details><summary>Answer</summary>Callers forget to check. Optional makes the empty case visible in the type.</details>

**Next:** [Immutability](immutability.md)
