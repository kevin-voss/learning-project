# Docker portfolio: concepts

Only what this project needs. The big idea (what Docker is, image vs container, why it beats "works on my machine") lives in the CS lesson [Docker and containers](../../../../tracks/computer-science/index.html#docker-containers). Read that first.

## Nginx: the waiter

> [!PICTURE]
> Nginx is a waiter. A browser asks for `index.html`, Nginx brings it from the kitchen shelf.

- The official `nginx:alpine` image is small and ready to use.
- Inside the container Nginx listens on **port 80**.
- It serves every file in `/usr/share/nginx/html`. Copy your page there and the default setup works. No config needed.

## Port mapping: the tunnel

A container is closed off. `-p 8080:80` digs a tunnel from your computer into it:

```text
Browser → localhost:8080 → Docker → container port 80 → Nginx → index.html
```

Left of the colon is **your** computer, right is the **container**. Port 8080 busy? Use `-p 9090:80` and open `localhost:9090`.

## The Dockerfile lines you use

| Line | What it does here |
|------|-------------------|
| `FROM nginx:alpine` | Start from the small official Nginx image |
| `COPY site/ /usr/share/nginx/html/` | Put your page where Nginx looks |
| `EXPOSE 80` | Note for humans: this container uses port 80 |
| `CMD ["nginx", "-g", "daemon off;"]` | Start Nginx in the foreground, so the container keeps running |

Each line adds a **layer**. Docker remembers layers, so put the lines that rarely change (`FROM`) first and your page (`COPY`) late.

## `.dockerignore`

Like `.gitignore`, but for `docker build`. It keeps `.git`, `docs/` and notes out of the image so it stays small and clean. Never ignore `site/`.

## Relative paths

Inside the container the page sits in a different folder than on your computer. So links must be **relative**: `href="style.css"`, never `C:\Users\...` or `/Users/you/...`. The About-me page already does this.

## Docker Hub

Docker Hub is to images what GitHub is to code: you `docker push` an image, others `docker pull` it. The tag says whose it is: `your-name/portfolio:v1`.

> [!CHECK]
> 1. In which folder does Nginx look for your page?
>    <details><summary>Answer</summary><code>/usr/share/nginx/html</code> inside the container.</details>
> 2. Why does the Dockerfile need <code>daemon off;</code>?
>    <details><summary>Answer</summary>A container stops when its main program ends. Normally Nginx moves itself to the background, so the container would stop at once. <code>daemon off;</code> keeps it in front.</details>

Back to the [step-by-step guide](step-by-step.md).
