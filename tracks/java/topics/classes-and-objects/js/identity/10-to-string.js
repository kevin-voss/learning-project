(function () {
  const terms = Java.topicDetails['classes-and-objects'].glossary;

  Java.addCoreLessons('classes-and-objects', [{
    id: 'to-string',
    title: 'toString: Print an Object',
    category: 'practice',
    icon: 'P',
    tagline: 'Give every object a readable name tag',
    glossary: terms,
    realWorld: 'Jars in a kitchen cupboard. Without a label, every jar only says "Jar number 4a7f" on the bottom, and you have to open it to see what is inside. With a label that says "Strawberry jam, 2024", you know at once.',
    kid: [
      'Imagine you put your toys into boxes, and every box only gets a secret number like "box 4a7f". When your friend asks "What is in this box?", the number does not help at all.',
      'So you stick a label on each box: "Red car, 4 wheels". Now everybody can read it.',
      'In Java, when you print an object, Java looks for its label. That label is a method called `toString()`. If you do not write one, Java prints the class name and a secret number. If you write one, Java prints your nice label.'
    ],
    definition: '`toString()` is a method that returns a `String` describing the object. `System.out.println(object)` and `"text" + object` call it for you. Every class has one, but the one you get for free prints only `ClassName@hexnumber`, so you **override** it with your own.',
    explain: [
      'Every class in Java automatically gets a few methods from a built-in class called `Object`: `toString()`, `equals(…)` and `hashCode()` among them. You do not write `extends Object`; it happens by itself. The Deeper lesson "Inheritance: extends and super" explains how.',
      'The `toString()` from `Object` returns the class name, an `@`, and a number in hexadecimal (digits 0-9 and a-f) taken from the object’s hash code. It looks like `Book@1b6d3586`. The number changes from run to run and tells a human nothing useful.',
      'To give your class a better label, you write your own method with exactly this header: `public String toString()`. Writing a method that replaces the one a class got from `Object` is called **overriding**.',
      'Put `@Override` on the line above. This is an **annotation**: a note for the compiler. It means "I want to replace an inherited method; please check that one with this name and these parameters exists". If you make a typo, the compiler tells you at once.',
      'Inside, build a `String` from the important fields and `return` it. Do not print inside `toString()`; the caller decides where the text goes.'
    ],
    why: 'You print objects all the time: to check a result, to find a bug, to write a log. A good `toString()` turns `Book@1b6d3586` into `Book[title=Dune, pages=412]`, and you see what is going on without extra code.',
    whenUse: 'Give `toString()` to every class whose objects you print or look at while debugging: almost every class that holds data.',
    syntax: '`@Override public String toString() { return "…" + field + "…"; }`',
    fileName: 'BookShelf.java',
    code: `public class BookShelf {
    public static void main(String[] args) {
        Book dune = new Book("Dune", "Frank Herbert", 412);
        Book hobbit = new Book("The Hobbit", "J. R. R. Tolkien", 310);

        System.out.println(dune);                  // println calls toString()
        System.out.println("Next up: " + hobbit);  // + calls toString() too
        String label = dune.toString();            // you can call it yourself
        System.out.println(label.length() + " characters");
    }
}

class Book {
    private final String title;
    private final String author;
    private final int pages;

    Book(String title, String author, int pages) {
        this.title = title;
        this.author = author;
        this.pages = pages;
    }

    @Override
    public String toString() {
        return "Book[title=" + title + ", author=" + author + ", pages=" + pages + "]";
    }
}`,
    output: `Book[title=Dune, author=Frank Herbert, pages=412]
Next up: Book[title=The Hobbit, author=J. R. R. Tolkien, pages=310]
49 characters`,
    codeSummary: '`Book` overrides `toString()` with a label built from its three fields. `println(dune)` and `"Next up: " + hobbit` both use that label without calling the method by name.',
    codeExplanation: [
      { label: 'Line 6', code: 'System.out.println(dune);                  // println calls toString()', text: '`println` gets an object, not a `String`. It asks the object for its `toString()` and prints the answer.' },
      { label: 'Line 7', code: 'System.out.println("Next up: " + hobbit);  // + calls toString() too', text: '`+` with a `String` on one side turns the other side into text. For an object, that means calling `toString()`.' },
      { label: 'Line 8', code: 'String label = dune.toString();            // you can call it yourself', text: '`toString()` is an ordinary public method. You can call it and keep the result.' },
      { label: 'Line 9', code: 'System.out.println(label.length() + " characters");', text: 'The proof that `toString()` returns a real `String`: you can use `String` methods on it.' },
      { label: 'Line 24', code: '@Override', text: 'An annotation for the compiler: "this replaces an inherited method". The compiler checks that `Object` really has a `toString()` with this header.' },
      { label: 'Line 25', code: 'public String toString() {', text: 'The header must match exactly: `public`, returns `String`, no parameters.' },
      { label: 'Line 26', code: 'return "Book[title=" + title + ", author=" + author + ", pages=" + pages + "]";', text: 'Builds the label from the fields and returns it. No `println` here.' }
    ],
    sections: [
      {
        title: 'Before: the toString you get for free',
        text: [
          'Without your own `toString()`, printing an object gives the class name, `@`, and a hexadecimal number. Run this twice and the numbers change, so this page cannot show one fixed output. The output below is one real run; yours shows other numbers. (This example is not run by the page checker for that reason.)'
        ],
        fileName: 'DefaultLabel.java',
        code: `public class DefaultLabel {
    public static void main(String[] args) {
        System.out.println(new Dog());
        System.out.println(new Dog());
    }
}

class Dog {
    String name = "Rex";
}`,
        noRun: true,
        output: `Dog@fe18270
Dog@6fb0d3ed`,
        warn: 'The number is not a memory address you can use, and it is not the dog’s name. It comes from `hashCode()` (see "equals and hashCode"). It only says "some `Dog` object".'
      },
      {
        title: 'What @Override protects you from',
        text: [
          'Java is case-sensitive. A method called `tostring()` (small s) is a **new** method, not a replacement. Without `@Override` it compiles, and `println` still prints `Book@…`. With `@Override` the compiler catches the typo.'
        ],
        fileName: 'Typo.java',
        codeLanguage: 'plaintext',
        code: `public class Typo {
    public static void main(String[] args) {
        System.out.println(new Book());
    }
}

class Book {
    @Override
    public String tostring() {     // typo: small s
        return "a book";
    }
}

$ javac Typo.java
Typo.java:8: error: method does not override or implement a method from a supertype
    @Override
    ^
1 error`,
        tip: 'Always write `@Override` when you replace `toString`, `equals` or `hashCode`. It costs one line and catches typos, wrong parameter types and a missing `public`.'
      },
      {
        title: 'Where Java calls toString for you',
        text: [
          'You rarely call `toString()` by name. Java calls it in all the places where an object must become text. If the variable holds `null`, those places print `null` instead of crashing. Only `x.toString()` itself crashes on `null`.'
        ],
        table: {
          head: ['You write', 'What Java does'],
          rows: [
            ['`System.out.println(book)`', 'Prints `book.toString()`, or `null`'],
            ['`"Book: " + book`', 'Glues `"Book: "` and `book.toString()` (or `"null"`)'],
            ['`String.valueOf(book)`', 'Returns `book.toString()`, or `"null"`'],
            ['`String.format("%s", book)`', 'Puts `book.toString()` where `%s` is'],
            ['`book.toString()` when `book` is `null`', 'Crash: `NullPointerException`']
          ]
        },
        fileName: 'AutoLabel.java',
        code: `public class AutoLabel {
    public static void main(String[] args) {
        Point p = new Point(3, 4);
        Point nothing = null;

        System.out.println(p);
        System.out.println("p is " + p);
        System.out.println(String.format("at %s!", p));
        System.out.println("nothing is " + nothing);   // prints null, no crash
    }
}

class Point {
    private final int x;
    private final int y;

    Point(int x, int y) {
        this.x = x;
        this.y = y;
    }

    @Override
    public String toString() {
        return "(" + x + ", " + y + ")";
    }
}`,
        output: `(3, 4)
p is (3, 4)
at (3, 4)!
nothing is null`
      },
      {
        title: 'What happens inside println',
        text: [
          'The diagram follows `System.out.println(dune)`. `println` does not know anything about books. It only knows that every object has a `toString()`, and it asks for it.'
        ],
        mermaid: `sequenceDiagram
  participant M as main
  participant P as System.out
  participant B as Book dune
  M->>P: println(dune)
  P->>B: toString()
  B-->>P: "Book[title=Dune, ...]"
  P-->>M: prints the text`,
        diagramNote: 'Because `Book` overrides `toString()`, the call lands in your method. Without the override, it lands in the version from `Object`.'
      },
      {
        title: 'Good toString habits',
        text: [
          'A `toString()` is for people: you, while debugging, and log files. Keep it short, true and safe.'
        ],
        bullets: [
          '**Return, do not print.** `toString()` builds a `String`; the caller prints it.',
          '**Show the fields that tell objects apart**: a name, an id, a size.',
          '**Leave out secrets.** Never put a password or a card number into `toString()`; labels end up in log files.',
          '**Do not change anything.** A `toString()` that changes a field makes printing change your program.',
          'A common style is `ClassName[field=value, field=value]`. Records (lesson "Records (Java 16+)") use this style for you.'
        ],
        fileName: 'UserLabel.java',
        code: `public class UserLabel {
    public static void main(String[] args) {
        User user = new User("ada", "s3cret!");
        System.out.println(user);
    }
}

class User {
    private final String login;
    private final String password;

    User(String login, String password) {
        this.login = login;
        this.password = password;
    }

    @Override
    public String toString() {
        return "User[login=" + login + ", password=***]";   // never the real password
    }
}`,
        output: 'User[login=ada, password=***]'
      }
    ],
    technical: [
      'The version in `Object` is, in short: `getClass().getName() + "@" + Integer.toHexString(hashCode())`. `getName()` gives the full class name (with the package, if there is one), and the hex number is the object’s identity hash code.',
      '`System.out.println(Object x)` calls `String.valueOf(x)`, which returns `"null"` for `null` and `x.toString()` otherwise. String concatenation with `+` compiles to a call that uses the same rule, so `"a" + null` gives `"anull"` without a crash.',
      'Which `toString()` runs is decided while the program runs, by the class of the real object, not by the type of the variable. This is called **dynamic dispatch**, and it is why `println`, written years before your `Book` class, still runs your method. The Deeper lesson "Overriding and Polymorphism" shows it in detail.'
    ],
    tryIt: {
      steps: [
        'Copy `BookShelf.java` and run it.',
        'Comment out the whole `toString()` method (all four lines, `@Override` included) and run again.',
        'Bring it back, but rename it to `tostring` (small s) and compile with `javac BookShelf.java`.'
      ],
      see: 'first the nice labels, then lines like `Book@1b6d3586` (your numbers differ) and finally the error `method does not override or implement a method from a supertype`.'
    },
    check: [
      { q: 'What does `System.out.println(new Dog())` print if `Dog` has no `toString()`?', a: 'Something like `Dog@1b6d3586`: the class name, `@`, and a hex number from the hash code. It comes from the `toString()` in `Object`.' },
      { q: 'Why write `@Override` above `toString()`?', a: 'So the compiler checks that you really replace an inherited method. A typo like `tostring()` then becomes a compile error instead of a silent bug.' },
      { q: '`Point p = null;` What do `"p = " + p` and `p.toString()` do?', a: '`"p = " + p` gives the text `p = null`. `p.toString()` crashes with a `NullPointerException`, because there is no object to call the method on.' }
    ],
    keyPoints: [
      'Every class gets `toString()` from `Object`; the free one prints `ClassName@hex`.',
      'Override it with exactly `public String toString()` and put `@Override` above.',
      '`println(x)` and `"text" + x` call `toString()` for you.',
      'Return a short, readable label built from the key fields; never print inside.',
      'Keep secrets like passwords out of `toString()`.'
    ],
    commonMistakes: [
      '`public void toString() { System.out.println(name); }`: wrong return type, and it prints. Write `public String toString() { return name; }`.',
      '`String toString()` without `public`: compile error, because the version in `Object` is `public`. Keep the exact header.',
      '`tostring()` or `toSting()`: a new method that nobody calls. Add `@Override` and the compiler finds it.',
      'Calling `obj.toString()` by hand when `obj` may be `null`. Write `"" + obj` or `String.valueOf(obj)`, which print `null` safely.'
    ],
    related: ['equals and hashCode', 'Records (Java 16+)', 'Overriding and Polymorphism', 'Strings']
  }]);
})();
