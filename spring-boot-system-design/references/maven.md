# Maven

Maven makes Java builds reproducible. `pom.xml` declares what the project needs and Maven resolves it, compiles source, runs tests, and creates an artifact.

```mermaid
flowchart LR
  P[pom.xml] --> R[resolve dependencies]
  R --> C[compile]
  C --> T[run tests]
  T --> K[package JAR]
```

## Convention, not magic

```text
src/main/java/   application source
src/test/java/   test source
target/          generated output; do not edit or commit
pom.xml          project definition
```

Maven discovers these locations by convention. Following them lets tools work without custom configuration.

## Commands

```bash
mvn test       # compile and run tests
mvn package    # test, then produce target/*.jar
mvn clean      # remove generated target/
mvn clean package
```

Use the Maven Wrapper (`./mvnw`) when the project includes it. It pins Maven for collaborators and CI. The JDK version should be declared in the POM and matched by the Docker build image.

## Dependencies

Add a dependency only because code needs it. Spring Boot starters are curated dependency groups. JUnit is a test dependency. Do not manually version libraries already managed by the Spring Boot parent/BOM unless you have a reason.

## Maven versus Docker

Maven builds Java artifacts; Docker packages and runs them in an operating-system-level image. They solve different reproducibility problems and work together.
