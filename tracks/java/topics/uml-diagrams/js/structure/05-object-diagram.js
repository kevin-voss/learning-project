// UML lesson 5: object diagrams, a snapshot of real objects and their links.
(function () {
  const U = Java.topics.umlDiagrams;

  U.lessons.push({
    id: 'object-diagram',
    num: '05',
    title: 'Object Diagram',
    category: 'structure',
    icon: '◫',
    tagline: 'A photo of the objects at one moment',
    realWorld: 'A class photo at school. The school rules say "every class has one teacher and many children". The photo shows one real day: Ms Kim, Ali and Bo, standing next to each other.',
    kid: [
      'A cookie cutter has the shape of a star. That is the class. The cookies you bake with it are the objects. Each cookie is real, and each one can have different sprinkles.',
      'An object diagram is a photo of your cookies on the tray right now: this one has red sprinkles, that one has blue sprinkles, and these two touch each other.',
      'If you take another photo later, after you ate one cookie, the photo looks different. The cookie cutter stays the same.'
    ],
    definition: 'An **object diagram** shows real objects at one moment while the program runs: each object with its name, its class and its field values, plus the **links** (references) between them. It is a snapshot of a class diagram filled with data.',
    explain: [
      'A class diagram shows the rules: which classes exist and how they may be connected. An object diagram shows one possible situation that follows those rules. You can draw many different object diagrams for one class diagram.',
      'An object box has a title `objectName : ClassName`, underlined in UML. Below it are the field values: `name = "Mia"`, `age = 9`. There are **no methods**, because methods belong to the class and do not change from object to object. If the name does not matter, you leave it out: `: Pet` is an anonymous object of class `Pet`.',
      'A **link** is a line between two objects. It is one real reference: a field in one object that points to the other object. A link has no multiplicity, because it always connects exactly two objects. A list field with three elements gives three links.',
      'The best use of an object diagram is to explain something surprising. In the example below two people share one `Address` object. When the address changes, both people "move", and the object diagram shows why at a glance.',
      'Mermaid has no special object diagram type, so this page draws objects with the class diagram syntax and a title like `mia : Person`. On paper, underline the title.'
    ],
    why: 'References are invisible in code. `mia.address()` and `leo.address()` look like two things, but they can be the same object. An object diagram makes shared objects, `null` fields and lists of links visible.',
    whenUse: 'When you explain a tricky situation with references, when you plan test data, when you debug and want to draw what the debugger shows, and to check that a class diagram allows the situations you need.',
    syntax: 'Box title `objectName : ClassName` (underlined on paper), field lines `field = value`, solid lines between linked objects. Mermaid: `class mia["mia : Person"] { name = "Mia" }` and `mia --> home : address`.',
    mermaid: `classDiagram
  direction LR
  class mia["mia : Person"] {
    name = "Mia"
    age = 9
  }
  class leo["leo : Person"] {
    name = "Leo"
    age = 7
  }
  class home["home : Address"] {
    street = "Elm Street 5"
  }
  mia --> home : address
  leo --> home : address`,
    visualLabel: 'The objects right after line 5',
    visualNote: 'Three objects, two links. Both links end at the same `Address` object. That is why one `moveTo` call changes what both people print.',
    fileName: 'SnapshotDemo.java',
    code: `public class SnapshotDemo {
    public static void main(String[] args) {
        Address home = new Address("Elm Street 5");
        Person mia = new Person("Mia", 9, home);
        Person leo = new Person("Leo", 7, home);
        System.out.println(mia);
        System.out.println(leo);
        System.out.println("Same address object? " + (mia.address() == leo.address()));
        home.moveTo("Oak Road 12");
        System.out.println(mia);
        System.out.println(leo);
    }
}

class Address {
    private String street;
    Address(String street) { this.street = street; }
    void moveTo(String newStreet) { street = newStreet; }
    public String toString() { return street; }
}

class Person {
    private final String name;
    private final int age;
    private final Address address;

    Person(String name, int age, Address address) {
        this.name = name;
        this.age = age;
        this.address = address;
    }

    Address address() { return address; }

    public String toString() {
        return name + " (" + age + ") lives at " + address;
    }
}`,
    output: `Mia (9) lives at Elm Street 5
Leo (7) lives at Elm Street 5
Same address object? true
Mia (9) lives at Oak Road 12
Leo (7) lives at Oak Road 12`,
    codeSummary: 'Two `Person` objects get the same `Address` object. The object diagram above shows the situation after line 5; the output shows its effect: one change, two people moved.',
    codeExplanation: [
      { label: 'Line 3', code: 'Address home = new Address("Elm Street 5");', text: 'Creates one object. In the diagram it is the box `home : Address` with `street = "Elm Street 5"`.' },
      { label: 'Line 4', code: 'Person mia = new Person("Mia", 9, home);', text: 'Creates `mia : Person` and stores a reference to `home` in its field `address`. That reference is the first link.' },
      { label: 'Line 5', code: 'Person leo = new Person("Leo", 7, home);', text: 'The same `home` again: the second link ends at the same box. No new address is created.' },
      { label: 'Line 8', code: 'System.out.println("Same address object? " + (mia.address() == leo.address()));', text: '`==` on objects compares references. `true` proves what the diagram shows: both links point to one object.' },
      { label: 'Line 9', code: 'home.moveTo("Oak Road 12");', text: 'Changes the field of the one shared object. In a new snapshot only the `home` box gets a new value.' },
      { label: 'Line 10', code: 'System.out.println(mia);', text: 'Mia now lives at Oak Road 12, and so does Leo on the next line. The diagram makes this result unsurprising.' },
      { label: 'Line 25', code: 'private final Address address;', text: 'In the class diagram this field is an association `Person --> Address`. In the object diagram each person object has one link of it.' }
    ],
    sections: [
      {
        title: 'Class diagram and object diagram side by side',
        text: [
          'The class diagram of the example has two boxes and one line. It says: "a person has one address". The object diagram above shows three boxes and two lines: one real situation.'
        ],
        mermaid: `classDiagram
  direction LR
  class Person {
    -String name
    -int age
    +toString() String
  }
  class Address {
    -String street
    ~moveTo(String newStreet) void
  }
  Person "*" --> "1" Address : address`,
        table: {
          head: ['', 'Class diagram', 'Object diagram'],
          rows: [
            ['shows', 'classes: the rules', 'objects: one moment'],
            ['box title', '`Person`', '`mia : Person` (underlined)'],
            ['middle part', 'fields with types: `-int age`', 'fields with values: `age = 9`'],
            ['bottom part', 'methods', 'none'],
            ['lines', 'associations with multiplicity', 'links, always one to one'],
            ['how many per program', 'one', 'as many as you like']
          ]
        }
      },
      {
        title: 'A list field becomes several links',
        text: [
          'In the class diagram, `Owner "1" --> "*" Pet` is one line. In an object diagram, an owner with two pets has **two** links: one per element of the list. A pet in the shelter with no owner has no link at all.',
          'Here the owner has a list of pets, but the pets do not know their owner (one-way arrow). So the links start at `mia` only.'
        ],
        mermaid: `classDiagram
  direction LR
  class mia["mia : Owner"] {
    name = "Mia"
  }
  class rex["rex : Pet"] {
    name = "Rex"
  }
  class luna["luna : Pet"] {
    name = "Luna"
  }
  class max["max : Pet"] {
    name = "Max"
  }
  mia --> rex : pets
  mia --> luna : pets`,
        diagramNote: '`max` has no link: it exists, but nobody refers to it from a list. The diagram matches the output below.',
        fileName: 'ShelterSnapshot.java',
        code: `import java.util.ArrayList;
import java.util.List;

public class ShelterSnapshot {
    public static void main(String[] args) {
        Pet rex = new Pet("Rex");
        Pet luna = new Pet("Luna");
        Pet max = new Pet("Max");
        Owner mia = new Owner("Mia");
        mia.adopt(rex);
        mia.adopt(luna);
        System.out.println(mia.describe());
        System.out.println(max.name() + " is still waiting");
    }
}

class Pet {
    private final String name;
    Pet(String name) { this.name = name; }
    String name() { return name; }
}

class Owner {
    private final String name;
    private final List<Pet> pets = new ArrayList<>();
    Owner(String name) { this.name = name; }
    void adopt(Pet pet) { pets.add(pet); }

    String describe() {
        StringBuilder text = new StringBuilder(name + " ->");
        for (Pet pet : pets) text.append(" ").append(pet.name());
        return text.toString();
    }
}`,
        output: `Mia -> Rex Luna
Max is still waiting`
      },
      {
        title: 'Two snapshots: before and after a method call',
        text: [
          'Methods change field values. Draw one object diagram before the call and one after it, and the difference **is** what the method does. This is a great way to understand a method you did not write.',
          'Here is the `Player` from the class diagram lesson, before and after `ana.addPoints(250)`.'
        ],
        mermaid: `classDiagram
  direction LR
  class before["ana : Player (before)"] {
    name = "Ana"
    score = 0
    level = 1
  }
  class after["ana : Player (after)"] {
    name = "Ana"
    score = 250
    level = 3
  }
  before ..> after : addPoints(250)`,
        diagramNote: 'It is the same object at two moments. The dashed arrow is only a hint for the reader, not a UML link. `score` and `level` changed; `name` did not.',
        fileName: 'BeforeAfter.java',
        code: `public class BeforeAfter {
    public static void main(String[] args) {
        Player ana = new Player("Ana");
        System.out.println("before: " + ana);
        ana.addPoints(250);
        System.out.println("after:  " + ana);
    }
}

class Player {
    private final String name;
    private int score = 0;
    private int level = 1;

    Player(String name) { this.name = name; }

    void addPoints(int points) {
        score += points;
        level = 1 + score / 100;
    }

    public String toString() {
        return name + ", score = " + score + ", level = " + level;
    }
}`,
        output: `before: Ana, score = 0, level = 1
after:  Ana, score = 250, level = 3`,
        tip: 'A `toString` that prints every field is a "text object diagram". Print it before and after, and you have both snapshots in the console.'
      },
      {
        title: 'Where object diagrams help most',
        text: ['You rarely draw object diagrams for a whole program. They shine in small, specific situations.'],
        bullets: [
          '**Shared objects:** two references to one object, as in the address example.',
          '**null fields:** a missing link shows a `0..1` field that is `null`.',
          '**Test data:** "for this test I need one owner with two pets and one pet without owner" is an object diagram.',
          '**Debugging:** the Variables view of the [debugger](../debugging/index.html) shows objects and their fields; drawing them is an object diagram.'
        ],
        warn: 'An object diagram must obey its class diagram. If the class diagram says a person has exactly one address, an object diagram with a person and two address links is wrong, and so is the code that made it.'
      }
    ],
    technical: [
      'An object diagram is a picture of the **heap**, the memory area where `new` puts objects. Each box is one object on the heap. Each link is a reference stored in a field: the address of another heap object. The topic [JVM and memory](../jvm-memory/index.html) shows the same picture from the JVM side.',
      'The object names such as `mia` are really the names of **local variables** in `main`. Those variables live on the stack and hold references to the objects. The object itself has no name. That is why an anonymous box `: Pet` is fine: the object exists even when no variable names it.',
      'When no reference leads to an object any more, the garbage collector may delete it. In an object diagram that is a box with no incoming link and no variable that refers to it: it is about to disappear.'
    ],
    tryIt: {
      steps: [
        'In `SnapshotDemo.java`, give Leo his own address: `new Address("Elm Street 5")` instead of `home`.',
        'Run the program again.',
        'Draw the new object diagram on paper: how many `Address` boxes, and where do the links end?'
      ],
      see: '`Same address object? false`, and after `moveTo` only Mia lives at Oak Road 12. Your drawing has two address boxes, one link each.'
    },
    check: [
      { q: 'Which part of a class box is missing in an object box, and why?', a: 'The methods. They belong to the class and are the same for every object.' },
      { q: 'What does the title `: Book` (with nothing in front of the colon) mean?', a: 'An anonymous object of class `Book`: its name does not matter for this diagram.' },
      { q: 'An owner has a list with three pets. How many links does the object diagram show from the owner?', a: 'Three, one per pet in the list.' }
    ],
    keyPoints: [
      'An object diagram is a snapshot: real objects, real values, one moment.',
      'Box title `name : Class`, fields as `field = value`, no methods.',
      'A link is one reference; a list field gives one link per element.',
      'Two links to one box show a shared object.',
      'Before and after snapshots show what a method changes.'
    ],
    commonMistakes: [
      'Writing types instead of values in an object box: `age : int`. Fix: an object has values, `age = 9`.',
      'Adding multiplicities to links. Fix: a link always connects exactly two objects; numbers belong to the class diagram.',
      'Drawing two address boxes when the code passes the same `home` twice. Fix: one `new` means one box.',
      'Trying to show the whole program as objects. Fix: draw only the few objects that explain the question.'
    ],
    related: ['Multiplicity', 'Class Diagram', 'Types and Variables', 'JVM and Memory'],
    glossary: U.glossary
  });
})();
