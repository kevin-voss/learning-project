// Lesson 14 (deeper): default values of fields vs no default for local variables (definite assignment).
(function () {
  const topic = Java.topics.typesAndVariables;

  topic.lessons.push({
    num: '14',
    id: 'default-values',
    title: 'Default Values',
    category: 'deeper',
    icon: '0',
    tagline: 'Fields start at zero, locals start at nothing',
    realWorld: 'A new school form already has "0" printed in the box "number of siblings" until you write something else. A blank sticky note has nothing at all on it. Fields are like the form, local variables like the sticky note.',
    kid: [
      'Some boxes come with something already inside. Boxes that belong to a class or an object start with a zero, a "no", or an empty note.',
      'Boxes you make inside `main` start with nothing at all. Not even a zero.',
      'Java does not let you look into a box that has nothing in it. You must put something in first.'
    ],
    definition: '**Fields** (variables of a class or object) get a **default value** automatically: `0` for numbers, `false` for `boolean`, `\'\\u0000\'` for `char` and `null` for references. **Local variables** get no default: the compiler refuses to read them before they are assigned.',
    explain: [
      'A **field** is declared directly inside a class, outside every method. A `static` field belongs to the class, a field without `static` belongs to each object made with `new` (see [Classes & Objects](../classes-and-objects/index.html)). Both kinds start with their type\u2019s default value.',
      'The defaults all mean "zero": `0` for `byte`, `short`, `int` and `long`, `0.0` for `float` and `double`, `false` for `boolean`, the character with number 0 (`\'\\u0000\'`) for `char`, and `null` for every reference type, `String` included.',
      'A **local variable** (declared inside a method) has no default. Before you read it, every possible way through the code must have assigned it. The compiler checks this rule, called **definite assignment**. If it cannot prove the variable has a value, you get `variable ... might not have been initialized`.',
      'Defaults are a safety net, not a plan. A `String` field that starts as `null` crashes as soon as you call a method on it. Give fields a start value when `0`, `false` or `null` is not a sensible start.'
    ],
    why: 'It explains the error "variable might not have been initialized" and why a new object\u2019s String fields are `null`.',
    whenUse: 'When the compiler complains about a variable without a value, or when a field is `0` or `null` and you did not expect it.',
    syntax: 'Field with default: `static int count;` (starts at 0) · Field with own start: `static int count = 10;` · Local: `int count = 0;` (always give a value)',
    fileName: 'Defaults.java',
    code: `public class Defaults {
    // Fields get a default value automatically
    static int fieldCount;
    static double fieldPrice;
    static boolean fieldDone;
    static char fieldLetter;
    static String fieldName;

    public static void main(String[] args) {
        System.out.println("int:     " + fieldCount);
        System.out.println("double:  " + fieldPrice);
        System.out.println("boolean: " + fieldDone);
        System.out.println("char:    " + (int) fieldLetter);
        System.out.println("String:  " + fieldName);

        // Local variables get nothing: assign before you read
        int localCount;
        localCount = 1;
        System.out.println("local:   " + localCount);
    }
}`,
    output: `int:     0
double:  0.0
boolean: false
char:    0
String:  null
local:   1`,
    codeSummary: 'Five fields that were never assigned print their defaults. One local variable must be assigned before it is printed.',
    codeExplanation: [
      { label: 'Line 3', code: 'static int fieldCount;', text: 'A field with no value written. Java gives it `0`.' },
      { label: 'Line 5', code: 'static boolean fieldDone;', text: 'A `boolean` field starts as `false`.' },
      { label: 'Line 7', code: 'static String fieldName;', text: 'A reference field starts as `null`: no object.' },
      { label: 'Line 11', code: 'System.out.println("double:  " + fieldPrice);', text: 'Decimal fields start at `0.0`.' },
      { label: 'Line 13', code: 'System.out.println("char:    " + (int) fieldLetter);', text: 'The `char` default is the character number 0, which prints as nothing visible. The cast shows its number.' },
      { label: 'Line 14', code: 'System.out.println("String:  " + fieldName);', text: 'Printing a `null` reference prints `null`. Calling `fieldName.length()` would crash.' },
      { label: 'Line 17', code: 'int localCount;', text: 'A local variable: no default at all.' },
      { label: 'Line 18', code: 'localCount = 1;', text: 'Assigned before it is read, so line 19 compiles. Without this line, it would not.' }
    ],
    sections: [
      {
        title: 'Every default at a glance',
        table: {
          head: ['Type', 'Default value of a field', 'Local variable'],
          rows: [
            ['`byte`, `short`, `int`', '`0`', 'no default'],
            ['`long`', '`0L`', 'no default'],
            ['`float`', '`0.0f`', 'no default'],
            ['`double`', '`0.0`', 'no default'],
            ['`boolean`', '`false`', 'no default'],
            ['`char`', "`'\\u0000'` (character number 0)", 'no default'],
            ['any reference type: `String`, `Integer`, your classes', '`null`', 'no default']
          ],
          note: 'All defaults are "all bits zero" for their type. That is why they are so easy to remember.'
        }
      },
      {
        title: 'New objects start with defaults too',
        text: 'Fields without `static` belong to each object. `new Player()` makes an object whose fields have the default values until you set them.',
        fileName: 'NewPlayer.java',
        code: `public class NewPlayer {
    static class Player {
        String name;
        int level;
        boolean online;
    }

    public static void main(String[] args) {
        Player p = new Player();
        System.out.println(p.name + " " + p.level + " " + p.online);

        p.name = "Mia";
        p.level = 1;
        System.out.println(p.name + " " + p.level + " " + p.online);
    }
}`,
        output: `null 0 false
Mia 1 false`,
        tip: 'In Classes & Objects you learn **constructors**: special code that runs at `new` and sets good start values, so no field stays `null` by accident.'
      },
      {
        title: 'Definite assignment: every path counts',
        text: [
          'The compiler does not run your program. It looks at every path the code could take. Below, `bonus` gets a value only if `points > 40`. On the other path it has none, so printing it is not allowed, even though you might know which path runs.',
          'The fix: give it a start value on its declaration line, `int bonus = 0;`. Then every path has a value.'
        ],
        mermaid: `flowchart TD
  A["int bonus (no value)"] --> Q{"points > 40 ?"}
  Q -->|yes| B["bonus = 10"]
  Q -->|no| C["bonus still has no value"]
  B --> P["print bonus"]
  C --> P
  P --> R["compiler: might not have been initialized"]`,
        diagramNote: 'One path without a value is enough for the compiler to refuse.',
        fileName: 'MaybeAssigned.java',
        code: `public class MaybeAssigned {
    public static void main(String[] args) {
        int points = 30;
        int bonus;
        if (points > 40) {
            bonus = 10;
        }
        System.out.println(bonus);
    }
}`,
        noRun: true,
        output: `MaybeAssigned.java:8: error: variable bonus might not have been initialized
        System.out.println(bonus);
                           ^
1 error`
      },
      {
        title: 'Why fields and locals are different',
        text: [
          'A local variable is used in a few lines that you see at once. If you forget to assign it, that is almost always a mistake, so the compiler stops you.',
          'A field can be used by many methods, in any order, and over a long time. The compiler cannot follow all of that, so Java gives every field a safe, known start value instead of random leftover memory.'
        ],
        bullets: [
          'Locals: always assign a value on the declaration line when you can: `int total = 0;`.',
          'Fields: write the start value when the default is not what you mean: `static int lives = 3;`.',
          'Reference fields: remember they start as `null` until you assign an object.'
        ]
      }
    ],
    technical: [
      'When the JVM makes a new object, it fills the whole object memory with zero bits before anything else runs. Zero bits mean `0`, `0.0`, `false`, `\'\\u0000\'` or `null`, depending on the field type. Static fields get the same treatment when the class is loaded.',
      'Local variable slots in a frame are not cleared. They may contain leftovers from earlier calls. That is why the language forbids reading them before assignment: the rules of definite assignment fill a whole chapter (16) of the Java Language Specification. The JVM checks it again when it loads a class: the **bytecode verifier** rejects code that reads a slot before writing it.',
      'For `final` fields there is the opposite rule: they must be assigned exactly once before the object is ready, usually in a constructor. You meet that in Classes & Objects.'
    ],
    tryIt: {
      steps: [
        'Copy `Defaults.java` and run it.',
        'Add `System.out.println(fieldName.length());` at the end of `main` and run.',
        'Remove that line. Delete line 18 (`localCount = 1;`) and compile.'
      ],
      see: 'a `NullPointerException` (the String field is `null`), then `variable localCount might not have been initialized`.'
    },
    check: [
      { q: 'What does a `static boolean` field hold before you assign it?', a: '`false`.' },
      { q: 'Why does `int x; System.out.println(x);` inside `main` not compile, while a field `static int x;` prints `0`?', a: 'Local variables have no default value and must be assigned before they are read. Fields get a default value, here `0`.' },
      { q: 'A new object has a field `String name;`. What happens with `obj.name.length()` before you set `name`?', a: 'It crashes with a NullPointerException, because `name` starts as `null`.' }
    ],
    keyPoints: [
      'Fields get defaults: `0`, `0.0`, `false`, `\'\\u0000\'`, `null`.',
      'Local variables get no default.',
      'The compiler checks every path before a local is read (definite assignment).',
      'Reference fields start as `null`. Set them before you use them.',
      'Write start values yourself when the default is not what you mean.'
    ],
    commonMistakes: [
      'Reading a local before assigning: `int sum; sum = sum + 5;`. Fix: `int sum = 0;`.',
      'Assigning a local only on one path (inside an `if`). Fix: give it a start value on the declaration line.',
      'Calling a method on a String field that was never set. Fix: initialize it, `static String name = "";`, or check for `null`.',
      'Expecting a local `int` to start at `0` like a field. Fix: locals start with nothing; assign them.'
    ],
    related: ['What a Variable Is', 'null', 'Scope', 'Classes & Objects'],
    glossary: topic.glossary
  });
})();
