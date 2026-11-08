window.AIP = window.AIP || {};

AIP.MICRO = [
  { id: "agentic", title: "Agentic AI", chapters: ["11", "12", "13"], labs: ["sim-agent"], note: "No formal prerequisite. AWS suggests more than six months of experience. The official page asks you to sign in." },
  { id: "db-agentic", title: "Databases for Agentic AI", chapters: ["08", "14"], labs: ["sim-memory"], note: "Session state and retrieval metadata, not a second database course." },
  { id: "agent-identity", title: "Securing Agent Identities", chapters: ["12", "16"], labs: ["sim-identity"], note: "The tool trusts the signed-in caller, not a field the model invented." },
  { id: "serverless", title: "Serverless", chapters: ["05", "22"], labs: ["sim-serverless"], note: "Short glue on Lambda. Long work goes elsewhere." },
  { id: "lakehouse", title: "Data Lakehouse", chapters: ["06", "08", "10"], labs: ["sim-lakehouse"], note: "Files, permissions, and the index stay in one story." },
  { id: "streaming", title: "Data Streaming", chapters: ["06", "13"], labs: ["sim-stream"], note: "Ingestion stays off the chat path." },
  { id: "mlops", title: "MLOps", optional: true, chapters: ["18", "23"], labs: [], note: "Optional. Use it when you deploy your own weights. AIP-C01 still prefers Bedrock for managed models." },
  { id: "incident", title: "Incident Response", linkOnly: true, href: "https://aws.amazon.com/security-incident-response/", note: "Link only. It is not one of the six microcredentials in this plan." }
];
