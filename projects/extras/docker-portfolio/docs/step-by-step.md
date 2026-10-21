# Docker portfolio: step by step

Six small steps. Docker works out of sight, so check each step before you go on.

**Brief:** [README](../README.md) · **Concepts:** [concepts](concepts.md) · **All code:** [code reference](code-reference.md)

## Step 1: Docker works

Install and start [Docker Desktop](https://www.docker.com/products/docker-desktop/) (the whale icon shows it is running). Read [Docker and containers](../../../../tracks/computer-science/index.html#docker-containers) if you have not yet.

```bash
cd projects/extras/docker-portfolio
docker --version
docker run hello-world
```

You should see "Hello from Docker!". If not, see [troubleshooting](help/troubleshooting.md).

## Step 2: bring your page

You already built the page in Project 1. Copy it into a `site/` folder here:

```bash
mkdir -p site
cp ../../01-about-me/starter/index.html ../../01-about-me/starter/style.css site/
ls site
```

No page of your own yet? Copy from `../../01-about-me/solution/` instead.

You should see `index.html` and `style.css`. Open `site/index.html` in the browser: it looks like your About-me page.

## Step 3: write the recipe

Create a file named `Dockerfile` (capital D, no extension) next to `site/`:

```dockerfile
FROM nginx:alpine
COPY site/ /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Create `.dockerignore` too (see [code reference](code-reference.md#dockerignore)). What each line means: [concepts](concepts.md#the-dockerfile-lines-you-use).

You should see `Dockerfile`, `.dockerignore` and `site/` when you run `ls -a`.

## Step 4: build and run

```bash
docker build -t portfolio:v1 .
docker images
docker run -d -p 8080:80 --name my-portfolio portfolio:v1
docker ps
```

Open `http://localhost:8080`.

You should see your About-me page, with colours and the centred card. `docker ps` shows `my-portfolio` as "Up".

> [!TRY]
> 1. `docker stop my-portfolio` and reload the browser: the page is gone.
> 2. `docker start my-portfolio` and reload: it is back.
> 3. `docker logs my-portfolio`: you see one line per page request.

## Step 5: look inside the box

```bash
docker exec -it my-portfolio /bin/sh
ls /usr/share/nginx/html
cat /usr/share/nginx/html/index.html
exit
```

You should see your `index.html` and `style.css` inside the container. The container has its own files, apart from your computer.

> [!TRY]
> Change the heading in `site/index.html` and reload the browser.
> You should see **no** change: the image is a snapshot. Build again, remove the old container and run a new one ([code reference](code-reference.md#build-and-run)). Now you see it.

## Step 6 (optional): share the image on Docker Hub

Make a free account on [hub.docker.com](https://hub.docker.com), then:

```bash
docker login
docker tag portfolio:v1 YOUR_DOCKERHUB_NAME/portfolio:v1
docker push YOUR_DOCKERHUB_NAME/portfolio:v1
```

You should see the image on your Docker Hub page. Test it: remove the local image, `docker pull` it, and `docker run` it again.

## Done

Check every box under "Done when" in the [README](../README.md). Clean up and save your work:

```bash
docker stop my-portfolio && docker rm my-portfolio
git add projects/extras/docker-portfolio
git commit -m "Ship my about-me page in Docker"
git push
```

> [!NOTE]
> Bonus ideas for later: a custom `nginx.conf`, Docker Compose with a volume for live reload, or a GitHub Action that builds the image on every push.

**Stuck?** [FAQ](help/faq.md) · [Troubleshooting](help/troubleshooting.md) · [Terminal cheat sheet](help/terminal-cheatsheet.md)
