(function () {
  Java.addCoreTopic('classes-and-objects', {
    label: 'Objects',
    headline: 'Classes and objects,',
    accent: 'state with behavior.',
    intro: 'Move from loose variables to small models with fields, constructors, methods, and clear access.',
    overview: 'Learn object construction, this, access modifiers, static members, records, and beginner OOP vocabulary.',
    tryIt: {
      steps: [
        'Make a class `Pet` with fields `name` and `age` and a constructor.',
        'Add a method `describe()` that returns `name + " is " + age`.',
        'In `main`, make two pets with `new` and print `describe()` for both.'
      ],
      see: 'two different lines, one for each pet.'
    },
    check: [
      { q: 'What is the difference between a class and an object?', a: 'The class is the cookie cutter. Objects are the cookies you make with `new`.' },
      { q: 'What does `this.name = name;` do in a constructor?', a: 'It copies the parameter `name` into the object’s own field `name`.' },
      { q: 'Why are fields often `private`?', a: 'So only the class itself can change them. Others use its methods.' }
    ]
  }, [
    {
      id: 'class-fields-constructor',
      title: 'Fields and Constructors',
      category: 'concept',
      icon: 'C',
      tagline: 'Create objects with state',
      definition: 'A class defines a type. An object is one runtime instance of that class. Fields store object state, and constructors initialize it.',
      realWorld: 'A class is a blank form; each object is one completed form with its own values.',
      syntax: 'new Student("Ada", 92) calls the constructor and returns a reference to the new object.',
      fileName: 'StudentDemo.java',
      code: `public class StudentDemo {
    static class Student {
        private String name;
        private int grade;

        Student(String name, int grade) {
            this.name = name;
            this.grade = grade;
        }

        String report() {
            return name + " scored " + grade;
        }
    }

    public static void main(String[] args) {
        Student student = new Student("Ada", 92);
        System.out.println(student.report());
    }
}`,
      keyPoints: [
        'Each object gets its own copy of instance fields.',
        'this means the current object.',
        'private fields protect object state from random outside changes.'
      ],
      commonMistakes: [
        'Forgetting new when creating an object.',
        'Using public fields everywhere instead of methods.',
        'Confusing the class name with one object instance.'
      ],
      related: ['Methods', 'JVM & Memory']
    },
    {
      id: 'instance-static',
      title: 'Instance vs static',
      category: 'practice',
      icon: 'S',
      tagline: 'Know what belongs where',
      definition: 'Instance members belong to each object. static members belong to the class itself.',
      realWorld: 'Each library card has its own holder name, but the library name is shared by all cards.',
      syntax: 'Use object.method() for instance behavior. Use ClassName.method() for static utilities or shared class behavior.',
      fileName: 'InstanceStaticDemo.java',
      code: `public class InstanceStaticDemo {
    static class Counter {
        private static int created = 0;
        private int value = 0;

        Counter() {
            created++;
        }

        void increment() {
            value++;
        }

        int value() {
            return value;
        }

        static int createdCount() {
            return created;
        }
    }

    public static void main(String[] args) {
        Counter first = new Counter();
        Counter second = new Counter();
        first.increment();
        first.increment();
        second.increment();

        System.out.println(first.value());
        System.out.println(second.value());
        System.out.println(Counter.createdCount());
    }
}`,
      keyPoints: [
        'static fields are shared across the class.',
        'instance fields differ from object to object.',
        'main is static because the JVM calls it before creating your objects.'
      ],
      commonMistakes: [
        'Using static to avoid understanding objects.',
        'Reading a shared static field as if each object had its own copy.',
        'Calling instance fields from static main without an object.'
      ],
      related: ['Methods', 'JVM & Memory']
    },
    {
      id: 'records-and-modifiers',
      title: 'Records and Modifiers',
      category: 'habits',
      icon: 'R',
      tagline: 'Small immutable data carriers',
      definition: 'A record is a compact class for immutable data. Access modifiers such as public and private control visibility.',
      realWorld: 'A record is like a printed receipt: once created, it carries facts rather than changing over time.',
      syntax: 'record Point(int x, int y) creates a type with private final fields, a constructor, accessors, equals, hashCode, and toString.',
      fileName: 'RecordDemo.java',
      code: `public class RecordDemo {
    record Point(int x, int y) {
        int distanceFromOriginSquared() {
            return x * x + y * y;
        }
    }

    public static void main(String[] args) {
        Point point = new Point(3, 4);
        System.out.println(point);
        System.out.println(point.x());
        System.out.println(point.distanceFromOriginSquared());
    }
}`,
      keyPoints: [
        'Use records for simple immutable data.',
        'Use classes when objects need changing state or richer behavior.',
        'public, private, protected, and package-private define access.'
      ],
      commonMistakes: [
        'Trying to assign to a record component after construction.',
        'Making everything public because it feels convenient.',
        'Using inheritance before composition and simple classes are clear.'
      ],
      related: ['Collections', 'UML Diagrams']
    }
  ]);
})();
