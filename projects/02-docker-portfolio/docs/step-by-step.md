# Step-by-Step — Docker Portfolio

Follow phases in order. Learn topics **when each phase links them** — not all upfront.

**Big picture:** [Roadmap — Project 2](../../docs/roadmap.md#project-2--docker-portfolio)

## How to use this guide

Docker can feel strange because you cannot always see what it is doing. Move slowly:

- **Goal** tells you what you are making.
- **Why** tells you why the step exists.
- **Command** blocks show what to type.
- **Checkpoint** tells you what "working" looks like.

## Phase 1: Prerequisites (≈1 hour)

**Learn:** [Docker: concepts](../../docs/docker/README.md) (first sections)

**Goal:** Prove Docker is installed and can run a test container.

**Why:** If `hello-world` fails, your portfolio container will fail too.

**Do:**
- [ ] Install [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [ ] Start Docker Desktop (whale icon in menu bar / system tray)
- [ ] Read [concepts.md](./concepts.md) — skim alongside Docker guide

```bash
cd projects/02-docker-portfolio
pwd
docker --version
docker run hello-world
```

**Apply:** `docker run hello-world` succeeds.
- [ ] Skim [terminal cheat sheet](./help/terminal-cheatsheet.md)

- [ ] Create [Docker Hub](https://hub.docker.com) account

## Phase 2: Build portfolio site (≈2–3 hours)

**Learn:** [JavaScript: Project 2 — paths](../../docs/javascript/by-project.md#project-2--docker-portfolio)

**Goal:** Create a simple website that works before Docker enters the story.

**Why:** Docker should package a working site, not hide broken HTML or CSS.

**Do:**
You write all HTML/CSS yourself.

```bash
cd projects/02-docker-portfolio
git init
mkdir -p css js images
touch index.html css/styles.css js/app.js
ls
```

- [ ] Confirm `index.html`, `css/`, `js/`, and `images/` exist
- [ ] Create `index.html` with semantic sections (header, main, footer)
- [ ] Add About, Projects, Skills, Contact sections
- [ ] Link project cards to your GitHub repos (or placeholders)
- [ ] Create `css/styles.css` — layout, typography, colors
- [ ] Use relative paths for all assets
- [ ] Add `@media` query for mobile
- [ ] Optional: `js/app.js` for small interactions

**Checkpoint:** Open with Live Server — site looks good, all images load, links work.

## Phase 3: Dockerfile (≈1 hour)

**Learn:** [Docker: Dockerfile & Nginx](../../docs/docker/README.md) · [code-reference](./code-reference.md)

**Goal:** Write a recipe that tells Docker how to package your website.

**Why:** A Dockerfile is like a cooking recipe. Docker follows it to make an image.

**Do:**
- [ ] Create `Dockerfile` in project root (see [code-reference](./code-reference.md))
- [ ] Use `FROM nginx:alpine`
- [ ] `COPY . /usr/share/nginx/html`
- [ ] `EXPOSE 80`
- [ ] `CMD ["nginx", "-g", "daemon off;"]`
- [ ] Create `.dockerignore`

**Checkpoint:** File saved, no typos in instruction names (Dockerfile keywords are uppercase by convention).

## Phase 4: Build and run (≈2 hours)

**Goal:** Turn your recipe into an image, then run that image as a container.

**Why:** The image is the packed website. The container is the running website.

```bash
docker build -t portfolio:v1 .
docker images                    # See your image listed
docker run -d -p 8080:80 --name my-portfolio portfolio:v1
docker ps                        # Container should be "Up"
```

- [ ] Visit `http://localhost:8080` — portfolio loads
- [ ] Click links, check CSS and images
- [ ] Run `docker logs my-portfolio` — no errors
- [ ] Stop: `docker stop my-portfolio`
- [ ] Start again: `docker start my-portfolio`
- [ ] Remove when done testing: `docker stop my-portfolio && docker rm my-portfolio`

**Checkpoint:** Site works identically inside container.

If the browser cannot load it, ask:

- Is Docker Desktop running?
- Does `docker ps` show `my-portfolio`?
- Did you map `8080` on your computer to `80` in the container with `-p 8080:80`?

## Phase 5: Explore inside container (≈1 hour)

```bash
docker run -d -p 8080:80 --name explore portfolio:v1
docker exec -it explore /bin/sh
```

Inside container shell:

```sh
ls /usr/share/nginx/html
cat /usr/share/nginx/html/index.html
exit
```

- [ ] Confirm your files are where Nginx expects them
- [ ] Understand container filesystem is separate from your Mac/PC

## Phase 6: Push to Docker Hub (≈1–2 hours)

**Learn:** [Git: portfolio links](../../docs/git/README.md#connecting-projects-to-your-portfolio)

**Build:**
```bash
docker login
docker tag portfolio:v1 YOUR_DOCKERHUB_USERNAME/portfolio:v1
docker push YOUR_DOCKERHUB_USERNAME/portfolio:v1
```

- [ ] Image visible on hub.docker.com
- [ ] Test pull on same machine: remove local image, `docker pull`, `docker run` again
- [ ] Add Docker Hub badge/link to project README

## Phase 7: Document and publish source (≈1 hour)

- [ ] Update project README with:
  - Screenshot of portfolio
  - `docker build` and `docker run` commands
  - Link to Docker Hub image
- [ ] Push source code to GitHub (separate from image — code on GitHub, image on Docker Hub)
- [ ] Verify `.gitignore` excludes secrets and junk

## Success checklist

- [ ] Explain image vs container without notes
- [ ] Write a basic Dockerfile from memory
- [ ] Map port 8080 on host to 80 in container
- [ ] Use `docker ps`, `docker logs`, `docker exec`
- [ ] Push and pull an image from Docker Hub
- [ ] Use 10+ terminal commands from cheat sheet

## Bonus (later)

- Custom `nginx.conf` for pretty URLs
- Multi-stage build (if you add a build step)
- Docker Compose with volume for live reload
- GitHub Actions to build image on push

## Stuck?

- [FAQ](./help/faq.md)
- [Troubleshooting](./help/troubleshooting.md)
- [Code reference](./code-reference.md)

## Next project

→ [03-cli-tool](../03-cli-tool/)
