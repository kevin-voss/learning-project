// Build tools, lesson 5: the Maven lifecycle, phase by phase, with real output.
(function () {
  Java.addCoreLessons('build-tools', [
    {
      id: 'maven-lifecycle',
      title: 'The Maven Lifecycle',
      category: 'practice',
      icon: '→',
      tagline: 'validate → compile → test → package → install',
      glossary: Java.buildToolsTerms,
      realWorld: 'A car wash: soap, rinse, dry. If you ask for "dry", the car still gets soap and rinse first. Nobody dries a dirty car.',
      kid: [
        'Getting ready for school has steps in a fixed order: get up, wash, get dressed, put on shoes.',
        'If Dad says "put on your shoes", you cannot skip getting dressed. You do every step before the shoes first.',
        'Maven is the same. Its steps are called **phases**. When you say `mvn package` ("pack the box"), Maven first checks, compiles and tests, and only then packs. If a test is red, Maven stops, like you stop when a shoe lace breaks.'
      ],
      definition: 'The Maven **lifecycle** is a fixed list of **phases**: `validate` → `compile` → `test` → `package` → `verify` → `install` → `deploy`. When you run one phase, Maven runs every phase before it, in order. `clean` is a separate lifecycle that deletes `target/`.',
      explain: [
        'A **phase** is a named step. Maven ties each phase to plugin **goals** that do the real work: in `compile`, the goal `compiler:compile` runs; in `test`, the goal `surefire:test` runs. In the output, each goal is a line like `--- compiler:3.13.0:compile (default-compile) @ hello ---`.',
        '`validate` checks that `pom.xml` is complete. `compile` turns `src/main/java` into `.class` files in `target/classes`. `test` compiles `src/test/java` and runs the tests. `package` makes the jar in `target/`. `verify` runs extra checks (none in a small project). `install` copies the jar into your local repository `~/.m2/repository`, so other projects on your computer can use it. `deploy` uploads it to a shared server; you rarely run it yourself.',
        'Because the order is fixed, `mvn package` always tests first. A failing test stops the build with `BUILD FAILURE`, and no jar is made. You cannot ship a broken build by accident.',
        'Maven is smart about work already done. If nothing changed since the last build, the compiler prints `Nothing to compile - all classes are up to date.` and moves on.',
        '`mvn clean` belongs to a second lifecycle. It deletes `target/`. You often combine both: `mvn clean package` means "throw away the old output, then build everything fresh".'
      ],
      why: 'Every project builds with the same few words, and the fixed order guarantees that tests run before anything is packed or shared.',
      whenUse: '`mvn compile` to check that the code compiles, `mvn test` while you work, `mvn package` when you want the jar, `mvn clean package` when something looks strange, `mvn install` when another project of yours needs this one.',
      syntax: '`mvn <phase>` · `mvn clean <phase>` · `mvn <plugin>:<goal>` · options like `-q` (quiet) or `-B` (batch, no colours and progress bars)',
      fileName: 'build.sh',
      codeLanguage: 'bash',
      code: `cd ~/java-practice/hello
mvn clean package`,
      output: `[INFO] Scanning for projects...
[INFO]
[INFO] -------------------------< com.example:hello >--------------------------
[INFO] Building hello 1.0-SNAPSHOT
[INFO]   from pom.xml
[INFO] --------------------------------[ jar ]---------------------------------
[INFO]
[INFO] --- clean:3.2.0:clean (default-clean) @ hello ---
[INFO]
[INFO] --- resources:3.3.1:resources (default-resources) @ hello ---
[INFO] skip non existing resourceDirectory /home/you/hello/src/main/resources
[INFO]
[INFO] --- compiler:3.13.0:compile (default-compile) @ hello ---
[INFO] Recompiling the module because of changed source code.
[INFO] Compiling 2 source files with javac [debug release 21] to target/classes
[INFO]
[INFO] --- resources:3.3.1:testResources (default-testResources) @ hello ---
[INFO] skip non existing resourceDirectory /home/you/hello/src/test/resources
[INFO]
[INFO] --- compiler:3.13.0:testCompile (default-testCompile) @ hello ---
[INFO] Recompiling the module because of changed dependency.
[INFO] Compiling 1 source file with javac [debug release 21] to target/test-classes
[INFO]
[INFO] --- surefire:3.5.2:test (default-test) @ hello ---
[INFO] Using auto detected provider org.apache.maven.surefire.junitplatform.JUnitPlatformProvider
[INFO]
[INFO] -------------------------------------------------------
[INFO]  T E S T S
[INFO] -------------------------------------------------------
[INFO] Running com.example.GreeterTest
[INFO] Tests run: 1, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 0.014 s -- in com.example.GreeterTest
[INFO]
[INFO] Results:
[INFO]
[INFO] Tests run: 1, Failures: 0, Errors: 0, Skipped: 0
[INFO]
[INFO]
[INFO] --- jar:3.4.1:jar (default-jar) @ hello ---
[INFO] Building jar: /home/you/hello/target/hello-1.0-SNAPSHOT.jar
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time:  1.000 s
[INFO] Finished at: 2026-10-21T17:40:15+02:00
[INFO] ------------------------------------------------------------------------`,
      codeExplanation: [
        { label: 'Command', code: 'mvn clean package', text: 'Two phases from two lifecycles: first `clean` (delete `target/`), then `package` with every phase before it.' },
        { label: 'Output', code: 'Building hello 1.0-SNAPSHOT', text: 'Maven read `pom.xml` and found the project `com.example:hello`, version `1.0-SNAPSHOT`, packaging `jar`. This is the `validate` phase; it prints nothing else when the POM is fine.' },
        { label: 'Output', code: '--- clean:3.2.0:clean (default-clean) @ hello ---', text: 'The goal `clean` of the clean plugin, version 3.2.0. It deleted the old `target/`.' },
        { label: 'Output', code: 'skip non existing resourceDirectory', text: 'The resources plugin would copy `src/main/resources`, but the project has no such folder. That is fine.' },
        { label: 'Output', code: 'Compiling 2 source files with javac [debug release 21] to target/classes', text: 'The `compile` phase: `App.java` and `Greeter.java` become `.class` files, built for Java 21, with debug info for the [debugger](../debugging/index.html).' },
        { label: 'Output', code: 'Compiling 1 source file ... to target/test-classes', text: 'The test code is compiled into its own folder, so it never mixes with your program.' },
        { label: 'Output', code: 'Running com.example.GreeterTest', text: 'The `test` phase: the surefire plugin finds every class in `src/test/java` whose name ends in `Test` and runs it.' },
        { label: 'Output', code: 'Tests run: 1, Failures: 0, Errors: 0, Skipped: 0', text: 'The test summary. One test ran and passed. A failure would stop the build here.' },
        { label: 'Output', code: 'Building jar: /home/you/hello/target/hello-1.0-SNAPSHOT.jar', text: 'The `package` phase: the jar plugin zips `target/classes` into `artifactId-version.jar`.' },
        { label: 'Output', code: 'BUILD SUCCESS', text: 'Every phase worked. `Total time` is how long it took; `Finished at` is the clock time.' }
      ],
      sections: [
        {
          title: 'The phases in order',
          text: [
            'Here are the phases you use. Running a phase means running it and everything to its left.'
          ],
          mermaid: `flowchart LR
  V["validate (check pom.xml)"] --> C["compile (src/main/java)"]
  C --> T["test (src/test/java)"]
  T --> P["package (make the jar)"]
  P --> VE["verify (extra checks)"]
  VE --> I["install (copy to ~/.m2)"]
  I --> D["deploy (upload to a server)"]
  CL["clean (delete target/)"]`,
          diagramNote: '`clean` stands alone: it is its own lifecycle and runs only when you ask for it. Between the big phases there are small ones (like `process-resources` or `test-compile`); Maven runs them too, you rarely name them.',
          table: {
            head: ['Command', 'Runs', 'Result'],
            rows: [
              ['`mvn validate`', 'validate', 'POM checked, nothing built'],
              ['`mvn compile`', 'validate, compile', '`target/classes/…/*.class`'],
              ['`mvn test`', '… compile, test', 'Tests compiled and run, reports in `target/surefire-reports/`'],
              ['`mvn package`', '… test, package', '`target/hello-1.0-SNAPSHOT.jar`'],
              ['`mvn install`', '… package, verify, install', 'Jar copied to `~/.m2/repository/com/example/hello/1.0-SNAPSHOT/`'],
              ['`mvn clean`', 'clean', '`target/` deleted']
            ]
          }
        },
        {
          title: 'mvn compile and mvn test',
          text: [
            '`mvn compile` stops after the compile phase. Use it to check quickly that everything compiles.',
            'Then `mvn test`. Look at the first compiler line: `Nothing to compile`. Maven saw that `App.class` is newer than `App.java` and skipped the work. Only the test code is compiled now.'
          ],
          codeLanguage: 'bash',
          fileName: 'compile-then-test.sh',
          code: `mvn compile
mvn test`,
          output: `$ mvn compile
[INFO] --- compiler:3.13.0:compile (default-compile) @ hello ---
[INFO] Recompiling the module because of changed source code.
[INFO] Compiling 2 source files with javac [debug release 21] to target/classes
[INFO] BUILD SUCCESS
$ mvn test
[INFO] --- compiler:3.13.0:compile (default-compile) @ hello ---
[INFO] Nothing to compile - all classes are up to date.
[INFO] --- compiler:3.13.0:testCompile (default-testCompile) @ hello ---
[INFO] Compiling 1 source file with javac [debug release 21] to target/test-classes
[INFO] --- surefire:3.5.2:test (default-test) @ hello ---
[INFO] Tests run: 1, Failures: 0, Errors: 0, Skipped: 0
[INFO] BUILD SUCCESS`,
          tip: 'The output is shortened to the important lines; `$` marks where you type the next command. Your terminal shows the full block for each command, like in the example above.'
        },
        {
          title: 'A red test stops the build',
          text: [
            'Change the test so it expects `"Hi, Ada!"` instead of `"Hello, Ada!"`, then run `mvn package`. The tests fail, Maven prints `BUILD FAILURE`, and the `package` phase never runs: there is no new jar.',
            'Read the `Results:` block from the top: which test failed (`GreeterTest.greetsByName`), in which line (`:10`), and what was expected versus what came out.'
          ],
          codeLanguage: 'bash',
          fileName: 'red-test.sh',
          code: `mvn package`,
          output: `[INFO] Running com.example.GreeterTest
[ERROR] Tests run: 1, Failures: 1, Errors: 0, Skipped: 0, Time elapsed: 0.018 s <<< FAILURE! -- in com.example.GreeterTest
[ERROR] com.example.GreeterTest.greetsByName -- Time elapsed: 0.011 s <<< FAILURE!
org.opentest4j.AssertionFailedError: expected: <Hi, Ada!> but was: <Hello, Ada!>
	at com.example.GreeterTest.greetsByName(GreeterTest.java:10)
[INFO]
[INFO] Results:
[INFO]
[ERROR] Failures:
[ERROR]   GreeterTest.greetsByName:10 expected: <Hi, Ada!> but was: <Hello, Ada!>
[INFO]
[ERROR] Tests run: 1, Failures: 1, Errors: 0, Skipped: 0
[INFO]
[INFO] ------------------------------------------------------------------------
[INFO] BUILD FAILURE
[INFO] ------------------------------------------------------------------------
[ERROR] Failed to execute goal org.apache.maven.plugins:maven-surefire-plugin:3.5.2:test (default-test) on project hello: There are test failures.`,
          warn: 'Do not "fix" a red build with `mvn package -DskipTests`. That flag skips running the tests, so the jar may be broken. Fix the code or the test. The stack trace (the `at …` lines, see [Exceptions](../exceptions/index.html)) is shortened here.'
        },
        {
          title: 'mvn install and mvn clean',
          text: [
            '`install` runs everything up to `package`, then copies your jar and POM into the local repository. Another project on your computer can now list `com.example:hello:1.0-SNAPSHOT` as a dependency.',
            '`clean` deletes `target/`. Run it when the build behaves strangely, for example after you renamed or deleted classes: old `.class` files can stay in `target/` and confuse you.'
          ],
          codeLanguage: 'bash',
          fileName: 'install-clean.sh',
          code: `mvn install
mvn clean`,
          output: `$ mvn install
[INFO] --- jar:3.4.1:jar (default-jar) @ hello ---
[INFO] Building jar: /home/you/hello/target/hello-1.0-SNAPSHOT.jar
[INFO]
[INFO] --- install:3.1.2:install (default-install) @ hello ---
[INFO] Installing /home/you/hello/pom.xml to /home/you/.m2/repository/com/example/hello/1.0-SNAPSHOT/hello-1.0-SNAPSHOT.pom
[INFO] Installing /home/you/hello/target/hello-1.0-SNAPSHOT.jar to /home/you/.m2/repository/com/example/hello/1.0-SNAPSHOT/hello-1.0-SNAPSHOT.jar
[INFO] BUILD SUCCESS
$ mvn clean
[INFO] --- clean:3.2.0:clean (default-clean) @ hello ---
[INFO] Deleting /home/you/hello/target
[INFO] BUILD SUCCESS`
        },
        {
          title: 'Phases, goals and handy options',
          text: [
            'You can also run a single plugin goal without the lifecycle: `mvn dependency:tree` or `mvn exec:java`. A word with a colon is a goal; a word without is a phase. You can mix them: `mvn clean compile exec:java`.',
            'A typo in a phase name stops Maven at once, and it lists every phase it knows: `Unknown lifecycle phase "pakage". You must specify a valid lifecycle phase or a goal …`.'
          ],
          table: {
            head: ['Option', 'Meaning', 'Example'],
            rows: [
              ['`-q`', 'Quiet: only errors and your program’s output', '`mvn -q compile`'],
              ['`-B`', 'Batch mode: no colours, no download progress bars (good for logs)', '`mvn -B package`'],
              ['`-o`', 'Offline: use only `~/.m2`, never download', '`mvn -o test`'],
              ['`-Dtest=Name`', 'Run only one test class', '`mvn test -Dtest=GreeterTest`'],
              ['`-DskipTests`', 'Compile tests but do not run them (use rarely)', '`mvn package -DskipTests`'],
              ['`-e` / `-X`', 'Show the full error / everything Maven does', '`mvn -e package`']
            ]
          }
        }
      ],
      technical: [
        'Maven 3 knows three lifecycles: `clean`, `default` (validate … deploy) and `site` (project web pages). The `default` lifecycle has 23 phases; the big ones above are the ones you name. When you type `mvn package`, Maven makes the list of every phase up to `package` and runs the goals bound to each.',
        'Which goal runs in which phase depends on the `<packaging>`. For `jar`, the bindings are: `process-resources` → `resources:resources`, `compile` → `compiler:compile`, `process-test-resources` → `resources:testResources`, `test-compile` → `compiler:testCompile`, `test` → `surefire:test`, `package` → `jar:jar`, `install` → `install:install`, `deploy` → `deploy:deploy`. That is exactly the order of the `---` lines in the output.',
        'The compiler plugin keeps notes in `target/maven-status/` about which files it compiled. On the next run it compares file dates and only recompiles when something changed. `mvn clean` throws those notes away together with the classes.'
      ],
      tryIt: {
        steps: [
          'In your `hello` project, run `mvn clean` and then `ls` (no `target/`).',
          'Run `mvn compile` and then `ls target/classes/com/example/`.',
          'Run `mvn test` and find the line `Tests run:`.',
          'Make the test fail on purpose (change the expected text), run `mvn package`, and check `ls target/*.jar`.',
          'Fix the test, run `mvn package` again, and run `ls target/*.jar` again.'
        ],
        see: 'After the red test: `BUILD FAILURE` and no new jar (after `clean`, `ls target/*.jar` finds nothing). After the fix: `BUILD SUCCESS` and `target/hello-1.0-SNAPSHOT.jar`.'
      },
      check: [
        { q: 'You run `mvn test`. Which phases run?', a: '`validate`, `compile`, `test` (and the small phases between them). Not `package`, so no jar is made.' },
        { q: 'What is the difference between `mvn package` and `mvn install`?', a: '`package` makes the jar in `target/`. `install` also copies it (with its POM) into `~/.m2/repository`, so other local projects can use it as a dependency.' },
        { q: 'Is `dependency:tree` a phase or a goal?', a: 'A goal: it has a colon (`plugin:goal`). It runs only that one task, no lifecycle phases.' }
      ],
      keyPoints: [
        'Phases run in a fixed order: validate → compile → test → package → verify → install → deploy.',
        'Running a phase runs every phase before it, so `package` always tests first.',
        'A red test means `BUILD FAILURE` and no jar.',
        '`clean` is separate; `mvn clean package` builds fresh.',
        'Each `--- plugin:version:goal ---` line shows which plugin does the work.',
        'A word with a colon is a goal (`exec:java`), without is a phase (`test`).'
      ],
      commonMistakes: [
        'Skipping red tests with `mvn package -DskipTests`. Fix the code or the test instead.',
        'Typing `mvn pakage`. Maven answers `Unknown lifecycle phase "pakage"`; check the spelling.',
        'Running `mvn` in a folder without `pom.xml`. Maven says `there is no POM in this directory`; `cd` into the project.',
        'Old classes after a rename, like `OldName.class` still in `target/classes`. Run `mvn clean package` to start fresh.'
      ],
      related: ['pom-explained', 'running-the-app', 'Testing']
    }
  ]);
})();
