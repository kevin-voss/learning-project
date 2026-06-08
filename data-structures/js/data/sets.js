window.DS = window.DS || {};
DS.curriculum = DS.curriculum || [];

DS.curriculum.push(
{
    id: 'sets',
    title: 'Sets',
    icon: 'fa-circle-dot',
    number: '08',
    subtitle: 'A collection of unique values — no duplicates, with fast "is this here?" checks.',
    analogy: 'Think of a VIP guest list for an exclusive party. Each person can only appear once — having "Alice" on the list twice doesn\'t make her more VIP. The bouncer\'s main job is checking: "Is this person on the list?" That yes/no membership test is what sets do best. And just like in real life, you can combine guest lists (union), find who\'s on both lists (intersection), or find who\'s on one but not the other (difference).',
    realWorldExample: {
      title: 'Already-liked posts',
      desc: 'A social app can keep a Set of post IDs you already liked. When the feed renders a post, the app asks "is this post ID in the Set?" If yes, it shows the liked state. Adding the same post ID twice changes nothing because Sets only keep unique values.',
    },
    whatIsIt: 'A set is a collection of unique values with no duplicates. The primary operation is membership testing: checking whether a value exists. A hash table stores key → value pairs, like "username" → "Alice". A set stores only the keys/values themselves, like "Alice", "Bob", "Carlos". Many languages implement sets using a hash table internally, but the interface is simpler: add(value), has(value), delete(value).',
    whyUse: 'Use a Set when the question is yes/no: "have I seen this value already?" or "is this value allowed?" Use a hash table or Map when you need to look up extra data for a key. Removing duplicates from an array? Use a Set. Tracking visited nodes during BFS or DFS? Use a Set. Counting how many times each word appears? Use a Map/hash table instead, because counts are values attached to keys.',
    whenToUse: [
      { icon: 'fa-filter', title: 'Remove duplicates', desc: 'Deduplication — [...new Set(array)] is the classic one-liner.' },
      { icon: 'fa-question', title: 'Membership testing', desc: 'Fast yes/no "has this been seen before?" checks — O(1) average.' },
      { icon: 'fa-venn', title: 'Set operations', desc: 'Union, intersection, difference — comparing groups of items.' },
      { icon: 'fa-eye', title: 'Tracking visited items', desc: 'Graph traversal, caching seen states, preventing re-processing.' },
    ],
    codeExample: `<span class="cm">// === Using JavaScript's Built-in Set ===</span>
<span class="cm">// Set = unique values only. Map/hash table = key → value pairs.</span>

<span class="cm">// Create a set</span>
<span class="kw">const</span> tags <span class="op">=</span> <span class="kw">new</span> <span class="cls">Set</span>([<span class="str">'javascript'</span>]);

<span class="cm">// Add elements — O(1) average</span>
tags.<span class="fn">add</span>(<span class="str">'python'</span>);
tags.<span class="fn">add</span>(<span class="str">'rust'</span>);
tags.<span class="fn">add</span>(<span class="str">'javascript'</span>); <span class="cm">// Ignored! Already exists</span>
console.<span class="fn">log</span>(tags.size); <span class="cm">// 3, not 4</span>

<span class="cm">// Check membership — O(1) average</span>
tags.<span class="fn">has</span>(<span class="str">'javascript'</span>); <span class="cm">// true</span>
tags.<span class="fn">has</span>(<span class="str">'java'</span>);     <span class="cm">// false</span>

<span class="cm">// Delete — O(1) average</span>
tags.<span class="fn">delete</span>(<span class="str">'python'</span>); <span class="cm">// true</span>

<span class="cm">// Iterate</span>
tags.<span class="fn">forEach</span>(tag <span class="op">=></span> console.<span class="fn">log</span>(tag));

<span class="cm">// === Practical Examples ===</span>

<span class="cm">// 1. Remove duplicates from an array</span>
<span class="kw">const</span> nums <span class="op">=</span> [<span class="num">1</span>, <span class="num">2</span>, <span class="num">3</span>, <span class="num">2</span>, <span class="num">1</span>, <span class="num">4</span>, <span class="num">5</span>, <span class="num">3</span>];
<span class="kw">const</span> unique <span class="op">=</span> [...<span class="kw">new</span> <span class="cls">Set</span>(nums)];
<span class="cm">// [1, 2, 3, 4, 5]</span>

<span class="cm">// 2. Set operations</span>
<span class="kw">const</span> a <span class="op">=</span> <span class="kw">new</span> <span class="cls">Set</span>([<span class="num">1</span>, <span class="num">2</span>, <span class="num">3</span>, <span class="num">4</span>]);
<span class="kw">const</span> b <span class="op">=</span> <span class="kw">new</span> <span class="cls">Set</span>([<span class="num">3</span>, <span class="num">4</span>, <span class="num">5</span>, <span class="num">6</span>]);

<span class="cm">// Union: all elements from both</span>
<span class="kw">const</span> union <span class="op">=</span> <span class="kw">new</span> <span class="cls">Set</span>([...a, ...b]);
<span class="cm">// {1, 2, 3, 4, 5, 6}</span>

<span class="cm">// Intersection: elements in both</span>
<span class="kw">const</span> intersection <span class="op">=</span> <span class="kw">new</span> <span class="cls">Set</span>([...a].<span class="fn">filter</span>(x <span class="op">=></span> b.<span class="fn">has</span>(x)));
<span class="cm">// {3, 4}</span>

<span class="cm">// Difference: in a but not in b</span>
<span class="kw">const</span> diff <span class="op">=</span> <span class="kw">new</span> <span class="cls">Set</span>([...a].<span class="fn">filter</span>(x <span class="op">=></span> <span class="op">!</span>b.<span class="fn">has</span>(x)));
<span class="cm">// {1, 2}</span>

<span class="cm">// 3. Tracking seen items</span>
<span class="kw">const</span> seen <span class="op">=</span> <span class="kw">new</span> <span class="cls">Set</span>();
<span class="kw">function</span> <span class="fn">processItem</span>(item) {
  <span class="kw">if</span> (seen.<span class="fn">has</span>(item.id)) <span class="kw">return</span>; <span class="cm">// Skip duplicate</span>
  seen.<span class="fn">add</span>(item.id);
  <span class="cm">// Process the item...</span>
}`,
    complexity: [
      { op: 'Add (insert)', time: 'O(1) avg', badge: 'fast' },
      { op: 'Has (membership)', time: 'O(1) avg', badge: 'fast' },
      { op: 'Delete', time: 'O(1) avg', badge: 'fast' },
      { op: 'Union/Intersection/Diff', time: 'O(n)', badge: 'mid' },
      { op: 'Iterate', time: 'O(n)', badge: 'mid' },
    ],
    pros: [
      'Guaranteed uniqueness — no duplicates possible',
      'O(1) membership testing — fastest way to check "is this in the collection?"',
      'Clean, expressive set operations — union, intersection, difference',
      'Simple deduplication — [...new Set(arr)] is elegant and fast',
      'Built into JavaScript — no implementation needed',
    ],
    cons: [
      'No indexing — can\'t access the "3rd element" like an array',
      'No order guarantee — iteration order may not match insertion (though JS Sets do preserve it)',
      'Can\'t store duplicates — if you need frequency counts, use a Map instead',
      'Values only — no key-value pairs (use Map for that)',
      'Set operations aren\'t built-in — must implement union/intersection manually',
    ],
    demoType: 'set',
    keywords: ['set', 'membership', 'duplicate', 'hash table'],
  },
);
