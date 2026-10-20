window.DS = window.DS || {};
DS.curriculum = DS.curriculum || [];

DS.curriculum.push({
  id: 'concurrency-async',
  category: 'Computer Internals',
  title: 'Concurrency, Threads, and Async',
  icon: 'fa-bolt',
  number: '20',
  subtitle: 'Multiple tasks in flight: threads, processes, and async I/O.',
  analogy: 'A barista starts multiple drinks (async) while ovens run in parallel (threads). The cashier still serves one customer line at a time on that register (single-threaded JS).',
  realWorldExample: { title: 'fetch in the browser', desc: 'JavaScript continues UI work while waiting for network: callback/promise resumes later on the event loop.' },
  whatIsIt: 'Processes are isolated. Threads share memory within a process. JavaScript uses an event loop with async callbacks instead of shared-memory threads in typical browser code. Race conditions happen when two writers lack coordination.',
  whyUse: 'Explains non-blocking I/O, UI responsiveness, and why locks exist in multi-threaded languages.',
  demoType: 'concurrency-async',
  relatedIds: ['os-kernel-queues', 'message-queues'],
  keywords: ['thread', 'async', 'event loop', 'concurrency'],
  checklist: ['Contrast process and thread.', 'Explain why await does not block the whole browser.', 'Name one race condition scenario.'],
});
