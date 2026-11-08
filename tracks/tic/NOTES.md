# Tic — build log

Each phase appends its section: what was built, the file list, test count,
and every deviation from [PLAN.md](PLAN.md) with a one-line reason.
The plan is the authority; deviations are deliberate and explained.

## Phase 0+1 — scaffold + lexer (done 2026-10-30)

### What was built

- **Cargo crate** per §4.3: single crate `tic`, edition 2021, deps exactly
  `clap 4` (derive), `miette 7` (fancy), `rustyline 14`; `[profile.release]
  lto = true`. `#![forbid(unsafe_code)]` in both `lib.rs` and `main.rs`.
- **CLI** (§7) — full surface: `tic <file>`, `run`, `check`, `--tokens`,
  `--ast`, `--trace`, `--max-depth` (default 1000), `--help`, `--version`,
  and no-args → clean "REPL arrives in phase 8" placeholder.
  Exit codes: `0` ok · `1` compile/usage · `2` runtime (from phase 4).
  Stages that don't exist yet return a T4xxx "not implemented yet
  (phase N)" diagnostic instead of panicking, so the CLI stays testable
  at every phase. `cli/repl.rs` intentionally does not exist yet.
- **Diagnostics** (§5.6): `TicError` with code families T0xxx lex / T1xxx
  parse / T2xxx type / T3xxx runtime / T4xxx CLI-usage, miette `Diagnostic`
  impls (message, span label, help/hint), a `render(file, source)` helper
  via `NamedSource`, and hand-rolled Levenshtein `did_you_mean` in
  `hints.rs` (unit-tested now; the parser/checker consume it later).
- **Lexer** (§5.1): hand-rolled scanner over `&str` — `//` and `/* */`
  comments, int/float literals with `1_000` separators, strings with
  `\n \t \\ \" \r \0` (+ `\'`) escapes, char literals incl. escapes and
  single unicode code points, the full operator/punct set with longest-match
  (`->` `+=` `-=` `*=` `/=` `==` `!=` `<=` `>=` `&&` `||`), keywords per
  §2.2, and friendly T0 errors: unterminated string/char/comment, empty
  char, multi-char, unknown escape, unknown character (e.g. `~`), invalid
  number (`1.2.3`, `123abc`), number too large, and reserved words
  (`match import delete map private static` → T0009).
- **`--tokens`** works end-to-end: one line per token —
  `kind lexeme start..end` — stable format, unit-tested
  (`dump_tokens_format_is_stable`).

### File list (lines incl. tests)

| File | Lines | Role |
|---|---|---|
| `Cargo.toml` / `.gitignore` | 15 | deps per §13; `/target` ignored |
| `src/main.rs` | 29 | thin: clap parse → `cli::dispatch` |
| `src/lib.rs` | 20 | module tree + re-exports, `forbid(unsafe_code)` |
| `src/cli/mod.rs` | 240 | args, mode resolution, dispatch, exit codes, `dump_tokens` |
| `src/cli/tests.rs` | 214 | 15 CLI tests (parsing, modes, exit codes, placeholders) |
| `src/diagnostics/mod.rs` | 359 | `TicError`, families/codes/labels/hints, miette render |
| `src/diagnostics/hints.rs` | 104 | `levenshtein`, `did_you_mean` (+6 tests) |
| `src/lexer/mod.rs` | 395 | the scanner |
| `src/lexer/token.rs` | 280 | `TokenKind` (all 63 kinds + Eof), `Token`, stable names |
| `src/lexer/keywords.rs` | 111 | keyword table + reserved-for-future list |
| `src/lexer/tests.rs` | 386 | 26 lexer tests (round-trip, spans, 10 error codes) |
| `src/util/span.rs` | 92 | `Span { start, end }` byte offsets (+4 tests) |

Total ≈ 2,250 lines incl. tests. `cargo build` and `cargo test` are
warning-clean; **56 tests, all passing** (26 lexer, 15 cli, 11
diagnostics, 4 span). `examples/` and `README.md` are owned by a parallel
agent and were not touched.

### Interfaces for later phases

- `lexer::tokenize(&str) -> Result<Vec<Token>, TicError>` (stops at the
  first lex error — see deviation below).
- `TokenKind::is_type_keyword()` / `is_keyword()` for the cast-vs-type and
  decl-vs-expr disambiguation in phase 2.
- `TicError::family() -> Family` and `Family::exit_code()` decide exit 1/2.
- `diagnostics::hints::did_you_mean(input, candidates)` for parse/check
  errors.
- `Span::to(other)` merges spans for AST nodes.

### Deviations from PLAN.md

1. **Spans are byte offsets** although §5.1 sketched char-based scanning —
   miette resolves byte offsets, so char spans would underline the wrong
   place in non-ASCII files (§4.4 itself says bytes).
2. **Type-keyword variants are `TyI8`, `TyChar`, …** instead of the "TI32,
   F64, …" style in §4.4 — `Char(char)`/`Str(String)` literal variants
   already own those names; §4.4's list was illustrative, not literal.
3. **28 keywords, not the "24" in §2.2's headline** — the list §2.2
   actually gives has 28 words (14 general + 14 type names); implemented
   the list.
4. **The lexer stops at the first lex error** (`Result`, not error
   accumulation) — showing all errors at once is §5.2's parser recovery
   job; after an unterminated string, later tokens are guesswork.
5. **`Colon` token added** — §4.4's token list omits `:` but the §3
   grammar's obj literals (`{ retries: 3 }`) need it.
6. **`\'` is a valid escape (in both strings and chars)** — §5.1 lists
   `\n \t \\ \" \r \0` only, but `'\''` is otherwise unwritable and one
   shared escape decoder is simpler.
7. **`1.` lexes as `Int` + `Dot`, not an error** — a lex error there would
   break `arr[0].field`; `1.2.3` (dot + digit after a number) *is* T0007.
8. **`123abc` and misplaced underscores (`1_`, `1__0`) are T0007 errors**
   — not silently `Int(123), Ident("abc")`; clearer teaching, and §5.1
   demands `1.2.3`-style errors anyway.
9. **`--trace` says "parsing arrives in phase 2"** (the first missing
   stage), not phase 4 — the placeholder walks the real pipeline order and
   will self-update as phases land.
10. **Usage/CLI errors exit 1, including clap arg errors** (clap defaults
    to 2) — §7 reserves exit 2 for runtime errors only.
11. **`lexer/tests.rs` and `cli/tests.rs` exist** beyond §4.3's file list —
    keeps every file under the repo's ~400-line soft cap; still ≤5 files
    per directory.
12. **§5.1's "max token length guard" omitted** — the structured scanner
    has no runaway path, the spec sets no length limit, and strings must
    be arbitrarily long anyway.
13. **No scientific notation (`1e10`)** — not among §5.1's literal forms;
    one match arm if ever wanted.
14. **Block comments do not nest** (first `*/` closes, like C) — plan
    didn't specify; simplest rule.
15. **`rustyline` declared but unused** — kept per §13; the REPL consumes
    it in phase 8 (cargo does not warn on unused dependencies).
16. **`make site` not run, no `hub/path.mjs` step added** — this phase's
    scope was `tracks/tic/` only; the landing-page integration belongs to
    the repo maintainer once the track has content to point at.

### Status vs §10 acceptance criteria

- Row 0 (scaffold): `tic --help` works; error rendering proven (see
  `diagnostics::tests::renders_code_label_and_hint_like_the_plan`).
- Row 1 (lexer): `--tokens` dumps a full program; every token kind
  round-trips in a unit test; 10 distinct lex-error cases assert code +
  label + hint.

## Phase 2 — AST + two-pass parser (done 2026-10-30)

### What was built

- **AST** (`src/ast/`): `Program { decls, stmts }` — the two-pass split
  (declarations collected first, top-level statements after, source order
  within each). `Decl` = Function/Class/Enum; every `Stmt` (VarDecl with
  `is_final`, Assign, If with `else_branch: Option<Box<Stmt>>` for
  else-if chains, While, For, Return, Block, ExprStmt) and every `Expr`
  variant carries a `Span`. Types are syntactic: `AstType { base: BaseTy,
  suffix: TypeSuffix, span }` where `BaseTy` is the 14 builtins or
  `Named(String)` (class/enum), and `TypeSuffix` is `None | DynArray |
  FixedArray(n) | Pointer`. `Expr::span()` gives the checker/interpreter
  one accessor. `ast/ops.rs` holds the operator enums with `symbol()`.
- **Two-pass parser** (`src/parser/`, §5.2): **pass 1** `hoist_decls`
  walks the tokens once and collects every top-level `function`/`class`/
  `enum` name into a `NameTable` (name → kind; classes also record their
  `init` method's arity for phase 3's `new Counter(…)` checks). That
  table disambiguates `Counter c = …` from expression statements before
  anything is parsed, and makes functions/classes usable before their
  source position. **Pass 2** is one function per §3 rule: `decl.rs`
  (declarations + types), `stmt.rs` (statements + assignment),
  `expr.rs` (precedence layering or→and→…→unary→postfix→primary).
- **The §3 ambiguity table, implemented structurally**: `IDENT IDENT`
  (and `IDENT [N] IDENT`) at statement start → declaration when the head
  name is a known class/enum, otherwise the dedicated **T1002 unknown
  type** error with a Levenshtein did-you-mean over builtin + declared
  type names; type keyword + `(` → cast, else declaration; `*p = 5` vs
  `*p * 2` resolved by parsing an expression first and then requiring an
  lvalue (`Ident | Field | Index | Unary(Deref)`) when an assignment
  operator follows; mandatory braces make dangling-else impossible.
  Guard added: `IDENT * IDENT` with an *unknown* head stays
  multiplication (`x * y;` is a legal expression statement).
- **Error recovery** (§5.2): statement-level errors are recorded as
  T1xxx diagnostics and the parser skips to the next `;` or `}` and
  continues — one run shows *all* errors. Block statement lists and
  class-member lists recover individually, so a bad line keeps its
  enclosing `if`/class. Display caps at **10** errors, then
  `…and N more — fix these first` (CLI). The sync step always advances
  (stray `}` regression-tested), and `parse_recovering()` returns the
  partial program alongside the errors.
- **New T1xxx family** in diagnostics: T1001 unexpected token,
  T1002 unknown type, T1003 invalid assignment target, T1004 chained
  assignment (`x = y = 5` gets its own teaching error), T1005 stacked
  type suffixes. All carry span + label + hint.
- **CLI**: `--ast <file>` prints the pretty tree (also `--ast=<file>`);
  `tic <file>` / `run` / `check` / `--trace` now lex + parse for real
  and then stop at a clean T4001 "type checking … phase 3" stub;
  `--tokens` unchanged; failures can render several errors per run.

### File list (lines)

New this phase:

| File | Lines | Role |
|---|---|---|
| `src/ast/mod.rs` | 384 | Program/Decl/Stmt/Expr, AstType, Ident, `span()` |
| `src/ast/ops.rs` | 103 | BinaryOp/UnaryOp/AssignOp + `symbol()` |
| `src/ast/display.rs` | 263 | the `--ast` pretty-printer (stable, tested) |
| `src/parser/mod.rs` | 196 | `parse`/`parse_recovering`, Parser core, recovery |
| `src/parser/decl.rs` | 341 | pass-1 hoist + NameTable; decl & type rules |
| `src/parser/errors.rs` | 165 | T1xxx helpers, token descriptions, MAX_SHOWN |
| `src/parser/stmt.rs` | 317 | statements, dispatch, assignment/lvalue |
| `src/parser/expr.rs` | 306 | precedence chain, literals, casts, new |
| `src/diagnostics/tests.rs` | 128 | moved out of mod.rs (grew past the cap) |
| `tests/parse_unit.rs` | 398 | stmt/expr shapes + ambiguity cases |
| `tests/parse_decls.rs` | 86 | function/class/enum shapes + spans |
| `tests/parse_errors.rs` | 134 | T1xxx codes, recovery, 10-error cap |
| `tests/examples_parse.rs` | 74 | all 9 examples parse with 0 errors |

Changed: `src/diagnostics/mod.rs` (+T1xxx variants, 347), `src/cli/mod.rs`
(multi-error Failure, `--ast`, phase-3 stubs, 280), `src/cli/tests.rs`
(252), `src/lib.rs` (24). Crate total ≈ 5,190 lines incl. tests.
`cargo build`/`cargo test` warning-clean; **111 tests passing**
(71 unit + 40 integration; 55 new this phase).

### Interfaces for later phases

- `parser::parse(&[Token]) -> Result<Program, ParseErrors>` and
  `parser::parse_recovering(&[Token]) -> (Program, ParseErrors)` (the
  REPL will want the partial program).
- `parser::NameTable` (`kind`, `is_type_name`, `type_names`) — phase 3
  should rebuild a richer symbol table itself, but the hoist pass already
  answers "which names are classes/enums/functions, and each class's
  `init` arity".
- `ast::AstType::to_source()` spells any type the way the student wrote
  it — reuse it in checker error messages. `Expr::span()` and the
  `Ident { name, span }` pairs on every name-bearing node are the
  underline points for T2xxx/T3xxx.
