# Install on macOS (Homebrew)

> Read this instead of the Ubuntu install section in [GUIDE.md](../../GUIDE.md) if you're on a Mac. By the end, `java`, `mvn`, `curl`, `jq`, and Docker all work from your terminal. ~20–30 minutes (mostly download time). Works the same on Apple Silicon (M-series) and Intel Macs.

## The problem

The course assumes five tools exist on your machine: **JDK 21**, **Maven**, **Docker**, **`curl`**, and (optionally) **`jq`**. macOS ships with none of the first two, and installing developer tools by downloading `.dmg` files one by one is slow and hard to undo.

## The solution: Homebrew

**Homebrew** is the standard package manager for macOS: one tool that installs, updates, and removes command-line software for you, the same way `apt` does on Ubuntu.

Install it with the official one-liner (it will explain what it's about to do and ask for your password):

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

> **First time using the terminal on this Mac?** The installer may pop up a dialog asking to install the **Command Line Developer Tools** (`xcrun`/`git` and friends). Say yes and let it finish first — Homebrew needs them.

When the installer finishes it prints a few **"Next steps"** lines telling you to add `brew` to your PATH. Run exactly what it prints (on Apple Silicon it looks like this):

```bash
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"
```

Then confirm:

```bash
brew --version   # → Homebrew 4.x
```

## Key words

| Word | Beginner meaning |
|---|---|
| **Package manager** | A tool that installs and updates software by name (`brew install maven`) instead of hunting for downloads. |
| **Formula** | Homebrew's word for one installable command-line package (e.g. `openjdk@21`). |
| **Cask** | Homebrew's word for a graphical app it can install (e.g. Docker Desktop). |
| **PATH** | The list of folders your terminal searches when you type a command name. If a tool isn't on the PATH, you get `command not found` even though it's installed. |
| **Symlink** | A shortcut file that points at the real file, so the system finds a tool at a standard location. |

## Install the JDK, Maven, curl, and jq

```bash
brew install openjdk@21 maven curl jq
```

### The `openjdk@21` PATH caveat (don't skip this)

Homebrew installs the JDK but deliberately does **not** put it where macOS looks for Java. At the end of the install it prints a caveat telling you what to do. You have two options — do **one** of them:

**Option 1 (recommended): create the system symlink** so *everything* on your Mac (terminal, Maven, IntelliJ) finds Java 21:

```bash
sudo ln -sfn "$(brew --prefix)/opt/openjdk@21/libexec/openjdk.jdk" \
  /Library/Java/JavaVirtualMachines/openjdk-21.jdk
```

**Option 2: add it to your PATH** (terminal-only, no `sudo`):

```bash
echo 'export PATH="$(brew --prefix)/opt/openjdk@21/bin:$PATH"' >> ~/.zshrc
```

> `$(brew --prefix)` is `/opt/homebrew` on Apple Silicon and `/usr/local` on Intel — using it means the command works on both.

Now open a **new terminal window** (PATH changes only apply to new terminals) and verify:

```bash
java -version    # → openjdk version "21..."
javac -version   # → javac 21...   (confirms the full JDK, not just a runtime)
```

If `java -version` still shows nothing or an old version, see the troubleshooting table below.

## Install Docker Desktop

On macOS, Docker runs through **Docker Desktop** (the Docker Engine itself needs Linux, so Docker Desktop runs a tiny hidden Linux VM for you — you never have to think about it).

```bash
brew install --cask docker-desktop
```

(Or download it from [docker.com](https://www.docker.com/products/docker-desktop/) — same result.)

Then:

1. Open **Docker Desktop** from Applications (it asks for permissions the first time).
2. Wait for the whale icon in the menu bar to stop animating — that means the engine is running.
3. Docker commands only work **while Docker Desktop is running**. If you reboot and `docker` fails, start the app first.

> **Apple Silicon (M1/M2/M3/M4)?** Totally fine — Docker Desktop is native on arm64, and every image this course uses has an arm64 version. If you're curious about the rare `platform` mismatch warnings you might meet later, they're covered in [Docker troubleshooting](../09-docker/troubleshooting-docker.md).

## Proof: check that everything works

The same checks as the Ubuntu section of [GUIDE.md](../../GUIDE.md), minus the `systemctl` commands (macOS doesn't have systemd — Docker Desktop plays that role):

```bash
# Java & build
java -version          # → 21.x
javac -version         # → confirms full JDK (not JRE-only)
mvn -version           # → Maven 3.x using Java 21

# HTTP tools
curl --version
jq --version           # optional

# Docker (Docker Desktop must be running)
docker --version
docker compose version
docker info            # → must succeed, proves the engine is running
```

Smoke tests:

```bash
docker run --rm hello-world
curl -s -o /dev/null -w "%{http_code}\n" https://example.com   # → 200
```

If every command printed a version or success, you're done — go back to [step 00](README.md).

## Troubleshooting (macOS-specific)

| Symptom | Fix |
| --- | --- |
| `command not found` right after installing | Open a **new terminal window** — PATH changes don't apply to already-open ones. Still failing? Re-run the symlink or PATH step above. |
| `java -version` shows an old Java or "Unable to locate a Java Runtime" | You skipped the `openjdk@21` caveat step. Do Option 1 or 2 above, then open a new terminal. |
| `Cannot connect to the Docker daemon` / `docker info` fails | Docker Desktop isn't running. Open the app and wait for the whale icon to settle. It does not auto-start unless you enable that in its settings. |
| A dialog demands "command line developer tools" (`xcrun` error) | macOS asking to install its basic dev tools. Click Install (or run `xcode-select --install`), wait, then retry your command. |
| `brew: command not found` after installing Homebrew | Run the two `shellenv` lines the installer printed (see above), then open a new terminal. |

## Pros and cons of this setup

| Pros | Cons |
|---|---|
| One command installs and later updates everything (`brew upgrade`) | Homebrew itself is one extra tool to install first |
| Same tool versions as the course expects | The `openjdk@21` PATH caveat is a one-time stumble |
| Docker Desktop handles the Linux VM invisibly | Docker only works while the Desktop app is running |

## One note for later: container networking

On macOS, containers can reach your Mac via the special name `host.docker.internal` — and you may see that name in blog posts. This course **doesn't rely on it**: from step 09 onward we connect containers with **user-defined networks**, which work identically on macOS, Linux, and Windows. The how and why is in the "Running several containers" section of [GUIDE.md](../../GUIDE.md).

## Next

- Back to [Step 00](README.md) to prove the tools work (run a server, `curl` it, stop it).
- Choosing an editor and setting up the two-terminal workflow: [Editor and terminal](editor-and-terminal.md).
- On Windows instead? See [Install on Windows](install-windows.md).
