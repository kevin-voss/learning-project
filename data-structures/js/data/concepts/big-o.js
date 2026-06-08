window.DS = window.DS || {};
DS.curriculum = DS.curriculum || [];

DS.curriculum.push({
  id: 'big-o-notation',
  category: 'Foundations',
  title: 'Big-O and Time Complexity',
  icon: 'fa-gauge-high',
  number: '05',
  subtitle: 'Big-O explains how work grows when the input gets bigger.',
  analogy: 'Imagine finding a name in a guest list. If the list is random, you may read every name. If the list is sorted, you can open near the middle and keep cutting the remaining list in half. Big-O describes that growth pattern.',
  realWorldExample: {
    title: 'Why a feature is fast with 10 users but slow with 10,000',
    desc: 'A loop that checks every user may feel instant with 10 users. With 10,000 users it does much more work. Big-O helps you spot that risk before the app grows.',
  },
  whatIsIt: 'Time complexity is a way to describe how much work an operation does. Big-O ignores tiny details and focuses on growth. O(1) means roughly constant work. O(log n) means the work grows slowly because each step cuts the problem down. O(n) means work grows with the number of items. O(n squared) means nested work, like comparing every item with every other item.',
  whyUse: 'Big-O helps beginners compare choices. Searching an array by scanning is O(n). Searching a balanced binary search tree is O(log n). Looking up a key in a hash table is O(1) on average. The notation is not exact time, but it is a useful warning system for growth.',
  codeExample: `<span class="cm">// O(1): one direct lookup</span>
names[<span class="num">0</span>];

<span class="cm">// O(n): may check every item</span>
<span class="kw">for</span> (<span class="kw">const</span> name <span class="kw">of</span> names) {
  <span class="kw">if</span> (name <span class="op">===</span> target) <span class="kw">break</span>;
}

<span class="cm">// O(n squared): compare many pairs</span>
<span class="kw">for</span> (<span class="kw">const</span> a <span class="kw">of</span> names) {
  <span class="kw">for</span> (<span class="kw">const</span> b <span class="kw">of</span> names) {
    <span class="cm">// pair work</span>
  }
}`,
  complexity: [
    { op: 'Direct access', time: 'O(1)', badge: 'fast' },
    { op: 'Divide search space', time: 'O(log n)', badge: 'mid' },
    { op: 'Scan all items', time: 'O(n)', badge: 'slow' },
    { op: 'Nested pair checks', time: 'O(n squared)', badge: 'slow' },
  ],
});
