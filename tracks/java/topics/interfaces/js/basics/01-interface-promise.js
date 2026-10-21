// Interfaces, part 1: the promise and one variable for many objects.
(function () {
  Java.addCoreTopic('interfaces', {
    label: 'Interfaces',
    headline: 'Interfaces,',
    accent: 'a promise, not a recipe.',
    intro: 'An interface lists what a class can do, without saying how. Code that uses the interface works with every class that keeps the promise.',
    overview: 'The promise → one variable, many objects → program to the interface → many interfaces → default methods → interface or abstract class → built-in interfaces → lambdas → method references and sealed interfaces (Deeper).',
    tryIt: {
      steps: [
        'Make an interface `Greeter` with one method `String greet(String name)`.',
        'Make two classes that implement it: `FriendlyGreeter` (returns `"Hi, Mia!"`) and `PoliteGreeter` (returns `"Good morning, Mia."`).',
        'In `main`, make a `List<Greeter>` with both and call `greet("Mia")` in a for-each loop.',
        'Add a third greeter, but this time write it as a lambda: `Greeter shy = name -> "Oh... hello, " + name + ".";`.',
        'Sort a `List<String>` of names by length with `names.sort((a, b) -> Integer.compare(a.length(), b.length()));` and print it.'
      ],
      see: 'three different greetings from one loop that only knows `Greeter`, then the names from shortest to longest.'
    },
    check: [
      { q: 'What does an interface contain?', a: 'Method names with their parameters and return types, but (except for `default`, `static` and `private` methods) no body. It says **what** a class can do, not **how**.' },
      { q: 'How many interfaces can one class implement? How many classes can it extend?', a: 'Many interfaces (`implements A, B, C`), but only one class (`extends`).' },
      { q: 'Why write `List<String> names = new ArrayList<>();` and not `ArrayList<String> names = …`?', a: 'The rest of the code only depends on the promise `List`. You can swap `ArrayList` for another list in one place, the line with `new`.' },
      { q: 'What makes an interface a functional interface, and why does it matter?', a: 'It has exactly one abstract method. Then you can write an object of it as a short lambda, for example `Comparator<String> byLength = (a, b) -> Integer.compare(a.length(), b.length());`.' },
      { q: 'A class implements `Comparable<Player>`. What must `compareTo` return?', a: 'A negative number if `this` comes first, `0` if both are equal, a positive number if `other` comes first. `Integer.compare(a, b)` gives you exactly that.' }
    ]
  }, [
    {
      id: 'interface-promise',
      title: 'An Interface Is a Promise',
      category: 'concept',
      icon: 'I',
      tagline: 'What, not how',
      realWorld: 'A wall socket is a promise: "two holes, the right voltage". A lamp, a kettle and a phone charger all have a plug that fits. The socket does not care which one you plug in.',
      kid: [
        'Imagine a toy shop sign: "Every toy in this box can make a sound." The sign does not say **which** sound. It only promises that you can press a button and hear something.',
        'The duck says "quack". The car says "beep". The cat says "meow". Each toy keeps the promise in its own way.',
        'An interface is that sign. A class that says "I belong in this box" must really have the button, or the shop (the compiler) will not let it in.'
      ],
      definition: 'An **interface** is a list of methods that a class promises to have. A class that writes `implements` must give every one of those methods a body.',
      explain: [
        'You already know [classes](../classes-and-objects/index.html): a class has fields and methods **with** a body, the code between `{` and `}`. An interface is a different kind of type. Its methods have **no body**. Each one ends with a `;` instead. Such a method is called an **abstract method**: it has a name, parameters and a return type, but no code yet.',
        'A class keeps the promise with the keyword `implements`. `class ConsoleSender implements NotificationSender` means: "ConsoleSender has every method that NotificationSender lists". The class then writes the body for each method. This is called **implementing** the method.',
        'Write `@Override` above each implementing method. `@Override` is an **annotation**, a small label for the compiler. It says: "this method fills in a method from above". If you misspell the name, the compiler tells you at once.',
        'The methods of an interface are automatically `public` (everyone may call them). So the implementing method must also be `public`. If you forget it, the compiler stops you.',
        'You cannot write `new NotificationSender()`. A promise alone cannot do anything. You always create an object of a class that keeps the promise, and you may store it in a variable of the interface type.'
      ],
      why: 'Code can work with any class that keeps the promise, without knowing which class it is.',
      whenUse: 'When you can imagine two or more ways to do the same job, for example print a message, send it by e-mail, or only count it in a test.',
      syntax: '`interface Name { returnType method(parameters); }` and `class Impl implements Name { @Override public returnType method(parameters) { … } }`',
      fileName: 'Notify.java',
      code: `// The promise: every NotificationSender can send a message.
interface NotificationSender {
    void send(String to, String message);
}

// Keeps the promise by printing a normal line.
class ConsoleSender implements NotificationSender {
    @Override
    public void send(String to, String message) {
        System.out.println("To " + to + ": " + message);
    }
}

// Keeps the same promise in a different way.
class ShoutSender implements NotificationSender {
    @Override
    public void send(String to, String message) {
        System.out.println("TO " + to.toUpperCase() + ": " + message.toUpperCase() + "!");
    }
}

public class Notify {
    public static void main(String[] args) {
        NotificationSender quiet = new ConsoleSender();
        NotificationSender loud = new ShoutSender();

        quiet.send("Ava", "Your parcel is here");
        loud.send("Ava", "Your parcel is here");
    }
}`,
      output: `To Ava: Your parcel is here
TO AVA: YOUR PARCEL IS HERE!`,
      codeSummary: 'One interface, two classes that keep its promise in different ways, and two variables of the interface type.',
      codeExplanation: [
        { label: 'Line 2', code: 'interface NotificationSender {', text: 'Declares a new type. The keyword `interface` instead of `class` says: this is a promise, not a finished thing.' },
        { label: 'Line 3', code: 'void send(String to, String message);', text: 'An abstract method: name, parameters and return type, but a `;` instead of a body. Every class that implements the interface must write this method.' },
        { label: 'Line 7', code: 'class ConsoleSender implements NotificationSender {', text: '`implements` signs the promise. From now on the compiler checks that ConsoleSender really has `send(String, String)`.' },
        { label: 'Line 8', code: '@Override', text: 'Tells the compiler: the next method fills in a method from the interface. A typo in the name becomes a compile error instead of a silent new method.' },
        { label: 'Line 9', code: 'public void send(String to, String message) {', text: 'The same name, parameters and return type as in the interface, now with a body. It must be `public`, because interface methods are public.' },
        { label: 'Line 15', code: 'class ShoutSender implements NotificationSender {', text: 'A second class signs the same promise. It keeps it in its own way: everything in capital letters.' },
        { label: 'Line 24', code: 'NotificationSender quiet = new ConsoleSender();', text: 'The variable has the interface type, the object is a ConsoleSender. This works because a ConsoleSender **is a** NotificationSender.' },
        { label: 'Line 27', code: 'quiet.send("Ava", "Your parcel is here");', text: 'Calls the promised method. Java runs the body of the real object, here the ConsoleSender version.' },
        { label: 'Line 28', code: 'loud.send("Ava", "Your parcel is here");', text: 'The same call on a different object runs the ShoutSender body. Same promise, different behaviour.' }
      ],
      sections: [
        {
          title: 'Write the promise',
          text: [
            'An interface looks like a class with empty methods. Read it as a contract: "whoever implements me has these methods".',
            'Every part has a fixed meaning:'
          ],
          table: {
            head: ['Part', 'Example', 'Meaning'],
            rows: [
              ['keyword', '`interface`', 'This type is a promise, not a class.'],
              ['name', '`NotificationSender`', 'A noun or an ability, written like a class name (capital first letter).'],
              ['abstract method', '`void send(String to, String message);`', 'What the class must offer. No body, ends with `;`.'],
              ['visibility', '(nothing written)', 'Interface methods are automatically `public` and `abstract`. You may write the words, but nobody does.']
            ],
            note: 'An interface usually lives in its own file `NotificationSender.java`. In the examples here, all types sit in one file so you can run them at once.'
          }
        },
        {
          title: 'The compiler checks the promise',
          text: [
            'When you compile, `javac` looks at every class that says `implements`. It walks through the list of promised methods and looks for each one in the class.'
          ],
          mermaid: `flowchart TD
  A["class ConsoleSender implements NotificationSender"] --> B["javac reads the interface"]
  B --> C{"Has the class send(String, String)?"}
  C -- yes --> D{"Is it public?"}
  C -- no --> E["error: does not override abstract method"]
  D -- yes --> F["compiles"]
  D -- no --> G["error: weaker access privileges"]`,
          diagramNote: 'The check happens **before** your program runs. A broken promise never reaches the user.'
        },
        {
          title: 'Wrong vs right: a broken promise',
          text: [
            'Here the method is misspelled as `sendd` and has no `@Override`. Java sees a new extra method, and `send` is still missing. The class does not compile. The output below is what `javac` prints.',
            'The fix: name the method exactly `send`, with the same parameter types, and put `@Override` above it.'
          ],
          fileName: 'Broken.java',
          noRun: true,
          code: `interface NotificationSender {
    void send(String to, String message);
}

class ConsoleSender implements NotificationSender {
    public void sendd(String to, String message) {   // typo!
        System.out.println("To " + to + ": " + message);
    }
}

public class Broken {
    public static void main(String[] args) {
        new ConsoleSender().sendd("Ava", "Hi");
    }
}`,
          output: `Broken.java:5: error: ConsoleSender is not abstract and does not override abstract method send(String,String) in NotificationSender
class ConsoleSender implements NotificationSender {
^
1 error`,
          warn: 'If you leave out `public` on the implementing method, you get `attempting to assign weaker access privileges; was public`. Fix: write `public void send(…)`.'
        },
        {
          title: 'A promise with inputs and a result',
          text: [
            'Interface methods can take parameters and return values, like any method. Here `Calculator` promises: "give me two numbers and I give you one back". Two classes keep the promise with different maths.',
            'The method `show` takes the **interface type** as its parameter. It works with every calculator, even ones that do not exist yet.'
          ],
          fileName: 'Calculators.java',
          code: `interface Calculator {
    int apply(int a, int b);
}

class Adder implements Calculator {
    @Override
    public int apply(int a, int b) {
        return a + b;
    }
}

class Multiplier implements Calculator {
    @Override
    public int apply(int a, int b) {
        return a * b;
    }
}

public class Calculators {
    static void show(String label, Calculator calc) {
        System.out.println(label + ": " + calc.apply(6, 7));
    }

    public static void main(String[] args) {
        show("add", new Adder());
        show("multiply", new Multiplier());
    }
}`,
          output: `add: 13
multiply: 42`
        },
        {
          title: 'You cannot create a promise',
          text: [
            'An interface has no bodies, so there is nothing to run. `new` on an interface is therefore forbidden. The compiler calls the interface "abstract", which means "not finished".'
          ],
          fileName: 'NoNew.java',
          noRun: true,
          code: `interface NotificationSender {
    void send(String to, String message);
}

public class NoNew {
    public static void main(String[] args) {
        NotificationSender sender = new NotificationSender();   // not allowed
    }
}`,
          output: `NoNew.java:7: error: NotificationSender is abstract; cannot be instantiated
        NotificationSender sender = new NotificationSender();   // not allowed
                                    ^
1 error`,
          tip: 'Read the type on the left as "what I may ask for" and the class after `new` as "who really does the work".'
        }
      ],
      technical: [
        '`javac` turns an interface into its own `.class` file, like a class, but marked with the flag `ACC_INTERFACE`. Each abstract method is stored with its name and **descriptor** (the parameter and return types) and no bytecode.',
        'A class file that implements an interface lists that interface in a table of "interfaces". When the JVM loads the class, it records that ConsoleSender **is a** NotificationSender. That is why the assignment `NotificationSender quiet = new ConsoleSender();` is allowed.',
        'A call through an interface variable compiles to the bytecode instruction `invokeinterface`. At run time the JVM looks at the real object and finds its `send` method. This is how the same line can run different code.',
        'Fields in an interface are always `public static final`, which means constants. An interface cannot have normal fields, so it can never store the state of an object.'
      ],
      tryIt: {
        steps: [
          'Save the main example as `Notify.java`, then run `javac Notify.java` and `java Notify`.',
          'Add a third class `WhisperSender` that prints the message in lower case with `"..."` in front.',
          'Create it in `main` with `NotificationSender soft = new WhisperSender();` and call `soft.send("Ava", "Your parcel is here");`.',
          'Now remove `public` from its `send` method and compile again.'
        ],
        see: 'three lines, the last one `...to ava: your parcel is here` (or your own style). Without `public`: the error `attempting to assign weaker access privileges; was public`.'
      },
      check: [
        { q: 'What is the difference between a method in an interface and a method in a class?', a: 'The interface method (normally) has no body. It ends with `;`. The class method has a body in `{ }` with the real code.' },
        { q: 'What does `@Override` do?', a: 'It asks the compiler to check that the method really fills in a method from the interface. A typo then becomes a compile error.' },
        { q: 'Can you write `new Calculator()` when `Calculator` is an interface?', a: 'No. An interface is not finished (abstract). You write `new Adder()` and may store it in a `Calculator` variable.' }
      ],
      keyPoints: [
        'An interface is a list of promised methods without bodies.',
        '`implements` means "I keep these promises". The compiler checks every one.',
        'Always write `@Override` and `public` on the implementing method.',
        'You cannot `new` an interface, but you can use it as the type of a variable or parameter.'
      ],
      commonMistakes: [
        'Forgetting `public`: `void send(…)` in the class. Fix: `public void send(…)`.',
        'A different signature: `public void send(String message)` (one parameter instead of two). Fix: copy the exact parameter types from the interface.',
        'Writing a body in the interface: `void send(String to, String m) { … }` without `default`. Fix: end it with `;`, or read the lesson on default methods.',
        'Trying `new NotificationSender()`. Fix: create an object of a class that implements it.'
      ],
      related: ['Classes & Objects', 'interface-polymorphism', 'interface-or-abstract']
    }
  ]);
})();
