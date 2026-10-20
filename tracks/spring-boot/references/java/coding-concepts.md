# General coding concepts (that apply in any language)

These are the *thinking* habits behind readable, correct code, independent of Java or Spring. They're the difference between code that merely works and code you (and others) can safely change six months later. Examples use Java, but the ideas transfer to any language.

> This page is about **how to shape logic** (control flow, readability, structure). For Java-specific idioms (records, `Optional`, enums), see [Java best practices](java-best-practices.md).

## 1. Early return (guard clauses)

Handle the exceptional/invalid cases **first** and `return` immediately, so the main logic isn't buried inside nested `if`s.

```java
// ❌ Arrow-shaped: the real work is deep inside nested ifs
String describe(Parcel parcel) {
    if (parcel != null) {
        if (parcel.recipient() != null) {
            if (parcel.status() == Status.DELIVERED) {
                return "Delivered to " + parcel.recipient();
            } else {
                return "In transit";
            }
        } else {
            return "Unknown recipient";
        }
    } else {
        return "No parcel";
    }
}
```

```java
// ✅ Guard clauses: deal with edge cases up front, then the happy path is flat
String describe(Parcel parcel) {
    if (parcel == null)            return "No parcel";
    if (parcel.recipient() == null) return "Unknown recipient";
    if (parcel.status() != Status.DELIVERED) return "In transit";

    return "Delivered to " + parcel.recipient();   // the "happy path", unindented
}
```

**Why:** the reader sees the preconditions immediately, indentation stays shallow, and the normal case is the last, clearest line. This single habit removes most "pyramid of doom" nesting.

## 2. Keep nesting shallow

Deeply nested code (`if` inside `for` inside `if`…) is hard to follow. Reduce it by:

- using **early returns** (above),
- inverting conditions (`if (!valid) return;`),
- extracting an inner block into its own well-named method.

**Rule of thumb:** if you're more than ~3 levels deep, something wants to become a separate method.

## 3. DRY: Don't Repeat Yourself

Every piece of knowledge should live in **one** place. Duplicated logic drifts out of sync: you fix a bug in one copy and forget the other.

```java
// ❌ the "delivered" rule is copied in two places
if (parcel.status() == Status.DELIVERED) { ... }   // here
if (p.status() == Status.DELIVERED) { ... }        // and here

// ✅ one source of truth
boolean isDelivered() { return status == Status.DELIVERED; }
```

**Caution:** don't over-apply it. Two lines that *look* similar but represent *different* decisions shouldn't be merged just to avoid repetition, because that couples things that should change independently. DRY is about single sources of *knowledge*, not identical-looking text.

## 4. KISS: Keep It Simple

Prefer the simplest solution that solves the actual problem. Clever, compact code that takes ten minutes to understand is a liability. A junior teammate (or future you) should be able to read it.

## 5. YAGNI: You Aren't Gonna Need It

Don't build for imagined future requirements. Add abstraction, config, or flexibility only when a real need appears. Speculative generality is code you have to maintain for a payoff that usually never comes. (This is *the* reason ParcelPilot starts as a monolith and splits only when a boundary is proven.)

## 6. Single Responsibility

A function/class should have **one reason to change**, one job. If you describe it with "and" ("validates the input **and** saves to the DB **and** sends an email"), split it.

```java
// ❌ one method doing three jobs
void handleDelivery(String id) { validate(id); save(id); email(id); }

// ✅ each piece is separately testable and reusable; the orchestrator stays thin
void handleDelivery(String id) {
    validate(id);
    markDelivered(id);
    notifier.parcelDelivered(id);
}
```

**Why:** small single-purpose units are easier to name, test, and change without side effects elsewhere.

## 7. Separation of concerns

Different *kinds* of work belong in different places: HTTP handling, business rules, and database access shouldn't be tangled in one class. This is exactly the controller / service / repository split in [Code organization](code-organization.md). Each concern can then change (or be tested) on its own.

## 8. Fail fast

Detect a bad state as early as possible and stop, rather than letting corruption spread and surface somewhere confusing later.

```java
    // validate at the boundary/constructor, not 200 lines deep
if (id == null || id.isBlank()) throw new IllegalArgumentException("id is required");
```

**Why:** an error thrown at the source points straight at the cause. A bad value that travels far becomes a mystery.

## 9. Name a "magic number" / magic string

A bare literal in the middle of logic hides its meaning. Give it a name.

```java
// ❌ what is 5? why 5?
if (attempts > 5) block();

// ✅ intent is explicit and the value lives in one place
static final int MAX_LOGIN_ATTEMPTS = 5;
if (attempts > MAX_LOGIN_ATTEMPTS) block();
```

## 10. Prefer pure functions, isolate side effects

A **pure function** returns the same output for the same input and changes nothing outside itself (no I/O, no mutating shared state). **Side effects** (writing a DB, sending a request, printing) are necessary, but keep them at the edges and keep the core logic pure.

```java
// pure: easy to test, no surprises
int totalWeight(List<Parcel> parcels) {
    return parcels.stream().mapToInt(Parcel::weight).sum();
}
```

**Why:** pure functions are trivial to test (no setup, no mocks) and can't cause spooky action at a distance. Concentrating side effects makes the risky parts obvious.

## 11. Prefer immutability

Data that can't change after creation can't be corrupted, is safe to share, and is easy to reason about. Reach for "change by creating a new value" over "mutate in place" when practical. (Java specifics: `final` and `record`. See [best practices #2](java-best-practices.md#2-prefer-immutability-final-records).)

## 12. Low coupling, high cohesion

- **Coupling** = how much one part depends on another. Aim for **low** (talk through small interfaces, not internals).
- **Cohesion** = how focused a unit is on one job. Aim for **high** (related things together).

Low coupling + high cohesion is what lets you change one part without breaking others, the whole reason the modular monolith (Step 11) is structured the way it is.

## 13. Idempotency

An operation is **idempotent** if doing it twice has the same effect as doing it once. It matters anywhere retries or duplicates can happen (network calls, queue messages). ParcelPilot's notification consumer is idempotent so a redelivered message doesn't notify twice (Step 12).

## 14. Make the change easy, then make the easy change

Before a tricky edit, first *refactor* so the change becomes simple, then do it. And leave code a little cleaner than you found it (the "Boy Scout rule"). Small, safe improvements compound.

---

## The one-screen summary

| Concept | In one line |
|---|---|
| Early return / guard clauses | Handle bad cases first, keep the happy path flat. |
| Shallow nesting | >3 levels deep → extract a method. |
| DRY | One source of truth per piece of knowledge. |
| KISS | Simplest thing that works. |
| YAGNI | Build it when you actually need it. |
| Single Responsibility | One reason to change. |
| Separation of concerns | Different kinds of work in different places. |
| Fail fast | Stop at the source of a bad state. |
| No magic numbers | Name the value. |
| Pure functions | Same input → same output, no side effects. |
| Immutability | Prefer values that don't change. |
| Low coupling / high cohesion | Depend little, stay focused. |
| Idempotency | Twice == once. |

## See also

- [Java best practices (and why)](java-best-practices.md)
- [Code organization](code-organization.md)
- [Java and OOP](java-and-oop.md)
