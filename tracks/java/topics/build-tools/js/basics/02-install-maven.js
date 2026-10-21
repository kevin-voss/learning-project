// Build tools, lesson 2: install Maven and check that it finds Java.
(function () {
  Java.addCoreLessons('build-tools', [
    {
      id: 'install-maven',
      title: 'Install Maven',
      category: 'practice',
      icon: '⤓',
      tagline: 'One package, then mvn -v',
      glossary: Java.buildToolsTerms,
      realWorld: 'A new kitchen robot. You plug it in, and the first thing you do is press the test button. If the light turns green, it found the power. `mvn -v` is the test button: it shows that Maven runs and that it found Java.',
      kid: [
        'Before the robot can build your castle, it has to live in your house. So you bring it home and plug it in.',
        'The robot needs batteries to work. For Maven the batteries are Java. No Java, no robot.',
        'Then you ask the robot "who are you?". It answers with its name, its version and which batteries it found. Now you know it is ready.'
      ],
      definition: 'You install Maven once per computer. Then the command `mvn` works in every terminal, and `mvn -v` prints the Maven version and the Java it uses.',
      explain: [
        'Maven is a Java program, so it needs a **JDK** (the Java Development Kit you installed in [Getting Started](../getting-started/index.html)). The site uses Java 21.',
        'On Ubuntu the package manager **apt** installs Maven and puts the `mvn` command into `/usr/bin`. That folder is on your **PATH**: the list of folders the terminal searches when you type a command name.',
        'Maven finds Java in one of two ways. If the environment variable **JAVA_HOME** is set (a variable the terminal hands to every program), Maven uses the JDK in that folder. If not, it uses the `java` command it finds on the PATH.',
        'The first real build creates a hidden folder `~/.m2` in your home folder (`~` means your home folder). Maven keeps every downloaded library and plugin there. You never edit it by hand.',
        'You do not need an IDE for Maven. VS Code, IntelliJ IDEA and Eclipse all read `pom.xml` on their own, but every command in this topic runs in a plain terminal.'
      ],
      why: 'With `mvn` on the PATH, every Maven project builds with the same commands, whoever wrote it.',
      whenUse: 'Once per computer, before your first Maven project. Later, many projects bring their own Maven through the wrapper `mvnw` (lesson "The Maven Wrapper").',
      syntax: '`sudo apt install maven` (Ubuntu) · `brew install maven` (macOS) · then `mvn -v`',
      fileName: 'install.sh',
      codeLanguage: 'bash',
      code: `# 1. Java must be there first
java -version

# 2. Install Maven (Ubuntu / Debian)
sudo apt update
sudo apt install maven

# 3. The test button: which Maven, which Java?
mvn -v`,
      output: `Apache Maven 3.8.7
Maven home: /usr/share/maven
Java version: 21.0.5, vendor: Ubuntu, runtime: /usr/lib/jvm/java-21-openjdk-amd64
Default locale: en_US, platform encoding: UTF-8
OS name: "linux", version: "6.8.0-48-generic", arch: "amd64", family: "unix"`,
      codeExplanation: [
        { label: 'Line 2', code: 'java -version', text: 'Check Java first. Maven cannot run without a JDK. You should see a version 21 line.' },
        { label: 'Line 5', code: 'sudo apt update', text: '`apt` refreshes its list of packages. `sudo` runs the command as administrator, so it asks for your password.' },
        { label: 'Line 6', code: 'sudo apt install maven', text: 'Installs Maven into `/usr/share/maven` and the `mvn` command into `/usr/bin`.' },
        { label: 'Line 9', code: 'mvn -v', text: '`-v` (or `--version`) prints facts about Maven and stops. It builds nothing, so it works in any folder.' },
        { label: 'Output 1', code: 'Apache Maven 3.8.7', text: 'The Maven version. Ubuntu 24.04 ships 3.8.7; Homebrew or SDKMAN give a newer 3.9.x. Both work for this topic.' },
        { label: 'Output 2', code: 'Maven home: /usr/share/maven', text: 'Where Maven’s own files live: `bin/mvn`, the `lib/` folder with Maven’s jars, and `conf/settings.xml`.' },
        { label: 'Output 3', code: 'Java version: 21.0.5 ... runtime: ...', text: 'The JDK Maven found. If this says 17 but you want 21, set `JAVA_HOME` (see step 3 below).' },
        { label: 'Output 5', code: 'OS name: "linux"', text: 'Your operating system. Your numbers and paths differ; what matters is that the command answers.' }
      ],
      sections: [
        {
          title: 'Install on your system',
          text: [
            'Pick the line for your computer. All of them give you the same `mvn` command.'
          ],
          table: {
            head: ['System', 'Command', 'Note'],
            rows: [
              ['Ubuntu / Debian', '`sudo apt install maven`', 'Easiest. Maven 3.8.x on Ubuntu 24.04.'],
              ['macOS', '`brew install maven`', 'Needs [Homebrew](https://brew.sh). Gives the newest 3.9.x.'],
              ['Linux or macOS, any version', '`sdk install maven`', 'Needs [SDKMAN](https://sdkman.io). Lets you switch versions.'],
              ['Windows', 'Download the "Binary zip archive" from [maven.apache.org](https://maven.apache.org/download.cgi)', 'Unzip it, add its `bin` folder to the PATH in the system settings, open a new terminal.']
            ],
            note: 'Open a **new** terminal after installing, so it reads the new PATH.'
          }
        },
        {
          title: 'What happens when you type mvn',
          text: [
            'Typing `mvn` starts a small chain. The terminal finds the script, the script finds Java, and Java runs Maven.'
          ],
          mermaid: `flowchart LR
  A["you type mvn -v"] --> B["terminal searches the PATH"]
  B --> C["finds /usr/bin/mvn (a script)"]
  C --> D{"JAVA_HOME set?"}
  D -->|yes| E["uses JAVA_HOME/bin/java"]
  D -->|no| F["uses java from the PATH"]
  E --> G["JVM starts Maven"]
  F --> G`,
          diagramNote: 'Two things can go wrong: the terminal does not find `mvn` (PATH), or Maven does not find a JDK (JAVA_HOME). The next step shows both errors.'
        },
        {
          title: 'When it does not work',
          text: [
            'Read the first error line. It tells you which link of the chain broke.'
          ],
          table: {
            head: ['You see', 'Why', 'Fix'],
            rows: [
              ['`mvn: command not found`', 'Maven is not installed, or its `bin` folder is not on the PATH.', 'Install it, or add the `bin` folder to the PATH. Open a new terminal.'],
              ['`The JAVA_HOME environment variable is not defined correctly`', '`JAVA_HOME` points to a folder that is not a JDK.', 'Point it to the JDK folder, the one that contains `bin/java`.'],
              ['`Java version: 17…` but you want 21', 'Maven found an older JDK first.', '`export JAVA_HOME=/usr/lib/jvm/java-21-openjdk-amd64` (put it in `~/.bashrc` to keep it).'],
              ['`release version 21 not supported` in a build', 'The JDK Maven runs on is older than 21.', 'Same fix: make Maven use JDK 21 or newer.']
            ]
          },
          codeLanguage: 'bash',
          fileName: 'java-home.sh',
          code: `# Where is my JDK 21? (Ubuntu)
ls /usr/lib/jvm/

# Use it for Maven in this terminal
export JAVA_HOME=/usr/lib/jvm/java-21-openjdk-amd64
mvn -v`,
          output: `java-1.21.0-openjdk-amd64  java-21-openjdk-amd64
Apache Maven 3.8.7
Maven home: /usr/share/maven
Java version: 21.0.5, vendor: Ubuntu, runtime: /usr/lib/jvm/java-21-openjdk-amd64
Default locale: en_US, platform encoding: UTF-8
OS name: "linux", version: "6.8.0-48-generic", arch: "amd64", family: "unix"`
        },
        {
          title: 'The ~/.m2 folder',
          text: [
            'Maven makes a hidden folder `~/.m2` on the first build that needs a download. Inside is `repository/`, Maven’s **local repository**: a cache of every jar and plugin it ever downloaded, sorted by name.',
            'You can look inside, but do not edit it. If something in it is broken, you may delete the whole `~/.m2/repository` folder; Maven downloads again what it needs.'
          ],
          codeLanguage: 'bash',
          fileName: 'm2.sh',
          code: `ls ~/.m2/repository/org/apache/commons/commons-lang3/3.17.0/`,
          output: `_remote.repositories
commons-lang3-3.17.0.jar
commons-lang3-3.17.0.jar.sha1
commons-lang3-3.17.0.pom
commons-lang3-3.17.0.pom.sha1`,
          tip: 'The `.sha1` files are checksums: a fingerprint Maven uses to check that the download is not broken.'
        },
        {
          title: 'Java 24 or newer: four WARNING lines',
          text: [
            'If you run Maven 3.9 on Java 24 or newer, each command starts with four lines like `WARNING: A terminally deprecated method in sun.misc.Unsafe has been called`. They come from a library inside Maven itself, not from your code.',
            'You can ignore them. On Java 21, the version this site uses, they do not appear, so the outputs in this topic leave them out.'
          ]
        }
      ],
      technical: [
        '`/usr/bin/mvn` is a link to a shell script. The script works out `MAVEN_HOME`, finds `java` (through `JAVA_HOME` or the PATH) and starts it with Maven’s launcher class and the jars in `$MAVEN_HOME/lib` on the classpath.',
        'Maven reads two optional settings files: `$MAVEN_HOME/conf/settings.xml` for the whole computer and `~/.m2/settings.xml` for you. Companies use them for a private library server or a proxy. For this course you need neither.',
        'The environment variable `MAVEN_OPTS` passes options to the JVM that runs Maven, for example `export MAVEN_OPTS="-Xmx1g"` for more memory. It does not change the Java version your code is compiled for; that lives in `pom.xml`.'
      ],
      tryIt: {
        steps: [
          'Run `java -version` and check that you see version 21.',
          'Install Maven with the line for your system.',
          'Open a new terminal and run `mvn -v`.',
          'Read the line `Java version:` and check that it is 21 or newer.',
          'Run `ls -a ~` and look for `.m2` (it may not exist yet; it appears after your first build).'
        ],
        see: 'Four or five lines that start with `Apache Maven 3.` and show a `Java version: 21…` line.'
      },
      check: [
        { q: 'Why does Maven need a JDK?', a: 'Maven is a Java program, and it compiles your code with the Java compiler. Both need a JDK.' },
        { q: '`mvn -v` shows `Java version: 17`, but your project needs 21. What do you change?', a: 'Set `JAVA_HOME` to the JDK 21 folder (for example `/usr/lib/jvm/java-21-openjdk-amd64`) and open a new terminal or run `export` again.' },
        { q: 'What is in `~/.m2/repository`?', a: 'Maven’s local repository: a cache of every library and plugin jar Maven downloaded, so it downloads each one only once.' }
      ],
      keyPoints: [
        'Install Maven once per computer; `mvn -v` is the test.',
        'Maven needs a JDK. It finds it through `JAVA_HOME` or the PATH.',
        '`mvn: command not found` means a PATH problem, not a project problem.',
        '`~/.m2/repository` is Maven’s download cache. Look, do not edit.',
        'Open a new terminal after you install or change the PATH.'
      ],
      commonMistakes: [
        'Installing only a JRE (no compiler) and then wondering why builds fail. Install a full JDK, for example `sudo apt install openjdk-21-jdk`.',
        'Setting `JAVA_HOME=/usr/lib/jvm/java-21-openjdk-amd64/bin`. It must point to the JDK folder itself, without `/bin`.',
        'Testing `mvn -v` in the old terminal right after installing. Open a new one so it sees the new PATH.',
        'Editing files inside `~/.m2/repository` by hand. Delete the broken folder instead; Maven downloads it again.'
      ],
      related: ['why-build-tool', 'maven-project', 'maven-wrapper']
    }
  ]);
})();
