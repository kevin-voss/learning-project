(function () {
  const terms = Java.topicDetails['classes-and-objects'].glossary;

  Java.addCoreLessons('classes-and-objects', [{
    id: 'new-and-memory',
    title: 'Creating Objects with new',
    category: 'concept',
    icon: 'N',
    tagline: 'Variables hold arrows, objects live on the heap',
    glossary: terms,
    realWorld: 'Balloons at a party. The balloon floats near the ceiling. You hold only its string. Two children can hold two strings tied to the same balloon — paint a face on it, and both see the face.',
    kid: [
      '`new` blows up a balloon (the object) into the **heap**. Your variable holds the **string** (a **reference**), not the balloon. Second string on the same balloon = still one. Second `new` = two balloons.'
    ],
    definition: '`new ClassName()` makes a new object on the **heap**, fills its fields, and gives back a **reference**. A variable of a class type stores that reference (an arrow), never the object itself.',
    explain: [
      'Locals live on the **stack**; objects on the **heap** (see [Types and Variables](../types-and-variables/index.html)). `Dog rex = new Dog();` makes a stack variable, reserves a `Dog` on the heap, runs the constructor, then stores the arrow in `rex`.',
      'Every `new` = one more object. `Dog other = rex;` copies the arrow only — **aliases**. A change through `other` shows through `rex`.',
      '`==` on objects compares arrows ("same object?"). For "same values?" you write `equals` later.'
    ],
    why: 'Objects can be big, and many parts of a program need the same one. Passing an arrow is cheap.',
    whenUse: '`new` for one more separate thing. `b = a` when two places must share the same thing.',
    syntax: '`ClassName variable = new ClassName();` — left: reference variable, right: make the object.',
    mermaid: `flowchart LR
  subgraph S["Stack: main"]
    R["rex"]
    O["other"]
  end
  subgraph H["Heap"]
    D["Dog object: name = Max"]
  end
  R --> D
  O --> D`,
    visualLabel: 'Two references, one object',
    visualNote: 'After `Dog other = rex;`, both point to the same dog. `other.name = "Max"` changes what `rex.name` shows.',
    fileName: 'MemoryDemo.java',
    code: `public class MemoryDemo {
    public static void main(String[] args) {
        Dog a = new Dog();   // object 1
        a.name = "Rex";
        Dog b = new Dog();   // object 2, a twin with the same name
        b.name = "Rex";
        Dog c = a;           // no new object: c gets a copy of a's arrow

        c.name = "Max";      // changes object 1

        System.out.println("a.name = " + a.name);
        System.out.println("b.name = " + b.name);
        System.out.println("c.name = " + c.name);
        System.out.println("a == b: " + (a == b));
        System.out.println("a == c: " + (a == c));
    }
}

class Dog {
    String name;
}`,
    output: `a.name = Max
b.name = Rex
c.name = Max
a == b: false
a == c: true`,
    codeSummary: 'Two `new` → two objects. `c = a` copies the arrow. Changing `c.name` changes what `a` sees. `==` shows who shares an object.',
    codeExplanation: [
      { label: 'Line 3', code: 'Dog a = new Dog();   // object 1', text: 'First object on the heap. `a` gets the arrow.' },
      { label: 'Line 5', code: 'Dog b = new Dog();   // object 2, a twin with the same name', text: 'Second `new` → second object.' },
      { label: 'Line 7', code: 'Dog c = a;           // no new object: c gets a copy of a\'s arrow', text: 'No `new`. `a` and `c` are aliases for object 1.' },
      { label: 'Line 9', code: 'c.name = "Max";      // changes object 1', text: 'Changes object 1. `a.name` shows `Max` too.' },
      { label: 'Line 14', code: 'System.out.println("a == b: " + (a == b));', text: '`false`: different arrows, even if both were named Rex.' }
    ],
    sections: [
      {
        title: 'What new does',
        mermaid: `flowchart TD
  A["1. Dog rex on the stack"] --> B["2. new: reserve heap memory"]
  B --> C["3. default fields (0, false, null)"]
  C --> D["4. initializers + constructor"]
  D --> E["5. store the reference in rex"]`,
        diagramNote: 'Steps 2–4 belong to `new`. The constructor is the next lesson.',
        table: {
          head: ['Code', 'Objects', 'Change through one variable'],
          rows: [
            ['`new` twice', '2', 'Only that one object'],
            ['`Dog c = a;`', '1', 'Visible through both'],
            ['`a = new Dog();` again', '2, first may be lost', 'Nobody can reach the first if nothing else points to it']
          ]
        }
      },
      {
        title: 'Two objects or one?',
        mermaid: `flowchart LR
  subgraph S["Stack: main"]
    A["a"]
    B["b"]
    C["c"]
  end
  subgraph H["Heap"]
    O1["Dog 1: name = Max"]
    O2["Dog 2: name = Rex"]
  end
  A --> O1
  C --> O1
  B --> O2`,
        diagramNote: 'Three variables, two objects. Count the `new`.'
      },
      {
        title: 'Passing an object to a method',
        text: [
          'Java copies the **arrow** into the parameter. The method can change the shared object’s fields. `d = new Dog();` only moves the method’s own copy of the arrow — the caller still points to the old object.'
        ],
        fileName: 'PassObject.java',
        code: `public class PassObject {
    public static void main(String[] args) {
        Dog rex = new Dog();
        rex.name = "Rex";

        rename(rex);
        System.out.println("after rename:  " + rex.name);

        replace(rex);
        System.out.println("after replace: " + rex.name);
    }

    static void rename(Dog d) {
        d.name = "Rexy";      // follows the arrow: changes the shared object
    }

    static void replace(Dog d) {
        d = new Dog();        // d now points to a different object
        d.name = "Stranger";  // changes only that new object
    }
}

class Dog {
    String name;
}`,
        output: `after rename:  Rexy
after replace: Rexy`,
        warn: 'More exactly: Java passes a **copy of the reference**. That is why `rename` works and `replace` does not.'
      },
      {
        title: 'When nobody holds the string',
        text: [
          'If nothing points to an object any more, the JVM may remove it (**garbage collection**). You never delete objects by hand. More in [JVM & Memory](../jvm-memory/index.html).'
        ],
        fileName: 'LostBalloon.java',
        code: `public class LostBalloon {
    public static void main(String[] args) {
        Balloon mine = new Balloon();
        mine.color = "red";
        System.out.println("I hold a " + mine.color + " balloon");

        mine = new Balloon();   // the red balloon has no string any more
        mine.color = "blue";
        System.out.println("I hold a " + mine.color + " balloon");
        // The red balloon is unreachable. The garbage collector may remove it.
    }
}

class Balloon {
    String color;
}`,
        output: `I hold a red balloon
I hold a blue balloon`
      }
    ],
    technical: [
      '`new Dog()` becomes: reserve and zero heap memory, then run the constructor (`<init>` in bytecode). Each object has a small header (class info, GC bookkeeping) then its fields.',
      'A reference is a value the JVM uses to find an object. You can only copy it, compare with `==`, or set it to `null` — never invent an address.'
    ],
    tryIt: {
      steps: [
        'Copy `MemoryDemo.java` and run it.',
        'Change `Dog c = a;` to `Dog c = new Dog();` and set `c.name = "Rex";`.',
        'Run again.'
      ],
      see: '`a.name` stays Rex, `a == c` is false — `c` has its own object.'
    },
    check: [
      { q: 'How many `Dog` objects after `Dog x = new Dog(); Dog y = x; Dog z = new Dog();`?', a: 'Two. Two `new`. `y = x` copies an arrow.' },
      { q: 'Two dogs both named Rex. What does `a == b` give?', a: '`false`. `==` compares references, not field values.' },
      { q: '`clear(rex)` does `d.name = null`. `swap(rex)` does `d = new Dog();`. Does `rex` change?', a: 'Yes for `clear` (shared object). No for `swap` (only the parameter’s arrow moves).' }
    ],
    keyPoints: [
      '`new` makes one object on the heap and returns a reference.',
      'A class-type variable holds an arrow, not the object.',
      '`b = a` copies the arrow (aliases). `==` asks "same object?".',
      'A method gets a copy of the arrow: it can change the object, not the caller’s variable.',
      'Unreachable objects are cleaned up by the garbage collector.'
    ],
    commonMistakes: [
      '`Dog copy = original;` for a copy — that is an alias. Make a new object and copy fields (or use a copy constructor).',
      '`if (dog1 == dog2)` for values — compare fields or write `equals`.',
      '`Dog rex; rex.name = "Rex";` — initialize with `new` first.',
      'Expecting `d = new Dog();` inside a method to change the caller’s variable. Return the new object instead.'
    ],
    related: ['Fields and Default Values', 'Constructors', 'equals and hashCode', 'JVM & Memory']
  }]);
})();
