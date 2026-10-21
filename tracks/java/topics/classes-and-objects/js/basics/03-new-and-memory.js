(function () {
  const terms = Java.topicDetails['classes-and-objects'].glossary;

  Java.addCoreLessons('classes-and-objects', [{
    id: 'new-and-memory',
    title: 'Creating Objects with new',
    category: 'concept',
    icon: 'N',
    tagline: 'Variables hold arrows, objects live on the heap',
    glossary: terms,
    realWorld: 'Balloons at a party. The balloon floats up near the ceiling. You hold only its string. Two children can hold two strings tied to the same balloon, and if one child paints a face on it, the other child sees the face too.',
    kid: [
      'When you say `new`, Java blows up a brand-new balloon. The balloon is the object. It floats up into a big room called the **heap**.',
      'Your variable does not hold the balloon. It holds the **string** tied to the balloon. With the string you can always find your balloon again.',
      'If your friend ties a second string to **your** balloon, there is still only one balloon. When your friend draws on it, you see the drawing too. But if your friend gets a **new** balloon with `new`, then you have two balloons, and drawing on one does not change the other.'
    ],
    definition: '`new ClassName()` makes a new object on the **heap**, fills its fields, and gives back a **reference** to it. A variable of a class type stores that reference (an arrow), never the object itself.',
    explain: [
      'You know from [Types and Variables](../types-and-variables/index.html) that local variables live on the **stack** and objects on the **heap**. The stack is a small, fast memory area: each method call gets its own part of it (a **stack frame**) for its local variables. The heap is a big memory area for all objects.',
      'The line `Dog rex = new Dog();` does four things. First, `Dog rex` makes a local variable on the stack that can hold a reference to a `Dog`. Second, `new Dog()` reserves memory for a `Dog` on the heap and sets its fields to their defaults. Third, it runs the constructor (next lesson). Fourth, `=` stores the reference to the new object in `rex`.',
      'Every `new` makes one more object. Two `new` = two objects, even if they hold the same values. They are twins, not one person.',
      'Assigning one variable to another, `Dog other = rex;`, does **not** make a new object. It copies the arrow. Now two variables point to one object. A change through `other` is visible through `rex`, because there is only one dog. Two names for one object are called **aliases**.',
      'The operator `==` on objects compares the arrows: "do both variables point to the same object?". It does not compare the field values. For "do they hold the same values?" you write an `equals` method (lesson "equals and hashCode").'
    ],
    why: 'Objects can be big, and many parts of a program need the same object. Passing an arrow around is cheap and lets everyone work on the one real object instead of on copies.',
    whenUse: 'Use `new` each time you need one more separate thing. Copy a reference (`b = a`) when two places must work on the same thing.',
    syntax: '`ClassName variable = new ClassName();`: the left side declares a reference variable, the right side makes the object and returns its reference.',
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
    visualNote: 'After `Dog other = rex;` both variables on the stack point to the same `Dog` on the heap. There is only one `name` field, so `other.name = "Max"` also changes what `rex.name` shows.',
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
    codeSummary: 'Two `new` calls make two objects. `c = a` makes no object; it copies the arrow. Changing `c.name` changes the object that `a` also points to, and `==` shows which variables share an object.',
    codeExplanation: [
      { label: 'Line 3', code: 'Dog a = new Dog();   // object 1', text: '`new` makes the first `Dog` on the heap. `a` on the stack gets the arrow to it.' },
      { label: 'Line 5', code: 'Dog b = new Dog();   // object 2, a twin with the same name', text: 'A second `new`, so a second, separate object.' },
      { label: 'Line 6', code: 'b.name = "Rex";', text: 'Object 2 now has the same name as object 1. They look alike but are two objects.' },
      { label: 'Line 7', code: 'Dog c = a;           // no new object: c gets a copy of a\'s arrow', text: 'No `new` here. `c` gets a copy of the reference in `a`. Now `a` and `c` are aliases for object 1.' },
      { label: 'Line 9', code: 'c.name = "Max";      // changes object 1', text: 'Follows the arrow in `c` to object 1 and changes its name. `a` points there too.' },
      { label: 'Line 11', code: 'System.out.println("a.name = " + a.name);', text: 'Prints `Max`: the change through `c` is visible through `a`.' },
      { label: 'Line 12', code: 'System.out.println("b.name = " + b.name);', text: 'Prints `Rex`: object 2 was never touched.' },
      { label: 'Line 14', code: 'System.out.println("a == b: " + (a == b));', text: '`false`: different arrows, even though both dogs were called Rex at first. The brackets make `==` run before the `+`.' },
      { label: 'Line 15', code: 'System.out.println("a == c: " + (a == c));', text: '`true`: both arrows point to the same object.' }
    ],
    sections: [
      {
        title: 'What new does, step by step',
        text: [
          'Read `Dog rex = new Dog();` from the right side to the left side. The right side runs first and makes the object. The left side receives the arrow.'
        ],
        mermaid: `flowchart TD
  A["1. Dog rex: a variable on the stack, empty for now"] --> B["2. new Dog(): reserve memory on the heap"]
  B --> C["3. set every field to its default (0, false, null)"]
  C --> D["4. run field initializers and the constructor"]
  D --> E["5. return the reference to the new object"]
  E --> F["6. = stores that reference in rex"]`,
        diagramNote: 'Steps 2 to 5 belong to `new`. Only step 6 touches your variable.',
        tip: 'The constructor in step 4 is the topic of the next lesson. For now, it is the code that runs once when an object is born.'
      },
      {
        title: 'Two objects or one object?',
        text: [
          'This is the most important picture of the lesson. Count the `new`: that is the number of objects. Count the variables: that is the number of arrows.'
        ],
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
        diagramNote: 'Three variables, two objects. `a` and `c` share Dog 1. `b` has Dog 2 for itself.',
        table: {
          head: ['Code', 'Objects', 'What a change through one variable does'],
          rows: [
            ['`Dog a = new Dog(); Dog b = new Dog();`', '2', 'Changes only that one object'],
            ['`Dog a = new Dog(); Dog c = a;`', '1', 'Is visible through both `a` and `c`'],
            ['`Dog a = new Dog(); a = new Dog();`', '2, but the first one is lost', 'Nobody can reach the first dog any more']
          ]
        }
      },
      {
        title: 'Objects passed to a method',
        text: [
          'When you pass an object to a method, Java copies the **arrow** into the parameter, the same way `c = a` does. The method and the caller now share the object.',
          'So a method **can** change the fields of an object you pass in. But if the method points its parameter at a **new** object, only its own copy of the arrow changes. The caller still points to the old object.'
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
        warn: 'People often say "Java passes objects by reference". More exactly, Java passes a **copy of the reference**. That is why `rename` works and `replace` has no effect outside.'
      },
      {
        title: 'When nobody holds the string',
        text: [
          'If you point a variable somewhere else, the object it pointed to stays on the heap. When no variable anywhere points to an object any more, your program can never reach it again.',
          'The JVM then removes it for you and reuses the memory. This cleanup is called **garbage collection**. You never delete objects by hand in Java. The topic [JVM & Memory](../jvm-memory/index.html) shows how it works.'
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
      'The compiler turns `new Dog()` into two bytecode steps: `new Dog`, which asks the JVM for heap memory of the right size and zeroes it, and `invokespecial Dog.<init>`, which runs the constructor on that memory. `<init>` is the name the JVM uses for constructors.',
      'Each object on the heap has a small **header** before its fields. The header says which class the object belongs to (so the JVM knows which methods it has) and holds some bookkeeping for the garbage collector. Then come the fields, one after the other.',
      'A reference is a number the JVM uses to find an object, a bit like an address. Java never lets you see it, add to it or make one up. You can only copy it, compare it with `==`, or set it to `null`. This makes Java memory-safe: you cannot point into random memory.',
      'Every method call gets a new stack frame for its parameters and locals. When `rename(rex)` runs, its frame holds `d`, a copy of the arrow in `rex`. When the method returns, the frame is gone, but the object on the heap stays as long as someone still points to it.'
    ],
    tryIt: {
      steps: [
        'Copy `MemoryDemo.java` and run it.',
        'Change line 7 from `Dog c = a;` to `Dog c = new Dog();` and add `c.name = "Rex";` below it.',
        'Run again and compare the five lines with the first run.'
      ],
      see: '`a.name = Rex`, `c.name = Max` and `a == c: false`. With its own `new`, `c` has its own object, so changing it no longer changes `a`.'
    },
    check: [
      { q: 'How many `Dog` objects exist after `Dog x = new Dog(); Dog y = x; Dog z = new Dog();`?', a: 'Two. There are two `new`. `y = x` copies an arrow and makes no object.' },
      { q: 'Two different `Dog` objects both have `name = "Rex"`. What does `a == b` give?', a: '`false`. `==` compares references, and they point to two different objects. Equal values do not matter for `==`.' },
      { q: 'A method `void clear(Dog d) { d.name = null; }` is called with `clear(rex)`. Is `rex.name` now `null`? What about `void swap(Dog d) { d = new Dog(); }`?', a: 'Yes for `clear`: the parameter is a copy of the arrow, so it changes the shared object. No for `swap`: it only points its own copy of the arrow at a new object; `rex` still points to the old one.' }
    ],
    keyPoints: [
      '`new` makes one new object on the heap and returns a reference to it.',
      'A variable of a class type holds a reference (an arrow), not the object.',
      '`b = a` copies the arrow: two variables, one object (aliases).',
      '`==` on objects asks "same object?", not "same values?".',
      'A method gets a copy of the arrow: it can change the object, not the caller’s variable.',
      'Objects nobody points to are removed by the garbage collector.'
    ],
    commonMistakes: [
      '`Dog copy = original;` to make a copy. That makes an alias, not a copy. Write `Dog copy = new Dog(); copy.name = original.name;` (or a copy constructor, next lesson).',
      '`if (dog1 == dog2)` to compare values. `==` compares arrows. Compare fields (`dog1.name.equals(dog2.name)`) or write an `equals` method.',
      'Forgetting `new`: `Dog rex; rex.name = "Rex";` does not compile ("might not have been initialized"). Write `Dog rex = new Dog();`.',
      'Expecting `d = new Dog();` inside a method to change the caller’s variable. Return the new object instead: `rex = makeDog();`.'
    ],
    related: ['Fields and Default Values', 'Constructors', 'equals and hashCode', 'JVM & Memory']
  }]);
})();
