//! The "teacher's voice" text of every error (plan §5.6): the headline
//! [`message`], the source-line [`label`] and the teaching [`hint`].
//!
//! Split out of `mod.rs` when the T2xxx family (type checker, phase 3)
//! arrived — one arm per variant, three methods, all plain language.

use super::TicError;

impl TicError {
    /// The headline, in plain language (P4).
    pub fn message(&self) -> String {
        match self {
            TicError::UnterminatedString { .. } => "unterminated string literal".into(),
            TicError::UnterminatedChar { .. } => "unterminated char literal".into(),
            TicError::EmptyCharLiteral { .. } => "empty char literal".into(),
            TicError::MultiCharLiteral { .. } => "a char literal can hold exactly one character".into(),
            TicError::UnknownEscape { ch, .. } => format!("unknown escape sequence `\\{ch}`"),
            TicError::UnknownCharacter { ch, .. } => format!("unknown character `{ch}`"),
            TicError::InvalidNumber { text, .. } => format!("invalid number `{text}`"),
            TicError::NumberTooLarge { text, .. } => format!("number literal `{text}` is too large"),
            TicError::ReservedWord { word, .. } => {
                format!("`{word}` is reserved for a future Tic version")
            }
            TicError::UnterminatedComment { .. } => "unterminated block comment".into(),
            TicError::UnexpectedToken { expected, found, .. } => {
                format!("expected {expected}, found {found}")
            }
            TicError::UnknownType { name, .. } => format!("unknown type `{name}`"),
            TicError::InvalidAssignmentTarget { .. } => {
                "the left side of an assignment must be a variable, a field, an index or `*pointer`".into()
            }
            TicError::AssignmentNotExpression { .. } => {
                "assignment is a statement in Tic, not an expression — it cannot be chained".into()
            }
            TicError::TypeSuffixNotAllowed { .. } => {
                "only one `[]`, `[N]` or `*` suffix is allowed on a type".into()
            }
            TicError::DuplicateDecl { name, what, .. } => {
                format!("`{name}` is declared twice — it is already {what}")
            }
            TicError::FinalNeedsInit { name, .. } => {
                format!("`final {name}` must be given a value on the same line")
            }
            TicError::TypeMismatch { context, expected, found, .. } => {
                format!("{context}: this is {found}, but {expected} was expected")
            }
            TicError::NotBoolCondition { found, .. } => {
                format!("a condition must be a bool, but this is {found}")
            }
            TicError::UnknownVariable { name, .. } => format!("unknown variable `{name}`"),
            TicError::UnknownFunction { name, .. } => format!("unknown function `{name}`"),
            TicError::WrongArity { name, expected, found, .. } => format!(
                "`{name}` takes {expected} argument{s}, but {found} {was} given",
                s = if *expected == 1 { "" } else { "s" },
                was = if *found == 1 { "was" } else { "were" },
            ),
            TicError::UnknownField { owner, field, .. } => {
                format!("`{owner}` has no field `{field}`")
            }
            TicError::UnknownMethod { owner, method, .. } => {
                format!("`{owner}` has no method `{method}`")
            }
            TicError::UnknownEnumVariant { enum_name, variant, .. } => {
                format!("enum `{enum_name}` has no variant `{variant}`")
            }
            TicError::UnknownClass { name, .. } => format!("unknown class `{name}`"),
            TicError::InvalidOperands { op, lhs, rhs, .. } => {
                format!("`{op}` cannot combine {lhs} and {rhs}")
            }
            TicError::InvalidEquality { op, lhs, rhs, .. } => {
                format!("`{op}` cannot compare {lhs} with {rhs}")
            }
            TicError::DerefOfNonPointer { found, .. } => {
                format!("`*` follows a pointer, but this is {found}")
            }
            TicError::AddrOfNonPlace { .. } => {
                "`&` takes the address of a place — a variable, a field, an index or `*p`".into()
            }
            TicError::InvalidCast { to, from, .. } => {
                format!("a {from} cannot be cast to {to}")
            }
            TicError::SizeOfArg { .. } => {
                "size_of takes a scalar type name — e.g. size_of(i32)".into()
            }
            TicError::TypeNameNotValue { name, .. } => {
                format!("`{name}` is a type name, not a value")
            }
            TicError::IndexNonArray { found, .. } => {
                format!("only arrays can be indexed, but this is {found}")
            }
            TicError::IndexNotInt { found, .. } => {
                format!("an array index must be an integer type, but this is {found}")
            }
            TicError::AssignToFinal { name, .. } => {
                format!("`{name}` is `final` — it is given a value once and keeps it")
            }
            TicError::NotAssignable { name, what, .. } => {
                format!("`{name}` is {what}, not a variable — it cannot be assigned to")
            }
            TicError::AddObjField { field, .. } => {
                format!("objs cannot grow new fields — `{field}` was not in the shape")
            }
            TicError::ShapeMismatch { context, expected, found, .. } => {
                format!("{context}: {found} does not match {expected}")
            }
            TicError::ThisOutsideMethod { .. } => {
                "`this` only exists inside a class method".into()
            }
            TicError::NotCallable { what, .. } => format!("{what} is not a function — it cannot be called"),
            TicError::NumericOverflow { detail, .. } => format!("runtime overflow: {detail}"),
            TicError::DivisionByZero { what, .. } => format!("{what} by zero"),
            TicError::TooMuchRecursion { depth, .. } => {
                format!("too much recursion — the program went {depth} calls deep")
            }
            TicError::CastFailed { to, text, .. } => {
                format!("`{text}` is not a valid {to}")
            }
            TicError::TooDeeplyNested { .. } => {
                "this expression is nested too deeply to run".into()
            }
            TicError::InternalError { what, .. } => format!("internal error: {what}"),
            TicError::OutOfBounds { detail, .. } => detail.clone(),
            TicError::NullDeref { .. } => "null pointer dereference".into(),
            TicError::MissingField { kind, name, fields, .. } => {
                let noun = if *kind == "method" { "methods" } else { "fields" };
                let list = if fields.is_empty() {
                    format!("no {noun} at all")
                } else {
                    fields.join(", ")
                };
                format!("this value has no {kind} `{name}` — it has: {list}")
            }
            TicError::MissingReturnValue { function, ty, .. } => format!(
                "`{function}` ended without returning a value — a bare `{ty}` has no zero value Tic can invent"
            ),
            TicError::NotImplemented { what, .. } => format!("{what} is not implemented yet"),
            TicError::CannotReadFile { path, cause } => format!("cannot read `{path}`: {cause}"),
            TicError::Usage { message } => message.clone(),
        }
    }

