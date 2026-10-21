// Build tools, lesson 1: why a build tool exists. Also registers the topic and its shared word list.
(function () {
  // Words this topic explains on hover. Every lesson file of this topic uses the same list.
  Java.buildToolsTerms = [
    { term: 'build tool', definition: 'A program that compiles, tests and packages a whole project with one command, the same way on every computer.' },
    { term: 'classpath', definition: 'The list of folders and jar files where Java looks for .class files. You set it with -cp.' },
    { term: 'artifact', definition: 'One file Maven builds or downloads, usually a .jar, named by groupId, artifactId and version.' },
    { term: 'coordinates', definition: 'groupId, artifactId and version together. They name one artifact exactly, like an address.' },
    { term: 'Maven Central', definition: 'The big public library store on the internet (repo.maven.apache.org). Maven downloads from it by default.' },
    { term: 'local repository', definition: 'The folder ~/.m2/repository on your computer. Maven keeps every downloaded jar there, so it downloads each one only once.' },
    { term: 'plugin', definition: 'A small Maven add-on that does one kind of work, for example maven-compiler-plugin runs javac.' },
    { term: 'lifecycle', definition: 'The fixed list of build steps (phases) in Maven: validate, compile, test, package, verify, install, deploy.' },
    { term: 'phase', definition: 'One named step of the Maven lifecycle, such as compile or package. Asking for a phase runs every phase before it too.' },
    { term: 'goal', definition: 'One task of a plugin, written plugin:goal, for example compiler:compile or dependency:tree.' },
    { term: 'scope', definition: 'Says when a dependency is needed: compile (always), test (only for tests), provided or runtime.' },
    { term: 'SNAPSHOT', definition: 'A version ending in -SNAPSHOT means "still in work, may change". Released versions never change.' },
    { term: 'archetype', definition: 'A project template. mvn archetype:generate copies it to make a new project.' },
    { term: 'manifest', definition: 'The file META-INF/MANIFEST.MF inside a jar. Its Main-Class line tells java -jar where main is.' },
    { term: 'transitive dependency', definition: 'A library that your library needs. Maven downloads it for you, even though you never wrote it in your pom.xml.' },
    { term: 'jar', definition: 'A Java ARchive: one zip file that holds .class files (and a manifest). Libraries come as jars.' }
  ];

  Java.addCoreTopic('build-tools', {
    label: 'Build Tools',
    headline: 'Maven,',
    accent: 'one command builds it all.',
    intro: 'A build tool downloads libraries, compiles, tests and packages your project with one command. You learn Maven step by step, from the first `mvn -v` to a runnable jar with a library inside. One lesson compares it with Gradle.',
    overview: 'Why → install Maven → a Maven project → pom.xml → the lifecycle → run the app → add a library → libraries of libraries → the wrapper → Maven or Gradle.',
    tryIt: {
      steps: [
        'Install Maven and check it: `sudo apt install maven`, then `mvn -v`.',
        'Make a project: `mvn archetype:generate -DgroupId=com.example -DartifactId=hello -DarchetypeArtifactId=maven-archetype-quickstart -DarchetypeVersion=1.5 -DinteractiveMode=false`.',
        'Go into it with `cd hello` and set `<maven.compiler.release>21</maven.compiler.release>` in `pom.xml`.',
        'Build it: `mvn package`.',
        'Run it: `java -cp target/classes com.example.App`.'
      ],
      see: '`Tests run: 1, Failures: 0`, `BUILD SUCCESS`, a new `target/` folder with `hello-1.0-SNAPSHOT.jar`, and then `Hello World!`.'
    },
    check: [
      { q: 'Which file tells Maven about your project, and where is it?', a: '`pom.xml`, in the top folder of the project. You run every `mvn` command in that folder.' },
      { q: 'Where does your normal Java code go, and where do tests go?', a: 'Code in `src/main/java`, tests in `src/test/java`. Maven writes everything it builds to `target/`.' },
      { q: 'You run `mvn package`. Does Maven also run the tests?', a: 'Yes. A phase runs all phases before it: validate, compile, test, then package. A red test stops the build, and no jar is made.' },
      { q: 'You add a library to `pom.xml`. Where does the jar come from, and where does it end up on your computer?', a: 'Maven downloads it from Maven Central (`repo.maven.apache.org`) and keeps it in `~/.m2/repository`. The next build finds it there and downloads nothing.' },
      { q: 'Your project has a `mvnw` file. Which command do you use to build?', a: '`./mvnw package`. The wrapper uses the exact Maven version the project asks for, even if you have another one or none installed.' }
    ]
  }, [
    {
      id: 'why-build-tool',
      title: 'Why a Build Tool',
      category: 'concept',
      icon: 'mvn',
      tagline: 'A recipe card for your whole project',
      glossary: Java.buildToolsTerms,
      realWorld: 'One cake needs one recipe. A bakery needs a recipe card that says which ingredients to buy, in which order to mix them, and how to check every cake before it goes out. A build tool is that card for code.',
      kid: [
        'You build a tower with three blocks. Easy, you do it with your hands.',
        'Now you build a whole castle with a thousand blocks. Some blocks you have to buy in a shop first. You must stack them in the right order, and check that nothing wobbles.',
        'So you write a list: "buy these blocks, stack them like this, push every wall once". A robot reads the list and builds the castle. Every time the same way, at home and at your friend’s house. That robot is a **build tool**, and its list is the `pom.xml`.'
      ],
      definition: 'A **build tool** reads one description of your project and does all the chores with one command: download libraries, compile every file, run the tests and pack the result into a jar. **Maven** is the build tool this course uses.',
      explain: [
        'For one file you know the way from [Getting Started](../getting-started/index.html): `javac Hello.java`, then `java Hello`. That is fine for exercises.',
        'A real project is bigger. It has many classes in **packages** (folders like `com/example`, see [Syntax Fundamentals](../syntax-fundamentals/index.html)). It uses **libraries**: code other people wrote, shipped as **jar** files (a jar is a zip file full of `.class` files). And it has **tests** that must pass before you ship.',
        'By hand you must download every jar from the internet, pick the right version, tell `javac` about every jar with `-cp` (the **classpath**: the list of places where Java looks for classes), compile, run the tests, and zip the result. Then you do it all again on the next computer.',
        'Maven turns this into one file and one command. You describe the project in `pom.xml` (name, Java version, libraries). Then `mvn package` downloads what is missing, compiles, tests and packs. It does the same steps in the same order on every computer, so "it works on my machine" stops being a problem.',
        'Maven does not replace `javac`. Inside, it still calls the Java compiler. It only remembers all the details for you.'
      ],
      why: 'Nobody has to remember the steps, download jars by hand or type long `-cp` lists. Every person and every server builds the project the same way.',
      whenUse: 'As soon as you need a library (like JUnit for tests) or have more than a handful of files. For a one-file exercise, `javac` and `java` stay fine.',
      syntax: '`mvn <phase>`, for example `mvn compile`, `mvn test` or `mvn package`, run in the folder that has `pom.xml`.',
      fileName: 'by-hand.sh',
      codeLanguage: 'bash',
      code: `# The project: two classes in a package, plus one library jar
#   src/com/example/App.java
#   src/com/example/Greeter.java
#   lib/commons-lang3-3.17.0.jar   (you downloaded it by hand)

# 1. Compile: name the jar and every source file
javac -d out -cp lib/commons-lang3-3.17.0.jar src/com/example/*.java

# 2. Run: name the output folder AND the jar again
java -cp out:lib/commons-lang3-3.17.0.jar com.example.App

# With Maven, the same work is one command (and it runs the tests too):
#   mvn package`,
      output: `Hello, Ada!
Hello, Linus!
nevam
=-=-=-=-=-
true
A build tool buil...`,
      codeExplanation: [
        { label: 'Lines 2-4', code: 'lib/commons-lang3-3.17.0.jar', text: 'The library is a jar file. Without a build tool you must find it on the internet, pick a version and save it in `lib/` yourself.' },
        { label: 'Line 7', code: 'javac -d out', text: '`-d out` tells `javac` to write the `.class` files into the folder `out`, sorted into package folders (`out/com/example/`).' },
        { label: 'Line 7', code: '-cp lib/commons-lang3-3.17.0.jar', text: '`-cp` sets the classpath for compiling. The code imports `StringUtils` from the jar, so `javac` must see the jar or it stops with "package does not exist".' },
        { label: 'Line 7', code: 'src/com/example/*.java', text: 'You must list every source file. With 50 files in 10 packages this line gets long.' },
        { label: 'Line 10', code: 'java -cp out:lib/commons-lang3-3.17.0.jar', text: 'At run time Java needs the classpath again: your classes in `out` plus the jar. The `:` separates entries (on Windows it is `;`).' },
        { label: 'Line 10', code: 'com.example.App', text: 'You start a class by its full name: package plus class name.' },
        { label: 'Line 13', code: '#   mvn package', text: 'Maven does the download, the classpath, the compile, the tests and the jar for you. The lessons below show how.' }
      ],
      sections: [
        {
          title: 'One file: javac is enough',
          text: [
            'Start with what you know. One file, no package, no library. Two commands, done.',
            'Save the file as `Hello.java`, then run `javac Hello.java` and `java Hello`.'
          ],
          fileName: 'Hello.java',
          code: `public class Hello {
    public static void main(String[] args) {
        System.out.println("Hello from one file!");
        System.out.println("javac Hello.java, then java Hello. Done.");
    }
}`,
          output: `Hello from one file!
javac Hello.java, then java Hello. Done.`,
          tip: 'Keep using plain `javac` for small exercises. A build tool is for projects.'
        },
        {
          title: 'Many files and a jar: the chores pile up',
          text: [
            'Now the project from the example above: two classes in the package `com.example` and one library. Forget the jar on the classpath once, and `javac` stops at every line that uses it.',
            'The output below is shortened: `javac` prints the same kind of error for each of the 8 places that use `StringUtils`.'
          ],
          codeLanguage: 'bash',
          fileName: 'forgot-the-jar.sh',
          code: `javac -d out src/com/example/*.java`,
          output: `src/com/example/App.java:3: error: package org.apache.commons.lang3 does not exist
import org.apache.commons.lang3.StringUtils;
                               ^
src/com/example/Greeter.java:3: error: package org.apache.commons.lang3 does not exist
import org.apache.commons.lang3.StringUtils;
                               ^
...
8 errors`,
          table: {
            head: ['Chore', 'By hand', 'With Maven'],
            rows: [
              ['Get the library', 'Search the web, download the jar, save it in `lib/`', 'One `<dependency>` block in `pom.xml`'],
              ['Libraries the library needs', 'Find and download them too', 'Downloaded on their own'],
              ['Compile', '`javac -d out -cp … every file`', '`mvn compile`'],
              ['Run the tests', 'Another long `java -cp …` line', '`mvn test`'],
              ['Make a jar', '`jar` command plus a manifest file', '`mvn package`'],
              ['Same result on a new computer', 'Repeat everything, hope you remember', 'Clone, then `mvn package`']
            ],
            note: 'Every row is a place where a human can make a mistake. Maven makes each one a fixed step.'
          }
        },
        {
          title: 'What Maven does with one command',
          text: [
            'You give Maven a description, not a list of commands. Maven knows the steps. It reads `pom.xml`, fetches what is missing, and then walks through its steps in a fixed order.'
          ],
          mermaid: `flowchart LR
  P["pom.xml (what the project is)"] --> M["mvn package"]
  M --> D["download missing jars"]
  D --> C["compile src/main/java"]
  C --> T["compile and run src/test/java"]
  T --> J["pack target/hello-1.0-SNAPSHOT.jar"]`,
          diagramNote: 'Read it left to right. If any box fails (a compile error, a red test), Maven stops there and prints `BUILD FAILURE`.'
        },
        {
          title: 'Ant, Maven and Gradle',
          text: [
            'Java has had three big build tools. You meet all three names at work, so here is who is who.'
          ],
          table: {
            head: ['Tool', 'Since', 'Idea'],
            rows: [
              ['Ant', '2000', 'You write every step yourself in XML (`<javac>`, `<jar>` …). Flexible, but long. Rare in new projects.'],
              ['Maven', '2004', 'Fixed folders and fixed steps ("convention over configuration"). You only describe the project. Very common.'],
              ['Gradle', '2012', 'Same fixed folders as Maven, but the build file is a small program (Kotlin or Groovy). Common on Android and big projects.']
            ],
            note: 'This course uses Maven. The last lesson shows the same project in Gradle.'
          }
        }
      ],
      technical: [
        'Maven itself is a Java program. The `mvn` command is a small shell script that starts a JVM and runs Maven’s main class. That is why Maven needs an installed JDK.',
        'Maven’s core knows almost nothing about Java. The real work is done by **plugins**: `maven-compiler-plugin` calls the same compiler that `javac` uses, `maven-surefire-plugin` runs the tests, `maven-jar-plugin` builds the jar. Maven downloads these plugins like any other library.',
        'The classpath is the key idea. Java finds a class like `org.apache.commons.lang3.StringUtils` only if a folder or jar on the classpath has the file `org/apache/commons/lang3/StringUtils.class`. Maven builds the right classpath for compiling, for testing and for running tests, every time.'
      ],
      tryIt: {
        steps: [
          'Make a folder `by-hand` with `src/com/example/` inside.',
          'Write a class `com.example.App` with a `main` that prints a line. Do not forget `package com.example;` at the top.',
          'Compile it with `javac -d out src/com/example/App.java`.',
          'Run it with `java -cp out com.example.App`.',
          'Now run `java -cp out App` (without the package) and read the error.'
        ],
        see: 'Your line from the first run. The second run fails with `ClassNotFoundException: App`, because the class is called `com.example.App`. Remembering such details is what a build tool does for you.'
      },
      check: [
        { q: 'What does `-cp` mean for `javac` and `java`?', a: 'It sets the classpath: the folders and jar files where Java looks for classes. Every library jar must be on it, both when you compile and when you run.' },
        { q: 'Does Maven replace the Java compiler?', a: 'No. Maven calls the same compiler through its compiler plugin. It only decides what to compile, with which classpath, and in which order.' },
        { q: 'You write a 20-line exercise in one file with no library. Do you need Maven?', a: 'No. `javac` and `java` are enough. Maven pays off when you have libraries, tests or many files.' }
      ],
      keyPoints: [
        'One file: `javac` and `java`. A project with libraries and tests: a build tool.',
        'A library is a jar: a zip file of `.class` files. It must be on the classpath.',
        'Maven reads `pom.xml` and does download, compile, test and package in a fixed order.',
        'Maven still uses `javac` inside. It remembers the details for you.',
        'Same command, same result, on every computer.'
      ],
      commonMistakes: [
        'Forgetting a jar on the classpath: `javac -d out src/com/example/*.java` fails with "package … does not exist". Add `-cp lib/the.jar`, or let Maven do it.',
        'Running a class in a package by its short name: `java -cp out App`. Use the full name `java -cp out com.example.App`.',
        'Copying jars into the project by hand and committing them to Git. Declare them in `pom.xml` instead, so Maven fetches the right version.',
        'Starting a tiny one-file exercise with Maven. It works, but plain `javac` is faster to learn with.'
      ],
      related: ['install-maven', 'maven-project', 'Getting Started on Ubuntu']
    }
  ]);
})();
