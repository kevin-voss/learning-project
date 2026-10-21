(function () {
  const terms = Java.topicDetails['classes-and-objects'].glossary;

  Java.addCoreLessons('classes-and-objects', [{
    id: 'access-modifiers',
    title: 'Access Modifiers',
    category: 'habits',
    icon: 'A',
    tagline: 'public, protected, package-private, private',
    glossary: terms,
    realWorld: 'The rooms of a house. The front garden is open to everybody on the street. The living room is for the family. Your diary in your drawer is only for you.',
    kid: [
      'Some things in your house anybody may see: the garden, the front door. That is **public**.',
      'Some things only your family may use: the kitchen, the sofa. Visitors from the street may not walk in. In Java this is like the **package**: the family of classes in the same folder.',
      'And some things are only yours: your diary. Not even your brother may read it. That is **private**. Java has small words in front of fields and methods that say who may use them. They are called **access modifiers**.'
    ],
    definition: 'An **access modifier** is a keyword in front of a class, field, constructor or method that says which other code may use it: `public` (everybody), `protected` (the package and subclasses), no keyword = **package-private** (the same package), or `private` (the same class only).',
    explain: [
      'You already use two of them: `public` on `main` and on classes, and `private` on fields (lesson "Encapsulation"). There are four levels in total, from widest to narrowest: `public`, `protected`, package-private, `private`.',
      'A **package** is a group of classes that belong together, like a folder. You met packages and `import` in [Syntax Fundamentals](../syntax-fundamentals/index.html). All examples in this topic have no `package` line, so their classes are in one shared "unnamed" package.',
      '**Package-private** has no keyword: you write nothing. `int stock;` without a modifier is visible to every class in the same package and to no class outside it.',
      '`protected` is package-private plus one extra: **subclasses** in other packages may use it too. A subclass is a class that extends another one; the Deeper lesson "Inheritance: extends and super" shows it. Beginners rarely need `protected`.',
      'The compiler checks every access. Using a member you are not allowed to see is a compile error, not a crash at run time.'
    ],
    why: 'Access modifiers let a class decide what is its public promise and what is its private detail. You can change private details later without breaking any other code, because no other code can use them.',
    whenUse: 'Every time you write a field, method or class, pick its modifier on purpose: as narrow as possible, as wide as needed.',
    syntax: '`modifier type name;` for fields, `modifier returnType name(…) { … }` for methods, `modifier class Name { … }` for classes. No modifier means package-private.',
    table: {
      label: 'Who may use it?',
      head: ['Modifier', 'Same class', 'Same package', 'Subclass in another package', 'Everywhere else'],
      rows: [
        ['`public`', 'yes', 'yes', 'yes', 'yes'],
        ['`protected`', 'yes', 'yes', 'yes', 'no'],
        ['(none) package-private', 'yes', 'yes', 'no', 'no'],
        ['`private`', 'yes', 'no', 'no', 'no']
      ],
      note: 'Read each row from left to right: the "yes" area gets smaller from `public` down to `private`.'
    },
    fileName: 'AccessDemo.java',
    code: `public class AccessDemo {
    public static void main(String[] args) {
        Locker locker = new Locker();

        System.out.println(locker.label);        // public: allowed
        System.out.println(locker.size);         // package-private: same package, allowed
        System.out.println(locker.floor);        // protected: same package, allowed
        // System.out.println(locker.code);      // private: compile error
        System.out.println(locker.open(1234));   // public method that uses the private field
        System.out.println(locker.open(1111));
    }
}

class Locker {
    public String label = "Locker 7";
    int size = 40;
    protected int floor = 2;
    private int code = 1234;

    public boolean open(int tryCode) {
        return tryCode == code;   // inside the class: private is fine
    }
}`,
    output: `Locker 7
40
2
true
false`,
    codeSummary: '`Locker` has one member of each access level. `AccessDemo` is in the same (unnamed) package, so it may use everything except the `private` code; it checks the code through the public method `open`.',
    codeExplanation: [
      { label: 'Line 5', code: 'System.out.println(locker.label);        // public: allowed', text: '`public` is visible everywhere, so this always compiles.' },
      { label: 'Line 6', code: 'System.out.println(locker.size);         // package-private: same package, allowed', text: '`size` has no modifier. Both classes sit in the same file and the same package, so access is allowed.' },
      { label: 'Line 7', code: 'System.out.println(locker.floor);        // protected: same package, allowed', text: '`protected` includes the whole package, so this works too.' },
      { label: 'Line 8', code: '// System.out.println(locker.code);      // private: compile error', text: 'Remove the `//` and `javac` reports `code has private access in Locker`.' },
      { label: 'Line 9', code: 'System.out.println(locker.open(1234));   // public method that uses the private field', text: 'The outside world uses the secret only through a public method. It gets an answer, never the code itself.' },
      { label: 'Line 15', code: 'public String label = "Locker 7";', text: 'Public field. Fine for a demo; in real classes, fields are almost always `private`.' },
      { label: 'Line 16', code: 'int size = 40;', text: 'No keyword at all: package-private.' },
      { label: 'Line 18', code: 'private int code = 1234;', text: 'Only code inside `Locker` may read it.' },
      { label: 'Line 21', code: 'return tryCode == code;   // inside the class: private is fine', text: 'The method belongs to `Locker`, so it may read the private field.' }
    ],
    sections: [
      {
        title: 'Four circles, one inside the other',
        text: [
          'Think of the levels as circles. `private` is the smallest circle: the class itself. Each wider level adds more code that may look in.'
        ],
        mermaid: `flowchart TB
  subgraph W["public: everywhere"]
    subgraph S["protected: package + subclasses elsewhere"]
      subgraph P["package-private: same package"]
        subgraph C["private: this class only"]
          X["the code of the class"]
        end
      end
    end
  end`,
        diagramNote: 'A member is visible to all code inside its circle. Code outside the circle gets a compile error.'
      },
      {
        title: 'Across packages: where package-private stops',
        text: [
          'Inside one package, package-private feels the same as `public`. The difference shows when a class in **another** package tries to use the member. Here are two files in two packages. They are compiled together from the project folder.'
        ],
        fileName: 'shop/Product.java and app/Main.java',
        codeLanguage: 'plaintext',
        code: `// file shop/Product.java
package shop;

public class Product {
    public String name = "Tea";
    int stock = 7;                   // package-private
    private double cost = 1.20;
}

// file app/Main.java
package app;

import shop.Product;

public class Main {
    public static void main(String[] args) {
        Product tea = new Product();
        System.out.println(tea.name);    // fine: public
        System.out.println(tea.stock);   // error: other package
    }
}

$ javac -d out shop/Product.java app/Main.java
app/Main.java:9: error: stock is not public in Product; cannot be accessed from outside package
        System.out.println(tea.stock);   // error: other package
                              ^
1 error`,
        tip: 'If `Product` itself were not `public`, `Main` could not even `import` it. A class needs `public` to be used from another package.'
      },
      {
        title: 'Modifiers on classes',
        text: [
          'A top-level class (one that is not inside another class) has only two choices: `public` or nothing. `private class` or `protected class` at the top level does not compile.'
        ],
        table: {
          head: ['You write', 'Who may use the class', 'Rule'],
          rows: [
            ['`public class Shop`', 'Every package', 'The file must be called `Shop.java`; at most one per file'],
            ['`class Helper`', 'Only its own package', 'Any number per file; good for helper classes'],
            ['`private class Secret`', '—', 'Compile error at the top level']
          ]
        }
      },
      {
        title: 'Rules of thumb',
        text: [
          'Start narrow and open up only when another class really needs it. Making something wider later is easy. Making it narrower later breaks every class that already uses it.'
        ],
        table: {
          head: ['Member', 'Usual modifier', 'Why'],
          rows: [
            ['Fields', '`private`', 'The class guards its own data (encapsulation)'],
            ['Constants like `MAX_SIZE`', '`public static final`', 'Nobody can change them, so sharing is safe ("Instance vs static")'],
            ['Methods others call', '`public`', 'They are the promise of the class'],
            ['Helper methods used only inside', '`private`', 'You can change or delete them freely'],
            ['Constructors', '`public` (or package-private)', 'Whoever may make objects of the class'],
            ['Anything only for subclasses', '`protected`', 'Rare for beginners; see the Deeper lessons']
          ]
        },
        warn: 'Package-private often happens by accident: you forget the word. In this topic that is harmless, because all classes share one package. In bigger projects, decide on purpose.'
      },
      {
        title: 'A private helper method',
        text: [
          'Methods can be `private` too. A private method is a helper for the class’s own work. Other classes cannot call it, so it is free to change.'
        ],
        fileName: 'PasswordDemo.java',
        code: `public class PasswordDemo {
    public static void main(String[] args) {
        PasswordRule rule = new PasswordRule();
        System.out.println("abc       -> " + rule.isStrong("abc"));
        System.out.println("sunshine  -> " + rule.isStrong("sunshine"));
        System.out.println("sunshine7 -> " + rule.isStrong("sunshine7"));
    }
}

class PasswordRule {
    public boolean isStrong(String password) {          // the public promise
        return password.length() >= 8 && hasDigit(password);
    }

    private boolean hasDigit(String text) {             // a private helper
        for (int i = 0; i < text.length(); i++) {
            if (Character.isDigit(text.charAt(i))) {
                return true;
            }
        }
        return false;
    }
}`,
        output: `abc       -> false
sunshine  -> false
sunshine7 -> true`
      }
    ],
    technical: [
      'The compiler enforces access when you compile: it knows each member’s modifier and the package of each class. The `.class` file also stores access flags (`ACC_PUBLIC`, `ACC_PRIVATE`, `ACC_PROTECTED`, or none for package-private), and the JVM checks them again when one class links to another.',
      'Package-private is the default because it has no flag at all. Packages are matched by their full name: `shop` and `shop.tools` are two different packages, and package-private members of one are not visible in the other.',
      'Since Java 9, **modules** add one more wall around groups of packages: a `public` class in a module is only visible outside if the module exports its package. Small programs like these do not use modules, so you can ignore this for now.'
    ],
    tryIt: {
      steps: [
        'Copy `AccessDemo.java` and run it.',
        'Remove the `//` in front of `System.out.println(locker.code);` and compile.',
        'Put the `//` back. Change `int size = 40;` to `private int size = 40;` and compile again.'
      ],
      see: 'two compile errors in a row: `code has private access in Locker`, then `size has private access in Locker`.'
    },
    check: [
      { q: 'A field has no modifier. Who may use it?', a: 'Every class in the same package, and nobody else. This level is called package-private.' },
      { q: 'What does `protected` add on top of package-private?', a: 'Subclasses in other packages may use the member too.' },
      { q: 'Why make a helper method `private` instead of `public`?', a: 'No other class can call it, so you can change, rename or delete it later without breaking any other code.' }
    ],
    keyPoints: [
      'Four levels: `public`, `protected`, package-private (no word), `private`.',
      'Fields: `private`. Methods others need: `public`. Helpers: `private`.',
      'Package-private = same package only; it is what you get when you write nothing.',
      'A top-level class is `public` or package-private, never `private`.',
      'Wrong access is a compile error, found before the program runs.'
    ],
    commonMistakes: [
      'Making everything `public` "so it works". Start with `private` and widen only when a compile error shows a real need.',
      'Forgetting the modifier and meaning `private`: `int balance;` is open to the whole package. Write `private int balance;`.',
      'Writing `private class Helper` at the top of a file. Top-level classes are `public` or have no modifier.',
      'Using `protected` for fields "for later subclasses". It opens the field to the whole package as well; keep fields `private` and add methods instead.'
    ],
    related: ['Encapsulation: private, Getters, Setters', 'Instance vs static', 'Inheritance: extends and super', 'Syntax Fundamentals']
  }]);
})();
