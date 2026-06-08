window.DS = window.DS || {};
DS.curriculum = DS.curriculum || [];

DS.curriculum.push({
  id: 'stack-heap-gc',
  category: 'Foundations',
  title: 'Stack, Heap, and Garbage Collection',
  icon: 'fa-recycle',
  number: '04',
  subtitle: 'Runtimes place function data on the stack, objects on the heap, and reclaim unused heap automatically.',
  analogy: 'Stack frames are sticky notes you discard when a task ends. Heap objects are shared whiteboards. Garbage collection is the janitor erasing whiteboards nobody references anymore.',
  realWorldExample: { title: 'Closing a tab', desc: 'When a browser tab closes, the JS engine drops references; GC eventually frees orphaned DOM-related objects.' },
  whatIsIt: 'The call stack holds activation records for functions. The heap holds long-lived objects. Garbage collection traces reachable references and frees unreachable heap memory — common in JavaScript, Java, Python, Go.',
  whyUse: 'Explains memory leaks, stack overflow in deep recursion, and why object churn affects performance.',
  conceptSections: [
    { icon: 'fa-layer-group', title: 'Stack frames', desc: 'Locals and return addresses per call.', example: 'Each recursive call adds a frame until base case.' },
    { icon: 'fa-cubes', title: 'Heap objects', desc: 'Shared, dynamic lifetime.', example: 'Arrays and objects allocated with new or literals.' },
    { icon: 'fa-recycle', title: 'GC', desc: 'Mark reachable objects; sweep the rest.', example: 'V8 generational GC for hot short-lived objects.' },
  ],
  demoType: 'stack-heap-gc',
  demoTitle: 'Stack, heap, and garbage collection',
  demoHint: 'Switch between call-stack frames, heap objects, and a GC sweep when references drop.',
  relatedIds: ['memory-model', 'compiler-runtime', 'recursion-call-stack'],
  keywords: ['stack memory', 'heap memory', 'garbage collection', 'call stack', 'stack overflow', 'memory leak', 'v8'],
  checklist: ['Contrast stack vs heap lifetimes.', 'Explain what keeps an object alive.', 'Name one symptom of a memory leak.'],
});
