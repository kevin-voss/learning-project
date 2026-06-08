window.DS = window.DS || {};
DS.curriculum = DS.curriculum || [];

const deploymentDevOpsLessons = [
  {
    id: 'docker-compose',
    category: 'Deployment & DevOps',
    title: 'Docker Compose and Container Networking',
    icon: 'fa-diagram-project',
    number: '28',
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
  {
    id: 'observability',
    category: 'Deployment & DevOps',
    title: 'Observability: Logs, Metrics, and Traces',
    icon: 'fa-chart-line',
    number: '29',
    subtitle: 'See what production is doing through logs, metrics, traces, dashboards, and alerts.',
    analogy: 'Observability is like hospital monitors. Logs are nurse notes, metrics are heart rate and temperature, traces follow one patient through every department, and alerts ring when numbers cross danger lines.',
    demoType: 'observability',
    demoTitle: 'Request observability flow',
    demoHint: 'Send a request through the stack and watch logs, metrics, traces, and an alert appear.',
    checklist: [
      'Explain logs vs metrics vs traces.',
      'Describe what a dashboard and alert are for.',
      'Name one SLO example and why it matters.',
      'Describe a simple incident response flow.',
    ],
    subPages: [
      {
        id: 'why-observability',
        label: 'Why Observability Exists',
        title: 'Why Observability Exists',
        body: 'Users only report some problems. Observability helps teams answer unknown questions in production: What failed? For whom? When did it start? Which dependency slowed down? Without signals, debugging live systems is guesswork.',
        realWorldExample: {
          title: 'Checkout errors spike',
          desc: 'Support hears "payment failed" from a few users. Metrics show error rate jumped 20 minutes ago. Logs reveal a timeout to the payment API. Traces show the slow call started after a deploy.',
        },
        mermaidDiagram: `flowchart LR
  Users[Users] --> App[Production app]
  App --> Logs[Logs]
  App --> Metrics[Metrics]
  App --> Traces[Traces]
  Logs --> Team[On-call engineer]
  Metrics --> Team
  Traces --> Team`,
        codeTitle: 'Three Pillars Overview',
        codeLanguage: 'Text',
        codeText: `Logs     -> discrete events with context
Metrics  -> numbers over time (rates, latency, CPU)
Traces   -> one request's path across services`,
      },
      {
        id: 'logs',
        label: 'Logs',
        title: 'Logs',
        body: 'Logs are timestamped records of what happened: requests, errors, startup messages, and business events. Structured logs (JSON fields) are easier to search than plain strings.',
        realWorldExample: {
          title: 'Finding the failing user',
          desc: 'A JSON log line includes level, requestId, userId, route, and status. Searching requestId groups every log from one checkout attempt.',
        },
        mermaidDiagram: `sequenceDiagram
  participant API
  participant Log as Log store
  API->>Log: info checkout_started order=881
  API->>Log: error payment_timeout order=881
  API->>Log: info checkout_failed order=881`,
        codeTitle: 'Structured Log Example',
        codeLanguage: 'JSON',
        codeText: `{
  "level": "error",
  "time": "2026-06-08T14:02:11Z",
  "requestId": "req_9f2a",
  "route": "POST /checkout",
  "status": 504,
  "message": "payment provider timeout"
}`,
      },
      {
        id: 'metrics',
        label: 'Metrics',
        title: 'Metrics',
        body: 'Metrics are numeric measurements aggregated over time: request count, error rate, latency percentiles, CPU, memory, and queue depth. They excel at trends, capacity planning, and alerting.',
        realWorldExample: {
          title: 'Latency regression after deploy',
          desc: 'A dashboard shows p95 latency doubled after version 2.4 shipped. The team rolls back while investigating a slower database query.',
        },
        mermaidDiagram: `flowchart LR
  App[App] -->|counter| Prom[Metrics backend]
  Prom --> Dash[Dashboard]
  Dash --> Alert[Alert rule]`,
        codeTitle: 'Metric Examples',
        codeLanguage: 'Text',
        codeText: `http_requests_total{route="/api/tasks",status="200"} 1842
http_requests_total{route="/api/tasks",status="500"} 12
http_request_duration_seconds_p95 0.48
process_cpu_usage 0.62`,
      },
      {
        id: 'traces',
        label: 'Traces',
        title: 'Traces',
        body: 'A trace follows one request across services. Each step is a span with timing and metadata. Traces explain which hop in a chain caused slowness or failure.',
        realWorldExample: {
          title: 'Slow profile page',
          desc: 'A trace shows the browser request took 900ms because the API spent 700ms waiting on a database query, not because of frontend rendering.',
        },
        mermaidDiagram: `flowchart LR
  Root[GET /profile 900ms]
  Root --> API[api handler 50ms]
  API --> DB[db query 700ms]
  API --> Cache[cache miss 120ms]`,
        codeTitle: 'Trace Span Shape',
        codeLanguage: 'JSON',
        codeText: `{
  "traceId": "tr_abc123",
  "spans": [
    { "name": "GET /profile", "durationMs": 900 },
    { "name": "api.getProfile", "durationMs": 50 },
    { "name": "db.selectUser", "durationMs": 700 }
  ]
}`,
      },
      {
        id: 'dashboards',
        label: 'Dashboards',
        title: 'Dashboards',
        body: 'Dashboards combine metrics (and sometimes logs) into charts humans can scan quickly: error rate, traffic, latency, saturation, and business KPIs. Good dashboards answer "Is the system healthy right now?"',
        realWorldExample: {
          title: 'Release night watch',
          desc: 'During a deploy, the team watches dashboards for error rate, p95 latency, and active users. A green dashboard builds confidence. Red charts trigger investigation.',
        },
        mermaidDiagram: `flowchart TB
  Metrics[Metrics store] --> Panel1[Error rate chart]
  Metrics --> Panel2[Latency chart]
  Metrics --> Panel3[CPU / memory]
  Panel1 --> Dash[Operations dashboard]`,
        codeTitle: 'Starter Dashboard Panels',
        codeLanguage: 'Text',
        codeText: `Panel 1: Error rate (5xx / total)
Panel 2: Request rate (requests per second)
Panel 3: p50 / p95 latency
Panel 4: Database connection pool usage`,
      },
      {
        id: 'alerts',
        label: 'Alerts',
        title: 'Alerts',
        body: 'Alerts turn metric thresholds or log patterns into pages or notifications. They should mean "a human should act soon," not "something happened." Pair alerts with runbooks so responders know what to check first.',
        realWorldExample: {
          title: 'Error budget burn',
          desc: 'An alert fires when 5xx errors exceed 2% for ten minutes. PagerDuty notifies the on-call engineer with a link to the dashboard and runbook.',
        },
        mermaidDiagram: `flowchart LR
  Metric[Error rate metric] --> Rule[Alert rule > 2% for 10m]
  Rule --> Page[On-call page]
  Page --> Human[Engineer investigates]`,
        codeTitle: 'Alert Rule Sketch',
        codeLanguage: 'YAML',
        codeText: `alert: HighErrorRate
expr: rate(http_requests_total{status=~"5.."}[5m])
      / rate(http_requests_total[5m]) > 0.02
for: 10m
labels:
  severity: page`,
      },
      {
        id: 'slo-basics',
        label: 'SLO Basics',
        title: 'SLO Basics',
        body: 'An SLO (Service Level Objective) is a target for reliability or performance, such as 99.9% successful requests per month. An error budget is how much failure you can afford before pausing risky changes.',
        realWorldExample: {
          title: 'Monthly availability target',
          desc: 'A team sets an SLO of 99.9% successful logins. If too many errors burn the budget, feature freezes until reliability improves.',
        },
        mermaidDiagram: `flowchart LR
  SLO[SLO 99.9% success] --> Budget[Error budget]
  Budget --> Release[Ship features]
  Budget --> Freeze[Pause risky releases]`,
        codeTitle: 'SLO Example',
        codeLanguage: 'Text',
        codeText: `SLO: 99.9% of login requests succeed per 30 days
Error budget: 0.1% failures allowed (~43 minutes/month at constant traffic)
Action: if budget < 10%, freeze deploys and fix reliability`,
      },
      {
        id: 'incident-response',
        label: 'Incident Response',
        title: 'Incident Response',
        body: 'Incident response is the structured way teams handle outages: detect, triage, mitigate, communicate, fix root cause, and learn. The first goal is restore service. Deep fixes can follow.',
        realWorldExample: {
          title: 'API outage playbook',
          desc: 'Alerts fire. An incident commander coordinates. One engineer rolls back the deploy while another checks database connectivity and posts status updates.',
        },
        mermaidDiagram: `flowchart TD
  Detect[Alert or report] --> Triage[Assess impact]
  Triage --> Mitigate[Rollback / scale / failover]
  Mitigate --> Communicate[Status updates]
  Communicate --> Fix[Root cause fix]
  Fix --> Review[Post-incident review]`,
        codeTitle: 'Incident Roles',
        codeLanguage: 'Text',
        codeText: `Incident commander -> coordinates timeline
Communications lead -> updates stakeholders
Investigators -> logs, metrics, traces, deploys
Scribe -> records actions and timestamps`,
      },
      {
        id: 'debugging-production',
        label: 'Debugging Production',
        title: 'Debugging Production',
        body: 'Production debugging usually moves from broad to narrow: check dashboards, scan recent deploys, search logs by requestId, open a trace, reproduce in staging, then patch. Change one variable at a time.',
        realWorldExample: {
          title: '404 on new endpoint',
          desc: 'Metrics show 404s climbing on /api/v2/tasks. Logs include requestId and route. Git history shows the route was renamed in the latest deploy but the gateway config was not updated.',
        },
        mermaidDiagram: `flowchart LR
  A[Dashboard anomaly] --> B[Recent deploy?]
  B --> C[Search logs]
  C --> D[Trace slow span]
  D --> E[Fix and verify]`,
        codeTitle: 'Debugging Checklist',
        codeLanguage: 'Text',
        codeText: `1. What changed recently (deploy, config, traffic)?
2. Is it all users or one region?
3. Logs: errors, requestId, userId
4. Traces: which dependency is slow?
5. Mitigate first, root-cause second`,
      },
      {
        id: 'alert-fatigue',
        label: 'Avoiding Alert Fatigue',
        title: 'Avoiding Alert Fatigue',
        body: 'Alert fatigue happens when everything pages and nothing feels urgent. Fix it by alerting on user-impacting symptoms, adding `for` delays, tuning thresholds, and deleting noisy alerts that lack action.',
        realWorldExample: {
          title: 'CPU alert ignored',
          desc: 'A CPU > 70% alert pages every afternoon during batch jobs. Engineers start ignoring all pages. The team replaces it with a latency SLO alert that only fires when users are affected.',
        },
        mermaidDiagram: `flowchart LR
  Noisy[Noisy alerts] --> Ignore[Team ignores pages]
  Ignore --> Miss[Real outage missed]
  Symptom[User-facing SLO alerts] --> Trust[Team trusts pages]`,
        codeTitle: 'Alert Hygiene Rules',
        codeLanguage: 'Text',
        codeText: `Alert on symptoms users feel (errors, latency)
Require sustained duration (for: 10m)
Every alert links to a runbook
Delete alerts with no action in 90 days
Weekly review: which alerts fired but needed no action?`,
      },
    ],
  },
  {
    id: 'cloud-hosting',
    category: 'Deployment & DevOps',
    title: 'Cloud Hosting Basics',
    icon: 'fa-cloud',
    number: '30',
    subtitle: 'Understand the building blocks teams use to run web apps in the cloud: compute, networking, storage, and safe releases.',
    analogy: 'Cloud hosting is like renting a furnished office building instead of buying land and pouring concrete. You choose office size, security, mail room, storage lockers, and how fast you can move desks when you grow.',
    demoType: 'cloud-hosting',
    demoTitle: 'Deployment model tradeoffs',
    demoHint: 'Compare VM, container, and serverless options and see cost, scale, and operations tradeoffs.',
    checklist: [
      'Compare VM, container, and serverless hosting.',
      'Explain regions, load balancers, CDN, and object storage at a high level.',
      'Describe managed databases, queues, secrets, and TLS basics.',
      'Name rollback, blue/green, and canary release ideas.',
    ],
    subPages: [
      {
        id: 'vm-container-serverless',
        label: 'VM vs Container vs Serverless',
        title: 'VM vs Container vs Serverless',
        body: 'VMs give full machines you manage. Containers package apps with dependencies and often run on orchestrators or managed platforms. Serverless runs functions or apps per request with the provider managing servers: strong scale-to-zero, with cold starts and runtime limits.',
        realWorldExample: {
          title: 'Choosing compute for a startup API',
          desc: 'They start with a container on a managed platform for predictable always-on traffic. Batch image processing moves to serverless functions to save money when idle.',
        },
        mermaidDiagram: `flowchart TB
  VM[Virtual machine - you manage OS]
  Container[Container platform - you manage app]
  Serverless[Serverless - provider runs requests]`,
        codeTitle: 'Compute Comparison',
        codeLanguage: 'Text',
        codeText: `VM: most control, most ops work
Container: portable images, good for APIs and workers
Serverless: pay per use, watch cold starts and timeouts`,
      },
      {
        id: 'regions-az',
        label: 'Regions and Availability Zones',
        title: 'Regions and Availability Zones',
        body: 'A region is a geographic area (us-east-1, eu-west-1). Availability zones (AZs) are isolated data centers within a region. Multi-AZ designs survive single-building failures. Multi-region designs survive larger outages but cost more.',
        realWorldExample: {
          title: 'Database in two AZs',
          desc: 'Production Postgres runs primary in AZ-a with a standby in AZ-b. If AZ-a fails, DNS or the managed service fails over to the standby.',
        },
        mermaidDiagram: `flowchart TB
  subgraph region [Region us-east-1]
    AZ1[AZ-a primary]
    AZ2[AZ-b standby]
  end
  Users[Users] --> region`,
        codeTitle: 'Region / AZ Sketch',
        codeLanguage: 'Text',
        codeText: `Region: geographic area close to users
AZ: isolated data center within a region
Multi-AZ: survive one data center failure
Multi-region: survive regional outage (harder)`,
      },
      {
        id: 'load-balancers',
        label: 'Load Balancers',
        title: 'Load Balancers',
        body: 'Load balancers spread traffic across many app instances, terminate TLS, and health-check backends. They are the front door that hides individual server failures from users.',
        realWorldExample: {
          title: 'Black Friday traffic',
          desc: 'A load balancer sends millions of checkout requests across ten API instances. Unhealthy instances are removed automatically when health checks fail.',
        },
        mermaidDiagram: `flowchart LR
  Users[Users] --> LB[Load balancer]
  LB --> I1[Instance 1]
  LB --> I2[Instance 2]
  LB --> I3[Instance 3]`,
        codeTitle: 'Health Check Idea',
        codeLanguage: 'HTTP',
        codeText: `GET /health HTTP/1.1
Host: api.internal

200 OK
{"status":"ok"}`,
      },
      {
        id: 'cdn',
        label: 'CDN',
        title: 'CDN',
        body: 'A CDN (Content Delivery Network) caches static assets and sometimes HTML at edge locations close to users. It reduces latency and origin load for images, JS, CSS, and videos.',
        realWorldExample: {
          title: 'Global learning app',
          desc: 'Lesson thumbnails and JS bundles are served from a CDN. A student in Tokyo fetches files from a nearby edge instead of the origin in Virginia.',
        },
        mermaidDiagram: `flowchart LR
  User[User in Tokyo] --> Edge[CDN edge]
  Edge -->|cache miss| Origin[Origin server]
  Edge -->|cache hit| Asset[Fast response]`,
        codeTitle: 'CDN Cache Headers',
        codeLanguage: 'HTTP',
        codeText: `Cache-Control: public, max-age=31536000, immutable
ETag: "v2.4.1"
CDN-Cache-Control: max-age=86400`,
      },
      {
        id: 'object-storage',
        label: 'Object Storage',
        title: 'Object Storage',
        body: 'Object storage (S3-style) holds files as objects in buckets: uploads, backups, logs, and static sites. It is cheap, durable, and not a replacement for a transactional database.',
        realWorldExample: {
          title: 'User avatar uploads',
          desc: 'The API stores image metadata in Postgres and the actual file in object storage. Signed URLs let the browser download without exposing bucket credentials.',
        },
        mermaidDiagram: `flowchart LR
  App[API] --> Meta[(Database metadata)]
  App --> Bucket[(Object storage bucket)]
  Browser[Browser] -->|signed URL| Bucket`,
        codeTitle: 'Object Key Layout',
        codeLanguage: 'Text',
        codeText: `s3://my-app-uploads/avatars/user-42/profile.webp
s3://my-app-backups/db/2026-06-08.sql.gz`,
      },
      {
        id: 'managed-databases',
        label: 'Managed Databases',
        title: 'Managed Databases',
        body: 'Managed databases automate backups, patching, failover, and scaling primitives. You still design schema and queries, but the provider runs the servers and disks.',
        realWorldExample: {
          title: 'Managed Postgres',
          desc: 'The team uses a managed Postgres service with daily backups and multi-AZ failover instead of SSH-ing into database VMs at 3 a.m.',
        },
        mermaidDiagram: `flowchart LR
  App[App servers] --> Managed[(Managed Postgres)]
  Managed --> Backup[Automated backups]
  Managed --> Replica[Read replica]`,
        codeTitle: 'Managed DB Features',
        codeLanguage: 'Text',
        codeText: `Automated backups and point-in-time restore
Patching and minor version upgrades
Monitoring and storage scaling
Optional read replicas`,
      },
      {
        id: 'queues-jobs',
        label: 'Queues and Background Jobs',
        title: 'Queues and Background Jobs',
        body: 'Queues decouple work in time: the API enqueues a job, workers process it later. This keeps HTTP responses fast for email, thumbnails, reports, and webhooks.',
        realWorldExample: {
          title: 'Welcome email after signup',
          desc: 'POST /signup returns quickly after writing the user row. A worker queue sends the welcome email asynchronously.',
        },
        mermaidDiagram: `flowchart LR
  API[API] --> Q[Queue]
  Q --> W1[Worker]
  W1 --> Email[Email provider]`,
        codeTitle: 'Job Payload Example',
        codeLanguage: 'JSON',
        codeText: `{
  "job": "send_welcome_email",
  "userId": 42,
  "email": "maya@example.com",
  "attempt": 1
}`,
      },
      {
        id: 'env-secrets',
        label: 'Environment Variables and Secrets',
        title: 'Environment Variables and Secrets',
        body: 'Environment variables configure apps per environment. Secrets are sensitive env vars: API keys, database passwords, signing keys: stored in a secrets manager, not committed to Git.',
        realWorldExample: {
          title: 'Stripe keys in production',
          desc: 'Production containers read STRIPE_SECRET_KEY from the cloud secrets manager. Developers use test keys locally via .env files that never get pushed.',
        },
        mermaidDiagram: `flowchart LR
  Dev[.env local - gitignored] --> Local[Local app]
  SecretMgr[Secrets manager] --> Prod[Production containers]`,
        codeTitle: 'Secrets Practice',
        codeLanguage: 'Shell',
        codeText: `# Good: reference secret at runtime
DATABASE_URL=\${DATABASE_URL}

# Bad: never commit this
STRIPE_SECRET_KEY=sk_live_...`,
      },
      {
        id: 'domains-tls',
        label: 'Domains and TLS Certificates',
        title: 'Domains and TLS Certificates',
        body: 'DNS maps your domain to load balancers or CDNs. TLS certificates enable HTTPS so traffic is encrypted in transit. Managed platforms often auto-renew certificates via ACME/Let\'s Encrypt.',
        realWorldExample: {
          title: 'Launching app.example.com',
          desc: 'DNS A record points to the load balancer. The platform provisions a TLS certificate. Users visit https://app.example.com with a trusted lock icon.',
        },
        mermaidDiagram: `flowchart LR
  User[Browser] --> DNS[DNS]
  DNS --> LB[Load balancer + TLS]
  LB --> App[App instances]`,
        codeTitle: 'DNS Record Sketch',
        codeLanguage: 'Text',
        codeText: `app.example.com  A      -> load-balancer-ip
api.example.com  CNAME  -> app.example.com
_acme-challenge  TXT    -> certificate validation`,
      },
      {
        id: 'rollbacks',
        label: 'Rollbacks',
        title: 'Rollbacks',
        body: 'A rollback returns production to a previous known-good version when a deploy causes errors. Fast rollbacks require immutable artifacts (images, builds) and tracked releases.',
        realWorldExample: {
          title: 'Bad deploy rollback',
          desc: 'Error rate spikes two minutes after v2.5 deploys. The team rolls back to v2.4 image tag. Metrics recover while engineers fix the bug offline.',
        },
        mermaidDiagram: `flowchart LR
  V25[v2.5 deploy] --> Bad[Errors spike]
  Bad --> Roll[Rollback to v2.4]
  Roll --> OK[Service healthy]`,
        codeTitle: 'Rollback Command Idea',
        codeLanguage: 'Shell',
        codeText: `# Container platform example
deploy release api:v2.4
# or
kubectl rollout undo deployment/api`,
      },
      {
        id: 'blue-green-canary',
        label: 'Blue/Green and Canary',
        title: 'Blue/Green and Canary Deploys',
        body: 'Blue/green runs two full environments and switches traffic instantly. Canary sends a small percentage of users to the new version first, then increases traffic if metrics stay healthy.',
        realWorldExample: {
          title: 'Canary checkout flow',
          desc: 'Version 3.0 receives 5% of checkout traffic. Error rate and latency match baseline, so traffic ramps to 100% over an hour.',
        },
        mermaidDiagram: `flowchart LR
  LB[Load balancer]
  LB -->|95%| Blue[v2.4 blue]
  LB -->|5%| Green[v3.0 canary]`,
        codeTitle: 'Canary Traffic Split',
        codeLanguage: 'Text',
        codeText: `Step 1: route 5% traffic to v3.0
Step 2: watch error rate and p95 latency 30m
Step 3: increase to 25%, 50%, 100% if healthy
Abort: route 100% back to v2.4 if alerts fire`,
      },
    ],
  },
];

const dockerIndex = DS.curriculum.findIndex((item) => item.id === 'docker-containers');
if (dockerIndex !== -1) {
  DS.curriculum.splice(dockerIndex + 1, 0, ...deploymentDevOpsLessons);
}
