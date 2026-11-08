window.AIP = window.AIP || {};
AIP.registerQuestions([
  {
    id: "o-2-1-1-01",
    task: "2.1",
    skill: "2.1.1",
    domain: 2,
    difficulty: 1,
    milestone: "M2",
    chapters: ["11"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 2", "DRAFT"],
    stem: "Northwind Clinic nurses close a chart chat at the end of a shift and reopen it the next morning for the same patient. The agent must recall the prior care summary for that nurse and patient, while a different patient opened on the same workstation starts with a clean session. They want the least operational overhead, and the transcript must survive beyond the browser tab.",
    choices: [
      { id: "A", text: "Store one clinic-wide session id in a shared browser cookie so whichever nurse sits down continues the last chat on that PC." },
      { id: "B", text: "Enable Amazon Bedrock agent memory, pass a memory id scoped to that nurse and patient, and start a new session id for each visit." },
      { id: "C", text: "Write the full transcript into a Lambda global variable and read it on the next invocation of the same function." },
      { id: "D", text: "Paste the previous day's chat into the agent instruction and prepare a new agent alias every morning." }
    ],
    correct: ["B"],
    why: "Agent memory keeps session summaries for a memory id and loads them on a later session, while a new session id still bounds the current visit.",
    optionExplanations: [
      { id: "A", correct: false, text: "A shared cookie continues whoever used the PC last, so the next patient inherits the previous chat." },
      { id: "B", correct: true, text: "The same memory id reloads that pair's summaries, and a fresh session id keeps this visit separate." },
      { id: "C", correct: false, text: "A Lambda global disappears when the execution environment is replaced and is not keyed per patient." },
      { id: "D", correct: false, text: "Rewriting the agent instruction is a deploy of one patient's notes into every future chat." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/agents-memory.html"
  },
  {
    id: "o-2-1-1-02",
    task: "2.1",
    skill: "2.1.1",
    domain: 2,
    difficulty: 2,
    milestone: "M2",
    chapters: ["11"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 2", "DRAFT"],
    stem: "An adjuster at Harbor Claims corrects a policy number halfway through a claim chat, but the next tool call still sends the number the model invented on the first turn. The corrected value must stick for the rest of this session only, and the policy handbook must stay in search rather than in chat memory. They want the least operational overhead.",
    choices: [
      { id: "A", text: "Write the corrected number to CloudWatch Logs and instruct the agent to run a Logs Insights query before every tool call." },
      { id: "B", text: "Enable cross-session memory and store every adjuster's policy numbers under one shared memory id." },
      { id: "C", text: "Move the chat to a larger context window and resend the entire claim file on every turn." },
      { id: "D", text: "Return the corrected policy number in session attributes from the tool, and send that session state on later InvokeAgent calls for the same session id." }
    ],
    correct: ["D"],
    why: "Session attributes travel with one session and can be updated from the action group response, so later turns see the value the tool already checked.",
    optionExplanations: [
      { id: "A", correct: false, text: "Invocation logs are an audit sink, not the session object the next InvokeAgent call reads." },
      { id: "B", correct: false, text: "One shared memory id would load one adjuster's policy numbers into another person's later session." },
      { id: "C", correct: false, text: "A larger window still leaves the model free to prefer the earlier wrong number over the validated one." },
      { id: "D", correct: true, text: "Session attributes persist for that session id and can be overwritten when the tool returns the corrected policy number." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/agents-session-state.html"
  },
  {
    id: "o-2-1-2-01",
    task: "2.1",
    skill: "2.1.2",
    domain: 2,
    difficulty: 1,
    milestone: "M2",
    chapters: ["11"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 2", "DRAFT"],
    stem: "Lumen City permit staff ask questions that sometimes need a parcel lookup and sometimes a zoning lookup, and the second call depends on the first result. They cannot freeze the call list in advance. They want each tool choice recorded with a rationale, and they want the least operational overhead.",
    choices: [
      { id: "A", text: "Use a Bedrock agent with the default ReAct orchestration strategy so each iteration states a rationale, calls one action, and continues from the observation." },
      { id: "B", text: "Send one InvokeModel request that asks the model to invent both lookup results without calling the city systems." },
      { id: "C", text: "Fine-tune a foundation model on last year's permit PDFs and drop the live lookup tools." },
      { id: "D", text: "Run a Step Functions Parallel state that always calls parcel and zoning, even when the address is missing." }
    ],
    correct: ["A"],
    why: "The default agent orchestration strategy is ReAct, which alternates a rationale and a tool call until the observations are enough to answer.",
    optionExplanations: [
      { id: "A", correct: true, text: "ReAct is the default orchestration strategy, and each iteration records why the next action was chosen." },
      { id: "B", correct: false, text: "A single completion cannot read the live parcel system, so the second step would be guessed." },
      { id: "C", correct: false, text: "Fine-tuning on old PDFs does not query today's parcel or zoning records." },
      { id: "D", correct: false, text: "A fixed parallel graph calls both systems even when the first result says the address is invalid." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/orch-strategy.html"
  },
  {
    id: "o-2-1-2-02",
    task: "2.1",
    skill: "2.1.2",
    domain: 2,
    difficulty: 2,
    milestone: "M2",
    chapters: ["11"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 2", "DRAFT"],
    stem: "Cedar Bank's fraud queue accepts only JSON with caseId, riskBand, and citedRule. Free-text answers are dropped by the case system. Bedrock must enforce that shape, rather than a regular expression in the application. They want the least operational overhead.",
    choices: [
      { id: "A", text: "Add a line that says to respond in JSON, then split the model text on commas in the browser." },
      { id: "B", text: "Store the schema in a README and rely on reviewers to notice when the model drifts." },
      { id: "C", text: "Pass a JSON schema through Bedrock structured output on the Converse or InvokeModel request." },
      { id: "D", text: "Turn on a knowledge base and treat the top retrieved passage as the risk band." }
    ],
    correct: ["C"],
    why: "Structured output compiles the JSON schema and returns a response that conforms to it, so the case system does not parse prose.",
    optionExplanations: [
      { id: "A", correct: false, text: "A prompt line is not validated by the service, and splitting on commas breaks when a field contains a comma." },
      { id: "B", correct: false, text: "A document in the repo does not constrain the model response at runtime." },
      { id: "C", correct: true, text: "Structured output checks the schema and constrains the model response to those fields." },
      { id: "D", correct: false, text: "A retrieved passage is context for an answer, not a validated decision object." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/structured-output.html"
  },
  {
    id: "o-2-1-2-03",
    task: "2.1",
    skill: "2.1.2",
    domain: 2,
    difficulty: 2,
    milestone: "M2",
    chapters: ["11"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 2", "DRAFT"],
    stem: "Fieldnote Logistics processes every damage photo in the same order: classify the image, extract the claim fields, then write a short summary. Planners must not insert extra tool calls. They want a known workflow rather than an agent, with the least operational overhead.",
    choices: [
      { id: "A", text: "Give a supervisor agent a wildcard IAM policy and let it choose any internal API for each photo." },
      { id: "B", text: "Build a Bedrock Flow that links a classify prompt node, an extract prompt node, and a summary prompt node in that fixed order." },
      { id: "C", text: "Ask one model to do all three jobs in a single unstructured paragraph." },
      { id: "D", text: "Host a custom planner on a GPU fleet that rewrites the graph for every photo." }
    ],
    correct: ["B"],
    why: "A flow runs the nodes you connect, so the photo follows the same path without an open planning loop.",
    optionExplanations: [
      { id: "A", correct: false, text: "A supervisor with broad permissions can invent calls this photo path is not allowed to make." },
      { id: "B", correct: true, text: "The flow graph fixes the order of the three prompt nodes, which matches a path that never changes." },
      { id: "C", correct: false, text: "One paragraph does not give the claim system separate artifacts from each step." },
      { id: "D", correct: false, text: "A GPU planner is extra operations for a sequence that is already known." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/flows.html"
  },
  {
    id: "o-2-1-3-01",
    task: "2.1",
    skill: "2.1.3",
    domain: 2,
    difficulty: 1,
    milestone: "M2",
    chapters: ["11"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 2", "DRAFT"],
    stem: "Pico Retail's catalog agent calls the inventory tool, receives a count, and then calls the same tool again until the conversation bill spikes. Staff need a stop the model cannot override by asking for one more lookup. They want that limit in the agent loop, with the least operational overhead, rather than a longer Lambda timeout.",
    choices: [
      { id: "A", text: "Use a custom orchestration function that counts tool rounds and returns FINISH when the round limit is hit." },
      { id: "B", text: "Raise the tool Lambda timeout from 30 seconds to 15 minutes so the loop has more time to settle." },
      { id: "C", text: "Add the sentence do not loop to the agent instruction and leave the orchestration loop unchanged." },
      { id: "D", text: "Switch to a larger foundation model so the agent needs fewer lookups." }
    ],
    correct: ["A"],
    why: "Custom orchestration owns the loop, and a FINISH event ends the run after the iteration budget instead of waiting for the model to stop itself.",
    optionExplanations: [
      { id: "A", correct: true, text: "The orchestration function counts rounds and finishes, so another tool request cannot extend the loop." },
      { id: "B", correct: false, text: "A longer timeout lets the same repeated lookup run for longer." },
      { id: "C", correct: false, text: "Instruction text does not enforce a maximum number of tool rounds." },
      { id: "D", correct: false, text: "A larger model can still select the same tool on every iteration." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/agents-custom-orchestration.html"
  },
  {
    id: "o-2-1-3-02",
    task: "2.1",
    skill: "2.1.3",
    domain: 2,
    difficulty: 2,
    milestone: "M2",
    chapters: ["11"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 2", "DRAFT"],
    stem: "Aster Schools counselor chats stay open on shared library computers. After several idle minutes the session must end so the next student cannot continue it, and the ended session should still be summarized for that same student on a later day. They want the least operational overhead.",
    choices: [
      { id: "A", text: "Store the session id in a cookie that lasts 30 days." },
      { id: "B", text: "Turn memory off and rely on the model to forget the chat when the browser tab closes." },
      { id: "C", text: "Page a counselor from a CloudWatch alarm and leave the session open until someone clicks end." },
      { id: "D", text: "Set the agent idle session timeout so the session ends, and keep memory enabled under that student's memory id." }
    ],
    correct: ["D"],
    why: "When the idle session timeout elapses, the session ends, and enabled memory stores that session's summary for the same memory id.",
    optionExplanations: [
      { id: "A", correct: false, text: "A long-lived cookie is how the next student on that computer continues the chat." },
      { id: "B", correct: false, text: "Disabling memory drops the summary needed next week, and closing a tab does not by itself end the server session." },
      { id: "C", correct: false, text: "An alarm notifies a person, and the session remains usable until someone acts." },
      { id: "D", correct: true, text: "The idle timeout ends the session, and memory retains the summary for that student's memory id." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/agents-memory.html"
  },
  {
    id: "o-2-1-3-03",
    task: "2.1",
    skill: "2.1.3",
    domain: 2,
    difficulty: 2,
    milestone: "M2",
    chapters: ["11"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 2", "DRAFT"],
    stem: "Nimbus Support follows a known three-step refund script. When Bedrock throttles, the current agent calls the model again immediately and exhausts the tokens-per-minute quota. They want bounded retries with backoff, then a recorded failure, using a known workflow rather than an agent that keeps planning.",
    choices: [
      { id: "A", text: "Remove the account quota so a throttle response cannot occur." },
      { id: "B", text: "Catch the error in the browser and retry in a tight loop until a success status returns." },
      { id: "C", text: "Run the refund script as a Step Functions workflow whose Bedrock task has a Retry with IntervalSeconds, BackoffRate, and MaxAttempts, then fail the execution." },
      { id: "D", text: "Double the prompt length so each throttled attempt does more work." }
    ],
    correct: ["C"],
    why: "A Step Functions Retry waits longer after each attempt and stops after MaxAttempts, which bounds throttle retries on a script whose steps are already known.",
    optionExplanations: [
      { id: "A", correct: false, text: "A service quota is not something the application deletes in order to end a retry loop." },
      { id: "B", correct: false, text: "An immediate browser loop spends the same token quota faster." },
      { id: "C", correct: true, text: "The retrier backs off and stops at MaxAttempts, after which the execution can fail instead of planning another call." },
      { id: "D", correct: false, text: "A longer prompt spends more of the token quota on every attempt." }
    ],
    evidence: "https://docs.aws.amazon.com/step-functions/latest/dg/concepts-error-handling.html"
  },
  {
    id: "o-2-1-4-01",
    task: "2.1",
    skill: "2.1.4",
    domain: 2,
    difficulty: 1,
    milestone: "M2",
    chapters: ["11"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 2", "DRAFT"],
    stem: "Northwind Clinic wants medication questions handled by a pharmacy agent and scheduling questions handled by a front-desk agent, each with its own tools. Patients still type into one chat window. Neither specialist should hold the other's permissions. They want the least operational overhead.",
    choices: [
      { id: "A", text: "Designate a supervisor Bedrock agent and attach the pharmacy and scheduling agents as collaborators so the supervisor routes each request." },
      { id: "B", text: "Put both tool sets on one agent role that can update prescriptions and calendars." },
      { id: "C", text: "Ask the patient to type a model id into the browser before every message." },
      { id: "D", text: "Publish the two specialists as unrelated websites with no shared router." }
    ],
    correct: ["A"],
    why: "Multi-agent collaboration lets a supervisor route each request to a specialist collaborator that keeps its own action groups and permissions.",
    optionExplanations: [
      { id: "A", correct: true, text: "The supervisor routes to collaborator agents, so pharmacy tools and calendar tools stay on separate agents." },
      { id: "B", correct: false, text: "One role that can both change medications and reschedule appointments removes the permission split." },
      { id: "C", correct: false, text: "A patient-supplied model id is not orchestration and exposes the routing choice to the caller." },
      { id: "D", correct: false, text: "Two separate sites leave the single chat without a component that chooses the specialist." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/agents-multi-agent-collaboration.html"
  },
  {
    id: "o-2-1-4-02",
    task: "2.1",
    skill: "2.1.4",
    domain: 2,
    difficulty: 2,
    milestone: "M2",
    chapters: ["11"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 2", "DRAFT"],
    stem: "Harbor Claims drafts a denial letter with a larger model and then checks citation coverage with a smaller model. The checker must always see the draft, and a failed check must stop the letter from being sent. They want a known workflow rather than an agent that might skip the check.",
    choices: [
      { id: "A", text: "Call only the larger model and add the words be accurate to the prompt." },
      { id: "B", text: "Let a supervisor agent decide on each letter whether the citation check is worth the cost." },
      { id: "C", text: "Fine-tune one model on both drafting and legal review so a second call is unnecessary." },
      { id: "D", text: "In a Bedrock Flow, point the draft prompt node at the larger model and the next prompt node at the checker, and route a failed check away from the send step." }
    ],
    correct: ["D"],
    why: "A flow always runs the checker node on the draft node's output, so the send step is downstream of a failed check only when you draw that path.",
    optionExplanations: [
      { id: "A", correct: false, text: "One prompt never invokes the separate coverage model." },
      { id: "B", correct: false, text: "A supervisor is allowed to skip the check, which breaks the rule that every letter is checked." },
      { id: "C", correct: false, text: "Fine-tuning does not run an independent pass over the draft that was just generated." },
      { id: "D", correct: true, text: "The second prompt node receives the draft, and the graph can keep a failed check from reaching send." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/flows.html"
  },
  {
    id: "o-2-1-4-03",
    task: "2.1",
    skill: "2.1.4",
    domain: 2,
    difficulty: 2,
    milestone: "M2",
    chapters: ["11"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 2", "DRAFT"],
    stem: "A Lumen City resident asks in one message about a bus delay and a park closure. A transit agent holds the transit tools, and a parks agent holds the parks tools. Both parts can proceed without waiting on each other. They want the least operational overhead.",
    choices: [
      { id: "A", text: "Paste both departments' system prompts into one completion and hope the model calls neither live system." },
      { id: "B", text: "Train a single model on transit schedules and parks data, then retire the specialist tools." },
      { id: "C", text: "Use a supervisor agent that splits the message and invokes the transit and parks collaborator agents, including in parallel where the parts are independent." },
      { id: "D", text: "Make the resident open two chats and paste half of the question into each." }
    ],
    correct: ["C"],
    why: "A supervisor in multi-agent collaboration can break one request into specialist tasks and run independent collaborator agents in parallel.",
    optionExplanations: [
      { id: "A", correct: false, text: "A combined prompt does not invoke the two tool sets or keep their permissions apart." },
      { id: "B", correct: false, text: "Training one model drops the live tools each department already operates." },
      { id: "C", correct: true, text: "The supervisor assigns each part to its collaborator, and independent parts can run at the same time." },
      { id: "D", correct: false, text: "Two manual chats push the routing work onto the resident." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/agents-multi-agent-collaboration.html"
  },
  {
    id: "o-2-1-5-01",
    task: "2.1",
    skill: "2.1.5",
    domain: 2,
    difficulty: 1,
    milestone: "M2",
    chapters: ["11"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 2", "DRAFT"],
    stem: "Cedar Bank will let an agent collect the fields for a wire, but the wire must not move until a banker confirms it on the bank's own screen. The agent should pause and hand those fields back to the application. They want the least operational overhead.",
    choices: [
      { id: "A", text: "Tell the model in the instruction never to send a wire unless it feels sure." },
      { id: "B", text: "Configure the transfer action group to return control, then submit the tool result only after the banker approves, using the returned invocation id." },
      { id: "C", text: "Sleep for five minutes inside the tool Lambda and hope a banker notices a log line." },
      { id: "D", text: "Send the wire immediately and email the banker a receipt." }
    ],
    correct: ["B"],
    why: "Return of control gives the application the elicited fields and an invocation id, so the wire is sent only after the banker decides and the agent is resumed with that result.",
    optionExplanations: [
      { id: "A", correct: false, text: "Instruction text does not pause the action or show a banker a confirmation screen." },
      { id: "B", correct: true, text: "The InvokeAgent response carries the fields and invocation id, and the app returns one result after approval." },
      { id: "C", correct: false, text: "A sleep still occupies the tool and never presents the fields for a decision." },
      { id: "D", correct: false, text: "The wire has already moved by the time the banker reads the receipt." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/agents-returncontrol.html"
  }
]);
