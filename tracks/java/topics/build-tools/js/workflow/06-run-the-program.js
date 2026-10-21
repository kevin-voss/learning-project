// Build tools, lesson 6: three ways to run the program Maven built. (File name must not end in "app.js": the verifier skips those.)
(function () {
  Java.addCoreLessons('build-tools', [
    {
      id: 'running-the-app',
      title: 'Run Your App',
      category: 'practice',
      icon: '▶',
      tagline: 'java -cp, exec:java or java -jar',
      glossary: Java.buildToolsTerms,
      realWorld: 'A board game in a box. You can play with the loose pieces on the table, ask a friend to set it up and start for you, or take the closed box to Grandma’s house, open it and play. Same game, three ways to start.',
      kid: [
        'Maven built your program. Now you want to see it run.',
        'Way one: you take the loose pieces from the `target/classes` box and say "start here". Way two: you ask Maven "please start it for me". Way three: you take the packed jar box, and a note inside the lid says where the game starts.',
        'That note in the lid is called the **manifest**. Without the note, Java opens the box and says "I don’t know where to start".'
      ],
      definition: 'You run a Maven-built program in one of three ways: `java -cp target/classes <full.ClassName>`, `mvn exec:java -Dexec.mainClass=<full.ClassName>`, or `java -jar target/<name>.jar` after you put a **Main-Class** line into the jar’s manifest with the jar plugin.',
      explain: [
        '**Way 1, the classes folder.** After `mvn compile`, your classes are in `target/classes`. `java -cp target/classes com.example.App` puts that folder on the classpath and starts `main` in `com.example.App`. You always give the **full class name**: package plus class.',
        '**Way 2, let Maven start it.** `mvn exec:java` runs the goal `java` of the **exec plugin** (`exec-maven-plugin`). It starts your `main` inside Maven’s own JVM, with the full classpath of your project, libraries included. You tell it which class with `-Dexec.mainClass=…`, or once in `pom.xml`.',
        '**Way 3, the jar.** `mvn package` makes `target/hello-1.0-SNAPSHOT.jar`. A jar can be started with `java -jar`, but only if its **manifest** (the file `META-INF/MANIFEST.MF` inside the jar) has a line `Main-Class: com.example.App`. By default Maven does not write that line, so you configure `maven-jar-plugin` to add it.',
        'Way 1 and 3 run without Maven, so they are what a user or a server does. Way 2 is handy while you develop, because Maven builds the classpath for you.'
      ],
      why: 'Building is only half the job. You need to start the program to see it work, and a runnable jar is how you give it to other people.',
      whenUse: '`java -cp target/classes …` for a quick run, `mvn exec:java` while you develop (especially with libraries), `java -jar` for the finished program.',
      syntax: '`java -cp target/classes com.example.App` · `mvn compile exec:java -Dexec.mainClass=com.example.App` · `java -jar target/hello-1.0-SNAPSHOT.jar`',
      fileName: 'run.sh',
      codeLanguage: 'bash',
      code: `cd ~/java-practice/hello

# Way 1: compile, then start the class from target/classes
mvn -q compile
java -cp target/classes com.example.App`,
      output: `Hello, Ada!
Hello, Linus!`,
      codeExplanation: [
        { label: 'Line 4', code: 'mvn -q compile', text: '`-q` (quiet) hides Maven’s `[INFO]` lines. You only see errors, if there are any.' },
        { label: 'Line 5', code: 'java -cp target/classes', text: 'The classpath is the folder `target/classes`. Java looks for `com/example/App.class` inside it.' },
        { label: 'Line 5', code: 'com.example.App', text: 'The full class name. `App` alone fails with `ClassNotFoundException`, because the class lives in the package `com.example`.' },
        { label: 'Output', code: 'Hello, Ada!', text: '`App.main` calls `greeter.greet("Ada")` and prints the result. `Greeter.class` is found in the same folder.' },
        { label: 'App.java', code: 'Greeter greeter = new Greeter();', text: 'The project has two classes, `App` (with `main`) and `Greeter`. Java loads `Greeter` from the classpath the first time `App` uses it.' },
        { label: 'Greeter.java', code: 'return "Hello, " + name + "!";', text: 'A tiny method so the test from the last lesson has something to check.' }
      ],
      sections: [
        {
          title: 'The two classes of the project',
          text: [
            'These are the files in `src/main/java/com/example/`. Both start with `package com.example;`, matching their folder.'
          ],
          fileName: 'src/main/java/com/example/App.java',
          code: `package com.example;

public class App {
    public static void main(String[] args) {
        Greeter greeter = new Greeter();
        System.out.println(greeter.greet("Ada"));
        System.out.println(greeter.greet("Linus"));
    }
}

// In its own file: src/main/java/com/example/Greeter.java
// package com.example;
//
// public class Greeter {
//     public String greet(String name) {
//         return "Hello, " + name + "!";
//     }
// }`,
          output: `Hello, Ada!
Hello, Linus!`
        },
        {
          title: 'Way 2: mvn exec:java',
          text: [
            'The exec plugin starts your class for you. Maven downloads the plugin the first time. Put `compile` before it, so Maven compiles first: `exec:java` alone does not run any phase.',
            'Your program’s lines appear between Maven’s lines: after `--- exec:… ---` and before `BUILD SUCCESS`.'
          ],
          codeLanguage: 'bash',
          fileName: 'exec.sh',
          code: `mvn compile exec:java -Dexec.mainClass=com.example.App`,
          output: `[INFO] --- exec:3.6.4:java (default-cli) @ hello ---
Hello, Ada!
Hello, Linus!
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time:  0.271 s`,
          tip: 'Tired of typing the class name? Add the plugin with `<configuration><mainClass>com.example.App</mainClass></configuration>` to `pom.xml`. Then `mvn compile exec:java` is enough.'
        },
        {
          title: 'Way 3: java -jar needs a Main-Class',
          text: [
            'Try the jar from `mvn package` as it is. Java opens it, reads the manifest, finds no `Main-Class` line and stops.'
          ],
          codeLanguage: 'bash',
          fileName: 'jar-no-main.sh',
          code: `java -jar target/hello-1.0-SNAPSHOT.jar`,
          output: `no main manifest attribute, in target/hello-1.0-SNAPSHOT.jar`,
          warn: 'This is the most common surprise with Maven jars. The jar is fine; only the "where to start" note is missing.'
        },
        {
          title: 'Add the Main-Class with the jar plugin',
          text: [
            'Add this `<plugin>` inside `<build><plugins>` in `pom.xml`, next to the surefire plugin. It tells the jar plugin to write `Main-Class: com.example.App` into the manifest. Then run `mvn package` again.'
          ],
          codeLanguage: 'xml',
          fileName: 'pom.xml (part)',
          code: `<plugin>
  <groupId>org.apache.maven.plugins</groupId>
  <artifactId>maven-jar-plugin</artifactId>
  <version>3.4.2</version>
  <configuration>
    <archive>
      <manifest>
        <mainClass>com.example.App</mainClass>
      </manifest>
    </archive>
  </configuration>
</plugin>`,
          table: {
            head: ['Element', 'Meaning'],
            rows: [
              ['`<configuration>`', 'Settings for this plugin'],
              ['`<archive>`', 'Settings for the jar file itself'],
              ['`<manifest>`', 'Lines to write into `META-INF/MANIFEST.MF`'],
              ['`<mainClass>`', 'Becomes the line `Main-Class: com.example.App`']
            ]
          }
        },
        {
          title: 'Run the jar and look inside it',
          text: [
            'Now `java -jar` works. A jar is a zip file, so `unzip -l` lists what is inside, and `unzip -p` prints one file. You see your two classes, the manifest, and a copy of `pom.xml` Maven puts in for tools.'
          ],
          codeLanguage: 'bash',
          fileName: 'jar-run.sh',
          code: `mvn -q package
java -jar target/hello-1.0-SNAPSHOT.jar
unzip -p target/hello-1.0-SNAPSHOT.jar META-INF/MANIFEST.MF
unzip -l target/hello-1.0-SNAPSHOT.jar | grep class`,
          output: `Hello, Ada!
Hello, Linus!
Manifest-Version: 1.0
Created-By: Maven JAR Plugin 3.4.2
Build-Jdk-Spec: 21
Main-Class: com.example.App

      834  10-21-2026 17:30   com/example/Greeter.class
      704  10-21-2026 17:30   com/example/App.class`,
          mermaid: `sequenceDiagram
  participant You
  participant JVM as java
  participant Jar as hello-1.0-SNAPSHOT.jar
  You->>JVM: java -jar target/hello-1.0-SNAPSHOT.jar
  JVM->>Jar: open META-INF/MANIFEST.MF
  Jar-->>JVM: Main-Class: com.example.App
  JVM->>Jar: load com/example/App.class
  JVM->>JVM: call App.main(args)`,
          diagramNote: 'With `-jar`, the jar itself is the whole classpath, and the manifest names the class with `main`. `Build-Jdk-Spec` shows the JDK that ran Maven, so it says 21 on Java 21.'
        },
        {
          title: 'Passing arguments to main',
          text: [
            'Arguments go to `main(String[] args)`. With `java` you write them after the class or jar name. With the exec plugin you put them in `-Dexec.args="…"`.',
            'Try it with this class. Save it as `src/main/java/ShowArgs.java` (no package line, so its full name is `ShowArgs`). Run it with no arguments first, as below. Then try `java -cp target/classes ShowArgs red green` and `mvn compile exec:java -Dexec.mainClass=ShowArgs -Dexec.args="red green"`: both print `You gave 2 argument(s).`, then `args[0] = red` and `args[1] = green`.'
          ],
          fileName: 'ShowArgs.java',
          code: `public class ShowArgs {
    public static void main(String[] args) {
        System.out.println("You gave " + args.length + " argument(s).");
        for (int i = 0; i < args.length; i++) {
            System.out.println("args[" + i + "] = " + args[i]);
        }
    }
}`,
          output: `You gave 0 argument(s).`,
          table: {
            head: ['Way', 'Command', 'Needs Maven?', 'Libraries on the classpath?'],
            rows: [
              ['Classes folder', '`java -cp target/classes com.example.App`', 'No (after the build)', 'Only if you add each jar to `-cp`'],
              ['Exec plugin', '`mvn compile exec:java -Dexec.mainClass=com.example.App`', 'Yes', 'Yes, all of them'],
              ['Jar', '`java -jar target/hello-1.0-SNAPSHOT.jar`', 'No (after the build)', 'No, only the jar itself (see "Add a Library")']
            ]
          }
        }
      ],
      technical: [
        '`java -cp <path> <class>` starts a JVM, sets the classpath, loads the named class and calls its `public static void main(String[] args)`. `java -jar <file>` ignores `-cp`: the classpath is the jar plus any jars listed in its manifest’s `Class-Path` line.',
        '`exec:java` does not start a new JVM. It loads your classes into Maven’s running JVM with a fresh class loader and calls `main`. That is fast, but a `System.exit()` in your code ends Maven too. The sister goal `exec:exec` starts a separate process instead.',
        'A jar is a normal zip file with a fixed place for metadata: `META-INF/`. The jar plugin writes `MANIFEST.MF` there, plus `META-INF/maven/com.example/hello/pom.xml` and `pom.properties`, so tools can see which coordinates the jar came from.'
      ],
      tryIt: {
        steps: [
          'Run `mvn -q compile` and `java -cp target/classes com.example.App`.',
          'Run `mvn compile exec:java -Dexec.mainClass=com.example.App` and find your lines between Maven’s.',
          'Run `mvn -q package` and `java -jar target/hello-1.0-SNAPSHOT.jar`. Read the error.',
          'Add the `maven-jar-plugin` block with `<mainClass>` to `pom.xml`.',
          'Run `mvn -q package` and `java -jar target/hello-1.0-SNAPSHOT.jar` again.'
        ],
        see: 'First `no main manifest attribute`, and after the change `Hello, Ada!` and `Hello, Linus!` from the jar.'
      },
      check: [
        { q: 'Why does `java -cp target/classes App` fail for this project?', a: '`App` is in the package `com.example`, so its full name is `com.example.App`. Java needs the full name.' },
        { q: 'What does `no main manifest attribute` mean?', a: 'The jar’s `META-INF/MANIFEST.MF` has no `Main-Class` line, so `java -jar` does not know which class has `main`. Configure `maven-jar-plugin` with `<mainClass>`.' },
        { q: 'Why write `mvn compile exec:java` instead of `mvn exec:java`?', a: '`exec:java` is a goal and runs no phases. Without `compile` first, it runs old classes, or fails if there are none.' }
      ],
      keyPoints: [
        'Always use the full class name: `com.example.App`.',
        '`java -cp target/classes …` runs the compiled classes without Maven.',
        '`mvn compile exec:java -Dexec.mainClass=…` lets Maven start it with every library.',
        '`java -jar` needs `Main-Class` in the manifest; the jar plugin writes it.',
        'A jar is a zip; `unzip -l` shows what is inside.'
      ],
      commonMistakes: [
        '`java -cp target/classes App`: the short name fails. Use `com.example.App`.',
        '`java target/classes/com/example/App.class`: Java does not take file paths to classes. Use `-cp` plus the class name.',
        '`java -jar` on a jar without `Main-Class`: you get `no main manifest attribute`. Add `<mainClass>` to `maven-jar-plugin`.',
        '`mvn exec:java` after editing code, without `compile`: you see the old behaviour. Write `mvn compile exec:java`.'
      ],
      related: ['maven-lifecycle', 'dependencies', 'Methods']
    }
  ]);
})();
