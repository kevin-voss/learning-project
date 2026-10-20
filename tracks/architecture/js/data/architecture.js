window.SD = window.SD || {};

SD.concepts.push(
  {
    id: 'processing-tiers',
    title: 'Real-time, Near-time & Batch',
    zone: 'arch',
    icon: 'clock-4',
    tagline: 'Segment work by freshness — not everything is synchronous',
    overview:
      'Real-time paths answer users within milliseconds — keep them lean and heavily cached. Near-time jobs run seconds to minutes behind using queues and stream processors. Batch analytics tolerates hour-level delays but demands cost-efficient storage and idempotent reruns. Mixing tiers without guardrails creates priority inversion and silent SLA slips.',
    keyConcepts: [
      { name: 'Real-time / Sync', desc: 'User-facing APIs, websockets, low-latency reads with tight autoscaling.', icon: 'zap' },
      { name: 'Near-time / Async', desc: 'Kafka/SQS workers, debounced notifications, incremental search indexes.', icon: 'timer' },
      { name: 'Batch / OLAP', desc: 'Hourly ETL, training sets, finance close — optimize for throughput not p99.', icon: 'calendar-clock' },
      { name: 'SLO per Tier', desc: 'Publish expectations: p95 web 120ms, search index lag <30s, reports T+1.', icon: 'target' },
      { name: 'Workflow Engines', desc: 'Temporal / step functions orchestrate retries & human tasks across tiers.', icon: 'list-tree' },
    ],
    pros: ['Right tool per budget', 'Protects OLTP from analytics load', 'Clear on-call paging per SLA', 'Cost control via spot batch'],
    cons: ['Cross-tier consistency storytelling is hard', 'Dual pipelines duplicate logic', 'Backfills can overwhelm near-time', 'Requires product buy-in on delays'],
    tradeoffs: [
      { left: 'Freshness', right: 'Cost', pct: 68, label: 'Streaming everything is pricey; batch is pennies per GB.' },
      { left: 'Complexity', right: 'Velocity', pct: 55, label: 'More tiers → more DAGs; fewer tiers → contention.' },
      { left: 'Interactive UX', right: 'Correctness Windows', pct: 48, label: 'Show stale UI with timestamps vs blocking on perfect data.' },
    ],
    diagram: 'tiers',
    sketches: [
      {
        id: 'processingTiers',
        title: 'Workload bands',
        caption: 'Animate thinking: tighten the real-time slice, push everything else to async or scheduled compute.',
      },
    ],
  },
  {
    id: 'microservices',
    title: 'Microservices',
    zone: 'arch',
    icon: 'boxes',
    tagline: 'Independence through boundaries — with distributed systems tax',
    overview:
      'Services split domains so teams ship independently. Success needs clear data ownership, synthetic monitoring, tracing, feature flags, and contract tests. Without those, you rebuild a distributed monolith with extra latency.',
    keyConcepts: [
      { name: 'Bounded Context', desc: 'Align service cuts to domain language — not org chart politics alone.', icon: 'pie-chart' },
      { name: 'Service Mesh / mTLS', desc: 'Uniform retries, timeouts, observability east-west.', icon: 'shield' },
      { name: 'Saga / Outbox', desc: 'Coordinate multi-service writes via events or compensations.', icon: 'git-merge' },
      { name: 'API Gateway', desc: 'Authn/z, routing, edge rate limits, request shaping.', icon: 'door-open' },
      { name: 'Contract Tests', desc: 'Consumer-driven contracts stop silent breakage across deploys.', icon: 'file-check' },
    ],
    pros: ['Deploy + scale slices independently', 'Polyglot where justified', 'Blast radius containment', 'Parallel team throughput'],
    cons: ['Latency tax on deep call graphs', 'Distributed debugging', 'Duplicated infra per service', 'Version skew between callers'],
    tradeoffs: [
      { left: 'Granularity', right: 'Operability', pct: 65, label: 'Too many nano-services explode operational load.' },
      { left: 'Shared DB', right: 'Autonomy', pct: 70, label: 'Shared schema couples releases; DB-per-service frees teams.' },
      { left: 'Sync RPC', right: 'Eventing', pct: 45, label: 'RPC simpler mentally; events better for fan-out & audit.' },
    ],
    diagram: 'micro',
  },
  {
    id: 'resilience-patterns',
    title: 'Resilience Patterns',
    zone: 'arch',
    icon: 'life-buoy',
    tagline: 'Failures are guaranteed — manage them deliberately',
    overview:
      'Resilience combines timeouts, retries with jitter, bulkheads to isolate pools, circuit breakers to fail fast, rate limiting to protect downstreams, and defensive caching with coalescing to absorb thundering herds. None of these replace capacity planning — they buy time while humans respond.',
    keyConcepts: [
      { name: 'Circuit Breaker', desc: 'Trip after error budget exhausted; half-open probes to heal.', icon: 'unlink' },
      { name: 'Timeouts + Budgets', desc: 'Hard caps per hop prevent thread pile-ups.', icon: 'alarm-clock' },
      { name: 'Retry / Jitter', desc: 'Exponential backoff with decorrelation avoids retry storms.', icon: 'refresh-ccw' },
      { name: 'Bulkhead', desc: 'Separate pools so one dependency cannot starve the whole service.', icon: 'layout-grid' },
      { name: 'Request Coalescing', desc: 'Single-flight dedupes identical in-flight queries to the origin.', icon: 'group' },
    ],
    pros: ['Tail latency improves under stress', 'Protects shared dependencies', 'Buys graceful degradation', 'Pairs well with autoscaling signals'],
    cons: ['Mis-tuned breakers flap', 'Retries amplify incidents if not idempotent', 'Complex call graphs hard to reason about', 'Needs great metrics to tune'],
    tradeoffs: [
      { left: 'Fail Fast', right: 'Best Effort', pct: 52, label: 'Open circuits drop traffic; soft failures serve stale data.' },
      { left: 'Aggressive Cache', right: 'Freshness', pct: 60, label: 'Coalescing helps flash events but extends staleness window.' },
      { left: 'Client Complexity', right: 'Server Safety', pct: 45, label: 'Smart clients reduce load; dumb servers need stricter limits.' },
    ],
    diagram: 'resilience',
    sketches: [
      {
        id: 'coalescing',
        title: 'Request coalescing',
        caption: 'Many identical cache misses collapse into one origin fetch — classic thundering herd mitigation.',
      },
    ],
  },
  {
    id: 'cdn-edge',
    title: 'CDN & Edge',
    zone: 'arch',
    icon: 'globe',
    tagline: 'Move bits closer to eyeballs',
    overview:
      'CDNs cache static assets and now dynamic fragments at PoPs worldwide. Cache keys, stale-while-revalidate, and origin shields control hit ratio. Edge compute personalizes without round-tripping home region — but debuggability and consistency get harder.',
    keyConcepts: [
      { name: 'Edge Cache Keys', desc: 'Vary by language, auth segment, or device class carefully.', icon: 'key' },
      { name: 'SWR / Stale-if-error', desc: 'Serve slightly old content while revalidating or when origin sick.', icon: 'shield-check' },
      { name: 'Origin Shield', desc: 'Secondary cache layer reduces stampedes on cold keys.', icon: 'layers' },
      { name: 'Signed URLs', desc: 'Time-limited access for large media without baking secrets into clients.', icon: 'link' },
      { name: 'Edge Functions', desc: 'Auth at edge, A/B, lightweight transforms — still respect data residency.', icon: 'cpu' },
    ],
    pros: ['Cuts RTT dramatically', 'DDoS absorption', 'Offloads TLS and compression', 'Global presence without full multi-home app'],
    cons: ['Invalidation still two hard problems', 'Cookie/Vary misconfig leaks data', 'Edge debug logs fragmented', 'Cost at scale'],
    tradeoffs: [
      { left: 'Freshness', right: 'Hit Ratio', pct: 60, label: 'Long TTLs improve efficiency but risk stale UX.' },
      { left: 'Dynamic at Edge', right: 'Complexity', pct: 45, label: 'Personalized HTML at edge is powerful but hard to test.' },
      { left: 'Cost', right: 'Reach', pct: 50, label: 'More PoPs = better perf, higher bill.' },
    ],
    diagram: 'cdn',
  }
);
