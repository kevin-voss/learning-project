// Strings & Text, lesson 3: String Equality.
(function () {
  Java.addCoreLessons('strings', [
    {
      id: 'equality',
      title: 'String Equality',
      category: 'concept',
      icon: '==',
      tagline: 'Use equals for text',
      realWorld: 'Two printed tickets can show the same name, even though they are two separate pieces of paper. "Same name?" and "same piece of paper?" are two different questions.',
      kid: [
        'You and your friend both have a sticker that says "STAR". Are the stickers the same? The words are the same. But there are two stickers: one in your hand, one in hers.',
        'Java can ask both questions. `==` asks: "is this the very same sticker?". `.equals(...)` asks: "do they say the same word?".',
        'For text you nearly always want to know if the words are the same. So you use `.equals(...)`.'
      ],
      definition: 'Compare the text of two Strings with `a.equals(b)`. The operator `==` only checks whether two variables point to the **same object** in memory.',
      explain: [
        'A String variable holds a **reference**: an arrow to an object. `a == b` compares the two arrows. It is `true` only when both point to exactly the same object.',
        '`a.equals(b)` compares the characters, one by one. It is `true` when both texts have the same length and the same characters in the same order.',
        'Java keeps a **string pool**: a shared set of String objects for literals. Every `"Ada"` literal in your program points to the same pooled object. That is why `==` sometimes looks like it works. Text that is made while the program runs (typed input, `new String(...)`, glued with a variable) is a new object, and then `==` says `false`.',
        '`equalsIgnoreCase(b)` compares the letters but treats capital and small letters as equal. `compareTo(b)` tells you which text comes first in sorting order.',
        'Calling a method on `null` (a variable that points to nothing) crashes with a `NullPointerException`. Put the literal first, `"Ada".equals(name)`, and the call is safe even when `name` is `null`.'
      ],
      why: 'Users type text, files contain text, and you need to check it: "is the answer yes?", "is this the right password?". Only `equals` checks the text itself.',
      whenUse: 'Every time you ask "is this text the same as that text?". Use `==` on Strings only when you really mean "the same object", which is rare.',
      syntax: '`a.equals(b)` · `a.equalsIgnoreCase(b)` · `a.compareTo(b)` · `"literal".equals(variable)`',
      fileName: 'StringEquality.java',
      codeSummary: 'Three variables hold the text "Ada": two literals and one `new String`. The program compares them with `==` and `equals`, then tries case, `null` and sorting order.',
      code: `public class StringEquality {
    public static void main(String[] args) {
        String first = "Ada";                 // literal: comes from the string pool
        String second = "Ada";                // same literal: the SAME pooled object
        String third = new String("Ada");     // new: always a brand-new object

        System.out.println(first == second);       // same object?
        System.out.println(first == third);        // same object?
        System.out.println(first.equals(third));   // same letters?

        String typed = "ada";
        System.out.println(first.equals(typed));            // case matters
        System.out.println(first.equalsIgnoreCase(typed));  // case ignored

        String missing = null;
        System.out.println("Ada".equals(missing));   // safe: false, no crash
        System.out.println(first.compareTo("Bob"));  // negative: Ada sorts first
    }
}`,
      output: `true
false
true
false
true
false
-1`,
      codeExplanation: [
        { label: 'Line 3', code: 'String first = "Ada";', text: 'The literal comes from the string pool. If the pool has no "Ada" yet, Java adds it once.' },
        { label: 'Line 4', code: 'String second = "Ada";', text: 'The same literal again. Java reuses the pooled object, so `second` gets the same arrow as `first`.' },
        { label: 'Line 5', code: 'String third = new String("Ada");', text: '`new` always makes a fresh object on the heap, outside the pool, even with the same letters.' },
        { label: 'Line 7', code: 'first == second', text: '`true`: both arrows point to the one pooled object.' },
        { label: 'Line 8', code: 'first == third', text: '`false`: two different objects, even though the letters match.' },
        { label: 'Line 9', code: 'first.equals(third)', text: '`true`: `equals` compares the letters A, d, a with A, d, a.' },
        { label: 'Line 13', code: 'first.equalsIgnoreCase(typed)', text: '`true`: "Ada" and "ada" differ only in capital letters, which this method ignores.' },
        { label: 'Line 16', code: '"Ada".equals(missing)', text: 'The literal is never `null`, so calling `equals` on it is safe. It returns `false` for a `null` argument.' },
        { label: 'Line 17', code: 'first.compareTo("Bob")', text: 'The first characters differ: `\'A\'` (65) minus `\'B\'` (66) is -1. Negative means `first` comes before "Bob".' }
      ],
      sections: [
        {
          title: 'Two questions: same object, or same letters?',
          text: ['Keep the two questions apart. They have different answers more often than you think.'],
          table: {
            head: ['Expression', 'Asks', 'Use it for'],
            rows: [
              ['`a == b`', 'Do both arrows point to the same object?', 'primitives like `int` and `char`; almost never for Strings'],
              ['`a.equals(b)`', 'Are the characters the same?', 'comparing text: answers, names, commands'],
              ['`a.equalsIgnoreCase(b)`', 'Same characters, ignoring capitals?', 'user input like "Yes", "YES", "yes"'],
              ['`a.compareTo(b)`', 'Which one comes first in sorting order?', 'sorting, alphabetical order']
            ]
          }
        },
        {
          title: 'Memory picture: the string pool',
          text: [
            'Variables sit on the **stack** (the short-term memory of the running method). Objects sit on the **heap** (the big storage room). The string pool is a special area of the heap for shared literals.',
            'This is memory after line 5 of the example.'
          ],
          mermaid: `flowchart LR
  subgraph Stack["stack: variables"]
    F["first"]
    S["second"]
    T["third"]
  end
  subgraph Heap["heap: objects"]
    subgraph Pool["string pool"]
      P["String: Ada"]
    end
    N["String: Ada (made by new)"]
  end
  F --> P
  S --> P
  T --> N`,
          diagramNote: '`first` and `second` share one pooled object, so `first == second` is `true`. `third` points to its own object, so `first == third` is `false`. All three hold the same letters, so `equals` is `true` for every pair.'
        },
        {
          title: 'Why == seems to work, until it does not',
          text: [
            'The compiler glues literals that are written next to each other: `"hel" + "lo"` becomes the literal `"hello"` before the program runs. It lands in the pool.',
            'Text glued while the program runs, for example with a variable, is a new object. It looks the same when printed, but `==` says `false`. Typed input and text read from files are always made at run time.'
          ],
          fileName: 'PoolTrap.java',
          code: `public class PoolTrap {
    public static void main(String[] args) {
        String a = "hello";
        String b = "hel" + "lo";      // two literals: the compiler glues them -> pooled
        String part = "hel";
        String c = part + "lo";       // glued while running -> a new object

        System.out.println(c);                  // looks the same...
        System.out.println(a == b);             // same pooled object
        System.out.println(a == c);             // different objects!
        System.out.println(a.equals(c));        // same letters
        System.out.println(a == c.intern());    // intern() returns the pooled copy
    }
}`,
          output: `hello
true
false
true
true`,
          warn: 'A program that uses `==` on Strings can pass every test with literals and then fail with real input. Use `equals` from the start.'
        },
        {
          title: 'Comparing safely when a value can be null',
          text: [
            '`null` means "this variable points to no object". You cannot call a method on nothing: `name.equals("Ada")` with `name == null` stops the program with a `NullPointerException`.',
            'Two safe ways: put the literal first, or use `Objects.equals(a, b)` from `java.util`. An `import` line at the top of the file makes that class available by its short name.'
          ],
          fileName: 'NullSafe.java',
          code: `import java.util.Objects;

public class NullSafe {
    public static void main(String[] args) {
        String name = null;

        System.out.println("Ada".equals(name));          // literal first: safe
        System.out.println(Objects.equals(name, "Ada")); // safe for both sides
        System.out.println(Objects.equals(name, null));  // two nulls count as equal
        // System.out.println(name.equals("Ada"));       // would crash: NullPointerException
    }
}`,
          output: `false
false
true`
        },
        {
          title: 'Sorting order: compareTo',
          text: [
            '`a.compareTo(b)` returns a number. **Negative**: `a` comes first. **Zero**: equal. **Positive**: `b` comes first. Only the sign matters; do not rely on the exact number.',
            'Java walks both texts from index 0 and stops at the first different character. It returns the difference of the two character codes. If one text is the start of the other, the shorter one comes first.',
            'Capital letters have smaller codes than small letters (`\'Z\'` is 90, `\'a\'` is 97). So `"Zoo"` comes before `"apple"`. Use `compareToIgnoreCase` for a dictionary-like order.'
          ],
          fileName: 'CompareDemo.java',
          code: `public class CompareDemo {
    public static void main(String[] args) {
        System.out.println("apple".compareTo("banana"));         // 'a' - 'b' = -1
        System.out.println("banana".compareTo("apple"));         // positive
        System.out.println("cat".compareTo("cat"));              // equal: 0
        System.out.println("Zoo".compareTo("apple"));            // 'Z' - 'a' = -7: capitals first
        System.out.println("Zoo".compareToIgnoreCase("apple"));  // 'z' - 'a' = 25
        System.out.println("car".compareTo("cart"));             // shorter one first: -1

        String x = "pear";
        String y = "fig";
        if (x.compareTo(y) < 0) {
            System.out.println(x + " comes before " + y);
        } else {
            System.out.println(y + " comes before " + x);
        }
    }
}`,
          output: `-1
1
0
-7
25
-1
fig comes before pear`
        }
      ],
      technical: [
        '`==` on two references compares the addresses the arrows point to. It never looks inside the objects.',
        '`String.equals` first checks `this == other` (a quick yes), then checks that the other object is a String, then compares the lengths and finally the bytes. So `equals` is cheap when the texts differ in length.',
        'The string pool lives on the heap. Every literal in a loaded class is placed there once. `intern()` looks a String up in the pool and returns the pooled copy, adding it if needed. You rarely need `intern()`; use `equals`.',
        '`compareTo` comes from the interface `Comparable<String>`. Sorting methods in Java use it to put Strings in order. You meet interfaces in a later topic.'
      ],
      tryIt: {
        steps: [
          'Make `Password.java` with `String secret = "open";` and `String typed = new String("open");`.',
          'Print `secret == typed` and `secret.equals(typed)`.',
          'Set `typed = null;` and print `secret.equals(typed)` and `"open".equals(typed)`.',
          'Print `"Open".compareTo("open")`.'
        ],
        see: '`false`, `true`, `false`, `false` and a negative number (`-32`).'
      },
      check: [
        { q: 'Why can `"hi" == "hi"` print `true`?', a: 'Both literals come from the string pool, so both arrows point to the same object. Text made at run time is not pooled.' },
        { q: 'Which line is safe when `answer` may be `null`: `answer.equals("yes")` or `"yes".equals(answer)`?', a: '`"yes".equals(answer)`. The literal is never `null`; it returns `false` for a `null` argument.' },
        { q: 'What sign does `"dog".compareTo("cat")` have?', a: 'Positive. `\'d\'` comes after `\'c\'`, so `"dog"` sorts after `"cat"`.' }
      ],
      keyPoints: [
        '`equals` compares the letters. `==` compares the arrows.',
        'Literals are pooled, so `==` can look right with literals and fail with real input.',
        '`equalsIgnoreCase` ignores capital vs small letters.',
        'Put the literal first, or use `Objects.equals`, when a value can be `null`.',
        '`compareTo` returns negative, zero or positive for "before", "equal", "after".'
      ],
      commonMistakes: [
        'Using `==` for input: `if (answer == "yes")`. Write `if (answer.equals("yes"))`.',
        'Calling `name.equals("Ada")` when `name` might be `null`. Write `"Ada".equals(name)`.',
        'Comparing `"Yes"` with `"yes"` using `equals` and being surprised by `false`. Use `equalsIgnoreCase`.',
        'Testing `a.compareTo(b) == -1`. Only the sign is promised; test `a.compareTo(b) < 0`.'
      ],
      related: ['Types & Variables', 'immutability', 'common-methods']
    }
  ]);
})();
