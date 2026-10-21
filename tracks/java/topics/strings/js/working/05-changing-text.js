// Strings & Text, lesson 5: Cleaning and Changing Text.
(function () {
  Java.addCoreLessons('strings', [
    {
      id: 'changing-text',
      title: 'Cleaning and Changing Text',
      category: 'practice',
      icon: 'Aa',
      tagline: 'Case, spaces, replace, split and join',
      realWorld: 'A photocopier with buttons: "bigger letters", "remove the white edge", "swap this word". Each press gives you a new copy. The original page stays in the tray.',
      kid: [
        'You have a note that says "  hello  " with lots of empty space around it.',
        'You ask a helper: "please cut off the empty space" and get "hello". You ask: "now in big letters" and get "HELLO". You ask: "change every l to a 1" and get "HE11O".',
        'You can also cut a long note into pieces at every comma, and later glue the pieces together again with a different sign in between.'
      ],
      definition: 'These methods return a changed copy of the text: `toUpperCase`/`toLowerCase` change case, `strip`/`trim` remove spaces at the ends, `replace` swaps parts, `split` cuts into an array, `String.join` glues an array together, `repeat` repeats. `isEmpty` and `isBlank` ask whether there is any text at all.',
      explain: [
        '**Whitespace** means characters you cannot see: spaces, tabs and line breaks. Typed input often has extra whitespace at the start or end. `strip()` removes it from both ends, never from the middle.',
        '`trim()` is the older version of `strip()`. It removes only the plain ASCII whitespace (character codes 32 and lower). `strip()` (Java 11+) also knows the other kinds of whitespace from all languages. Prefer `strip()` in new code.',
        '`replace(old, new)` replaces **every** match, not only the first. It works with single `char`s or with whole texts.',
        '`split(separator)` cuts the text at every separator and returns a `String[]` (an array, as in [Arrays](../arrays/index.html)). The separator itself is dropped. The separator is a **regular expression**: a small pattern language where some characters, like `.`, `|` and `+`, have special meanings.',
        '`String.join(glue, pieces)` is the opposite of `split`: it puts the glue text between the pieces. `isEmpty()` is `true` for `""`. `isBlank()` (Java 11+) is also `true` for text with only whitespace, such as `"   "`.'
      ],
      why: 'Text from people and files is messy: extra spaces, mixed capitals, many values on one line. Clean it first, then compare or use it.',
      whenUse: 'Right after reading input (`strip`, `toLowerCase`), when one line holds several values (`split`), and when you print lists (`join`, `repeat`).',
      syntax: '`text.strip()` · `text.toUpperCase()` · `text.replace(old, new)` · `text.split(sep)` · `String.join(glue, parts)` · `text.repeat(n)`',
      fileName: 'CleanText.java',
      codeSummary: 'A messy text with spaces around it is cleaned, changed in case and edited with `replace`. A comma list is split into an array and glued back. The last lines show `isEmpty`, `isBlank` and `repeat`.',
      code: `public class CleanText {
    public static void main(String[] args) {
        String raw = "   Java Basics   ";

        System.out.println("[" + raw + "]");
        System.out.println("[" + raw.strip() + "]");          // spaces at both ends removed
        System.out.println(raw.strip().toUpperCase());
        System.out.println(raw.strip().toLowerCase());
        System.out.println(raw.strip().replace("Basics", "Rocks"));
        System.out.println(raw.strip().replace(' ', '_'));     // char by char

        String csv = "red,green,blue";
        String[] colors = csv.split(",");                       // cut at every comma
        System.out.println(colors.length + " colors, first: " + colors[0]);
        System.out.println(String.join(" | ", colors));        // glue them back

        System.out.println("".isEmpty());     // no characters at all
        System.out.println("  ".isEmpty());   // two spaces are two characters
        System.out.println("  ".isBlank());   // only whitespace
        System.out.println("-".repeat(10));
    }
}`,
      output: `[   Java Basics   ]
[Java Basics]
JAVA BASICS
java basics
Java Rocks
Java_Basics
3 colors, first: red
red | green | blue
true
false
true
----------`,
      codeExplanation: [
        { label: 'Line 5', code: 'System.out.println("[" + raw + "]");', text: 'The brackets make the three spaces on each side visible.' },
        { label: 'Line 6', code: 'raw.strip()', text: 'A new String without the whitespace at the start and end. The space between the words stays.' },
        { label: 'Line 7', code: 'raw.strip().toUpperCase()', text: 'Chaining: `strip()` returns a String, and `toUpperCase()` is called on that result.' },
        { label: 'Line 9', code: 'replace("Basics", "Rocks")', text: 'Every "Basics" becomes "Rocks". There is one here.' },
        { label: 'Line 10', code: "replace(' ', '_')", text: 'The `char` version swaps every space character for an underscore.' },
        { label: 'Line 13', code: 'String[] colors = csv.split(",");', text: 'Cuts at each comma. The result is an array of three Strings; the commas are gone.' },
        { label: 'Line 15', code: 'String.join(" | ", colors)', text: 'A `static` method called on the class `String`. It puts `" | "` between the pieces.' },
        { label: 'Line 18', code: '"  ".isEmpty()', text: '`false`: two spaces are two characters. Length 2 is not empty.' },
        { label: 'Line 19', code: '"  ".isBlank()', text: '`true`: the text has only whitespace.' },
        { label: 'Line 20', code: '"-".repeat(10)', text: 'Ten dashes in one String, handy for lines under titles.' }
      ],
      sections: [
        {
          title: 'Capital and small letters',
          text: [
            '`toUpperCase()` turns every letter into a capital. `toLowerCase()` turns every letter small. Digits, spaces and symbols stay as they are.',
            'A common use is comparing input: make it small first, then compare with a small literal. That has the same effect as `equalsIgnoreCase`, and it also works for `contains`, `startsWith` and `endsWith`.'
          ],
          table: {
            head: ['Call', 'Result'],
            rows: [
              ['`"Hello 42!".toUpperCase()`', '`"HELLO 42!"`'],
              ['`"Hello 42!".toLowerCase()`', '`"hello 42!"`'],
              ['`"YES".toLowerCase().equals("yes")`', '`true`'],
              ['`"Java Book".toLowerCase().contains("java")`', '`true`']
            ]
          }
        },
        {
          title: 'trim or strip?',
          text: [
            'Both remove whitespace at the ends. They differ for unusual spaces. The example uses `\\u2003`, the "em space" (a wide space used in typesetting). In Java code, `\\u` followed by four hex digits writes any character by its number.',
            '`stripLeading()` removes only the start, `stripTrailing()` only the end.'
          ],
          fileName: 'TrimStrip.java',
          code: `public class TrimStrip {
    public static void main(String[] args) {
        String tabbed = "\\t  hi  \\n";        // tab, spaces, hi, spaces, line break
        String wide = "\\u2003hi\\u2003";      // em space, hi, em space

        System.out.println("[" + tabbed.trim() + "]");
        System.out.println("[" + tabbed.strip() + "]");
        System.out.println(wide.trim().length());    // trim does not know the em space
        System.out.println(wide.strip().length());   // strip does
        System.out.println("[" + "  hi  ".stripLeading() + "]");
        System.out.println("[" + "  hi  ".stripTrailing() + "]");
    }
}`,
          output: `[hi]
[hi]
4
2
[hi  ]
[  hi]`,
          tip: 'Use `strip()` in new code. You see `trim()` a lot in older code and tutorials; for normal spaces, tabs and line breaks both give the same result.'
        },
        {
          title: 'replace: swap every match',
          text: [
            '`replace` changes all matches. `replaceFirst` changes only the first one. Replacing with `""` removes the part.',
            '`replaceAll` and `replaceFirst` treat the first argument as a regular expression. For plain text, `replace` is the safe choice.'
          ],
          fileName: 'ReplaceDemo.java',
          code: `public class ReplaceDemo {
    public static void main(String[] args) {
        String song = "la la la";

        System.out.println(song.replace("la", "na"));       // every match
        System.out.println(song.replaceFirst("la", "na"));  // only the first
        System.out.println(song.replace(" ", ""));          // remove all spaces
        System.out.println(song.replace("x", "y"));         // no match: same text
        System.out.println(song);                           // still la la la
    }
}`,
          output: `na na na
na la la
lalala
la la la
la la la`
        },
        {
          title: 'split and join: from text to pieces and back',
          text: [
            'Many lines hold several values: `"red,green,blue"`, `"Mia 9 Berlin"`, `"2026.10.21"`. `split` turns them into an array you can loop over.',
            'Because the separator is a regular expression, a few characters need care. `"\\\\s+"` means "one or more whitespace characters", which splits words even when there are several spaces. A dot means "any character", so a real dot is written `"\\\\."`.'
          ],
          mermaid: `flowchart LR
  T["String: red,green,blue"] -- "split at every comma" --> A["String array: red / green / blue"]
  A -- "String.join with glue + " --> J["String: red + green + blue"]`,
          diagramNote: '`split` turns one String into an array of Strings. `String.join` turns the array back into one String with new glue.',
          fileName: 'SplitDemo.java',
          code: `import java.util.Arrays;

public class SplitDemo {
    public static void main(String[] args) {
        String sentence = "  the quick   brown fox ";
        String[] words = sentence.strip().split("\\\\s+");  // one or more spaces
        System.out.println(words.length);
        System.out.println(Arrays.toString(words));

        System.out.println("a.b.c".split(".").length);     // 0! "." means any character
        String[] parts = "2026.10.21".split("\\\\.");        // a real dot
        System.out.println(parts[0] + " / " + parts[1] + " / " + parts[2]);

        System.out.println(String.join("-", parts));
        System.out.println(String.join(", ", "Ada", "Bob", "Cy"));
    }
}`,
          output: `4
[the, quick, brown, fox]
0
2026 / 10 / 21
2026-10-21
Ada, Bob, Cy`,
          warn: '`split(".")` and `split("|")` do not do what they look like. Write `split("\\\\.")` and `split("\\\\|")` for a real dot or bar.'
        },
        {
          title: 'Empty, blank and repeat',
          text: ['`isEmpty` and `isBlank` help you reject input with no real content. `repeat` draws lines and boxes.'],
          table: {
            head: ['Text', '`isEmpty()`', '`isBlank()`'],
            rows: [
              ['`""`', '`true`', '`true`'],
              ['`"   "`', '`false`', '`true`'],
              ['`"\\t\\n"`', '`false`', '`true`'],
              ['`"a"`', '`false`', '`false`'],
              ['`null`', 'crash', 'crash']
            ],
            note: 'A `null` variable has no object, so calling any method on it throws a `NullPointerException`. Check `text != null` first if it can be `null`.'
          },
          fileName: 'RepeatBox.java',
          code: `public class RepeatBox {
    public static void main(String[] args) {
        String title = "Menu";
        String line = "+" + "-".repeat(title.length() + 2) + "+";
        System.out.println(line);
        System.out.println("| " + title + " |");
        System.out.println(line);

        String input = "   ";
        if (input.isBlank()) {
            System.out.println("Please type something.");
        }
    }
}`,
          output: `+------+
| Menu |
+------+
Please type something.`
        }
      ],
      technical: [
        '`toUpperCase()` and `toLowerCase()` follow the language rules of the computer (the **locale**). In Turkish, for example, a small `i` becomes `İ`. For program keys that must behave the same everywhere, use `toLowerCase(Locale.ROOT)`.',
        '`split` compiles its separator into a pattern each time. For a one-character separator that is not a special character, Java takes a fast path without the pattern machinery.',
        '`split` drops empty pieces at the **end**: `"a,b,,".split(",")` has length 2. Pass a negative limit, `split(",", -1)`, to keep them.'
      ],
      tryIt: {
        steps: [
          'Make `Tags.java` with `String raw = "  Java, Strings ,LOOPS ";`.',
          'Split it at commas, then `strip()` and `toLowerCase()` every piece in a `for` loop.',
          'Store the clean pieces back into the array and print `String.join(" #", parts)` with a `"#"` in front.'
        ],
        see: '`#java #strings #loops`.'
      },
      check: [
        { q: 'What does `"  hi there  ".strip()` return?', a: '`"hi there"`. The space in the middle stays; only the ends are cleaned.' },
        { q: 'What is the difference between `isEmpty()` and `isBlank()` for `"  "`?', a: '`isEmpty()` is `false` (2 characters). `isBlank()` is `true` (only whitespace).' },
        { q: 'Why is `"1.2.3".split(".").length` 0?', a: 'The separator is a regular expression and `.` matches any character, so everything is a separator and all pieces are empty. Use `split("\\\\.")`.' }
      ],
      keyPoints: [
        'Every one of these methods returns a new String or array; keep the result.',
        '`strip()` removes whitespace at both ends; prefer it over `trim()`.',
        '`replace` changes every match; `replaceFirst` only the first.',
        '`split` cuts into a `String[]`; `String.join` glues it back.',
        '`isBlank()` is the right check for "the user typed nothing useful".'
      ],
      commonMistakes: [
        'Not keeping the result: `input.strip();`. Write `input = input.strip();`.',
        'Splitting at a dot with `split(".")`. Write `split("\\\\.")`.',
        'Splitting words with `split(" ")` when there can be double spaces. Use `strip().split("\\\\s+")`.',
        'Calling `text.isEmpty()` on a `null` variable. Check `text != null && !text.isBlank()`.'
      ],
      related: ['common-methods', 'immutability', 'Arrays', 'looping-chars']
    }
  ]);
})();
