window.SD = window.SD || {};

SD.concepts.push(
  {
    id: 'message-queues',
    title: 'Queues, Streaming & SLAs',
    zone: 'comms',
    icon: 'mail',
    tagline: 'Decouple producers from consumers with explicit latency budgets',
    overview:
      'Queues absorb bursts and let you scale consumers independently. SLAs come from combining producer rate, retention, consumer concurrency, poison-message handling, and observability on age-of-oldest message. Dead-letter queues isolate failure modes; idempotent consumers cope with at-least-once delivery.',
    keyConcepts: [
      { name: 'Backpressure', desc: 'Slow consumers must signal producers or shed load — unbounded buffers hide failures.', icon: 'trending-down' },
      { name: 'Partitioning', desc: 'Ordered processing only within a partition; more partitions → more parallelism.', icon: 'columns' },
      { name: 'Delivery Semantics', desc: 'At-most-once (lossy), at-least-once (retry + dedupe), exactly-once (expensive).', icon: 'check-check' },
      { name: 'DLQ + Replay', desc: 'Quarantine bad payloads; fix & replay without blocking the main topic.', icon: 'archive' },
      { name: 'SLO Math', desc: 'If p95 process time is 200ms, you need enough workers to keep queue depth flat at peak QPS.', icon: 'calculator' },
    ],
    pros: ['Smooths spikes and uncouples deploy cadence', 'Natural retry boundary', 'Great fit for workflow orchestration', 'Enables event-driven expansion'],
    cons: ['Another distributed system to operate', 'Ordering vs throughput tension', 'Poison messages can stall partitions', 'End-to-end tracing harder'],
    tradeoffs: [
      { left: 'Latency', right: 'Durability', pct: 50, label: 'fsynced brokers safe but slower; memory queues fast but volatile.' },
      { left: 'Ordering', right: 'Parallelism', pct: 65, label: 'Global order is a choke point; partition-scoped order scales.' },
      { left: 'Pull', right: 'Push', pct: 45, label: 'Pull consumers control flow; push lowers latency but needs rate limits.' },
    ],
    diagram: 'mq',
    sketches: [
      {
        id: 'queueSla',
        title: 'Depth vs consumer budget',
        caption: 'When produce > consume for too long, age grows and SLA breaks — add workers, trim work, or shed load.',
      },
    ],
  },
  {
    id: 'api-design',
    title: 'API Design',
    zone: 'comms',
    icon: 'plug',
    tagline: 'Contracts that match client capabilities and network realities',
    overview:
      'REST remains the default for broad compatibility. GraphQL reduces chatty UIs at the cost of server complexity. gRPC fits service meshes with binary efficiency. WebSockets/WebRTC cover interactive experiences. Versioning, pagination, and idempotency keys turn out to be where systems succeed or sprawl.',
    keyConcepts: [
      { name: 'REST + HATEOAS', desc: 'Resource modeling with cache-friendly verbs; hypermedia rarely used but powerful.', icon: 'globe' },
      { name: 'GraphQL', desc: 'Client-driven selection; watch N+1 resolvers and complexity attacks.', icon: 'projector' },
      { name: 'gRPC / Connect', desc: 'Strongly typed streaming RPC; great behind gateways, less in browsers.', icon: 'zap' },
      { name: 'Idempotency Keys', desc: 'Safe retries for POST / money movement — store outcomes.', icon: 'fingerprint' },
      { name: 'Pagination Cursors', desc: 'Avoid OFFSET on large tables; keyset pagination preserves perf.', icon: 'chevrons-right' },
    ],
    pros: ['REST easy to cache and debug', 'GraphQL trims chatty mobile apps', 'gRPC excels for east-west traffic', 'WebSockets for live UX'],
    cons: ['GraphQL hotspots need DataLoader discipline', 'gRPC proxies complicate ingress', 'WS scale needs sticky/state thinking', 'Overfetch still happens with lazy resolvers'],
    tradeoffs: [
      { left: 'Simplicity', right: 'Flexibility', pct: 35, label: 'REST is universal; GraphQL flexible but heavier to secure.' },
      { left: 'Binary Perf', right: 'Interop', pct: 65, label: 'Protobuf fast; JSON interoperable everywhere.' },
      { left: 'Stateful Channels', right: 'Operational Ease', pct: 40, label: 'Sockets are powerful but draining at scale.' },
    ],
    diagram: 'api',
  }
);
