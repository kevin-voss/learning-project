// Build tools, lesson 7: add a library from Maven Central, see where it goes, and use it.
(function () {
  Java.addCoreLessons('build-tools', [
    {
      id: 'dependencies',
      title: 'Add a Library',
      category: 'concept',
      icon: '+',
      tagline: 'Coordinates, Maven Central and ~/.m2',
      glossary: Java.buildToolsTerms,
      realWorld: 'A library in town. You write the exact title and shelf number on a slip. The librarian fetches the book from the big store in the city, and you keep it on your own shelf at home. Next time you need it, it is already there.',
      kid: [
        'You want to build a car, but you do not want to make the wheels yourself. Somebody already makes great wheels.',
        'So you write on your shopping list: "wheels, from the shop `org.apache.commons`, model `commons-lang3`, size `3.17.0`". The robot drives to the giant shop on the internet, called **Maven Central**, and brings the wheels home.',
        'At home it puts them in a cupboard called `~/.m2`. Next time you need the same wheels, the robot takes them from the cupboard and does not drive to the shop again.'
      ],
      definition: 'A **dependency** is a library your code uses. You add it as a `<dependency>` with its **coordinates** (`groupId`, `artifactId`, `version`). Maven downloads the jar from **Maven Central** into your **local repository** `~/.m2/repository` and puts it on the classpath.',
      explain: [
        'Libraries are published as **artifacts** (usually jars) in a **repository**: a server that stores them by coordinates. The default one is **Maven Central** at `https://repo.maven.apache.org/maven2`, with hundreds of thousands of libraries. You search it on [central.sonatype.com](https://central.sonatype.com); each library page shows the `<dependency>` block to copy.',
        'In this lesson you add **Apache Commons Lang** (`org.apache.commons:commons-lang3:3.17.0`). It has a class `StringUtils` with ready-made text helpers: `capitalize`, `reverse`, `repeat`, `isBlank`, `abbreviate` and many more, all safe with `null`.',
        'On the next build Maven looks for the jar in `~/.m2/repository` first. If it is missing, Maven downloads it (plus its `.pom` file, which lists what the library itself needs) and stores it there. Every later build, in every project on your computer, uses the stored copy.',
        'Then Maven adds the jar to the classpath for compiling, testing and `exec:java`. Your code can `import org.apache.commons.lang3.StringUtils;` as if the class were part of Java.',
        'At run time without Maven the jar must be on the classpath too. `java -cp target/classes …` and a plain `java -jar` do **not** see it. You learn the fixes in step 5 below.'
      ],
      why: 'Other people have already written and tested the code you need. A dependency gives it to you in one block of XML, with the exact version, for everyone on the team.',
      whenUse: 'When a well-known library already solves your problem: text helpers, JSON, HTTP, logging, tests. Check its page on Maven Central for the newest stable version first.',
      syntax: '`<dependency><groupId>…</groupId><artifactId>…</artifactId><version>…</version></dependency>` inside `<dependencies>`',
      fileName: 'src/main/java/com/example/App.java',
      code: `package com.example;

import org.apache.commons.lang3.StringUtils;

public class App {
    public static void main(String[] args) {
        Greeter greeter = new Greeter();
        System.out.println(greeter.greet("ada"));
        System.out.println(greeter.greet("  linus  "));

        System.out.println(StringUtils.reverse("maven"));
        System.out.println(StringUtils.repeat("=-", 5));
        System.out.println(StringUtils.isBlank("   "));
        System.out.println(StringUtils.abbreviate("A build tool builds your project", 20));
    }
}`,
      output: `Hello, Ada!
Hello, Linus!
nevam
=-=-=-=-=-
true
A build tool buil...`,
      codeSummary: 'The App of the hello project, now using the library. Run it with `mvn compile exec:java -Dexec.mainClass=com.example.App` (Greeter is in step 3).',
      codeExplanation: [
        { label: 'Line 3', code: 'import org.apache.commons.lang3.StringUtils;', text: 'The class comes from the jar `commons-lang3-3.17.0.jar`. `javac` finds it only because Maven put the jar on the classpath.' },
        { label: 'Line 8', code: 'greeter.greet("ada")', text: '`Greeter` now uses the library to make the first letter big, so `"ada"` becomes `Ada`.' },
        { label: 'Line 9', code: 'greeter.greet("  linus  ")', text: 'The spaces are removed by `StringUtils.trim` inside `greet`, then the name is capitalized.' },
        { label: 'Line 11', code: 'StringUtils.reverse("maven")', text: 'Returns the text backwards: `nevam`.' },
        { label: 'Line 12', code: 'StringUtils.repeat("=-", 5)', text: 'Repeats the text five times: `=-=-=-=-=-`.' },
        { label: 'Line 13', code: 'StringUtils.isBlank("   ")', text: '`true` when the text is `null`, empty or only spaces. Plain `"   ".isEmpty()` would say `false`.' },
        { label: 'Line 14', code: 'StringUtils.abbreviate(..., 20)', text: 'Cuts the text to at most 20 characters and ends it with `...`.' },
        { label: 'All', code: 'public static', text: 'Every `StringUtils` method is `static`, so you call it on the class name, without `new`.' }
      ],
      sections: [
        {
          title: 'Add the dependency to pom.xml',
          text: [
            'Copy the block from the library page on Maven Central into `<dependencies>`, next to JUnit. It has no `<scope>`, so it is `compile`: needed by your main code and in the finished app.'
          ],
          codeLanguage: 'xml',
          fileName: 'pom.xml (part)',
          code: `<dependencies>
  <dependency>
    <groupId>org.apache.commons</groupId>
    <artifactId>commons-lang3</artifactId>
    <version>3.17.0</version>
  </dependency>
  <dependency>
    <groupId>org.junit.jupiter</groupId>
    <artifactId>junit-jupiter</artifactId>
    <version>5.11.4</version>
    <scope>test</scope>
  </dependency>
</dependencies>`,
          tip: 'Pick a fixed version like `3.17.0`. Never leave the version out, and avoid versions that end in `-SNAPSHOT`, `-alpha` or `-RC` unless you know why.'
        },
        {
          title: 'The first build downloads, the second does not',
          text: [
            'Run `mvn compile`. Before compiling, Maven fetches the library’s `.pom` (and the parent POMs it builds on, here `commons-parent` and `apache`, plus `junit-bom`, a version list the parent refers to), then the jar. Only the jar ends up on your classpath; the `.pom` files are information for Maven. Run it again: no `Downloading` lines, because everything is in `~/.m2` now.'
          ],
          codeLanguage: 'bash',
          fileName: 'first-build.sh',
          code: `mvn compile`,
          output: `[INFO] --------------------------------[ jar ]---------------------------------
[INFO] Downloading from central: https://repo.maven.apache.org/maven2/org/apache/commons/commons-lang3/3.17.0/commons-lang3-3.17.0.pom
[INFO] Downloaded from central: https://repo.maven.apache.org/maven2/org/apache/commons/commons-lang3/3.17.0/commons-lang3-3.17.0.pom (31 kB at 167 kB/s)
[INFO] Downloading from central: https://repo.maven.apache.org/maven2/org/apache/commons/commons-parent/73/commons-parent-73.pom
[INFO] Downloaded from central: https://repo.maven.apache.org/maven2/org/apache/commons/commons-parent/73/commons-parent-73.pom (78 kB at 1.7 MB/s)
[INFO] Downloading from central: https://repo.maven.apache.org/maven2/org/apache/apache/33/apache-33.pom
[INFO] Downloaded from central: https://repo.maven.apache.org/maven2/org/apache/apache/33/apache-33.pom (24 kB at 590 kB/s)
[INFO] Downloading from central: https://repo.maven.apache.org/maven2/org/junit/junit-bom/5.11.0/junit-bom-5.11.0.pom
[INFO] Downloaded from central: https://repo.maven.apache.org/maven2/org/junit/junit-bom/5.11.0/junit-bom-5.11.0.pom (5.6 kB at 131 kB/s)
[INFO] Downloading from central: https://repo.maven.apache.org/maven2/org/apache/commons/commons-lang3/3.17.0/commons-lang3-3.17.0.jar
[INFO] Downloaded from central: https://repo.maven.apache.org/maven2/org/apache/commons/commons-lang3/3.17.0/commons-lang3-3.17.0.jar (674 kB at 6.9 MB/s)
[INFO]
[INFO] --- compiler:3.13.0:compile (default-compile) @ hello ---
[INFO] Compiling 2 source files with javac [debug release 21] to target/classes
[INFO] BUILD SUCCESS`,
          mermaid: `sequenceDiagram
  participant You
  participant Maven
  participant Local as ~/.m2/repository
  participant Central as Maven Central
  You->>Maven: mvn compile
  Maven->>Local: commons-lang3 3.17.0 there?
  Local-->>Maven: no
  Maven->>Central: GET .../commons-lang3-3.17.0.pom and .jar
  Central-->>Maven: the files
  Maven->>Local: store them
  Maven->>Maven: javac with the jar on the classpath
  You->>Maven: mvn compile (again)
  Maven->>Local: there?
  Local-->>Maven: yes, use it`,
          diagramNote: 'The internet is only used once per version. That is why the second build is fast and why `mvn -o` (offline) works after the first build.'
        },
        {
          title: 'Use it in your own class',
          text: [
            '`Greeter` now cleans up the name with the library. The test from the lifecycle lesson (`greet("Ada")` gives `Hello, Ada!`) still passes, so `mvn package` stays green.'
          ],
          fileName: 'src/main/java/com/example/Greeter.java',
          code: `package com.example;

import org.apache.commons.lang3.StringUtils;

public class Greeter {
    public String greet(String name) {
        String nice = StringUtils.capitalize(StringUtils.trim(name));
        return "Hello, " + nice + "!";
    }
}

// Try it from App.main:
// System.out.println(new Greeter().greet("  ada "));`,
          output: `Hello, Ada!`
        },
        {
          title: 'What the library saves you',
          text: [
            'Here is the same kind of work written by hand, without any library. It runs with plain `javac` and `java`. Compare: each method is a few lines you must write, test and fix yourself. `StringUtils` has dozens of such methods, already tested by thousands of projects.'
          ],
          fileName: 'HandMade.java',
          code: `public class HandMade {
    // Each method does what one StringUtils method does, written by hand.
    static String capitalize(String text) {
        if (text == null || text.isEmpty()) {
            return text;
        }
        return Character.toUpperCase(text.charAt(0)) + text.substring(1);
    }

    static String reverse(String text) {
        return new StringBuilder(text).reverse().toString();
    }

    static boolean isBlank(String text) {
        return text == null || text.trim().isEmpty();
    }

    static String abbreviate(String text, int maxWidth) {
        if (text.length() <= maxWidth) {
            return text;
        }
        return text.substring(0, maxWidth - 3) + "...";
    }

    public static void main(String[] args) {
        System.out.println(capitalize("ada"));
        System.out.println(reverse("maven"));
        System.out.println("=-".repeat(5));
        System.out.println(isBlank("   "));
        System.out.println(abbreviate("A build tool builds your project", 20));
        System.out.println(isBlank(null));
    }
}`,
          output: `Ada
nevam
=-=-=-=-=-
true
A build tool buil...
true`,
          tip: 'For one tiny helper, writing it yourself is fine. Add a library when you need many helpers or something hard (JSON, dates, HTTP).'
        },
        {
          title: 'Running without Maven: the jar must be on the classpath',
          text: [
            'Maven knows about the library, but plain `java` does not. Start the classes folder or the jar on their own, and Java fails the moment `Greeter` first needs `StringUtils`: a `NoClassDefFoundError`.',
            'Three fixes: run with `mvn compile exec:java …` (Maven adds every jar); add the jar to `-cp` by hand; or build one big jar that contains the library too, with the **shade plugin** below.'
          ],
          codeLanguage: 'bash',
          fileName: 'run-without-maven.sh',
          code: `java -cp target/classes com.example.App

# fix by hand: add the jar from ~/.m2 to the classpath
java -cp target/classes:$HOME/.m2/repository/org/apache/commons/commons-lang3/3.17.0/commons-lang3-3.17.0.jar com.example.App`,
          output: `Exception in thread "main" java.lang.NoClassDefFoundError: org/apache/commons/lang3/StringUtils
	at com.example.Greeter.greet(Greeter.java:7)
	at com.example.App.main(App.java:8)
Caused by: java.lang.ClassNotFoundException: org.apache.commons.lang3.StringUtils
	at java.base/jdk.internal.loader.BuiltinClassLoader.loadClass(BuiltinClassLoader.java:580)
	at java.base/java.lang.ClassLoader.loadClass(ClassLoader.java:490)
	... 2 more
Hello, Ada!
Hello, Linus!
nevam
=-=-=-=-=-
true
A build tool buil...`,
          warn: '`java -jar target/hello-1.0-SNAPSHOT.jar` fails the same way: the normal jar holds only your own classes. The library is not inside.'
        },
        {
          title: 'One jar with everything: the shade plugin',
          text: [
            'The `maven-shade-plugin` runs in the `package` phase. It unpacks your dependency jars and packs them together with your classes into one "fat" (or "uber") jar. Keep the jar plugin’s `<mainClass>` from the last lesson. After `mvn package`, `java -jar` works anywhere Java 21 is installed.'
          ],
          codeLanguage: 'xml',
          fileName: 'pom.xml (part)',
          code: `<plugin>
  <groupId>org.apache.maven.plugins</groupId>
  <artifactId>maven-shade-plugin</artifactId>
  <version>3.6.0</version>
  <executions>
    <execution>
      <phase>package</phase>
      <goals>
        <goal>shade</goal>
      </goals>
    </execution>
  </executions>
</plugin>`,
          output: `[INFO] --- shade:3.6.0:shade (default) @ hello ---
[INFO] Including org.apache.commons:commons-lang3:jar:3.17.0 in the shaded jar.
[INFO] Replacing original artifact with shaded artifact.
[INFO] BUILD SUCCESS

$ java -jar target/hello-1.0-SNAPSHOT.jar
Hello, Ada!
Hello, Linus!
nevam
=-=-=-=-=-
true
A build tool buil...`,
          tip: 'The output is shortened. The shade plugin also prints a few `[WARNING]` lines about an overlapping `META-INF/MANIFEST.MF` (harmless here) and writes a file `dependency-reduced-pom.xml` next to `pom.xml` (add it to `.gitignore`). The jar grows from about 3 kB to about 676 kB, because the library is inside now.'
        }
      ],
      technical: [
        'The folder in `~/.m2/repository` comes straight from the coordinates: the dots of the groupId become folders, then artifactId, then version. `org.apache.commons:commons-lang3:3.17.0` lives in `org/apache/commons/commons-lang3/3.17.0/` as `commons-lang3-3.17.0.jar`. The download URL on Maven Central uses the same path.',
        'Next to each file Maven stores a `.sha1` checksum and checks every download against it. The library’s `.pom` is downloaded too: it lists the library’s own dependencies (the next lesson) and may name a **parent POM** with shared settings, which is why `commons-parent-73.pom` and `apache-33.pom` came along.',
        'Maven builds a separate classpath for each job: the compile classpath (`compile` and `provided` scopes), the test classpath (everything plus `target/test-classes`), and the runtime classpath (`compile` and `runtime`). `exec:java` uses the runtime classpath; `javac` in the `compile` phase uses the compile classpath.'
      ],
      tryIt: {
        steps: [
          'Add the `commons-lang3` dependency from step 1 to your `pom.xml`.',
          'Change `Greeter` as in step 3 and `App` as in the example.',
          'Run `mvn compile` and look for the `Downloading from central` lines; run it again and see that they are gone.',
          'Run `ls ~/.m2/repository/org/apache/commons/commons-lang3/`.',
          'Run `mvn compile exec:java -Dexec.mainClass=com.example.App`, then try `java -cp target/classes com.example.App`.'
        ],
        see: 'The folder `3.17.0` in `~/.m2`, the six output lines from `exec:java`, and a `NoClassDefFoundError` from the plain `java -cp` run.'
      },
      check: [
        { q: 'In which folder of `~/.m2/repository` is `com.fasterxml.jackson.core:jackson-core:2.18.2`?', a: '`com/fasterxml/jackson/core/jackson-core/2.18.2/`, with the file `jackson-core-2.18.2.jar`.' },
        { q: 'You delete `commons-lang3` from `pom.xml` but keep the import. What happens on `mvn compile`?', a: 'Compilation fails: `package org.apache.commons.lang3 does not exist` and `cannot find symbol … StringUtils`. The jar is no longer on the classpath, even though it is still in `~/.m2`.' },
        { q: 'Why does `java -jar target/hello-1.0-SNAPSHOT.jar` throw `NoClassDefFoundError` after you add the library?', a: 'The normal jar only holds your own classes. The library jar is not on the classpath. Use `exec:java`, add the jar to `-cp`, or build a fat jar with the shade plugin.' }
      ],
      keyPoints: [
        'A dependency = coordinates in `<dependencies>`; Maven gets the jar for you.',
        'Maven Central is the default library store; search it on central.sonatype.com.',
        '`~/.m2/repository` caches every download; the folder path follows the coordinates.',
        'Inside Maven (compile, test, `exec:java`) the library is on the classpath automatically.',
        'Outside Maven you must add the jar yourself, or build a fat jar with `maven-shade-plugin`.'
      ],
      commonMistakes: [
        'Importing a class without adding its dependency: `import org.apache.commons.lang3.StringUtils;` fails with `package org.apache.commons.lang3 does not exist`. Add the `<dependency>`.',
        'Copying a jar into `src/` or `lib/` and hoping Maven finds it. Maven only uses jars listed in `pom.xml`.',
        'Mixing up two libraries with similar names: `commons-lang` (old, version 2) and `commons-lang3`. The package names differ (`org.apache.commons.lang` vs `lang3`); use `commons-lang3`.',
        'Expecting `java -jar` to include libraries. A normal jar does not; use the shade plugin or `exec:java`.'
      ],
      related: ['pom-explained', 'transitive-dependencies', 'running-the-app']
    }
  ]);
})();
