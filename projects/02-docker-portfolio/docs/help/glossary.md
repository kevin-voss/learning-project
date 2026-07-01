# Glossary — Docker Portfolio

| Term | Definition |
|------|------------|
| **Build context** | Files Docker can see during `docker build` (usually current directory) |
| **Container** | Running instance of an image |
| **Docker Compose** | Tool for multi-container apps (not required for this project) |
| **Docker Engine** | Background service that builds and runs containers |
| **Docker Hub** | Public registry for sharing images |
| **Dockerfile** | Text file with instructions to build an image |
| **Image** | Read-only template for containers |
| **Layer** | Cached result of one Dockerfile instruction |
| **Nginx** | Web server that serves HTTP files |
| **Port mapping** | `-p host:container` connects your machine to container port |
| **Registry** | Storage for images (Docker Hub is one) |
| **Shell** | Text interface to run commands (`/bin/sh` in Alpine) |
| **Static site** | HTML/CSS/JS files served as-is, no server-side rendering |
| **Tag** | Image label like `portfolio:v1` or `user/repo:1.0` |
| **Volume** | Persistent storage mounted into container (advanced) |
| **Web root** | Folder Nginx serves — `/usr/share/nginx/html` in official image |

## Dockerfile instructions

| Instruction | Meaning |
|-------------|---------|
| `FROM` | Base image |
| `COPY` | Copy files into image |
| `RUN` | Execute command at build time |
| `EXPOSE` | Document port (informational) |
| `CMD` | Default command at container start |
| `LABEL` | Metadata key=value |
| `WORKDIR` | Set working directory |
| `ENV` | Environment variable |

See [concepts.md](../concepts.md) and [Docker guide](../../../docs/docker/README.md).
