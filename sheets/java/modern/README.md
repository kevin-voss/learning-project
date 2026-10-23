# Modern Java: new language features

> [!PICTURE]
> An **upgrade party**. Same house, same rooms — but the kitchen got a new induction stove and the doors now open with a wave. Things you use every day, now with less ceremony.

These sheets are the **new language features of Java 16–25**. Each one is final (no preview flags needed) and runs on your Java 25 as-is.

## Where each topic lives

| Topic | Home |
|-------|------|
| Short data classes (Java 16) | [Records](records.md) |
| Closed type families + `switch` that unpacks (Java 17/21) | [Sealed types and pattern matching](sealed-patterns.md) |
| `getFirst` / `getLast` on lists (Java 21) | [Sequenced collections](sequenced-collections.md) |
| The short `main` and one-file programs (Java 25) | [Compact main](compact-main.md) |
| Many light threads (Java 21) | [Virtual threads](../concurrency/virtual-threads.md) |
| Naming, Optional, immutability, streams | [Advanced Java craft](../advanced/README.md) |

> [!WARN]
> Graded tasks in `students/` still need `public static void main(String[] args)` in a normal file. The short `main` is for play and small tools. [Why](compact-main.md).

> [!CHECK]
> 1. You want a data class with two fields and no methods. Which feature?
>    <details><summary>Answer</summary>A <a href="records.md">record</a>.</details>
> 2. Which sheet shows the new short way to start a program?
>    <details><summary>Answer</summary><a href="compact-main.md">Compact main</a>.</details>

**Next:** [Records](records.md)
