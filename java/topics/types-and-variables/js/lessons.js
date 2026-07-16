Java.topics.typesAndVariables = Java.topics.typesAndVariables || {};

const typeGlossary = [
  { term: 'primitive', definition: 'A built-in Java value type that stores a simple value directly, such as int or boolean.' },
  { term: 'String', definition: 'Java’s standard text class. It is an object, not a primitive.' },
  { term: 'literal', definition: 'A value written directly in code, such as 42, true, or "Java".' },
  { term: 'var', definition: 'A Java keyword for local variable type inference. The type is still fixed at compile time.' },
  { term: 'casting', definition: 'Explicitly converting a value from one type to another.' },
  { term: 'final', definition: 'A keyword that prevents a variable from being reassigned after it gets a value.' },
  { term: 'scope', definition: 'The part of the code where a variable name exists and can be used.' },
  { term: 'int', definition: 'A 32-bit whole-number primitive type. Common for counts and indexes.' },
  { term: 'long', definition: 'A 64-bit whole-number primitive type. Useful when int is too small.' },
  { term: 'double', definition: 'A 64-bit floating-point primitive type. Common for measurements, not exact money.' },
  { term: 'boolean', definition: 'A primitive type with only two values: true or false.' },
  { term: 'char', definition: 'A primitive type for one UTF-16 code unit, written with single quotes.' },
  { term: 'byte', definition: 'An 8-bit signed whole-number type from -128 to 127.' },
  { term: 'short', definition: 'A 16-bit signed whole-number type from -32,768 to 32,767.' },
  { term: 'float', definition: 'A 32-bit floating-point type. Use double for normal beginner decimal work.' },
  { term: 'overflow', definition: 'What happens when a fixed-size numeric type goes past its maximum or minimum value.' },
  { term: 'heap', definition: 'The JVM memory area where objects, such as String objects, live.' },
  { term: 'stack', definition: 'The JVM memory area used for method calls and local variables.' },
  { term: 'reference', definition: 'A value that points to an object on the heap.' }
];

