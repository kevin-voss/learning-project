window.AIP = window.AIP || {};
AIP.LABS = AIP.LABS || [];
AIP.LABS.push(
  {
    id: "sim-agent",
    level: 1,
    title: "Choose an agent or a workflow",
    micro: "agentic",
    prompt: "Harbor Claims knows every step of a refund: look up the policy, check the amount, then open a ticket. The steps never change. Which design fits?",
    fields: [{ path: "decision", label: "Design", options: ["agent", "step-functions", "fine-tune", "browser-keys"] }],
    checks: [{ op: "equals", path: "decision", value: "step-functions" }]
  },
  {
    id: "sim-memory",
    level: 1,
    title: "Store agent memory",
    micro: "db-agentic",
    prompt: "Cedar Bank's agent must remember a session for a day and must not keep that state inside Lambda. Where does the session go?",
    fields: [{ path: "decision", label: "Store", options: ["dynamodb", "prompt", "s3-website", "cloudtrail"] }],
    checks: [{ op: "equals", path: "decision", value: "dynamodb" }]
  },
  {
    id: "sim-identity",
    level: 1,
    title: "Tool identity",
    micro: "agent-identity",
    prompt: "A tool writes a ticket. The model can send any user id it likes. What must the tool trust?",
    fields: [{ path: "decision", label: "Identity", options: ["model-argument", "signed-session", "access-key-in-browser", "shared-admin-role"] }],
    checks: [{ op: "equals", path: "decision", value: "signed-session" }]
  },
  {
    id: "sim-serverless",
    level: 1,
    title: "Stream a long answer",
    micro: "serverless",
    prompt: "Pico Retail's chat answers take 20 seconds. API Gateway REST plus a RequestResponse Lambda times out. What should change?",
    fields: [{ path: "decision", label: "Change", options: ["raise-timeout", "stream", "poll-sqs", "browser-keys"] }],
    checks: [{ op: "equals", path: "decision", value: "stream" }]
  },
  {
    id: "sim-lakehouse",
    level: 1,
    title: "Filter retrieval by who is asking",
    micro: "lakehouse",
    prompt: "Aster Schools stores handbooks for staff and students in one index. A student must not receive staff passages. Where is the allow rule applied?",
    fields: [{ path: "decision", label: "Control", options: ["metadata-filter", "temperature", "bigger-model", "public-bucket"] }],
    checks: [{ op: "equals", path: "decision", value: "metadata-filter" }]
  },
  {
    id: "sim-stream",
    level: 1,
    title: "Ingest documents without blocking chat",
    micro: "streaming",
    prompt: "Fieldnote Logistics drops new PDFs all day. Chat must stay fast. How should new files become searchable?",
    fields: [{ path: "decision", label: "Path", options: ["event-pipeline", "inline-on-chat", "fine-tune-nightly", "paste-into-prompt"] }],
    checks: [{ op: "equals", path: "decision", value: "event-pipeline" }]
  }
);
