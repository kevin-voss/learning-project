# Service contracts: the agreement that no compiler checks

Companion to [Step 13](README.md). Read after the split works, before you change anything about the event.

## The problem

Imagine this innocent refactor: someone renames the `parcelId` field in the `ParcelDelivered` event to `parcelID` — nicer capitalization, right? parcel-service compiles. Its tests pass. It deploys. Every event it publishes is now:

```json
{"eventId":"e-91","parcelID":"P-7","occurredAt":"2026-07-14T18:22:31Z"}
```

notification-service, deployed last week, still reads `parcelId`. It finds `null`, and depending on how it's written, it either crashes on every message or "sends" notifications for parcel `null`. **No compiler caught this.** Inside the monolith, renaming a field broke the build within seconds — the compiler was your contract checker. Across two independently built services, the only thing connecting them is bytes in a message, and bytes don't complain. They stop meaning what the other side thinks they mean.

## Key words

| Word | Beginner meaning |
|---|---|
| **Contract** | The message/API shape *and meaning* that both sides rely on. |
| **Producer** | The side that creates the message (here: parcel-service). |
| **Consumer** | The side that reads it (here: notification-service). |
| **Additive change** | Adding something new without touching what exists. Safe. |
| **Breaking change** | Renaming/removing/retyping something a consumer relies on. Dangerous. |
| **Schema** | A written, checkable description of a message's shape. |

## What is a contract?

A contract is everything the consumer depends on: the **shape** (field names, types, which fields are always present) *plus* the **semantics** (what the fields mean and when the message is sent). "`occurredAt` is UTC" is part of the contract. "A `ParcelDelivered` event is published at most once per delivery, after the database save" is part of the contract. None of it is enforced by any tool you currently run — it holds only as long as both codebases agree.

## ParcelPilot's contract, written down

The `ParcelDelivered` event from [step 12](../12-queues/README.md) *is* a contract. Here it is as a spec — this table is worth more than it looks, because until now the contract existed only implicitly in two Java files:

**Event: `ParcelDelivered`** — published by parcel-service when a parcel's status changes to `DELIVERED`, consumed by notification-service.

| Field | Type | Required | Meaning |
|---|---|---|---|
| `eventId` | string (UUID) | yes | Unique per event. The consumer uses it for idempotency (skip already-handled IDs). |
| `parcelId` | string | yes | The parcel that was delivered. The consumer's only link back to the business fact. |
| `recipient` | string | yes | Who gets the notification. Sent along so the consumer never needs the parcel database. |
| `occurredAt` | string (ISO-8601, UTC) | yes | When the delivery was recorded. |

```json
{"eventId":"0b6f6c2e-6f4e-4d8a-9a51-3f1b2b7c9e10","parcelId":"P-7","recipient":"Ava","occurredAt":"2026-07-14T16:22:31Z"}
```

Transport details belong to the contract too: the queue is `parcel-delivered`, the body is JSON (`content_type: application/json`), and from step 14 an optional `correlationId` **header** travels next to the body.

## Producer and consumer obligations

| The producer (parcel-service) promises | The consumer (notification-service) promises |
|---|---|
| Every required field is present, with the documented type and meaning | Ignore fields it doesn't know (so the producer can add fields later) |
| `eventId` is unique per event | Be idempotent: handle a redelivered `eventId` harmlessly |
| Publish only after the state change is real (saved) | Never reach around the contract (e.g. query the parcel database directly) |
| Never rename/remove/retype a field without a migration plan | Fail loudly (log + reject), not silently, on a message it can't understand |

## Evolving a contract safely

**Additive changes are safe.** Adding a new *optional* field breaks nobody — old consumers ignore it. This only works if consumers are written to tolerate unknown fields (Jackson's default with `@JsonIgnoreProperties(ignoreUnknown = true)`, or configuring the mapper not to fail on unknown properties).

**Renames and removals break.** The consumer looks for a name that no longer exists. You can't deploy both services in the same instant, and messages already sitting in the queue have the *old* shape — so "change both sides at once" doesn't work. The safe route is **expand–migrate–contract**:

- **Expand:** the producer sends *both* the old and the new field (`parcelId` and `parcelID`, same value).
- **Migrate:** deploy the consumer to read the new field. Wait until every old-format message in the queue is drained.
- **Contract:** the producer stops sending the old field.

Three deploys instead of one, and no window in which anyone misunderstands anyone.

## Testing and versioning (a look ahead)

**You already have a small version of this.** Step 13 gave each side a `@JsonTest`: parcel-service checks that it *writes* `eventId`, `parcelId`, `recipient` and `occurredAt`; notification-service checks that it can *read* that JSON, even with an extra unknown field. Rename `parcelId` in one service and its test turns red.

**Consumer-driven contract tests** take the idea further: the consumer writes down what it needs from the message ("there is a string field `parcelId`"), and that expectation runs as a test *in the producer's build* — so the rename above would fail parcel-service's build, restoring what the monolith's compiler used to do. Tools like Pact automate this; the idea matters more than the tooling today. In one sentence: **schema registries** (common with Kafka) go further and have the broker infrastructure itself validate every message against a registered schema.

**Versioning:** when a change is too big to expand-migrate-contract, publish it as a new event version — a new queue such as `parcel-delivered.v2`, or a `"version": 2` field — and let consumers opt in. Keep it that simple for now.

## Strict vs loose contracts

| | Strict (schemas, validation, contract tests) | Loose (JSON + shared understanding) |
|---|---|---|
| Pros | Breaks are caught at build time, not in production; contract is documented by force | Zero tooling, fast to change, fine while one person owns both sides |
| Cons | More setup, one more thing failing your build, can ossify small changes | Nothing stops a silent break; the "documentation" is two codebases drifting apart |

ParcelPilot uses a loose contract plus this written spec — the right weight for one developer and one event. The moment a second team or a third service appears, strictness starts paying for itself.

## Tie back: the compiler was your contract checker

In the [modular monolith (step 11)](../11-monolith/README.md), the parcel module called notifications through the `Notifier` interface — rename anything and the build broke instantly (see the [module boundaries lab](../11-monolith/module-boundaries-lab.md)). The interface *was* the contract, and the compiler enforced it for free. Splitting services didn't remove the contract; it removed the **enforcement**. Everything in this page is about putting some of that enforcement back — by hand, by discipline, or eventually by tests.

## Next

- Watch what happens when the network under the contract fails: [network-failure-lab.md](network-failure-lab.md)
- Back to the step: [Step 13 README](README.md)
- The bigger picture: [Monoliths and microservices](../../references/architecture/monolith-and-microservices.md)
