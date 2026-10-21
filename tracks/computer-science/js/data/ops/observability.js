window.DS = window.DS || {};
DS.curriculum = DS.curriculum || [];

DS.curriculum.push(
  {
    id: 'observability',
    category: 'More: DevOps',
    title: 'Observability: Logs, Metrics, and Traces',
    icon: 'fa-chart-line',
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
);
