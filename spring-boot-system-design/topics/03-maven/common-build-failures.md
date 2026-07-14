# Common build failures (and how to read them)

Every beginner hits the same handful of Maven failures. This page shows each one as it looks in your terminal, what actually went wrong, and the fix. Keep it open next to your first builds.

## The problem

A failing Maven build prints **hundreds of lines**, and the useful part is rarely the last one. Beginners read the bottom, see `BUILD FAILURE`, and panic. Experienced developers scroll **up** to the *first* `[ERROR]` line and usually know the fix in seconds. This page teaches you that skill.

## The golden rule

> **Scroll UP to the first `[ERROR]`.** Everything after it is usually noise caused by the first problem. Fix the first error, rebuild, repeat.

## Key words

| Word | Beginner meaning |
|---|---|
| **`[ERROR]` / `[WARNING]` / `[INFO]`** | Maven prefixes every log line with its severity. Only `[ERROR]` fails the build. |
| **Compilation error** | The Java compiler rejected your source code — nothing ran. |
| **Test failure** | The code compiled and ran, but an assertion was false. |
| **Local repository (`~/.m2`)** | The folder on your machine where Maven caches downloaded dependencies. |
| **JDK vs JRE** | JDK = compiler + runtime (what you need). JRE = runtime only (can't compile). |

## Failure 1: `COMPILATION ERROR`

**Symptom:**

```text
[INFO] -------------------------------------------------------------
[ERROR] COMPILATION ERROR :
[INFO] -------------------------------------------------------------
[ERROR] /Users/you/parcelpilot/src/main/java/com/parcelpilot/ParcelTracker.java:[27,9]
        cannot find symbol
  symbol:   method pickup(com.parcelpilot.Parcel)
  location: class com.parcelpilot.ParcelTracker
[INFO] 1 error
[INFO] -------------------------------------------------------------
[INFO] BUILD FAILURE
```

**Cause:** the Java compiler refused your code. Nothing was run or tested. Here it's a typo: the code calls `pickup(...)` but the method is named `pickUp(...)`.

**Fix — read the error like an address:**

1. **File:** `ParcelTracker.java`
2. **Location:** `[27,9]` = line 27, column 9. Go there.
3. **Message:** `cannot find symbol` = the compiler doesn't know that name (typo, missing import, or wrong case).

If there are many compile errors, apply the **first-error-first rule**: fix only the top one and rebuild. One missing brace or import can produce twenty follow-up errors that vanish on their own.

## Failure 2: `Tests run: …, Failures: 1`

**Symptom:**

```text
[ERROR] Tests run: 2, Failures: 1, Errors: 0, Skipped: 0
[ERROR] Failures:
[ERROR]   ParcelTrackerTest.full_lifecycle_records_two_events:24
          expected: <DELIVERED> but was: <PICKED_UP>
[INFO] BUILD FAILURE
```

**Cause:** the code compiled and ran, but an **assertion** was false. This is not Maven being broken — this is your safety net catching a behavior change.

**Fix:** read the assertion diff: at `ParcelTrackerTest` line 24, the test expected status `DELIVERED` but got `PICKED_UP` — so `deliver(...)` didn't do its job (or the test's expectation is outdated). The full detail, including the stack trace, is in `target/surefire-reports/com.parcelpilot.ParcelTrackerTest.txt`. How Surefire runs and reports tests is covered in [Testing with Maven](testing-with-maven.md).

A distinction worth learning early: **`Failures`** = an assertion was false (expected vs actual). **`Errors`** = the test blew up with an unexpected exception before any assertion. Both turn the build red, but they point at different problems.

## Failure 3: `Could not resolve dependencies`

**Symptom:**

```text
[ERROR] Failed to execute goal on project parcelpilot:
        Could not resolve dependencies for project com.parcelpilot:parcelpilot:jar:0.1.0:
        Could not find artifact org.junit.jupiter:junit-jupitter:jar:5.10.2 in central
        (https://repo.maven.apache.org/maven2)
```

**Cause:** Maven couldn't download a dependency. Three usual suspects:

1. **Typo in the coordinates.** Read the artifact name in the error letter by letter: above it says `junit-jupitter` — one `t` too many in `pom.xml`.
2. **You're offline** (or behind a proxy/firewall). The message then mentions `Connection refused` or `Unknown host`.
3. **A corrupted cache in `~/.m2`.** A download that died halfway leaves a broken file that Maven keeps re-using.

