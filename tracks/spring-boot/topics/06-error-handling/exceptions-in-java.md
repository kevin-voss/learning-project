# Exceptions in ParcelPilot

> [!PICTURE]
> A sorting-room worker finds a problem: "this parcel does not exist!". She does not fix it herself. She writes it on a red card and sends it up to the manager. The manager knows which "sorry slip" to give the customer. Throwing an exception is sending the red card up; the `@RestControllerAdvice` is the manager.

`throw`, `try`/`catch`/`finally`, the exception family tree and reading a stack trace are taught in the Java hub: [Exceptions](../../../java/topics/exceptions/index.html). Read it first if any of those words feel shaky. This page covers only what ParcelPilot and Spring need.

## Why Spring likes unchecked exceptions

- **Checked** exceptions (`IOException`) force every method on the way to write `throws` or catch them.
- **Unchecked** exceptions (`RuntimeException` and its children) travel up the call chain without touching any signature.

Spring wants an exception thrown deep in your domain to reach **one central handler** untouched. So Spring's own exceptions, and the ones you write for it, are unchecked. Checked exceptions still fit the edges of a program, where a failure is expected and you can fix it on the spot (a file that may be missing).

## Write your own: `ParcelNotFoundException`

```java
package com.parcelpilot;

public class ParcelNotFoundException extends RuntimeException {
    public ParcelNotFoundException(String id) {
        super("Parcel '" + id + "' not found");
    }
}
```

- **Extends `RuntimeException`**: unchecked, so it flies from the controller to the advice.
- **Takes the data, builds the message**: every throw site writes `throw new ParcelNotFoundException(id)` and the message is always the same shape.
- **A specific name**: the advice can map exactly this class to `404`.

Reuse built-in exceptions for generic rule breaks: `IllegalArgumentException` (bad input), `IllegalStateException` (not allowed in the current state, our `409`). Create your own only when the central handler must treat that failure **differently**.

## Messages that help

A message is read by a developer in a stack trace and, for expected errors, by a client in the error body. Both want: **expected X, got Y, for which thing**.

```java
// Bad: true, but useless
throw new IllegalStateException("Invalid transition");

// Good
throw new IllegalStateException(
    "Cannot deliver parcel " + id + ": expected status PICKED_UP, got " + status);
```

## Reading a Spring stack trace

A Spring stack trace is long, but only a few lines are yours:

```text
java.lang.IllegalStateException: Cannot deliver parcel P-1: expected status PICKED_UP, got CREATED
	at com.parcelpilot.Parcel.markDelivered(Parcel.java:42)
	at com.parcelpilot.ParcelController.changeStatus(ParcelController.java:58)
	at org.springframework.web.method.support.InvocableHandlerMethod.doInvoke(...)
	... 47 more frames ...
```

1. First line: what went wrong and why.
2. The top `at` line: where the `throw` happened (`Parcel.java`, line 42).
3. Look only for lines starting with **your package** (`com.parcelpilot`). Skip `org.springframework` and `java.base`.
4. If you see `Caused by:`, the deepest one is the real problem.

> [!WARN]
> Only catch what you can really handle. `catch (Exception e) {}` turns one clear failure into a mystery. If the controller cannot fix it, let it fly to the advice.

> [!CHECK]
> 1. Why does `ParcelNotFoundException` extend `RuntimeException` and not `Exception`?
>    <details><summary>Answer</summary>So it is unchecked. It travels from the controller to the <code>@RestControllerAdvice</code> without forcing <code>throws</code> onto every method signature.</details>
> 2. When do you write your own exception class instead of reusing `IllegalStateException`?
>    <details><summary>Answer</summary>When the central handler must treat that failure differently, for example "parcel not found" must become <code>404</code>, not <code>409</code>.</details>
> 3. In a long Spring stack trace, which line do you open first?
>    <details><summary>Answer</summary>The top <code>at</code> line from your own package (<code>com.parcelpilot</code>), or the deepest <code>Caused by:</code> if there is one.</details>

**Next:** back to [Step 06](README.md), then the [controller advice lab](controller-advice-lab.md).
