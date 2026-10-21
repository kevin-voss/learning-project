// Build tools, lesson 10: the same project in Gradle, and when to pick which tool.
(function () {
  Java.addCoreLessons('build-tools', [
    {
      id: 'maven-or-gradle',
      title: 'Maven or Gradle',
      category: 'habits',
      icon: 'G',
      tagline: 'Two tools, same idea',
      glossary: Java.buildToolsTerms,
      realWorld: 'Two shopping apps. The buttons look different and sit in other places, but in both you pick your food, pay and get it delivered.',
      kid: [
        'Maven is a robot that reads a fixed form: you tick boxes, and it always builds the same way.',
        'Gradle is a robot that reads a little story you write: "first do this, then that". It can do clever extra tricks, and it remembers what it already built, so it is often faster.',
        'Both robots use the same toy shop (Maven Central) and the same boxes (`src/main/java`, `src/test/java`). If you know one robot, you learn the other one quickly.'
      ],
      definition: '**Gradle** is a build tool that does the same job as Maven: get libraries, compile, test, package. Its build file `build.gradle.kts` is a small program in Kotlin (or `build.gradle` in Groovy) instead of XML, and it works with **tasks** instead of fixed phases.',
      explain: [
        'Gradle uses the same standard folders as Maven (`src/main/java`, `src/test/java`) and the same repositories (Maven Central), with the same coordinates. Only the output folder is called `build/` instead of `target/`.',
        'Instead of a lifecycle with phases, Gradle has **tasks** that depend on each other: `build` needs `assemble` and `check`; `check` needs `test`; `test` needs `compileJava` and `compileTestJava`. Gradle works out the order from these links, a **task graph**.',
        'Gradle remembers inputs and outputs of each task. When nothing changed, a task is `UP-TO-DATE` and skipped. A background process, the **Gradle daemon**, stays running between builds, so the second build is much faster than the first.',
        'Dependency scopes have other names: `implementation` (Maven `compile`), `testImplementation` (`test`), `compileOnly` (`provided`), `runtimeOnly` (`runtime`). And on a version conflict Gradle picks the **highest** version, where Maven picks the nearest.',
        'This course uses Maven: the XML is longer, but every project looks the same, and most beginner guides (and the [Testing](../testing/index.html) topic) show Maven first. Android projects always use Gradle, and many big companies do too.'
      ],
      why: 'You will meet both tools at work. Knowing how the same ideas look in each lets you read any Java project.',
      whenUse: 'Use whatever the project already uses: `pom.xml` means Maven, `build.gradle(.kts)` means Gradle. For a new small project, either is fine; Android means Gradle.',
      syntax: '`plugins { application }` · `dependencies { implementation("group:artifact:version") }` · `./gradlew build` · `./gradlew run`',
      fileName: 'build.gradle.kts',
      codeLanguage: 'kotlin',
      code: `plugins {
    application
}

group = "com.example"
version = "1.0-SNAPSHOT"

repositories {
    mavenCentral()
}

dependencies {
    implementation("org.apache.commons:commons-lang3:3.17.0")
    testImplementation("org.junit.jupiter:junit-jupiter:5.11.4")
    testRuntimeOnly("org.junit.platform:junit-platform-launcher")
}

tasks.withType<JavaCompile> {
    options.release = 21
}

application {
    mainClass = "com.example.App"
}

tasks.test {
    useJUnitPlatform()
}`,
      output: `$ ./gradlew run
> Task :compileJava
> Task :processResources NO-SOURCE
> Task :classes

> Task :run
Hello, Ada!
Hello, Linus!
nevam
=-=-=-=-=-
true
A build tool buil...

BUILD SUCCESSFUL in 443ms
2 actionable tasks: 2 executed`,
      codeSummary: 'The hello project from the Maven lessons (with commons-lang3 and JUnit) as a Gradle build. Next to it lives `settings.gradle.kts` with one line: `rootProject.name = "hello"`.',
      codeExplanation: [
        { label: 'Lines 1-3', code: 'plugins { application }', text: 'The `application` plugin adds Java support plus the tasks `run` and a start script. It is like Maven’s `jar` packaging plus the exec plugin.' },
        { label: 'Lines 5-6', code: 'group = "com.example"', text: 'The same coordinates as in `pom.xml`. The artifactId comes from `rootProject.name` in `settings.gradle.kts`.' },
        { label: 'Lines 8-10', code: 'mavenCentral()', text: 'Download libraries from Maven Central. Maven does this without being asked; Gradle wants it written down.' },
        { label: 'Line 13', code: 'implementation("org.apache.commons:commons-lang3:3.17.0")', text: 'One dependency in one line, written as `group:artifact:version`. `implementation` is Maven’s `compile` scope.' },
        { label: 'Lines 14-15', code: 'testImplementation(...)', text: 'JUnit for tests only (Maven’s `test` scope). The `junit-platform-launcher` line is needed by Gradle to start JUnit 5.' },
        { label: 'Lines 18-20', code: 'options.release = 21', text: 'Compile for Java 21, like `<maven.compiler.release>21</maven.compiler.release>`.' },
        { label: 'Lines 22-24', code: 'mainClass = "com.example.App"', text: 'Which class `./gradlew run` starts, like `-Dexec.mainClass`.' },
        { label: 'Lines 26-28', code: 'useJUnitPlatform()', text: 'Tell the test task to run JUnit 5 tests. Maven’s surefire finds them on its own.' },
        { label: 'Output', code: '> Task :run', text: 'Gradle prints each task it runs. Your program’s lines come under `:run`.' }
      ],
      sections: [
        {
          title: 'Maven and Gradle side by side',
          text: [
            'The ideas are the same; the words differ. Keep this table close when you open your first Gradle project.'
          ],
          table: {
            head: ['', 'Maven', 'Gradle'],
            rows: [
              ['Build file', '`pom.xml` (XML)', '`build.gradle.kts` (Kotlin) or `build.gradle` (Groovy), plus `settings.gradle.kts`'],
              ['Style', 'Fixed lifecycle with phases', 'Tasks that depend on each other'],
              ['Output folder', '`target/`', '`build/`'],
              ['Compile', '`mvn compile`', '`./gradlew compileJava`'],
              ['Test', '`mvn test`', '`./gradlew test`'],
              ['Make the jar (with tests)', '`mvn package`', '`./gradlew build`'],
              ['Run the app', '`mvn compile exec:java`', '`./gradlew run`'],
              ['Clean', '`mvn clean`', '`./gradlew clean`'],
              ['Dependency tree', '`mvn dependency:tree`', '`./gradlew dependencies`'],
              ['Wrapper', '`./mvnw`', '`./gradlew`'],
              ['Version conflict', 'Nearest wins', 'Highest wins'],
              ['Strong side', 'Simple, predictable, every project looks alike', 'Fast (caching, daemon), flexible, Android'],
              ['Hard side', 'Long XML, custom steps are clumsy', 'More ideas to learn, build files differ a lot']
            ],
            note: 'Once you know one, the other is quick: describe the project, then compile, test, package.'
          }
        },
        {
          title: 'Scopes have new names',
          text: [
            'Gradle calls the scope a **configuration**. Same idea: on which classpaths a library lands.'
          ],
          table: {
            head: ['Maven scope', 'Gradle configuration', 'Example'],
            rows: [
              ['`compile`', '`implementation`', '`implementation("org.apache.commons:commons-lang3:3.17.0")`'],
              ['`test`', '`testImplementation`', '`testImplementation("org.junit.jupiter:junit-jupiter:5.11.4")`'],
              ['`provided`', '`compileOnly`', 'An API the server brings'],
              ['`runtime`', '`runtimeOnly`', 'A database driver']
            ]
          }
        },
        {
          title: 'A full Gradle build',
          text: [
            '`./gradlew build` runs every task the `build` task needs. Notice the order: Gradle makes the jar (`:jar`, `:assemble`) and then runs the tests (`:test`, `:check`). If a test fails, the build still fails, but unlike Maven the jar may already be in `build/libs/`.',
            'The first build also prints `Starting a Gradle Daemon`, and the wrapper downloads Gradle itself on the very first run.'
          ],
          codeLanguage: 'bash',
          fileName: 'gradle-build.sh',
          code: `./gradlew clean build`,
          output: `> Task :clean
> Task :compileJava
> Task :processResources NO-SOURCE
> Task :classes
> Task :jar
> Task :startScripts
> Task :distTar
> Task :distZip
> Task :assemble
> Task :compileTestJava
> Task :processTestResources NO-SOURCE
> Task :testClasses
> Task :test
> Task :check
> Task :build

BUILD SUCCESSFUL in 1s
8 actionable tasks: 8 executed`,
          mermaid: `flowchart TD
  B["build"] --> A["assemble"]
  B --> CH["check"]
  A --> J["jar"]
  J --> CL["classes"]
  CL --> CJ["compileJava"]
  CH --> T["test"]
  T --> TC["testClasses"]
  TC --> CTJ["compileTestJava"]
  CTJ --> CL`,
          diagramNote: 'An arrow means "needs". Gradle runs every needed task once, leaves first. `NO-SOURCE` means a task had nothing to do (no resources folder), like Maven’s `skip non existing resourceDirectory`.'
        },
        {
          title: 'The Gradle files in a project',
          text: [
            '`gradle wrapper` creates the wrapper, like `mvn wrapper:wrapper` does. A typical Gradle project folder looks like this. Commit everything except `build/` and `.gradle/`.'
          ],
          codeLanguage: 'bash',
          fileName: 'files.sh',
          code: `ls -a`,
          output: `.  ..  .gradle  build  build.gradle.kts  gradle  gradlew  gradlew.bat  settings.gradle.kts  src`,
          table: {
            head: ['File', 'Maven twin'],
            rows: [
              ['`build.gradle.kts`', '`pom.xml`'],
              ['`settings.gradle.kts` (project name, sub-projects)', 'The `<artifactId>` and `<modules>` of `pom.xml`'],
              ['`gradlew`, `gradlew.bat`, `gradle/wrapper/`', '`mvnw`, `mvnw.cmd`, `.mvn/wrapper/`'],
              ['`build/`', '`target/`'],
              ['`.gradle/`', 'Gradle’s own notes for this project (Maven has none)']
            ]
          },
          warn: 'Never keep `pom.xml` and `build.gradle.kts` side by side in one project. Two build files with two sets of versions drift apart; pick one tool.'
        }
      ],
      technical: [
        'The outputs here come from Gradle 9.3; each build also ends with a hint line about the "configuration cache", which is left out. Gradle runs in two passes. In the **configuration** pass it executes `build.gradle.kts` as Kotlin code and builds the task graph. In the **execution** pass it runs the tasks the graph says are needed, skipping those that are `UP-TO-DATE`. Maven has no such program step: it reads the POM as data.',
        'The Gradle daemon is a JVM that stays alive in the background (for a few hours of idle time) and keeps the build model and compiled build scripts in memory. That is a large part of why repeated Gradle builds feel fast. `./gradlew --stop` ends it.',
        'Gradle has its own download cache in `~/.gradle/caches/`, separate from Maven’s `~/.m2/repository`. It reads POM files of libraries from Maven Central, so transitive dependencies work the same way, apart from the "highest version wins" rule.'
      ],
      tryIt: {
        steps: [
          'Copy your `hello` project to `hello-gradle` and delete `pom.xml`, `mvnw`, `mvnw.cmd`, `.mvn/` and `target/` in the copy.',
          'Write `settings.gradle.kts` with `rootProject.name = "hello"` and `build.gradle.kts` from the example.',
          'If you have Gradle installed, run `gradle wrapper`; otherwise make a project on [start.spring.io](https://start.spring.io) with "Gradle - Kotlin" and copy its `gradlew` files.',
          'Run `./gradlew build`, then `ls build/libs/`.',
          'Run `./gradlew run`.'
        ],
        see: 'The `> Task :…` lines, `BUILD SUCCESSFUL`, `hello-1.0-SNAPSHOT.jar` in `build/libs/`, and the six lines of your app under `> Task :run`.'
      },
      check: [
        { q: 'A project has `build.gradle.kts` and `gradlew`. How do you run its tests?', a: '`./gradlew test`. Use the wrapper, not a system `gradle` command.' },
        { q: 'What is the Gradle word for Maven’s `test` scope?', a: '`testImplementation`.' },
        { q: 'Maven writes to `target/`. Where does Gradle write?', a: 'To `build/`, for example `build/libs/hello-1.0-SNAPSHOT.jar`.' }
      ],
      keyPoints: [
        'Same job, same folders, same Maven Central; only the build file and words differ.',
        'Maven: XML and phases. Gradle: Kotlin or Groovy script and tasks.',
        '`target/` in Maven is `build/` in Gradle.',
        '`compile` / `test` scopes are `implementation` / `testImplementation`.',
        'Use the wrapper of whatever tool the project has: `./mvnw` or `./gradlew`.'
      ],
      commonMistakes: [
        'Mixing `pom.xml` and `build.gradle.kts` in one project. Pick one.',
        'Using a system `gradle` when the project has `gradlew`. Type `./gradlew build`, so the project’s Gradle version is used.',
        'Writing Maven words in Gradle, like `compile("…")`. That configuration was removed in Gradle 7; use `implementation("…")`.',
        'Forgetting `tasks.test { useJUnitPlatform() }`. Gradle finds no JUnit 5 tests, and Gradle 9 stops with `the test task did not discover any tests to execute`. Add the block.'
      ],
      related: ['maven-wrapper', 'transitive-dependencies', 'Testing']
    }
  ]);
})();
