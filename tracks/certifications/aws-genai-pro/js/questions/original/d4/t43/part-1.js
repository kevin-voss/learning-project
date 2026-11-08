window.AIP = window.AIP || {};
AIP.registerQuestions([
  {
    id: "o-4-3-1-01",
    task: "4.3",
    skill: "4.3.1",
    domain: 4,
    difficulty: 1,
    milestone: "M7",
    chapters: ["19"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 4", "DRAFT"],
    stem: "Fieldnote Logistics wants one operations screen for the dispatcher assistant: how many Bedrock calls ran, how long they took, how often they throttled, and how many input and output tokens they used. Prompt text must stay off the wallboard. Those runtime metrics are already in CloudWatch. What should the screen show?",
    choices: [
      { id: "A", text: "A board of CloudTrail console sign-in events for the operations account." },
      { id: "B", text: "A CloudWatch dashboard of Bedrock runtime metrics Invocations, InvocationLatency, InvocationThrottles, InputTokenCount, and OutputTokenCount." },
      { id: "C", text: "A graph of Lambda ConcurrentExecutions with no Bedrock metrics on it." },
      { id: "D", text: "A listing of object keys in the model invocation log bucket." }
    ],
    correct: ["B"],
    why: "Bedrock publishes those runtime metrics for accepted calls, latency, throttles, and token counts. A CloudWatch dashboard is the view that puts them on one screen without showing prompt text.",
    optionExplanations: [
      { id: "A", correct: false, text: "Console sign-in events do not count model calls, latency, throttles, or tokens." },
      { id: "B", correct: true, text: "Invocations, InvocationLatency, InvocationThrottles, InputTokenCount, and OutputTokenCount are the runtime metrics that match this wallboard." },
      { id: "C", correct: false, text: "Lambda concurrency is a function capacity metric and omits Bedrock token and throttle counts." },
      { id: "D", correct: false, text: "An object listing is not a metric dashboard and can expose logged prompts the wallboard is not allowed to show." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/monitoring-runtime-metrics.html"
  },
  {
    id: "o-4-3-2-01",
    task: "4.3",
    skill: "4.3.2",
    domain: 4,
    difficulty: 1,
    milestone: "M7",
    chapters: ["19"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 4", "DRAFT"],
    stem: "Pico Retail shipped a prompt edit at noon. InputTokenCount on the shopping model jumped well above the morning baseline, and the running cost moved with it. Shoppers did not report a quality problem. The on-call engineer wants a page before the next business day if input tokens spike like that again. Which alarm matches the spike?",
    choices: [
      { id: "A", text: "A CloudWatch alarm on Bedrock InputTokenCount that notifies on-call when the count crosses the baseline." },
      { id: "B", text: "An alarm on CPU of the storefront web servers." },
      { id: "C", text: "A monthly invoice review with no alarm in between." },
      { id: "D", text: "An alarm on InvocationLatency only, on the assumption that a token spike always appears as slower calls." }
    ],
    correct: ["A"],
    why: "InputTokenCount is the runtime metric for tokens in the input. Alarming on that series catches the prompt-size spike the noon edit already produced.",
    optionExplanations: [
      { id: "A", correct: true, text: "InputTokenCount counts input tokens, so a CloudWatch alarm on it pages on-call when the prompt grows the way it did at noon." },
      { id: "B", correct: false, text: "Storefront CPU does not measure how many tokens Bedrock received." },
      { id: "C", correct: false, text: "Waiting for the invoice misses the request to know before the next business day." },
      { id: "D", correct: false, text: "InvocationLatency can move for other reasons, and a larger prompt does not have to show up as slower calls before the token metric does." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/monitoring-runtime-metrics.html"
  },
  {
    id: "o-4-3-2-02",
    task: "4.3",
    skill: "4.3.2",
    domain: 4,
    difficulty: 2,
    milestone: "M7",
    chapters: ["19"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 4", "DRAFT"],
    stem: "Aster Schools sees normal token counts and normal InvocationLatency, yet more parents mark answers wrong. The cited passage often does not contain the date the assistant spoke. Bedrock has no Hallucination metric. The app already records a thumbs-down with the request id, and model invocation logging can be turned on. How should they watch this quality break?",
    choices: [
      { id: "A", text: "Alarm on a HallucinationCount metric in the AWS/Bedrock namespace." },
      { id: "B", text: "Treat a rising Invocations count as proof that answers stayed grounded." },
      { id: "C", text: "Alarm on the thumbs-down rate and use model invocation logs to read the request, context, and completion for those request ids." },
      { id: "D", text: "Read VPC flow logs for the Lambda subnet and look for the bad dates there." }
    ],
    correct: ["C"],
    why: "Quality here is a parent signal plus the actual prompt and completion. Invocation logging stores request data, response data, and metadata so those thumbs-down request ids can be opened.",
    optionExplanations: [
      { id: "A", correct: false, text: "Bedrock does not publish a HallucinationCount metric to alarm on." },
      { id: "B", correct: false, text: "Invocations counts accepted model calls and says nothing about whether the cited passage contained the date." },
      { id: "C", correct: true, text: "A custom thumbs-down alarm flags the quality spike, and invocation logs hold the request and response needed to inspect that request id." },
      { id: "D", correct: false, text: "VPC flow logs show network flows, not the prompt, the citation, or the spoken date." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/model-invocation-logging.html"
  },
  {
    id: "o-4-3-3-01",
    task: "4.3",
    skill: "4.3.3",
    domain: 4,
    difficulty: 1,
    milestone: "M7",
    chapters: ["19"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 4", "DRAFT"],
    stem: "One Nimbus Support chat enters through API Gateway, runs in Lambda, retrieves from a knowledge base, and calls Converse. The widget printed a request id. Support wants those hops on a single trace instead of four clocks lined up by eye. What produces that trace?",
    choices: [
      { id: "A", text: "Sort every CloudWatch log group by timestamp and call the alignment a trace." },
      { id: "B", text: "Open the AWS Config history for the Lambda function." },
      { id: "C", text: "Enable S3 server access logging on the prompt bucket and treat object GETs as the trace." },
      { id: "D", text: "Turn on X-Ray tracing, propagate the trace header from API Gateway through Lambda, and open the trace that groups those segments." }
    ],
    correct: ["D"],
    why: "X-Ray receives segments from the services and groups segments that share a request into one trace. Propagating the trace header is what keeps Gateway, Lambda, and the downstream calls on that request.",
    optionExplanations: [
      { id: "A", correct: false, text: "Timestamp sorting is a manual join and falls apart when clocks and log lines interleave." },
      { id: "B", correct: false, text: "Config history records configuration changes, not the hops inside one chat turn." },
      { id: "C", correct: false, text: "S3 access logs list object requests and do not stitch Gateway, Lambda, retrieve, and Converse into one trace." },
      { id: "D", correct: true, text: "With tracing on and the header propagated, X-Ray groups the segments for that request into one trace." }
    ],
    evidence: "https://docs.aws.amazon.com/xray/latest/devguide/xray-concepts.html"
  },
  {
    id: "o-4-3-3-02",
    task: "4.3",
    skill: "4.3.3",
    domain: 4,
    difficulty: 2,
    milestone: "M7",
    chapters: ["19"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 4", "DRAFT"],
    stem: "Northwind Clinic's scheduling agent sometimes queries the knowledge base twice and calls the booking action before it answers. Lambda duration is a single number, so the loop is hidden. They can pass a trace flag on InvokeAgent. They need the rationale, the knowledge base queries, and the action inputs for that session. Where do they look?",
    choices: [
      { id: "A", text: "Raise the agent iteration cap and skip any trace until the loop stops." },
      { id: "B", text: "Enable the agent trace at runtime and read the orchestration trace, including knowledge base queries and action group inputs and outputs." },
      { id: "C", text: "Use the load balancer access log status code as the step list." },
      { id: "D", text: "Turn on CloudTrail data events for S3 and treat object reads as the agent steps." }
    ],
    correct: ["B"],
    why: "An agent trace records the orchestration step, the knowledge bases queried, and the inputs and outputs of the action groups the agent invoked. Lambda duration cannot separate those steps.",
    optionExplanations: [
      { id: "A", correct: false, text: "A higher iteration cap allows more loops and does not show which query or action already ran." },
      { id: "B", correct: true, text: "The runtime trace includes orchestration, knowledge base queries, and action group inputs and outputs for that invocation." },
      { id: "C", correct: false, text: "An access log status code is one edge result, not the agent's rationale or tool inputs." },
      { id: "D", correct: false, text: "S3 data events are object operations and are not the agent's booking action or knowledge base steps." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/trace-events.html"
  },
  {
    id: "o-4-3-4-01",
    task: "4.3",
    skill: "4.3.4",
    domain: 4,
    difficulty: 1,
    milestone: "M7",
    chapters: ["19"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 4", "DRAFT"],
    stem: "Harbor Claims' agent can call a getReserve action group backed by Lambda. Some sessions invoke that action more than ten times for one adjuster message, and the downstream reserve service is rate limited. The model invocation itself still succeeds. They need each tool input and a way to notice the repeated calls. What should they watch?",
    choices: [
      { id: "A", text: "Use the agent trace to list each action group invocation and its inputs, and alarm when getReserve calls in a session pass a threshold." },
      { id: "B", text: "Watch OutputTokenCount, which increments once per tool call." },
      { id: "C", text: "Delete the action group so the model cannot call it, and treat that as the monitoring design." },
      { id: "D", text: "Read CloudTrail events for the Bedrock console to see the tool payloads." }
    ],
    correct: ["A"],
    why: "The agent trace includes the inputs sent to action groups and the outputs they return. Counting those getReserve steps in a session is how the repeated tool call shows up when the model call itself succeeded.",
    optionExplanations: [
      { id: "A", correct: true, text: "Trace events show each action group input, so a threshold on getReserve calls in one session catches the loop." },
      { id: "B", correct: false, text: "OutputTokenCount measures generated tokens, not how many times an action group ran." },
      { id: "C", correct: false, text: "Removing the tool stops the action and does not observe it." },
      { id: "D", correct: false, text: "Console CloudTrail events are control-plane records and do not list runtime tool inputs for a session." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/trace-events.html"
  },
  {
    id: "o-4-3-4-02",
    task: "4.3",
    skill: "4.3.4",
    domain: 4,
    difficulty: 2,
    milestone: "M7",
    chapters: ["19"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 4", "DRAFT"],
    stem: "Lumen City's permit agent tells residents a permit is approved even when the permit-status Lambda returns an error. Bedrock Invocations stays healthy because the model still produced text. The failure is inside the tool. On-call needs a page when that tool fails, separate from a successful model call. Which alarm is that page?",
    choices: [
      { id: "A", text: "An alarm only on Bedrock InvocationServerErrors." },
      { id: "B", text: "Treat HTTP 200 from Converse as proof the permit tool succeeded." },
      { id: "C", text: "A CloudWatch alarm on the tool Lambda Errors metric, kept separate from Bedrock Invocations." },
      { id: "D", text: "An alarm on Lambda ConcurrentExecutions, using concurrency as the tool-error signal." }
    ],
    correct: ["C"],
    why: "Lambda sends an Errors metric when the function fails. That series still moves when Bedrock accepted the model call and the permit tool was the part that failed.",
    optionExplanations: [
      { id: "A", correct: false, text: "InvocationServerErrors counts Bedrock server-side failures, and this model call is succeeding." },
      { id: "B", correct: false, text: "A 200 from Converse means the model response was produced, not that the permit Lambda succeeded." },
      { id: "C", correct: true, text: "The Lambda Errors metric counts function failures, so on-call is paged for the tool even while Bedrock Invocations looks healthy." },
      { id: "D", correct: false, text: "ConcurrentExecutions measures in-flight executions, not failed permit lookups." }
    ],
    evidence: "https://docs.aws.amazon.com/lambda/latest/dg/monitoring-metrics-types.html"
  },
  {
    id: "o-4-3-5-01",
    task: "4.3",
    skill: "4.3.5",
    domain: 4,
    difficulty: 1,
    milestone: "M7",
    chapters: ["19"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 4", "DRAFT"],
    stem: "Cedar Bank stores fee-sheet vectors in Amazon OpenSearch Service. After a large ingest, search feels slow and some new sheets never appear in answers. The Bedrock token dashboard looks ordinary. They need the index on a watch, not another chat-model chart. Which signals belong on that watch?",
    choices: [
      { id: "A", text: "Bedrock OutputTokenCount as the stand-in for index health." },
      { id: "B", text: "The foundation model temperature value in application config." },
      { id: "C", text: "CloudTrail events for people opening the OpenSearch console." },
      { id: "D", text: "OpenSearch Service CloudWatch metrics such as SearchLatency, IndexingRate, and JVMMemoryPressure, plus whether ingest is still indexing." }
    ],
    correct: ["D"],
    why: "SearchLatency, IndexingRate, and JVMMemoryPressure describe the domain that holds the vectors. Token counts on the chat model do not show a slow or unfinished index.",
    optionExplanations: [
      { id: "A", correct: false, text: "OutputTokenCount measures model output and stays ordinary while the index is the component that slowed down." },
      { id: "B", correct: false, text: "Temperature is a sampling parameter, not an index health metric." },
      { id: "C", correct: false, text: "Console CloudTrail events show who opened a console, not search time or indexing progress." },
      { id: "D", correct: true, text: "Those OpenSearch CloudWatch metrics cover search time, indexing rate, and JVM heap pressure on the vector domain." }
    ],
    evidence: "https://docs.aws.amazon.com/opensearch-service/latest/developerguide/managedomains-cloudwatchmetrics.html"
  },
  {
    id: "o-4-3-5-02",
    task: "4.3",
    skill: "4.3.5",
    domain: 4,
    difficulty: 2,
    milestone: "M7",
    chapters: ["19"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 4", "DRAFT"],
    stem: "Fieldnote Logistics keeps adding shipment-document embeddings to an OpenSearch Service k-NN index. Searches crawl or fail when the in-memory graph cache is under pressure. Nothing alerts on k-NN graph memory today. A larger chat model would not give the data nodes more room for graphs. What should they alarm on?",
    choices: [
      { id: "A", text: "The Bedrock max token setting, so vector search has a larger context budget." },
      { id: "B", text: "The OpenSearch KNNGraphMemoryUsage metric, and scale data nodes or slow new graph builds before memory pressure rejects searches." },
      { id: "C", text: "Extra provisioned throughput on the chat model, expecting the model units to enlarge the k-NN cache." },
      { id: "D", text: "Foundation-model Top K, treating it as the same control as k-NN graph size." }
    ],
    correct: ["B"],
    why: "KNNGraphMemoryUsage reports the size of k-NN graphs in memory on each data node. Performance suffers when that usage passes the memory available for graphs, which is the pressure this index is hitting.",
    optionExplanations: [
      { id: "A", correct: false, text: "The model response length does not allocate memory for OpenSearch k-NN graphs." },
      { id: "B", correct: true, text: "KNNGraphMemoryUsage is the CloudWatch metric for graph cache size, and crossing the node limit is when k-NN search performance drops." },
      { id: "C", correct: false, text: "Bedrock model units reserve inference tokens and do not expand the OpenSearch graph cache." },
      { id: "D", correct: false, text: "Top K limits how many tokens the model considers and is unrelated to the k-NN graph in OpenSearch." }
    ],
    evidence: "https://docs.aws.amazon.com/opensearch-service/latest/developerguide/knn.html"
  },
  {
    id: "o-4-3-6-01",
    task: "4.3",
    skill: "4.3.6",
    domain: 4,
    difficulty: 1,
    milestone: "M7",
    chapters: ["19"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 4", "DRAFT"],
    stem: "Pico Retail's size-guide answers sometimes stop mid-sentence. The application logs HTTP 200 from Converse and shows the partial text as a finished answer. A sampled response has stopReason set to max_tokens. Shoppers read the cut-off guide as if it were complete. How do they detect this generation failure?",
    choices: [
      { id: "A", text: "Alarm only on API Gateway 5xx, because a cut-off answer always returns 500." },
      { id: "B", text: "Retry with a higher temperature whenever the HTTP status is 200." },
      { id: "C", text: "Record the Converse stopReason and alarm when max_tokens becomes common, instead of treating every HTTP 200 as a complete answer." },
      { id: "D", text: "Delete the knowledge base so the model writes a shorter guide from memory." }
    ],
    correct: ["C"],
    why: "Converse reports stopReason max_tokens when generation stops because it hit the length limit. That can still be an HTTP success, so the status code hides the cut-off answer.",
    optionExplanations: [
      { id: "A", correct: false, text: "The calls in this incident return HTTP 200, so a 5xx alarm never sees the cut-off guide." },
      { id: "B", correct: false, text: "Raising temperature on every success changes sampling and does not identify a max_tokens stop." },
      { id: "C", correct: true, text: "stopReason max_tokens is the field that marks a length cutoff, including on responses the API otherwise accepted." },
      { id: "D", correct: false, text: "Removing retrieval drops grounding and does not tell you when an answer stopped for length." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/conversation-inference.html"
  },
  {
    id: "o-4-3-6-02",
    task: "4.3",
    skill: "4.3.6",
    domain: 4,
    difficulty: 2,
    milestone: "M7",
    chapters: ["19"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 4", "DRAFT"],
    stem: "Aster Schools uses a Bedrock guardrail that can block or redact a parent chat. Other chats fail because the model is throttled. The app shows both as try again, so operators retry safety blocks and also miss real capacity failures. They need those failures kept apart. Which signals do that?",
    choices: [
      { id: "A", text: "Read stopReason guardrail_intervened and the guardrail trace for safety interventions, and alarm on InvocationThrottles for capacity, with separate handling for each." },
      { id: "B", text: "Retry every failure ten times, including guardrail blocks and throttles." },
      { id: "C", text: "Turn the guardrail off so the only remaining failure is throttling." },
      { id: "D", text: "Use one alarm on Lambda Duration to represent both the guardrail and the throttle." }
    ],
    correct: ["A"],
    why: "Converse stopReason includes guardrail_intervened, and the response can carry a guardrail trace. InvocationThrottles counts throttled calls separately, so a safety block and a capacity failure are not the same event.",
    optionExplanations: [
      { id: "A", correct: true, text: "guardrail_intervened marks a guardrail stop, and InvocationThrottles is the runtime metric for throttled calls, so the two failures stay distinct." },
      { id: "B", correct: false, text: "The same retry loop treats a policy block like a capacity error and can hammer a quota that is already throttling." },
      { id: "C", correct: false, text: "Disabling the guardrail removes the safety control instead of detecting its interventions." },
      { id: "D", correct: false, text: "Lambda duration does not say whether the model stopped for a guardrail or was throttled." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_Converse.html"
  }
]);
