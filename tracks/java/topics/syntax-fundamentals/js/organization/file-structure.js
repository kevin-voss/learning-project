// Lesson 08 (new): how one .java file is built from top to bottom.
Java.topics.syntaxFundamentals.lessons.push({
  id: 'file-structure',
  num: '08',
  title: 'Anatomy of a Java File',
  category: 'organization',
  icon: '▤',
  tagline: 'Package, imports, class: always in this order',
  realWorld: 'A letter in an envelope. The address comes first, then "Dear ...", then the text, then the signature. Everybody writes letters in that order, so the postman and the reader always know where to look.',
  kid: [
    'When you write a letter to your grandma, you follow an order. First the address, then "Dear Grandma", then your story, and at the end your name.',
    'A Java file has an order too. At the very top: where the file lives (the package). Then: which helpers it borrows from other places (the imports). Then: the class, with everything it knows and can do inside its braces.',
    'If you put the parts in the wrong order, Java is like a postman who finds the address at the bottom of the letter. It does not know what to do with it.'
  ],
  definition: 'A `.java` file is a **compilation unit**: the piece of code javac reads at once. From top to bottom it holds an optional `package` line, then zero or more `import` lines, then one or more class declarations, of which at most one is `public` and named like the file.',
  explain: [
    '**1. The package line** (optional, at most one) says which package the class belongs to: `package com.example.shop;`. A package is a named group of classes that matches a folder. Without this line, the class is in the **unnamed package**, which is fine for small practice programs.',
    '**2. The import lines** (zero or more) name classes from other packages that this file uses, so you can write `List` instead of `java.util.List`. They come after the package line and before any class.',
    '**3. The class declaration.** The `public` class must have the same name as the file. Its body, between `{` and `}`, holds the **members** of the class: **fields** (variables that belong to the class, such as constants) and **methods** (named pieces of code, such as `main`).',
    'Inside the class, the usual order is: constants and fields first, then constructors, then methods. `main` often comes first among the methods, so the reader sees where the program starts. You learn constructors in [Classes and Objects](../classes-and-objects/index.html).',
    'A file may also hold more classes without `public`. Each one becomes its own `.class` file. In real projects you give every class its own file, so you can always find it by name.'
  ],
  why: 'A fixed order means every Java file looks the same. You open any file in any project and know where to find its package, the classes it uses and its code.',
  whenUse: 'In every file you write. For the practice programs on this site you skip the package line; in real projects with folders, you always write it.',
  syntax: '`package name;` (optional) → `import package.Class;` (zero or more) → `public class FileName { fields ... methods ... }`',
  fileName: 'ShoppingList.java',
  code: `// 1. A package line would go here (see Packages and Folders)

// 2. Imports: classes from other packages
import java.util.ArrayList;
import java.util.List;

// 3. The public class: same name as the file
public class ShoppingList {

    // 3a. Constants and other fields
    static final int MAX_ITEMS = 5;

    // 3b. The main method: the program starts here
    public static void main(String[] args) {
        List<String> items = new ArrayList<>();
        items.add("bread");
        items.add("milk");
        printSummary(items);
    }

    // 3c. Other methods
    static void printSummary(List<String> items) {
        System.out.println("Items: " + items);
        System.out.println("Room left: " + (MAX_ITEMS - items.size()));
    }
}

// 4. A second, non-public class may follow (rare in real code)
class Helper {
}`,
  output: `Items: [bread, milk]
Room left: 3`,
  codeSummary: 'Every part of a file in its place: comments, imports, the public class with a constant, `main` and a second method, and a small extra class at the end. A **List** is a row of values that can grow; you learn it in [Collections](../collections/index.html).',
  codeExplanation: [
    { label: 'Line 1', code: '// 1. A package line would go here (see Packages and Folders)', text: 'If the file had a package line, it would be the first line of code. Comments may stand above it.' },
    { label: 'Lines 4–5', code: 'import java.util.ArrayList;\nimport java.util.List;', text: 'Two imports from the package `java.util`. They must come before the class.' },
    { label: 'Line 8', code: 'public class ShoppingList {', text: 'The public class. The file must be called `ShoppingList.java`.' },
    { label: 'Line 11', code: 'static final int MAX_ITEMS = 5;', text: 'A field: a constant that belongs to the class. Fields usually come first in the class body.' },
    { label: 'Line 14', code: 'public static void main(String[] args) {', text: 'The `main` method. The JVM starts the program here.' },
    { label: 'Line 15', code: 'List<String> items = new ArrayList<>();', text: 'Makes an empty list of texts. The short names work because of the imports.' },
    { label: 'Line 18', code: 'printSummary(items);', text: 'Calls the other method of this class and hands it the list.' },
    { label: 'Line 22', code: 'static void printSummary(List<String> items) {', text: 'A second method. It prints the list and how much room is left.' },
    { label: 'Line 24', code: 'System.out.println("Room left: " + (MAX_ITEMS - items.size()));', text: '`items.size()` is 2, so 5 − 2 = 3.' },
    { label: 'Line 29', code: 'class Helper {', text: 'A second class without `public`. javac writes it to its own file `Helper.class`.' }
  ],
  sections: [
    {
      title: 'Top to bottom',
      text: ['Every Java file follows this order. Boxes marked optional can be left out; the class is the part you always need.'],
      mermaid: 'flowchart TD\n  P["package line (optional, at most one)"] --> I["import lines (zero or more)"]\n  I --> C["public class FileName (at most one public class)"]\n  C --> F["fields and constants"]\n  F --> M["main method"]\n  M --> O["other methods"]\n  C --> E["more classes without public (optional, rare)"]',
      diagramNote: 'The first three boxes are the order javac enforces. Fields, `main` and other methods all sit inside the braces of the class; their order is a convention.'
    },
    {
      title: 'The parts at a glance',
      table: {
        head: ['Part', 'How many', 'Where', 'Example'],
        rows: [
          ['package line', '0 or 1', 'first line of code', '`package com.example.shop;`'],
          ['import lines', '0 or more', 'after the package line', '`import java.util.List;`'],
          ['public class', '0 or 1 (usually 1)', 'after the imports, named like the file', '`public class ShoppingList {`'],
          ['other classes', '0 or more', 'anywhere after the imports', '`class Helper { }`'],
          ['comments', 'any', 'anywhere', '`// note`']
        ],
        note: 'Comments and blank lines can go anywhere, even above the package line.'
      }
    },
    {
      title: 'Wrong vs right: an import in the wrong place',
      text: [
        'Here the import stands after the class. When javac reaches it, it expects another class, not an import. The message lists what it expected: `class, interface, enum, or record`.',
        'Fix: move the import line to the top of the file, above `public class LateImport`.'
      ],
      fileName: 'LateImport.java',
      noRun: true,
      code: `public class LateImport {
    public static void main(String[] args) {
        System.out.println("Hi");
    }
}

import java.util.List;`,
      output: `LateImport.java:7: error: class, interface, enum, or record expected
import java.util.List;
^
1 error`
    },
    {
      title: 'One public class per file',
      text: [
        'A second `public` class in the same file is not allowed. javac wants each public class in its own file, named after it.',
        'Fix: remove `public` from `Other`, or better, move `Other` into its own file `Other.java`.'
      ],
      fileName: 'TwoPublic.java',
      noRun: true,
      code: `public class TwoPublic {
    public static void main(String[] args) {
        System.out.println("Hi");
    }
}

public class Other {
}`,
      output: `TwoPublic.java:7: error: class Other is public, should be declared in a file named Other.java
public class Other {
       ^
1 error`
    },
    {
      title: 'One .class file per class',
      text: [
        'Compile the example and list the folder. javac wrote one `.class` file for each class in the file, named after the class, not after the file.',
        '`java ShoppingList` runs the class that has `main`. `Helper` has no `main`, so `java Helper` would fail.'
      ],
      codeLanguage: 'bash',
      fileName: 'Terminal',
      code: `javac ShoppingList.java
ls`,
      output: `Helper.class
ShoppingList.class
ShoppingList.java`
    }
  ],
  technical: [
    'The JLS (section 7.3) defines a compilation unit as: an optional package declaration, then import declarations, then top-level type declarations. The parser follows this order strictly, which is why a late `import` fails.',
    'The rule "a public class lives in a file with its name" lets javac find classes on disk. When your code uses a class `Store` that is not compiled yet, javac looks for `Store.java` in the right folder and compiles it too.',
    'Each class, also a nested one, becomes its own `.class` file: `ShoppingList.class`, `Helper.class`, and for a class inside a class, `Outer$Inner.class`. The JVM loads these files one by one when the program first needs each class.'
  ],
  tryIt: {
    steps: [
      'Create `ShoppingList.java`, paste the example, compile it and run `java ShoppingList`.',
      'Run `ls` (or `dir` on Windows) and find the two `.class` files.',
      'Move the line `import java.util.List;` below the last `}` of the file. Compile and read the error. Move it back.'
    ],
    see: 'first `Items: [bread, milk]` and `Room left: 3`; then `Helper.class` and `ShoppingList.class`; then `class, interface, enum, or record expected`.'
  },
  check: [
    { q: 'In which order do the package line, the imports and the class appear?', a: 'Package line first (if there is one), then the imports, then the class.' },
    { q: 'A file `Shop.java` contains `public class Shop` and `public class Item`. What happens?', a: 'It does not compile: `class Item is public, should be declared in a file named Item.java`. Move `Item` into its own file.' },
    { q: 'How many `.class` files does javac create for a file with two classes?', a: 'Two, one per class, each named after its class.' }
  ],
  keyPoints: [
    'Order in a file: package line, imports, classes.',
    'The package line is optional; when present it is the first line of code.',
    'At most one public class per file, named exactly like the file.',
    'Inside a class: fields first, then methods; `main` is a good first method.',
    'javac writes one `.class` file per class.'
  ],
  commonMistakes: [
    'An import below the class: `} import java.util.List;`. Fix: move all imports to the top.',
    'Two public classes in one file. Fix: one public class per file.',
    'Statements outside any method: `System.out.println("Hi");` straight in the class body. Fix: put statements inside `main` or another method.',
    'A file name that does not match: `public class Shop` in `Store.java`. Fix: rename the file to `Shop.java`.'
  ],
  related: ['Packages and Folders', 'Imports', 'Getting Started'],
  glossary: [
    { term: 'compilation unit', definition: 'One .java file as javac sees it: optional package line, imports, then class declarations.' },
    { term: 'field', definition: 'A variable that belongs to a class instead of a method, such as a constant.' },
    { term: 'member', definition: 'Anything declared inside a class body: fields, methods, constructors.' }
  ]
});
