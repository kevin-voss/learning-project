window.AIP = window.AIP || {};
AIP.registerQuestions([
  {
    id: "o-1-6-1-01",
    task: "1.6",
    skill: "1.6.1",
    domain: 1,
    difficulty: 1,
    milestone: "M7",
    chapters: ["04"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 1","DRAFT"],
    stem: "Fieldnote Logistics' damage bot returns a paragraph one time and a list missing required fields the next. Supervisors want cause, location, and next action in a fixed structure, and they want that instruction reused rather than retyped by each developer. Least operational overhead is the constraint. Where should the instruction live?",
    choices: [
      { id: "A", text: "Create a Prompt Management prompt with the output structure and variables, and invoke that prompt from the app." },
      { id: "B", text: "Let each developer type a new one-line question with no output rules." },
      { id: "C", text: "Set the temperature to 1 so the format is free to vary." },
      { id: "D", text: "Fine-tune a model on random formats so every shape stays likely." }
    ],
    correct: ["A"],
    why: "Prompt Management stores a reusable prompt, including variables and the instruction that fixes the output structure, so each caller does not invent a new format.",
    optionExplanations: [
      { id: "A", correct: true, incorrect: false, text: "A managed prompt with an explicit structure and variables is the reusable instruction the supervisors asked for." },
      { id: "B", correct: false, incorrect: true, text: "A fresh one-line question with no output rules is why the format already changes every call." },
      { id: "C", correct: false, incorrect: true, text: "A high temperature increases variation and works against a fixed structure." },
      { id: "D", correct: false, incorrect: true, text: "Fine-tuning on random formats teaches inconsistency and is more work than a prompt template." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-management.html"
  },
  {
    id: "o-1-6-1-02",
    task: "1.6",
    skill: "1.6.1",
    domain: 1,
    difficulty: 2,
    milestone: "M7",
    chapters: ["04"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 1","DRAFT"],
    stem: "Pico Retail's pricing answers skip the exclusion clause unless the model walks that list before it answers. The customer-facing text must stay short because of a token and latency budget. Audit must show which instruction version produced a given answer. How should the instruction be written and released?",
    choices: [
      { id: "A", text: "Remove all instructions and rely on the model's default shopping style." },
      { id: "B", text: "Put a step-by-step check of the exclusion list in the prompt, require a short answer in a defined schema, and deploy a prompt version the app invokes." },
      { id: "C", text: "Return the model's long inner monologue to the shopper." },
      { id: "D", text: "Encode the exclusion list as the temperature value." }
    ],
    correct: ["B"],
    why: "A prompt version can require the exclusion check and a short schema-shaped answer. Invoking that version gives audit a specific instruction without sending a long monologue to the shopper.",
    optionExplanations: [
      { id: "A", correct: false, incorrect: true, text: "No instructions is how the exclusion clause is being skipped." },
      { id: "B", correct: true, incorrect: false, text: "The versioned prompt holds the step-by-step exclusion check and the short output schema the app actually invokes." },
      { id: "C", correct: false, incorrect: true, text: "A long monologue breaks the latency and token budget and is not the customer-facing answer." },
      { id: "D", correct: false, incorrect: true, text: "Temperature is not a carrier for the exclusion list or a version auditors can cite." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-management-deploy.html"
  },
  {
    id: "o-1-6-1-03",
    task: "1.6",
    skill: "1.6.1",
    domain: 1,
    difficulty: 2,
    milestone: "M7",
    chapters: ["04"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 1","DRAFT"],
    stem: "Aster Schools classifies parent emails as bus, lunch, or enrollment. A zero-shot prompt mislabels lunch questions that mention a bus stop. They have twenty labeled examples and will not start a training job this week. Cost should stay on a small on-demand model if those examples fit in the prompt. What should they add?",
    choices: [
      { id: "A", text: "Pretrain a foundation model on the twenty emails." },
      { id: "B", text: "Delete the intent labels and return a random category." },
      { id: "C", text: "Add a few labeled boundary examples to the prompt template and keep the small model." },
      { id: "D", text: "Move the examples to an S3 bucket the model is not given." }
    ],
    correct: ["C"],
    why: "A handful of labeled examples in the prompt is in-context instruction. It separates lunch-at-the-bus-stop from a bus request without a pretraining job, and it still fits a small on-demand model.",
    optionExplanations: [
      { id: "A", correct: false, incorrect: true, text: "Pretraining on twenty emails is the training job they postponed and is a poor use of that sample size." },
      { id: "B", correct: false, incorrect: true, text: "A random category ignores both the labels and the examples." },
      { id: "C", correct: true, incorrect: false, text: "Few labeled examples in the template show the boundary cases and keep inference on the small model." },
      { id: "D", correct: false, incorrect: true, text: "Examples the model never receives cannot change the classification." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-engineering-guidelines.html"
  },
  {
    id: "o-1-6-2-01",
    task: "1.6",
    skill: "1.6.2",
    domain: 1,
    difficulty: 1,
    milestone: "M7",
    chapters: ["04"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 1","DRAFT"],
    stem: "Nimbus Support's Converse handler is stateless. Customers say \"yes, that one\" and the model has no prior turn, so it opens the wrong ticket. Recent turns must be stored and sent with the next call. Access to that history should be controlled with IAM, with the least operational overhead. Where should the history live?",
    choices: [
      { id: "A", text: "Rely on the model to remember the customer across separate API calls with no stored state." },
      { id: "B", text: "Write the full transcript to a public S3 object with a guessable name." },
      { id: "C", text: "Put the history in EC2 user data that is rebuilt nightly." },
      { id: "D", text: "Store and retrieve the conversation with Amazon Bedrock session management APIs, and include the retrieved turns on the next model call." }
    ],
    correct: ["D"],
    why: "Bedrock session APIs store conversation history for the application and can be gated with IAM. The next Converse call stays stateless unless the app sends the turns it retrieves.",
    optionExplanations: [
      { id: "A", correct: false, incorrect: true, text: "A stateless model call does not remember \"that one\" from a previous request." },
      { id: "B", correct: false, incorrect: true, text: "A public guessable object exposes ticket history and is not an IAM-scoped session store." },
      { id: "C", correct: false, incorrect: true, text: "EC2 user data is not a conversation store and a nightly rebuild drops the live thread." },
      { id: "D", correct: true, incorrect: false, text: "Session management stores the turns, IAM controls access, and the next call includes the history the model otherwise lacks." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/sessions.html"
  },
  {
    id: "o-1-6-2-02",
    task: "1.6",
    skill: "1.6.2",
    domain: 1,
    difficulty: 2,
    milestone: "M7",
    chapters: ["04"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 1","DRAFT"],
    stem: "Northwind Clinic nurses ask follow-up questions across a long shift. Sending the entire shift transcript exceeds the context window and adds latency and cost. The latest turns must stay verbatim because they contain the current order, while older turns only need a short recap. The model call already has to stay on the private network. How should context be assembled?",
    choices: [
      { id: "A", text: "Keep the recent turns verbatim, summarize older turns into a short state, and send that bounded context on the Converse call through the VPC endpoint." },
      { id: "B", text: "Truncate from the end so the current order is dropped first." },
      { id: "C", text: "Start a new pretraining job every hour so the model memorizes the shift." },
      { id: "D", text: "Set the output token limit to zero and send no prior turns." }
    ],
    correct: ["A"],
    why: "A bounded context keeps the current order intact, replaces older turns with a short recap, and still fits the private Converse call. That cuts tokens without dropping the order the nurse just placed.",
    optionExplanations: [
      { id: "A", correct: true, incorrect: false, text: "Verbatim recent turns plus a summary of older ones fit the window and preserve the current order on the private call." },
      { id: "B", correct: false, incorrect: true, text: "Dropping the end of the transcript removes the current order, which is the part that must stay verbatim." },
      { id: "C", correct: false, incorrect: true, text: "Hourly pretraining is far too slow and costly for a live shift and is not a context-window strategy." },
      { id: "D", correct: false, incorrect: true, text: "Zero output tokens and no history prevent both the answer and the follow-up context." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/sessions.html"
  },
  {
    id: "o-1-6-2-03",
    task: "1.6",
    skill: "1.6.2",
    domain: 1,
    difficulty: 2,
    milestone: "M7",
    chapters: ["04"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 1","DRAFT"],
    stem: "Harbor Claims must not file an appeal until the caller has named a claim number. Callers often omit it. The team wants a workflow that asks a clarifying question and only then retrieves policy text. Each branch should appear in the execution history for audit. Which state machine shape fits?",
    choices: [
      { id: "A", text: "Guess the claim number from the caller's area code." },
      { id: "B", text: "Use a Step Functions Choice state on the claim number, ask a clarification when it is missing, and run retrieval only after the number is present." },
      { id: "C", text: "Retrieve the entire claims archive whenever the number is missing." },
      { id: "D", text: "Generate the appeal letter immediately with a blank claim number." }
    ],
    correct: ["B"],
    why: "A Choice state branches on whether the claim number is present. The clarification path runs first, retrieval runs only after the number exists, and the execution history is the audit trail.",
    optionExplanations: [
      { id: "A", correct: false, incorrect: true, text: "An area-code guess can file an appeal against the wrong claim." },
      { id: "B", correct: true, incorrect: false, text: "The Choice state separates clarification from retrieval and records which branch ran." },
      { id: "C", correct: false, incorrect: true, text: "Retrieving the whole archive when the number is missing ignores the gate and is expensive." },
      { id: "D", correct: false, incorrect: true, text: "A letter with a blank claim number is the outcome the workflow is required to prevent." }
    ],
    evidence: "https://docs.aws.amazon.com/step-functions/latest/dg/state-choice.html"
  },
  {
    id: "o-1-6-3-01",
    task: "1.6",
    skill: "1.6.3",
    domain: 1,
    difficulty: 1,
    milestone: "M7",
    chapters: ["04"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 1","DRAFT"],
    stem: "Lumen City legal must approve the resident-facing prompt before production uses it. Investigators must be able to show which prompt version handled a request. Developers currently edit one shared text file in S3 with no approval and no version pin. They want the least operational overhead that still provides an identifiable, approved version. What should production invoke?",
    choices: [
      { id: "A", text: "The same S3 text file, overwritten in place, so production always reads the latest bytes." },
      { id: "B", text: "A copy of the prompt pasted from email into each developer's function." },
      { id: "C", text: "A Prompt Management version created when the prompt is approved, invoked by the application instead of the unversioned S3 object." },
      { id: "D", text: "No stored prompt, with CloudTrail turned off so edits are harder to trace." }
    ],
    correct: ["C"],
    why: "Prompt Management versions are the unit the application invokes after approval. An overwritten S3 object has no version pin, so investigators cannot say which text served a request.",
    optionExplanations: [
      { id: "A", correct: false, incorrect: true, text: "Overwriting one S3 object leaves no approved version for a given request." },
      { id: "B", correct: false, incorrect: true, text: "Email paste multiplies copies and skips a single approval step." },
      { id: "C", correct: true, incorrect: false, text: "An approved prompt version is identifiable and is what the application should invoke." },
      { id: "D", correct: false, incorrect: true, text: "Turning off CloudTrail removes audit and still does not version the prompt." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-management-deploy.html"
  },
  {
    id: "o-1-6-4-01",
    task: "1.6",
    skill: "1.6.4",
    domain: 1,
    difficulty: 1,
    milestone: "M7",
    chapters: ["04"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 1","DRAFT"],
    stem: "Cedar Bank keeps fifty SAR prompts with expected elements, including a rule that the answer must not contain an account number. A prompt edit last week dropped that rule, and nobody noticed until audit. They want a repeatable check before a prompt version is deployed, with the least operational overhead. What should gate the deploy?",
    choices: [
      { id: "A", text: "Read five prompts aloud and deploy if they sound polite." },
      { id: "B", text: "Deploy first and compare customer complaints next quarter." },
      { id: "C", text: "Measure only the CPU of the function that sends the prompt." },
      { id: "D", text: "Test the prompt version on the golden set and block deployment when a required element, including the account-number rule, is missing." }
    ],
    correct: ["D"],
    why: "Prompt Management can test a prompt before it is versioned into production. Running the golden set and blocking on a missing account-number rule catches the regression the audit found too late.",
    optionExplanations: [
      { id: "A", correct: false, incorrect: true, text: "Politeness is not a check for the SAR elements or the account-number rule." },
      { id: "B", correct: false, incorrect: true, text: "Deploying first repeats the late discovery the bank is trying to end." },
      { id: "C", correct: false, incorrect: true, text: "CPU of the caller says nothing about whether the prompt still enforces the rule." },
      { id: "D", correct: true, incorrect: false, text: "A test of the golden set against required elements stops a prompt version that dropped the account-number rule." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-management-test.html"
  },
  {
    id: "o-1-6-4-02",
    task: "1.6",
    skill: "1.6.4",
    domain: 1,
    difficulty: 2,
    milestone: "M7",
    chapters: ["04"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 1","DRAFT"],
    stem: "Fieldnote Logistics wants every prompt change to run the golden set, score it, and fail promotion if the score drops. A throttled model call should be retried, and auditors want the pass-or-fail decision in a workflow history. Which orchestration meets that audit and the retry?",
    choices: [
      { id: "A", text: "Run the golden set from Step Functions, retry throttled model calls, and end in a failed state when the score regresses." },
      { id: "B", text: "Skip any case that throttles and mark the run passed." },
      { id: "C", text: "Log the prompt text and never record a score." },
      { id: "D", text: "Replace the golden set with a single emoji and treat any reply as success." }
    ],
    correct: ["A"],
    why: "Step Functions can retry throttling and fail the execution when the golden-set score drops. The execution history is the audit record of the promotion decision.",
    optionExplanations: [
      { id: "A", correct: true, incorrect: false, text: "Retry plus a failed terminal state makes a score regression block promotion and leaves a history." },
      { id: "B", correct: false, incorrect: true, text: "Skipping throttled cases and marking a pass hides both errors and real regressions." },
      { id: "C", correct: false, incorrect: true, text: "A log of the prompt text without a score cannot fail the promotion." },
      { id: "D", correct: false, incorrect: true, text: "An emoji check does not measure the golden set." }
    ],
    evidence: "https://docs.aws.amazon.com/step-functions/latest/dg/concepts-error-handling.html"
  },
  {
    id: "o-1-6-5-01",
    task: "1.6",
    skill: "1.6.5",
    domain: 1,
    difficulty: 1,
    milestone: "M7",
    chapters: ["04"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 1","DRAFT"],
    stem: "Pico Retail's size-chart answers improved after one added sentence, then broke when someone else rewrote the prompt. They want saved variants, a comparison on the same test values, and the winner deployed. A fine-tune is out of scope. Returned apparel is the cost they are trying to cut. How should they iterate?",
    choices: [
      { id: "A", text: "Overwrite the only copy of the prompt on each edit, with no comparison." },
      { id: "B", text: "Save prompt variants in Prompt Management, test them on the same inputs, and deploy the version whose outputs match the size-chart checks." },
      { id: "C", text: "Fine-tune a new model for every wording tweak." },
      { id: "D", text: "Ship the working draft without testing it." }
    ],
    correct: ["B"],
    why: "Prompt Management keeps variants, runs them on test values, and lets the team deploy the version that passes the size-chart checks. Overwriting a single copy is how the last good sentence was lost.",
    optionExplanations: [
      { id: "A", correct: false, incorrect: true, text: "Overwriting the only copy removes the sentence that had improved the answers." },
      { id: "B", correct: true, incorrect: false, text: "Variants plus the same test inputs show which wording wins, and that version is what gets deployed." },
      { id: "C", correct: false, incorrect: true, text: "A fine-tune per wording tweak is the path they ruled out and is slower than comparing prompts." },
      { id: "D", correct: false, incorrect: true, text: "Shipping an untested draft repeats the breakage from the last cleanup." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-management.html"
  },
  {
    id: "o-1-6-5-02",
    task: "1.6",
    skill: "1.6.5",
    domain: 1,
    difficulty: 2,
    milestone: "M7",
    chapters: ["04"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 1","DRAFT"],
    stem: "Aster Schools' answers still fail the JSON schema the student-information parser requires, because busRoute is often missing. They have iterated on wording for a week. The next change must force that field, be compared with the previous prompt version, and replace production only if the comparison wins. Staff must not hand-fix JSON after each answer, because that adds latency. What is the next step?",
    choices: [
      { id: "A", text: "Ask staff to repair the JSON by hand after every answer." },
      { id: "B", text: "Remove the parser so any shape is accepted." },
      { id: "C", text: "Add an explicit busRoute field to the prompt, compare the new version with the previous one on the failing letters, and deploy only the version that emits valid JSON." },
      { id: "D", text: "Drop busRoute from the schema and store the raw prose in that column." }
    ],
    correct: ["C"],
    why: "Prompt Management can compare versions on the same inputs. The new version should require busRoute, and production should move only after that comparison shows valid JSON.",
    optionExplanations: [
      { id: "A", correct: false, incorrect: true, text: "Hand repair adds the latency the school will not accept and leaves the prompt broken." },
      { id: "B", correct: false, incorrect: true, text: "Removing the parser hides the missing field instead of fixing the prompt." },
      { id: "C", correct: true, incorrect: false, text: "Comparing versions on the failing letters shows whether the busRoute instruction fixed the schema before production switches." },
      { id: "D", correct: false, incorrect: true, text: "Storing prose in the bus route column breaks the student-information system." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-management-version-compare.html"
  },
  {
    id: "o-1-6-5-03",
    task: "1.6",
    skill: "1.6.5",
    domain: 1,
    difficulty: 2,
    milestone: "M7",
    chapters: ["04"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 1","DRAFT"],
    stem: "Nimbus Support stores thumbs-down on answers, but the next prompt edit ignores those cases. The same invented password-reset steps keep coming back. They want the failed turns, tied to the prompt version that produced them, to drive the next revision. A training cluster is outside the cost plan. What should the revision include?",
    choices: [
      { id: "A", text: "Delete the thumbs-down records so the metric looks healthy." },
      { id: "B", text: "Train a foundation model from scratch on the thumbs-down clicks." },
      { id: "C", text: "Change only the temperature and leave the instruction that causes the invented steps." },
      { id: "D", text: "Save the failing question, the prompt version, and the bad answer, add a corrective example that covers that case, and retest before deploying a new version." }
    ],
    correct: ["D"],
    why: "Iterating the prompt means the failed turn and its prompt version become the next example or instruction, then a retest decides whether the new version deploys. Deleting the feedback erases the signal.",
    optionExplanations: [
      { id: "A", correct: false, incorrect: true, text: "Deleting thumbs-down records removes the cases the next revision is supposed to learn from." },
      { id: "B", correct: false, incorrect: true, text: "Training a foundation model from scratch is the cluster they do not have and is not required to fix one reset procedure." },
      { id: "C", correct: false, incorrect: true, text: "Temperature will not stop an instruction that still invents reset steps." },
      { id: "D", correct: true, incorrect: false, text: "The stored failure, pinned to a prompt version, becomes a corrective example that is retested before the next deploy." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-management.html"
  }
]);
