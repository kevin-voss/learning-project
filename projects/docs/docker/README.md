# Docker

**When:** Project 2. Read concepts before Phase 3 (Dockerfile); commands during Phase 4.

**Roadmap:** [Project 2 Phase 1](../roadmap.md#phase-1--prerequisites-1-h)

---

## One-sentence definition

**Docker** packages your app and its environment into a **container** that runs the same everywhere.

## The problem

"Works on my machine" — different OS, paths, and tools cause surprises. Docker bundles runtime + your files.

## Core concepts

| Term | Definition | Analogy |
|------|------------|---------|
| **Image** | Read-only blueprint | Cookie cutter |
| **Container** | Running instance | Cookie |
| **Dockerfile** | Build recipe | Recipe card |
| **Docker Engine** | Builds/runs containers | Factory |
| **Registry** | Image storage (Docker Hub) | App store |
| **Layer** | Cached build step | Assembly station |

## Container vs VM

| | VM | Container |
|---|-----|-----------|
| Size | GB | MB |
| Startup | Minutes | Seconds |
| Full OS? | Yes | No — shared kernel |

## Dockerfile example

```dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

`daemon off` keeps container running (foreground process).

## Nginx

Web server inside container — serves HTML/CSS/JS from `/usr/share/nginx/html`.

Flow: browser → `localhost:8080` → Docker → Nginx → your `index.html`

## Port mapping

```bash
docker run -p 8080:80 my-portfolio:v1
#            host  container
```

## Essential commands

```bash
docker build -t portfolio:v1 .
docker images
docker run -d -p 8080:80 --name my-site portfolio:v1
docker ps
docker stop my-site && docker rm my-site
docker logs my-site
docker exec -it my-site /bin/sh
```

## Docker Hub

```bash
docker login
docker tag portfolio:v1 USERNAME/portfolio:v1
docker push USERNAME/portfolio:v1
```

GitHub = source code · Docker Hub = runnable images

## `.dockerignore`

Exclude from build context:

```
node_modules
.git
*.md
.env
```

## When Docker shines

- Consistent deploys
- Share exact environment
- Later: multi-service apps (Compose)

## Checklist (Project 2 Phase 1)

- [ ] Docker Desktop running
- [ ] `docker run hello-world` works
- [ ] Explain image vs container in one sentence
- [ ] Understand `-p 8080:80`

## See also

[02 step-by-step](../../02-docker-portfolio/docs/step-by-step.md) · [Terminal cheat sheet](../../02-docker-portfolio/docs/help/terminal-cheatsheet.md) · [Roadmap](../roadmap.md)
