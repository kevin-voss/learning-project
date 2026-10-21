// UML lesson 1: what UML is and why people draw before they code.
(function () {
  const U = Java.topics.umlDiagrams;

  U.lessons.push({
    id: 'what-is-uml',
    num: '01',
    title: 'What UML Is',
    category: 'basics',
    icon: '✎',
    tagline: 'Draw the program before you build it',
    realWorld: 'Before you build a big Lego castle with a friend, you draw it on paper: towers here, the big door there, the bridge in front. You argue about the drawing, change it with an eraser, and only then start to click bricks together.',
    kid: [
      'Imagine you and your friends want to build a tree house. If everybody starts hammering at once, one builds a door where another wants a window. So first you draw the tree house together.',
      'On paper, a mistake costs one eraser stroke. In wood, it costs a whole afternoon. That is why people draw first.',
      'Programmers do the same. They draw boxes and arrows that show the parts of a program and how the parts talk. Because everybody uses the same kind of drawing, everybody understands it. That shared drawing language is called UML.'
    ],
    definition: '**UML** (Unified Modeling Language) is a standard set of picture types for software. Each UML diagram answers one question about a program: which parts exist, how they are connected, or what happens in which order.',
    explain: [
      'A **diagram** is a picture of one view of a program. A **model** is the whole simplified description of the system; one diagram shows one slice of it. A class diagram shows the classes, a sequence diagram shows method calls in time order, and so on.',
      '**Standard** means that the symbols are fixed and written down. A hollow triangle always means inheritance, a `-` always means private. A developer in Berlin and one in Tokyo read the same drawing the same way.',
      'UML has 14 diagram types in two families. **Structure diagrams** show what exists: classes, objects, components, machines. **Behavior diagrams** show what happens: goals of users, workflows, states, messages. In daily work you need about seven of them, and this topic teaches exactly those.',
      'Most developers use UML as a **sketch**: a quick drawing on a whiteboard or in a text file to think and talk. Only a few teams draw every detail as a **blueprint** before they write code. A sketch is enough for this topic and for most jobs.',
      'You can draw UML on paper, on a whiteboard or as text. This page uses **Mermaid**: you write a few lines of text, and the page turns them into a picture. Another popular text tool in Java projects is **PlantUML**.'
    ],
    why: 'Code is long and detailed. A diagram fits a whole idea on one screen, so you can see a design mistake before you have written 500 lines that depend on it. It is also the fastest way to explain your program to someone else.',
    whenUse: 'Before you start a program with more than two or three classes, when you explain code to a team mate or a teacher, when you read a task sheet that already contains a diagram, and when you document how a finished program works.',
    syntax: 'One diagram answers one question. Pick the type by the question: **what exists?** → class or object diagram. **What happens in which order?** → sequence or activity diagram. **Which states?** → state machine diagram. **Who wants what?** → use case diagram.',
    mermaid: `flowchart TD
  U["UML diagrams"] --> S["Structure: what exists"]
  U --> B["Behavior: what happens"]
  S --> C["Class diagram"]
  S --> O["Object diagram"]
  S --> K["Component and deployment"]
  B --> UC["Use case diagram"]
  B --> A["Activity diagram"]
  B --> ST["State machine diagram"]
  B --> SQ["Sequence diagram"]`,
    visualLabel: 'The UML family in this topic',
    visualNote: 'Two families. The left side answers "what exists?", the right side answers "what happens?". Every box is one lesson of this topic.',
    fileName: 'PetShelter.java',
    code: `import java.util.ArrayList;
import java.util.List;

public class PetShelter {
    public static void main(String[] args) {
        Owner mia = new Owner("Mia");
        mia.adopt(new Pet("Rex", 3));
        mia.adopt(new Pet("Luna", 1));
        mia.printPets();
    }
}

class Owner {
    private final String name;
    private final List<Pet> pets = new ArrayList<>();

    Owner(String name) {
        this.name = name;
    }

    void adopt(Pet pet) {
        pets.add(pet);
    }

    void printPets() {
        System.out.println(name + " has " + pets.size() + " pets:");
        for (Pet pet : pets) {
            System.out.println("- " + pet.describe());
        }
    }
}

class Pet {
    private final String name;
    private final int age;

    Pet(String name, int age) {
        this.name = name;
        this.age = age;
    }

    String describe() {
        return name + ", " + age + " years old";
    }
}`,
    output: `Mia has 2 pets:
- Rex, 3 years old
- Luna, 1 years old`,
    codeSummary: 'A tiny program with two classes: an `Owner` keeps a list of `Pet` objects. Section 3 draws exactly this program as a class diagram, so you see the code and its picture side by side.',
    codeExplanation: [
      { label: 'Line 4', code: 'public class PetShelter {', text: 'One file can hold several classes. Only one of them is `public`, and the file is named after it: `PetShelter.java`. The other classes have no modifier.' },
      { label: 'Line 6', code: 'Owner mia = new Owner("Mia");', text: 'Creates one `Owner` object. A class diagram shows the class `Owner`; an object diagram would show this object `mia`.' },
      { label: 'Line 7', code: 'mia.adopt(new Pet("Rex", 3));', text: 'A method call from `main` to `mia`. A sequence diagram draws each such call as an arrow.' },
      { label: 'Line 14', code: 'private final String name;', text: 'A private field. In a class diagram it appears in the middle part of the box as `-String name`.' },
      { label: 'Line 15', code: 'private final List<Pet> pets = new ArrayList<>();', text: 'The owner keeps many pets. In the diagram this field becomes a line from `Owner` to `Pet` with `1` and `*` at the ends.' },
      { label: 'Line 21', code: 'void adopt(Pet pet) {', text: 'A method. It goes into the bottom part of the class box as `~adopt(Pet pet) void` (`~` because it has no modifier: package-private).' },
      { label: 'Line 28', code: 'System.out.println("- " + pet.describe());', text: 'The owner asks each pet to describe itself. Owner uses Pet, so the arrow in the diagram points from Owner to Pet.' },
      { label: 'Line 42', code: 'String describe() {', text: 'The only method of `Pet`. Small classes give small, readable boxes.' }
    ],
    sections: [
      {
        title: 'Why draw before you code',
        text: [
          'A drawing is cheap to change. Moving an arrow takes a second; moving a field through ten classes takes an hour and can break things.',
          'People draw first for four reasons. They are the same in a school project and in a big company.'
        ],
        bullets: [
          '**Think:** drawing forces you to decide which classes exist and who knows whom.',
          '**Talk:** a team agrees on one picture instead of five ideas in five heads.',
          '**Find mistakes early:** a missing link or an impossible state is visible on paper.',
          '**Explain later:** a new team mate reads one diagram instead of fifty files.'
        ],
        mermaid: `flowchart LR
  I["Idea"] --> D["Draw a sketch"]
  D --> T["Talk about it"]
  T -- "found a problem" --> D
  T -- "looks good" --> C["Write the code"]
  C --> R["Run and test"]
  R -- "design was wrong" --> D`,
        diagramNote: 'Drawing is not a one-time step. You go back to the sketch whenever talking or testing shows a problem, and the loop is short because a sketch is quick to change.'
      },
      {
        title: 'Which diagram answers which question',
        text: ['Each diagram type has one job. When you are unsure which one to draw, start from the question you want to answer.'],
        table: {
          head: ['Question', 'Diagram', 'What it becomes in Java'],
          rows: [
            ['Which classes exist, with which fields and methods?', 'Class diagram', '`class`, fields, methods, `extends`, `implements`'],
            ['Which objects exist right now, with which values?', 'Object diagram', 'objects created with `new` and their field values'],
            ['Who calls which method, in which order?', 'Sequence diagram', 'method calls and return values'],
            ['Which steps, decisions and loops does a process have?', 'Activity diagram', '`if`, `switch`, `for`, `while`'],
            ['Which states can one object be in?', 'State machine diagram', 'an `enum` plus checks before each change'],
            ['What do the users want to do with the system?', 'Use case diagram', 'often one public method per goal'],
            ['Which big parts make up the system, and where do they run?', 'Component and deployment diagram', 'packages, interfaces, `.jar` files, servers']
          ],
          note: 'You do not need all of them for every program. For a small exercise a class diagram is often enough.'
        }
      },
      {
        title: 'Same idea, two views: the code above as a picture',
        text: [
          'Here is the class diagram of `PetShelter.java`. Each class is a box with three parts: the name, the fields, the methods.',
          'The line between the boxes says: one `Owner` has many (`*`) pets. The arrow points to `Pet` because the owner has a field that refers to pets, and not the other way round.'
        ],
        mermaid: `classDiagram
  direction LR
  class Owner {
    -String name
    -List~Pet~ pets
    ~adopt(Pet pet) void
    ~printPets() void
  }
  class Pet {
    -String name
    -int age
    ~describe() String
  }
  Owner "1" --> "*" Pet : pets`,
        diagramNote: 'Compare it line by line with the code. `-` is private, `~` is package-private (no modifier). `List~Pet~` is how Mermaid writes `List<Pet>`. The class `PetShelter` with `main` is left out: it only starts the program and tells nothing about the design.',
        tip: 'A diagram leaves things out on purpose. Constructors, getters and the class with `main` are often skipped, so the important parts stand out.'
      },
      {
        title: 'Mermaid: a diagram written as text',
        text: [
          'Every diagram on this page is written in **Mermaid**. You type a few lines of text and the page turns them into a picture. This is the text of the diagram in step 3.',
          'Text diagrams have a big advantage: they live next to your code in the same folder, Git tracks their changes, and you can edit them in any editor. Many sites, such as GitHub, draw Mermaid inside Markdown files by themselves.'
        ],
        fileName: 'pet-shelter.mmd',
        codeLanguage: 'plaintext',
        code: `classDiagram
  direction LR
  class Owner {
    -String name
    -List~Pet~ pets
    ~adopt(Pet pet) void
    ~printPets() void
  }
  class Pet {
    -String name
    -int age
    ~describe() String
  }
  Owner "1" --> "*" Pet : pets`,
        tip: 'Try it live: paste this text into the Mermaid Live Editor at [mermaid.live](https://mermaid.live) and change a line. The picture updates as you type.'
      },
      {
        title: 'Mermaid and PlantUML side by side',
        text: [
          'In Java projects and in many courses you also meet **PlantUML**. It does the same job with slightly different words. Its text starts with `@startuml` and ends with `@enduml`, and it writes the type **after** the name, like the UML standard: `name : String`.',
          'Mermaid writes `String name`, the Java order. Both describe the same picture. If you can read one, you can read the other.'
        ],
        table: {
          head: ['What', 'UML standard (paper)', 'Mermaid', 'PlantUML'],
          rows: [
            ['private field', '`- name : String`', '`-String name`', '`-name : String`'],
            ['method', '`+ describe() : String`', '`+describe() String`', '`+describe() : String`'],
            ['one to many', 'line with `1` and `*`', '`Owner "1" --> "*" Pet`', '`Owner "1" --> "*" Pet`'],
            ['start and end', 'none', '`classDiagram` on line 1', '`@startuml` … `@enduml`']
          ],
          note: 'On paper and in exams, use the UML standard order `name : Type`. In Mermaid, use the Java order `Type name`.'
        },
        warn: 'A diagram is a sketch, not a law. If the code and the diagram disagree, one of them is out of date. Fix the one that is wrong, and keep diagrams small so they stay easy to update.'
      }
    ],
    technical: [
      'UML is maintained by the **OMG** (Object Management Group), a group of companies that writes standards. The current version is UML 2.5.1. The standard is hundreds of pages long; nobody uses all of it, and a sketch may leave out anything that does not help.',
      'The Java compiler knows nothing about UML. `javac` reads `.java` files only. A diagram is documentation for humans. Some tools go from code to diagram (IntelliJ IDEA can draw a class diagram of a package) or from diagram to code skeletons, but you always check the result yourself.',
      'Mermaid is a JavaScript library. When this page loads, Mermaid reads the text inside each diagram block, works out where every box and arrow goes, and draws an SVG image (a picture made of lines and shapes that stays sharp at any size). That is why the diagrams adapt to light and dark mode.'
    ],
    tryIt: {
      steps: [
        'Open [mermaid.live](https://mermaid.live) in your browser.',
        'Delete the example text and paste the `pet-shelter.mmd` text from step 4.',
        'Add a field `-String species` to the class `Pet`.',
        'Add a method `~countPets() int` to the class `Owner`.'
      ],
      see: 'the picture updates while you type: `Pet` gets a third field and `Owner` a third method.'
    },
    check: [
      { q: 'What does the "U" in UML stand for, and why does it matter?', a: '"Unified": one standard set of symbols that everybody agreed on. So every developer reads the same diagram the same way.' },
      { q: 'You want to show in which order three objects call each other. Which family and which diagram?', a: 'The behavior family. A sequence diagram shows method calls in time order.' },
      { q: 'Why does the class diagram of `PetShelter.java` not show the class `PetShelter`?', a: 'It only holds `main` and starts the program. A diagram leaves out what does not help to understand the design.' }
    ],
    keyPoints: [
      'UML is a standard picture language for software.',
      'Structure diagrams show what exists; behavior diagrams show what happens.',
      'One diagram answers one question. Pick the type by the question.',
      'Most people draw UML as a quick sketch, not as a complete blueprint.',
      'Mermaid and PlantUML turn short text into diagrams that live next to the code.'
    ],
    commonMistakes: [
      'Drawing everything in one giant diagram. Fix: one diagram per question, at most about 7 boxes.',
      'Mixing the type order on paper: `String name` in a UML exam. Fix: on paper write `name : String`; in Mermaid write `String name`.',
      'Drawing after the code is finished only to tick a box. Fix: draw before you code, when changes are still cheap.',
      'Treating the diagram as more true than the code. Fix: when they disagree, find out which one is outdated and update it.'
    ],
    related: ['Class Diagram', 'Sequence Diagram', 'Reading a Diagram into Code', 'Classes and Objects'],
    glossary: U.glossary
  });
})();
