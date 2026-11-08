window.AIP = window.AIP || {};
AIP.registerQuestions([
  {
    id: "o-3-4-1-01",
    task: "3.4",
    skill: "3.4.1",
    domain: 3,
    difficulty: 1,
    milestone: "M7",
    chapters: ["17"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 3", "DRAFT"],
    stem: "Nimbus Support agents must show a customer which help article a reply used. The application calls RetrieveAndGenerate and currently renders only the generated paragraph. Agents have been guessing the article from memory. What should the reply screen add?",
    choices: [
      { id: "A", text: "The citations to source chunks that RetrieveAndGenerate returns with the answer." },
      { id: "B", text: "A button that asks the same model to invent a plausible URL." },
      { id: "C", text: "The AWS account id of the knowledge base, with no chunk attached." },
      { id: "D", text: "A random sentence from the longest document in the bucket." }
    ],
    correct: ["A"],
    why: "RetrieveAndGenerate includes citations to the specific source chunks used for the response. Those citations are the source the agent can show.",
    optionExplanations: [
      { id: "A", correct: true, text: "The citation list is the API payload that ties the reply to retrieved chunks." },
      { id: "B", correct: false, text: "A second model call that invents a URL is not a citation from retrieval." },
      { id: "C", correct: false, text: "An account id does not identify the article." },
      { id: "D", correct: false, text: "A random sentence is not the chunk the retrieve step returned." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/kb-how-retrieval.html"
  },
  {
    id: "o-3-4-1-02",
    task: "3.4",
    skill: "3.4.1",
    domain: 3,
    difficulty: 2,
    milestone: "M7",
    chapters: ["17"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 3", "DRAFT"],
    stem: "Aster Schools shows parents a tutor answer that ends with the sentence as stated in the family handbook. The RetrieveAndGenerate citation list for that turn is empty. A teacher wants to know whether the handbook line is real. What should the review trust?",
    choices: [
      { id: "A", text: "The closing sentence, because the model would not mention a handbook unless retrieval found one." },
      { id: "B", text: "The citation list. An empty list means this response did not come back with a retrieved source chunk, so the handbook sentence is not a citation." },
      { id: "C", text: "The temperature value, because 0.2 proves the sentence was copied." },
      { id: "D", text: "The VPC flow log, which stores the handbook paragraph." }
    ],
    correct: ["B"],
    why: "Citations are the retrieve record. A model can claim a source in prose when the citation list is empty, and that sentence is not the citation.",
    optionExplanations: [
      { id: "A", correct: false, text: "The model can name a handbook without a retrieved chunk to point at." },
      { id: "B", correct: true, text: "The citation list is the source record for that response, and an empty list does not support the handbook claim." },
      { id: "C", correct: false, text: "Temperature does not record which document was retrieved." },
      { id: "D", correct: false, text: "Flow logs do not store the handbook text or the citation." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/kb-how-retrieval.html"
  },
  {
    id: "o-3-4-1-03",
    task: "3.4",
    skill: "3.4.1",
    domain: 3,
    difficulty: 2,
    milestone: "M7",
    chapters: ["17"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 3", "DRAFT"],
    stem: "Cedar Bank calls Converse on bedrock-runtime and places the retrieved fee clause in the prompt. A week later the fee PDF is edited. Audit must show the clause the model actually received on the original day, not a new retrieve. CloudTrail has the Converse event and not the prompt body. What retains that body?",
    choices: [
      { id: "A", text: "Run RetrieveAndGenerate again today and assume the chunk is unchanged." },
      { id: "B", text: "Read the guardrail version number, which stores every prompt." },
      { id: "C", text: "Enable model invocation logging so the input body, including the fee clause that was sent, is retained with the call." },
      { id: "D", text: "Ask the model to recall the old PDF from memory." }
    ],
    correct: ["C"],
    why: "Model invocation logging stores the input body of bedrock-runtime calls. A later retrieve can return a different clause after the PDF changes, and CloudTrail is not that body.",
    optionExplanations: [
      { id: "A", correct: false, text: "Retrieving again reads the edited PDF, which is the problem the audit is trying to avoid." },
      { id: "B", correct: false, text: "A guardrail version is a safety-policy snapshot, not a store of every prompt." },
      { id: "C", correct: true, text: "The invocation log keeps the input body from the original Converse call, which is the clause the model was given." },
      { id: "D", correct: false, text: "The model is not a record of the prompt that was sent last week." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/model-invocation-logging.html"
  },
  {
    id: "o-3-4-2-01",
    task: "3.4",
    skill: "3.4.2",
    domain: 3,
    difficulty: 1,
    milestone: "M7",
    chapters: ["17"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 3", "DRAFT"],
    stem: "Aster Schools is about to launch an admissions helper. The written fairness rule says the school must compare ratings for two districts before parents see the bot. One overall score on a mixed set is all they have, and it looks fine. They can store a prompt dataset in S3 and have staff rate answers. What evaluation should they run?",
    choices: [
      { id: "A", text: "A Bedrock model evaluation that uses human workers and a custom dataset of paired cases, then compare the staff ratings across the two districts." },
      { id: "B", text: "Set the Hate content filter to High and treat that setting as the fairness test." },
      { id: "C", text: "Ask the admissions model whether it is fair, and archive the yes answer." },
      { id: "D", text: "Delete the district field from the production prompt and skip any comparison." }
    ],
    correct: ["A"],
    why: "A human model evaluation job scores a prompt dataset you supply. Paired cases let the school compare districts, which one mixed average cannot show.",
    optionExplanations: [
      { id: "A", correct: true, text: "Human workers rating a custom dataset is the Bedrock evaluation that can compare the two districts before launch." },
      { id: "B", correct: false, text: "A content-filter strength blocks harmful text and is not a comparison of outcomes across districts." },
      { id: "C", correct: false, text: "A self-assessment from the same model is not a human evaluation on a dataset." },
      { id: "D", correct: false, text: "Removing the field skips the measurement the fairness rule asked for." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation-type-human.html"
  },
  {
    id: "o-3-4-2-02",
    task: "3.4",
    skill: "3.4.2",
    domain: 3,
    difficulty: 2,
    milestone: "M7",
    chapters: ["17"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 3", "DRAFT"],
    stem: "Cedar Bank's loan-explainer evaluation reported one strong average. The dataset mixed every neighborhood together, so a gap between two neighborhoods never appeared in the summary. The policy says those neighborhoods must be compared before the explainer is approved. The bank can build its own prompt dataset. What should the next evaluation do?",
    choices: [
      { id: "A", text: "Keep the single mixed average and add more of the larger neighborhood until the average rises." },
      { id: "B", text: "Build a custom dataset of matched applications that differ by the neighborhood cue, run the Bedrock evaluation on that dataset, and compare the metric for each slice." },
      { id: "C", text: "Turn off evaluation jobs so the average cannot fall." },
      { id: "D", text: "Replace the evaluation with a VPC endpoint, which balances requests across neighborhoods." }
    ],
    correct: ["B"],
    why: "A custom prompt dataset built as matched pairs makes a neighborhood gap visible, while one mixed score hides it.",
    optionExplanations: [
      { id: "A", correct: false, text: "Adding more of the larger group can improve the average while the gap stays hidden." },
      { id: "B", correct: true, text: "A custom dataset sliced by neighborhood is the evaluation design that compares the groups named in the policy." },
      { id: "C", correct: false, text: "Stopping evaluation removes the measurement rather than completing it." },
      { id: "D", correct: false, text: "A VPC endpoint changes the network path and does not score fairness." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/evaluation.html"
  },
  {
    id: "o-3-4-3-01",
    task: "3.4",
    skill: "3.4.3",
    domain: 3,
    difficulty: 1,
    milestone: "M7",
    chapters: ["17"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 3", "DRAFT"],
    stem: "Northwind Clinic's written AI policy says the triage assistant must not diagnose or recommend a dose. The current control is one line in the system prompt. Patients still receive dosing language when they insist. The policy owner wants a guardrail control that matches the written prohibition. What should they configure?",
    choices: [
      { id: "A", text: "A denied topic whose definition describes diagnosis and dosing advice, applied on the guardrail the assistant uses." },
      { id: "B", text: "A second copy of the same system-prompt line, in case the first copy is skipped." },
      { id: "C", text: "A word filter that blocks the word clinic." },
      { id: "D", text: "A higher temperature so the dosing answer sounds less certain." }
    ],
    correct: ["A"],
    why: "A denied topic blocks a subject described in a short definition, which a system-prompt line does not do.",
    optionExplanations: [
      { id: "A", correct: true, text: "The denied topic puts the written ban on diagnosis and dosing into the guardrail that evaluates prompts and responses." },
      { id: "B", correct: false, text: "Another sentence in the system prompt is still only a prompt, which the patient text can override." },
      { id: "C", correct: false, text: "Blocking the word clinic breaks ordinary hospital questions and does not define dosing advice." },
      { id: "D", correct: false, text: "Temperature does not implement a written prohibition." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-denied-topics.html"
  },
  {
    id: "o-3-4-3-02",
    task: "3.4",
    skill: "3.4.3",
    domain: 3,
    difficulty: 2,
    milestone: "M7",
    chapters: ["17"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 3", "DRAFT"],
    stem: "Harbor Claims wrote a policy that only the compliance group may change the instructions the production adjuster runs. Developers may experiment on a draft. Last week a developer published the version production loads, and the tone changed before compliance reviewed it. Which change follows the written policy?",
    choices: [
      { id: "A", text: "Let developers keep publishing, and email compliance after the version is already in production." },
      { id: "B", text: "Grant prompt-version creation for the production prompt only to the compliance role, and keep production pointed at a version rather than the draft." },
      { id: "C", text: "Store the policy PDF in the same S3 prefix as the training data and fine-tune on it overnight." },
      { id: "D", text: "Add a guardrail tag suffix and treat that suffix as the approval signature." }
    ],
    correct: ["B"],
    why: "The written rule is about who may publish production instructions. IAM on prompt-version creation, with production calling a version, is the control that matches that rule.",
    optionExplanations: [
      { id: "A", correct: false, text: "An email after release does not stop the unapproved version from serving claims." },
      { id: "B", correct: true, text: "Limiting who can create the production version, and serving that version, is how the approval rule is enforced." },
      { id: "C", correct: false, text: "Fine-tuning on the policy PDF does not restrict who can publish the next prompt." },
      { id: "D", correct: false, text: "A tag suffix only selects which input span a guardrail reads and does not approve a prompt version." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/security-iam.html"
  },
  {
    id: "o-3-4-3-03",
    task: "3.4",
    skill: "3.4.3",
    domain: 3,
    difficulty: 2,
    milestone: "M7",
    chapters: ["17"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 3", "DRAFT"],
    stem: "Pico Retail's written policy says the shopping assistant may explain the posted return rules and must not give legal advice. A product team wants a friendlier system prompt and a higher temperature so the bot will answer legal questions from shoppers. The approved guardrail version is already on the call. What follows the policy?",
    choices: [
      { id: "A", text: "Raise the temperature and delete the return-policy documents so the model has to improvise." },
      { id: "B", text: "Fine-tune the model on legal memos so the forbidden answers sound more professional." },
      { id: "C", text: "Keep the approved guardrail version, with a denied topic whose definition matches the ban on legal advice, and do not widen the prompt to take on that work." },
      { id: "D", text: "Move the legal questions to a second model that has no guardrail and no written limit." }
    ],
    correct: ["C"],
    why: "A denied topic on the guardrail version the app already calls keeps legal advice out, while a friendlier prompt would expand the bot past the written policy.",
    optionExplanations: [
      { id: "A", correct: false, text: "Removing the return rules and raising temperature pushes the bot toward invented legal answers." },
      { id: "B", correct: false, text: "Fine-tuning on legal memos trains the forbidden task the policy names." },
      { id: "C", correct: true, text: "The denied topic on the approved guardrail version is what keeps the assistant inside the written limit." },
      { id: "D", correct: false, text: "A second unguarded model is a path around the policy, not an implementation of it." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-denied-topics.html"
  }
]);
