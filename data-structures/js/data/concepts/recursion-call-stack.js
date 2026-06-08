window.DS = window.DS || {};
DS.curriculum = DS.curriculum || [];

DS.curriculum.push({
  id: 'recursion-call-stack',
  category: 'Foundations',
  title: 'Recursion and the Call Stack',
  icon: 'fa-layer-group',
  number: '04',
  subtitle: 'Recursion solves a problem by calling the same function on a smaller version of the problem.',
  analogy: 'Imagine opening nested boxes. Inside the big box is a smaller box, then a smaller one, until you find the gift. After finding it, you close each box in reverse order. Recursion works like that: go deeper until the base case, then return back up.',
  realWorldExample: {
    title: 'Walking through folders',
    desc: 'A file explorer can use recursion to count every file in a folder. For each item: if it is a file, count it. If it is a folder, run the same counting function inside that folder.',
  },
  whatIsIt: 'Recursion means a function calls itself. Every recursive function needs a base case, which is the stop condition, and a recursive case, which does a smaller piece of the same problem. The call stack is the stack of active function calls. Each call waits until the deeper call returns.',
  whyUse: 'Recursion is natural for trees, graphs, folders, nested comments, and divide-and-conquer algorithms like merge sort and quick sort. DFS often uses recursion. Tree traversals are usually easiest to write recursively because each child subtree is just a smaller tree.',
  conceptSections: [
    {
      icon: 'fa-stop',
      title: 'Base case',
      desc: 'The base case is the stop sign. Without it, the function keeps calling itself until the call stack overflows.',
      example: 'factorial(1) returns 1 and stops going deeper.',
    },
    {
      icon: 'fa-arrow-down',
      title: 'Recursive case',
      desc: 'The recursive case calls the same function with a smaller or simpler input.',
      example: 'factorial(4) asks for factorial(3), then factorial(2), then factorial(1).',
    },
    {
      icon: 'fa-layer-group',
      title: 'Call stack grows',
      desc: 'Each function call waits on the stack until the deeper call finishes.',
      example: 'factorial(4), factorial(3), and factorial(2) all wait for factorial(1).',
    },
    {
      icon: 'fa-arrow-up',
      title: 'Unwinding',
      desc: 'Unwinding means returning answers back up the stack in reverse order.',
      example: '1 returns to factorial(2), then 2 returns to factorial(3), then 6 returns to factorial(4).',
    },
  ],
  conceptFlow: ['Call function', 'Push stack frame', 'Reach base case', 'Return values upward', 'Pop stack frames'],
  whenToUse: [
    { icon: 'fa-sitemap', title: 'Tree traversal', desc: 'Visit left subtree, current node, then right subtree.' },
    { icon: 'fa-folder-tree', title: 'Nested folders', desc: 'Apply the same function inside every child folder.' },
    { icon: 'fa-code-branch', title: 'Divide and conquer', desc: 'Split a problem into smaller problems, then combine answers.' },
    { icon: 'fa-route', title: 'DFS', desc: 'Go deep into one branch before backtracking.' },
  ],
  codeExample: `<span class="cm">// Count down recursively</span>
<span class="kw">function</span> <span class="fn">countDown</span>(n) {
  <span class="kw">if</span> (n <span class="op">===</span> <span class="num">0</span>) <span class="kw">return</span>; <span class="cm">// base case: stop</span>

  console.<span class="fn">log</span>(n);
  <span class="fn">countDown</span>(n <span class="op">-</span> <span class="num">1</span>);      <span class="cm">// recursive case: smaller problem</span>
}

<span class="fn">countDown</span>(<span class="num">3</span>); <span class="cm">// 3, 2, 1</span>`,
  pros: [
    'Very clear for trees and nested data',
    'Matches DFS and divide-and-conquer algorithms',
    'Makes some algorithms shorter and easier to reason about',
  ],
  cons: [
    'Too many calls can overflow the call stack',
    'Can be harder to debug than loops at first',
    'Every call uses stack memory',
  ],
  demoType: 'recursion',
  keywords: ['recursion', 'base case', 'call stack', 'unwinding', 'stack overflow'],
});
