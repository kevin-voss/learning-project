window.AIP = window.AIP || {};
AIP.LABS = AIP.LABS || [];
AIP.LABS.push(
  {
    id: "local-rag",
    level: 2,
    title: "Score a tiny retrieval set",
    runtime: "python",
    python: "3.9",
    prompt: "Run the starter and return JSON with decision knowledge-base when the cited passage supports the answer.",
    checks: [{ op: "equals", path: "decision", value: "knowledge-base" }, { op: "includes", path: "services", value: "bedrock" }]
  },
  {
    id: "local-guard",
    level: 2,
    title: "Reject a prompt-injection line",
    runtime: "python",
    python: "3.9",
    prompt: "The checker expects blocked true when the user text tells the model to ignore the system rules.",
    checks: [{ op: "equals", path: "blocked", value: "true" }]
  },
  {
    id: "local-docker-api",
    level: 2,
    title: "Container for a long worker",
    runtime: "docker",
    python: "3.11",
    prompt: "This lab needs Docker. The fixture answer says the worker belongs in a container, not in a 15-minute chat Lambda.",
    checks: [{ op: "equals", path: "decision", value: "container" }]
  },
  {
    id: "local-docker-index",
    level: 2,
    title: "Local stand-in for the vector index",
    runtime: "docker",
    python: "3.11",
    prompt: "This lab needs Docker. The fixture answer keeps embeddings and keyword search together.",
    checks: [{ op: "equals", path: "decision", value: "hybrid" }]
  }
);
