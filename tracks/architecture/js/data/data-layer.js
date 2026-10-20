window.SD = window.SD || {};

SD.concepts.push(
  {
    id: 'databases',
    title: 'PostgreSQL, DynamoDB & Friends',
    zone: 'data',
    icon: 'table-2',
    tagline: 'Match the storage model to access paths and consistency needs',
    overview:
      'Relational engines (PostgreSQL) shine at ad-hoc queries, constraints, and multi-row transactions. Dynamo-style wide-column stores optimize predictable key access at huge scale with bounded operations. The hard part is not picking a logo — it is enumerating read/write paths, isolation needs, and failure modes before you paint yourself into a corner.',
    keyConcepts: [
      { name: 'PostgreSQL', desc: 'MVCC row storage, rich SQL, secondary indexes, foreign keys, extensions (Citus, Timescale).', icon: 'grid-3x3' },
      { name: 'DynamoDB', desc: 'Partition key + optional sort key; GSIs for alternate access; on-demand vs provisioned capacity.', icon: 'key' },
      { name: 'Hot Partitions', desc: 'Skewed keys throttle throughput; solve with sharding, writes spreading, or caching.', icon: 'flame' },
      { name: 'Change Data Capture', desc: 'Stream WAL/transaction logs to search, cache, or analytics without dual writes.', icon: 'radio' },
      { name: 'Multi-region', desc: 'Active-active needs conflict strategy; primary/DR trades simplicity for RPO/RTO.', icon: 'globe' },
    ],
    pros: [
      'Postgres: expressive queries and constraints',
      'Dynamo: predictable single-digit ms reads at scale',
      'Both have managed offerings with backups & PITR',
      'Mature ecosystems for observability',
    ],
    cons: [
      'Postgres vertical limits + complex HA story',
      'Dynamo requires access-pattern-first modeling',
      'Cross-store joins need application logic',
      'License/egress costs surprise teams',
    ],
    tradeoffs: [
      { left: 'Flexibility', right: 'Scale Path', pct: 45, label: 'SQL flexible day one; key-value forces upfront schema discipline for scale.' },
      { left: 'Latency', right: 'Consistency', pct: 55, label: 'Strong local transactions cost coordination; global strong is expensive.' },
      { left: 'Ops Simplicity', right: 'Knobs', pct: 50, label: 'Managed services simplify ops but reduce low-level tuning.' },
    ],
    diagram: 'db',
    sketches: [
      {
        id: 'pgVsDynamo',
        title: 'Query shape vs item access',
        caption: 'If every screen maps to primary-key patterns, Dynamo fits. If you need exploratory SQL, Postgres wins.',
      },
    ],
  },
  {
    id: 'sql-concurrency',
    title: 'SQL Locks, Updates & Transactions',
    zone: 'data',
    icon: 'lock',
    tagline: 'Understand contention when millions of requests hit the same rows',
    overview:
      'Relational databases use locks and MVCC snapshots to isolate transactions. High update rates on narrow key ranges serialize, creating queueing in the database. Long transactions amplify blocking; application retries and deadlock detection become part of your latency budget. Designing idempotent writes and shortening critical sections keeps tail latencies sane.',
    keyConcepts: [
      { name: 'Row-level Locks', desc: 'UPDATE/DELETE take exclusive locks; readers may use snapshots depending on isolation.', icon: 'shield' },
      { name: 'Isolation Levels', desc: 'Read committed vs repeatable read vs serializable — each trades anomalies for throughput.', icon: 'layers' },
      { name: 'Deadlocks', desc: 'Cycles of lock waits; DB picks a victim — your app must retry idempotently.', icon: 'alert-octagon' },
      { name: 'Optimistic Concurrency', desc: 'Version column or compare-and-swap avoids long locks when conflicts are rare.', icon: 'git-compare' },
      { name: 'Backpressure', desc: 'Queue writes or shard hot accounts instead of hammering one leader.', icon: 'gauge' },
    ],
    pros: ['ACID gives a clear contract for money-like operations', 'Indexes + constraints catch bugs early', 'Mature tooling for explain plans & locks'],
    cons: ['High write fan-in on one row is a brick wall', 'Retry storms after deadlocks', 'Long ORMs transactions hide latency', 'Observability needs lock wait metrics'],
    tradeoffs: [
      { left: 'Pessimistic Locks', right: 'Optimistic MVCC', pct: 52, label: 'Locks simplify reasoning but stall competitors; OCC wins when collisions rare.' },
      { left: 'Strong Isolation', right: 'Throughput', pct: 65, label: 'Serializable safety costs latency; weaker levels need app-side checks.' },
      { left: 'Batching Writes', right: 'Realtime UX', pct: 45, label: 'Grouping updates improves efficiency but delays visibility.' },
    ],
    diagram: 'sqlcon',
    sketches: [
      {
        id: 'sqlLocks',
        title: 'Row lock contention',
        caption: 'Two transactions mutate the same hot row — one proceeds, one waits. Deadlocks arise when ordering differs.',
      },
      {
        id: 'txnTimeline',
        title: 'Transaction phases',
        caption: 'BEGIN → READ → WRITE → COMMIT (or ROLLBACK). Keep this window tiny under load.',
      },
    ],
  },
  {
    id: 'indexing',
    title: 'Indexing Deep Dive',
    zone: 'data',
    icon: 'list-ordered',
    tagline: 'Shrink read paths — pay on writes',
    overview:
      'Indexes are alternate sorted structures pointing to rows. B-Trees dominate OLTP workloads for range scans; hashing serves point lookups; covering indexes skip table fetches altogether. DynamoDB GSIs replicate projected attributes asynchronously — eventual — so index selection affects cost and staleness.',
    keyConcepts: [
      { name: 'B-Tree / B+Tree', desc: 'Logarithmic depth; leaf pages sequential for range scans (Postgres clustered vs heap).', icon: 'git-branch' },
      { name: 'Selectivity', desc: 'Low-cardinality indexes help less; composites should match predicate order.', icon: 'filter' },
      { name: 'Covering Index', desc: 'INCLUDE columns let index-only scans avoid heap hits.', icon: 'package' },
      { name: 'Write Amplification', desc: 'Every index on a table lengthens INSERT/UPDATE paths.', icon: 'repeat' },
      { name: 'GSI Patterns (Dynamo)', desc: 'Model alternate keys consciously; beware hot partitions on poorly chosen PKs.', icon: 'network' },
    ],
    pros: ['Massively cheaper than full scans for selective queries', 'Enforces uniqueness cheaply', 'Great for pagination with seek methods'],
    cons: ['Each index slows writes slightly', 'Bad indexes confuse optimizers', 'Disk bloat during churn', 'Reindex/maintenance windows'],
    tradeoffs: [
      { left: 'Read Perf', right: 'Write Perf', pct: 75, label: 'More indexes → faster SELECT, slower INSERT/UPDATE.' },
      { left: 'Coverage', right: 'Size', pct: 58, label: 'Wide covering indexes accelerate reads but cost space & write amp.' },
      { left: 'Optimizer Hints', right: 'Portability', pct: 42, label: 'Forcing plans helps emergencies but binds you to quirks.' },
    ],
    diagram: 'index',
    sketches: [
      {
        id: 'btreeLookup',
        title: 'B-Tree descent',
        caption: 'Each hop trims the search space. Height stays low when pages fill — far fewer touches than sequential scan.',
      },
    ],
  },
  {
    id: 'replication-sharding',
    title: 'Replication & Sharding',
    zone: 'data',
    icon: 'copy',
    tagline: 'Durability plus horizontal scale paths',
    overview:
      'Replication copies commits to followers for failover and read scaling. Sharding splits key ranges/partitions onto different nodes — necessary when single-node write ceilings block you. Combining both introduces lag visibility, failover promotion, and cross-shard queries that are painfully expensive.',
    keyConcepts: [
      { name: 'Async Replication', desc: 'Fast commits; replicas lag — reads may be stale.', icon: 'refresh-cw' },
      { name: 'Quorum / Raft', desc: 'Leader elections with replicated log for HA without shared disk.', icon: 'users' },
      { name: 'Hash vs Range Shards', desc: 'Hash avoids hotspots from sequential keys; range helps proximity queries.', icon: 'bar-chart-2' },
      { name: 'Rebalancing', desc: 'Moving shards without downtime needs double writes or proxy layers.', icon: 'arrow-right-left' },
      { name: 'Read Replica Fan-out', desc: 'Scale reads until replication lag violates SLAs.', icon: 'share-2' },
    ],
    pros: ['HA + read scaling baseline', 'Geographic replicas cut latency', 'Shards unlock write throughput ceilings'],
    cons: ['Split-brain if automation wrong', 'Hot shards negate hash benefits', 'Joins across shards need app coordination', 'Ops complexity jumps quickly'],
    tradeoffs: [
      { left: 'Consistency', right: 'Availability', pct: 55, label: 'Sync quorum durable but slower; async survives partitions with staleness.' },
      { left: 'Simple Topology', right: 'Elastic Scale', pct: 70, label: 'Single primary easy; many shards agile but operationally heavy.' },
      { left: 'Even Keys', right: 'Domain Fit', pct: 40, label: 'Pure hash evens load but breaks range queries — pick deliberately.' },
    ],
    diagram: 'shard',
  }
);
