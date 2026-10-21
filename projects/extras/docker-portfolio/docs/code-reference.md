# Docker portfolio: code reference

Everything you type in this project, in one place. Type it yourself; do not copy blindly.

## `Dockerfile`

Put it in `projects/extras/docker-portfolio/`, next to `site/`. The name is exactly `Dockerfile`, no extension.

```dockerfile
# Your About-me page, served by Nginx
FROM nginx:alpine

# Put the page where Nginx looks for files
COPY site/ /usr/share/nginx/html/

EXPOSE 80

# Keep Nginx in the foreground, or the container stops at once
CMD ["nginx", "-g", "daemon off;"]
```

## `.dockerignore`

```text
.git
.gitignore
README.md
docs/
.DS_Store
.env
```

## Get the page into `site/`

```bash
mkdir -p site
cp ../../01-about-me/starter/index.html ../../01-about-me/starter/style.css site/   # your own page
# or the reference page:
# cp ../../01-about-me/solution/index.html ../../01-about-me/solution/style.css site/
```

## Build and run

```bash
docker build -t portfolio:v1 .                              # make the image
docker run -d -p 8080:80 --name my-portfolio portfolio:v1   # start a container
docker ps                                                   # is it Up?
docker logs my-portfolio                                    # what did Nginx say?
docker stop my-portfolio && docker rm my-portfolio          # stop and remove
```

After a change in `site/`: build again, remove the old container, run a new one.

## Look inside

```bash
docker exec -it my-portfolio /bin/sh
ls /usr/share/nginx/html
exit
```

## Docker Hub (optional)

```bash
docker login
docker tag portfolio:v1 YOUR_DOCKERHUB_NAME/portfolio:v1
docker push YOUR_DOCKERHUB_NAME/portfolio:v1
docker pull YOUR_DOCKERHUB_NAME/portfolio:v1
```

## Optional: a health check

```dockerfile
HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1
```

Docker then marks the container "unhealthy" when Nginx stops answering.

Back to the [step-by-step guide](step-by-step.md).
