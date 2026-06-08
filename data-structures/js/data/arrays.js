window.DS = window.DS || {};
DS.curriculum = DS.curriculum || [];

DS.curriculum.push(
{
    id: 'arrays',
    title: 'Arrays',
    icon: 'fa-layer-group',
    number: '01',
    subtitle: 'The foundation of all data structures — contiguous blocks of memory accessed by index.',
    analogy: 'Imagine a row of numbered lockers in a school hallway. Each locker has a number (index) and can hold one item. You can instantly open locker #5 without checking lockers 1-4 first. That random-access speed is what makes arrays special. But if you need to add a locker in the middle, every later locker must move one position to the right. Programmers call that shifting, and it is slower because many items have to move.',
    realWorldExample: {
      title: 'Shopping cart item list',
      desc: 'An online store can keep the items in your cart in an array: item 0 is the first product, item 1 is the second, and so on. Showing the cart is easy because the app loops from the first item to the last. If the app already knows "change the quantity of item 2", it can jump straight to index 2.',
    },
    whatIsIt: 'An array is a collection of elements stored at contiguous memory locations. The idea is to store multiple items of the same type together using a single name. Elements are accessed by their index — a zero-based position number. In JavaScript, arrays are dynamic (they can grow/shrink), but conceptually, a traditional array has a fixed size determined at creation time.',
    whyUse: 'Arrays are the default go-to data structure because they provide O(1) constant-time access to any element by index. If you know the position, you get the element instantly — no searching, no traversal. This makes arrays ideal for scenarios where you read data more than you modify it. CPUs also love arrays because contiguous memory means cache-friendly access patterns — the CPU can prefetch adjacent elements, making iteration blazing fast.',
    whenToUse: [
      { icon: 'fa-list-ol', title: 'Ordered collections', desc: 'When elements have a natural sequence and you need to preserve order.' },
      { icon: 'fa-bolt', title: 'Fast random access', desc: 'When you frequently need to read/write at specific positions by index.' },
      { icon: 'fa-sort', title: 'Sorting & searching', desc: 'When you need to sort elements or use binary search on sorted data.' },
      { icon: 'fa-table-cells', title: 'Matrix/grid data', desc: '2D arrays for images, game boards, spreadsheets, maps.' }
    ],
    codeExample: `<span class="cm">// === Creating Arrays ===</span>
<span class="kw">const</span> fruits <span class="op">=</span> [<span class="str">'apple'</span>, <span class="str">'banana'</span>, <span class="str">'cherry'</span>];
<span class="kw">const</span> numbers <span class="op">=</span> <span class="kw">new</span> <span class="cls">Array</span>(<span class="num">1</span>, <span class="num">2</span>, <span class="num">3</span>, <span class="num">4</span>, <span class="num">5</span>);

<span class="cm">// === Accessing Elements (O(1)) ===</span>
console.<span class="fn">log</span>(fruits[<span class="num">0</span>]);  <span class="cm">// 'apple'</span>
console.<span class="fn">log</span>(fruits[<span class="num">2</span>]);  <span class="cm">// 'cherry'</span>

<span class="cm">// === Modifying Elements (O(1)) ===</span>
fruits[<span class="num">1</span>] <span class="op">=</span> <span class="str">'blueberry'</span>;
<span class="cm">// ['apple', 'blueberry', 'cherry']</span>

<span class="cm">// === Adding to End — push (O(1) amortized) ===</span>
fruits.<span class="fn">push</span>(<span class="str">'date'</span>);
<span class="cm">// ['apple', 'blueberry', 'cherry', 'date']</span>

<span class="cm">// === Removing from End — pop (O(1)) ===</span>
<span class="kw">const</span> last <span class="op">=</span> fruits.<span class="fn">pop</span>();
<span class="cm">// last = 'date', fruits = ['apple', 'blueberry', 'cherry']</span>

<span class="cm">// === Adding to Start — unshift (O(n)) — SLOW! ===</span>
fruits.<span class="fn">unshift</span>(<span class="str">'avocado'</span>);
<span class="cm">// All elements shift right by one position</span>

<span class="cm">// === Removing from Start — shift (O(n)) — SLOW! ===</span>
<span class="kw">const</span> first <span class="op">=</span> fruits.<span class="fn">shift</span>();
<span class="cm">// All elements shift left by one position</span>

<span class="cm">// === Insert at Index — splice (O(n)) ===</span>
fruits.<span class="fn">splice</span>(<span class="num">1</span>, <span class="num">0</span>, <span class="str">'apricot'</span>);
<span class="cm">// Insert 'apricot' at index 1, delete 0 items</span>

<span class="cm">// === Searching — indexOf (O(n)) ===</span>
<span class="kw">const</span> idx <span class="op">=</span> fruits.<span class="fn">indexOf</span>(<span class="str">'cherry'</span>);

<span class="cm">// === Iteration ===</span>
fruits.<span class="fn">forEach</span>((fruit, i) <span class="op">=></span> {
  console.<span class="fn">log</span>(<span class="str">\`\${i}: \${fruit}\`</span>);
});

<span class="cm">// === Useful Methods ===</span>
fruits.<span class="fn">map</span>(f <span class="op">=></span> f.<span class="fn">toUpperCase</span>());   <span class="cm">// transform each</span>
fruits.<span class="fn">filter</span>(f <span class="op">=></span> f.length <span class="op">></span> <span class="num">5</span>); <span class="cm">// filter elements</span>
fruits.<span class="fn">reduce</span>((acc, f) <span class="op">=></span> acc <span class="op">+</span> f, <span class="str">''</span>); <span class="cm">// accumulate</span>
fruits.<span class="fn">sort</span>();                          <span class="cm">// sort alphabetically</span>
fruits.<span class="fn">slice</span>(<span class="num">1</span>, <span class="num">3</span>);                  <span class="cm">// sub-array [1..3)</span>`,
    complexity: [
      { op: 'Access by index', time: 'O(1)', badge: 'fast' },
      { op: 'Search (unsorted)', time: 'O(n)', badge: 'slow' },
      { op: 'Search (sorted, binary)', time: 'O(log n)', badge: 'mid' },
      { op: 'Push (add to end)', time: 'O(1)*', badge: 'fast' },
      { op: 'Pop (remove from end)', time: 'O(1)', badge: 'fast' },
      { op: 'Unshift (add to start)', time: 'O(n)', badge: 'slow' },
      { op: 'Shift (remove from start)', time: 'O(n)', badge: 'slow' },
      { op: 'Insert/Remove at index', time: 'O(n)', badge: 'slow' },
    ],
    pros: [
      'Random access in O(1) — instant reads by index',
      'Cache-friendly — contiguous memory means fast iteration',
      'Simple and intuitive — every language has them built-in',
      'Minimal memory overhead — no pointers, just data',
      'Great for sorted data and binary search',
    ],
    cons: [
      'Fixed size in low-level languages — must allocate ahead of time',
      'Inserting/deleting in the middle is O(n) — elements must shift',
      'Adding at the start is O(n) — everything shifts right',
      'Memory must be contiguous — large arrays may fail to allocate',
      'Wastes space if over-allocated, crashes if under-allocated (in static arrays)',
    ],
    demoType: 'array',
  },
);
