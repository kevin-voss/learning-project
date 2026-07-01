# Concepts — Docker Portfolio

Keywords explained for beginners. Read before writing a Dockerfile.

## Docker

**Simple:** Shipping containers for software.

Your portfolio needs a web server (Nginx) and your HTML/CSS files. Docker bundles both so anyone with Docker can run:

```bash
docker run -p 8080:80 your-image
```

and see your site at `http://localhost:8080`.

See also [Docker guide](../../docs/docker/README.md) for the full reference.

## Image vs container

| | Image | Container |
|---|-------|-----------|
| **State** | Read-only template | Running (or stopped) instance |
| **Analogy** | Cookie cutter | Cookie |
| **Create with** | `docker build` | `docker run` |
| **Count** | One image | Many containers from same image |

```bash
docker build -t portfolio:v1 .    # Creates IMAGE
docker run -d -p 8080:80 portfolio:v1   # Creates CONTAINER
docker run -d -p 8081:80 portfolio:v1   # Second CONTAINER, same IMAGE
```

## Dockerfile

A recipe file named exactly `Dockerfile` (no extension) in your project root.

Common instructions:

| Instruction | Purpose |
|-------------|---------|
| `FROM` | Base image to start from |
| `COPY` | Copy files from your computer into image |
| `RUN` | Run a command while building (install packages) |
| `EXPOSE` | Document which port the app uses |
| `CMD` | Default command when container starts |
| `LABEL` | Metadata (author, version) |

Each line adds a **layer**. Docker caches layers — put things that change rarely (FROM) first, your site files (COPY) later.

## Nginx

**Simple:** A waiter that serves your website files to visitors.

- Listens on port 80 inside the container
- Serves files from `/usr/share/nginx/html` in the official `nginx:alpine` image
- Industry standard for static sites — fast and small

You don't configure Nginx deeply for this project. Copy your files to the right folder and the default config works.

## Port mapping

Containers are isolated. Port mapping creates a tunnel:

```
Browser → localhost:8080 → Docker → container:80 → Nginx
```

```bash
docker run -p 8080:80 IMAGE
#           host:container
```

| Port | Typical use |
|------|-------------|
| 80 | HTTP inside container |
| 443 | HTTPS |
| 8080 | Common host port for local testing |
| 3000 | React dev server (Project 4) |

## `.dockerignore`

Tells Docker what **not** to send when building. Like `.gitignore` for the build context.

Exclude: `.git`, `README.md`, `node_modules`, docs you don't need in production.

## Docker Hub

Registry to store and share images. Workflow:

1. Build locally
2. Tag with your username: `username/portfolio:v1`
3. `docker push`
4. Others `docker pull`

## Static site requirements

For Docker + Nginx, your site must:

- Use **relative paths**: `css/styles.css` not `C:\Users\...`
- Work when opened from site root (`index.html` at top level)
- Use relative paths that work inside Docker

## Virtualization (big picture)

```
Your computer
  └── Docker Engine
        ├── Container: portfolio (Nginx + your HTML)
        └── Container: something else later
```

Containers share the host OS kernel — lighter than full virtual machines.

## Workflow diagram

```
Write HTML/CSS
    → Test locally (Live Server)
    → Write Dockerfile
    → docker build
    → docker run -p 8080:80
    → Test in browser
    → docker push (optional)
    → Document in README
```

## Further reading

- [Step-by-step plan](./step-by-step.md)
- [Terminal cheat sheet](./help/terminal-cheatsheet.md)
- [Code reference](./code-reference.md)
