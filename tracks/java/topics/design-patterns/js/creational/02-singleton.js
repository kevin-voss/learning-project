(function () {
  const DP = Java.topics.designPatterns;

  DP.lessons.push({
    id: 'singleton',
    num: '02',
    title: 'Singleton',
    category: 'creational',
    icon: '◉',
    tagline: 'One instance to rule them all',
    realWorld: 'The register book on the teacher\'s desk. There is exactly one. Every teacher who comes into the room writes in the same book, so everybody sees the same names. Nobody brings a second book from home.',
    kid: [
      'Your class has one big book where the teacher writes who is here today. If every teacher had their own book, the books would not agree. One teacher would write "Mia is here", and the other book would still say "Mia is missing".',
      'So the school says: there is only one book, and it lies on the desk. If you want to write in it, you go to the desk. You never buy a new one.',
      'A **Singleton** is that rule for an object: there is only one, and everybody who needs it gets the same one from the same place.'
    ],
    definition: 'The **Singleton** pattern makes sure a class has **exactly one instance** and gives one global place to get it, usually a static method `getInstance()`.',
    explain: [
      'Normally anyone can write `new Settings()` as often as they like, and each call makes a new object. A Singleton blocks that: its **constructor is private**, so code outside the class cannot call `new`.',
      'The class keeps its one object in a **private static field**. "Static" means the field belongs to the class itself, not to an object, so there is exactly one such field in the whole program. You learned `static` in [Classes and Objects](../classes-and-objects/index.html).',
      'A **public static method** `getInstance()` hands out that object. The first call creates it, every later call returns the same one. Creating it only when somebody first asks is called **lazy initialization**.',
      'Because `getInstance()` returns the same object, a change made through one variable is visible through every other variable. `a == b` is `true`: both variables point to the same object on the heap.',
      'Singleton is the most famous pattern and also the most criticised one. It is a **global variable in disguise**: any class can reach it, so you cannot see from a class\'s constructor what it depends on. Use it rarely, and prefer the enum form or passing one object around (see the last chapters).'
    ],
    why: 'Some things must exist once: the settings of the program, a log that all parts write to, the connection pool to one database. Two copies would disagree with each other or waste memory.',
    whenUse: 'When the program really needs one shared object and creating a second one would be a bug. Not when you only want easy access: then create one object in `main` and pass it to the classes that need it.',
    syntax: '`class Name { private static Name instance; private Name() { … } static Name getInstance() { if (instance == null) instance = new Name(); return instance; } }` or shorter and safer: `enum Name { INSTANCE; … }`.',
    pros: [
      'Guarantees exactly one instance, so there is one source of truth.',
      'Lazy creation: the object is built only when it is first needed.',
      'Easy to reach from anywhere through `getInstance()`.'
    ],
    cons: [
      'Global state: any class can change it, and dependencies are hidden.',
      'Hard to test: tests share the same object and cannot swap in a fake.',
      'The simple lazy version breaks when two threads call it at the same time.',
      'The class has two jobs: its real work and controlling how many of it exist.'
    ],
    fileName: 'SingletonDemo.java',
    code: `class AppSettings {
    private static AppSettings instance; // the one and only object
    private static int created = 0;

    private String language = "en";

    private AppSettings() { // private: nobody outside can call new
        created++;
        System.out.println("Creating AppSettings");
    }

    static AppSettings getInstance() {
        if (instance == null) {
            instance = new AppSettings(); // only on the first call
        }
        return instance;
    }

    String getLanguage() { return language; }
    void setLanguage(String language) { this.language = language; }
    static int createdCount() { return created; }
}

public class SingletonDemo {
    public static void main(String[] args) {
        System.out.println("Program starts");
        AppSettings a = AppSettings.getInstance();
        a.setLanguage("fr");

        AppSettings b = AppSettings.getInstance();
        System.out.println("b sees language: " + b.getLanguage());
        System.out.println("Same object? " + (a == b));
        System.out.println("Objects created: " + AppSettings.createdCount());
    }
}`,
    output: `Program starts
Creating AppSettings
b sees language: fr
Same object? true
Objects created: 1`,
    codeSummary: 'Two calls to `getInstance()` give back one object. The change made through `a` is visible through `b`, and the constructor ran only once.',
    codeExplanation: [
      { label: 'Line 2', code: 'private static AppSettings instance; // the one and only object', text: 'A static field: one per class, not one per object. It starts as `null` until the first `getInstance()` call.' },
      { label: 'Line 7', code: 'private AppSettings() { // private: nobody outside can call new', text: 'The private constructor is the heart of the pattern. `new AppSettings()` outside this class is a compile error.' },
      { label: 'Line 12', code: 'static AppSettings getInstance() {', text: 'The one global access point. It is static, so you call it on the class: `AppSettings.getInstance()`.' },
      { label: 'Line 13', code: 'if (instance == null) {', text: 'Lazy initialization: only the very first call finds `null` and creates the object.' },
      { label: 'Line 16', code: 'return instance;', text: 'Every call returns the same reference to the same object.' },
      { label: 'Line 27', code: 'AppSettings a = AppSettings.getInstance();', text: 'The first call. This is the moment `Creating AppSettings` is printed, after `Program starts`.' },
      { label: 'Line 28', code: 'a.setLanguage("fr");', text: 'Changes the one shared object.' },
      { label: 'Line 30', code: 'AppSettings b = AppSettings.getInstance();', text: 'The second call. `instance` is no longer `null`, so nothing is created and nothing is printed.' },
      { label: 'Line 32', code: 'System.out.println("Same object? " + (a == b));', text: '`==` on objects compares references. `true` proves both variables point to one object.' }
    ],
    sections: [
      {
        title: 'The problem: two objects that should be one',
        text: [
          'Here every class makes its own `Settings` with `new`. The menu changes the language, but the screen has a different object and never sees the change.',
          'This bug is hard to spot: each class looks correct when you read it alone.'
        ],
        fileName: 'NoSingleton.java',
        code: `class Settings {
    private String language = "en";
    String getLanguage() { return language; }
    void setLanguage(String language) { this.language = language; }
}

class Menu {
    private final Settings settings = new Settings(); // its own copy
    void chooseFrench() {
        settings.setLanguage("fr");
        System.out.println("Menu set language to fr");
    }
}

class Screen {
    private final Settings settings = new Settings(); // another copy
    void show() {
        System.out.println("Screen shows text in: " + settings.getLanguage());
    }
}

public class NoSingleton {
    public static void main(String[] args) {
        Menu menu = new Menu();
        Screen screen = new Screen();
        menu.chooseFrench();
        screen.show();
    }
}`,
        output: `Menu set language to fr
Screen shows text in: en`,
        warn: 'The pain: two `Settings` objects exist, and they disagree. The user picked French, the screen still shows English.'
      },
      {
        title: 'The roles in a class diagram',
        text: [
          'Singleton has only one role: the singleton class itself. It plays two parts at once: it does its normal work, and it guards its own creation.'
        ],
        mermaid: `classDiagram
  class AppSettings {
    -AppSettings instance$
    -String language
    -AppSettings()
    +getInstance() AppSettings$
    +getLanguage() String
    +setLanguage(String) void
  }`,
        diagramNote: 'A `$` after a member means static. The constructor is private (`-`), the access method is public and static. The class keeps its own one instance in the static field.'
      },
      {
        title: 'The order of calls',
        text: [
          'The order matters here: only the first call creates the object. Every later call skips the `if` body.'
        ],
        mermaid: `sequenceDiagram
  participant M as main
  participant S as AppSettings class
  M->>S: getInstance()
  S->>S: instance is null, so call new AppSettings()
  S-->>M: the object
  M->>S: getInstance()
  S-->>M: the same object, nothing new
  M->>M: a == b is true`,
        diagramNote: 'Solid arrows are calls, dashed arrows are return values. The self arrow on `AppSettings` is the constructor running, once.'
      },
      {
        title: 'The safest form: an enum with one constant',
        text: [
          'The lazy version above has a weak spot. A **thread** is one path of code running in your program. If two threads call `getInstance()` at the very same moment, both can see `null` and both create an object. You meet threads later; for now remember the fix.',
          'An enum with one constant is a Singleton the JVM guarantees: the constant is created once when the enum is loaded, also with many threads, and nobody can call `new` on an enum. You know enums from [Enums](../enums/index.html).'
        ],
        fileName: 'EnumSingleton.java',
        code: `enum Counter {
    INSTANCE; // the one and only object

    private int value = 0;

    int next() {
        value++;
        return value;
    }
}

public class EnumSingleton {
    public static void main(String[] args) {
        System.out.println(Counter.INSTANCE.next());
        System.out.println(Counter.INSTANCE.next());

        Counter c = Counter.INSTANCE;
        System.out.println(c.next());
        System.out.println(c == Counter.INSTANCE);
    }
}`,
        output: `1
2
3
true`,
        tip: 'Another thread-safe form is eager creation: `private static final AppSettings INSTANCE = new AppSettings();`. The JVM creates it once, when the class is first used.'
      },
      {
        title: 'Where Java itself uses it',
        text: [
          '`Runtime.getRuntime()` returns the one object that describes the running JVM. `Collections.emptyList()` returns one shared, unchangeable empty list instead of making a new one each time. `Boolean.TRUE` and `Boolean.FALSE` are single shared objects too.'
        ],
        fileName: 'JavaSingletons.java',
        code: `import java.util.Collections;
import java.util.List;

public class JavaSingletons {
    public static void main(String[] args) {
        Runtime r1 = Runtime.getRuntime();
        Runtime r2 = Runtime.getRuntime();
        System.out.println("Same Runtime? " + (r1 == r2));

        List<String> e1 = Collections.emptyList();
        List<Integer> e2 = Collections.emptyList();
        System.out.println("Same empty list? " + ((Object) e1 == (Object) e2));

        System.out.println("Same TRUE? " + (Boolean.valueOf(true) == Boolean.TRUE));
    }
}`,
        output: `Same Runtime? true
Same empty list? true
Same TRUE? true`
      },
      {
        title: 'When not to use it: pass one object instead',
        text: [
          'Most of the time you do not need the class to **forbid** a second object. You only need everybody to **share** one. Create it once in `main` and hand it to the classes through their constructors. This is **dependency injection**.',
          'Now each constructor shows what the class needs, and a test can pass in a fresh object.'
        ],
        fileName: 'PassItIn.java',
        code: `class Settings {
    private String language = "en";
    String getLanguage() { return language; }
    void setLanguage(String language) { this.language = language; }
}

class Menu {
    private final Settings settings;
    Menu(Settings settings) { this.settings = settings; }
    void chooseFrench() { settings.setLanguage("fr"); }
}

class Screen {
    private final Settings settings;
    Screen(Settings settings) { this.settings = settings; }
    void show() { System.out.println("Screen shows text in: " + settings.getLanguage()); }
}

public class PassItIn {
    public static void main(String[] args) {
        Settings shared = new Settings(); // made once, here
        Menu menu = new Menu(shared);
        Screen screen = new Screen(shared);
        menu.chooseFrench();
        screen.show();

        Screen testScreen = new Screen(new Settings()); // a test can use its own
        testScreen.show();
    }
}`,
        output: `Screen shows text in: fr
Screen shows text in: en`,
        warn: 'Do not use Singleton only because "it is easy to reach from everywhere". That ease is exactly what makes the code hard to change and to test.'
      }
    ],
    technical: [
      'The static field `instance` lives with the class data in the JVM (in the area for class metadata), not inside any object. There is one copy per loaded class, which is why it can hold "the one" object. The object itself lives on the heap like every other object; see [JVM Memory](../jvm-memory/index.html).',
      'The JVM loads and initialises a class the first time it is used, and it does this exactly once, even with many threads. Eager singletons (`static final` field) and enum singletons build on that guarantee. The lazy `if (instance == null)` check runs in your code, so it has no such protection.',
      'A private constructor is not a full lock: reflection (code that inspects and calls private members at run time) or serialization (writing an object to bytes and reading it back) can still make a second object of a normal class. An enum is protected against both, which is why the enum form is the recommended one.'
    ],
    tryIt: {
      steps: [
        'Copy `SingletonDemo.java` and run it with `java SingletonDemo.java`.',
        'In `main`, add the line `AppSettings c = new AppSettings();` and run again.',
        'Read the compile error, then remove the line.',
        'Add a third `AppSettings.getInstance()` call and print `AppSettings.createdCount()` again.'
      ],
      see: 'The error `AppSettings() has private access in AppSettings`, and after removing the line, `Objects created: 1` still, however often you call `getInstance()`.'
    },
    check: [
      { q: 'Which two things together make a class a Singleton?', a: 'A private constructor, so nobody outside can call `new`, and a static method (or field) that always hands out the same one instance.' },
      { q: 'Why is `enum Counter { INSTANCE; }` safer than the lazy `if (instance == null)` version?', a: 'The JVM creates the enum constant exactly once when the enum is loaded, also with many threads, and nobody can create another enum object. The lazy check can create two objects if two threads run it at the same time.' },
      { q: 'What is the main reason people warn against Singleton?', a: 'It is global state. Any class can reach and change it, so dependencies are hidden and tests cannot swap it for a fresh or fake object.' }
    ],
    keyPoints: [
      'A Singleton has a private constructor and a static `getInstance()` that returns the one object.',
      'Lazy initialization creates the object on the first call.',
      'The enum form (`enum X { INSTANCE; }`) is the simplest safe Singleton.',
      'Java uses it in `Runtime.getRuntime()` and `Collections.emptyList()`.',
      'Often it is better to create one object in `main` and pass it in.'
    ],
    commonMistakes: [
      'Forgetting the private constructor: with `AppSettings() { … }` anyone can still write `new AppSettings()`. Make it `private`.',
      'Making `getInstance()` an instance method: `AppSettings getInstance()` without `static` needs an object first. Add `static`.',
      'Writing `instance = new AppSettings();` without the `if (instance == null)` check. Every call then replaces the object. Check for `null` first, or use an enum.',
      'Using a Singleton for things that are not unique, like "the current user" in a program with many users. Pass such objects as parameters.'
    ],
    related: ['Factory Method', 'Builder', 'Enums', 'Classes and Objects'],
    glossary: DP.glossary
  });
})();
