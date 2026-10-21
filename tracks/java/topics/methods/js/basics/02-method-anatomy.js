// Lesson 2: the method header, word by word.
(function () {
  Java.addCoreLessons('methods', [{
    id: 'method-anatomy',
    title: 'Anatomy of a Method',
    category: 'concept',
    icon: '{}',
    tagline: 'Every word of the header, one by one',
    realWorld: 'A sign on a juice machine: "Juice maker. Put in: 2 oranges. You get: 1 glass of juice." The sign tells you how to use the machine. The inside does the work.',
    kid: [
      'Every method has a little name tag on top. The tag tells you three things: what the method is called, what you must give it, and what it gives back to you.',
      'Think of the juice machine. You do not need to open it to use it. The sign says what goes in and what comes out. That is enough.',
      'Below the sign is the inside of the machine, where the oranges get squeezed. In Java the sign is the **header** and the inside is the **body**.'
    ],
    definition: 'A method has a **header** (its first line: modifiers, return type, name and parameter list) and a **body** (the code between `{` and `}`). The name together with the parameter types is the method **signature**.',
    explain: [
      'Take the header `public static int add(int a, int b)`. Read it from left to right. Each word has one job, and the order is always the same.',
      '`public` is an **access modifier**: it says who may call the method. `public` means any code anywhere. If you leave it out, only classes in the same package (folder) can call it, which is fine for small programs. [Classes and objects](../classes-and-objects/index.html) explains `private` and the other modifiers.',
      '`static` means the method belongs to the class itself, so `main` can call it straight away. Every method in this topic is `static`; the lesson on `void` and `static` says more.',
      '`int` is the **return type**: the kind of value the method gives back. It can be any type, like `double`, `boolean` or `String`. The special word `void` means "gives nothing back".',
      '`add` is the method **name**. It follows the rules for names you know from [Syntax fundamentals](../syntax-fundamentals/index.html): lowerCamelCase, and usually a verb, like `printStars` or `countVowels`.',
      '`(int a, int b)` is the **parameter list**: the inputs, each with a type and a name, separated by commas. Empty brackets `()` mean no inputs. After the header comes the body in `{ }`. If the return type is not `void`, the body must hand back a value with `return`.'
    ],
    why: 'The header is a promise. It tells every caller what to pass in and what comes back, without reading the body.',
    whenUse: 'Every time you write a method you write a header. Every time you call one, you read its header to know what it needs.',
    syntax: '`modifiers returnType name(type1 name1, type2 name2) { body }`, for example `public static int add(int a, int b) { return a + b; }`',
    table: {
      label: 'The header word by word',
      head: ['Part', 'In the example', 'What it means'],
      rows: [
        ['Access modifier', '`public`', 'Who may call it. Optional for now.'],
        ['`static`', '`static`', 'Belongs to the class. `main` can call it directly.'],
        ['Return type', '`int`', 'What it gives back. `void` means nothing.'],
        ['Name', '`add`', 'What you type to call it. A verb in lowerCamelCase.'],
        ['Parameter list', '`(int a, int b)`', 'The inputs: a type and a name for each one.'],
        ['Body', '`{ return a + b; }`', 'The steps. They run on every call.']
      ],
      note: 'Header = everything before `{`. Signature = name plus parameter types, here `add(int, int)`.'
    },
    visualLabel: 'The parts in reading order',
    mermaid: `flowchart LR
    M["modifiers: public static"] --> R["return type: int"]
    R --> N["name: add"]
    N --> P["parameters: int a, int b"]
    P --> B["body: return a + b"]`,
    visualNote: 'You always write the parts in this order. Swap two of them and javac stops with an error.',
    fileName: 'Anatomy.java',
    code: `public class Anatomy {
    // No inputs, gives nothing back.
    static void sayHello() {
        System.out.println("Hello!");
    }

    // One input, gives nothing back.
    static void sayHelloTo(String name) {
        System.out.println("Hello, " + name + "!");
    }

    // Two inputs, gives back an int.
    public static int add(int a, int b) {
        return a + b;
    }

    // One input, gives back a boolean (true or false).
    static boolean isEven(int number) {
        return number % 2 == 0;
    }

    public static void main(String[] args) {
        sayHello();
        sayHelloTo("Mia");
        int sum = add(4, 6);
        System.out.println("4 + 6 = " + sum);
        System.out.println("Is 7 even? " + isEven(7));
    }
}`,
    output: `Hello!
Hello, Mia!
4 + 6 = 10
Is 7 even? false`,
    codeSummary: 'Four methods with four different headers: no input and no result, one input and no result, two inputs and an `int` result, one input and a `boolean` result.',
    codeExplanation: [
      { label: 'Line 3', code: 'static void sayHello() {', text: '`void`: no result. `()`: no input. The smallest possible header.' },
      { label: 'Line 8', code: 'static void sayHelloTo(String name) {', text: 'One parameter: a `String` called `name`. Inside the body, `name` holds whatever the caller passed.' },
      { label: 'Line 13', code: 'public static int add(int a, int b) {', text: 'Every part of a header in one line: modifier, `static`, return type `int`, name, two parameters.' },
      { label: 'Line 14', code: 'return a + b;', text: 'The body hands back an `int`, as the header promised.' },
      { label: 'Line 18', code: 'static boolean isEven(int number) {', text: 'A method that answers a yes/no question returns `boolean`. Its name starts with `is`.' },
      { label: 'Line 19', code: 'return number % 2 == 0;', text: '`%` gives the remainder. An even number has remainder 0, so the comparison is `true` or `false`.' },
      { label: 'Line 23', code: 'sayHello();', text: 'A call with no arguments still needs the empty brackets.' },
      { label: 'Line 25', code: 'int sum = add(4, 6);', text: 'The result of `add` is an `int`, so it goes into an `int` variable.' },
      { label: 'Line 27', code: 'System.out.println("Is 7 even? " + isEven(7));', text: 'The `boolean` result is glued to the text and prints as `false`.' }
    ],
    sections: [
      {
        title: 'Read the header of main',
        text: [
          'You have written `public static void main(String[] args)` since your first program. Now you can read every word of it.'
        ],
        table: {
          head: ['Word', 'Meaning'],
          rows: [
            ['`public`', 'The JVM, which is outside your class, must be allowed to call it.'],
            ['`static`', 'The JVM calls it without making an object first.'],
            ['`void`', '`main` gives nothing back.'],
            ['`main`', 'The name the JVM looks for when the program starts.'],
            ['`String[] args`', 'One parameter: a list of texts typed after `java Anatomy` on the command line. `String[]` is an array, which you learn in [Arrays](../arrays/index.html).']
          ]
        }
      },
      {
        title: 'The signature: name plus parameter types',
        text: [
          'Java tells methods apart by their **signature**. The signature of `public static int add(int a, int b)` is `add(int, int)`.',
          'Some parts of the header are not in the signature. That matters later for overloading, where several methods share one name.'
        ],
        bullets: [
          'In the signature: the name `add` and the parameter types in order, `int, int`.',
          'Not in the signature: the return type `int`, the modifiers `public static`, the parameter names `a` and `b`.',
          'So `add(int x, int y)` has the same signature as `add(int a, int b)`. They count as the same method.'
        ]
      },
      {
        title: 'Good method names',
        text: [
          'A method name says what the method does. Use a verb for actions and `is`, `has` or `can` for yes/no questions. A good name means the reader does not need to open the body.'
        ],
        table: {
          head: ['Weak name', 'Better name', 'Why'],
          rows: [
            ['`doStuff()`', '`printReceipt()`', 'Says which job.'],
            ['`check(int n)`', '`isEven(int n)`', 'Shows that the answer is yes or no.'],
            ['`Total(int a, int b)`', '`total(int a, int b)`', 'Methods start with a small letter.'],
            ['`calc2(int s)`', '`areaOfSquare(int side)`', 'No numbers to tell methods apart; name the job and the input.']
          ]
        }
      },
      {
        title: 'Methods can come in any order',
        text: [
          'javac reads the whole class before it checks the calls. So `main` can be on top and the helper below it, or the other way round. Pick one style and keep it.'
        ],
        fileName: 'OrderDemo.java',
        code: `public class OrderDemo {
    public static void main(String[] args) {
        System.out.println(square(7));   // square is defined below: fine
    }

    static int square(int n) {
        return n * n;
    }
}`,
        output: '49'
      },
      {
        title: 'Wrong vs right: the parts have a fixed order',
        text: [
          'Here the return type comes after the name. javac expects a name (an "identifier") at that spot and stops.'
        ],
        fileName: 'WrongOrder.java',
        noRun: true,
        code: `public class WrongOrder {
    static add int(int a, int b) {      // wrong: name before the return type
        return a + b;
    }

    public static void main(String[] args) {
        System.out.println(add(1, 2));
    }
}`,
        output: `WrongOrder.java:2: error: <identifier> expected
    static add int(int a, int b) {      // wrong: name before the return type
              ^
WrongOrder.java:2: error: <identifier> expected
    static add int(int a, int b) {      // wrong: name before the return type
                  ^
2 errors`,
        warn: 'This code does not compile on purpose; the output is what `javac` prints. Fix: `static int add(int a, int b)`, return type before the name.'
      }
    ],
    technical: [
      'javac stores each method in the `.class` file with a **descriptor**, a short code for its parameter and return types. `add(int, int)` returning `int` becomes `(II)I`. `main` becomes `([Ljava/lang/String;)V`, where `[` means array and `V` means void.',
      'Run `javap -s Anatomy` after compiling and you see the descriptor under every method. The JVM finds the method for a call by name plus descriptor.',
      'Parameter names like `a` and `b` are not needed to run the method. The JVM refers to parameters by position: slot 0, slot 1, and so on. That is why renaming a parameter never breaks a caller.'
    ],
    tryIt: {
      steps: [
        'Add a method `static int triple(int n)` to `Anatomy.java` that returns `n * 3`.',
        'In `main`, add `System.out.println(triple(5));` as the last line.',
        'Compile and run.',
        'Now change the header to `static triple int(int n)` and compile again. Read the error, then change it back.'
      ],
      see: '`15` on the last line; with the broken header, `<identifier> expected`.'
    },
    check: [
      { q: 'In `static double half(double x)`, what is the return type and what is the parameter?', a: '`double` is the return type. `double x` is the one parameter.' },
      { q: 'What is the signature of `public static int add(int a, int b)`?', a: '`add(int, int)`: the name plus the parameter types. Return type, modifiers and parameter names are not part of it.' },
      { q: 'What do empty brackets `()` in a header mean?', a: 'The method takes no parameters. You still write `()` when you call it.' }
    ],
    keyPoints: [
      'Header order: modifiers, return type, name, parameter list.',
      'The body in `{ }` holds the steps.',
      'Every parameter has its own type and name.',
      '`void` as return type means no value comes back.',
      'Signature = name + parameter types.'
    ],
    commonMistakes: [
      'Name before the return type: `static add int(int a, int b)`. Fix: `static int add(int a, int b)`.',
      'Parameters without types: `static int add(a, b)`. Fix: `(int a, int b)`, a type for each one.',
      'Sharing one type: `static int add(int a, b)`. That works for variables, not for parameters. Fix: `(int a, int b)`.',
      'A semicolon after the header: `static void hi(); { … }`. javac says `missing method body`. Fix: no `;` between `)` and `{`.'
    ],
    related: ['Why Methods Exist', 'Parameters and Return Values', 'Syntax Fundamentals']
  }]);
})();
