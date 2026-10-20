window.SD = window.SD || {};

SD.concepts.push({
  id: 'cap-theorem',
  title: 'CAP Theorem',
  zone: 'theory',
  icon: 'triangle',
  tagline: 'Pick how you behave during a partition',
  overview:
    'CAP clarifies that when the network splits, you cannot be both fully available to every request and linearizable without compromise. Real systems blend AP with tunable consistency (quorum reads), or CP with operational sacrifice. PACELC extends the tradeoff to normal (non-partitioned) operation: latency vs consistency.',
  keyConcepts: [
    { name: 'Linearizable (C)', desc: 'Every operation appears instantaneous — expensive across regions.', icon: 'check-circle' },
    { name: 'High Availability (A)', desc: 'Every live node answers without total system refusal — may be stale.', icon: 'clock' },
    { name: 'Partition Tolerance (P)', desc: 'Progress even when messages drop — required in WAN systems.', icon: 'unlink' },
    { name: 'PACELC', desc: 'Else latency vs consistency during healthy periods.', icon: 'scale' },
    { name: 'Real-world nuance', desc: 'SLAs, monotonic reads, and sticky sessions add dimensions beyond the triangle.', icon: 'star' },
  ],
  pros: ['Useful interview & design lens', 'Explains DB marketing honestly', 'Guides multi-region strategy'],
  cons: ['Oversimplified to "pick two"', 'Ignores latency spectrum', 'Teams argue definitions endlessly'],
  tradeoffs: [
    { left: 'Strong Consistency', right: 'Global Latency', pct: 62, label: 'Coordination round trips add ms–hundreds of ms.' },
    { left: 'Availability', right: 'Stale Reads', pct: 55, label: 'AP systems answer with last known state.' },
    { left: 'Operator Control', right: 'Dev Ergonomics', pct: 48, label: 'Tunable consistency knobs confuse app authors if undocumented.' },
  ],
  diagram: 'cap',
});
