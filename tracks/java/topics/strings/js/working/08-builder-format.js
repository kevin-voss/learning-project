// Strings & Text, lesson 8: StringBuilder and Formatting.
(function () {
  Java.addCoreLessons('strings', [
    {
      id: 'builder-format',
      title: 'StringBuilder and Formatting',
      category: 'habits',
      icon: 'fmt',
      tagline: 'Build text in steps, print it neatly',
      realWorld: 'StringBuilder is a whiteboard: you keep writing and erasing on the same board. A String is a printed page: every change means printing a new page. Formatting is a form with blanks you fill in.',
      kid: [
        'Imagine writing a long list on paper, but every time you add a word you must copy the whole list onto a new sheet. That takes forever. That is `+=` in a loop.',
        'A whiteboard is better: you add the next word at the end, on the same board. When you are done, you take a photo of it. The whiteboard is `StringBuilder`, the photo is `toString()`.',
        'Formatting is like a fill-in-the-blanks card: "___ has ___ points". You give Java the words for the blanks, and it writes them in the right place, neatly.'
      ],
      definition: '`StringBuilder` is a **mutable** (changeable) text: `append` adds to the same object, and `toString()` makes the final String. `String.format`, `printf` and `formatted` fill placeholders like `%s` and `%d` in a template.',
      explain: [
        'Strings are immutable, so `text += x` in a loop builds a new String every round and copies all old characters into it. With 10 000 rounds that is a lot of copying.',
        'A `StringBuilder` keeps a growing array of characters. `append(x)` writes `x` at the end of that same array. Only when the text is finished, `toString()` makes one String from it.',
        'Most `StringBuilder` methods return the builder itself, so you can **chain** calls: `sb.append("a").append(1)`. Other useful methods are `insert`, `delete`, `reverse` and `setLength(0)` to empty it.',
        'A **format string** is a template with **format specifiers**: `%s` for text, `%d` for whole numbers, `%f` for decimals, `%n` for a line break. `%.2f` means "two digits after the point". `%5d` means "at least 5 wide, padded on the left"; `%-8s` pads on the right.',
        '`String.format(template, values…)` returns the text. `template.formatted(values…)` (Java 15+) does the same, written on the template. `System.out.printf(template, values…)` prints it directly.'
      ],
      why: 'Loops that build text (lists, tables, reports) are everywhere. `StringBuilder` keeps them fast. Formatting keeps numbers and columns readable without long chains of `+`.',
      whenUse: '`StringBuilder` when you add to text inside a loop. Formatting whenever numbers need a fixed number of decimals or text must line up in columns.',
      syntax: '`StringBuilder sb = new StringBuilder(); sb.append(x); String s = sb.toString();` · `String.format("%s: %d", name, n)` · `System.out.printf("%.2f%n", price);`',
      fileName: 'StringBuilderDemo.java',
      codeSummary: 'A builder collects the numbers 1 to 5 with commas in a loop. A second builder is reversed and edited with chained calls. The last lines fill templates with `String.format`, `printf` and `formatted`.',
      code: `import java.util.Locale;

public class StringBuilderDemo {
    public static void main(String[] args) {
        Locale.setDefault(Locale.US);                  // dots for decimals on every computer

        StringBuilder builder = new StringBuilder();   // empty, changeable text
        for (int i = 1; i <= 5; i++) {
            builder.append(i);                         // add at the end, same object
            if (i < 5) {
                builder.append(", ");
            }
        }
        String numbers = builder.toString();           // finished: one normal String
        System.out.println(numbers);

        StringBuilder word = new StringBuilder("stressed");
        System.out.println(word.reverse());            // reverses the builder itself
        word.insert(0, ">> ").append(" <<");           // chained calls
        System.out.println(word);
        System.out.println(word.length());

        String row = String.format("%-8s|%5d|%8.2f", "apples", 12, 3.5);
        System.out.println(row);
        System.out.printf("%s is %d years old%n", "Mia", 9);
        System.out.println("Total: %.2f EUR".formatted(19.999));
    }
}`,
      output: `1, 2, 3, 4, 5
desserts
>> desserts <<
14
apples  |   12|    3.50
Mia is 9 years old
Total: 20.00 EUR`,
      codeExplanation: [
        { label: 'Line 5', code: 'Locale.setDefault(Locale.US);', text: 'Number formats follow the computer\'s language settings (the **locale**). In Germany `%.2f` prints `3,50`. This line makes the example print `3.50` everywhere.' },
        { label: 'Line 7', code: 'StringBuilder builder = new StringBuilder();', text: 'A new, empty builder. Unlike a String, it can change.' },
        { label: 'Line 9', code: 'builder.append(i);', text: 'Writes the number at the end of the builder. No new object is made.' },
        { label: 'Line 14', code: 'String numbers = builder.toString();', text: 'One String with the final text. Do this once, at the end.' },
        { label: 'Line 18', code: 'word.reverse()', text: 'Changes the builder itself: "stressed" becomes "desserts". `println` prints its current text.' },
        { label: 'Line 19', code: 'word.insert(0, ">> ").append(" <<");', text: '`insert` puts text at index 0. It returns the same builder, so `.append` can follow.' },
        { label: 'Line 23', code: 'String.format("%-8s|%5d|%8.2f", "apples", 12, 3.5)', text: '`%-8s`: text padded to 8 on the right. `%5d`: number padded to 5 on the left. `%8.2f`: 8 wide with 2 decimals.' },
        { label: 'Line 25', code: 'System.out.printf("%s is %d years old%n", "Mia", 9);', text: '`printf` formats and prints in one step. `%n` is the line break; `printf` adds none by itself.' },
        { label: 'Line 26', code: '"Total: %.2f EUR".formatted(19.999)', text: '`formatted` is called on the template. `%.2f` rounds 19.999 to `20.00`.' }
      ],
      sections: [
        {
          title: 'Why not + in a loop?',
          text: [
            'Both loops below give the same text. The first one makes a new String in every round and copies everything so far. The second one has one builder that grows.',
            'Watch the last line: a builder is not a String, so `equals` between them is `false`. Call `toString()` first.'
          ],
          mermaid: `flowchart LR
  subgraph Plus["text += i (5 rounds)"]
    direction LR
    P0["0"] --> P1["01"] --> P2["012"] --> P3["0123"] --> P4["01234"]
  end
  subgraph Builder["builder.append(i)"]
    B["one builder: 0, then 01, 012, 0123, 01234"]
  end`,
          diagramNote: 'With `+=`, every box on the left is a separate object, and each one copies all characters of the box before it. The builder on the right is one object the whole time.',
          fileName: 'PlusVsBuilder.java',
          code: `public class PlusVsBuilder {
    public static void main(String[] args) {
        String slow = "";
        for (int i = 0; i < 5; i++) {
            slow += i;                     // a new String every round
        }

        StringBuilder fast = new StringBuilder();
        for (int i = 0; i < 5; i++) {
            fast.append(i);                // the same builder grows
        }

        System.out.println(slow);
        System.out.println(fast);
        System.out.println(slow.equals(fast.toString()));   // compare as Strings
        System.out.println(slow.equals(fast));              // false: a builder is not a String
    }
}`,
          output: `01234
01234
true
false`,
          tip: 'Outside loops, `+` is fine and clearer: `"Hi, " + name + "!"`. The compiler turns such a line into efficient code by itself.'
        },
        {
          title: 'The StringBuilder toolbox',
          table: {
            head: ['Method', 'Does', 'Example on "Hello World"'],
            rows: [
              ['`append(x)`', 'adds `x` at the end', '`append("!")` → `Hello World!`'],
              ['`insert(i, x)`', 'puts `x` at index `i`', '`insert(5, ",")` → `Hello, World`'],
              ['`delete(a, b)`', 'removes index `a` up to `b` (not included)', '`delete(0, 6)` → `World`'],
              ['`deleteCharAt(i)`', 'removes one character', '`deleteCharAt(0)` → `ello World`'],
              ['`setCharAt(i, c)`', 'swaps one character', '`setCharAt(0, \'J\')` → `Jello World`'],
              ['`reverse()`', 'turns it backwards', '`dlroW olleH`'],
              ['`setLength(0)`', 'empties it', '`""`'],
              ['`toString()`', 'makes a normal String', '`"Hello World"`']
            ]
          },
          fileName: 'BuilderTools.java',
          code: `public class BuilderTools {
    public static void main(String[] args) {
        StringBuilder sb = new StringBuilder("Hello World");
        sb.insert(5, ",");                  // Hello, World
        System.out.println(sb);
        sb.delete(0, 7);                    // removes "Hello, "
        System.out.println(sb);
        sb.setCharAt(0, 'w');
        System.out.println(sb);
        sb.append('!').append(42);          // chained
        System.out.println(sb);
        sb.deleteCharAt(sb.length() - 1);   // remove the last character
        System.out.println(sb);
        sb.setLength(0);                    // empty again, ready to reuse
        System.out.println("[" + sb + "]");
    }
}`,
          output: `Hello, World
World
world
world!42
world!4
[]`
        },
        {
          title: 'Format specifiers',
          text: [
            'A specifier starts with `%` and ends with a letter that says the type. Between them you can put a width and, for decimals, a precision.',
            'Each specifier takes the next value from the list, in order. The types must match: `%d` with a `double` throws an `IllegalFormatConversionException`.'
          ],
          table: {
            head: ['Specifier', 'For', 'Example', 'Result'],
            rows: [
              ['`%s`', 'any value as text', '`format("%s!", "hi")`', '`hi!`'],
              ['`%d`', 'whole numbers', '`format("%d", 42)`', '`42`'],
              ['`%f`', 'decimals (6 places)', '`format("%f", 1.5)`', '`1.500000`'],
              ['`%.2f`', '2 decimal places, rounded', '`format("%.2f", 2.345)`', '`2.35`'],
              ['`%5d`', 'width 5, right aligned', '`format("[%5d]", 42)`', '`[   42]`'],
              ['`%-5d`', 'width 5, left aligned', '`format("[%-5d]", 42)`', '`[42   ]`'],
              ['`%05d`', 'pad with zeros', '`format("%05d", 42)`', '`00042`'],
              ['`%c` / `%b`', 'a char / a boolean', '`format("%c %b", \'x\', true)`', '`x true`'],
              ['`%n` / `%%`', 'line break / a real %', '`format("100%%")`', '`100%`']
            ]
          }
        },
        {
          title: 'Three ways to fill a template',
          text: [
            '`String.format` and `formatted` return a String you can store. `printf` prints right away and returns nothing useful. All three understand the same specifiers.'
          ],
          fileName: 'FormatThree.java',
          code: `import java.util.Locale;

public class FormatThree {
    public static void main(String[] args) {
        Locale.setDefault(Locale.US);
        String name = "Mia";
        int points = 7;
        double average = 8.456;

        String a = String.format("%s has %d points", name, points);
        String b = "%s has %d points".formatted(name, points);
        System.out.println(a);
        System.out.println(b);

        System.out.printf("Average: %.1f%n", average);
        System.out.printf("[%5d] [%-5d] [%05d]%n", points, points, points);
        System.out.printf("100%% done%n");
    }
}`,
          output: `Mia has 7 points
Mia has 7 points
Average: 8.5
[    7] [7    ] [00007]
100% done`,
          tip: 'Without `Locale.setDefault(Locale.US)` a computer set to German prints `8,5` instead of `8.5`. For one call only, pass the locale first: `String.format(Locale.US, "%.1f", average)`.'
        },
        {
          title: 'Putting it together: a receipt that lines up',
          text: [
            'A builder collects the lines, `String.format` makes every line the same width, and `repeat` draws the rule. `%n` inside `format` adds the line break.'
          ],
          fileName: 'Receipt.java',
          code: `import java.util.Locale;

public class Receipt {
    public static void main(String[] args) {
        Locale.setDefault(Locale.US);
        String[] items = {"Bread", "Milk", "Chocolate"};
        double[] prices = {2.5, 0.99, 1.75};
        double total = 0;

        StringBuilder receipt = new StringBuilder();
        for (int i = 0; i < items.length; i++) {
            receipt.append(String.format("%-10s %6.2f%n", items[i], prices[i]));
            total += prices[i];
        }
        receipt.append("-".repeat(17)).append("\\n");
        receipt.append(String.format("%-10s %6.2f%n", "Total", total));

        System.out.print(receipt);
    }
}`,
          output: `Bread        2.50
Milk         0.99
Chocolate    1.75
-----------------
Total        5.24`
        }
      ],
      technical: [
        'A `StringBuilder` holds a `byte[]` with spare room at the end. `append` writes into that spare room. When it is full, the builder makes a bigger array (about twice the size) and copies once. So adding n pieces costs about n steps, while `+=` in a loop costs about n × n steps of copying.',
        'For a single line like `"a" + x + "b"`, the compiler (since Java 9) emits one call to a JVM helper that sizes the result exactly once. That is why `+` outside loops is fine. Inside a loop, each round is a separate expression, so the copying adds up.',
        '`String.format` reads the template, finds each `%…` specifier, converts the matching value and writes everything into a builder. It uses the default locale for decimal points and digit grouping.',
        '`StringBuilder` is not safe when two threads (parts of a program running at the same time) change it at once. The older `StringBuffer` is, but it is slower. In normal code use `StringBuilder`.'
      ],
      tryIt: {
        steps: [
          'Make `Stars.java` with a `StringBuilder`.',
          'In a loop from 1 to 4, append `"*".repeat(i)` and a `"\\n"`.',
          'Print the builder once after the loop.',
          'Then print `String.format("%-6s|", "ab")` and `String.format("%04d", 7)`.'
        ],
        see: 'a triangle of stars (`*`, `**`, `***`, `****`), then `ab    |` and `0007`.'
      },
      check: [
        { q: 'Why is `StringBuilder` better than `+=` inside a loop?', a: '`+=` makes a new String and copies all old characters every round. A builder grows one array and copies only now and then.' },
        { q: 'What does `String.format("%.1f", 2.46)` give with `Locale.US`?', a: '`"2.5"`. `%.1f` keeps one decimal place and rounds.' },
        { q: 'Why is `"01234".equals(builder)` false even when the builder holds 01234?', a: 'A `StringBuilder` is not a String. Compare `"01234".equals(builder.toString())`.' }
      ],
      keyPoints: [
        '`StringBuilder` is changeable text: `append`, `insert`, `delete`, `reverse`.',
        'Use it when you build text in a loop; call `toString()` once at the end.',
        'Outside loops, plain `+` is fine.',
        '`%s`, `%d`, `%.2f`, `%n` are the specifiers you use most.',
        '`String.format` / `formatted` return text; `printf` prints it.',
        'Decimal points follow the locale; set `Locale.US` for fixed output.'
      ],
      commonMistakes: [
        'Building a long text with `result += line;` in a loop. Use `sb.append(line);` and `sb.toString()`.',
        'Comparing a builder with a String: `"abc".equals(sb)` is always `false`. Write `"abc".equals(sb.toString())`.',
        'Forgetting `%n` in `printf`: the next output lands on the same line. End the template with `%n`.',
        'Using `%d` for a `double`: `printf("%d", 2.5)` throws. Use `%f` or `%.2f`.',
        'Expecting `printf("%.2f", 3.5)` to print `3.50` on every computer. A German locale prints `3,50`; pass `Locale.US` if the format must be fixed.'
      ],
      related: ['immutability', 'looping-chars', 'text-and-numbers', 'I/O Basics']
    }
  ]);
})();
