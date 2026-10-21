// Lesson 08: stack, heap and references (frames, objects, moving arrows, garbage collection).
(function () {
  const topic = Java.topics.typesAndVariables;

  topic.lessons.push({
    num: '08',
    id: 'stack-heap-references',
    anim: 'memory',
    title: 'Stack, Heap, References',
    category: 'variables',
    icon: 'mem',
    tagline: 'Where values really live',
    realWorld: 'The stack is a pile of plates: you put a plate on top, and you take the top plate off first. The heap is a big toy box where toys lie anywhere. A reference is a sticky note on a plate: "the red car is in the toy box".',
    kid: [
      'Java keeps two places for your boxes. One is a neat pile, called the stack. Every time a job starts, a new tray goes on top of the pile, with all the little boxes for that job. When the job is done, the tray is taken off again.',
      'The other place is a big room, called the heap. Big things, like a student card with a name and points, live in that room.',
      'The little boxes on the tray do not hold the big things. They hold sticky notes that say where in the big room each thing is. When nobody has a note for a thing anymore, a cleaner comes and takes it away.'
    ],
    definition: 'Java memory has two main parts. The **stack** holds one **frame** per running method, with that method’s local variables. The **heap** holds every object made with `new`. A reference variable on the stack points to its object on the heap.',
    explain: [
      'A **method** is a named piece of code that you can run, like `main`. A method can get values, work with them and give a result back with `return`. You learn to write methods in [Methods](../methods/index.html). Here you only need: every time a method starts, it gets a fresh frame.',
      'A **frame** is the space for one method call. It holds the local variables of that call: primitives with their values, and references with their arrows. When the method ends, its frame is removed from the top of the stack, and all its local variables are gone at once.',
      'The **heap** is one big shared area for objects. `new Student()` puts a Student object there, with its fields. Strings are objects too, so they also live on the heap. An object does not belong to one frame: it stays as long as some reference points to it.',
      'Assigning a new object to a reference variable moves the arrow. The old object is not changed or deleted by that. If no reference points to an object anymore, nobody can ever reach it again. The **garbage collector**, a part of the JVM, finds such objects and frees their memory.',
      'That is the whole model: primitives in the frame hold values, reference variables in the frame hold arrows, objects sit on the heap. With it you can explain copying, `==`, `final` references and `null`.'
    ],
    why: 'It explains why a change to an object is seen through every reference to it, why local variables vanish when a method ends, and why you never delete objects by hand in Java.',
    whenUse: 'When object changes surprise you, when you draw what your program does on paper, and later when you read about memory errors.',
    syntax: '`int n = 5;` value in the frame · `Student s = new Student();` object on the heap, arrow in the frame · `s = new Student();` the arrow moves',
    mermaid: `flowchart LR
  subgraph S["Stack: frame of main"]
    b["bonus: 5"]
    a["ari: arrow"]
    s["sameAri: arrow"]
  end
  subgraph H["Heap: objects"]
    o1["Student object: points = 11"]
    n1["String object 'Ari'"]
  end
  a --> o1
  s --> o1
  o1 -->|name| n1`,
    visualLabel: 'Stack and heap after line 20',
    visualNote: '`bonus` holds the number itself. `ari` and `sameAri` hold two arrows to one Student. The Student’s `name` field is itself a reference to a String object.',
    fileName: 'MemoryWalk.java',
    code: `public class MemoryWalk {
    static class Student {
        String name;
        int points;
    }

    // A helper method: it gets its own frame on the stack
    static int doubled(int value) {
        int result = value * 2;
        return result;
    }

    public static void main(String[] args) {
        int bonus = 5;                    // stack: the number 5
        Student ari = new Student();      // heap: object, stack: arrow
        ari.name = "Ari";
        ari.points = doubled(bonus);      // a new frame comes and goes

        Student sameAri = ari;            // a second arrow, same object
        sameAri.points = sameAri.points + 1;

        ari = new Student();              // ari now points to a new object
        ari.name = "Bo";

        System.out.println(sameAri.name + " has " + sameAri.points + " points");
        System.out.println(ari.name + " has " + ari.points + " points");
    }
}`,
    output: `Ari has 11 points
Bo has 0 points`,
    codeSummary: 'One primitive, two objects, a short method call with its own frame, and an arrow that moves to a new object.',
    codeExplanation: [
      { label: 'Line 8', code: 'static int doubled(int value) {', text: 'A helper method. Each call gets its own frame with the locals `value` and `result`.' },
      { label: 'Line 14', code: 'int bonus = 5;                    // stack: the number 5', text: 'A primitive local: the number 5 sits directly in `main`’s frame.' },
      { label: 'Line 15', code: 'Student ari = new Student();      // heap: object, stack: arrow', text: '`new` makes a Student on the heap (`name` is `null`, `points` is `0`). `ari` in the frame gets the arrow.' },
      { label: 'Line 16', code: 'ari.name = "Ari";', text: 'The field `name` now points to the String object `"Ari"`, also on the heap.' },
      { label: 'Line 17', code: 'ari.points = doubled(bonus);      // a new frame comes and goes', text: 'Calling `doubled` puts a new frame on top of the stack. It returns `10`, its frame is removed, and `10` goes into the object.' },
      { label: 'Line 19', code: 'Student sameAri = ari;            // a second arrow, same object', text: 'Copies the arrow. No new Student is made.' },
      { label: 'Line 20', code: 'sameAri.points = sameAri.points + 1;', text: 'Changes the one shared object: `points` is now `11`. The big picture above shows this moment.' },
      { label: 'Line 22', code: 'ari = new Student();              // ari now points to a new object', text: 'A second Student is made, and only the arrow in `ari` moves to it. The first Student is untouched, and `sameAri` still points to it.' },
      { label: 'Line 25', code: 'System.out.println(sameAri.name + " has " + sameAri.points + " points");', text: 'Follows `sameAri` to the first Student: `Ari has 11 points`.' },
      { label: 'Line 26', code: 'System.out.println(ari.name + " has " + ari.points + " points");', text: 'Follows `ari` to the new Student. Its `points` field was never set, so it has the default `0`.' }
    ],
    sections: [
      {
        title: 'The stack: one frame per method call',
        text: [
          'The stack grows and shrinks like a pile of plates. When `main` calls `doubled(bonus)`, a new frame goes on top. It gets a copy of the value `5` in its own local `value`. When `doubled` returns, its frame is taken off, and `value` and `result` are gone.',
          'Only the frame on top is running. `main` waits until `doubled` is done.'
        ],
        mermaid: `sequenceDiagram
  participant M as frame of main
  participant D as frame of doubled
  M->>D: doubled(5): new frame, value = 5
  Note over D: result = 10
  D-->>M: return 10, frame removed
  Note over M: ari.points = 10`,
        diagramNote: 'Local variables live only as long as their frame. That is why they vanish when a method ends.'
      },
      {
        title: 'Moving an arrow does not move the object',
        text: [
          'Line 22, `ari = new Student();`, is the line that surprises people. It does not change the first Student. It makes a second Student and moves only the arrow in `ari`.',
          'Here is the memory after line 23. The first Student is still alive, because `sameAri` points to it.'
        ],
        mermaid: `flowchart LR
  subgraph S["Stack: frame of main"]
    a["ari: arrow"]
    s["sameAri: arrow"]
  end
  subgraph H["Heap"]
    o1["Student: name 'Ari', points = 11"]
    o2["Student: name 'Bo', points = 0"]
  end
  s --> o1
  a --> o2`,
        diagramNote: 'Two arrows, two objects. Changing the box (the arrow) and changing the object (its fields) are two different things.'
      },
      {
        title: 'The garbage collector cleans up',
        text: [
          'In Java you never delete an object yourself. When no reference points to an object anymore, no code can reach it. The garbage collector finds such objects from time to time and gives their memory back.',
          'Below, `jar` first points to object 1. After `jar = new Jar();` it points to object 2, and object 1 has no arrow left. It is now **garbage**: it will be collected at some point, and you cannot know exactly when.'
        ],
        mermaid: `flowchart LR
  subgraph S["Stack"]
    j["jar: arrow"]
  end
  subgraph H["Heap"]
    J1["Jar 1: no arrow left, garbage"]
    J2["Jar 2"]
  end
  j --> J2`,
        tip: 'You can make an object unreachable on purpose with `jar = null;` (see the lesson null). In normal code you rarely need to: when a method ends, its frame and all its arrows are gone anyway.'
      },
      {
        title: 'Stack and heap at a glance',
        table: {
          head: ['', 'Stack', 'Heap'],
          rows: [
            ['What lives there', 'frames with local variables (values and arrows)', 'objects with their fields, Strings too'],
            ['Made by', 'calling a method', '`new` (and String literals)'],
            ['Gone when', 'the method returns', 'no reference points to it and the garbage collector runs'],
            ['Size', 'small (often about 1 MB per thread)', 'big (often hundreds of MB or more)'],
            ['Error when full', '`StackOverflowError` (too many calls inside calls)', '`OutOfMemoryError` (too many live objects)']
          ],
          note: 'A **thread** is one line of work in a program. Each thread has its own stack, and all threads share one heap. Your programs so far have one thread: the one that runs `main`.'
        }
      }
    ],
    technical: [
      'A JVM frame holds two things: an array of local variable slots (the variables you declared and the method’s parameters) and a small **operand stack** where the bytecode does its maths. `int result = value * 2;` becomes "load slot 0, push 2, multiply, store into slot 1".',
      'The heap is managed by the garbage collector. Modern collectors split the heap by age: most objects die young, so new objects go to a young area that is cleaned often and fast, and long-living objects move to an old area. The collector finds live objects by following references, starting from the frames on all stacks and from static fields. Everything it cannot reach is garbage.',
      'The JVM is allowed to optimize: if an object never leaves a method, the JIT compiler (the part that turns bytecode into machine code while the program runs) may avoid the heap for it. Your program behaves exactly as if the object were on the heap, so the model in this lesson stays right. The details are in [JVM & Memory](../jvm-memory/index.html).'
    ],
    tryIt: {
      steps: [
        'On paper, draw two columns: "Stack" and "Heap".',
        'Go through `MemoryWalk.java` line by line. Draw a box in the stack for each local variable and a box in the heap for each `new`. Draw arrows for references.',
        'Predict both output lines from your drawing, then copy the program and run it.'
      ],
      see: 'your drawing shows two Students and the output is `Ari has 11 points` and `Bo has 0 points`.'
    },
    check: [
      { q: 'Where does the number in `int bonus = 5;` live, and where does the object in `new Student()` live?', a: 'The `5` lives in the frame of `main` on the stack. The Student object lives on the heap. `ari` (in the frame) holds the arrow to it.' },
      { q: 'What happens to the local variables of `doubled` when it returns?', a: 'Its frame is removed from the stack, so `value` and `result` are gone.' },
      { q: 'When can the garbage collector remove an object?', a: 'When no reference points to it anymore, so no code can reach it.' }
    ],
    keyPoints: [
      'The stack has one frame per running method, with its local variables.',
      'The heap holds all objects, made with `new`.',
      'A reference variable sits in a frame and points to an object on the heap.',
      'Assigning a reference moves the arrow. It never changes or copies the object.',
      'Objects without any arrow are removed by the garbage collector.'
    ],
    commonMistakes: [
      'Thinking `ari = new Student();` changes the old Student. Fix: it builds a new one and moves only the arrow.',
      'Thinking objects die when the method that made them ends. Fix: they live as long as any reference points to them.',
      'Trying to delete an object by hand. Fix: Java has no `delete`. Drop the references and the garbage collector does the rest.',
      'Drawing the object inside the variable box. Fix: draw the object on the heap and an arrow from the box.'
    ],
    related: ['Primitives vs Reference Types', 'null', 'Default Values', 'JVM & Memory'],
    glossary: topic.glossary
  });
})();
