# Git — apply sheet

**Scope:** anytime after setup. Apply only; CS holds the theory.

Git saves snapshots of your project so you can undo mistakes, push backups to GitHub, and show employers real history. Use it on every project here after each meaningful change.

## Commands for these projects

```bash
git init                          # start tracking a project folder
git status                        # what changed?
git add .                         # stage files for the next snapshot
git commit -m "Add weather form"  # save a snapshot (imperative message)
git remote add origin <url>       # point at your GitHub repo (once)
git push -u origin main           # upload (first time); later: git push
git pull                          # download updates
git log --oneline                 # recent history
```

Typical Project 1 start:

```bash
cd projects/01-weather-dashboard
git init && git add . && git commit -m "Initial commit"
# create empty GitHub repo, then:
git remote add origin https://github.com/YOUR_USERNAME/weather-dashboard.git
git branch -M main && git push -u origin main
```

## `.gitignore`

Never commit `.env`, API keys, `node_modules/`, `.DS_Store`, or `dist/`. Each project ships a template — use it before the first code commit.

## Learn the theory (canonical)

Open the **CS roadmap Git lesson** (not this sheet for deep theory):

**[tracks/computer-science/index.html](../../tracks/computer-science/index.html)** — find the Git lesson in the roadmap.

Also useful: **[tracks/java/topics/git-basics/](../../tracks/java/topics/git-basics/)** for a short Java-track walkthrough.

[Roadmap](../roadmap.md) · [Setup](../setup/getting-started.md)
