// Strings & Text, lesson 6: Looping Over Characters.
(function () {
  Java.addCoreLessons('strings', [
    {
      id: 'looping-chars',
      title: 'Looping Over Characters',
      category: 'practice',
      icon: 'for',
      tagline: 'Visit every letter, one by one',
      realWorld: 'Reading a word with your finger: you put your finger under the first letter, look at it, move one step right, look again, until the word ends.',
      kid: [
        'Your teacher asks: "how many a\'s are in banana?". You point at each letter, one after the other. Every time you see an a, you count one more.',
        'A loop does the same. It starts at index 0, looks at the letter, then goes to index 1, and so on, until it reaches the end.',
        'With this trick you can count letters, find digits, turn a word backwards or check if it reads the same both ways.'
      ],
      definition: 'To work on every character, loop over the indexes from `0` to `length() - 1` and read each one with `charAt(i)`, or loop over `text.toCharArray()` with a for-each loop.',
      explain: [
        'The counting loop `for (int i = 0; i < text.length(); i++)` is the same loop you know from [Control Flow](../control-flow/index.html) and [Arrays](../arrays/index.html). The condition `i < text.length()` stops before the index that does not exist.',
        '`toCharArray()` returns a new `char[]` with a copy of all characters. A **for-each** loop over it gives you each `char` without an index. Use it when you do not need to know the position.',
        'The class `Character` has helper methods that answer questions about one `char`: `Character.isLetter(c)`, `isDigit(c)`, `isWhitespace(c)`, `isUpperCase(c)`, `toUpperCase(c)`.',
        'A `char` is a number inside, so `c - \'0\'` turns a digit character into its value: `\'7\' - \'0\'` is 7, because the digit codes are in order.',
        'To check something from both ends, use two indexes: one starting at 0, one at `length() - 1`, moving toward each other.'
      ],
      why: 'Many text tasks look at single characters: counting vowels, checking a password has a digit, reversing, finding the first non-letter.',
      whenUse: 'When the question is about the characters themselves, not about a whole word or a separator.',
      syntax: '`for (int i = 0; i < s.length(); i++) { char c = s.charAt(i); … }` · `for (char c : s.toCharArray()) { … }`',
      fileName: 'CountLetters.java',
      codeSummary: 'The program visits each character of one text and sorts it into letters (and vowels among them), digits, whitespace and other symbols.',
      code: `public class CountLetters {
    public static void main(String[] args) {
        String text = "Hello World 2026!";
        int letters = 0;
        int vowels = 0;
        int digits = 0;
        int spaces = 0;
        int others = 0;

        for (int i = 0; i < text.length(); i++) {
            char c = text.charAt(i);
            if (Character.isLetter(c)) {
                letters++;
                if ("aeiouAEIOU".indexOf(c) != -1) {   // is c one of these?
                    vowels++;
                }
            } else if (Character.isDigit(c)) {
                digits++;
            } else if (Character.isWhitespace(c)) {
                spaces++;
            } else {
                others++;
            }
        }
        System.out.println("letters: " + letters + " (vowels: " + vowels + ")");
        System.out.println("digits: " + digits);
        System.out.println("spaces: " + spaces);
        System.out.println("others: " + others);
    }
}`,
      output: `letters: 10 (vowels: 3)
digits: 4
spaces: 2
others: 1`,
      codeExplanation: [
        { label: 'Line 3', code: 'String text = "Hello World 2026!";', text: '17 characters: 10 letters, 2 spaces, 4 digits and one `!`.' },
        { label: 'Line 10', code: 'for (int i = 0; i < text.length(); i++) {', text: '`i` takes the values 0 to 16, one for each index.' },
        { label: 'Line 11', code: 'char c = text.charAt(i);', text: 'Reads the character at the current index into a `char` variable.' },
        { label: 'Line 12', code: 'if (Character.isLetter(c)) {', text: '`Character.isLetter` returns `true` for letters of any alphabet.' },
        { label: 'Line 14', code: 'if ("aeiouAEIOU".indexOf(c) != -1) {', text: 'A small trick: look for `c` inside a String of all vowels. Anything but -1 means it is one of them.' },
        { label: 'Line 17', code: '} else if (Character.isDigit(c)) {', text: '`true` for `\'0\'` to `\'9\'`.' },
        { label: 'Line 19', code: '} else if (Character.isWhitespace(c)) {', text: '`true` for spaces, tabs and line breaks.' },
        { label: 'Line 21', code: '} else {', text: 'Everything else, here only the `!`.' }
      ],
      sections: [
        {
          title: 'Three ways to walk through a String',
          text: [
            'Forward with an index, forward with for-each, and backward with an index counting down. Backward starts at `length() - 1` and goes while `i >= 0`.'
          ],
          table: {
            head: ['Loop', 'You get', 'Use it when'],
            rows: [
              ['`for (int i = 0; i < s.length(); i++)`', 'index `i` and `s.charAt(i)`', 'you need the position'],
              ['`for (char c : s.toCharArray())`', 'each `char`', 'you only need the characters'],
              ['`for (int i = s.length() - 1; i >= 0; i--)`', 'the characters from the end', 'reversing, searching from the end']
            ]
          },
          fileName: 'WalkThree.java',
          code: `public class WalkThree {
    public static void main(String[] args) {
        String word = "cat";

        for (int i = 0; i < word.length(); i++) {        // forward, with index
            System.out.println(i + ": " + word.charAt(i));
        }

        for (char c : word.toCharArray()) {               // forward, no index
            System.out.print(c + "-");
        }
        System.out.println();

        for (int i = word.length() - 1; i >= 0; i--) {   // backward
            System.out.print(word.charAt(i));
        }
        System.out.println();
    }
}`,
          output: `0: c
1: a
2: t
c-a-t-
tac`
        },
        {
          title: 'What the loop does, step by step',
          text: ['Each round reads one character, does the work, and moves the index one step. The loop ends when the index reaches the length.'],
          mermaid: `flowchart TD
  A["i = 0"] --> B{"i < text.length() ?"}
  B -- yes --> C["c = text.charAt(i)"]
  C --> D["look at c: count, compare, collect"]
  D --> E["i++"]
  E --> B
  B -- no --> F["loop ends: every index visited once"]`,
          diagramNote: 'For `"cat"` the yes-path runs three times (i = 0, 1, 2). At i = 3 the condition is false, so `charAt(3)` is never called.'
        },
        {
          title: 'Character helpers and digit values',
          table: {
            head: ['Call', 'Result for the example', 'Meaning'],
            rows: [
              ['`Character.isLetter(\'x\')`', '`true`', 'a letter'],
              ['`Character.isDigit(\'7\')`', '`true`', '0 to 9'],
              ['`Character.isWhitespace(\' \')`', '`true`', 'space, tab, line break'],
              ['`Character.isUpperCase(\'Q\')`', '`true`', 'a capital letter'],
              ['`Character.toUpperCase(\'q\')`', '`\'Q\'`', 'one char in capitals'],
              ['`\'7\' - \'0\'`', '`7`', 'a digit char to its number']
            ]
          },
          fileName: 'DigitSum.java',
          code: `public class DigitSum {
    public static void main(String[] args) {
        String code = "a1b2c3";
        int sum = 0;
        StringBuilder lettersOnly = new StringBuilder();   // explained in the StringBuilder lesson

        for (char c : code.toCharArray()) {
            if (Character.isDigit(c)) {
                sum += c - '0';          // '2' - '0' is 2
            } else {
                lettersOnly.append(Character.toUpperCase(c));
            }
        }
        System.out.println("sum of digits: " + sum);
        System.out.println("letters: " + lettersOnly);
        System.out.println('7' - '0');
    }
}`,
          output: `sum of digits: 6
letters: ABC
7`,
          warn: '`Character.isDigit(\'7\')` checks the character. `\'7\'` itself is the number 55 (its code), not 7. Subtract `\'0\'` to get the value.'
        },
        {
          title: 'Two indexes: does it read the same backwards?',
          text: [
            'A **palindrome** reads the same from both sides, like "level". Put one index at the start and one at the end. Compare, then move both inward. One mismatch is enough to say no.',
            'The method `isPalindrome` returns a `boolean`. `return false` inside the loop leaves the method at once.'
          ],
          fileName: 'Palindrome.java',
          code: `public class Palindrome {
    static boolean isPalindrome(String word) {
        String w = word.toLowerCase();
        int left = 0;
        int right = w.length() - 1;
        while (left < right) {
            if (w.charAt(left) != w.charAt(right)) {
                return false;            // one mismatch: not a palindrome
            }
            left++;
            right--;
        }
        return true;                     // the indexes met: all pairs matched
    }

    public static void main(String[] args) {
        String[] words = {"Anna", "level", "Java", "racecar", "a"};
        for (String word : words) {
            System.out.println(word + " -> " + isPalindrome(word));
        }
    }
}`,
          output: `Anna -> true
level -> true
Java -> false
racecar -> true
a -> true`,
          tip: 'Comparing two `char` values with `!=` or `==` is correct: `char` is a primitive. Only whole Strings need `equals`.'
        }
      ],
      technical: [
        '`charAt(i)` is fast: it reads one position of the inner array, no matter how long the String is. A loop with `charAt` reads each character once.',
        '`toCharArray()` copies all characters into a new array first. That costs a little memory, but the for-each loop over it is short and clear.',
        'The codes of `\'0\'` to `\'9\'` are 48 to 57, in order, and the codes of `\'a\'` to `\'z\'` are 97 to 122. That is why `c - \'0\'` and `c - \'a\'` give positions. These codes come from **Unicode**, the world-wide list of characters Java uses.'
      ],
      tryIt: {
        steps: [
          'Make `Vowels.java` with `String word = "programming";`.',
          'Loop over the characters and count how often `\'m\'` appears.',
          'In a second loop, print the word backwards.'
        ],
        see: '`2` and `gnimmargorp`.'
      },
      check: [
        { q: 'Why is the loop condition `i < s.length()` and not `i <= s.length()`?', a: 'The last index is `length() - 1`. With `<=` the loop calls `charAt(length())` and crashes.' },
        { q: 'What is `\'9\' - \'0\'`?', a: '9. Digit codes are in order, so subtracting the code of `\'0\'` gives the value.' },
        { q: 'When do you prefer `for (char c : s.toCharArray())`?', a: 'When you need each character but not its index.' }
      ],
      keyPoints: [
        'Loop from `0` while `i < s.length()`, reading `s.charAt(i)`.',
        'For-each over `s.toCharArray()` when you do not need the index.',
        'Backward: start at `s.length() - 1`, go while `i >= 0`.',
        '`Character.isLetter`, `isDigit`, `isWhitespace` answer questions about one `char`.',
        '`char` values compare with `==`; digits turn into numbers with `c - \'0\'`.'
      ],
      commonMistakes: [
        'Looping one too far: `i <= s.length()` crashes. Use `i < s.length()`.',
        'Comparing a `char` with a String: `s.charAt(0) == "a"` does not compile. Use single quotes: `== \'a\'`.',
        'Using a digit `char` as its value: `int n = \'7\';` gives 55. Write `int n = \'7\' - \'0\';`.',
        'Building the result with `result += c` in a long loop. It works, but `StringBuilder` is the right tool (last lesson).'
      ],
      related: ['what-is-a-string', 'Control Flow', 'Arrays', 'builder-format']
    }
  ]);
})();
