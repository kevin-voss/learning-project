window.AIP = window.AIP || {};
AIP.registerQuestions([
  {
    id: "o-5-1-1-01",
    task: "5.1",
    skill: "5.1.1",
    domain: 5,
    difficulty: 1,
    milestone: "M1",
    chapters: ["18"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 5", "DRAFT"],
    stem: "Northwind Clinic is about to change the prompt that drafts after-visit summaries. In last month's production incident, several summaries invented a follow-up dose that was not in the chart, even though every sentence was grammatical. Nurses have a labeled set of visits with an acceptable summary for each visit, and wording is allowed to vary as long as the facts match. How should the team score answer quality before anyone edits the prompt again?",
    choices: [
      { id: "A", text: "Assert that each new summary equals one stored sentence in a unit test, and fail the build on any paraphrase." },
      { id: "B", text: "Treat a SageMaker Clarify bias report as the only quality score for the invented doses." },
      { id: "C", text: "Run an Amazon Bedrock model evaluation on the labeled visits and score correctness against each reference summary." },
      { id: "D", text: "Raise temperature to 1 and have one nurse read a single summary in the console." }
    ],
    correct: ["C"],
    why: "Bedrock judge evaluation can score correctness, and a supplied reference response is part of that score. Exact string match rejects faithful paraphrases, and a fairness report does not check the dose against the chart.",
    optionExplanations: [
      { id: "A", correct: false, text: "Free-text clinical wording varies, so an exact string match fails summaries that state the same facts." },
      { id: "B", correct: false, text: "Clarify is aimed at bias, drift, and explainability, which does not score whether a dose is supported by the chart." },
      { id: "C", correct: true, text: "A correctness metric on a labeled set scores whether the summary matches the reference facts, which is the quality signal this incident needs." },
      { id: "D", correct: false, text: "One console sample at a high temperature is not a repeatable score for the labeled visits." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation-metrics.html"
  },
  {
    id: "o-5-1-1-02",
    task: "5.1",
    skill: "5.1.1",
    domain: 5,
    difficulty: 2,
    milestone: "M2",
    chapters: ["18"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 5", "DRAFT"],
    stem: "Harbor Claims scored the appeals assistant with a helpfulness metric, and the average looked strong. During a production incident, reviewers found fluent letters that contradicted the denial clause retrieved for that claim. The letters were polite and complete, and they still invented a deadline. Which score should the team add so answer quality catches that hallucination?",
    choices: [
      { id: "A", text: "Add faithfulness on a retrieve-and-generate evaluation, and treat a high helpfulness score as insufficient when the letter adds facts absent from the retrieved clause." },
      { id: "B", text: "Average sentence length and ship when the letters get longer." },
      { id: "C", text: "Replace the score with professional style and tone only." },
      { id: "D", text: "Drop metrics and switch to a larger model because fluent text is already good enough." }
    ],
    correct: ["A"],
    why: "Faithfulness measures whether the response stays inside the retrieved text, which is the hallucination in these letters. Helpfulness can stay high while the deadline is invented.",
    optionExplanations: [
      { id: "A", correct: true, text: "Faithfulness flags response content that is not supported by the retrieved texts, which is the failure helpfulness missed." },
      { id: "B", correct: false, text: "Sentence length does not tell you whether the deadline appears in the retrieved clause." },
      { id: "C", correct: false, text: "Tone can be professional while the letter still contradicts the policy clause." },
      { id: "D", correct: false, text: "A larger model does not replace a score that checks the letter against the retrieved clause." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base-evaluation-metrics.html"
  },
  {
    id: "o-5-1-2-01",
    task: "5.1",
    skill: "5.1.2",
    domain: 5,
    difficulty: 1,
    milestone: "M2",
    chapters: ["18"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 5", "DRAFT"],
    stem: "Lumen City must choose between two foundation models for the permit chatbot before the next evaluation window. Both models will see the same 150 resident questions, including fee questions the current bot hallucinated. A single demo transcript impressed the mayor and said nothing about those fee questions. How should the team compare the model configurations?",
    choices: [
      { id: "A", text: "Select the model with the larger context window and skip scoring the 150 questions." },
      { id: "B", text: "Let each model answer one showcase question and adopt the mayor's preference." },
      { id: "C", text: "Compare the published price per token and ignore answer quality." },
      { id: "D", text: "Score both models with the same judge metrics on that shared 150-question dataset, and adopt the model with the stronger correctness report." }
    ],
    correct: ["D"],
    why: "A judge-based evaluation scores a generator against a fixed prompt dataset, so both candidates can be compared on the fee questions. A demo or a price sheet does not measure those answers.",
    optionExplanations: [
      { id: "A", correct: false, text: "Context window size does not measure whether the fee answers match the permit rules." },
      { id: "B", correct: false, text: "One showcase question hides the fee hallucinations the dataset was built to catch." },
      { id: "C", correct: false, text: "Token price is a cost input, and it does not score the resident questions." },
      { id: "D", correct: true, text: "The same dataset and the same judge metrics produce reports you can compare before changing the production model." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/evaluation-judge.html"
  },
  {
    id: "o-5-1-2-02",
    task: "5.1",
    skill: "5.1.2",
    domain: 5,
    difficulty: 2,
    milestone: "M2",
    chapters: ["18"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 5", "DRAFT"],
    stem: "Cedar Bank's loan-explanation assistant passed a demo at temperature 0.8. In production, repeat calls on the same approved facts produced different reasons, and two letters contradicted the credit-policy excerpt. The model and the prompt text must stay fixed while the team compares inference configurations. What comparison should they run?",
    choices: [
      { id: "A", text: "Change the model family at the same time so the test finishes in one step." },
      { id: "B", text: "Run the same golden set at temperature 0 and at 0.2, score correctness and logical coherence, and keep the setting whose letters stay consistent with the policy excerpt." },
      { id: "C", text: "Set temperature to 1 so the letters sound more human, and skip the comparison." },
      { id: "D", text: "Regenerate one letter in the console and adopt whichever draft the reviewer likes." }
    ],
    correct: ["B"],
    why: "Correctness and logical coherence are judge metrics for answers that contradict themselves or the supplied context. Holding the model and prompt fixed isolates the temperature change.",
    optionExplanations: [
      { id: "A", correct: false, text: "Swapping the model family at the same time makes it impossible to attribute any gain to temperature." },
      { id: "B", correct: true, text: "A shared golden set scored for correctness and coherence shows which temperature stays faithful to the policy excerpt." },
      { id: "C", correct: false, text: "A higher temperature increases variation, which is the production failure, and it produces no comparison." },
      { id: "D", correct: false, text: "One console letter cannot show whether the configuration is stable across the golden set." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation-metrics.html"
  },
  {
    id: "o-5-1-2-03",
    task: "5.1",
    skill: "5.1.2",
    domain: 5,
    difficulty: 2,
    milestone: "M2",
    chapters: ["18"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 5", "DRAFT"],
    stem: "Fieldnote Logistics is considering a smaller model after a production incident where the dispatcher assistant missed a hazmat exception and also overran the token budget. Finance wants the cheaper list price. Operations will accept the smaller model only if quality on the exception set stays within an agreed gap of the current model, and only if token use and latency are measured on real invocations. How should they compare the configurations?",
    choices: [
      { id: "A", text: "Switch immediately because the smaller model has a lower list price per token." },
      { id: "B", text: "Pick the model with the lowest latency on a single hello prompt." },
      { id: "C", text: "Evaluate both models on the exception set, keep the smaller model only if the quality gap holds, and compare CloudWatch input tokens, output tokens, and invocation latency for those calls." },
      { id: "D", text: "Fine-tune the smaller model on the one missed transcript and ship it the same day." }
    ],
    correct: ["C"],
    why: "Cost-performance needs the quality scores on the exception set plus measured token counts and latency by model. A price sheet and a single prompt do not show either side of that comparison.",
    optionExplanations: [
      { id: "A", correct: false, text: "List price ignores whether the smaller model still misses hazmat exceptions." },
      { id: "B", correct: false, text: "Latency on one short prompt says nothing about exception quality or token use on real dispatches." },
      { id: "C", correct: true, text: "The shared evaluation protects answer quality, and CloudWatch invocation metrics show the token and latency difference of the models you actually call." },
      { id: "D", correct: false, text: "One transcript is not a comparison of configurations, and it does not measure tokens or latency." }
    ],
    evidence: "https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/model-invocations.html"
  },
  {
    id: "o-5-1-3-01",
    task: "5.1",
    skill: "5.1.3",
    domain: 5,
    difficulty: 1,
    milestone: "M2",
    chapters: ["18"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 5", "DRAFT"],
    stem: "Pico Retail added thumbs-up and thumbs-down under the shopping assistant after a hallucination about return windows. The ratings land in a table that stores only a timestamp and a boolean. Investigators cannot tell which answer was rated or which prompt produced it. What feedback should they collect?",
    choices: [
      { id: "A", text: "Store each thumb with the Bedrock request id, and enable model invocation logging so the prompt, response, and model id for that request can be retrieved." },
      { id: "B", text: "Keep the boolean and the timestamp, and average them in a weekly spreadsheet." },
      { id: "C", text: "Treat every HTTP 200 from the model API as positive feedback." },
      { id: "D", text: "Delete negative ratings so the dashboard stays green during the next incident." }
    ],
    correct: ["A"],
    why: "Invocation logging stores the request, the response, and metadata for each model call. A thumb tied to the request id can then be joined to the answer that shoppers actually saw.",
    optionExplanations: [
      { id: "A", correct: true, text: "The request id plus invocation logs gives you the answer, the prompt, and the model behind each thumb." },
      { id: "B", correct: false, text: "A timestamp and a boolean still cannot identify which return-window answer the shopper rated." },
      { id: "C", correct: false, text: "A successful API call means the service responded, not that the shopper accepted the answer." },
      { id: "D", correct: false, text: "Deleting negative ratings removes the signal from the hallucination incident." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/model-invocation-logging.html"
  },
  {
    id: "o-5-1-3-02",
    task: "5.1",
    skill: "5.1.3",
    domain: 5,
    difficulty: 2,
    milestone: "M2",
    chapters: ["18"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 5", "DRAFT"],
    stem: "Aster Schools teachers often rewrite the quiz the model drafted. The product stores only edited equals yes. After a production incident, the team could not tell whether a teacher fixed a hallucinated historical date or merely shortened a correct question. They want those edits to become feedback for the next human evaluation. What should they collect?",
    choices: [
      { id: "A", text: "Fine-tune a new model every night on every keystroke, including spelling tidy-ups." },
      { id: "B", text: "Ignore teacher edits because classroom staff are not an evaluation signal." },
      { id: "C", text: "Replace the production prompt with the full text of the last edited quiz." },
      { id: "D", text: "Save the original model answer and the teacher's revision, and when the teacher marks a factual error, use that revision as the reference response in the human evaluation dataset." }
    ],
    correct: ["D"],
    why: "A human evaluation prompt dataset can include a reference response that workers compare against the model. The teacher's corrected quiz is that reference, and the factual-error mark separates it from a cosmetic edit.",
    optionExplanations: [
      { id: "A", correct: false, text: "Overnight fine-tuning on every keystroke treats spelling tidy-ups as training labels and does not build an evaluation set." },
      { id: "B", correct: false, text: "The edits are the signal that distinguishes a hallucinated date from a shorter correct question." },
      { id: "C", correct: false, text: "Pasting one quiz into the prompt does not preserve a labeled pair for the next evaluation." },
      { id: "D", correct: true, text: "The original answer, the revision, and a factual-error mark become the prompt and reference response a human evaluation job can use." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation-prompt-datasets-custom-human.html"
  },
  {
    id: "o-5-1-3-03",
    task: "5.1",
    skill: "5.1.3",
    domain: 5,
    difficulty: 2,
    milestone: "M2",
    chapters: ["18"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 5", "DRAFT"],
    stem: "Nimbus Support agents flag bad replies with a single bad button. During last week's production incident the button fired often, but the team could not tell a hallucinated refund rule from an article that was simply the wrong product. They want the next evaluation dataset to filter those failure modes. How should they collect the feedback?",
    choices: [
      { id: "A", text: "Replace the button with a 1-to-5 star rating and store no reason." },
      { id: "B", text: "Require a category such as hallucinated fact, wrong article retrieved, or unsafe tone, and carry that category into the evaluation prompt dataset with the request id." },
      { id: "C", text: "Forward the transcript to a shared inbox and do not record a category." },
      { id: "D", text: "Turn feedback off during incidents so the weekly average stays stable." }
    ],
    correct: ["B"],
    why: "Human evaluation datasets include an optional category used to filter the report. A reason captured with the request id is what makes the incident examples separable later.",
    optionExplanations: [
      { id: "A", correct: false, text: "A star rating still collapses hallucination and a bad retrieval into one number." },
      { id: "B", correct: true, text: "A category on the feedback record can be written into the evaluation dataset and used to filter results by failure mode." },
      { id: "C", correct: false, text: "An inbox of transcripts does not produce a category you can filter in the evaluation report." },
      { id: "D", correct: false, text: "Turning feedback off deletes the incident signal the next dataset needs." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation-prompt-datasets-custom-human.html"
  },
  {
    id: "o-5-1-4-01",
    task: "5.1",
    skill: "5.1.4",
    domain: 5,
    difficulty: 1,
    milestone: "M2",
    chapters: ["18"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 5", "DRAFT"],
    stem: "Northwind Clinic will not repeat the discharge-summary incident. A new prompt version must not reach the production identifier unless answer quality on a fixed set of visits holds up. The Lambda unit test already checks that the function returns JSON, and the clinical sentences are still allowed to vary. What release gate should they use?",
    choices: [
      { id: "A", text: "Publish the prompt version whenever the Lambda test returns HTTP 200." },
      { id: "B", text: "Ask one physician to approve a single summary in the console, then publish." },
      { id: "C", text: "In the pipeline, run a Bedrock evaluation on the fixed visit set and block publication when correctness or faithfulness falls below the last approved score." },
      { id: "D", text: "Publish at night and roll back if the help desk calls the next morning." }
    ],
    correct: ["C"],
    why: "An evaluation job turns the labeled visits into scores you can threshold before a prompt version is published. A JSON status code does not measure clinical faithfulness.",
    optionExplanations: [
      { id: "A", correct: false, text: "HTTP 200 means the function responded, not that the summaries stayed faithful to the charts." },
      { id: "B", correct: false, text: "One console summary is not a gate on the fixed visit set." },
      { id: "C", correct: true, text: "The pipeline can withhold the prompt version until the evaluation scores hold against the last approved run." },
      { id: "D", correct: false, text: "Shipping first and waiting for complaints is the incident path, not a quality gate." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/evaluation.html"
  },
  {
    id: "o-5-1-4-02",
    task: "5.1",
    skill: "5.1.4",
    domain: 5,
    difficulty: 2,
    milestone: "M2",
    chapters: ["18"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 5", "DRAFT"],
    stem: "Harbor Claims can send a slice of appeal traffic to a candidate prompt version. Last quarter a full cutover hallucinated appeal deadlines for three hours before anyone rolled it back. They want a regression gate that returns traffic to the approved version without waiting for complaints. What gate fits?",
    choices: [
      { id: "A", text: "Route a small share of requests to the candidate version, score faithfulness on that slice against the approved version, and send traffic back as soon as the score falls through the gate." },
      { id: "B", text: "Send every appeal to the candidate and watch the phone queue." },
      { id: "C", text: "Gate the release on p99 latency alone." },
      { id: "D", text: "Keep both versions and let the model pick one at random for each request." }
    ],
    correct: ["A"],
    why: "A limited slice plus a faithfulness comparison is a regression gate: the candidate has to hold the score or traffic returns to the approved prompt version. Latency and a full cutover do not catch invented deadlines.",
    optionExplanations: [
      { id: "A", correct: true, text: "The small slice limits blast radius, and a failing faithfulness score is the automatic return to the approved version." },
      { id: "B", correct: false, text: "A full cutover repeats the three-hour incident and uses complaints as the gate." },
      { id: "C", correct: false, text: "A fast letter can still invent an appeal deadline." },
      { id: "D", correct: false, text: "Random selection is not a comparison, and a bad version keeps receiving traffic." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/evaluation.html"
  },
  {
    id: "o-5-1-4-03",
    task: "5.1",
    skill: "5.1.4",
    domain: 5,
    difficulty: 2,
    milestone: "M2",
    chapters: ["18"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 5", "DRAFT"],
    stem: "Lumen City's pipeline marked a prompt release green when the evaluation job never produced a report. The golden-set bucket was empty, the job failed to start, and the permit bot then invented inspection intervals in production. The regression gate has to fail closed. What should the pipeline do?",
    choices: [
      { id: "A", text: "Treat a missing report as a pass so deploys are never blocked." },
      { id: "B", text: "Skip evaluation when the dataset is empty and publish the draft." },
      { id: "C", text: "Retry the job once and publish if that retry also fails." },
      { id: "D", text: "Treat a missing report, a failed evaluation job, or an empty prompt dataset as a failed gate and stop the release." }
    ],
    correct: ["D"],
    why: "Bedrock evaluation scores come from a prompt dataset and a completed job. With no report there is no evidence the new prompt held its quality, so the release stops.",
    optionExplanations: [
      { id: "A", correct: false, text: "A missing report is how the invented inspection intervals reached production." },
      { id: "B", correct: false, text: "An empty dataset means the job never scored the permit questions." },
      { id: "C", correct: false, text: "A second failure still leaves the pipeline without scores." },
      { id: "D", correct: true, text: "The gate stays closed until a completed evaluation on a real dataset produces scores for the candidate." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/evaluation.html"
  },
  {
    id: "o-5-1-5-01",
    task: "5.1",
    skill: "5.1.5",
    domain: 5,
    difficulty: 1,
    milestone: "M3",
    chapters: ["18"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 5", "DRAFT"],
    stem: "Cedar Bank wants a score on 500 adverse-action explanations every time the prompt changes. A second model can judge the full set quickly. Last month that judge approved a letter counsel later called a hallucination. Counsel cannot read all 500 letters on every change. How should they judge the set?",
    choices: [
      { id: "A", text: "Let the generator model score its own letters and skip people." },
      { id: "B", text: "Use a separate judge model on the full set, and send a human holdout plus every sampled letter where counsel disagrees with the judge before the prompt version is approved." },
      { id: "C", text: "Replace the judge with one lawyer reading all 500 letters every day." },
      { id: "D", text: "Drop human review because the judge returns a numeric score." }
    ],
    correct: ["B"],
    why: "A judge-based job uses a second model to score the generator, and a human evaluation is a separate pass for the cases people must decide. The holdout is how counsel checks the judge without reading every letter.",
    optionExplanations: [
      { id: "A", correct: false, text: "The generator grading itself is not a second judge, and it removes the person who caught the last hallucination." },
      { id: "B", correct: true, text: "The judge covers the 500 letters, and human reviewers decide the holdout and the disagreements before the version is approved." },
      { id: "C", correct: false, text: "Reading all 500 letters every day does not scale, which is why the judge exists." },
      { id: "D", correct: false, text: "A numeric score from the judge is what counsel already overturned on the hallucinated letter." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/evaluation.html"
  }
]);
