# Project Structure — Docker Portfolio

Folders and files **you** create. Nothing here exists until you make it.

## Target layout

```
02-docker-portfolio/
├── index.html              # Portfolio homepage
├── css/
│   └── styles.css
├── js/
│   └── app.js              # Optional: smooth scroll, theme toggle
├── images/
│   ├── profile.jpg
│   └── project-screenshots/
├── Dockerfile              # How to build the image
├── .dockerignore           # Exclude from build context
├── .gitignore              # ✅ provided
├── README.md               # How to build/run (you update with screenshots)
└── docs/                   # ✅ provided — learning material
```

## Portfolio sections to plan

Sketch on paper before coding:

1. **Header / hero** — name, title, short tagline
2. **About** — who you are, what you're learning
3. **Projects** — cards linking to Project 1, 2, 3, 4 repos
4. **Skills** — HTML, CSS, JS, Docker, etc.
5. **Contact** — email, GitHub, LinkedIn

Keep it **one page** or simple multi-section scroll for your first portfolio.

## Path rules (critical for Docker)

All asset links must work when served from `/`:

```html
<!-- ✅ Good -->
<link rel="stylesheet" href="css/styles.css">
<img src="images/profile.jpg" alt="Profile">

<!-- ❌ Bad -->
<link href="/Users/you/project/css/styles.css">
<img src="file:///C:/images/photo.jpg">
```

Test locally with Live Server before Dockerizing.

## Dockerfile location

Place `Dockerfile` in the **project root** — same folder as `index.html`.

Build command runs from that folder:

```bash
docker build -t portfolio:v1 .
#                              ↑ current directory = build context
```

## What goes in `.dockerignore`

```
.git
.gitignore
README.md
docs/
*.md
.DS_Store
node_modules
.env
```

Your **site files** (`index.html`, `css/`, `images/`) must **not** be ignored.

## Optional: reuse Project 1

You can copy your weather dashboard into this project as a **linked project card**, or build a separate portfolio that **describes** all four curriculum projects. Either approach is valid.

## Git checkpoints

Suggested commits:

1. `Add portfolio HTML skeleton and sections`
2. `Add portfolio CSS and responsive layout`
3. `Add Dockerfile and .dockerignore`
4. `Verify container runs on port 8080`
5. `Push image to Docker Hub and update README`

## Next

[Step-by-step plan](./step-by-step.md)
