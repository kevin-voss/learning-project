window.AIP = window.AIP || {};
AIP.registerQuestions([
  {
    id: "o-1-6-5-04",
    task: "1.6",
    skill: "1.6.5",
    domain: 1,
    difficulty: 3,
    milestone: "M7",
    chapters: ["04"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 1","DRAFT"],
    stem: "Northwind Clinic has promoted six versions of the discharge prompt. The golden set is green, but production still misses a rare medication nickname that was never in that set. Leadership wants the smallest next step that can catch the nickname, keep the working prompt if the change fails, and avoid a pretraining bill. Audit must be able to return to version 6. What should they do?",
    choices: [
      { id: "A", text: "Add the production failure to the golden set, revise the prompt, compare the new version with version 6 on both the old set and the new case, and promote only if both pass." },
      { id: "B", text: "Promote the current draft because the old golden set is already green." },
      { id: "C", text: "Remove the nickname cases from the test set and declare the prompt done." },
      { id: "D", text: "Start continued pre-training on the single nickname and skip the version comparison." }
    ],
    correct: ["A"],
    why: "A green golden set that omitted the nickname cannot approve the next draft. The failure has to join the set, the new version has to beat version 6 on both the old cases and the nickname, and version 6 stays available for rollback.",
    optionExplanations: [
      { id: "A", correct: true, incorrect: false, text: "Expanding the set, comparing against version 6, and promoting only on a full pass is the smallest reversible step." },
      { id: "B", correct: false, incorrect: true, text: "The old golden set never contained the nickname, so a green result does not justify another promotion." },
      { id: "C", correct: false, incorrect: true, text: "Deleting the failing cases makes the metric green without teaching the prompt the nickname." },
      { id: "D", correct: false, incorrect: true, text: "Continued pre-training for one nickname is the large bill they want to avoid, and skipping the comparison removes rollback evidence." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-management-version-compare.html"
  },
  {
    id: "o-1-6-6-01",
    task: "1.6",
    skill: "1.6.6",
    domain: 1,
    difficulty: 1,
    milestone: "M7",
    chapters: ["04"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 1","DRAFT"],
    stem: "Harbor Claims wants one managed path that retrieves claim excerpts, drafts a denial paragraph, and applies a guardrail. Three teams do not want to own three separate functions for those steps. Auditors want the path visible as one workflow. Which design meets that with the least operational overhead?",
    choices: [
      { id: "A", text: "Email the claim to an adjuster who pastes it into the console." },
      { id: "B", text: "Build an Amazon Bedrock Flow with a knowledge base node, a prompt node, and a guardrail on the prompt or retrieval step, and invoke that flow." },
      { id: "C", text: "Hardcode the three calls in a spreadsheet macro on a shared laptop." },
      { id: "D", text: "Use a flow that contains only a wait and never retrieves or drafts." }
    ],
    correct: ["B"],
    why: "A Bedrock Flow chains a knowledge base node and a prompt node, and guardrail configuration can be attached in that flow. One InvokeFlow call replaces three hand-owned functions.",
    optionExplanations: [
      { id: "A", correct: false, incorrect: true, text: "Manual paste is not a managed workflow and will not keep up with the claim queue." },
      { id: "B", correct: true, incorrect: false, text: "The flow's knowledge base node, prompt node, and guardrail configuration are the managed chain auditors can inspect." },
      { id: "C", correct: false, incorrect: true, text: "A spreadsheet macro is more operational burden and is not a Bedrock flow." },
      { id: "D", correct: false, incorrect: true, text: "A wait with no retrieval or draft does not produce the denial paragraph." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/flows.html"
  },
  {
    id: "o-1-6-6-02",
    task: "1.6",
    skill: "1.6.6",
    domain: 1,
    difficulty: 2,
    milestone: "M7",
    chapters: ["04"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 1","DRAFT"],
    stem: "Lumen City's resident flow should answer when retrieval confidence is high and ask a clarifying question when it is low. They do not want two applications. The high-confidence path must not wait on the clarification model call, because latency is the constraint. How should the flow branch?",
    choices: [
      { id: "A", text: "Always run both prompts and concatenate the outputs." },
      { id: "B", text: "Always clarify, even when confidence is high, so every path pays the extra model call." },
      { id: "C", text: "Add a condition node that sends high-confidence results to the answer prompt and low-confidence results to the clarification prompt." },
      { id: "D", text: "Create a separate AWS account for each confidence band." }
    ],
    correct: ["C"],
    why: "A condition node routes the flow to one next node. High-confidence turns go only to the answer prompt, so they do not pay the clarification call.",
    optionExplanations: [
      { id: "A", correct: false, incorrect: true, text: "Running both prompts adds the latency the high-confidence path must avoid." },
      { id: "B", correct: false, incorrect: true, text: "Always clarifying forces the extra model call onto turns that were already confident." },
      { id: "C", correct: true, incorrect: false, text: "The condition node selects either the answer prompt or the clarification prompt, so the fast path skips the extra call." },
      { id: "D", correct: false, incorrect: true, text: "A second account is not a branch inside one flow and adds operational overhead." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/flows-nodes.html"
  },
  {
    id: "o-1-6-6-03",
    task: "1.6",
    skill: "1.6.6",
    domain: 1,
    difficulty: 2,
    milestone: "M7",
    chapters: ["04"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 1","DRAFT"],
    stem: "Cedar Bank has four flows that each paste the same preamble and the same output schema. When legal changes one sentence, three of the flows drift. They want one reusable prompt, a check of the input object before the model runs, and a schema check after it, with the least operational overhead. How should the flows be built?",
    choices: [
      { id: "A", text: "Copy the paragraph into four separate functions and edit them independently." },
      { id: "B", text: "Store the preamble on a public wiki and tell each flow to browse the web at runtime." },
      { id: "C", text: "Remove the validation nodes so drift cannot be detected." },
      { id: "D", text: "Store the shared wording as one Prompt Management prompt, reference that prompt from a prompt node in each flow, and add nodes that validate the input before the prompt and the schema after it." }
    ],
    correct: ["D"],
    why: "A prompt node can use a Prompt Management prompt, so one approved wording serves all four flows. Nodes before and after that prompt validate the input object and the output schema without copying the preamble.",
    optionExplanations: [
      { id: "A", correct: false, incorrect: true, text: "Four copied functions are the drift the bank is already seeing." },
      { id: "B", correct: false, incorrect: true, text: "A public wiki browse is not a versioned prompt node and exposes the preamble." },
      { id: "C", correct: false, incorrect: true, text: "Removing validation hides schema failures instead of sharing one prompt." },
      { id: "D", correct: true, incorrect: false, text: "One managed prompt referenced by each flow, with validation around the prompt node, removes the copied preamble and checks the schema." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/flows-nodes.html"
  }
]);
