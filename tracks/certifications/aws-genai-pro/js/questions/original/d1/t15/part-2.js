window.AIP = window.AIP || {};
AIP.registerQuestions([
  {
    id: "o-1-5-5-01",
    task: "1.5",
    skill: "1.5.5",
    domain: 1,
    difficulty: 1,
    milestone: "M7",
    chapters: ["09"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 1","DRAFT"],
    stem: "Aster Schools parents ask about bus routes, then follow up with \"What about the other one?\" Retrieval embeds that short line and returns unrelated pages. The school wants the search text rewritten with the prior topic before the vector query. They want the least operational overhead on the knowledge base they already run. What should they enable?",
    choices: [
      { id: "A", text: "Embed the two-word follow-up as-is and accept the miss." },
      { id: "B", text: "Fine-tune the embedding model on pronouns." },
      { id: "C", text: "Use the knowledge base orchestration prompt so the follow-up is rewritten into a standalone search query before retrieval." },
      { id: "D", text: "Delete conversation history so the pronoun cannot be resolved." }
    ],
    correct: ["C"],
    why: "The knowledge base orchestration prompt turns the user message into the query that retrieval runs. Rewriting \"the other one\" into a bus-route query fixes the search text without a custom embedding model.",
    optionExplanations: [
      { id: "A", correct: false, incorrect: true, text: "Embedding the unresolved follow-up is the failure the parents are already seeing." },
      { id: "B", correct: false, incorrect: true, text: "Fine-tuning the embedding model on pronouns does not supply the missing bus-route subject." },
      { id: "C", correct: true, incorrect: false, text: "The orchestration prompt rewrites the follow-up into a standalone query before the vector search." },
      { id: "D", correct: false, incorrect: true, text: "Deleting history removes the topic the rewrite needs." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/kb-test-config.html"
  },
  {
    id: "o-1-5-5-02",
    task: "1.5",
    skill: "1.5.5",
    domain: 1,
    difficulty: 2,
    milestone: "M7",
    chapters: ["09"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 1","DRAFT"],
    stem: "Nimbus Support agents paste compound questions such as the refund window for NX-440 and which team approves an exception over $200. One retrieval returns chunks about only the first clause, so the approval team is missing from the draft. They want both facts retrieved and then one answer, using a managed knowledge base feature if it fits. Latency still has to stay acceptable for a live agent call. Which feature should they turn on?",
    choices: [
      { id: "A", text: "Answer only the first clause and drop the rest of the question." },
      { id: "B", text: "Increase temperature so the model guesses the approval team." },
      { id: "C", text: "Embed only the word refund and discard the rest of the question." },
      { id: "D", text: "Enable query decomposition so the compound question is split into sub-queries, retrieve for each, and ground the answer on the combined chunks." }
    ],
    correct: ["D"],
    why: "Query decomposition breaks a complex question into smaller queries, retrieves for those parts, and gives generation the combined context. That is how the refund window and the approval team can both show up.",
    optionExplanations: [
      { id: "A", correct: false, incorrect: true, text: "Dropping the second clause leaves the approval team out of the answer on purpose." },
      { id: "B", correct: false, incorrect: true, text: "A higher temperature does not retrieve the approval policy." },
      { id: "C", correct: false, incorrect: true, text: "Embedding a single word throws away both the SKU and the exception clause." },
      { id: "D", correct: true, incorrect: false, text: "Decomposition retrieves each clause instead of stopping after the refund-window chunks." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/kb-test-config.html"
  },
  {
    id: "o-1-5-5-03",
    task: "1.5",
    skill: "1.5.5",
    domain: 1,
    difficulty: 2,
    milestone: "M7",
    chapters: ["09"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 1","DRAFT"],
    stem: "Northwind Clinic searches a custom OpenSearch index, not a knowledge base orchestration layer, so managed query decomposition is unavailable. A nurse's question often contains two protocol checks. They want each sub-query visible, a retry if one search fails, and the private network left as it is. Which workflow should wrap the searches?",
    choices: [
      { id: "A", text: "Use a Step Functions workflow to split the question, run each vector search, retry a failed search, and pass the combined passages to Converse." },
      { id: "B", text: "Send the raw compound question to k-NN once and ignore a second concept that fails." },
      { id: "C", text: "Ask the nurse to file two tickets in another system and leave search unchanged." },
      { id: "D", text: "Replace the vector query with a Step Functions wait state that does not call search." }
    ],
    correct: ["A"],
    why: "Step Functions can hold one state per protocol check, retry a failed search, and keep both sub-queries in the execution history before Converse sees the combined passages.",
    optionExplanations: [
      { id: "A", correct: true, incorrect: false, text: "A state per sub-query, with retry, is the auditable transform in front of the private OpenSearch index." },
      { id: "B", correct: false, incorrect: true, text: "One k-NN call with a silent miss drops the second protocol check." },
      { id: "C", correct: false, incorrect: true, text: "A second ticket system does not rewrite or run the search." },
      { id: "D", correct: false, incorrect: true, text: "A wait state does not query the index or split the question." }
    ],
    evidence: "https://docs.aws.amazon.com/step-functions/latest/dg/concepts-error-handling.html"
  },
  {
    id: "o-1-5-6-01",
    task: "1.5",
    skill: "1.5.6",
    domain: 1,
    difficulty: 1,
    milestone: "M7",
    chapters: ["09"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 1","DRAFT"],
    stem: "Harbor Claims has four applications posting copied OpenSearch query JSON. The platform team wants to change the vector store later without breaking those apps. Callers should send a question and receive chunks through one operation. Least operational overhead is the constraint. What should the apps call?",
    choices: [
      { id: "A", text: "Give each app the OpenSearch admin password and let it post raw index queries." },
      { id: "B", text: "Make Amazon Bedrock knowledge base Retrieve the only retrieval API, and keep the vector store behind that knowledge base." },
      { id: "C", text: "Return a different JSON shape from each app's private copy of the query." },
      { id: "D", text: "Embed the OpenSearch query DSL in the mobile binary." }
    ],
    correct: ["B"],
    why: "Retrieve is a stable question-and-chunks operation. Applications stop depending on OpenSearch query JSON, so a later vector-store change stays behind the knowledge base.",
    optionExplanations: [
      { id: "A", correct: false, incorrect: true, text: "Admin passwords and raw index queries couple every app to today's OpenSearch mapping." },
      { id: "B", correct: true, incorrect: false, text: "Retrieve hides the vector store behind one operation that accepts a question and returns chunks." },
      { id: "C", correct: false, incorrect: true, text: "A private JSON shape per app is the opposite of one stable contract." },
      { id: "D", correct: false, incorrect: true, text: "Query DSL in a mobile binary breaks when the index changes and cannot be patched quickly." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/kb-test-retrieve.html"
  },
  {
    id: "o-1-5-6-02",
    task: "1.5",
    skill: "1.5.6",
    domain: 1,
    difficulty: 2,
    milestone: "M7",
    chapters: ["09"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 1","DRAFT"],
    stem: "Lumen City's agent must call retrieval as a tool with a fixed input, the question plus a borough filter, and a fixed output of chunks and citations. The embedding model will change next quarter. The agent contract must not change when the index mapping does. Auditors want to see which tool call ran. How should retrieval be exposed?",
    choices: [
      { id: "A", text: "Let the agent invent a new OpenSearch query dialect on every turn." },
      { id: "B", text: "Pass the k-NN mapping to the resident and ask them to write the query." },
      { id: "C", text: "Register retrieval as a Converse tool with that stable schema, and keep the index and embedding details inside the tool implementation." },
      { id: "D", text: "Hardcode today's index name in the system prompt as the only interface." }
    ],
    correct: ["C"],
    why: "The Converse API supports tool use with a schema you define. The agent keeps calling that retrieval tool when the embedding model or index mapping changes behind it, and the tool call is what audit sees.",
    optionExplanations: [
      { id: "A", correct: false, incorrect: true, text: "A new query dialect every turn is not a stable contract and is hard to audit." },
      { id: "B", correct: false, incorrect: true, text: "Residents should not write k-NN mappings, and that leaks the index into the client." },
      { id: "C", correct: true, incorrect: false, text: "A Converse tool with a fixed request and response schema isolates the agent from the next quarter's index change." },
      { id: "D", correct: false, incorrect: true, text: "An index name in the system prompt breaks as soon as the mapping changes." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/conversation-inference.html"
  },
  {
    id: "o-1-5-6-03",
    task: "1.5",
    skill: "1.5.6",
    domain: 1,
    difficulty: 2,
    milestone: "M7",
    chapters: ["09"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 1","DRAFT"],
    stem: "Cedar Bank's batch jobs depend on retrieval fields that an internal build keeps renaming, so a chunk text field and a score field change names after each index edit. Broken jobs are costly, and callers in the VPC need a contract that stays valid for a quarter while they migrate. Which interface should they standardize on?",
    choices: [
      { id: "A", text: "Rename response fields whenever the index mapping changes and force every caller to redeploy the same day." },
      { id: "B", text: "Return the raw OpenSearch hit, including cluster internals, to every batch job." },
      { id: "C", text: "Remove citations so the schema has fewer fields that can break." },
      { id: "D", text: "Have callers depend on the knowledge base Retrieve response, and keep any legacy field names inside one adapter that calls Retrieve, until the quarter ends." }
    ],
    correct: ["D"],
    why: "Retrieve already defines the chunk payload callers should bind to. One adapter can keep old field names alive for the quarter without letting each index rename fan out to every batch job.",
    optionExplanations: [
      { id: "A", correct: false, incorrect: true, text: "Same-day redeploys on every rename are the outage pattern the bank is paying for." },
      { id: "B", correct: false, incorrect: true, text: "Raw OpenSearch hits leak cluster internals and change when the mapping changes." },
      { id: "C", correct: false, incorrect: true, text: "Dropping citations removes a field the jobs need and does not stop other renames." },
      { id: "D", correct: true, incorrect: false, text: "Retrieve is the stable payload, and a single adapter absorbs legacy names while callers migrate." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/kb-test-retrieve.html"
  }
]);
