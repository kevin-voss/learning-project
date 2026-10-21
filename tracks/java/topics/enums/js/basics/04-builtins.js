// Enums, lesson 4: the methods every enum gets for free.
(function () {
  Java.addCoreLessons('enums', [
    {
      id: 'enum-builtins',
      title: 'Built-in Methods: values, valueOf, name, ordinal',
      category: 'practice',
      icon: '#',
      tagline: 'What every enum can do for free',
      realWorld: 'A row of numbered lockers at a swimming pool. Each locker has a name tag and a position number. You can walk along the row, find a locker by its name tag, or read its number. But if the pool adds a new locker in the middle, every number after it changes, while the name tags stay.',
      kid: [
        'Every enum comes with a few tricks that you do not have to write yourself.',
        'You can ask: “Show me all of your cards.” You can ask: “Give me the card called MEDIUM.” You can ask a card: “What is your name?” or “Where are you in the row?”',
        'The place in the row is a number like 0, 1 or 2. It is handy, but it changes when someone puts a new card in the middle. So you never write that number down to remember a card. You write down the name.'
      ],
      definition: 'Every enum gets `values()`, `valueOf(String)`, `name()`, `toString()`, `ordinal()` and `compareTo(...)` from Java. `valueOf` turns text into a constant and throws `IllegalArgumentException` when no constant has that exact name.',
      explain: [
        '`values()` is a **static** method (you call it on the type, `Size.values()`). It returns a new array with all constants in declaration order. Because the array is new each time, changing it does not change the enum.',
        '`valueOf(String)` is also static. It finds the constant whose name is **exactly** the text: `Size.valueOf("MEDIUM")` gives `Size.MEDIUM`. Upper and lower case count. For any other text it throws an `IllegalArgumentException` (an exception, see [Exceptions](../exceptions/index.html)) with the message `No enum constant Size.medium`. For `null` it throws a `NullPointerException`.',
        '`name()` returns the name exactly as you wrote it in the source code. `toString()` returns the name too, but you can **override** it (write your own version) to show friendlier text. `println` and `+` use `toString()`. So use `name()` when you need the real name, for example to save it.',
        '`ordinal()` returns the position, starting at 0. `compareTo` compares two constants by that position: `SMALL.compareTo(LARGE)` is negative because SMALL comes first. The order of the declaration is the natural order of an enum.',
        'Never **store** the ordinal in a file or a database. If someone adds a constant in the middle or changes the order, the saved numbers point at different constants and nobody notices. Store `name()` and read it back with `valueOf`.'
      ],
      why: 'You can list, look up, print, order and save constants without writing a single helper method.',
      whenUse: '`values()` for menus and loops, `valueOf` for text from users or files, `name()` for saving, `ordinal()` and `compareTo` almost only inside Java itself.',
      syntax: '`Size.values()`, `Size.valueOf("MEDIUM")`, `size.name()`, `size.ordinal()`, `a.compareTo(b)`',
      fileName: 'BuiltIns.java',
      code: `enum Size { SMALL, MEDIUM, LARGE }

public class BuiltIns {
    public static void main(String[] args) {
        for (Size s : Size.values()) {
            System.out.println(s.ordinal() + " " + s.name());
        }

        Size fromText = Size.valueOf("MEDIUM");
        System.out.println("valueOf: " + fromText);
        System.out.println(fromText == Size.MEDIUM);

        System.out.println(Size.SMALL.compareTo(Size.LARGE));
        System.out.println(Size.LARGE.compareTo(Size.SMALL));

        try {
            Size.valueOf("medium");
        } catch (IllegalArgumentException e) {
            System.out.println("Error: " + e.getMessage());
        }
        System.out.println("number of sizes: " + Size.values().length);
    }
}`,
      output: `0 SMALL
1 MEDIUM
2 LARGE
valueOf: MEDIUM
true
-2
2
Error: No enum constant Size.medium
number of sizes: 3`,
      codeSummary: 'Lists every size with its position, turns text into a constant, compares two constants and shows what `valueOf` does with a wrong spelling.',
      codeExplanation: [
        { label: 'Line 5', code: 'for (Size s : Size.values()) {', text: '`values()` gives a new array `[SMALL, MEDIUM, LARGE]`.' },
        { label: 'Line 6', code: 'System.out.println(s.ordinal() + " " + s.name());', text: '`ordinal()` is the position from 0, `name()` the name from the source code.' },
        { label: 'Line 9', code: 'Size fromText = Size.valueOf("MEDIUM");', text: 'Turns the text into the constant. This is how you read a saved name back.' },
        { label: 'Line 11', code: 'System.out.println(fromText == Size.MEDIUM);', text: '`valueOf` returns the existing object, so `==` is `true`.' },
        { label: 'Line 13', code: 'System.out.println(Size.SMALL.compareTo(Size.LARGE));', text: 'The difference of the ordinals: 0 − 2 = −2. Negative means “comes before”.' },
        { label: 'Line 17', code: 'Size.valueOf("medium");', text: 'Lower case does not match `MEDIUM`, so `valueOf` throws.' },
        { label: 'Line 18', code: '} catch (IllegalArgumentException e) {', text: 'The exception is caught, so the program does not crash. The message names the enum and the wrong text.' },
        { label: 'Line 21', code: 'System.out.println("number of sizes: " + Size.values().length);', text: 'The array length is the number of constants.' }
      ],
      sections: [
        {
          title: 'Reading user input safely',
          text: [
            'Text from a user is often in the wrong case or has spaces around it. Clean it with `trim()` and `toUpperCase()` (from [Strings](../strings/index.html)), then call `valueOf` inside `try`. If it still fails, fall back to a default.'
          ],
          fileName: 'ParseSize.java',
          code: `enum Size { SMALL, MEDIUM, LARGE }

public class ParseSize {
    static Size parse(String text, Size fallback) {
        if (text == null) {
            return fallback;
        }
        try {
            return Size.valueOf(text.trim().toUpperCase());
        } catch (IllegalArgumentException e) {
            System.out.println("  unknown size: '" + text + "'");
            return fallback;
        }
    }

    public static void main(String[] args) {
        String[] inputs = { "LARGE", " small ", "Medium", "huge", null };
        for (String input : inputs) {
            System.out.println(input + " -> " + parse(input, Size.MEDIUM));
        }
    }
}`,
          output: `LARGE -> LARGE
 small  -> SMALL
Medium -> MEDIUM
  unknown size: 'huge'
huge -> MEDIUM
null -> MEDIUM`
        },
        {
          title: 'name() stays, toString() can change',
          text: [
            'Override `toString()` inside the enum when people should see friendly text. `name()` cannot be overridden (it is `final`), so it always gives the real constant name. That makes `name()` the safe choice for saving and `toString()` the choice for showing.'
          ],
          fileName: 'FriendlyNames.java',
          code: `enum Size {
    SMALL, MEDIUM, LARGE;

    @Override
    public String toString() {
        String n = name();
        return n.charAt(0) + n.substring(1).toLowerCase();
    }
}

public class FriendlyNames {
    public static void main(String[] args) {
        Size s = Size.LARGE;
        System.out.println("Shown to the user: " + s);
        System.out.println("Saved in the file: " + s.name());
        System.out.println("Read back: " + Size.valueOf(s.name()));
    }
}`,
          output: `Shown to the user: Large
Saved in the file: LARGE
Read back: Large`,
          tip: 'When an enum has methods, a `;` must end the list of constants. Without methods, the `;` is optional.'
        },
        {
          title: 'Why you never store the ordinal',
          text: [
            'Picture version 1 of a program that saves the ordinal. A customer’s order is saved as the number `1`, which meant MEDIUM. In version 2, a teammate adds `EXTRA_SMALL` at the front. The program reads the same `1` and now gets SMALL. No error, no warning: a wrong pizza.',
            'The program below plays both versions side by side with two enums.'
          ],
          fileName: 'OrdinalTrap.java',
          code: `enum SizeV1 { SMALL, MEDIUM, LARGE }
enum SizeV2 { EXTRA_SMALL, SMALL, MEDIUM, LARGE }

public class OrdinalTrap {
    public static void main(String[] args) {
        // version 1 saves the order
        int savedNumber = SizeV1.MEDIUM.ordinal();
        String savedName = SizeV1.MEDIUM.name();
        System.out.println("saved: " + savedNumber + " and " + savedName);

        // version 2 reads it back
        SizeV2 byNumber = SizeV2.values()[savedNumber];
        SizeV2 byName = SizeV2.valueOf(savedName);
        System.out.println("by ordinal: " + byNumber);
        System.out.println("by name:    " + byName);
    }
}`,
          output: `saved: 1 and MEDIUM
by ordinal: SMALL
by name:    MEDIUM`,
          mermaid: `flowchart LR
  A["V1 saves MEDIUM"] --> B["as ordinal: 1"]
  A --> C["as name: MEDIUM"]
  B --> D["V2 reads 1"]
  D --> E["SMALL (wrong)"]
  C --> F["V2 reads MEDIUM"]
  F --> G["MEDIUM (right)"]`,
          diagramNote: 'The ordinal is a position, and positions move. The name is the identity of the constant.'
        },
        {
          title: 'All built-in methods at a glance',
          table: {
            head: ['Method', 'Called on', 'Returns', 'Use it for'],
            rows: [
              ['`values()`', 'the type: `Size.values()`', 'new array of all constants', 'loops, menus, counting'],
              ['`valueOf(String)`', 'the type: `Size.valueOf("SMALL")`', 'the constant, or throws', 'text from users or files'],
              ['`name()`', 'a constant: `s.name()`', 'the name from the source', 'saving, logging'],
              ['`toString()`', 'a constant', 'the name, unless overridden', 'showing to people'],
              ['`ordinal()`', 'a constant', 'position from 0', 'rarely; never for saving'],
              ['`compareTo(other)`', 'a constant', 'negative, 0 or positive', 'sorting in declaration order'],
              ['`equals`, `hashCode`', 'a constant', 'like `==`', 'used by collections']
            ],
            note: '`values()` and `valueOf(String)` are written by the compiler into your enum. The others come from the class `java.lang.Enum`.'
          }
        }
      ],
      technical: [
        'The class `java.lang.Enum` stores two fields in every constant: `name` (a `String`) and `ordinal` (an `int`). The compiler passes both to `Enum`’s constructor when it creates the constants. `name()`, `ordinal()`, `compareTo` and `equals` are `final` methods of `Enum`, so no enum can change them.',
        '`values()` is generated by the compiler. It returns `$VALUES.clone()`, a copy of a hidden private array. The copy protects the enum: if `values()` returned the real array, any code could overwrite a slot.',
        '`valueOf(String)` is generated too. It calls `Enum.valueOf(Size.class, text)`, which looks the name up in a map that the JVM builds once per enum. So `valueOf` is fast, but it compares names exactly, character by character.'
      ],
      tryIt: {
        steps: [
          'Copy `ParseSize.java` and run it.',
          'Add `"LaRgE"` and `""` to the `inputs` array and run again.',
          'Remove `.toUpperCase()` from `parse` and run once more.'
        ],
        see: '`LaRgE -> LARGE` and an unknown-size message for the empty text. Without `toUpperCase()`, ` small ` and `Medium` are suddenly unknown too.'
      },
      check: [
        { q: 'What does `Size.valueOf("Small")` do when the constant is `SMALL`?', a: 'It throws `IllegalArgumentException: No enum constant Size.Small`. The name must match exactly, case included.' },
        { q: 'What is the difference between `name()` and `toString()`?', a: 'Both return the name by default. `toString()` can be overridden to show friendly text; `name()` is final and always returns the real name.' },
        { q: 'What is `Size.LARGE.ordinal()` for `enum Size { SMALL, MEDIUM, LARGE }`?', a: '`2`. Counting starts at 0.' }
      ],
      keyPoints: [
        '`values()` returns a fresh array of all constants in declaration order.',
        '`valueOf` needs the exact name and throws `IllegalArgumentException` otherwise.',
        'Use `name()` to save, `toString()` to show.',
        'The ordinal is a position that changes when the list changes.',
        'Save names, never ordinals.'
      ],
      commonMistakes: [
        '`Size.valueOf(userInput)` without `try`. A typo by the user crashes the program. Clean the text and catch `IllegalArgumentException`.',
        '`int saved = size.ordinal();` written to a file. A new constant in the middle breaks old data. Save `size.name()`.',
        '`Size.valueOf(size.toString())` after overriding `toString()`. `"Large"` is not a name, so it throws. Use `name()` for this.',
        'Calling `Size.values()` inside a hot loop many thousand times. Each call makes a new array. Store it once in a variable if you need it often.'
      ],
      related: ['Strings', 'Exceptions', 'Arrays']
    }
  ]);
})();
