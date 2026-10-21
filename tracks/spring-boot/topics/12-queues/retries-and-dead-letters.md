# Retries and dead letters: when a message keeps failing

Companion to [Step 12](README.md). Do it after the build works.

> [!PICTURE]
> A parcel keeps falling off the belt. The worker puts it back twice, a little more carefully each time. When it falls a third time, he stops trying and drops it into the **"dead letters"** box. The belt keeps moving for every other parcel, and in the evening a person looks into the box.

## Problem

A `ParcelDelivered` event arrives with a malformed payload, or the notification provider is down, and your consumer **throws**. The message is not acked, so RabbitMQ puts it back — and delivers it again. It fails again. And again, hundreds of times per second: a **poison message**, stuck in an infinite redelivery loop, eating the worker alive while every healthy message queues up behind it.

Two questions need answers: *how often and how patiently do we retry?* and *where does a message go when retrying clearly isn't going to help?*

## Key words

| Word | Beginner meaning |
|---|---|
| **Poison message** | A message that fails processing every single time (bad data, permanent bug). |
| **Transient failure** | A failure that fixes itself: provider briefly down, network blip, DB restart. Worth retrying. |
| **Permanent failure** | A failure retries can never fix: unparseable payload, violated business rule. |
| **Backoff** | Waiting longer between attempts (1s, 10s, 60s…) instead of hammering instantly. |
| **Nack / requeue** | The consumer telling the broker "failed" — optionally putting the message back in line. |
| **Dead-letter queue (DLQ)** | A separate queue where messages go after too many failures, instead of looping forever. |

## Retry — but with backoff, and not forever

Retrying is right for **transient** failures: if the SMS provider is down for 30 seconds, the second or third attempt succeeds and nobody notices. But *immediate* re-attempts (the default nack-and-requeue loop) retry a hundred times in the same second the provider is down — all wasted. Retries need **backoff**: wait 1 second, then 10, then 60. And they need a **limit**, because a poison message will fail attempt #1,000,000 too.

Where does retrying actually happen? Two flavors, both fine to keep conceptual for now:

- **In the consumer**: catch the failure and re-attempt in-process with growing pauses. Spring AMQP does this from configuration — simplest, and what ParcelPilot uses.
- **In the broker, via delayed retry queues**: on failure the message is parked in a side queue whose messages only become visible again after a delay, then flow back to the main queue. More moving parts, but the wait doesn't occupy a consumer thread. You'll meet this pattern in bigger systems; recognizing it is enough today.

## The dead-letter queue

A **dead-letter queue** is, plainly: *the queue where messages go when the main queue gives up on them*. After N failed attempts, instead of deleting the message (data loss, silent) or requeueing it forever (the poison loop), the broker moves it aside. The main queue flows again, and the failed message is **kept, inspectable, and replayable**.

```mermaid
flowchart LR
  P[producer] --> Q[parcel-delivered queue]
  Q --> W[notification worker]
  W -->|success| A[ack, done]
  W -->|fail #1..#3, backoff between| Q
  W -->|still failing after 3 attempts| DLQ[parcel-delivered.dlq]
  DLQ --> H[human: alert, inspect, fix, replay]
  style DLQ fill:#ffcdd2
```

### What do you DO with dead letters?

A DLQ is a hospital, not a graveyard — its value is entirely in what happens next:

