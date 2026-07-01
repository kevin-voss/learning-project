# Troubleshooting — Docker Portfolio

## Docker won't run

### `Cannot connect to the Docker daemon`

Docker Desktop isn't running. Start the app and wait until it says "Running".

### `docker: command not found`

Install Docker Desktop and restart terminal.

---

## Build failures

### `failed to solve: failed to read dockerfile`

- File must be named `Dockerfile` exactly (capital D)
- Run `docker build` from the folder containing it

### `COPY failed: file not found`

- Paths in COPY are relative to build context (usually `.`)
- File must exist and not be in `.dockerignore`

---

## Run failures

### Container exits immediately

```bash
docker ps -a    # STATUS: Exited
docker logs CONTAINER_NAME
```

Common causes:

- Missing `CMD ["nginx", "-g", "daemon off;"]`
- Nginx config error (rare with default setup)

### Blank page at localhost:8080

1. `docker ps` — is container running?
2. Correct port? `-p 8080:80` → use 8080 in browser
3. `docker exec -it NAME /bin/sh` → `ls /usr/share/nginx/html`
4. Is `index.html` present?

### CSS/images broken inside container but fine in Live Server

- Wrong paths (absolute vs relative)
- Case sensitivity: `Styles.css` vs `styles.css` breaks on Linux inside container
- Files excluded by `.dockerignore` by mistake

---

## Port conflicts

### `Bind for 0.0.0.0:8080 failed: port is already allocated`

Something else uses 8080. Pick another:

```bash
docker run -d -p 3000:80 portfolio:v1
```

Find what's using a port (Mac):

```bash
lsof -i :8080
```

---

## Docker Hub

### `denied: requested access to the resource is denied`

- Run `docker login`
- Tag must include your username: `yourname/portfolio:v1`
- Repository name must match (create on hub.docker.com if needed)

### Push is slow

Normal for first push — layers upload once; later pushes are incremental.

---

## Cleanup

Disk full from old images:

```bash
docker system df
docker container prune
docker image prune
# Nuclear option (removes unused everything):
docker system prune -a
```

---

## Getting help

Include output of:

```bash
docker --version
docker ps -a
docker logs CONTAINER_NAME
```

See [FAQ](./faq.md) and [concepts](../concepts.md).