- For phase 3 specifically: `FunctionDecl::return_ty == None` means
  **unit**; else-if chains are nested `Stmt::If` inside `else_branch`;
  `For.init/update` are single `Option<Box<Stmt>>` (var-decl or assign);
  top-level interleaving of decls and stmts is *not* preserved (§2.6
  rule 6: declarations are collected first, then stmts run top to
  bottom).

### Deviations from PLAN.md

1. **Function return type is optional** — §3 says `"->" type` is
   required, but §8.3's own example and `07_classes.tic`/`99_capstone.tic`
   use `function init() { … }`. Decision (pre-agreed): no `->` = unit;
   `return;` and falling off the end are legal there. §2.4's "return
   type mandatory" comment loses to the examples.
2. **`Expr::This` and `Expr::TypeName` added** beyond §4.4's sketch —
   `this.count` (a keyword, so not an `Ident`) and `size_of(i32)` (a type
   keyword in argument position; example 02 needs it) cannot be spelled
   otherwise. The checker must restrict `TypeName` to `size_of`'s
   argument.
3. **`For.update` is `Option<Box<Stmt>>`**, not §4.4's `Vec<Stmt>` — the
   §3 grammar allows exactly one `assign_no_semi` there.
4. **One type suffix per type** (T1005 on stacking) — §3's
   `base_type { "[]" }` literally allows `i32[][]`, but v1 semantics
   (§5.3: no `T**`) and a simpler checker say no arrays-of-arrays or
   pointers-to-pointers. The grammar's `[ INT ]`-with-optional-INT vs
   `[]` ambiguity is resolved per §2.1: `[N]` fixed, `[]` dynamic.
5. **Parser layout**: `decl.rs` holds pass 1 + declarations + types, not
   everything in `mod.rs`; and the parser's unit tests live in
   `tests/*.rs` (public API only) instead of a sibling `tests.rs` — the
   repo's 5-files-per-directory cap beats the sibling convention once
   `decl/stmt/expr/errors` exist. `parse_recovering` was added as public
   API so those tests can see recovered programs.
6. **Trailing commas only in the two literals** (`[1, 2,]`,
   `{a: 1,}`) as specified; enums, parameter lists and call arguments
   stay strict (§3 grammar).
7. **Lone `;` produces no Stmt node** — §3 lists `";"` as a statement
   but the AST sketch has no Empty variant; empty statements are dropped
   at the statement-list level.
8. **`{}` is not an empty obj literal** — §3 requires at least one
   field, matching §2.1's "no zero value for obj".
9. **`--trace` stub now says phase 3** (type checking), like run/check —
   continuing phase 0+1 deviation 9's "the placeholder walks the real
   pipeline order" rule; its *final* blocker remains the phase-4
   interpreter.
10. **Diagnostics tests moved to `diagnostics/tests.rs`** — the T1xxx
    arms pushed `mod.rs` past the ~400-line soft cap.

### Status vs §10 acceptance criteria

Row 2 (parser): `--ast` dumps the full capstone (`cargo run -- --ast
examples/objects/99_capstone.tic`, 96 lines of tree); error recovery
shows all errors in one run (`recovery_reports_every_error…`,
`display_caps_at_ten_errors…`, CLI test `parse_errors_all_come_back_in_one_run`);
ambiguity unit tests for decl-vs-expr, cast-vs-keyword,
deref-assign-vs-multiplication and else-binding all pass; all 9 example
programs parse with 0 errors (`tests/examples_parse.rs`).

## Phase 3 — static type checker + obj shape inference (done 2026-10-30)

### What was built

- **`checker/types.rs`** — the checker's type world per §4.4: `TicType`
  (I8…U64, F32/F64, Bool, Char, Str, `FixedArray(Box, usize)`,
  `DynArray(Box)`, `Obj(ShapeId)`, `Class(name)`, `Enum(name)`,
  `Pointer(Box)`, `Unit`) plus one deliberate addition, **`Dynamic`** —
  the static type of a field read on a *bare* `obj` (§5.4's runtime
  escape hatch); it is compatible with everything and the runtime
  re-checks. `Null` is dropped from the type grammar as allowed: null is
  a *value* that only type-checks in pointer contexts (`i32* p = null;`,
  `p == null`), modelled by `check_against` + a null peek in `==`.
  `Shape { fields: BTreeMap<String, TicType> }` gives order-insensitive
  equality; `ShapeTable` interns shapes → `ShapeId` (`ShapeId::BARE` = 0
  reserved for the declared-bare `obj`). Also lives here: the
  **`CheckedProgram`** (below) and the side tables `ExprTypes` /
  `DeclTypes` (types keyed by `Span`).
- **`checker/scope.rs`** — compile-time scope stack: one frame per
  block/function/`for`, globals in the bottom frame, duplicate detection
  inside a frame, shadowing between frames; `final` flags survive
  lookup.
- **`checker/stmt.rs`** — statement rules: declarations (dupes across
  the top-level namespace — globals collide with functions/classes/
  enums, locals may shadow), `final` must be initialised and never
  reassigned, initialiser must match, conditions must be `bool`,
  `return` must match the signature (a value in a unit function is an
  error; bare `return;` and falling off the end are legal everywhere in
  v1), assignments (lvalue forms: name / field / index / `*p`,
  compound ops reuse the binary rules), and `AstType` → `TicType`
  resolution with did-you-mean on unknown type names. An `obj`-declared
  variable is **refined** to its literal's shape, so `obj user =
  { name: "Ada", … }` gives `user` a *known* shape.
- **`checker/expr/`** — expression inference, split one concern per
  file (the 5-files-per-directory rule forced a subfolder):
  - `mod.rs` — the `infer`/`check_against` entry points (expectation
    threading + the side-table recording), `assign_ok` (structural
    compatibility; `Dynamic` and bare-`obj` slots accept anything),
    `mismatch` (obj shapes get T2024 with both shapes spelled out,
    everything else T2003 with a cast hint), name resolution with
    teaching notes ("`f` is a function — call it: `f(…)`").
  - `ops.rs` — binary/unary operators. **Literal anchoring**: a numeric
    literal takes the other side's type first, so `i8 big = 127;
    big + 1` is i8 arithmetic and `score >= 90` compares i32s; two
    literals take an outer numeric expectation (`i8 x = 1 + 2;`) or
    default to i32/f64. `str + anything` concatenates (str must be on
    the LEFT), `==`/`!=` per §2.3 (same-type scalars, str content,
    same enum, same-type pointers, same-class instances — never objs,
    arrays, or cross-enum), `< > <= >=` for same-type numerics or
    char pairs, `&&`/`||`/`!` for bools, `&` only on places (variable,
    field, index, `*p`), `*` only on pointers.
  - `values.rs` — indexing (array × any int type → element), field
    access (class field table; `Enum.Idle` variant check; known obj
    shape static check; bare `obj` → `Dynamic` for the runtime), array
    literals (elements against the declared element type, fixed size
    must match exactly, literals adapt) and obj literals (shape
    interned §5.4; duplicate field names are T2001).
  - `calls.rs` — user calls (arity + per-argument types + return),
    method calls (`WrongArity` names read `Class.method`; calling a
    field is T2026), casts per the README table (numeric↔numeric,
    char↔int, scalar→str, str→int/float runtime-parse; identity casts
    are no-ops; everything else T2016 with a specific hint — `bool(1)`
    explains bools come from comparisons), and `new Class(args)`
    forwarding to `init` (arity against init's params, 0 when the
    class has none).
  - `builtins.rs` — the §2.5 table the checker enforces: `print` any
    values → unit, `input(str) -> str`, `len(str|array) -> i32`,
    `push/insert/remove/pop` on **dynamic** arrays only (a fixed array
    gets a teaching mismatch), `range(1–3 ints) -> i32[]`,
    `size_of(<scalar type name>) -> i32`, `sqrt/floor/ceil/pow` on
    f64, `abs/min/max` same-numeric-type in and out, `random(i32, i32)
    -> i32`, `copy(array) -> same type`. User functions shadow
    builtins; `Expr::TypeName` is only legal as `size_of`'s argument
    (T2018 anywhere else).
- **`checker/mod.rs`** — the driver: `check(program) -> Result<
  CheckedProgram, Vec<TicError>>` (every error in one run, like the
  parser). Three stages: (1) collect signatures — **all names reserved
  first, then resolved**, so a function may take a `Counter` parameter
  declared later in the file; class layout (fields, methods, `init`
  must return unit), enums + duplicate-variant check; (2) check
  top-level statements, declaring globals in order (they collide with
  declaration names); (3) check every function/method body — after the
  globals, so example 99's `bump` can read `MAX`. Stage 3 ends with the
  §5.4 return-unification: a function returning `obj` must return
  literals of ONE shape (T2024 naming both).
- **CLI**: `tic check <file>` is real — prints nothing and exits 0 on
  success; T2xxx diagnostics (capped at 10 shown + "…and N more") exit
  1. `tic <file>` / `run` / `--trace` now lex + parse + **check** and
  then stop at a clean T4001 "the interpreter arrives in phase 4".
  `--tokens`/`--ast` unchanged.

### File list (lines)

| File | Lines | Role |
|---|---|---|
| `src/checker/mod.rs` | 429 | `check()`, 3-stage driver, class/enum/signature collection |
| `src/checker/types.rs` | 428 | `TicType`, `Shape`/`ShapeTable`, `CheckedProgram`, side tables |
| `src/checker/scope.rs` | 160 | compile-time scope stack |
| `src/checker/stmt.rs` | 362 | statements + `AstType`→`TicType` + assignment targets |
| `src/checker/expr/mod.rs` | 272 | infer/check_against/assign_ok/mismatch, names |
| `src/checker/expr/ops.rs` | 435 | operators, literal anchoring, `==` table, hints |
| `src/checker/expr/values.rs` | 262 | indexing, fields, array/obj literals |
| `src/checker/expr/calls.rs` | 343 | calls, methods, casts, `new` |
| `src/checker/expr/builtins.rs` | 273 | the §2.5 builtin signatures |
| `tests/checker.rs` | 294 | 9 examples + 64-case reject bank + hint/accept tests |

Changed: `src/cli/mod.rs` (309, real check wiring + `Failure::checked`),
`src/cli/tests.rs` (282, check-succeeds / run+trace-stop-at-phase-4 /
type-error-batch tests), `src/lib.rs` (27, `pub mod checker` +
re-exports), `src/diagnostics/text.rs` (SizeOfArg hint no longer
suggests `str`). Crate total ≈ 8,900 lines of Rust incl. tests (`src/` + `tests/`). `cargo build`
and `cargo test` are warning-clean; **143 tests passing** (85 unit +
58 integration; 32 new this phase: 18 in `tests/checker.rs`, plus
scope/types/expr unit tests and 4 new CLI tests).

### Interfaces for phase 4 (the interpreter)

- `tic::checker::check(&Program) -> Result<CheckedProgram, Vec<TicError>>`.
- **`CheckedProgram`**: `functions: Vec<CheckedFunction>` (name,
  `params: Vec<CheckedParam { name, ty, span }>`, `return_ty` (Unit
  when there is no `-> type`), `body: Block` — the AST clone, its
  spans are the side-table keys), `classes: Vec<CheckedClass>`
  (`fields` in declaration order + `field_index`, `methods` +
  `method_index`, `init: Option<usize>` — `new` forwards its args to
  that method's params), `enums: Vec<CheckedEnum>` (ordered variants),
  `shapes: ShapeTable`, `stmts: Vec<Stmt>` (top-level, run order), and
  the two side tables.
- **Expression types**: `checked.expr_types.get(expr.span())` (or
  `.expect(span)` — the checker records a type for *every* expression
  it visits, `null` included under a pointer expectation). The recorded
  type of an int literal is its **adapted** type (`big + 1` records i8)
  — use it for width-checked arithmetic. `TicType::Dynamic` means
  "bare obj field — re-check at runtime".
- **Declaration types**: `checked.decl_types.get(ident.span)` for any
  parameter/local/global/`for` variable; for `obj x = {…}` this is the
  **refined** `Obj(ShapeId)`, not the written bare `obj`.
- **Shapes**: `checked.shapes.get(shape_id) -> Option<&Shape>` (`None`
  for `ShapeId::BARE`); identical field sets intern to one id, so
  "equal shape" is id equality. Runtime must still check field access
  on BARE objs (friendly error if missing) and obj writes of new
  fields never reach it (compile error).
- Runtime duties the checker deliberately left open (P1): overflow per
  the recorded width (`i8 127 + 1`), division by zero (including
  `1 / 0` — statically well-typed, **no constant folding anywhere`),
  array bounds, null deref, bare-obj field checks, recursion depth.
- The CLI's `run`/`--trace` arm calls `check` then fails with
  `NotImplemented { what: "the interpreter", phase: 4 }` — extend those
  arms in `src/cli/mod.rs` when phase 4 lands.

### Deviations from PLAN.md

