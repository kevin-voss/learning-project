window.AIP = window.AIP || {};
AIP.registerQuestions([
  {
    id: "o-1-2-1-01",
    task: "1.2",
    skill: "1.2.1",
    domain: 1,
    difficulty: 1,
    milestone: "M1",
    chapters: ["03"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 1","DRAFT"],
    stem: "Harbor Claims needs one Amazon Bedrock model for first-notice-of-loss summaries. Adjusters will score factual overlap against a labeled set of claims, and the API must stay inside a latency budget during business hours. The team will not train a foundation model from scratch. Which selection method fits those constraints?",
    choices: [
      { id: "A", text: "Have three engineers try a handful of console prompts and keep whichever model feels fastest." },
      { id: "B", text: "Run a Bedrock model evaluation on a custom prompt dataset that includes ground-truth summaries, and compare task metrics and latency across candidate models." },
      { id: "C", text: "Fine-tune every available model on the full claims archive, then keep the one with the most parameters." },
      { id: "D", text: "Pick the public coding-leaderboard winner, because that score transfers to insurance summaries." }
    ],
    correct: ["B"],
    why: "A Bedrock model evaluation job runs the same claim-summary dataset against candidate models and returns comparable metrics. That is how Harbor Claims chooses a model for this task without training a new foundation model.",
    optionExplanations: [
      { id: "A", correct: false, incorrect: true, text: "A short console session is not a repeatable measure of summary accuracy or latency on the labeled claims." },
      { id: "B", correct: true, incorrect: false, text: "Model evaluation compares candidate models on a prompt dataset and ground truth, which matches the accuracy and latency decision." },
      { id: "C", correct: false, incorrect: true, text: "Fine-tuning every model, then preferring parameter count, ignores the evaluation result and the decision to avoid a heavy training program." },
      { id: "D", correct: false, incorrect: true, text: "A coding benchmark does not measure first-notice summary quality or the latency budget on Harbor Claims data." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation-tasks.html"
  },
  {
    id: "o-1-2-1-02",
    task: "1.2",
    skill: "1.2.1",
    domain: 1,
    difficulty: 2,
    milestone: "M2",
    chapters: ["02"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 1","DRAFT"],
    stem: "Lumen City's resident assistant must answer from ordinances while the city keeps transcript text inside Europe. Hearings arrive as long transcripts, so the context window has to cover one hearing, and the monthly inference bill is capped. A larger model on a global route scores higher on a generic leaderboard but can process text outside that geography. Which model choice meets the residency, context, and cost constraints?",
    choices: [
      { id: "A", text: "Invoke the leaderboard winner through a global cross-Region inference profile so quality wins even if transcript text leaves Europe." },
      { id: "B", text: "Use the cheapest embedding model as the chat model, because embedding tokens are billed at a lower rate." },
      { id: "C", text: "Select a chat model that is offered for Europe, whose context window holds a hearing transcript, and whose evaluation on ordinance questions meets the bar at an acceptable token price." },
      { id: "D", text: "Pretrain a new foundation model in the city archive so no commercial model choice is required." }
    ],
    correct: ["C"],
    why: "Geographic placement is part of model selection: a global cross-Region profile can process prompts outside Europe, while a Europe-eligible model with a long enough context window can be judged on the city's own evaluation and price.",
    optionExplanations: [
      { id: "A", correct: false, incorrect: true, text: "Global cross-Region inference can route requests to any supported commercial Region, which breaks the Europe residency constraint." },
      { id: "B", correct: false, incorrect: true, text: "An embedding model produces vectors for search and does not replace a chat model that must answer from a long transcript." },
      { id: "C", correct: true, incorrect: false, text: "The model has to be eligible for the required geography, fit the hearing in context, and win on the ordinance evaluation inside the budget." },
      { id: "D", correct: false, incorrect: true, text: "Pretraining a foundation model is far outside the cost cap and is not required to answer from ordinances." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/cross-region-inference.html"
  },
  {
    id: "o-1-2-2-01",
    task: "1.2",
    skill: "1.2.2",
    domain: 1,
    difficulty: 1,
    milestone: "M2",
    chapters: ["02"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 1","DRAFT"],
    stem: "Cedar Bank's fraud-narrative function builds a provider-specific InvokeModel body, so every model change is a code release. Risk wants to move to a different Bedrock model the same day the cost ceiling changes, and the caller must keep sending ordinary chat messages. Which design switches models without a code change and with the least operational overhead?",
    choices: [
      { id: "A", text: "Keep a separate InvokeModel JSON body in the deployment package for each provider and release the function on every change." },
      { id: "B", text: "Train a private foundation model so the bank never passes a model identifier again." },
      { id: "C", text: "Store the provider JSON schema in an API Gateway stage variable and redeploy the stage whenever the model changes." },
      { id: "D", text: "Call the Converse API, which uses one messages format across supported Bedrock models, and pass a model identifier that is supplied outside the function source." }
    ],
    correct: ["D"],
    why: "The Converse API gives one messages contract for Bedrock models that support it, so Cedar Bank can change the model identifier without rewriting the request body or shipping a new function.",
    optionExplanations: [
      { id: "A", correct: false, incorrect: true, text: "Provider-specific InvokeModel bodies make each model swap a code change, which is the release the bank wants to stop." },
      { id: "B", correct: false, incorrect: true, text: "Training a foundation model does not provide a switch between existing models and adds a large operational burden." },
      { id: "C", correct: false, incorrect: true, text: "A stage redeploy is still a release of the integration, and a stage variable is a poor place for a full provider body." },
      { id: "D", correct: true, incorrect: false, text: "Converse keeps a consistent messages API across models, and the model identifier can come from outside the deployed source." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/conversation-inference.html"
  },
  {
    id: "o-1-2-2-02",
    task: "1.2",
    skill: "1.2.2",
    domain: 1,
    difficulty: 2,
    milestone: "M2",
    chapters: ["02"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 1","DRAFT"],
    stem: "Fieldnote Logistics wants routine bills of lading on a smaller model and unusual damage notes on a larger one. The warehouse app must not choose the model itself, because that choice would be a client release every time the pair changes. Cost is capped, but a hard damage note still has to land on the stronger model when the router expects a quality gap. Which invocation should the app use?",
    choices: [
      { id: "A", text: "Invoke an intelligent prompt router and keep that router identifier stable, so Bedrock sends each request to the configured model it predicts will answer better." },
      { id: "B", text: "Always call the largest model, then delete tokens from the bill until the invoice looks smaller." },
      { id: "C", text: "Let the mobile client pick a model ID at random and skip logging." },
      { id: "D", text: "Fine-tune the small model on a single afternoon of bills and remove the large model the same day." }
    ],
    correct: ["A"],
    why: "Intelligent prompt routing predicts response quality for each configured model and routes the request, so the warehouse app keeps one identifier while Bedrock still spends the larger model only where it expects a gain.",
    optionExplanations: [
      { id: "A", correct: true, incorrect: false, text: "A prompt router is the invocation target, and Bedrock chooses the configured model per request without a client change." },
      { id: "B", correct: false, incorrect: true, text: "Always using the largest model misses the cost cap, and truncating the bill drops the damage text the strong model was meant to see." },
      { id: "C", correct: false, incorrect: true, text: "A random client-side model ID is neither stable nor tied to predicted answer quality." },
      { id: "D", correct: false, incorrect: true, text: "A one-afternoon fine-tune does not route live requests, and dropping the large model removes the quality path for hard notes." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-routing.html"
  },
  {
    id: "o-1-2-2-03",
    task: "1.2",
    skill: "1.2.2",
    domain: 1,
    difficulty: 2,
    milestone: "M2",
    chapters: ["02"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 1","DRAFT"],
    stem: "Pico Retail must send a slice of product-copy traffic to a candidate model, then either move everyone or return to the original model within minutes. The storefront binary cannot be rebuilt for that change. Finance also wants the two models' on-demand cost separated for audit. Which design meets the rollback speed and the cost audit?",
    choices: [
      { id: "A", text: "Compile both model IDs into the storefront and ask shoppers to install a new build after each change." },
      { id: "B", text: "Create an application inference profile for each model, tag the profiles for cost allocation, and pass the selected profile ARN into Converse from configuration that changes without a client release." },
      { id: "C", text: "Call one untagged foundation model ID and estimate the traffic split in a spreadsheet." },
      { id: "D", text: "Place the candidate model in a second AWS account and cut over with a public DNS name." }
    ],
    correct: ["B"],
    why: "An application inference profile is an invocation ARN that can carry cost-allocation tags. Changing which profile ARN the service configuration sends moves or rolls back traffic without a storefront release.",
    optionExplanations: [
      { id: "A", correct: false, incorrect: true, text: "A storefront build is a client release, so the retailer cannot roll the model back in minutes." },
      { id: "B", correct: true, incorrect: false, text: "Tagged application inference profiles give a stable ARN per model and a cost split, and configuration can point Converse at either ARN." },
      { id: "C", correct: false, incorrect: true, text: "One untagged model ID cannot separate the candidate's cost or move a slice of traffic." },
      { id: "D", correct: false, incorrect: true, text: "A second account and a DNS cutover add operational work and do not tag Bedrock invocation cost by model." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/inference-profiles.html"
  },
  {
    id: "o-1-2-3-01",
    task: "1.2",
    skill: "1.2.3",
    domain: 1,
    difficulty: 1,
    milestone: "M2",
    chapters: ["02"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 1","DRAFT"],
    stem: "Aster Schools runs a tutoring assistant in one US Region. During a capacity spike, Converse calls fail and students lose the session. Prompts must stay inside the United States, and the school wants higher availability with the least operational overhead. Which access pattern fits?",
    choices: [
      { id: "A", text: "Stand up a self-hosted model on Kubernetes in every US Region and fail over the cluster by hand." },
      { id: "B", text: "Use a global cross-Region profile because it is cheaper, even though prompts may be processed outside the United States." },
      { id: "C", text: "Invoke a United States geographic cross-Region inference profile so Bedrock routes each request across the Regions in that profile." },
      { id: "D", text: "Serve yesterday's cached answers from S3 and stop calling the model when errors start." }
    ],
    correct: ["C"],
    why: "A geographic cross-Region inference profile routes requests across the Regions listed for that geography, which raises availability without a GPU fleet and keeps processing inside the United States.",
    optionExplanations: [
      { id: "A", correct: false, incorrect: true, text: "A self-hosted model in every Region is the opposite of least operational overhead." },
      { id: "B", correct: false, incorrect: true, text: "A global profile can process requests in any supported commercial Region, which violates the school's residency rule." },
      { id: "C", correct: true, incorrect: false, text: "Geographic cross-Region inference distributes invocation across the profile's US Regions while respecting that geography." },
      { id: "D", correct: false, incorrect: true, text: "A cache of old answers does not recover live tutoring questions during a capacity spike." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/cross-region-inference.html"
  },
  {
    id: "o-1-2-3-02",
    task: "1.2",
    skill: "1.2.3",
    domain: 1,
    difficulty: 2,
    milestone: "M2",
    chapters: ["02"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 1","DRAFT"],
    stem: "Nimbus Support's overnight chat must keep answering when the primary model throttles. A shorter model is acceptable for those overflow turns. The team wants bounded retries before the fallback, and auditors want the fallback decision in a workflow history. Which design meets the latency of a live chat and the audit requirement?",
    choices: [
      { id: "A", text: "Let the throttling error fail the whole execution and show the customer a blank page." },
      { id: "B", text: "Raise the temperature so the primary model is expected to answer faster." },
      { id: "C", text: "Start a new GPU instance from the workflow on every throttle." },
      { id: "D", text: "Catch throttling in an AWS Step Functions state, retry with backoff, and on continued failure invoke the smaller model in a later state." }
    ],
    correct: ["D"],
    why: "Step Functions can retry a throttled task and catch the error into an explicit fallback state, so the smaller model serves the turn and the execution history shows the decision.",
    optionExplanations: [
      { id: "A", correct: false, incorrect: true, text: "Failing the whole execution drops the chat, which is the outage Nimbus Support is trying to absorb." },
      { id: "B", correct: false, incorrect: true, text: "Temperature changes randomness of tokens and does not clear a throttling error." },
      { id: "C", correct: false, incorrect: true, text: "Launching a GPU instance per throttle is slow for a live chat and adds operational cost." },
      { id: "D", correct: true, incorrect: false, text: "Retry and catch in Step Functions implement backoff and a visible fallback to the smaller model." }
    ],
    evidence: "https://docs.aws.amazon.com/step-functions/latest/dg/concepts-error-handling.html"
  },
  {
    id: "o-1-2-3-03",
    task: "1.2",
    skill: "1.2.3",
    domain: 1,
    difficulty: 2,
    milestone: "M2",
    chapters: ["02"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 1","DRAFT"],
    stem: "Northwind Clinic's prior-authorization calls must stay off the public internet. If Bedrock runtime in the primary Region is unreachable, the same private path has to exist in a second Region. Clinician latency matters more than the savings of a global profile. Which network design meets the private-network constraint?",
    choices: [
      { id: "A", text: "Create interface VPC endpoints for bedrock-runtime in each Region the clinic uses, and fail over to the second Region's private endpoint when the first runtime is unavailable." },
      { id: "B", text: "Call the public Bedrock runtime endpoint from a function that is not attached to the clinic VPC." },
      { id: "C", text: "Copy the model weights to a laptop on the clinic LAN and sync them nightly." },
      { id: "D", text: "Use a global inference profile and allow processing in any commercial Region." }
    ],
    correct: ["A"],
    why: "Interface VPC endpoints for bedrock-runtime keep Converse and InvokeModel on PrivateLink. Placing that endpoint in the failover Region preserves the private path without a global route.",
    optionExplanations: [
      { id: "A", correct: true, incorrect: false, text: "PrivateLink endpoints for bedrock-runtime in both Regions keep failover traffic on the private network." },
      { id: "B", correct: false, incorrect: true, text: "A public runtime endpoint leaves the clinic VPC and uses the internet path the clinic forbade." },
      { id: "C", correct: false, incorrect: true, text: "A laptop copy of model weights is not Bedrock runtime access and cannot meet clinician latency or audit." },
      { id: "D", correct: false, incorrect: true, text: "A global profile can process requests outside the clinic's Regions and does not create a private endpoint." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/vpc-interface-endpoints.html"
  },
  {
    id: "o-1-2-4-01",
    task: "1.2",
    skill: "1.2.4",
    domain: 1,
    difficulty: 1,
    milestone: "M2",
    chapters: ["02"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 1","DRAFT"],
    stem: "Harbor Claims wants denial letters to follow its house tone. Live claim facts must still come from the claim file at request time, not from weights. They want a managed customization they can stop using later by switching the model identifier, with the least operational overhead. Which lifecycle step fits?",
    choices: [
      { id: "A", text: "Pretrain a new foundation model for several weeks on a private GPU fleet using every denial letter ever sent." },
      { id: "B", text: "Run a Bedrock fine-tuning job on tone examples that exclude live claim facts, invoke the custom model version for wording, and keep the previous model identifier so the customization can be retired by switching back." },
      { id: "C", text: "Paste one sample letter into a single user message and never save a model version." },
      { id: "D", text: "Store the style guide in S3 and assume the base model reads that object with no retrieval and no customization." }
    ],
    correct: ["B"],
    why: "Supervised fine-tuning on Bedrock adapts tone from prompt-response examples and produces a custom model version the application can invoke or replace. Claim facts stay outside the training rows so they still arrive at request time.",
    optionExplanations: [
      { id: "A", correct: false, incorrect: true, text: "Pretraining a foundation model on a private GPU fleet is far more operational work than a managed fine-tune for tone." },
      { id: "B", correct: true, incorrect: false, text: "A Bedrock fine-tune creates a versioned custom model for tone, and keeping the prior identifier makes retirement a switch rather than a rebuild." },
      { id: "C", correct: false, incorrect: true, text: "One unsaved sample is an ad hoc prompt, not a customization lifecycle with a model the team can retire." },
      { id: "D", correct: false, incorrect: true, text: "An S3 object the model is never given does not change tone and is not a managed custom model." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/custom-models.html"
  },
  {
    id: "o-1-2-4-02",
    task: "1.2",
    skill: "1.2.4",
    domain: 1,
    difficulty: 2,
    milestone: "M2",
    chapters: ["02"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 1","DRAFT"],
    stem: "Lumen City already registers each fine-tuned summarizer in SageMaker Model Registry. The newest version increased invented ordinance citations in production. Retraining tonight is too expensive, and auditors need a record of who stopped that version. Production should keep serving the last approved version. What should the team do?",
    choices: [
      { id: "A", text: "Delete the model group and start training again from random weights." },
      { id: "B", text: "Edit the weight files on the running endpoint disk and leave the registry unchanged." },
      { id: "C", text: "Set the bad version to Rejected, keep the last Approved version deployed, and record the approval-status change in the registry." },
      { id: "D", text: "Turn off model logs so the bad citations are no longer stored." }
    ],
    correct: ["C"],
    why: "Model Registry versions carry an approval status. Rejecting the bad version and leaving the prior Approved version deployed rolls production back without a retrain and leaves an auditable status change.",
    optionExplanations: [
      { id: "A", correct: false, incorrect: true, text: "Deleting the group and retraining from scratch spends the money the city will not spend tonight and drops the good version." },
      { id: "B", correct: false, incorrect: true, text: "Hand-editing endpoint weights bypasses the registry and leaves no approval record." },
      { id: "C", correct: true, incorrect: false, text: "Rejecting the new version and serving the last Approved version is the registry rollback, with the status change as the audit trail." },
      { id: "D", correct: false, incorrect: true, text: "Disabling logs hides citations and does not take the bad version out of production." }
    ],
    evidence: "https://docs.aws.amazon.com/sagemaker/latest/dg/model-registry-approve.html"
  },
  {
    id: "o-1-2-4-03",
    task: "1.2",
    skill: "1.2.4",
    domain: 1,
    difficulty: 2,
    milestone: "M2",
    chapters: ["02"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 1","DRAFT"],
    stem: "Cedar Bank will fine-tune a model so suspicious-activity narratives match an internal style guide. The style guide will change next quarter, so the job must be repeatable. Training rows have to match the model's fine-tuning schema, account numbers must be removed first, and a held-out validation set is required. Audit must show which dataset the job used. Which preparation should they submit?",
    choices: [
      { id: "A", text: "Upload a zip of raw mailbox exports, including production account numbers, and start the job with no validation file." },
      { id: "B", text: "Fine-tune on one handwritten sentence and deploy that model as the system of record for case facts." },
      { id: "C", text: "Skip validation data so the job cannot be compared with the next quarter's run." },
      { id: "D", text: "Build a repeatable dataset in the fine-tuning schema, strip account numbers, include a validation set, and resubmit the customization job when the style guide changes." }
    ],
    correct: ["D"],
    why: "Bedrock fine-tuning expects prepared training records in the model’s schema, and a validation set is how the next quarterly rerun is compared. Account numbers do not belong in a style dataset.",
    optionExplanations: [
      { id: "A", correct: false, incorrect: true, text: "Mailbox exports are not the fine-tuning schema, and leaving account numbers in the job violates the data constraint." },
      { id: "B", correct: false, incorrect: true, text: "One sentence cannot teach a style, and the custom model must not become the source of case facts." },
      { id: "C", correct: false, incorrect: true, text: "Dropping validation data removes the comparison the bank needs when the style guide changes." },
      { id: "D", correct: true, incorrect: false, text: "Schema-matched rows, removed account numbers, and a validation set make the customization job safe to rerun next quarter." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/model-customization-prepare.html"
  }
]);
