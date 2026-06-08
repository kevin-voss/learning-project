window.DS = window.DS || {};
DS.curriculum = DS.curriculum || [];

DS.curriculum.push({
  id: 'searching-algorithms',
  category: 'Algorithms',
  title: 'Searching Algorithms',
  icon: 'fa-magnifying-glass',
  number: '14',
  subtitle: 'Searching means finding the item you want inside stored data.',
  analogy: 'Looking for a book on a messy table is linear search: check one book at a time. Looking for a word in a dictionary is binary search: open near the middle, decide left or right, then repeat. Looking through friends-of-friends is graph search.',
  realWorldExample: {
    title: 'Finding a user by name',
    desc: 'If users are stored in a plain array, the app may scan names one by one. If they are sorted, binary search can cut the work down. If users are connected as friends, BFS can find the nearest connection path.',
  },
  whatIsIt: 'A searching algorithm is a step-by-step method for finding data. Linear search checks items one by one. Binary search works only when data is sorted and cuts the remaining search area in half. Tree search follows left or right child pointers. BFS explores nearby graph nodes first. DFS follows one path deeply before backtracking.',
  whyUse: 'Search is one of the most common operations in software. The right data structure can make search much faster. Arrays are simple but may require scanning. Hash tables are excellent for exact key lookup. Trees support ordered search. Graphs answer relationship questions like "can I reach this node?"',
  conceptSections: [
    {
      icon: 'fa-list',
      title: 'Linear search',
      desc: 'Start at the first item and check one item at a time until you find the target or run out of items.',
      example: 'Good for tiny lists or unsorted data because it has no setup cost.',
    },
    {
      icon: 'fa-divide',
      title: 'Binary search',
      desc: 'Use sorted data. Check the middle value. If the target is larger, ignore the left half. If smaller, ignore the right half.',
      example: 'This is why dictionaries and sorted arrays can be searched quickly.',
    },
    {
      icon: 'fa-sitemap',
      title: 'Tree search',
      desc: 'A binary search tree uses the same smaller-left and larger-right idea, but the data is stored as connected nodes.',
      example: 'At each node, compare once and choose left or right.',
    },
    {
      icon: 'fa-circle-nodes',
      title: 'Graph search',
      desc: 'BFS and DFS search relationships instead of sorted positions. They need a visited set to avoid looping forever.',
      example: 'BFS can find the fewest friendship hops between two people.',
    },
  ],
  conceptFlow: ['Pick search strategy', 'Check current item', 'Decide where to look next', 'Stop when found or impossible'],
  whenToUse: [
    { icon: 'fa-list', title: 'Linear search', desc: 'Use for small or unsorted lists.' },
    { icon: 'fa-divide', title: 'Binary search', desc: 'Use when data is sorted and index access is available.' },
    { icon: 'fa-sitemap', title: 'Tree search', desc: 'Use when values are organized by smaller-left, larger-right rules.' },
    { icon: 'fa-circle-nodes', title: 'Graph search', desc: 'Use BFS or DFS when relationships matter.' },
  ],
  codeExample: `<span class="cm">// Linear search: check one by one</span>
<span class="kw">function</span> <span class="fn">linearSearch</span>(arr, target) {
  <span class="kw">for</span> (<span class="kw">let</span> i <span class="op">=</span> <span class="num">0</span>; i <span class="op"><</span> arr.length; i<span class="op">++</span>) {
    <span class="kw">if</span> (arr[i] <span class="op">===</span> target) <span class="kw">return</span> i;
  }
  <span class="kw">return</span> <span class="op">-</span><span class="num">1</span>;
}

<span class="cm">// Binary search: sorted arrays only</span>
<span class="kw">function</span> <span class="fn">binarySearch</span>(arr, target) {
  <span class="kw">let</span> left <span class="op">=</span> <span class="num">0</span>, right <span class="op">=</span> arr.length <span class="op">-</span> <span class="num">1</span>;
  <span class="kw">while</span> (left <span class="op"><=</span> right) {
    <span class="kw">const</span> mid <span class="op">=</span> Math.<span class="fn">floor</span>((left <span class="op">+</span> right) <span class="op">/</span> <span class="num">2</span>);
    <span class="kw">if</span> (arr[mid] <span class="op">===</span> target) <span class="kw">return</span> mid;
    <span class="kw">if</span> (arr[mid] <span class="op"><</span> target) left <span class="op">=</span> mid <span class="op">+</span> <span class="num">1</span>;
    <span class="kw">else</span> right <span class="op">=</span> mid <span class="op">-</span> <span class="num">1</span>;
  }
  <span class="kw">return</span> <span class="op">-</span><span class="num">1</span>;
}`,
  complexity: [
    { op: 'Linear search', time: 'O(n)', badge: 'slow' },
    { op: 'Binary search', time: 'O(log n)', badge: 'mid' },
    { op: 'Hash lookup average', time: 'O(1) avg', badge: 'fast' },
    { op: 'BFS / DFS', time: 'O(V + E)', badge: 'mid' },
  ],
  pros: [
    'Shows why sorted data and structure matter',
    'Connects arrays, hash tables, trees, and graphs',
    'Builds intuition for real app lookups',
  ],
  cons: [
    'Binary search only works on sorted indexable data',
    'Graph search needs visited tracking to avoid loops',
    'Hash lookup is fast for exact keys, not range questions',
  ],
  demoType: 'search',
});
