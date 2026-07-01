# Getting Started

Install tools **as each project needs them** — you don't need everything on day one.

| Tool | Needed for | Install when |
|------|------------|--------------|
| VS Code + browser | Project 1 | **Now** |
| Git | Project 1 | **Now** |
| Live Server (or similar) | Project 1 | **Now** |
| Node.js + npm | Projects 3–4 | Before Project 3 (install early if you want) |
| Docker Desktop | Project 2 | Before Project 2 |
| React DevTools extension | Project 4 | Before Project 4 |

**Start building:** [Roadmap → Project 1 Phase 1](../roadmap.md#project-1--weather-dashboard)

---

## What you already need to know

- HTML tags and basic page structure
- CSS selectors, colors, layout basics (flexbox helps)
- JavaScript: variables, functions, `if`, `for`/`while`, arrays

Shaky on JS? Spend an hour on [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide), then start Project 1 anyway.

---

## 1. Code editor

**VS Code:** https://code.visualstudio.com/

Optional extensions:

- **Live Server** — preview HTML (Project 1)
- **Prettier** — auto-format
- **ESLint** — catch mistakes (Project 4)

---

## 2. Git (Project 1 Phase 1)

```bash
git --version
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

Install: https://git-scm.com/downloads

When you `git init`, read [Git guide](../git/README.md#first-time-setup-per-project).

---

## 3. Node.js and npm (before Project 3)

```bash
node --version   # v18+ or v20+ LTS
npm --version
```

Install LTS: https://nodejs.org/

You won't use Node until **Project 3**, but installing early is fine. When you get there: [Node.js](../nodejs/README.md) · [npm](../npm/README.md).

---

## 4. Docker Desktop (before Project 2)

```bash
docker --version
docker run hello-world
```

Install: https://www.docker.com/products/docker-desktop/

When you start Project 2: [Docker guide](../docker/README.md).

---

## 5. Browser

Chrome or Edge — **DevTools Network tab** is essential in Project 1.

Project 4: install **React Developer Tools** extension.

---

## Local server (Project 1 Phase 1)

API calls fail on `file://` URLs. Serve over HTTP:

1. **Live Server** — right-click `index.html`
2. **npx serve .** — after Node installed
3. **python3 -m http.server 8080** — often pre-installed on Mac

Visit `http://localhost:8080` (or port shown).

---

## Accounts (create when needed)

| Service | When | Why |
|---------|------|-----|
| [GitHub](https://github.com) | Project 1 Phase 1 | Backup, portfolio |
| [Docker Hub](https://hub.docker.com) | Project 2 | Share images |
| [npm](https://www.npmjs.com) | Project 3 optional | Publish CLI |

Weather data uses [Open-Meteo](https://open-meteo.com/) — **no account**.

---

## When stuck

1. Read the error out loud
2. Project `docs/help/troubleshooting.md`
3. [Roadmap](../roadmap.md) — confirm you're on the right phase
4. [MDN](https://developer.mozilla.org/)

---

## Next

[Roadmap — Project 1 Phase 1](../roadmap.md#phase-1--setup-1-h) · [01 Weather Dashboard](../../01-weather-dashboard/README.md)
