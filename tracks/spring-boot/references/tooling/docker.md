# Docker

> [!PICTURE]
> An image is a cake recipe in a sealed box. A container is one cake you baked from it. You can bake many cakes from one recipe, and throw a cake away without losing the recipe.

Docker is taught in one place. This page only points you there.

| You want | Read |
|---|---|
| What images, containers, ports and volumes are | CS lesson [Docker and containers](../../../computer-science/index.html#docker-containers) |
| Several containers started together | CS lesson [Docker Compose](../../../computer-science/index.html#docker-compose) |
| A Docker image for a Spring Boot app | [Step 09: Docker](../../topics/09-docker/README.md) |
| The ParcelPilot Dockerfile, one line at a time | [The Dockerfile, line by line](../../topics/09-docker/dockerfile-line-by-line.md) |
| A container that will not start | [Troubleshooting Docker](../../topics/09-docker/troubleshooting-docker.md) |
| The whole ParcelPilot system in one file | [Step 14: Docker Compose](../../topics/14-compose-and-observe/README.md) |

## Commands you use most

```bash
docker build -t parcelpilot-api:dev .              # recipe -> image
docker run --rm -p 8080:8080 parcelpilot-api:dev   # image -> running container
docker ps                                          # what is running?
docker logs <container>                            # what did it print?
docker stop <container>                            # stop it
```

> [!NOTE]
> Inside a Compose network, containers reach each other by service name (`db`, `rabbitmq`), not by `localhost`.
