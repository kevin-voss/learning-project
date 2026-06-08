window.DS = window.DS || {};
DS.curriculum = DS.curriculum || [];

DS.curriculum.push({
  id: 'heaps-priority-queues',
  category: 'Data Structures',
  title: 'Heaps and Priority Queues',
  icon: 'fa-mountain',
  number: '16',
  subtitle: 'A priority queue serves the most important item first, and a heap is a common way to build one.',
  analogy: 'A normal queue is a grocery line: first person in, first served. A priority queue is an emergency room: the most urgent patient is served first, even if they arrived later.',
  realWorldExample: {
    title: 'OS task priority',
    desc: 'An operating system may have many tasks waiting for CPU time. A priority queue can help choose the most urgent task next instead of always choosing the oldest task.',
  },
  whatIsIt: 'A priority queue stores items with priorities. Removing from it returns the highest-priority item, not necessarily the oldest item. A heap is a tree-shaped structure usually stored inside an array. In a max-heap, every parent is bigger than its children. In a min-heap, every parent is smaller than its children.',
  whyUse: 'Heaps make priority queues efficient. They are used in heap sort, schedulers, pathfinding algorithms like Dijkstra, event simulation, job queues, and "top K" problems such as finding the 10 highest scores.',
  whenToUse: [
    { icon: 'fa-hospital', title: 'Priority service', desc: 'Serve urgent items before less urgent ones.' },
    { icon: 'fa-route', title: 'Pathfinding', desc: 'Dijkstra uses a priority queue to pick the nearest unvisited node.' },
    { icon: 'fa-arrow-down-wide-short', title: 'Heap sort', desc: 'Repeatedly extract the largest item from a heap.' },
    { icon: 'fa-trophy', title: 'Top K results', desc: 'Keep only the highest-priority items without sorting everything.' },
  ],
  codeExample: `<span class="cm">// Tiny priority queue idea, simple but not optimized</span>
<span class="kw">const</span> tasks <span class="op">=</span> [];

<span class="kw">function</span> <span class="fn">enqueue</span>(task, priority) {
  tasks.<span class="fn">push</span>({ task, priority });
}

<span class="kw">function</span> <span class="fn">dequeueHighestPriority</span>() {
  tasks.<span class="fn">sort</span>((a, b) <span class="op">=></span> b.priority <span class="op">-</span> a.priority);
  <span class="kw">return</span> tasks.<span class="fn">shift</span>();
}

<span class="fn">enqueue</span>(<span class="str">'render UI'</span>, <span class="num">2</span>);
<span class="fn">enqueue</span>(<span class="str">'handle keyboard input'</span>, <span class="num">9</span>);`,
  complexity: [
    { op: 'Peek top priority', time: 'O(1)', badge: 'fast' },
    { op: 'Heap insert', time: 'O(log n)', badge: 'mid' },
    { op: 'Heap extract', time: 'O(log n)', badge: 'mid' },
    { op: 'Build heap from array', time: 'O(n)', badge: 'slow' },
  ],
  pros: [
    'Efficient way to always get the most important item',
    'Connects queues, trees, arrays, and sorting',
    'Used in real OS and graph algorithms',
  ],
  cons: [
    'Not fully sorted, only the top item is guaranteed',
    'Heap index math can feel strange at first',
    'More complex than a normal FIFO queue',
  ],
});