**Fix:** check the spelling in `pom.xml` against the library's page on [central.sonatype.com](https://central.sonatype.com) first. Check your network second. If both are fine, delete just that dependency's cache folder and let Maven re-download it — no need to nuke all of `~/.m2`:

```bash
# the path mirrors groupId/artifactId: org.junit.jupiter -> org/junit/jupiter
rm -rf ~/.m2/repository/org/junit/jupiter
mvn test        # Maven re-downloads it cleanly
```

## Failure 4: `No compiler is provided in this environment`

**Symptom:**

```text
[ERROR] No compiler is provided in this environment.
        Perhaps you are running on a JRE rather than a JDK?
```

**Cause:** Maven found a Java **runtime** (JRE) but not a Java **compiler**. Only the JDK contains `javac`. Your `JAVA_HOME` points at a JRE, or no JDK is installed.

**Fix:** install a JDK (21 for this course) and make sure `JAVA_HOME` points at it. Verify with:

```bash
javac -version      # must print something like: javac 21.0.3
echo $JAVA_HOME     # must point at a JDK folder, not a JRE
```

## Failure 5: wrong Java version (`release 21 not supported`)

**Symptom:**

```text
[ERROR] Failed to execute goal org.apache.maven.plugins:maven-compiler-plugin:...:compile
        (default-compile) on project parcelpilot: Fatal error compiling:
        error: release version 21 not supported
```

**Cause:** your `pom.xml` says `<maven.compiler.release>21</maven.compiler.release>`, but Maven is running on an **older JDK** (say, 17) that can't produce Java 21 output. Maven uses whatever JDK `JAVA_HOME` points at — which may not be the newest one on your machine.

**Fix:** check which JDK Maven actually uses (not just what `java -version` says — they can differ):

```bash
mvn -version
# Apache Maven 3.9.x
# Java version: 21.0.3, vendor: ...     <- this line must say 21
```

If it says 17 (or anything below 21), point `JAVA_HOME` at your JDK 21 installation and re-run `mvn -version` until it agrees.

## Failure 6: `mvn: command not found`

**Symptom:**

```bash
$ mvn test
zsh: command not found: mvn
```

**Cause:** Maven isn't installed, or it's installed but not on your shell's `PATH`.

**Fix:** install it (macOS: `brew install maven`; Linux: your package manager; Windows: download + add `bin/` to PATH), then verify with `mvn -version`. Alternatively, if a project ships the **Maven Wrapper**, run `./mvnw test` instead — the wrapper downloads its own Maven and needs no install (see the [Maven reference](../../references/maven.md)).

## Not-quite-failures: plugin version warnings

**Symptom:**

```text
[WARNING] Some problems were encountered while building the effective model
[WARNING] 'build.plugins.plugin.version' for org.apache.maven.plugins:maven-compiler-plugin is missing.
```

**Cause:** a plugin is used without an explicit `<version>`, so Maven picks a default. The build still succeeds — `[WARNING]` never fails a build.

**When it's harmless:** during learning, and in projects using the Spring Boot parent (which pins plugin versions for you, starting step 04). You can ignore it.

**When it's not:** in a long-lived project, an unpinned version means the build can silently change behavior when a new plugin version becomes the default — the opposite of "repeatable". The fix is to declare the version explicitly. Rule of thumb: warnings are a to-do list, errors are a stop sign.

## Quick diagnosis table

| You see | It means | Start here |
|---|---|---|
| `COMPILATION ERROR` | source code rejected | file:line in the first `[ERROR]` |
| `Tests run: … Failures: 1` | an assertion failed | the expected/actual diff |
| `Could not resolve dependencies` | download failed | spelling in `pom.xml`, then network, then `~/.m2` |
| `No compiler is provided` | JRE instead of JDK | install JDK, fix `JAVA_HOME` |
| `release 21 not supported` | Maven runs an old JDK | `mvn -version` |
| `command not found: mvn` | Maven not installed / not on PATH | install, or use `./mvnw` |
| `[WARNING] … version … missing` | unpinned plugin version | ignore now, pin in real projects |

## Next

- How the `test` phase, Surefire, and reports work: [Testing with Maven](testing-with-maven.md).
- Maven Wrapper and dependency habits: [Maven reference](../../references/maven.md).
- A general method for debugging anything (read the error, form a hypothesis, test it): [Debugging and troubleshooting](../../references/debugging-and-troubleshooting.md).
- Back to [Step 03](README.md).
