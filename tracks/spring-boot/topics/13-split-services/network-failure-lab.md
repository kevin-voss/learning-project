# Network failure lab: partial failure is the default now

Hands-on companion to [Step 13](README.md). Work in `applications/parcelpilot-services` with both services, both databases, and RabbitMQ running on `parcelpilot-net` (the Test-it setup from the README).

## The problem

In the monolith, "the notification module is down while the parcel module is up" was **impossible**. One process: either everything runs or nothing does. A method call to the notification code could not time out, get lost, or reach a machine that no longer exists.

You traded that away. parcel-service and notification-service are separate processes talking over a network through a broker, and each of the three can fail **independently**. This is called **partial failure**, and in a distributed system it is not the exception — it is the default operating condition you must design for. This lab makes you *watch* it happen, twice, so it is never abstract again.

## Key words

| Word | Beginner meaning |
|---|---|
| **Partial failure** | Some parts of the system are down or unreachable while others keep working. |
| **Timeout** | Giving up on a network call after a set time instead of waiting forever. |
| **Retry** | Trying a failed operation again, ideally with a limit and a delay. |
| **Availability** | The share of time a service can actually answer requests. |
| **Backlog** | Messages piling up in a queue because the consumer isn't taking them. |

## Exercise 1: kill the consumer — the queue as a shock absorber

The whole point of splitting *behind a queue*: the death of notification-service should be **invisible** to parcel operators.

### 1a. Stop notification-service

```bash
docker stop notification-service
```

### 1b. Keep using the parcel API as if nothing happened

```bash
curl -i -X POST http://localhost:8080/parcels \
  -H 'Content-Type: application/json' -d '{"id":"P-20","recipient":"Ava"}'

curl -i -X PATCH http://localhost:8080/parcels/P-20/status \
  -H 'Content-Type: application/json' -d '{"status":"PICKED_UP"}'
curl -i -X PATCH http://localhost:8080/parcels/P-20/status \
  -H 'Content-Type: application/json' -d '{"status":"DELIVERED"}'
```

Expected: `201`, `200`, `200` — full speed, no errors. Half your system is down and the API's **availability** is untouched. Mark two or three more parcels delivered to build up messages.

### 1c. Watch the backlog pile up

Open the RabbitMQ management UI at `http://localhost:15672` (user/pass `guest`/`guest`) and look at your queue's message count — or ask from the terminal:

```bash
docker exec rabbitmq rabbitmqctl list_queues name messages
```

Expected:

```text
name                    messages
parcel-delivered        3
parcel-delivered.dlq    0
```

Three `ParcelDelivered` events, safely parked. Nobody is consuming, and nothing is lost.

### 1d. Restart and watch the backlog drain

```bash
docker start notification-service
docker logs -f notification-service
```

Expected: within seconds, one "notification sent for P-…" log line per parked message, and the queue count drops back to `0`:

```bash
docker exec rabbitmq rabbitmqctl list_queues name messages
# parcel-delivered        0
```

**What you saw:** the queue acted as a **shock absorber**. The producer never noticed the consumer was gone; the work waited instead of failing. This is the best-case version of partial failure — because you put a buffer between the two services.

## Exercise 2: kill the broker — when the shock absorber itself dies

The queue saved you above. But the queue is *also* a service on the network. What happens when **it** is gone?

### 2a. Stop RabbitMQ

```bash
docker stop rabbitmq
```

### 2b. Try to mark a parcel delivered

```bash
curl -i -X PATCH http://localhost:8080/parcels/P-20/status \
  -H 'Content-Type: application/json' -d '{"status":"DELIVERED"}'
```

(Use a fresh parcel if P-20 is already delivered.) This request will **hang noticeably**, then fail. Now read the parcel-service logs:

```bash
docker logs --tail 30 parcel-service
```

Expected: a connection failure from Spring AMQP, something like:

```text
... ERROR ... o.s.a.r.c.CachingConnectionFactory : Attempting to connect to: rabbitmq:5672
... ERROR ... com.parcelpilot.GlobalErrorHandler : Unhandled error on PATCH /parcels/P-21/status

org.springframework.amqp.AmqpConnectException: java.net.ConnectException: Connection refused
	at org.springframework.amqp.rabbit.connection...
```

