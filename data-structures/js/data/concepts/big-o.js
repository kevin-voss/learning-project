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
  conceptSections: [
    {
      icon: 'fa-chart-line',
      title: 'Growth, not milliseconds',
      desc: 'Big-O describes how steps scale as n grows. It is not a stopwatch measurement on your laptop.',
      example: 'O(n) might be 1 ms or 1 s depending on hardware — but doubling n roughly doubles work.',
    },
    {
      icon: 'fa-layer-group',
      title: 'Best, average, worst',
      desc: 'Some algorithms vary. Hash table lookup is O(1) average but can degrade with many collisions.',
      example: 'Quicksort is often O(n log n) average but O(n²) worst case without care.',
    },
    {
      icon: 'fa-hard-drive',
      title: 'Space complexity',
      desc: 'Memory use also grows. Merge sort needs O(n) extra space; heap sort can be O(1) extra if in-place.',
      example: 'Recursion uses O(depth) stack space for call frames.',
    },
    {
      icon: 'fa-triangle-exclamation',
      title: 'Common mistakes',
      desc: 'Do not treat Big-O as exact runtime. Do not ignore hidden constants on small inputs.',
      example: 'O(n) with a huge constant can lose to O(n²) when n is tiny.',
    },
  ],
  conceptFlow: ['Pick algorithm', 'Count dominant steps as n grows', 'Drop constants and lower terms', 'Compare classes'],
  demoType: 'big-o',
  demoTitle: 'Big-O growth explorer',
  demoHint: 'Slide n and switch between O(1), O(log n), O(n), and O(n²) to see operation counts.',
  relatedIds: ['arrays', 'searching-algorithms', 'sorting-algorithms', 'hash-tables'],
  keywords: ['big-o', 'time complexity', 'o(n)', 'o(log n)', 'space complexity'],
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
  checklist: [
    'Explain what n represents in a given problem.',
    'Contrast O(1), O(log n), O(n), and O(n²) in plain language.',
    'Describe why Big-O is about growth, not exact seconds.',
    'Mention space complexity for at least one algorithm you know.',
  ],
});
