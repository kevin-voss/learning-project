// UML lesson 4: multiplicity, role names and navigability, mapped to Java fields.
(function () {
  const U = Java.topics.umlDiagrams;

  U.lessons.push({
    id: 'multiplicity',
    num: '04',
    title: 'Multiplicity',
    category: 'structure',
    icon: '#',
    tagline: 'How many objects are at each end of a line',
    realWorld: 'A school class has exactly one class teacher, maybe one helper, and at least one child. Nobody needs to see the children to know these rules: they are written on the door.',
    kid: [
      'You have exactly one nose. You have zero or one bike. You have many toys, maybe even none. And you have exactly ten fingers.',
      'Those numbers are rules. A drawing of a person can write them next to the lines: nose "1", bike "0..1", toys "*", fingers "10".',
      'Programmers write the same little numbers on the lines of a class diagram. Then everybody knows: is it one thing, maybe one thing, or a whole list of things?'
    ],
    definition: '**Multiplicity** is the number (or range of numbers) at the end of an association line. It says how many objects of that class one object at the other end is linked to: `1`, `0..1`, `*`, `1..*` or an exact number like `5`.',
    explain: [
      'A range is written `lower..upper`. `0..1` means "zero or one", `1..*` means "one or more", `2..4` means "two to four". A star `*` alone means "any number, also zero", the same as `0..*`. A single number such as `1` or `5` means exactly that many.',
      'Read a multiplicity from the **other** end of the line. Stand at `Classroom`, walk along the line to `Teacher`, and read the number there: "one classroom has **1** teacher". Then stand at `Teacher` and read the number at `Classroom`: "one teacher has `*` (many) classrooms".',
      'In Java, the number decides the **type of the field**. `1` and `0..1` become one single field. `*` and `1..*` become a `List` (or another collection). An exact number such as `5` can become an array of length 5.',
      'The lower bound decides the **checks**. `1` means the field must never be `null`, so the constructor takes the object and stores it in a `final` field. `0..1` means `null` is allowed and your code must handle it. `1..*` means the list must not be empty.',
      'Next to the number you often see a **role name**: the name the far end plays for this class, such as `teacher` or `students`. In Java the role name becomes the field name. The arrowhead (**navigability**) says which class has that field.'
    ],
    why: 'One number answers the questions that cause the most bugs: may this be `null`? Do I need a list? Can the list be empty? Without it, one programmer writes a single field and another writes a list for the same picture.',
    whenUse: 'On every association in a class diagram that you will turn into code. Leave numbers out only in very early sketches where you only want to show that two classes are connected.',
    syntax: '`ClassA "multA" --> "multB" ClassB : roleName` in Mermaid, for example `Classroom "*" --> "1" Teacher : teacher`. On paper write the number next to the class it counts.',
    table: {
      label: 'Every multiplicity and its Java code',
      head: ['Multiplicity', 'Means', 'Java field', 'Check in the code'],
      rows: [
        ['`1`', 'exactly one', '`private final Teacher teacher;`', 'never `null`: set it in the constructor'],
        ['`0..1`', 'none or one', '`private Teacher helper;`', '`null` means "none": test `helper == null` before use'],
        ['`*` or `0..*`', 'any number, also zero', '`private final List<Student> students = new ArrayList<>();`', 'none: an empty list is fine'],
        ['`1..*`', 'at least one', '`private final List<Student> students;`', 'throw an exception when the list is empty'],
        ['`5`', 'exactly five', '`private final Finger[] fingers = new Finger[5];`', 'the array length is fixed'],
        ['`2..4`', 'two to four', '`private final List<Wheel> wheels;`', 'check `size() >= 2 && size() <= 4`']
      ],
      note: 'The compiler does not know your multiplicities. The field type and your checks make the code keep them.'
    },
    mermaid: `classDiagram
  direction LR
  class Classroom {
    -String name
    ~setHelper(Teacher helper) void
    ~print() void
  }
  class Teacher {
    -String name
  }
  class Student {
    -String name
  }
  Classroom "*" --> "1" Teacher : teacher
  Classroom "*" --> "0..1" Teacher : helper
  Classroom "*" --> "1..*" Student : students`,
    visualLabel: 'A classroom with three rules',
    visualNote: 'Read from `Classroom` to the far end: exactly 1 teacher, 0 or 1 helper, at least 1 student. The `*` at `Classroom` says: one teacher may teach many classrooms. Each role name (`teacher`, `helper`, `students`) is a field in the code.',
    fileName: 'ClassroomDemo.java',
    code: `import java.util.ArrayList;
import java.util.List;

public class ClassroomDemo {
    public static void main(String[] args) {
        Teacher kim = new Teacher("Ms Kim");
        Classroom room = new Classroom("3B", kim, List.of(new Student("Ali"), new Student("Bo")));
        room.print();
        room.setHelper(new Teacher("Mr Lee"));
        room.print();
        try {
            new Classroom("4A", kim, List.of());
        } catch (IllegalArgumentException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}

class Teacher {
    private final String name;
    Teacher(String name) { this.name = name; }
    String name() { return name; }
}

class Student {
    private final String name;
    Student(String name) { this.name = name; }
    String name() { return name; }
}

class Classroom {
    private final String name;
    private final Teacher teacher;          // 1: exactly one
    private Teacher helper;                 // 0..1: null means none
    private final List<Student> students;   // 1..*: at least one

    Classroom(String name, Teacher teacher, List<Student> students) {
        if (teacher == null) throw new IllegalArgumentException("a classroom needs a teacher");
        if (students.isEmpty()) throw new IllegalArgumentException("a classroom needs at least one student");
        this.name = name;
        this.teacher = teacher;
        this.students = new ArrayList<>(students);
    }

    void setHelper(Teacher helper) { this.helper = helper; }

    void print() {
        String helperText = (helper == null) ? "no helper" : "helper " + helper.name();
        System.out.println(name + ": " + teacher.name() + ", " + helperText + ", " + students.size() + " students");
    }
}`,
    output: `3B: Ms Kim, no helper, 2 students
3B: Ms Kim, helper Mr Lee, 2 students
Error: a classroom needs at least one student`,
    codeSummary: 'Each of the three lines in the diagram becomes one field. The constructor and `print` make the code keep the numbers: 1 is never null, 0..1 may be null, 1..* is never empty.',
    codeExplanation: [
      { label: 'Line 33', code: 'private final Teacher teacher;          // 1: exactly one', text: 'Multiplicity `1`: one single field, `final`, set once in the constructor. The role name `teacher` from the diagram is the field name.' },
      { label: 'Line 34', code: 'private Teacher helper;                 // 0..1: null means none', text: 'Multiplicity `0..1`: one single field that may be `null`. It is not `final`, because a helper can come later.' },
      { label: 'Line 35', code: 'private final List<Student> students;   // 1..*: at least one', text: 'Upper bound `*`: a list. The lower bound `1` is a rule the constructor checks.' },
      { label: 'Line 38', code: 'if (teacher == null) throw new IllegalArgumentException("a classroom needs a teacher");', text: 'Keeps the lower bound of `1`: without a teacher, no classroom object is created at all.' },
      { label: 'Line 39', code: 'if (students.isEmpty()) throw new IllegalArgumentException("a classroom needs at least one student");', text: 'Keeps the lower bound of `1..*`. The last output line comes from here.' },
      { label: 'Line 42', code: 'this.students = new ArrayList<>(students);', text: 'Copies the list, so nobody outside can empty it later and break the `1..*` rule.' },
      { label: 'Line 48', code: 'String helperText = (helper == null) ? "no helper" : "helper " + helper.name();', text: 'Because of `0..1`, the code must handle "none". Without the `null` test, `helper.name()` would throw a `NullPointerException`.' },
      { label: 'Line 7', code: 'Classroom room = new Classroom("3B", kim, List.of(new Student("Ali"), new Student("Bo")));', text: 'The same teacher object `kim` is used again on line 12: one teacher, many classrooms, as the `*` at `Classroom` says.' }
    ],
    sections: [
      {
        title: 'Read the number at the far end',
        text: [
          'Every association line has two ends, and each end can carry a number. To read a rule, start at one class and read the number at the **other** class. That gives two sentences per line.',
          'A mother has many children, and each child has exactly one (birth) mother.'
        ],
        mermaid: `classDiagram
  direction LR
  Mother "1" -- "*" Child : children`,
        bullets: [
          'Start at `Mother`, read at `Child`: one mother has `*` (any number of) children.',
          'Start at `Child`, read at `Mother`: one child has exactly `1` mother.'
        ],
        warn: 'Wrong: putting the `*` next to `Mother` because "mothers have many". Right: the number stands next to the class it counts, so the star goes next to `Child`.'
      },
      {
        title: 'An exact number becomes an array',
        text: [
          'When the number is fixed, an array of that length fits well: its length never changes. A hand has exactly five fingers, and the hand creates them, so the line is also a composition.'
        ],
        mermaid: `classDiagram
  direction LR
  Hand "1" *-- "5" Finger : fingers`,
        fileName: 'HandDemo.java',
        code: `public class HandDemo {
    public static void main(String[] args) {
        Hand left = new Hand();
        System.out.println("Fingers: " + left.count());
        System.out.println("First: " + left.finger(0));
        System.out.println("Last: " + left.finger(4));
    }
}

class Finger {
    private final String name;
    Finger(String name) { this.name = name; }
    public String toString() { return name; }
}

class Hand {
    private final Finger[] fingers = new Finger[5];   // multiplicity 5

    Hand() {
        String[] names = { "thumb", "index", "middle", "ring", "little" };
        for (int i = 0; i < fingers.length; i++) {
            fingers[i] = new Finger(names[i]);
        }
    }

    int count() { return fingers.length; }
    Finger finger(int index) { return fingers[index]; }
}`,
        output: `Fingers: 5
First: thumb
Last: little`
      },
      {
        title: 'Navigability: who has the field?',
        text: [
          'An arrowhead means only the start class has a field. A line **without** arrowheads (or with both) means both classes know each other: both get a field. That is a **two-way** (bidirectional) association.',
          'Two-way links need care: when you connect one side, you must connect the other side too, or the objects disagree. Put both steps into one method, here `adopt`.'
        ],
        mermaid: `classDiagram
  direction LR
  class Owner {
    -String name
    -List~Pet~ pets
    ~adopt(Pet pet) void
  }
  class Pet {
    -String name
    -Owner owner
  }
  Owner "0..1" -- "*" Pet`,
        diagramNote: 'No arrowheads: `Owner` has a list of pets, and each `Pet` has a field `owner`. The `0..1` means a pet can be without an owner, for example in the shelter.',
        fileName: 'TwoWayDemo.java',
        code: `import java.util.ArrayList;
import java.util.List;

public class TwoWayDemo {
    public static void main(String[] args) {
        Owner mia = new Owner("Mia");
        Pet rex = new Pet("Rex");
        Pet luna = new Pet("Luna");
        System.out.println(rex.describe());
        mia.adopt(rex);
        mia.adopt(luna);
        System.out.println(rex.describe());
        System.out.println(mia.name() + " has " + mia.petCount() + " pets");
    }
}

class Owner {
    private final String name;
    private final List<Pet> pets = new ArrayList<>();   // * pets

    Owner(String name) { this.name = name; }

    void adopt(Pet pet) {
        pets.add(pet);
        pet.setOwner(this);   // keep both ends in sync
    }

    String name() { return name; }
    int petCount() { return pets.size(); }
}

class Pet {
    private final String name;
    private Owner owner;   // 0..1: null while in the shelter

    Pet(String name) { this.name = name; }
    void setOwner(Owner owner) { this.owner = owner; }

    String describe() {
        return name + (owner == null ? " waits in the shelter" : " lives with " + owner.name());
    }
}`,
        output: `Rex waits in the shelter
Rex lives with Mia
Mia has 2 pets`,
        tip: 'Prefer one-way arrows. Every two-way link is two fields to keep in sync. Draw both directions only when both classes really need to reach each other.'
      },
      {
        title: 'Many to many: add a class in the middle',
        text: [
          'A student takes many courses, and a course has many students: `*` on both ends. You can write a list on both sides, but often the link itself has data, such as the grade. Then you put a class **between** them. UML calls it an **association class**.',
          'Each `Enrollment` connects exactly one student with exactly one course and stores the grade. You meet the same idea in the library example later: a `Loan` sits between a member and a book and stores the due date.'
        ],
        mermaid: `classDiagram
  direction LR
  class Enrollment {
    -int grade
  }
  Student "1" <-- "*" Enrollment : student
  Enrollment "*" --> "1" Course : course`,
        diagramNote: 'Read it: one student has many enrollments, one enrollment belongs to exactly one student and one course.'
      }
    ],
    technical: [
      'The Java compiler checks types, not numbers. To `javac`, a field of type `Teacher` may hold an object or `null`, and a `List` may hold zero or a million elements. Every multiplicity rule is kept by your own code: `final` fields set in the constructor, `null` checks and exceptions.',
      'A missing check shows up at runtime. If the diagram says `1` but the code allows `null`, a later call such as `teacher.name()` throws a **NullPointerException**: the JVM tried to follow a reference that points to nothing. Checking in the constructor moves that error to the place where the wrong object is made, which is much easier to debug.',
      'For `0..1` you will later also meet `Optional<Teacher>`, a small box from the Java library that is either empty or holds one object. It makes "maybe none" visible in the type. A plain field that may be `null` is the simple version used here.'
    ],
    tryIt: {
      steps: [
        'In `ClassroomDemo.java`, add a `2..3` rule: a classroom has two to three windows (`List<String> windows`).',
        'Check the size in the constructor and throw `IllegalArgumentException("2 to 3 windows")` when it is wrong.',
        'Create one classroom with `List.of("left", "right")` and one with `List.of("left")` inside a `try`.',
        'Add the new line to the diagram text: `Classroom "1" *-- "2..3" Window`.'
      ],
      see: 'the first classroom is created, and the second prints `Error: 2 to 3 windows`.'
    },
    check: [
      { q: 'A line says `Person "1" --> "0..1" Passport`. Which field does `Person` get, and may it be `null`?', a: 'A single field `private Passport passport;`. Yes, `0..1` means it may be `null`.' },
      { q: 'What is the difference between `*` and `1..*` in the code?', a: 'Both are a `List`. With `1..*` you must also check that the list is not empty.' },
      { q: 'Where do you write the number that says "a teacher teaches many classrooms"?', a: 'Next to `Classroom`: the number stands next to the class it counts.' }
    ],
    keyPoints: [
      'Multiplicity says how many: `1`, `0..1`, `*`, `1..*`, or an exact number.',
      'Read the number at the far end of the line.',
      'Upper bound 1 → one field. Upper bound `*` → a list. Fixed number → maybe an array.',
      'Lower bound 1 → never `null` or empty: check it in the constructor.',
      'The role name becomes the field name, and the arrowhead says who has the field.'
    ],
    commonMistakes: [
      'Writing `private Student students;` for `1..*`. Fix: many objects need a collection, `List<Student>`.',
      'Using `helper.name()` for a `0..1` field without a `null` check. Fix: test `helper == null` first.',
      'Putting the number at the wrong end. Fix: write it next to the class it counts.',
      'Drawing a two-way line but updating only one side in code. Fix: change both fields in one method, such as `adopt`.'
    ],
    related: ['Class Relationships', 'Object Diagram', 'Collections', 'Exceptions'],
    glossary: U.glossary
  });
})();
