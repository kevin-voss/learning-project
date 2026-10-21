// UML lesson 11: reading diagrams and turning them into code, worked example: a small library.
(function () {
  const U = Java.topics.umlDiagrams;

  U.lessons.push({
    id: 'diagram-to-code',
    num: '11',
    title: 'Reading a Diagram into Code',
    category: 'basics',
    icon: '⇄',
    tagline: 'Worked example: a small library system',
    realWorld: 'Building a Lego set from the instruction booklet. You do not start at a random page. First you look at the picture of the finished model, then you sort the bricks, then you follow the steps in order, and at the end you compare your model with the picture.',
    kid: [
      'Your teacher gives you a drawing of a little library: boxes for books, people and loans, arrows between them, and a small picture of what happens when somebody borrows a book.',
      'You do not need to understand everything at once. First you read the names in the boxes. Then you look at the lines. Then you count the little numbers. Then you read the small words inside the boxes.',
      'Each part of the drawing turns into a part of the program. When you are done, you check every box and every arrow again: is it in the code? If yes, you are finished.'
    ],
    definition: 'Turning diagrams into code is a fixed recipe: **use cases** give the public methods, the **class diagram** gives classes, fields and method headers, the **state diagram** gives an enum and its checks, and the **sequence diagram** gives the method bodies. At the end you check every diagram element against the code.',
    explain: [
      'Read a class diagram in four passes, from coarse to fine. **Names:** which boxes are there? Each one becomes a class, interface or enum. **Lines:** which kind of line connects them? Each one becomes a field, a parameter, `extends` or `implements`. **Numbers:** what multiplicity is at each end? It decides single field or `List`, and which checks you need. **Members:** what is inside the boxes? Fields and method headers.',
      'Write a **skeleton** first: classes, fields and method headers with empty or placeholder bodies. Compile it. A skeleton that compiles proves that your reading of the structure is consistent, before any logic exists.',
      'Then take the behavior diagrams. A **state diagram** becomes an enum, a field and checks in the methods of its events. A **sequence diagram** becomes the body of the method that its first arrow calls: every arrow below it is one line of that body, every `alt` frame an `if`.',
      'Finally **check both ways**. Every box, line, number, state and arrow must appear in the code. And every public method in the code should come from a use case or an arrow. Something in the code that no diagram mentions is either a helper (fine, make it private) or a sign that a diagram is out of date.',
      'This lesson follows the recipe for a small library: readers borrow and return books, and a librarian adds books. Read the final program below first, then follow the steps that build it.'
    ],
    why: 'Task sheets, exams and team designs often hand you diagrams and ask for code. Without a recipe you start somewhere and forget half. With the recipe every element of the drawing gets a place in the program, and you can prove it.',
    whenUse: 'Every time a task gives you UML diagrams. It also works the other way round: to understand existing code, draw the same four diagrams from it.',
    syntax: 'Use cases → public methods. Boxes → classes. Lines → fields, `extends`, `implements`, parameters. Multiplicity → single field or `List` plus checks. States → `enum` + checks. Sequence arrows → method calls in the body.',
    mermaid: `flowchart LR
  A["1 Use cases: public methods"] --> B["2 Class diagram: skeleton"]
  B --> C["3 Compile the skeleton"]
  C --> D["4 State diagram: enum and checks"]
  D --> E["5 Sequence diagram: method bodies"]
  E --> F["6 Run and check every element"]
  F -- "something missing" --> B`,
    visualLabel: 'The recipe',
    visualNote: 'Structure first, behavior second, checking last. If the check finds a gap, go back to the step where it belongs.',
    fileName: 'LibraryApp.java',
    code: `import java.util.ArrayList;
import java.util.List;

public class LibraryApp {
    public static void main(String[] args) {
        Library library = new Library();
        library.addBook(new Book("Momo"));
        library.addBook(new Book("Matilda"));
        library.addMember(new Member("Mia"));
        library.addMember(new Member("Leo"));

        System.out.println("Loan: " + library.borrow("Mia", "Momo"));
        try {
            library.borrow("Leo", "Momo");
        } catch (IllegalStateException e) {
            System.out.println("Refused: " + e.getMessage());
        }
        library.giveBack("Momo");
        System.out.println("Loan: " + library.borrow("Leo", "Momo"));
        System.out.println("Open loans: " + library.openLoans());
    }
}

enum BookState { AVAILABLE, BORROWED }

class Book {
    private final String title;
    private BookState state = BookState.AVAILABLE;
    Book(String title) { this.title = title; }
    String title() { return title; }
    boolean isAvailable() { return state == BookState.AVAILABLE; }
    void setState(BookState state) { this.state = state; }
}

class Member {
    private final String name;
    Member(String name) { this.name = name; }
    String name() { return name; }
}

class Loan {
    private final Member member;
    private final Book book;
    private final int days;
    Loan(Member member, Book book, int days) { this.member = member; this.book = book; this.days = days; }
    Book book() { return book; }
    public String toString() { return member.name() + " has " + book.title() + " for " + days + " days"; }
}

class Library {
    private final List<Book> books = new ArrayList<>();
    private final List<Member> members = new ArrayList<>();
    private final List<Loan> loans = new ArrayList<>();

    void addBook(Book book) { books.add(book); }
    void addMember(Member member) { members.add(member); }
    int openLoans() { return loans.size(); }

    Loan borrow(String memberName, String title) {
        Member member = findMember(memberName);
        Book book = findBook(title);
        if (!book.isAvailable()) {
            throw new IllegalStateException(title + " is already borrowed");
        }
        book.setState(BookState.BORROWED);
        Loan loan = new Loan(member, book, 14);
        loans.add(loan);
        return loan;
    }

    void giveBack(String title) {
        Book book = findBook(title);
        if (book.isAvailable()) {
            throw new IllegalStateException(title + " is not borrowed");
        }
        book.setState(BookState.AVAILABLE);
        loans.removeIf(loan -> loan.book() == book);
    }

    private Member findMember(String name) {
        for (Member member : members) if (member.name().equals(name)) return member;
        throw new IllegalArgumentException("no member " + name);
    }

    private Book findBook(String title) {
        for (Book book : books) if (book.title().equals(title)) return book;
        throw new IllegalArgumentException("no book " + title);
    }
}`,
    output: `Loan: Mia has Momo for 14 days
Refused: Momo is already borrowed
Loan: Leo has Momo for 14 days
Open loans: 1`,
    codeSummary: 'The finished library, longer than other examples because it is the whole worked example. Every class, field and check comes from one of the four diagrams in the steps below. Short methods are written on one line to keep it on one screen.',
    codeExplanation: [
      { label: 'Line 24', code: 'enum BookState { AVAILABLE, BORROWED }', text: 'From the state diagram in step 4: one constant per state.' },
      { label: 'Line 28', code: 'private BookState state = BookState.AVAILABLE;', text: 'The initial state `[*] --> AVAILABLE`: every new book can be borrowed.' },
      { label: 'Line 42', code: 'private final Member member;', text: 'From the line `Loan --> "1" Member`: multiplicity 1, so one `final` field set in the constructor.' },
      { label: 'Line 51', code: 'private final List<Book> books = new ArrayList<>();', text: 'From `Library o-- "*" Book`: upper bound `*` gives a list. Hollow diamond: books are made outside and handed in by `addBook`.' },
      { label: 'Line 53', code: 'private final List<Loan> loans = new ArrayList<>();', text: 'From `Library *-- "*" Loan`: filled diamond, so the library itself creates every loan (line 66) and nobody else does.' },
      { label: 'Line 59', code: 'Loan borrow(String memberName, String title) {', text: 'From the use case "Borrow a book" and the first arrow of the sequence diagram in step 5. Its body follows the arrows of that diagram from top to bottom.' },
      { label: 'Line 62', code: 'if (!book.isAvailable()) {', text: 'The `alt` frame of the sequence diagram, and at the same time the state rule: there is no `borrow` arrow out of `BORROWED`.' },
      { label: 'Line 73', code: 'if (book.isAvailable()) {', text: 'The state rule for `giveBack`: there is no `giveBack` arrow out of `AVAILABLE`, so returning a book that is on the shelf is refused.' },
      { label: 'Line 77', code: 'loans.removeIf(loan -> loan.book() == book);', text: 'Removes the loan of this book. `removeIf` takes a lambda (see [lambdas](../interfaces/index.html)) that answers "remove this one?" for each loan.' },
      { label: 'Line 80', code: 'private Member findMember(String name) {', text: 'A helper that no diagram asked for. It is `private`, so it does not change the public picture. In the sequence diagram it is a self-call.' }
    ],
    sections: [
      {
        title: 'Step 1: read the use cases, find the public methods',
        text: [
          'The use case diagram tells you what the system must offer. Each goal becomes a public method of the class that stands for the system, here `Library`.'
        ],
        mermaid: `flowchart LR
  R["Reader (actor)"]
  L["Librarian (actor)"]
  subgraph SYS["Library system"]
    U1(["Borrow a book"])
    U2(["Return a book"])
    U3(["Add a book"])
    U4(["Register a member"])
  end
  R --- U1
  R --- U2
  L --- U3
  L --- U4`,
        table: {
          head: ['Use case', 'Method of Library'],
          rows: [
            ['Borrow a book', '`borrow(String memberName, String title) : Loan`'],
            ['Return a book', '`giveBack(String title) : void`'],
            ['Add a book', '`addBook(Book book) : void`'],
            ['Register a member', '`addMember(Member member) : void`']
          ]
        }
      },
      {
        title: 'Step 2: read the class diagram in four passes',
        text: [
          '**Pass 1, names:** five boxes, so five types: `Library`, `Book`, `Member`, `Loan` and the enum `BookState`. **Pass 2, lines:** two hollow diamonds (books and members come from outside), one filled diamond (the library makes loans), and plain arrows from `Loan`. **Pass 3, numbers:** every `*` is a `List`, every `1` a single `final` field. **Pass 4, members:** copy fields and method headers.',
          'A `Loan` sits between a member and a book, like the association class in the multiplicity lesson: one member can have many loans, one book has at most one open loan.'
        ],
        mermaid: `classDiagram
  class Library {
    +addBook(Book book) void
    +addMember(Member member) void
    +borrow(String memberName, String title) Loan
    +giveBack(String title) void
  }
  class Book {
    -String title
    -BookState state
    +isAvailable() boolean
  }
  class Member {
    -String name
  }
  class Loan {
    -int days
  }
  class BookState {
    <<enumeration>>
    AVAILABLE
    BORROWED
  }
  Library "1" o-- "*" Book : books
  Library "1" o-- "*" Member : members
  Library "1" *-- "*" Loan : loans
  Loan "*" --> "1" Book : book
  Loan "*" --> "1" Member : member
  Book --> BookState : state`,
        diagramNote: 'The role names (`books`, `loans`, `book` …) become the field names. The class diagram shows `+` for the use case methods; the code leaves them package-private because everything is in one file, which is fine for a sketch.'
      },
      {
        title: 'Step 3: write the skeleton and compile it',
        text: [
          'Turn every box into a class with its fields and method headers. Leave the bodies empty, or return a placeholder. Then compile. If it compiles, your reading of names, lines and numbers fits together.',
          'Placeholder bodies such as `return null;` are only for this step. They make the skeleton compile without any logic.'
        ],
        fileName: 'LibrarySkeleton.java',
        code: `import java.util.ArrayList;
import java.util.List;

public class LibrarySkeleton {
    public static void main(String[] args) {
        Library library = new Library();
        library.addBook(new Book("Momo"));
        System.out.println("The skeleton compiles and runs.");
    }
}

enum BookState { AVAILABLE, BORROWED }

class Book {
    private final String title;                          // -String title
    private BookState state = BookState.AVAILABLE;       // Book --> BookState
    Book(String title) { this.title = title; }
    boolean isAvailable() { return false; }              // logic comes in step 4
}

class Member {
    private final String name;
    Member(String name) { this.name = name; }
}

class Loan {
    private final Member member;                         // Loan --> "1" Member
    private final Book book;                             // Loan --> "1" Book
    private final int days;
    Loan(Member member, Book book, int days) { this.member = member; this.book = book; this.days = days; }
}

class Library {
    private final List<Book> books = new ArrayList<>();      // o-- "*" Book
    private final List<Member> members = new ArrayList<>();  // o-- "*" Member
    private final List<Loan> loans = new ArrayList<>();      // *-- "*" Loan

    void addBook(Book book) { }
    void addMember(Member member) { }
    Loan borrow(String memberName, String title) { return null; }
    void giveBack(String title) { }
}`,
        output: 'The skeleton compiles and runs.',
        tip: 'Comment each field with the line it comes from, as here. When you check your work in step 6, the comments are your checklist.'
      },
      {
        title: 'Step 4: the state diagram gives the enum and the checks',
        text: [
          'A book is `AVAILABLE` or `BORROWED`. `borrow` moves it one way, `giveBack` the other way. The missing arrows are rules too: no `borrow` from `BORROWED`, no `giveBack` from `AVAILABLE`.'
        ],
        mermaid: `stateDiagram-v2
  [*] --> AVAILABLE
  AVAILABLE --> BORROWED : borrow
  BORROWED --> AVAILABLE : giveBack`,
        table: {
          head: ['Diagram element', 'Code in LibraryApp.java'],
          rows: [
            ['states', '`enum BookState { AVAILABLE, BORROWED }`'],
            ['initial state', '`private BookState state = BookState.AVAILABLE;`'],
            ['`AVAILABLE --> BORROWED : borrow`', '`book.setState(BookState.BORROWED);` inside `borrow`'],
            ['no `borrow` from `BORROWED`', '`if (!book.isAvailable()) throw new IllegalStateException(...)`'],
            ['`BORROWED --> AVAILABLE : giveBack`', '`book.setState(BookState.AVAILABLE);` inside `giveBack`'],
            ['no `giveBack` from `AVAILABLE`', '`if (book.isAvailable()) throw new IllegalStateException(...)`']
          ]
        }
      },
      {
        title: 'Step 5: the sequence diagram gives the method body',
        text: [
          'The first arrow, `borrow("Mia", "Momo")`, names the method. Every arrow below it, until the return, is one line of its body, in the same order. The `alt` frame is the `if`.'
        ],
        mermaid: `sequenceDiagram
  actor R as Reader
  participant L as library : Library
  participant B as book : Book
  R->>+L: borrow("Mia", "Momo")
  L->>L: findMember("Mia")
  L->>L: findBook("Momo")
  L->>+B: isAvailable()
  B-->>-L: true or false
  alt book is borrowed
    L-->>R: IllegalStateException
  else book is available
    L->>B: setState(BORROWED)
    create participant N as loan : Loan
    L->>N: new Loan(member, book, 14)
    L-->>R: loan
  end
  deactivate L`,
        bullets: [
          '`findMember` and `findBook` are self-calls: lines 60 and 61, private helpers.',
          '`isAvailable()` is the call in the condition on line 62.',
          'The `alt` part "book is borrowed" is the `throw` on line 63.',
          '`setState(BORROWED)`, `new Loan(...)` and the return are lines 65 to 68.'
        ]
      },
      {
        title: 'Step 6: check every element, both ways',
        text: ['Go through each diagram once more and tick every element in the code. Then go through the code and ask where each public method comes from.'],
        table: {
          head: ['Check', 'Result for the library'],
          rows: [
            ['every box is a class, interface or enum', '5 boxes, 5 types ✔'],
            ['every line is a field (or extends/implements/parameter)', '6 lines, 6 fields ✔'],
            ['every `*` is a list, every `1` a single field set in the constructor', '3 lists, 2 final fields in `Loan` ✔'],
            ['every state is an enum constant, every missing arrow is refused', '2 constants, 2 refusals ✔'],
            ['every sequence arrow is a call, in the same order', '`borrow` follows the diagram ✔'],
            ['every use case has a public method', '4 use cases, 4 methods ✔'],
            ['every extra method is private', '`findMember`, `findBook` ✔']
          ],
          note: 'Run the program with a normal case and a refused case, as `main` does. Both outputs must match what the diagrams promise.'
        }
      }
    ],
    technical: [
      'In the skeleton step, `javac` already checks a lot of your reading: every type named in a field must exist, every method header must be valid, and every `final` field must be set in the constructor. A skeleton that compiles is a first proof that the class diagram is consistent.',
      'Diagrams and code can also be read the other way round (**reverse engineering**). IDEs such as IntelliJ IDEA can draw a class diagram from existing code. The tool sees fields and `extends`, but it cannot see ideas like "composition" or a `0..1` rule; those you still read from how the code uses its fields.',
      'In big projects, the diagrams that stay useful are the ones that are small and kept next to the code, for example as Mermaid text in a `README.md` that Git versions together with the Java files.'
    ],
    tryIt: {
      steps: [
        'Extend the class diagram on paper: a `Member` may have at most 3 open loans (`Member "1" -- "0..3" Loan`).',
        'Add the rule to `borrow` in `LibraryApp.java`: count the loans of this member and throw `IllegalStateException(memberName + " already has 3 books")` when there are 3.',
        'In `main`, add three more books and let Mia borrow four books in a `try` block.',
        'Run `java LibraryApp.java`.'
      ],
      see: 'three successful loans for Mia and then `Refused: Mia already has 3 books`. The new number on the line became one new check in the code.'
    },
    check: [
      { q: 'In which order do you read a class diagram?', a: 'Names (classes), then lines (relationships), then numbers (multiplicities), then members (fields and methods).' },
      { q: 'Why write and compile a skeleton before the logic?', a: 'It proves that names, types, fields and method headers fit together, before any logic can hide a mistake.' },
      { q: 'A method in your code appears in no diagram. What do you do?', a: 'If it is a helper, make it private. If it is part of the public behavior, a diagram is missing it and needs an update.' }
    ],
    keyPoints: [
      'Use cases → public methods; class diagram → skeleton; state diagram → enum and checks; sequence diagram → method bodies.',
      'Read a class diagram in four passes: names, lines, numbers, members.',
      'Compile the skeleton before writing logic.',
      'Missing arrows in a state diagram are rules: refuse those moves.',
      'Check both ways: every element in the code, and every public method in a diagram.'
    ],
    commonMistakes: [
      'Starting with method bodies before the structure exists. Fix: skeleton first, logic second.',
      'Ignoring multiplicities and writing `private Book books;`. Fix: `*` means a `List`.',
      'Forgetting the refusals for missing state arrows. Fix: list every event per state and refuse those without an arrow.',
      'Adding public methods that no diagram mentions. Fix: make helpers `private`, or update the diagram.',
      'Never comparing the result with the diagrams. Fix: do the step 6 checklist every time.'
    ],
    related: ['What UML Is', 'Class Diagram', 'Multiplicity', 'State Machine Diagram', 'Sequence Fragments'],
    glossary: U.glossary
  });
})();
