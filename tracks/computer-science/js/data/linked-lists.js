window.DS = window.DS || {};
DS.curriculum = DS.curriculum || [];

DS.curriculum.push(
{
    id: 'linked-lists',
    title: 'Linked Lists',
    icon: 'fa-link',
    number: '02',
    subtitle: 'A chain of nodes where each node points to the next: flexible, dynamic, and insertion-friendly.',
    analogy: 'Think of a scavenger hunt. Each clue tells you where to find the next clue. To find clue #5, you must start at clue #1 and follow the chain. You can\'t jump straight to #5: there\'s no index. But if you want to insert a new clue between #3 and #4, you just change #3\'s "next" pointer. No need to renumber or shift all the other clues. That\'s the power and trade-off of linked lists.',
    realWorldExample: {
      title: 'Music playlist queue',
      desc: 'A music app can link each song to the next song. When you remove a song from the middle, the previous song just points to the song after it. That is much cheaper than shifting a huge array, but jumping directly to song 100 still requires following the chain.',
    },
    whatIsIt: 'A linked list is a linear data structure where elements (called "nodes") are stored in non-contiguous memory locations. Each node contains two things: the data value and a pointer (or reference) to the next node in the sequence. The list is accessed through a "head" pointer that points to the first node. The last node points to null, marking the end. Unlike arrays, there are no indices: you traverse the list by following pointers from node to node.',
    whyUse: 'Linked lists excel when you need frequent insertions and deletions, especially at the beginning or middle of the collection. Since nodes are scattered in memory and connected by pointers, inserting or removing a node only requires changing a couple of pointers: no shifting of other elements. This O(1) insertion/deletion (when you already have a reference to the position) is the killer feature. However, you lose random access: finding the 100th element requires walking through 99 nodes first.',
    whenToUse: [
      { icon: 'fa-plus', title: 'Frequent insertions/deletions', desc: 'When you constantly add/remove elements, especially at the start or middle.' },
      { icon: 'fa-expand', title: 'Unknown size', desc: 'When you don\'t know how many elements you\'ll have: lists grow dynamically.' },
      { icon: 'fa-undo', title: 'Undo/redo functionality', desc: 'Doubly linked lists are perfect for browser history or undo stacks.' },
      { icon: 'fa-layer-group', title: 'Building other structures', desc: 'Stacks, queues, and hash map buckets often use linked lists internally.' },
    ],
    codeExample: `<span class="cm">// === Singly Linked List Implementation ===</span>

<span class="kw">class</span> <span class="cls">Node</span> {
  <span class="fn">constructor</span>(value) {
    <span class="kw">this</span>.value <span class="op">=</span> value;
    <span class="kw">this</span>.next <span class="op">=</span> <span class="kw">null</span>;  <span class="cm">// pointer to next node</span>
  }
}

<span class="kw">class</span> <span class="cls">LinkedList</span> {
  <span class="fn">constructor</span>() {
    <span class="kw">this</span>.head <span class="op">=</span> <span class="kw">null</span>;
    <span class="kw">this</span>.size <span class="op">=</span> <span class="num">0</span>;
  }

  <span class="cm">// Add to the end: O(n)</span>
  <span class="fn">append</span>(value) {
    <span class="kw">const</span> newNode <span class="op">=</span> <span class="kw">new</span> <span class="cls">Node</span>(value);
    <span class="kw">if</span> (<span class="op">!</span><span class="kw">this</span>.head) {
      <span class="kw">this</span>.head <span class="op">=</span> newNode;
    } <span class="kw">else</span> {
      <span class="kw">let</span> current <span class="op">=</span> <span class="kw">this</span>.head;
      <span class="kw">while</span> (current.next) {
        current <span class="op">=</span> current.next;
      }
      current.next <span class="op">=</span> newNode;
    }
    <span class="kw">this</span>.size<span class="op">++</span>;
  }

  <span class="cm">// Add to the start: O(1)</span>
  <span class="fn">prepend</span>(value) {
    <span class="kw">const</span> newNode <span class="op">=</span> <span class="kw">new</span> <span class="cls">Node</span>(value);
    newNode.next <span class="op">=</span> <span class="kw">this</span>.head;
    <span class="kw">this</span>.head <span class="op">=</span> newNode;
    <span class="kw">this</span>.size<span class="op">++</span>;
  }

  <span class="cm">// Delete by value: O(n)</span>
  <span class="fn">delete</span>(value) {
    <span class="kw">if</span> (<span class="op">!</span><span class="kw">this</span>.head) <span class="kw">return null</span>;
    <span class="kw">if</span> (<span class="kw">this</span>.head.value <span class="op">===</span> value) {
      <span class="kw">this</span>.head <span class="op">=</span> <span class="kw">this</span>.head.next;
      <span class="kw">this</span>.size<span class="op">--</span>;
      <span class="kw">return</span> value;
    }
    <span class="kw">let</span> current <span class="op">=</span> <span class="kw">this</span>.head;
    <span class="kw">while</span> (current.next) {
      <span class="kw">if</span> (current.next.value <span class="op">===</span> value) {
        current.next <span class="op">=</span> current.next.next;
        <span class="kw">this</span>.size<span class="op">--</span>;
        <span class="kw">return</span> value;
      }
      current <span class="op">=</span> current.next;
    }
    <span class="kw">return null</span>;
  }

  <span class="cm">// Search: O(n)</span>
  <span class="fn">find</span>(value) {
    <span class="kw">let</span> current <span class="op">=</span> <span class="kw">this</span>.head;
    <span class="kw">while</span> (current) {
      <span class="kw">if</span> (current.value <span class="op">===</span> value) <span class="kw">return</span> current;
      current <span class="op">=</span> current.next;
    }
    <span class="kw">return null</span>;
  }

  <span class="cm">// Convert to array for easy viewing</span>
  <span class="fn">toArray</span>() {
    <span class="kw">const</span> arr <span class="op">=</span> [];
    <span class="kw">let</span> current <span class="op">=</span> <span class="kw">this</span>.head;
    <span class="kw">while</span> (current) {
      arr.<span class="fn">push</span>(current.value);
      current <span class="op">=</span> current.next;
    }
    <span class="kw">return</span> arr;
  }
}

<span class="cm">// Usage</span>
<span class="kw">const</span> list <span class="op">=</span> <span class="kw">new</span> <span class="cls">LinkedList</span>();
list.<span class="fn">append</span>(<span class="num">10</span>);
list.<span class="fn">append</span>(<span class="num">20</span>);
list.<span class="fn">prepend</span>(<span class="num">5</span>);
<span class="cm">// List: 5 -> 10 -> 20</span>
list.<span class="fn">delete</span>(<span class="num">10</span>);
<span class="cm">// List: 5 -> 20</span>`,
    complexity: [
      { op: 'Access by index', time: 'O(n)', badge: 'slow' },
      { op: 'Search', time: 'O(n)', badge: 'slow' },
      { op: 'Insert at head', time: 'O(1)', badge: 'fast' },
      { op: 'Insert at tail (with tail ptr)', time: 'O(1)', badge: 'fast' },
      { op: 'Insert at middle (with ref)', time: 'O(1)', badge: 'fast' },
      { op: 'Delete at head', time: 'O(1)', badge: 'fast' },
      { op: 'Delete at tail', time: 'O(n)', badge: 'slow' },
      { op: 'Delete in middle (with ref)', time: 'O(1)', badge: 'fast' },
    ],
    pros: [
      'Dynamic size: grows and shrinks at runtime, no need to pre-allocate',
      'O(1) insertion/deletion at the head: no shifting needed',
      'O(1) insertion/deletion at known position: just rewire pointers',
      'Memory efficient for unpredictable sizes: allocates only what\'s needed',
      'No contiguous memory requirement: works with fragmented memory',
    ],
    cons: [
      'No random access: must traverse from head to reach nth element',
      'Extra memory per node: each node stores a pointer (overhead)',
      'Poor cache locality: nodes scattered in memory, slow iteration',
      'Reverse traversal impossible in singly linked lists (use doubly linked)',
      'More complex code: pointer bugs (dangling references, cycles) are common',
    ],
    demoType: 'linkedlist',
    keywords: ['linked list', 'node', 'pointer', 'head', 'null', 'traversal', 'singly linked list'],
  },
);
