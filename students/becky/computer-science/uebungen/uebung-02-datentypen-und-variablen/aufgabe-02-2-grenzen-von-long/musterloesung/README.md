# Musterlösung · Aufgabe 02_2 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to run it

Open a terminal **in this folder** (`musterloesung/`), then:

```bash
javac LongLimits.java
```

```bash
java LongLimits
```

## How it works, step by step

1. **Where the numbers come from:** a `long` has 64 bits. One bit is for the sign, 63 for the number. So it goes from −2⁶³ to 2⁶³ − 1, that is from −9 223 372 036 854 775 808 to 9 223 372 036 854 775 807. (Check in `jshell`: `Long.MIN_VALUE`, `Long.MAX_VALUE`.)
2. **The literals:** `-9_223_372_036_854_775_808L` and `9_223_372_036_854_775_807L`.
   - The `L` says "read this as a `long`". Without it Java reads an `int` and stops with `Ganzzahl zu groß`.
   - The `_` are only for our eyes, in groups of three like a German "9.223.372…". Java ignores them.
3. **The box type is `long`** (small l), the plain number box. `Long` (capital L) is a wrapper object; it would work here, but it is not what the task means.
4. **Printing:** `"Minimum: " + smallest` glues label and value, exactly like the sheet's "Typische Ausgabe".
5. **Optional check:** `Long.MIN_VALUE` and `Long.MAX_VALUE` are Java's own constants. They print the same digits, so our literals are right.
6. **Teaser, overflow:** `biggest + 1` does not fit. Like a car's mileage counter going from 999 999 to 000 000, it wraps around to the smallest number. The brackets in `"…" + (biggest + 1)` make Java calculate first; without them it would glue `"…9223372036854775807"` and `"1"` together.

**Test run**

```text
Minimum: -9223372036854775808
Maximum: 9223372036854775807
Long.MIN_VALUE: -9223372036854775808
Long.MAX_VALUE: 9223372036854775807
Maximum + 1: -9223372036854775808
```

The literals and Java's constants match digit by digit. Both have 19 digits; the minimum ends in 8, the maximum in 7.

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| No `L` at the end | `Ganzzahl zu groß` (integer number too large) | `9_223_372_036_854_775_807L` |
| `int` box for the big number | `Möglicher Verlust bei Konvertierung von long in int` | The box must be `long` too |
| `Long` instead of `long` | Works, but it is the wrapper, not the plain type | Use `long` |
| Minimum ends in 7 | Off by one | Minimum ends in **8**, maximum in **7** |
| `"Maximum + 1: " + biggest + 1` | `Maximum + 1: 92233720368547758071` (glued!) | Brackets: `(biggest + 1)` |
| Both values in one `print` without `\n` | Everything in one long line | One `println` per value |

Back to [Aufgabe 02_2](../README.md).
