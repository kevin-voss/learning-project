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
  conceptSections: [
    {
      icon: 'fa-table-cells',
      title: 'Array indexing',
      desc: 'For a 1-based heap array: parent of i is floor(i/2), left child is 2i, and right child is 2i+1.',
      example: 'Index 3 has parent at 1 and children at 6 and 7.',
    },
    {
      icon: 'fa-arrow-down',
      title: 'Min-heap vs max-heap',
      desc: 'Min-heap: smallest at root (good for "next smallest"). Max-heap: largest at root (good for "next largest").',
      example: 'Dijkstra often uses a min-heap keyed by distance.',
    },
    {
      icon: 'fa-arrows-up-down',
      title: 'Bubble up / bubble down',
      desc: 'Insert appends at end then bubbles up. Extract swaps root with last item, removes last, then bubbles down.',
      example: 'Both restore the heap property in O(log n) time.',
    },
    {
      icon: 'fa-sort',
      title: 'Heap sort',
      desc: 'Build a heap, repeatedly extract the extremum to sort in O(n log n) time in-place.',
      example: 'Not stable, but useful when memory is tight.',
    },
  ],
  whenToUse: [
    { icon: 'fa-hospital', title: 'Priority service', desc: 'Serve urgent items before less urgent ones.' },
    { icon: 'fa-route', title: 'Pathfinding', desc: 'Dijkstra uses a priority queue to pick the nearest unvisited node.' },
    { icon: 'fa-arrow-down-wide-short', title: 'Heap sort', desc: 'Repeatedly extract the largest item from a heap.' },
    { icon: 'fa-trophy', title: 'Top K results', desc: 'Keep only the highest-priority items without sorting everything.' },
  ],
  demoType: 'heaps-priority-queues',
  demoTitle: 'Min-heap visualizer',
  demoHint: 'Insert and extract-min to see bubble up and bubble down restore the heap property.',
  relatedIds: ['queues', 'trees', 'sorting-algorithms', 'graph-algorithms'],
  keywords: ['heap', 'priority queue', 'bubble up', 'bubble down', 'heap sort', 'min-heap', 'max-heap', 'heap property'],
  codeExample: `<span class="cm">// Min-heap in array (index 0 unused for simpler parent math)</span>
<span class="kw">const</span> heap <span class="op">=</span> [<span class="kw">null</span>, <span class="num">10</span>, <span class="num">15</span>, <span class="num">20</span>, <span class="num">25</span>];

<span class="kw">function</span> <span class="fn">parent</span>(i) { <span class="kw">return</span> Math.<span class="fn">floor</span>(i <span class="op">/</span> <span class="num">2</span>); }
<span class="kw">function</span> <span class="fn">left</span>(i) { <span class="kw">return</span> i <span class="op">*</span> <span class="num">2</span>; }

<span class="kw">function</span> <span class="fn">bubbleUp</span>(i) {
  <span class="kw">while</span> (i <span class="op">></span> <span class="num">1</span> <span class="op">&amp;&amp;</span> heap[<span class="fn">parent</span>(i)] <span class="op">></span> heap[i]) {
    [heap[<span class="fn">parent</span>(i)], heap[i]] <span class="op">=</span> [heap[i], heap[<span class="fn">parent</span>(i)]];
    i <span class="op">=</span> <span class="fn">parent</span>(i);
  }
}

<span class="kw">function</span> <span class="fn">insert</span>(value) {
  heap.<span class="fn">push</span>(value);
  <span class="fn">bubbleUp</span>(heap.length <span class="op">-</span> <span class="num">1</span>);
}`,
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
  checklist: [
    'Explain how a heap is stored in an array.',
    'Describe bubble up on insert and bubble down on extract.',
    'Contrast min-heap and max-heap.',
    'Name one real use: scheduler, Dijkstra, or top-K.',
  ],
});
