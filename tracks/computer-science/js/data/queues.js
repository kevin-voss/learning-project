window.DS = window.DS || {};
DS.curriculum = DS.curriculum || [];

DS.curriculum.push(
{
    id: 'queues',
    title: 'Queues',
    icon: 'fa-people-line',
    number: '04',
    subtitle: 'First In, First Out, like a line at the store where the first person in is the first served.',
    analogy: 'Think of a line at a ticket counter. The first person to join the line is the first person to get their ticket and leave. New people join at the back, and service happens at the front. This First In, First Out (FIFO) order is the essence of a queue. Whether it\'s print jobs waiting for a printer, tasks waiting for a CPU, or messages waiting to be processed, queues ensure fairness and order.',
    realWorldExample: {
      title: 'Customer support tickets',
      desc: 'A support tool can put new tickets at the back of a queue and let agents take the oldest ticket from the front. This keeps the system fair: the customer who waited longest gets helped first.',
    },
    whatIsIt: 'A queue is a linear data structure that follows the FIFO (First In, First Out) principle. Elements are added (enqueued) at the rear/tail and removed (dequeued) from the front/head. Unlike a stack where you access the most recent item, a queue gives you the oldest item first. This models any fair waiting system: first come, first served.',
    whyUse: 'Queues are essential whenever you need to process things in the order they arrive. Operating systems use queues for task scheduling, printers use queues for print jobs, web servers use queues for incoming requests, and message systems use queues for reliable delivery. Any system that must serve requests in order needs a queue. Priority queues (a variant) let you jump the line based on urgency.',
    whenToUse: [
      { icon: 'fa-print', title: 'Task scheduling', desc: 'Print queue, CPU scheduling, background job processing.' },
      { icon: 'fa-server', title: 'Request handling', desc: 'Web servers processing requests in order they arrive.' },
      { icon: 'fa-paper-plane', title: 'Message queues', desc: 'Email delivery, chat messages, event processing systems.' },
      { icon: 'fa-route', title: 'BFS traversal', desc: 'Breadth-first search in graphs uses a queue to explore level by level.' },
    ],
    codeExample: `<span class="cm">// === Queue Implementation ===</span>

<span class="kw">class</span> <span class="cls">Queue</span> {
  <span class="fn">constructor</span>() {
    <span class="kw">this</span>.items <span class="op">=</span> [];
  }

  <span class="cm">// Add to the back: O(1) with proper impl</span>
  <span class="fn">enqueue</span>(element) {
    <span class="kw">this</span>.items.<span class="fn">push</span>(element);
  }

  <span class="cm">// Remove from the front: O(n) with array!</span>
  <span class="fn">dequeue</span>() {
    <span class="kw">if</span> (<span class="kw">this</span>.<span class="fn">isEmpty</span>()) <span class="kw">return</span> <span class="str">'Queue is empty'</span>;
    <span class="kw">return this</span>.items.<span class="fn">shift</span>(); <span class="cm">// O(n): problem!</span>
  }

  <span class="fn">front</span>() {
    <span class="kw">return this</span>.items[<span class="num">0</span>];
  }

  <span class="fn">isEmpty</span>() { <span class="kw">return this</span>.items.length <span class="op">===</span> <span class="num">0</span>; }
  <span class="fn">size</span>() { <span class="kw">return this</span>.items.length; }
}

<span class="cm">// Better: O(1) Queue using Object/Map</span>
<span class="kw">class</span> <span class="cls">FastQueue</span> {
  <span class="fn">constructor</span>() {
    <span class="kw">this</span>.items <span class="op">=</span> {};
    <span class="kw">this</span>.head <span class="op">=</span> <span class="num">0</span>;
    <span class="kw">this</span>.tail <span class="op">=</span> <span class="num">0</span>;
  }

  <span class="fn">enqueue</span>(element) {
    <span class="kw">this</span>.items[<span class="kw">this</span>.tail<span class="op">++</span>] <span class="op">=</span> element;
  }

  <span class="fn">dequeue</span>() {
    <span class="kw">if</span> (<span class="kw">this</span>.tail <span class="op">===</span> <span class="kw">this</span>.head) <span class="kw">return</span> <span class="kw">undefined</span>;
    <span class="kw">const</span> item <span class="op">=</span> <span class="kw">this</span>.items[<span class="kw">this</span>.head];
    <span class="kw">delete this</span>.items[<span class="kw">this</span>.head<span class="op">++</span>];
    <span class="kw">return</span> item;
  }

  <span class="fn">peek</span>() { <span class="kw">return this</span>.items[<span class="kw">this</span>.head]; }
  <span class="fn">isEmpty</span>() { <span class="kw">return this</span>.tail <span class="op">===</span> <span class="kw">this</span>.head; }
  <span class="fn">size</span>() { <span class="kw">return this</span>.tail <span class="op">-</span> <span class="kw">this</span>.head; }
}

<span class="cm">// Real-world: Task queue</span>
<span class="kw">const</span> tasks <span class="op">=</span> <span class="kw">new</span> <span class="cls">FastQueue</span>();
tasks.<span class="fn">enqueue</span>(<span class="str">'Send welcome email'</span>);
tasks.<span class="fn">enqueue</span>(<span class="str">'Generate report'</span>);
tasks.<span class="fn">enqueue</span>(<span class="str">'Backup database'</span>);

<span class="cm">// Process tasks in order</span>
<span class="kw">while</span> (<span class="op">!</span>tasks.<span class="fn">isEmpty</span>()) {
  console.<span class="fn">log</span>(<span class="str">\`Processing: \${tasks.<span class="fn">dequeue</span>()}\`</span>);
}
<span class="cm">// Processing: Send welcome email</span>
<span class="cm">// Processing: Generate report</span>
<span class="cm">// Processing: Backup database</span>`,
    complexity: [
      { op: 'Enqueue (add to back)', time: 'O(1)', badge: 'fast' },
      { op: 'Dequeue (remove from front)', time: 'O(1)*', badge: 'fast' },
      { op: 'Peek (view front)', time: 'O(1)', badge: 'fast' },
      { op: 'Search', time: 'O(n)', badge: 'slow' },
      { op: 'Access by position', time: 'O(n)', badge: 'slow' },
    ],
    pros: [
      'Fair ordering: first in, first out ensures no item waits forever',
      'O(1) enqueue and dequeue with proper implementation',
      'Natural model for real-world waiting systems',
      'Simple to implement and understand',
      'Essential for BFS and many graph algorithms',
    ],
    cons: [
      'Array-based dequeue is O(n) due to shift: need custom implementation for O(1)',
      'No random access: can only interact with front and back',
      'No priority: all items treated equally (unless using priority queue)',
      'Searching requires dequeuing and re-enqueuing everything',
    ],
    demoType: 'queue',
    keywords: ['queue', 'fifo', 'enqueue', 'dequeue', 'breadth-first search'],
  },
);