1. **`TicType::Dynamic` added** (not in §4.4's sketch) — the static
   type of bare-`obj` field reads, §5.4's one dynamic escape hatch;
   `Null` dropped (allowed by the plan sketch's spirit and the task
   brief): null is a value that only pointer contexts accept.
2. **Types attach via span-keyed side tables** (`ExprTypes`,
   `DeclTypes`), not annotations on the AST — the AST stays unchanged
   and phase 4 looks types up while walking the same tree (spans are
   unique per expression node; `(x)` keeps x's own span).
3. **Int literals adapt within the int family only; float literals
   within f32/f64.** `f64 x = 7;` is T2003 ("write 7.0 or f64(7)") and
   `1 + 2.5` is T2012 with the f64 cast hint — matches "no implicit
   numeric conversions" and example 02, which spells `f64(7) / f64(2)`
   instead of relying on mixing. Literal *range* is not checked
   statically (`i8 x = 200;` passes and fails at runtime, per P1).
4. **No compile-time constant folding anywhere** (`1 / 0` in a
   condition is statically well-typed) — pre-agreed binding decision.
5. **`size_of(str)` rejected** (T2017) — README's size table lists the
   13 fixed-size scalars and omits str; the T2017 hint was updated to
   say so (hint text is the one diagnostics change this phase).
6. **Builtin signatures chosen now** so phase 5 implements against
   them: `sqrt/floor/ceil/pow` take f64 → f64, `abs/min/max` are
   same-numeric-type in and out, `random(i32, i32) -> i32`,
   `copy(arr) -> same array type`, `push/insert/remove/pop` accept
   dynamic arrays only. User functions shadow builtins.
7. **Checker layout is a subfolder** (`checker/expr/{mod,ops,values,
   calls,builtins}.rs`) — the repo's 5-files-per-directory rule beats
   flat siblings once expression inference is 5 concerns; every file
   also respects the ~400-line soft cap (max 435).
8. **All type errors in one run** (the checker, like the parser,
   collects a `Vec<TicError>`); the CLI shows 10 + "…and N more".
9. **Bare `return;` in a value-returning function is legal** (returns
   the zero value, same as falling off the end) — v1 leniency; a
   `return expr;` that mismatches the signature is still T2003.
10. **`range`'s arity error uses T2003 text** naming the three call
    shapes — `WrongArity`'s message names exactly one count, which
    would lie for a 1–3-argument builtin.
11. **"Shape mismatch on param" cannot occur in v1** (parameters can
    only be written `obj` = bare, which accepts every shape); the
    reject bank covers shape mismatch on assignment and on returns,
    which are the reachable cases.
12. **Globals are visible in every function body** regardless of
    source order (two-pass semantics, §2.6 rule 6); whether a global
    has been *initialised* before a call is a runtime question.
13. **Fixed-array literal size must match exactly** (`i32[3] a =
    [1, 2];` is T2003 counting the elements) — the plan states the
    size is "locked at creation"; the error spells both counts.

### Status vs §10 acceptance criteria

Row 3 (checker): **all T2xxx variants produced and asserted** — the
64-case reject bank in `tests/checker.rs` covers every case the row
lists (duplicate decls in six positions, final reassignment,
type-mismatch initialisers incl. int-literal-to-f64/char, non-bool
conditions, wrong arity for functions/methods/init/new, param and
return mismatches, unknown variable/function/method/field/class/enum-
variant, cross-enum and obj and array and null equality, `&` on
non-lvalues, `*` on non-pointers, `bool(1)`-style bad casts,
`size_of` on non-scalars, `TypeName` outside `size_of`, non-int array
indexes, index on non-arrays, `num + str` and `i32 + f64` (cast hint
asserted present), unknown-field write on a known obj, shape mismatch
on assignment, non-unified obj returns, assignment to a function name,
calling a variable, `this` outside a method). The capstone
type-checks: `cargo run -- check examples/objects/99_capstone.tic`
exits 0 silently; all nine examples pass; a deliberately broken file
prints T2xxx diagnostics with span + hint and exits 1.

## Phase 4 — tree-walking interpreter core (done 2026-10-30)

### What was built

- **`interp/value.rs`** — the runtime scalar world per §4.4:
  `Value::Int(i64, Width) | Float(f64, Width) | Bool | Char |
  Str(Rc<String>) | Unit`, where **`Width`** is the type the *checker*
  fixed travelling with the number (the thing that makes arithmetic
  width-checked). `Width` carries `of_type`/`name`/`int_range`/`fits_int`
  (u64 tops out at `i64::MAX` — no Tic literal can name more).
  `Value::zero(ty, span)` is §2.1's zero column; array/pointer/obj/class/
  enum zeros stop at their clean "arrives in phase 5/6" errors. The
  reference-shaped §4.4 variants are **deferred, not stubbed** — phases
  5–6 extend the enum in place. `Display` *is* the print format: ints
  plain, floats shortest round-trip with `.0` forced on whole numbers
  (`4.0`, never `4`), f32s narrowed before formatting so `0.1_f32` keeps
  the f32 spelling, bools/chars/strs per the fixtures, `inf`/`NaN` as-is.
- **`interp/env.rs`** — the runtime scope chain: a `Vec<HashMap<String,
  Slot>>`, push/pop per block/function/`for`, globals at the bottom.
  **Every variable is a slot** (`Rc<RefCell<Value>>`) from day one —
  §4.4's pointer trick. All borrowing goes through `read_slot`/
  `write_slot` (`try_borrow`/`try_borrow_mut` → friendly T3006
  InternalError, §5.5 — a Rust panic can never reach a student).
  `slot_of(name)` hands out a clone of the `Rc` itself: that is what
  phase 5's `&x` will store. Assignments write *through* the slot and
  never re-box a variable (`Rc::ptr_eq` test pins this).
- **`interp/eval/`** — the walker, split by concern (5-file rule):
  - `mod.rs` — `eval_stmt -> Result<Flow, TicError>` with `Flow =
    Normal | Return(Value)` (no break/continue in v1): declarations into
    fresh slots (zero-init without `=`), plain + compound assignment
    through the slot (`x += 1` is `x = x + 1` at the slot's width),
    if/else-if/else, while, for with its own scope, blocks, the
    `--trace` step after every executed statement, and the §12 nesting
    guard shared with `expr.rs`.
  - `expr.rs` — `eval_expr`: literals take their **adapted** recorded
    type (`i8 big = 127` makes the `127` an i8; a literal that cannot
    fit — `i8 x = 200;` slipped past the checker on purpose — refuses
    right there), names through slots, casts via `ops`, and `&&`/`||`
    **here** because short-circuiting means the right side must not even
    be evaluated (`false && (1 / 0 > 0)` prints `false`).
  - `ops.rs` — binary/unary/compound ops and the cast table, as free
    functions over already-evaluated `Value`s: `checked_*` plus the
    per-width range clamp ("i8 overflow (127 + 1)", "u8 overflow (0 -
    1)"), `i / i` truncating division, `i % 0` and `f / 0.0` → T3002,
    **no constant folding anywhere** (`1 / 0` in a condition is a
    runtime lesson), str on the LEFT of `+` converts the right
    (Java-style), str `==` by content, casts truncate toward zero
    (`i32(-2.7)` = −2) with range checks, `char(int)` rejects surrogates
    and > U+10FFFF, and str→int/float **parses at runtime**, naming the
    offending text ("`abc` is not a valid i32", T3004).
  - `calls.rs` — argument binding into a fresh frame, `Flow::Return`
    unwinding, the `--max-depth` cap (T3003, default 1000), functions
    callable before their definition (the checker collected them), user
    functions shadowing builtins, and the phase-3 decision: falling off
    the end — or a bare `return;` — yields `Value::zero(return_ty)`
    (Unit functions return Unit).
- **`interp/builtins.rs`** — phase 4's slice of §2.5: `print`
  (space-separated + newline, through the Writer), `sqrt floor ceil pow`
  (f64→f64) and `abs min max` (same numeric type in and out), with
  exactly the signatures phase 3 fixed. The phase-5 names (`input len
  push pop insert remove range size_of random copy`) answer a clean
  T4001 "… arrives in phase 5", never a panic.
- **`interp/mod.rs`** — the public seam: `run(&CheckedProgram, &mut dyn
  Writer, RunOptions) -> Result<(), TicError>` executes the top-level
  stmts top-to-bottom (§2.6 rule 6; a top-level `return;` just ends the
  program). **`Writer`** is the test seam now and the WASM seam later;
  `StdoutWriter` is the default. Two guards keep P1 true: the Tic call
  depth (`--max-depth`) and `NEST_LIMIT = 1024` — a per-*function*
  walker-recursion budget that resets at every call boundary, so deeply
  nested Tic expressions get the friendly T3005 instead of a Rust stack
  overflow.
- **New T3xxx family** in diagnostics: T3001 NumericOverflow, T3002
  DivisionByZero, T3003 TooMuchRecursion, T3004 CastFailed, T3005
  TooDeeplyNested, T3006 InternalError — all with span, label and hint;
  rendered exactly like compile errors (file/line via miette), exit 2.
- **CLI**: `tic <file>` / `run` / `--trace` run for real; `--max-depth`
  honored; runtime errors render with source and exit 2. `run_checked`
  executes on a thread with a stack sized for the depth limit (8 MiB +
  16 KiB × max-depth) so the friendly T3003 always beats the native
  stack, whatever the limit.

### File list (lines)

New this phase:

| File | Lines | Role |
|---|---|---|
| `src/interp/mod.rs` | 160 | `run`, `RunOptions`, `Writer`/`StdoutWriter`, `Flow`, `Interp`, `NEST_LIMIT` |
| `src/interp/value.rs` | 251 | `Value`, `Width`, `Value::zero`, print formats (+4 tests) |
| `src/interp/env.rs` | 207 | scope chain of slots, `read_slot`/`write_slot` (+5 tests) |
| `src/interp/builtins.rs` | 142 | `print` + math toolbox, phase-5 stubs (+1 test) |
| `src/interp/eval/mod.rs` | 221 | statements, assignment, loops, blocks, trace step |
| `src/interp/eval/expr.rs` | 127 | literals, names, short-circuit, phase 5/6 gates |
| `src/interp/eval/ops.rs` | 411 | width-checked ops + the cast table (+7 tests) |
| `src/interp/eval/calls.rs` | 101 | frames, depth cap, zero-value fall-off |
| `tests/interp/main.rs` | 69 | the shared harness: `VecWriter`, `run_src`, big-stack runner |
| `tests/interp/fixtures.rs` | 109 | the three acceptance fixtures, byte-for-byte |
| `tests/interp/scalars.rs` | 269 | the runs-fine bank: formats, slots, casts, functions |
| `tests/interp/runtime_errors.rs` | 220 | the failure bank: overflow ×8 widths, T3002–T3005 |

Changed: `src/cli/mod.rs` (309 → 344: real run/trace wiring, stack-sized
runner thread), `src/cli/tests.rs` (282 → 325: run/exit-2/`--max-depth`
tests), `src/diagnostics/mod.rs` (347 → 390: the six T3xxx variants),
`src/diagnostics/text.rs` (+the six T3xxx arms, 421), `src/lib.rs`
(24 → 29: re-export `run`/`RunOptions`/`Writer`). Crate total ≈ 11,350
lines incl. tests. `cargo build`/`cargo test` warning-clean; **211 tests
passing** (106 unit + 105 integration; 68 new this phase). One targeted
`#[allow(dead_code)]`: `Env::set` (the name-based slot write the REPL
and phase 5 helpers want, kept beside the slot API it belongs to).

### Interfaces for phase 5 (memory: arrays + pointers + builtins)

- **Entry**: `interp::run(&CheckedProgram, &mut dyn Writer, RunOptions)`
  — `RunOptions { max_depth, trace }`. All output MUST go through
  `Writer::write`/`write_line`; tests use a `VecWriter`, the CLI uses
  `StdoutWriter` (on its depth-sized thread — keep walker frames small
  or reuse `cli::run_checked`).
- **`Value` layout**: `Int(i64, Width) | Float(f64, Width) | Bool |
  Char | Str(Rc<String>) | Unit`. Add `Array(Rc<RefCell<Vec<Value>>>,
  TicType)`, `Pointer(Slot)` (§4.4's `Pointer(Rc<RefCell<Value>>)` IS
  the slot type — `env::Slot`), `Object/Instance/EnumValue` in phase 6.
  Extend `Value::zero` and `Display` (enum values print the bare variant
  name; `null` prints `null`). Floats carry f64 storage with an F32
  tag; f32 arithmetic runs in f64 precision and narrows for printing.
- **Slot mechanics**: every variable already lives in an
  `Rc<RefCell<Value>>` slot. `env.slot_of(name) -> Option<Slot>` clones
  the `Rc` — `&x` stores that; `*p` reads/writes via `read_slot`/
  `write_slot` (the only sanctioned borrow paths, friendly T3006 on
  failure). Assignment NEVER re-boxes (`Rc::ptr_eq` test). Dangling is
  impossible by construction: the slot's `Rc` keeps it alive.
- **Dispatch lives in**: `eval/mod.rs` (statements + compound
  assignment + trace), `eval/expr.rs` (expression match — the
  `Index`/`ArrayLit`/`NullLit`/`AddrOf`/`Deref` arms currently return
  `NotImplemented { what: "arrays"|"pointers", phase: 5 }`), `eval/
  ops.rs` (`binary`/`unary`/`compound`/`cast` — pure functions over
  `Value`s; `le()` there is the comparison core), `eval/calls.rs`
  (`eval_call` + `call_function`). `Interp` fields: `program`, `env`,
  `writer`, `max_depth`, `call_depth`, `frames` (per-function nesting,
  reset at each call boundary), `trace`. `ty_of(expr)` returns the
  checker's recorded type — for literals the **adapted** one.
- **`Flow`**: `Normal | Return(Value)`; loops and blocks propagate
  `Return` outward; `call_function` turns Unit/bare-return/fall-off
  into `Value::zero(return_ty)`. Phase-5 statements (e.g. bounds errors)
  just return `Err(TicError)` with a span; add T3xxx variants as needed
  (T3007+).
- **Adding builtins**: extend the match in `interp/builtins.rs::
  call_builtin` and keep `BUILTIN_NAMES` in sync with the checker's
  table (`src/checker/expr/builtins.rs`). `eval_call` resolves user
  functions FIRST (user shadows builtin), then builtins. The phase-5
  roster and its signatures are already fixed checker-side (`len str|
  array -> i32`, `push/insert/remove/pop` on dynamic arrays, `range ->
  i32[]`, `size_of(type) -> i32` (1/2/4/8 + char=4), `random(i32,i32)
  -> i32`, `copy -> same`, `input(str) -> str`).
- **Example 02** currently stops at its first line (`size_of` is phase
  5) with the clean phase-5 error; its exit-2 i8-overflow fixture goes
  live the moment `size_of` lands.

### Deviations from PLAN.md

1. **`run` executes on a stack-sized thread** (8 MiB + 16 KiB ×
   max-depth) — §12 names the depth cap as the mitigation, but at a
   huge `--max-depth` the walker needs the headroom to raise the
   friendly T3003 first. The interpreter API itself is single-threaded
   and thread-agnostic.
2. **`NEST_LIMIT` (1024) added** on top of `--max-depth` — a
   per-function walker-recursion budget (reset at call boundaries) so a
   pathological expression nest cannot blow the Rust stack even at
   depth 1. Not in the plan's sketches; the §12 risk row's spirit.
3. **Reference-shaped `Value` variants deferred** rather than added as
   empty stubs (the brief allowed either choice): the enum stays
   scalar-clean, and every phase-5/6 construct already gates at a
   tested `NotImplemented` error site.
4. **`u64` tops out at `i64::MAX`** — §4.4 stores `Int(i64, Width)`,
   and no Tic literal can name anything bigger; the range helper and
   the u64 overflow test say so.
5. **f32 arithmetic runs in f64 precision** (storage is `Float(f64,
   Width)`, narrowed only when printing/casting back) — keeps one
   numeric path; a teaching interpreter gains clarity and loses nothing
   a student can observe.
6. **Overflow headline reads "runtime overflow: …"** ("runtime
   overflow: i8 overflow (127 + 1)") where §2.6 sketched "runtime
   error: …" — the family prefix keeps T3xxx messages uniform; file,
   line and the exact `(127 + 1)` detail all appear in the render.
7. **`--trace` format chosen**: `[trace] name = value, …` (name-sorted)
   after *every executed statement* — nested statements included, so a
   block contributes its inner lines — and `[trace] (no variables)` for
   an empty scope; polish stays phase 7's (§7).
8. **`print()` with no arguments prints one empty line** — §2.5's
   "print(a, b, …)" never says what zero arguments mean; the empty line
   matches every other space-joined arity.
9. **`Value::Unit` displays as `()`** — the plan never fixes a unit
   spelling; `()` reads like every ML teaching language.
10. **Interpreter tests live in `tests/interp/`** (one integration
    target with `main.rs` + three sibling modules, shared `VecWriter`
    harness) — §4.3 sketched `tests/integration/`; the name says what
    runs through it and the 5-files-per-directory cap holds (4 files).
11. **Deep-recursion tests run on a 64 MiB thread** (`run_src_big_stack`
    in the harness) — a legitimate 1000-frame Tic run does not fit the
    2 MiB default test-thread stack; the CLI's depth-sized runner thread
    is the same concession, made once and shared.
12. **`min`/`max` reuse `<=`** rather than dedicated arms — one
    comparison core in `ops.rs`, both orders tested.

### Status vs §10 acceptance criteria

Row 4 (interpreter core): **01/03/04 run with stdout exactly matching
their `expected/*.stdout` fixtures** — `tests/interp/fixtures.rs` runs
each through the public API with a `Vec`-writing `Writer` and compares
byte-for-byte (re-verified through the built binary with `diff`).
Overflow tests hit **all eight widths** (i8 127+1 with the plan's exact
wording first) plus unsigned underflow, multiplication, compound
assignment, out-of-range literals, negation and `abs`; division by zero
covers int/int-rem/float/float-rem; the recursion cap is tested at the
default 1000 (999 fits, 1000 refuses) and a custom `--max-depth`,
mutual recursion included; casts cover truncation both signs, str-parse
failures naming the text, parse-but-out-of-range, huge-float and
non-code-point `char()`; zero-value fall-off and bare `return;` are
pinned; slot mutation is pinned (`Rc::ptr_eq` + block-write-visibility
tests); `final` is proven compile-side only (T2021 at check, runs fine
otherwise); the nesting guard raises T3005 on a 1100-deep expression;
02/05/06 stop at clean phase-5 errors and 07/08/99 at phase-6 errors
(exit 1, no panics); runtime errors render with file/line via the
existing diagnostics and exit 2.

## Phase 5 — memory: arrays, pointers, the remaining builtins (done 2026-10-30)

### What was built

- **`interp/value.rs` extended in place** with §4.4's reference half:
  `Array(Rc<RefCell<Vec<Slot>>>, TicType)`, `Pointer(Slot)` and `Null`
  (a distinct value — a `Pointer(slot)` can never *be* null). **`Slot`
  moved here** from `env.rs` (it is a value-level concept now that
  array elements are slots too). `Value::zero` grows the §2.1 column:
  `T[N]` → n zero element slots, `T[]` → the empty array, `T*` → null.
  `Display` pins the print formats: arrays as `[1, 2, 3]` (strs/chars
  quoted inside so elements stay readable), pointers as `ptr` (an
  address noun — showing the pointee would teach the wrong lesson),
  null as `null`. New `Value::kind()` is the shared noun for every
  "… reached the interpreter" message.
- **`interp/memory.rs` (new, the §4.3-sketched file)** — the memory
  layer: friendly outer-borrow helpers (`cells_ref`/`cells_mut`, the
  array-side twins of `read_slot`/`write_slot`), the bounds check whose
  T3007 names the index *and* the length, `&place`/`*p` read+write,
  bounds-checked element read/write, array construction and `copy`.
  **`assign_slot`** is the single store path: `x = …`, `arr[i] = …` and
  `*p = …` all write through one existing slot (plain or compound), so
  assignment never re-boxes anything.
- **Arrays are boxes of element *slots*** — the one structural change
  vs §4.4's `Vec<Value>` sketch (deviation 1): the checker's `&` allows
  `&arr[i]` (Index is a place, phase 3), and element slots make that
  pointer watch the element exactly the way `&x` watches a variable
  (writes through either name show in both). Assignment and argument
  passing share the whole box — reference semantics for fixed and
  dynamic arrays alike (example 06's `alias`/`data` and a fixed-array
  twin are pinned by test).
- **Pointers via the §4.4 trick**: `&x` clones the variable's slot `Rc`
  (`env.slot_of`), `*p` reads/writes through it, `&*p` is `p` itself,
  `&arr[i]` clones the element's slot. **A pointer to a function local
  outlives the call** — the `Rc` keeps the slot alive; tested read AND
  write after return, plus two calls making two distinct boxes.
  Dereferencing `null` (read or write) is T3008 with §2.6's exact
  wording; `==`/`!=` on pointers is slot identity (`Rc::ptr_eq`), null
  equals null, a live pointer never equals null.
- **The phase-5 builtins** (`interp/builtins.rs`), signatures exactly
  as phase 3 fixed them: `len` (str = code points, arrays = elements →
  i32), `push`/`pop`/`insert`/`remove` (dynamic arrays only — a fixed
  array is a T2003 checker error and a clean T3006 runtime guard),
  `range` (1/2/3-arg → `i32[]`), `size_of` (the README byte table,
  scalar-only), `copy` (shallow: new array, fresh element slots, same
  values, same fixed/dynamic kind), `input` (prompt through the Writer,
  one line from real stdin, trailing `\n`/`\r\n` trimmed, EOF → `""`).
  **`pop` and `remove` return the removed element** (the pre-agreed
  choice; `remove`'s *static* type stays unit, so only `print(pop(a))`-
  style uses can show it). **`range` with a negative step counts down**
  (defensive support, documented here); step 0 is a friendly T3007.
  **`random(a, b)` is inclusive both ends**; reversed bounds get a
  friendly "smaller number first" error.
- **Injectable randomness**: `RunOptions` gains `random_seed:
  Option<u64>` (still `Copy`); the engine is a hand-rolled SplitMix64
  (`interp/mod.rs::Rng`, seeded once per run) — unseeded defaults to a
  per-process value from the stdlib's seeded hasher. No new
  dependencies, deterministic tests.
- **Two new T3xxx diagnostics** (exit 2, rendered with file/line like
  every teaching error): T3007 `OutOfBounds` (message *is* the detail —
  "index 3 is out of bounds — the array has 3 elements (indexes
  0..2)", "cannot pop from an empty array", the range/random misuse
  wordings) and T3008 `NullDeref` ("null pointer dereference").
- **CLI**: unchanged surface; `run`/`--trace` construct `RunOptions`
  with the new field. Example fixtures verified through the built
  binary: 02 prints all ten successful lines then exits 2 with T3001
  ("overflow" on stderr); 05 prints everything then exits 2 with T3008
  ("null" on stderr); 06 runs clean, stdout byte-exact, exit 0.

### File list (lines)

New this phase:

| File | Lines | Role |
|---|---|---|
| `src/interp/memory.rs` | 345 | cells borrows, bounds, `&`/`*`, element stores, `copy`, `assign_slot` (+3 tests) |
| `tests/interp/memory.rs` | 360 | the phase-5 bank: arrays, toolbox, bounds, pointers, identity, outlived local, seeded random (21 tests) |

Changed: `src/interp/value.rs` (251 → 374: Array/Pointer/Null, Slot,
zero, Display, kind, +1 test), `src/interp/mod.rs` (160 → 210: `Rng`,
`random_seed`, `memory` module, docs), `src/interp/builtins.rs` (142 →
341: the full roster, +1 test), `src/interp/eval/expr.rs` (127 → 141:
Index/ArrayLit/NullLit/AddrOf/Deref arms), `src/interp/eval/mod.rs`
(221 → 210: assignment delegates every store to `assign_slot`),
`src/interp/eval/ops.rs` (411 → 420: pointer/null identity arms,
shared `kind`, `compound` now `pub(crate)`), `src/interp/env.rs` (207
→ 202: `Slot` imported from value), `src/diagnostics/mod.rs` (390 →
400) and `text.rs` (421 → 433: T3007/T3008), `src/cli/mod.rs` (+1
field in `RunOptions` construction), `src/cli/tests.rs` (the phase-5
placeholder test is now phase-6-only), `tests/interp/fixtures.rs` (109
→ 187: 02/05 exit-2 fixtures, 06 byte-exact, the built-binary test,
phase-6 remainder), `tests/interp/scalars.rs` (the stub test became a
positive one), `tests/interp/main.rs` (harness docs + `mod memory`).
Crate total ≈ 12,540 lines incl. tests (`src/` 10,448 + `tests/`
2,091). `cargo build`/`cargo test` warning-clean; **241 tests
passing** (from 211; +30: 5 unit — 3 memory, 1 value-Display, 1 RNG —
and 25 integration — 21 memory bank + 4 fixtures). `tests/interp/` is
at the 5-file cap.

### Deviations from PLAN.md

1. **Array elements are `Slot`s, not bare `Value`s** — §4.4 sketched
   `Array(Rc<RefCell<Vec<Value>>>, TicType)`. Reason: the checker
   allows `&arr[i]` (its `&`-on-places rule includes Index), and only
   element *slots* make that pointer behave exactly like `&x` (writes
   through `arr[i]` or `*p` show in both). Cost: every builtin wraps
   values into slots — one helper. `copy` mints fresh slots (the
   shallow copy).
2. **`Value::Null` is its own variant** — the phase-4 interface note
   suggested only Array/Pointer, but `Pointer(Slot)` can never be null
   and `p == null` / `T* p = null;` need a value-level home (§4.4's
   own sketch includes `Null`).
3. **Pointers print as `ptr`** and arrays as `[1, 2, 3]` with strs/chars
   quoted inside — the plan never fixed either spelling; both are now
   pinned by tests (the fixtures never print them).
4. **`pop`/`remove` return the removed element** (binding decision);
   `remove`'s checker type stays `Unit`, so the value is observable
   only through `print(remove(…))`.
5. **`range` supports a negative step** (counts down to just past
   `b`) — "defensively if trivial" per the brief; it was trivial.
   Step 0 → T3007. `insert` allows `index == len` (append position).
6. **`random(a, b)` with `a > b`** is a friendly T3007 ("smaller number
   first") rather than a swap; picks are coerced to the checker-fixed
   i32 (an i64-range pick that cannot fit is T3001).
7. **The RNG is SplitMix64 behind `RunOptions::random_seed`** — the
   brief offered "a trait object or seed"; the seed keeps `RunOptions`
   `Copy` and the whole engine ~20 lines. Unseeded entropy comes from
   `RandomState`'s per-process seed.
8. **`input` reads real stdin** (prompt through the Writer; EOF → `""`)
   — no `Reader` trait yet: nothing needs scripted input until the
   REPL (phase 8) or tests want it; the seam to add is obvious and
   documented in `interp/mod.rs`'s header.
9. **T3007's message is the detail itself** (no "out of bounds:"
   prefix) so the headline reads "index 5 is out of bounds — the array
   has 3 elements (indexes 0..2)" — the code already says the family.
   T3008 uses §2.6's exact "null pointer dereference".
10. **`size_of` maps the byte table at runtime from the `BaseTy`** the
    parser recorded in `Expr::TypeName` — the checker (T2017) is the
    real gate; the runtime keeps a defensive internal error only.
11. **`eval::ops` is now `pub(super)` and `compound` `pub(crate)`** so
    `memory.rs` shares the one compound-store implementation — an
    internal visibility change, no behaviour.
12. **`eval/ops.rs` is 420 lines** — just over the ~400 soft cap
    (phase-3 precedent: 435). Its test module is 150 of those; a split
    would separate the cast table from the operator table for no
    teaching gain, so it stays for now.
13. **`tests/interp/fixtures.rs` spawns the built binary**
    (`CARGO_BIN_EXE_tic`) for 02/05 — the first process-level test, so
    the public exit-code contract (stdout byte-exact, exit 2, stderr
    names the lesson) is pinned the way a student sees it, not only
    through the library API.
14. **`&x.field` still gates at the phase-6 placeholder** (`memory.rs`
    `eval_addr_of`'s Field arm) — the checker allows it, but no field
    can exist before instances do; phase 6 replaces the arm with a
    field-slot lookup (see below).

### Status vs §10 acceptance criteria

Row 5 (memory): **02 and 06 run** — 02 prints all ten successful lines
then stops at its teaching i8 overflow (stdout byte-exact vs
`expected/`, `.exit` = 2, stderr contains "overflow", verified through
the public API *and* the built binary); 06 runs clean and byte-exact
(exit 0). Bounds errors cover read, write, negative index, index ==
len, pop-empty, insert/remove past the end — each T3007 with span and
the index+length wording; null deref covers read and write through
`*p` (T3008, rendered with file:line); pointer identity, aliasing
through assignment *and* function arguments (fixed arrays included),
`copy` independence vs aliasing, the **outlived-local guarantee**
(read + write after return), the fixed-array size lock (checker T2003
+ the runtime guard), `&arr[i]` (including a pointer to a popped
element staying valid), seeded `random` determinism/inclusivity, the
full `size_of` table and `range`'s three forms (+ negative step, step
0 refused) are all pinned. 05's fixture also verified end-to-end
(stdout byte-exact, exit 2, stderr contains "null").

### Interfaces for phase 6 (classes, enums, objs)

- **Reference values follow the Array pattern**: one new `Value`
  variant per reference kind, wrapping `Rc<RefCell<Inner>>`, cloned to
  share. Add `Object(Rc<RefCell<ObjData>>, ShapeId)`,
  `Instance(Rc<RefCell<ClassInstance>>)`, and `EnumValue { enum_name:
  String, variant: String }` (§4.4) plus `kind()` arms. Enum values
  print the bare variant name (README: `print(c.state)` shows `Done`).
- **Make class fields slots**: `ClassInstance { fields: Vec<Slot> }`
  (or `HashMap<String, Slot>`) laid out in the checker's
  `CheckedClass.fields` order. Then `&box.field` is literally
  `eval_addr_of`'s Field arm doing a field-slot lookup — the same
  trick as `&arr[i]` — and field writes (`box.f = …`, `box.f += …`)
  are `assign_slot` on that slot, so pointers-to-fields work for free.
  Replace the arm's phase-6 placeholder (the only change in memory.rs).
- **Assignment/store plumbing is done**: `eval_assign` routes
  `Ident`/`Index`/`Deref` to `assign_slot`; add the `Field` target arm
  pointing at the same helper. `Value::zero` needs arms for
  `Obj(shape)` (a `BTreeMap`-ordered bag of field slots), `Class`
  (unreachable — `new` always initializes) and `Enum` (the *first*
  variant, §2.1).
- **Equality**: add the same-enum `EnumValue` (variant names) and
  same-class `Instance` (`Rc::ptr_eq` — identity, README §"Operators")
  arms in `ops::binary`, directly beside the pointer arms; the checker
  already permits exactly those pairs.
- **Method calls** go in `eval/calls.rs`: `eval_call`'s `Expr::Field`
  callee arm is the phase-6 gate — bind `this` as a *slot holding the
  instance* (`this.count = 1` must write through), push a frame, run
  the `CheckedFunction` (methods are the same shape; `this` is not
  among `params`), depth cap included. `new` allocates the instance,
  zero-inits fields, runs `init` (index: `CheckedClass.init`) with the
  constructor args, and returns the `Instance` value.
- **Bare-obj fields** arrive as `TicType::Dynamic`: every use
  re-checks at runtime (friendly error naming the obj and the missing
  field — the `ShapeTable`/`ShapeId::BARE` machinery from phase 3
  decides which). `copy` stays array-only (the checker fixed it);
  instances alias on assignment exactly like arrays.
- **Trace/print**: `Display` arms for the new variants are all that is
  needed — `--trace` and `print` already render through it.

## Phase 6 — classes, enums, objs: reference semantics (done 2026-10-30)

### What was built

The last language-feature phase: §2.1's `ClassName` / `EnumName` / `obj`
rows, §5.4's runtime half, and §2.6 rule 4 (reference-counted, never
freed by hand). **The capstone runs** — all nine examples execute, the
three `examples/objects/` fixtures byte-exact (exit 0), verified through
the public API *and* the built binary.

- **`interp/value.rs` completed** with §4.4's final three variants:
  `Instance(Rc<RefCell<ClassInstance>>)` — one shared box whose fields
  are `Vec<(String, Slot)>` in the checker's layout order (names ride
  in the box so lookup and printing are self-contained);
  `Object(Rc<RefCell<ObjData>>, ShapeId)` — §4.4's exact shape, field
  slots stored **name-sorted** (the shape's own `BTreeMap` order, so
  two literals with the same fields store and print identically
  whatever order they were written in); `EnumValue { enum_name,
  variant }`. `Display` pins the print formats: instances
  `Counter { count: 5, label: "x" }`, objs `{ enabled: true }` (both
  with strs/chars quoted inside), enums the **bare variant name**
  (`Green` — fixture 08 depends on this). `PartialEq` is derived on the
  two new structs for Rust-level `assert_eq!` only; Tic's `==` is
  identity, decided in `ops::binary` (same deal as arrays since phase
  5).
- **`interp/eval/objects.rs` (new)** — the phase-6 walker, one concern:
  **`field_slot`** is the single lookup every field read, write and
  `&box.field` goes through (instances by box layout, objs by their
  stored fields — a missing field on an obj is §5.4's runtime check,
  T3009); `eval_field_read` / `eval_field_store` (the store path is
  `assign_slot`, so `box.f += 1` and pointers see it); `State.Idle`
  resolves here too (the head names an enum and no variable shadows it
  — the checker's exact disambiguation); `eval_obj_lit` (shape id from
  the checker, values into slots, sorted by name); `eval_new`
  (zero-init every field first, then run `init` with the constructor
  args and `this` bound, if the class has one); `eval_method_call`
  (receiver evaluated once; an obj receiver is T3009 — objs have no
  methods; a Dynamic receiver's class may lack the method — friendly
  too); and **`zero_of`**, §2.1's zero column *with the program's
  tables*: an enum's zero is its first variant, a known obj shape's
  zero is its fields zero-filled (the same name-sorted order).
- **`this` is an ordinary slot in the method's frame** holding the
  instance (`call_checked` binds it before the params): `this.count = 1`
  writes the field's slot inside the shared box, and `&this.field`
  works for free — `eval_addr_of`'s Field arm just asks `field_slot`
  (the `&arr[i]` trick, applied to fields; pinned by test, §6.4).
- **Methods are functions** in `eval/calls.rs`: `call_function` became
  **`call_checked(func, args, this, span)`** — one skeleton for plain
  calls and methods (frames, the `--max-depth` cap — a recursing method
  is refused as warmly as a recursing function — the per-function
  nesting budget, and the fall-off zero value). Fall-off now routes
  through `zero_of`, so `-> State` falls off to the first variant and a
  `-> obj` function whose returns unified falls off to the zero-filled
  shape.
- **Equality** (`eval/ops.rs`, beside the pointer arms): instances by
  `Rc::ptr_eq` on the box (identity — `c == alias` true, two `new`s
  false however similar), enum values by enum + variant (cross-enum is
  a compile error, T2013; reaching it at runtime is a friendly
  internal). Obj `==` never arrives (checker, T2013).
- **Two small checker closures** (the holes phase 6's runtime exposed,
  both T2003 with teaching hints, both in the reject bank):
  1. `obj x;` / `C c;` without an initializer are now **compile
     errors** — §2.1's zero column is "—" for both, and the previous
     behaviour (check-clean, then a T3006 "internal error" at runtime)
     broke T3006's "a bug in Tic, never in the student's program"
     promise. An enum's zero IS its first variant, so `Light l;` stays
     legal (pinned by test).
  2. A `-> obj` function whose returns unify on one shape now has its
     recorded `return_ty` **refined to that shape** (the same
     refinement `obj x = { … }` gets) — that is what makes the
     fall-off zero above honest.
- **CLI**: the phase-6 placeholder test became a positive one (the
  class/enum/obj shapes run); `--trace` shows instances (and `this`
  inside a method frame) through the ordinary `Display`.

### File list (lines)

New this phase:

| File | Lines | Role |
|---|---|---|
| `src/interp/eval/objects.rs` | 374 | `field_slot`, field read/store, `State.Idle`, obj literals, `new`/`init`, method calls, `zero_of` |
| `tests/objects/main.rs` | 62 | the target + its compact harness (`tests/interp/` is at the 5-file cap) |
| `tests/objects/classes.rs` | 195 | new/init/this, methods, aliasing, identity, field pointers, method recursion |
| `tests/objects/enums_objs.rs` | 228 | enums, objs, T3009 bank, print formats, §2.1 zero column |

Changed: `src/interp/value.rs` (374 → 516: the three variants, zero
arms, print formats, +1 test), `src/interp/eval/calls.rs` (101 → 120:
`call_checked` + `this`), `src/interp/eval/expr.rs` (141 → 150: the
This/Field/ObjLit/New arms), `src/interp/eval/mod.rs` (210 → 209:
`mod objects`, field-store arm, zeros via `zero_of`), `src/interp/eval/
ops.rs` (420 → 443: instance/enum equality), `src/interp/memory.rs`
(345 → 352: the `&box.field` arm), `src/checker/mod.rs` (429 → 461:
return-shape refinement), `src/checker/stmt.rs` (362 → 390: the
no-zero-value rejection), `tests/checker.rs` (+2 reject rows, 299),
`tests/interp/fixtures.rs` (187 → 218: 07/08/99 byte-exact + the
built-binary test), `src/cli/tests.rs` (the placeholder test turned
positive, 321). Crate total ≈ 13,720 lines incl. tests (`src/` 11,105 +
`tests/` 2,612). `cargo build`/`cargo test` warning-clean; **271 tests
passing** (from 241; +30: 26 in the new `tests/objects` target, 3 net
fixture tests — the placeholder became four acceptance tests — and the
`value.rs` print-format unit test).

### Deviations from PLAN.md

1. **`ClassInstance` carries `Vec<(String, Slot)>`** — §4.4 sketched a
   bare `Instance(Rc<RefCell<ClassInstance>>)` with lookups by
   `field_index` from `CheckedProgram`. Names in the box make lookup
   and the print format self-contained (no program table needed at
   print time); order is still the checker's layout order.
2. **Obj field slots are stored name-sorted** (the shape's `BTreeMap`
   order), not literal order — the one order that never lies, and it
   makes two same-shape literals print identically. The brief allowed
   either; this one is pinned by test.
3. **Rust-level `PartialEq` on instances/objs is content equality**
   (derived, test plumbing only). Tic-level `==` is identity (ops.rs)
   for instances and forbidden for objs — the checker enforces both, so
   the Rust derive can never lie to a student.
4. **Two checker changes in the interpreter's phase** (the no-zero-value
   rejection and the `-> obj` return-shape refinement, above) — phase 3
   left both holes because no runtime existed to expose them; both are
   §2.1/§5.4 semantics, not new features, and both are in the reject
   bank / phase-6 tests.
