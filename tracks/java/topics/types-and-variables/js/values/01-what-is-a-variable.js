// Lesson 01: what a variable is (declare, assign, initialize, reassign, read).
(function () {
  const topic = Java.topics.typesAndVariables;

  topic.lessons.push({
    num: '01',
    id: 'what-is-a-variable',
    anim: 'boxes',
    title: 'What a Variable Is',
    category: 'values',
    icon: '[ ]',
    tagline: 'A box with a name sticker',
    realWorld: 'A lunch box with your name on a sticker. The sticker is the name. What is inside is the value. Tomorrow you can put a different lunch inside, but it is still your box.',
    kid: [
      'Imagine a row of boxes on a shelf. Each box has a sticker with a name, like "apples". You can put something in the box, look inside later, or swap what is inside for something new.',
      'Each box is made for one kind of thing. An apple-counting box holds whole numbers. A name box holds words. You cannot squeeze a word into the number box.',
      'When you put something new in a box, the old thing falls out and is gone. The box only ever holds one thing at a time.'
    ],
    definition: 'A variable is a named place in memory that holds one value. Every variable has a **type** (what kind of value fits), a **name** (how you find it again) and a **value** (what is inside right now).',
    explain: [
      'To **declare** a variable means to make the box: you write the type and the name, like `int apples;`. Now Java knows the name `apples` and that it holds an `int` (a whole number). The box is still empty.',
      'To **assign** means to put a value into the box with the `=` sign: `apples = 5;`. To **initialize** means to give the very first value. You often declare and initialize in one line: `int apples = 5;`.',
      'To **reassign** means to put a new value into a box that already has one: `apples = 8;`. The old value is gone for good. You do not write the type again, because the box already exists.',
      'To **read** a variable you write its name where you need the value: `System.out.println(apples);` or `apples * 2`. Java looks inside the box and uses what it finds.',
      'Java is **statically typed**. That means the type of every variable is fixed when you write the code, and the compiler (`javac`) checks every assignment before the program runs. A wrong value is an error at compile time, not a surprise later.'
    ],
    why: 'Programs need to remember things: a score, a name, a price. A variable gives the value a name, so you can use it and change it later.',
    whenUse: 'Every time you need a value more than once, or a value that changes while the program runs.',
    syntax: 'Declare: `type name;` · Declare and initialize: `type name = value;` · Reassign: `name = newValue;` · Several at once: `int x = 1, y = 2;`',
    fileName: 'VariableBasics.java',
    code: `public class VariableBasics {
    public static void main(String[] args) {
        // 1. Declare: make an empty box called apples
        int apples;

        // 2. Assign: put the first value in
        apples = 5;
        System.out.println("Apples: " + apples);

        // 3. Declare and initialize in one line
        String fruitName = "apple";
        double pricePerApple = 0.5;

        // 4. Reassign: the old value is thrown away
        apples = 8;
        System.out.println("Apples now: " + apples);

        // 5. Use the old value to make the new one
        apples = apples + 2;
        System.out.println("After a gift: " + apples);

        // 6. Read variables to compute a new value
        double total = apples * pricePerApple;
        System.out.println(apples + " " + fruitName + "s cost " + total);
    }
}`,
    output: `Apples: 5
Apples now: 8
After a gift: 10
10 apples cost 5.0`,
    codeSummary: 'One box called `apples` is declared, filled, refilled and read. Two more boxes hold a word and a price.',
    codeExplanation: [
      { label: 'Line 4', code: 'int apples;', text: 'Declares a variable: type `int` (whole number), name `apples`. The box exists but has no value yet.' },
      { label: 'Line 7', code: 'apples = 5;', text: 'Assigns the first value. Because it is the first one, this is also called initializing.' },
      { label: 'Line 8', code: 'System.out.println("Apples: " + apples);', text: 'Reads the box. Java looks inside, finds `5` and glues it to the text with `+`.' },
      { label: 'Line 11', code: 'String fruitName = "apple";', text: 'Declares and initializes in one line. `String` is the type for text.' },
      { label: 'Line 12', code: 'double pricePerApple = 0.5;', text: '`double` is the type for numbers with a decimal point.' },
      { label: 'Line 15', code: 'apples = 8;', text: 'Reassigns. No type in front, because the box already exists. The `5` is gone now.' },
      { label: 'Line 19', code: 'apples = apples + 2;', text: 'Java works out the right side first (`8 + 2` is `10`), then puts `10` into the box. The `=` means "put into", not "is equal to".' },
      { label: 'Line 23', code: 'double total = apples * pricePerApple;', text: 'Reads two boxes, multiplies `10 * 0.5` and stores `5.0` in a new box.' },
      { label: 'Line 24', code: 'System.out.println(apples + " " + fruitName + "s cost " + total);', text: 'Reads three boxes to build one line of text.' }
    ],
    sections: [
      {
        title: 'Four moves with a box',
        text: 'Almost everything you do with a variable is one of these moves. Learn the words now: you see them in error messages and in every Java book.',
        table: {
          head: ['Move', 'Code', 'What happens'],
          rows: [
            ['Declare', '`int apples;`', 'A box named `apples` for an `int` is made. It is empty.'],
            ['Assign', '`apples = 5;`', 'The value `5` goes into the box.'],
            ['Initialize', '`int apples = 5;`', 'Declare and give the first value in one line.'],
            ['Reassign', '`apples = 8;`', 'A new value goes in. The old one is gone.'],
            ['Read', '`apples + 1`', 'Java uses the value inside. The box does not change.']
          ],
          note: 'You write the type only once, when you declare. After that you use the name alone.'
        }
      },
      {
        title: 'The life of one box',
        text: 'Follow the box `apples` through the example. It is born when you declare it, holds one value at a time, and disappears when `main` ends.',
        mermaid: `flowchart LR
  A["int apples<br/>box made, empty"] --> B["apples = 5<br/>holds 5"]
  B --> C["apples = 8<br/>holds 8, the 5 is gone"]
  C --> D["apples = apples + 2<br/>reads 8, stores 10"]
  D --> E["main ends<br/>box is gone"]`,
        diagramNote: 'At every moment the box holds exactly one value. Reassigning replaces it.'
      },
      {
        title: '= means "put into", not "is equal"',
        text: [
          'In maths, `x = x + 1` is nonsense. In Java it is normal. The `=` sign is the **assignment operator**: Java first works out everything on the right side, then puts the result into the variable on the left.',
          'That is why swapping two values needs a third, spare box. If you pour the left cup into the right cup first, the drink in the right cup is lost.'
        ],
        fileName: 'SwapCups.java',
        code: `public class SwapCups {
    public static void main(String[] args) {
        String leftCup = "milk";
        String rightCup = "juice";
        System.out.println("Before: left=" + leftCup + ", right=" + rightCup);

        String spareCup = leftCup;   // pour left into a spare cup
        leftCup = rightCup;          // pour right into left
        rightCup = spareCup;         // pour the spare into right

        System.out.println("After:  left=" + leftCup + ", right=" + rightCup);
    }
}`,
        output: `Before: left=milk, right=juice
After:  left=juice, right=milk`,
        warn: 'Without the spare cup, `leftCup = rightCup; rightCup = leftCup;` makes both cups "juice". The milk was thrown away by the first line.'
      },
      {
        title: 'One type for the whole life',
        text: [
          'A box keeps its type forever. An `int` box never holds text, not even later. The compiler checks this before your program runs, so the mistake below never reaches the user.',
          'This program does not compile on purpose. Below it you see the real message from `javac`: the file name, the line number (`3`), what is wrong, and a `^` under the bad spot.'
        ],
        fileName: 'WrongType.java',
        code: `public class WrongType {
    public static void main(String[] args) {
        int age = "nine";
    }
}`,
        noRun: true,
        output: `WrongType.java:3: error: incompatible types: String cannot be converted to int
        int age = "nine";
                  ^
1 error`,
        tip: 'Read compiler errors from the top. The first line tells you the file, the line and the problem. Fix the first error first: later ones are often caused by it.'
      },
      {
        title: 'Read only after you assign, declare only once',
        text: [
          'Java refuses to read a box that never got a value. A local variable (one declared inside a method like `main`) has no start value at all, so reading it would make no sense.',
          'Java also refuses a second declaration of the same name in the same place: `int age = 9;` and later `int age = 10;` gives `variable age is already defined in method main(String[])`. To change the value, drop the type: `age = 10;`.'
        ],
        fileName: 'NoValue.java',
        code: `public class NoValue {
    public static void main(String[] args) {
        int score;
        System.out.println(score);
    }
}`,
        noRun: true,
        output: `NoValue.java:4: error: variable score might not have been initialized
        System.out.println(score);
                           ^
1 error`,
        tip: 'Names follow the rules from [Syntax Fundamentals](../syntax-fundamentals/index.html): start with a letter, use camelCase like `pricePerApple`, and pick a name that says what is inside.'
      }
    ],
    technical: [
      'While `javac` reads your code, it keeps a table of every variable name in each block together with its type. For every `=` it checks that the value on the right fits the type on the left. For every read it checks that the variable was definitely assigned before (the rule is called **definite assignment**). Both checks happen at compile time, so the `.class` file never contains these mistakes.',
      'At run time, the local variables of a method live in that method’s **frame** on the **stack** (more in the lesson Stack, Heap, References). Each local variable gets a numbered slot. The bytecode does not use your names at all: `apples = 5;` becomes an instruction like `istore_1` ("store an int in slot 1") and reading it becomes `iload_1`.',
      'That is also why a variable costs almost nothing: a slot is 4 or 8 bytes. Use as many well-named variables as you need to make the code clear.'
    ],
    tryIt: {
      steps: [
        'Make `Piggybank.java` with `public class Piggybank` and a `main` method.',
        'Declare `int coins;` and on the next line assign `coins = 3;`.',
        'Print `"Coins: " + coins`.',
        'Reassign with `coins = coins + 4;` and print again.',
        'Now add `int coins = 1;` as a new line at the end and compile. Read the error, then delete that line.'
      ],
      see: '`Coins: 3` and `Coins: 7`, and for the extra line the error `variable coins is already defined in method main(String[])`.'
    },
    check: [
      { q: 'What is the difference between declaring and initializing?', a: 'Declaring makes the box (`int x;`). Initializing gives it its first value (`x = 4;` or both at once: `int x = 4;`).' },
      { q: 'What is in `n` after `int n = 2; n = n * 3; n = n + 1;`?', a: '`7`. First `2`, then `2 * 3` is `6`, then `6 + 1` is `7`.' },
      { q: 'Why does `age = 10;` have no `int` in front, when `int age = 9;` had one?', a: 'The type is written only when you declare. `age = 10;` reassigns a box that already exists.' }
    ],
    keyPoints: [
      'A variable has a type, a name and a value.',
      'Declare once with the type, then use the name alone.',
      '`=` puts the right side into the left side. The right side is worked out first.',
      'Reassigning throws the old value away.',
      'A local variable must get a value before you read it.'
    ],
    commonMistakes: [
      'Writing the type again to change a value: `int age = 10;` a second time. Fix: `age = 10;`.',
      'Reading before assigning: `int score; System.out.println(score);`. Fix: give it a value first, like `int score = 0;`.',
      'Swapping with two lines: `a = b; b = a;`. Fix: use a spare variable, `String spare = a; a = b; b = spare;`.',
      'Putting the wrong kind of value in: `int age = "nine";`. Fix: `int age = 9;`.'
    ],
    related: ['The Eight Primitive Types', 'Literals', 'Syntax Fundamentals'],
    glossary: topic.glossary
  });
})();
