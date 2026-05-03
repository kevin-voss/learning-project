window.SD = window.SD || {};

SD.concepts.push(
  {
    id: 'load-balancing',
    title: 'Load Balancing',
    zone: 'foundations',
    icon: 'network',
    tagline: 'Distribute traffic across multiple servers',
    overview:
      'A load balancer sits between clients and servers, distributing incoming requests across a pool of backend servers. This ensures no single server is overwhelmed, improving throughput, reducing latency, and enabling fault tolerance. Algorithms range from oblivious rotation to adaptive picks based on latency and connection counts.',
    keyConcepts: [
      { name: 'Round Robin', desc: 'Cycles through servers sequentially. Cheap and predictable but ignores hotspots.', icon: 'rotate-cw' },
      { name: 'Least Connections', desc: 'Routes to the server with fewest active connections. Fits long-lived/streaming workloads.', icon: 'git-branch' },
      { name: 'Weighted / Latency-aware', desc: 'Biases toward faster or healthier nodes using metrics or EWMA latency.', icon: 'activity' },
      { name: 'IP Hash (sticky)', desc: 'Deterministic routing for session affinity — watch rebalance issues when scaling.', icon: 'hash' },
      { name: 'Health Checks', desc: 'Passive/active probes drain bad nodes automatically; avoids black-holing users.', icon: 'heart-pulse' },
    ],
    pros: [
      'Prevents hotspots and absorbs flash traffic',
      'Enables graceful deploys behind rolling pools',
      'Horizontal scale-out without client changes',
      'Central place for TLS offload and shaping',
    ],
    cons: [
      'Poor health signals can flap traffic',
      'Sticky sessions weaken even distribution',
      'Extra hop latency if not topology-aware',
      'Operator must tune timeouts & connection limits',
    ],
    tradeoffs: [
      { left: 'Simplicity', right: 'Intelligence', pct: 35, label: 'Round robin is easy; adaptive policies need telemetry and safeguards.' },
      { left: 'Stickiness', right: 'Even spread', pct: 55, label: 'Session affinity helps legacy apps but pins load to fewer nodes.' },
      { left: 'Cost', right: 'Availability', pct: 60, label: 'Multi-AZ LB pairs cost more yet remove a whole class of outages.' },
    ],
    diagram: 'lb',
    sketches: [
      {
        id: 'roundRobin',
        title: 'Round Robin Sketch',
        caption: 'Synthetic requests rotate S1 → S2 → S3 → … Great for homogeneous work; swap to least-conns when durations differ.',
      },
    ],
  },
  {
    id: 'caching',
    title: 'Caching',
    zone: 'foundations',
    icon: 'database',
    tagline: 'Speed up reads by storing hot data closer to callers',
    overview:
      'Caches place read-mostly data in DRAM or fast SSD near the workload. Patterns (aside, read/write-through, write-behind) trade freshness vs latency. Naming keys thoughtfully and aligning TTL with business SLAs avoids thundering herds and needless invalidation churn.',
    keyConcepts: [
      { name: 'Cache-Aside', desc: 'App reads cache → on miss fills from DB then sets key. Flexible but bursts on cold keys.', icon: 'eye' },
      { name: 'Write-Through', desc: 'Writes update cache + store synchronously. Stronger freshness, slower writes.', icon: 'pen-line' },
      { name: 'Write-Back', desc: 'Ack client after cache write; persist async. Fast but needs crash safety controls.', icon: 'rewind' },
      { name: 'TTL + Jitter', desc: 'Expire with randomness to prevent synchronized stampedes.', icon: 'timer' },
      { name: 'Probabilistic Early Expire', desc: 'Refresh hot keys before hard expiry under load (Memcached style).', icon: 'shuffle' },
    ],
    pros: ['Cuts median latency and DB CPU', 'Absorbs read spikes at the edge', 'Cheaper egress when paired with CDN', 'Lets you degrade gracefully'],
    cons: ['Stale reads & invalidation complexity', 'Memory footprint and fragmentation', 'Debuggability suffers with layers', 'Hot key fan-out still possible'],
    tradeoffs: [
      { left: 'Freshness', right: 'Latency', pct: 70, label: 'Shorter TTLs are fresher but miss more often; longer TTLs stress invalidation discipline.' },
      { left: 'Memory', right: 'Hit Rate', pct: 50, label: 'Big pools cost money; lean pools need smarter eviction.' },
      { left: 'Simplicity', right: 'Consistency', pct: 40, label: 'Aside is straightforward; coordinated invalidation across regions is not.' },
    ],
    diagram: 'cache',
    sketches: [
      {
        id: 'cacheKeys',
        title: 'Key naming & namespaces',
        caption: 'Structured keys isolate tenants, entities, and versions so co-located caches do not clobber each other.',
      },
    ],
  }
);