    /// What the span should say on the source line. `None` for errors that
    /// are not tied to a location (all T4xxx for now).
    pub fn label(&self) -> Option<(crate::util::Span, String)> {
        use crate::util::Span;
        let (span, label): (&Span, String) = match self {
            TicError::UnterminatedString { span } => {
                (span, "the string starts here and never ends".into())
            }
            TicError::UnterminatedChar { span } => (span, "this char literal never closes".into()),
            TicError::EmptyCharLiteral { span } => (span, "nothing between the quotes".into()),
            TicError::MultiCharLiteral { span } => (span, "more than one character".into()),
            TicError::UnknownEscape { span, .. } => (span, "Tic does not define this escape".into()),
            TicError::UnknownCharacter { span, .. } => (span, "not part of the Tic language".into()),
            TicError::InvalidNumber { span, .. } => (span, "this does not parse as a number".into()),
            TicError::NumberTooLarge { span, .. } => (span, "too large for a numeric literal".into()),
            TicError::ReservedWord { span, word } => {
                (span, format!("`{word}` will become a keyword later"))
            }
            TicError::UnterminatedComment { span } => (span, "this comment is never closed".into()),
            TicError::UnexpectedToken { span, expected, .. } => {
                (span, format!("expected {expected} here"))
            }
            TicError::UnknownType { span, name, .. } => (span, format!("`{name}` is not a type")),
            TicError::InvalidAssignmentTarget { span } => {
                (span, "this expression cannot be assigned to".into())
            }
            TicError::AssignmentNotExpression { span, op, .. } => {
                (span, format!("a second `{op}` here"))
            }
            TicError::TypeSuffixNotAllowed { span } => {
                (span, "a type takes at most one of `[]`, `[N]`, `*`".into())
            }
            TicError::DuplicateDecl { span, first, .. } => (
                span,
                format!("the second declaration is here (the first is at offset {first})"),
            ),
            TicError::FinalNeedsInit { span, .. } => (span, "no `=` and no value".into()),
            TicError::TypeMismatch { span, expected, .. } => {
                (span, format!("this is where {expected} was expected"))
            }
            TicError::NotBoolCondition { span, .. } => {
                (span, "this must be a bool".into())
            }
            TicError::UnknownVariable { span, name, .. } => (span, format!("nothing named `{name}` is in scope")),
            TicError::UnknownFunction { span, name, .. } => {
                (span, format!("no function named `{name}`"))
            }
            TicError::WrongArity { span, .. } => (span, "check the argument list".into()),
            TicError::UnknownField { span, field, .. } => (span, format!("no field `{field}` here")),
            TicError::UnknownMethod { span, method, .. } => (span, format!("no method `{method}` here")),
            TicError::UnknownEnumVariant { span, variant, .. } => {
                (span, format!("no variant `{variant}` here"))
            }
            TicError::UnknownClass { span, name, .. } => (span, format!("no class `{name}`")),
            TicError::InvalidOperands { span, op, .. } => (span, format!("`{op}` gets these types")),
            TicError::InvalidEquality { span, op, .. } => (span, format!("`{op}` compares these two")),
            TicError::DerefOfNonPointer { span, .. } => (span, "not a pointer".into()),
            TicError::AddrOfNonPlace { span } => (span, "this is a value, not a place".into()),
            TicError::InvalidCast { span, .. } => (span, "this cast".into()),
            TicError::SizeOfArg { span, .. } => (span, "size_of wants a type name here".into()),
            TicError::TypeNameNotValue { span, name } => (span, format!("`{name}` is a type")),
            TicError::IndexNonArray { span, .. } => (span, "not an array".into()),
            TicError::IndexNotInt { span, .. } => (span, "not an integer".into()),
            TicError::AssignToFinal { span, name } => (span, format!("`{name}` was declared `final`")),
            TicError::NotAssignable { span, .. } => (span, "not a variable".into()),
            TicError::AddObjField { span, field, .. } => (span, format!("`{field}` is a new field")),
            TicError::ShapeMismatch { span, .. } => (span, "the fields do not line up".into()),
            TicError::ThisOutsideMethod { span } => (span, "no enclosing class method".into()),
            TicError::NotCallable { span, .. } => (span, "this is not a function".into()),
            TicError::NumericOverflow { span, .. } => (span, "the math stops here".into()),
            TicError::DivisionByZero { span, .. } => (span, "dividing by zero here".into()),
            TicError::TooMuchRecursion { span, .. } => {
                (span, "this call is one too many".into())
            }
            TicError::CastFailed { span, .. } => (span, "this cast".into()),
            TicError::TooDeeplyNested { span } => (span, "the nesting bottoms out here".into()),
            TicError::InternalError { span, .. } => (span, "Tic lost its footing here".into()),
            TicError::OutOfBounds { span, .. } => {
                (span, "this access is not inside the array".into())
            }
            TicError::NullDeref { span } => (span, "following a null pointer here".into()),
            TicError::MissingField { span, kind, name, .. } => {
                (span, format!("no such {kind} here: `.{name}`"))
            }
            TicError::MissingReturnValue { span, .. } => {
                (span, "the call that got no value back".into())
            }
            TicError::NotImplemented { .. }
            | TicError::CannotReadFile { .. }
            | TicError::Usage { .. } => return None,
        };
        Some((*span, label))
    }

