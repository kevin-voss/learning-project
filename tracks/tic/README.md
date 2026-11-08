# Tic — a tiny typed language you can hold in your head

Tic ("Teeny-C") is a small C-like teaching language: everything you need to learn real CS fundamentals — types, memory, pointers, control flow, functions, classes — and nothing you don't. Its promises: **never undefined behavior** (overflow, bad index, null deref stop with a friendly error naming the line), **script feel with a static spine** (no `main()`, code runs top to bottom, but it is fully type-checked *before* anything runs), a **one-page spec on purpose**, **errors that teach** (line, label, plain words, a hint), **x-ray flags** (`--tokens`, `--ast`, `--trace`) so you can *see* what a compiler is, and **one binary, one command**.

## Quickstart

```text
cd tracks/tic
cargo build --release
./target/release/tic examples/basics/01_hello.tic   # run a file
./target/release/tic                                 # bare tic = REPL
```

In the REPL a lone expression prints its value (`> 1 + 2` → `3`), declarations persist across lines, and `:quit` exits.

## Types

| Type | Literal | Zero | Note |
|------|---------|------|------|
| `i8 i16 i32 i64` | `42` (defaults `i32`) | `0` | width-checked; overflow = runtime error |
| `u8 u16 u32 u64` | `u8(200)` | `0` | same rules, unsigned range |
| `f32 f64` | `3.14` (defaults `f64`) | `0.0` | `i / i` = integer division, `f / f` = float |
| `bool` | `true` `false` | `false` | the ONLY type allowed in conditions |
| `char` | `'A'` `'\n'` | `'\0'` | one Unicode code point; `i32('A')` = 65 |
| `str` | `"hello"` | `""` | immutable; `"a" + x` converts `x` to str |
| `T[N]` fixed array | `[1, 2, 3]` | zeros | size locked at creation, bounds-checked |
| `T[]` dynamic array | `[1, 2, 3]` | `[]` | `push`/`pop`/`insert`/`remove`, by reference |
| `obj` | `{ enabled: true }` | — | anonymous bag, shape inferred, order-free |
| `ClassName` | `new Counter(10)` | — | heap instance, reference semantics |
| `EnumName` | `State.Idle` | first variant | `==` comparable within its enum |
| `T*` pointer | `&x` | `null` | explicit address-of, explicit deref |

No implicit numeric conversions: `i32 + f64` is a compile error with a cast hint. Exception: `str` on the **left** of `+` converts the right side.

## Keywords (all 28)

`function class enum final if else while for return new this true false null` · types: `i8 i16 i32 i64 u8 u16 u32 u64 f32 f64 bool char str obj`

Reserved for later: `match import delete map private static`.

## Operators, highest to lowest

| Prec | Operators | Note |
|------|-----------|------|
| 1 | `()` `[]` `.` | call, index, field/method |
| 2 | `!` `-` `&` `*` | unary; `*`/`&` only on pointer exprs |
| 3 | `*` `/` `%` | `i%0` and `f/0.0` → runtime error |
| 4 | `+` `-` | `str` on the left concatenates |
| 5 | `< > <= >=` | numerics and `char` only |
| 6 | `== !=` | primitives, str content, enums, pointer/instance identity |
| 7 | `&&` | short-circuit |
| 8 | `\|\|` | short-circuit |

Assignment (`= += -= *= /=`) is a **statement**, not an expression — `x = y = 5` is a compile error.

## Statements

```text
i32 x = 5;               // declaration + init (or `i32 x;` for zero-init)
final i32 MAX = 3;       // constant; reassigning is a compile error
x = 10;  x += 1;         // assignments
if (cond) { } else if (cond) { } else { }     // parens AND braces mandatory
while (cond) { }
for (i32 i = 0; i < n; i += 1) { }
return expr;  return;    // return type optional — no `->` means it returns nothing
{ }                      // block scope
```

## Built-ins

| Built-in | What it does |
|----------|--------------|
| `print(a, b, …)` | space-separated values + one newline |
| `input(prompt) -> str` | read a line |
| `len(x) -> i32` | str or array length |
| `push(arr, v)` · `pop(arr)` | dynamic array: append / drop last |
| `insert(arr, i, v)` · `remove(arr, i)` | dynamic array: shift elements |
| `range(n)` · `range(a, b)` · `range(a, b, step)` | → `i32[]` |
| `size_of(T) -> i32` | bytes of a scalar type (table below) |
| `sqrt abs floor ceil pow min max` | math toolbox |
| `random(a, b) -> i32` | inclusive both ends |
| `copy(arr)` | shallow copy — a truly separate array |

**Casts are syntax, not built-ins:** `i32(2.7)` → `2` (truncates), `f64(3)`, `char(65)` → `'A'`, `i32('A')` → `65`, `str(42)` → `"42"`, and `i32("123")` → `123` — the last one **parses at runtime**, so `i32("abc")` is a runtime error with a message.

**`size_of` (scalars only in v1):** `i8 u8 bool` = 1 · `i16 u16` = 2 · `i32 u32 f32` = 4 · `i64 u64 f64` = 8 · `char` = 4 (a whole Unicode code point).

## The checked contract, in plain words

Integer math is width-checked: overflow stops the program and names the numbers and line. Every array and obj access is bounds- and shape-checked. Following a `null` pointer stops the program — nothing is ever undefined. Memory is managed for you: instances and dynamic arrays are never freed by hand in v1, so use-after-free cannot happen. Recursion past 1000 frames (change it with `--max-depth`) gets a "too much recursion" error instead of a crash. Top-level code runs top to bottom after all declarations are collected. And `final` violations, duplicate names, type mismatches, unknown fields are all caught **before** the program runs.

## Pointers and memory

`&x` makes a pointer to the slot where `x` lives; `*p` reads or writes through it. Pointers may be `null`, compare with `==`, and can be returned from a function — a pointer to a local stays valid after the function returns, so dangling is impossible. Assigning an instance or a dynamic array copies the **reference**, not the data: two names, one box (see `examples/objects/07_classes.tic`). Use `copy(arr)` when you want a second, independent array.

## X-ray flags and exit codes

`tic --tokens file.tic` dumps the token stream · `--ast` the pretty-printed tree · `--trace` runs and prints variables after every statement · `--max-depth n` sets the recursion limit.

Exit codes: `0` success · `1` compile error (lex/parse/type) · `2` runtime error · `130` Ctrl-C.

Every error carries a `T`-code, a caret at the offending line and a hint — the full catalogue with typical causes is [docs/errors.md](docs/errors.md).

## The examples (each one doubles as an integration test)

```text
examples/basics/   01_hello · 02_types_and_memory · 03_control_flow
examples/building/ 04_functions_recursion · 05_pointers · 06_arrays_sorting
examples/objects/  07_classes · 08_enums_and_obj · 99_capstone
```

Every folder has an `expected/` twin with the exact stdout. Two programs end in a **teaching runtime error on purpose**: 02 (i8 overflow) and 05 (null deref) — they still exit 2 with all their successful output printed first.

## Not in v1 — on purpose

Generics, closures/lambdas, operator overloading, exceptions, inheritance, interfaces, imports/modules, `match`, `break`/`continue`, pointer arithmetic, concurrency, GC tuning. That is what "real" languages add — and each one is a later lesson, not a missing piece.
