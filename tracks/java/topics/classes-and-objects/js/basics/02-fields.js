(function () {
  const terms = Java.topicDetails['classes-and-objects'].glossary;

  Java.addCoreLessons('classes-and-objects', [{
    id: 'fields-state',
    title: 'Fields and Default Values',
    category: 'concept',
    icon: 'F',
    tagline: 'What an object knows',
    glossary: terms,
    realWorld: 'A sign-up form at the swimming pool. It has boxes for name, age and "can swim: yes / no". Every child gets their own copy of the form and writes their own answers in it. A box nobody fills in stays empty.',
    kid: [
      'Think of the pool form. The form has the same boxes for everybody: name, age, can swim.',
      'Mia gets one copy and writes "Mia, 7, yes". Leo gets another copy and writes "Leo, 6, no". Mia’s form and Leo’s form are different papers. If Leo changes his age, Mia’s paper does not change.',
      'In Java, the boxes on the form are **fields**. Every object is one copy of the form. And if you forget to fill in a box, Java writes a "nothing" value for you: `0` for numbers, `false` for yes/no, and `null` (meaning "empty") for text.'
    ],
    definition: 'A **field** is a variable declared inside a class but outside every method. Each object gets its own copy of every field. Together, the values of all fields are the **state** of the object. A field you do not set gets a **default value**: `0`, `0.0`, `false` or `null`.',
    explain: [
      'You write a field like any variable, with a type and a name, but directly in the class body: `int age;`. It is not inside `main` or any other method. The full name is **instance field** or **instance variable**, because each instance (object) has its own.',
      'A field lives as long as its object lives. A **local variable** inside a method is gone when the method ends. That is why fields are the place for everything an object must remember: the balance of an account, the name of a dog, the score of a player.',
      'Fields can have any type: `int`, `double`, `boolean`, `char`, `String`, an array like `int[]`, and even another class like `Dog`. Types like `String`, arrays and your own classes are **reference types**: the field holds a reference (an arrow) to an object, not the object itself.',
      'Java gives every field a start value by itself. Number fields start at `0` (or `0.0`), `boolean` fields at `false`, `char` fields at the empty character `\\u0000`, and every reference field starts at `null`. `null` means "this arrow points to nothing yet". You met default values in [Types and Variables](../types-and-variables/index.html); here you see them on objects.',
      'You can also give a field your own start value: `int battery = 100;`. This is a **field initializer**. Every new object then starts with `100` instead of `0`.'
    ],
    why: 'An object must remember things between method calls. Local variables forget everything when a method ends. Fields keep the data as long as the object exists.',
    whenUse: 'Make something a field when it describes the object and must survive from one method call to the next (a name, a balance, a score). Keep it a local variable when only one method needs it for a moment (a loop counter, a temporary sum).',
    syntax: '`class ClassName { type fieldName; type otherField = startValue; }`. Read or write it with `object.fieldName`.',
    fileName: 'RobotDemo.java',
    code: `public class RobotDemo {
    public static void main(String[] args) {
        Robot robo = new Robot();

        // Nothing set yet: every field has its default value or start value.
        System.out.println("name:    " + robo.name);
        System.out.println("legs:    " + robo.legs);
        System.out.println("speed:   " + robo.speed);
        System.out.println("on:      " + robo.on);
        System.out.println("battery: " + robo.battery);

        // Now give the object its own state.
        robo.name = "Robo";
        robo.legs = 2;
        robo.on = true;
        robo.battery = robo.battery - 15;
        System.out.println(robo.name + " has " + robo.legs + " legs, battery " + robo.battery + "%");
    }
}

class Robot {
    String name;        // reference type: starts as null
    int legs;           // int: starts as 0
    double speed;       // double: starts as 0.0
    boolean on;         // boolean: starts as false
    int battery = 100;  // field initializer: starts as 100
}`,
    output: `name:    null
legs:    0
speed:   0.0
on:      false
battery: 100
Robo has 2 legs, battery 85%`,
    codeSummary: 'The class `Robot` has five fields. A fresh robot shows the default values (`null`, `0`, `0.0`, `false`) and the start value `100`. Then `main` writes its own values into the fields.',
    codeExplanation: [
      { label: 'Line 3', code: 'Robot robo = new Robot();', text: 'Makes one `Robot` object. Its fields exist at once, filled with their default or start values.' },
      { label: 'Line 6', code: 'System.out.println("name:    " + robo.name);', text: '`robo.name` reads the field `name` of this object. Nobody set it, so it is `null` and the text `null` is printed.' },
      { label: 'Line 7', code: 'System.out.println("legs:    " + robo.legs);', text: 'An `int` field you never set is `0`, not an error. Fields always have a value.' },
      { label: 'Line 9', code: 'System.out.println("on:      " + robo.on);', text: 'A `boolean` field starts as `false`.' },
      { label: 'Line 10', code: 'System.out.println("battery: " + robo.battery);', text: 'This field has an initializer (`= 100`), so it starts at `100` instead of `0`.' },
      { label: 'Line 13', code: 'robo.name = "Robo";', text: 'Writes a value into the field. From now on, this object remembers the name.' },
      { label: 'Line 16', code: 'robo.battery = robo.battery - 15;', text: 'Reads the field, subtracts 15 and writes the result back. The object now holds `85`.' },
      { label: 'Line 22', code: 'String name;        // reference type: starts as null', text: 'A field declaration: type and name, in the class body, outside any method.' },
      { label: 'Line 26', code: 'int battery = 100;  // field initializer: starts as 100', text: 'A field initializer. Java runs it for every new `Robot`, so every robot starts full.' }
    ],
    sections: [
      {
        title: 'Fields live in the class, not in a method',
        text: [
          'A field and a local variable look alike: both have a type and a name. The difference is **where** you write them. That place decides how long they live and whether they get a default value.'
        ],
        table: {
          head: ['', 'Field', 'Local variable'],
          rows: [
            ['Where you write it', 'In the class body, outside methods', 'Inside a method (or a block)'],
            ['Who owns it', 'Each object has its own copy', 'One call of the method'],
            ['How long it lives', 'As long as the object lives', 'Until the method (or block) ends'],
            ['Default value', 'Yes: `0`, `0.0`, `false`, `null`', 'No: you must set it before you read it'],
            ['How you reach it', '`object.field` (or `field` inside the class)', 'Only by its name, only inside that method']
          ]
        },
        warn: 'A local variable without a value does not compile: `int x; System.out.println(x);` gives "variable x might not have been initialized". A field in the same situation prints `0`.'
      },
      {
        title: 'The default values',
        text: [
          'When Java makes an object, it fills every field with "zero" of its type before anything else happens. This table shows what that zero looks like for each type.'
        ],
        table: {
          head: ['Field type', 'Default value', 'Prints as'],
          rows: [
            ['`byte`, `short`, `int`, `long`', '`0`', '`0`'],
            ['`float`, `double`', '`0.0`', '`0.0`'],
            ['`boolean`', '`false`', '`false`'],
            ['`char`', '`\\u0000` (character number 0)', 'an invisible character'],
            ['`String`, arrays, every class type', '`null`', '`null`']
          ],
          note: '`null` is not the text "null" and not an empty text `""`. It means: no object at all. The lesson "null and NullPointerException" shows why that matters.'
        },
        tip: 'Do not lean on defaults for important data. A score that starts at `0` is fine. A name that starts as `null` usually is a bug waiting to happen. The lesson "Constructors" shows how to fill every field when the object is made.'
      },
      {
        title: 'Each object has its own fields',
        text: [
          'Two objects from the same class share the plan, not the values. Changing a field in one object leaves the other object alone.'
        ],
        mermaid: `flowchart LR
  P["class Player (plan: name, score)"]
  P -->|"new"| A["object ana: name = Ana, score = 30"]
  P -->|"new"| B["object ben: name = Ben, score = 10"]`,
        diagramNote: 'Both objects have a `name` and a `score` field. Each holds its own values.',
        fileName: 'ScoreBoard.java',
        code: `public class ScoreBoard {
    public static void main(String[] args) {
        Player ana = new Player();
        ana.name = "Ana";
        Player ben = new Player();
        ben.name = "Ben";

        ana.score = ana.score + 10;
        ana.score = ana.score + 20;
        ben.score = ben.score + 10;

        System.out.println(ana.name + ": " + ana.score);
        System.out.println(ben.name + ": " + ben.score);
    }
}

class Player {
    String name;
    int score;   // every player starts at 0
}`,
        output: `Ana: 30
Ben: 10`
      },
      {
        title: 'Fields can hold arrays and other objects',
        text: [
          'A field can have a reference type: an array or another class. Then the field holds an arrow to that other object. Until you set it, the arrow points nowhere (`null`).',
          'Here a `Pet` has an array of tricks, and a field `best` of type `Pet` for its best friend. That friend is another `Pet` object.'
        ],
        fileName: 'PetFriends.java',
        code: `public class PetFriends {
    public static void main(String[] args) {
        Pet rex = new Pet();
        rex.name = "Rex";
        System.out.println("tricks before: " + rex.tricks);
        System.out.println("best before:   " + rex.best);

        rex.tricks = new String[] { "sit", "roll" };
        Pet mia = new Pet();
        mia.name = "Mia";
        rex.best = mia;   // the field now points to the object mia

        System.out.println(rex.name + " knows " + rex.tricks.length + " tricks");
        System.out.println(rex.name + "'s best friend is " + rex.best.name);
    }
}

class Pet {
    String name;
    String[] tricks;   // an array field: starts as null
    Pet best;          // a field of the same class: starts as null
}`,
        output: `tricks before: null
best before:   null
Rex knows 2 tricks
Rex's best friend is Mia`,
        tip: '`rex.best.name` reads from left to right: take `rex`, follow its field `best` to the other pet, then read that pet’s `name`. The lesson "Objects Working Together" builds on this.'
      }
    ],
    technical: [
      'When you write `new Robot()`, the JVM first reserves enough memory on the heap for all fields of a `Robot`. It then sets every byte of that memory to zero. Zero bits mean `0` for numbers, `false` for `boolean` and `null` for references. That is where default values come from: they cost nothing extra.',
      'Field initializers like `int battery = 100;` are copied by the compiler into the code that builds the object (the constructor, see the lesson "Constructors"). So the order is: memory zeroed, then initializers run, then the constructor body runs.',
      'Local variables live in the stack frame of one method call. The JVM does not zero them. Instead, the compiler checks that every path sets a local variable before it is read ("definite assignment"). That check is why a local without a value is a compile error, while a field without a value is fine.'
    ],
    tryIt: {
      steps: [
        'Copy `RobotDemo.java` and run it once with `java RobotDemo.java`.',
        'Add a field `char letter;` to `Robot` and print `"[" + robo.letter + "]"` before the other lines.',
        'Change `double speed;` to `double speed = 2.5;` and run again.',
        'Make a second robot `Robot other = new Robot();` and print `other.battery` after you changed `robo.battery`.'
      ],
      see: '`[` followed by an invisible character and `]`, `speed: 2.5`, and `100` for the second robot: its battery did not change when the first one lost 15%.'
    },
    check: [
      { q: 'What does `new Robot().legs` give if the class says `int legs;`?', a: '`0`. Every `int` field starts at `0`.' },
      { q: 'A class has `String nickname;`. What is the value before you set it, and is it the same as `""`?', a: 'It is `null`: no object at all. `""` is a real `String` object with zero characters. They are different.' },
      { q: 'Why does `int count; System.out.println(count);` inside `main` not compile, while a field `int count;` prints `0`?', a: 'Local variables get no default value; the compiler forces you to set them first. Fields are part of an object, and the JVM zeroes the object’s memory, so fields always start with a default.' }
    ],
    keyPoints: [
      'A field is a variable in the class body, outside every method.',
      'Every object has its own copy of every field; the values are its state.',
      'Unset fields get `0`, `0.0`, `false`, `\\u0000` or `null`. Local variables get nothing.',
      'A field initializer (`int battery = 100;`) gives every new object your own start value.',
      'A reference field (`String`, array, class) holds an arrow; until set, it is `null`.'
    ],
    commonMistakes: [
      'Writing the "field" inside `main`: `public static void main(...) { int score; }` is a local variable. Move it into the class body: `class Player { int score; }`.',
      'Thinking `null` is the same as `""`. Calling `name.length()` on a `null` field crashes; give the field a value first.',
      'Expecting one object’s change to show in another: `ana.score = 5;` does not change `ben.score`. Each object has its own fields.',
      'Relying on defaults for data that must be set, such as a name. Fill such fields in a constructor (next lessons).'
    ],
    related: ['Why Classes Exist', 'Creating Objects with new', 'Constructors', 'Types and Variables']
  }]);
})();
