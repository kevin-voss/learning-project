(function () {
  Java.addCoreTopic('build-tools', {
    label: 'Build Tools',
    headline: 'Maven,',
    accent: 'one command builds it all.',
    intro: 'A build tool downloads libraries, compiles, tests and packages your project with one command. We use Maven.',
    overview: 'Why a build tool → a Maven project → the lifecycle → Maven or Gradle.',
    tryIt: {
      steps: [
        'Install Maven: `sudo apt install maven`.',
        'Make the folders: `mkdir -p hello/src/main/java && cd hello`.',
        'Save the pom.xml from the lesson "A Maven Project" in `hello/`.',
        'Save a `Hello.java` with a main method in `src/main/java/`.',
        'Run `mvn package`, then `java -cp target/classes Hello`.'
      ],
      see: '`BUILD SUCCESS`, a new `target/` folder, and your Hello text.'
    },
    check: [
      { q: 'Which file tells Maven about your project?', a: '`pom.xml`, in the project’s top folder.' },
      { q: 'Where does your normal Java code go in a Maven project?', a: 'In `src/main/java`. Tests go in `src/test/java`.' },
      { q: 'You run `mvn package`. Does Maven also run the tests?', a: 'Yes. Each step runs all steps before it: compile, test, then package.' }
    ]
  }, [
    {
      id: 'why-build-tool',
      title: 'Why a Build Tool',
      category: 'concept',
      icon: 'mvn',
      tagline: 'A recipe card for your whole project',
      realWorld: 'One cake needs one recipe. A bakery needs a recipe card that says which ingredients to buy, in which order to mix them, and how to check the cake. A build tool is that card for code.',
      definition: 'For one file, `javac` and `java` are enough. A real project has many files, libraries from the internet and tests. A build tool does all of that with one command, the same way on every computer.',
      why: 'Nobody has to remember the steps or download libraries by hand.',
      whenUse: 'As soon as you need a library (like JUnit) or have more than a few files.',
      codeLanguage: 'bash',
      fileName: 'compare.sh',
      code: `# One file: javac is enough
javac Hello.java
java Hello

# A project: one Maven command
mvn package`,
      codeExplanation: ['Small: compile one file yourself.', 'Then run it.', 'Big: Maven downloads, compiles, tests and packages everything.'],
      keyPoints: ['Tiny exercise: javac. Project: Maven.'],
      commonMistakes: ['Starting a 20-line exercise with Maven.'],
      related: ['Getting Started on Ubuntu']
    },
    {
      id: 'maven-project',
      title: 'A Maven Project',
      category: 'concept',
      icon: 'pom',
      tagline: 'pom.xml plus fixed folders',
      realWorld: 'A school bag with fixed pockets: books in the big one, pens in the small one. Everyone knows where to look. Maven projects have fixed folders too.',
      definition: '`pom.xml` is the project card: its name, the Java version and the libraries it needs. Code goes in `src/main/java`, tests in `src/test/java`. Maven writes its output to `target/`.',
      why: 'Fixed folders mean almost no setup. Maven already knows where to look.',
      whenUse: 'Every new Maven project starts with this pom.',
      table: {
        label: 'Folders',
        head: ['Folder', 'What goes in'],
        rows: [
          ['`pom.xml`', 'The project card'],
          ['`src/main/java/`', 'Your program code'],
          ['`src/test/java/`', 'Your tests'],
          ['`target/`', 'Built output. Maven makes it. Do not edit.']
        ]
      },
      codeLanguage: 'xml',
      fileName: 'pom.xml',
      code: `<project xmlns="http://maven.apache.org/POM/4.0.0">
  <modelVersion>4.0.0</modelVersion>
  <groupId>com.example</groupId>
  <artifactId>hello</artifactId>
  <version>1.0</version>

  <properties>
    <maven.compiler.source>21</maven.compiler.source>
    <maven.compiler.target>21</maven.compiler.target>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
  </properties>
</project>`,
      codeSummary: 'The smallest useful pom.xml: who you are (groupId, artifactId, version) and which Java version to use.',
      codeExplanation: [
        'groupId is your team or website name, written backwards: com.example.',
        'artifactId is the project name. version is its version.',
        'The properties tell Maven to compile for Java 21 and read files as UTF-8.'
      ],
      keyPoints: ['Run mvn commands in the folder that has pom.xml.', 'Never edit target/. Delete it with `mvn clean`.'],
      commonMistakes: ['Putting .java files next to pom.xml instead of in src/main/java.'],
      related: ['Testing']
    },
    {
      id: 'maven-lifecycle',
      title: 'The Maven Lifecycle',
      category: 'practice',
      icon: '→',
      tagline: 'compile → test → package',
      realWorld: 'A car wash: soap, rinse, dry. If you ask for "dry", the car still gets soap and rinse first.',
      definition: 'Maven runs steps in a fixed order: compile, test, package. When you ask for one step, Maven runs every step before it. So `mvn package` also runs your tests. If a test fails, no package is made.',
      why: 'You can never ship a package with failing tests by accident.',
      whenUse: '`mvn test` while you work. `mvn package` when you want the finished jar.',
      codeLanguage: 'bash',
      fileName: 'maven.sh',
      code: `mvn compile   # compile src/main/java
mvn test      # compile + run the tests
mvn package   # compile + test + make target/hello-1.0.jar
mvn clean     # delete target/ and start fresh`,
      codeExplanation: ['Only compile.', 'Compile, then run every test.', 'All of the above, then build a jar file.', 'Throw away the old output.'],
      keyPoints: ['Each step includes the steps before it.', 'A red test stops the build.'],
      commonMistakes: ['Skipping tests with -DskipTests because they are red. Fix the test instead.'],
      related: ['Testing']
    },
    {
      id: 'maven-or-gradle',
      title: 'Maven or Gradle',
      category: 'habits',
      icon: 'G',
      tagline: 'Two tools, same idea',
      realWorld: 'Two shopping apps. The buttons look different, but you still pick, pay and get your food.',
      definition: 'Gradle does the same job as Maven: get libraries, compile, test, package. Maven uses XML and fixed steps. Gradle uses a small script and is faster on big projects. We use Maven because it is simpler to read and Spring Boot docs show it first.',
      table: {
        label: 'Compared',
        head: ['', 'Maven', 'Gradle'],
        rows: [
          ['Config file', '`pom.xml` (XML)', '`build.gradle(.kts)` (script)'],
          ['Test command', '`mvn test`', '`./gradlew test`'],
          ['Good at', 'Simple, predictable, everywhere', 'Fast, flexible, Android'],
          ['Harder part', 'Long XML', 'More ideas to learn']
        ],
        note: 'Once you know one, the other is easy: declare what you need, then compile, test, package.'
      },
      keyPoints: ['The idea is the same in both tools.', 'If a project has `gradlew`, use `./gradlew`, not a system gradle.'],
      commonMistakes: ['Mixing pom.xml and build.gradle in one project.'],
      related: ['Testing']
    }
  ]);
})();
