# Sample solution · Task 01_4 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to check

Written answer — no compile step. Powers of two are enough; decimals are optional extras.

## How it works, step by step

**Question:** how many **bytes** are 1 Kilobyte, 1 Megabyte, and 1 Gigabyte?

On **this sheet**, sizes are **binary** (powers of 1024), not the marketing “1000” sizes.

### Step 0 — Picture first

> [!PICTURE]
> Nesting boxes. Each bigger box holds **1024** of the smaller ones.  
> Kilo → Mega → Giga. Always ×1024, never ×1000 on this sheet.

### Step 1 — Start from one byte

```text
1 Byte = 8 bits
```

We count **bytes**, not bits, for K/M/G.

### Step 2 — Kilobyte: multiply by 1024 once

```text
1 KByte = 1024 Byte
1024 = 2 × 2 × … × 2  (ten times) = 2¹⁰
```

So:

```text
1 KByte = 2¹⁰ Byte = 1024 Byte
```

### Step 3 — Megabyte: multiply by 1024 again

A Megabyte is a Kilobyte of Kilobytes:

```text
1 MByte = 1024 · 1024 Byte
        = 2¹⁰ · 2¹⁰ Byte
        = 2²⁰ Byte
```

Optional plain number:

```text
2²⁰ = 1 048 576 Byte
```

### Step 4 — Gigabyte: multiply by 1024 a third time

```text
1 GByte = 1024 · 1024 · 1024 Byte
        = 1024³ Byte
        = 2¹⁰ · 2¹⁰ · 2¹⁰ Byte
        = 2³⁰ Byte
```

Optional plain number:

```text
2³⁰ = 1 073 741 824 Byte
```

### Step 5 — Picture the ladder

```mermaid
flowchart LR
  B["1 Byte"] -->|"× 2¹⁰"| K["1 KByte = 2¹⁰"]
  K -->|"× 2¹⁰"| M["1 MByte = 2²⁰"]
  M -->|"× 2¹⁰"| G["1 GByte = 2³⁰"]
```

| Unit | Answer on the sheet |
|------|---------------------|
| 1 KByte | `2¹⁰` Byte (= 1024 Byte) |
| 1 MByte | `2²⁰` Byte (= 1 048 576 Byte) |
| 1 GByte | `2³⁰` Byte (= 1 073 741 824 Byte) |

Writing only `2¹⁰`, `2²⁰`, `2³⁰` is enough.

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| Using 1000 / 10⁶ / 10⁹ | SI decimal sizes | Sheet wants 1024 and 2ⁿ |
| Writing `2⁸` for a KByte | Mixing bit and byte | KByte = `2¹⁰` **bytes** |
| Off-by-one exponent | `2¹⁹` or `2²⁹` | Each step adds **+10** to the exponent |

Back to [Task 01_4](../README.md).