The client got the step-06 generic `500` (`{"code":"INTERNAL", ...}`); the log has the real story.

### 2c. Read what actually happened

Walk through `ParcelService.changeStatus`: it saves the new status with `saveAndFlush`, then publishes, all inside one `@Transactional` method. The publish threw, so Spring **rolled back** the save. Check it:

```bash
curl -s http://localhost:8080/parcels/P-20
# still "PICKED_UP"
```

Consistent, but painful: while the broker is down, nobody can deliver parcels. And the opposite gap still exists. If the publish **succeeds** and the database commit fails a millisecond later, an event is out for a delivery that was never saved. Two systems, no shared transaction: this is the **dual-write problem** from [step 12](../12-queues/what-is-a-queue.md#the-honest-limits), now live.

Three things a production system decides *deliberately* here:

1. **Timeouts.** The request hung because the AMQP client kept trying to connect. Every network call needs a **timeout** — waiting forever turns one dead dependency into a pile of stuck request threads.
2. **What does the caller see?** Failing the whole request (what you saw) is honest but blocks parcel updates whenever the broker blinks. Buffering events in memory keeps requests fast but loses them on a crash.
3. **The grown-up fix, in one sentence:** the *transactional outbox* — write the event into the database in the **same transaction** as the status change, and let a background process publish it once the broker is back.

Restart the broker and confirm the system recovers for *new* requests:

```bash
docker start rabbitmq
```

## The eight fallacies of distributed computing

In 1994, engineers at Sun wrote down the assumptions that every newcomer to distributed systems wrongly makes. You disproved the first one yourself.

| Fallacy (the wrong assumption) | What it means for ParcelPilot |
|---|---|
| The network is reliable | You watched a publish fail with `Connection refused`. |
| Latency is zero | A hop through the broker takes real time; notifications now lag deliveries. |
| Bandwidth is infinite | Fat event payloads would be fine at 10/day and a problem at 10,000/s. |
| The network is secure | Anything on `parcelpilot-net` can talk to your broker; production needs auth (step 16 starts this). |
| Topology doesn't change | Container restarts change addresses; you survive it only because names (`rabbitmq`) resolve freshly. |
| There is one administrator | Two services, a broker, two databases — misconfigure any one and the *system* is broken. |
| Transport cost is zero | Serializing to JSON, TCP handshakes, broker persistence: none of it is free. |
| The network is homogeneous | Your JSON event must be readable by any consumer — never assume both sides run the same code. |

## The split, re-examined honestly

| The split gave you | The split costs you |
|---|---|
| notification-service can die without hurting the parcel API (exercise 1) | A new failure mode that didn't exist before: the broker itself (exercise 2) |
| Backlogs drain automatically after recovery — no lost work while the queue is up | The dual-write gap: the database save and the publish cannot share one transaction |
| Each service deploys and scales alone | Every arrow in the architecture diagram is now a network call that can hang, fail, or duplicate |
| Failures are *visible* in queues and logs | You must go looking across multiple logs to see them (step 14 fixes this) |

The monolith did not have these problems. It had *different* ones (shared deploys, shared fate, no independent scaling). Splitting is a trade, not an upgrade — see [Monoliths and microservices](../../references/architecture/monolith-and-microservices.md) for the full comparison.

## Check yourself

> [!CHECK]
> 1. notification-service is down. Why does the parcel API not notice?
>    <details><summary>Answer</summary>parcel-service only talks to RabbitMQ, never to notification-service. The events wait in the queue (the backlog) until the consumer is back.</details>
> 2. RabbitMQ is down and you deliver a parcel. What does the database say afterwards, and why?
>    <details><summary>Answer</summary>The old status. The publish throws inside the <code>@Transactional</code> <code>changeStatus</code>, so Spring rolls back the save. The request fails with a 500.</details>
> 3. Which failure did the split create that the monolith never had?
>    <details><summary>Answer</summary>The broker itself can fail, and services can be down independently of each other (partial failure). In the monolith there was no network between the parts.</details>

## Next

- [Step 14](../14-compose-and-observe/README.md) makes exactly these failures observable: one command to start everything, health checks, and logs you can read across services.
- The contract the two services rely on when the network *does* work: [service-contracts.md](service-contracts.md).
- Back to the step: [Step 13 README](README.md).
