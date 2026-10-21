// Build tools, lesson 3: create a Maven project and learn the standard folders.
(function () {
  Java.addCoreLessons('build-tools', [
    {
      id: 'maven-project',
      title: 'A Maven Project',
      category: 'concept',
      icon: 'pom',
      tagline: 'pom.xml plus fixed folders',
      glossary: Java.buildToolsTerms,
      realWorld: 'A school bag with fixed pockets: books in the big one, pens in the small one, the lunch box at the front. Everyone knows where to look, so nobody has to ask. A Maven project has fixed pockets too.',
      kid: [
        'In your room, toys go in the toy box, clothes go in the drawer and books go on the shelf. When Mum says "bring me a book", you know where to go.',
        'Maven has the same rule for code. Your program goes in one box, your tests go in another box, and the things Maven builds go in a third box called `target`.',
        'You can even ask Maven to set up the empty boxes for you. That is the **archetype** command: a "make me a new room" button.'
      ],
      definition: 'A Maven project is a folder with a `pom.xml` at the top and a fixed layout: code in `src/main/java`, tests in `src/test/java`, and everything Maven builds in `target/`. The command `mvn archetype:generate` creates this layout for you.',
      explain: [
        'Maven follows **convention over configuration**: a convention is a rule everybody agrees on, so you do not have to configure it. Because the folders are always the same, `pom.xml` does not need to say where the code is.',
        'Inside `src/main/java`, the folders follow your **packages**. A class in the package `com.example` lives in `src/main/java/com/example/`. That is the same rule `javac` uses, which you know from [Syntax Fundamentals](../syntax-fundamentals/index.html).',
        'Tests live in a separate tree, `src/test/java`, with the same package folders. Test code is compiled and run during the build, but it never goes into the finished jar. You write real tests in the next topic, [Testing](../testing/index.html).',
        'Non-Java files your program reads (for example a `.properties` or `.txt` file) go into `src/main/resources`. Maven copies them next to your classes.',
        'An **archetype** is a project template. `mvn archetype:generate` with the template `maven-archetype-quickstart` writes a `pom.xml`, a class `App` with a `main` method and one small test. You name the project with two words you meet again in the next lesson: the **groupId** (who makes it, like `com.example`) and the **artifactId** (the project name, like `hello`).'
      ],
      why: 'Fixed folders mean almost no setup, and every Java developer finds their way in your project at once.',
      whenUse: 'Every new Maven project. Use the archetype command, or make the folders and `pom.xml` by hand; Maven does not care which.',
      syntax: '`mvn archetype:generate -DgroupId=<group> -DartifactId=<name> -DarchetypeArtifactId=maven-archetype-quickstart -DarchetypeVersion=1.5 -DinteractiveMode=false`',
      fileName: 'new-project.sh',
      codeLanguage: 'bash',
      code: `cd ~/java-practice

mvn archetype:generate \\
  -DgroupId=com.example \\
  -DartifactId=hello \\
  -DarchetypeArtifactId=maven-archetype-quickstart \\
  -DarchetypeVersion=1.5 \\
  -DinteractiveMode=false

cd hello`,
      output: `[INFO] Scanning for projects...
[INFO]
[INFO] ------------------< org.apache.maven:standalone-pom >-------------------
[INFO] Building Maven Stub Project (No POM) 1
[INFO] --------------------------------[ pom ]---------------------------------
[INFO]
[INFO] --- archetype:3.4.1:generate (default-cli) @ standalone-pom ---
[INFO] Generating project in Batch mode
[INFO] ----------------------------------------------------------------------------
[INFO] Using following parameters for creating project from Archetype: maven-archetype-quickstart:1.5
[INFO] ----------------------------------------------------------------------------
[INFO] Parameter: groupId, Value: com.example
[INFO] Parameter: artifactId, Value: hello
[INFO] Parameter: version, Value: 1.0-SNAPSHOT
[INFO] Parameter: package, Value: com.example
[INFO] Parameter: javaCompilerVersion, Value: 17
[INFO] Project created from Archetype in dir: /home/you/java-practice/hello
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time:  7.191 s
[INFO] Finished at: 2026-10-21T17:30:04+02:00
[INFO] ------------------------------------------------------------------------`,
      codeExplanation: [
        { label: 'Line 3', code: 'mvn archetype:generate \\', text: '`archetype:generate` is a **goal**: the task `generate` of the archetype plugin. The `\\` at the end of the line means "the command goes on in the next line".' },
        { label: 'Line 4', code: '-DgroupId=com.example', text: '`-D` sets a value for Maven. The groupId is the name of whoever makes the project, written like a reversed web address. It also becomes the package of `App`.' },
        { label: 'Line 5', code: '-DartifactId=hello', text: 'The name of the project. It becomes the folder name `hello/` and the start of the jar name.' },
        { label: 'Lines 6-7', code: '-DarchetypeArtifactId=maven-archetype-quickstart', text: 'Which template to copy, and which version of it. Version 1.5 makes a modern project with JUnit 5.' },
        { label: 'Line 8', code: '-DinteractiveMode=false', text: 'Do not ask questions, use the values given. Without it, Maven asks for each value in the terminal.' },
        { label: 'Output', code: 'Building Maven Stub Project (No POM)', text: 'There is no `pom.xml` yet, so Maven uses an empty stand-in project to run the plugin. That is normal for this one command.' },
        { label: 'Output', code: 'Parameter: version, Value: 1.0-SNAPSHOT', text: 'You did not give a version, so the template uses `1.0-SNAPSHOT`: "version 1.0, still in work".' },
        { label: 'Output', code: 'javaCompilerVersion, Value: 17', text: 'The template still writes Java 17 into `pom.xml`. You change it to 21 right after, see step 3 below.' },
        { label: 'Output', code: 'BUILD SUCCESS', text: 'Every Maven run ends with `BUILD SUCCESS` or `BUILD FAILURE`. The first run is slower (here 7 seconds) because Maven downloads the archetype plugin.' }
      ],
      sections: [
        {
          title: 'The folders it made',
          text: [
            'Here is what `tree` (or your file explorer) shows after the command. The output above is shortened: a few more `Parameter:` lines are left out, and on your first run Maven also prints many `Downloading from central:` lines for its plugins.'
          ],
          codeLanguage: 'bash',
          fileName: 'tree.sh',
          code: `tree -a hello`,
          output: `hello
├── .mvn
│   ├── jvm.config
│   └── maven.config
├── pom.xml
└── src
    ├── main
    │   └── java
    │       └── com
    │           └── example
    │               └── App.java
    └── test
        └── java
            └── com
                └── example
                    └── AppTest.java`,
          tip: 'The two files in `.mvn/` are empty. They are places for extra Maven or JVM options. You can leave them alone.'
        },
        {
          title: 'The standard layout in one picture',
          text: [
            'This layout is the same in every Maven project in the world. `target/` appears only after the first build.'
          ],
          mermaid: `flowchart TD
  R["hello/"] --> P["pom.xml (the project card)"]
  R --> S["src/"]
  R --> T["target/ (made by Maven, do not edit)"]
  S --> M["main/java/com/example/App.java"]
  S --> MR["main/resources/ (files your code reads)"]
  S --> TE["test/java/com/example/AppTest.java"]
  T --> TC["classes/ (App.class)"]
  T --> TT["test-classes/ (AppTest.class)"]
  T --> J["hello-1.0-SNAPSHOT.jar"]`,
          diagramNote: 'Left side: what you write (`src`, `pom.xml`). Right side: what Maven makes (`target`). You commit `src` and `pom.xml` to Git, never `target`.',
          table: {
            head: ['Path', 'What goes in', 'Who writes it'],
            rows: [
              ['`pom.xml`', 'The project card: name, Java version, libraries', 'You'],
              ['`src/main/java/`', 'Your program code, in package folders', 'You'],
              ['`src/main/resources/`', 'Files your program reads (config, text)', 'You'],
              ['`src/test/java/`', 'Your tests, in the same package folders', 'You'],
              ['`target/`', 'Compiled classes, test reports, the jar', 'Maven. Delete it any time with `mvn clean`.']
            ]
          }
        },
        {
          title: 'Set Java 21 in pom.xml',
          text: [
            'Open `pom.xml` and find the `<properties>` block. The template writes 17. Change it to 21, the version this site uses. The next lesson explains every line of the file.'
          ],
          codeLanguage: 'xml',
          fileName: 'pom.xml (part)',
          code: `<properties>
  <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
  <maven.compiler.release>21</maven.compiler.release>
</properties>`,
          warn: 'If you skip this, Maven compiles for Java 17. Newer features like `switch` patterns or `record` patterns then fail with "not supported in -source 17".'
        },
        {
          title: 'The class it made, and the first build',
          text: [
            'The template writes a tiny `App` class. Note the first line: `package com.example;`, matching the folder `src/main/java/com/example/`.',
            'Build and run it from the `hello` folder (the one with `pom.xml`). `mvn compile` writes `App.class` to `target/classes/com/example/`, and `java -cp target/classes` puts that folder on the classpath.'
          ],
          fileName: 'src/main/java/com/example/App.java',
          code: `package com.example;

/**
 * Hello world!
 */
public class App {
    public static void main(String[] args) {
        System.out.println("Hello World!");
    }
}`,
          output: `Hello World!`,
          tip: 'Run it with `mvn compile`, then `java -cp target/classes com.example.App`. The lesson "Run Your App" shows two more ways.'
        },
        {
          title: 'Without the archetype',
          text: [
            'The archetype only saves typing. You can make the same project by hand: create the folders, write `pom.xml` (next lesson) and put your classes in. Maven treats both the same.'
          ],
          codeLanguage: 'bash',
          fileName: 'by-hand.sh',
          code: `mkdir -p hello/src/main/java/com/example
mkdir -p hello/src/test/java/com/example
cd hello
# now write pom.xml and src/main/java/com/example/App.java`,
          warn: 'A `.java` file next to `pom.xml` or directly in `src/` is not compiled. Maven only looks in `src/main/java` (and `src/test/java` for tests).'
        }
      ],
      technical: [
        'The archetype plugin downloads the template jar `maven-archetype-quickstart-1.5.jar` from Maven Central, fills in your groupId, artifactId and package, and writes the files. It also downloads a catalog of all known archetypes, which is why the very first run takes a while.',
        'The standard folders are not magic words in your `pom.xml`. They come from the **super POM**, a built-in `pom.xml` that every project inherits from. It says `sourceDirectory = src/main/java`, `testSourceDirectory = src/test/java`, `directory = target`, and so on. You can override them, but almost nobody does.',
        'Maven compiles `src/main/java` to `target/classes` and `src/test/java` to `target/test-classes`. When the tests run, both folders are on the classpath, so a test can use your classes. When the jar is made, only `target/classes` goes in.'
      ],
      tryIt: {
        steps: [
          'In a practice folder, run the archetype command from the example.',
          'Run `cd hello` and look at the folders (`tree -a` or `find . -type f`).',
          'Change `<maven.compiler.release>` in `pom.xml` from 17 to 21.',
          'Run `mvn compile`, then `ls target/classes/com/example/`.',
          'Run `java -cp target/classes com.example.App`.'
        ],
        see: '`App.class` in `target/classes/com/example/`, and then `Hello World!` in the terminal.'
      },
      check: [
        { q: 'A class has `package com.shop.cart;`. Where does its file go in a Maven project?', a: 'In `src/main/java/com/shop/cart/`. The folders after `src/main/java` follow the package name.' },
        { q: 'Which folder do you never commit to Git, and why?', a: '`target/`. Maven rebuilds it from `src` and `pom.xml` at any time, and it is often large.' },
        { q: 'What does `-DinteractiveMode=false` do in the archetype command?', a: 'Maven uses the values you gave with `-D` and does not ask questions in the terminal.' }
      ],
      keyPoints: [
        '`pom.xml` at the top, code in `src/main/java`, tests in `src/test/java`, output in `target/`.',
        'Package folders go below `src/main/java`, exactly like the package name.',
        '`mvn archetype:generate` makes a new project from a template.',
        'Change the generated Java version to 21 in `<maven.compiler.release>`.',
        'Run every `mvn` command in the folder that has `pom.xml`.'
      ],
      commonMistakes: [
        'Putting `App.java` next to `pom.xml`. Maven ignores it; move it to `src/main/java/com/example/`.',
        'A package line that does not match the folder, like `package example;` in `com/example/`. Make both say the same.',
        'Running `mvn compile` one folder too high. Maven says "there is no POM in this directory"; `cd` into the folder with `pom.xml`.',
        'Editing files in `target/`. They are overwritten on the next build; change the file in `src/` instead.'
      ],
      related: ['pom-explained', 'maven-lifecycle', 'Testing']
    }
  ]);
})();
