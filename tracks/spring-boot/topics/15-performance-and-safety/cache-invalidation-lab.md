# Cache invalidation lab: the parcel that wouldn't update

Hands-on companion to [Step 15](README.md). Do it right after adding `@Cacheable` to the read path (Build item 1) and **before** adding `@CacheEvict` — this lab makes you feel the bug the evict exists to fix.

## The problem

You cached `GET /parcels/{id}` in Redis and reads got fast. Then an operator marks P-1 as `PICKED_UP` — the database is updated, the response says so — and the customer refreshes their tracking page… which still says `CREATED`. The write went to the **database**; the read is served from the **cache**, which nobody told about the change. The data isn't wrong anywhere — it's **stale** in one place, which for the customer is the same thing.

## Key words

| Word | Beginner meaning |
|---|---|
| **Stale data** | A cached copy that no longer matches the source of truth. |
| **TTL** | Time To Live — how long a cache entry survives before expiring on its own. |
| **Invalidation** | Deliberately removing/updating a cache entry because the data changed. |
| **Eviction** | Removing an entry from the cache (by invalidation, TTL, or memory pressure). |
| **Write-through** | Writing to the cache and the database together on every write. |

## Reproduce the staleness

With `@Cacheable` on the read and a TTL of a few minutes (and **no** `@CacheEvict` yet):

```bash
# 1. create a parcel and read it once — this read FILLS the cache
curl -s -X POST http://localhost:8080/parcels \
  -H 'Content-Type: application/json' -d '{"id":"P-1","recipient":"Ava"}' > /dev/null
curl -s http://localhost:8080/parcels/P-1 | jq .status
# "CREATED"

# 2. update the status — the DATABASE now says PICKED_UP
curl -s -X PATCH http://localhost:8080/parcels/P-1/status \
  -H 'Content-Type: application/json' -d '{"status":"PICKED_UP"}' | jq .status
# "PICKED_UP"     <- the write path answers from the DB: correct

# 3. read again — served from the cache
curl -s http://localhost:8080/parcels/P-1 | jq .status
# "CREATED"       <- STALE. The cache never heard about the update.
```

Step 2 and step 3 disagree, seconds apart, on the same API. That's the bug. It will "fix itself" when the TTL expires — which is exactly why cache bugs are so maddening: they disappear while you're investigating.

## The three respectable strategies

### 1. TTL-only: accept bounded staleness

Do nothing on writes; let every entry die of old age. With a 60-second TTL, a status update is invisible for **at most** 60 seconds.

| Pros | Cons |
|---|---|
| Dead simple — no write-path code, nothing to forget | Guaranteed staleness window, on every write |
| Staleness is *bounded* and known | Tuning is a dilemma: short TTL ≈ no cache benefit, long TTL ≈ long lies |

Right for data where "a minute old" is fine: a dashboard counting delivered parcels, a public stats page. Wrong for the status a customer is actively watching.

### 2. Explicit invalidation on write (what ParcelPilot does)

Whoever changes the data kicks the entry out of the cache. The next read misses, goes to the database, and re-fills the cache with fresh data. In Spring it's one annotation on the update path — the value and key **must match the `@Cacheable` side exactly**:

```java
@Cacheable(value = "parcels", key = "#id")     // read: check cache first
public ParcelResponse getParcel(String id) { ... }

@CacheEvict(value = "parcels", key = "#id")    // write: kick the stale entry out
public void updateStatus(String id, Status newStatus) { ... }
```

| Pros | Cons |
|---|---|
| Reads are fresh immediately after a write | Every write path must remember to evict — miss one and staleness returns |
| Keep a long TTL for read speed; the TTL becomes just a safety net | The evict and the DB write are two actions (a small dual-write, again) |

### 3. Write-through, in one paragraph

Instead of evicting, the write path **updates** the cache with the new value at the same time as the database (Spring: `@CachePut`). The next read hits a warm, fresh cache — no miss penalty. The cost: the write path now constructs exactly what readers expect (duplicated mapping logic), and if the two writes race with other traffic you can cache a value that's already outdated. Nice for read-heavy hot keys; overkill for ParcelPilot.

## Exercise: fix it and prove it

Add `@CacheEvict(value = "parcels", key = "#id")` to the update method (the README's Build item 1 shows the full code), rebuild, restart, and re-run the whole sequence:

```bash
curl -s -X POST http://localhost:8080/parcels \
  -H 'Content-Type: application/json' -d '{"id":"P-2","recipient":"Ben"}' > /dev/null
curl -s http://localhost:8080/parcels/P-2 | jq .status     # "CREATED"  (fills cache)
curl -s -X PATCH http://localhost:8080/parcels/P-2/status \
  -H 'Content-Type: application/json' -d '{"status":"PICKED_UP"}' > /dev/null
curl -s http://localhost:8080/parcels/P-2 | jq .status     # "PICKED_UP" <- FRESH
```

The last read shows the **new** status: the PATCH evicted the entry, so the read missed the cache, hit the database, and re-cached the truth. If you log cache misses (or watch Redis with `docker compose exec redis redis-cli MONITOR`), you'll see exactly that: `GET` … `DEL` … `GET` (miss) … `SET`.

## Why this is one of the "two hard things"

> "There are only two hard things in computer science: cache invalidation and naming things." — Phil Karlton

It sounds like a joke; it's a warning. The eviction you just wrote is trivial — **one** cache, **one** write path. The hard part is that invalidation couples *every* write path to *every* cache of that data, forever. Add a bulk-import endpoint next year and forget the evict: stale bug. Add a second cache (an HTTP cache, a second service caching parcel lookups): now the PATCH must invalidate places it doesn't even know exist. Correctness of reads now depends on the discipline of writes, and nothing — no compiler, no test you didn't think to write — enforces it. That's why the strategy choice above matters more than the code.

## When not to cache at all

- **Low traffic.** Twelve reads a minute don't need Redis; the database laughs at that load. A cache would add a dependency and a bug class for nothing.
- **Correctness-critical reads.** If acting on a stale value causes real harm (account balances, inventory before a sale, anything legal), don't cache it — or cache it with the shortest TTL that still helps and explicit invalidation on top.
- **Data that changes as often as it's read.** Every write evicts, so every read misses: all of the machinery, none of the benefit.

## Next

- The second safety tool of this step: [optimistic-locking-lab.md](optimistic-locking-lab.md)
- Deep dive: [Databases, caching, and locking](../../references/databases-caching-and-locking.md)
- Back to the step: [Step 15 README](README.md)