5. **`State.Idle` evaluates in `eval_field_read`**, not from a
   pre-resolved table in interpreter state — the checker records
   `Enum(…)` for the expression, and the runtime's shadow rule (a
   variable named like the enum wins) mirrors the checker's scope rule
   exactly. The brief offered "a small table in the interpreter state"
   as one option; the expression-form check is smaller and keeps enums
   out of `Interp`'s fields.
6. **A method call on a bare-`obj` *parameter* is a compile error**
   (T2009, phase 3) — only a bare-obj *field* receiver (`u.o.bump()`)
   is `Dynamic` and reaches the runtime's T3009 "objs have no methods"
   arm. The tests document which is which.
7. **`tests/objects/` is a new integration target** (main + two case
   files) — `tests/interp/` hit the repo's five-files-per-directory cap
   in phase 5, so the phase-6 bank lives beside it with its own copy of
   the ~40-line harness (integration targets cannot share modules).
8. **Soft-cap oversizes kept**: `value.rs` 516, `checker/mod.rs` 461,
   `eval/ops.rs` 443. Splitting `value.rs` needs a new sibling in
   `src/interp/`, which sits at the hard five-file cap; the file is the
   §4.4 data model in one readable place (≈130 lines are its tests).
   Phase 7 may revisit if a module frees up.
