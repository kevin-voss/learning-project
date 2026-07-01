# FAQ — Docker Portfolio

## Do I need to know Linux?

Basic commands help (`cd`, `ls`, `pwd`). This project includes a [terminal cheat sheet](./terminal-cheatsheet.md). You don't need to be a sysadmin.

## Can I dockerize my weather app instead of a portfolio?

Yes. Any static HTML/CSS/JS site works. A portfolio is recommended so you have something to show employers.

## Why Nginx instead of Node?

Static files don't need Node at runtime. Nginx is tiny, fast, and the standard choice for HTML/CSS/JS in production.

## Docker Desktop won't start

- Mac: check System Settings → Privacy — allow Docker
- Ensure virtualization is enabled (Windows: WSL2)
- Restart computer after install
- See [troubleshooting](./troubleshooting.md)

## Port 8080 already in use

Use another host port:

```bash
docker run -d -p 9090:80 portfolio:v1
# Visit http://localhost:9090
```

## Do I commit the Dockerfile to Git?

**Yes.** Dockerfile and source code go on GitHub. The **built image** goes on Docker Hub (optional but recommended).

## What's the difference between GitHub and Docker Hub?

| | GitHub | Docker Hub |
|---|--------|------------|
| Stores | Source code | Built container images |
| Clone/pull | `git clone` | `docker pull` |
| This project | HTML, Dockerfile | Runnable image |

## After changing HTML, why doesn't the container update?

Containers use a **snapshot** from build time. Rebuild:

```bash
docker build -t portfolio:v1 .
docker stop my-portfolio && docker rm my-portfolio
docker run -d -p 8080:80 --name my-portfolio portfolio:v1
```

## Is Docker required for frontend jobs?

Not always, but understanding containers is expected at many companies. This project builds real DevOps literacy.
