# Terminal cheat sheet: Docker project

Commands you use in this project and later. Practice in Terminal (Mac) or PowerShell/WSL (Windows).

## Navigation

```bash
pwd                 # Print working directory — where am I?
ls                  # List files
ls -la              # List all, with details
cd folder-name      # Enter folder
cd ..               # Go up one level
cd ~                # Home directory
cd /                # Root (Linux/Mac)
clear               # Clear screen
```

## Files and folders

```bash
mkdir css           # Create folder
touch index.html    # Create empty file (or update timestamp)
cp file.txt backup.txt
mv old.txt new.txt   # Rename or move
rm file.txt          # Delete file (permanent!)
rm -rf folder        # Delete folder and contents — careful!
cat Dockerfile       # Print file contents
head -n 20 file.txt  # First 20 lines
tail -n 20 file.txt  # Last 20 lines
less file.txt        # Page through file (q to quit)
```

## Search

```bash
grep "nginx" Dockerfile
find . -name "*.html"
which docker
history              # Previous commands (↑ arrow too)
```

## System info

```bash
whoami
date
uname -a             # OS info
df -h                # Disk space
```

## Docker (this project)

```bash
docker --version
docker build -t NAME:TAG .
docker images
docker run -d -p 8080:80 --name NAME IMAGE:TAG
docker ps
docker ps -a
docker stop NAME
docker start NAME
docker rm NAME
docker logs NAME
docker logs -f NAME
docker exec -it NAME /bin/sh
docker login
docker tag LOCAL USER/repo:TAG
docker push USER/repo:TAG
docker pull USER/repo:TAG
docker system df
docker container prune
```

## Flags explained

| Flag | Command | Meaning |
|------|---------|---------|
| `-d` | `docker run -d` | Detached — run in background |
| `-p 8080:80` | `docker run -p` | Map host port 8080 → container 80 |
| `--name` | `docker run --name` | Human-readable container name |
| `-it` | `docker exec -it` | Interactive terminal |
| `-f` | `docker logs -f` | Follow log output |
| `-a` | `docker ps -a` | Show stopped containers too |
| `-t` | `docker build -t` | Tag/name the image |

## Inside Alpine container shell

When you `docker exec -it NAME /bin/sh`:

```sh
ls
ls /usr/share/nginx/html
cat /usr/share/nginx/html/index.html
exit                 # Leave container shell
```

## Practice exercise

From project folder, without looking:

1. Print current directory
2. List files including hidden
3. Build image tagged `portfolio:v1`
4. Run on port 8080 named `test-site`
5. View logs
6. Stop and remove container

## Next

Git commands are in the [git sheet](../../../../../sheets/git/README.md). Back to the [step-by-step guide](../step-by-step.md).
