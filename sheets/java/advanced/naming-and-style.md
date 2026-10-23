# Naming and style: habits that scale

> [!PICTURE]
> A **kitchen drawer**. Spoons with spoons, knives with knives. You find things fast because every cook in the house uses the same rule.

## The idea

Advanced Java is not only new keywords. Teams agree on habits so code reads the same way. You write for the next person — often that is you in six months.

## Tiny rules that matter

| Habit | Do this | Not this |
|-------|---------|----------|
| Classes | `ParcelEvents`, `BusyPostOffice` | `pe`, `MyClass2` |
| Methods | `label`, `parse`, verbs | `doIt`, `stuff` |
| Booleans | `isEmpty`, `hasId` | `flag`, `check` |
| Packages | `com.shop.parcel` folders | one giant default package forever |
| One job | a method does one clear thing | a 80-line `main` that does everything |

```java
// Clear names + one job per method
static String label(Event event) {
  return switch (event) { /* … */ };
}
```

Prefer **records** for plain data (you know these). Prefer **immutable** collections when you hand a list to someone else (next sheet). Prefer **Optional** for “maybe missing” instead of returning `null`.

> [!TRY]
> 1. Open one of your recent Java files.
> 2. Rename one vague name (`tmp`, `data`, `x`) to a name that says what it is.
>
> You should see: the code reads like a short sentence out loud.

> [!WARN]
> Clever one-letter names save typing once and cost time every read. Name the idea, not the type (`city` not `string1`).

> [!CHECK]
> 1. Is `process()` a good method name?
>    <details><summary>Answer</summary>Usually no. Say what it processes: <code>stampParcel</code>, <code>sumCosts</code>.</details>
> 2. Why keep methods short?
>    <details><summary>Answer</summary>One job is easier to test, name and reuse.</details>

**Next:** [Optional](optional.md)
