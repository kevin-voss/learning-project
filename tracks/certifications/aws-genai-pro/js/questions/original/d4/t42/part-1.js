window.AIP = window.AIP || {};
AIP.registerQuestions([
  {
    id: "o-4-2-1-01",
    task: "4.2",
    skill: "4.2.1",
    domain: 4,
    difficulty: 1,
    milestone: "M1",
    chapters: ["20"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 4", "DRAFT"],
    stem: "Harbor Claims adjusters watch an empty panel until the full coverage paragraph arrives, often past ten seconds. Logs show the model emitting the first tokens after about one second. The API uses Converse, buffers the whole body, and only then writes to the browser. How should they cut the wait the adjuster feels?",
    choices: [
      { id: "A", text: "Raise the API Gateway integration timeout and keep the spinner until the full body returns." },
      { id: "B", text: "Switch the live note to batch inference and fill the panel from the S3 output file." },
      { id: "C", text: "Call ConverseStream or InvokeModelWithResponseStream and paint each token as it arrives." },
      { id: "D", text: "Enable latency-optimized inference and still wait for the completed body before painting the panel." }
    ],
    correct: ["C"],
    why: "The first tokens are already ready in about a second. Streaming responses let the UI show them immediately instead of holding the panel blank for the rest of the completion.",
    optionExplanations: [
      { id: "A", correct: false, text: "A longer timeout prevents a gateway failure and leaves the adjuster looking at an empty panel." },
      { id: "B", correct: false, text: "Batch inference writes a file later and is not a way to show the start of a live note." },
      { id: "C", correct: true, text: "ConverseStream and InvokeModelWithResponseStream return tokens incrementally so the client can render while generation continues." },
      { id: "D", correct: false, text: "Latency-optimized inference can shorten generation, but buffering the full body still hides tokens that are already available." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/conversation-inference.html"
  },
  {
    id: "o-4-2-2-01",
    task: "4.2",
    skill: "4.2.2",
    domain: 4,
    difficulty: 1,
    milestone: "M2",
    chapters: ["20"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 4", "DRAFT"],
    stem: "Lumen City's permit bot misses form ids such as PZ-1884 even when that id is printed in the ordinance PDF. Search is vector-only, so the id is treated like nearby words. Every lookup also reranks 40 chunks with a large model, and the vector store has a filterable text field. Which change speeds retrieval and still finds the id?",
    choices: [
      { id: "A", text: "Use hybrid search so keyword match can catch the form id while semantic search handles paraphrases, and retrieve fewer chunks before any rerank." },
      { id: "B", text: "Swap in a larger embedding model and keep vector-only search over the same 40 chunks." },
      { id: "C", text: "Skip the knowledge base and paste the ordinance into the prompt." },
      { id: "D", text: "Raise Top P so the generator is more willing to guess the form id." }
    ],
    correct: ["A"],
    why: "Hybrid search combines vector embeddings with a search over the raw text, which is how an exact form id is found. Fewer chunks before rerank shortens that second step.",
    optionExplanations: [
      { id: "A", correct: true, text: "Knowledge Bases hybrid search queries embeddings and raw text together, and a lower numberOfResults caps how much is passed on to rerank." },
      { id: "B", correct: false, text: "A larger embedding model still may not treat a rare form id as an exact string, and it does not remove the 40-chunk rerank." },
      { id: "C", correct: false, text: "Pasting the ordinance inflates the prompt and throws away retrieval instead of making search faster." },
      { id: "D", correct: false, text: "Top P changes which tokens the generator samples and does not look up PZ-1884 in the index." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/kb-test-config.html"
  },
  {
    id: "o-4-2-2-02",
    task: "4.2",
    skill: "4.2.2",
    domain: 4,
    difficulty: 2,
    milestone: "M3",
    chapters: ["20"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 4", "DRAFT"],
    stem: "Cedar Bank's fee search spends several seconds before the model starts. Every associate has already picked one business line, and that line is metadata on each chunk, but the retrieve call sends no filter. The call also asks for 30 chunks and reranks all 30. A trial with the business-line filter and 8 chunks still cites the right fee schedule. What should they change?",
    choices: [
      { id: "A", text: "Drop metadata from the index so every search scans the full fee corpus the same way." },
      { id: "B", text: "Re-embed the corpus with a slower, larger embedding model and keep the unfiltered 30-chunk retrieve." },
      { id: "C", text: "Increase the model max tokens so generation overlaps the long search." },
      { id: "D", text: "Filter the knowledge base query to the selected business line and lower numberOfResults to the smaller set that still passes the citation check." }
    ],
    correct: ["D"],
    why: "Metadata filters restrict which chunks are queried, and numberOfResults caps how many come back. Both shrink the retrieve-and-rerank work that dominates this trace.",
    optionExplanations: [
      { id: "A", correct: false, text: "Removing the business-line attribute takes away the filter that already kept the right schedule in the trial." },
      { id: "B", correct: false, text: "A larger embedding model makes indexing and queries heavier and leaves the unfiltered 30-chunk retrieve in place." },
      { id: "C", correct: false, text: "The output length limit applies after retrieval and cannot run generation in parallel with a search that has not returned." },
      { id: "D", correct: true, text: "A metadata filter plus a lower numberOfResults returns the smaller candidate set the trial already showed was enough." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/kb-test-config.html"
  },
  {
    id: "o-4-2-3-01",
    task: "4.2",
    skill: "4.2.3",
    domain: 4,
    difficulty: 1,
    milestone: "M3",
    chapters: ["20"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 4", "DRAFT"],
    stem: "Fieldnote Logistics runs a live dispatcher assistant on on-demand Bedrock. During the morning wave, InvocationThrottles climbs and dispatchers lose turns. Weekday token volume is predictable and nights are quiet. They need more tokens per minute while people are waiting, not a file of answers the next morning. Which change raises that live throughput?",
    choices: [
      { id: "A", text: "Move the live turns into a batch inference job and poll Amazon S3 for each radio reply." },
      { id: "B", text: "Purchase provisioned throughput so model units supply a dedicated input and output token rate per minute for this model." },
      { id: "C", text: "Wrap every throttled call in an immediate retry loop with no backoff." },
      { id: "D", text: "Increase the maximum response length so each successful call does more work." }
    ],
    correct: ["B"],
    why: "Each model unit delivers a stated number of input tokens and output tokens per minute. That reserved rate is how you raise live throughput when on-demand calls are throttling.",
    optionExplanations: [
      { id: "A", correct: false, text: "Batch inference returns results later in S3 and does not give the dispatcher a token rate for the live wave." },
      { id: "B", correct: true, text: "Provisioned throughput buys model units whose throughput is defined as input and output tokens per minute." },
      { id: "C", correct: false, text: "Immediate retries add calls against the same quota and can deepen throttling." },
      { id: "D", correct: false, text: "A higher output ceiling lets replies run longer and does not increase the tokens the account may process per minute." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/prov-throughput.html"
  },
  {
    id: "o-4-2-3-02",
    task: "4.2",
    skill: "4.2.3",
    domain: 4,
    difficulty: 2,
    milestone: "M3",
    chapters: ["20"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 4", "DRAFT"],
    stem: "Pico Retail's shopper chat and an internal replay tool share one on-demand model quota. At lunch the replay tool sends long prompts, EstimatedTPMQuotaUsage spikes, and shoppers see throttles. The replay can move to evening. Shoppers cannot. How do they raise token throughput for the shopper path?",
    choices: [
      { id: "A", text: "Put shopper turns into the same evening batch job as the replay tool." },
      { id: "B", text: "Lower temperature on the shared model so the lunch quota stretches further." },
      { id: "C", text: "Attach provisioned throughput to the shopper model so its token rate is reserved, and keep the replay tool off that capacity during lunch." },
      { id: "D", text: "Turn off streaming on shopper calls so each reply consumes fewer output tokens." }
    ],
    correct: ["C"],
    why: "Provisioned throughput gives the shopper model its own input and output tokens per minute. The replay tool then stops spending the shoppers' on-demand quota at lunch.",
    optionExplanations: [
      { id: "A", correct: false, text: "Batch inference would make shoppers wait on an asynchronous job, which misses the live lunch traffic." },
      { id: "B", correct: false, text: "Temperature changes sampling and does not increase the tokens-per-minute quota." },
      { id: "C", correct: true, text: "Model units reserve a token throughput for the model you purchase them for, which isolates shoppers from the replay tool." },
      { id: "D", correct: false, text: "Streaming changes how tokens are delivered, not how many output tokens the reply contains or the shared quota." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/prov-throughput.html"
  },
  {
    id: "o-4-2-4-01",
    task: "4.2",
    skill: "4.2.4",
    domain: 4,
    difficulty: 1,
    milestone: "M3",
    chapters: ["20"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 4", "DRAFT"],
    stem: "Aster Schools extracts JSON fields studentBus and pickupWindow from one retrieved route card. The same card comes back with different key names on each run. Temperature is high and Top P is near 1, so less likely phrasings win often. The facts have to stay in the card, and nobody asked for creative wording. Which sampling change stabilizes the JSON?",
    choices: [
      { id: "A", text: "Lower temperature and lower Top P so the model stays on higher-probability tokens for that card." },
      { id: "B", text: "Raise temperature and Top K so the extractor explores more key names." },
      { id: "C", text: "Increase max tokens only and leave temperature high." },
      { id: "D", text: "Switch on latency-optimized inference and leave the high temperature and Top P unchanged." }
    ],
    correct: ["A"],
    why: "A lower temperature steepens the next-token distribution toward likely tokens, and a lower Top P considers a smaller share of that distribution. Together they make the same card produce more stable JSON.",
    optionExplanations: [
      { id: "A", correct: true, text: "Lower temperature and Top P keep sampling on the higher-probability tokens instead of the rare key names showing up now." },
      { id: "B", correct: false, text: "Higher temperature and Top K widen the candidate pool, which is the opposite of a stable extract." },
      { id: "C", correct: false, text: "Max tokens limits length and does not pull sampling back onto the most likely field names." },
      { id: "D", correct: false, text: "Latency-optimized inference selects a faster serving path and is not the temperature or Top P control." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/inference-parameters.html"
  },
  {
    id: "o-4-2-4-02",
    task: "4.2",
    skill: "4.2.4",
    domain: 4,
    difficulty: 2,
    milestone: "M3",
    chapters: ["20"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 4", "DRAFT"],
    stem: "Nimbus Support scores a ticket priority that must match on every rerun of the same transcript. An optional closing sentence may vary in tone. Both share one Converse call with temperature 0.9 and a high Top K, and the priority label flips between high and urgent. Auditors compare those reruns. How should sampling be set?",
    choices: [
      { id: "A", text: "Set temperature to 1 and Top P to 1 on the priority call so auditors see the full range of labels." },
      { id: "B", text: "Add a stop sequence of a single space so the priority call ends on the first token." },
      { id: "C", text: "Raise max tokens so the label and a long essay share the current high-temperature call." },
      { id: "D", text: "Use a low temperature and a low Top K for the priority call, and use a higher temperature only on a separate call if the varied closing sentence is still required." }
    ],
    correct: ["D"],
    why: "One request has one temperature and one Top K. The priority label needs the low settings that keep the most likely tokens, and a varied sentence needs its own call if it is still wanted.",
    optionExplanations: [
      { id: "A", correct: false, text: "Temperature 1 and Top P 1 flatten sampling and make the label less repeatable across auditor reruns." },
      { id: "B", correct: false, text: "A space stop sequence can cut the text off and does not choose the most likely priority token." },
      { id: "C", correct: false, text: "More output room on a high-temperature call gives the label even more chances to drift." },
      { id: "D", correct: true, text: "Low temperature and low Top K restrict the priority call to the most likely candidates, while a second call can carry a higher temperature for tone." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/inference-parameters.html"
  },
  {
    id: "o-4-2-5-01",
    task: "4.2",
    skill: "4.2.5",
    domain: 4,
    difficulty: 1,
    milestone: "M3",
    chapters: ["20"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 4", "DRAFT"],
    stem: "Northwind Clinic is buying provisioned throughput for nurse chat. Peak load is about 40 requests a minute. Each request averages 1,800 input tokens and 250 output tokens. They ordered model units from the number 40 and still throttle at that same request rate. The limit they are hitting is tokens, not HTTP calls. How should they size the purchase?",
    choices: [
      { id: "A", text: "Order 40 model units, one per request, and ignore how long each prompt and answer is." },
      { id: "B", text: "Recompute model units from peak input tokens per minute and peak output tokens per minute." },
      { id: "C", text: "Size the purchase from average overnight traffic so the commitment stays small." },
      { id: "D", text: "Copy the batch inference job quota and use that number for the live nurse chat." }
    ],
    correct: ["B"],
    why: "A model unit specifies how many input tokens it can process per minute and how many output tokens it can generate per minute. Request count alone does not describe that load.",
    optionExplanations: [
      { id: "A", correct: false, text: "One unit per request ignores the token throughput each unit actually provides, which is why 40 units still throttle." },
      { id: "B", correct: true, text: "Size the model units from the peak input-token rate and the peak output-token rate, because those are the rates a model unit delivers." },
      { id: "C", correct: false, text: "Overnight averages understate the daytime token rate that is already throttling." },
      { id: "D", correct: false, text: "Batch quotas apply to asynchronous jobs and are not the capacity figure for this live chat." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/prov-throughput.html"
  },
  {
    id: "o-4-2-5-02",
    task: "4.2",
    skill: "4.2.5",
    domain: 4,
    difficulty: 2,
    milestone: "M3",
    chapters: ["20"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 4", "DRAFT"],
    stem: "Harbor Claims sized provisioned throughput when a typical prompt was about 900 input tokens. A temporary exhibit block raised that to about 2,400 input tokens for the enrollment window, then the extra text goes away. Output length and request rate are unchanged, and InvocationThrottles now fire in the same review hour. They need room for the long prompt and a way to drop the extra capacity afterward. Which purchase matches that?",
    choices: [
      { id: "A", text: "Add model units for the new input tokens per minute, on a no-commitment term so the extra units can be deleted when the exhibit is removed." },
      { id: "B", text: "Leave the model units unchanged because the request rate did not change." },
      { id: "C", text: "Shorten the API timeout so throttled calls fail faster and free capacity." },
      { id: "D", text: "Move live claim review to batch inference until enrollment ends." }
    ],
    correct: ["A"],
    why: "The same request rate now sends more input tokens per minute, so the model units have to cover that higher rate. No-commitment throughput can be deleted when the long prompt is retired, and billing continues until that delete.",
    optionExplanations: [
      { id: "A", correct: true, text: "Model units are sized from input tokens per minute, and a no-commitment purchase can be deleted when the extra exhibit leaves." },
      { id: "B", correct: false, text: "An unchanged request rate still overruns the units if each request carries far more input tokens." },
      { id: "C", correct: false, text: "A shorter timeout fails calls sooner and does not add input tokens per minute." },
      { id: "D", correct: false, text: "Adjusters are reviewing live claims, so an asynchronous batch job does not replace the reserved chat capacity." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/prov-throughput.html"
  },
  {
    id: "o-4-2-6-01",
    task: "4.2",
    skill: "4.2.6",
    domain: 4,
    difficulty: 1,
    milestone: "M7",
    chapters: ["20"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 4", "DRAFT"],
    stem: "Lumen City residents say the permit assistant is slow. The only chart in the ops channel is API Gateway 5xx count. A request passes API Gateway, Lambda, a knowledge base retrieve, and a Bedrock converse call. The team has the request id from the browser and still cannot see which hop owns the wait. What should they turn on?",
    choices: [
      { id: "A", text: "Read CloudTrail management events for the Lambda function and treat those as hop timings." },
      { id: "B", text: "Increase the Lambda timeout to 60 seconds and watch the 5xx count." },
      { id: "C", text: "Enable AWS X-Ray active tracing on the Lambda function and compare segment durations for retrieve versus the model call." },
      { id: "D", text: "Log only the final HTTP status code in the browser console." }
    ],
    correct: ["C"],
    why: "X-Ray traces show the components of the request and where time is spent. That separates a slow retrieve from a slow model call, which a 5xx count cannot do.",
    optionExplanations: [
      { id: "A", correct: false, text: "CloudTrail management events record control-plane actions, not the duration of retrieve versus converse on one resident request." },
      { id: "B", correct: false, text: "A longer timeout changes when Lambda gives up and does not show which downstream hop was slow." },
      { id: "C", correct: true, text: "Lambda active tracing sends segments to X-Ray so you can see bottlenecks across the function and the calls it makes." },
      { id: "D", correct: false, text: "A status code says the call failed or succeeded and says nothing about which hop used the time." }
    ],
    evidence: "https://docs.aws.amazon.com/lambda/latest/dg/services-xray.html"
  },
  {
    id: "o-4-2-6-02",
    task: "4.2",
    skill: "4.2.6",
    domain: 4,
    difficulty: 2,
    milestone: "M7",
    chapters: ["20"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 4", "DRAFT"],
    stem: "Cedar Bank turned on X-Ray for the fee assistant. The service graph shows the Bedrock invoke subsegment near 300 milliseconds and the OpenSearch query subsegment near 5 seconds. Fee answers are already acceptable. A teammate wants a larger foundation model because the model is the product. Which action follows the profile?",
    choices: [
      { id: "A", text: "Replace the model with a larger one and leave the 5 second search as it is." },
      { id: "B", text: "Disable X-Ray so tracing overhead cannot be the 5 second search." },
      { id: "C", text: "Increase max tokens so the model call overlaps the search segment." },
      { id: "D", text: "Spend the tuning effort on the OpenSearch query segment that dominates the trace, not on a larger model." }
    ],
    correct: ["D"],
    why: "X-Ray groups segments for one request into a trace and a service graph. Here that graph shows search, not the model, holding the time, so the next change belongs on the search hop.",
    optionExplanations: [
      { id: "A", correct: false, text: "The model segment is already the short hop, so a larger model does not address the 5 second query." },
      { id: "B", correct: false, text: "Turning tracing off hides the graph and does not make a 5 second OpenSearch query fast." },
      { id: "C", correct: false, text: "A higher output limit cannot overlap a search segment that the trace shows completing before generation." },
      { id: "D", correct: true, text: "The service graph already identifies the OpenSearch segment as the bottleneck, so that is the hop to tune." }
    ],
    evidence: "https://docs.aws.amazon.com/xray/latest/devguide/xray-concepts.html"
  }
]);