9. **Known edge for phase 7**: a `-> obj` function whose returns are
   all *bare* (e.g. it passes a parameter through) and that falls off
   the end still lands on the T3006 backstop ("obj has no zero value")
   — statically unresolvable (the shape in flight is unknown), runtime
   is the right tier, but the message should become a friendly T3xxx of
   its own during diagnostics polish rather than an "internal error".

### Status vs §10 acceptance criteria

Row 6 (classes & enums): **07/08/99 run with stdout exactly matching
their `expected/*.stdout` fixtures, exit 0** — through the public API
(`tests/interp/fixtures.rs`, byte-for-byte) and the built binary (both
debug and release). Reference semantics proven in output: 07's aliasing
lines (`clicks is at 105`, `true`, `false`) are the fixture. Beyond the
row: `this`-mutation visible through aliases, identity `==`/`!=` both
ways, methods with return values and side effects, method→method calls,
method recursion under `--max-depth` (999-th-frame warmth), enum
print/==/zero, obj read/update/aliasing, bare-obj runtime field checks
(read, write, method) with fields-named + did-you-mean messages, obj
fall-off zeros, `&this.field` / `&c.field` pointers (read + write,
compound too), §2.1's zero column for every field type, and the pinned
print formats for instances and objs — 26 tests in `tests/objects/`.

