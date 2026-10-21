# Git — apply sheet

**Scope:** right after [Get set up](../setup/getting-started.md). Apply only; the [CS Git lesson](../../../tracks/computer-science/index.html#git-collaboration) holds the theory.

Git saves snapshots of your project so you can undo mistakes, push backups to GitHub, and show employers real history. Use it on every project here after each meaningful change.

## Your daily loop in this repo

You cloned this repository in [Get set up](../setup/getting-started.md) and work on your own branch. You never run `git init` here: the repository already exists.

```bash
git status                        # what changed?
git add .                         # pick everything for the next snapshot
git commit -m "Add weather form"  # save a snapshot (say what it does)
git push                          # upload your branch to GitHub
git pull origin main              # get new lessons from main
git log --oneline                 # recent history
```

First push of your branch: `git push -u origin your-name`. After that, `git push` is enough.

## A project of your own

Want a project in its own GitHub repository (for a portfolio)? Make a folder **outside** this repo, then:

```bash
mkdir ~/code/weather-dashboard && cd ~/code/weather-dashboard
git init && git add . && git commit -m "Initial commit"
# create an empty repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/weather-dashboard.git
git branch -M main && git push -u origin main
```

## `.gitignore`

Never commit `.env`, API keys, `node_modules/`, `.DS_Store`, or `dist/`. Each project ships a template — use it before the first code commit.

## Learn the theory (canonical)

Open the **CS roadmap Git lesson** (not this sheet for deep theory):

**[Git and collaboration](../../../tracks/computer-science/index.html#git-collaboration)** in the computer-science track.

Also useful: **[tracks/java/topics/git-basics/](../../../tracks/java/topics/git-basics/)** for a short Java-track walkthrough.

[Roadmap](../roadmap.md) · [Setup](../setup/getting-started.md)
