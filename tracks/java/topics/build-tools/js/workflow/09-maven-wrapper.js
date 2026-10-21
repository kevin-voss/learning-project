// Build tools, lesson 9: the Maven wrapper mvnw, so every computer uses the same Maven.
(function () {
  Java.addCoreLessons('build-tools', [
    {
      id: 'maven-wrapper',
      title: 'The Maven Wrapper',
      category: 'habits',
      icon: 'w',
      tagline: './mvnw brings its own Maven',
      glossary: Java.buildToolsTerms,
      realWorld: 'A board game that comes with its own dice in the box. You do not need dice at home, and everyone plays with exactly the same dice.',
      kid: [
        'Your friend has an old robot, you have a new one. They build the castle a tiny bit differently, and sometimes the castle falls over at your friend’s house.',
        'So you put a note in the castle box: "Use robot model 3.9.11. If you do not have it, here is how to get it." Now everyone builds with the same robot.',
        'That note is the **Maven wrapper**. Instead of `mvn` you type `./mvnw`, and it uses exactly the Maven the project asks for, downloading it the first time.'
      ],
      definition: 'The **Maven wrapper** is a small script, `mvnw` (and `mvnw.cmd` for Windows), plus the file `.mvn/wrapper/maven-wrapper.properties`, that you commit with the project. `./mvnw <phase>` works like `mvn <phase>`, but it downloads and uses the exact Maven version named in the properties file.',
      explain: [
        'Different Maven versions can build the same project a little differently: other default plugin versions, other warnings, sometimes other results. Ubuntu’s `apt` gives you 3.8.7, Homebrew gives 3.9.x. The wrapper removes that difference.',
        'You create the wrapper once with `mvn wrapper:wrapper`. It writes three files: the Unix script `mvnw`, the Windows script `mvnw.cmd`, and `.mvn/wrapper/maven-wrapper.properties`, which holds `distributionUrl`: the download address of one exact Maven version.',
        'When anyone runs `./mvnw`, the script looks in `~/.m2/wrapper/dists/` for that version. If it is missing, it downloads the Maven zip (about 9 MB) from Maven Central and unpacks it there. Then it starts that Maven with your arguments.',
        'With a wrapper, a new teammate (or a build server) only needs Java. No Maven install, no version questions. That is why many projects, including every Spring Boot starter project, ship `mvnw`.',
        'On Linux and macOS you run `./mvnw` (the `./` means "the file in this folder"). On Windows you run `mvnw.cmd` (or `mvnw` without the ending).'
      ],
      why: 'The same project builds with the same Maven on every computer, and nobody has to install Maven first.',
      whenUse: 'Always use `./mvnw` when a project has it. Add a wrapper to your own projects before you share them.',
      syntax: '`mvn wrapper:wrapper` (create, once) · `./mvnw <phase>` (use, every time) · `mvn wrapper:wrapper -Dmaven=3.9.11` (pick a version)',
      fileName: 'wrapper.sh',
      codeLanguage: 'bash',
      code: `cd ~/java-practice/hello

# once: create the wrapper files
mvn wrapper:wrapper

# from now on: ./mvnw instead of mvn
./mvnw -v
./mvnw package`,
      output: `[INFO] --- wrapper:3.3.4:wrapper (default-cli) @ hello ---
[INFO] Unpacked only-script type wrapper distribution org.apache.maven.wrapper:maven-wrapper-distribution:zip:only-script:3.3.4
[INFO] Configuring .mvn/wrapper/maven-wrapper.properties to use Maven 3.9.11 and download from https://repo.maven.apache.org/maven2
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
Apache Maven 3.9.11 (3e54c93a704957b63ee3494413a2b544fd3d825b)
Maven home: /home/you/.m2/wrapper/dists/apache-maven-3.9.11/a2d47e15
Java version: 21.0.5, vendor: Ubuntu, runtime: /usr/lib/jvm/java-21-openjdk-amd64
Default locale: en_US, platform encoding: UTF-8
OS name: "linux", version: "6.8.0-48-generic", arch: "amd64", family: "unix"
[INFO] Scanning for projects...
...
[INFO] BUILD SUCCESS`,
      codeExplanation: [
        { label: 'Line 4', code: 'mvn wrapper:wrapper', text: 'Runs the goal `wrapper` of the wrapper plugin. You need a normal `mvn` once for this; after that, the project brings its own.' },
        { label: 'Output', code: 'Unpacked only-script type wrapper distribution', text: 'The "only-script" kind of wrapper is pure shell script: no extra jar in the project. It downloads Maven with `curl`, `wget` or Java itself.' },
        { label: 'Output', code: 'to use Maven 3.9.11', text: 'The wrapper pins the Maven version you ran it with. Use `-Dmaven=3.9.11` to choose another one.' },
        { label: 'Line 7', code: './mvnw -v', text: 'The same as `mvn -v`, but through the wrapper. `./` is needed on Linux and macOS, because the current folder is not on the PATH.' },
        { label: 'Output', code: 'Maven home: /home/you/.m2/wrapper/dists/apache-maven-3.9.11/a2d47e15', text: 'The proof: this Maven comes from the wrapper’s download folder, not from `/usr/share/maven`. The short code at the end is a hash of the download URL.' },
        { label: 'Line 8', code: './mvnw package', text: 'Every phase and goal works the same: `./mvnw test`, `./mvnw clean package`, `./mvnw dependency:tree`.' }
      ],
      sections: [
        {
          title: 'The files it writes',
          text: [
            'Three files appear next to `pom.xml`. All three belong in Git. The properties file is short; the important line is `distributionUrl`.'
          ],
          codeLanguage: 'bash',
          fileName: 'files.sh',
          code: `ls -a
cat .mvn/wrapper/maven-wrapper.properties`,
          output: `.  ..  .mvn  mvnw  mvnw.cmd  pom.xml  src  target
wrapperVersion=3.3.4
distributionType=only-script
distributionUrl=https://repo.maven.apache.org/maven2/org/apache/maven/apache-maven/3.9.11/apache-maven-3.9.11-bin.zip`,
          table: {
            head: ['File', 'For', 'Commit?'],
            rows: [
              ['`mvnw`', 'Linux and macOS (a shell script)', 'Yes, with its "executable" flag'],
              ['`mvnw.cmd`', 'Windows', 'Yes'],
              ['`.mvn/wrapper/maven-wrapper.properties`', 'Which Maven version to use', 'Yes'],
              ['`~/.m2/wrapper/dists/…`', 'The downloaded Maven itself', 'No, it is on each computer, outside the project']
            ]
          }
        },
        {
          title: 'What ./mvnw does',
          text: [
            'The script is a careful version of "if Maven is missing, get it, then run it".'
          ],
          mermaid: `flowchart TD
  A["./mvnw package"] --> B["read distributionUrl from .mvn/wrapper/maven-wrapper.properties"]
  B --> C{"that Maven in ~/.m2/wrapper/dists?"}
  C -->|yes| E["start it: mvn package"]
  C -->|no| D["download the zip from Maven Central and unpack it"]
  D --> E`,
          diagramNote: 'The download happens once per Maven version and computer. All projects that ask for 3.9.11 share the same unpacked copy.'
        },
        {
          title: 'The first run, seen up close',
          text: [
            'On the first run `./mvnw` downloads quietly, so the first build takes a few seconds longer. To watch it, set `MVNW_VERBOSE=true`. The output below is shortened after the first unzip lines.'
          ],
          codeLanguage: 'bash',
          fileName: 'first-run.sh',
          code: `MVNW_VERBOSE=true ./mvnw -v`,
          output: `Couldn't find MAVEN_HOME, downloading and installing it ...
Downloading from: https://repo.maven.apache.org/maven2/org/apache/maven/apache-maven/3.9.11/apache-maven-3.9.11-bin.zip
Downloading to: /tmp/tmp.y8dZUuVyEV/apache-maven-3.9.11-bin.zip
Found curl ... using curl
Archive:  /tmp/tmp.y8dZUuVyEV/apache-maven-3.9.11-bin.zip
   creating: /tmp/tmp.y8dZUuVyEV/apache-maven-3.9.11
   creating: /tmp/tmp.y8dZUuVyEV/apache-maven-3.9.11/lib
...
Apache Maven 3.9.11 (3e54c93a704957b63ee3494413a2b544fd3d825b)`
        },
        {
          title: 'Permission denied, and other first-day problems',
          text: [
            'Most wrapper problems are about the script itself, not about Maven.'
          ],
          table: {
            head: ['You see', 'Why', 'Fix'],
            rows: [
              ['`bash: ./mvnw: Permission denied`', 'The file lost its "executable" flag (common after a zip download or a Windows checkout).', '`chmod +x mvnw`, and commit it with the flag: `git update-index --chmod=+x mvnw`.'],
              ['`mvnw: command not found`', 'You typed `mvnw` without `./`.', 'Type `./mvnw`.'],
              ['`JAVA_HOME … does not exist`', 'The wrapper needs Java like Maven does.', 'Fix `JAVA_HOME` as in "Install Maven".'],
              ['Download fails', 'No internet, or a company proxy.', 'Build once online, or ask for the proxy settings in `~/.m2/settings.xml`.']
            ]
          },
          tip: 'Change the Maven version of a project by running `./mvnw wrapper:wrapper -Dmaven=3.9.11` (or editing the version in `distributionUrl`) and committing the new properties file.'
        }
      ],
      technical: [
        'The "only-script" wrapper (the default since wrapper 3.3) computes a hash of `distributionUrl`, looks for `$MAVEN_USER_HOME/wrapper/dists/<name>/<hash>` (`MAVEN_USER_HOME` defaults to `~/.m2`), and if it is missing downloads the zip to a temporary folder, unpacks it and moves it into place. Then it runs `exec` on that Maven’s `bin/mvn` with all your arguments.',
        'An optional line `distributionSha256Sum=…` in the properties file makes the script check the zip against a known fingerprint. That protects you from a broken or changed download.',
        'Gradle has the same idea and had it first: `gradlew`, `gradlew.bat` and `gradle/wrapper/gradle-wrapper.properties`. In Gradle projects the wrapper is the normal way to build; almost nobody uses a system `gradle` command.'
      ],
      tryIt: {
        steps: [
          'In your `hello` project, run `mvn wrapper:wrapper`.',
          'Run `ls -a` and `cat .mvn/wrapper/maven-wrapper.properties`.',
          'Run `./mvnw -v` and compare the `Maven home:` line with the one from `mvn -v`.',
          'Run `./mvnw clean package`.',
          'Run `ls ~/.m2/wrapper/dists/`.'
        ],
        see: 'Two different `Maven home` lines (one in `~/.m2/wrapper/dists/`), `BUILD SUCCESS` from the wrapper, and a folder `apache-maven-3.9.11` in `~/.m2/wrapper/dists/`.'
      },
      check: [
        { q: 'Which wrapper files do you commit to Git?', a: '`mvnw`, `mvnw.cmd` and `.mvn/wrapper/maven-wrapper.properties`. Not the downloaded Maven in `~/.m2/wrapper/`.' },
        { q: 'A project has `mvnw`, and you have Maven 3.8.7 installed. Which Maven runs with `./mvnw package`?', a: 'The version in `distributionUrl`, for example 3.9.11. Your installed 3.8.7 is not used.' },
        { q: '`./mvnw` says `Permission denied`. What do you do?', a: 'Make it executable: `chmod +x mvnw`. To fix it for everyone, commit the flag with `git update-index --chmod=+x mvnw`.' }
      ],
      keyPoints: [
        '`./mvnw` = `mvn`, but with the project’s exact Maven version.',
        'Create it once with `mvn wrapper:wrapper`; commit all three files.',
        'The first run downloads Maven into `~/.m2/wrapper/dists/`; later runs reuse it.',
        'With a wrapper, a computer only needs Java.',
        'If a project has `mvnw`, use it instead of `mvn`.'
      ],
      commonMistakes: [
        'Typing `mvn package` in a project that has `mvnw`. It may work, but with a different Maven. Type `./mvnw package`.',
        'Typing `mvnw package` without `./` on Linux or macOS. The shell does not look in the current folder; use `./mvnw`.',
        'Adding `mvnw` or `.mvn/` to `.gitignore`. Then nobody else gets the wrapper; commit them.',
        'Committing `mvnw` without the executable flag, so everyone gets `Permission denied`. Fix it with `git update-index --chmod=+x mvnw`.'
      ],
      related: ['install-maven', 'maven-or-gradle', 'maven-lifecycle']
    }
  ]);
})();
