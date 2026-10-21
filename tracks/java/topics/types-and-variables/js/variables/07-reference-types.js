// Lesson 07: primitives vs reference types (value vs arrow, copying, ==, final references).
(function () {
  const topic = Java.topics.typesAndVariables;

  topic.lessons.push({
    num: '07',
    id: 'reference-types',
    title: 'Primitives vs Reference Types',
    category: 'variables',
    icon: '->',
    tagline: 'A box with a value, or a box with an arrow',
    realWorld: 'A coin in your hand is the thing itself. A cloakroom ticket is not your coat: it tells the staff where your coat hangs. Give your friend a copy of the ticket, and you both pick up the same coat.',
    kid: [
      'Some boxes hold a small thing directly, like a number. If you copy that box, your friend gets their own number. If they change theirs, yours stays the same.',
      'Other things are too big for a box, like a whole jar of marbles. So the box holds a little note with an arrow: "the jar is over there". If you copy that box, you copy the note, not the jar.',
      'Now two notes point to one jar. If your friend adds marbles to the jar, you see more marbles too, because it is the same jar.'
    ],
    definition: 'Java has two families of types. A **primitive** variable (the 8 lowercase types) holds the value itself. A **reference type** variable (every other type, such as `String` or your own classes) holds a **reference**: an arrow that points to an **object** somewhere else in memory.',
    explain: [
      'An **object** is a thing built from a class with the keyword `new`, for example `new Jar()`. A **class** is the blueprint: it lists what every object of that kind has inside. In the example, every `Jar` has one field `marbles`. You learn to write classes in [Classes & Objects](../classes-and-objects/index.html); here a tiny one is enough.',
      'When you write `Jar myJar = new Jar();`, two things happen. `new Jar()` builds a jar object. Then the variable `myJar` gets a reference to it, an arrow that says where the jar is. The variable does not contain the jar.',
      '**Copying** works the same for both families: Java copies what is in the box. For a primitive, that is the value, so you get two independent numbers. For a reference, that is the arrow, so you get two arrows to the same object. Change the object through one arrow, and the other arrow sees the change.',
      'The `==` operator also compares what is in the boxes. For primitives it compares values. For references it compares arrows: `a == b` is `true` only when both point to the very same object. To compare the content of two objects, classes offer a method `equals`, like `String` does.',
      'How to tell them apart: the 8 primitive types are lowercase keywords (`int`, `double` ...). Everything else is a reference type, and by convention its name starts with a capital letter: `String`, `Integer`, `Jar`. Arrays like `int[]` are reference types too (see [Arrays](../arrays/index.html)).'
    ],
    why: 'It explains the biggest surprise for beginners: changing an object through one variable changes it for every variable that points to it.',
    whenUse: 'Every time you copy a variable of a class type, compare two objects, or wonder why a change "spread" to another variable.',
    syntax: 'Primitive copy: `int b = a;` (two values) · Reference copy: `Jar b = a;` (two arrows, one object) · Same object? `a == b` · Same content? `a.equals(b)`',
    fileName: 'CopyingBoxes.java',
    code: `public class CopyingBoxes {
    // A tiny class: a blueprint for marble jars
    static class Jar {
        int marbles;
    }

    public static void main(String[] args) {
        // Primitive: the box holds the number itself
        int myMarbles = 3;
        int yourMarbles = myMarbles;   // copies the number 3
        yourMarbles = 9;
        System.out.println("my int: " + myMarbles + ", your int: " + yourMarbles);

        // Reference: the box holds an arrow to an object
        Jar myJar = new Jar();         // new builds an object
        myJar.marbles = 3;
        Jar yourJar = myJar;           // copies the arrow, not the jar
        yourJar.marbles = 9;
        System.out.println("my jar: " + myJar.marbles + ", your jar: " + yourJar.marbles);

        // A second, separate object
        Jar otherJar = new Jar();
        otherJar.marbles = 9;
        System.out.println("same jar? " + (myJar == yourJar));
        System.out.println("same jar? " + (myJar == otherJar));
    }
}`,
    output: `my int: 3, your int: 9
my jar: 9, your jar: 9
same jar? true
same jar? false`,
    codeSummary: 'The same three steps (make, copy, change the copy) once with an `int` and once with an object. The results differ.',
    codeExplanation: [
      { label: 'Line 3', code: 'static class Jar {', text: 'A tiny class inside our class. `static` lets `main` use it directly. Every `Jar` object has one `int` field.' },
      { label: 'Line 10', code: 'int yourMarbles = myMarbles;   // copies the number 3', text: 'A primitive copy: `yourMarbles` gets its own `3`.' },
      { label: 'Line 11', code: 'yourMarbles = 9;', text: 'Changes only `yourMarbles`. `myMarbles` is still `3`.' },
      { label: 'Line 15', code: 'Jar myJar = new Jar();         // new builds an object', text: '`new Jar()` builds one jar object. `myJar` holds an arrow to it.' },
      { label: 'Line 16', code: 'myJar.marbles = 3;', text: 'The dot follows the arrow and sets the field inside the object.' },
      { label: 'Line 17', code: 'Jar yourJar = myJar;           // copies the arrow, not the jar', text: 'A reference copy. Now two arrows point to one jar. No second jar was built.' },
      { label: 'Line 18', code: 'yourJar.marbles = 9;', text: 'Follows `yourJar`’s arrow to the shared jar and changes it. `myJar` sees `9` too.' },
      { label: 'Line 22', code: 'Jar otherJar = new Jar();', text: 'A second `new`, so a second, separate jar object.' },
      { label: 'Line 24', code: 'System.out.println("same jar? " + (myJar == yourJar));', text: '`==` on references asks "same object?". Both arrows point to one jar: `true`.' },
      { label: 'Line 25', code: 'System.out.println("same jar? " + (myJar == otherJar));', text: 'Both jars hold 9 marbles, but they are two objects: `false`.' }
    ],
    sections: [
      {
        title: 'Two families of types',
        text: 'Every type in Java is in exactly one of these two families.',
        table: {
          head: ['', 'Primitive', 'Reference type'],
          rows: [
            ['Which types', 'the 8: `byte short int long float double char boolean`', 'everything else: `String`, `Integer`, `Jar`, `int[]` ...'],
            ['Name style', 'lowercase keyword', 'starts with a capital letter (by convention)'],
            ['The box holds', 'the value itself', 'an arrow to an object'],
            ['Copy `b = a`', 'copies the value', 'copies the arrow'],
            ['`a == b` asks', 'same value?', 'same object?'],
            ['Can be `null`?', 'no', 'yes (no object at all)'],
            ['Has methods?', 'no', 'yes, like `s.length()`']
          ]
        }
      },
      {
        title: 'The picture: two numbers, but one jar',
        text: 'This is the state at the end of the example. The primitives on the left have one box each. The references on the right are two boxes with arrows, and both arrows end at the same object.',
        mermaid: `flowchart LR
  subgraph P["Primitives: the value is in the box"]
    A["myMarbles: 3"]
    B["yourMarbles: 9"]
  end
  subgraph R["References: an arrow is in the box"]
    C["myJar"] --> J["Jar object: marbles = 9"]
    D["yourJar"] --> J
    E["otherJar"] --> K["Jar object: marbles = 9"]
  end`,
        diagramNote: '`myJar == yourJar` is true (same object). `myJar == otherJar` is false (two objects with equal content).'
      },
      {
        title: 'Same value, same object, same content',
        text: [
          'For primitives, `==` is all you need: `1000 == 1000` is `true`. For objects, decide what you want to know: "is this the very same object?" (`==`) or "do these two objects hold the same content?" (`equals`).',
          '`new String("cat")` builds a fresh String object every time, so the two Strings below are two objects with the same letters.'
        ],
        fileName: 'SameOrEqual.java',
        code: `public class SameOrEqual {
    public static void main(String[] args) {
        int a = 1000;
        int b = 1000;
        System.out.println(a == b);

        String first = new String("cat");
        String second = new String("cat");
        System.out.println(first == second);
        System.out.println(first.equals(second));
    }
}`,
        output: `true
false
true`,
        tip: 'Rule of thumb: compare primitives with `==`, objects with `equals`. Our own `Jar` class has no `equals` of its own yet; you learn to write one in Classes & Objects.'
      },
      {
        title: 'final on a reference',
        text: [
          'From the lesson final and Constants: `final` fixes what is in the box. For a reference, the box holds the arrow, so the arrow is fixed. The object at the end of the arrow may still change.',
          'Here `jar` always points to the same jar, but the number of marbles inside changes.'
        ],
        fileName: 'FinalJar.java',
        code: `public class FinalJar {
    static class Jar {
        int marbles;
    }

    public static void main(String[] args) {
        final Jar jar = new Jar();
        jar.marbles = 5;              // allowed: the object changes
        jar.marbles = jar.marbles + 1;
        System.out.println(jar.marbles);
        // jar = new Jar();           // not allowed: the arrow is final
    }
}`,
        output: `6`,
        warn: '`final` does not make an object unchangeable. It only stops the variable from pointing somewhere else.'
      }
    ],
    technical: [
      'A reference is close to a memory address: the JVM uses it to find the object. On a 64-bit JVM a reference usually takes 4 bytes in memory (the JVM compresses addresses while the heap is smaller than about 32 GB). Copying a reference copies those few bytes, never the object, however big the object is.',
      '`new Jar()` asks the JVM for memory on the **heap**, sets every field to its default (`0` for `marbles`), and gives back the reference. Local variables like `myJar` live in the method’s frame on the **stack**. The next lesson draws both.',
      '`==` on references compares the two addresses, which is why it is fast but answers only "same object?". Java always copies the content of the box when you assign or pass a value: for references the content is the arrow. You see this again when you pass objects to methods in [Methods](../methods/index.html).'
    ],
    tryIt: {
      steps: [
        'Copy `CopyingBoxes.java` and run it.',
        'Change line 17 to `Jar yourJar = new Jar();` and run again.',
        'Look at the "my jar" line and both "same jar?" lines.'
      ],
      see: '`my jar: 3, your jar: 9`, then `same jar? false` twice: now there are two separate jars.'
    },
    check: [
      { q: 'After `int a = 5; int b = a; b = 7;` what is `a`?', a: '`5`. A primitive copy is a separate value.' },
      { q: 'After `Jar a = new Jar(); Jar b = a; b.marbles = 7;` what is `a.marbles`?', a: '`7`. `a` and `b` are two arrows to the same jar.' },
      { q: 'Two different jar objects both hold 4 marbles. What does `jar1 == jar2` give?', a: '`false`. `==` on references asks "same object?", and these are two objects.' }
    ],
    keyPoints: [
      'Primitives hold the value. Reference types hold an arrow to an object.',
      '`new` builds an object. Assigning a reference never builds one.',
      'Copying a reference gives two arrows to one object.',
      '`==` on references means "same object". Use `equals` for "same content".',
      '`final` on a reference fixes the arrow, not the object.'
    ],
    commonMistakes: [
      'Expecting `Jar copy = original;` to make a second jar. Fix: build one with `new Jar()` and copy the fields.',
      'Comparing objects with `==`: `first == second` for two Strings. Fix: `first.equals(second)`.',
      'Thinking a `final` object cannot change: `final Jar jar = new Jar(); jar.marbles = 5;` compiles fine. Fix: `final` only fixes the arrow.',
      'Thinking `int[]` is a primitive because of the `int`. Fix: every array is a reference type.'
    ],
    related: ['Stack, Heap, References', 'null', 'String', 'Classes & Objects'],
    glossary: topic.glossary
  });
})();
