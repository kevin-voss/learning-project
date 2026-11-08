window.AIP = window.AIP || {};
AIP.registerQuestions([
  {
    id: "o-2-1-5-02",
    task: "2.1",
    skill: "2.1.5",
    domain: 2,
    difficulty: 2,
    milestone: "M2",
    chapters: ["11"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 2", "DRAFT"],
    stem: "Fieldnote Logistics extracts fields, drafts a payment, waits for a supervisor, and only then pays the carrier. The wait can last for hours, and refreshing the supervisor's page must not pay twice. They want a known workflow rather than an agent, and the wait must survive a closed laptop.",
    choices: [
      { id: "A", text: "Use a Standard Step Functions workflow and a task with the callback pattern, and call SendTaskSuccess only after the supervisor approves." },
      { id: "B", text: "Use an Express workflow with .waitForTaskToken so the wait can last overnight." },
      { id: "C", text: "Hold the approval in a browser tab with a JavaScript timer." },
      { id: "D", text: "Ask the model to remember that it is waiting and to poll itself every minute." }
    ],
    correct: ["A"],
    why: "A callback task pauses a Standard workflow until SendTaskSuccess, so the payment state does not run while the supervisor is away.",
    optionExplanations: [
      { id: "A", correct: true, text: "The task token keeps the Standard execution paused, and success is sent once when the supervisor approves." },
      { id: "B", correct: false, text: "Express workflows do not support the callback pattern, and they cannot run long enough for an hours-long wait." },
      { id: "C", correct: false, text: "A timer in a browser tab ends when the laptop sleeps and can submit the payment more than once." },
      { id: "D", correct: false, text: "The model has no durable pause, so polling itself keeps spending calls until someone happens to answer." }
    ],
    evidence: "https://docs.aws.amazon.com/step-functions/latest/dg/connect-to-resource.html"
  },
  {
    id: "o-2-1-5-03",
    task: "2.1",
    skill: "2.1.5",
    domain: 2,
    difficulty: 2,
    milestone: "M2",
    chapters: ["11"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 2", "DRAFT"],
    stem: "Pico Retail's agent may create a return label only after a specialist clicks approve in the existing returns application. The specialist must see the exact SKU and quantity the agent elicited, and a second click must not create a second label. They want the least operational overhead.",
    choices: [
      { id: "A", text: "Let the action group Lambda create the label, then notify the specialist that it already exists." },
      { id: "B", text: "Remove the action group and ask shoppers to email the SKU to the returns desk." },
      { id: "C", text: "Return control to the returns app with the invocation id, create the label only after approval, and send that tool result once." },
      { id: "D", text: "Grant the agent permission to create labels and add a prompt line that says to ask nicely first." }
    ],
    correct: ["C"],
    why: "The returns application performs the write after the specialist approves, and the invocation id ties that single result to the paused agent turn.",
    optionExplanations: [
      { id: "A", correct: false, text: "The label exists before the specialist has seen the SKU and quantity." },
      { id: "B", correct: false, text: "Email drops the structured fields the agent already elicited and adds a manual queue." },
      { id: "C", correct: true, text: "Return of control shows the elicited fields, and one result for that invocation id resumes the agent after a single create." },
      { id: "D", correct: false, text: "A prompt line leaves create permission on the agent, so the label can be made before anyone clicks approve." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/agents-returncontrol.html"
  },
  {
    id: "o-2-1-6-01",
    task: "2.1",
    skill: "2.1.6",
    domain: 2,
    difficulty: 1,
    milestone: "M2",
    chapters: ["11"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 2", "DRAFT"],
    stem: "Aster Schools wants an agent to file a facilities ticket. The ticket API accepts only buildingCode, room, and summary. The agent must be told those fields in a schema, and the executor must reject anything else before the ticket is written. They want the least operational overhead.",
    choices: [
      { id: "A", text: "Expose one free-text tool named runTicket and parse the sentence inside the prompt." },
      { id: "B", text: "Let the model write SQL against the facilities database." },
      { id: "C", text: "Paste the API manual into the agent instruction and skip a schema." },
      { id: "D", text: "Define an action group with an OpenAPI or function schema that lists only those three fields, and validate them again in the Lambda executor." }
    ],
    correct: ["D"],
    why: "An action group schema is the contract the agent uses to elicit parameters, and the Lambda still checks those values before it calls the ticket API.",
    optionExplanations: [
      { id: "A", correct: false, text: "Free text gives orchestration no parameter list, so extra and missing fields both get through." },
      { id: "B", correct: false, text: "Direct SQL is not the ticket contract and opens the facilities database to the model." },
      { id: "C", correct: false, text: "Instruction prose is not a schema the agent can elicit field by field." },
      { id: "D", correct: true, text: "The schema names the three fields, and the executor rejects a payload that does not match before the write." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/agents-action-create.html"
  },
  {
    id: "o-2-1-6-02",
    task: "2.1",
    skill: "2.1.6",
    domain: 2,
    difficulty: 2,
    milestone: "M2",
    chapters: ["11"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 2", "DRAFT"],
    stem: "Nimbus Support's refund tool must record the signed-in customer, not a customer id the model types after a caller says to refund account 000. Amounts outside the allowed range must come back as a short error the agent can read. Apply least privilege to the tool.",
    choices: [
      { id: "A", text: "Trust the customerId argument from the model because the schema marks that field as required." },
      { id: "B", text: "Ignore the model-supplied customer id, set the id from the authenticated session inside the Lambda, and return a short JSON error when the amount is out of range." },
      { id: "C", text: "Put the account root keys in the agent instruction so the tool can repair a bad customer id." },
      { id: "D", text: "Return the full stack trace to the model whenever the refund API fails." }
    ],
    correct: ["B"],
    why: "The schema can require an amount, but the executor has to overwrite identity from the real session and return a short observation when the amount fails the check.",
    optionExplanations: [
      { id: "A", correct: false, text: "A required field still accepts an account id the caller talked the model into sending." },
      { id: "B", correct: true, text: "The Lambda binds the signed-in customer and answers an out-of-range amount with a short error the orchestration can use." },
      { id: "C", correct: false, text: "Root keys in the instruction violate least privilege and land in the agent trace." },
      { id: "D", correct: false, text: "A stack trace can include secrets and is not the short observation the next reasoning step should see." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/agents-how.html"
  },
  {
    id: "o-2-1-6-03",
    task: "2.1",
    skill: "2.1.6",
    domain: 2,
    difficulty: 2,
    milestone: "M2",
    chapters: ["11"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 2", "DRAFT"],
    stem: "Northwind Clinic is adding a medication refill tool. A retry of the same refill request must not dispense a second bottle. The contract should carry an idempotency key, and the tool must recognize a repeat. They want the least operational overhead.",
    choices: [
      { id: "A", text: "Define the refill action with an idempotency key in the schema, and make the Lambda return the original refill when that key is seen again." },
      { id: "B", text: "Generate a new random request id in the prompt on every retry so each call looks unique." },
      { id: "C", text: "Turn retries off and ask nurses to click submit only once." },
      { id: "D", text: "Dispense from the browser with a long-lived database password stored in the page." }
    ],
    correct: ["A"],
    why: "An idempotency key in the action schema lets the executor treat a second call with the same key as the refill it already created.",
    optionExplanations: [
      { id: "A", correct: true, text: "The schema carries the key, and the Lambda returns the existing refill instead of dispensing again." },
      { id: "B", correct: false, text: "A new id on each retry makes the second call look like a different refill." },
      { id: "C", correct: false, text: "Hiding the retry button does not define what the tool does when the agent calls it twice." },
      { id: "D", correct: false, text: "A database password in the page is not a tool contract and breaks least privilege." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/agents-action-create.html"
  },
  {
    id: "o-2-1-7-01",
    task: "2.1",
    skill: "2.1.7",
    domain: 2,
    difficulty: 1,
    milestone: "M2",
    chapters: ["11"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 2", "DRAFT"],
    stem: "Harbor Claims already runs an MCP server that exposes lookup_claim and list_documents. The Bedrock agent should call those tools without rewriting them as prompt examples. The agent must not see tools the server did not allow. They want the least operational overhead.",
    choices: [
      { id: "A", text: "Copy each tool's source code into the agent instruction as a worked example." },
      { id: "B", text: "Give the agent a shell tool and let it start any process on the host." },
      { id: "C", text: "Attach the MCP server and set the allowed tools list to lookup_claim and list_documents only." },
      { id: "D", text: "Replace the MCP server with a public REST API and embed its key in the claims web page." }
    ],
    correct: ["C"],
    why: "The agent tool configuration can attach an MCP server and restrict allowed tools to the operations that task needs.",
    optionExplanations: [
      { id: "A", correct: false, text: "Pasting source into the instruction does not invoke the running MCP server." },
      { id: "B", correct: false, text: "A shell can start programs far beyond the two claim tools." },
      { id: "C", correct: true, text: "The allowed tools list exposes only lookup_claim and list_documents from that MCP server." },
      { id: "D", correct: false, text: "A key in the web page abandons the existing server and violates least privilege." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/bedrock-managed-agents-openai-skills-tools.html"
  },
  {
    id: "o-2-1-7-02",
    task: "2.1",
    skill: "2.1.7",
    domain: 2,
    difficulty: 2,
    milestone: "M2",
    chapters: ["11"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 2", "DRAFT"],
    stem: "Lumen City wants a permit-fee calculator to appear beside the agent's other tools. The calculator must reach a private subnet, and the city does not want a server to patch for this one function. The model should call it through a JSON schema. They want the least operational overhead.",
    choices: [
      { id: "A", text: "Run the calculator on a laptop in the permit office and port-forward it to the agent." },
      { id: "B", text: "Paste this year's fee table into the agent instruction and let the model do the arithmetic." },
      { id: "C", text: "Deploy an EKS cluster whose only workload is that arithmetic function." },
      { id: "D", text: "Implement the calculator as a Lambda tool with a JSON schema and let Bedrock invoke that function when the model requests the tool." }
    ],
    correct: ["D"],
    why: "A Lambda custom tool is defined with a JSON schema, scales without a server, and can reach VPC resources without opening the whole agent runtime to the subnet.",
    optionExplanations: [
      { id: "A", correct: false, text: "A port-forwarded laptop is not a durable tool endpoint and depends on one office machine." },
      { id: "B", correct: false, text: "A pasted table drifts from the fee service and is not a callable tool." },
      { id: "C", correct: false, text: "A cluster for one function is the operational load they are trying to avoid." },
      { id: "D", correct: true, text: "Bedrock invokes the Lambda from the tool schema, and the function can reach the private subnet on its own role." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/tool-use-server-side.html"
  },
  {
    id: "o-2-1-7-03",
    task: "2.1",
    skill: "2.1.7",
    domain: 2,
    difficulty: 2,
    milestone: "M3",
    chapters: ["11"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 2", "DRAFT"],
    stem: "Cedar Bank already keeps policy memos in a Bedrock knowledge base. An MCP client outside the agent runtime must query that knowledge base as a normal tool, with the gateway injecting parameters and hiding schema fields the client should not set. They want the least operational overhead and least privilege.",
    choices: [
      { id: "A", text: "Export the memos to a spreadsheet and upload it into the MCP client's prompt each morning." },
      { id: "B", text: "Add the knowledge base as an AgentCore Gateway target so clients call the retrieve tools through MCP." },
      { id: "C", text: "Issue the MCP client an IAM administrator key so it can call any Bedrock API directly." },
      { id: "D", text: "Copy the vector index onto the MCP server's local disk and skip the gateway." }
    ],
    correct: ["B"],
    why: "A gateway knowledge base target exposes the retrieve operations as MCP tools and handles authentication, parameter injection, and schema subsetting.",
    optionExplanations: [
      { id: "A", correct: false, text: "A morning spreadsheet is a stale copy, not a tool call against the knowledge base." },
      { id: "B", correct: true, text: "The gateway target lets the MCP client retrieve from the knowledge base without a private copy of the index." },
      { id: "C", correct: false, text: "Administrator credentials let the client do far more than query the memos." },
      { id: "D", correct: false, text: "A local copy of the index duplicates the knowledge base and drops the gateway's parameter controls." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/kb-gateway-target.html"
  }
]);
