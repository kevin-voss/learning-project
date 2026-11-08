window.AIP = window.AIP || {};
AIP.registerQuestions([
  {
    id: "o-5-2-1-01",
    task: "5.2",
    skill: "5.2.1",
    domain: 5,
    difficulty: 1,
    milestone: "M7",
    chapters: ["24"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 5", "DRAFT"],
    stem: "Fieldnote Logistics dispatchers keep a long chat open, and the assistant also retrieves many manual chunks. On the long calls, Cohere Command is configured with truncate set to START. The hazmat instruction at the beginning of the prompt disappears, the end of the chat is still present, and input token counts sit at the model's maximum. They already run the largest model their policy allows. How should they fix this context-window overflow?",
    choices: [
      { id: "A", text: "Leave truncate on START so the newest tokens are kept, and add more manual chunks." },
      { id: "B", text: "Shorten older turns and retrieve fewer chunks so the instruction and the relevant passage both fit, and stop discarding the start of an over-long input." },
      { id: "C", text: "Raise max_tokens so the generated reply can be longer." },
      { id: "D", text: "Change the embedding dimension and leave the prompt size and truncate setting as they are." }
    ],
    correct: ["B"],
    why: "For Cohere Command, truncate START discards the start of an input that exceeds the maximum token length, which is why the opening instruction vanishes. max_tokens limits the generated response, so the fix is a shorter input that keeps the instruction.",
    optionExplanations: [
      { id: "A", correct: false, text: "START truncation is what drops the hazmat instruction, and more chunks make the overflow worse." },
      { id: "B", correct: true, text: "A shorter history and fewer chunks let the instruction and the passage fit without discarding the start of the input." },
      { id: "C", correct: false, text: "max_tokens caps the generated response and does not make room for an input that is already over the token length." },
      { id: "D", correct: false, text: "Embedding size does not change the token length of the prompt that is being truncated." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/model-parameters-cohere-command.html"
  },
  {
    id: "o-5-2-2-01",
    task: "5.2",
    skill: "5.2.2",
    domain: 5,
    difficulty: 1,
    milestone: "M7",
    chapters: ["24"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 5", "DRAFT"],
    stem: "Pico Retail's checkout helper returns HTTP 400 ValidationException on every Converse call during a production incident. The Lambda still sends a single prompt string in an InvokeModel-style body, and the messages field is missing. Retries return the same 400. Nothing is throttled, and the prompt text itself was approved. What should they change?",
    choices: [
      { id: "A", text: "Increase the Lambda timeout and retry the same body." },
      { id: "B", text: "Buy provisioned throughput for the model." },
      { id: "C", text: "Rebuild the request so it matches the Converse shape, including the messages field, and stop retrying the validation failure." },
      { id: "D", text: "Catch the 400 and return a canned line that says all sales are final." }
    ],
    correct: ["C"],
    why: "ValidationException means the input failed Bedrock's constraints, including required fields and format. Retrying, extra capacity, and a canned reply leave the malformed Converse body in place.",
    optionExplanations: [
      { id: "A", correct: false, text: "A longer timeout retries the same invalid body and gets the same 400." },
      { id: "B", correct: false, text: "Provisioned throughput adds quota, and this call is failing validation rather than throttling." },
      { id: "C", correct: true, text: "The Converse request has to satisfy the API shape, so the messages field has to be corrected and the 400 should not be retried as a transient error." },
      { id: "D", correct: false, text: "A canned sales line hides the integration error and can misstate the shopper's return rights." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/troubleshooting-api-error-codes.html"
  },
  {
    id: "o-5-2-2-02",
    task: "5.2",
    skill: "5.2.2",
    domain: 5,
    difficulty: 2,
    milestone: "M7",
    chapters: ["24"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 5", "DRAFT"],
    stem: "Aster Schools' attendance assistant works overnight. A production incident starts at the morning bell, when Converse returns ThrottlingException, HTTP 429. A retry loop in the Lambda resends immediately, and the error rate climbs. Lambda memory and the prompt text did not change. The account is over its Bedrock quota for that burst. How should they fix the API errors?",
    choices: [
      { id: "A", text: "Use exponential backoff with jitter, and add provisioned throughput if the morning burst still exceeds the on-demand quota." },
      { id: "B", text: "Raise Lambda memory to 10240 MB and keep the tight retry loop." },
      { id: "C", text: "Treat the 429 as a weak prompt and rewrite the attendance instructions." },
      { id: "D", text: "Turn retries off and drop the student questions with no backoff and no queue." }
    ],
    correct: ["A"],
    why: "Converse returns ThrottlingException with HTTP 429 when the call exceeds Amazon Bedrock account quotas. Backoff slows the burst, and provisioned throughput is the capacity increase when the quota itself is too small.",
    optionExplanations: [
      { id: "A", correct: true, text: "Backoff with jitter stops the tight loop from amplifying a 429, and provisioned throughput raises capacity when the morning quota is still too small." },
      { id: "B", correct: false, text: "Lambda memory does not raise the Bedrock quota that the 429 is reporting." },
      { id: "C", correct: false, text: "The prompt did not change, and a 429 is a quota error rather than a wording defect." },
      { id: "D", correct: false, text: "Dropping questions avoids the retry storm by discarding the attendance requests." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_Converse.html"
  },
  {
    id: "o-5-2-3-01",
    task: "5.2",
    skill: "5.2.3",
    domain: 5,
    difficulty: 1,
    milestone: "M7",
    chapters: ["24"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 5", "DRAFT"],
    stem: "Nimbus Support's production prompt is only the words Help the customer, followed by whatever the retriever returned. Agents report vague replies that skip the required ticket fields and sometimes add a refund rule that was not in the article. A production incident was traced to that prompt. The model quota is healthy. How should they fix the prompt?",
    choices: [
      { id: "A", text: "Fine-tune a new model on one vague reply." },
      { id: "B", text: "Double the number of retrieved chunks and leave the one-line prompt unchanged." },
      { id: "C", text: "Remove the article from the prompt so the model can improvise a refund rule." },
      { id: "D", text: "Rewrite the managed prompt with a role, an instruction to use only the retrieved article, and the exact ticket fields, then test it and save a version." }
    ],
    correct: ["D"],
    why: "Prompt management is where you change the template, test it, and create a version snapshot for production. The missing role, grounding instruction, and ticket fields are the weakness the incident traced.",
    optionExplanations: [
      { id: "A", correct: false, text: "One vague reply is not a prompt fix, and fine-tuning does not add the ticket fields to this template." },
      { id: "B", correct: false, text: "More chunks leave the one-line instruction in place, so the model can still skip the ticket fields." },
      { id: "C", correct: false, text: "Removing the article takes away the only source the reply was supposed to follow." },
      { id: "D", correct: true, text: "The revised prompt states the role, the article boundary, and the ticket fields, and a tested version is what production should call." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-management-test.html"
  },
  {
    id: "o-5-2-3-02",
    task: "5.2",
    skill: "5.2.3",
    domain: 5,
    difficulty: 2,
    milestone: "M7",
    chapters: ["24"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 5", "DRAFT"],
    stem: "Northwind Clinic's retrieval check shows the dosing table is present in the passages sent to the model, and context relevance is high. The summary still adds a dose that does not appear in that table. Faithfulness is the metric that failed. A vendor suggested a larger embedding model. The prompt currently says write a helpful summary and does not mention the table. What should they change?",
    choices: [
      { id: "A", text: "Replace the embedding model with a larger one and keep the helpful-summary prompt." },
      { id: "B", text: "Rewrite the prompt so a dose may be stated only when it appears in the retrieved table, tell the model to say the chart does not include the fact otherwise, and re-score faithfulness." },
      { id: "C", text: "Increase the chunk count with other patients' charts." },
      { id: "D", text: "Raise temperature so the wording varies around the invented dose." }
    ],
    correct: ["B"],
    why: "Faithfulness checks whether the response contains information that is not in the prompt. The table is already in the prompt, so the weak instruction is what lets the extra dose through.",
    optionExplanations: [
      { id: "A", correct: false, text: "The right table is already retrieved, so a larger embedding model does not remove a dose the prompt allowed." },
      { id: "B", correct: true, text: "The prompt boundary limits the summary to the table, and a new faithfulness score checks that extra doses are gone." },
      { id: "C", correct: false, text: "Other patients' charts add context the summary could misuse, and the current table is already in the prompt." },
      { id: "D", correct: false, text: "A higher temperature increases variation and does not tie the dose to the table." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation-metrics.html"
  },
  {
    id: "o-5-2-4-01",
    task: "5.2",
    skill: "5.2.4",
    domain: 5,
    difficulty: 1,
    milestone: "M7",
    chapters: ["24"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 5", "DRAFT"],
    stem: "Harbor Claims retrieves from an OpenSearch Serverless vector store with semantic search only. Questions that use the acronym PIP return neighboring benefits, and the assistant then explains the wrong program. The right page is in the index and contains the letters PIP. A production incident was opened after three letters cited the wrong benefit. The first proposal is to raise the semantic result count from 5 to 50. What should they do instead?",
    choices: [
      { id: "A", text: "Raise the semantic result count from 5 to 50 and leave the search type semantic-only." },
      { id: "B", text: "Delete the acronym from the source documents so the query has fewer tokens." },
      { id: "C", text: "Override the search type to HYBRID so the query uses both the vector embedding and the raw text, then retest the PIP questions." },
      { id: "D", text: "Fine-tune the foundation model on the three bad letters." }
    ],
    correct: ["C"],
    why: "Hybrid search queries both the vector embeddings and the raw text, which is how an exact acronym in the index can be found. A longer semantic list still does not require the token PIP to match.",
    optionExplanations: [
      { id: "A", correct: false, text: "More semantic neighbors still miss an exact acronym that vector similarity ranks below other benefits." },
      { id: "B", correct: false, text: "Deleting PIP removes the token the letters need to find." },
      { id: "C", correct: true, text: "HYBRID adds a raw-text match beside the embedding search, which is the right retrieval change for an acronym that is already in the index." },
      { id: "D", correct: false, text: "Fine-tuning on three bad letters does not fix a semantic-only query against a page that already contains PIP." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/kb-test-config.html"
  },
  {
    id: "o-5-2-4-02",
    task: "5.2",
    skill: "5.2.4",
    domain: 5,
    difficulty: 2,
    milestone: "M7",
    chapters: ["24"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 5", "DRAFT"],
    stem: "Lumen City uploaded a revised ordinance this morning. Residents still receive last year's inspection interval, and the citations point at the old object. The knowledge base data source was not synced after the upload. The embedding model and the prompt version are unchanged. This production incident is a retrieval failure on new content. What is the fix?",
    choices: [
      { id: "A", text: "Start a data source sync and wait until the revised ordinance is re-indexed before expecting the new interval in answers." },
      { id: "B", text: "Change the foundation model so it remembers the upload without a sync." },
      { id: "C", text: "Turn retrieval off and let the model answer the interval from memory." },
      { id: "D", text: "Increase temperature until the new year appears in the sentence." }
    ],
    correct: ["A"],
    why: "Knowledge base sync is what re-indexes added or modified files, and new embeddings can take a few minutes to show up in query results. The prompt and the embedding model were not the change.",
    optionExplanations: [
      { id: "A", correct: true, text: "A sync re-ingests the modified ordinance so the new interval can be retrieved and cited." },
      { id: "B", correct: false, text: "A different foundation model does not index a file that was never synced." },
      { id: "C", correct: false, text: "Turning retrieval off is what lets the model invent an interval instead of citing the ordinance." },
      { id: "D", correct: false, text: "Temperature does not ingest the file or update the citation target." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/kb-data-source-sync-ingest.html"
  },
  {
    id: "o-5-2-4-03",
    task: "5.2",
    skill: "5.2.4",
    domain: 5,
    difficulty: 2,
    milestone: "M7",
    chapters: ["24"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 5", "DRAFT"],
    stem: "Cedar Bank's fee schedule is a table in a synced document. Retrieval returns a chunk with a fee from one row and a condition from another, and the assistant quotes that mismatched pair. Semantic search does find the document. The chunking strategy is fixed-size and it splits the table. The mismatch showed up as a production incident on commercial loan fees. How should they fix retrieval?",
    choices: [
      { id: "A", text: "Switch to a larger foundation model and keep the same chunks." },
      { id: "B", text: "Store the PDF as one image and stop indexing the table text." },
      { id: "C", text: "Remove the fee column from the source so the mismatch cannot be quoted." },
      { id: "D", text: "Re-chunk so a row's fee stays with its condition, using hierarchical chunking or a boundary that keeps the table's surrounding context, then re-sync and retest those fee questions." }
    ],
    correct: ["D"],
    why: "Hierarchical chunking retrieves a child match and replaces it with the broader parent, and parsed tables can return that wider context instead of an isolated fragment. A larger model still sees the split rows.",
    optionExplanations: [
      { id: "A", correct: false, text: "A larger model still receives the mismatched fee and condition if those are the chunks returned." },
      { id: "B", correct: false, text: "Dropping the table text removes the fee schedule from retrieval." },
      { id: "C", correct: false, text: "Deleting the fee column destroys the fact the assistant is supposed to quote." },
      { id: "D", correct: true, text: "Chunking that keeps the row with its parent context stops the retrieval from pairing a fee with the wrong condition, and a re-sync plus a retest checks the fee questions." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/kb-chunking.html"
  },
  {
    id: "o-5-2-5-01",
    task: "5.2",
    skill: "5.2.5",
    domain: 5,
    difficulty: 1,
    milestone: "M7",
    chapters: ["24"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 5", "DRAFT"],
    stem: "Fieldnote Logistics had a production incident at 14:10, when the dispatcher assistant stopped requiring a yard citation. Model invocation logs show the model id moved from prompt version 4 to prompt version 5 at 14:09, and version 5 was saved without the citation rule. Quality was stable on version 4 all morning. Quota, temperature, and the knowledge base did not change. How should they fix this prompt drift?",
    choices: [
      { id: "A", text: "Raise temperature so the model feels pressure to cite sources." },
      { id: "B", text: "Point production back at prompt version 4 and confirm new invocation logs show that version." },
      { id: "C", text: "Treat the change as ordinary non-determinism and take no action." },
      { id: "D", text: "Rebuild the OpenSearch index." }
    ],
    correct: ["B"],
    why: "Invocation logging records the model call, so the version change at 14:09 is visible in the request metadata. Restoring version 4 returns the citation rule that was still in effect that morning.",
    optionExplanations: [
      { id: "A", correct: false, text: "Temperature was not the change recorded at 14:09, and it does not put the citation rule back into version 5." },
      { id: "B", correct: true, text: "Production returns to the logged version that still had the citation rule, and fresh invocation logs confirm the rollback." },
      { id: "C", correct: false, text: "The logs show a prompt version change at the same minute, which is drift rather than sampling noise." },
      { id: "D", correct: false, text: "The knowledge base did not change, so a reindex does not restore the citation instruction." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/model-invocation-logging.html"
  },
  {
    id: "o-5-2-5-02",
    task: "5.2",
    skill: "5.2.5",
    domain: 5,
    difficulty: 2,
    milestone: "M7",
    chapters: ["24"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 5", "DRAFT"],
    stem: "Pico Retail's shopping assistant changes tone during the day without a deployment. Developers edit the prompt draft in the console, and the application invokes that draft. Yesterday's production incident introduced a return-window sentence that nobody had approved. They need the live prompt to stop moving under them. What should they change?",
    choices: [
      { id: "A", text: "Keep invoking the draft and ask developers to edit more carefully." },
      { id: "B", text: "Copy the prompt into a Lambda environment variable on every keystroke." },
      { id: "C", text: "Create a prompt version from the approved draft and change the application so it invokes only that version ARN." },
      { id: "D", text: "Turn off invocation logging so draft edits are harder to see." }
    ],
    correct: ["C"],
    why: "Creating a version snapshots the draft, and production inference uses that version ARN rather than the draft that continues to change. Keystroke copies and hidden logs leave the draft on the live path.",
    optionExplanations: [
      { id: "A", correct: false, text: "The draft is what changed under production yesterday, so invoking it again leaves the same drift in place." },
      { id: "B", correct: false, text: "Copying every keystroke into an environment variable publishes unapproved edits even faster." },
      { id: "C", correct: true, text: "A version is a snapshot, and the application can invoke that version ARN while later draft edits stay off the live path." },
      { id: "D", correct: false, text: "Disabling logs hides the next unapproved sentence and does not pin the prompt." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-management-test.html"
  },
  {
    id: "o-5-2-5-03",
    task: "5.2",
    skill: "5.2.5",
    domain: 5,
    difficulty: 2,
    milestone: "M7",
    chapters: ["24"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 5", "DRAFT"],
    stem: "Aster Schools pins the newest prompt version by listing versions and taking the highest number after every pipeline run. Prompt versions are created incrementally. A side experiment created version 12, which dropped the instruction to refuse when the student handbook does not contain the answer. Production followed version 12 within minutes and invented a detention rule. Version 11 had passed the regression gate. How should they stop this prompt drift?",
    choices: [
      { id: "A", text: "Change the release so production invokes the explicit version ARN that passed the gate, and stop promoting whatever version number is highest." },
      { id: "B", text: "Keep selecting the highest version and delete the regression gate." },
      { id: "C", text: "Point production at the draft so experiments are easier to see." },
      { id: "D", text: "Add a second model at runtime to outvote version 12." }
    ],
    correct: ["A"],
    why: "Versions are numbered from 1 upward, so the highest number is only the latest snapshot, including an experiment. Production has to call the specific version ARN that passed the gate.",
    optionExplanations: [
      { id: "A", correct: true, text: "An explicit version ARN keeps production on version 11 until a later version is the one the gate approved." },
      { id: "B", correct: false, text: "Selecting the highest number is how version 12 reached students, and removing the gate drops the check that passed version 11." },
      { id: "C", correct: false, text: "The draft moves whenever someone edits it, which is a wider form of the same drift." },
      { id: "D", correct: false, text: "A second model does not stop the application from sending version 12's prompt." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-management-version-create.html"
  }
]);
