# Sample solution · Task 09_1 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to run it

```bash
javac CityLookup.java
java CityLookup
```

## How it works, step by step

1. `CITIES` is an unmodifiable map — clear catalog, frozen.
2. `findCity` uppercases the code and wraps the map get in `Optional.ofNullable` (missing key → empty).
3. `main` prints `found:` or `missing:` from that Optional. No `null` leaks out of `findCity`.

**Test run**

```text
3
OSL
xyz
PAR
```

```text
found: Oslo
missing: XYZ
found: Paris
```

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| Return `null` from lookup | NPE risk later | Return `Optional.empty()` |
| Forget uppercase | `ber` → missing | `toUpperCase(Locale.ROOT)` |

Back to [Task 09_1](../README.md).
