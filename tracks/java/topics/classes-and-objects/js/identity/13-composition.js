(function () {
  const terms = Java.topicDetails['classes-and-objects'].glossary;

  Java.addCoreLessons('classes-and-objects', [{
    id: 'composition',
    title: 'Objects Working Together',
    category: 'practice',
    icon: 'H',
    tagline: 'A Library has Books',
    glossary: terms,
    realWorld: 'A town library. The library has shelves full of books. Each book knows its own title and whether someone has borrowed it. When you ask the librarian for "Dune", the librarian finds the book and lends it to you.',
    kid: [
      'A library is a big house full of books. The library does not know what is written inside each book. It only knows where its books are.',
      'Each book knows its own little things: its title, its author, and if it is at home on the shelf or borrowed by someone.',
      'When you ask for a book, the library looks along its shelf, finds the right book, and asks the book: "Can you go out?". Big things made of smaller things that help each other: in Java, that is called **composition**.'
    ],
    definition: '**Composition** means an object keeps other objects in its fields and gets work done by calling their methods. A `Library` **has** `Book`s. This "has-a" relationship is how most programs are built: many small classes, each with one job, working together.',
    explain: [
      'You saw in "Fields and Default Values" that a field can hold a reference to another object. Composition uses exactly that: `Library` has a field that holds many `Book` objects, and `Book` has its own fields for title, author and borrowed state.',
      'To hold "many books", this lesson uses an `ArrayList<Book>`: a list that grows when you `add` to it, and that you can walk through with an enhanced `for` loop, like an array. `<Book>` means "a list of `Book` objects". The topic [Collections](../collections/index.html) explains lists in depth.',
      'Each class takes care of its own data. The `Library` knows how to **find** a book; the `Book` knows whether it **can be borrowed**. When the library lends a book, it does not change the book’s fields itself: it calls `book.borrow()`. Handing a job to the object that owns the data is called **delegation**.',
      'This keeps every class small and easy to understand, and each rule lives in one place. If the rule for borrowing changes, you change `Book`, not every place that lends books.',
      'Composition ("has-a") is different from inheritance ("is-a"): a library **has** books, but a library **is not** a book. Inheritance comes in the Deeper lesson "Inheritance: extends and super". When you are unsure, pick composition.'
    ],
    why: 'One giant class that does everything gets impossible to read. Splitting the problem into objects that each do one job, and letting them call each other, keeps programs small in every part, even when the whole program grows.',
    whenUse: 'Whenever a thing in your problem is made of or holds other things: a library holds books, a car has an engine, an order has order lines, a team has players.',
    syntax: '`class Library { private final ArrayList<Book> books = new ArrayList<>(); … }`: a field of another class type, and methods that call `book.method()`.',
    mermaid: `classDiagram
  class Library {
    -String name
    -ArrayList~Book~ books
    +addBook(Book book) void
    +lend(String title) boolean
    +printCatalog() void
  }
  class Book {
    -String title
    -String author
    -boolean borrowed
    +getTitle() String
    +borrow() boolean
  }
  Library "1" o-- "*" Book : holds`,
    visualLabel: 'A Library has Books',
    visualNote: 'The line with the diamond means "has": one `Library` (the `1`) holds any number of `Book`s (the `*`). `ArrayList~Book~` is how the diagram writes `ArrayList<Book>`.',
    fileName: 'LibraryDemo.java',
    code: `import java.util.ArrayList;

public class LibraryDemo {
    public static void main(String[] args) {
        Library library = new Library("Town Library");
        library.addBook(new Book("Dune", "Frank Herbert"));
        library.addBook(new Book("Matilda", "Roald Dahl"));

        System.out.println("lend Dune: " + library.lend("Dune"));
        System.out.println("lend Dune again: " + library.lend("Dune"));
        System.out.println("lend Emil: " + library.lend("Emil"));
        library.printCatalog();
    }
}

class Library {
    private final String name;
    private final ArrayList<Book> books = new ArrayList<>();   // the library HAS books

    Library(String name) { this.name = name; }

    void addBook(Book book) { books.add(book); }

    boolean lend(String title) {
        for (Book book : books) {
            if (book.getTitle().equals(title)) {
                return book.borrow();          // delegate: the book decides
            }
        }
        return false;                          // no such book
    }

    void printCatalog() {
        System.out.println(name + ":");
        for (Book book : books) {
            System.out.println("  " + book);
        }
    }
}

class Book {
    private final String title;
    private final String author;
    private boolean borrowed;

    Book(String title, String author) { this.title = title; this.author = author; }

    String getTitle() { return title; }

    boolean borrow() {
        if (borrowed) {
            return false;                      // already out
        }
        borrowed = true;
        return true;
    }

    @Override
    public String toString() {
        return title + " by " + author + (borrowed ? " (borrowed)" : " (on shelf)");
    }
}`,
    output: `lend Dune: true
lend Dune again: false
lend Emil: false
Town Library:
  Dune by Frank Herbert (borrowed)
  Matilda by Roald Dahl (on shelf)`,
    codeSummary: '`Library` holds a list of `Book` objects. `lend` searches the list for the title and then lets the book itself decide whether it can be borrowed. Each class guards its own data.',
    codeExplanation: [
      { label: 'Line 6', code: 'library.addBook(new Book("Dune", "Frank Herbert"));', text: 'Makes a `Book` and hands its reference to the library, which stores it in its list.' },
      { label: 'Line 9', code: 'System.out.println("lend Dune: " + library.lend("Dune"));', text: '`main` only talks to the library. It never touches the books directly.' },
      { label: 'Line 18', code: 'private final ArrayList<Book> books = new ArrayList<>();   // the library HAS books', text: 'The composition: a field that holds other objects. `final` means the field always points to this same list; the list itself can still grow.' },
      { label: 'Line 22', code: 'void addBook(Book book) { books.add(book); }', text: '`add` puts the book at the end of the list.' },
      { label: 'Line 25', code: 'for (Book book : books) {', text: 'An enhanced `for` loop over the list, the same as over an array: `book` is each `Book` in turn.' },
      { label: 'Line 26', code: 'if (book.getTitle().equals(title)) {', text: 'The library asks each book for its title and compares the text with `equals`.' },
      { label: 'Line 27', code: 'return book.borrow();          // delegate: the book decides', text: 'Delegation: the library does not set `borrowed` itself. It asks the book, and the book applies its own rule.' },
      { label: 'Line 51', code: 'if (borrowed) {', text: 'The rule "a borrowed book cannot be lent again" lives in `Book`, next to the data it is about.' },
      { label: 'Line 60', code: 'return title + " by " + author + (borrowed ? " (borrowed)" : " (on shelf)");', text: 'The `? :` operator picks one of two texts: `" (borrowed)"` if `borrowed` is true, else `" (on shelf)"`.' }
    ],
    sections: [
      {
        title: 'Follow one call through the objects',
        text: [
          'The diagram shows what happens for `library.lend("Dune")`. `main` sends one message; the library forwards the real decision to the book.'
        ],
        mermaid: `sequenceDiagram
  participant M as main
  participant L as Library
  participant D as Book Dune
  M->>L: lend("Dune")
  L->>D: getTitle()
  D-->>L: "Dune"
  L->>D: borrow()
  Note over D: borrowed was false, now true
  D-->>L: true
  L-->>M: true`,
        diagramNote: 'Every arrow is a method call. The library never reads or writes `borrowed` itself: that field is private to `Book`.'
      },
      {
        title: 'Who does what?',
        text: [
          'A good test for your design: can you say in one sentence what each class is responsible for? If one class "does everything", split it.'
        ],
        table: {
          head: ['Class', 'Knows', 'Does', 'Does not do'],
          rows: [
            ['`Library`', 'Its name, its list of books', 'Adds books, finds a book by title, prints the catalog', 'Decide if a book may be lent'],
            ['`Book`', 'Title, author, borrowed or not', 'Says yes/no to `borrow()`, describes itself', 'Know about other books or the library'],
            ['`main`', 'The library', 'Tells the library what to do', 'Touch the books directly']
          ]
        }
      },
      {
        title: 'Three classes: a Member borrows books',
        text: [
          'Add a `Member` who keeps the books they borrowed. The same `Book` object is now referenced from two places: from the library’s list and from the member’s list. It is still **one** book, so its borrowed state is the same everywhere.'
        ],
        fileName: 'MemberDemo.java',
        code: `import java.util.ArrayList;

public class MemberDemo {
    public static void main(String[] args) {
        Book dune = new Book("Dune");
        Member mia = new Member("Mia");
        Member leo = new Member("Leo");

        mia.take(dune);
        leo.take(dune);        // refused: Mia has it
        System.out.println(mia);
        System.out.println(leo);
    }
}

class Member {
    private final String name;
    private final ArrayList<Book> borrowed = new ArrayList<>();

    Member(String name) { this.name = name; }

    void take(Book book) {
        if (book.borrow()) {
            borrowed.add(book);
        } else {
            System.out.println(name + " cannot take " + book.getTitle() + ": it is out");
        }
    }

    @Override
    public String toString() {
        return name + " has " + borrowed.size() + " book(s)";
    }
}

class Book {
    private final String title;
    private boolean out;

    Book(String title) { this.title = title; }

    String getTitle() { return title; }

    boolean borrow() {
        if (out) {
            return false;
        }
        out = true;
        return true;
    }
}`,
        output: `Leo cannot take Dune: it is out
Mia has 1 book(s)
Leo has 0 book(s)`,
        mermaid: `classDiagram
  class Member {
    -String name
    -ArrayList~Book~ borrowed
    +take(Book book) void
  }
  class Book {
    -String title
    -boolean out
    +borrow() boolean
  }
  Member "1" o-- "*" Book : borrowed`,
        diagramNote: 'A `Member` has borrowed books. `size()` on an `ArrayList` counts its elements, like `length` on an array.'
      },
      {
        title: 'A part that belongs to one owner: a Car has an Engine',
        text: [
          'Sometimes the part is made by its owner and lives and dies with it. A `Car` builds its own `Engine` in the constructor, and nobody else ever sees that engine. In UML this strong form is drawn with a filled diamond (`*--`), the looser "holds" form with an empty one (`o--`).'
        ],
        fileName: 'CarDemo.java',
        code: `public class CarDemo {
    public static void main(String[] args) {
        Car car = new Car("Beetle");
        car.drive();
        car.drive();
    }
}

class Car {
    private final String model;
    private final Engine engine;

    Car(String model) {
        this.model = model;
        this.engine = new Engine();   // the car makes its own engine
    }

    void drive() {
        engine.start();               // delegate to the part
        System.out.println(model + " drives, engine runs: " + engine.isRunning());
    }
}

class Engine {
    private boolean running;
    private int starts;

    void start() {
        running = true;
        starts++;
        System.out.println("vroom (start number " + starts + ")");
    }

    boolean isRunning() { return running; }
}`,
        output: `vroom (start number 1)
Beetle drives, engine runs: true
vroom (start number 2)
Beetle drives, engine runs: true`
      },
      {
        title: 'has-a or is-a?',
        text: [
          'Say the sentence out loud. If "X **has** a Y" sounds right, use a field (composition). If "X **is** a Y" sounds right, inheritance may fit (Deeper lessons). Most relationships in real programs are "has-a".'
        ],
        table: {
          head: ['Sentence', 'Relationship', 'In Java'],
          rows: [
            ['A library has books', 'has-a', 'field `ArrayList<Book> books`'],
            ['A car has an engine', 'has-a', 'field `Engine engine`'],
            ['An order has a customer', 'has-a', 'field `Customer customer`'],
            ['A dog is an animal', 'is-a', '`class Dog extends Animal` (Deeper)'],
            ['A library is a book', 'nonsense', 'neither: do not force it']
          ]
        }
      }
    ],
    technical: [
      'On the heap, composition is a graph of references. The `Library` object holds a reference to an `ArrayList` object; the list holds a reference to an internal array; each slot of that array holds a reference to a `Book` object. Following `library.lend("Dune")` means following these arrows.',
      'Because only references are stored, a `Book` can sit in the library’s list and in a member’s list at the same time without being copied. Changing it through one path is visible through the other, the same aliasing you saw in "Creating Objects with new".',
      'When nothing refers to the `Library` any more, the whole graph behind it becomes unreachable (unless something else still points to a book), and the garbage collector frees all of it together. You never need to "delete" the books one by one.'
    ],
    tryIt: {
      steps: [
        'Copy `LibraryDemo.java` and run it.',
        'Add a method `void giveBack()` to `Book` that sets `borrowed = false;`.',
        'Add a method `boolean takeBack(String title)` to `Library` that finds the book like `lend` does and calls `book.giveBack()`; return `true` if found.',
        'In `main`, call `library.takeBack("Dune")` before `printCatalog()`, and then `library.lend("Dune")` once more.'
      ],
      see: '`Dune by Frank Herbert (borrowed)` again in the catalog, because the second lend after the return worked.'
    },
    check: [
      { q: 'Why does `Library.lend` call `book.borrow()` instead of setting `book.borrowed = true` itself?', a: '`borrowed` is private to `Book`, and the rule "not twice" belongs to `Book`. The library delegates, so the rule lives in one place.' },
      { q: 'Mia and the library both hold the same `Book` object. Mia’s book is borrowed. What does the library’s catalog show for it?', a: '`(borrowed)`. Both hold a reference to one and the same object, so they see the same state.' },
      { q: 'Is "a classroom has pupils" composition or inheritance?', a: 'Composition (has-a): `Classroom` gets a field like `ArrayList<Pupil> pupils`. A classroom is not a pupil.' }
    ],
    keyPoints: [
      'Composition: an object holds other objects in its fields ("has-a").',
      'Each class guards its own data; others call its methods.',
      'Delegation: hand a job to the object that owns the data.',
      'An `ArrayList<Book>` holds many references; the same object can be in several places.',
      'Prefer composition; use inheritance only for a real "is-a".'
    ],
    commonMistakes: [
      'One huge class `LibrarySystem` with arrays `titles[]`, `authors[]`, `borrowed[]`. Make a `Book` class and keep one `ArrayList<Book>`.',
      'Reaching through objects: `library.books.get(0).borrowed = true`. Ask the objects instead: `library.lend("Dune")`.',
      'Forgetting to create the list: `private ArrayList<Book> books;` stays `null`, and `books.add(…)` crashes. Write `= new ArrayList<>()`.',
      'Comparing titles with `==`: `book.getTitle() == title`. Compare text with `equals`.'
    ],
    related: ['Fields and Default Values', 'Encapsulation: private, Getters, Setters', 'Inheritance: extends and super', 'Collections', 'UML Diagrams']
  }]);
})();
