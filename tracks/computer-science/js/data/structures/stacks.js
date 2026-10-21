window.DS = window.DS || {};
DS.curriculum = DS.curriculum || [];

DS.curriculum.push({
  id: 'stacks',
  category: 'Java 2: Data Structures',
  title: 'Stacks',
  icon: 'fa-inbox',
  subtitle: 'A pile of plates. You only touch the top one.',
  demoType: 'stack',
  keywords: ['stack', 'lifo', 'push', 'pop'],
  relatedIds: ['queues', 'stack-heap-gc', 'recursion-call-stack'],
  subPages: [
    {
      id: 'picture',
      label: 'The picture',
      title: 'A pile of plates',
      analogy: 'Think of clean plates in a kitchen. You put a new plate on top. You take a plate from the top. You never pull one from the middle. The last plate you put on is the first plate you take off.',
      whatIsIt: 'A stack keeps values in a pile. push puts a value on top. pop takes the top value off. peek looks at the top without taking it. This rule has a name: Last In, First Out (LIFO).',
      realWorldExample: {
        title: 'The Undo button',
        desc: 'Every change you make is pushed onto a stack. Undo pops the newest change first. That is why Undo walks backwards, one step at a time.',
      },
      demoTitle: 'Stack some plates',
      demoHint: 'Push numbers on top, Pop them off, Peek at the top.',
      codeTitle: 'Tiny example: a stack in Java',
      codeLanguage: 'Java',
      codeText: `import java.util.ArrayDeque;

ArrayDeque<String> plates = new ArrayDeque<>();
plates.push("red");
plates.push("blue");
plates.push("green");                 // green is on top
System.out.println(plates.peek());    // green
System.out.println(plates.pop());     // green
System.out.println(plates.pop());     // blue`,
      tryIt: {
        steps: [
          'In the demo, Push 1, then 2, then 3.',
          'Press Pop once.',
          'Press Peek.',
        ],
        result: 'Pop takes 3 off. Peek then shows 2 on top.',
      },
      checklist: [
        'You can explain push, pop and peek with a pile of plates.',
        'You can say what Last In, First Out means and give one real example.',
        'You can predict what pop returns after a few pushes.',
      ],
      check: [
        { q: 'You push A, then B, then C. What does pop return?', a: 'C. It was the last one in, so it is the first one out.' },
        { q: 'What is the difference between pop and peek?', a: 'pop takes the top value off. peek only looks at it.' },
        { q: 'Why is Undo a stack?', a: 'You want to undo the newest change first, then the one before it.' },
      ],
    },
    {
      id: 'where-you-meet-it',
      label: 'Where you meet it',
      title: 'Where you meet stacks',
      demoType: null,
      whatIsIt: 'Stacks are everywhere a program must "remember and come back". The most famous one is the call stack: Java keeps one plate per method that is running. You meet it again in the stack and heap lesson.',
      whenToUse: [
        { icon: 'fa-rotate-left', title: 'Undo and redo', desc: 'Text editors and drawing apps push every action.' },
        { icon: 'fa-code', title: 'Method calls', desc: 'The call stack remembers where to go back when a method ends.' },
        { icon: 'fa-arrow-right-arrow-left', title: 'Matching brackets', desc: 'Push every ( and pop it when the matching ) arrives.' },
        { icon: 'fa-arrow-left', title: 'Back button', desc: 'Each page you open is pushed. Back pops the newest page.' },
      ],
      check: [
        { q: 'Name two places a stack is used.', a: 'For example: Undo, the browser Back button, method calls, matching brackets.' },
      ],
    },
    {
      id: 'look-inside',
      label: 'Look inside',
      title: 'Look inside: build one yourself',
      demoType: null,
      whatIsIt: 'A stack can be an array plus one number: how many plates are on the pile. push writes into the next free box. pop steps back one box. Type this into Main.java and try it.',
      codeTitle: 'A tiny stack in Java',
      codeLanguage: 'Java',
      codeText: `class PlateStack {
    private String[] plates = new String[10];
    private int count = 0;            // how many plates are on the pile

    void push(String plate) {
        plates[count] = plate;        // put it in the next free box
        count++;
    }

    String pop() {
        if (count == 0) throw new IllegalStateException("No plates left");
        count--;
        return plates[count];         // the top plate
    }

    String peek() {
        return count == 0 ? null : plates[count - 1];
    }
}

// PlateStack s = new PlateStack(); s.push("red"); s.push("blue");
// System.out.println(s.pop());   // blue`,
      check: [
        { q: 'What happens if you call pop() on an empty PlateStack?', a: 'It throws an IllegalStateException with the message "No plates left".' },
        { q: 'What goes wrong after 10 pushes? How could you fix it?', a: 'The array is full. Copy the plates into a bigger array first, like an ArrayList does.' },
      ],
    },
  ],
});
