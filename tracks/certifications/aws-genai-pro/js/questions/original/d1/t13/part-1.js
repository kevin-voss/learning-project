window.AIP = window.AIP || {};
AIP.registerQuestions([
  {
    id: "o-1-3-1-01",
    task: "1.3",
    skill: "1.3.1",
    domain: 1,
    difficulty: 1,
    milestone: "M2",
    chapters: ["06"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 1","DRAFT"],
    stem: "Fieldnote Logistics is about to fine-tune on shipment-exception notes that live in the AWS Glue Data Catalog. Some rows have an empty instruction, a missing completion, or a language code outside the allowed set. Those rows must be stopped before the customization job starts, with the least operational overhead. Which check should gate the job?",
    choices: [
      { id: "A", text: "Add AWS Glue Data Quality rules for the required fields and allowed language codes, and block the job when the quality score fails." },
      { id: "B", text: "Ask warehouse leads to read every note the night before each job." },
      { id: "C", text: "Start the customization job and delete the custom model later if the prose looks odd." },
      { id: "D", text: "Turn on S3 versioning and treat every object version as valid training data." }
    ],
    correct: ["A"],
    why: "AWS Glue Data Quality evaluates rules on catalog data and produces a score, so empty instructions and illegal language codes fail before a fine-tuning job spends money on bad rows.",
    optionExplanations: [
      { id: "A", correct: true, incorrect: false, text: "Glue Data Quality rules on required fields and allowed values can block the dataset before customization starts." },
      { id: "B", correct: false, incorrect: true, text: "A manual read of every note does not scale and is more operational work than a rules check." },
      { id: "C", correct: false, incorrect: true, text: "Starting the job and hoping the prose looks fine lets invalid rows into training." },
      { id: "D", correct: false, incorrect: true, text: "S3 versioning keeps object history and does not validate instruction, completion, or language code." }
    ],
    evidence: "https://docs.aws.amazon.com/glue/latest/dg/glue-data-quality.html"
  },
  {
    id: "o-1-3-1-02",
    task: "1.3",
    skill: "1.3.1",
    domain: 1,
    difficulty: 2,
    milestone: "M3",
    chapters: ["06"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 1","DRAFT"],
    stem: "Pico Retail's vendor catalog text is embedded every night. Last week a partner upload filled the description column with blanks, and those blanks were still indexed. The team wants the bad rows quarantined in the pipeline, a data quality score they can alarm on, and rules a reviewer can read. Cost of another silent bad index is the constraint. Which control belongs in the pipeline?",
    choices: [
      { id: "A", text: "Embed the blank descriptions and add a longer system message that tells the model to ignore them." },
      { id: "B", text: "Run AWS Glue Data Quality rules in the ETL job, quarantine records that fail, and publish the quality score so a drop can alarm before embeddings are built." },
      { id: "C", text: "Copy the table into a spreadsheet and color the empty cells by hand." },
      { id: "D", text: "Increase the embedding dimension so a blank string still yields a unique vector." }
    ],
    correct: ["B"],
    why: "Glue Data Quality can evaluate rules in an ETL pipeline, identify the failing records, and emit a score. Quarantine plus an alarm stops blank descriptions from being embedded.",
    optionExplanations: [
      { id: "A", correct: false, incorrect: true, text: "A system message does not remove blank vectors that were already written to the index." },
      { id: "B", correct: true, incorrect: false, text: "Pipeline rules, quarantine of failing rows, and a quality score stop blank descriptions before the nightly embedding job." },
      { id: "C", correct: false, incorrect: true, text: "A spreadsheet review is not an auditable rule in the embedding pipeline." },
      { id: "D", correct: false, incorrect: true, text: "A larger embedding dimension does not make an empty description valid training or index text." }
    ],
    evidence: "https://docs.aws.amazon.com/glue/latest/dg/glue-data-quality.html"
  },
  {
    id: "o-1-3-2-01",
    task: "1.3",
    skill: "1.3.2",
    domain: 1,
    difficulty: 1,
    milestone: "M3",
    chapters: ["06"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 1","DRAFT"],
    stem: "Aster Schools receives scanned enrollment packets, photos of identity cards, and short parent voice memos for the same student. Staff need one structured record before the assistant drafts a checklist. They will not operate a separate open-source model for each modality. Which approach handles the mixed inputs with the least operational overhead?",
    choices: [
      { id: "A", text: "Ask parents to retype every packet and discard the voice memos." },
      { id: "B", text: "Base64-encode each file into a DynamoDB string and expect the chat model to decode the bytes." },
      { id: "C", text: "Run the documents, images, and audio through Amazon Bedrock Data Automation, then pass the structured output to the assistant." },
      { id: "D", text: "Print the packets and photograph them again so the files become easier to store." }
    ],
    correct: ["C"],
    why: "Amazon Bedrock Data Automation turns documents, images, and audio into structured outputs through one managed interface, which is the low-overhead path for these mixed enrollment files.",
    optionExplanations: [
      { id: "A", correct: false, incorrect: true, text: "Retyping packets drops the voice memos and pushes the work back onto parents and staff." },
      { id: "B", correct: false, incorrect: true, text: "Storing raw base64 in DynamoDB does not parse a photo or a voice memo into fields the assistant can trust." },
      { id: "C", correct: true, incorrect: false, text: "Bedrock Data Automation extracts structured content from documents, images, and audio without a separate model fleet." },
      { id: "D", correct: false, incorrect: true, text: "Photographing a printout adds another image and does not structure the packet or the audio." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/bda.html"
  },
  {
    id: "o-1-3-2-02",
    task: "1.3",
    skill: "1.3.2",
    domain: 1,
    difficulty: 2,
    milestone: "M3",
    chapters: ["06"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 1","DRAFT"],
    stem: "Nimbus Support keeps chat screenshots and call recordings in S3, plus a CSV of account tiers. Agents ask what the screenshot showed and whether that account's tier allows a credit. Other customers' tiers must not be pasted into the prompt. Latency of a few seconds is acceptable if the team does not run a custom vision stack. Which pipeline should feed the assistant?",
    choices: [
      { id: "A", text: "Train a custom image network this week and skip the recordings because audio cannot be prepared for retrieval." },
      { id: "B", text: "Paste the entire tier CSV into the system prompt for every agent session." },
      { id: "C", text: "Index the recordings as keyword files with no transcript and no embeddings." },
      { id: "D", text: "Build a knowledge base for the multimodal S3 content, and attach the account tier as filterable metadata for the account being served." }
    ],
    correct: ["D"],
    why: "Multimodal files in S3 can feed a Bedrock knowledge base, and the tier belongs in metadata so retrieval is limited to the account being served instead of a prompt full of other customers.",
    optionExplanations: [
      { id: "A", correct: false, incorrect: true, text: "A custom vision model this week is high overhead, and dropping audio ignores half of the case file." },
      { id: "B", correct: false, incorrect: true, text: "Putting every account tier in the system prompt exposes other customers and grows the prompt on every call." },
      { id: "C", correct: false, incorrect: true, text: "Untranscribed audio stored as keywords will not answer what was said on the call." },
      { id: "D", correct: true, incorrect: false, text: "A multimodal knowledge base on S3 covers the screenshots and recordings, and tier metadata filters the account without leaking the whole CSV." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/kb-multimodal.html"
  },
  {
    id: "o-1-3-3-01",
    task: "1.3",
    skill: "1.3.3",
    domain: 1,
    difficulty: 1,
    milestone: "M3",
    chapters: ["06"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 1","DRAFT"],
    stem: "Northwind Clinic's nurse app sends one concatenated string to InvokeModel, and the JSON body is different for each provider. The next release must carry system instructions, chat turns, and a later tool call in one request shape. Switching the model ID should not require a new body. Which input format meets that with the least operational overhead?",
    choices: [
      { id: "A", text: "Call the Converse API with a system prompt and a messages array of roles and content, and pass model-specific fields only in the additional model request parameters." },
      { id: "B", text: "Keep a provider-specific InvokeModel body in the app and add another body for every new model." },
      { id: "C", text: "Send the chart as a presigned S3 URL and expect every model to fetch the object itself." },
      { id: "D", text: "Store the conversation in DynamoDB and pass only the item key, with no message content, to the model." }
    ],
    correct: ["A"],
    why: "The Converse API takes system instructions and a messages array in one shape for supported Bedrock models, including tool use, so the clinic stops maintaining a body per provider.",
    optionExplanations: [
      { id: "A", correct: true, incorrect: false, text: "Converse standardizes system, messages, and tool configuration, with model-specific parameters kept in a side field." },
      { id: "B", correct: false, incorrect: true, text: "A new InvokeModel body per provider is the churn the clinic is trying to leave behind." },
      { id: "C", correct: false, incorrect: true, text: "A presigned URL is not a conversation payload, and models do not fetch arbitrary S3 objects as their input format." },
      { id: "D", correct: false, incorrect: true, text: "A DynamoDB key without message content gives the model nothing to read." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/conversation-inference.html"
  },
  {
    id: "o-1-3-3-02",
    task: "1.3",
    skill: "1.3.3",
    domain: 1,
    difficulty: 2,
    milestone: "M3",
    chapters: ["06"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 1","DRAFT"],
    stem: "Harbor Claims hosts a fine-tuned summarizer as a SageMaker real-time endpoint. The container accepts a JSON document with a list of text inputs and a parameters object. Callers are posting the raw claim PDF, validation errors are climbing, and failed invokes still occupy GPU time. Cost of those failed seconds is the constraint. How should callers format the request?",
    choices: [
      { id: "A", text: "Base64-encode the PDF into the temperature field." },
      { id: "B", text: "Match the container's inference request schema, send JSON inputs and parameters, and reject a body that is not that schema before the endpoint is invoked." },
      { id: "C", text: "Turn off request checks so the container can guess which bytes are the claim text." },
      { id: "D", text: "Point the endpoint at a text-embedding container and read the vector as the summary." }
    ],
    correct: ["B"],
    why: "SageMaker hosting invokes the container with the inference code's request contract. Sending that JSON, and refusing anything else before invoke, stops PDF bodies from consuming GPU time.",
    optionExplanations: [
      { id: "A", correct: false, incorrect: true, text: "Temperature is a generation parameter, not a place to hide a PDF." },
      { id: "B", correct: true, incorrect: false, text: "The caller must send the container's JSON inputs and parameters, and a bad body should be rejected before the paid invoke." },
      { id: "C", correct: false, incorrect: true, text: "Disabling checks sends malformed bodies to the GPU and increases the failed-invoke cost." },
      { id: "D", correct: false, incorrect: true, text: "An embedding endpoint returns vectors, not a claim summary, and does not fix the request schema." }
    ],
    evidence: "https://docs.aws.amazon.com/sagemaker/latest/dg/your-algorithms-inference-code.html"
  },
  {
    id: "o-1-3-4-01",
    task: "1.3",
    skill: "1.3.4",
    domain: 1,
    difficulty: 1,
    milestone: "M3",
    chapters: ["06"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 1","DRAFT"],
    stem: "Lumen City indexes HTML pages from the public site into a knowledge base. Retrieved chunks often contain the navigation bar and the email footer, so answers quote the footer instead of the ordinance sentence. The city wants cleaner indexed text with the least operational overhead, before anyone discusses fine-tuning. What should change?",
    choices: [
      { id: "A", text: "Fine-tune the foundation model on raw HTML so it becomes familiar with footers." },
      { id: "B", text: "Raise the temperature until the model is creative enough to skip the footer." },
      { id: "C", text: "Add a custom transformation Lambda on the data source to strip navigation, footers, and markup before the text is chunked and embedded." },
      { id: "D", text: "Repeat the dirty HTML ten times in the prompt so the ordinance line is louder." }
    ],
    correct: ["C"],
    why: "A knowledge base custom transformation Lambda can clean documents during ingestion, so navigation and footers never become chunks. That improves input quality without a fine-tune.",
    optionExplanations: [
      { id: "A", correct: false, incorrect: true, text: "Fine-tuning on raw HTML teaches the noise and costs more than cleaning the text at ingestion." },
      { id: "B", correct: false, incorrect: true, text: "Temperature does not remove footer text that was already retrieved." },
      { id: "C", correct: true, incorrect: false, text: "The transformation Lambda runs in the ingestion path and can drop boilerplate before chunking and embedding." },
      { id: "D", correct: false, incorrect: true, text: "Repeating dirty HTML raises token cost and still leaves the footer in context." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/kb-custom-transformation.html"
  },
  {
    id: "o-1-3-4-02",
    task: "1.3",
    skill: "1.3.4",
    domain: 1,
    difficulty: 2,
    milestone: "M3",
    chapters: ["06"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 1","DRAFT"],
    stem: "Cedar Bank statement PDFs arrive from OCR with broken tokens and a disclaimer paragraph copied onto every page. Retrieval ranks the disclaimer above the fee table. Auditors want the cleanup step to be a versioned function in the ingestion configuration, not an untracked edit. Which change improves the indexed input?",
    choices: [
      { id: "A", text: "Leave the index unchanged and add a system line that says to ignore messy text." },
      { id: "B", text: "Delete the fee table so the disclaimer is the only remaining match." },
      { id: "C", text: "Retrieve 100 chunks so the fee table is statistically somewhere in the prompt." },
      { id: "D", text: "Configure a versioned custom transformation Lambda to repair OCR noise and drop the repeated disclaimer before chunking, and record that function in the data source ingestion configuration." }
    ],
    correct: ["D"],
    why: "The ingestion Lambda is the versioned place to fix OCR and drop repeated boilerplate before embeddings are stored. A prompt apology does not repair the index the auditor is asking about.",
    optionExplanations: [
      { id: "A", correct: false, incorrect: true, text: "A system line does not change chunks that already rank the disclaimer first, and it is not a versioned ingestion step." },
      { id: "B", correct: false, incorrect: true, text: "Deleting the fee table removes the content customers are asking about." },
      { id: "C", correct: false, incorrect: true, text: "Retrieving more dirty chunks raises cost and still feeds the disclaimer to the model." },
      { id: "D", correct: true, incorrect: false, text: "A versioned transformation Lambda in the ingestion configuration cleans OCR text and removes the disclaimer before embedding." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/kb-custom-transformation.html"
  }
]);
