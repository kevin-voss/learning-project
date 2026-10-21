// Lesson 09: packages and how they map to folders (id kept: packages-imports).
Java.topics.syntaxFundamentals.lessons.push({
  id: 'packages-imports',
  num: '09',
  title: 'Packages and Folders',
  category: 'organization',
  icon: 'pkg',
  tagline: 'Every class has an address',
  realWorld: 'A home address: country, city, street, house. Two children can both be called Sam, but "Sam, 4 Oak Street, Leeds" is only one child.',
  kid: [
    'In your town there may be two dogs called Max. To send a postcard to the right Max, you write the whole address: town, street, house number.',
    'Java has thousands of classes, and some share a name. So each class gets an address too. That address is called a package, and it looks like `java.util` or `com.example.shop`.',
    'The address is also a path on the computer: a folder inside a folder inside a folder. `com.example.shop` means the folder `com`, inside it `example`, inside it `shop`. The class file lives in the last one.'
  ],
  definition: 'A **package** is a named group of related classes, such as `java.util` or `com.example.shop`. Each part of the name is a folder: the package `com.example.shop` lives in the folder `com/example/shop/`.',
  explain: [
    'The package and the class name together form the **fully qualified name** of a class: `java.util.ArrayList` is the class `ArrayList` in the package `java.util`. That full name is unique in the whole program.',
    'Java itself is organised in packages. `java.lang` holds the basics (`String`, `System`, `Math`). `java.util` holds helpers like `ArrayList` and `Scanner`. `java.time` holds dates and times. Your own classes go into your own packages.',
    'You put a class into a package with a **package declaration**, the first line of code in the file: `package com.example.shop;`. The file must then live in the folder `com/example/shop/`, below a **source root** folder such as `src/`.',
    'By convention, package names are your web domain backwards, then the project: `com.example.shop` for a shop project of example.com. That keeps names unique worldwide. All parts are lowercase.',
    'A file without a package line belongs to the **unnamed package**. That is what every practice program on this site uses, so you can compile with `javac File.java`. As soon as a project has more than a few classes, you give it packages.'
  ],
  why: 'Packages keep large programs tidy, and they stop name clashes: `java.util.List` and `java.awt.List` are two different classes that can live side by side.',
  whenUse: 'In every real project, from the first class on. For one-file practice programs you can leave the package out.',
  syntax: '`package com.example.shop;` as the first line of code · file in `src/com/example/shop/` · full name `com.example.shop.Main`',
  fileName: 'WhereIsMyClass.java',
  code: `public class WhereIsMyClass {
    public static void main(String[] args) {
        // Every class lives in a package. ClassName.class asks Java about a class.
        System.out.println(String.class.getName());
        System.out.println(java.util.ArrayList.class.getName());
        System.out.println(java.time.LocalDate.class.getName());

        // The package is the part before the last dot
        System.out.println("Package of String: " + String.class.getPackageName());

        // A fully qualified name works without any import
        java.time.LocalDate birthday = java.time.LocalDate.of(2020, 5, 17);
        System.out.println("Birthday: " + birthday);

        // A file without a package line is in the unnamed package
        String mine = WhereIsMyClass.class.getPackageName();
        System.out.println("My package: [" + mine + "]");
    }
}`,
  output: `java.lang.String
java.util.ArrayList
java.time.LocalDate
Package of String: java.lang
Birthday: 2020-05-17
My package: []`,
  codeSummary: 'The program asks Java for the full names of a few classes. `String.class` is a value that describes the class `String`; `getName()` gives its fully qualified name and `getPackageName()` gives the package part.',
  codeExplanation: [
    { label: 'Line 4', code: 'System.out.println(String.class.getName());', text: 'Prints `java.lang.String`: the class `String` lives in the package `java.lang`.' },
    { label: 'Line 5', code: 'System.out.println(java.util.ArrayList.class.getName());', text: 'Here the code itself uses the full name `java.util.ArrayList`, so no import is needed.' },
    { label: 'Line 6', code: 'System.out.println(java.time.LocalDate.class.getName());', text: 'Dates live in the package `java.time`.' },
    { label: 'Line 9', code: 'System.out.println("Package of String: " + String.class.getPackageName());', text: '`getPackageName()` returns the part before the class name: `java.lang`.' },
    { label: 'Line 12', code: 'java.time.LocalDate birthday = java.time.LocalDate.of(2020, 5, 17);', text: 'Creates a date with the full class name, twice. It works, but it is long. The next lesson, Imports, makes it short.' },
    { label: 'Line 13', code: 'System.out.println("Birthday: " + birthday);', text: 'A date prints as year-month-day: `2020-05-17`.' },
    { label: 'Line 16', code: 'String mine = WhereIsMyClass.class.getPackageName();', text: 'Our file has no package line, so the package name is the empty text `""`.' },
    { label: 'Line 17', code: 'System.out.println("My package: [" + mine + "]");', text: 'The brackets make the empty text visible: `[]`.' }
  ],
  sections: [
    {
      title: 'A package name has parts',
      text: ['Read a package name from left to right, from the big group to the small one. These packages come with every JDK.'],
      table: {
        head: ['Package', 'What lives there', 'Examples'],
        rows: [
          ['`java.lang`', 'the basics, always available without import', '`String`, `System`, `Math`, `Integer`'],
          ['`java.util`', 'general helpers and collections', '`ArrayList`, `List`, `Scanner`, `Random`'],
          ['`java.time`', 'dates and times', '`LocalDate`, `LocalTime`, `Duration`'],
          ['`java.nio.file`', 'files and folders', '`Files`, `Path`'],
          ['`com.example.shop`', 'your own classes (example name)', '`Main`, `Product`']
        ],
        note: 'You read and write files in [Reading and Writing Files](../io-basics/index.html).'
      }
    },
    {
      title: 'Package → folder',
      text: [
        'Every dot in the package name is a step into a folder. The source file sits in the last folder, and its package line repeats the path with dots.',
        'Here is a small shop project with two packages: `com.example.shop` and `com.example.shop.util`. `util` is a folder inside `shop`.'
      ],
      mermaid: 'flowchart TD\n  ROOT["my-shop/src/ (source root)"] --> COM["com/"]\n  COM --> EX["example/"]\n  EX --> SHOP["shop/  =  package com.example.shop"]\n  SHOP --> MAIN["Main.java"]\n  SHOP --> UTIL["util/  =  package com.example.shop.util"]\n  UTIL --> LAB["Labels.java"]',
      diagramNote: 'Each dot in `com.example.shop.util` is one step down in the tree. The source root `src/` is not part of the package name.'
    },
    {
      title: 'The same project as files',
      text: [
        'The folder tree below shows where each file goes. `Labels.java` declares `package com.example.shop.util;` and offers a method `shout`. `Main.java` declares `package com.example.shop;` and imports `Labels` from the other package.',
        'A **method** is a named piece of code; `public static` lets other classes call it as `Labels.shout(...)`. You learn methods in [Methods](../methods/index.html).'
      ],
      codeLanguage: 'plaintext',
      fileName: 'Folder tree',
      code: `my-shop/
└── src/
    └── com/
        └── example/
            └── shop/
                ├── Main.java
                └── util/
                    └── Labels.java`
    },
    {
      title: 'The two source files',
      text: ['First the helper class in `src/com/example/shop/util/Labels.java`:'],
      fileName: 'src/com/example/shop/util/Labels.java',
      code: `package com.example.shop.util;

public class Labels {
    public static String shout(String text) {
        return text.toUpperCase() + "!";
    }
}`,
      tip: 'The class `Labels` must be `public` so that classes in other packages, like `Main`, may use it. Without `public`, a class is visible only inside its own package.'
    },
    {
      title: 'The main class that uses it',
      text: ['Then the starting class in `src/com/example/shop/Main.java`. The `import` line names the full address of `Labels`.'],
      fileName: 'src/com/example/shop/Main.java',
      code: `package com.example.shop;

import com.example.shop.util.Labels;

public class Main {
    public static void main(String[] args) {
        System.out.println(Labels.shout("fresh bread"));
        System.out.println("I live in " + Main.class.getPackageName());
    }
}`
    },
    {
      title: 'Compile and run a project with packages',
      text: [
        'Run these commands from the folder `my-shop`. `javac -d out` puts the compiled classes into a new folder `out`, and builds the package folders inside it. `java -cp out` says "look for classes in `out`". **cp** stands for **class path**, the list of places where the JVM looks for `.class` files.',
        'You run the class by its **full name** with dots, `com.example.shop.Main`, not by a file path. The output follows the commands.'
      ],
      codeLanguage: 'bash',
      fileName: 'Terminal (in my-shop)',
      code: `javac -d out src/com/example/shop/Main.java src/com/example/shop/util/Labels.java
java -cp out com.example.shop.Main`,
      output: `FRESH BREAD!
I live in com.example.shop`,
      warn: 'Running `java -cp out Main` fails with `Error: Could not find or load main class Main` and `Caused by: java.lang.ClassNotFoundException: Main`. The class is called `com.example.shop.Main` now; the short name is not enough.'
    }
  ],
  technical: [
    'The JVM finds a class by turning its full name into a path: `com.example.shop.Main` becomes `com/example/shop/Main.class`, searched in every folder on the class path. That is why the folders must match the package name.',
    'javac with `-d out` reads the package line of each file and writes the `.class` file into the matching folder below `out`. If the folders of your **source** files do not match their package lines, javac can still compile files you list by hand, but it cannot find other classes on its own, and your editor complains. Keep them matching.',
    'Packages also control **access**. A class or method without `public`, `private` or `protected` is **package-private**: visible only to classes in the same package. Larger projects group packages again into **modules**, declared in a file `module-info.java`; you do not need modules for anything on this site.'
  ],
  tryIt: {
    steps: [
      'Create the folders: `mkdir -p my-shop/src/com/example/shop/util` and `cd my-shop`.',
      'Create `src/com/example/shop/util/Labels.java` and `src/com/example/shop/Main.java` with the code from the sections above.',
      'Run `javac -d out src/com/example/shop/Main.java src/com/example/shop/util/Labels.java`, then `java -cp out com.example.shop.Main`.',
      'Look inside `out` with `ls -R out` (or `dir /s out` on Windows).'
    ],
    see: '`FRESH BREAD!` and `I live in com.example.shop`; inside `out` the folders `com/example/shop/` with `Main.class` and `util/Labels.class`.'
  },
  check: [
    { q: 'What is the fully qualified name of `ArrayList`?', a: '`java.util.ArrayList`: the package `java.util` plus the class name.' },
    { q: 'A file starts with `package com.example.games;`. Where does it live?', a: 'In the folder `com/example/games/` below the source root, for example `src/com/example/games/`.' },
    { q: 'How do you run the class `Main` from the package `com.example.shop` after `javac -d out ...`?', a: '`java -cp out com.example.shop.Main` from the project folder, with the full name and dots.' }
  ],
  keyPoints: [
    'A package is a named group of classes; its name maps to folders.',
    'The package line is the first line of code: `package com.example.shop;`.',
    'Package names are lowercase, usually a reversed domain: `com.example.shop`.',
    'Full name = package + class: `java.util.ArrayList`. It is unique.',
    'Compile with `javac -d out ...`, run with `java -cp out package.ClassName`.'
  ],
  commonMistakes: [
    'Package line and folder differ: `package com.example.shop;` in `src/shop/Main.java`. Fix: move the file to `src/com/example/shop/`.',
    'Running by short name or path: `java Main` or `java com/example/shop/Main`. Fix: `java -cp out com.example.shop.Main`.',
    'Capital letters in packages: `package com.example.Shop;`. Fix: all lowercase, `com.example.shop`.',
    'Using a class from another package that is not `public`. Fix: mark the class (and the method) `public`.'
  ],
  related: ['Imports', 'Anatomy of a Java File', 'Build Tools'],
  glossary: [
    { term: 'package', definition: 'A named group of related classes, such as java.util. Each part of the name is a folder.' },
    { term: 'fully qualified name', definition: 'The package plus the class name, such as java.util.ArrayList. It names exactly one class.' },
    { term: 'class path', definition: 'The list of folders (and JAR files) where the JVM looks for .class files. Set with -cp.' },
    { term: 'unnamed package', definition: 'Where a class goes when its file has no package line. Fine for small practice programs.' }
  ]
});
