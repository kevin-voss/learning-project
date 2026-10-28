# Get set up

> [!PICTURE]
> Before you cook, you set up the kitchen: a stove, a knife, the recipe book on the table. Here you set up your **coding kitchen**: a terminal, an editor, Git, a GitHub account, and this whole repository on your computer.

You need a computer and internet. Nothing else. You do this once.

## 1. Open a terminal

The terminal is a window where you type commands instead of clicking.

| Your computer | What to do |
|---------------|------------|
| Mac | Press `Cmd + Space`, type `Terminal`, press Enter. |
| Windows | Install Ubuntu through WSL: open PowerShell **as administrator**, run `wsl --install`, restart, then open the **Ubuntu** app. Use Ubuntu for everything on this path. |
| Linux | Open the **Terminal** app. |

Type `pwd` and press Enter. It prints the folder you are in.

## 2. Install Git

Git saves snapshots of your work. Check if you have it:

```bash
git --version
```

If you see a version number, go to step 3. If not:

| Your computer | Command |
|---------------|---------|
| Mac | `xcode-select --install` (click Install in the window that opens) |
| Ubuntu / WSL / Linux | `sudo apt update && sudo apt install -y git` |

Then tell Git your name and the email you will use for GitHub:

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

VS Code opens with every lesson, project and task as files. The website shows the same files, easier to read.

## 5. Make a GitHub account and sign in

GitHub is the shelf on the internet where your work is kept safe. You need an account before your first `git push`.

1. Go to [github.com/signup](https://github.com/signup) and make a free account. Use the same email as in step 2.
2. Send your teacher your GitHub **username**. They invite you to this repository.
3. Open the invitation email (or [github.com/notifications](https://github.com/notifications)) and click **Accept invitation**.
4. In VS Code, click the **person icon** at the bottom left and choose **Sign in with GitHub**. Your browser opens. Click **Authorize**.

> [!WARN]
> When you push from the terminal, GitHub does **not** accept your GitHub password. Push from the **terminal inside VS Code** (menu **Terminal → New Terminal**). VS Code then signs you in through the browser.

## 6. Make your own branch and push it

A branch is your own copy of the work. Name it after yourself:

```bash
git switch -c your-name
git push -u origin your-name
```

From now on you save your work with the [daily Git loop](../git/README.md).

## What to install when

You do not need everything now. Each tool is installed on the page that first needs it.

| When on the path | Install | Where |
|------------------|---------|-------|
| Now | An editor and Git | this page |
| JavaScript basics (the drills) | Bun | [How the drills work](../../drills/javascript/README.md) |
| Java 1 · Basics | Java (the JDK) | [Getting started with Java](../../tracks/java/topics/getting-started/index.html) |
| Java 4 · Build, test and HTTP | Maven | [Build tools](../../tracks/java/topics/build-tools/index.html) |
| Databases and Docker | Docker | [Docker and containers](../../tracks/computer-science/index.html#docker-containers), then [Get Docker](https://docs.docker.com/get-started/get-docker/) |
| Only for the extras | Node.js and npm | [Node.js](../nodejs/README.md) |

> [!CHECK]
> 1. Run `git --version`. What should you see?
>    <details><summary>Answer</summary>A line like <code>git version 2.45.0</code>. Any version number is fine.</details>
> 2. Run `cd ~/code/learning-project` and then `git branch`. What should you see?
>    <details><summary>Answer</summary>Your name with a <code>*</code> in front of it.</details>
> 3. Open `https://github.com/kevin-voss/learning-project/branches` in the browser. Is your branch there?
>    <details><summary>Answer</summary>Yes, if the push in step 6 worked. If not, check that you accepted the invitation and pushed from the VS Code terminal.</details>

**Next:** [Git: your daily loop](../git/README.md)
