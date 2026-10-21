# Extra: ship your About-me page in Docker

Take the About-me page from [Project 1](../../01-about-me/README.md) and run it inside a Docker container with the Nginx web server. Then it runs the same way on every computer.

> [!PICTURE]
> Your web page is a toy. Docker is a shipping box. You pack the toy **and** everything it needs (a small web server) into the box once. Any computer with Docker can open the box and play, and nothing gets lost on the way.

## What you build

- A `site/` folder with your About-me page (your own from Project 1, or its [solution](../../01-about-me/solution/)).
- A `Dockerfile`: the recipe that packs the page and Nginx into an **image**.
- A running **container** you open at `http://localhost:8080`.
- Optional: your image on Docker Hub, so anyone can `docker pull` it.

## What you need to know

- [Docker and containers](../../../tracks/computer-science/index.html#docker-containers): the idea (image vs container, why Docker)
- Docker Desktop installed: see [Get set up](../../../sheets/setup/README.md)
- A few terminal commands: [terminal cheat sheet](docs/help/terminal-cheatsheet.md)

A word you do not know? Look it up in the [glossary](../../../sheets/start/glossary.md).

## How this folder works

| File | What it is for |
|------|----------------|
| [docs/step-by-step.md](docs/step-by-step.md) | **The build guide.** Small steps, each ends with "You should see …" |
| [docs/concepts.md](docs/concepts.md) | Nginx, ports, Dockerfile lines, `.dockerignore`, Docker Hub |
| [docs/code-reference.md](docs/code-reference.md) | The Dockerfile, `.dockerignore` and all commands in one place |
| [docs/help/faq.md](docs/help/faq.md) · [troubleshooting](docs/help/troubleshooting.md) · [terminal cheat sheet](docs/help/terminal-cheatsheet.md) | When you are stuck |

When you are done, this folder holds:

```text
extras/docker-portfolio/
├── site/            ← a copy of your About-me page
│   ├── index.html
│   └── style.css
├── Dockerfile       ← the recipe
├── .dockerignore    ← what Docker must not pack
├── .gitignore       ← already here
├── README.md
└── docs/
```

## Done when

- [ ] `docker run hello-world` works.
- [ ] `docker build -t portfolio:v1 .` finishes without errors.
- [ ] `http://localhost:8080` shows your About-me page, with its CSS.
- [ ] You can stop, start and remove the container.
- [ ] You can list the files inside the container with `docker exec`.
- [ ] Your `Dockerfile`, `.dockerignore` and `site/` are committed on your branch.

> [!CHECK]
> 1. What is the difference between an image and a container?
>    <details><summary>Answer</summary>The image is the packed box (a read-only recipe result). A container is one running copy made from it. One image can start many containers.</details>
> 2. What does <code>-p 8080:80</code> mean?
>    <details><summary>Answer</summary>Port 8080 on your computer leads to port 80 inside the container, where Nginx listens.</details>
> 3. You changed <code>style.css</code>. Why does the page in the container stay the same?
>    <details><summary>Answer</summary>The image is a snapshot from build time. Build the image again and start a new container.</details>

## Next

Start the [step-by-step guide](docs/step-by-step.md). Docker comes back for real on the path when you run Postgres in a container in [Project 11: parcel database](../../11-parcel-database/README.md).
