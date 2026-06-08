window.DS = window.DS || {};
DS.curriculum = DS.curriculum || [];

DS.curriculum.push(
{
    id: 'stacks',
    title: 'Stacks',
    icon: 'fa-inbox',
    number: '03',
    subtitle: 'Last In, First Out — like a stack of plates where you can only touch the top.',
    analogy: 'Think of a stack of plates in a cafeteria. You can only add a plate to the top (push), and you can only take the top plate off (pop). You can\'t pull a plate from the middle without removing all the plates above it first. This Last In, First Out (LIFO) behavior is exactly how a stack works. The last element you put in is the first one that comes out.',
    realWorldExample: {
      title: 'Undo button in a text editor',
      desc: 'Every time you type, delete, or paste, the editor pushes that action onto an undo stack. When you press Undo, the most recent action is popped first. That is why Undo walks backward through your work one step at a time.',
    },
    whatIsIt: 'A stack is a linear data structure that follows the LIFO (Last In, First Out) principle. You can only add (push) and remove (pop) elements from one end — called the "top." Think of it as a constrained array or linked list where you\'re only allowed to operate on one side. Despite its simplicity, stacks are incredibly powerful and are used everywhere in computing — from function call management to undo systems to expression parsing.',
    whyUse: 'Stacks model any real-world scenario where the most recent item needs to be processed first. When your code calls a function, the return address is pushed onto a stack — when the function finishes, it pops back to where it was. When you press Ctrl+Z, the most recent action is popped from the undo stack. When a compiler checks for balanced parentheses, it pushes opening brackets and pops them when closing brackets appear. Any time you need to "remember and return" in reverse order, stacks are the answer.',
    whenToUse: [
      { icon: 'fa-rotate-left', title: 'Undo/Redo systems', desc: 'Text editors, design tools — each action is pushed, undo pops it.' },
      { icon: 'fa-code', title: 'Function call management', desc: 'The call stack tracks where to return after each function completes.' },
      { icon: 'fa-arrow-right-arrow-left', title: 'Balanced delimiters', desc: 'Compilers use stacks to match brackets, HTML tags, etc.' },
      { icon: 'fa-clock-rotate-left', title: 'Backtracking algorithms', desc: 'Maze solving, DFS traversal — push choices, pop when stuck.' },
    ],
    codeExample: `<span class="cm">// === Stack Implementation using Array ===</span>

<span class="kw">class</span> <span class="cls">Stack</span> {
  <span class="fn">constructor</span>() {
    <span class="kw">this</span>.items <span class="op">=</span> [];
  }

  <span class="cm">// Add to top — O(1)</span>
  <span class="fn">push</span>(element) {
    <span class="kw">this</span>.items.<span class="fn">push</span>(element);
  }

  <span class="cm">// Remove from top — O(1)</span>
  <span class="fn">pop</span>() {
    <span class="kw">if</span> (<span class="kw">this</span>.<span class="fn">isEmpty</span>()) <span class="kw">return</span> <span class="str">'Stack is empty'</span>;
    <span class="kw">return this</span>.items.<span class="fn">pop</span>();
  }

  <span class="cm">// View top element without removing — O(1)</span>
  <span class="fn">peek</span>() {
    <span class="kw">if</span> (<span class="kw">this</span>.<span class="fn">isEmpty</span>()) <span class="kw">return</span> <span class="str">'Stack is empty'</span>;
    <span class="kw">return this</span>.items[<span class="kw">this</span>.items.length <span class="op">-</span> <span class="num">1</span>];
  }

  <span class="cm">// Check if empty — O(1)</span>
  <span class="fn">isEmpty</span>() {
    <span class="kw">return this</span>.items.length <span class="op">===</span> <span class="num">0</span>;
  }

  <span class="cm">// Get size — O(1)</span>
  <span class="fn">size</span>() {
    <span class="kw">return this</span>.items.length;
  }

  <span class="fn">clear</span>() {
    <span class="kw">this</span>.items <span class="op">=</span> [];
  }
}

<span class="cm">// Real-world example: Undo system</span>
<span class="kw">const</span> undoStack <span class="op">=</span> <span class="kw">new</span> <span class="cls">Stack</span>();

<span class="kw">function</span> <span class="fn">performAction</span>(action) {
  undoStack.<span class="fn">push</span>(action);
  console.<span class="fn">log</span>(<span class="str">\`Performed: \${action}\`</span>);
}

<span class="kw">function</span> <span class="fn">undo</span>() {
  <span class="kw">const</span> action <span class="op">=</span> undoStack.<span class="fn">pop</span>();
  console.<span class="fn">log</span>(<span class="str">\`Undone: \${action}\`</span>);
}

<span class="fn">performAction</span>(<span class="str">'Type "Hello"'</span>);
<span class="fn">performAction</span>(<span class="str">'Type " World"'</span>);
<span class="fn">performAction</span>(<span class="str">'Delete last word'</span>);
<span class="fn">undo</span>(); <span class="cm">// Undone: Delete last word</span>
<span class="fn">undo</span>(); <span class="cm">// Undone: Type " World"</span>

<span class="cm">// Practical: Valid parentheses checker</span>
<span class="kw">function</span> <span class="fn">isValid</span>(str) {
  <span class="kw">const</span> stack <span class="op">=</span> [];
  <span class="kw">const</span> map <span class="op">=</span> { <span class="str">')'</span>: <span class="str">'('</span>, <span class="str">']'</span>: <span class="str">'['</span>, <span class="str">'}'</span>: <span class="str">'{'</span> };
  <span class="kw">for</span> (<span class="kw">const</span> char <span class="kw">of</span> str) {
    <span class="kw">if</span> (<span class="str">'([{'</span>.<span class="fn">includes</span>(char)) {
      stack.<span class="fn">push</span>(char);
    } <span class="kw">else if</span> (map[char]) {
      <span class="kw">if</span> (stack.<span class="fn">pop</span>() <span class="op">!==</span> map[char]) <span class="kw">return false</span>;
    }
  }
  <span class="kw">return</span> stack.length <span class="op">===</span> <span class="num">0</span>;
}
console.<span class="fn">log</span>(<span class="fn">isValid</span>(<span class="str">'({[]})'</span>)); <span class="cm">// true</span>
console.<span class="fn">log</span>(<span class="fn">isValid</span>(<span class="str">'({[})'</span>));  <span class="cm">// false</span>`,
    complexity: [
      { op: 'Push (add to top)', time: 'O(1)', badge: 'fast' },
      { op: 'Pop (remove from top)', time: 'O(1)', badge: 'fast' },
      { op: 'Peek (view top)', time: 'O(1)', badge: 'fast' },
      { op: 'Search', time: 'O(n)', badge: 'slow' },
      { op: 'Access by position', time: 'O(n)', badge: 'slow' },
    ],
    pros: [
      'Simple and intuitive — only two main operations: push and pop',
      'All key operations are O(1) — constant time, very fast',
      'Models LIFO behavior naturally — perfect for undo, backtracking',
      'Easy to implement — array-backed or linked-list-backed',
      'Used internally by every program (the call stack)',
    ],
    cons: [
      'LIFO only — you can\'t access arbitrary elements in the middle',
      'Limited access pattern — not suitable when you need random access',
      'Stack overflow — deep recursion or too many pushes can exhaust memory',
      'No searching — to find an element you must pop everything above it',
    ],
    demoType: 'stack',
    keywords: ['stack', 'lifo', 'push', 'pop', 'call stack', 'backtracking'],
  },
);
