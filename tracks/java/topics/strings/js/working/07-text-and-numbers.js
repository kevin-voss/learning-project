// Strings & Text, lesson 7: Text, Numbers and Keyboard Input.
(function () {
  Java.addCoreLessons('strings', [
    {
      id: 'text-and-numbers',
      title: 'Text, Numbers and Keyboard Input',
      category: 'practice',
      icon: '12',
      tagline: '"12" is text; 12 is a number',
      realWorld: 'A price tag that says "12" is only ink on paper. To add prices you read the tag and work with the number in your head. To make a new tag you write the number down as ink again.',
      kid: [
        'If you glue the stickers "1" and "2" next to each other, you get "12". That is what Java does with text: it glues.',
        'If you have one apple and then two more apples, you have three. That is what Java does with numbers: it adds.',
        'When someone types on the keyboard, Java always gets stickers (text). You ask Java to read the sticker as a number first, and then you can count with it.'
      ],
      definition: '`Integer.parseInt(text)` and `Double.parseDouble(text)` turn text into a number. `String.valueOf(number)` turns a number into text. A `Scanner` reads what the user types, always as text first.',
      explain: [
        'To **parse** means to read text and understand it as something else, here a number. `Integer.parseInt("42")` returns the `int` 42. If the text is not a whole number, for example `"12a"` or `"3.5"`, it throws a `NumberFormatException`.',
        'An **exception** is how Java reports an error while the program runs. If nobody handles it, the program stops and prints the error. You can handle it with `try { … } catch (NumberFormatException e) { … }`: Java tries the code in `try`, and if parsing fails it runs the `catch` block instead. The full story is in [Exceptions](../exceptions/index.html).',
        'The other way round, `String.valueOf(42)`, `Integer.toString(42)` and `"" + 42` all give the text `"42"`.',
        '`Scanner` is a class from `java.util` that reads input. `new Scanner(System.in)` reads from the keyboard (**standard input**, or stdin). `nextLine()` waits until the user presses Enter and returns the whole line as a String, without the Enter itself.',
        '`import java.util.Scanner;` at the top of the file tells the compiler where `Scanner` lives, so you can use the short name.'
      ],
      why: 'People and files give you text. Calculations need numbers. Every program that reads an age, a price or an amount has to cross this bridge.',
      whenUse: 'Whenever input should be a number: read the line as text, `strip()` it, then parse it.',
      syntax: '`int n = Integer.parseInt(text);` · `double d = Double.parseDouble(text);` · `String s = String.valueOf(n);` · `String line = scanner.nextLine();`',
      fileName: 'AgeNextYear.java',
      input: 'Mia\n9\n',
      codeSummary: 'The program asks for a name and an age. Both arrive as text; the age is parsed into an `int` so it can be added to. The output is what you see when you type `Mia` and `9` (your typed lines also appear on screen when you run it yourself).',
      code: `import java.util.Scanner;

public class AgeNextYear {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);     // reads what the user types

        System.out.println("Your name?");
        String name = scanner.nextLine().strip();      // one whole line, as text

        System.out.println("Your age?");
        String ageText = scanner.nextLine().strip();   // still text, for example "9"
        int age = Integer.parseInt(ageText);           // text -> int

        System.out.println(name + " will be " + (age + 1) + " next year.");
        System.out.println("Glued as text: " + ageText + 1);

        String back = String.valueOf(age * 10);        // int -> text
        System.out.println(back + " has " + back.length() + " digits.");
    }
}`,
      output: `Your name?
Your age?
Mia will be 10 next year.
Glued as text: 91
90 has 2 digits.`,
      codeExplanation: [
        { label: 'Line 1', code: 'import java.util.Scanner;', text: 'Makes the class `Scanner` from the package `java.util` available by its short name.' },
        { label: 'Line 5', code: 'Scanner scanner = new Scanner(System.in);', text: 'Creates one Scanner that reads from the keyboard. Make it once and reuse it.' },
        { label: 'Line 8', code: 'String name = scanner.nextLine().strip();', text: 'Waits for a line, returns it as a String, and removes stray spaces at the ends.' },
        { label: 'Line 11', code: 'String ageText = scanner.nextLine().strip();', text: 'The age also arrives as text: `"9"`, not 9.' },
        { label: 'Line 12', code: 'int age = Integer.parseInt(ageText);', text: 'Reads the text as a whole number. With `"nine"` this line would throw a `NumberFormatException`.' },
        { label: 'Line 14', code: '(age + 1)', text: 'The brackets make Java add the numbers first (10) before gluing to the text.' },
        { label: 'Line 15', code: '"Glued as text: " + ageText + 1', text: 'Text plus text plus number: everything is glued, so you see `91`, not 10.' },
        { label: 'Line 17', code: 'String back = String.valueOf(age * 10);', text: 'Turns the number 90 into the text `"90"`, which has String methods like `length()`.' }
      ],
      sections: [
        {
          title: 'Text that looks like a number is still text',
          text: [
            '`"12" + "3"` is `"123"`: the texts are glued. Only after parsing does `+` add.',
            'Each number type has its own parse method. All of them live on the **wrapper classes** (`Integer`, `Double`, `Boolean`), the object partners of the primitives.'
          ],
          table: {
            head: ['From', 'To', 'Write', 'Result'],
            rows: [
              ['`"42"`', '`int`', '`Integer.parseInt("42")`', '`42`'],
              ['`"4.99"`', '`double`', '`Double.parseDouble("4.99")`', '`4.99`'],
              ['`"true"`', '`boolean`', '`Boolean.parseBoolean("true")`', '`true`'],
              ['`42`', '`String`', '`String.valueOf(42)` or `"" + 42`', '`"42"`'],
              ['`3.5`', '`String`', '`String.valueOf(3.5)`', '`"3.5"`'],
              ['`\'x\'`', '`String`', '`String.valueOf(\'x\')`', '`"x"`']
            ]
          },
          fileName: 'TextVsNumber.java',
          code: `public class TextVsNumber {
    public static void main(String[] args) {
        String a = "12";
        String b = "3";
        System.out.println(a + b);                    // glued: 123

        int x = Integer.parseInt(a);
        int y = Integer.parseInt(b);
        System.out.println(x + y);                    // added: 15

        double price = Double.parseDouble("4.99");
        System.out.println(price * 2);

        String back = String.valueOf(x + y);
        System.out.println(back.length());            // "15" has 2 characters
        System.out.println(Integer.parseInt("-8") + 1);
    }
}`,
          output: `123
15
9.98
2
-7`
        },
        {
          title: 'When the text is not a number',
          text: [
            '`parseInt` accepts an optional `+` or `-` and digits, nothing else. Spaces, letters, a decimal point or an empty String all throw a `NumberFormatException`.',
            'Strip the text first, and catch the exception when the input comes from a person.'
          ],
          mermaid: `flowchart TD
  T["text from the user"] --> S["strip()"]
  S --> P{"Integer.parseInt(text)"}
  P -- "only digits, maybe a sign" --> N["an int you can calculate with"]
  P -- "anything else" --> E["NumberFormatException"]
  E --> C{"caught with try / catch?"}
  C -- yes --> M["catch block runs: show a friendly message"]
  C -- no --> X["program stops with an error"]`,
          diagramNote: 'Parsing either gives you a number or throws. `try` / `catch` decides whether a bad input stops the whole program.',
          fileName: 'SafeParse.java',
          code: `public class SafeParse {
    public static void main(String[] args) {
        String[] inputs = {"42", " 7 ", "12a", "", "3.5", "-8"};
        for (String text : inputs) {
            try {
                int number = Integer.parseInt(text.strip());
                System.out.println("[" + text + "] -> " + number);
            } catch (NumberFormatException e) {
                System.out.println("[" + text + "] is not a whole number");
            }
        }
    }
}`,
          output: `[42] -> 42
[ 7 ] -> 7
[12a] is not a whole number
[] is not a whole number
[3.5] is not a whole number
[-8] -> -8`
        },
        {
          title: 'How Scanner reads your typing',
          text: [
            'While the program waits in `nextLine()`, you type. Nothing reaches the program until you press Enter. Then the whole line (without the Enter) comes back as a String.'
          ],
          mermaid: `sequenceDiagram
  participant U as You
  participant In as System.in
  participant Sc as Scanner
  participant P as Your program
  P->>Sc: nextLine()
  Note over P,Sc: the program waits
  U->>In: types 9 and presses Enter
  In->>Sc: characters 9 and Enter
  Sc-->>P: the String "9" (Enter removed)
  P->>P: Integer.parseInt("9") gives 9`,
          diagramNote: 'Keyboard input is always text first. Parsing is a separate step in your program.',
          table: {
            head: ['Scanner method', 'Reads', 'Returns'],
            rows: [
              ['`nextLine()`', 'everything up to Enter', '`String` (the Enter is dropped)'],
              ['`next()`', 'one word (up to a space)', '`String`'],
              ['`nextInt()`', 'one whole number', '`int` (leaves the Enter behind!)'],
              ['`hasNextLine()`', 'nothing; it looks ahead', '`true` if another line is waiting']
            ]
          }
        },
        {
          title: 'The leftover Enter trap',
          text: [
            '`nextInt()` reads the digits but **not** the Enter after them. The next `nextLine()` finds that Enter at once and returns an empty line. The user never gets the chance to type the name.',
            'The fix: read every line with `nextLine()` and parse it yourself. Then each call eats exactly one line.'
          ],
          fileName: 'NextIntTrap.java',
          input: '9\nMia\n',
          code: `import java.util.Scanner;

public class NextIntTrap {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.println("Age?");
        int age = scanner.nextInt();          // reads 9, leaves the Enter behind
        System.out.println("Name?");
        String name = scanner.nextLine();     // reads the leftover: an empty line!
        System.out.println("age=" + age + ", name=[" + name + "]");

        // The fix: always read whole lines and parse them yourself.
        // int age = Integer.parseInt(scanner.nextLine().strip());
    }
}`,
          output: `Age?
Name?
age=9, name=[]`,
          warn: 'The input here is `9`, Enter, `Mia`, Enter. The name `Mia` is never read, because `nextLine()` returned the empty rest of the first line.'
        },
        {
          title: 'Reading many lines until the input ends',
          text: [
            '`hasNextLine()` is `true` while more lines are waiting. A `while` loop with it reads everything, line by line. Here each line may hold several numbers, so the loop splits it at whitespace.',
            'In the terminal you end the input with Ctrl+D (Linux, macOS) or Ctrl+Z then Enter (Windows).'
          ],
          fileName: 'SumLines.java',
          input: '4 8\n\n15 16\n23 42\n',
          code: `import java.util.Scanner;

public class SumLines {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int sum = 0;
        int count = 0;

        while (scanner.hasNextLine()) {
            String line = scanner.nextLine().strip();
            if (line.isEmpty()) {
                continue;                          // skip empty lines
            }
            for (String part : line.split("\\\\s+")) {
                sum += Integer.parseInt(part);
                count++;
            }
        }
        System.out.println(count + " numbers, sum " + sum);
    }
}`,
          output: '6 numbers, sum 108',
          tip: 'The output above is for four input lines: `4 8`, an empty line, `15 16` and `23 42`. You can also pipe text in from the terminal: `echo "1 2 3" | java SumLines.java`.'
        }
      ],
      technical: [
        '`Integer.parseInt` walks the text from left to right. For each digit it multiplies the result so far by 10 and adds the digit value (`c - \'0\'`). If a character is not a digit, or the number does not fit in an `int`, it throws a `NumberFormatException` with the text in the message: `For input string: "12a"`.',
        '`Scanner` reads `System.in` in chunks into a buffer and then cuts tokens or lines out of it. `nextInt()` stops right after the last digit, which is why the line break stays in the buffer.',
        '`String.valueOf(int)` calls `Integer.toString(int)`, which writes the digits into a new String. `"" + 42` does the same thing through concatenation.'
      ],
      tryIt: {
        steps: [
          'Make `Doubler.java` with a `Scanner` that reads one line.',
          'Parse it with `Integer.parseInt(line.strip())` and print the number times 2.',
          'Run it and type `21`. Run it again and type `abc`.',
          'Wrap the parse in `try` / `catch (NumberFormatException e)` and print `Please type a whole number.` in the catch.'
        ],
        see: '`42` for `21`. For `abc` first a crash with `NumberFormatException`, then after your change the friendly message.'
      },
      check: [
        { q: 'What does `"5" + "5"` give, and what does `Integer.parseInt("5") + Integer.parseInt("5")` give?', a: '`"55"` (glued text) and `10` (added numbers).' },
        { q: 'Why does `Integer.parseInt(" 7")` throw?', a: 'The space is not a digit. `strip()` the text first.' },
        { q: 'Why does `nextLine()` after `nextInt()` often return `""`?', a: '`nextInt()` leaves the Enter in the input. `nextLine()` reads the rest of that line, which is empty. Read lines with `nextLine()` and parse them.' }
      ],
      keyPoints: [
        'Text that looks like a number is still text: `+` glues it.',
        '`Integer.parseInt` and `Double.parseDouble` turn text into numbers.',
        '`String.valueOf(x)` turns any value into text.',
        'Bad text throws `NumberFormatException`; catch it for user input.',
        'Read input with `scanner.nextLine()`, then `strip()`, then parse.'
      ],
      commonMistakes: [
        'Adding before parsing: `"Total: " + a + b` with text values glues them. Parse first, then add in brackets.',
        'Parsing with spaces: `Integer.parseInt(" 7")` throws. Write `Integer.parseInt(text.strip())`.',
        'Parsing a decimal as an int: `Integer.parseInt("3.5")` throws. Use `Double.parseDouble`.',
        'Mixing `nextInt()` and `nextLine()`. Read every line with `nextLine()` and parse it.'
      ],
      related: ['changing-text', 'Types & Variables', 'Exceptions', 'I/O Basics']
    }
  ]);
})();
