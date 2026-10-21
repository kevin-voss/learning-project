window.DS = window.DS || {};
DS.curriculum = DS.curriculum || [];

DS.curriculum.push(
  {
    id: 'cloud-hosting',
    category: 'More: DevOps',
    title: 'Cloud Hosting Basics',
    icon: 'fa-cloud',
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
);
