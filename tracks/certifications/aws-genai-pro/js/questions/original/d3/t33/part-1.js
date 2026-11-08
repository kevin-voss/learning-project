window.AIP = window.AIP || {};
AIP.registerQuestions([
  {
    id: "o-3-3-1-01",
    task: "3.3",
    skill: "3.3.1",
    domain: 3,
    difficulty: 1,
    milestone: "M7",
    chapters: ["17"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 3", "DRAFT"],
    stem: "The Aster Schools board wants the name of the principal who updated the tutor guardrail last Tuesday. They do not want the student prompt text. Model invocation logging is off. CloudTrail is already recording management events in the account. Which record answers the question?",
    choices: [
      { id: "A", text: "A Macie finding on the course-packet bucket." },
      { id: "B", text: "The grounding score from a later student session." },
      { id: "C", text: "The CloudTrail management event for the guardrail update, which identifies the principal, the API call, and the time." },
      { id: "D", text: "The OutputTokenCount metric for that Tuesday." }
    ],
    correct: ["C"],
    why: "CloudTrail records Bedrock management activity, including who called which API and when. That is the record of a guardrail change, not the body of a student prompt.",
    optionExplanations: [
      { id: "A", correct: false, text: "A Macie finding reports sensitive data in S3, not who edited a guardrail." },
      { id: "B", correct: false, text: "A grounding score describes one reply and does not name the person who changed the guardrail." },
      { id: "C", correct: true, text: "The management event is the audit record of the guardrail update and the identity that made it." },
      { id: "D", correct: false, text: "A token metric is a count, with no principal and no API name." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/logging-using-cloudtrail.html"
  },
  {
    id: "o-3-3-2-01",
    task: "3.3",
    skill: "3.3.2",
    domain: 3,
    difficulty: 1,
    milestone: "M7",
    chapters: ["17"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 3", "DRAFT"],
    stem: "Nimbus Support must show a supervisor which help-center article supported a reply. The model was instructed to name the article, and it sometimes names a page that was not retrieved. The RetrieveAndGenerate response already includes source chunks. What should the ticket UI display?",
    choices: [
      { id: "A", text: "The citations to the retrieved source chunks that RetrieveAndGenerate returns, not the article title the model writes on its own." },
      { id: "B", text: "A fresh keyword search run an hour later, using the customer name as the only query." },
      { id: "C", text: "The guardrail blocked-message string, even when the reply was allowed." },
      { id: "D", text: "The VPC endpoint id that carried the API call." }
    ],
    correct: ["A"],
    why: "RetrieveAndGenerate returns citations to the retrieved source chunks, while a sentence the model writes about a source can name the wrong page.",
    optionExplanations: [
      { id: "A", correct: true, text: "The citation objects are the API record of which chunks were retrieved for that answer." },
      { id: "B", correct: false, text: "A later search can return different pages and is not the set that was used." },
      { id: "C", correct: false, text: "The blocked message is what a failed guardrail shows, not a source citation." },
      { id: "D", correct: false, text: "The endpoint id identifies the network path, not the help article." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/kb-how-retrieval.html"
  },
  {
    id: "o-3-3-2-02",
    task: "3.3",
    skill: "3.3.2",
    domain: 3,
    difficulty: 2,
    milestone: "M7",
    chapters: ["17"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 3", "DRAFT"],
    stem: "Northwind Clinic shares one knowledge base across two clinics. Each protocol document has a clinicId metadata attribute. A nurse in clinic A received a clinic B protocol because the wording was semantically close. Both documents are allowed to stay in the base. The nurse session already knows the clinic id from the sign-in token. How should retrieval be constrained?",
    choices: [
      { id: "A", text: "Delete clinic B from the account so semantic search has only one clinic left." },
      { id: "B", text: "Pass a metadata filter on the retrieve request so clinicId must equal the nurse clinic. Do not treat a close vector match as permission." },
      { id: "C", text: "Raise the number of retrieved chunks from 5 to 50 so the right clinic is more likely to appear somewhere in the list." },
      { id: "D", text: "Add a denied topic named clinic B." }
    ],
    correct: ["B"],
    why: "Knowledge base queries can filter on document metadata. A semantic match does not know which clinic the nurse is allowed to see, so the filter has to be part of the retrieve request.",
    optionExplanations: [
      { id: "A", correct: false, text: "Deleting the other clinic removes a legitimate source instead of scoping the query." },
      { id: "B", correct: true, text: "A metadata filter limits retrieval to documents whose clinicId matches the signed-in nurse." },
      { id: "C", correct: false, text: "More chunks make a cross-clinic passage more likely to be included, not less." },
      { id: "D", correct: false, text: "A denied topic blocks a subject in the conversation and does not select documents by clinicId." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/kb-test-config.html"
  },
  {
    id: "o-3-3-3-01",
    task: "3.3",
    skill: "3.3.3",
    domain: 3,
    difficulty: 1,
    milestone: "M7",
    chapters: ["17"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 3", "DRAFT"],
    stem: "Harbor Claims editors keep saving the working draft of the adjuster prompt, and production reads that draft. Legal approved the wording on Monday, then an editor changed the draft on Tuesday and every new claim picked up the edit. Legal wants production frozen on the approved wording while editors continue to experiment. What should production call?",
    choices: [
      { id: "A", text: "The working draft, with a comment in the draft that says approved." },
      { id: "B", text: "A copy of the prompt pasted into a ticket, which the Lambda downloads at runtime." },
      { id: "C", text: "Whatever text is currently in the editor browser cache." },
      { id: "D", text: "A prompt version created from the approved draft, which is a snapshot production can keep while the draft moves on." }
    ],
    correct: ["D"],
    why: "Prompt management keeps an editable draft. A version is the snapshot you create when the wording is ready for the application, so later draft edits do not move production.",
    optionExplanations: [
      { id: "A", correct: false, text: "A comment on the draft does not stop the next save from changing what production reads." },
      { id: "B", correct: false, text: "A ticket is not a prompt version, and it is a weak place to keep approved instructions." },
      { id: "C", correct: false, text: "A browser cache is not the deployed prompt." },
      { id: "D", correct: true, text: "A version is the snapshot production should call while editors keep changing the draft." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-management-deploy.html"
  },
  {
    id: "o-3-3-3-02",
    task: "3.3",
    skill: "3.3.3",
    domain: 3,
    difficulty: 2,
    milestone: "M7",
    chapters: ["17"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 3", "DRAFT"],
    stem: "Any developer in Lumen City can create a prompt version, and the resident app always loads the newest one. A bad edit reached the public assistant before communications had reviewed it. The city policy says only the approval role may publish the version production runs. Which control enforces that split?",
    choices: [
      { id: "A", text: "An IAM policy that lets developers edit the draft, and lets only the approval role create the prompt version that production is allowed to call." },
      { id: "B", text: "A shared developer password stored in the prompt variable named approver." },
      { id: "C", text: "A CloudWatch dashboard that graphs Invocations after the bad version is already live." },
      { id: "D", text: "A guardrail word filter that blocks the word approve." }
    ],
    correct: ["A"],
    why: "IAM is how Bedrock separates who may change a resource from who may only use it. Production should call a version that only the approval role is allowed to create.",
    optionExplanations: [
      { id: "A", correct: true, text: "Least-privilege IAM is the control that stops a developer from publishing the version the resident app runs." },
      { id: "B", correct: false, text: "A password inside a prompt variable is not an IAM permission, and it exposes the secret to the model request." },
      { id: "C", correct: false, text: "A dashboard shows traffic after the unapproved version is already being called." },
      { id: "D", correct: false, text: "A word filter would block resident sentences that use the word approve, not the act of publishing a prompt." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/security-iam.html"
  },
  {
    id: "o-3-3-3-03",
    task: "3.3",
    skill: "3.3.3",
    domain: 3,
    difficulty: 2,
    milestone: "M7",
    chapters: ["17"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 3", "DRAFT"],
    stem: "Cedar Bank has guardrail version 4 in the fraud account. New sandbox accounts in the same organization invoke models with no guardrail. Risk wants a minimum guardrail on every account in the OU, and a team that already uses a stricter guardrail must keep those stricter checks. What should risk turn on?",
    choices: [
      { id: "A", text: "A manual checklist that sandbox owners initial once a year." },
      { id: "B", text: "An organization guardrail enforcement for the OU, layered with each application guardrail so the stricter overlapping control wins." },
      { id: "C", text: "One shared access key that only works if the caller promises to send a guardrail id." },
      { id: "D", text: "Model invocation logging alone, with no guardrail on the sandbox calls." }
    ],
    correct: ["B"],
    why: "Organization-level guardrail enforcement applies a guardrail to Bedrock invocations across accounts in an OU. Layered with an application guardrail, the effective policy is the union and the more restrictive control wins.",
    optionExplanations: [
      { id: "A", correct: false, text: "A yearly checklist does not evaluate the sandbox InvokeModel call." },
      { id: "B", correct: true, text: "The organization enforcement is the floor, and a stricter local guardrail still applies on top." },
      { id: "C", correct: false, text: "A shared key plus a promise is not an enforcement policy." },
      { id: "D", correct: false, text: "Invocation logging records calls and does not insert a guardrail." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-enforcements.html"
  },
  {
    id: "o-3-3-4-01",
    task: "3.3",
    skill: "3.3.4",
    domain: 3,
    difficulty: 1,
    milestone: "M7",
    chapters: ["17"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 3", "DRAFT"],
    stem: "Fieldnote Logistics changed the dispatcher prompt and drivers began reporting failed turns. Ops wants a page when client-side errors on the bedrock-runtime endpoint jump, using the metrics Bedrock already publishes. They do not need the prompt text for this page. Which alarm is appropriate?",
    choices: [
      { id: "A", text: "A Macie job cost alarm on the freight bucket." },
      { id: "B", text: "An alarm on the number of S3 objects in the handbook bucket." },
      { id: "C", text: "A CloudWatch alarm on the AWS/Bedrock InvocationClientErrors metric for the runtime endpoint." },
      { id: "D", text: "An alarm on the guardrail draft version number, which is not a CloudWatch metric." }
    ],
    correct: ["C"],
    why: "The bedrock-runtime endpoint publishes InvocationClientErrors in the AWS/Bedrock namespace. A CloudWatch alarm on that metric is the page ops asked for.",
    optionExplanations: [
      { id: "A", correct: false, text: "Macie job cost does not measure failed model calls." },
      { id: "B", correct: false, text: "Object count in a handbook bucket is not the runtime error rate." },
      { id: "C", correct: true, text: "InvocationClientErrors is the published runtime metric for client-side invocation failures." },
      { id: "D", correct: false, text: "A guardrail version number is not one of the runtime CloudWatch metrics." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/monitoring-runtime-metrics.html"
  },
  {
    id: "o-3-3-4-02",
    task: "3.3",
    skill: "3.3.4",
    domain: 3,
    difficulty: 2,
    milestone: "M7",
    chapters: ["17"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 3", "DRAFT"],
    stem: "Pico Retail saw a burst of odd shopping prompts and wants to read the exact input text from that hour. CloudWatch shows Invocations went up, and CloudTrail shows which role called Converse. Neither view contains the prompt body. The store needs those bodies in the same account and Region. What should they enable?",
    choices: [
      { id: "A", text: "Model invocation logging to CloudWatch Logs or S3, which stores the input and output bodies for bedrock-runtime calls." },
      { id: "B", text: "A second CloudWatch graph of the same Invocations metric, zoomed to one minute." },
      { id: "C", text: "VPC flow logs filtered to port 443, then a manual decode of the TLS payload." },
      { id: "D", text: "A Macie discovery job on the product-image bucket." }
    ],
    correct: ["A"],
    why: "Invocation count and CloudTrail identity do not store the prompt text. Model invocation logging is the feature that retains input and output bodies for runtime calls.",
    optionExplanations: [
      { id: "A", correct: true, text: "The invocation log record includes the input body, which is the text the security review needs to read." },
      { id: "B", correct: false, text: "A finer graph of Invocations is still only a count." },
      { id: "C", correct: false, text: "Flow logs do not expose the plaintext prompt inside TLS." },
      { id: "D", correct: false, text: "Macie scans S3 objects such as images and does not capture the live Converse body." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/model-invocation-logging.html"
  },
  {
    id: "o-3-3-4-03",
    task: "3.3",
    skill: "3.3.4",
    domain: 3,
    difficulty: 2,
    milestone: "M7",
    chapters: ["17"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 3", "DRAFT"],
    stem: "Aster Schools published prompt version 6 and the tutor answers on the labeled quiz set got worse. OutputTokenCount barely moved, so the token graph did not explain the drop. Version 5 scores were saved from an earlier Bedrock evaluation that used the same custom prompt dataset. How should they confirm the drift and recover?",
    choices: [
      { id: "A", text: "Run the evaluation again on version 6 with that same dataset, compare the scores with version 5, and point the app back to version 5 if version 6 is worse." },
      { id: "B", text: "Watch InvocationLatency for a week and treat a stable line as proof that answer quality is unchanged." },
      { id: "C", text: "Delete the labeled dataset so the drop cannot be measured again." },
      { id: "D", text: "Increase temperature on version 6 until the answers look longer." }
    ],
    correct: ["A"],
    why: "A Bedrock evaluation on a custom prompt dataset compares answer quality between two prompt snapshots, which token and latency metrics do not measure.",
    optionExplanations: [
      { id: "A", correct: true, text: "Repeating the evaluation on the same dataset shows the quality drop, and production can stay on the better prompt version." },
      { id: "B", correct: false, text: "Latency can stay flat while the answers get worse." },
      { id: "C", correct: false, text: "Deleting the dataset removes the baseline you need for the comparison." },
      { id: "D", correct: false, text: "Temperature changes style and length, and it is not a comparison against the labeled quiz set." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/evaluation.html"
  }
]);
