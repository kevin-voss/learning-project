# Java best practices (and *why*)

A best practice is only useful if you know the reason behind it. Otherwise it's just a rule you'll break the moment it's inconvenient. This page collects the habits ParcelPilot uses, each with the *problem it prevents*. Skim it now, and return after each step as the practices become relevant.

Practices are grouped from "applies on day one" to "matters as the system grows".

---

## 1. Naming: make code read like sentences

| Practice | Why |
|---|---|
| Classes are **nouns**, `PascalCase`: `Parcel`, `ParcelTracker`. | A class models a *thing*, so the name should say which thing. |
| Methods are **verbs**, `camelCase`: `markDelivered()`, `findByStatus()`. | A method *does* something, so the name should say what. |
| Variables describe their content: `recipient`, not `r` or `data`. | You read code far more than you write it. Vague names hide bugs. |
| Constants are `UPPER_SNAKE_CASE`: `MAX_RETRIES`. | Signals "this value never changes" at a glance. |
| Packages are lowercase, reverse-domain: `com.parcelpilot.parcel`. | Convention that keeps names globally unique. |
| Booleans read as questions: `isPriority`, `hasVersion`. | `if (isPriority)` reads like English. |

**Rule of thumb:** if a name needs a comment to explain what it holds, rename it.

## 2. Prefer immutability (`final`, records)

```java
public final class Parcel {
    private final String id;          // set once, never reassigned
    private final String recipient;
}
```

- Mark fields `final` when they shouldn't change after construction.
- Use `record` for pure data holders: `record ParcelResponse(String id, String status) {}`.

**Why:** an object whose data can't change is impossible to corrupt halfway, safe to share between threads, and trivial to reason about. Most bugs come from state changing when you didn't expect it. Immutability removes that whole category.

## 3. Make invalid states impossible

- Validate in the **constructor** so an object can never exist in a broken state (`new Parcel("", "")` should throw, not succeed).
- Use **enums** instead of magic strings for a fixed set of values (`Status.DELIVERED`, not `"DELIVERED"`).
- Keep fields **`private`** and expose behavior, not raw setters.

**Why:** if the object guarantees its own validity, every other piece of code can trust it. The alternative (checking validity everywhere) is repetitive and always misses a spot.

Once ParcelPilot speaks HTTP, the same idea gets a second line of defense at the API boundary: [Step 05 (validation and trustworthy inputs)](../topics/05-validation-and-inputs/README.md) rejects bad requests with a helpful `400` before they ever reach the constructor.

## 4. Encapsulate: hide data, expose behavior

```java
// Good: the rule lives with the data
public void markDelivered() {
    if (status != Status.PICKED_UP) throw new IllegalStateException("...");
    status = Status.DELIVERED;
}

// Avoid: a naked setter lets anyone set any status, bypassing the rule
public void setStatus(Status s) { this.status = s; }
```

**Why:** rules that live next to the data can't be forgotten. Public setters scatter the rules (or lose them) across the codebase.

## 5. Composition over inheritance, inject dependencies

- Prefer **has-a** (composition) over **is-a** (inheritance). See [composition vs inheritance](../topics/02-oop-and-composition/composition-vs-inheritance.md).
- Pass dependencies **in through the constructor** rather than creating them inside.

```java
// Good: the tracker is given its clock -> testable, swappable
public ParcelTracker(Clock clock) { this.clock = clock; }
```

**Why:** injected dependencies can be swapped (a fake `Clock` in tests) and make the real collaborator obvious. Objects that build their own collaborators are rigid and hard to test.

## 6. Fail loudly and specifically with exceptions

- Throw the **most specific** exception: `IllegalArgumentException` for bad input, `IllegalStateException` for an illegal transition.
- Don't `catch` an exception just to ignore it (`catch (Exception e) {}` hides bugs).
- Let unexpected errors propagate, and handle only what you can meaningfully recover from.

**Why:** a precise exception at the moment something goes wrong is a map straight to the bug. A swallowed exception turns one clear failure into a mysterious one later.

[Step 06 (error handling)](../topics/06-error-handling/README.md) builds on exactly this habit: specific exceptions (`ParcelNotFoundException`, `IllegalStateException`) are what let one central handler map each failure to the right HTTP status. The language mechanics are in [exceptions in Java](../topics/06-error-handling/exceptions-in-java.md).

