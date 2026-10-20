# Docker — apply sheet

**Scope:** Phase 5 / Layer D. Apply only; CS holds the theory.

Docker packages your app so it runs the same on your machine and elsewhere. Use this for Project 2 (static portfolio site).

## Concepts (short)

| Term | Meaning |
|------|---------|
| **Image** | Read-only blueprint (the cookie cutter) |
| **Container** | Running instance of an image (the cookie) |
| **Port map** | `-p 8080:80` = host `8080` → container `80` |

Browser → `localhost:8080` → Docker → Nginx → your `index.html`.

## Dockerfile (static nginx site)

```dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

```bash
docker build -t portfolio:v1 .
docker run -d -p 8080:80 --name my-site portfolio:v1
# open http://localhost:8080
docker stop my-site && docker rm my-site
```

Add a `.dockerignore` with `node_modules`, `.git`, `.env`.

## Learn the theory (canonical)

Deep Docker lessons live in the CS roadmap — open that, not long duplicate notes here:

**[tracks/computer-science/index.html](../../tracks/computer-science/index.html)** — Docker / containers lessons (and Compose when you need multi-service).

[02 step-by-step](../../02-docker-portfolio/docs/step-by-step.md) · [Roadmap](../roadmap.md)
