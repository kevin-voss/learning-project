window.AIP = window.AIP || {};

/* Six timed AWS labs. You study the picture here, then enroll yourself on Skill Builder. */
AIP.MICRO = [
  {
    id: "agentic",
    title: "Agentic AI",
    minutes: 130,
    href: "https://skillbuilder.aws/learn/GTGKXBWUGU/aws-agentic-ai-demonstrated/",
    picture: "A clerk who can call the right desk, remember the last sentence, and refuse a rude request.",
    build: "Move a chat assistant onto Amazon Bedrock AgentCore: a front door for tools, a memory, a knowledge base, and a safety check.",
    diagram: ["Caller", "OAuth", "Agent runtime", "Gateway", "Knowledge base", "Guardrail"],
    chapters: ["11", "12", "13", "15"],
    lab: "sim-agent",
    learn: [
      "An agent picks a tool. A workflow runs the same steps every time.",
      "Memory is the last turns of the chat. It is not the company handbook.",
      "A guardrail checks the text. The prompt alone is not the safety control."
    ],
    steps: [
      "Read the agent, tool, workflow, and guardrail chapters.",
      "Redraw the boxes from memory and say what each one is for.",
      "Do the browser check: a fixed refund path is a workflow, not an agent.",
      "When the picture is easy, open the Skill Builder lab and enroll yourself."
    ],
    show: [
      "Configure OAuth 2.0 for the caller.",
      "Fix AgentCore Gateway tool routing.",
      "Deploy the knowledge base and the specialist agent runtime.",
      "Turn on AgentCore Memory so the conversation lasts.",
      "Attach a Bedrock Guardrail for content safety.",
      "Put the agent runtime in a VPC."
    ]
  },
  {
    id: "db-agentic",
    title: "Databases for Agentic AI",
    href: "https://skillbuilder.aws/certification/microcredentials",
    picture: "A notebook for this chat, and a library for the documents the chat may quote.",
    build: "Give an agent a place for session memory and a place for document search, then see the query it actually runs.",
    diagram: ["Agent", "Lambda tool", "DynamoDB memory", "Aurora + pgvector", "Knowledge base"],
    chapters: ["08", "10", "14"],
    lab: "sim-memory",
    learn: [
      "Session state belongs in a store, not inside the function that dies after the call.",
      "A vector index finds a passage. A table finds a row. They are different questions.",
      "The password for the database does not go in the prompt."
    ],
    steps: [
      "Read vector databases, knowledge bases, and memory.",
      "Point at the diagram and say which box is memory and which box is search.",
      "Do the browser check: a one-day session goes in DynamoDB.",
      "Enroll in Databases for Agentic AI Demonstrated when that split is clear."
    ],
    show: [
      "Configure Aurora PostgreSQL and DynamoDB for agent access and memory.",
      "Set up pgvector and a Bedrock Knowledge Base for retrieval.",
      "Use an MCP server to see the query the agent sent.",
      "Speed up the query the agent keeps running."
    ]
  },
  {
    id: "agent-identity",
    title: "Securing Agent Identities",
    minutes: 135,
    href: "https://skillbuilder.aws/learn/Z8M87YZWXB/aws-securing-agent-identities-demonstrated/9ZRC3U51YT",
    picture: "A badge on the person, not a name the assistant wrote on a form.",
    build: "Give each agent a workload identity, and make every tool trust the signed-in caller.",
    diagram: ["Caller", "JWT or SigV4", "Agent", "Tool", "CloudTrail"],
    chapters: ["12", "16"],
    lab: "sim-identity",
    learn: [
      "The tool trusts the session, not a user id the model typed.",
      "A caller that already has AWS credentials can use SigV4. A caller with a token uses JWT.",
      "Someone must be able to read who issued the token."
    ],
    steps: [
      "Read agent tools and security.",
      "Say which callers in the diagram use a token and which use AWS credentials.",
      "Do the browser check: the tool trusts the signed session.",
      "Enroll in Securing Agent Identities Demonstrated."
    ],
    show: [
      "Provision a workload identity for a self-hosted agent.",
      "Restrict identity admin with tag-based access.",
      "Require a scoped JWT on the inbound call.",
      "Use SigV4 for the service that already has AWS credentials.",
      "Move an agent onto JWT checks.",
      "Find identity events in CloudTrail and CloudWatch."
    ]
  },
  {
    id: "serverless",
    title: "Serverless",
    minutes: 125,
    href: "https://skillbuilder.aws/learn/XV3B4RGA8Q/aws-serverless-demonstrated",
    picture: "A short clerk at the counter, and a back room for the work that takes longer.",
    build: "A tracking API, an event pipe, a queue for the failures, and a workflow for the exception.",
    diagram: ["API", "Lambda", "EventBridge", "SQS + DLQ", "Step Functions"],
    chapters: ["05", "13", "22"],
    lab: "sim-serverless",
    learn: [
      "A chat that streams tokens does not wait on a REST timeout.",
      "A poison message goes to a dead-letter queue. It does not retry forever.",
      "A known sequence is Step Functions. An agent is for a choice you cannot write down."
    ],
    steps: [
      "Read application integration, workflow, and deployment.",
      "Walk a failed event from the bus to the queue to the workflow.",
      "Do the browser check: a long answer streams.",
      "Enroll in Serverless Demonstrated."
    ],
    show: [
      "Configure the customer-tracking API.",
      "Ingest carrier events.",
      "Route exceptions through SQS with a dead-letter queue.",
      "Connect that handler to Step Functions and a notification.",
      "Fix the Bedrock ETA text.",
      "Fix the IAM permission that blocks the archive write.",
      "Speed up the shipment read."
    ]
  },
  {
    id: "lakehouse",
    title: "Data Lakehouse",
    href: "https://skillbuilder.aws/certification/microcredentials",
    picture: "One warehouse of files, with a label on each box so the wrong person cannot open it.",
    build: "Land files, keep one table format, and filter every query by who is asking.",
    diagram: ["Files", "Glue ETL", "Iceberg table", "Lake Formation", "Athena"],
    chapters: ["06", "08", "10"],
    lab: "sim-lakehouse",
    learn: [
      "Ingestion and chat are different paths. A new file does not ride the user's question.",
      "A metadata filter runs at retrieval, before the model sees the passage.",
      "Duplicate rows and a broken schema make the answer look confident and wrong."
    ],
    steps: [
      "Read ingestion, vector stores, and knowledge bases.",
      "Say where the allow rule sits in the diagram.",
      "Do the browser check: staff and student passages split on metadata.",
      "Enroll in Data Lakehouse Demonstrated."
    ],
    show: [
      "Fix Glue ETL ingestion.",
      "Repair an Iceberg table: schema, duplicates, and slow queries.",
      "Put fine-grained permissions on with Lake Formation.",
      "Keep the processing pipeline running."
    ]
  },
  {
    id: "streaming",
    title: "Data Streaming",
    href: "https://skillbuilder.aws/certification/microcredentials",
    picture: "A conveyor for new files, so the chat desk never stops to file them.",
    build: "Take a live stream, drop the bad records, and land the good ones where search can read them.",
    diagram: ["Source", "Kinesis or MSK", "Flink", "Dead letter", "Firehose", "Search"],
    chapters: ["06", "13"],
    lab: "sim-stream",
    learn: [
      "Chat stays fast because indexing happens on the side.",
      "A record that cannot be parsed is a poison pill. It leaves the main belt.",
      "The schema of the event is a contract. A silent shape change breaks the sink."
    ],
    steps: [
      "Read ingestion and workflow orchestration.",
      "Point at the belt and say where a bad record leaves it.",
      "Do the browser check: new PDFs become searchable off the chat path.",
      "Enroll in Data Streaming Demonstrated."
    ],
    show: [
      "Fix real-time ingestion.",
      "Repair event streaming and stream processing.",
      "Repair the delivery pipeline.",
      "Handle a poison pill.",
      "Convert records with the schema you were given."
    ]
  }
];