    /// The teaching hint under the source line (P4: "did you mean…?").
    pub fn hint(&self) -> Option<String> {
        Some(match self {
            TicError::UnterminatedString { .. } => {
                "add a closing `\"` — Tic strings cannot span lines".into()
            }
            TicError::UnterminatedChar { .. } => {
                "close it with `'` — e.g. 'A' or '\\n'".into()
            }
            TicError::EmptyCharLiteral { .. } => {
                "a char holds exactly one character, e.g. 'A' — the empty text is \"\" (a str)".into()
            }
            TicError::MultiCharLiteral { .. } => {
                "for text use a str: \"ab\" — a char is a single character".into()
            }
            TicError::UnknownEscape { .. } => {
                "valid escapes: \\n \\t \\r \\0 \\ \\\" \\'".into()
            }
            TicError::UnknownCharacter { ch, .. } => match ch {
                '~' => "Tic has no bitwise NOT (`~`) in v1".into(),
                '^' => "Tic has no bitwise XOR (`^`) in v1".into(),
                '|' => "for logical or write `||`".into(),
                '?' => "Tic has no ternary operator — use `if` / `else`".into(),
                c if !c.is_ascii() => {
                    "Tic source is ASCII: identifiers use letters, digits and `_`".into()
                }
                _ => "this character is not part of Tic — run `tic --help` for a tour".into(),
            },
            TicError::InvalidNumber { .. } => {
                "numbers look like 42, 3.14 or 1_000 — one decimal point max, underscores between digits".into()
            }
            TicError::NumberTooLarge { .. } => {
                "i64 tops out at 9223372036854775807 — write fewer digits or use a float".into()
            }
            TicError::ReservedWord { word, .. } => format!(
                "choose a different name for now — nothing silently breaks when `{word}` gains meaning later"
            ),
            TicError::UnterminatedComment { .. } => {
                "close it with `*/`, or use `//` for a line comment".into()
            }
            TicError::UnexpectedToken { .. } => {
                "compare with the statement forms in README.md — Tic is strict about `;`, parentheses and braces".into()
            }
            TicError::UnknownType { name, suggestion, .. } => match suggestion {
                Some(near) => format!(
                    "did you mean `{near}`? otherwise: declare the class or enum `{name}` before using it as a type"
                ),
                None => "Tic's builtin types are i8 i16 i32 i64 u8 u16 u32 u64 f32 f64 bool char str obj — plus class and enum names you declared".into(),
            },
            TicError::InvalidAssignmentTarget { .. } => {
                "assign into a box you can name — `x = 1;`, `arr[0] = 1;`, `box.count = 1;` — or through a pointer: `*p = 1;`".into()
            }
            TicError::AssignmentNotExpression { .. } => {
                "Tic does not chain assignments — write two statements instead: `y = 5;` then `x = y;`".into()
            }
            TicError::TypeSuffixNotAllowed { .. } => {
                "Tic v1 has no arrays of arrays or pointers to pointers — use one `[]`, `[N]` or `*` suffix, e.g. `i32[]`".into()
            }
            TicError::DuplicateDecl { name, .. } => format!(
                "every name in one scope is used for one thing — rename one of the `{name}`s, or reuse the value"
            ),
            TicError::FinalNeedsInit { .. } => {
                "write `final i32 NAME = value;` — a constant needs its value right away".into()
            }
            TicError::TypeMismatch { hint, expected, found, .. } => return match hint {
                Some(text) => Some(text.clone()),
                None => Some(format!(
                    "Tic never converts types silently — the types must match ({expected} vs {found})"
                )),
            },
            TicError::NotBoolCondition { .. } => {
                "comparisons like `x > 0` make a bool — `if (x > 0) { … }`".into()
            }
            TicError::UnknownVariable { name, suggestion, note, .. } => {
                return variable_hint(name, suggestion.as_deref(), note.as_deref())
            }
            TicError::UnknownFunction { name, suggestion, note, .. } => {
                return function_hint(name, suggestion.as_deref(), note.as_deref())
            }
            TicError::WrongArity { name, expected, .. } => format!(
                "count the arguments: `{name}` declares {expected}; check its definition"
            ),
            TicError::UnknownField { owner, field, suggestion, note, .. } => {
                if let Some(note) = note {
                    return Some(format!("{note}"));
                }
                match suggestion {
                    Some(near) => format!("did you mean `.{near}`?"),
                    None => format!("the fields of {owner} are listed where it is declared — `{field}` is not one of them"),
                }
            }
            TicError::UnknownMethod { owner, method, suggestion, note, .. } => {
                if let Some(note) = note {
                    return Some(note.clone());
                }
                match suggestion {
                    Some(near) => format!("did you mean `.{near}(…)`? {owner}'s methods are listed in its class body"),
                    None => format!("the methods of {owner} are listed in its class body — `{method}` is not one of them"),
                }
            }
            TicError::UnknownEnumVariant { enum_name, variant, suggestion, .. } => match suggestion {
                Some(near) => format!("did you mean `{enum_name}.{near}`?"),
                None => format!("the variants of `{enum_name}` are fixed where the enum is declared — `{variant}` is not one of them"),
            },
            TicError::UnknownClass { name, suggestion, .. } => match suggestion {
                Some(near) => format!("did you mean `new {near}(…)`? otherwise: declare `class {name} {{ … }}` first"),
                None => format!("declare `class {name} {{ … }}` before `new {name}(…)`"),
            },
            TicError::InvalidOperands { hint, .. } => return hint.clone(),
            TicError::InvalidEquality { hint, .. } => hint.clone(),
            TicError::DerefOfNonPointer { .. } => {
                "make a pointer first: `i32* p = &x;` — then `*p` follows it".into()
            }
            TicError::AddrOfNonPlace { .. } => {
                "`&` needs somewhere to point — `&x`, `&arr[0]`, `&box.field`".into()
            }
            TicError::InvalidCast { hint, .. } => hint.clone(),
            TicError::SizeOfArg { .. } => {
                "pass one of the fixed-size scalar type names: i8 i16 i32 i64 u8 u16 u32 u64 f32 f64 bool char — a str's size varies, so there is no size_of(str)".into()
            }
            TicError::TypeNameNotValue { .. } => {
                "type names only appear inside size_of(…) — for the size of a value's type, size_of takes the type itself".into()
            }
            TicError::IndexNonArray { .. } => {
                "indexing is for arrays: `arr[0]` — declare one with `i32[5] a;` or `i32[] b;`".into()
            }
            TicError::IndexNotInt { .. } => {
                "write a whole number (or an i8…u64 variable) between the brackets".into()
            }
            TicError::AssignToFinal { name, .. } => format!(
                "give `{name}` the right value when you declare it, or drop `final` to make it a normal variable"
            ),
            TicError::NotAssignable { what, .. } => match what.as_str() {
                "a function" => "call the function and assign its result: `x = f();`".into(),
                "a class" => "make an instance instead: `x = new Class(…);`".into(),
                "an enum" => "pick a variant instead: `x = Enum.Variant;`".into(),
                _ => "only variables, fields, array elements and `*p` can be assigned to".into(),
            },
            TicError::AddObjField { suggestion, .. } => match suggestion {
                Some(near) => format!(
                    "did you mean `.{near}`? an obj's shape is fixed by its literal — to change it, build a new obj"
                ),
                None => "an obj's shape is fixed by its literal — build a new obj with the extra field instead".into(),
            },
            TicError::ShapeMismatch { expected, found, .. } => format!(
                "two objs match when they have exactly the same field names and types — expected {expected}, found {found}"
            ),
            TicError::ThisOutsideMethod { .. } => {
                "inside a `class` method, `this` is the instance the method runs on".into()
            }
            TicError::NotCallable { .. } => {
                "to call something it must be a function or a method: `f(x)`, `box.method(x)`".into()
            }
            TicError::NumericOverflow { detail, .. } => format!(
                "every integer width has a largest value — use a wider type or fix the math ({detail})"
            ),
            TicError::DivisionByZero { .. } => {
                "check before you divide: `if (d != 0) { … }` — zero can never be the divisor".into()
            }
            TicError::TooMuchRecursion { depth, .. } => format!(
                "every call waits for the one it called — make sure the base case is reached, or raise the limit with `--max-depth {n}`",
                n = depth + 1
            ),
            TicError::CastFailed { to, .. } => format!(
                "this cast reads the text as a {to} — print it first if you are not sure what it holds"
            ),
            TicError::TooDeeplyNested { .. } => {
                "Tic walks the tree step by step — split the expression into named intermediate values".into()
            }
            TicError::InternalError { .. } => {
                "this is a bug in Tic itself, not in your program — please report it (PLAN.md §12)".into()
            }
            TicError::OutOfBounds { .. } => {
                "array indexes run from 0 to len(a) - 1 — check with `if (i < len(a))`, or `len(a) > 0` before pop".into()
            }
            TicError::NullDeref { .. } => {
                "check before you follow it: `if (p != null) { … }` — or point it somewhere real: `p = &x;`".into()
            }
            // A method call whose name IS one of the receiver's fields:
            // the parens are the whole mistake.
            TicError::MissingField { kind: "method", name, fields, .. }
                if fields.iter().any(|f| f == name) =>
            {
                format!("`.{name}` is a field — read it without the `(…)`: `box.{name}`")
            }
            TicError::MissingField { kind, name, suggestion, .. } => match suggestion {
                Some(s) => format!("did you mean `.{s}`?"),
                None => format!(
                    "this spot takes any obj (the type is just `obj`), so fields are only known \
                     while the program runs — the value that arrived has no {kind} `{name}`"
                ),
            },
            TicError::MissingReturnValue { function, ty, .. } => format!(
                "every path through a `-> {ty}` function must end in `return …;` — \
                 an obj that only arrived through a bare `obj` has no literal shape \
                 Tic can fall back to, so `{function}` cannot fall off the end"
            ),
            TicError::NotImplemented { what, phase, .. } => {
                if *what == "the REPL" {
                    format!("the REPL arrives in phase 8 — until then, run a file with `tic <file>` or look inside one with `tic --tokens <file>`")
                } else {
                    format!("{what} arrives in phase {phase} — see PLAN.md §10 for the roadmap")
                }
            }
            TicError::CannotReadFile { .. } => {
                "check the path and that the file is readable — Tic files usually end in .tic".into()
            }
            TicError::Usage { .. } => {
                "run `tic --help` to see everything Tic can do".into()
            }
        })
    }
}

/// Hint for T2005: prefer the checker's note (a near-miss explanation),
/// then a did-you-mean, then the generic scope advice.
fn variable_hint(name: &str, suggestion: Option<&str>, note: Option<&str>) -> Option<String> {
    if let Some(note) = note {
        return Some(format!("{note}"));
    }
    Some(match suggestion {
        Some(near) => format!("did you mean `{near}`? it is declared earlier"),
        None => format!("declare `{name}` before using it — spelling and capitalisation matter"),
    })
}

/// Hint for T2006: same shape as [`variable_hint`] plus the builtin roster.
fn function_hint(name: &str, suggestion: Option<&str>, note: Option<&str>) -> Option<String> {
    if let Some(note) = note {
        return Some(format!("{note}"));
    }
    Some(match suggestion {
        Some(near) => format!(
            "did you mean `{near}`? built-ins include print, len, range, push, pop, size_of"
        ),
        None => format!(
            "no function named `{name}` — Tic's built-ins include print, len, range, push, pop, size_of"
        ),
    })
}
