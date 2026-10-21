// Enums, lesson 1: the topic details and why enums exist.
(function () {
  Java.addCoreTopic('enums', {
    label: 'Enums',
    headline: 'Enums,',
    accent: 'a fixed list of choices.',
    intro: 'Some things have only a few possible values: traffic light colours, days of the week, parcel status. An enum writes that list down once, and the compiler guards it.',
    overview: 'Why not Strings → declare and use → switch → built-in methods → enums with data → interfaces → EnumMap and EnumSet → a state machine → what the compiler builds.',
    tryIt: {
      steps: [
        'Make a file `Lights.java` with `enum Light { RED, GREEN, YELLOW }` above `public class Lights`.',
        'Write `static Light next(Light now)` with a `switch` expression that returns the colour after `now` (RED → GREEN → YELLOW → RED). Do not write `default`.',
        'In `main`, start at `Light.RED` and print the next colour four times in a loop.',
        'Add `BLINKING` to the enum and compile again. Read the error, then add the missing case.'
      ],
      see: '`GREEN`, `YELLOW`, `RED`, `GREEN`. After adding BLINKING: `the switch expression does not cover all possible input values` until you add a case for it.'
    },
    check: [
      { q: 'Why is `Status.DELIVRED` better than the String `"DELIVRED"`?', a: 'The enum typo does not compile (`cannot find symbol`). The String typo compiles and becomes a bug that a user finds later.' },
      { q: 'Can you compare enums with `==`?', a: 'Yes. Each constant exists exactly once in the JVM, so `==` is right, fast and safe, also when one side is `null`.' },
      { q: 'What does `Status.valueOf("SHIPPED")` do if there is no SHIPPED?', a: 'It throws `IllegalArgumentException: No enum constant Status.SHIPPED`. Catch it when the text comes from a user or a file.' },
      { q: 'Why should you save `name()` and not `ordinal()` in a file or database?', a: 'The ordinal is only the position in the list. Add or reorder a constant and every saved number means a different constant. The name stays the same.' },
      { q: 'You need a map from each `Day` to a number. Which map fits best?', a: '`EnumMap<Day, Integer>`. It keeps the keys in declaration order and stores them in a small array, which is faster than a `HashMap`.' }
    ]
  }, [
    {
      id: 'enum-why',
      title: 'The Trouble with Magic Values',
      category: 'concept',
      icon: '?',
      tagline: 'Numbers and Strings let any value in',
      realWorld: 'A pizza order form. If it has three tick boxes, small, medium and large, you can only tick one of them. If it has a blank line instead, people write “medum”, “XL” or “huge”, and the kitchen does not know what to do.',
      kid: [
        'Imagine you tell your friend: “Bring me toy number 2.” Your friend does not know which toy is number 2. Maybe it is the car. Maybe it is the ball. Numbers do not say what they mean.',
        'Now you write the word on a note: “bal”. Oops, a typo. Your friend looks for a “bal” and finds nothing. Nobody told you about the typo.',
        'An enum is like a box of picture cards. There is a card for CAR, a card for BALL and a card for DOLL. You can only hand over one of the cards. You cannot hand over a card that does not exist.'
      ],
      definition: 'A **magic value** is a plain number or text that stands for a choice, like `2` for “delivered” or `"DELIVERED"`. Java cannot check it, so wrong values compile and run.',
      explain: [
        'Many programs need a variable with only a few allowed values: the status of a parcel, the size of a pizza, the colour of a traffic light. Before enums existed, programmers used an `int` code (0, 1, 2) or a `String` code ("CREATED", "DELIVERED").',
        'An `int` has about four billion possible values. Your code uses three of them. Nothing stops `status = 7`, and nothing tells you what 7 means. A reader of the code sees `if (status == 2)` and has to guess.',
        'A `String` reads better, but it has the same hole. Any text fits into a String: `"Delivered"`, `"DELIVRED"`, `"delivered "` with a space. `equals` compares character by character, so to Java each of these is a different text, and the comparison returns `false` without any warning.',
        'Both mistakes have one thing in common: the **compiler** (javac, the program that checks and translates your code) cannot see them. The bug shows up at **run time**, when the program already runs, maybe on a user’s computer.',
        'An **enum** (short for enumeration, a list where you count up every allowed value) fixes this. You write the list once. A variable of that type can only hold one of the listed values, and a typo is a compile error. The next lesson shows how to write one.'
      ],
      why: 'Wrong values should be caught by javac while you write the code, not by your users while they use it.',
      whenUse: 'Every time you are about to write an `int` or `String` code for a short, fixed list of choices, stop and write an enum instead.',
      syntax: 'The problem: `int status = 7;` and `String status = "DELIVRED";` both compile. The fix: `enum Status { CREATED, PICKED_UP, DELIVERED }`.',
      fileName: 'MagicValues.java',
      code: `public class MagicValues {
    // 0 = created, 1 = picked up, 2 = delivered
    static String describe(int status) {
        if (status == 0) return "waiting for pickup";
        if (status == 1) return "on the way";
        if (status == 2) return "delivered";
        return "???";
    }

    static boolean isDone(String status) {
        return status.equals("DELIVERED");
    }

    public static void main(String[] args) {
        int parcelA = 1;
        int parcelB = 7;                 // compiles, but 7 means nothing
        System.out.println(describe(parcelA));
        System.out.println(describe(parcelB));

        String parcelC = "DELIVERED";
        String parcelD = "Delivered";    // other spelling
        String parcelE = "DELIVRED";     // typo
        System.out.println(isDone(parcelC));
        System.out.println(isDone(parcelD));
        System.out.println(isDone(parcelE));
    }
}`,
      output: `on the way
???
true
false
false`,
      codeSummary: 'Two kinds of magic values. Both bugs compile without a single warning.',
      codeExplanation: [
        { label: 'Line 2', code: '// 0 = created, 1 = picked up, 2 = delivered', text: 'The meaning of the numbers lives only in a comment. The compiler does not read comments.' },
        { label: 'Line 3', code: 'static String describe(int status) {', text: 'The parameter is an `int`. Any of about four billion numbers can come in, not only 0, 1 and 2.' },
        { label: 'Line 7', code: 'return "???";', text: 'The method needs a fallback for all the numbers that mean nothing. That is a sign the type is too wide.' },
        { label: 'Line 11', code: 'return status.equals("DELIVERED");', text: '`equals` compares the text character by character. Upper and lower case count, a missing letter counts.' },
        { label: 'Line 16', code: 'int parcelB = 7;                 // compiles, but 7 means nothing', text: 'This compiles. Java has no idea that only 0, 1 and 2 are allowed.' },
        { label: 'Line 18', code: 'System.out.println(describe(parcelB));', text: 'Prints `???`. The bug shows up at run time, not when you compile.' },
        { label: 'Line 21', code: 'String parcelD = "Delivered";    // other spelling', text: 'The parcel is delivered, but the spelling is different.' },
        { label: 'Line 22', code: 'String parcelE = "DELIVRED";     // typo', text: 'A typo. It compiles, because any text fits into a String.' },
        { label: 'Lines 24–25', code: 'System.out.println(isDone(parcelD));', text: 'Both print `false`. Two delivered parcels count as not done, and nobody gets an error message.' }
      ],
      sections: [
        {
          title: 'Named int constants help a little',
          text: [
            'A first improvement is to give the numbers names with `static final int` (a constant: a value that never changes). Now the code says `CREATED` instead of `0`.',
            'But the type of the variable is still `int`. Any other `int` still fits, also a constant from a completely different list. The program below mixes up a parcel status and a priority, and Java is fine with it.'
          ],
          fileName: 'IntConstants.java',
          code: `public class IntConstants {
    static final int CREATED = 0;
    static final int PICKED_UP = 1;
    static final int DELIVERED = 2;

    static final int PRIORITY_LOW = 0;
    static final int PRIORITY_HIGH = 2;

    static String describe(int status) {
        if (status == CREATED) return "waiting for pickup";
        if (status == PICKED_UP) return "on the way";
        if (status == DELIVERED) return "delivered";
        return "???";
    }

    public static void main(String[] args) {
        System.out.println(describe(PICKED_UP));
        // a priority is passed where a status belongs:
        System.out.println(describe(PRIORITY_HIGH));
    }
}`,
          output: `on the way
delivered`,
          warn: 'The second line prints `delivered`, because `PRIORITY_HIGH` is also the number 2. The names help the reader, but the compiler still sees only numbers.'
        },
        {
          title: 'Three ways to store a choice',
          text: ['Here is how the three ways compare. An enum wins in every row.'],
          table: {
            head: ['Question', '`int` code', '`String` code', '`enum`'],
            rows: [
              ['Does a typo compile?', 'yes (`7`)', 'yes (`"DELIVRED"`)', '**no**'],
              ['Can a value from another list sneak in?', 'yes', 'yes', '**no**'],
              ['What does `println` show?', '`2`', '`DELIVERED`', '`DELIVERED`'],
              ['Can the editor list all choices for you?', 'no', 'no', '**yes**'],
              ['Can you loop over all choices?', 'only by hand', 'only by hand', '**yes**, with `values()`']
            ],
            note: 'The editor (IntelliJ, VS Code) shows all constants of an enum when you type `Status.`. With codes you have to remember them.'
          }
        },
        {
          title: 'The same program with an enum',
          text: [
            'Here is the parcel program again, now with an enum. Read it once; the next lesson explains every part.',
            'The type `Status` has exactly three values. The method `isDone` cannot receive a spelling mistake, because there is no way to write one that compiles.'
          ],
          fileName: 'EnumValues.java',
          code: `enum Status { CREATED, PICKED_UP, DELIVERED }

public class EnumValues {
    static boolean isDone(Status status) {
        return status == Status.DELIVERED;
    }

    public static void main(String[] args) {
        Status parcelA = Status.PICKED_UP;
        Status parcelB = Status.DELIVERED;
        System.out.println(parcelA + " done? " + isDone(parcelA));
        System.out.println(parcelB + " done? " + isDone(parcelB));
        // Each of these three lines does not compile:
        // Status parcelC = Status.DELIVRED;
        // Status parcelD = 7;
        // Status parcelE = "DELIVERED";
    }
}`,
          output: `PICKED_UP done? false
DELIVERED done? true`
        },
        {
          title: 'What javac says about the typo',
          text: [
            'Remove the `//` in front of the `DELIVRED` line and compile. javac stops and points at the exact spot. You fix the typo in ten seconds, long before any user sees the program.'
          ],
          codeLanguage: 'text',
          fileName: 'javac output',
          code: `EnumValues.java:14: error: cannot find symbol
        Status parcelC = Status.DELIVRED;
                               ^
  symbol:   variable DELIVRED
  location: class Status
1 error`,
          mermaid: `flowchart LR
  A["You type a wrong value"] --> B{"Which type?"}
  B -- "int or String" --> C["javac: OK"]
  C --> D["Program runs"]
  D --> E["Bug at run time, maybe at a user"]
  B -- "enum" --> F["javac: cannot find symbol"]
  F --> G["You fix it now"]`,
          diagramNote: 'With codes, the mistake travels all the way to run time. With an enum, it stops at the compiler.'
        }
      ],
      technical: [
        'For javac, an `int` is an `int` and a `String` is a `String`. It checks that the **types** match, not the values. `describe(7)` passes an `int` to an `int` parameter, so the call is correct as far as the compiler can tell.',
        'An enum is its own type. `Status` is a class with exactly three objects, and javac knows their names. When you write `Status.DELIVRED`, javac looks up a field with that name in the class `Status`, finds none and reports `cannot find symbol`. A `String` or an `int` cannot even be assigned to a `Status` variable: `incompatible types: String cannot be converted to Status`.',
        'At run time a String comparison with `equals` walks through the characters one by one. An enum comparison with `==` compares two memory addresses, which is a single fast step. So the enum is safer and also a little faster.'
      ],
      tryIt: {
        steps: [
          'Copy `MagicValues.java`, compile it with `javac MagicValues.java` and run it with `java MagicValues`.',
          'Change `parcelB` to `-1` and run it again. It still compiles.',
          'Copy `EnumValues.java` and run it.',
          'Remove the `//` in front of the line with `DELIVRED` and compile.'
        ],
        see: 'The magic-value program prints `???` and `false` without any warning. The enum program refuses to compile with `cannot find symbol ... variable DELIVRED`.'
      },
      check: [
        { q: 'What is a magic value?', a: 'A plain number or text that stands for a choice, like `2` for “delivered”. Its meaning lives only in your head or in a comment.' },
        { q: 'Why does `int parcelB = 7;` compile, even if only 0, 1 and 2 are allowed?', a: 'javac checks types, not meanings. 7 is an `int`, the variable is an `int`, so everything matches.' },
        { q: 'Why is `static final int DELIVERED = 2;` only a small improvement?', a: 'The code reads better, but the type is still `int`. Any number, also a constant from a different list, still fits.' }
      ],
      keyPoints: [
        'Magic numbers and magic strings compile even when they are wrong.',
        'Named `int` constants help the reader, not the compiler.',
        'An enum is its own type with a fixed list of values.',
        'With an enum, typos and unknown values are compile errors.'
      ],
      commonMistakes: [
        '`if (status.equals("Delivered"))` when the data says `"DELIVERED"`. Case matters for Strings. Use an enum and compare with `==`.',
        '`int status = 7;` with no check. Nothing stops the wrong number. Use an enum type for the variable.',
        'Passing `PRIORITY_HIGH` where a status belongs. Both are `int`, so Java accepts it. Give each list its own enum type.'
      ],
      related: ['Types & Variables', 'Strings', 'Control Flow']
    }
  ]);
})();
