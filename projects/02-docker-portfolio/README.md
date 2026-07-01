# Project 2: Dockerized Portfolio

**Introduction to containers, Nginx, and the Linux terminal.**

Take a static website (your weather dashboard or a new portfolio) and package it in Docker so it runs the same way on any machine.

## Status

This folder contains **guides only**. You create all HTML, CSS, Dockerfile, and portfolio files yourself.

## Prerequisites

- Finished [Project 1](../01-weather-dashboard/) (or any working static HTML/CSS site)
- [Getting Started](../docs/setup/getting-started.md) — Docker install when you reach Phase 1
- [Learning Roadmap](../docs/roadmap.md) — **phase order**
- [Docker](../docs/docker/README.md) — read during Project 2 Phase 1, not before Project 1

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

**Time estimate:** 6–10 hours

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
│   └── app.js              # Optional — portfolio can be static
├── images/                 # Screenshots, photos
├── Dockerfile              # ⭐ Container recipe
├── .dockerignore
├── .gitignore              # ✅ already here
└── README.md               # ✅ you are here
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
2. Open [step-by-step](./docs/step-by-step.md) — Phase 1.
3. Create Docker Hub account at [hub.docker.com](https://hub.docker.com).

## Resources

- [Docker Docs — Get Started](https://docs.docker.com/get-started/)
- [Nginx beginner guide](https://nginx.org/en/docs/beginners_guide.html)
- [Docker Hub](https://hub.docker.com)

## Previous / next

← [01 Weather Dashboard](../01-weather-dashboard/) · [03 CLI Tool](../03-cli-tool/) →
