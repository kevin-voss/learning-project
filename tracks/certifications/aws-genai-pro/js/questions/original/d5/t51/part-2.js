window.AIP = window.AIP || {};
AIP.registerQuestions([
  {
    id: "o-5-1-5-02",
    task: "5.1",
    skill: "5.1.5",
    domain: 5,
    difficulty: 2,
    milestone: "M3",
    chapters: ["18"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 5", "DRAFT"],
    stem: "Fieldnote Logistics ran a judge model on dispatcher replies after a prompt change. The judge's helpfulness score rose, but senior dispatchers marking the same 40 replies said the model invented a cutoff time that is not in the yard manual. The release owner wants to lower the ship threshold so the judge's score passes. That would repeat the last production incident. What should they do?",
    choices: [
      { id: "A", text: "Lower the threshold so the release proceeds on the judge score." },
      { id: "B", text: "Retrain the judge on the dispatchers' names and ship the same prompt." },
      { id: "C", text: "Keep the previous prompt version, and send the disagreed replies to human raters with the yard-manual passage as the reference response." },
      { id: "D", text: "Average the judge score with a random number so the dispute smooths out." }
    ],
    correct: ["C"],
    why: "Human workers can rate responses against a reference you supply, which is the yard-manual passage the dispatchers are using. Lowering the automatic threshold hides the disagreement instead of resolving it.",
    optionExplanations: [
      { id: "A", correct: false, text: "Lowering the threshold approves the invented cutoff the dispatchers already rejected." },
      { id: "B", correct: false, text: "The dispute is about a missing cutoff in the manual, not about who the raters are." },
      { id: "C", correct: true, text: "Human raters with the manual passage as the reference decide the disagreed replies while production stays on the previous version." },
      { id: "D", correct: false, text: "A random number does not check the cutoff against the yard manual." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation-jobs-management-create-human.html"
  },
  {
    id: "o-5-1-6-01",
    task: "5.1",
    skill: "5.1.6",
    domain: 5,
    difficulty: 1,
    milestone: "M3",
    chapters: ["18"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 5", "DRAFT"],
    stem: "Pico Retail's product answers mention sizes that are not in the passages returned for that question. The generator prompt was already tightened, and the final sentences still sound fluent. The team needs to test retrieval quality on its own before they spend another cycle on wording. Which test should they run?",
    choices: [
      { id: "A", text: "Run a retrieve-only RAG evaluation and read context relevance and context coverage against ground-truth passages." },
      { id: "B", text: "Score only the final sentence with BLEU against last week's answer." },
      { id: "C", text: "Increase temperature and see whether the extra size disappears." },
      { id: "D", text: "Ask the generator whether it believes the retrieval was good." }
    ],
    correct: ["A"],
    why: "A retrieve-only job scores the retrieved texts, and context relevance and context coverage are the built-in metrics for that job. Fluency of the final sentence can hide a weak index.",
    optionExplanations: [
      { id: "A", correct: true, text: "Retrieve-only context relevance and context coverage show whether the passages themselves cover the size facts." },
      { id: "B", correct: false, text: "BLEU on the final sentence does not inspect which passages were retrieved." },
      { id: "C", correct: false, text: "Temperature changes the generator, which this test is supposed to hold still." },
      { id: "D", correct: false, text: "The generator's self-assessment is not a retrieval metric against ground-truth passages." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base-evaluation-metrics.html"
  },
  {
    id: "o-5-1-6-02",
    task: "5.1",
    skill: "5.1.6",
    domain: 5,
    difficulty: 2,
    milestone: "M3",
    chapters: ["18"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 5", "DRAFT"],
    stem: "Aster Schools rebuilt chunking for the course catalog after faculty reported that course-code questions retrieved the wrong syllabus. They now have the old knowledge base and the new one, plus a list of the code lookups that failed in production and the passages that should have been returned. How should they test retrieval quality?",
    choices: [
      { id: "A", text: "Ask each knowledge base five friendly questions and pick the longer answer." },
      { id: "B", text: "Compare how many objects are in the two S3 buckets." },
      { id: "C", text: "Judge only the final generated paragraph and ignore which passages came back." },
      { id: "D", text: "Run a retrieve-only evaluation of both knowledge bases on one dataset that includes those course-code questions and the ground-truth passages, then compare context coverage." }
    ],
    correct: ["D"],
    why: "RAG evaluation can compare knowledge bases, and a retrieve-only job with ground truth supports context coverage. That comparison uses the same failed lookups instead of a handful of friendly questions.",
    optionExplanations: [
      { id: "A", correct: false, text: "Five friendly questions miss the course-code lookups that failed, and answer length is not retrieval quality." },
      { id: "B", correct: false, text: "Object counts do not show whether the right syllabus passage was retrieved." },
      { id: "C", correct: false, text: "The final paragraph hides which passages each knowledge base returned." },
      { id: "D", correct: true, text: "One retrieve-only dataset with ground-truth passages lets context coverage compare the two knowledge bases on the failed lookups." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/evaluation-kb.html"
  },
  {
    id: "o-5-1-7-01",
    task: "5.1",
    skill: "5.1.7",
    domain: 5,
    difficulty: 1,
    milestone: "M3",
    chapters: ["18"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 5", "DRAFT"],
    stem: "Nimbus Support's refund agent ended a production incident by apologizing politely while calling IssueRefund for the full order instead of the damaged line. The final sentence looked acceptable. CheckPolicy never ran. They need an evaluation of the agent on a set of refund tasks. What should that evaluation grade?",
    choices: [
      { id: "A", text: "Score the apology with a fluency metric and ignore the tool call." },
      { id: "B", text: "Grade each task from the agent trace: whether CheckPolicy ran, whether IssueRefund was selected, and whether the amount and line id matched the case." },
      { id: "C", text: "Count the turns and treat fewer turns as a better agent, regardless of the tool parameters." },
      { id: "D", text: "Disable the trace so the test run finishes faster." }
    ],
    correct: ["B"],
    why: "The agent trace records the action group inputs and outputs and the path that led to the reply. Task success here is the tool choice and the parameters, not the fluency of the apology.",
    optionExplanations: [
      { id: "A", correct: false, text: "A fluent apology is what hid the full-order refund in the incident." },
      { id: "B", correct: true, text: "The trace shows which action ran and which parameters were passed, so the refund tasks can be graded on that behavior." },
      { id: "C", correct: false, text: "A short conversation can still call IssueRefund with the wrong amount." },
      { id: "D", correct: false, text: "Without the trace there is no record of CheckPolicy or the refund parameters." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/trace-events.html"
  },
  {
    id: "o-5-1-8-01",
    task: "5.1",
    skill: "5.1.8",
    domain: 5,
    difficulty: 1,
    milestone: "M3",
    chapters: ["18"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 5", "DRAFT"],
    stem: "Harbor Claims leadership asked whether the new appeals prompt is safe to ship after the hallucination incident. An engineer pasted one strong letter into the slide. The judge evaluation had already written a full report to S3, including scores and the per-prompt explanations. Leadership needs a result they can compare with the last approved prompt, including what still fails. What should the team report?",
    choices: [
      { id: "A", text: "Report that the model is smarter now, with no count of prompts and no metric name." },
      { id: "B", text: "Hide the failing rows so the meeting stays short." },
      { id: "C", text: "Share the evaluation report: the metric names, how many prompts were scored, the scores against the last approved version, and the failing examples." },
      { id: "D", text: "Report GPU utilization as the quality result." }
    ],
    correct: ["C"],
    why: "A judge evaluation writes a report to the S3 bucket you choose, with scores and explanations for the prompt set. That report is what leadership can compare across prompt versions.",
    optionExplanations: [
      { id: "A", correct: false, text: "A slogan has no metric, no sample size, and no comparison to the last approved prompt." },
      { id: "B", correct: false, text: "Hiding failures removes the part of the report that shows remaining hallucinations." },
      { id: "C", correct: true, text: "The S3 evaluation report already contains the scores, the explanations, and the prompt set leadership needs beside the last approved version." },
      { id: "D", correct: false, text: "GPU utilization does not describe faithfulness or the failing appeals." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/evaluation-judge.html"
  },
  {
    id: "o-5-1-9-01",
    task: "5.1",
    skill: "5.1.9",
    domain: 5,
    difficulty: 1,
    milestone: "M3",
    chapters: ["18"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 5", "DRAFT"],
    stem: "Lumen City created prompt version 6 after it passed evaluation. The next morning's production incident still showed the old inspection interval. Invocation logs show the running app called the prompt draft, and version 6 was never referenced. The console test of the draft is what the on-call engineer checked. How should they validate the deployment?",
    choices: [
      { id: "A", text: "Point the application at the version 6 ARN, send the golden permit questions through that production path, and confirm invocation logs show version 6 and that the answers match the approved evaluation." },
      { id: "B", text: "Re-run the prompt in the console draft and mark the deployment validated." },
      { id: "C", text: "Change the model id to a different foundation model and assume the version moved." },
      { id: "D", text: "Delete the golden set so the old answers cannot be compared." }
    ],
    correct: ["A"],
    why: "A prompt version is the snapshot you invoke in production, using its ARN. Checking the draft in the console does not prove the application is calling version 6.",
    optionExplanations: [
      { id: "A", correct: true, text: "Production must call the version 6 ARN, and the golden questions plus invocation logs confirm that this deployment is the one that was evaluated." },
      { id: "B", correct: false, text: "The console draft is the path the logs already showed, which is the path that still had the old interval." },
      { id: "C", correct: false, text: "A different foundation model does not attach version 6 to the application." },
      { id: "D", correct: false, text: "Deleting the golden set removes the comparison that validates the deployment." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-management-test.html"
  },
  {
    id: "o-5-1-9-02",
    task: "5.1",
    skill: "5.1.9",
    domain: 5,
    difficulty: 2,
    milestone: "M7",
    chapters: ["18"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 5", "DRAFT"],
    stem: "Cedar Bank prepared a new agent version after a tool-call incident. The console test of the working draft looks fixed. Callers through the production API still hit the old behavior. The application invokes the test alias, which points at the draft, while a new alias points at the immutable version. How should they validate the deployment customers actually call?",
    choices: [
      { id: "A", text: "Accept the deployment because the working draft looks right in the console." },
      { id: "B", text: "Invoke the test alias from a laptop and call that production validation." },
      { id: "C", text: "Compare only the final sentence from the draft and skip the trace." },
      { id: "D", text: "Run the golden task set against the production alias the application uses, with the trace on, and accept the deployment only when that alias's tool calls match the fixed version." }
    ],
    correct: ["D"],
    why: "The test alias points at the working draft, and the application has to call the alias that points at the immutable version. Validation has to hit that production alias, not the draft the console is editing.",
    optionExplanations: [
      { id: "A", correct: false, text: "The working draft is what the test alias serves, and customers are still on that path." },
      { id: "B", correct: false, text: "The test alias is the draft pointer, so a laptop call does not exercise the production alias." },
      { id: "C", correct: false, text: "The incident was a tool call, and the final sentence from the draft does not show the production alias." },
      { id: "D", correct: true, text: "The golden tasks and the trace on the production alias check the version customers invoke." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/deploy-agent.html"
  }
]);
