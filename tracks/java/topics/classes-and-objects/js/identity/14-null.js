(function () {
  const terms = Java.topicDetails['classes-and-objects'].glossary;

  Java.addCoreLessons('classes-and-objects', [{
    id: 'null-and-npe',
    title: 'null and NullPointerException',
    category: 'habits',
    icon: '!',
    tagline: 'An arrow that points to nothing',
    glossary: terms,
    realWorld: 'A dog leash with no dog on it. You can hold the leash, swing it, hang it on a hook. But if you say "Sit!" to the end of the leash, nothing can sit, because there is no dog.',
    kid: [
      'You hold a leash in your hand. Usually there is a dog at the other end. Today the leash is empty.',
      'Holding an empty leash is fine. Looking at it and saying "oh, no dog today" is fine too. But if you shout "Fetch the ball!" to the empty end, nothing happens, and everybody is confused.',
      'In Java, `null` is the empty leash: a variable that points to no object. Asking `null` to do something (`dog.bark()`) makes Java stop with a loud error called a **NullPointerException**.'
    ],
    definition: '`null` is the value of a reference that points to **no object**. Reading it, comparing it and passing it around is fine. Using it with a dot (`x.method()` or `x.field`) throws a **NullPointerException** (NPE), which stops the program.',
    explain: [
      'Every reference type (`String`, arrays, your classes) can hold `null`. Reference fields start as `null` (lesson "Fields and Default Values"), and you can write `Dog d = null;` yourself to say "no dog yet".',
      'The dot means "follow the arrow and use the object there". With `null` there is no arrow to follow. The JVM then throws a `NullPointerException`. An **exception** is Java’s way to stop the normal flow with an error report; you learn to handle them in [Exceptions](../exceptions/index.html).',
      'Since Java 14 the error message says exactly what was `null`, for example `Cannot invoke "Person.getName()" because "this.owner" is null`. Together with the file name and line number below it, you can find the bug fast.',
      'Some things are safe with `null`: comparing (`owner == null`), printing (`"owner: " + owner` gives `owner: null`), and passing it to a method. What crashes is calling a method or reading a field **on** it.',
      'The best fix is to make `null` impossible where you can: require important objects in the constructor, give fields a real start value (`""`, an empty list), and check with `if (x != null)` where "nothing" is a normal answer.'
    ],
    why: '`null` lets a variable say "there is nothing here yet", which is sometimes true: a dog without an owner. But every `null` is also a trap for the next line that uses a dot. Knowing where `null` comes from and how to guard against it removes the most common crash in Java programs.',
    whenUse: 'Expect `null` wherever a reference might not be set: unset fields, empty array slots, search methods that find nothing. Check for it there, or design it away.',
    syntax: '`if (x != null) { x.method(); }` guards a call. `x == null` tests for nothing. `Objects.requireNonNull(x, "x")` stops early with a clear message.',
    fileName: 'NullDemo.java',
    code: `public class NullDemo {
    public static void main(String[] args) {
        Dog rex = new Dog("Rex");
        System.out.println("dog: " + rex.getName());
        System.out.println("owner: " + rex.getOwner());       // null is printed, no crash
        System.out.println("owner name: " + rex.ownerName()); // crash!
        System.out.println("this line never runs");
    }
}

class Person {
    private final String name;

    Person(String name) { this.name = name; }

    String getName() { return name; }
}

class Dog {
    private final String name;
    private Person owner;          // nobody set it, so it is null

    Dog(String name) { this.name = name; }

    String getName() { return name; }

    Person getOwner() { return owner; }

    String ownerName() {
        return owner.getName();    // owner is null: there is no object to ask
    }
}`,
    output: `dog: Rex
owner: null
Exception in thread "main" java.lang.NullPointerException: Cannot invoke "Person.getName()" because "this.owner" is null
\tat Dog.ownerName(NullDemo.java:30)
\tat NullDemo.main(NullDemo.java:6)`,
    codeSummary: 'The dog has no owner, so the field `owner` is `null`. Printing it is fine. Calling `owner.getName()` is not: the program stops with a `NullPointerException`, and the last line never runs.',
    codeExplanation: [
      { label: 'Line 5', code: 'System.out.println("owner: " + rex.getOwner());       // null is printed, no crash', text: 'Returning `null` and gluing it into a `String` is safe. You see the word `null`.' },
      { label: 'Line 6', code: 'System.out.println("owner name: " + rex.ownerName()); // crash!', text: 'This calls `ownerName()`, which uses a dot on `null`. The error report points to this line as the caller.' },
      { label: 'Line 7', code: 'System.out.println("this line never runs");', text: 'An exception stops `main` at once. Nothing after the crash runs.' },
      { label: 'Line 21', code: 'private Person owner;          // nobody set it, so it is null', text: 'A reference field without a value starts as `null`. No constructor and no setter fills it here.' },
      { label: 'Line 27', code: 'Person getOwner() { return owner; }', text: 'Handing out `null` is allowed. The danger comes later, wherever someone uses a dot on it.' },
      { label: 'Line 30', code: 'return owner.getName();    // owner is null: there is no object to ask', text: 'The crash line. `owner.getName()` means "follow the arrow in `owner`" and there is no arrow. The message names it: `"this.owner" is null`.' }
    ],
    sections: [
      {
        title: 'Picture it: an arrow to nothing',
        text: [
          'A reference either points to an object or it is `null`. The dot only works when there is an object at the end.'
        ],
        mermaid: `flowchart LR
  subgraph S["Stack: main"]
    R["rex"]
  end
  subgraph H["Heap"]
    D["Dog: name = Rex, owner = null"]
    P["Person: name = Ana"]
  end
  R --> D
  D -.->|"no arrow yet"| X["nothing (null)"]`,
        diagramNote: 'The `Person` object exists, but `rex`’s `owner` field does not point to it. Until someone calls a setter, `owner` is `null`, and `owner.getName()` crashes.'
      },
      {
        title: 'Read the error message',
        text: [
          'The NPE report looks scary, but it has a fixed shape. Read it from the top: what went wrong, why, and where.'
        ],
        table: {
          head: ['Part of the report', 'Meaning'],
          rows: [
            ['`Exception in thread "main"`', 'The program stopped while running `main`'],
            ['`java.lang.NullPointerException`', 'The kind of error: a dot was used on `null`'],
            ['`Cannot invoke "Person.getName()"`', 'Java tried to call the method `getName()` of class `Person`'],
            ['`because "this.owner" is null`', 'The field `owner` of the current object held `null`. **This is your bug.**'],
            ['`at Dog.ownerName(NullDemo.java:30)`', 'Where it happened: method `ownerName`, line 30'],
            ['`at NullDemo.main(NullDemo.java:6)`', 'Who called that method: `main`, line 6']
          ],
          note: 'The lines starting with `at` are the **stack trace**: the chain of method calls, newest first. The topic [Exceptions](../exceptions/index.html) shows more about reading it.'
        },
        tip: 'Ask "why is `owner` null here?" and not "how do I stop the crash?". Usually the real fix is earlier: someone forgot to set the owner.'
      },
      {
        title: 'Fix 1: check before you use it',
        text: [
          'When "no owner" is a normal situation, check for `null` and give a sensible answer instead.'
        ],
        fileName: 'NullCheck.java',
        code: `public class NullCheck {
    public static void main(String[] args) {
        Dog rex = new Dog("Rex");
        System.out.println(rex.ownerName());
        rex.setOwner(new Person("Ana"));
        System.out.println(rex.ownerName());
    }
}

class Person {
    private final String name;
    Person(String name) { this.name = name; }
    String getName() { return name; }
}

class Dog {
    private final String name;
    private Person owner;

    Dog(String name) { this.name = name; }

    void setOwner(Person owner) { this.owner = owner; }

    String ownerName() {
        if (owner == null) {          // comparing with null is always safe
            return name + " has no owner yet";
        }
        return name + " belongs to " + owner.getName();
    }
}`,
        output: `Rex has no owner yet
Rex belongs to Ana`
      },
      {
        title: 'Fix 2: make null impossible',
        text: [
          'When an object must always have something, ask for it in the constructor. Then no `Ticket` can exist without a holder. For text fields that may be empty, start with `""` instead of `null`, and for lists start with an empty list.',
          'Many classes go one step further and check the parameter with `Objects.requireNonNull(holder, "holder")` (from `java.util.Objects`). If someone passes `null`, the program stops **in the constructor** with that clear message, instead of much later somewhere else.'
        ],
        fileName: 'NoNulls.java',
        code: `import java.util.ArrayList;

public class NoNulls {
    public static void main(String[] args) {
        Ticket ticket = new Ticket("Ana");
        System.out.println(ticket.describe());
        ticket.addNote("window seat");
        System.out.println(ticket.describe());
    }
}

class Ticket {
    private final String holder;                              // must be given
    private String seat = "";                                 // empty, not null
    private final ArrayList<String> notes = new ArrayList<>(); // empty list, not null

    Ticket(String holder) {
        this.holder = holder;
    }

    void addNote(String note) { notes.add(note); }

    String describe() {
        return holder + ", seat '" + seat + "', notes " + notes;
    }
}`,
        output: `Ana, seat '', notes []
Ana, seat '', notes [window seat]`
      },
      {
        title: 'Safe and unsafe with null',
        text: [
          'Learn this table by heart. The left column never crashes; the middle column crashes when `x` is `null`.'
        ],
        table: {
          head: ['Safe with `null`', 'Crashes when `x` is `null`', 'Safe instead'],
          rows: [
            ['`x == null`, `x != null`', '`x.equals("yes")`', '`"yes".equals(x)`'],
            ['`"value: " + x`', '`x.toString()`', '`String.valueOf(x)`'],
            ['`Objects.equals(x, y)`', '`x.length()`', '`x != null && x.length() > 0`'],
            ['passing `x` to a method', '`x.field`, `x.method()`', 'check first, or never let `x` be `null`'],
            ['an array slot holding `null`', '`dogs[0].bark()` on a fresh `new Dog[3]`', 'fill the array with `new Dog(…)` first']
          ]
        },
        warn: '`new Dog[3]` makes an array of three **empty slots** (`null`), not three dogs. Each slot needs its own `dogs[i] = new Dog(…);` before you call a method on it.',
        tip: '`x != null && x.length() > 0` is safe because `&&` stops early: if `x` is `null`, the right side never runs (you know this short-circuit rule from [Operators](../operators/index.html)).'
      }
    ],
    technical: [
      '`null` is a special reference value that the JVM represents as "points to address zero". No object ever lives there. When bytecode such as `invokevirtual` or `getfield` gets `null` as its object, the JVM throws a `NullPointerException` instead of reading memory. This is part of what makes Java memory-safe.',
      'The detailed messages (`because "this.owner" is null`) are called **helpful NullPointerExceptions** and exist since Java 14. The JVM works them out from the bytecode at the moment of the crash. Fields and methods appear with their names; local variables appear as `<local1>`, `<local2>` … unless the class was compiled with `javac -g`, which keeps their names.',
      'The inventor of `null` references, Tony Hoare, later called them his "billion-dollar mistake", because of how many crashes they caused. That is why modern Java code avoids returning `null` where it can: it returns empty strings, empty lists, or an `Optional` (a small box from the JDK that is either empty or holds one object).'
    ],
    tryIt: {
      steps: [
        'Copy `NullDemo.java` and run it. Read the error message line by line.',
        'Add a setter `void setOwner(Person owner) { this.owner = owner; }` to `Dog`.',
        'In `main`, between the `owner:` line and the crashing line, call `rex.setOwner(new Person("Ana"));`.',
        'Run again.'
      ],
      see: '`owner: null` first (still unset at that moment), then `owner name: Ana` and `this line never runs` printed: no more crash.'
    },
    check: [
      { q: '`String s = null;` Which of these crash: `System.out.println(s)`, `s == null`, `s.length()`, `"x".equals(s)`?', a: 'Only `s.length()`: it uses a dot on `null`. Printing, comparing with `==`, and passing `s` into `"x".equals(s)` are safe (the last one gives `false`).' },
      { q: 'The message says `because "this.owner" is null`. Where do you look for the real bug?', a: 'At the places that should have set `owner`: the constructor and the setter, and the code that creates the object. The crash line only shows where the missing value was first used.' },
      { q: 'Why is `private String note = "";` often better than `private String note;`?', a: 'The field starts as a real empty `String` instead of `null`, so `note.length()` or `note.isBlank()` work at once and never throw an NPE.' }
    ],
    keyPoints: [
      '`null` means "no object"; reference fields start as `null`.',
      'A dot on `null` (`x.method()`, `x.field`) throws a `NullPointerException`.',
      'Comparing (`x == null`), printing and passing `null` are safe.',
      'The message names the `null` part and the line; the real bug is where the value should have been set.',
      'Design `null` away: constructor parameters, `""` and empty lists as start values.'
    ],
    commonMistakes: [
      '`x.equals("yes")` when `x` may be `null`. Write `"yes".equals(x)` or `Objects.equals(x, "yes")`.',
      '`Dog[] dogs = new Dog[3]; dogs[0].bark();`: the slots are `null`. Fill them: `dogs[0] = new Dog("Rex");`.',
      '`private ArrayList<String> notes;` and later `notes.add(…)`: crash. Write `private final ArrayList<String> notes = new ArrayList<>();`.',
      'Hiding every NPE with `if (x != null)` checks everywhere. Find out why `x` is `null` and fix that place instead.'
    ],
    related: ['Fields and Default Values', 'Constructors', 'Exceptions', 'Operators']
  }]);
})();
