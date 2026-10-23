# Task 09_1 · City lookup

Part of [Exercise 09 · Clean Java habits](../README.md). Sheets: [Naming and style](../../../../../../sheets/java/advanced/naming-and-style.md), [Optional](../../../../../../sheets/java/advanced/optional.md).

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk** |
| [`solution/`](solution/README.md) | Sample solution |

## The task (from the sheet)

Write a program with this fixed city catalog (codes are uppercase):

| Code | City |
|------|------|
| BER | Berlin |
| OSL | Oslo |
| ROM | Rome |
| PAR | Paris |

First line: integer `n`. Then `n` lines with one city code each.

For each code (compare in uppercase, so `ber` and `BER` are the same):

- if known → print `found: <City>`
- if unknown → print `missing: <CODE>` where `<CODE>` is the code in **uppercase**

Look up with a method that returns `Optional<String>` (the city name). Do not return `null` from that method. Use clear method names.

## The task, simply said

1. Read how many codes follow.
2. For each code, ask your Optional lookup.
3. Present → `found: …`. Empty → `missing: …`.

## Test examples

| You type | The program says |
|----------|------------------|
| `1` / `BER` | `found: Berlin` |
| `1` / `ber` | `found: Berlin` |
| `1` / `XYZ` | `missing: XYZ` |
| `3` / `OSL` / `xyz` / `PAR` | `found: Oslo`, `missing: XYZ`, `found: Paris` |
| `0` | (no lines) |

## Little helpers

<details>
<summary>How do I build the catalog?</summary>

A `Map<String, String>` from code to city works. Or a sealed set of records. Keep the lookup in its own method that returns `Optional`.

</details>

<details>
<summary>orElse vs ifPresent</summary>

For two different print lines, `if (opt.isPresent())` / `orElseGet` patterns both work. `map` + a second message for empty is fine too.

</details>

## Done when

- [ ] Every test example matches.
- [ ] Lookup returns `Optional`, not `null`.
- [ ] Method names read like short sentences.

Next: [Task 09_2](../task-09-2-safe-divide/README.md)
