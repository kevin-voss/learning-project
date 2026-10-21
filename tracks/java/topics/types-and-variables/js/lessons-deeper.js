// Deeper: optional lessons. Read them when you meet the problem, not before.
Java.topics.typesAndVariables.lessons.push(
  {
    id: 'ranges-overflow',
    title: 'Ranges and Overflow',
    category: 'deeper',
    icon: 'max',
    tagline: 'Every number box has a limit',
    realWorld: 'An old car counter shows 999999. Drive one more kilometre and it shows 000000. The number rolled over.',
    definition: 'Number types have a fixed size. An `int` stops at 2,147,483,647. One more and it jumps to -2,147,483,648, with no error. Use `long` when numbers can get that big.',
    why: 'Silent wrap-around makes very strange bugs.',
    whenUse: 'Big totals, ids, time in milliseconds, money in cents.',
    syntax: 'Ask Java for the limits: `Integer.MAX_VALUE`, `Long.MAX_VALUE`. A long literal ends in L: `8_000_000_000L`.',
    primitiveTypes: [
      { name: 'byte', size: '8 bits', range: '-128 to 127', defaultValue: '0', literalExamples: 'byte b = 12;', whenUse: 'Raw file data. Rare at the start.', mistake: 'Math on bytes gives an int.' },
      { name: 'short', size: '16 bits', range: '-32,768 to 32,767', defaultValue: '0', literalExamples: 'short s = 120;', whenUse: 'Almost never in your own code.', mistake: 'Picking it for normal counts.' },
      { name: 'long', size: '64 bits', range: 'about ±9 quintillion', defaultValue: '0L', literalExamples: 'long stars = 8_000_000_000L;', whenUse: 'Numbers bigger than about 2 billion.', mistake: 'Forgetting the L on big literals.' },
      { name: 'float', size: '32 bits', range: 'about 7 digits', defaultValue: '0.0f', literalExamples: 'float f = 0.5f;', whenUse: 'Games and graphics. Use double otherwise.', mistake: 'Forgetting the f.' }
    ],
    fileName: 'RangesAndOverflow.java',
    code: `public class RangesAndOverflow {
    public static void main(String[] args) {
        int max = Integer.MAX_VALUE;
        System.out.println(max);       // 2147483647
        System.out.println(max + 1);   // -2147483648  (wrapped!)

        long big = Integer.MAX_VALUE;
        System.out.println(big + 1);   // 2147483648   (long has room)
    }
}`,
    keyPoints: ['int overflows silently.', 'Use long for big whole numbers.', 'Never use double for money. Use cents in a long, or BigDecimal.'],
    commonMistakes: ['Expecting Java to stop with an error on overflow.'],
    related: ['Variables and Primitives'],
    glossary: typeGlossary
  },
  {
    id: 'casting',
    title: 'Casting',
    category: 'deeper',
    icon: '↧',
    tagline: 'Pour a big cup into a small cup',
    realWorld: 'Pouring a big cup into a small cup works, but some may spill. Java makes you say "I know" before you pour.',
    definition: 'Small to big (`int` to `double`) happens by itself. Big to small needs a cast: `(int) 9.8`. A cast to `int` cuts off the decimals. It does not round.',
    whenUse: 'When you really want a whole number from a decimal.',
    syntax: '`int whole = (int) 9.8;` gives 9. To round, use `Math.round(9.8)`.',
    fileName: 'Casting.java',
    code: `public class Casting {
    public static void main(String[] args) {
        int whole = 10;
        double widened = whole;          // 10.0, no cast needed

        double precise = 9.8;
        int narrowed = (int) precise;    // 9, decimals cut off
        long rounded = Math.round(precise); // 10

        System.out.println(widened + " " + narrowed + " " + rounded);
    }
}`,
    keyPoints: ['Small to big: automatic.', 'Big to small: write the cast.', 'Text to number: `Integer.parseInt("5")`.'],
    commonMistakes: ['Expecting (int) 9.8 to be 10.'],
    related: ['Operators'],
    glossary: typeGlossary
  },
  {
    id: 'var',
    title: 'var',
    category: 'deeper',
    icon: 'var',
    tagline: 'Let Java read the label for you',
    realWorld: 'If a box is full of apples, you do not need a sign that says "apples". Everyone can see it.',
    definition: '`var` lets Java work out the type from the value on the right: `var score = 98;` is an `int`. The type is still fixed. `var` works only for local variables inside methods.',
    whenUse: 'When the type is obvious from the right side, like `var list = new ArrayList<String>();`.',
    fileName: 'VarExample.java',
    code: `public class VarExample {
    public static void main(String[] args) {
        var name = "Ari";        // String
        var score = 98;          // int
        var passed = score >= 70; // boolean

        System.out.println(name + " passed: " + passed);
    }
}`,
    keyPoints: ['var is not "any type". The type is fixed after the first line.'],
    commonMistakes: ['Using var where the reader cannot tell the type.'],
    related: ['Variables and Primitives'],
    glossary: typeGlossary
  },
  {
    id: 'wrappers-autoboxing',
    title: 'Wrapper Types and Autoboxing',
    category: 'deeper',
    icon: '[i]',
    tagline: 'int in a gift box: Integer',
    realWorld: 'Some shelves only take boxes, not loose things. To put a number on that shelf, you put it in a box first. `Integer` is the box for an `int`.',
    definition: 'Each primitive has an object twin: `int` → `Integer`, `double` → `Double`, `boolean` → `Boolean`, `char` → `Character`. Lists need objects, so you write `List<Integer>`, not `List<int>`. Java boxes and unboxes for you. That is autoboxing.',
    why: 'Collections and generics only hold objects.',
    whenUse: 'Inside `<...>` of lists and maps, or when a value may be missing (`null`).',
    fileName: 'Boxing.java',
    code: `import java.util.ArrayList;
import java.util.List;

public class Boxing {
    public static void main(String[] args) {
        List<Integer> scores = new ArrayList<>();
        scores.add(5);              // int 5 is boxed into an Integer
        int first = scores.get(0);  // and unboxed again
        System.out.println(first + 1);

        Integer missing = null;
        // int crash = missing;     // NullPointerException: nothing to unbox
    }
}`,
    keyPoints: ['Use the primitive unless you need an object.', 'Compare Integer values with `.equals(...)`.'],
    commonMistakes: ['Unboxing a null Integer. It crashes.', 'Comparing two Integer objects with ==.'],
    related: ['Collections'],
    glossary: typeGlossary
  },
  {
    id: 'default-values',
    title: 'Default Values',
    category: 'deeper',
    icon: '0',
    tagline: 'Fields start at zero, locals start at nothing',
    realWorld: 'A new class form has empty boxes with 0 already printed in them. A sticky note you are about to write on is just blank.',
    definition: 'Fields of a class get a start value by themselves: `0`, `false` or `null`. Local variables inside a method get nothing. You must give them a value before you read them, or the code does not compile.',
    why: 'It explains the error "variable might not have been initialized".',
    whenUse: 'When the compiler complains about a variable without a value.',
    fileName: 'Defaults.java',
    code: `public class Defaults {
    static int fieldCount;      // starts at 0
    static String fieldName;    // starts at null

    public static void main(String[] args) {
        System.out.println(fieldCount);  // 0
        System.out.println(fieldName);   // null

        int localCount;
        // System.out.println(localCount);  <- does not compile
        localCount = 1;
        System.out.println(localCount);
    }
}`,
    keyPoints: ['Fields: 0, false, null by default.', 'Locals: no default. Assign first.'],
    commonMistakes: ['Forgetting that a String field starts as null, then calling a method on it.'],
    related: ['Classes & Objects'],
    glossary: typeGlossary
  }
);