### State of the language (after phase 6)

**Every v1 feature in PLAN.md is live.** The pipeline is complete —
lexer → parser → checker (with obj shapes) → interpreter (scalars,
control flow, functions, recursion, arrays, pointers, builtins,
classes, enums, objs) — and all nine teaching examples run as
integration tests, two of them ending in their planned teaching errors.
What remains is not language surface: **phase 7** (diagnostics polish —
snapshot tests of rendered output, the T3006 obj-fall-off edge above,
hint wording) and **phase 8** (the REPL — declarations persisting across
lines, `:tokens :ast :env :quit`; the `Writer`/`Env::set` seams are
already in place for it).

## Phase 7 — diagnostics polish: errors are the teacher (done 2026-10-30)

P4 end to end: every unknown-name error offers a did-you-mean, batches
render coherently, the flagship renders are pinned as plain-text
snapshots, and the whole code catalogue lives in a generated
`docs/errors.md`. The phase landed across two sittings — the second
completed the error docs, closed the last did-you-mean test gaps and
verified everything below end to end.

### What was built

- **T3010 `MissingReturnValue`** — phase 6's known edge, closed: a
  `-> obj` function whose returns are all *bare* pass-throughs
  (`return u;` where `u` is an `obj` parameter) and that falls off its
  end no longer lands on the T3006 internal backstop. The shape in
  flight is unknowable until runtime, so the runtime tier is right —
  but the error is now the student's lesson (T3010: "`pass` ended
  without returning a value — a bare `obj` has no zero value Tic can
  invent", hint: every path must end in `return …;`), spans the *call*
  site, and renders §5.6-style with source + caret. `zero_return_value`
  in `eval/calls.rs` owns the rule; pinned by test (not an internal
  error).
- **Did-you-mean everywhere a name is unknown** (§5.6, the audit):
  near-miss → suggestion in the hint; far-miss → no guess, still
  teaches. Wired sites, each with a near + far test:
  1. unknown **variable** (T2005) — candidates: in-scope names, then
     the file's functions/classes/enums, then the builtins; a near-miss
     of a non-variable gets that thing's teaching note ("`print` is a
     built-in function — call it");
  2. unknown **function** (T2006) — user functions + the 18 builtins;
  3. unknown **method** (T2009) — the class's methods; a known obj
     shape suggests its *fields* ("read it without the `(…)`");
  4. unknown **field** (T2008) — class fields, known obj shapes (read
     and write), and obj-shape writes (T2023);
  5. unknown **enum variant** (T2010), unknown **class in `new`**
     (T2011), unknown **type in a signature** (T1002 via the checker's
     resolver — the parser's statement-position T1002 was already
     covered);
  6. **runtime bare-obj** lookups (T3009) — field read, field write and
     method call on a bare `obj` all run `did_you_mean` over what the
     receiver actually has (far-miss test added this sitting).
  Lex reserved-words and parse T1002 were covered since phases 0–2;
  this phase audited and tested the rest.
- **Multi-error output, verified**: parse errors batch (cap 10 +
  `…and N more — fix these first`, §5.2); the checker returns
  `Vec<TicError>` and the CLI surfaces up to 10 in one run (`Failure::
  checked`). A **lex error always preempts parsing** (the lexer stops
  at its first error — after an unterminated string, later tokens are
  guesswork), so a lex+parse mixed batch cannot occur; a test pins that
  the lex error renders alone with no parse noise. Type errors: the
  checker keeps walking after a soft error (poison types keep dependent
  expressions checkable), so several T2xxx surface per run — only a
  structurally unusable program (e.g. unknown class) short-circuits
  that one expression.
