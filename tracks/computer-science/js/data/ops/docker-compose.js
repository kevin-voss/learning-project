window.DS = window.DS || {};
DS.curriculum = DS.curriculum || [];

DS.curriculum.push(
  {
    id: 'docker-compose',
    category: 'More: DevOps',
    title: 'Docker Compose and Container Networking',
    icon: 'fa-diagram-project',
    subtitle: 'Run multi-container apps locally with one file that defines services, ports, volumes, and networks.',
    analogy: 'Docker Compose is like a stage manager for a play. Each actor is a container. Compose tells everyone when to enter, which door to use, what props to share, and how they talk to each other backstage.',
    demoType: 'docker-compose',
    demoTitle: 'Compose stack runner',
    demoHint: 'Start a frontend, backend, and database stack. Watch ports, volumes, and networks connect.',
    checklist: [
      'Explain why Compose exists for multi-container apps.',
      'Read a docker-compose.yml with services, ports, volumes, and environment variables.',
      'Describe how container networks let services talk by name.',
      'Name common Compose commands for up, logs, and exec.',
    ],
    subPages: [
      {
        id: 'why-compose',
        label: 'Why Compose Exists',
        title: 'Why Compose Exists',
        body: 'One Dockerfile runs one container well. Real apps often need several: a web UI, an API, a database, maybe Redis. Without Compose, developers run many docker commands by hand and must remember port mappings, env vars, and startup order. Compose turns that into one repeatable file and one command.',
        realWorldExample: {
          title: 'Local full-stack development',
          desc: 'A team runs a React frontend, Node API, and Postgres database together. Instead of three terminals and copied commands, they run docker compose up and get the same stack every time.',
        },
        mermaidDiagram: `flowchart LR
  Dev[Developer laptop] --> Compose[docker compose up]
  Compose --> FE[Frontend container]
  Compose --> API[Backend container]
  Compose --> DB[Database container]
  FE --> API
  API --> DB`,
        codeTitle: 'Without vs With Compose',
        codeLanguage: 'Shell',
        codeText: `# Manual approach (easy to get wrong)
docker run -d --name db -e POSTGRES_PASSWORD=secret postgres:16
docker run -d --name api -p 3000:3000 --link db api:1.0
docker run -d --name web -p 5173:5173 web:1.0

# Compose approach
docker compose up`,
      },
      {
        id: 'services',
        label: 'Services',
        title: 'Services',
        body: 'In Compose, a service is one logical piece of your app: usually one container image plus its settings. A compose file lists each service by name. Those names become hostnames on the default network.',
        realWorldExample: {
          title: 'Naming services for clarity',
          desc: 'A compose file defines services named web, api, and db. Developers and code can refer to http://api:3000 instead of guessing container IDs.',
        },
        mermaidDiagram: `flowchart TB
  subgraph compose [docker-compose.yml]
    S1[service: web]
    S2[service: api]
    S3[service: db]
  end
  S1 --> C1[web container]
  S2 --> C2[api container]
  S3 --> C3[db container]`,
        codeTitle: 'Service Definitions',
        codeLanguage: 'YAML',
        codeText: `services:
  web:
    build: ./frontend
  api:
    build: ./backend
  db:
    image: postgres:16`,
      },
      {
        id: 'ports',
        label: 'Ports',
        title: 'Ports',
        body: 'Port mappings publish a container port to your machine. Format is host:container. Inside the compose network, services talk on internal ports. You map ports when a human or browser on the host needs access.',
        realWorldExample: {
          title: 'Browser to API',
          desc: 'The API listens on port 3000 inside its container. Compose maps 3000:3000 so curl http://localhost:3000/health works from the laptop while other containers use http://api:3000.',
        },
        mermaidDiagram: `flowchart LR
  Browser[Browser on host] -->|localhost:5173| Web[web:5173]
  Browser -->|localhost:3000| API[api:3000]
  API -->|api:5432 internal| DB[db:5432]`,
        codeTitle: 'Port Mapping',
        codeLanguage: 'YAML',
        codeText: `services:
  web:
    ports:
      - "5173:5173"
  api:
    ports:
      - "3000:3000"
  db:
    ports:
      - "5432:5432"`,
      },
      {
        id: 'volumes',
        label: 'Volumes',
        title: 'Volumes',
        body: 'Containers are ephemeral: delete the container and its writable layer is gone. Volumes persist data outside the container lifecycle. Bind mounts can also map a host folder into a container for live code edits during development.',
        realWorldExample: {
          title: 'Database data survives restart',
          desc: 'Postgres stores files in a named volume db_data. docker compose down stops containers but keeps the volume. The next docker compose up finds the same data.',
        },
        mermaidDiagram: `flowchart LR
  DB[db container] --> V[(volume: db_data)]
  V --> Disk[Host disk]
  API[api container] --> Bind[bind mount ./backend:/app]`,
        codeTitle: 'Volumes and Bind Mounts',
        codeLanguage: 'YAML',
        codeText: `services:
  db:
    volumes:
      - db_data:/var/lib/postgresql/data
  api:
    volumes:
      - ./backend:/app

volumes:
  db_data:`,
      },
      {
        id: 'environment-variables',
        label: 'Environment Variables',
        title: 'Environment Variables',
        body: 'Environment variables configure containers without rebuilding images: database URLs, API keys, feature flags, and ports. Compose can set them inline, load them from an env file, or reference secrets in production platforms.',
        realWorldExample: {
          title: 'Pointing the API at Postgres',
          desc: 'The API container gets DATABASE_URL=postgres://postgres:secret@db:5432/app. The hostname db works because Compose provides DNS between services.',
        },
        mermaidDiagram: `flowchart LR
  Env[.env file] --> Compose[Compose]
  Compose --> API[api env vars]
  Compose --> DB[db env vars]
  API -->|DATABASE_URL| DB`,
        codeTitle: 'Environment Configuration',
        codeLanguage: 'YAML',
        codeText: `services:
  api:
    environment:
      DATABASE_URL: postgres://postgres:secret@db:5432/app
      NODE_ENV: development
  db:
    environment:
      POSTGRES_PASSWORD: secret
      POSTGRES_DB: app`,
      },
      {
        id: 'container-networks',
        label: 'Container Networks',
        title: 'Container Networks',
        body: 'Compose creates a default network so services on the same project can reach each other by service name. Custom networks isolate groups of containers or mimic production topology in advanced setups.',
        realWorldExample: {
          title: 'Internal-only database',
          desc: 'Only api joins the backend network with db. The web container reaches the API through published ports, not direct database access: a safer default for beginners.',
        },
        mermaidDiagram: `flowchart TB
  subgraph frontend_net [frontend network]
    Web[web]
  end
  subgraph backend_net [backend network]
    API[api]
    DB[db]
  end
  Web -->|http://api:3000| API
  API --> DB`,
        codeTitle: 'Custom Networks',
        codeLanguage: 'YAML',
        codeText: `services:
  web:
    networks: [frontend]
  api:
    networks: [frontend, backend]
  db:
    networks: [backend]

networks:
  frontend:
  backend:`,
      },
      {
        id: 'depends-on',
        label: 'depends_on',
        title: 'depends_on',
        body: 'depends_on controls startup order. It waits for a container to start, not for a database to be ready to accept connections. For real readiness, apps retry connections or use health checks.',
        realWorldExample: {
          title: 'API starts after database container',
          desc: 'Compose starts db before api because api lists depends_on: [db]. The API still should retry if Postgres is not accepting connections yet.',
        },
        mermaidDiagram: `sequenceDiagram
  participant Compose
  participant DB as db
  participant API as api
  Compose->>DB: start container
  Compose->>API: start after db container exists
  API->>DB: retry connection until ready`,
        codeTitle: 'depends_on Example',
        codeLanguage: 'YAML',
        codeText: `services:
  api:
    depends_on:
      - db
  db:
    image: postgres:16`,
      },
      {
        id: 'logs-exec',
        label: 'Logs and Exec',
        title: 'Logs and Exec',
        body: 'docker compose logs shows stdout/stderr from services: essential for debugging. docker compose exec opens a shell or command inside a running container, like connecting to psql inside db.',
        realWorldExample: {
          title: 'Debugging a failed migration',
          desc: 'The API crashes on boot. docker compose logs api shows the stack trace. docker compose exec db psql -U postgres helps verify tables exist.',
        },
        mermaidDiagram: `flowchart LR
  Dev[Developer] --> Logs[compose logs api]
  Dev --> Exec[compose exec db]
  Logs --> Output[Container stdout]
  Exec --> Shell[Shell inside db]`,
        codeTitle: 'Logs and Exec Commands',
        codeLanguage: 'Shell',
        codeText: `docker compose logs -f api
docker compose logs --tail=50 db
docker compose exec db psql -U postgres -d app
docker compose exec api sh`,
      },
      {
        id: 'common-commands',
        label: 'Common Commands',
        title: 'Common Commands',
        body: 'Most daily Compose work is a small set of commands: up to start, down to stop, ps to list, logs to debug, exec to inspect, and build to rebuild images after Dockerfile changes.',
        realWorldExample: {
          title: 'Morning startup ritual',
          desc: 'A developer runs docker compose up -d, checks docker compose ps, tails docker compose logs -f api, and uses docker compose down when switching branches.',
        },
        mermaidDiagram: `flowchart TD
  A[docker compose up] --> B[Running stack]
  B --> C[docker compose ps]
  B --> D[docker compose logs]
  B --> E[docker compose exec]
  B --> F[docker compose down]`,
        codeTitle: 'Command Cheat Sheet',
        codeLanguage: 'Shell',
        codeText: `docker compose up -d
docker compose ps
docker compose logs -f api
docker compose restart api
docker compose build api
docker compose down
docker compose down -v`,
      },
      {
        id: 'full-example',
        label: 'Compose Example: frontend/backend/database',
        title: 'Compose Example: frontend/backend/database',
        body: 'This full example ties the pieces together: three services, published ports for the browser, a persistent database volume, env vars, internal networking, and startup order.',
        realWorldExample: {
          title: 'Todo app local stack',
          desc: 'A React frontend on port 5173 talks to an Express API on 3000, which reads and writes Postgres on 5432. One compose file lets every teammate run the same stack.',
        },
        mermaidDiagram: `flowchart LR
  User[Browser] -->|5173| Web[web]
  Web -->|api:3000| API[api]
  API -->|db:5432| DB[(db + volume)]`,
        codeTitle: 'Full docker-compose.yml',
        codeLanguage: 'YAML',
        codeText: `services:
  web:
    build: ./frontend
    ports:
      - "5173:5173"
    depends_on:
      - api

  api:
    build: ./backend
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgres://postgres:secret@db:5432/todos
    depends_on:
      - db

  db:
    image: postgres:16
    environment:
      POSTGRES_PASSWORD: secret
      POSTGRES_DB: todos
    volumes:
      - db_data:/var/lib/postgresql/data

volumes:
  db_data:`,
      },
    ],
  },
);