1. **Alert**: a non-empty DLQ should page or notify someone. (Even step 07's logging is enough to start: log loudly when a message dead-letters.)
2. **Inspect**: open the message in the management UI (`http://localhost:15672`, *Queues → parcel-delivered.dlq → Get messages*). The payload plus the consumer's exception in the logs usually name the bug directly.
3. **Fix, then replay**: deploy the fix, then move the message back to the main queue (*shovel* it in the UI, or republish it). Because your consumer is [idempotent](idempotency-lab.md), replaying is safe even if part of the work already happened.

The failure mode to fear is the **silent DLQ graveyard**: messages quietly pile up for months because nobody watches. A DLQ nobody monitors is data loss with extra steps.

## In ParcelPilot: where the two pieces live

You already built both pieces in [step 12](README.md):

- **Retries with backoff** are five lines in `application.properties` (README sub-step 3): 3 attempts, waiting 1 s and then 3 s, and `default-requeue-rejected=false` so the last failure is **not** put back on the queue (no poison loop).
- **The dead-letter box** is two queues in `MessagingConfig` (README sub-step 5): `parcel-delivered` carries the arguments `x-dead-letter-exchange` and `x-dead-letter-routing-key`, which tell RabbitMQ "when a message is rejected, move it to `parcel-delivered.dlq`".

Flow: exception → retry after 1 s → retry after 3 s → still failing → rejected without requeue → RabbitMQ moves it to `parcel-delivered.dlq`.

## Watch a poison message land in the box

Add a temporary trap at the **very top** of `handle(...)` in `ParcelDeliveredListener`, before the insert:

```java
if (event.parcelId().startsWith("POISON")) {
    throw new IllegalStateException("cannot notify for " + event.parcelId());   // TEMPORARY
}
```

It must sit before the insert. If it were after, the second attempt would find the row, think "duplicate", and quietly ack the message: the failure would vanish without a trace.

> [!TRY]
> 1. Restart the app.
> 2. Create a parcel `POISON-1`, pick it up, and deliver it (the three `curl` commands from the step README, with id `POISON-1`).
> 3. Watch the log: the exception appears **three** times, about 1 s and then 3 s apart.
> 4. Open `http://localhost:15672` → **Queues**.
>
> You should see `parcel-delivered` at `Ready: 0` and `parcel-delivered.dlq` at `Ready: 1`. Click the DLQ → **Get messages** to read the payload. Then remove the trap.

## Pros and cons

| Pros | Cons |
|---|---|
| Transient failures heal themselves — nobody gets paged for a 30-second blip | More infrastructure: retry config, a second queue, alerting on it |
| Poison messages can't take the worker hostage | A DLQ nobody watches is a silent graveyard (= slow data loss) |
| Failed messages are kept and inspectable, not lost | Retries delay *everything* behind the message while it fails (in-consumer flavor) |
| Replay-after-fix turns bugs into recoverable events | Tuning attempts/delays is judgment, not science |

## When NOT to automate retries

Retries only help failures that **time fixes**. A payload that can't be parsed today can't be parsed in 60 seconds either — three doomed retries only delay the inevitable and blur your logs. For failures you *know* are permanent (validation errors, impossible state transitions), **fail fast**: skip or minimize retries, dead-letter (or log-and-drop) immediately, and alert a human — a person with context beats an automated loop that was never going to succeed. The honest rule: retry the *transient*, dead-letter the *permanent*, and make sure a human hears about the latter.

## Check yourself

> [!CHECK]
> 1. Which failures are worth retrying, and which are not?
>    <details><summary>Answer</summary>Retry <strong>transient</strong> failures that time can fix (provider briefly down, network blip). Do not keep retrying <strong>permanent</strong> ones (a payload that cannot be parsed, a broken business rule): send them to the dead-letter queue and tell a human.</details>
> 2. What does `default-requeue-rejected=false` prevent?
>    <details><summary>Answer</summary>The poison loop. After the last retry the message is rejected <em>without</em> going back on the queue, so RabbitMQ moves it to the dead-letter queue instead of delivering it again forever.</details>
> 3. A dead-letter queue fills up and nobody looks. What have you built?
>    <details><summary>Answer</summary>A silent graveyard: slow data loss. A DLQ only helps if someone is alerted, inspects the messages, fixes the bug and replays them.</details>

## Next

- Duplicates (the *other* redelivery problem, including why retries cause them): [Idempotency lab](idempotency-lab.md).
- The delivery-guarantee vocabulary behind all of this: [Messaging and queues](../../references/architecture/messaging-and-queues.md).
- Back to [Step 12](README.md).
