# Pattern lab: Builder and Factory

Two patterns you'll actually use in ParcelPilot, each explained the same way: **problem → solution → high-level → code → pros/cons → when to use**.

---

# Pattern 1: Builder

## The problem (real world)

Imagine ordering a coffee by shouting all options in a fixed order: `new Coffee("large", true, false, 2, null, true)`. Nobody can read that. Which `true` is "extra shot"? What's the `null`? Now do the same for a `Parcel` that grows optional fields (priority, insurance, notes, weight):

```java
// what do these values even mean?
Parcel p = new Parcel("P-1", "Ava", true, false, null, 2.5);
```

This is called the **telescoping constructor problem**: as options grow, constructors multiply and become unreadable and error-prone (easy to swap two arguments of the same type).

## The solution

A **Builder** collects fields one at a time by name, applies defaults for what you skip, validates once, and creates the object in `build()`.

## High-level

```mermaid
flowchart LR
  B["Parcel.builder()"] --> S1[".id(\"P-1\")"]
  S1 --> S2[".recipient(\"Ava\")"]
  S2 --> S3[".priority(true)"]
  S3 --> V["build(): validate + create"]
  V --> P["a valid Parcel"]
```

## Code example

```java
public class Parcel {
    private final String id;
    private final String recipient;
    private final boolean priority;

    private Parcel(Builder b) {           // only the builder may construct
        this.id = b.id;
        this.recipient = b.recipient;
        this.priority = b.priority;
    }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private String id;
        private String recipient;
        private boolean priority = false;  // optional -> sensible default

        public Builder id(String id) { this.id = id; return this; }          // return this = chainable
        public Builder recipient(String r) { this.recipient = r; return this; }
        public Builder priority(boolean p) { this.priority = p; return this; }

        public Parcel build() {
            if (id == null || id.isBlank()) throw new IllegalArgumentException("id required");
            if (recipient == null || recipient.isBlank()) throw new IllegalArgumentException("recipient required");
            return new Parcel(this);
        }
    }
}
```

Reads like a sentence, and order doesn't matter:

```java
Parcel parcel = Parcel.builder()
        .id("P-1")
        .recipient("Ava")
        .priority(true)
        .build();
```

The trick is each setter returns `this` (the builder itself), so calls **chain**. `build()` is the single place that validates, so a half-built parcel can never escape.

## Pros and cons

| Pros | Cons |
|---|---|
| Readable: every value is labeled | More code than a plain constructor |
| Order-independent, optional fields with defaults | Overkill for objects with 1–2 required fields |
| One validation point (`build()`) | Slightly more to learn at first |
| Hard to mix up same-typed arguments | n/a |

## When to use / when not

- **Use it** when an object has several fields, especially **optional** ones, or several same-typed fields that are easy to swap.
- **Don't use it** for a tiny value like `new Point(x, y)`. A constructor is clearer.

**Real-world examples:** `StringBuilder`, HTTP client request builders, and test-data builders. Java's own `HttpRequest.newBuilder().uri(...).GET().build()` is exactly this pattern.

---

# Pattern 2: Factory (factory method)

## The problem (real world)

A parcel can be delivered by different notification channels: email or SMS. If every place that sends a notification writes `if (channel == EMAIL) ... else if (channel == SMS) ...`, that decision is **copy-pasted everywhere**. Add a third channel later and you must hunt down every `if`.

```java
// scattered decision, repeated in many places:
if (channel == EMAIL) sender = new EmailSender();
else if (channel == SMS) sender = new SmsSender();
```

## The solution

A **Factory** centralizes the "which one do I create?" decision behind a single method that returns a shared **interface**. Callers ask for behavior, not a specific class.

## High-level

```mermaid
flowchart LR
  C["caller: forChannel(SMS)"] --> F["NotificationSenderFactory"]
  F -->|EMAIL| E["EmailSender"]
  F -->|SMS| S["SmsSender"]
  F --> I["returns NotificationSender (interface)"]
```

## Code example

```java
public interface NotificationSender {
    void send(String message);
}

public class NotificationSenderFactory {
    public static NotificationSender forChannel(Channel channel) {
        return switch (channel) {
            case EMAIL -> new EmailSender();
            case SMS   -> new SmsSender();
        };
    }
}
```

```java
// caller depends only on the interface + the factory
NotificationSender sender = NotificationSenderFactory.forChannel(Channel.SMS);
sender.send("Your parcel was delivered");
```

