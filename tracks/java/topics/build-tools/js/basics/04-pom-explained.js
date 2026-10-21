// Build tools, lesson 4: pom.xml, element by element.
(function () {
  Java.addCoreLessons('build-tools', [
    {
      id: 'pom-explained',
      title: 'pom.xml Line by Line',
      category: 'concept',
      icon: '</>',
      tagline: 'The project card, element by element',
      glossary: Java.buildToolsTerms,
      realWorld: 'The label on a jam jar: who made it, what it is, which batch, and what is inside. With that label anyone can find the same jam again. `pom.xml` is the label and the ingredient list of your project.',
      kid: [
        'Your project gets an ID card. On the card: your family name (`com.example`), your first name (`hello`) and how old you are (`1.0`).',
        'Below that is a shopping list: "I need JUnit to check my work." Maven reads the list and goes shopping for you.',
        'At the bottom it says which helpers to use: one helper compiles, one runs the tests, one packs the box. Maven calls the helpers **plugins**.'
      ],
      definition: '`pom.xml` (POM means **Project Object Model**) describes your project in XML: its name (**coordinates**), settings (**properties**), the libraries it needs (**dependencies**) and extra build helpers (**plugins**).',
      explain: [
        '**XML** is a text format made of **elements**: a start tag `<name>`, some content, and an end tag `</name>`. Elements can hold other elements, like boxes in boxes. The whole POM is one big `<project>` element.',
        'The first three elements inside are the **coordinates**: `groupId` (who makes it, a reversed domain like `com.example`), `artifactId` (the project name, `hello`) and `version` (`1.0-SNAPSHOT`). Together they name your project exactly, like `com.example:hello:1.0-SNAPSHOT`. Every library on the internet has such coordinates too.',
        '`<properties>` holds settings. `maven.compiler.release` = 21 tells the compiler to build for Java 21. `project.build.sourceEncoding` = UTF-8 says how your `.java` files are stored, so letters like é or ü survive.',
        '`<dependencies>` is the shopping list. Each `<dependency>` names a library by its coordinates. Its **scope** says when it is needed: `test` means only for compiling and running tests, never in the finished program.',
        '`<build><plugins>` lists **plugins**: the tools that do the work. Maven already uses the compiler, test and jar plugins without being asked. You list a plugin here to pick its version or change its settings.'
      ],
      why: 'Everything about the project lives in one file in Git. Anyone who clones the project gets the same Java version, the same libraries and the same build.',
      whenUse: 'Every time you change the Java version, add or remove a library, or change how the build works.',
      syntax: '`<groupId>…</groupId> <artifactId>…</artifactId> <version>…</version>` · `<dependency>` with coordinates and an optional `<scope>` · `<plugin>` with coordinates and `<configuration>`',
      fileName: 'pom.xml',
      codeLanguage: 'xml',
      code: `<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>

  <!-- 1. Coordinates: who, what, which version -->
  <groupId>com.example</groupId>
  <artifactId>hello</artifactId>
  <version>1.0-SNAPSHOT</version>
  <packaging>jar</packaging>

  <!-- 2. Settings -->
  <properties>
    <maven.compiler.release>21</maven.compiler.release>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
  </properties>

  <!-- 3. Libraries this project needs -->
  <dependencies>
    <dependency>
      <groupId>org.junit.jupiter</groupId>
      <artifactId>junit-jupiter</artifactId>
      <version>5.11.4</version>
      <scope>test</scope>
    </dependency>
  </dependencies>

  <!-- 4. Build helpers -->
  <build>
    <plugins>
      <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-surefire-plugin</artifactId>
        <version>3.5.2</version>
      </plugin>
    </plugins>
  </build>
</project>`,
      codeSummary: 'A complete, small pom.xml for Java 21 with JUnit for tests. The lifecycle lesson builds exactly this project.',
      codeExplanation: [
        { label: 'Line 1', code: '<?xml version="1.0" encoding="UTF-8"?>', text: 'The XML header: "this is XML, stored as UTF-8". Copy it as it is.' },
        { label: 'Lines 2-4', code: '<project xmlns="http://maven.apache.org/POM/4.0.0" ...>', text: 'The root element. The `xmlns` lines name the POM format, so editors can check your file and suggest elements. Copy them as they are.' },
        { label: 'Line 5', code: '<modelVersion>4.0.0</modelVersion>', text: 'The version of the POM format (not of your project). It is always 4.0.0 in Maven 3.' },
        { label: 'Lines 8-9', code: '<groupId>com.example</groupId>', text: 'groupId: who makes the project, written as a reversed domain (`example.com` becomes `com.example`). artifactId: the project name. Use lower case and dashes, like `shop-api`.' },
        { label: 'Line 10', code: '<version>1.0-SNAPSHOT</version>', text: 'The project version. `-SNAPSHOT` means "in work". When you release, it becomes `1.0`, and that version never changes again.' },
        { label: 'Line 11', code: '<packaging>jar</packaging>', text: 'What the build makes. `jar` is the default, so this line is optional. Web apps sometimes use `war`; a parent project uses `pom`.' },
        { label: 'Line 15', code: '<maven.compiler.release>21</maven.compiler.release>', text: 'Compile for Java 21. This sets the compiler’s `--release 21` option: it checks both the language and the Java library against version 21.' },
        { label: 'Line 16', code: '<project.build.sourceEncoding>UTF-8', text: 'Read source files as UTF-8. Without it Maven warns "platform dependent encoding" and the build may differ between computers.' },
        { label: 'Lines 21-26', code: '<dependency> ... <scope>test</scope>', text: 'One library: JUnit 5, for tests only. Maven downloads it and puts it on the classpath for `src/test/java`, but not for `src/main/java`.' },
        { label: 'Lines 32-36', code: '<artifactId>maven-surefire-plugin</artifactId>', text: 'The plugin that runs tests. Maven would use it anyway; listing it here pins a known version (3.5.2) so the build stays the same next year.' }
      ],
      sections: [
        {
          title: 'The shape of the file',
          text: [
            'Before the details, look at the big boxes. A POM has four parts, and you will touch parts 2 and 3 most often.'
          ],
          mermaid: `flowchart TD
  P["project"] --> C["coordinates: groupId, artifactId, version"]
  P --> PR["properties: Java 21, UTF-8"]
  P --> D["dependencies"]
  P --> B["build"]
  D --> D1["dependency: junit-jupiter, scope test"]
  B --> PL["plugins"]
  PL --> P1["plugin: maven-surefire-plugin 3.5.2"]`,
          diagramNote: 'Each box is an XML element; an arrow means "contains". Order inside `<project>` does not matter to Maven, but this order is the usual one and easy to read.'
        },
        {
          title: 'Coordinates and versions',
          text: [
            'Coordinates are the address of a project. Maven writes them with colons: `groupId:artifactId:version`. Your project is `com.example:hello:1.0-SNAPSHOT`; JUnit is `org.junit.jupiter:junit-jupiter:5.11.4`.',
            'Versions usually have three numbers, **major.minor.patch**: a new major (5 → 6) may break your code, a new minor (5.11 → 5.12) adds features, a new patch (5.11.3 → 5.11.4) only fixes bugs.'
          ],
          table: {
            head: ['Element', 'Example', 'Rule'],
            rows: [
              ['`groupId`', '`com.example`, `org.apache.commons`', 'A reversed domain you own. Often also your package name.'],
              ['`artifactId`', '`hello`, `commons-lang3`', 'Lower case, dashes. Becomes the jar name.'],
              ['`version`', '`1.0-SNAPSHOT`, `3.17.0`', 'A released version never changes. A `-SNAPSHOT` version may.'],
              ['`packaging`', '`jar`', 'Optional, `jar` is the default.']
            ]
          }
        },
        {
          title: 'Properties: Java version and encoding',
          text: [
            'Properties are named values. Maven and its plugins read some names on their own, like `maven.compiler.release`. You can also make your own and use them with `${name}`, for example to write one version number in one place.',
            'Older guides set `maven.compiler.source` and `maven.compiler.target` instead of `release`. That still works, but `release` is better: it also stops you from using Java library methods that do not exist in the target version.'
          ],
          codeLanguage: 'xml',
          fileName: 'pom.xml (part)',
          code: `<properties>
  <maven.compiler.release>21</maven.compiler.release>
  <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
  <!-- your own property -->
  <junit.version>5.11.4</junit.version>
</properties>

<dependencies>
  <dependency>
    <groupId>org.junit.jupiter</groupId>
    <artifactId>junit-jupiter</artifactId>
    <version>\${junit.version}</version>
    <scope>test</scope>
  </dependency>
</dependencies>`,
          tip: 'Use your own version property when several dependencies share one version number. You then change it in one place.'
        },
        {
          title: 'Dependencies and scopes',
          text: [
            'A `<dependency>` is a library your code uses. You write its coordinates, and Maven gets the jar (lesson "Add a Library" shows the download). The **scope** decides on which classpaths the jar lands.'
          ],
          table: {
            head: ['Scope', 'Compile main code', 'Compile and run tests', 'In the finished app', 'Typical example'],
            rows: [
              ['`compile` (default)', 'yes', 'yes', 'yes', 'A library your code calls, like `commons-lang3`'],
              ['`test`', 'no', 'yes', 'no', 'JUnit'],
              ['`provided`', 'yes', 'yes', 'no, the server brings it', 'The servlet API in a web server'],
              ['`runtime`', 'no', 'yes', 'yes', 'A database driver you only load at run time']
            ],
            note: 'If you leave out `<scope>`, it is `compile`. As a beginner you need `compile` and `test`.'
          },
          warn: 'Code in `src/main/java` cannot import a `test` dependency. `import org.junit.jupiter.api.Test;` in `App.java` fails with "package org.junit.jupiter.api does not exist".'
        },
        {
          title: 'Plugins: who does the work',
          text: [
            'Maven runs plugins even if your POM lists none. Each plugin has **goals** (tasks), written `prefix:goal`. You see them in every build output as lines like `--- compiler:3.13.0:compile (default-compile) @ hello ---`: plugin prefix, plugin version, goal, and your project.',
            'You add a `<plugin>` to your POM for two reasons: to **pin its version** (so the build stays the same) or to **configure** it with `<configuration>`. The lesson "Run Your App" configures the jar plugin that way.'
          ],
          table: {
            head: ['Plugin', 'Goal it runs', 'What it does'],
            rows: [
              ['`maven-resources-plugin`', '`resources:resources`', 'Copies `src/main/resources` to `target/classes`'],
              ['`maven-compiler-plugin`', '`compiler:compile`, `compiler:testCompile`', 'Runs the Java compiler on main and test code'],
              ['`maven-surefire-plugin`', '`surefire:test`', 'Runs the tests and writes reports'],
              ['`maven-jar-plugin`', '`jar:jar`', 'Packs `target/classes` into the jar'],
              ['`maven-install-plugin`', '`install:install`', 'Copies the jar into `~/.m2/repository`'],
              ['`maven-clean-plugin`', '`clean:clean`', 'Deletes `target/`']
            ]
          }
        },
        {
          title: 'See the full POM Maven really uses',
          text: [
            'Your POM is short because it **inherits** from the **super POM**, a built-in POM with all the defaults: the folders, Maven Central, the plugin versions. The command `mvn help:effective-pom` prints the merged result. It is long; skim it once to see where the defaults come from.'
          ],
          codeLanguage: 'bash',
          fileName: 'effective.sh',
          code: `mvn -q help:effective-pom -Doutput=effective-pom.xml
grep -E "<url>https://repo|<sourceDirectory>|<testSourceDirectory>|<directory>.*target</directory>" effective-pom.xml`,
          output: `      <url>https://repo.maven.apache.org/maven2</url>
      <url>https://repo.maven.apache.org/maven2</url>
    <sourceDirectory>/home/you/hello/src/main/java</sourceDirectory>
    <testSourceDirectory>/home/you/hello/src/test/java</testSourceDirectory>
    <directory>/home/you/hello/target</directory>`,
          tip: 'None of these lines are in your `pom.xml`. The two URLs are Maven Central (once for libraries, once for plugins); the folders are the standard layout. Delete `effective-pom.xml` afterwards.'
        }
      ],
      technical: [
        'Maven reads `pom.xml` into a **model**: one Java object per element. It merges your model with the super POM (and any `<parent>` POM), fills in `${…}` properties, and the result is the **effective POM**. Every build decision comes from that merged model.',
        'Properties such as `maven.compiler.release` work because plugins read them as default values for their parameters. The compiler plugin’s parameter `release` has the default `${maven.compiler.release}`, so setting the property configures the plugin without a `<plugin>` block.',
        'When a plugin has no version in your POM, Maven 3 takes the version listed in its own defaults. That can change when you update Maven. This is why the archetype and good projects pin plugin versions, and why Maven prints a warning when a plugin version is missing from a `<plugin>` block.'
      ],
      tryIt: {
        steps: [
          'Open the `pom.xml` of your `hello` project.',
          'Find the coordinates and say them as one line: `groupId:artifactId:version`.',
          'Check that `<maven.compiler.release>` is 21.',
          'Change `<version>` to `1.1-SNAPSHOT` and run `mvn package`.',
          'Run `ls target/` and look at the jar name. Change the version back.'
        ],
        see: '`target/hello-1.1-SNAPSHOT.jar`. The jar name is always `artifactId-version.jar`.'
      },
      check: [
        { q: 'Write the coordinates of this project in one line.', a: '`com.example:hello:1.0-SNAPSHOT` (groupId : artifactId : version).' },
        { q: 'JUnit has `<scope>test</scope>`. Can `App.java` in `src/main/java` use it?', a: 'No. A test dependency is only on the classpath of `src/test/java`. Compiling `App.java` with a JUnit import fails.' },
        { q: 'Why is `maven.compiler.release` better than `source` and `target`?', a: '`release` also checks the Java library: calling a method that does not exist in Java 21 fails at compile time, not later when the program runs.' }
      ],
      keyPoints: [
        'Coordinates = `groupId:artifactId:version`; they name your project and every library.',
        '`-SNAPSHOT` means "in work"; released versions never change.',
        '`<maven.compiler.release>21</maven.compiler.release>` sets the Java version.',
        'A dependency without `<scope>` is `compile`; JUnit gets `test`.',
        'Plugins do the work. List one to pin its version or to configure it.',
        '`mvn help:effective-pom` shows the full POM with all defaults.'
      ],
      commonMistakes: [
        'A missing end tag, like `<version>1.0-SNAPSHOT</versoin>`. Maven stops with `Non-parseable POM … end tag name </versoin> must be the same as start tag <version>` and the line number.',
        'Writing `<maven.compiler.release>` outside `<properties>`. It must sit inside the `<properties>` element.',
        'Leaving out the version of a dependency: `<artifactId>junit-jupiter</artifactId>` alone. Maven stops with `\'dependencies.dependency.version\' for org.junit.jupiter:junit-jupiter:jar is missing.` and the line number. Add `<version>`.',
        'Forgetting `<scope>test</scope>` on JUnit. It works, but JUnit then lands in your finished app. Mark test libraries as `test`.'
      ],
      related: ['maven-project', 'maven-lifecycle', 'dependencies']
    }
  ]);
})();
