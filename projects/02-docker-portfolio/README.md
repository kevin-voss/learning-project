# Project 2: Dockerized Portfolio

**Containers, Nginx, and shipping a static site the same way on any machine.**

Take a static website (your [00 about-me page](../00-static-page/), weather dashboard, or a new portfolio) and package it in Docker.

> **Scope**
>
> | | |
> |---|---|
> | **Phase / Layer** | Phase 5 · Layer D infra practice |
> | **Hours** | about 6–10 |
> | **Java path** | Supports Layer D (Docker for Postgres and later the app). Do after Gate C, or alongside Postgres Docker learning. Can reuse the site from project 00. |

## Status

This folder contains **guides only**. You create all HTML, CSS, Dockerfile, and portfolio files yourself.

## Where this sits

[Learning path - Phase 5 (Docker apply)](../../docs/LEARNING_PATH.md#phase-5--docker-apply-static-site)

Also listed under [Layer D](../../docs/LEARNING_PATH.md#layer-d--how-a-server-is-structured-still-foundation) as Docker practice.

## Prerequisites

- A working static HTML/CSS site (project [00](../00-static-page/) is enough; [01](../01-weather-dashboard/) also works)
- [Getting Started](../docs/setup/getting-started.md) - Docker install
- [Docker sheet](../docs/docker/README.md) - read during this project, not as a second course before Java
- CS Docker intro from Phase 1 if you skimmed it

## What you'll build

| Feature | Skill learned |
|---------|---------------|
| Static portfolio site | HTML/CSS structure, relative paths |
| Dockerfile | Image recipes, layers, COPY, EXPOSE |
| Nginx container | Web servers, port 80 |
| Port mapping | `-p 8080:80`, localhost access |
| `.dockerignore` | Keep images small and secure |
| Docker Hub push | Share images like GitHub for code |
| Linux terminal | `ls`, `cd`, `cat`, navigation |

## Goal in plain words

You will make a normal website, then put it inside a Docker container.

Kid version: the website is a toy, and Docker is the box that lets you carry the toy to another computer without losing pieces.

## Documentation map

| Doc | Read when |
|-----|-----------|
| [Concepts](./docs/concepts.md) | Docker, images, containers, Nginx, ports |
| [Project structure](./docs/structure.md) | Folders and files YOU will create |
| [Step-by-step plan](./docs/step-by-step.md) | **Main build guide** |
| [Code reference](./docs/code-reference.md) | Dockerfile and command examples |
| [Help: FAQ](./docs/help/faq.md) | Quick answers |
| [Help: Troubleshooting](./docs/help/troubleshooting.md) | When Docker misbehaves |
| [Help: Glossary](./docs/help/glossary.md) | Term definitions |
| [Terminal cheat sheet](./docs/help/terminal-cheatsheet.md) | Linux commands for this project |

## Files you will create

```
02-docker-portfolio/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── app.js              # Optional - portfolio can be static
├── images/                 # Screenshots, photos
├── Dockerfile              # Container recipe
├── .dockerignore
├── .gitignore              # already here
└── README.md               # you are here
```

Do **not** create these until [step-by-step](./docs/step-by-step.md) tells you to.

## Learning goals

When finished, you can explain:

- Why Docker solves "works on my machine"
- Difference between **image** and **container**
- What each line in a basic Dockerfile does
- How port mapping connects container to browser
- How Nginx serves static files

## Quick start

From the repo root:

```bash
cd projects/02-docker-portfolio
pwd
docker --version
docker run hello-world
```

Then:

1. Read [concepts](./docs/concepts.md) (30 min).
2. Open [step-by-step](./docs/step-by-step.md) - Phase 1.
3. Create Docker Hub account at [hub.docker.com](https://hub.docker.com).

## Resources

- [Docker Docs - Get Started](https://docs.docker.com/get-started/)
- [Nginx beginner guide](https://nginx.org/en/docs/beginners_guide.html)
- [Docker Hub](https://hub.docker.com)

## Next

Site or Postgres runs in Docker → finish Layer D (JDBC, server layers), then [todo-e2e](../../apps/todo-e2e/). Optional web depth later: [Phase 6](../../docs/LEARNING_PATH.md#phase-6--optional-web-depth-node--react--ts).
