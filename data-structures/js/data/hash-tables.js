window.DS = window.DS || {};
DS.curriculum = DS.curriculum || [];

DS.curriculum.push(
{
    id: 'hash-tables',
    title: 'Hash Tables',
    icon: 'fa-hashtag',
    number: '05',
    subtitle: 'The fastest way to look things up — key-value pairs with near-instant access.',
    analogy: 'Imagine a dictionary (the book, not the data structure). You don\'t read page by page to find "zebra" — you jump near the end because you know Z is at the back. A hash table works similarly but even faster: it runs your key through a hash function that directly computes where the value is stored. It\'s like having a magical dictionary where you say "zebra" and the book instantly opens to the right page. No searching, no flipping — just direct access.',
    realWorldExample: {
      title: 'User profile lookup',
      desc: 'A web app can store profiles by user ID: "user_42" maps to Kevin\'s profile object. When the page needs Kevin\'s name or avatar, it looks up "user_42" directly instead of scanning every user in the system.',
    },
    whatIsIt: 'A hash table (or hash map) is a data structure that stores key-value pairs. It uses a hash function to compute an index (a "bucket") from the key, where the corresponding value is stored. This makes lookups, insertions, and deletions all O(1) on average — the fastest of any data structure. When two keys hash to the same index (a "collision"), they\'re stored together in that bucket, typically as a linked list. JavaScript Objects and Maps are hash tables under the hood.',
    whyUse: 'Hash tables are the go-to choice when you need fast lookups by a unique key. Need to check if a username is taken? Hash table. Need to cache API responses? Hash table. Need to count word frequencies? Hash table. Any time you find yourself asking "have I seen this before?" or "what\'s the value for this key?", a hash table is likely the answer. They\'re arguably the most practically useful data structure in all of programming.',
    whenToUse: [
      { icon: 'fa-magnifying-glass', title: 'Fast lookups', desc: 'When you need O(1) access by key — user records, configs, caches.' },
      { icon: 'fa-fingerprint', title: 'Deduplication', desc: 'Check if an item exists in O(1) — filtering duplicates, visited tracking.' },
      { icon: 'fa-chart-bar', title: 'Frequency counting', desc: 'Count occurrences of items — word frequency, analytics, voting.' },
      { icon: 'fa-database', title: 'Caching', desc: 'Store computed results for quick retrieval — memoization, web caches.' },
    ],
    codeExample: `<span class="cm">// === Hash Table Implementation ===</span>

<span class="kw">class</span> <span class="cls">HashTable</span> {
  <span class="fn">constructor</span>(size <span class="op">=</span> <span class="num">53</span>) {
    <span class="kw">this</span>.keyMap <span class="op">=</span> <span class="kw">new</span> <span class="cls">Array</span>(size);
  }

  <span class="cm">// Hash function — converts string to array index</span>
  <span class="fn">_hash</span>(key) {
    <span class="kw">let</span> total <span class="op">=</span> <span class="num">0</span>;
    <span class="kw">const</span> WEIRD_PRIME <span class="op">=</span> <span class="num">31</span>;
    <span class="kw">for</span> (<span class="kw">let</span> i <span class="op">=</span> <span class="num">0</span>; i <span class="op"><</span> Math.<span class="fn">min</span>(key.length, <span class="num">100</span>); i<span class="op">++</span>) {
      <span class="kw">const</span> char <span class="op">=</span> key.<span class="fn">charCodeAt</span>(i);
      total <span class="op">=</span> (total <span class="op">*</span> WEIRD_PRIME <span class="op">+</span> char) <span class="op">%</span> <span class="kw">this</span>.keyMap.length;
    }
    <span class="kw">return</span> total;
  }

  <span class="cm">// Set a key-value pair — O(1) average</span>
  <span class="fn">set</span>(key, value) {
    <span class="kw">const</span> index <span class="op">=</span> <span class="kw">this</span>.<span class="fn">_hash</span>(key);
    <span class="kw">if</span> (<span class="op">!</span><span class="kw">this</span>.keyMap[index]) {
      <span class="kw">this</span>.keyMap[index] <span class="op">=</span> [];
    }
    <span class="cm">// Check if key exists — update if so</span>
    <span class="kw">for</span> (<span class="kw">const</span> pair <span class="kw">of</span> <span class="kw">this</span>.keyMap[index]) {
      <span class="kw">if</span> (pair[<span class="num">0</span>] <span class="op">===</span> key) {
        pair[<span class="num">1</span>] <span class="op">=</span> value;
        <span class="kw">return</span>;
      }
    }
    <span class="kw">this</span>.keyMap[index].<span class="fn">push</span>([key, value]);
  }

  <span class="cm">// Get value by key — O(1) average</span>
  <span class="fn">get</span>(key) {
    <span class="kw">const</span> index <span class="op">=</span> <span class="kw">this</span>.<span class="fn">_hash</span>(key);
    <span class="kw">if</span> (<span class="kw">this</span>.keyMap[index]) {
      <span class="kw">for</span> (<span class="kw">const</span> pair <span class="kw">of</span> <span class="kw">this</span>.keyMap[index]) {
        <span class="kw">if</span> (pair[<span class="num">0</span>] <span class="op">===</span> key) <span class="kw">return</span> pair[<span class="num">1</span>];
      }
    }
    <span class="kw">return undefined</span>;
  }

  <span class="fn">keys</span>() {
    <span class="kw">const</span> keysArr <span class="op">=</span> [];
    <span class="kw">for</span> (<span class="kw">const</span> bucket <span class="kw">of</span> <span class="kw">this</span>.keyMap) {
      <span class="kw">if</span> (bucket) bucket.<span class="fn">forEach</span>(p <span class="op">=></span> keysArr.<span class="fn">push</span>(p[<span class="num">0</span>]));
    }
    <span class="kw">return</span> keysArr;
  }

  <span class="fn">values</span>() {
    <span class="kw">const</span> valsArr <span class="op">=</span> [];
    <span class="kw">for</span> (<span class="kw">const</span> bucket <span class="kw">of</span> <span class="kw">this</span>.keyMap) {
      <span class="kw">if</span> (bucket) bucket.<span class="fn">forEach</span>(p <span class="op">=></span> valsArr.<span class="fn">push</span>(p[<span class="num">1</span>]));
    }
    <span class="kw">return</span> valsArr;
  }
}

<span class="cm">// Usage</span>
<span class="kw">const</span> ht <span class="op">=</span> <span class="kw">new</span> <span class="cls">HashTable</span>();
ht.<span class="fn">set</span>(<span class="str">'name'</span>, <span class="str">'Alice'</span>);
ht.<span class="fn">set</span>(<span class="str">'age'</span>, <span class="num">28</span>);
ht.<span class="fn">set</span>(<span class="str">'role'</span>, <span class="str">'Engineer'</span>);
console.<span class="fn">log</span>(ht.<span class="fn">get</span>(<span class="str">'name'</span>)); <span class="cm">// 'Alice'</span>

<span class="cm">// In practice, just use JavaScript's built-in Map:</span>
<span class="kw">const</span> cache <span class="op">=</span> <span class="kw">new</span> <span class="cls">Map</span>();
cache.<span class="fn">set</span>(<span class="str">'user:123'</span>, { name: <span class="str">'Alice'</span> });
cache.<span class="fn">get</span>(<span class="str">'user:123'</span>); <span class="cm">// { name: 'Alice' }</span>
cache.<span class="fn">has</span>(<span class="str">'user:123'</span>); <span class="cm">// true</span>
cache.<span class="fn">delete</span>(<span class="str">'user:123'</span>);  <span class="cm">// true</span>`,
    complexity: [
      { op: 'Insert (set)', time: 'O(1) avg', badge: 'fast' },
      { op: 'Lookup (get)', time: 'O(1) avg', badge: 'fast' },
      { op: 'Delete', time: 'O(1) avg', badge: 'fast' },
      { op: 'Search by value', time: 'O(n)', badge: 'slow' },
      { op: 'Worst case (many collisions)', time: 'O(n)', badge: 'slow' },
    ],
    pros: [
      'O(1) average for insert, lookup, and delete — fastest possible',
      'Flexible keys — strings, numbers, or any hashable type',
      'Natural key-value model — matches how we think about data',
      'Built into JavaScript as Object and Map — always available',
      'Scales well — performance stays constant as data grows',
    ],
    cons: [
      'Worst case O(n) — bad hash function or many collisions degrade performance',
      'Unordered — no guaranteed iteration order (though Map preserves insertion order)',
      'More memory than arrays — stores keys, values, and bucket overhead',
      'Not suitable for range queries — can\'t easily find "all keys between X and Y"',
      'Hash function quality matters — poor hashing = many collisions = slow',
    ],
    demoType: 'hashtable',
  },
);
