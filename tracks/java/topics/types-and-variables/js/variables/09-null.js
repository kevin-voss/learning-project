// Lesson 09: null (no object, NullPointerException, checks, null vs empty String).
(function () {
  const topic = Java.topics.typesAndVariables;

  topic.lessons.push({
    num: '09',
    id: 'null',
    title: 'null',
    category: 'variables',
    icon: '∅',
    tagline: 'An arrow that points to nothing',
    realWorld: 'A cloakroom ticket with no number on it. It looks like a ticket, but there is no coat to pick up. If you hand it in and ask for your coat, the staff cannot help you.',
    kid: [
      'Remember the sticky notes that say where a toy is in the big toy box? Sometimes a note is empty. It says: "no toy". That empty note is called `null`.',
      'Reading an empty note is fine. You can even say out loud "this note is empty".',
      'But if you try to play with the toy on an empty note, there is no toy. Java stops the program and shouts `NullPointerException`.'
    ],
    definition: '`null` is the value of a reference that points to no object. Only reference type variables can be `null`. Using a `null` reference to reach an object, for example calling a method on it, crashes the program with a **NullPointerException**.',
    explain: [
      '`null` is a literal, like `true` or `42`, but it has no type of its own: you can assign it to any reference type. `String name = null;` means "`name` exists, but it points to no String yet".',
      'Primitives cannot be `null`. An `int` box always holds a number. `int count = null;` does not compile.',
      'You may do three things with a `null` reference safely: print it (Java prints `null`), compare it with `== null` or `!= null`, and assign a real object to it later. What you may not do is follow the arrow: `name.length()` or `pet.name` on a `null` reference.',
      'Following a `null` arrow throws a **NullPointerException** (often called NPE). An **exception** is Java’s way to report an error while the program runs. If nobody handles it, the program stops and prints the error and the line where it happened. You learn to handle exceptions in [Exceptions](../exceptions/index.html).',
      '`null` is not the same as an empty String. `""` is a real String object with zero characters: `"".length()` is `0`. `null` is no object at all: `null.length()` crashes.'
    ],
    why: 'Sometimes there is no value yet: no pet, no middle name, no search result. `null` says "nothing here" for references.',
    whenUse: 'When a reference may have no object for a while. Before you use such a reference, check it with `!= null`.',
    syntax: '`Type name = null;` · check: `if (name != null) { ... }` · safe compare: `"text".equals(name)`',
    fileName: 'NullBasics.java',
    code: `public class NullBasics {
    static class Pet {
        String name;
    }

    public static void main(String[] args) {
        Pet pet = null;                   // an arrow to nothing
        System.out.println(pet);          // printing null is fine

        if (pet == null) {                // ask before you use it
            System.out.println("No pet yet");
        }

        pet = new Pet();                  // now it points to an object
        System.out.println(pet == null);
        System.out.println(pet.name);     // a String field starts as null

        pet.name = "Rex";
        System.out.println(pet.name.length());

        String nickname = null;
        String empty = "";
        System.out.println("Rex".equals(nickname));  // safe: no crash
        System.out.println(empty.length());
    }
}`,
    output: `null
No pet yet
false
null
3
false
0`,
    codeSummary: 'A reference starts as `null`, is checked, gets an object, and the safe ways to work with `null` are shown.',
    codeExplanation: [
      { label: 'Line 7', code: 'Pet pet = null;                   // an arrow to nothing', text: 'The variable exists, but no Pet object exists yet.' },
      { label: 'Line 8', code: 'System.out.println(pet);          // printing null is fine', text: 'Printing a `null` reference prints the word `null`. No crash.' },
      { label: 'Line 10', code: 'if (pet == null) {                // ask before you use it', text: '`if` runs its block only when the condition is true (see [Control Flow](../control-flow/index.html)). `pet == null` is true here.' },
      { label: 'Line 14', code: 'pet = new Pet();                  // now it points to an object', text: 'Now `pet` has a real object to point to.' },
      { label: 'Line 15', code: 'System.out.println(pet == null);', text: '`false`: the arrow is no longer empty.' },
      { label: 'Line 16', code: 'System.out.println(pet.name);     // a String field starts as null', text: 'The object exists, but its `name` field was never set. Reference fields start as `null` (see Default Values).' },
      { label: 'Line 19', code: 'System.out.println(pet.name.length());', text: 'Safe now: `pet` points to a Pet and `pet.name` points to `"Rex"`. Two arrows are followed, both are real.' },
      { label: 'Line 23', code: 'System.out.println("Rex".equals(nickname));  // safe: no crash', text: 'The method is called on `"Rex"`, which is never `null`. Asking `"Rex".equals(null)` gives `false`.' },
      { label: 'Line 24', code: 'System.out.println(empty.length());', text: 'An empty String is a real object with length `0`. Very different from `null`.' }
    ],
    sections: [
      {
        title: 'null means: no arrow',
        text: 'Compare the two moments of the example. First the box exists, but no arrow leaves it. After `new Pet()`, the arrow points to a real object.',
        mermaid: `flowchart LR
  subgraph A["Line 7: pet = null"]
    p1["pet: null"]
  end
  subgraph B["Line 14: pet = new Pet()"]
    p2["pet: arrow"] --> o["Pet object: name = null"]
  end`,
        diagramNote: 'After line 14 the Pet exists, but its own `name` field is still `null` until line 18.'
      },
      {
        title: 'The crash: NullPointerException',
        text: [
          'This program follows a `null` arrow on line 5. The first line still prints. Then Java throws a NullPointerException and stops: the last line never runs.',
          'Read the message from left to right: what Java tried (`Cannot invoke "String.length()"`), why it failed (`because "<local1>" is null`) and where (`NullCrash.java:5`).',
          '`<local1>` means "local variable in slot 1". By default `javac` does not keep the names of local variables in the `.class` file. Compile with `javac -g NullCrash.java` and the message says `because "name" is null` instead.'
        ],
        fileName: 'NullCrash.java',
        code: `public class NullCrash {
    public static void main(String[] args) {
        String name = null;
        System.out.println("Before the crash");
        System.out.println(name.length());
        System.out.println("This line never runs");
    }
}`,
        output: `Before the crash
Exception in thread "main" java.lang.NullPointerException: Cannot invoke "String.length()" because "<local1>" is null
\tat NullCrash.main(NullCrash.java:5)`,
        tip: 'The line number in `(NullCrash.java:5)` is your best friend. Go to that line and ask: which reference here could be `null`?'
      },
      {
        title: 'Only references can be null',
        text: 'A primitive box always holds a value, so `null` does not fit. If you need "a number or nothing", use the wrapper type `Integer` (see Wrapper Types and Autoboxing).',
        fileName: 'IntNull.java',
        code: `public class IntNull {
    public static void main(String[] args) {
        int count = null;
    }
}`,
        noRun: true,
        output: `IntNull.java:3: error: incompatible types: <null> cannot be converted to int
        int count = null;
                    ^
1 error`
      },
      {
        title: 'null, empty and blank are three things',
        text: 'Beginners mix these up, because all three look like "no text". Only one of them is "no object".',
        table: {
          head: ['Value', 'Is there an object?', '`length()`', 'Printed as'],
          rows: [
            ['`null`', 'no', 'crash: NullPointerException', '`null`'],
            ['`""` (empty)', 'yes', '`0`', 'nothing'],
            ['`" "` (blank, one space)', 'yes', '`1`', 'one space']
          ],
          note: 'Safe habits: check `name != null` before you use `name`, and write the known String first in comparisons: `"yes".equals(answer)` cannot crash, `answer.equals("yes")` can.'
        }
      }
    ],
    technical: [
      'Inside the JVM, `null` is a reference with the value zero: it points to no memory at all. Every reference field of a new object and every element of a new array of objects starts as `null`.',
      'Each time the bytecode follows a reference (to read a field, call a method or read an array element), the JVM checks it. If it is `null`, the JVM throws a `NullPointerException` instead of reading random memory. That check is what keeps Java programs from the memory crashes common in C.',
      'Since Java 14, NPE messages are "helpful": they name the exact method, field or variable that was `null` (JEP 358). The inventor of the null reference, Tony Hoare, later called it his "billion-dollar mistake", because so many bugs come from it. Modern Java code often uses other tools to say "maybe no value", such as `Optional`, which you meet later.'
    ],
    tryIt: {
      steps: [
        'Copy `NullCrash.java` and run it with `javac NullCrash.java` and `java NullCrash`.',
        'Compile again with `javac -g NullCrash.java` and run it.',
        'Change line 3 to `String name = "";` and run once more.'
      ],
      see: 'first `because "<local1>" is null`, then `because "name" is null`, and at the end `0` and `This line never runs` printed with no crash.'
    },
    check: [
      { q: 'Does `String s = null; System.out.println(s);` crash?', a: 'No. Printing a `null` reference prints `null`. Only following the arrow, like `s.length()`, crashes.' },
      { q: 'Which is safer: `answer.equals("yes")` or `"yes".equals(answer)`? Why?', a: '`"yes".equals(answer)`. The method is called on the literal, which is never `null`. If `answer` is `null`, it gives `false` instead of crashing.' },
      { q: 'What is the difference between `null` and `""`?', a: '`null` is no object. `""` is a real String object with zero characters.' }
    ],
    keyPoints: [
      '`null` means "this reference points to no object".',
      'Only reference types can be `null`. Primitives never are.',
      'Printing and comparing `null` is safe. Following it crashes with a NullPointerException.',
      'The NPE message names the line and the variable that was `null`.',
      '`null` is not `""`.'
    ],
    commonMistakes: [
      'Calling a method on a reference that may be `null`: `name.length()`. Fix: check first, `if (name != null)`.',
      'Comparing with the possibly-null value first: `answer.equals("yes")`. Fix: `"yes".equals(answer)`.',
      'Giving a primitive `null`: `int count = null;`. Fix: use `0`, or `Integer count = null;` if "no value" must be possible.',
      'Forgetting that a new object’s String fields are `null`: `pet.name.length()` before setting `name`. Fix: set the field first.'
    ],
    related: ['Primitives vs Reference Types', 'Default Values', 'Wrapper Types and Autoboxing', 'Exceptions'],
    glossary: topic.glossary
  });
})();
