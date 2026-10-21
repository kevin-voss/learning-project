// Strings & Text, lesson 2: Strings Never Change.
(function () {
  Java.addCoreLessons('strings', [
    {
      id: 'immutability',
      title: 'Strings Never Change',
      category: 'concept',
      icon: 'lock',
      tagline: 'Every change makes a new String',
      realWorld: 'A String is a printed label. You cannot change the letters on it. If you want different text, you print a new label and stick it where the old one was.',
      kid: [
        'Imagine a birthday card that is already printed. You cannot rub out the words.',
        'If you want a card that shouts the same words in big letters, you print a new card. The old card is still there, with its small letters.',
        'Java Strings are like printed cards. Methods like `toUpperCase()` print a new card and hand it to you. If you do not keep the new card, it is gone.'
      ],
      definition: 'Strings are **immutable**: once a String object exists, its characters never change. Every method that seems to change a String returns a new String instead.',
      explain: [
        '**Immutable** means "cannot be changed". Java has no method that changes the characters inside an existing String.',
        'When you call `name.toUpperCase()`, Java makes a new String object with the capital letters and **returns** it (hands it back to you). The object that `name` points to stays the same.',
        'To use the new text, store it: `String loud = name.toUpperCase();`. Or let the same variable point to it: `name = name.toUpperCase();`. That second form does not change the old String. It moves the arrow of `name` to the new one.',
        'The old String does not disappear at once. When no variable points to it any more, the **garbage collector** (a helper inside the JVM that frees memory) removes it later.',
        'The same is true for `+` and `+=`: `a = a + "x"` makes a brand-new String and moves `a` to it.'
      ],
      why: 'A String that can never change is safe to share. Many variables, methods and even the JVM itself can use the same String without one of them spoiling it for the others.',
      whenUse: 'Every time you call a String method: keep the result, or the work is lost.',
      syntax: '`text = text.method(...);` or `String result = text.method(...);`',
      fileName: 'Immutable.java',
      codeSummary: 'The program calls `toUpperCase()` without keeping the result, then keeps it in a new variable, then moves the old variable to it. At the end two variables show that `+` makes a new String too.',
      code: `public class Immutable {
    public static void main(String[] args) {
        String name = "mia";
        name.toUpperCase();                 // makes "MIA" ... and throws it away
        System.out.println(name);           // still mia

        String loud = name.toUpperCase();   // keep the new String in a variable
        System.out.println(loud);
        System.out.println(name);           // the old String is unchanged

        name = name.toUpperCase();          // move the arrow of name to the new String
        System.out.println(name);

        String a = "sun";
        String b = a;                       // b points to the same String as a
        a = a + "flower";                   // a now points to a NEW String
        System.out.println(a);
        System.out.println(b);              // b still sees the old one
    }
}`,
      output: `mia
MIA
mia
MIA
sunflower
sun`,
      codeExplanation: [
        { label: 'Line 3', code: 'String name = "mia";', text: 'One String object with the letters m, i, a. The variable `name` points to it.' },
        { label: 'Line 4', code: 'name.toUpperCase();', text: 'Java builds a new String "MIA" and returns it. Nobody keeps it, so it is lost. This line has no visible effect.' },
        { label: 'Line 5', code: 'System.out.println(name);', text: 'Prints `mia`: the original was never changed.' },
        { label: 'Line 7', code: 'String loud = name.toUpperCase();', text: 'Again a new String "MIA", but this time the variable `loud` keeps it.' },
        { label: 'Line 11', code: 'name = name.toUpperCase();', text: 'The right side makes a new String. The `=` moves `name` to it. The old "mia" object still exists until the garbage collector removes it.' },
        { label: 'Line 15', code: 'String b = a;', text: 'Copies the arrow, not the text. Now `a` and `b` point to the same "sun" object.' },
        { label: 'Line 16', code: 'a = a + "flower";', text: 'Concatenation makes a new String "sunflower". Only `a` moves to it.' },
        { label: 'Line 18', code: 'System.out.println(b);', text: 'Prints `sun`. Nothing could change the object `b` points to, because Strings are immutable.' }
      ],
      sections: [
        {
          title: 'A method hands you a new String',
          text: [
            'Read `name.toUpperCase()` as a question: "what would this text look like in capitals?". Java answers with a new String. The question does not change `name`.',
            'The diagram shows memory after line 7 of the example. There are two String objects now.'
          ],
          mermaid: `flowchart LR
  N["variable name"] --> O1["String object: mia"]
  O1 -- "toUpperCase() builds" --> O2["new String object: MIA"]
  L["variable loud"] --> O2`,
          diagramNote: '`toUpperCase()` reads the old object and builds a second one. `loud` points to the new object; `name` still points to the old one.'
        },
        {
          title: 'Moving the arrow: reassigning',
          text: [
            'When you write `name = name.toUpperCase();`, two things happen in order. First, the right side builds the new String. Then `=` makes `name` point to it.',
            'The old object now has no arrow pointing to it. Your program cannot reach it any more, so the garbage collector frees its memory later.'
          ],
          mermaid: `flowchart TD
  subgraph Before["before the line runs"]
    N1["name"] --> A1["String: mia"]
  end
  subgraph After["after name = name.toUpperCase()"]
    N2["name"] --> B2["String: MIA"]
    A2["String: mia (no arrow, freed later)"]
  end
  Before --> After`,
          diagramNote: 'The text "mia" was never edited. A new object was made and the variable moved to it.'
        },
        {
          title: 'Wrong vs right',
          text: ['Every String method follows this rule, not only `toUpperCase()`. Here are the most common forgotten results.'],
          table: {
            head: ['Wrong (result lost)', 'Right (result kept)'],
            rows: [
              ['`input.trim();`', '`input = input.trim();`'],
              ['`city.toLowerCase();`', '`String lower = city.toLowerCase();`'],
              ['`text.replace("a", "b");`', '`text = text.replace("a", "b");`'],
              ['`name.concat("!");`', '`name = name.concat("!");`']
            ],
            note: 'The compiler accepts the wrong column. It is legal Java; it only does nothing useful.'
          },
          fileName: 'KeepResult.java',
          code: `public class KeepResult {
    public static void main(String[] args) {
        String input = "  yes  ";
        input.trim();                          // wrong: result thrown away
        System.out.println("[" + input + "]");

        input = input.trim();                  // right: keep the result
        System.out.println("[" + input + "]");

        String s = "a";
        s += "b";                              // a new String "ab"
        s += "c";                              // another new String "abc"
        System.out.println(s);
    }
}`,
          output: `[  yes  ]
[yes]
abc`,
          tip: 'The square brackets around the output make spaces visible. Use this trick whenever spaces matter.'
        },
        {
          title: 'Passing a String to a method',
          text: [
            'A method gets a copy of the arrow, not the String itself. Even if the method moves its own copy of the arrow, the caller\'s variable still points to the old text.',
            'If a method should produce changed text, it **returns** the new String, and the caller stores it. You know `return` from [Methods](../methods/index.html).'
          ],
          fileName: 'ShoutTest.java',
          code: `public class ShoutTest {
    static void shout(String text) {
        text = text.toUpperCase();             // moves only the method's own arrow
        System.out.println("inside: " + text);
    }

    static String shouted(String text) {
        return text.toUpperCase();             // hand the new String back
    }

    public static void main(String[] args) {
        String word = "hey";
        shout(word);
        System.out.println("outside: " + word);

        word = shouted(word);
        System.out.println("after return: " + word);
    }
}`,
          output: `inside: HEY
outside: hey
after return: HEY`
        },
        {
          title: 'Why immutable is a good idea',
          bullets: [
            '**Safe sharing.** Many variables can point to one String. None of them can spoil it for the others.',
            '**The string pool.** Java can keep one copy of each literal and share it, because nobody can change it. The equality lesson shows this.',
            '**Fast lookups.** A String can remember its own hash code (a number used by collections to find things quickly), because the text never changes.',
            '**Safe in parallel.** When two parts of a program run at the same time, neither can change a String under the other one\'s feet.',
            '**The cost:** building a long text piece by piece makes many short-lived objects. For that you use `StringBuilder`, in the last lesson of this topic.'
          ]
        }
      ],
      technical: [
        'The `String` class is declared `final`, so nobody can write a subclass that changes its behaviour. Its characters sit in a `private final byte[]` field, and no method of the class writes into that array after the object is built.',
        'Methods like `toUpperCase()`, `trim()`, `replace(...)` and `substring(...)` build a new array and wrap it in a new String. If nothing would change (for example `"abc".trim()`), many of them return the same object instead of a copy.',
        'An object that no variable can reach any more is **garbage**. The garbage collector runs from time to time inside the JVM and frees that memory. You never delete a String yourself.'
      ],
      tryIt: {
        steps: [
          'Make `Keep.java` with `String city = "berlin";`.',
          'Call `city.toUpperCase();` on its own line and print `city`.',
          'Change the line to `city = city.toUpperCase();` and run again.'
        ],
        see: 'first `berlin`, then after the change `BERLIN`.'
      },
      check: [
        { q: 'What does `s` hold after `String s = "hi"; s.concat("!");`?', a: '`"hi"`. `concat` returns a new String `"hi!"`, but nobody stores it.' },
        { q: 'Does `name = name.toUpperCase();` change the old String object?', a: 'No. It makes a new object and moves `name` to it. The old object is unchanged and is freed later.' },
        { q: 'After `String a = "x"; String b = a; a += "y";` what is `b`?', a: '`"x"`. `+=` made a new String for `a`; `b` still points to the old one.' }
      ],
      keyPoints: [
        'A String object never changes after it is made.',
        'String methods return a new String. Keep the result in a variable.',
        '`name = name.method()` moves the variable to a new object.',
        '`+` and `+=` also make new Strings.',
        'Old Strings with no arrow left are freed by the garbage collector.'
      ],
      commonMistakes: [
        'Calling a method without using the result: `name.trim();`. Write `name = name.trim();`.',
        'Expecting a `void` method to change the caller\'s String: `shout(word)` cannot change `word`. Return the new String instead.',
        'Thinking `b` changes when `a += "y"` runs. Only `a` moves to the new object.',
        'Building a long text with `+=` in a big loop. It works, but makes many objects. Use `StringBuilder`.'
      ],
      related: ['what-is-a-string', 'equality', 'builder-format', 'Methods']
    }
  ]);
})();
