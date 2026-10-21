window.DS = window.DS || {};
DS.curriculum = DS.curriculum || [];

DS.curriculum.push({
  id: 'arrays',
  category: 'JavaScript Basics',
  title: 'Arrays',
  icon: 'fa-layer-group',
  subtitle: 'A shelf with numbered boxes. Each box holds one value.',
  demoType: 'array',
  keywords: ['array', 'index', 'zero-based'],
  relatedIds: ['logical-operators', 'big-o-notation', 'linked-lists'],
  subPages: [
    {
      id: 'picture',
      label: 'The picture',
      title: 'A shelf with numbered boxes',
      analogy: 'Think of a long shelf with boxes in a row. Every box has a number on it: 0, 1, 2, 3. You want box 2? You walk straight to box 2. You do not open box 0 and box 1 first.',
      whatIsIt: 'An array is a list of values in a row. Each value sits at a number called its index. The first index is 0, not 1. You read a value with its index: fruits[0].',
      demoTitle: 'Play with the shelf',
      demoHint: 'Type a number, then Push it onto the end. Pop takes the last one off. Every box shows its index.',
      codeTitle: 'Tiny example',
      codeLanguage: 'JavaScript',
      codeText: `const fruits = ['apple', 'banana', 'cherry'];

console.log(fruits[0]);      // apple
console.log(fruits[2]);      // cherry
console.log(fruits.length);  // 3

fruits[1] = 'kiwi';          // change box 1
console.log(fruits);         // ['apple', 'kiwi', 'cherry']`,
      tryIt: {
        steps: [
          'Open the browser console (F12, then the Console tab).',
          'Type: const pets = [\'cat\', \'dog\', \'fish\']',
          'Type: pets[1]',
          'Type: pets.length',
        ],
        result: '"dog" for pets[1], and 3 for pets.length.',
      },
      checklist: [
        'You can say what an index is and why the first one is 0.',
        'You can read and change one value with array[index].',
        'You can explain why reading box 500 is as quick as reading box 0.',
      ],
      check: [
        { q: 'const days = [\'Mon\', \'Tue\', \'Wed\']. What is days[1]?', a: '\'Tue\'. Counting starts at 0, so index 1 is the second box.' },
        { q: 'What is the last index of an array with 4 values?', a: '3. The indexes are 0, 1, 2 and 3.' },
        { q: 'What does days[10] give you?', a: 'undefined. There is no box with number 10.' },
      ],
    },
    {
      id: 'adding-removing',
      label: 'Adding and removing',
      title: 'Adding and removing values',
      analogy: 'Putting a new box at the end of the shelf is easy. Squeezing a box in at the front is hard: every other box must slide one place to the right first.',
      whatIsIt: 'push adds a value at the end. pop removes the last value. Both are quick. unshift adds at the front and shift removes from the front. Those must move every other value, so they get slow when the list is long.',
      codeTitle: 'Tiny example',
      codeLanguage: 'JavaScript',
      codeText: `const queue = ['Ana', 'Ben'];

queue.push('Cleo');      // end:   ['Ana', 'Ben', 'Cleo']  quick
queue.pop();             // end:   ['Ana', 'Ben']          quick

queue.unshift('Zoe');    // front: ['Zoe', 'Ana', 'Ben']   everyone slides
queue.shift();           // front: ['Ana', 'Ben']          everyone slides`,
      tryIt: {
        steps: [
          'In the demo above, Push three numbers.',
          'Type a new number and press Unshift.',
          'Watch the index under every other box.',
        ],
        result: 'Every old box moved one place to the right and got a new index.',
      },
      check: [
        { q: 'Which is quicker on a long list: push or unshift?', a: 'push. It only touches the end. unshift must slide every value.' },
        { q: 'After [1, 2, 3].pop(), what is left?', a: '[1, 2]. pop removes the last value.' },
      ],
    },
    {
      id: 'how-fast',
      label: 'How fast is it?',
      title: 'Quick and slow jobs',
      demoType: null,
      whatIsIt: 'Some array jobs take the same time for 10 values or 10,000 values. Others get slow when the list is long, because they touch many boxes. Later, in Java 3, the Big-O lesson gives these speeds short names.',
      conceptSections: [
        { icon: 'fa-bolt', title: 'Read box i', desc: 'Quick. You jump straight to the box.', example: 'scores[500]' },
        { icon: 'fa-bolt', title: 'Add or remove at the end', desc: 'Quick. Nothing else has to move.', example: 'push, pop' },
        { icon: 'fa-hourglass-half', title: 'Add or remove at the front or middle', desc: 'Slow when the list is long. Every later box slides.', example: 'unshift, shift, splice' },
        { icon: 'fa-hourglass-half', title: 'Find a value', desc: 'Slow when the list is long. You may have to look in every box.', example: 'indexOf, includes' },
      ],
      check: [
        { q: 'You search for \'kiwi\' in a list of 1 million fruits. Why can it be slow?', a: 'The computer may have to look at every box until it finds kiwi.' },
      ],
    },
    {
      id: 'look-inside',
      label: 'Look inside',
      title: 'Look inside: build one yourself',
      demoType: null,
      whatIsIt: 'In memory, an array is one block of boxes side by side. Box i sits at "start + i". That is why reading any index is quick. A JavaScript array can grow. Under the hood, a full shelf is copied to a bigger shelf. This tiny class does the same with a fixed-size box row.',
      codeTitle: 'A growing shelf (read it, then run it in the console)',
      codeLanguage: 'JavaScript',
      codeText: `class Shelf {
  constructor() {
    this.boxes = new Array(2);   // room for 2 values
    this.size = 0;               // values stored so far
  }
  push(value) {
    if (this.size === this.boxes.length) {
      const bigger = new Array(this.boxes.length * 2);
      for (let i = 0; i < this.size; i++) bigger[i] = this.boxes[i];
      this.boxes = bigger;       // move to a shelf twice as big
    }
    this.boxes[this.size] = value;
    this.size++;
  }
  get(index) {
    return this.boxes[index];
  }
}

const s = new Shelf();
s.push('a'); s.push('b'); s.push('c');   // the third push grows the shelf
console.log(s.get(2), s.boxes.length);   // c 4`,
      check: [
        { q: 'Why does the Shelf class copy everything sometimes?', a: 'The old row of boxes is full. It needs a bigger row, so it copies the values over.' },
      ],
    },
  ],
});
