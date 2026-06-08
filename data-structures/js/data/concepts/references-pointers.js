window.DS = window.DS || {};
DS.curriculum = DS.curriculum || [];

DS.curriculum.push({
  id: 'references-pointers',
  category: 'Foundations',
  title: 'Pointers and References',
  icon: 'fa-location-arrow',
  number: '03',
  subtitle: 'A reference tells a program where an object lives instead of copying the whole object.',
  analogy: 'A reference is like a home address. If I give you my address, I did not give you my house. I gave you a way to find it. If two people have the same address, they both visit the same house.',
  realWorldExample: {
    title: 'Objects shared by variables',
    desc: 'In JavaScript, assigning an object to another variable does not copy the whole object. Both variables point to the same object. If one variable changes a property, the other variable sees the change because they reference the same thing.',
  },
  whatIsIt: 'A pointer or reference is a value that points to another place in memory. Lower-level languages often say pointer. JavaScript usually says reference. The key idea is the same: arrays and objects are not always copied when assigned. A variable can hold a reference to the object. null means the reference points to nothing.',
  whyUse: 'References are the glue behind linked lists, trees, and graphs. A linked list node has a reference to the next node. A tree node has references to child nodes. A graph node can keep references to many neighbors. Changing references is how these structures connect, disconnect, grow, and shrink.',
  conceptSections: [
    {
      icon: 'fa-tag',
      title: 'Variable',
      desc: 'A variable is a name your code uses. For objects and arrays, the variable usually stores a reference to where the data lives.',
      example: 'userA does not contain the whole user object. It contains a way to find it.',
    },
    {
      icon: 'fa-map-marker-alt',
      title: 'Address',
      desc: 'An address is the memory location where data can be found. The demo uses fake addresses like 0xA100 to make this visible.',
      example: 'Two variables with the same address reach the same object.',
    },
    {
      icon: 'fa-box',
      title: 'Object in heap memory',
      desc: 'Objects often live in heap memory because they may need to outlive one function call.',
      example: 'The object { name: "Ada", score: 10 } lives separately from the variable names.',
    },
    {
      icon: 'fa-link',
      title: 'Shared reference',
      desc: 'If two variables reference the same object, changing the object through one variable is visible through the other.',
      example: 'userB.score += 5 changes the shared object, so userA.score changes too.',
    },
  ],
  conceptFlow: ['Variable name', 'Reference / address', 'Object in heap memory', 'Properties and values'],
  codeExample: `<span class="cm">// Both variables reference the same object</span>
<span class="kw">const</span> userA <span class="op">=</span> { name: <span class="str">'Ada'</span>, score: <span class="num">10</span> };
<span class="kw">const</span> userB <span class="op">=</span> userA;

userB.score <span class="op">=</span> <span class="num">20</span>;

console.<span class="fn">log</span>(userA.score); <span class="cm">// 20, because userA and userB point to the same object</span>

<span class="cm">// Linked list style reference</span>
<span class="kw">const</span> node1 <span class="op">=</span> { value: <span class="num">10</span>, next: <span class="kw">null</span> };
<span class="kw">const</span> node2 <span class="op">=</span> { value: <span class="num">20</span>, next: <span class="kw">null</span> };
node1.next <span class="op">=</span> node2;`,
  demoType: 'pointer',
  keywords: ['pointer', 'reference', 'variable', 'address', 'heap memory', 'null'],
});
