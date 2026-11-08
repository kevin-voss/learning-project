# Tic error codes

Every error Tic reports carries a code, a plain-language message, the source
line with a caret, and a hint — the [README](../README.md) shows the shape.
Codes are stable: the family letter says which stage failed, and the number
never changes meaning.

| Family | Stage | Exit code |
|---|---|---|
| T0 | lex | 1 |
| T1 | parse | 1 |
| T2 | type | 1 |
| T3 | runtime | 2 |
| T4 | CLI / usage | 1 |

Runtime errors (T3xxx) are the only family that exits 2; every other
family exits 1. Compile errors report as many as one run can find — up to
10 shown, then `…and N more — fix these first`.

---

## T0 — lex errors

*reading the text — the lexer turns characters into tokens*

| Code | What it says | Typical cause |
|---|---|---|
| T0001 | unterminated string literal | the closing `"` never came — Tic strings cannot span lines |
| T0002 | unterminated char literal | a `'` without its closing `'` on the same line |
| T0003 | empty char literal | `''` — the empty text is `""` (a str) |
| T0004 | a char literal can hold exactly one character | `'ab'` — a char holds exactly one character |
| T0005 | unknown escape sequence `\q` | `\q` — Tic defines \n \t \r \0 \\ \" \' |
| T0006 | unknown character `~` | `~`, `^`, a lone `|` or non-ASCII text in the source |
| T0007 | invalid number `1.2.3` | `1.2.3`, `123abc` or `1_` — text that starts like a number |
| T0008 | number literal `99999999999999999999` is too large | more digits than an i64/f64 literal can hold |
| T0009 | `match` is reserved for a future Tic version | `match`, `import`, … — saved for a future Tic version |
| T0010 | unterminated block comment | a `/*` with no matching `*/` |

## T1 — parse errors

*reading the tokens — the parser builds the program tree*

| Code | What it says | Typical cause |
|---|---|---|
| T1001 | expected an expression, found `;` | the statement matches none of the forms — usually a missing `;`, `(` or `{` |
| T1002 | unknown type `Countre` | `Countre x;` — the class/enum is not declared, or a builtin type is misspelled |
| T1003 | the left side of an assignment must be a variable, a field, an index or `*pointer` | `1 = 2;` — the left side is not a place you can assign into |
| T1004 | assignment is a statement in Tic, not an expression — it cannot be chained | `x = y = 5;` — assignment is a statement, it cannot chain |
| T1005 | only one `[]`, `[N]` or `*` suffix is allowed on a type | `i32[][]` or `i32**` — one `[]`, `[N]` or `*` per type, maximum |

## T2 — type errors

*before anything runs — the checker proves the program statically sound*

| Code | What it says | Typical cause |
|---|---|---|
| T2001 | `x` is declared twice — it is already a variable | the same name declared twice in one scope (or twice at top level) |
| T2002 | `final MAX` must be given a value on the same line | `final i32 MAX;` with no `= value` on the same line |
| T2003 | the initializer of `x`: this is str, but i32 was expected | a value of one type where another was promised (`i32 x = "hi";`) |
| T2004 | a condition must be a bool, but this is i32 | `if (x)` — conditions must be bool; comparisons make bools |
| T2005 | unknown variable `cont` | a typo, or the name is declared later / in another scope |
| T2006 | unknown function `prnt` | a typo in the name — or a builtin misspelled (`prnt`) |
| T2007 | `double` takes 1 argument, but 2 were given | too few or too many arguments at the call site |
| T2008 | `class Counter` has no field `cont` | a misspelled field, or the field belongs to another class/shape |
| T2009 | `class Counter` has no method `bumm` | a misspelled method — or calling a field with `(…)` |
| T2010 | enum `State` has no variant `Idel` | `State.Idel` — the enum declares no such variant |
| T2011 | unknown class `Countre` | `new Countre()` — no class with that name is declared |
| T2012 | `+` cannot combine i32 and f64 | mixing types (`i32 + f64`, `num + str`) — Tic never converts silently |
| T2013 | `==` cannot compare State with Light | comparing values `==` cannot compare (cross-enum, objs, arrays) |
| T2014 | `*` follows a pointer, but this is i32 | `*x` where `x` is not a pointer |
| T2015 | `&` takes the address of a place — a variable, a field, an index or `*p` | `&(1 + 2)` — `&` needs a variable, field, index or `*p` |
| T2016 | a i32 cannot be cast to bool | a cast outside the cast table (`bool(1)`, `char("a")`) |
| T2017 | size_of takes a scalar type name — e.g. size_of(i32) | `size_of(str)` or `size_of(x)` — it takes one scalar type name |
| T2018 | `i32` is a type name, not a value | using `i32` where a value is expected (only size_of takes a type) |
| T2019 | only arrays can be indexed, but this is i32 | `x[0]` where `x` is not an array |
| T2020 | an array index must be an integer type, but this is f64 | `a[1.5]` — the index must be an integer type |
| T2021 | `MAX` is `final` — it is given a value once and keeps it | assigning to a `final` name a second time |
| T2022 | `double` is a function, not a variable — it cannot be assigned to | assigning to a function, class, enum or `this` |
| T2023 | objs cannot grow new fields — `leval` was not in the shape | `o.leval = 1` — an obj's shape is fixed by its literal |
| T2024 | the assignment to `user`: { name: str, level: i32 } does not match { name: str } | two obj literals with different field sets where one shape was expected |
| T2025 | `this` only exists inside a class method | `this` in a plain function or at top level |
| T2026 | `x` (an i32 variable) is not a function — it cannot be called | calling a variable or a value that is not a function |

## T3 — runtime errors

*while it runs — the interpreter's friendly stops*

| Code | What it says | Typical cause |
|---|---|---|
| T3001 | runtime overflow: i8 overflow (127 + 1) | arithmetic past the type's largest value (`i8 big = 127; big + 1`) |
| T3002 | integer division by zero | the divisor was 0 (or 0.0) when the program ran |
| T3003 | too much recursion — the program went 1000 calls deep | recursion past `--max-depth` (default 1000) — usually a missing base case |
| T3004 | `abc` is not a valid i32 | `i32("abc")` — the text does not parse as the target type at runtime |
| T3005 | this expression is nested too deeply to run | one expression nested deeper than the walker will go (1024) |
| T3006 | internal error: a value the checker guaranteed was not there | a bug in Tic itself — please report it; never the student's fault |
| T3007 | index 3 is out of bounds — the array has 3 elements (indexes 0..2) | an index past the end (or a pop/remove on an empty array) |
| T3008 | null pointer dereference | following a `null` pointer with `*p` |
| T3009 | this value has no field `nmae` — it has: level, name | a bare-`obj` field/method the arriving obj does not have |
| T3010 | `pass` ended without returning a value — a bare `obj` has no zero value Tic can invent | a `-> obj` pass-through function that fell off its end |

## T4 — CLI / usage errors

*using tic itself — command-line and file problems*

| Code | What it says | Typical cause |
|---|---|---|
| T4001 | the REPL is not implemented yet | a phase of the roadmap not built yet |
| T4002 | cannot read `hello.tic`: no such file or directory | wrong path, or the file is not readable |
| T4003 | pick one mode — you asked for `tic run <file>` and `--tokens` at once | two modes at once, an unknown flag, `--max-depth 0` |

---

*This page is generated from the `TicError` enum in
`src/diagnostics/mod.rs`; a test rewrites it whenever the enum grows:
`TIC_UPDATE_ERROR_DOCS=1 cargo test --lib error_docs`. Don't edit by hand.*
