# Get set up

**Time:** about 1 hour, once. **You need:** a computer and internet. Nothing else.

At the end you have a terminal, an editor, Git, and this whole repository on your computer.

## 1. Open a terminal

The terminal is a window where you type commands instead of clicking.

| Your computer | What to do |
|---------------|------------|
| Mac | Press `Cmd + Space`, type `Terminal`, press Enter. |
| Windows | Install Ubuntu through WSL: open PowerShell **as administrator**, run `wsl --install`, restart, then open the **Ubuntu** app. Use Ubuntu for everything in this course. |
| Linux | Open the **Terminal** app. |

Type `pwd` and press Enter. It prints the folder you are in. That is your first command.

## 2. Install Git

Git saves snapshots of your work. Check if you have it:

```bash
git --version
```

If you see a version number, skip ahead. If not:

| Your computer | Command |
|---------------|---------|
| Mac | `xcode-select --install` (click Install in the window that opens) |
| Ubuntu / WSL / Linux | `sudo apt update && sudo apt install -y git` |

Then tell Git your name and email (any email you use for GitHub):

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

## 3. Install an editor

Install [Visual Studio Code](https://code.visualstudio.com/). Open it, go to **Extensions** (the four squares on the left) and install:

- **Live Server** (shows your web pages and reloads them when you save)
- On Windows also **WSL** (lets VS Code open folders inside Ubuntu)

## 4. Get this repository

```bash
mkdir -p ~/code
cd ~/code
git clone https://github.com/kevin-voss/learning-project.git
cd learning-project
code .
```

VS Code opens with every lesson, project and task as files. The website shows the same files, just easier to read.

## 5. Make your own branch

A branch is your own copy of the work. Name it after yourself:

```bash
git switch -c your-name
```

Save your work like this, as often as you like:

```bash
git add .
git commit -m "Finish project 00"
git push -u origin your-name
```

Get new lessons from your teacher:

```bash
git pull origin main
```

## Install later, when the path says so

You do not need these yet. The path tells you when.

| Tool | When | Where it is explained |
|------|------|------------------------|
| Bun | Stage 5, JavaScript drills | [drills README](../../../drills/javascript/README.md) |
| Java 21 | Stage 6, Java | [Java getting started](../../../tracks/java/topics/getting-started/index.html) |
| Docker | Stage 9, servers and Docker | [Docker sheet](../docker/README.md) |
| Node.js + npm | Extras only (projects 03 and 04) | [Node.js sheet](../nodejs/README.md) |

## Check

- `git --version` prints a version.
- `cd ~/code/learning-project` and `ls` show `README.md`, `projects`, `tracks` and the other folders.
- `git branch` shows your name with a `*` in front.
