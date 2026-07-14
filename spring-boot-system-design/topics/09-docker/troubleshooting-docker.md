# Troubleshooting Docker

## Problem

Docker fails in a handful of very repeatable ways, and each one looks scarier than it is. This page is a symptom → cause → fix catalog for the failures you're most likely to hit in this course. Skim it once now, then come back whenever a build or `docker run` misbehaves.

Two commands solve half of all mysteries, so learn them first:

```bash
docker ps -a            # ALL containers, including ones that already exited
docker logs <name>      # what the app inside printed (its stdout/stderr)
```

---

## "The platform … does not match the detected host platform" (Apple Silicon)

**Symptom:** on an Apple Silicon Mac (M1/M2/M3, arm64) you see a warning like `image with reference … was found but its platform (linux/amd64) does not match the detected host platform (linux/arm64)`. The container may still run (slowly, emulated) or crash oddly.

**Cause:** the image was built only for `amd64` (Intel) CPUs, and your machine is `arm64`. Docker emulates the foreign architecture, which is slow and occasionally flaky.

**Fix:** first, don't panic — every image this course uses (`eclipse-temurin`, `maven`, `postgres`, `rabbitmq`) is **multi-arch**: Docker automatically picks the arm64 variant and you'll never see this warning with them. If a third-party image does trigger it, you can force a platform explicitly:

```bash
docker run --platform linux/amd64 some/amd64-only-image
```

…and accept the emulation cost, or look for an arm64-compatible alternative.

---

## "I edited my code but the container still runs the old version"

**Symptom:** you fixed a bug, restarted the container, and the bug is still there.

**Cause #1 (most common):** you restarted the container but never rebuilt the image. A container runs the image it was created from; your edit only changed source files on your laptop.

**Fix:** rebuild, then run the new image:

```bash
docker build -t parcelpilot-api:09 .
docker run --rm -p 8080:8080 parcelpilot-api:09
```

**Cause #2:** the layer cache didn't invalidate the way you expected — for example, the changed file is listed in `.dockerignore`, so `COPY` never sees it, and the cached layer is happily reused.

**Fix:** check `.dockerignore`, and read the build output: every step prints either `CACHED` or actually runs. If you're truly stuck and want to rule the cache out entirely:

```bash
docker build --no-cache -t parcelpilot-api:09 .
```

`--no-cache` rebuilds every layer from scratch. It's slow, so use it as a diagnostic, not a habit — if `--no-cache` fixes it, the interesting question is *which* layer was stale and why. [The Dockerfile, line by line](dockerfile-line-by-line.md) explains how cache invalidation works.

---

## Container exits immediately

**Symptom:** `docker run -d …` prints an ID, but `docker ps` shows nothing running.

**Cause:** the process inside crashed at startup (bad config, missing env var, port conflict inside, Java exception), and when process 1 dies, the container stops.

**Fix:** the container isn't gone, it's *exited*. Find it and read its story:

```bash
docker ps -a                  # see the exited container + its exit code
docker logs <name>            # the stack trace or error message is here
```

Exit code `0` means clean shutdown, `1` is a generic app error (read the logs), `137` usually means it was killed (out of memory or `docker kill`). If the logs aren't enough, run the image with a shell instead of its normal entrypoint and poke around from the inside:

```bash
docker run -it --entrypoint sh parcelpilot-api:09
# now you're inside: ls the files, check what actually got copied in
ls -la /app
```

---

## Watching logs of a running container

**Symptom:** the container runs detached (`-d`) and you can't see what the app prints.

**Fix:** `docker logs` shows everything the app wrote to stdout — which since step 07 is where all ParcelPilot's SLF4J logging goes, exactly so this command works:

```bash
docker logs parcelpilot-api        # everything so far
docker logs -f parcelpilot-api     # ...and keep following live (Ctrl+C to detach)
docker logs --tail 50 parcelpilot-api   # just the last 50 lines
```

---

## "port is already allocated"

**Symptom:** `docker: Error response from daemon: … bind: address already in use` or `port is already allocated`.

**Cause:** something on your machine already listens on the host port you asked for with `-p 8080:8080` — often a previous container you forgot about, or the app running directly via `mvn spring-boot:run`.

**Fix:** find and stop the current occupant, or pick another host port:

```bash
docker ps                                  # is an old container holding 8080?
docker stop <name>                         # stop it
# or run on a different HOST port (container side stays 8080):
docker run --rm -p 8081:8080 parcelpilot-api:09
curl -i http://localhost:8081/parcels/P-1
```

---

## "permission denied" talking to Docker (Linux)

**Symptom:** every `docker` command fails with `permission denied while trying to connect to the Docker daemon socket`.

**Cause:** on Linux your user isn't in the `docker` group yet, so only root may talk to the daemon.

**Fix:** the [GUIDE's install section](../../GUIDE.md#install-ubuntu) covers this: `sudo usermod -aG docker "$USER"`, then **log out and back in** (or run `newgrp docker` in the current shell) for the group change to take effect.

---

## Disk filling up with old images

**Symptom:** builds worked for weeks, and now your disk is mysteriously full.

**Cause:** every rebuild can leave behind **dangling images** (old layers no tag points to anymore) plus stopped containers and unused volumes. Docker never cleans up on its own.

**Fix:** first look, then prune:

```bash
docker system df       # how much space images/containers/volumes use
docker image prune     # delete dangling images only (safe)
docker system prune    # also removes stopped containers + unused networks (read the prompt!)
```

Careful with anything stronger: `docker system prune --volumes` deletes unused **volumes**, which from step 10 onward is where your database data lives.

---

## "It works locally but not in the container" — the checklist

The app behaves differently inside the container than with `mvn spring-boot:run`. Walk this list top to bottom:

1. **Did you rebuild the image** after your last change? (See the cache section above.)
2. **Paths**: the container's filesystem is *only* what the Dockerfile copied in. A file that exists on your laptop (`./data/parcels.csv`, a config in your home directory) does not exist in the container unless a `COPY` put it there.
3. **Environment variables**: `export DB_HOST=…` in your shell does nothing for the container. Every variable must be passed explicitly with `-e DB_HOST=…` on `docker run`.
4. **The `localhost` trap**: inside a container, `localhost` means *the container itself*, not your laptop and not other containers. If the app tries to reach a database at `localhost:5432`, it will find nothing there. Containers reach each other by name over a shared network — see [Running several containers](../../GUIDE.md#running-several-containers-read-before-step-10) in the GUIDE.
5. **Ports**: `EXPOSE` publishes nothing; only `-p host:container` does. And check you're curling the *host* port you mapped.
6. **Java version**: the container runs the JRE from the base image tag, not whatever is installed on your laptop.

---

## Next

- General debugging mindset (read errors bottom-up, change one thing at a time): [When things break](../../references/when-things-break.md).
- Understand the build so failures make sense: [The Dockerfile, line by line](dockerfile-line-by-line.md).
- Back to [Step 09](README.md).
