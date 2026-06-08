window.DS = window.DS || {};
DS.curriculum = DS.curriculum || [];

DS.curriculum.push({
  id: 'sorting-algorithms',
  category: 'Algorithms',
  title: 'Sorting Algorithms',
  icon: 'fa-arrow-down-wide-short',
  number: '15',
  subtitle: 'Sorting puts values into order so later work becomes easier.',
  analogy: 'Sorting is like organizing books by height before looking for one. The organizing takes work, but after the books are ordered, finding and comparing things becomes easier.',
  realWorldExample: {
    title: 'Product sorting in a store',
    desc: 'An online store lets users sort products by price, rating, or name. The app compares values, moves items, and then displays the ordered result. Your existing sorting visualizer shows those compares, writes, swaps, and animation frames step by step.',
  },
  resourceLinks: [
    {
      label: 'Open the existing sorting algorithms visualizer repo',
      href: 'https://github.com/kevin-voss/sort-algorithms-visualizer',
      icon: 'fa-code-branch',
    },
  ],
  whatIsIt: 'A sorting algorithm rearranges data into an order, such as smallest to largest or A to Z. Bubble sort swaps neighbors. Insertion sort shifts larger values to make room. Merge sort splits and merges. Quick sort partitions around a pivot. Heap sort uses a heap. Radix sort groups numbers by digit buckets.',
  whyUse: 'Sorted data can make later operations faster. Binary search needs sorted data. Reports, leaderboards, tables, search results, and file browsers all rely on sorting. Different sorting algorithms trade off speed, memory, writes, and stability. Stability means equal items keep their original relative order.',
  conceptSections: [
    {
      icon: 'fa-code-compare',
      title: 'Compare',
      desc: 'A compare asks a question like "is 42 bigger than 15?" Sorting algorithms use compares to decide what should move.',
      example: 'Bubble sort compares neighboring values.',
    },
    {
      icon: 'fa-right-left',
      title: 'Swap',
      desc: 'A swap means two values trade places. It usually causes writes because both array positions get new values.',
      example: 'If [42, 15] is out of order, swap them to become [15, 42].',
    },
    {
      icon: 'fa-pen',
      title: 'Write',
      desc: 'A write means assigning a value into an array index. Some algorithms write more than others.',
      example: 'Merge sort writes values back into the original array during merge steps.',
    },
    {
      icon: 'fa-film',
      title: 'Frame',
      desc: 'A frame is one visual step in the animation. More frames usually means more visible work for learners to inspect.',
      example: 'The demo counts each compare or swap step as the visualization advances.',
    },
  ],
  conceptFlow: ['Compare values', 'Move / swap / write', 'Shrink unsorted work', 'Finish ordered array'],
  whenToUse: [
    { icon: 'fa-graduation-cap', title: 'Learning', desc: 'Bubble, insertion, and selection sort make the mechanics visible.' },
    { icon: 'fa-scale-balanced', title: 'General sorting', desc: 'Merge, quick, and heap sort show important trade-offs.' },
    { icon: 'fa-boxes-stacked', title: 'Integer buckets', desc: 'Radix sort can be fast when keys are bounded integers.' },
    { icon: 'fa-chart-simple', title: 'Comparing algorithms', desc: 'Track compares, writes, swaps, frames, space, and stability.' },
  ],
  codeExamples: {
    bubble: `<span class="cm">// Bubble sort: swap neighbors that are out of order</span>
<span class="kw">function</span> <span class="fn">bubbleSort</span>(arr) {
  <span class="kw">for</span> (<span class="kw">let</span> i <span class="op">=</span> <span class="num">0</span>; i <span class="op"><</span> arr.length <span class="op">-</span> <span class="num">1</span>; i<span class="op">++</span>) {
    <span class="kw">for</span> (<span class="kw">let</span> j <span class="op">=</span> <span class="num">0</span>; j <span class="op"><</span> arr.length <span class="op">-</span> <span class="num">1</span> <span class="op">-</span> i; j<span class="op">++</span>) {
      <span class="kw">if</span> (arr[j] <span class="op">></span> arr[j <span class="op">+</span> <span class="num">1</span>]) {
        <span class="kw">const</span> tmp <span class="op">=</span> arr[j];
        arr[j] <span class="op">=</span> arr[j <span class="op">+</span> <span class="num">1</span>];
        arr[j <span class="op">+</span> <span class="num">1</span>] <span class="op">=</span> tmp;
      }
    }
  }
  <span class="kw">return</span> arr;
}`,
    insertion: `<span class="cm">// Insertion sort: grow a sorted left side</span>
<span class="kw">function</span> <span class="fn">insertionSort</span>(arr) {
  <span class="kw">for</span> (<span class="kw">let</span> i <span class="op">=</span> <span class="num">1</span>; i <span class="op"><</span> arr.length; i<span class="op">++</span>) {
    <span class="kw">const</span> key <span class="op">=</span> arr[i];
    <span class="kw">let</span> j <span class="op">=</span> i <span class="op">-</span> <span class="num">1</span>;

    <span class="kw">while</span> (j <span class="op">>=</span> <span class="num">0</span> <span class="op">&&</span> arr[j] <span class="op">></span> key) {
      arr[j <span class="op">+</span> <span class="num">1</span>] <span class="op">=</span> arr[j]; <span class="cm">// shift larger value right</span>
      j<span class="op">--</span>;
    }
    arr[j <span class="op">+</span> <span class="num">1</span>] <span class="op">=</span> key;
  }
  <span class="kw">return</span> arr;
}`,
    selection: `<span class="cm">// Selection sort: put the smallest remaining value at the front</span>
<span class="kw">function</span> <span class="fn">selectionSort</span>(arr) {
  <span class="kw">for</span> (<span class="kw">let</span> i <span class="op">=</span> <span class="num">0</span>; i <span class="op"><</span> arr.length <span class="op">-</span> <span class="num">1</span>; i<span class="op">++</span>) {
    <span class="kw">let</span> min <span class="op">=</span> i;
    <span class="kw">for</span> (<span class="kw">let</span> j <span class="op">=</span> i <span class="op">+</span> <span class="num">1</span>; j <span class="op"><</span> arr.length; j<span class="op">++</span>) {
      <span class="kw">if</span> (arr[j] <span class="op"><</span> arr[min]) min <span class="op">=</span> j;
    }
    <span class="kw">if</span> (min <span class="op">!==</span> i) {
      <span class="kw">const</span> tmp <span class="op">=</span> arr[i];
      arr[i] <span class="op">=</span> arr[min];
      arr[min] <span class="op">=</span> tmp;
    }
  }
  <span class="kw">return</span> arr;
}`,
    merge: `<span class="cm">// Merge sort: split, sort halves, merge sorted pieces</span>
<span class="kw">function</span> <span class="fn">mergeSort</span>(arr, left <span class="op">=</span> <span class="num">0</span>, right <span class="op">=</span> arr.length <span class="op">-</span> <span class="num">1</span>) {
  <span class="kw">if</span> (left <span class="op">>=</span> right) <span class="kw">return</span> arr;

  <span class="kw">const</span> mid <span class="op">=</span> Math.<span class="fn">floor</span>((left <span class="op">+</span> right) <span class="op">/</span> <span class="num">2</span>);
  <span class="fn">mergeSort</span>(arr, left, mid);
  <span class="fn">mergeSort</span>(arr, mid <span class="op">+</span> <span class="num">1</span>, right);

  <span class="kw">const</span> leftPart <span class="op">=</span> arr.<span class="fn">slice</span>(left, mid <span class="op">+</span> <span class="num">1</span>);
  <span class="kw">const</span> rightPart <span class="op">=</span> arr.<span class="fn">slice</span>(mid <span class="op">+</span> <span class="num">1</span>, right <span class="op">+</span> <span class="num">1</span>);
  <span class="kw">let</span> i <span class="op">=</span> <span class="num">0</span>, j <span class="op">=</span> <span class="num">0</span>, k <span class="op">=</span> left;

  <span class="kw">while</span> (i <span class="op"><</span> leftPart.length <span class="op">&&</span> j <span class="op"><</span> rightPart.length) {
    <span class="kw">if</span> (leftPart[i] <span class="op"><=</span> rightPart[j]) arr[k<span class="op">++</span>] <span class="op">=</span> leftPart[i<span class="op">++</span>];
    <span class="kw">else</span> arr[k<span class="op">++</span>] <span class="op">=</span> rightPart[j<span class="op">++</span>];
  }
  <span class="kw">while</span> (i <span class="op"><</span> leftPart.length) arr[k<span class="op">++</span>] <span class="op">=</span> leftPart[i<span class="op">++</span>];
  <span class="kw">while</span> (j <span class="op"><</span> rightPart.length) arr[k<span class="op">++</span>] <span class="op">=</span> rightPart[j<span class="op">++</span>];

  <span class="kw">return</span> arr;
}`,
  },
  codeExample: `<span class="cm">// Bubble sort: swap neighbors that are out of order</span>
<span class="kw">function</span> <span class="fn">bubbleSort</span>(arr) {
  <span class="kw">for</span> (<span class="kw">let</span> i <span class="op">=</span> <span class="num">0</span>; i <span class="op"><</span> arr.length <span class="op">-</span> <span class="num">1</span>; i<span class="op">++</span>) {
    <span class="kw">for</span> (<span class="kw">let</span> j <span class="op">=</span> <span class="num">0</span>; j <span class="op"><</span> arr.length <span class="op">-</span> <span class="num">1</span> <span class="op">-</span> i; j<span class="op">++</span>) {
      <span class="kw">if</span> (arr[j] <span class="op">></span> arr[j <span class="op">+</span> <span class="num">1</span>]) {
        <span class="kw">const</span> tmp <span class="op">=</span> arr[j];
        arr[j] <span class="op">=</span> arr[j <span class="op">+</span> <span class="num">1</span>];
        arr[j <span class="op">+</span> <span class="num">1</span>] <span class="op">=</span> tmp;
      }
    }
  }
  <span class="kw">return</span> arr;
}`,
  complexity: [
    { op: 'Simple sorts average', time: 'O(n squared)', badge: 'slow' },
    { op: 'Merge / quick / heap average', time: 'O(n log n)', badge: 'mid' },
    { op: 'Radix per digit pass', time: 'O(n)', badge: 'mid' },
    { op: 'Read sorted item by index', time: 'O(1)', badge: 'fast' },
  ],
  pros: [
    'Makes arrays, comparisons, swaps, and writes visible',
    'Connects directly to the existing sorting visualizer repo',
    'Shows trade-offs between speed, memory, stability, and real hardware writes',
  ],
  cons: [
    'Sorting can be expensive for large inputs',
    'Some algorithms need extra memory',
    'Fast average case and safe worst case are not always the same',
  ],
  demoType: 'sorting',
});
