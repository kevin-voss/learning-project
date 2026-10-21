// JVM & Memory, lesson 5: objects and references on the heap, step by step.
(function () {
  const STEP_2 = 'flowchart LR\n  subgraph ST["Stack: frame of main"]\n    A["a"]\n    B["b"]\n  end\n  subgraph HP["Heap"]\n    R["Ball, color = red"]\n    BL["Ball, color = blue"]\n  end\n  A --> R\n  B --> BL';
  const STEP_3 = 'flowchart LR\n  subgraph ST["Stack: frame of main"]\n    A["a"]\n    B["b"]\n    C["c"]\n  end\n  subgraph HP["Heap"]\n    R["Ball, color = red"]\n    BL["Ball, color = blue"]\n  end\n  A --> R\n  C --> R\n  B --> BL';
  const STEP_4 = 'flowchart LR\n  subgraph ST["Stack: frame of main"]\n    A["a"]\n    B["b"]\n    C["c"]\n  end\n  subgraph HP["Heap"]\n    G["Ball, color = green"]\n    BL["Ball, color = blue"]\n  end\n  A --> G\n  C -->|"c.color = green"| G\n  B --> BL';
  const STEP_5 = 'flowchart LR\n  subgraph ST["Stack: frame of main"]\n    A["a = null"]\n    B["b"]\n    C["c"]\n  end\n  subgraph HP["Heap"]\n    G["Ball, color = green"]\n    BL["Ball, color = blue"]\n  end\n  C --> G\n  B --> BL';
  const STEP_6 = 'flowchart LR\n  subgraph ST["Stack: frame of main"]\n    A["a = null"]\n    B["b"]\n    C["c"]\n  end\n  subgraph HP["Heap"]\n    G["Ball, color = green"]\n    BL["Ball, color = blue: unreachable"]\n  end\n  C --> G\n  B --> G';

  Java.addCoreLessons('jvm-memory', [
    {
      id: 'heap-objects',
      title: 'Objects and References on the Heap, Step by Step',
      category: 'concept',
      icon: '→',
      tagline: 'Variables hold arrows, the heap holds the things',
      realWorld: 'Balloons on strings. The balloons float in a big room (the heap). Children hold the strings (the variables). Two children can hold strings to the same balloon. A balloon that nobody holds floats away.',
      kid: [
        'You get a red balloon. You do not hold the balloon itself. You hold its string.',
        'Your friend ties a second string to the same balloon. Now you both hold it. If your friend paints the balloon green, you see a green balloon too. It is the same balloon.',
        'If you let go of your string, the balloon is still there, because your friend still holds it.',
        'But a balloon that nobody holds any more floats away. In Java, the **garbage collector** catches those balloons and makes room for new ones.'
      ],
      definition: '`new` makes an object on the heap and gives you a **reference** to it. Assigning a reference (`c = a`) copies the arrow, never the object. An object that no variable or field can reach any more is **unreachable** and may be removed.',
      explain: [
        '[Classes and objects](../classes-and-objects/index.html) showed you `new` and fields. Here you follow one small program and draw the memory after every line, the way the JVM sees it.',
        'A **reference** is the address of an object on the heap: an arrow from the variable to the object. A variable of type `Ball` never contains a ball. It contains an arrow to a ball, or `null`, which means "no arrow".',
        'When you write `Ball c = a;`, Java copies the arrow in `a` into `c`. Now two arrows point to one object. This is called an **alias**: two names for the same thing. A change through one name is visible through the other.',
        '`==` on two references asks "do both arrows point to the same object?" It does not compare the fields. (For comparing content you use `equals`, as you saw with [strings](../strings/index.html).)',
        'Setting a variable to `null` or pointing it to another object removes one arrow. The object itself is not deleted by that. It only becomes garbage when the **last** arrow to it is gone.'
      ],
      why: 'Most surprises with objects come from aliases: "I changed `c`, why did `a` change too?" Drawing arrows makes the answer obvious, and it is the base for understanding garbage collection.',
      whenUse: 'Whenever two variables, fields or list entries might point to the same object, and whenever you assign `null` or a new object to a variable.',
      syntax: '`Type name = new Type(…);` → new object, one arrow. `other = name;` → second arrow, same object. `name = null;` → one arrow less. `a == b` → same object?',
      fileName: 'HeapSteps.java',
      code: `public class HeapSteps {
    public static void main(String[] args) {
        Ball a = new Ball("red");       // step 1: one object, one arrow
        Ball b = new Ball("blue");      // step 2: a second object
        Ball c = a;                     // step 3: copy the arrow, not the ball
        System.out.println("step 3: a == c is " + (a == c));

        c.color = "green";              // step 4: paint the ball through c
        System.out.println("step 4: a.color is " + a.color);

        a = null;                       // step 5: a lets go, c still holds the ball
        System.out.println("step 5: c.color is " + c.color);

        b = c;                          // step 6: nobody holds the blue ball now
        System.out.println("step 6: b.color is " + b.color);
        System.out.println("b == c is " + (b == c));
    }
}

class Ball {
    String color;

    Ball(String color) {
        this.color = color;
    }
}`,
      output: `step 3: a == c is true
step 4: a.color is green
step 5: c.color is green
step 6: b.color is green
b == c is true`,
      codeSummary: 'Three variables, two `Ball` objects. Each step adds, copies or removes an arrow. The sections below draw the memory after each step.',
      codeExplanation: [
        { label: 'Line 3', code: 'Ball a = new Ball("red");', text: '`new` reserves room for a `Ball` on the heap, runs the constructor and returns the reference. `a` (in the frame of `main`) stores that reference.' },
        { label: 'Line 4', code: 'Ball b = new Ball("blue");', text: 'A second, separate object. `a` and `b` point to different balls.' },
        { label: 'Line 5', code: 'Ball c = a;', text: 'No `new`, so no new object. The arrow in `a` is copied into `c`. Now `a` and `c` are aliases.' },
        { label: 'Line 6', code: '(a == c)', text: '`true`: both arrows point to the same object.' },
        { label: 'Line 8', code: 'c.color = "green";', text: 'Follows the arrow in `c` and changes the field of that object. It is the object `a` points to as well.' },
        { label: 'Line 9', code: 'a.color', text: 'Prints `green`. Nothing was copied, so there is only one ball to paint.' },
        { label: 'Line 11', code: 'a = null;', text: '`a` lets go. The green ball still has one arrow (from `c`), so it stays.' },
        { label: 'Line 14', code: 'b = c;', text: '`b` now points to the green ball. The blue ball has **no arrow left**: it is unreachable and the garbage collector may free it.' },
        { label: 'Line 16', code: '(b == c)', text: '`true`: `b` and `c` now point to the same green ball.' }
      ],
      sections: [
        {
          title: 'Steps 1 and 2: two objects, two arrows',
          text: ['After line 4 there are two `Ball` objects on the heap. Each has one arrow from a local variable in the frame of `main`.'],
          mermaid: STEP_2,
          diagramNote: 'The boxes on the left are variables in the stack frame. The boxes on the right are objects on the heap. An arrow is a reference.'
        },
        {
          title: 'Step 3: copy the arrow, not the ball',
          text: ['`Ball c = a;` makes no new ball. It gives the red ball a second arrow. `a == c` is `true`.'],
          mermaid: STEP_3,
          diagramNote: 'Still two objects, but now three arrows. Two of them point to the red ball.'
        },
        {
          title: 'Step 4: a change through one alias',
          text: ['`c.color = "green"` follows the arrow from `c` and changes the field inside the object. `a` points to the same object, so `a.color` is `"green"` too.'],
          mermaid: STEP_4,
          diagramNote: 'The object changed, not the arrows. Every alias sees the change.'
        },
        {
          title: 'Step 5: one arrow less',
          text: ['`a = null` removes the arrow from `a`. The green ball is still reachable through `c`, so nothing happens to it.'],
          mermaid: STEP_5,
          diagramNote: '`null` means "this variable points nowhere". Calling a method on `a` now would throw a `NullPointerException`.'
        },
        {
          title: 'Step 6: an object nobody can reach',
          text: [
            '`b = c` points `b` to the green ball. The blue ball has lost its last arrow. No variable and no field in the whole program can reach it any more. It is **unreachable**: garbage.',
            'Java does not free it at this very moment. The garbage collector frees it later, when it needs the room. The next lesson shows how it finds such objects.'
          ],
          mermaid: STEP_6,
          diagramNote: 'There is no way back to the blue ball: you cannot write any expression that reaches it. That is exactly what the garbage collector looks for.'
        },
        {
          title: 'Arrows inside objects',
          text: [
            'Fields can hold references too. Then the arrows go from object to object. Both kids below have a field `toy` that points to the same ball. Even after the local variable `ball` lets go, the ball stays reachable through the kids.'
          ],
          code: `public class SharedToy {
    public static void main(String[] args) {
        Ball ball = new Ball("red");
        Kid mia = new Kid("Mia", ball);
        Kid leo = new Kid("Leo", ball);     // both kids point to the same ball
        ball = null;                        // the local arrow is gone, the ball is not

        mia.toy.color = "yellow";           // Mia paints the shared ball
        System.out.println(leo.name + " sees a " + leo.toy.color + " ball");
        System.out.println("same ball: " + (mia.toy == leo.toy));
    }
}

class Ball {
    String color;

    Ball(String color) {
        this.color = color;
    }
}

class Kid {
    String name;
    Ball toy;                               // a field that holds a reference

    Kid(String name, Ball toy) {
        this.name = name;
        this.toy = toy;
    }
}`,
          fileName: 'SharedToy.java',
          output: `Leo sees a yellow ball
same ball: true`,
          tip: 'If you want two **separate** balls, you need two `new`: `new Kid("Leo", new Ball("red"))`. One `new` means one object, however many arrows point to it.'
        }
      ],
      technical: [
        '`Ball a = new Ball("red");` compiles to five instructions (check it with `javap -c HeapSteps`): `new` reserves memory on the heap and fills every field with its default (`null`, `0`, `false`), `dup` copies the reference, `ldc` pushes the string `"red"`, `invokespecial Ball.<init>` runs the constructor, and `astore_1` saves the reference in the slot of `a`.',
        'The heap memory for a small object is usually taken from a **TLAB** (thread-local allocation buffer): a piece of the heap that belongs to one thread, so `new` only has to move a pointer. That makes `new` very fast in Java.',
        'Every object has a small **header** (12 to 16 bytes in HotSpot) with a pointer to its class description and bits for the garbage collector and locking. A field `String color` holds a reference to a `String` object, which is itself on the heap. The diagrams draw the text inside the ball to keep them small.'
      ],
      tryIt: {
        steps: [
          'Save the example as `HeapSteps.java` and run `java HeapSteps.java`.',
          'On paper, draw the stack and the heap after line 5, like the diagram of step 3.',
          'Change line 5 to `Ball c = new Ball("red");` and run again.'
        ],
        see: 'Now `step 3: a == c is false` and `step 4: a.color is red`: `c` points to its own ball, so painting it does not touch `a`\'s ball.'
      },
      check: [
        { q: 'How many objects does `Ball x = new Ball("red"); Ball y = x;` make?', a: 'One. `y = x` copies the reference. Two arrows, one object.' },
        { q: 'What does `a == c` compare for two `Ball` variables?', a: 'Whether both arrows point to the same object. It does not look at the fields.' },
        { q: 'After `b = c;` in the example, why can the blue ball be removed?', a: 'Nothing points to it any more: no variable, no field. It is unreachable, so the garbage collector may free it.' }
      ],
      keyPoints: [
        '`new` makes an object on the heap and returns a reference to it.',
        'Assigning a reference copies the arrow, not the object: you get an alias.',
        'A change through one alias is visible through every alias.',
        '`==` on references checks "same object?".',
        'An object with no arrow left is unreachable: garbage.'
      ],
      commonMistakes: [
        'Expecting `Ball copy = original;` to make a copy: it is the same ball. Make a new one: `Ball copy = new Ball(original.color);`.',
        'Comparing content with `==`: `new Ball("red") == new Ball("red")` is `false`. Compare the fields (or write an `equals` method).',
        'Thinking `a = null;` deletes the object: it only removes one arrow. The object lives on while another arrow points to it.',
        'Calling a method on a variable after setting it to `null`: `NullPointerException`. Check `if (a != null)` first.'
      ],
      related: ['Classes and Objects', 'memory-areas', 'gc']
    }
  ]);
})();
