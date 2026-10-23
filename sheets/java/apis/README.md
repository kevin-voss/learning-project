# Everyday APIs: the tools every Java job uses

> [!PICTURE]
> A **toolbox under the counter**. Not new language words — ready-made helpers the JDK ships: a calendar, a cash register that never loses a cent, and a sorting belt that fills boxes.

These sheets are about **classes you call**, not syntax you learn. Each is short; the task that practises it is in Kevin's exercises 11–12.

## Where each topic lives

| Topic | Home |
|-------|------|
| Dates and durations, `LocalDate`, `ChronoUnit`, formatting | [java.time](java-time.md) |
| Money without rounding bugs, `BigDecimal` | [Money](money.md) |
| From a stream to a map or a sentence, `Collectors` | [Collectors](collectors.md) |

Related: [Streams](../advanced/streams.md) (the belt itself), [Optional](../advanced/optional.md).

> [!CHECK]
> 1. You need "how many days between two dates". Which sheet?
>    <details><summary>Answer</summary><a href="java-time.md">java.time</a>.</details>
> 2. You add 0.1 + 0.2 for a price and see 0.30000000000000004. Which sheet?
>    <details><summary>Answer</summary><a href="money.md">Money</a>.</details>

**Next:** [java.time](java-time.md)
