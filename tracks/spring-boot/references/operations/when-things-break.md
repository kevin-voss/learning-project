# When things break

Quick fixes for the errors this course actually produces, one symptom per section. Find your error text, apply the fix, move on. When the fix here is not enough — or you want to understand *why* — switch to [debugging-and-troubleshooting.md](debugging-and-troubleshooting.md) for the full method.

## Port 8080 already in use

**Symptom:**

```text
Web server failed to start. Port 8080 was already in use.
```

**Likely cause:** a previous run of your app in another terminal, or a container publishing `-p 8080:8080`, still holds the port.

**Fix:**

```bash
lsof -i :8080           # find the PID
kill <PID>              # if it's a stray java process
docker ps               # if it's a container...
docker stop <container> # ...stop it instead
```

Or run on another port: `server.port=8081` in `application.properties`.

**Usually bites at:** [step 04](../topics/04-first-spring-api/README.md) onward — any step where you run the API.

## `Connection refused` when calling localhost

**Symptom:**

```text
curl: (7) Failed to connect to localhost port 8080 ... Connection refused
```

**Likely cause:** nothing is listening there. Either the app is not (or no longer) running, it started on a different port, or it runs in a container started **without** `-p 8080:8080`.

**Fix:**

```bash
# Is the app actually up? Check its terminal for "Started ... Application".
# Wrong port? Check application.properties for server.port.
# In Docker? The container must publish the port:
docker ps                                   # PORTS column must show 0.0.0.0:8080->8080
docker run --rm -p 8080:8080 parcelpilot-api:dev
```

**Usually bites at:** steps [04](../topics/04-first-spring-api/README.md) and [09](../topics/09-docker/README.md).

## `Connection refused` between containers

**Symptom:** the API container's logs show something like

```text
Connection to localhost:5432 refused. Check that the hostname and port are correct...
```

**Likely cause:** the classic trap — **inside a container, `localhost` means the container itself**, not your host machine and not the other container. Your API is looking for PostgreSQL inside its own box.

**Fix:** put both containers on a user-defined network and use the other container's **name** as the host (full explanation: [Running several containers in the GUIDE](../GUIDE.md#running-several-containers-read-before-step-10)):

```bash
docker network create parcelpilot-net
docker run --network parcelpilot-net --name parcelpilot-db ...
docker run --network parcelpilot-net --name parcelpilot-api \
  -e SPRING_DATASOURCE_URL=jdbc:postgresql://parcelpilot-db:5432/parcelpilot ...
```

In Docker Compose (step 14) the network is automatic — but the rule stands: use the **service name** (`parcel-db`), never `localhost`.

**Usually bites at:** [step 10](../topics/10-persistence/README.md) (API + database) and again at [13](../topics/13-split-services/README.md)/[14](../topics/14-compose-and-observe/README.md).

## Flyway migration failed / checksum mismatch

**Symptom:**

```text
FlywayException: Validate failed: Migrations have failed validation
Migration checksum mismatch for migration version 1
```

**Likely cause:** you **edited a migration file that already ran**. Flyway fingerprints every applied migration; changing `V1__create_parcels.sql` after it ran makes the fingerprint disagree with the database.

**Fix:** put the old file back exactly as it was, and make your change as a **new** migration (`V2__add_column.sql`). Applied migrations are history — append, don't edit. In pure local learning, the nuclear option also works: delete the database volume and let all migrations rerun from scratch (destroys your data):

```bash
docker compose down -v      # or docker volume rm <volume>
```

**Usually bites at:** [step 10](../topics/10-persistence/README.md).

## RabbitMQ not ready when the app starts

**Symptom:** app logs at startup show repeated

```text
java.net.ConnectException: Connection refused
... Attempting to connect to: [rabbitmq:5672]
```

**Likely cause:** a race — RabbitMQ takes several seconds to boot, and your app started first. Common right after `docker compose up` starts everything at once.

**Fix:** usually nothing — Spring's RabbitMQ client **retries automatically** and connects once the broker is up; watch the logs settle. If the app gives up and exits, start the broker first, or in Compose declare the ordering with a health check:

```yaml
services:
  parcel-service:
    depends_on:
      rabbitmq:
        condition: service_healthy
```

(Plain `depends_on` without a condition only orders *startup*, not *readiness*.)

**Usually bites at:** [step 12](../topics/12-queues/README.md), then again when Compose starts everything together at [step 14](../topics/14-compose-and-observe/README.md).

## Docker `permission denied` (Linux)

**Symptom:**

```text
permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock
```

**Likely cause:** on Linux, talking to Docker requires membership in the `docker` group; your shell session doesn't have it yet.

**Fix:**

```bash
sudo usermod -aG docker "$USER"
newgrp docker           # or log out and back in
docker info             # must now succeed without sudo
```

**Usually bites at:** [step 00](../topics/00-start-here/README.md)/[09](../topics/09-docker/README.md), first Docker use on Ubuntu.

## `mvn: command not found` / wrong Java version

**Symptom:**

```text
mvn: command not found
```

or Maven runs but fails with `invalid target release: 21` / `class file has wrong version`.

**Likely cause:** Maven is not installed, or Maven is running on an older JDK than the 21 this course requires.

**Fix:**

```bash
sudo apt install -y maven openjdk-21-jdk
mvn -version    # must print Maven 3.x AND "Java version: 21"
```

If `mvn -version` shows the wrong Java, point `JAVA_HOME` at JDK 21. Full install steps: [Step 00 install section](../topics/00-start-here/README.md#if-your-tools-are-not-installed-yet); background: [maven.md](maven.md).

**Usually bites at:** [step 03](../topics/03-maven/README.md).

## JSON request rejected: 400 vs 415

**Symptom:** your `curl -X POST` gets

```text
HTTP/1.1 415 Unsupported Media Type
```

**Likely cause:** you sent a JSON body but no `Content-Type: application/json` header, so Spring refuses to parse it. (A **400 Bad Request** is different: the header was right but the JSON itself is malformed or fails validation.)

**Fix:**

```bash
curl -i -X POST http://localhost:8080/parcels \
  -H 'Content-Type: application/json' \
  -d '{"recipient":"Ada"}'
```

Rule of thumb: **415** = wrong/missing content type, **400** = wrong content.

**Usually bites at:** steps [04](../topics/04-first-spring-api/README.md) and [05](../topics/05-validation-and-inputs/README.md).

## JWT: 401 vs 403 confusion

**Symptom:** a protected endpoint returns `401 Unauthorized` or `403 Forbidden` and you're not sure which problem you have.

**Likely cause:** they mean different things. **401** = "I don't know who you are" — missing, expired, or invalid token (or a typo in the `Authorization: Bearer <token>` header). **403** = "I know who you are, and you're not allowed" — valid token, insufficient role.

**Fix:**

```bash
# 401 → get a fresh token and check the header spelling
curl -i -X POST http://localhost:8080/auth/login -H 'Content-Type: application/json' \
  -d '{"username":"operator","password":"..."}'
curl -i http://localhost:8080/parcels/P-1 -H "Authorization: Bearer <token>"

# 403 → the token works; check the role/claims your endpoint requires
```

Details in [step 16](../topics/16-jwt-authentication/README.md) and [authentication.md](authentication.md).

**Usually bites at:** [step 16](../topics/16-jwt-authentication/README.md).

## Not listed here?

Read the error slowly, find the last `Caused by:`, and work the five-step loop in [debugging-and-troubleshooting.md](debugging-and-troubleshooting.md). Most "new" errors are one of the above wearing a costume.
