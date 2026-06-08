window.DS = window.DS || {};
DS.curriculum = DS.curriculum || [];

DS.curriculum.push(
{
    id: 'trees',
    title: 'Trees',
    icon: 'fa-sitemap',
    number: '06',
    subtitle: 'Hierarchical data with roots, branches, and leaves — from file systems to DOM to databases.',
    analogy: 'Think of a company org chart. There is one CEO at the top (root). Each person below has exactly one manager (parent), and may manage other people (children). People with no reports are leaves. A tree is this same top-down shape in code: one starting point, branches below it, and no loops back upward.',
    realWorldExample: {
      title: 'File explorer folders',
      desc: 'Your computer\'s file explorer is a tree. The main drive is the root, folders are branches, and files are leaves. Opening a folder means moving down one level. There is one clear path to each file, like Drive → Projects → learning-project → README.md.',
    },
    whatIsIt: 'A tree is a hierarchical data structure made of nodes and edges. It starts at one root node. Each node can have children, and a node with no children is a leaf. In a Binary Search Tree (BST), each node has at most two children: smaller values go left, larger values go right. That rule lets search skip whole branches. Trees have no cycles, so there is exactly one path from the root to any node.',
    whyUse: 'Trees are useful when data naturally has levels or when sorted search matters. File systems are trees. HTML pages are DOM trees. A BST can search in O(log n) when it stays balanced because each comparison chooses left or right and discards the other side. If values are inserted in sorted order, the tree can become a long chain and slow down to O(n), which is why production systems often use balanced trees like AVL, Red-Black, or B-trees.',
    whenToUse: [
      { icon: 'fa-folder-tree', title: 'Hierarchical data', desc: 'File systems, org charts, DOM, category trees.' },
      { icon: 'fa-magnifying-glass-chart', title: 'Fast search & sorting', desc: 'BST gives O(log n) search — used in databases and indexing.' },
      { icon: 'fa-spell-check', title: 'Autocomplete & prefixes', desc: 'Tries (prefix trees) power search suggestions and spell checkers.' },
      { icon: 'fa-code-branch', title: 'Decision logic', desc: 'Decision trees, game AI, expression parsing.' },
    ],
    codeExample: `<span class="cm">// === Binary Search Tree Implementation ===</span>

<span class="kw">class</span> <span class="cls">TreeNode</span> {
  <span class="fn">constructor</span>(value) {
    <span class="kw">this</span>.value <span class="op">=</span> value;
    <span class="kw">this</span>.left <span class="op">=</span> <span class="kw">null</span>;
    <span class="kw">this</span>.right <span class="op">=</span> <span class="kw">null</span>;
  }
}

<span class="kw">class</span> <span class="cls">BST</span> {
  <span class="fn">constructor</span>() {
    <span class="kw">this</span>.root <span class="op">=</span> <span class="kw">null</span>;
  }

  <span class="cm">// Insert — O(log n) average, O(n) worst</span>
  <span class="fn">insert</span>(value) {
    <span class="kw">const</span> newNode <span class="op">=</span> <span class="kw">new</span> <span class="cls">TreeNode</span>(value);
    <span class="kw">if</span> (<span class="op">!</span><span class="kw">this</span>.root) {
      <span class="kw">this</span>.root <span class="op">=</span> newNode;
      <span class="kw">return this</span>;
    }
    <span class="kw">let</span> current <span class="op">=</span> <span class="kw">this</span>.root;
    <span class="kw">while</span> (<span class="kw">true</span>) {
      <span class="kw">if</span> (value <span class="op">===</span> current.value) <span class="kw">return this</span>; <span class="cm">// no duplicates</span>
      <span class="kw">if</span> (value <span class="op"><</span> current.value) {
        <span class="kw">if</span> (<span class="op">!</span>current.left) { current.left <span class="op">=</span> newNode; <span class="kw">return this</span>; }
        current <span class="op">=</span> current.left;
      } <span class="kw">else</span> {
        <span class="kw">if</span> (<span class="op">!</span>current.right) { current.right <span class="op">=</span> newNode; <span class="kw">return this</span>; }
        current <span class="op">=</span> current.right;
      }
    }
  }

  <span class="cm">// Search — O(log n) average</span>
  <span class="fn">find</span>(value) {
    <span class="kw">let</span> current <span class="op">=</span> <span class="kw">this</span>.root;
    <span class="kw">while</span> (current) {
      <span class="kw">if</span> (value <span class="op">===</span> current.value) <span class="kw">return</span> current;
      <span class="kw">if</span> (value <span class="op"><</span> current.value) current <span class="op">=</span> current.left;
      <span class="kw">else</span> current <span class="op">=</span> current.right;
    }
    <span class="kw">return null</span>;
  }

  <span class="cm">// Traversals</span>
  <span class="cm">// In-order: left, root, right → sorted order!</span>
  <span class="fn">inOrder</span>(node <span class="op">=</span> <span class="kw">this</span>.root, result <span class="op">=</span> []) {
    <span class="kw">if</span> (node) {
      <span class="kw">this</span>.<span class="fn">inOrder</span>(node.left, result);
      result.<span class="fn">push</span>(node.value);
      <span class="kw">this</span>.<span class="fn">inOrder</span>(node.right, result);
    }
    <span class="kw">return</span> result;
  }

  <span class="cm">// Pre-order: root, left, right → copy tree</span>
  <span class="fn">preOrder</span>(node <span class="op">=</span> <span class="kw">this</span>.root, result <span class="op">=</span> []) {
    <span class="kw">if</span> (node) {
      result.<span class="fn">push</span>(node.value);
      <span class="kw">this</span>.<span class="fn">preOrder</span>(node.left, result);
      <span class="kw">this</span>.<span class="fn">preOrder</span>(node.right, result);
    }
    <span class="kw">return</span> result;
  }

  <span class="cm">// Post-order: left, right, root → delete tree</span>
  <span class="fn">postOrder</span>(node <span class="op">=</span> <span class="kw">this</span>.root, result <span class="op">=</span> []) {
    <span class="kw">if</span> (node) {
      <span class="kw">this</span>.<span class="fn">postOrder</span>(node.left, result);
      <span class="kw">this</span>.<span class="fn">postOrder</span>(node.right, result);
      result.<span class="fn">push</span>(node.value);
    }
    <span class="kw">return</span> result;
  }
}

<span class="cm">// Usage</span>
<span class="kw">const</span> bst <span class="op">=</span> <span class="kw">new</span> <span class="cls">BST</span>();
bst.<span class="fn">insert</span>(<span class="num">15</span>).<span class="fn">insert</span>(<span class="num">10</span>).<span class="fn">insert</span>(<span class="num">20</span>).<span class="fn">insert</span>(<span class="num">8</span>).<span class="fn">insert</span>(<span class="num">12</span>);
console.<span class="fn">log</span>(bst.<span class="fn">inOrder</span>());  <span class="cm">// [8, 10, 12, 15, 20] — sorted!</span>
console.<span class="fn">log</span>(bst.<span class="fn">find</span>(<span class="num">10</span>));   <span class="cm">// TreeNode { value: 10, left, right }</span>`,
    complexity: [
      { op: 'Search (balanced)', time: 'O(log n)', badge: 'mid' },
      { op: 'Search (unbalanced)', time: 'O(n)', badge: 'slow' },
      { op: 'Insert (balanced)', time: 'O(log n)', badge: 'mid' },
      { op: 'Delete (balanced)', time: 'O(log n)', badge: 'mid' },
      { op: 'Traversal', time: 'O(n)', badge: 'slow' },
      { op: 'Find min/max', time: 'O(log n)', badge: 'mid' },
    ],
    pros: [
      'Hierarchical structure — naturally models parent-child relationships',
      'O(log n) search in balanced trees — much faster than O(n) linear scan',
      'In-order traversal gives sorted data — BST is a living sorted structure',
      'Dynamic size — grows as needed, no pre-allocation',
      'Foundation for many advanced structures — heaps, tries, B-trees',
    ],
    cons: [
      'Can become unbalanced — worst case degrades to O(n) (like a linked list)',
      'Self-balancing trees (AVL, Red-Black) are complex to implement',
      'More memory than arrays — each node stores value + two pointers minimum',
      'No constant-time access — must traverse from root',
      'Deletion logic is tricky — especially with two-child nodes',
    ],
    demoType: 'tree',
    keywords: ['tree', 'binary search tree', 'root', 'leaf', 'traversal', 'unbalanced', 'subtree'],
  },
);
