# Reading logs across services

Hands-on companion to [Step 14](README.md). Requires the Compose setup running (`docker compose up --build` in `applications/parcelpilot-services`).

## The problem

A tester reports: "I marked parcel P-7 delivered, and the notification never arrived." In the monolith, one terminal held the whole story. Now the story is split across at least three places — parcel-service (did it publish?), RabbitMQ (did the message arrive and leave?), and notification-service (did it consume? did it crash?). The failure is *somewhere* in that chain, and your job is to find out where. The tool for that job is `docker compose logs`.

## Key words

| Word | Beginner meaning |
|---|---|
| **Interleaved logs** | Lines from several services mixed together in time order. |
| **Log prefix** | The service name Compose puts in front of every line, so you know who said what. |
| **Tailing (`-f`)** | Following a log live as new lines appear. |
| **Grep** | Filtering text for lines that match a pattern. |

## The tools

All commands run in `applications/parcelpilot-services`:

```bash
docker compose logs                        # everything, all services, since start
docker compose logs -f                     # everything, live (Ctrl+C to stop)
docker compose logs -f parcel-service      # one service, live
docker compose logs --tail 20 notification-service   # just the last 20 lines
docker compose logs --since 5m             # only the last 5 minutes
docker compose logs -t parcel-service      # add Docker's own timestamps per line
```

Compose prefixes every line with the service name and colors each service differently — that prefix is what makes multi-service logs readable at all. `--tail` and `--since` matter more than they look: after an hour of running, "everything since start" is thousands of lines, and the failure you care about happened 40 seconds ago.

## A worked trace: follow one parcel across two services

Start a live view of *everything* in one terminal:

```bash
docker compose logs -f parcel-service notification-service
```

In a second terminal, create a parcel and deliver it:

```bash
curl -s -X POST http://localhost:8080/parcels \
  -H 'Content-Type: application/json' -d '{"id":"P-7","recipient":"Ava"}'
curl -s -X PATCH http://localhost:8080/parcels/P-7/status \
  -H 'Content-Type: application/json' -d '{"status":"PICKED_UP"}' > /dev/null
curl -s -X PATCH http://localhost:8080/parcels/P-7/status \
  -H 'Content-Type: application/json' -d '{"status":"DELIVERED"}' > /dev/null
```

The first terminal shows something like this (details depend on your step-07 log lines):

```text
parcel-service        | 18:40:11.204  INFO com.parcelpilot.parcel.ParcelController : Created parcel P-7 for recipient Ava
parcel-service        | 18:40:12.913  INFO com.parcelpilot.parcel.ParcelController : Parcel P-7 status changed to PICKED_UP
parcel-service        | 18:40:14.101  INFO com.parcelpilot.parcel.ParcelController : Parcel P-7 status changed to DELIVERED
parcel-service        | 18:40:14.118  INFO com.parcelpilot.parcel.ParcelEventPublisher : Published ParcelDelivered for P-7 (eventId e-42)
notification-service  | 18:40:14.196  INFO com.parcelpilot.notification.DeliveredEventConsumer : Received ParcelDelivered for P-7 (eventId e-42)
notification-service  | 18:40:14.201  INFO com.parcelpilot.notification.DeliveredEventConsumer : notification sent for P-7
```

How to read it:

- **The left column tells you which service is talking.** The story hops from `parcel-service` to `notification-service` at the moment the event crosses the broker.
- **Timestamps show the async gap.** ~80 ms between "Published" and "Received" here; if notification-service were down, the first four lines would look identical and the last two would simply be missing. That absence *is* the diagnosis: the message is parked in the queue.
- **The eventId appearing on both sides** is your proof that this consumption belongs to this publish.

## Grep: from 500 lines to the 6 that matter

Live tailing is for watching. Debugging yesterday's problem means **searching**. The parcel ID is your search key:

```bash
docker compose logs | grep P-7
```

Expected: exactly the story above — every line from either service that mentions `P-7`, nothing else. This works for one reason only: in [step 07](../07-logging-and-observability-basics/README.md) you learned to write **parameterized, consistent log messages** that always include the parcel ID (`log.info("Created parcel {} ...", id)`). If one service logged "parcel P-7" and another logged "the parcel with identifier: 7 (type P)", no grep would find both. Boring, consistent log lines are a debugging feature.

## The pain point this doesn't solve

Grep by parcel ID works — until it doesn't. Two problems:

1. **Not every line mentions a parcel.** The step-06 catch-all logs "Unhandled error on PATCH /parcels/P-7/status" (good, greppable), but many failure lines — connection errors, consumer crashes mid-deserialization — carry no parcel ID at all. You end up matching on **timestamps**: "the error at 18:40:14... is that *my* 18:40:14 request?"
2. **Concurrency breaks it.** Ten deliveries per second means ten interleaved stories; the parcel ID separates them *only* in lines that include it.

What you want is one ID, generated per request, that rides along **through the event into the consumer**, stamped on every line both services write for that request. That's a correlation ID — the next lab: [correlation-ids.md](correlation-ids.md).

## Centralized log stacks, in one paragraph

In production, nobody greps container logs on one machine — logs from every service ship to a central searchable store: the ELK stack (Elasticsearch + Logstash + Kibana) or Grafana Loki are the common names. Same idea as `docker compose logs | grep`, but indexed, retained, and queryable across hundreds of hosts, with dashboards and alerts. For two services on your laptop it would be pure overhead — but everything you practiced here (stdout logging, consistent messages, IDs to search by) is exactly what makes those stacks useful later.

## Next

- Give one request a single identity across both services: [correlation-ids.md](correlation-ids.md)
- Count things instead of reading stories: [metrics-intro.md](metrics-intro.md)
- Back to the step: [Step 14 README](README.md)
