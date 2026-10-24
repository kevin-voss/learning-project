(function () {
  const terms = Java.topicDetails['classes-and-objects'].glossary;

  Java.addCoreLessons('classes-and-objects', [{
    id: 'fields-state',
    title: 'Fields and Default Values',
    category: 'concept',
    icon: 'F',
    tagline: 'What an object knows',
    glossary: terms,
    realWorld: 'A sign-up form at the swimming pool. Same boxes for everybody: name, age, can swim. Every child gets their own copy and writes their own answers. A box nobody fills stays empty.',
    kid: [
      'The boxes are **fields**. Every object is one copy of the form. Forget a box? Java fills it: `0` for numbers, `false` for yes/no, `null` (empty) for text.'
    ],
    definition: 'A **field** is a variable declared inside a class but outside every method. Each object gets its own copy. Together, the field values are the **state** of the object. An unset field gets a **default value**: `0`, `0.0`, `false` or `null`.',
    explain: [
      'Write a field in the class body: `int age;`. Full name: **instance field** (each instance has its own). It lives as long as the object. A **local variable** inside a method is gone when the method ends.',
      'Any type is allowed: `int`, `String`, arrays, even another class. Reference types hold an arrow; until set, that is `null`.',
      'Your own start value = **field initializer**: `int battery = 100;`. Every new object then starts at `100` instead of `0`.'
    ],
    why: 'An object must remember things between method calls. Locals forget when the method ends. Fields keep the data as long as the object exists.',
    whenUse: 'Field: describes the object and must survive across calls. Local: only one method needs it for a moment.',
    syntax: '`class ClassName { type fieldName; type other = startValue; }`. Read or write with `object.fieldName`.',
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
    codeSummary: 'A fresh robot shows defaults and the start value `100`. Then `main` writes its own values.',
    codeExplanation: [
      { label: 'Line 3', code: 'Robot robo = new Robot();', text: 'Makes one object. Fields exist at once with defaults or start values.' },
      { label: 'Line 6', code: 'System.out.println("name:    " + robo.name);', text: 'Unset reference field → `null`.' },
      { label: 'Line 10', code: 'System.out.println("battery: " + robo.battery);', text: 'Initializer `= 100` beats the default `0`.' },
      { label: 'Line 16', code: 'robo.battery = robo.battery - 15;', text: 'Read, change, write back → `85`.' },
      { label: 'Line 22', code: 'String name;        // reference type: starts as null', text: 'Field declaration: type and name, in the class body, outside any method.' },
      { label: 'Line 26', code: 'int battery = 100;  // field initializer: starts as 100', text: 'Runs for every new `Robot`.' }
    ],
    sections: [
      {
        title: 'Field vs local variable',
        table: {
          head: ['', 'Field', 'Local variable'],
          rows: [
            ['Where', 'Class body, outside methods', 'Inside a method'],
            ['Who owns it', 'Each object has its own', 'One call of the method'],
            ['How long', 'As long as the object', 'Until the method ends'],
            ['Default value', 'Yes: `0`, `false`, `null`…', 'No: you must set it first'],
            ['How you reach it', '`object.field`', 'Only inside that method']
          ]
        },
        warn: '`int x; System.out.println(x);` inside a method does not compile. The same as a field prints `0`.'
      },
      {
        title: 'The default values',
        table: {
          head: ['Field type', 'Default', 'Prints as'],
          rows: [
            ['`byte`, `short`, `int`, `long`', '`0`', '`0`'],
            ['`float`, `double`', '`0.0`', '`0.0`'],
            ['`boolean`', '`false`', '`false`'],
            ['`char`', '`\\u0000` (character number 0)', 'an invisible character'],
            ['`String`, arrays, every class type', '`null`', '`null`']
          ],
          note: '`null` is not `""`. It means no object at all. See the null lesson later.'
        },
        tip: 'Do not lean on defaults for important data (a name). Fill those in a constructor (next lessons).'
      },
      {
        title: 'Each object has its own fields',
        text: [
          'Two objects share the plan, not the values. Changing one leaves the other alone.'
        ],
        mermaid: `flowchart LR
  P["class Player (plan: name, score)"]
  P -->|"new"| A["object ana: name = Ana, score = 30"]
  P -->|"new"| B["object ben: name = Ben, score = 10"]`,
        diagramNote: 'Both have `name` and `score`. Each holds its own values.',
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
          'A reference field holds an arrow to an array or another object. Until you set it, it is `null`. Read left to right: `rex.best.name`.'
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
        tip: 'The lesson "Objects Working Together" builds on this.'
      }
    ],
    technical: [
      '`new Robot()` zeroes heap memory for the fields first (`0` / `false` / `null`). Then initializers run, then the constructor.',
      'Locals live on the stack and are not zeroed. The compiler forces you to set them before reading ("definite assignment").'
    ],
    tryIt: {
      steps: [
        'Copy `RobotDemo.java` and run it.',
        'Add `char letter;` and print `"[" + robo.letter + "]"`.',
        'Change to `double speed = 2.5;` and make a second robot; print `other.battery` after changing `robo.battery`.'
      ],
      see: 'an invisible char in the brackets, `speed: 2.5`, and `100` for the second robot — its battery did not change.'
    },
    check: [
      { q: 'What does `new Robot().legs` give if the class says `int legs;`?', a: '`0`.' },
      { q: 'A class has `String nickname;`. Value before you set it — same as `""`?', a: '`null`: no object. `""` is a real empty string. Different.' },
      { q: 'Why does a local `int count;` fail to print, while a field prints `0`?', a: 'Locals get no default; the compiler forces a value first. Fields are zeroed with the object.' }
    ],
    keyPoints: [
      'A field lives in the class body; each object has its own copy.',
      'Unset fields: `0`, `0.0`, `false`, `\\u0000` or `null`. Locals get nothing.',
      'A field initializer sets your own start value for every new object.',
      'A reference field holds an arrow; until set, it is `null`.'
    ],
    commonMistakes: [
      'Writing the "field" inside `main` — that is a local. Move it into the class body.',
      'Treating `null` like `""`. Call `name.length()` only after you set the field.',
      'Expecting `ana.score = 5` to change `ben.score`. Each object has its own fields.',
      'Relying on defaults for data that must be set. Use a constructor.'
    ],
    related: ['Why Classes Exist', 'Creating Objects with new', 'Constructors', 'Types and Variables']
  }]);
})();
