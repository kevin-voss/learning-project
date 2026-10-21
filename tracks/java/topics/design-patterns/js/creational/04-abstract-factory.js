(function () {
  const DP = Java.topics.designPatterns;

  DP.lessons.push({
    id: 'abstract-factory',
    num: '04',
    title: 'Abstract Factory',
    category: 'creational',
    icon: '⊞',
    tagline: 'Families of objects that match',
    realWorld: 'A furniture shop with style catalogues. You pick the "Modern" catalogue once, and the chair, the sofa and the table you order from it all match. You never end up with a modern chair next to a grandma-style sofa.',
    kid: [
      'You have two boxes for your dolls\' house. One box has only pink furniture. The other box has only wooden furniture.',
      'When you set up a room, you take one box and pull out a chair, a bed and a table. Because they all come from the same box, they all match.',
      'An **Abstract Factory** is such a box. You choose the box once. After that you only say "give me a chair", and the chair always fits the rest.'
    ],
    definition: 'The **Abstract Factory** pattern is an interface with one creation method per product, such as `createChair()` and `createSofa()`. Each implementation creates a whole **family** of products that belong together.',
    explain: [
      'A **product family** is a set of different objects that must match: a modern chair with a modern sofa, or dark buttons with dark checkboxes. Mixing families is a bug.',
      'There are four roles. The **abstract factory** is an interface with one method per product (`FurnitureFactory`). The **concrete factories** implement it, one per family (`ModernFactory`, `VintageFactory`). The **abstract products** are interfaces (`Chair`, `Sofa`). The **concrete products** are the real classes (`ModernChair`, `VintageSofa`).',
      'The **client** code (here `Room`) gets one factory, usually through its constructor, and creates everything through it. It never names a concrete product class, so it cannot mix families by accident.',
      'The program chooses the family in **one** place, for example in `main` from a setting. To switch from modern to vintage you change that one line, and every product changes with it.',
      'Abstract Factory is like several Factory Methods grouped into one object. Factory Method creates **one** product through inheritance; Abstract Factory creates a **family** of products through an object you pass around (composition).'
    ],
    why: 'When several objects must be consistent with each other, scattering `new ModernChair()` and `new VintageSofa()` through the code makes mixing easy and switching hard. A factory per family makes consistency automatic.',
    whenUse: 'When your code creates several related kinds of objects and the whole set must change together: themes, operating systems, database vendors, test doubles versus real ones. Not when you have one product or the set of product types changes often.',
    syntax: '`interface Factory { ProductA createA(); ProductB createB(); }` and one `class FamilyOneFactory implements Factory { … }` per family. The client holds a `Factory` and calls `createA()` and `createB()`.',
    pros: [
      'Products from one factory always match.',
      'The client never names a concrete product class.',
      'Switching the whole family is a one-line change.',
      'Adding a new family means adding classes, not editing old ones.'
    ],
    cons: [
      'Adding a new kind of product (a table) forces you to edit the interface and every factory.',
      'Many interfaces and classes for a small idea.',
      'Overkill if there is only one family.'
    ],
    fileName: 'FurnitureShop.java',
    code: `interface Chair { String sit(); }
interface Sofa { String lie(); }

interface FurnitureFactory { // abstract factory
    Chair createChair();
    Sofa createSofa();
}

class ModernChair implements Chair { public String sit() { return "sit on a modern steel chair"; } }
class ModernSofa implements Sofa { public String lie() { return "lie on a modern grey sofa"; } }
class VintageChair implements Chair { public String sit() { return "sit on a vintage wooden chair"; } }
class VintageSofa implements Sofa { public String lie() { return "lie on a vintage velvet sofa"; } }

class ModernFactory implements FurnitureFactory {
    public Chair createChair() { return new ModernChair(); }
    public Sofa createSofa() { return new ModernSofa(); }
}

class VintageFactory implements FurnitureFactory {
    public Chair createChair() { return new VintageChair(); }
    public Sofa createSofa() { return new VintageSofa(); }
}

class Room { // client: knows only the interfaces
    private final FurnitureFactory factory;
    Room(FurnitureFactory factory) { this.factory = factory; }

    void furnish(String name) {
        Chair chair = factory.createChair();
        Sofa sofa = factory.createSofa();
        System.out.println(name + ": " + chair.sit() + ", " + sofa.lie());
    }
}

public class FurnitureShop {
    public static void main(String[] args) {
        new Room(new ModernFactory()).furnish("Office");
        new Room(new VintageFactory()).furnish("Library");
    }
}`,
    output: `Office: sit on a modern steel chair, lie on a modern grey sofa
Library: sit on a vintage wooden chair, lie on a vintage velvet sofa`,
    codeSummary: '`Room` gets one factory and creates both pieces through it. The office gets a modern set, the library a vintage set, and no room can mix them.',
    codeExplanation: [
      { label: 'Line 1', code: 'interface Chair { String sit(); }', text: 'An abstract product. `Sofa` on the next line is the second one. Together they form what a family contains.' },
      { label: 'Line 4', code: 'interface FurnitureFactory { // abstract factory', text: 'The abstract factory: one creation method per product type.' },
      { label: 'Line 9', code: 'class ModernChair implements Chair { public String sit() { return "sit on a modern steel chair"; } }', text: 'A concrete product of the modern family. There are four concrete products: two types times two families.' },
      { label: 'Line 14', code: 'class ModernFactory implements FurnitureFactory {', text: 'A concrete factory. It is the only class that knows which classes make up the modern family.' },
      { label: 'Line 15', code: 'public Chair createChair() { return new ModernChair(); }', text: 'Returns the interface type, so the caller never sees `ModernChair`.' },
      { label: 'Line 24', code: 'class Room { // client: knows only the interfaces', text: 'The client. Read its code: no concrete chair or sofa class appears.' },
      { label: 'Line 26', code: 'Room(FurnitureFactory factory) { this.factory = factory; }', text: 'The family comes in from outside. The room does not choose it.' },
      { label: 'Line 29', code: 'Chair chair = factory.createChair();', text: 'Both pieces come from the same factory, so they belong to the same family.' },
      { label: 'Line 37', code: 'new Room(new ModernFactory()).furnish("Office");', text: 'The one place where a family is chosen. Swap `ModernFactory` for `VintageFactory` and both pieces change.' }
    ],
    sections: [
      {
        title: 'The problem: families that get mixed',
        text: [
          'Without a factory, each piece is created on its own. One method uses the style setting, the other was written by somebody who forgot it. The code compiles and runs, but the room does not match.'
        ],
        fileName: 'MixedRoom.java',
        code: `class ModernChair { String sit() { return "modern steel chair"; } }
class VintageChair { String sit() { return "vintage wooden chair"; } }
class ModernSofa { String lie() { return "modern grey sofa"; } }
class VintageSofa { String lie() { return "vintage velvet sofa"; } }

public class MixedRoom {
    static String style = "modern";

    static String pickChair() {
        if (style.equals("modern")) return new ModernChair().sit();
        return new VintageChair().sit();
    }

    static String pickSofa() {
        return new VintageSofa().lie(); // someone forgot the style check
    }

    public static void main(String[] args) {
        System.out.println("Room: " + pickChair() + " + " + pickSofa());
    }
}`,
        output: `Room: modern steel chair + vintage velvet sofa`,
        warn: 'The pain: every creation spot must remember the style on its own. Forget one `if`, and the families mix. Adding a third style means editing every spot.'
      },
      {
        title: 'The roles in a class diagram',
        mermaid: `classDiagram
  class FurnitureFactory {
    <<interface>>
    +createChair() Chair
    +createSofa() Sofa
  }
  class Chair {
    <<interface>>
    +sit() String
  }
  class Sofa {
    <<interface>>
    +lie() String
  }
  FurnitureFactory <|.. ModernFactory
  FurnitureFactory <|.. VintageFactory
  Chair <|.. ModernChair
  Chair <|.. VintageChair
  Sofa <|.. ModernSofa
  Sofa <|.. VintageSofa
  Room --> FurnitureFactory : has a`,
        diagramNote: 'Read it in two directions. Down the factories: one per family. Across the products: one interface per kind. `Room` only touches the three interfaces.',
        text: [
          'Think of a grid: product kinds are columns (chair, sofa), families are rows (modern, vintage). Each concrete factory fills one row.'
        ],
        table: {
          head: ['Family', 'createChair()', 'createSofa()'],
          rows: [
            ['`ModernFactory`', '`ModernChair`', '`ModernSofa`'],
            ['`VintageFactory`', '`VintageChair`', '`VintageSofa`']
          ],
          note: 'A new family adds a row (one factory, easy). A new product kind adds a column (a method in every factory, harder).'
        }
      },
      {
        title: 'The order of calls',
        mermaid: `sequenceDiagram
  participant M as main
  participant R as Room
  participant F as ModernFactory
  M->>F: new ModernFactory()
  M->>R: new Room(factory)
  M->>R: furnish("Office")
  R->>F: createChair()
  F-->>R: a ModernChair
  R->>F: createSofa()
  F-->>R: a ModernSofa
  R-->>M: prints the matching set`,
        diagramNote: 'The family is chosen first, before the client does any work. After that the client only asks the factory.',
        text: [
          'The order matters: the factory is chosen before the room starts working, and every later creation goes through it.'
        ]
      },
      {
        title: 'Choose the family once, from a setting',
        text: [
          'In a real program the style comes from a setting or a user choice. An enum and a switch expression pick the factory in exactly one place.'
        ],
        fileName: 'ChooseFamily.java',
        code: `interface Button { String draw(); }
interface Checkbox { String draw(); }

interface ThemeFactory {
    Button button();
    Checkbox checkbox();
}

class LightTheme implements ThemeFactory {
    public Button button() { return () -> "[ OK ] on white"; }
    public Checkbox checkbox() { return () -> "[x] on white"; }
}

class DarkTheme implements ThemeFactory {
    public Button button() { return () -> "[ OK ] on black"; }
    public Checkbox checkbox() { return () -> "[x] on black"; }
}

enum Theme { LIGHT, DARK }

public class ChooseFamily {
    static ThemeFactory factoryFor(Theme theme) { // the one choice
        return switch (theme) {
            case LIGHT -> new LightTheme();
            case DARK -> new DarkTheme();
        };
    }

    public static void main(String[] args) {
        for (Theme theme : Theme.values()) {
            ThemeFactory f = factoryFor(theme);
            System.out.println(theme + ": " + f.button().draw() + " | " + f.checkbox().draw());
        }
    }
}`,
        output: `LIGHT: [ OK ] on white | [x] on white
DARK: [ OK ] on black | [x] on black`,
        tip: '`Button` has one abstract method, so it is a functional interface and a lambda like `() -> "[ OK ] on white"` can be the product. See [Interfaces](../interfaces/index.html) for lambdas.'
      },
      {
        title: 'Where Java itself uses it',
        text: [
          '`FileSystems.getDefault()` returns a `FileSystem`, an abstract factory for one operating system. It makes `Path` objects, `PathMatcher` objects and more, and they all follow the same rules (for example the path separator). A different file system (such as one inside a zip file) gives you a different, matching family.',
          'Database code works the same way: a `java.sql.Connection` creates `Statement` and `PreparedStatement` objects that fit that database vendor.'
        ],
        fileName: 'JavaFileSystem.java',
        code: `import java.nio.file.FileSystem;
import java.nio.file.FileSystems;
import java.nio.file.Path;
import java.nio.file.PathMatcher;

public class JavaFileSystem {
    public static void main(String[] args) {
        FileSystem fs = FileSystems.getDefault(); // the factory for this OS

        Path path = fs.getPath("notes", "todo.txt"); // product 1
        PathMatcher textFiles = fs.getPathMatcher("glob:*.txt"); // product 2

        System.out.println(path);
        System.out.println(textFiles.matches(path.getFileName()));
        System.out.println(textFiles.matches(fs.getPath("photo.png")));
    }
}`,
        output: `notes/todo.txt
true
false`,
        tip: 'On Windows the first line prints `notes\\todo.txt`: the Windows factory makes paths with its own separator. Your code stays the same.'
      },
      {
        title: 'The weak spot, and when not to use it',
        text: [
          'Adding a **family** is easy: one new factory and its products. Adding a **product kind** is hard: a `createTable()` method must go into the interface and into every factory. If the kinds of products change often, this pattern fights you.',
          'Skip it when there is only one family, or when the products do not need to match. A plain constructor or a single factory method is enough then.'
        ],
        table: {
          head: ['Change', 'Classes you add', 'Classes you edit'],
          rows: [
            ['New family (Rustic)', '`RusticFactory`, `RusticChair`, `RusticSofa`', 'none'],
            ['New product kind (Table)', '`Table`, `ModernTable`, `VintageTable`', '`FurnitureFactory`, `ModernFactory`, `VintageFactory`']
          ]
        }
      }
    ],
    technical: [
      'The client holds a variable of the interface type `FurnitureFactory`. Each call such as `factory.createChair()` is an interface call (`invokeinterface` in bytecode): the JVM finds the method in the real class of the factory object at run time.',
      'Because the return types are interfaces, the compiler checks only that a `Chair` comes back. The guarantee that chair and sofa match is not checked by the compiler; it comes from the design: one factory class writes both `new` calls side by side.',
      'Factories usually hold no state, so one factory object per family is enough. Programs often create it once in `main` and pass it on, or keep it as an enum constant.'
    ],
    tryIt: {
      steps: [
        'Copy `FurnitureShop.java` and run it with `java FurnitureShop.java`.',
        'Add a family: `RusticChair`, `RusticSofa` and a `RusticFactory implements FurnitureFactory`.',
        'In `main`, add `new Room(new RusticFactory()).furnish("Cabin");`.',
        'Check which old classes you had to edit.'
      ],
      see: 'A third line starting with `Cabin:` with two rustic pieces, and no edits in `Room` or the old factories.'
    },
    check: [
      { q: 'What is a product family?', a: 'A set of different objects that must match each other, such as a modern chair and a modern sofa. The Abstract Factory creates all members of one family.' },
      { q: 'Why is adding a new product kind (a table) harder than adding a new family?', a: 'A new kind needs a new method in the factory interface, and every existing factory must implement it. A new family only adds new classes.' },
      { q: 'How is Abstract Factory different from Factory Method?', a: 'Factory Method creates one product, and a subclass decides which by overriding a method. Abstract Factory is an object with several creation methods for a whole family, which you pass to the client.' }
    ],
    keyPoints: [
      'An abstract factory has one creation method per product kind.',
      'Each concrete factory makes one family of matching products.',
      'The client gets the factory from outside and never names a concrete product.',
      'Choose the family in exactly one place.',
      'New families are easy; new product kinds touch every factory.'
    ],
    commonMistakes: [
      'Creating a product directly in the client: `new ModernChair()` inside `Room`. Always ask `factory.createChair()`, or families can mix again.',
      'Letting the client pick the factory with an `if` in many places. Choose it once (`factoryFor(theme)`) and pass it in.',
      'Returning concrete types from the factory: `ModernChair createChair()`. Return the interface `Chair`.',
      'Using the pattern for a single family "in case we add one later". Wait until the second family is real.'
    ],
    related: ['Factory Method', 'Builder', 'Singleton', 'Interfaces'],
    glossary: DP.glossary
  });
})();
