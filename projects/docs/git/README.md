# Git & GitHub

Version control for all four projects. Read sections **when the roadmap points you there** — not all at once.

**First use:** [Roadmap → Project 1 Phase 1](../roadmap.md#phase-1--setup-1-h)

---

## Why Git?

- **History** — undo mistakes, see what changed
- **Backup** — push to GitHub
- **Portfolio** — employers look at your repos
- **Collaboration** — branch and merge (later)

## Core concepts

| Term | Meaning |
|------|---------|
| **Repository (repo)** | Project folder tracked by Git |
| **Commit** | Snapshot of your code at one moment |
| **Stage** | Mark files to include in next commit (`git add`) |
| **Branch** | Parallel line of work (`main` is default) |
| **Remote** | Copy on GitHub (`origin`) |
| **Push / pull** | Upload / download commits |

## First-time setup (per project)

**When:** Project 1 Phase 1.

```bash
cd projects/01-weather-dashboard
git init
git add .
git commit -m "Initial commit: project docs and gitignore"
```

Create a repo on GitHub (empty, no README), then:

```bash
git remote add origin https://github.com/YOUR_USERNAME/weather-dashboard.git
git branch -M main
git push -u origin main
```

## Daily workflow

**When:** After every meaningful change.

```bash
git status
git diff
git add index.html js/app.js    # or: git add .
git commit -m "Add weather search form and basic styles"
git push
```

## Good commit messages

Imperative mood (like a command):

- ✅ `Add Open-Meteo fetch helper`
- ✅ `Fix empty city validation on submit`
- ❌ `fixed stuff` · ❌ `WIP`

## `.gitignore`

Each project includes a template. Never commit:

- API keys (`.env`, hard-coded keys)
- `node_modules/`
- OS junk (`.DS_Store`)
- Build output (`dist/`)

If you commit a secret: revoke at provider, remove from code, rotate key.

## GitHub Pages (Project 1 deploy)

**When:** Project 1 Phase 9.

1. Push project to GitHub
2. Repo → Settings → Pages
3. Source: branch `main`, folder `/ (root)`
4. Visit `https://YOUR_USERNAME.github.io/REPO_NAME/`

Client-side API keys are visible in browser — OK for learning on free tier.

## Useful commands later

```bash
git log --oneline
git restore file.js      # discard changes to one file
git pull
```

Avoid until comfortable: `rebase`, `reset --hard`, force push.

## Branching (optional)

```bash
git checkout -b feature/forecast
git commit -m "Add 5-day forecast section"
git checkout main
git merge feature/forecast
```

## Connecting projects to your portfolio

**When:** Project 2+ and after all four.

- Pin repos on GitHub profile
- Link live demos in README (Pages, Docker Hub, npm)
- Describe each project on portfolio site (Project 2)

## Checklist

- [ ] Git installed with name/email
- [ ] GitHub account
- [ ] One repo per project (recommended)
- [ ] `.gitignore` before first code commit
- [ ] No API keys in any commit

## See also

[Roadmap](../roadmap.md) · [Setup](../setup/getting-started.md)
