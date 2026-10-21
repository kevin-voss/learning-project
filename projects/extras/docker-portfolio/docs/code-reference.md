# Code Reference — Docker Portfolio

Reference examples to read and type yourself — not pre-built project files.

---

## Dockerfile (static site + Nginx)

```dockerfile
# Static portfolio served by Nginx
FROM nginx:alpine

LABEL maintainer="you@example.com"
LABEL description="Developer portfolio"

# Optional: remove default Nginx welcome page
RUN rm /usr/share/nginx/html/index.html

# Copy site files into Nginx web root
COPY . /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

**Why `daemon off`?** Nginx normally backgrounds itself. Docker needs one foreground process or the container exits immediately.

---

## `.dockerignore`

```
.git
.gitignore
README.md
docs/
*.md
.DS_Store
Thumbs.db
node_modules
.env
.env.local
Dockerfile.*
docker-compose*.yml
```

---

## Build and run commands

```bash
# Build (from folder containing Dockerfile)
docker build -t portfolio:v1 .

# Run detached, name container, map port
docker run -d -p 8080:80 --name my-portfolio portfolio:v1

# Follow logs
docker logs -f my-portfolio

# Stop and remove
docker stop my-portfolio
docker rm my-portfolio

# Rebuild after HTML/CSS changes
docker build -t portfolio:v1 .
docker stop my-portfolio && docker rm my-portfolio
docker run -d -p 8080:80 --name my-portfolio portfolio:v1
```

Every code change requires **rebuild** unless you use volumes (advanced).

---

## Docker Hub workflow

```bash
docker login

# Tag: username/repository:version
docker tag portfolio:v1 johndoe/portfolio:v1

docker push johndoe/portfolio:v1

# Someone else (or you on another machine):
docker pull johndoe/portfolio:v1
docker run -d -p 8080:80 johndoe/portfolio:v1
```

---

## Portfolio HTML outline (structure only)

Plan sections — style your own way:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Name — Developer</title>
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>
  <header>
    <h1>Your Name</h1>
    <p>Frontend Developer · Learning JavaScript</p>
  </header>

  <main>
    <section id="about">
      <h2>About</h2>
      <p>Short bio...</p>
    </section>

    <section id="projects">
      <h2>Projects</h2>
      <article class="project-card">
        <h3>Weather Dashboard</h3>
        <p>APIs, fetch, async/await</p>
        <a href="https://github.com/you/weather-dashboard">GitHub</a>
      </article>
      <!-- More cards -->
    </section>

    <section id="contact">
      <h2>Contact</h2>
      <p>GitHub: <a href="https://github.com/you">@you</a></p>
    </section>
  </main>

  <footer>
    <p>Built with HTML, CSS, and Docker</p>
  </footer>

  <!-- Optional -->
  <script src="js/app.js"></script>
</body>
</html>
```

---

## Optional HEALTHCHECK (advanced)

```dockerfile
HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1
```

Docker marks container unhealthy if Nginx stops responding.

---

## Next

- [Step-by-step plan](./step-by-step.md)
- [Terminal cheat sheet](./help/terminal-cheatsheet.md)
