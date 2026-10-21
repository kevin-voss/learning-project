// Lesson 04: String as a variable type (concatenation, immutability, equals). The full home is the Strings topic.
(function () {
  const topic = Java.topics.typesAndVariables;

  topic.lessons.push({
    num: '04',
    id: 'string',
    title: 'String',
    category: 'values',
    icon: '""',
    tagline: 'Text in double quotes',
    realWorld: 'A String is like a printed name label. You can read it and you can print a new label from it, but you cannot change the letters on a label that is already printed.',
    kid: [
      'Numbers go in number boxes. Words and sentences go in a String box. You write the words inside double quotes, like `"Hello"`.',
      'You can glue Strings together with `+`, like gluing two paper strips: `"Hello" + " " + "Mia"` makes `"Hello Mia"`.',
      'A String never changes. If you want a shouting version, Java prints a new label `"HELLO"` for you. The old label stays as it was.'
    ],
    definition: '`String` is the type for text: a row of characters such as `"Mia"` or `"Hello, world!"`. It is not a primitive. It is a **class**, so a String value is an **object** with its own methods, like `length()`.',
    explain: [
      'You declare a String variable like any other: `String name = "Mia";`. `String` starts with a capital S, because it is a class. A **class** is a blueprint for objects (you learn to write your own in [Classes & Objects](../classes-and-objects/index.html)).',
      'The `+` operator glues Strings together. This is called **concatenation**. If one side of `+` is a String, the other side is turned into text too: `"Age: " + 9` gives `"Age: 9"`.',
      'A String has **methods**: actions you call with a dot after the variable name. `name.length()` gives the number of characters, `name.toUpperCase()` gives a new String in capitals.',
      'Strings are **immutable**: once made, the characters of a String object never change. Methods like `toUpperCase()` return a new String. To "change" a variable, you reassign it to a new String.',
      'To compare two Strings for the same text, use `a.equals(b)`, not `a == b`. You see why in the lesson Primitives vs Reference Types. The full story of text lives in [Strings & Text](../strings/index.html).'
    ],
    why: 'Almost every program shows text to a person: names, messages, menus, errors.',
    whenUse: 'Names, words, sentences, anything a person reads. Also for one letter if you want to glue it to other text.',
    syntax: '`String name = "text";` · glue with `+` · methods with a dot: `name.length()`, `name.toUpperCase()` · compare with `a.equals(b)`',
    fileName: 'StringBasics.java',
    code: `public class StringBasics {
    public static void main(String[] args) {
        String firstName = "Mia";
        String lastName = "Stone";
        int age = 9;

        // + glues Strings together (concatenation)
        String fullName = firstName + " " + lastName;
        System.out.println(fullName);

        // A number next to a String becomes text
        String intro = fullName + " is " + age + " years old";
        System.out.println(intro);

        // Strings are objects: they have methods
        System.out.println(fullName.length());
        System.out.println(fullName.toUpperCase());
        System.out.println(fullName);

        // Reassign the variable to a new String
        firstName = "Leo";
        System.out.println(firstName + " " + lastName);
    }
}`,
    output: `Mia Stone
Mia Stone is 9 years old
9
MIA STONE
Mia Stone
Leo Stone`,
    codeSummary: 'Two names are glued into one, a number joins the text, two methods are called, and one variable is reassigned.',
    codeExplanation: [
      { label: 'Line 3', code: 'String firstName = "Mia";', text: 'Declares a String variable and initializes it with a String literal.' },
      { label: 'Line 8', code: 'String fullName = firstName + " " + lastName;', text: 'Concatenation: `"Mia"` + `" "` + `"Stone"` gives the new String `"Mia Stone"`. Do not forget the space in the middle.' },
      { label: 'Line 12', code: 'String intro = fullName + " is " + age + " years old";', text: 'The `int` 9 is next to a String, so Java turns it into the text `"9"` and glues it in.' },
      { label: 'Line 16', code: 'System.out.println(fullName.length());', text: '`length()` counts characters, the space included: 3 + 1 + 5 = 9.' },
      { label: 'Line 17', code: 'System.out.println(fullName.toUpperCase());', text: 'Returns a new String in capitals. It does not change `fullName`.' },
      { label: 'Line 18', code: 'System.out.println(fullName);', text: 'Proof: `fullName` is still `"Mia Stone"`. Strings are immutable.' },
      { label: 'Line 21', code: 'firstName = "Leo";', text: 'The variable now refers to a different String. The String `"Mia"` itself was never changed.' },
      { label: 'Line 22', code: 'System.out.println(firstName + " " + lastName);', text: 'Builds a new String from the current values.' }
    ],
    sections: [
      {
        title: '+ works from left to right',
        text: [
          'Java reads `+` from left to right. As long as both sides are numbers, `+` adds. As soon as one side is a String, `+` glues, and everything after that is glued as text.',
          'Parentheses change the order: the part inside `( )` is worked out first.'
        ],
        fileName: 'PlusOrder.java',
        code: `public class PlusOrder {
    public static void main(String[] args) {
        System.out.println(1 + 2 + "3");     // 3 + "3"
        System.out.println("1" + 2 + 3);     // "12" + 3
        System.out.println("1" + (2 + 3));   // "1" + 5
        System.out.println("Sum: " + 2 + 3);
        System.out.println("Sum: " + (2 + 3));
    }
}`,
        output: `33
123
15
Sum: 23
Sum: 5`,
        warn: '`"Sum: " + 2 + 3` prints `Sum: 23`, not `Sum: 5`. Put maths in parentheses when you glue it to text.'
      },
      {
        title: 'A String never changes',
        text: [
          'A String variable does not hold the letters directly. It holds a **reference**, an arrow to a String object somewhere in memory. When you reassign the variable, the arrow moves to a new object. The old object is not touched.',
          'This picture shows line 21 of the example: `firstName = "Leo";`.'
        ],
        mermaid: `flowchart LR
  F["firstName"] -.->|old arrow| M["String object 'Mia'"]
  F -->|new arrow| L["String object 'Leo'"]
  U["fullName"] --> S["String object 'Mia Stone'"]`,
        diagramNote: '`fullName` was built before line 21, so it still says "Mia Stone". Changing `firstName` later does not change Strings that were already made.'
      },
      {
        title: 'Compare text with equals, not ==',
        text: [
          '`==` on Strings asks "do both arrows point to the very same object?". `equals` asks "do both Strings have the same letters?". You almost always want the second question.',
          'Below, `new String("yes")` makes a brand new String object, like text a user types on the keyboard. It has the same letters as `"yes"`, but it is a different object.'
        ],
        fileName: 'CompareText.java',
        code: `public class CompareText {
    public static void main(String[] args) {
        String typed = new String("yes");   // a new object, like keyboard input
        String expected = "yes";

        System.out.println(typed == expected);
        System.out.println(typed.equals(expected));
        System.out.println("YES".equalsIgnoreCase(expected));
    }
}`,
        output: `false
true
true`,
        tip: '`equalsIgnoreCase` treats capital and small letters as the same. Handy for answers like "Yes", "YES" or "yes".'
      },
      {
        title: 'First methods to know',
        text: 'A String has many methods. These six are enough for now. Positions start at 0, so the first character is at position 0.',
        table: {
          head: ['Method', 'Example with `s = "Java"`', 'Result'],
          rows: [
            ['`length()`', '`s.length()`', '`4`'],
            ['`toUpperCase()`', '`s.toUpperCase()`', '`"JAVA"`'],
            ['`toLowerCase()`', '`s.toLowerCase()`', '`"java"`'],
            ['`charAt(i)`', '`s.charAt(0)`', "`'J'` (a char)"],
            ['`isEmpty()`', '`"".isEmpty()`', '`true`'],
            ['`equals(other)`', '`s.equals("Java")`', '`true`']
          ],
          note: 'All of them leave `s` unchanged. Many more methods are in [Strings & Text](../strings/index.html).'
        }
      }
    ],
    technical: [
      '`String` is the class `java.lang.String`. Everything in `java.lang` is imported automatically, so you never write an `import` for it. Inside, a String object keeps its characters in a byte array. Since Java 9, text with only simple Latin letters uses 1 byte per character, other text 2 bytes (this is called **compact strings**).',
      'Because Strings are immutable, the JVM can safely share them. Every String literal goes into the **string pool** once, and all variables with the same literal point to that one object. `new String("yes")` forces a separate object, which is why `==` gave `false` above.',
      'The compiler turns `a + " " + b` into one call that builds the result in a single step (since Java 9 it uses `invokedynamic` with `StringConcatFactory`). In a long loop that glues many pieces, use `StringBuilder` instead: you learn it in Strings & Text.'
    ],
    tryIt: {
      steps: [
        'Copy `StringBasics.java` and change the names to your own.',
        'Add `System.out.println("Next year: " + age + 1);` and run.',
        'Change it to `"Next year: " + (age + 1)` and run again.'
      ],
      see: 'first `Next year: 91` (glued as text), then the right answer `Next year: 10`.'
    },
    check: [
      { q: 'What does `"Score: " + 4 + 2` print?', a: '`Score: 42`. After the String, every `+` glues text. Write `"Score: " + (4 + 2)` for `Score: 6`.' },
      { q: 'After `String s = "hi"; s.toUpperCase();` what is `s`?', a: 'Still `"hi"`. `toUpperCase()` returns a new String, and this code throws it away. Write `s = s.toUpperCase();` to keep it.' },
      { q: 'Why should you compare Strings with `equals` and not `==`?', a: '`==` checks whether both variables point to the same object. `equals` checks whether the letters are the same.' }
    ],
    keyPoints: [
      '`String` holds text in double quotes and starts with a capital S.',
      '`+` glues text. With a String on one side, numbers become text.',
      '`+` works left to right. Use parentheses for maths inside text.',
      'Strings are immutable: methods return new Strings.',
      'Compare text with `.equals(...)`.'
    ],
    commonMistakes: [
      "Single quotes around text: `String s = 'Hi';`. Fix: `String s = \"Hi\";`.",
      'Lowercase type: `string name = "Mia";`. Fix: `String` with a capital S.',
      'Calling a method and ignoring the result: `name.toUpperCase();`. Fix: `name = name.toUpperCase();`.',
      'Comparing with `==`: `if (answer == "yes")`. Fix: `answer.equals("yes")`.'
    ],
    related: ['Literals', 'Primitives vs Reference Types', 'Strings & Text'],
    glossary: topic.glossary
  });
})();
