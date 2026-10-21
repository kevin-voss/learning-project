// Build tools, lesson 8 (deeper): libraries of libraries, mvn dependency:tree, conflicts and exclusions.
(function () {
  Java.addCoreLessons('build-tools', [
    {
      id: 'transitive-dependencies',
      title: 'Libraries of Libraries',
      category: 'deeper',
      icon: '⑂',
      tagline: 'Transitive dependencies and mvn dependency:tree',
      glossary: Java.buildToolsTerms,
      realWorld: 'You order a toy train set. In the box are the train, but also the tracks and the batteries it needs, even though you only wrote "train" on the order. The shop knew what the train needs.',
      kid: [
        'Your robot needs wheels. But the wheels need screws, and the screws need a little tool to turn them.',
        'You only wrote "wheels" on your list. The robot reads the note on the wheel box ("needs screws") and buys the screws too, and then the tool.',
        'If two boxes both ask for screws, but in different sizes, the robot takes only one size: the one asked for closest to you. Sometimes that is the wrong size, so you can always check the whole family tree of your boxes with one command.'
      ],
      definition: 'A **transitive dependency** is a library that one of your libraries needs. Maven reads each library’s `.pom`, downloads its dependencies too, and puts them on your classpath. `mvn dependency:tree` shows the whole tree.',
      explain: [
        'Take **Jackson**, the most used JSON library for Java (JSON is a text format for data, like `{"name":"Rex"}`). You add one dependency: `com.fasterxml.jackson.core:jackson-databind`. But `jackson-databind` itself needs `jackson-core` (reads and writes the JSON text) and `jackson-annotations`.',
        'Maven finds this out from `jackson-databind-2.18.2.pom`, which lists those two as its dependencies. It downloads them as well. You get three jars for one `<dependency>` block. Those two extra jars are **transitive** ("passed along").',
        'The tree can get deep: a library needs a library that needs a library. `mvn dependency:tree` prints it with `+-` and `\\-` branches, and each line shows `groupId:artifactId:type:version:scope`.',
        'When two paths bring **different versions** of the same library, Maven keeps only one: the one **nearest** to your project in the tree ("nearest wins"). A version you declare yourself is always nearest. This is called **dependency mediation**.',
        'You can remove a transitive dependency with `<exclusions>`. Do it only when you know the code is not needed at run time, because the compiler cannot check it for you.'
      ],
      why: 'You get a whole working set of libraries from one line, and you can still see and control exactly what ends up on your classpath.',
      whenUse: 'Run `mvn dependency:tree` when a class is missing, when two versions clash (`NoSuchMethodError`, `ClassNotFoundException`), or to see what a new library brings in.',
      syntax: '`mvn dependency:tree` · `mvn dependency:tree -Dverbose` · `mvn dependency:tree -Dincludes=<groupId>` · `<exclusions><exclusion><groupId>…</groupId><artifactId>…</artifactId></exclusion></exclusions>`',
      fileName: 'src/main/java/com/example/JsonDemo.java',
      code: `package com.example;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public class JsonDemo {
    public static void main(String[] args) throws Exception {
        Map<String, Object> pet = new LinkedHashMap<>();
        pet.put("name", "Rex");
        pet.put("age", 3);
        pet.put("tricks", List.of("sit", "roll"));

        ObjectMapper mapper = new ObjectMapper();
        String json = mapper.writeValueAsString(pet);
        System.out.println(json);

        Map<?, ?> back = mapper.readValue(json, Map.class);
        System.out.println("Name again: " + back.get("name"));
        System.out.println("Tricks: " + back.get("tricks"));
    }
}`,
      output: `{"name":"Rex","age":3,"tricks":["sit","roll"]}
Name again: Rex
Tricks: [sit, roll]`,
      codeSummary: 'Needs `jackson-databind` in `pom.xml` (step 1). Run it with `mvn compile exec:java -Dexec.mainClass=com.example.JsonDemo`.',
      codeExplanation: [
        { label: 'Line 3', code: 'import com.fasterxml.jackson.databind.ObjectMapper;', text: '`ObjectMapper` is in `jackson-databind`, the one library you declared.' },
        { label: 'Line 10', code: 'throws Exception', text: '`writeValueAsString` and `readValue` can throw checked exceptions (see [Exceptions](../exceptions/index.html)). For a demo, `main` passes them on.' },
        { label: 'Line 11', code: 'new LinkedHashMap<>()', text: 'A map that keeps the order you put things in (see [Collections](../collections/index.html)), so the JSON comes out in the same order every time.' },
        { label: 'Line 17', code: 'mapper.writeValueAsString(pet)', text: 'Turns the map into JSON text. Inside, databind calls `jackson-core` to write the characters: the transitive dependency at work.' },
        { label: 'Line 20', code: 'mapper.readValue(json, Map.class)', text: 'The other way: JSON text back into a `Map`. The list `["sit","roll"]` becomes a Java `List`.' },
        { label: 'Line 22', code: 'back.get("tricks")', text: 'Prints the list with its `toString()`: `[sit, roll]`.' },
        { label: 'Output 1', code: '{"name":"Rex","age":3,"tricks":["sit","roll"]}', text: 'Real JSON: names in quotes, numbers without, lists in `[ ]`.' }
      ],
      sections: [
        {
          title: 'One dependency in, three jars out',
          text: [
            'Add this one block to `<dependencies>`. You do not write `jackson-core` or `jackson-annotations` anywhere.'
          ],
          codeLanguage: 'xml',
          fileName: 'pom.xml (part)',
          code: `<dependency>
  <groupId>com.fasterxml.jackson.core</groupId>
  <artifactId>jackson-databind</artifactId>
  <version>2.18.2</version>
</dependency>`,
          mermaid: `flowchart TD
  H["com.example:hello (your project)"] --> L["commons-lang3 3.17.0"]
  H --> DB["jackson-databind 2.18.2"]
  DB --> AN["jackson-annotations 2.18.2 (transitive)"]
  DB --> CO["jackson-core 2.18.2 (transitive)"]
  H --> JU["junit-jupiter 5.11.4 (test)"]`,
          diagramNote: 'The boxes right under your project are the ones you wrote in `pom.xml`. The boxes one level lower come from the libraries’ own POMs.'
        },
        {
          title: 'mvn dependency:tree',
          text: [
            'The dependency plugin prints the tree. Read each line as `groupId:artifactId:type:version:scope`. `+-` means "a child, more follow", `\\-` means "the last child", `|` connects deeper levels.',
            'Look at JUnit: you declared one artifact, `junit-jupiter`, and it brings seven more, all with scope `test`.'
          ],
          codeLanguage: 'bash',
          fileName: 'tree.sh',
          code: `mvn dependency:tree`,
          output: `[INFO] --- dependency:3.7.0:tree (default-cli) @ hello ---
[INFO] com.example:hello:jar:1.0-SNAPSHOT
[INFO] +- org.apache.commons:commons-lang3:jar:3.17.0:compile
[INFO] +- com.fasterxml.jackson.core:jackson-databind:jar:2.18.2:compile
[INFO] |  +- com.fasterxml.jackson.core:jackson-annotations:jar:2.18.2:compile
[INFO] |  \\- com.fasterxml.jackson.core:jackson-core:jar:2.18.2:compile
[INFO] \\- org.junit.jupiter:junit-jupiter:jar:5.11.4:test
[INFO]    +- org.junit.jupiter:junit-jupiter-api:jar:5.11.4:test
[INFO]    |  +- org.opentest4j:opentest4j:jar:1.3.0:test
[INFO]    |  +- org.junit.platform:junit-platform-commons:jar:1.11.4:test
[INFO]    |  \\- org.apiguardian:apiguardian-api:jar:1.1.2:test
[INFO]    +- org.junit.jupiter:junit-jupiter-params:jar:5.11.4:test
[INFO]    \\- org.junit.jupiter:junit-jupiter-engine:jar:5.11.4:test
[INFO]       \\- org.junit.platform:junit-platform-engine:jar:1.11.4:test
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS`,
          tip: 'Long tree? Filter it: `mvn dependency:tree -Dincludes=com.fasterxml.jackson.core` shows only the Jackson branches.'
        },
        {
          title: 'Scopes are passed along too',
          text: [
            'A transitive dependency gets a scope from two things: the scope you gave the direct dependency, and the scope the library gave it. The short rules:'
          ],
          table: {
            head: ['You declare it as', 'Its `compile` dependencies become', 'Its `test` and `provided` dependencies'],
            rows: [
              ['`compile`', '`compile`', 'not passed on'],
              ['`test`', '`test`', 'not passed on'],
              ['`runtime`', '`runtime`', 'not passed on'],
              ['`provided`', '`provided`', 'not passed on']
            ],
            note: 'That is why every JUnit jar in the tree says `test`: you declared `junit-jupiter` as `test`. And a library’s own test tools (its JUnit) never reach you.'
          }
        },
        {
          title: 'Two versions of one library: nearest wins',
          text: [
            'Say you also declare `jackson-core` yourself, but an older version, `2.17.0`. Now two paths want `jackson-core`: your direct line (depth 1) and the one through `jackson-databind` (depth 2). Maven picks the **nearest**: 2.17.0.',
            '`-Dverbose` shows the losers in brackets with the reason.'
          ],
          codeLanguage: 'bash',
          fileName: 'conflict.sh',
          code: `mvn dependency:tree -Dverbose -Dincludes=com.fasterxml.jackson.core`,
          output: `[INFO] --- dependency:3.7.0:tree (default-cli) @ hello ---
[INFO] com.example:hello:jar:1.0-SNAPSHOT
[INFO] +- com.fasterxml.jackson.core:jackson-databind:jar:2.18.2:compile
[INFO] |  +- com.fasterxml.jackson.core:jackson-annotations:jar:2.18.2:compile
[INFO] |  \\- (com.fasterxml.jackson.core:jackson-core:jar:2.18.2:compile - omitted for conflict with 2.17.0)
[INFO] \\- com.fasterxml.jackson.core:jackson-core:jar:2.17.0:compile
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS`,
          mermaid: `flowchart TD
  H["your project"] --> DB["jackson-databind 2.18.2"]
  H --> C17["jackson-core 2.17.0 (depth 1): WINS"]
  DB --> C18["jackson-core 2.18.2 (depth 2): omitted"]`,
          warn: 'Here databind 2.18 now runs with the older core 2.17. If databind calls a method that only exists in 2.18, the program crashes with `NoSuchMethodError` at run time, not at compile time. Keep versions of one library family equal, or do not declare the transitive one yourself.'
        },
        {
          title: 'Exclusions: remove a branch, carefully',
          text: [
            'An `<exclusion>` inside a dependency cuts one transitive dependency off. Use it when a library brings something you really do not want, for example a second logging library. Here is what happens if you cut off something that is needed.'
          ],
          codeLanguage: 'xml',
          fileName: 'pom.xml (part)',
          code: `<dependency>
  <groupId>com.fasterxml.jackson.core</groupId>
  <artifactId>jackson-databind</artifactId>
  <version>2.18.2</version>
  <exclusions>
    <exclusion>
      <groupId>com.fasterxml.jackson.core</groupId>
      <artifactId>jackson-annotations</artifactId>
    </exclusion>
  </exclusions>
</dependency>`,
          output: `$ mvn dependency:tree -Dincludes=com.fasterxml.jackson.core
[INFO] com.example:hello:jar:1.0-SNAPSHOT
[INFO] \\- com.fasterxml.jackson.core:jackson-databind:jar:2.18.2:compile
[INFO]    \\- com.fasterxml.jackson.core:jackson-core:jar:2.18.2:compile

$ mvn compile exec:java -Dexec.mainClass=com.example.JsonDemo
[ERROR] Failed to execute goal org.codehaus.mojo:exec-maven-plugin:3.6.4:java (default-cli) on project hello: An exception occurred while executing the Java class. com/fasterxml/jackson/annotation/JsonView: com.fasterxml.jackson.annotation.JsonView -> [Help 1]`,
          warn: 'The code still compiles, because your code never names `JsonView`. It fails only when it runs. Every exclusion needs a test run afterwards.'
        }
      ],
      technical: [
        'Maven builds the graph from POM files only. For each dependency it downloads the `.pom`, reads its `<dependencies>`, and repeats, skipping `test`, `provided` and `<optional>true</optional>` entries of libraries. Then it **mediates**: for each `groupId:artifactId` it keeps one version (nearest in the tree; on a tie, the one declared first) and drops the rest.',
        'Gradle solves the same conflict differently: it picks the **highest** version by default. So the same set of libraries can give different classpaths in Maven and Gradle.',
        'Big projects pin versions with `<dependencyManagement>`: a block that sets versions without adding dependencies. Library families often ship a **BOM** (bill of materials), a POM that only lists matching versions, like `junit-bom` or `jackson-bom`. You import it once with `<scope>import</scope>`, and all members of the family get the same version.'
      ],
      tryIt: {
        steps: [
          'Add `jackson-databind` 2.18.2 to your `pom.xml` and save `JsonDemo.java` in `src/main/java/com/example/`.',
          'Run `mvn compile exec:java -Dexec.mainClass=com.example.JsonDemo`.',
          'Run `mvn dependency:tree` and find `jackson-core`.',
          'Run `ls ~/.m2/repository/com/fasterxml/jackson/core/`.',
          'Add the exclusion from step 5, run the demo again, then remove the exclusion.'
        ],
        see: 'The JSON line `{"name":"Rex",…}`, a tree with `jackson-annotations` and `jackson-core` under `jackson-databind`, three folders in `~/.m2`, and the `JsonView` error while the exclusion is in place.'
      },
      check: [
        { q: 'You never wrote `jackson-core` in your POM. Why is it on your classpath?', a: 'It is a transitive dependency: `jackson-databind`’s own POM lists it, so Maven downloads it and adds it for you.' },
        { q: 'Two paths bring `jackson-core` 2.17.0 (depth 1) and 2.18.2 (depth 2). Which one does Maven use?', a: '2.17.0, because it is nearest to your project. `mvn dependency:tree -Dverbose` shows the other as `omitted for conflict`.' },
        { q: 'A library you use has JUnit as a `test` dependency. Does JUnit end up in your project through it?', a: 'No. `test` (and `provided`) dependencies of a library are not passed on.' }
      ],
      keyPoints: [
        'Libraries have dependencies too; Maven fetches them transitively.',
        '`mvn dependency:tree` shows everything, with versions and scopes.',
        'On a version clash, the nearest declaration wins (Gradle: the highest).',
        'Test and provided dependencies of libraries are never passed on.',
        'Exclusions remove a branch, but break at run time if the code is needed.'
      ],
      commonMistakes: [
        'Using a transitive class directly, like `com.fasterxml.jackson.core.JsonFactory`, without declaring `jackson-core`. It works today but breaks when databind changes. Declare what you import.',
        'Declaring an older version of a transitive library by hand (`jackson-core` 2.17.0 next to databind 2.18.2). That can cause `NoSuchMethodError`. Keep one version for the whole family.',
        'Excluding a jar the library needs, like `jackson-annotations`. The build is green but the program fails when it runs. Test after every exclusion.',
        'Guessing what is on the classpath. Run `mvn dependency:tree` instead.'
      ],
      related: ['dependencies', 'pom-explained', 'Exceptions']
    }
  ]);
})();
