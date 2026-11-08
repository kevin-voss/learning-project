window.AIP = window.AIP || {};
AIP.registerQuestions([
  {
    id: "o-4-1-1-01",
    task: "4.1",
    skill: "4.1.1",
    domain: 4,
    difficulty: 1,
    milestone: "M2",
    chapters: ["21"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 4", "DRAFT"],
    stem: "Northwind Clinic's discharge assistant attaches the full medication handbook on every parent question, then appends the last twenty chat turns. InputTokenCount dwarfs the short answer nurses actually need, and the handbook still has to ground the reply. Which change cuts input tokens without dropping retrieval?",
    choices: [
      { id: "A", text: "Raise the response token ceiling so the model can copy the handbook back into the answer." },
      { id: "B", text: "Lower numberOfResults so only the top handbook chunks are inserted, and replace older turns with a short summary before the model call." },
      { id: "C", text: "Switch the same full handbook prompt to latency-optimized inference." },
      { id: "D", text: "Buy provisioned throughput and keep sending the entire handbook on every turn." }
    ],
    correct: ["B"],
    why: "Input token cost follows how much text you send. Fewer retrieved chunks and a short history shrink that text while the current question still receives the passages it needs.",
    optionExplanations: [
      { id: "A", correct: false, text: "A higher output ceiling can add generated tokens and does not remove the handbook from the prompt." },
      { id: "B", correct: true, text: "numberOfResults caps how many source chunks are returned, and a summarized history stops old turns from being resent in full." },
      { id: "C", correct: false, text: "Latency-optimized inference changes response time for supported models, not how many input tokens the prompt contains." },
      { id: "D", correct: false, text: "Provisioned throughput reserves token capacity and still bills for the large prompt you continue to send." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/kb-test-config.html"
  },
  {
    id: "o-4-1-1-02",
    task: "4.1",
    skill: "4.1.1",
    domain: 4,
    difficulty: 2,
    milestone: "M2",
    chapters: ["21"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 4", "DRAFT"],
    stem: "Harbor Claims asked the model for a 120-word coverage note that cites clause ids. The max response length is still 4096 tokens, so most notes arrive as multi-page memos. OutputTokenCount rose after that release, while the retrieved clause set stayed small. How should they cut output tokens and keep the note grounded?",
    choices: [
      { id: "A", text: "Increase temperature so the model wanders into a shorter ending." },
      { id: "B", text: "Stream the memo to the adjuster UI and leave the 4096 token ceiling in place." },
      { id: "C", text: "Set a much lower maximum response length and keep the instruction to stop after the short cited note." },
      { id: "D", text: "Retrieve extra clauses so the model has more source text and writes less of its own." }
    ],
    correct: ["C"],
    why: "Length parameters set the maximum number of tokens the model may generate. A ceiling near the requested note size stops the long memo without removing the retrieved clauses.",
    optionExplanations: [
      { id: "A", correct: false, text: "A higher temperature spreads probability across less likely tokens and does not cap length." },
      { id: "B", correct: false, text: "Streaming changes when tokens appear on screen, not how many output tokens are generated." },
      { id: "C", correct: true, text: "A lower maximum response length stops generation once the short note is done, which is the output-token control for this release." },
      { id: "D", correct: false, text: "Extra retrieved clauses add input tokens and give the model more material to expand on." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/inference-parameters.html"
  },
  {
    id: "o-4-1-2-01",
    task: "4.1",
    skill: "4.1.2",
    domain: 4,
    difficulty: 1,
    milestone: "M2",
    chapters: ["21"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 4", "DRAFT"],
    stem: "Lumen City classifies 311 emails into six categories before a second step drafts a code citation. A labeled week showed a smaller model in the same family already matches the large model on the category labels. The citation step still needs the stronger model, and classification is most of the volume. Which approach stops pinning every call to the largest model?",
    choices: [
      { id: "A", text: "Use Amazon Bedrock intelligent prompt routing for that model family so easier classification prompts can land on the lower-cost model while harder replies still reach a stronger one." },
      { id: "B", text: "Fine-tune a new foundation model on the six labels before changing the live model id." },
      { id: "C", text: "Keep one large model id for both steps so the category and the citation share a single generation." },
      { id: "D", text: "Run daytime classification as a batch job while the resident is waiting on the form." }
    ],
    correct: ["A"],
    why: "Intelligent prompt routing sends each request to a model in the family that can hold response quality at lower cost, instead of forcing every email through the largest model.",
    optionExplanations: [
      { id: "A", correct: true, text: "A prompt router predicts response quality and routes across models in the family so simple prompts avoid the most expensive model." },
      { id: "B", correct: false, text: "Training a new model is a heavier project than selecting a cheaper model that already meets the category eval." },
      { id: "C", correct: false, text: "One large model id keeps the high price on the classification traffic that the smaller model already handles." },
      { id: "D", correct: false, text: "Batch inference is asynchronous and does not return a category while the resident is waiting." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-routing.html"
  },
  {
    id: "o-4-1-2-02",
    task: "4.1",
    skill: "4.1.2",
    domain: 4,
    difficulty: 2,
    milestone: "M2",
    chapters: ["21"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 4", "DRAFT"],
    stem: "Cedar Bank measured two workloads on models in one family. Branch-hours and fee-table questions pass the eval on the smaller model. Mortgage-exception questions fail that eval unless the larger model answers them. A default router is too coarse for this split, and the large model id is still used for every turn. What should they configure?",
    choices: [
      { id: "A", text: "Move mortgage exceptions onto the smaller model so one model id covers the whole assistant." },
      { id: "B", text: "Buy provisioned throughput on the large model so hours questions cost less per token." },
      { id: "C", text: "Add more knowledge base chunks to the hours prompt and keep the large model for every turn." },
      { id: "D", text: "Create a configured prompt router that chooses models from response-quality criteria, with the stronger model available for mortgage exceptions and the cheaper model for hours and fees." }
    ],
    correct: ["D"],
    why: "A configured prompt router lets you choose which models are in the route and optimize from response quality, so routine questions can use the cheaper sufficient model without dropping the mortgage bar.",
    optionExplanations: [
      { id: "A", correct: false, text: "The smaller model already fails the mortgage-exception eval, so it is not sufficient for that workload." },
      { id: "B", correct: false, text: "Provisioned throughput reserves capacity for a model and does not replace the large model with a cheaper one for easy questions." },
      { id: "C", correct: false, text: "More chunks raise input tokens and leave the expensive model on traffic the smaller model already passes." },
      { id: "D", correct: true, text: "Configured routers exist for this control: you pick the models and tune routing from quality instead of pinning every request to the largest model." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-routing.html"
  },
  {
    id: "o-4-1-3-01",
    task: "4.1",
    skill: "4.1.3",
    domain: 4,
    difficulty: 1,
    milestone: "M2",
    chapters: ["21"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 4", "DRAFT"],
    stem: "Fieldnote Logistics must write a delay note for about 40,000 shipments before the 6 a.m. planning run. No dispatcher is waiting on one note, and the interactive radio assistant is a different application. On-demand calls during the file run are throttled and awkward to reconcile. Which design fits this job?",
    choices: [
      { id: "A", text: "Hold provisioned throughput all day for a model that only works during this nightly file." },
      { id: "B", text: "Upload the prompts to Amazon S3, start an Amazon Bedrock batch inference job, and read the finished notes from S3 when the job completes." },
      { id: "C", text: "Call ConverseStream from a workstation loop so each note is painted token by token overnight." },
      { id: "D", text: "Turn on latency-optimized inference and keep issuing one interactive call per shipment." }
    ],
    correct: ["B"],
    why: "Batch inference takes a file of prompts and writes responses to S3 asynchronously, which is the Bedrock path for a large job nobody is watching live.",
    optionExplanations: [
      { id: "A", correct: false, text: "Provisioned throughput is billed until you delete it, so reserving it all day for one nightly file wastes the model units." },
      { id: "B", correct: true, text: "Batch inference submits many prompts in one job and returns the outputs in S3 after the asynchronous run finishes." },
      { id: "C", correct: false, text: "Streaming is for a caller that wants tokens now, not for a 40,000-row file with a morning deadline." },
      { id: "D", correct: false, text: "Latency-optimized inference still serves interactive requests and does not replace a bulk S3 job." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/batch-inference.html"
  },
  {
    id: "o-4-1-3-02",
    task: "4.1",
    skill: "4.1.3",
    domain: 4,
    difficulty: 2,
    milestone: "M2",
    chapters: ["21"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 4", "DRAFT"],
    stem: "Pico Retail throttles a steady weekday-afternoon shopping chat, and shoppers are on the page. A different nightly job rewrites the whole catalog, and merchandising can wait until morning. Someone proposed one provisioned throughput large enough for the afternoon chat plus the nightly spike, left running 24 hours. What should they do instead?",
    choices: [
      { id: "A", text: "Put the live shopping chat and the catalog job in one batch inference file." },
      { id: "B", text: "Stay on on-demand and retry every throttled chat turn until the afternoon wave passes." },
      { id: "C", text: "Size provisioned throughput to the afternoon chat's token rate, and run the catalog rewrites as a separate Bedrock batch inference job from S3." },
      { id: "D", text: "Use latency-optimized inference for the catalog file and add no reserved capacity for the chat." }
    ],
    correct: ["C"],
    why: "Batch inference accepts a file of prompts and writes responses to S3 asynchronously, and it does not run on provisioned models. The afternoon chat can keep model units sized to its own token rate, while the catalog file stays a batch job.",
    optionExplanations: [
      { id: "A", correct: false, text: "Batch inference is asynchronous, so shoppers cannot wait on an S3 job for a live chat turn." },
      { id: "B", correct: false, text: "Retries do not add tokens per minute and can pile more calls onto an already throttled on-demand quota." },
      { id: "C", correct: true, text: "Reserve model units for the steady interactive rate, and submit the overnight catalog as batch inference so that spike is not purchased as all-day capacity." },
      { id: "D", correct: false, text: "Latency optimization speeds some interactive models and leaves the afternoon throttle, and the catalog still is not a batch job." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/batch-inference.html"
  },
  {
    id: "o-4-1-4-01",
    task: "4.1",
    skill: "4.1.4",
    domain: 4,
    difficulty: 1,
    milestone: "M2",
    chapters: ["21"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 4", "DRAFT"],
    stem: "Aster Schools parents ask when winter break starts thousands of times a week. The calendar PDF changes only when the board publishes a new file. Each ask still calls Bedrock, retrieves the same passage, and writes a new completion. How should repeat questions stop paying for a full generation?",
    choices: [
      { id: "A", text: "Store completed answers in an Amazon ElastiCache semantic cache keyed by the question and the calendar PDF version, and reuse a hit instead of calling the model." },
      { id: "B", text: "Enable Bedrock prompt caching on the system prompt only, and still generate a fresh answer every time." },
      { id: "C", text: "Write each answer to CloudWatch Logs and read the log stream back to the parent as the response cache." },
      { id: "D", text: "Lower temperature so the wording stabilizes, and keep calling the model for every parent." }
    ],
    correct: ["A"],
    why: "Semantic caching reuses a stored response for an identical or similar request. Including the PDF version stops a later calendar from being served from an older completion.",
    optionExplanations: [
      { id: "A", correct: true, text: "ElastiCache semantic caching is built to reuse generative responses and skip another model call when the question repeats." },
      { id: "B", correct: false, text: "Prompt caching can reuse a static prefix at a discount, but the model still runs and the finished answer is not what is stored." },
      { id: "C", correct: false, text: "Invocation logs are an audit trail, not a low-latency cache keyed for lookup on the next question." },
      { id: "D", correct: false, text: "A lower temperature makes sampling more stable and still spends a full inference on every ask." }
    ],
    evidence: "https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/semantic-caching.html"
  },
  {
    id: "o-4-1-4-02",
    task: "4.1",
    skill: "4.1.4",
    domain: 4,
    difficulty: 2,
    milestone: "M2",
    chapters: ["21"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 4", "DRAFT"],
    stem: "Nimbus Support put refund answers in one ElastiCache semantic index shared by every merchant. A shopper then received steps that named a different merchant's policy, because the questions were semantically close. Public help text may be reused. Account-specific completions must not cross tenants. What cache design fixes that?",
    choices: [
      { id: "A", text: "Drop retrieval and let the model answer refunds from memory so the cache can stay a single global key." },
      { id: "B", text: "Keep one cache entry per question string for the whole platform to maximize the hit rate." },
      { id: "C", text: "Put CloudFront in front of the API with a cache key that ignores cookies and tenant headers." },
      { id: "D", text: "Partition the semantic cache by tenant and article version, and do not store completions that contain another customer's account details." }
    ],
    correct: ["D"],
    why: "A semantic cache reuses responses for similar requests, so a shared index treats two merchants' refund questions as one hit. The namespace has to include the tenant before a stored answer is eligible.",
    optionExplanations: [
      { id: "A", correct: false, text: "Removing retrieval makes policy answers less grounded and does not fix a cache that already mixed tenants." },
      { id: "B", correct: false, text: "A platform-wide key is what allowed one merchant's stored answer to satisfy another merchant's similar question." },
      { id: "C", correct: false, text: "A cookie-less edge key can serve one tenant's personalized response to whoever asks the same path." },
      { id: "D", correct: true, text: "A tenant and article version in the cache namespace limits reuse to that scope, which is safe for repeated public answers." }
    ],
    evidence: "https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/semantic-caching.html"
  },
  {
    id: "o-4-1-4-03",
    task: "4.1",
    skill: "4.1.4",
    domain: 4,
    difficulty: 2,
    milestone: "M2",
    chapters: ["21"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 4", "DRAFT"],
    stem: "Northwind Clinic caches visiting-hour answers in ElastiCache. Last night a new hours sheet finished syncing into the knowledge base, but the assistant still quotes yesterday's closing time. The cache key is only the question text, and the TTL is seven days. Clinicians cannot wait out that TTL. What should change?",
    choices: [
      { id: "A", text: "Extend the TTL to 30 days so the cached hours string is more stable." },
      { id: "B", text: "Put the document or knowledge base version in the cache key, or delete the hours entries when the sync completes, so the next ask misses and is regenerated." },
      { id: "C", text: "Raise the max token count so the new closing time can be appended to the cached string." },
      { id: "D", text: "Turn on prompt caching for the hours question and leave the seven-day answer entry in place." }
    ],
    correct: ["B"],
    why: "Semantic caching returns the stored completion until that entry is missed or removed. A versioned key or a delete on sync stops yesterday's hours from satisfying today's question.",
    optionExplanations: [
      { id: "A", correct: false, text: "A longer TTL keeps the stale closing time in cache even longer after the sheet changes." },
      { id: "B", correct: true, text: "A new document version changes the key, or an explicit delete drops the old completion, so the next question calls the model against the synced sheet." },
      { id: "C", correct: false, text: "The response ceiling applies to a new generation and does not edit an answer already stored under the old key." },
      { id: "D", correct: false, text: "Prompt caching reuses a prompt prefix on a live model call and does not refresh a completion the application is serving from ElastiCache." }
    ],
    evidence: "https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/semantic-caching.html"
  }
]);
