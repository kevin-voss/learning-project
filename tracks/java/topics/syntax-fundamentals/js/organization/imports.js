// Lesson 10 (new): import statements, java.lang, wildcards, clashes and static imports.
Java.topics.syntaxFundamentals.lessons.push({
  id: 'imports',
  num: '10',
  title: 'Imports',
  category: 'organization',
  icon: '⇩',
  tagline: 'Short names for classes from other packages',
  realWorld: 'The contacts on a phone. Once you save "Grandma" with her full number, you tap "Grandma" instead of typing the number every time.',
  kid: [
    'Your friend Sam lives at "Sam, 4 Oak Street, Leeds". Writing that every time is tiring. So you tell your mum once: "When I say Sam, I mean the Sam from Oak Street." From then on, "Sam" is enough.',
    'An import in Java does the same. At the top of the file you say once: "When I write `List`, I mean the `List` from `java.util`." After that, the short name works in the whole file.',
    'The import does not carry anything into your file. It is only a promise about which Sam you mean.'
  ],
  definition: 'An **import declaration** at the top of a file lets you use a class from another package by its short name: after `import java.util.List;` you write `List` instead of `java.util.List`.',
  explain: [
    'Without imports you must write the **fully qualified name** of every class from another package, like `java.time.LocalDate`. That works, but lines get long. An import is a shortcut for the compiler, valid in that one file.',
    'A **single-type import** names one class: `import java.util.ArrayList;`. A **wildcard import** (also called on-demand import) names a whole package with `*`: `import java.util.*;` makes every class of `java.util` available by short name.',
    'Two groups of classes never need an import: classes in **`java.lang`** (such as `String`, `System`, `Math`, `Integer`), which Java imports in every file for you, and classes in the **same package** as your file.',
    'An import does not copy code and does not make the program slower or bigger. If you import a class and never use it, nothing happens, but it clutters the file. Editors can remove unused imports for you.',
    'A **static import** brings in a static member (a method or constant that belongs to a class) instead of a class: after `import static java.lang.Math.max;` you can write `max(4, 2)` instead of `Math.max(4, 2)`. Use it rarely, because readers can no longer see where `max` comes from.'
  ],
  why: 'Imports keep code short and readable, and the list at the top of a file shows at a glance which other packages the file depends on.',
  whenUse: 'Whenever you use a class from a package other than `java.lang` and your own package. Prefer one single-type import per class.',
  syntax: '`import package.ClassName;` · `import package.*;` · `import static package.ClassName.member;` (all after the package line, before the class)',
  fileName: 'Imports.java',
  code: `import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static java.lang.Math.max;

public class Imports {
    public static void main(String[] args) {
        // Short names thanks to the imports above
        List<String> pets = new ArrayList<>();
        pets.add("cat");
        pets.add("dog");
        System.out.println("Pets: " + pets);

        LocalDate start = LocalDate.of(2026, 9, 1);
        System.out.println("School starts: " + start);

        int[] scores = {7, 3, 9};
        Arrays.sort(scores);
        System.out.println("Sorted: " + Arrays.toString(scores));

        // String and Math come from java.lang: no import needed
        String word = "java";
        System.out.println(word.toUpperCase() + " " + Math.min(4, 2));

        // The static import lets you write max instead of Math.max
        System.out.println("Bigger: " + max(4, 2));
    }
}`,
  output: `Pets: [cat, dog]
School starts: 2026-09-01
Sorted: [3, 7, 9]
JAVA 2
Bigger: 4`,
  codeSummary: 'Four classes from `java.util` and `java.time` are imported by name, one method is imported statically, and `String` and `Math` work without any import. `int[]` is an **array**, a fixed row of numbers; you learn it in [Arrays](../arrays/index.html).',
  codeExplanation: [
    { label: 'Line 1', code: 'import java.time.LocalDate;', text: 'A single-type import. From now on `LocalDate` means `java.time.LocalDate` in this file.' },
    { label: 'Lines 2–4', code: 'import java.util.ArrayList;\nimport java.util.Arrays;\nimport java.util.List;', text: 'Three classes from the same package, each with its own line. Editors keep them sorted.' },
    { label: 'Line 6', code: 'import static java.lang.Math.max;', text: 'A static import: it brings in the method `max`, not a class.' },
    { label: 'Line 11', code: 'List<String> pets = new ArrayList<>();', text: 'Uses the short names `List` and `ArrayList`. Without the imports, this line would not compile.' },
    { label: 'Line 16', code: 'LocalDate start = LocalDate.of(2026, 9, 1);', text: 'Compare with the long `java.time.LocalDate` in the Packages and Folders lesson.' },
    { label: 'Line 20', code: 'Arrays.sort(scores);', text: '`Arrays` is a helper class from `java.util`. `sort` puts the numbers in order.' },
    { label: 'Line 25', code: 'System.out.println(word.toUpperCase() + " " + Math.min(4, 2));', text: '`String`, `System` and `Math` live in `java.lang`, so they need no import.' },
    { label: 'Line 28', code: 'System.out.println("Bigger: " + max(4, 2));', text: '`max` alone works because of the static import on line 6.' }
  ],
  sections: [
    {
      title: 'Three ways to name a class from another package',
      table: {
        head: ['Way', 'Code', 'Good for'],
        rows: [
          ['fully qualified name', '`java.util.List<String> pets = ...`', 'a class you use once, or to solve a name clash'],
          ['single-type import', '`import java.util.List;` then `List<String> pets`', 'the normal way; one line per class'],
          ['wildcard import', '`import java.util.*;` then `List<String> pets`', 'many classes from one package; hides which ones you use']
        ],
        note: 'A wildcard covers one package only. `import java.util.*;` does not include `java.util.function`, which is a different package.'
      }
    },
    {
      title: 'How the compiler finds a short name',
      text: ['When javac meets a short class name like `List`, it searches in a fixed order. The first match wins.'],
      mermaid: 'flowchart TD\n  N["short name in your code, e.g. List"] --> A{"declared in this file or single-type imported?"}\n  A -->|yes| F["found"]\n  A -->|no| B{"a class in the same package?"}\n  B -->|yes| F\n  B -->|no| C{"in a wildcard import or java.lang?"}\n  C -->|"exactly one match"| F\n  C -->|"two matches"| AMB["error: reference is ambiguous"]\n  C -->|"no match"| ERR["error: cannot find symbol"]',
      diagramNote: 'A single-type import beats everything below it. That is how you settle a clash between two wildcard imports.'
    },
    {
      title: 'Wrong vs right: the missing import',
      text: [
        'Here `List` and `ArrayList` are used without imports. They are not in `java.lang` and not in the same package, so javac cannot find them.',
        '`symbol: class List` tells you which name is unknown. `location: class NoImport` tells you where it was used. Fix: add `import java.util.ArrayList;` and `import java.util.List;` at the top.'
      ],
      fileName: 'NoImport.java',
      noRun: true,
      code: `public class NoImport {
    public static void main(String[] args) {
        List<String> pets = new ArrayList<>();
        System.out.println(pets);
    }
}`,
      output: `NoImport.java:3: error: cannot find symbol
        List<String> pets = new ArrayList<>();
        ^
  symbol:   class List
  location: class NoImport
NoImport.java:3: error: cannot find symbol
        List<String> pets = new ArrayList<>();
                                ^
  symbol:   class ArrayList
  location: class NoImport
2 errors`
    },
    {
      title: 'Two classes with the same name',
      text: [
        'The JDK has two classes called `List`: `java.util.List` (a list of values) and `java.awt.List` (a list box on a window). With two wildcard imports, javac cannot choose.',
        'Fix: add a single-type import for the one you mean, `import java.util.List;`. It beats both wildcards. Or write the full name where you use it.'
      ],
      fileName: 'Ambiguous.java',
      noRun: true,
      code: `import java.awt.*;
import java.util.*;

public class Ambiguous {
    public static void main(String[] args) {
        List<String> pets = new ArrayList<>();
        System.out.println(pets);
    }
}`,
      output: `Ambiguous.java:6: error: reference to List is ambiguous
        List<String> pets = new ArrayList<>();
        ^
  both interface java.util.List in java.util and class java.awt.List in java.awt match
1 error`,
      tip: 'This clash is one reason many teams avoid wildcard imports. With single-type imports, you always see which class you get.'
    },
    {
      title: 'Static imports',
      text: [
        'A normal import gives you a class. A static import gives you a **static member** of a class: a method or constant you call on the class itself, like `Math.max` or `Math.PI`.',
        'The program below imports `PI` and `sqrt` from `Math`. The formula reads like school maths. Keep static imports for cases like this, where the short names are well known.'
      ],
      fileName: 'Circle.java',
      code: `import static java.lang.Math.PI;
import static java.lang.Math.sqrt;

public class Circle {
    public static void main(String[] args) {
        double radius = 2.0;
        double area = PI * radius * radius;

        System.out.println("Area: " + area);
        System.out.println("Square root of 16: " + sqrt(16));
    }
}`,
      output: `Area: 12.566370614359172
Square root of 16: 4.0`
    }
  ],
  technical: [
    'Imports exist only while compiling. In the `.class` file, every class is written with its full name, for example `java/util/ArrayList`. You can see this with `javap -c Imports.class`, a JDK tool that prints the bytecode.',
    'That is why imports cost nothing at run time, and why a wildcard import does not "load the whole package". The JVM loads each class only when the program first uses it, no matter how it was imported.',
    'The JLS (section 7.5) defines the shadowing order: classes declared in the file and single-type imports come first, then classes of the same package, then wildcard imports and `java.lang`. Two matches on the same level are an error, which is the "ambiguous" message you saw.'
  ],
  tryIt: {
    steps: [
      'Create `Imports.java`, paste the example, compile and run it.',
      'Delete the line `import java.time.LocalDate;`. Compile and read the error.',
      'Instead of putting the import back, change the line to `java.time.LocalDate start = java.time.LocalDate.of(2026, 9, 1);`. Compile and run.'
    ],
    see: 'first five lines of output; then `cannot find symbol` with `symbol: class LocalDate`; then the same five lines again, now without the import.'
  },
  check: [
    { q: 'Why can you use `String` and `Math` without an import?', a: 'They live in `java.lang`, which Java imports into every file for you.' },
    { q: 'Does `import java.util.*;` make the program bigger or slower?', a: 'No. Imports only help the compiler find names. The `.class` file uses full names, and classes load only when used.' },
    { q: 'You get `reference to List is ambiguous`. How do you fix it?', a: 'Add a single-type import for the one you mean, such as `import java.util.List;`, or write the full name `java.util.List`.' }
  ],
  keyPoints: [
    'An import lets you use a class from another package by its short name.',
    'Imports go after the package line and before the class.',
    '`java.lang` and your own package need no import.',
    'Prefer single-type imports; a wildcard covers one package only.',
    'Static imports bring in static members; use them rarely.'
  ],
  commonMistakes: [
    'Forgetting an import, which gives `cannot find symbol` with `symbol: class ...`. Fix: add `import package.ClassName;`.',
    'Importing a package instead of a class: `import java.util;`. Fix: `import java.util.List;` or `import java.util.*;`.',
    'Expecting a wildcard to include sub-packages: `import java.util.*;` for `java.util.function.Function`. Fix: import `java.util.function.Function` too.',
    'Writing an import inside the class. Fix: imports go at the top of the file.'
  ],
  related: ['Packages and Folders', 'Anatomy of a Java File', 'Collections'],
  glossary: [
    { term: 'import declaration', definition: 'A line at the top of a file, such as import java.util.List;, that lets you use a class by its short name.' },
    { term: 'wildcard import', definition: 'An import with * such as import java.util.*; that makes all classes of one package available by short name.' },
    { term: 'static import', definition: 'An import of a static method or constant, such as import static java.lang.Math.max;.' }
  ]
});