Adding a "push notification" channel later means editing **one** place (the factory), not every caller.

## Pros and cons

| Pros | Cons |
|---|---|
| One place decides which implementation to build | Another layer of indirection |
| Callers depend on an interface, not concrete classes | Pointless if there's only ever one implementation |
| Easy to add new types later | Can hide a simple `new` behind ceremony if misused |

## When to use / when not

- **Use it** when the concrete class to create depends on input/config, or when you want callers decoupled from concrete classes.
- **Don't use it** when there is exactly one implementation and no foreseeable second. Just call `new`.

**Real-world examples:** `DriverManager.getConnection(url)` returns the right database driver. Logging frameworks return the configured logger implementation.

---

# When NOT to use builder and factory

Patterns are tools, not merit badges. Both patterns above have a real cost (more code, more indirection), so they must earn their place. Here's what over-use looks like, honestly.

## Builder: don't use it for 2–3 field objects

The builder solves *telescoping constructors* — many fields, several optional. A tiny object has neither problem. Compare:

```java
// Over-built: ~20 lines of ceremony for two required fields
TrackingEvent event = TrackingEvent.builder()
        .parcelId("P-1")
        .status(Status.DELIVERED)
        .build();

// Plain and better: nothing to mix up, nothing optional
TrackingEvent event = new TrackingEvent("P-1", Status.DELIVERED);
```

The builder version isn't just longer at the call site — someone had to *write and maintain* the `Builder` class behind it (a field, a setter, and a `build()` check for every property). All that to label two arguments that were never confusing.

**Records remove the need even more often.** A Java `record` gives you the constructor, accessors, `equals`/`hashCode`, and `toString` in one line, and its compact constructor is a fine validation point:

```java
public record TrackingEvent(String parcelId, Status status, Instant when) {
    public TrackingEvent {                       // compact constructor: validates
        if (parcelId == null || parcelId.isBlank())
            throw new IllegalArgumentException("parcelId required");
    }
}
```

If your object is small, immutable data — and `TrackingEvent` is exactly that — a record beats a hand-written builder on every axis. Builders shine when there are *many* fields, *several optional with defaults*, or *several same-typed fields in a row* (`String, String, String` — which one was the city?).

## Factory: don't use it when there's nothing to decide

The factory's job is to centralize a *decision*: which implementation, based on input or config. One implementation and no creation logic = no decision = nothing to centralize:

```java
// Over-abstracted: a factory that can only ever say "a ConsoleSender"
public class SenderFactory {
    public static NotificationSender create() {
        return new ConsoleSender();     // no input, no branching, no choice
    }
}
NotificationSender sender = SenderFactory.create();

// Honest version:
NotificationSender sender = new ConsoleSender();
```

The factory adds a class, a level of indirection, and an implication ("something interesting happens during creation!") that is a lie. Every reader pays a small toll checking what `create()` really does; the answer is `new`. This is **YAGNI** — *You Aren't Gonna Need It*: don't build machinery for a future that hasn't asked for it. If a second sender arrives (it does, in step 12), introducing a factory *then* is a five-minute, low-risk refactor — the compiler shows you every call site. You lose essentially nothing by waiting, and you avoid carrying dead weight if the future never comes.

> The same honesty applies to interfaces themselves: see the "just in case" discussion in [interfaces and abstractions](interfaces-and-abstractions.md).

## Decision checklist

Reach for a **builder** when:

- the object has **many fields**, especially several **optional** ones with defaults, or
- adjacent **same-typed parameters** make call sites genuinely easy to get wrong, or
- construction needs a single validation point *and* a record doesn't fit (mutable, complex assembly).

Otherwise: a **constructor** — or better, a **record** — is clearer.

Reach for a **factory** when:

- **which** implementation to create depends on input, config, or environment, or
- creation involves real **logic** (wiring, pooling, caching) callers shouldn't repeat, or
- you must keep callers **decoupled** from concrete classes across a real boundary.

Otherwise: just call `new`. It's not a design failure — it's the simplest thing that works.

---

## Proof (do this)

1. Create a parcel with the **builder** and write a test asserting `build()` throws when `recipient` is blank.
2. Implement the sender **factory** and write a test asserting `forChannel(SMS)` returns an `SmsSender`.

## Where the other patterns live

Adapter, decorator, facade, proxy, composite, observer, strategy, command, and iterator each appear in the step where they solve a real ParcelPilot problem. The full catalog with examples is in [Design patterns](../../references/design-patterns.md).