- **Snapshot fixtures of the flagship renders** (§5.6's look, pinned):
  `tests/snapshots/` — one per family (`T0_lex_unterminated_string`,
  `T1_parse_unexpected_token`, `T2_type_mismatch` — PLAN §5.6's own
  example program, `T3_runtime_overflow` — §2.6's i8) plus the
  multi-parse batch with the "…and 2 more" tail. Renders go through
  `cli::render_failure` — exactly what `dispatch` prints — and include
  code, message, file:line, the source line, the caret underline, the
  label and the hint. No snapshot crate: strings compare; on mismatch
  the test prints expected vs actual; `TIC_UPDATE_SNAPSHOTS=1 cargo
  test --lib snapshots` rewrites after a *deliberate* change (recipe in
  the file header). Structural companions (no fixture): every error in
  a batch names its own file:line and caret, and the three §2.6 runtime
  lessons (overflow, null deref, bounds) all show line + caret + hint.
- **`docs/errors.md` — the error-code reference** (new `docs/`): every
  T0xxx–T4xxx code (54 rows) with family, plain-language meaning and
  typical cause. **Generated from the enum, on purpose**: the
  `error_docs` test walks one representative of every `TicError`
  variant (`every_variant`), `typical_cause` is an *exhaustive* match
  (a new variant breaks compilation until its cause is written), and
  the test compares the whole page against `docs/errors.md` — it
  cannot drift. `TIC_UPDATE_ERROR_DOCS=1 cargo test --lib error_docs`
  rewrites the page (recipe in the file's footer and the test). README
  links it in one line from the exit-codes section.
- **`--trace` tightened** (§7 x-ray): `[trace] line N: x = 1, y = 2`
  after every executed statement — the statement's **line number** and
  only the variables that statement **changed** (new, reassigned, or
  gone with a closed scope: `i (out of scope)`); `(no changes)` when it
  only read. Deterministic (name-sorted), pinned by fixture tests
  incl. a loop where `i` updates and the scope closes.
- **The two soft-cap splits phase 6 deferred**, both made possible by
  freeing a module slot:
  - `src/interp/value.rs` 516 → 393: its unit tests (print formats,
    `Width::fits_int`, §2.1 zeros, slot smoke) moved to
    `tests/interp/scalars.rs` (integration target, public API) — the
    `Display`/`zero` code itself stays in one readable place.
  - `src/checker/mod.rs` 461 → 310: stage 1 (declaration collection —
    reserve every name, then resolve signatures + class layouts +
    enums) split into `src/checker/decls.rs`, the directory's free
    slot. `eval/ops.rs` (443) stays as-is: its test module is half the
    file and a split would separate the cast table from the operator
    table for no teaching gain (phase-3 precedent).

### File list (lines)

New this phase:

| File | Lines | Role |
|---|---|---|
| `src/diagnostics/snapshots.rs` | 190 | the snapshot harness + flagship/structural render tests (5 fixtures) |
| `src/checker/decls.rs` | 171 | checker stage 1: signature/class/enum collection (split from mod.rs) |
| `tests/snapshots/*.txt` | 5 files | the pinned renders: T0, T1, T2, T3, multi-parse batch |
| `docs/errors.md` | 115 | the generated error-code reference (54 codes) |

Changed: `src/diagnostics/mod.rs` (+T3010, 433), `src/diagnostics/
text.rs` (+T3010's three texts, 475), `src/diagnostics/tests.rs`
(+every_variant/typical_cause/page generator + drift test, 438),
`src/interp/eval/calls.rs` (120 → 141: `zero_return_value` → T3010),
`src/interp/value.rs` (516 → 393: tests moved out),
`src/interp/mod.rs` (210 → 258: `run` takes `source`; the
`[trace] line N: changes` step), `src/checker/mod.rs` (461 → 310:
stage 1 out), `src/cli/mod.rs` (344 → 350: `render_failure` shared
with the snapshot tests), `src/cli/tests.rs` (321: batch-render
tests), `tests/checker.rs` (452: the 13 near/far did-you-mean tests),
`tests/interp/scalars.rs` (401: value.rs's unit tests + trace pins),
`tests/interp/fixtures.rs` (252: trace fixtures), `tests/objects/
enums_objs.rs` (269: T3010 + T3009 far-miss), `README.md` (+1 line:
the docs/errors.md pointer). Crate total ≈ 14,670 lines incl. tests
(`src/` 11,696 + `tests/` 2,976). `cargo build`/`cargo test`
warning-clean; **297 tests passing** (from 271; +26: 9 snapshot/render
tests, 2 error-docs tests, 13 did-you-mean pairs, T3010 + T3009
far-miss, plus the value-test moves).

### Deviations from PLAN.md

1. **Snapshot fixtures are renders of real pipeline runs**, not the
   decorative ASCII in §5.6 — same shape (code, source line, caret,
   label, hint) through miette's fancy handler; miette 7 renders `x`
   severity marks and `,\-[file:line]` headers rather than §5.6's
   hand-drawn `┌─` box. Content is what §10 row 7 asks to pin.
2. **Lex errors do not batch** (phase-0 decision, now test-pinned):
   §5.2's "all errors in one run" is the parser's recovery job; after
   an unterminated string the remaining tokens are guesswork, so a
   mixed lex+parse batch is impossible by design.
3. **`--trace` prints only *changed* variables** (with line numbers),
   not every variable after every statement — §7's one-line brief
   said "prints variables"; the diff form stays deterministic and
   readable past a few names. `(no changes)` marks read-only steps.
4. **`docs/errors.md` is fully generated** (header, family table,
   54-row catalogue, footer) rather than hand-written with a checked
   table — one source of truth, zero drift; the "typical cause"
   column lives in the exhaustive `typical_cause` match, so adding a
   variant fails compilation until documented.
5. **`src/diagnostics/tests.rs` is 438 lines** — over the ~400 soft
   cap; `src/diagnostics/` sits at the five-file hard cap and the
   docs generator is test-only code, so a new module would burn the
   layout for a soft cap. Documented here (phase-6 precedent).
6. **`value.rs` shrank by moving its unit tests to an integration
   target** rather than splitting the type — the §4.4 data model
   stays in one readable file; the tests exercise the same behaviour
   through the public `tic::interp::{Value, Width}` API.
7. **T3010's span is the call site**, not the function's closing
   brace — the fall-off happens at the `}` but the *missing value* is
   felt where the call was made; one span per error, pointing where
   the student can act.

### Status vs §10 acceptance criteria

Row 7 (diagnostics polish): **did-you-mean** — every unknown-name site
across lex/parse/check/runtime offers a Levenshtein suggestion when a
close candidate exists and stays quiet on far misses (13 paired tests
+ the runtime pair). **Multi-error output** — parse batches cap at 10
+ "…and N more"; the checker surfaces many T2xxx in one run, capped
the same way; mixed lex+parse cannot occur (pinned). **Error docs** —
`docs/errors.md` lists all 54 codes with family, meaning and typical
cause, generated by a test that walks the enum (drift = red test),
linked from the README. **Snapshot tests** — one fixture per family +
the multi-parse batch, rendered exactly as the CLI prints, update
recipe documented. `--trace` is stable and line-numbered; T3010 gives
phase 6's bare-obj fall-off its own friendly code; runtime errors for
overflow / null / bounds all show the offending line, caret and hint.

### Notes for phase 8 (the REPL)

- **Reuse `cli::render_failure`** for REPL errors: it takes a
  `Failure { errors, more, file }` — pass the snippet's text with a
  synthetic name like `repl:1` and one render call covers lex, parse,
  check and runtime errors, multi-error shape included. For a
  single-line prompt, `diagnostics::render(err, "repl", line)` is the
  one-error path. Suppress miette's colors for TTYs that need it via
  `GraphicalReportHandler` options, not by post-processing.
- **`interp::run` now takes `source`** (the `--trace` line lookup) —
  the REPL passes each snippet's text; better: construct `Interp`
  directly (`interp/mod.rs` documents the fields) so declarations
  persist across lines in one `Env` + one `Interp`, and feed
  `line_starts` per snippet when tracing.
- **`Env::set`** (`env.rs`, kept since phase 4 for exactly this) is
  the name-based write for REPL assignment; `env.visible_snapshot()`
  is what `:env` should print (name-sorted, the same format
  `--trace` uses).
- **A lone expression should print its value**: evaluate it, then
  `writer.write_line(&value.to_string())` — `Display` *is* the print
  format (`()`, `null`, `[1, 2, 3]`, `Counter { … }`, `ptr` are all
  pinned). Do not auto-print `Value::Unit` (a call's result).
- **Parse the snippet with `parser::parse_recovering`** — it returns
  the partial program alongside errors, which is how the REPL can
  decide "keep reading another line" (unbalanced braces ⇒ more input)
  versus "show the errors now".
- **T4xxx has room for REPL codes** (`T4004+`) if `:meta` commands
  need their own usage errors; keep `Usage` for CLI-level mistakes.
- The **`input()` builtin reads real stdin** (no Reader seam yet,
  `interp/mod.rs` header documents the gap) — the REPL must either
  share stdin with it deliberately or add the seam first.

## Phase 9 — the testing pack: integration harness, error suite, README consistency (done 2026-10-30)

The final phase: §9's Integration and Error-tests rows, §10 row 9's
acceptance ("all examples double as integration tests; README spec fits
one page"), the CLI exit-code contract, and a consistency pass of the
README against real behaviour — which found and fixed one real bug.

### The bug the pack caught (and its fix)

Probing pathological programs through the **binary** (a path no test had
pushed) showed a **native stack overflow — SIGABRT, exit 134 — at ~300
nested parentheses** (debug build). §12's guards covered the *walker*
(`NEST_LIMIT`) and *call depth* (`--max-depth`), but nothing covered the
**parser's own grammar recursion** (nor the checker's), both of which run
on the main thread's 8 MiB. P1 says never a native crash; fixed twice
over:

1. **`parser::MAX_NEST = 1024`** (`src/parser/mod.rs`) — a nesting meter
   on the three recursion points (`parse_expr` for parentheses,
   `parse_unary` for unary chains, `parse_block` for nested blocks;
   entered/exited balanced so §5.2 recovery continues from the depth it
   entered with). Past it the parser raises the *same* `T3005` the
   walker would, message and hint unchanged — the wording ("nested too
   deeply to run", "split the expression into named intermediate
   values") teaches the right fix wherever it fires. Nested blocks
   (`{{{{…}}}}`) and 2000-deep unary chains are guarded too (both probed:
   T3005, exit 2, no crash).
2. **The CLI now runs every tree-walking stage on a sized thread**
   (`src/cli/mod.rs`): `--ast` and `check` get `TREE_STACK` (64 MiB),
   `run`/`--trace` get `TREE_STACK + 16 KiB × --max-depth`. The old
   `run_checked` (interpreter-only, 8 MiB base) is replaced by one
   `on_sized_stack` helper — parse, check and run all happen inside the
   thread, so the friendly caps always beat the native stack, in debug
   (widest frames) and release alike. `--tokens` stays inline (the
   lexer is iterative). Verified through both binaries at 100/500/1000
   (run fine), 1023/1024/1025/2000/20000 (T3005, exit 2), plus the
   block/unary forms.

Two consequences, both deliberate (see Deviations): T3005 can now fire
**at parse time** while keeping its family's exit code 2, and the
existing 1100-nest unit test now meets the parser's cap first (same
T3005; the test was updated to take the error from any stage).

### What was built

- **`tests/integration/`** (§9 "Integration", the §10 row 9 acceptance):
  - `main.rs` — dynamic discovery of **every** `examples/*/*.tic` with
    its `expected/` twins (`.stdout` required; `.exit`/`
    .stderr_contains` optional), then through the **public API**
    (`tic::interp::run`, Vec-backed `Writer`): clean examples exit 0 and
    match stdout byte-for-byte; the two teaching-error examples (02, 05)
    print all their successful output first, then stop with the
    fixture's exit code and the `.stderr_contains` word in the message.
    The discovered set is **pinned to the README's examples map** (same
    three folders, same nine names), so pack and student contract
    cannot drift; a hygiene test keeps fixtures paired.
  - `binary.rs` — the same nine through the **built binary**
    (`CARGO_BIN_EXE_tic`): exit codes + byte-exact stdout + stderr
    words; the §7 exit-code table (0/1/2, one real program each);
    `--max-depth` end-to-end (count(50) refused at 10 with T3003 on
    stderr, fine at 100); `--tokens`/`--ast`/`--trace` smokes (trace
    pinned byte-exact to the phase-7 format); `check` silent on
    success; `--help`/`--version`.
- **`tests/errors/`** (§9 "Error tests"): a case = one small program +
  the T-code + a `docs/errors.md` message snippet + the failing stage +
  the exit code — asserted through the **library pipeline** (exact
  stage/code/message/family) *and* the **built binary** (process exit
  code; stderr carries code + snippet), the CLI-level coverage the
  unit banks never had. 51 of the 54 codes: T0001–T0010, T1001–T1005
  (plus a second T1001 flavour for `final x;`), T2001/T2003–T2026,
  T3001–T3005/T3007–T3010, and (in `cli.rs`, binary-only) T4002/T4003
  plus the clap-usage-exits-1 pin. The three deliberate gaps are
  documented in the suite header: **T2002** (the parser refuses
  `final x;` first — T1001; the checker twin is an unreachable
  backstop), **T3006** (an "internal error" no student program can
  produce is its whole point), **T4001** (nothing is unimplemented once
  the REPL lands). The depth guards (T3003, T3005) run library-level on
  a 64 MiB thread — the same concession `tests/interp` makes — and
  through the CLI's own sized runner in the binary loop. A coverage
  test pins the bar itself: every family present, ≥ 15 distinct codes.
- **README consistency pass**: every checkable claim was verified
  against the real binary — type table + zero values (incl. enum =
  first variant, pointer = null, array zeros, `[]`), `size_of` byte
  table, the whole cast table incl. `i32("123")` parse-at-runtime,
  division/cast/print behaviours, the operators table and precedence
  spot checks, all six reserved words → T0009, `input` reading a line,
  `len` counting code points, x-ray flags, exit codes, quickstart
  (`release` build + run), and the examples map (now test-pinned). Two
  wording fixes, both aligning the README with binding decisions
  recorded here in phases 0–2: **"Keywords (all 24)" → "all 28"**
  (phase 0+1 deviation 3 — the list §2.2 gives has 28 words), and the
  statements-block comment **"return type is mandatory" → "return type
  optional — no `->` means it returns nothing"** (phase 2 deviation 1;
  the README's own §8.3 examples use `function init() { … }`).

### File list (lines)

| File | Lines | Role |
|---|---|---|
| `tests/integration/main.rs` | 200 | example discovery + fixtures through the public API; README-map pin |
| `tests/integration/binary.rs` | 165 | all 9 through the built binary; exit codes; x-ray + `--max-depth` end-to-end |
| `tests/errors/main.rs` | 220 | the Case harness: pipeline verdicts, big-stack twin, binary loop, coverage pin |
| `tests/errors/compile.rs` | 40 | T0xxx (10) + T1xxx (5+1) cases |
| `tests/errors/types.rs` | 80 | T2xxx cases — 25 of 26 |
| `tests/errors/runtime.rs` | 92 | T3xxx cases (7) + the two depth guards |
| `tests/errors/cli.rs` | 55 | T4002/T4003 + clap-exits-1 (binary-only) |

Changed in `src/` (bug fix only): `src/parser/mod.rs` (225: `MAX_NEST`,
the meter, `enter_nest`), `src/parser/expr.rs` (+the `parse_expr`/
`parse_unary` arms), `src/parser/stmt.rs` (+the `parse_block` arm),
`src/cli/mod.rs` (371: `on_sized_stack` + `TREE_STACK` replace
`run_checked`; ast/check/run/trace now run on sized threads — the REPL
lines in this file are phase 8's, landed in parallel), `src/interp/
env.rs` (+`#[allow(dead_code)]` on `Env::promote`, kept for the REPL
beside the scope API — the `Env::set` precedent; the warning surfaced
when `run_checked`'s removal changed reachability analysis).
`tests/interp/runtime_errors.rs`: the 1100-nest test takes its T3005
from any stage now (parse refuses first).

**297 → 320 tests** (+23: 13 in `tests/integration/`, 10 in
`tests/errors/` — the error tests are case banks, 51 codes behind 10
functions), all green and warning-free in **debug and release**
(`cargo test`, `cargo test --release`, `cargo build --release`; the
release binary re-verified on the quickstart, both teaching-error
examples, the depth guards and `--max-depth`). The phase-8 REPL tests
(`tests/repl.rs`) land separately, in parallel.

### All nine examples, as the harness sees them

| Example | Exit | stdout |
|---|---|---|
| basics/01_hello, 03_control_flow; building/04, 06; objects/07, 08, 99 | 0 | byte-exact vs `expected/` |
| basics/02_types_and_memory | 2 | all 10 lines, then T3001 "overflow" on stderr |
| building/05_pointers | 2 | all 6 lines, then T3008 "null" on stderr |

### Deviations from PLAN.md

1. **T3005 can fire at parse time, still exiting 2** — the parser's
   nesting cap reuses the walker's code, so the *family* (runtime)
   decides the exit code wherever the refusal happens; a parse-stage
   refusal exiting 2 is the price of fixing the SIGABRT without
   touching the frozen `docs/` (a dedicated `T1006` would be the
   post-v1 cleanup; `docs/errors.md`'s row stays true — nesting past
   1024 gets exactly that error). The boundary is ~1022 parentheses in
   `print(…)` (statement + call nesting each cost a level) — the docs'
   "(1024)" is the cap constant, not a promised paren count.
2. **The CLI's per-mode threads reserve 64 MiB+ stacks** (virtual
   memory, not committed) — §12 names the caps as the mitigation; the
   sizing is what makes the caps win the race, and phase 4's
   interpreter-only sizing was not enough for parse/check frames.
3. **`tests/integration/` and `tests/errors/` sit beside the existing
   `tests/interp/`, `tests/objects/`** (each target needs its own
   harness copy — integration targets cannot share modules); the repo's
   5-files-per-directory cap holds everywhere (`tests/errors/` is at
   exactly 5).
4. **The README examples map is hard-pinned by a test** (exact nine
   names) rather than the harness silently accepting pack growth — a
   new example must now take the README with it, which is the point of
   the consistency pass. Discovery itself stays dynamic.
5. **Two README wording fixes only** — both correct the README toward
   binding decisions already recorded here (keyword count 28; optional
   return type). Everything else the README claims was verified true
   against the binary; in particular exit 130 (Ctrl-C) is REPL
   territory and was left to phase 8, whose files landed in parallel.

### Notes for the final verification

- Run `cargo test` **and** `cargo test --release` (the depth tests
  exercise different frame sizes); expect 320 + the phase-8 REPL tests.
- `tests/errors/main.rs`'s header documents the three uncovered codes
  and why — if a future change makes T2002/T3006/T4001 reachable, add
  the case there rather than removing the note.
- `git status` in `tracks/tic/` should show: 7 new test files, the 5
  changed `src/` files + `tests/interp/runtime_errors.rs`, README
  (2 lines), NOTES (this section) — and nothing under `examples/`,
  `PLAN.md` or `docs/`.

## Phase 8 — the REPL (done 2026-10-31; section written during verification)

The implementation agent finished the work but was killed by a provider
stall before it could write this section or report — the summary below
was reconstructed from the (all-green) files it left.

- **`src/cli/repl.rs`** (412 lines) — rustyline only at the interactive
  edge; the core consumes an iterator of input lines + a `Writer`, so
  whole sessions script without a terminal. Multi-line snippets continue
  until braces/brackets/quotes balance; each snippet is lexed, parsed,
  and **checked in the context of the whole session** (declarations and
  variables persist across lines in one env + declaration table). Lone
  expressions echo their value (`> 1 + 2` → `3`); assignments,
  declarations, and unit calls stay quiet. A runtime error rolls the
  snippet back but keeps earlier state — a bad line never kills the
  session. Meta commands: `:help` `:quit` (Ctrl-D too) `:tokens` `:ast`
  (argument or last snippet) `:env` (live variables; friendly nudge when
  empty); unknown `:command` gets a did-you-mean. A top-level `return`
  is refused with a lesson; `--max-depth` and the T3005 nesting guard
  hold inside snippets. Wired into the CLI: bare `tic` opens the REPL.
- **`tests/repl/main.rs`** (~320 lines, 25 tests) — the full §6.2 flow:
  banner/help; value echo of every shape; persistence and mutation;
  multi-line function definition then call; session-context checking
  (classes/enums from earlier lines in scope; redeclare is a friendly
  error); all meta commands; clean `:quit`; error-then-continue; depth
  guards; and the binary edge — the bare binary opens the REPL and
  **stdin EOF without `:quit` also exits 0** (piped smoke verified:
  banner, exit 0).

**320 → 345 tests**, all green, debug and release, warning-free.

## Verification (done 2026-10-31)

Executed by the build orchestrator after four consecutive sub-agent
stalls (provider instability); every implementation phase above was
sub-agent work — this pass only ran checks and wrote this log.

| Check | Result |
|---|---|
| `cargo build` | clean, **0 warnings** |
| `cargo test` (debug) | **345 passed**, 0 failed |
| `cargo test --release` | **345 passed**, 0 failed |
| Release smoke `01_hello` | `Hello, World!`, exit 0 |
| Release smoke `99_capstone` | plan §8.3 output exactly (start/42/1/2/3/true/3), exit 0 |
| Compile-error smoke | full §5.6-style T2003 render (code, span, labels, hint), **exit 1** |
| Runtime-error smoke (`02`) | 10 lines, then T3001 overflow, **exit 2** |
| REPL piped smoke | banner + `:help`, `printf ':quit\n' \| ./target/release/tic` → exit 0 |
| `make site` (repo root) | **passes**: 130 path ids (0 problems), site built, 26,171 links (0 broken); regenerated `hub/index.html` catalog only; `hub/path.mjs` untouched |
| `git status` | only `?? tracks/tic/` + the make-site-generated `hub/index.html`; last commit unchanged (`4f5a5c3`) — the track is intentionally **not** on `hub/path.mjs` |
| Conventions | no directory exceeds 5 non-hidden files (root and `tests/` are exactly at 5); largest sources 475/452/443/438/433/433/428 lines — all within ~15% of the soft cap and documented above |

**State of the project:** Tic v1 is complete per PLAN.md §10 — lexer,
two-pass parser with recovery, checker with obj-shape inference,
tree-walking interpreter (scalars, arrays, pointers, classes, enums,
obj), 54 documented error codes with did-you-mean hints, x-ray flags
(`--tokens`/`--ast`/`--trace`), REPL, and a teaching pack of 9 examples
(+13 fixtures) that double as integration tests. ~16,500 lines of Rust
(src + tests), 345 tests. Run: `cd tracks/tic && export
PATH="$HOME/.cargo/bin:$PATH" && cargo test`; quickstart: `cargo build
--release && ./target/release/tic examples/basics/01_hello.tic`.

## Audit (2026-10-31)

Independent conformance pass against PLAN.md (the contract), README.md
(the student contract) and this log. Everything re-verified through the
built binary (debug and release) and the real test suite, not the notes.
**345 → 346 tests** (one gap-fix test added), all green in debug and
release, both builds 0 warnings.

### §10 roadmap rows 0–9 — 10/10 PASS

| Row | Re-verified | Result |
|---|---|---|
| 0 | `tic --help` (exit 0); §5.6-style render pinned by `tests/snapshots/` fixtures (code, file:line, source, caret, label, hint) | PASS |
| 1 | `--tokens` on the examples (stable `kind lexeme start..end` format, unit-tested); 26 lexer tests incl. 10 error codes | PASS |
| 2 | `--ast` dumps the full capstone; a 3-broken-statement file shows **2 T1001 renders in one run**, exit 1; ambiguity unit tests (`tests/parse_unit.rs`) | PASS |
| 3 | `tic check examples/objects/99_capstone.tic` — silent, exit 0; 82 checker tests behind it (64-case reject bank) | PASS |
| 4 | 01/03/04 byte-exact via the integration harness (public API **and** built binary); overflow all 8 widths + depth-cap tests | PASS |
| 5 | 02/06 fixtures byte-exact; bounds/null/overflow rendered with line+caret; **pointer to an outlived local re-verified live** (read `7`, write `8` after return) | PASS |
| 6 | 07/08/99 byte-exact, exit 0; aliasing visible in output (`ct.bump()` → `11` seen through `alias_ct.n`; `ct == alias_ct` → `true`) | PASS |
| 7 | did-you-mean live (`countt` → "did you mean \`count\`?"); 13 paired near/far tests; 5 snapshot fixtures + render tests; `docs/errors.md` generated + drift test | PASS |
| 8 | REPL: 25 tests — multi-line input, persistent declarations, `:tokens :ast :env :quit`, error-then-continue, depth/nesting guards, binary piped sessions | PASS |
| 9 | All 9 examples double as integration tests (pack **pinned to the README's map** by a test); README is the one-page spec + quickstart (116 lines) | PASS |

### §7 CLI surface — PASS (1 small gap fixed)

Every form run against the release binary: `tic <file>`, `tic run`,
`tic check` (silent success, exit 0), `--tokens`, `--ast`, `--trace`
(`[trace] line N: …`), `--max-depth` (default 1000: `down(999)` runs,
`down(1000)` → T3003; custom `10` refuses / `100` runs), bare `tic` →
REPL, `--help`, `--version`. Exit codes verified with real programs:
0 success · 1 compile (`i32 x = "s";`) and usage (clap errors, missing
file — phase-0+1 deviation 10) · 2 runtime (`1 / 0`).

**Exit 130 on Ctrl-C — the one real gap found, fixed.** The mapping
existed (`repl.rs`: `ReadlineError::Interrupted` → 130) but no test
pinned it (phase 9's "left to phase 8" was implemented but untested).
Fix: the mapping is now the isolated function `readline_error_exit` in
`src/cli/repl.rs`, and `src/cli/tests.rs` gains
`ctrl_c_at_the_repl_prompt_exits_130`, which simulates the Interrupted
path by constructing the exact `ReadlineError` value rustyline delivers
(it only reports `Interrupted` from a real TTY in raw mode, so a piped
session cannot trigger it). No error code changed → `docs/errors.md`
untouched.

### §2.1 type table — 12/12 PASS

Every row exercised live (one probe program, exit 0): signed widths
(`i8 100+1` … `i64 5e9+1`), unsigned via cast (`u8(200)`, `u16(40000)`,
u32/u64 via i64), float vs integer division (`7.0/2.0` → `3.5`,
`7/2` → `3`), bool-only conditions (`if (1)` → T2004 compile error),
char code points (`i32('A')` → `65`, `'Z' < 'a'` → `true`), str concat
from the left (`"x" + 1.5` → `x1.5`), fixed arrays (bounds-checked,
`len`), dynamic arrays (`push/pop/insert/remove`, aliasing visible),
obj (field read; order-free shape assign `{x,y} = {y,x}` compiles),
class instances (`new Counter(10)`, alias, identity `==`), enums
(`State.Idle`, `==`, zero = first variant), pointers (`&x`/`*p`
read+write, `null`, `== null`).

**Known edge (recorded, not fixed — language decision for the owner):**
cast-argument literals do not anchor to the cast target, so
`u32(3000000000)` and `i64(3000000000)` overflow **at the i32 literal**
before the cast runs (friendly T3001, never UB — P1 holds). The rule is
uniform, and every value past i32::MAX is still spellable the natural
way: `i64 v = 3000000000; u32 u = u32(v);` (verified). Anchoring inside
casts would be a checker semantics change, not an audit-sized fix.

### §2.5 builtins — PASS

Every builtin called live: `print` (space-separated + newline), `input`
(wired — prompt through the Writer, line read from piped stdin, `hi
Ada`), `len` (str code points — `héllo` → 5 — and arrays), `push`/
`pop`/`insert`/`remove`, `range` ×3 forms (+ negative step), `size_of`
full table (1/1/1/2/2/4/4/4/8/8/8/4 — matches README), `sqrt abs floor
ceil pow min max`, `random` inclusive, `copy` independent (plus the
checker teaching: array `==` is T2013). All six cast forms:
`i32(2.7)`→2 · `f64(3)`→3.0 · `char(65)`→A · `i32('A')`→65 ·
`str(42)`→42 · `i32("123")`→123, and `i32("abc")` → T3004 naming the
text.

### §2.6 rules 1–7 — 7/7 PASS

1. Width-checked overflow with file:line (`examples/…:34:7`, exact
   "i8 overflow (127 + 1)") — exit 2.
2. Bounds (`index 3 … 3 elements (indexes 0..2)`); obj shape mismatch
   on assignment is compile-time T2024.
3. `*p` on null → T3008 "null pointer dereference".
4. `delete` is reserved (T0009); Rc slots keep an outlived local's
   pointer valid for read **and** write.
5. `--max-depth` default 1000 → friendly T3003; custom honored
   end-to-end.
6. Two-pass top level: `print(double(21));` above `function double`
   prints `42`.
7. `final` (T2021), duplicate (T2001), type mismatch (T2003), unknown
   field (T2008) — all compile-time, exit 1 (plus non-bool condition
   T2004 and chained assignment T1004 re-checked).

### §8 examples — PASS

`01_hello.tic` and `99_capstone.tic` match the plan §8.1/§8.3 listings
**verbatim, line for line**, and their outputs match §8's expected
blocks exactly (`Hello, World!`; `start/42/1/2/3/true/3`). `02` is the
known rearrangement: a teaching expansion of the §8.2 sketch containing
every sketch line (size_of 4 8 · `i32('A')` 65 · `i32(2.7)` 2 · pointer
42→99 · the closing i8 overflow, exit 2) in a different order plus
commentary. NOTE: the audit brief expected this rearrangement
"documented in NOTES" — in fact the phase sections only record that
`examples/` was owned by a parallel agent (phase 0+1), not the
rearrangement itself; this section now documents it explicitly.

### §9 testing rows — 6/6 PASS

Unit (116 in-crate: lexer/cli/diagnostics/snapshots/span/hints) ·
Integration (13: dynamic discovery, byte-exact fixtures, README-map
pin, binary twin) · Error tests (10 functions over 51 codes through
library **and** binary; the 3 deliberate gaps — T2002/T3006/T4001 —
are justified in `tests/errors/main.rs`'s header) · Snapshot (5
fixtures + render tests) · REPL (25 scripted sessions) · CLI exit codes
(0/1/2, one real program each).

### README quickstart — PASS

Run verbatim from `tracks/tic`: `cargo build --release` (0 warnings) →
`./target/release/tic examples/basics/01_hello.tic` → `Hello, World!`
exit 0; bare `./target/release/tic` → banner + REPL, `:quit` exit 0;
`1 + 2` echoes `3`. Spot re-checks of other README claims (keyword
count 28, reserved words, `size_of` table, cast table, exit codes,
examples map) all held.

### Fixes made this audit

| File | Change |
|---|---|
| `src/cli/repl.rs` | `readline_error_exit()` extracted (pub(crate)); `interactive_loop` routes the readline error arm through it. 421 lines. |
| `src/cli/tests.rs` | `+ ctrl_c_at_the_repl_prompt_exits_130` (simulates `ReadlineError::Interrupted` → 130, `Eof` → 0). 329 lines. |

Conventions re-checked after the edits: 5-non-hidden-file cap holds in
every directory (files only, as before); no new files, no new
dependencies, no unsafe, no git commits; `docs/errors.md` untouched (no
code changed).

### Remaining known gaps (nothing blocking)

1. **Cast-argument literal anchoring** (above) — owner decision;
   current behaviour is uniform, friendly and documented here.
2. **130 test simulates the error value**, not a real TTY Ctrl-C — a
   pty harness would need a new dependency or a fragile `script(1)`
   wrapper; the mapping and its use are pinned instead.
3. **T2002/T3006/T4001 uncovered by error tests** — deliberate and
   explained in the suite header (unreachable-by-design codes).