## 7. Tame `null` (avoid `NullPointerException`)

- Return `Optional<T>` for "might be absent" instead of `null` (Spring Data repositories already do: `findById` returns `Optional`).
- Validate arguments early so `null` can't travel deep into the code.
- Prefer empty collections (`List.of()`) over `null` lists.

**Why:** `NullPointerException` is the most common Java crash. Making absence explicit (`Optional`) forces callers to handle the "nothing" case instead of being surprised by it.

At the HTTP boundary, "this field must not be missing or blank" is the same discipline expressed as Bean Validation constraints — see [Step 05](../topics/05-validation-and-inputs/README.md).

## 8. Keep methods and classes small and focused

- One method should do **one** thing. If you need "and" to describe it, split it.
- One class should have **one** reason to change (single responsibility).
- One public class per file, named after the file.

**Why:** small, single-purpose units are easier to name, test, reuse, and change without breaking something unrelated.

## 9. Don't comment *what*, comment *why*

```java
// Bad:  increments the counter
counter++;

// Good: retry budget; providers rate-limit us above 5 calls/second
int maxRetries = 5;
```

**Why:** the code already says *what* it does. Comments should capture intent, trade-offs, and constraints the code can't express: the things a future reader (you) will wish they knew.

## 10. Test behavior, and test the rules

- Write a test for each **rule** (a legal transition succeeds, an illegal one throws, so use `assertThrows`).
- Test through the **public** behavior, not private internals.
- Make tests deterministic (inject a fixed clock instead of reading the real time).

**Why:** tests are the safety net that makes every later change (Spring, DB, queues) survivable. Testing behavior (not internals) lets you refactor freely as long as behavior holds.

Unit tests on the rules are the start; [Step 08 (testing)](../topics/08-testing/README.md) grows the suite to cover HTTP behavior (MockMvc) and, later, real database wiring (Testcontainers). The full picture is in the [testing reference](testing.md).

## 11. Program to interfaces at real boundaries

```java
public interface Notifier { void parcelDelivered(String parcelId); }
```

Depend on the interface (`Notifier`), and provide the implementation (`LoggingNotifier`, later a queue publisher) separately.

**Why:** an interface at a boundary lets you change *how* something is done (log → email → queue → separate service) without touching the code that *uses* it. This is exactly what makes step 13's service extraction cheap.

**Caution:** don't add an interface for everything. Introduce one only at a real seam where you expect more than one implementation (or need it for testing). Premature interfaces are just noise.

## 12. Organize by feature, not by layer

```text
parcel/         notification/        # by feature (do this)
  Parcel                NotificationHandler
  ParcelService

controllers/    services/    repositories/   # by layer (avoid at scale)
```

**Why:** a change to "parcels" touches one folder, not three. Feature packages keep related code together (high cohesion) and make future extraction obvious.

## 13. Configuration comes from outside, secrets never in code

- Read DB URLs, passwords, and hosts from **environment variables**, not hard-coded strings.
- Never commit real secrets. Local-only placeholder values are fine and should look obviously fake.

**Why:** the same build must run against different environments (local, test, prod) by changing config, not code, and leaked credentials in Git history are a serious incident.

How Spring Boot does this (`application.properties`, environment variables, profiles, and their precedence) is covered in the [configuration reference](configuration.md).

## 14. Let tools enforce style

- Use consistent formatting (your IDE's formatter, or a tool like Spotless).
- Treat compiler warnings seriously.

**Why:** consistent style removes pointless debate and makes diffs meaningful (real changes, not reformatting noise).

---

## The short version

> Make illegal states impossible, keep data private and immutable where you can, inject what you depend on, fail with specific exceptions, avoid `null`, keep units small, organize by feature, and test the rules.

Every one of these shows up concretely somewhere in the ParcelPilot roadmap. When a step applies one, it links back here.

## See also

- [General coding concepts](coding-concepts.md): early return, guard clauses, DRY, and other language-agnostic habits
- [Java and OOP reference](java-and-oop.md)
- [Code organization: one file → many → layered](code-organization.md)
- [Design patterns catalog](design-patterns.md)
