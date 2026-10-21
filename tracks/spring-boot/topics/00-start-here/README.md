# Step 00: your tools

> [!PICTURE]
> Before a parcel depot opens, the manager walks round once. Lights on? Doors open? She rings the bell at the front desk and waits: does somebody answer? Today you do the same with your computer. You start a tiny server, ring its bell with `curl`, get an answer, and switch it off again.

## The idea

ParcelPilot will be a **server**: a program that waits for requests and sends back responses. You will test it the same way every step: **terminal 1 runs the server, terminal 2 sends a request.** Today you practise that loop with a ready-made server, so no code yet.

You already know the pieces from earlier stages. If one feels shaky, go back to its home:

| Idea | Where it is taught |
|---|---|
| Terminal, `cd`, `ls`, `Ctrl+C` | [Linux terminal](../../../computer-science/index.html#linux-terminal-os) |
| Request, response, status code, port | [HTTP requests and responses](../../../computer-science/index.html#http-requests-responses) |
| Image, container, why Docker | [Docker and containers](../../../computer-science/index.html#docker-containers) |
| Maven | [Build tools](../../../java/topics/build-tools/index.html) |

## First: check your tools

Run each command. Each one should print a version.

```bash
java -version      # Java 21 or newer
mvn -version       # Maven
docker --version   # Docker
curl --version     # curl
```

`jq --version` is optional. It prints JSON nicely.

## If your tools are not installed yet

| Missing | Install guide |
|---|---|
| Git, an editor | [Get set up](../../../../sheets/setup/README.md) |
| Java 21 | [Java: getting started](../../../java/topics/getting-started/index.html) |
| Maven | [Build tools](../../../java/topics/build-tools/index.html) (Ubuntu: `sudo apt install -y maven`) |
| Docker | [Docker and containers](../../../computer-science/index.html#docker-containers) |

> [!WARN]
> `docker info` says `permission denied`? Your user is not in the `docker` group yet. Run `sudo usermod -aG docker "$USER"`, then log out and back in (or run `newgrp docker`). If it says it cannot connect, start Docker: `sudo systemctl start docker`.

## Build it in ParcelPilot

Nothing to build yet. You only drive the tools. How to open two terminals side by side: [the two-terminal workflow](editor-and-terminal.md).

1. **Terminal 1:** start a throwaway web server.

   ```bash
   docker run --rm -p 8080:80 nginx:alpine
   ```

   `-p 8080:80` connects port `8080` on your computer to port `80` in the container. `--rm` deletes the container when it stops.

2. **Terminal 2:** ring the bell.

   ```bash
   curl -i http://localhost:8080
   ```

3. Back in terminal 1, press `Ctrl+C`. Run the `curl` again.

## Test it

> [!TRY]
> 1. Run `curl -i http://localhost:8080` while the container runs.
> 2. Stop the container with `Ctrl+C` and run the same `curl` again.
>
> You should see: first `HTTP/1.1 200 OK` and some HTML. After stopping: `Failed to connect`. The answer only exists while the server runs.

## Acceptance criteria

- [ ] `java -version`, `mvn -version`, `docker --version` and `curl --version` all print a version.
- [ ] `curl -i http://localhost:8080` prints a first line with `200`.
- [ ] After `Ctrl+C`, `curl` cannot connect.
- [ ] You can say the difference between an **image** and a **container** in one sentence.

## Say it like a developer

- "I sent a **GET request** to `localhost:8080` and got a **200 OK response**."
- "`curl` is the **client**, nginx is the **server**."
- "I **mapped** host port `8080` to container port `80`."

## Check

> [!CHECK]
> 1. In `curl -i http://localhost:8080`, who is the client and who is the server?
>    <details><summary>Answer</summary><code>curl</code> is the client: it sends the request. nginx inside the container is the server: it sends the response.</details>
> 2. What does `-p 8080:80` do?
>    <details><summary>Answer</summary>It connects port 8080 on your computer to port 80 inside the container. Requests to <code>localhost:8080</code> reach the program listening on 80.</details>
> 3. Why did `curl` fail after `Ctrl+C`?
>    <details><summary>Answer</summary>The container stopped, so nothing listens on port 8080 any more. No server, no answer.</details>

Keep one fact in mind: when a container stops, everything inside it is gone. That matters in step 10, when ParcelPilot starts saving parcels.

## Next

[Step 01](../01-java-basics/README.md): describe one parcel in Java.
