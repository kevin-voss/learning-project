# java.time: dates you can trust

> [!PICTURE]
> A **wall calendar with a ruler**. You point at two days and the ruler says how many days lie between. You flip forward 14 days and land on the right page, even across a month end or a leap year.

## The idea

Old Java had `Date` and `Calendar`. They are mutable, confusing and wrong about months (January was `0`). **Do not use them in new code.**

Since Java 8, **`java.time`** gives immutable, clear types:

| Type | Holds |
|------|-------|
| `LocalDate` | a day: `2026-10-23` |
| `LocalTime` | a clock time: `14:30` |
| `LocalDateTime` | both, no time zone |
| `ZonedDateTime` | both, with a zone (`Europe/Berlin`) |
| `Duration` / `Period` | a span: 90 minutes / 2 months |

Every method returns a **new** value; the old one never changes (like records).

```java
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

LocalDate due = LocalDate.parse("2026-10-01");     // ISO text → date
LocalDate back = due.plusDays(14);                 // 2026-10-15

long late = ChronoUnit.DAYS.between(due, back);    // 14
boolean overdue = back.isAfter(due);               // true
```

Formatting and parsing other shapes use `DateTimeFormatter`:

```java
import java.time.format.DateTimeFormatter;

var german = DateTimeFormatter.ofPattern("dd.MM.yyyy");
System.out.println(due.format(german));            // 01.10.2026
LocalDate d = LocalDate.parse("24.12.2026", german);
```

> [!TRY]
> 1. Print `LocalDate.of(2024, 2, 28).plusDays(1)`.
> 2. Print `ChronoUnit.DAYS.between(LocalDate.of(2026, 1, 1), LocalDate.of(2026, 12, 31))`.
>
> You should see: `2024-02-29` (leap year handled) and `364`.

> [!WARN]
> `between(a, b)` is **negative** when `b` is before `a`. Check `isAfter` / `isBefore` when the direction matters.

> [!NOTE]
> `LocalDate.now()` reads the computer clock. Tests cannot predict it — pass dates in as text when a program must be checkable.

> [!CHECK]
> 1. Which type for "the shop opens at 09:00"?
>    <details><summary>Answer</summary><code>LocalTime</code>.</details>
> 2. Does `due.plusDays(14)` change `due`?
>    <details><summary>Answer</summary>No. It returns a new <code>LocalDate</code>; <code>due</code> is immutable.</details>

**Next:** [Money](money.md)
