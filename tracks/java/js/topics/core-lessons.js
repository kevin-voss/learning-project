(function () {
  Java.topicDetails = Java.topicDetails || {};

  const colors = {
    concept: { name: 'Concept', color: '#2dd4bf', bg: 'rgba(45, 212, 191, 0.1)', glow: 'rgba(45, 212, 191, 0.4)', desc: 'Understand the idea' },
    practice: { name: 'Practice', color: '#fbbf24', bg: 'rgba(251, 191, 36, 0.1)', glow: 'rgba(251, 191, 36, 0.4)', desc: 'Use it in code' },
    habits: { name: 'Habits', color: '#fb7185', bg: 'rgba(251, 113, 133, 0.1)', glow: 'rgba(251, 113, 133, 0.4)', desc: 'Avoid beginner traps' }
  };

  function addTopic(id, details, lessons) {
    Java.topicDetails[id] = details;
    Java.topics[id] = Java.topics[id] || {};
    Java.topics[id].categories = colors;
    Java.topics[id].lessons = lessons.map((lesson, index) => ({
      num: String(index + 1).padStart(2, '0'),
      glossary: Java.glossary,
      ...lesson
    }));
  }

  addTopic('methods', {
    badge: 'Topic 06 · Java 21 LTS',
    label: 'Methods',
    headline: 'Methods,',
    accent: 'reusable steps.',
    intro: 'Break beginner programs into named actions with inputs, outputs, and small responsibilities.',
    overview: 'Start with parameters and return values, then learn overloading and simple method boundaries.'
  }, [
    {
      id: 'parameters-return',
      title: 'Parameters and Return Values',
      category: 'concept',
      icon: 'fn',
      tagline: 'Inputs in, result out',
      definition: 'A method is a named block of code. Parameters receive inputs, and return sends one result back to the caller.',
      realWorld: 'A method is like a kitchen station: give it ingredients, it does one job, and it hands back the finished item.',
      syntax: 'static int add(int a, int b) declares a method named add that receives two int values and returns an int.',
      fileName: 'MethodBasics.java',
      code: `public class MethodBasics {
    static int add(int a, int b) {
        return a + b;
    }

    static String labelScore(String name, int score) {
        return name + ": " + score;
    }

    public static void main(String[] args) {
        int total = add(7, 5);
        System.out.println(labelScore("Ada", total));
    }
}`,
      keyPoints: [
        'A method name should describe one action.',
        'Parameters are local variables created for a method call.',
        'return ends the method and sends a value back.',
        'void means the method returns no value.'
      ],
      commonMistakes: [
        'Forgetting to return a value from a non-void method.',
        'Doing too many unrelated things in one method.',
        'Confusing parameters with arguments passed at the call site.'
      ],
      related: ['Control Flow', 'Types & Variables']
    },
    {
      id: 'void-and-static',
      title: 'void and static',
      category: 'practice',
      icon: '()',
      tagline: 'Use helper methods from main',
      definition: 'A void method performs an action without returning a value. A static method belongs to the class, which is why main can call it directly.',
      realWorld: 'A void method is like pressing a printer button: it does work, but it does not hand you a calculation result.',
      syntax: 'Use static helper methods while learning single-file programs. Instance methods make more sense once objects enter the path.',
      fileName: 'VoidHelpers.java',
      code: `public class VoidHelpers {
    static void printHeader(String title) {
        System.out.println("== " + title + " ==");
    }

    static void printLine(String label, int value) {
        System.out.println(label + ": " + value);
    }

    public static void main(String[] args) {
        printHeader("Cart");
        printLine("Items", 3);
        printLine("Total cents", 1299);
    }
}`,
      keyPoints: [
        'void methods are useful for printing, saving, or changing state.',
        'static helpers are fine for early command-line programs.',
        'Keep helpers near the code that uses them in beginner files.'
      ],
      commonMistakes: [
        'Trying to store the result of a void method.',
        'Marking everything static forever instead of learning objects next.',
        'Printing inside every method when returning a value would be easier to test.'
      ],
      related: ['Classes & Objects', 'Testing']
    },
    {
      id: 'overloading',
      title: 'Overloading',
      category: 'habits',
      icon: '+',
      tagline: 'Same name, different parameters',
      definition: 'Method overloading means multiple methods share a name but have different parameter lists.',
      realWorld: 'A search box can search by title, by title and year, or by title and author. The action name stays familiar.',
      syntax: 'Java chooses an overload at compile time based on argument count and types.',
      fileName: 'OverloadingDemo.java',
      code: `public class OverloadingDemo {
    static String badge(String name) {
        return badge(name, "beginner");
    }

    static String badge(String name, String level) {
        return name + " [" + level + "]";
    }

    static int area(int side) {
        return side * side;
    }

    static int area(int width, int height) {
        return width * height;
    }

    public static void main(String[] args) {
        System.out.println(badge("Mina"));
        System.out.println(badge("Kai", "practice"));
        System.out.println(area(4));
        System.out.println(area(4, 7));
    }
}`,
      keyPoints: [
        'Overloads must differ by parameter list.',
        'Return type alone is not enough to overload.',
        'Use overloading when the methods really mean the same action.'
      ],
      commonMistakes: [
        'Creating confusing overloads that do unrelated work.',
        'Expecting Java to overload only by return type.',
        'Making overloads ambiguous with null or similar numeric types.'
      ],
      related: ['Classes & Objects', 'Testing']
    }
  ]);

  addTopic('classes-and-objects', {
    badge: 'Topic 07 · Java 21 LTS',
    label: 'Objects',
    headline: 'Classes and objects,',
    accent: 'state with behavior.',
    intro: 'Move from loose variables to small models with fields, constructors, methods, and clear access.',
    overview: 'Learn object construction, this, access modifiers, static members, records, and beginner OOP vocabulary.'
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

  addTopic('arrays', {
    badge: 'Topic 08 · Java 21 LTS',
    label: 'Arrays',
    headline: 'Arrays,',
    accent: 'fixed-size lists.',
    intro: 'Store multiple values of one type, loop over them safely, and learn the index habits that collections build on.',
    overview: 'Arrays come before collections because they make indexes, length, and enhanced for loops concrete.'
  }, [
    {
      id: 'create-index',
      title: 'Create and Index',
      category: 'concept',
      icon: '[]',
      tagline: 'Positions start at zero',
      definition: 'An array stores a fixed number of values of one type. Each value is accessed by a zero-based index.',
      realWorld: 'An array is like numbered lockers, except the first locker is number 0.',
      syntax: 'int[] scores = {90, 82, 100}; creates an int array with three elements.',
      fileName: 'ArrayBasics.java',
      code: `public class ArrayBasics {
    public static void main(String[] args) {
        int[] scores = {90, 82, 100};
        scores[1] = 88;

        System.out.println(scores[0]);
        System.out.println(scores[1]);
        System.out.println(scores.length);
    }
}`,
      keyPoints: [
        'Array indexes start at 0.',
        'length is a field, not a method.',
        'Array size does not change after creation.'
      ],
      commonMistakes: [
        'Accessing scores[3] in a three-element array.',
        'Writing scores.length() like a String method.',
        'Choosing arrays when the size needs to grow often.'
      ],
      related: ['Control Flow', 'Collections']
    },
    {
      id: 'loops',
      title: 'Looping Arrays',
      category: 'practice',
      icon: 'for',
      tagline: 'Visit each element',
      definition: 'Use a counted for loop when you need indexes. Use enhanced for when you only need values.',
      realWorld: 'A counted loop checks locker numbers; enhanced for simply visits every locker in order.',
      syntax: 'for (int score : scores) reads each score without exposing the index.',
      fileName: 'ArrayLoops.java',
      code: `public class ArrayLoops {
    public static void main(String[] args) {
        String[] names = {"Ada", "Mina", "Kai"};

        for (int i = 0; i < names.length; i++) {
            System.out.println(i + ": " + names[i]);
        }

        for (String name : names) {
            System.out.println("Hello, " + name);
        }
    }
}`,
      keyPoints: [
        'Use i < array.length, not i <= array.length.',
        'Enhanced for is cleaner when no index is needed.',
        'Arrays work with primitive and reference types.'
      ],
      commonMistakes: [
        'Off-by-one loop conditions.',
        'Changing array size inside the loop; arrays cannot resize.',
        'Losing the index when you actually need it.'
      ],
      related: ['Control Flow', 'Strings & Text']
    },
    {
      id: 'two-dimensional',
      title: 'Two-Dimensional Arrays',
      category: 'habits',
      icon: 'grid',
      tagline: 'Rows and columns',
      definition: 'A two-dimensional array is an array of arrays, commonly used for grids.',
      realWorld: 'Think of a spreadsheet: row first, then column.',
      syntax: 'grid[row][col] reads one cell from a two-dimensional array.',
      fileName: 'GridDemo.java',
      code: `public class GridDemo {
    public static void main(String[] args) {
        int[][] grid = {
            {1, 2, 3},
            {4, 5, 6}
        };

        for (int row = 0; row < grid.length; row++) {
            for (int col = 0; col < grid[row].length; col++) {
                System.out.print(grid[row][col] + " ");
            }
            System.out.println();
        }
    }
}`,
      keyPoints: [
        'grid.length is the number of rows.',
        'grid[row].length is the number of columns in that row.',
        'Nested loops are normal for grids.'
      ],
      commonMistakes: [
        'Swapping row and column order.',
        'Assuming every row always has the same length.',
        'Using a grid when a list of objects would model the problem better.'
      ],
      related: ['Collections', 'Practice Projects']
    }
  ]);

  addTopic('strings', {
    badge: 'Topic 09 · Java 21 LTS',
    label: 'Text',
    headline: 'Strings,',
    accent: 'text with rules.',
    intro: 'Compare text correctly, call common methods, and build larger text without fighting immutability.',
    overview: 'String is a reference type, but it is so common that beginners should learn its special habits early.'
  }, [
    {
      id: 'equality',
      title: 'String Equality',
      category: 'concept',
      icon: '==',
      tagline: 'Use equals for text',
      definition: 'String values are objects. Use equals to compare text contents instead of ==.',
      realWorld: 'Two printed tickets can contain the same name even if they are two separate pieces of paper.',
      syntax: 'name.equals("Ada") checks text content. "Ada".equals(name) avoids a null crash.',
      fileName: 'StringEquality.java',
      code: `public class StringEquality {
    public static void main(String[] args) {
        String first = "Ada";
        String second = new String("Ada");

        System.out.println(first == second);
        System.out.println(first.equals(second));
        System.out.println("Ada".equals(first));
    }
}`,
      keyPoints: [
        'equals checks text content.',
        '== checks whether two references point to the same object.',
        'String literals may be pooled, which makes == especially misleading.'
      ],
      commonMistakes: [
        'Using == for user input text.',
        'Calling name.equals("Ada") when name might be null.',
        'Forgetting strings are immutable.'
      ],
      related: ['Types & Variables', 'Classes & Objects']
    },
    {
      id: 'common-methods',
      title: 'Common String Methods',
      category: 'practice',
      icon: 'abc',
      tagline: 'Ask useful text questions',
      definition: 'String methods return information or new strings. They do not change the original string.',
      realWorld: 'A photocopier can make a marked-up copy, but the original document stays the same.',
      syntax: 'trim, toLowerCase, contains, startsWith, substring, and split are common beginner tools.',
      fileName: 'StringMethods.java',
      code: `public class StringMethods {
    public static void main(String[] args) {
        String raw = "  Java Basics  ";
        String cleaned = raw.trim().toLowerCase();

        System.out.println(cleaned);
        System.out.println(cleaned.contains("java"));
        System.out.println(cleaned.substring(0, 4));
        System.out.println(raw);
    }
}`,
      keyPoints: [
        'Most String methods return a new value.',
        'Store the result if you want to use the changed text.',
        'Indexes in substring are zero-based.'
      ],
      commonMistakes: [
        'Calling raw.trim() without saving or using the result.',
        'Using substring indexes outside the string length.',
        'Ignoring case differences in comparisons.'
      ],
      related: ['Arrays', 'I/O Basics']
    },
    {
      id: 'builder-format',
      title: 'StringBuilder and Formatting',
      category: 'habits',
      icon: 'fmt',
      tagline: 'Build readable output',
      definition: 'StringBuilder is useful when building text in steps. formatted and printf help place values into templates.',
      realWorld: 'StringBuilder is a notepad you keep editing before reading the final text.',
      syntax: 'Use builder.append(value) repeatedly, then builder.toString() when finished.',
      fileName: 'StringBuilderDemo.java',
      code: `public class StringBuilderDemo {
    public static void main(String[] args) {
        StringBuilder builder = new StringBuilder();
        builder.append("Items");
        builder.append(": ");
        builder.append(3);

        String message = "%s costs $%.2f".formatted("Notebook", 4.5);
        System.out.println(builder.toString());
        System.out.println(message);
    }
}`,
      keyPoints: [
        'StringBuilder avoids creating many intermediate strings in loops.',
        'formatted returns a string.',
        'printf prints formatted output directly.'
      ],
      commonMistakes: [
        'Using StringBuilder for tiny one-line concatenation where + is clearer.',
        'Forgetting to call toString when a String is required.',
        'Using the wrong format specifier.'
      ],
      related: ['I/O Basics', 'Practice Projects']
    }
  ]);

  addTopic('collections', {
    badge: 'Topic 10 · Java 21 LTS',
    label: 'Collections',
    headline: 'Collections,',
    accent: 'flexible groups.',
    intro: 'Use Java collection types for groups that grow, remove duplicates, and map keys to values.',
    overview: 'Collections are essential for real Java programs and prepare you for REST data, tests, and projects.'
  }, [
    {
      id: 'lists',
      title: 'ArrayList',
      category: 'concept',
      icon: 'List',
      tagline: 'A growable ordered list',
      definition: 'ArrayList is a resizable ordered collection. It uses generics to say what type it stores.',
      realWorld: 'A shopping list can grow, shrink, and keep items in order.',
      syntax: 'ArrayList<String> names = new ArrayList<>(); stores String values only.',
      fileName: 'ListDemo.java',
      code: `import java.util.ArrayList;

public class ListDemo {
    public static void main(String[] args) {
        ArrayList<String> names = new ArrayList<>();
        names.add("Ada");
        names.add("Mina");
        names.add("Kai");
        names.remove("Mina");

        for (String name : names) {
            System.out.println(name);
        }
    }
}`,
      keyPoints: [
        'ArrayList keeps insertion order.',
        'Use size(), not length.',
        'Generics catch wrong element types at compile time.'
      ],
      commonMistakes: [
        'Using length instead of size().',
        'Forgetting import java.util.ArrayList.',
        'Using raw ArrayList without a type.'
      ],
      related: ['Arrays', 'Classes & Objects']
    },
    {
      id: 'sets',
      title: 'HashSet',
      category: 'practice',
      icon: 'Set',
      tagline: 'Unique values',
      definition: 'HashSet stores unique values and does not promise insertion order.',
      realWorld: 'A guest list should contain each person once, even if their name is added twice.',
      syntax: 'Set<String> tags = new HashSet<>(); is the common interface-plus-implementation style.',
      fileName: 'SetDemo.java',
      code: `import java.util.HashSet;
import java.util.Set;

public class SetDemo {
    public static void main(String[] args) {
        Set<String> tags = new HashSet<>();
        tags.add("java");
        tags.add("ubuntu");
        tags.add("java");

        System.out.println(tags.size());
        System.out.println(tags.contains("ubuntu"));
    }
}`,
      keyPoints: [
        'Sets remove duplicates.',
        'contains is fast for HashSet.',
        'Use Set as the variable type when you only need set behavior.'
      ],
      commonMistakes: [
        'Expecting HashSet to print in insertion order.',
        'Using a List and manually checking duplicates when a Set fits.',
        'Mutating objects in ways that break hash-based lookup.'
      ],
      related: ['Strings & Text', 'Testing']
    },
    {
      id: 'maps',
      title: 'HashMap',
      category: 'habits',
      icon: 'Map',
      tagline: 'Look up values by key',
      definition: 'HashMap stores key/value pairs. Each key maps to one current value.',
      realWorld: 'A phone book maps a person name to a phone number.',
      syntax: 'Map<String, Integer> scores = new HashMap<>(); maps names to scores.',
      fileName: 'MapDemo.java',
      code: `import java.util.HashMap;
import java.util.Map;

public class MapDemo {
    public static void main(String[] args) {
        Map<String, Integer> scores = new HashMap<>();
        scores.put("Ada", 92);
        scores.put("Kai", 87);
        scores.put("Ada", 95);

        System.out.println(scores.get("Ada"));
        System.out.println(scores.getOrDefault("Mina", 0));
    }
}`,
      keyPoints: [
        'put replaces the old value for the same key.',
        'get can return null when the key is missing.',
        'getOrDefault is friendly for beginner counters and lookups.'
      ],
      commonMistakes: [
        'Assuming one key can hold multiple values without using a list.',
        'Forgetting that missing keys return null.',
        'Using a map when a small class would describe the data better.'
      ],
      related: ['Exceptions', 'REST & HTTP']
    }
  ]);

  addTopic('exceptions', {
    badge: 'Topic 11 · Java 21 LTS',
    label: 'Exceptions',
    headline: 'Exceptions,',
    accent: 'visible failure.',
    intro: 'Keep failures explicit with try/catch, throw, checked exceptions, and clear boundaries.',
    overview: 'Exception handling prepares you for files, parsing, tests, and command-line projects.'
  }, [
    {
      id: 'try-catch',
      title: 'try and catch',
      category: 'concept',
      icon: 'try',
      tagline: 'Handle risky code',
      definition: 'An exception interrupts normal flow. try marks risky code, and catch handles a specific failure type.',
      realWorld: 'A try block is like carrying a tray carefully; catch is the cleanup plan if something spills.',
      syntax: 'catch (NumberFormatException ex) handles only that exception type.',
      fileName: 'TryCatchDemo.java',
      code: `public class TryCatchDemo {
    static int parsePort(String value) {
        try {
            return Integer.parseInt(value);
        } catch (NumberFormatException ex) {
            return 8080;
        }
    }

    public static void main(String[] args) {
        System.out.println(parsePort("3000"));
        System.out.println(parsePort("oops"));
    }
}`,
      keyPoints: [
        'Catch the most specific exception you can handle.',
        'Do not hide failures silently.',
        'Fallback values should be intentional and visible.'
      ],
      commonMistakes: [
        'Catching Exception everywhere.',
        'Leaving catch blocks empty.',
        'Using exceptions for normal if/else decisions.'
      ],
      related: ['I/O Basics', 'Debugging']
    },
    {
      id: 'throw',
      title: 'throw',
      category: 'practice',
      icon: '!',
      tagline: 'Reject invalid input',
      definition: 'throw creates and raises an exception when a method cannot continue correctly.',
      realWorld: 'A ticket machine rejects a negative payment instead of pretending the ticket was purchased.',
      syntax: 'throw new IllegalArgumentException("message") is common for invalid method arguments.',
      fileName: 'ThrowDemo.java',
      code: `public class ThrowDemo {
    static int centsFromDollars(int dollars) {
        if (dollars < 0) {
            throw new IllegalArgumentException("dollars must be positive");
        }
        return dollars * 100;
    }

    public static void main(String[] args) {
        System.out.println(centsFromDollars(5));
    }
}`,
      keyPoints: [
        'Validate method inputs near the boundary.',
        'IllegalArgumentException is unchecked.',
        'Exception messages should help the next reader.'
      ],
      commonMistakes: [
        'Returning magic values like -1 for every failure.',
        'Throwing vague RuntimeException messages.',
        'Failing late after bad state spreads.'
      ],
      related: ['Testing', 'Methods']
    },
    {
      id: 'checked-and-finally',
      title: 'Checked Exceptions and finally',
      category: 'habits',
      icon: 'file',
      tagline: 'Some failures must be declared',
      definition: 'Checked exceptions must be caught or declared. finally runs cleanup after try/catch.',
      realWorld: 'Borrowing a library book has a checkout record; Java makes some risky operations part of the method contract.',
      syntax: 'throws Exception declares that main may pass a checked exception to the JVM.',
      fileName: 'CheckedDemo.java',
      code: `public class CheckedDemo {
    static void pauseBriefly() throws InterruptedException {
        Thread.sleep(10);
    }

    public static void main(String[] args) throws InterruptedException {
        try {
            pauseBriefly();
            System.out.println("done");
        } finally {
            System.out.println("cleanup always runs");
        }
    }
}`,
      keyPoints: [
        'Checked exceptions are part of a method signature.',
        'finally is for cleanup that must run.',
        'try-with-resources is usually better for files and streams.'
      ],
      commonMistakes: [
        'Adding throws everywhere without understanding the failure.',
        'Putting return statements in finally.',
        'Using finally instead of try-with-resources for closeable resources.'
      ],
      related: ['I/O Basics', 'Testing']
    }
  ]);

  addTopic('io-basics', {
    badge: 'Topic 12 · Java 21 LTS',
    label: 'I/O',
    headline: 'I/O basics,',
    accent: 'terminal and files.',
    intro: 'Read from the Ubuntu terminal, write text files, and use standard JDK APIs without extra libraries.',
    overview: 'All commands stay Ubuntu-only and every Java example uses Java 21 standard library APIs.'
  }, [
    {
      id: 'scanner',
      title: 'Terminal Input',
      category: 'concept',
      icon: 'in',
      tagline: 'Read from System.in',
      definition: 'Scanner can read beginner-friendly input from the terminal through System.in.',
      realWorld: 'Scanner is a small clerk asking the terminal for the next typed answer.',
      syntax: 'new Scanner(System.in) reads from standard input. Close it at the end of a small program.',
      fileName: 'ScannerDemo.java',
      code: `import java.util.Scanner;

public class ScannerDemo {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Name: ");
        String name = scanner.nextLine();
        System.out.println("Hello, " + name);
        scanner.close();
    }
}`,
      keyPoints: [
        'System.in is terminal input.',
        'System.out is terminal output.',
        'Scanner is fine for beginner command-line programs.'
      ],
      commonMistakes: [
        'Mixing nextInt and nextLine without handling the leftover newline.',
        'Expecting input examples to run inside this static browser hub.',
        'Forgetting imports.'
      ],
      related: ['Strings & Text', 'Practice Projects']
    },
    {
      id: 'read-file',
      title: 'Read a Text File',
      category: 'practice',
      icon: 'read',
      tagline: 'Path and Files',
      definition: 'Path represents a filesystem path. Files provides convenient methods for reading and writing files.',
      realWorld: 'Path is the address on disk; Files is the postal worker that reads or writes there.',
      syntax: 'Files.readString(Path.of("notes.txt")) reads a whole small text file.',
      fileName: 'ReadFileDemo.java',
      code: `import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

public class ReadFileDemo {
    public static void main(String[] args) throws IOException {
        Path path = Path.of("notes.txt");
        Files.writeString(path, "first note\\nsecond note\\n");

        String text = Files.readString(path);
        System.out.println(text);
    }
}`,
      keyPoints: [
        'Use java.nio.file.Path and Files for modern file work.',
        'File operations can throw IOException.',
        'Relative paths start from the folder where you run java.'
      ],
      commonMistakes: [
        'Running java from a different folder than expected.',
        'Ignoring IOException.',
        'Using old File APIs before learning Path and Files.'
      ],
      related: ['Exceptions', 'Ubuntu terminal']
    },
    {
      id: 'write-lines',
      title: 'Write Lines',
      category: 'habits',
      icon: 'out',
      tagline: 'Save program output',
      definition: 'Files.write writes a collection of lines. It is useful for small reports and practice projects.',
      realWorld: 'Your program can keep a notebook file instead of only speaking to the terminal.',
      syntax: 'Files.write(path, lines) writes text lines using the platform default options for simple beginner use.',
      fileName: 'WriteLinesDemo.java',
      code: `import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

public class WriteLinesDemo {
    public static void main(String[] args) throws IOException {
        List<String> lines = List.of("Ada,92", "Kai,87", "Mina,95");
        Path path = Path.of("scores.csv");
        Files.write(path, lines);

        for (String line : Files.readAllLines(path)) {
            System.out.println(line);
        }
    }
}`,
      keyPoints: [
        'Small files are fine with readString, readAllLines, writeString, and write.',
        'For large files, learn streams later.',
        'CSV is just text with a convention.'
      ],
      commonMistakes: [
        'Writing files into a folder without permission.',
        'Using absolute paths that only work on one machine.',
        'Forgetting that real projects need error messages for users.'
      ],
      related: ['Collections', 'Practice Projects']
    }
  ]);

  addTopic('debugging', {
    badge: 'Topic 13 · Ubuntu workflow',
    label: 'Debugging',
    headline: 'Debugging,',
    accent: 'small calm steps.',
    intro: 'Learn how to read compiler messages, inspect values, and use Ubuntu terminal tools to narrow problems.',
    overview: 'Debugging is a workflow topic: some examples are Java code, and command examples are marked as Bash.'
  }, [
    {
      id: 'compiler-errors',
      title: 'Read Compiler Errors',
      category: 'concept',
      icon: 'javac',
      tagline: 'Start at the first error',
      definition: 'javac reports file names, line numbers, and messages. Fix the first clear error before chasing later ones.',
      realWorld: 'One missing semicolon can make the rest of a page look wrong; repair the first broken brick first.',
      syntax: 'On Ubuntu, run javac FileName.java from the folder containing the source file.',
      codeLanguage: 'bash',
      fileName: 'debug-compile.sh',
      code: `javac BrokenExample.java
javac -Xlint:all BrokenExample.java
java BrokenExample`,
      keyPoints: [
        'Read the file name and line number.',
        'Fix one issue, compile again, then continue.',
        '-Xlint:all shows helpful warnings.'
      ],
      commonMistakes: [
        'Starting with the last compiler message.',
        'Changing many things before recompiling.',
        'Running java when javac did not succeed.'
      ],
      related: ['Syntax Fundamentals', 'Getting Started on Ubuntu']
    },
    {
      id: 'print-debugging',
      title: 'Print Debugging',
      category: 'practice',
      icon: 'log',
      tagline: 'Inspect values simply',
      definition: 'Temporary print statements help beginners inspect values and control flow before learning a full debugger.',
      realWorld: 'It is like placing sticky notes along a route to see where the program actually traveled.',
      syntax: 'Print labels with values so the output is easy to read.',
      fileName: 'PrintDebugDemo.java',
      code: `public class PrintDebugDemo {
    static int discount(int cents, boolean member) {
        System.out.println("before discount: " + cents);
        if (member) {
            cents = cents - 100;
            System.out.println("member discount applied");
        }
        System.out.println("after discount: " + cents);
        return cents;
    }

    public static void main(String[] args) {
        System.out.println(discount(1299, true));
    }
}`,
      keyPoints: [
        'Label your debug output.',
        'Remove noisy debug prints after the bug is understood.',
        'Prefer tests for behavior you want to keep checking.'
      ],
      commonMistakes: [
        'Leaving unclear print statements in final code.',
        'Printing too much at once.',
        'Using prints instead of understanding the failing input.'
      ],
      related: ['Testing', 'Methods']
    },
    {
      id: 'jshell',
      title: 'jshell Experiments',
      category: 'habits',
      icon: 'jshell',
      tagline: 'Try tiny ideas fast',
      definition: 'jshell is the Java REPL included with the JDK. It lets you try snippets in an Ubuntu terminal.',
      realWorld: 'jshell is scratch paper for Java expressions.',
      syntax: 'Run jshell, type Java expressions, then type /exit when done.',
      codeLanguage: 'bash',
      fileName: 'jshell-session.sh',
      code: `jshell
jshell> int total = 7 + 5
jshell> "Java".toLowerCase()
jshell> /exit`,
      keyPoints: [
        'jshell is installed with the JDK.',
        'It is useful for expressions and API experiments.',
        'Full programs still belong in .java files.'
      ],
      commonMistakes: [
        'Thinking jshell replaces compiling real source files.',
        'Pasting shell prompts into Java files.',
        'Forgetting /exit.'
      ],
      related: ['Strings & Text', 'JVM & Memory']
    }
  ]);

  addTopic('testing', {
    badge: 'Topic 14 · Java 21 LTS',
    label: 'Testing',
    headline: 'Testing,',
    accent: 'repeatable confidence.',
    intro: 'Start with tiny self-checks, then learn how JUnit fits once build tools enter the course.',
    overview: 'The first Java examples compile with plain javac so beginners can practice before Maven or Gradle.'
  }, [
    {
      id: 'self-checks',
      title: 'Self-Checks',
      category: 'concept',
      icon: 'ok',
      tagline: 'Compare expected and actual',
      definition: 'A test checks whether actual behavior matches expected behavior. Beginners can start with tiny helper methods.',
      realWorld: 'A test is a checklist item the program can check for you every time.',
      syntax: 'Throw AssertionError when a check fails so the command exits loudly.',
      fileName: 'SelfCheckDemo.java',
      code: `public class SelfCheckDemo {
    static int add(int a, int b) {
        return a + b;
    }

    static void checkEquals(int expected, int actual) {
        if (expected != actual) {
            throw new AssertionError("expected " + expected + " but got " + actual);
        }
    }

    public static void main(String[] args) {
        checkEquals(5, add(2, 3));
        checkEquals(0, add(-2, 2));
        System.out.println("All checks passed");
    }
}`,
      keyPoints: [
        'Tests need expected and actual values.',
        'Fail loudly when behavior is wrong.',
        'Keep business logic separate from printing so it is easy to test.'
      ],
      commonMistakes: [
        'Only testing the happy path.',
        'Testing print output when a return value would be simpler.',
        'Ignoring a failing check.'
      ],
      related: ['Methods', 'Debugging']
    },
    {
      id: 'assert-keyword',
      title: 'assert Keyword',
      category: 'practice',
      icon: 'assert',
      tagline: 'Development checks',
      definition: 'assert is a Java keyword for development checks. Assertions run only when enabled with -ea.',
      realWorld: 'Assertions are like temporary guard rails during practice runs.',
      syntax: 'Run java -ea AssertDemo to enable assertions.',
      fileName: 'AssertDemo.java',
      code: `public class AssertDemo {
    static int divideEvenly(int total, int parts) {
        assert parts > 0 : "parts must be positive";
        return total / parts;
    }

    public static void main(String[] args) {
        System.out.println(divideEvenly(12, 3));
    }
}`,
      keyPoints: [
        'Assertions are disabled by default.',
        'Use assertions for developer assumptions, not user input validation.',
        'Use exceptions for real runtime validation.'
      ],
      commonMistakes: [
        'Expecting assert to run without -ea.',
        'Using assert for required production checks.',
        'Confusing assertions with JUnit tests.'
      ],
      related: ['Exceptions', 'Build Tools']
    },
    {
      id: 'junit-role',
      title: 'JUnit Role',
      category: 'habits',
      icon: 'JUnit',
      tagline: 'Where build tools help',
      definition: 'JUnit is the common Java testing framework. Maven and Gradle download it and run repeatable test tasks.',
      realWorld: 'JUnit is a proper test bench; Maven or Gradle brings the bench into your workshop and runs it consistently.',
      syntax: 'With Maven, tests usually live under src/test/java and run with mvn test.',
      codeLanguage: 'bash',
      fileName: 'junit-ubuntu.sh',
      code: `sudo apt install maven
mvn test

sudo apt install gradle
gradle test`,
      keyPoints: [
        'Plain javac is enough to learn logic.',
        'JUnit becomes useful when projects have many files.',
        'Build tools make tests repeatable for teammates.'
      ],
      commonMistakes: [
        'Adding JUnit before understanding what behavior to check.',
        'Mixing source files and test files in one folder forever.',
        'Skipping tests after code changes.'
      ],
      related: ['Maven & Gradle Basics', 'Practice Projects']
    },
    {
      id: 'recursion-self-checks',
      title: 'Recursion Self-Checks',
      category: 'practice',
      icon: 'rec',
      tagline: 'Test the base case first',
      definition: 'Recursion is when a method solves a problem by calling itself with a smaller input until it reaches a base case.',
      realWorld: 'It is like opening nested folders: handle the current folder, then use the same rule for the next smaller folder.',
      why: 'Recursion is useful for problems that naturally shrink, such as counting down, walking trees, or splitting a problem into smaller copies.',
      howThink: 'Every recursive method needs a stop rule and a smaller next call. Tests should prove both pieces work.',
      whenUse: 'Beginners use recursion as a thinking exercise first, then later for trees, search, parsing, and divide-and-conquer algorithms.',
      syntax: 'Write plain self-checks before adding JUnit: checkEquals(120, factorial(5)); checkEquals(0, sumTo(0));',
      fileName: 'RecursionPracticeTests.java',
      code: `public class RecursionPracticeTests {
    static int factorial(int n) {
        if (n < 0) {
            throw new IllegalArgumentException("n must be non-negative");
        }
        if (n == 0) {
            return 1;
        }
        return n * factorial(n - 1);
    }

    static int sumTo(int n) {
        if (n <= 0) {
            return 0;
        }
        return n + sumTo(n - 1);
    }

    static void checkEquals(int expected, int actual) {
        if (expected != actual) {
            throw new AssertionError("expected " + expected + " but got " + actual);
        }
    }

    public static void main(String[] args) {
        checkEquals(1, factorial(0));
        checkEquals(1, factorial(1));
        checkEquals(120, factorial(5));
        checkEquals(0, sumTo(0));
        checkEquals(15, sumTo(5));
        System.out.println("Recursion checks passed");
    }
}`,
      commands: [
        {
          label: 'Compile recursion checks',
          note: 'Save the file, then compile it from the same Ubuntu folder.',
          command: 'javac RecursionPracticeTests.java'
        },
        {
          label: 'Run recursion checks',
          note: 'A failed check throws AssertionError so the problem is loud.',
          command: 'java RecursionPracticeTests'
        }
      ],
      practicePrompts: [
        {
          title: 'Base case check',
          level: 'Starter',
          goal: 'Write tests for the smallest input before testing the repeating case.',
          checks: ['factorial(0) returns 1.', 'sumTo(0) returns 0.', 'sumTo(-3) returns 0 or throws, depending on your chosen rule.'],
          stretch: 'Explain in a comment why your base case stops the recursion.'
        },
        {
          title: 'Recursive step check',
          level: 'Core',
          goal: 'Test an input that requires several recursive calls.',
          checks: ['factorial(5) returns 120.', 'sumTo(5) returns 15.', 'The method calls itself with a smaller number.'],
          stretch: 'Add a temporary print line to watch the method count down, then remove it.'
        },
        {
          title: 'Failure check',
          level: 'Habit',
          goal: 'Decide how invalid input should behave and write a check for that decision.',
          checks: ['Negative factorial input is rejected.', 'The error message helps the beginner understand what went wrong.'],
          stretch: 'Create checkThrows for IllegalArgumentException after checkEquals feels comfortable.'
        }
      ],
      keyPoints: [
        'The base case is the stop sign.',
        'The recursive call must move toward the base case.',
        'Test tiny inputs before bigger ones.',
        'A stack overflow usually means the stop rule was missing or unreachable.'
      ],
      commonMistakes: [
        'Testing only factorial(5) and missing factorial(0).',
        'Calling the same input again, which never gets smaller.',
        'Using recursion where a simple loop would be clearer for beginner code.'
      ],
      related: ['Methods', 'JVM & Memory']
    }
  ]);

  addTopic('build-tools', {
    badge: 'Topic 15 · Ubuntu builds',
    label: 'Build Tools',
    headline: 'Maven and Gradle,',
    accent: 'repeatable builds.',
    intro: 'Learn what build tools do, what commands students run on Ubuntu, and when plain javac is still enough.',
    overview: 'This is a beginner orientation, not a deep dependency-management course.'
  }, [
    {
      id: 'maven-basics',
      title: 'Maven Basics',
      category: 'concept',
      icon: 'mvn',
      tagline: 'Conventions first',
      definition: 'Maven is a Java build tool with a standard project layout and lifecycle commands.',
      realWorld: 'Maven is a checklist that knows the normal order: compile, test, package.',
      syntax: 'On Ubuntu, install Maven with apt and run mvn test from a Maven project folder.',
      codeLanguage: 'bash',
      fileName: 'maven-basics.sh',
      code: `sudo apt update
sudo apt install maven
mvn --version
mvn test
mvn package`,
      keyPoints: [
        'Maven projects usually use src/main/java and src/test/java.',
        'pom.xml describes the project.',
        'mvn test compiles and runs tests.'
      ],
      commonMistakes: [
        'Running mvn from the wrong folder.',
        'Editing generated target files.',
        'Adding dependencies before understanding the standard library option.'
      ],
      related: ['Testing', 'Practice Projects']
    },
    {
      id: 'gradle-basics',
      title: 'Gradle Basics',
      category: 'practice',
      icon: 'gradle',
      tagline: 'Tasks and wrappers',
      definition: 'Gradle is a flexible build tool that runs tasks such as build and test. Many projects use the Gradle wrapper.',
      realWorld: 'Gradle is a task runner with a Java build brain.',
      syntax: 'Use ./gradlew test when a project includes the wrapper. Use gradle test only when relying on the system install.',
      codeLanguage: 'bash',
      fileName: 'gradle-basics.sh',
      code: `sudo apt update
sudo apt install gradle
gradle --version
gradle test
gradle build`,
      keyPoints: [
        'Gradle tasks are named actions.',
        'The wrapper makes builds more consistent between machines.',
        'build.gradle describes plugins, dependencies, and tasks.'
      ],
      commonMistakes: [
        'Mixing Maven and Gradle files in one beginner project.',
        'Ignoring the wrapper when a project provides it.',
        'Treating build output folders as source code.'
      ],
      related: ['Testing', 'Git Basics']
    },
    {
      id: 'plain-javac',
      title: 'When javac Is Enough',
      category: 'habits',
      icon: 'javac',
      tagline: 'Keep tiny projects simple',
      definition: 'For single-file practice, javac and java are simpler than a build tool.',
      realWorld: 'You do not need a full moving truck to carry one notebook.',
      syntax: 'javac Hello.java then java Hello is still the right path for many early exercises.',
      fileName: 'TinyBuild.java',
      code: `public class TinyBuild {
    static String greeting(String name) {
        return "Hello, " + name;
    }

    public static void main(String[] args) {
        System.out.println(greeting("Ubuntu learner"));
    }
}`,
      keyPoints: [
        'Use javac for small isolated files.',
        'Use Maven or Gradle when you need dependencies, tests, or packaging.',
        'Do not add tooling before it solves a real problem.'
      ],
      commonMistakes: [
        'Starting every tiny exercise with a full build tool.',
        'Forgetting the class name must match a public class file name.',
        'Running java TinyBuild.java after compiling instead of java TinyBuild.'
      ],
      related: ['Getting Started on Ubuntu', 'Practice Projects']
    }
  ]);

  addTopic('jvm-memory', {
    badge: 'Topic 19 · Java runtime',
    label: 'Runtime',
    headline: 'JVM and memory,',
    accent: 'what runs Java.',
    intro: 'Build a practical mental model of bytecode, stack frames, heap objects, references, and garbage collection.',
    overview: 'This is advanced enough to come after objects and collections, but beginner-friendly enough to support debugging.'
  }, [
    {
      id: 'jvm-bytecode',
      title: 'JVM and Bytecode',
      category: 'concept',
      icon: 'JVM',
      tagline: 'Compile once, run on the JVM',
      definition: 'javac compiles .java source files into .class bytecode. The JVM loads and runs that bytecode.',
      realWorld: 'The JDK is the full kitchen and toolbox. javac is the recipe compiler. The JVM is the kitchen engine that follows the compiled recipe.',
      why: 'This split lets Java check source code before running it and lets bytecode run on any machine that has a compatible JVM.',
      howThink: 'Write .java for humans, compile to .class for the JVM, then launch the class name in the Ubuntu terminal.',
      whenUse: 'Use this model any time you see a .class file appear, a compiler error, or the java command asking for a class name.',
      syntax: 'javac Tool.java creates Tool.class. java Tool starts the JVM and runs main.',
      codeLanguage: 'bash',
      fileName: 'jvm-flow.sh',
      code: `javac MemoryDemo.java
ls
java MemoryDemo`,
      commands: [
        {
          label: 'Compile source',
          note: 'javac translates source code into JVM bytecode.',
          command: 'javac MemoryDemo.java'
        },
        {
          label: 'Run bytecode',
          note: 'java starts the JVM and runs the class with main.',
          command: 'java MemoryDemo'
        }
      ],
      visualLabel: 'JDK, JRE, JVM, and Bytecode',
      visualHtml: `
          <div class="venn-runtime">
            <div class="runtime-card"><strong>JDK</strong><p>Full developer toolbox: javac, java, standard library, and tools.</p></div>
            <div class="runtime-card"><strong>JRE</strong><p>Runtime pieces needed to run Java programs.</p></div>
            <div class="runtime-card"><strong>JVM</strong><p>The engine that loads and executes bytecode.</p></div>
          </div>
          <div class="flow-diagram" style="margin-top:14px">
            <div class="flow-node"><strong>Source code</strong><span>MemoryDemo.java</span></div>
            <div class="flow-arrow">-> javac -></div>
            <div class="flow-node"><strong>Bytecode</strong><span>MemoryDemo.class</span></div>
            <div class="flow-arrow">-> java -></div>
            <div class="flow-node"><strong>JVM</strong><span>running program</span></div>
          </div>
          <div class="diagram-note">The browser shows this path; Ubuntu Terminal actually runs the commands.</div>`,
      keyPoints: [
        'The JVM runs bytecode, not raw .java source after compilation.',
        'The JDK includes javac and the runtime tools beginners need.',
        'The JRE is runtime-only; beginners should install the JDK on Ubuntu.',
        'Class loading finds the classes your program needs.',
        'Java 21 LTS keeps runtime behavior stable for learners.'
      ],
      commonMistakes: [
        'Running java with the .class suffix.',
        'Deleting .class files then expecting java ClassName to work.',
        'Confusing JDK, JRE, JVM, javac, and java.'
      ],
      related: ['Getting Started on Ubuntu', 'Debugging']
    },
    {
      id: 'stack-heap',
      title: 'Stack, Heap, and References',
      category: 'practice',
      icon: 'mem',
      tagline: 'Variables and objects',
      definition: 'Method calls use stack frames. Objects live on the heap. Reference variables point to objects.',
      realWorld: 'The stack is a tidy pile of desk notes for active method calls. The heap is the storage room where objects live. References are labels pointing from the desk to storage.',
      why: 'This model explains why two variables can affect the same object and why local variables disappear when a method finishes.',
      howThink: 'Primitives sit in the stack frame as values. Object variables sit in the stack frame as references that point to heap objects.',
      whenUse: 'Use this model when assignment, object mutation, null, arrays, lists, or String equality behave differently than expected.',
      syntax: 'Course course = new Course("Java") stores a reference in course and an object on the heap.',
      fileName: 'MemoryDemo.java',
      code: `public class MemoryDemo {
    static class Course {
        String title;

        Course(String title) {
            this.title = title;
        }
    }

    public static void main(String[] args) {
        Course first = new Course("Java");
        Course second = first;
        second.title = "Java on Ubuntu";

        System.out.println(first.title);
        System.out.println(first == second);
    }
}`,
      visualLabel: 'Stack Frames and Heap Objects',
      visualHtml: `
          <div class="memory-diagram">
            <div class="memory-zone">
              <div class="memory-title">Stack</div>
              <div class="memory-box"><strong>main frame</strong><span>first -> Course@1</span><span>second -> Course@1</span></div>
              <div class="memory-box"><strong>println frame</strong><span>created briefly while printing</span></div>
            </div>
            <div class="memory-zone">
              <div class="memory-title">Heap</div>
              <div class="memory-box"><strong>Course@1</strong><span>title = "Java on Ubuntu"</span></div>
              <div class="memory-box"><strong>Important</strong><span>first and second point to the same object.</span></div>
            </div>
          </div>
          <div class="flow-diagram" style="margin-top:14px">
            <div class="flow-node"><strong>Primitive copy</strong><span>int b = a copies the number.</span></div>
            <div class="flow-arrow">but</div>
            <div class="flow-node"><strong>Object copy</strong><span>Course b = a copies the reference.</span></div>
          </div>`,
      keyPoints: [
        'References can point to the same object.',
        'Changing an object through one reference is visible through another reference.',
        'Primitive values are copied directly.',
        'Object assignment copies the reference, not the object.'
      ],
      commonMistakes: [
        'Thinking object assignment clones the object.',
        'Using == when equals is needed for value comparison.',
        'Blaming the heap before checking references.'
      ],
      related: ['Classes & Objects', 'Strings & Text']
    },
    {
      id: 'gc',
      title: 'Garbage Collection',
      category: 'habits',
      icon: 'GC',
      tagline: 'Unused objects are cleaned later',
      definition: 'Garbage collection reclaims heap memory for objects that can no longer be reached by live references.',
      realWorld: 'If no desk note, field, or collection still has the storage label, the JVM can eventually clear that storage space.',
      why: 'Automatic memory cleanup lets beginners focus on object relationships instead of manually freeing ordinary Java objects.',
      howThink: 'Reachable means there is still a path from running code to the object. Unreachable means the program has lost every path to it.',
      whenUse: 'Think about reachability when large lists, caches, or long-running programs keep more objects than expected.',
      syntax: 'Set references to null only when it actually shortens object lifetime; most beginner code should rely on scope.',
      fileName: 'GarbageCollectionDemo.java',
      code: `public class GarbageCollectionDemo {
    static String makeMessage() {
        String temporary = "practice";
        return temporary.toUpperCase();
    }

    public static void main(String[] args) {
        String message = makeMessage();
        System.out.println(message);
    }
}`,
      visualLabel: 'Garbage Collection Reachability',
      visualHtml: `
          <div class="gc-diagram">
            <div class="memory-box"><strong>main frame</strong><span>message reference</span></div>
            <div class="memory-arrow">-></div>
            <div class="memory-box"><strong>"PRACTICE"</strong><span>reachable, keep it</span></div>
            <div class="memory-box lost"><strong>temporary old object</strong><span>unreachable, collectible later</span></div>
          </div>
          <div class="diagram-note">Garbage collection is automatic, but files and sockets still need closing because they are operating-system resources.</div>`,
      keyPoints: [
        'Garbage collection is automatic.',
        'Reachability matters more than manual cleanup for normal objects.',
        'Files and sockets still need closing because they are operating-system resources.'
      ],
      commonMistakes: [
        'Calling System.gc() as a normal cleanup strategy.',
        'Confusing memory cleanup with closing files.',
        'Keeping unnecessary references in long-lived collections.'
      ],
      related: ['I/O Basics', 'Collections']
    }
  ]);

  addTopic('practice-projects', {
    badge: 'Topic 21 · Practice mode',
    label: 'Projects',
    headline: 'Practice projects,',
    accent: 'small wins.',
    intro: 'Build small Ubuntu-terminal programs that combine methods, objects, collections, files, tests, Git, and build tools.',
    overview: 'Projects are intentionally small so beginners finish, reflect, and improve instead of getting buried.'
  }, [
    {
      id: 'calculator',
      title: 'Calculator',
      category: 'concept',
      icon: '01',
      tagline: 'Methods plus input',
      definition: 'A calculator project practices methods, parameters, return values, terminal input, and simple validation.',
      realWorld: 'It is the classic beginner workbench: tiny enough to finish, rich enough to reveal logic mistakes.',
      syntax: 'Start with pure methods, then add Scanner input after the logic works.',
      fileName: 'CalculatorProject.java',
      code: `public class CalculatorProject {
    static int add(int a, int b) {
        return a + b;
    }

    static int multiply(int a, int b) {
        return a * b;
    }

    public static void main(String[] args) {
        System.out.println(add(7, 5));
        System.out.println(multiply(7, 5));
    }
}`,
      keyPoints: [
        'Write methods before terminal input.',
        'Test a few expected results manually or with self-checks.',
        'Add division only after deciding how to handle divide-by-zero.'
      ],
      commonMistakes: [
        'Building a menu before the operations work.',
        'Letting all logic live inside main.',
        'Ignoring invalid input.'
      ],
      related: ['Methods', 'Testing']
    },
    {
      id: 'grade-book',
      title: 'Grade Book',
      category: 'practice',
      icon: '02',
      tagline: 'Objects plus collections',
      definition: 'A grade book project practices records or classes, ArrayList, loops, and formatted output.',
      realWorld: 'It is a small classroom ledger: add students, store scores, and print a report.',
      syntax: 'Use a record for simple student data and a List for the grade book.',
      fileName: 'GradeBookProject.java',
      code: `import java.util.ArrayList;
import java.util.List;

public class GradeBookProject {
    record Student(String name, int score) {}

    static double average(List<Student> students) {
        int total = 0;
        for (Student student : students) {
            total += student.score();
        }
        return (double) total / students.size();
    }

    public static void main(String[] args) {
        List<Student> students = new ArrayList<>();
        students.add(new Student("Ada", 92));
        students.add(new Student("Kai", 87));
        System.out.println(average(students));
    }
}`,
      keyPoints: [
        'Records are good for simple immutable project data.',
        'Lists are better than arrays when entries grow.',
        'Check empty-list behavior before calling average.'
      ],
      commonMistakes: [
        'Dividing by zero when there are no students.',
        'Using parallel arrays for names and scores.',
        'Formatting output before the data model is clear.'
      ],
      related: ['Classes & Objects', 'Collections']
    },
    {
      id: 'notes-file',
      title: 'Notes File App',
      category: 'habits',
      icon: '03',
      tagline: 'Files plus exceptions',
      definition: 'A notes app practices Path, Files, exceptions, strings, and Ubuntu terminal workflows.',
      realWorld: 'It is a tiny local notebook that proves your Java code can persist data between runs.',
      syntax: 'Use Files.writeString and Files.readString for the first version.',
      fileName: 'NotesProject.java',
      code: `import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

public class NotesProject {
    static void save(Path path, String note) throws IOException {
        Files.writeString(path, note + System.lineSeparator());
    }

    static String load(Path path) throws IOException {
        return Files.readString(path);
    }

    public static void main(String[] args) throws IOException {
        Path path = Path.of("notes.txt");
        save(path, "Practice Java on Ubuntu");
        System.out.println(load(path));
    }
}`,
      keyPoints: [
        'Keep file logic in small methods.',
        'Use relative paths for beginner projects.',
        'Commit working versions with Git before adding features.'
      ],
      commonMistakes: [
        'Appending requirements before the save/read basics work.',
        'Catching IOException without showing the user what failed.',
        'Hard-coding personal absolute paths.'
      ],
      related: ['I/O Basics', 'Git Basics']
    },
    {
      id: 'recursion-drills',
      title: 'Recursion Drills',
      category: 'practice',
      icon: '04',
      tagline: 'Small methods, clear stop rules',
      definition: 'A recursion drill is a tiny one-class project where one method calls itself with a smaller input and a few self-checks prove the behavior.',
      realWorld: 'It is a staircase: each call steps down one stair until it reaches the floor.',
      why: 'Small recursion projects build confidence with base cases, stack frames, and expected-result testing before data structures get involved.',
      howThink: 'Write the base case first, then the smaller recursive call, then checks for tiny, normal, and edge inputs.',
      whenUse: 'Use these drills after methods and before tree-like data structures or algorithms.',
      syntax: 'Keep it one class: recursive methods, checkEquals, and main in RecursionDrills.java.',
      fileName: 'RecursionDrills.java',
      code: `public class RecursionDrills {
    static int countDigits(int n) {
        n = Math.abs(n);
        if (n < 10) {
            return 1;
        }
        return 1 + countDigits(n / 10);
    }

    static String repeat(String text, int times) {
        if (times <= 0) {
            return "";
        }
        return text + repeat(text, times - 1);
    }

    static void checkEquals(int expected, int actual) {
        if (expected != actual) {
            throw new AssertionError("expected " + expected + " but got " + actual);
        }
    }

    static void checkEquals(String expected, String actual) {
        if (!expected.equals(actual)) {
            throw new AssertionError("expected " + expected + " but got " + actual);
        }
    }

    public static void main(String[] args) {
        checkEquals(1, countDigits(7));
        checkEquals(3, countDigits(105));
        checkEquals("hahaha", repeat("ha", 3));
        checkEquals("", repeat("ha", 0));
        System.out.println("Recursion drills passed");
    }
}`,
      commands: [
        {
          label: 'Compile the drill',
          note: 'Run this from the folder containing RecursionDrills.java.',
          command: 'javac RecursionDrills.java'
        },
        {
          label: 'Run the checks',
          note: 'The program prints success only after all self-checks pass.',
          command: 'java RecursionDrills'
        }
      ],
      practicePrompts: [
        {
          title: 'Count digits',
          level: 'Starter',
          goal: 'Write countDigits so 7 has 1 digit and 105 has 3 digits.',
          checks: ['countDigits(0) returns 1.', 'countDigits(42) returns 2.', 'countDigits(-900) returns 3.'],
          stretch: 'Write a comment explaining why dividing by 10 makes the problem smaller.'
        },
        {
          title: 'Repeat text',
          level: 'Core',
          goal: 'Build a string by repeating a smaller request.',
          checks: ['repeat("ha", 3) returns "hahaha".', 'repeat("x", 1) returns "x".', 'repeat("x", 0) returns "".' ],
          stretch: 'Try the same problem with a loop and compare which version is easier to read.'
        },
        {
          title: 'Reverse text',
          level: 'Stretch',
          goal: 'Create reverse("java") using the first character plus a recursive call on the rest.',
          checks: ['reverse("") returns "".', 'reverse("a") returns "a".', 'reverse("java") returns "avaj".'],
          stretch: 'Avoid substring indexes until you can explain what each index means.'
        }
      ],
      keyPoints: [
        'Recursion drills should stay tiny.',
        'Every prompt needs expected outputs.',
        'A method can be correct before it has terminal input.',
        'Use self-checks to protect your solution while refactoring.'
      ],
      commonMistakes: [
        'Starting with user input instead of the recursive method.',
        'Forgetting to test zero, one, or empty input.',
        'Letting recursion continue with the same input forever.'
      ],
      related: ['Testing', 'JVM & Memory']
    },
    {
      id: 'one-class-prompts',
      title: 'One-Class Project Prompts',
      category: 'habits',
      icon: '05',
      tagline: 'Finishable terminal programs',
      definition: 'A one-class project is a complete beginner program kept in one public class so compiling, running, and testing stay simple.',
      realWorld: 'It is a small workbench project: one file, one purpose, a few methods, and clear checks before decoration.',
      why: 'One-class projects help beginners finish real programs without getting buried in packages, build tools, or UI frameworks.',
      howThink: 'Keep main as the coordinator. Put real logic in named methods. Add self-checks before adding menus or file I/O.',
      whenUse: 'Use one-class projects for the first version of calculators, converters, quizzes, grade tools, and text helpers.',
      syntax: 'Create one file, compile it with javac ProjectName.java, then run java ProjectName.',
      fileName: 'OneClassProjects.java',
      code: `public class OneClassProjects {
    static double celsiusToFahrenheit(double celsius) {
        return celsius * 9 / 5 + 32;
    }

    static boolean isPassing(int score) {
        return score >= 70;
    }

    static String initials(String first, String last) {
        return first.substring(0, 1).toUpperCase()
            + last.substring(0, 1).toUpperCase();
    }

    public static void main(String[] args) {
        System.out.println(celsiusToFahrenheit(20));
        System.out.println(isPassing(82));
        System.out.println(initials("Ada", "Lovelace"));
    }
}`,
      commands: [
        {
          label: 'Create a project folder',
          note: 'Keep small one-class projects in their own folder so .class files do not mix with notes.',
          command: 'mkdir -p java-practice/one-class\ncd java-practice/one-class'
        },
        {
          label: 'Compile and run',
          note: 'Use the class name without .java when running.',
          command: 'javac OneClassProjects.java\njava OneClassProjects'
        }
      ],
      practicePrompts: [
        {
          title: 'Temperature converter',
          level: 'Starter',
          goal: 'Convert Celsius to Fahrenheit and Fahrenheit to Celsius with two methods.',
          checks: ['celsiusToFahrenheit(0) returns 32.0.', 'celsiusToFahrenheit(100) returns 212.0.', 'fahrenheitToCelsius(32) returns 0.0.'],
          stretch: 'Print a tiny table for 0, 10, 20, and 30 Celsius.'
        },
        {
          title: 'Grade helper',
          level: 'Core',
          goal: 'Turn numeric scores into pass/fail and letter labels.',
          checks: ['isPassing(70) returns true.', 'isPassing(69) returns false.', 'letterGrade(90) returns "A".'],
          stretch: 'Reject scores below 0 or above 100 with IllegalArgumentException.'
        },
        {
          title: 'Text initials',
          level: 'Core',
          goal: 'Return uppercase initials from first and last name input.',
          checks: ['initials("Ada", "Lovelace") returns "AL".', 'initials("grace", "hopper") returns "GH".'],
          stretch: 'Trim extra spaces before reading the first character.'
        },
        {
          title: 'Number guessing rules',
          level: 'Stretch',
          goal: 'Write compareGuess(secret, guess) that returns "low", "high", or "correct".',
          checks: ['compareGuess(10, 7) returns "low".', 'compareGuess(10, 12) returns "high".', 'compareGuess(10, 10) returns "correct".'],
          stretch: 'Add Scanner input only after compareGuess is fully checked.'
        }
      ],
      keyPoints: [
        'One class is enough for many first projects.',
        'Start with pure methods that return values.',
        'Add terminal input after the methods pass checks.',
        'Use Git after each working milestone.'
      ],
      commonMistakes: [
        'Adding menus, colors, or files before the core method works.',
        'Putting all logic directly inside main.',
        'Starting Maven or Gradle for a 30-line exercise.'
      ],
      related: ['Methods', 'Testing']
    }
  ]);
})();