Java.topics.typesAndVariables.lessons = [
  {
    id: 'primitives',
    num: '01',
    title: 'Primitives',
    category: 'values',
    icon: 'int',
    tagline: 'Small built-in value types',
    definition: 'Primitive types are Java’s built-in value types for numbers, characters, and true/false values. They are not objects, and each primitive has a fixed size, default value, literal style, and practical job.',
    realWorld: 'A primitive variable is a labeled box that holds one simple value directly. The label says what kind of value the box is allowed to hold.',
    why: 'Java uses fixed primitive types so the compiler can catch wrong values early and the JVM can store common data compactly.',
    howThink: 'Start with int for whole-number counts, double for beginner decimal measurements, boolean for yes/no decisions, and char only when you truly need one character-sized value.',
    whenUse: 'Beginners use primitives in variables, conditions, loops, calculations, method parameters, and return values before moving into richer objects.',
    syntax: 'Declare a primitive by writing the type, then the variable name, then an optional value: int age = 32; double price = 19.99; boolean active = true; char grade = \'A\'; long population = 8_000_000_000L;',
    primitiveTypes: [
      {
        name: 'byte',
        size: '8 bits',
        range: '-128 to 127',
        defaultValue: '0',
        literalExamples: 'byte level = 12;\nbyte delta = -3;',
        whenUse: 'Rare in beginner apps; useful for raw binary data or compact storage when an API asks for it.',
        mistake: 'Arithmetic with byte often promotes to int, so assigning results back may need a cast.'
      },
      {
        name: 'short',
        size: '16 bits',
        range: '-32,768 to 32,767',
        defaultValue: '0',
        literalExamples: 'short yearOffset = 26;\nshort seats = 120;',
        whenUse: 'Rare in beginner code; use it only when a library, file format, or memory-sensitive model calls for it.',
        mistake: 'Choosing short for ordinary counts adds friction without much benefit.'
      },
      {
        name: 'int',
        size: '32 bits',
        range: '-2,147,483,648 to 2,147,483,647',
        defaultValue: '0',
        literalExamples: 'int age = 32;\nint score = 98;\nint readable = 1_000_000;',
        whenUse: 'The normal beginner choice for counts, indexes, scores, loop counters, and whole-number calculations.',
        mistake: 'int can overflow; use long for values that may grow beyond about two billion.',
        emphasis: true
      },
      {
        name: 'long',
        size: '64 bits',
        range: '-9,223,372,036,854,775,808 to 9,223,372,036,854,775,807',
        defaultValue: '0L',
        literalExamples: 'long population = 8_000_000_000L;\nlong id = 42L;',
        whenUse: 'Use for large whole numbers such as IDs, timestamps, file sizes, and totals beyond int range.',
        mistake: 'Forgetting the L suffix on very large literals can make Java try int first.'
      },
      {
        name: 'float',
        size: '32 bits',
        range: 'about 6-7 decimal digits of precision',
        defaultValue: '0.0f',
        literalExamples: 'float ratio = 0.75f;\nfloat temperature = 21.5f;',
        whenUse: 'Uncommon for beginners; mostly appears in graphics, game, or memory-sensitive numeric APIs.',
        mistake: 'Forgetting the f suffix, because decimal literals are double by default.'
      },
      {
        name: 'double',
        size: '64 bits',
        range: 'about 15 decimal digits of precision',
        defaultValue: '0.0d',
        literalExamples: 'double price = 19.99;\ndouble average = 87.5;',
        whenUse: 'The normal beginner choice for approximate decimal measurements, averages, and percentages.',
        mistake: 'double is approximate; use BigDecimal later for exact money calculations.',
        emphasis: true
      },
      {
        name: 'char',
        size: '16 bits',
        range: 'one UTF-16 code unit, 0 to 65,535',
        defaultValue: "'\\u0000'",
        literalExamples: "char grade = 'A';\nchar newline = '\\n';",
        whenUse: 'Use when you mean one character-like value, such as a grade letter or simple menu choice.',
        mistake: 'Using double quotes; char literals use single quotes, while String text uses double quotes.',
        emphasis: true
      },
      {
        name: 'boolean',
        size: 'JVM-defined storage, logical true/false',
        range: 'true or false',
        defaultValue: 'false',
        literalExamples: 'boolean active = true;\nboolean finished = false;',
        whenUse: 'Use for conditions, flags, validation results, and method answers that are yes/no.',
        mistake: 'Writing True or False; Java boolean literals are lowercase.',
        emphasis: true
      }
    ],
    fileName: 'Primitives.java',
    code: `public class Primitives {
    public static void main(String[] args) {
        int age = 32;
        double price = 19.99;
        boolean active = true;
        char grade = 'A';

        System.out.println(age);
        System.out.println(price);
        System.out.println(active);
        System.out.println(grade);
    }
}`,
    keyPoints: [
      'Common primitives are int, long, double, boolean, char, byte, short, and float.',
      'int is the everyday whole-number choice; long is for much larger whole numbers.',
      'double is common for measurements, averages, and approximate decimal math.',
      'boolean is only true or false, which makes it perfect for conditions.',
      'char uses single quotes and represents one character-sized value.'
    ],
    commonMistakes: [
      'Using int for money that needs exact decimal behavior.',
      'Putting double quotes around char values.',
      'Expecting primitives to have methods like objects.'
    ],
    pros: [
      'Fast, compact, and built into the language.',
      'Great for counters, flags, simple measurements, and loop indexes.',
      'Clear type names help beginners understand what kind of value is allowed.'
    ],
    cons: [
      'No methods directly on primitive values.',
      'Numeric ranges are finite, so overflow is possible.',
      'double is approximate and should not be used for exact money calculations.'
    ],
    related: ['Literals', 'Casting'],
    glossary: typeGlossary
  },
  {
    id: 'ranges-overflow',
    num: '02',
    title: 'Ranges and Overflow',
    category: 'values',
    icon: 'max',
    tagline: 'Every numeric box has a limit',
    definition: 'Java numeric primitives have fixed sizes. If an int goes past 2,147,483,647, it overflows and wraps around to -2,147,483,648.',
    realWorld: 'It is like an old car odometer that rolls over after its largest number. The machine keeps counting, but the display wraps.',
    syntax: 'Use MIN_VALUE and MAX_VALUE constants to inspect limits: Integer.MAX_VALUE, Long.MAX_VALUE, Byte.MIN_VALUE, and so on.',
    fileName: 'RangesAndOverflow.java',
    code: `public class RangesAndOverflow {
    public static void main(String[] args) {
        System.out.println("byte: " + Byte.MIN_VALUE + " to " + Byte.MAX_VALUE);
        System.out.println("short: " + Short.MIN_VALUE + " to " + Short.MAX_VALUE);
        System.out.println("int: " + Integer.MIN_VALUE + " to " + Integer.MAX_VALUE);
        System.out.println("long: " + Long.MIN_VALUE + " to " + Long.MAX_VALUE);
        System.out.println("float max: " + Float.MAX_VALUE);
        System.out.println("double max: " + Double.MAX_VALUE);

        int max = Integer.MAX_VALUE;
        System.out.println(max);
        System.out.println(max + 1); // overflow: wraps to Integer.MIN_VALUE
    }
}`,
    keyPoints: [
      'byte is 8 bits: -128 to 127.',
      'short is 16 bits: -32,768 to 32,767.',
      'int is 32 bits: -2,147,483,648 to 2,147,483,647.',
      'long is 64 bits: -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807.',
      'float and double store approximate decimal values, not exact decimal money.'
    ],
    commonMistakes: [
      'Assuming Java stops an int overflow automatically.',
      'Using float or double for exact currency calculations.',
      'Forgetting that byte and short are small and mostly useful for special cases.'
    ],
    pros: [
      'Fixed sizes make Java numeric behavior predictable.',
      'MAX_VALUE and MIN_VALUE constants are easy to inspect.',
      'Choosing int or long intentionally avoids many beginner bugs.'
    ],
    cons: [
      'Overflow can produce surprising negative numbers.',
      'Exact decimal math needs BigDecimal, which is a later topic.',
      'Small types like byte and short can add casts and friction.'
    ],
    related: ['Primitives', 'Casting'],
    glossary: typeGlossary
  },
  {
    id: 'string',
    num: '03',
    title: 'String',
    category: 'values',
    icon: '""',
    tagline: 'Text as an object',
    definition: 'String is the standard Java class for text. It is not primitive, but it is used so often that it feels fundamental.',
    realWorld: 'A String is like a printed label. You can read it and make a new label from it, but the original label does not rewrite itself.',
    syntax: 'String values use double quotes: String name = "Ari"; Use methods such as length(), toUpperCase(), and equals(...) to work with text.',
    fileName: 'StringsIntro.java',
    code: `public class StringsIntro {
    public static void main(String[] args) {
        String language = "Java";
        String version = "21";
        String message = language + " " + version + " LTS";

        System.out.println(message);
        System.out.println(message.length());
    }
}`,
    keyPoints: [
      'String values use double quotes.',
      'String is a class from java.lang.',
      'The + operator can concatenate strings.',
      'Strings are immutable; operations create new strings.'
    ],
    commonMistakes: [
      'Using single quotes for text.',
      'Comparing strings with == instead of equals in later logic.',
      'Assuming String methods change the original value.'
    ],
    pros: [
      'Readable and beginner-friendly for text.',
      'Has many useful methods for searching, slicing, and comparing.',
      'Immutable strings are safer to share between parts of a program.'
    ],
    cons: [
      'Repeated concatenation in large loops can be inefficient.',
      'String comparison has rules beginners must learn.',
      'Text encoding and Unicode can become advanced topics later.'
    ],
    related: ['Strings & Text', 'Literals'],
    glossary: typeGlossary
  },
  {
    id: 'literals',
    num: '04',
    title: 'Literals',
    category: 'values',
    icon: '42',
    tagline: 'Values written directly in code',
    definition: 'A literal is a value written directly in source code, such as 42, 3.14, true, or "hello".',
    realWorld: 'It is the difference between writing a number directly on a form and looking it up from another document.',
    syntax: 'Examples: int count = 42; long big = 8_000_000_000L; double ratio = 0.75; boolean ready = true; String text = "Java";',
    fileName: 'Literals.java',
    code: `public class Literals {
    public static void main(String[] args) {
        int count = 42;
        long population = 8_000_000_000L;
        double ratio = 0.75;
        boolean ready = true;
        String text = "Java 21";

        System.out.println(count + ", " + population);
        System.out.println(ratio + ", " + ready + ", " + text);
    }
}`,
    keyPoints: [
      'Underscores can make large numeric literals readable.',
      'Use L for long literals when the value needs long range.',
      'String literals use double quotes.',
      'Boolean literals are true and false.'
    ],
    commonMistakes: [
      'Using commas inside numeric literals.',
      'Forgetting L on very large long values.',
      'Capitalizing true or false.'
    ],
    related: ['Primitives', 'Operators'],
    glossary: typeGlossary
  },
  {
    id: 'var',
    num: '05',
    title: 'var',
    category: 'variables',
    icon: 'var',
    tagline: 'Let Java infer local variable types',
    definition: 'var lets Java infer the type of a local variable from the value assigned at declaration.',
    realWorld: 'It is like letting a label maker choose the right label because the box contents are already obvious.',
    syntax: 'Use var only for local variables with an initializer: var score = 98; After that line, score is still an int and cannot become a String.',
    fileName: 'VarExample.java',
    code: `public class VarExample {
    public static void main(String[] args) {
        var name = "Ari";
        var score = 98;
        var passed = score >= 70;

        System.out.println(name + " passed: " + passed);
    }
}`,
    keyPoints: [
      'var works for local variables only.',
      'The variable still has one real, fixed type.',
      'The initializer is required.',
      'Use var when the type is obvious from the right side.'
    ],
    commonMistakes: [
      'Thinking var means dynamic typing.',
      'Trying to use var for fields or method parameters.',
      'Using var when it makes code harder to read.'
    ],
    related: ['Primitives', 'Scope'],
    glossary: typeGlossary
  },
  {
    id: 'casting',
    num: '06',
    title: 'Casting',
    category: 'variables',
    icon: '↧',
    tagline: 'Convert when Java needs permission',
    definition: 'Casting is an explicit conversion from one type to another, often used when narrowing from a larger numeric type to a smaller one.',
    realWorld: 'It is like pouring from a large container into a smaller cup. You can do it, but you must accept that some might spill.',
    syntax: 'Put the target type in parentheses before the value: int whole = (int) 9.8; Widening, such as int to double, usually does not need a cast.',
    fileName: 'Casting.java',
    code: `public class Casting {
    public static void main(String[] args) {
        int whole = 10;
        double widened = whole;

        double precise = 9.8;
        int narrowed = (int) precise;

        System.out.println(widened);
        System.out.println(narrowed);
    }
}`,
    keyPoints: [
      'Widening conversions can happen automatically.',
      'Narrowing conversions need an explicit cast.',
      'Casting a decimal to int drops the fractional part.',
      'Casting does not magically make invalid data safe.'
    ],
    commonMistakes: [
      'Losing decimal data by casting too early.',
      'Casting to silence compiler errors without understanding the conversion.',
      'Expecting rounding when Java truncates.'
    ],
    related: ['Primitives', 'Operators'],
    glossary: typeGlossary
  },
  {
    id: 'final',
    num: '07',
    title: 'final',
    category: 'variables',
    icon: '!',
    tagline: 'Assign once',
    definition: 'A final variable can be assigned once. After that, the variable name cannot point to a different value.',
    realWorld: 'It is like writing a value in ink instead of pencil. You choose it carefully because the name is no longer editable.',
    syntax: 'Place final before the type: final int maxAttempts = 3; For constants shared by a class, Java code often uses static final.',
    fileName: 'FinalVariables.java',
    code: `public class FinalVariables {
    public static void main(String[] args) {
        final int maxAttempts = 3;
        int attempts = 1;

        System.out.println("Attempt " + attempts + " of " + maxAttempts);
    }
}`,
    keyPoints: [
      'final helps communicate that a value should not be reassigned.',
      'Constants are often static final fields.',
      'final does not always make an object deeply immutable.',
      'Use final when reassignment would be confusing.'
    ],
    commonMistakes: [
      'Trying to reassign a final variable.',
      'Assuming final on a reference freezes every object field.',
      'Overusing final before names and logic are clear.'
    ],
    related: ['Naming Conventions', 'Keywords & Modifiers'],
    glossary: typeGlossary
  },
  {
    id: 'scope',
    num: '08',
    title: 'Scope',
    category: 'variables',
    icon: '{}',
    tagline: 'Where a name exists',
    definition: 'Scope is the region of code where a variable name can be used.',
    realWorld: 'It is like a backstage pass that works only in certain rooms. Outside those rooms, the pass is meaningless.',
    syntax: 'A variable declared inside braces belongs to that block: if (ready) { int count = 1; } The name count is not available after the closing brace.',
    fileName: 'ScopeExample.java',
    code: `public class ScopeExample {
    public static void main(String[] args) {
        int total = 0;

        for (int i = 1; i <= 3; i++) {
            int doubled = i * 2;
            total += doubled;
        }

        System.out.println("Total: " + total);
    }
}`,
    keyPoints: [
      'Method variables exist inside the method.',
      'Block variables exist inside their braces.',
      'Loop variables often exist only in the loop.',
      'Small scopes make code easier to reason about.'
    ],
    commonMistakes: [
      'Trying to use a variable outside the block that declared it.',
      'Declaring variables far earlier than needed.',
      'Reusing the same name for different meanings.'
    ],
    related: ['Blocks', 'Control Flow'],
    glossary: typeGlossary
  },
  {
    id: 'stack-heap-references',
    num: '09',
    title: 'Stack, Heap, References',
    category: 'variables',
    icon: 'mem',
    tagline: 'A light memory model',
    definition: 'Java local variables live in stack frames while objects live on the heap. A variable of an object type stores a reference to the object, not the whole object inside the variable.',
    realWorld: 'The stack is like desk notes for the method running right now. The heap is a storage room for objects. A reference is the shelf label that points from the desk note to the stored object.',
    why: 'This model explains why primitive assignment copies the value, while object assignment copies the reference to the same heap object.',
    howThink: 'When you see int b = a, picture a new box with its own number. When you see Student b = a, picture two labels pointing to one object.',
    whenUse: 'Use this mental model when String comparison, object mutation, arrays, lists, or null errors feel surprising.',
    syntax: 'int count = 3 stores a primitive value directly in the local variable. String name = "Ari" stores a reference that points to a String object managed by the JVM.',
    fileName: 'StackHeapReferences.java',
    code: `public class StackHeapReferences {
    static class Student {
        String name;

        Student(String name) {
            this.name = name;
        }
    }

    public static void main(String[] args) {
        int firstCount = 3;
        int secondCount = firstCount;
        secondCount = 9;

        Student first = new Student("Ari");
        Student second = first;
        second.name = "Mina";

        System.out.println(firstCount);
        System.out.println(secondCount);
        System.out.println(first.name);
        System.out.println(first == second);
    }
}`,
    visualLabel: 'Stack and Heap Visual',
    visualHtml: `
          <div class="reference-diagram">
            <div class="memory-zone">
              <div class="memory-title">Stack frame: main</div>
              <div class="memory-box"><strong>firstCount</strong><span>3 copied directly</span></div>
              <div class="memory-box"><strong>secondCount</strong><span>9 changed separately</span></div>
              <div class="memory-ref">
                <div class="memory-box"><strong>first</strong><span>reference</span></div>
                <div class="memory-arrow">-></div>
                <div class="memory-box"><strong>Student object</strong><span>name = "Mina"</span></div>
              </div>
              <div class="memory-ref">
                <div class="memory-box"><strong>second</strong><span>same reference</span></div>
                <div class="memory-arrow">-></div>
                <div class="memory-box"><strong>same Student</strong><span>assignment did not clone</span></div>
              </div>
            </div>
            <div class="memory-zone">
              <div class="memory-title">Beginner rule</div>
              <div class="memory-box"><strong>Primitive copy</strong><span>The value is copied into another variable.</span></div>
              <div class="memory-box"><strong>Reference copy</strong><span>The pointer is copied; both variables can reach the same object.</span></div>
              <div class="memory-box"><strong>Common mistake</strong><span>Assignment copies the reference, not the object.</span></div>
            </div>
          </div>`,
    keyPoints: [
      'A stack frame is created for each running method call.',
      'Local primitive variables store simple values directly.',
      'Objects live on the heap and are cleaned up by garbage collection later.',
      'Object variables store references to heap objects.',
      'This mental model helps explain why object sharing matters.',
      'Assignment copies a primitive value, but it copies only the reference for an object.'
    ],
    commonMistakes: [
      'Thinking an object variable contains the entire object directly.',
      'Expecting Student second = first to create a separate Student automatically.',
      'Assuming final freezes the object a reference points to.',
      'Trying to manually free Java objects like in C.'
    ],
    pros: [
      'A light stack/heap model makes Java behavior less mysterious.',
      'References explain object sharing and null values.',
      'Useful preparation for classes, arrays, and collections.'
    ],
    cons: [
      'The real JVM is more optimized than this beginner model.',
      'Too much memory detail too early can distract from writing code.',
      'Reference equality and value equality need careful explanation later.'
    ],
    related: ['Classes & Objects', 'String'],
    glossary: typeGlossary
  }
];
