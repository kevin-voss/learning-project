// Strings & Text, lesson 4: Finding and Cutting Text.
(function () {
  Java.addCoreLessons('strings', [
    {
      id: 'common-methods',
      title: 'Finding and Cutting Text',
      category: 'practice',
      icon: 'abc',
      tagline: 'Search, check and cut out pieces',
      realWorld: 'A ruler on a long paper strip. You find where a word starts, then cut with scissors between two marks of the ruler.',
      kid: [
        'Your word is written on a long paper strip with numbers under every letter.',
        'You can ask: "where is the first o?" and get its number. You can ask: "is the word World on the strip?" and get yes or no.',
        'You can also cut a piece out. You say where to start cutting and where to stop. The strip itself stays whole, because you cut a copy.'
      ],
      definition: 'String methods answer questions about text (`length`, `charAt`, `indexOf`, `contains`, `startsWith`, `endsWith`) and cut pieces out of it (`substring`). They never change the original.',
      explain: [
        '`indexOf("o")` returns the index of the first `"o"`. If the text is not there, it returns **-1**, a number that can never be a real index. `lastIndexOf` searches from the end.',
        '`contains`, `startsWith` and `endsWith` return a `boolean` (`true` or `false`), so they fit straight into an `if`.',
        '`substring(begin, end)` returns a new String with the characters from index `begin` up to, **but not including**, index `end`. The length of the piece is always `end - begin`. `substring(begin)` goes to the end of the text.',
        'All of these methods are **case-sensitive**: `"Java".contains("java")` is `false`. Make both sides small letters first if case should not matter.',
        'Methods can be **chained**: `text.substring(7).toUpperCase()` calls `toUpperCase()` on the result of `substring(7)`.'
      ],
      why: 'Real text has structure: an email has an `@`, a file name has an ending, a date has dots. These methods let you find the structure and take it apart.',
      whenUse: 'Checking input ("does it start with http?"), finding a separator, taking out a first name, a file ending or a part of a code.',
      syntax: '`text.indexOf(part)` · `text.contains(part)` · `text.substring(begin, end)` · `text.substring(begin)`',
      fileName: 'StringMethods.java',
      codeSummary: 'One text, "Hello, World", is asked eleven questions. The last line shows that none of them changed it.',
      code: `public class StringMethods {
    public static void main(String[] args) {
        String text = "Hello, World";

        System.out.println(text.length());            // how many characters
        System.out.println(text.charAt(7));           // the character at index 7
        System.out.println(text.indexOf("o"));        // first o
        System.out.println(text.lastIndexOf("o"));    // last o
        System.out.println(text.indexOf("cat"));      // not found
        System.out.println(text.contains("World"));
        System.out.println(text.startsWith("Hell"));
        System.out.println(text.endsWith("!"));
        System.out.println(text.substring(7));        // from 7 to the end
        System.out.println(text.substring(0, 5));     // 0 up to (not including) 5
        System.out.println(text);                     // unchanged
    }
}`,
      output: `12
W
4
8
-1
true
true
false
World
Hello
Hello, World`,
      codeExplanation: [
        { label: 'Line 5', code: 'text.length()', text: '12: H-e-l-l-o, the comma, the space and W-o-r-l-d. Spaces and commas count as characters.' },
        { label: 'Line 6', code: 'text.charAt(7)', text: 'Index 7 is W (0 is H, 5 is the comma, 6 is the space).' },
        { label: 'Line 7', code: 'text.indexOf("o")', text: 'The first o is in "Hello", at index 4.' },
        { label: 'Line 8', code: 'text.lastIndexOf("o")', text: 'Searching from the end finds the o of "World" at index 8.' },
        { label: 'Line 9', code: 'text.indexOf("cat")', text: '"cat" is not in the text, so the answer is -1.' },
        { label: 'Line 10', code: 'text.contains("World")', text: 'A yes/no question: `true`.' },
        { label: 'Line 12', code: 'text.endsWith("!")', text: '`false`: the text ends with "d", not "!".' },
        { label: 'Line 13', code: 'text.substring(7)', text: 'One index: cut from 7 to the end. Result "World".' },
        { label: 'Line 14', code: 'text.substring(0, 5)', text: 'Two indexes: from 0 up to 4. Index 5 (the comma) is not included. Result "Hello", length `5 - 0`.' },
        { label: 'Line 15', code: 'System.out.println(text);', text: 'All methods returned new values. The original is the same as before.' }
      ],
      sections: [
        {
          title: 'substring: cut between two fences',
          text: [
            'Think of the indexes as fences **before** each character. `substring(0, 5)` cuts at fence 0 and fence 5. Everything between is kept: indexes 0, 1, 2, 3, 4.',
            'This is why `end` is not included, and why the piece has exactly `end - begin` characters.'
          ],
          mermaid: `flowchart LR
  subgraph Kept["substring(0, 5) keeps index 0 to 4"]
    direction LR
    H["0: H"] --- E["1: e"] --- L1["2: l"] --- L2["3: l"] --- O["4: o"]
  end
  O -.-|"cut at 5"| C["5: ,"]
  C --- SP["6: space"] --- W["7: W"]`,
          diagramNote: 'The cut at 5 sits between `o` and the comma. The comma is outside the piece.',
          table: {
            head: ['Call on "Hello, World"', 'Result', 'Length'],
            rows: [
              ['`substring(0, 5)`', '`"Hello"`', '5 - 0 = 5'],
              ['`substring(7, 12)`', '`"World"`', '12 - 7 = 5'],
              ['`substring(7)`', '`"World"`', 'to the end'],
              ['`substring(3, 3)`', '`""`', '3 - 3 = 0 (empty, no error)'],
              ['`substring(5, 3)`', 'crash', '`begin` is bigger than `end`'],
              ['`substring(0, 13)`', 'crash', '13 is past the end (length 12)']
            ]
          }
        },
        {
          title: 'Finding every match with indexOf',
          text: [
            '`indexOf(part, from)` starts the search at index `from`. To find every match, search again one step after the last hit, until you get -1.'
          ],
          fileName: 'FindAll.java',
          code: `public class FindAll {
    public static void main(String[] args) {
        String text = "banana";
        int count = 0;
        int index = text.indexOf("a");           // first search from 0
        while (index != -1) {                    // -1 means: no more matches
            System.out.println("a at index " + index);
            count++;
            index = text.indexOf("a", index + 1); // search again after this hit
        }
        System.out.println(count + " times");
    }
}`,
          output: `a at index 1
a at index 3
a at index 5
3 times`
        },
        {
          title: 'Yes or no: contains, startsWith, endsWith',
          text: [
            'These three methods return a `boolean`. They are perfect for `if` statements.',
            'They compare exactly, so capital letters matter. The example makes the name small first with `toLowerCase()` (the next lesson explains it) so `"photo.JPG"` is found too.'
          ],
          fileName: 'FileCheck.java',
          code: `public class FileCheck {
    public static void main(String[] args) {
        String[] files = {"Main.java", "notes.txt", "Test.java", "photo.JPG"};
        for (String file : files) {
            String lower = file.toLowerCase();
            if (lower.endsWith(".java")) {
                System.out.println(file + " is Java code");
            } else if (lower.endsWith(".jpg") || lower.endsWith(".png")) {
                System.out.println(file + " is a picture");
            } else {
                System.out.println(file + " is something else");
            }
        }
        System.out.println("notes.txt".contains("note"));
        System.out.println("notes.txt".startsWith("Note"));   // capital N: no match
    }
}`,
          output: `Main.java is Java code
notes.txt is something else
Test.java is Java code
photo.JPG is a picture
true
false`
        },
        {
          title: 'Find, then cut: taking text apart',
          text: [
            'The most common pattern: find a separator with `indexOf`, then cut before and after it with `substring`.',
            'Before the separator: `substring(0, at)`. After it: `substring(at + 1)`. The `+ 1` skips the separator itself.'
          ],
          fileName: 'EmailParts.java',
          code: `public class EmailParts {
    public static void main(String[] args) {
        String email = "mia@example.org";
        int at = email.indexOf("@");

        if (at == -1) {
            System.out.println("not an email");
            return;
        }
        String user = email.substring(0, at);      // before the @
        String domain = email.substring(at + 1);   // after the @
        String ending = domain.substring(domain.lastIndexOf(".") + 1);

        System.out.println("@ is at index " + at);
        System.out.println("user: " + user);
        System.out.println("domain: " + domain);
        System.out.println("ending: " + ending);
    }
}`,
          output: `@ is at index 3
user: mia
domain: example.org
ending: org`,
          tip: 'Always check for -1 before you cut. `substring(0, -1)` crashes with a `StringIndexOutOfBoundsException`.'
        }
      ],
      technical: [
        '`substring` copies the characters it keeps into a new `byte[]` and wraps them in a new String. The original object is not touched. (Very old Java versions shared the array; modern Java always copies.)',
        '`indexOf` walks the text from the start index and compares characters until it finds a match or reaches the end. For a long text and many searches, that is many steps, but for normal text it is very fast.',
        'Every method that takes an index checks it first. A bad index throws `StringIndexOutOfBoundsException`, with the bad index and the length in the message, for example `begin 0, end 13, length 12`.'
      ],
      tryIt: {
        steps: [
          'Make `Parts.java` with `String date = "2026-10-21";`.',
          'Find the first `-` with `indexOf` and the last one with `lastIndexOf`.',
          'Cut out the year, the month and the day with `substring` and print them on three lines.'
        ],
        see: '`2026`, `10` and `21` on three lines.'
      },
      check: [
        { q: 'What does `"Java".indexOf("x")` return?', a: '-1. That is the "not found" answer.' },
        { q: 'How long is `text.substring(2, 6)`?', a: '4 characters: `6 - 2`. Index 6 is not included.' },
        { q: 'What does `"Hello".substring(1)` return?', a: '`"ello"`: from index 1 to the end.' }
      ],
      keyPoints: [
        'Indexes start at 0. Spaces and commas count as characters.',
        '`indexOf` and `lastIndexOf` return an index, or -1 if nothing is found.',
        '`contains`, `startsWith`, `endsWith` return `true` or `false`.',
        '`substring(begin, end)` includes `begin` and stops before `end`.',
        'All of them are case-sensitive and return new values.'
      ],
      commonMistakes: [
        'Forgetting that `end` is not included: `substring(0, 4)` of `"Hello"` is `"Hell"`. Use `substring(0, 5)` for all five.',
        'Cutting without checking for -1: `email.substring(0, email.indexOf("@"))` crashes without an `@`. Check `if (at != -1)` first.',
        'Forgetting the `+ 1` after a separator: `substring(at)` keeps the `@`. Write `substring(at + 1)`.',
        'Expecting `"Java".contains("java")` to be `true`. Make both sides small letters with `toLowerCase()` first.'
      ],
      related: ['what-is-a-string', 'changing-text', 'Arrays']
    }
  ]);
})();
