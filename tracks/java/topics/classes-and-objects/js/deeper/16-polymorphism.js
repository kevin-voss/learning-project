(function () {
  const terms = Java.topicDetails['classes-and-objects'].glossary;

  Java.addCoreLessons('classes-and-objects', [{
    id: 'polymorphism',
    title: 'Overriding and Polymorphism',
    category: 'deeper',
    icon: 'P',
    tagline: 'One call, many answers',
    glossary: terms,
    realWorld: 'A school band. The teacher says one sentence: "Everybody, play your note!" The violin plays a violin note, the drum goes boom, the flute whistles. Same words for everybody, and each instrument answers in its own way.',
    kid: [
      'The music teacher does not walk to every child and say "violin, play like a violin" and "drum, play like a drum". She says only: "Everybody, play!"',
      'Each instrument knows by itself how it sounds. The teacher does not need to know.',
      'In Java, the teacher says `animal.speak()`. A dog answers "Woof", a cat answers "Meow". The dog and the cat each have their own `speak()` that **replaces** the general one. Replacing is called **overriding**, and "one call, many answers" is called **polymorphism** (Greek for "many shapes").'
    ],
    definition: '**Overriding** means a subclass writes its own version of a method it inherited, with the same name and parameters. **Polymorphism** means a variable of the superclass type (`Animal`) can hold any subclass object (`Dog`, `Cat`), and a call like `animal.speak()` runs the version of the **real object**.',
    explain: [
      'In "Inheritance: extends and super", `Dog` got `describe()` from `Animal` and replaced it. That replacement is overriding. The method in the subclass must have the same name and the same parameter types, and it may not be less visible (a `public` method stays `public`).',
      'Put `@Override` above every overriding method. You met it with `toString()`: it asks the compiler to check that a parent really has this method. A typo or a different parameter list becomes a compile error instead of a quiet new method.',
      'Because a `Dog` **is an** `Animal`, you may store it in an `Animal` variable: `Animal pet = new Dog("Rex");`. An `Animal[]` array may hold dogs, cats and cows side by side.',
      'Two types are now in play. The **variable type** (`Animal`) decides what you may call: only methods that every `Animal` has. The **object type** (`Dog`) decides which code runs: the `Dog` version of `speak()`. The choice happens while the program runs; it is called **dynamic dispatch**.',
      'This is what lets one loop treat many kinds of objects the same way, and lets you add a new kind later (a `Cow`) without touching the loop. `println` uses the same trick: it calls `toString()` on an `Object`, and your override runs.'
    ],
    why: 'Without polymorphism, code that works with animals would need an `if` for every kind: "if it is a dog, bark; if it is a cat, meow …". Every new animal would mean changing all those places. With overriding, each class carries its own behavior, and the calling code stays the same.',
    whenUse: 'When several subclasses must do "the same thing in their own way": animals speak, shapes compute their area, payments are processed. Write the general method in the superclass, override it in each subclass, and work with the superclass type.',
    syntax: '`@Override returnType sameName(sameParameters) { … }` in the subclass. Use it through the parent type: `Animal a = new Dog(…); a.speak();`.',
    fileName: 'ZooDemo.java',
    code: `public class ZooDemo {
    public static void main(String[] args) {
        Animal[] zoo = {
            new Dog("Rex"),
            new Cat("Tom"),
            new Cow("Bella"),
            new Animal("Nemo")
        };

        for (Animal animal : zoo) {
            animal.speak();          // which speak()? the one of the real object
        }
    }
}

class Animal {
    private final String name;

    Animal(String name) { this.name = name; }

    String getName() { return name; }

    void speak() {
        System.out.println(name + " makes a sound");
    }
}

class Dog extends Animal {
    Dog(String name) { super(name); }

    @Override
    void speak() { System.out.println(getName() + " says Woof"); }
}

class Cat extends Animal {
    Cat(String name) { super(name); }

    @Override
    void speak() { System.out.println(getName() + " says Meow"); }
}

class Cow extends Animal {
    Cow(String name) { super(name); }
    // no override: Cow uses Animal's speak()
}`,
    output: `Rex says Woof
Tom says Meow
Bella makes a sound
Nemo makes a sound`,
    codeSummary: 'An `Animal[]` holds four different objects. The loop calls `speak()` the same way on each, and every object answers with its own version. `Cow` has no override, so it falls back to the version in `Animal`.',
    codeExplanation: [
      { label: 'Line 3', code: 'Animal[] zoo = {', text: 'An array of type `Animal[]`. Every element may be an `Animal` or any subclass of it.' },
      { label: 'Line 4', code: 'new Dog("Rex"),', text: 'A `Dog` is an `Animal`, so it fits into an `Animal` slot. The object stays a `Dog`.' },
      { label: 'Line 10', code: 'for (Animal animal : zoo) {', text: 'The loop variable has the type `Animal`. The loop does not know or care which kind each one is.' },
      { label: 'Line 11', code: 'animal.speak();          // which speak()? the one of the real object', text: 'The compiler checks that `Animal` has `speak()`. At run time, the JVM runs the version of the real object: Dog, Cat, or Animal.' },
      { label: 'Line 23', code: 'void speak() {', text: 'The general version in the superclass. Every animal has it, so every animal can be asked.' },
      { label: 'Line 31', code: '@Override', text: 'Tells the compiler: this replaces `speak()` from `Animal`. A typo would now be an error.' },
      { label: 'Line 32', code: 'void speak() { System.out.println(getName() + " says Woof"); }', text: 'Same name, same (empty) parameter list: an override. For `Dog` objects, this version wins.' },
      { label: 'Line 44', code: '// no override: Cow uses Animal\'s speak()', text: 'Overriding is optional. Without it, the inherited version runs.' }
    ],
    sections: [
      {
        title: 'Overriding or overloading?',
        text: [
          'The two words sound alike and mean different things. You know overloading from [Methods](../methods/index.html): same name, **different** parameters, in one class. Overriding: same name, **same** parameters, in a subclass.'
        ],
        table: {
          head: ['', 'Overloading', 'Overriding'],
          rows: [
            ['Where', 'Usually in the same class', 'In a subclass'],
            ['Name', 'Same', 'Same'],
            ['Parameters', 'Different', 'Exactly the same types'],
            ['Who picks the version', 'The compiler, from the argument types', 'The JVM at run time, from the object type'],
            ['Example', '`print(int)` and `print(String)`', '`Dog.speak()` replaces `Animal.speak()`'],
            ['`@Override` allowed?', 'No', 'Yes, always write it']
          ]
        }
      },
      {
        title: 'What @Override catches',
        text: [
          'Here `Cat` tries to override `speak()` but adds a parameter. Without `@Override` this is an **overload**: a new method that the zoo loop never calls, so the cat would quietly say "makes a sound". With `@Override`, the compiler stops you.'
        ],
        fileName: 'Over.java',
        codeLanguage: 'plaintext',
        code: `public class Over {
    public static void main(String[] args) { }
}

class Animal {
    void speak() { System.out.println("..."); }
}

class Cat extends Animal {
    @Override
    void speak(String mood) { System.out.println("Meow, I am " + mood); }
}

$ javac Over.java
Over.java:10: error: method does not override or implement a method from a supertype
    @Override
    ^
1 error`,
        warn: 'An override may not be less visible than the original. If `Animal` has `public void speak()` and `Cat` writes `void speak()` (package-private), `javac` says `attempting to assign weaker access privileges; was public`.'
      },
      {
        title: 'Variable type and object type',
        text: [
          'In `Animal pet = new Dog("Rex");` the variable type is `Animal` and the object type is `Dog`. They answer two different questions.'
        ],
        table: {
          head: ['Question', 'Answered by', 'For `Animal pet = new Dog("Rex")`'],
          rows: [
            ['Which methods may I call? (compile time)', 'The variable type', 'Only `Animal` methods: `speak()`, `getName()`'],
            ['Which code runs? (run time)', 'The object type', '`Dog`’s `speak()`: "Woof"'],
            ['May I call `pet.fetch()` (only in `Dog`)?', 'The variable type', 'No: compile error `cannot find symbol`']
          ]
        },
        fileName: 'Fetch.java',
        codeLanguage: 'plaintext',
        code: `public class Fetch {
    public static void main(String[] args) {
        Animal pet = new Dog("Rex");
        pet.speak();     // fine: every Animal can speak, the Dog version runs
        pet.fetch();     // not fine: not every Animal can fetch
    }
}

class Animal {
    private final String name;
    Animal(String name) { this.name = name; }
    String getName() { return name; }
    void speak() { System.out.println(name + " makes a sound"); }
}

class Dog extends Animal {
    Dog(String name) { super(name); }
    @Override
    void speak() { System.out.println(getName() + " says Woof"); }
    void fetch() { System.out.println(getName() + " fetches the ball"); }
}

$ javac Fetch.java
Fetch.java:5: error: cannot find symbol
        pet.fetch();     // not fine: not every Animal can fetch
           ^
  symbol:   method fetch()
  location: variable pet of type Animal
1 error`,
        tip: 'To use a `Dog`-only method, first ask whether the object really is a dog: `if (pet instanceof Dog dog) { dog.fetch(); }`. The next step shows it.'
      },
      {
        title: 'How Java picks the method',
        text: [
          'For `animal.speak()`, the JVM starts at the class of the real object and walks up the family tree until it finds a `speak()`. The first one it finds runs.'
        ],
        mermaid: `flowchart TD
  A["animal.speak()"] --> B["What is the real object? e.g. Cow"]
  B --> C{"Does Cow have its own speak()?"}
  C -->|yes| D["run Cow.speak()"]
  C -->|no| E{"Does Animal have speak()?"}
  E -->|yes| F["run Animal.speak()"]
  E -->|no| G["look in Object (the compiler made sure it exists somewhere)"]`,
        diagramNote: 'For a `Dog`, the search stops at the first box: `Dog` has its own `speak()`. For a `Cow`, it goes one step up to `Animal`.'
      },
      {
        title: 'One method that works for every animal',
        text: [
          'A method that takes an `Animal` parameter works for every subclass, even ones written later. Here `visit` greets any animal, and lets dogs fetch on top, using `instanceof` with a pattern variable: `animal instanceof Dog dog` checks the type and, if it fits, gives you the same object as a `Dog` named `dog`.'
        ],
        fileName: 'VisitDemo.java',
        code: `public class VisitDemo {
    public static void main(String[] args) {
        visit(new Dog("Rex"));
        visit(new Cat("Tom"));
        Object something = new Cat("Kitty");
        System.out.println("println picks the override: " + something);
    }

    static void visit(Animal animal) {        // any Animal, any subclass
        animal.speak();
        if (animal instanceof Dog dog) {      // only dogs can fetch
            dog.fetch();
        }
    }
}

class Animal {
    private final String name;
    Animal(String name) { this.name = name; }
    String getName() { return name; }
    void speak() { System.out.println(name + " makes a sound"); }

    @Override
    public String toString() { return "Animal " + name; }
}

class Dog extends Animal {
    Dog(String name) { super(name); }
    @Override
    void speak() { System.out.println(getName() + " says Woof"); }
    void fetch() { System.out.println(getName() + " fetches the ball"); }
}

class Cat extends Animal {
    Cat(String name) { super(name); }
    @Override
    void speak() { System.out.println(getName() + " says Meow"); }
}`,
        output: `Rex says Woof
Rex fetches the ball
Tom says Meow
println picks the override: Animal Kitty`,
        tip: 'Many `instanceof` checks in one method are a warning sign: usually the behavior should be a method that each subclass overrides.'
      },
      {
        title: 'final and abstract in one sentence each',
        text: [
          'Two more keywords control overriding. You will meet them again in later topics.'
        ],
        table: {
          head: ['Keyword', 'On a method', 'On a class'],
          rows: [
            ['`final`', 'No subclass may override it', 'No class may extend it (`String` and every record are final)'],
            ['`abstract`', 'Has no body; every subclass must override it', 'Cannot be made with `new`; it exists only to be extended (see [Interfaces](../interfaces/index.html))']
          ]
        }
      }
    ],
    technical: [
      'The compiler only checks that the **variable type** has the method, and writes `invokevirtual Animal.speak` into the bytecode. It does not decide which version runs.',
      'At run time, the JVM looks at the class stored in the header of the real object. Each class has a method table (the **vtable**) that lists, for every method, the version to use: the class’s own override or the inherited one. A `Cow`’s table points `speak` to `Animal.speak`, a `Dog`’s table to `Dog.speak`. One quick table lookup per call.',
      'Static methods, private methods and constructors are not overridden and do not use this lookup; they are bound when you compile. Fields are not polymorphic either: only methods are. The JIT compiler often notices when only one version is ever used at a call site and calls it directly, so polymorphism costs almost nothing.'
    ],
    tryIt: {
      steps: [
        'Copy `ZooDemo.java` and run it.',
        'Give `Cow` its own `speak()` with `@Override` that prints `getName() + " says Moo"`.',
        'Add a class `Duck extends Animal` with its own `speak()` ("Quack"), and add `new Duck("Donald")` to the array.',
        'Run again. Do not change the `for` loop at all.'
      ],
      see: '`Bella says Moo` and `Donald says Quack`. The loop is the same; the new objects bring their own behavior.'
    },
    check: [
      { q: '`Animal a = new Cat("Tom"); a.speak();`: whose `speak()` runs?', a: '`Cat`’s, if `Cat` overrides it. The object type decides which code runs, not the variable type.' },
      { q: 'Why does `a.purr()` not compile when `a` is an `Animal` variable holding a `Cat`?', a: 'The variable type `Animal` decides which methods you may call, and not every `Animal` can `purr()`. Check with `if (a instanceof Cat cat) { cat.purr(); }`.' },
      { q: 'What is the difference between `speak()` in `Dog` overriding `speak()` in `Animal`, and `speak(String mood)` in `Dog`?', a: 'The first has the same parameters: it overrides and runs through `Animal` variables. The second has different parameters: it overloads, it is a new method, and calls through an `Animal` variable never reach it.' }
    ],
    keyPoints: [
      'Overriding: a subclass method with the same name and parameters replaces the parent version.',
      'Always write `@Override`; the compiler then catches typos and wrong parameters.',
      'A superclass variable can hold any subclass object.',
      'The variable type decides what you may call; the object type decides what runs.',
      'Polymorphism lets one loop or method handle every subclass, even future ones.'
    ],
    commonMistakes: [
      '`void speak(String mood)` meant as an override: it is an overload. Keep the same parameters and add `@Override`.',
      '`Animal a = new Dog("Rex"); a.fetch();`: does not compile. Use `if (a instanceof Dog dog) { dog.fetch(); }`, or put the method into `Animal`.',
      'Long `if (x instanceof Dog) … else if (x instanceof Cat) …` chains. Move the behavior into an overridden method.',
      'Making an override less visible: `void toString()` or `String toString()` without `public`. Keep the original visibility: `public String toString()`.'
    ],
    related: ['Inheritance: extends and super', 'toString: Print an Object', 'Methods', 'Interfaces', 'Design Patterns']
  }]);
})();
