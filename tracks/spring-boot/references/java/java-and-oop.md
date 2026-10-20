# Java, OOP, composition, and singleton

## The smallest useful model

A class combines state and behavior:

```java
final class Parcel {
  private final String id;
  private Status status = Status.CREATED;

  Parcel(String id) { this.id = id; }

  void markPickedUp() {
    if (status != Status.CREATED) throw new IllegalStateException();
    status = Status.PICKED_UP;
  }
}
```

The field is private so callers cannot silently make an impossible state. The method is where the rule lives.

## Composition over inheritance

Composition means an object receives or owns collaborators:

```java
final class ParcelTracker {
  private final Clock clock;
  ParcelTracker(Clock clock) { this.clock = clock; }
}
```

Inheritance says one class is a specialized form of another. It can be appropriate for true substitutable types, but it couples parent and child behavior. A `ParcelTracker` is not a clock. It **has** one. Composition makes a fake clock easy in a test.

## Singleton

A singleton permits exactly one instance:

```java
final class SystemClock implements Clock {
  private static final SystemClock INSTANCE = new SystemClock();
  private SystemClock() {}
  static SystemClock instance() { return INSTANCE; }
}
```

Use it sparingly for stateless shared infrastructure. Do not use a singleton as a shortcut for global mutable application state. Spring itself manages many objects as singleton-scoped beans, but that does not mean they should hold per-request data.

## Useful early principles

- Prefer `final` fields, because objects are easier to reason about when their identity cannot change.
- Make invalid states hard to create.
- Put a rule near the data it protects.
- Keep methods small and names specific.
- Write a test before adding abstraction when behavior is unclear.
