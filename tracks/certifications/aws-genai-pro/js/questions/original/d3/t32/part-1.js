window.AIP = window.AIP || {};
AIP.registerQuestions([
  {
    id: "o-3-2-1-01",
    task: "3.2",
    skill: "3.2.1",
    domain: 3,
    difficulty: 1,
    milestone: "M3",
    chapters: ["16"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 3", "DRAFT"],
    stem: "Cedar Bank runs the fraud assistant in a private subnet with no internet gateway and no NAT. Converse calls to the public Bedrock DNS name time out. An S3 gateway endpoint is already in the route table. The bank policy forbids a public path for model calls. What should they add?",
    choices: [
      { id: "A", text: "A second S3 gateway endpoint in another route table." },
      { id: "B", text: "An interface VPC endpoint for bedrock-runtime, with private DNS enabled, so the subnet reaches Converse without a public IP path." },
      { id: "C", text: "A NAT gateway so the private subnet can use the public Bedrock endpoint." },
      { id: "D", text: "A bucket policy that allows s3:GetObject from 0.0.0.0/0." }
    ],
    correct: ["B"],
    why: "Invoke and Converse use the bedrock-runtime endpoint service. An S3 gateway endpoint does not carry that API, and a NAT path is the public route the policy forbids.",
    optionExplanations: [
      { id: "A", correct: false, text: "Another S3 endpoint still only reaches Amazon S3." },
      { id: "B", correct: true, text: "The bedrock-runtime interface endpoint is the private path for runtime inference, and private DNS lets the SDK keep the normal regional hostname." },
      { id: "C", correct: false, text: "A NAT device sends the call out through the public service endpoint, which this network rule does not allow." },
      { id: "D", correct: false, text: "A public bucket policy does not create a path to Bedrock and opens S3." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/vpc-interface-endpoints.html"
  },
  {
    id: "o-3-2-1-02",
    task: "3.2",
    skill: "3.2.1",
    domain: 3,
    difficulty: 2,
    milestone: "M3",
    chapters: ["16"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 3", "DRAFT"],
    stem: "Fieldnote Logistics can call InvokeModel from a private subnet through a bedrock-runtime interface endpoint. RetrieveAndGenerate against the shipping knowledge base times out from that same subnet. Security groups already allow HTTPS to the runtime endpoint. No other Bedrock endpoint exists. What is missing?",
    choices: [
      { id: "A", text: "A larger NAT gateway, because knowledge base queries cannot use PrivateLink." },
      { id: "B", text: "An interface endpoint for Amazon Macie, which hosts RetrieveAndGenerate." },
      { id: "C", text: "An interface endpoint for bedrock-agent-runtime, which is the endpoint service for agent runtime calls such as RetrieveAndGenerate." },
      { id: "D", text: "A gateway endpoint for DynamoDB, because knowledge bases store vectors there by default." }
    ],
    correct: ["C"],
    why: "Runtime inference and agent runtime are different endpoint services. RetrieveAndGenerate is an agent-runtime API, so the bedrock-runtime endpoint does not carry it.",
    optionExplanations: [
      { id: "A", correct: false, text: "PrivateLink does support the agent runtime endpoint, and a NAT would put the call on the public path." },
      { id: "B", correct: false, text: "Macie discovers sensitive data in S3 and does not host RetrieveAndGenerate." },
      { id: "C", correct: true, text: "The bedrock-agent-runtime interface endpoint is the private path for RetrieveAndGenerate." },
      { id: "D", correct: false, text: "A DynamoDB endpoint does not accept Bedrock agent runtime calls." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/vpc-interface-endpoints.html"
  },
  {
    id: "o-3-2-1-03",
    task: "3.2",
    skill: "3.2.1",
    domain: 3,
    difficulty: 2,
    milestone: "M3",
    chapters: ["16"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 3", "DRAFT"],
    stem: "Pico Retail shipped a long-lived access key inside the storefront JavaScript. The browser calls Bedrock directly. The audit says browsers must not hold Bedrock credentials, and only the checkout service role may invoke the model. How should the call path be rebuilt?",
    choices: [
      { id: "A", text: "Remove the key from the browser. Let the browser call the store API, and let the checkout role in the private workload call Bedrock with bedrock:InvokeModel limited to that role." },
      { id: "B", text: "Move the same access key into a cookie so the browser sends it only on checkout pages." },
      { id: "C", text: "Give the anonymous shopper principal bedrock:InvokeModel on every foundation model." },
      { id: "D", text: "Encode the access key in the guardrail name so it is harder to read." }
    ],
    correct: ["A"],
    why: "Bedrock data protection starts from least-privilege IAM identities, not from credentials embedded in a client. The workload role should be the principal that calls the model.",
    optionExplanations: [
      { id: "A", correct: true, text: "The browser never sees the key, and IAM can limit InvokeModel to the checkout role." },
      { id: "B", correct: false, text: "A cookie still places the long-lived secret on the client." },
      { id: "C", correct: false, text: "An anonymous invoke permission is the opposite of least privilege." },
      { id: "D", correct: false, text: "A guardrail name is not a secret store, and the key would still be in the page." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/data-protection.html"
  },
  {
    id: "o-3-2-1-04",
    task: "3.2",
    skill: "3.2.1",
    domain: 3,
    difficulty: 3,
    milestone: "M3",
    chapters: ["16"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 3", "DRAFT"],
    stem: "Aster Schools already uses a bedrock-runtime interface endpoint with private DNS. A leaked access key for the tutor role still works from a laptop on the public internet, because that call never enters the school VPC. The school wants that key to succeed only when the call arrives through the school endpoint. Which IAM condition does that?",
    choices: [
      { id: "A", text: "aws:RequestedRegion set to every commercial Region so the key works worldwide." },
      { id: "B", text: "A deny of ec2:CreateVpc on the tutor role." },
      { id: "C", text: "An endpoint policy that allows all principals and all actions, which is the default." },
      { id: "D", text: "aws:SourceVpce equal to the school endpoint id on the tutor role, so calls that do not arrive through that endpoint fail the condition." }
    ],
    correct: ["D"],
    why: "Private DNS only changes resolution inside the VPC. A valid key can still call the public service endpoint from anywhere unless the identity policy requires the VPC endpoint id.",
    optionExplanations: [
      { id: "A", correct: false, text: "Allowing every Region widens the key instead of tying it to the school endpoint." },
      { id: "B", correct: false, text: "An EC2 deny does not constrain bedrock:InvokeModel." },
      { id: "C", correct: false, text: "The default endpoint policy only governs traffic that already uses the endpoint, so it does not stop a public-internet call." },
      { id: "D", correct: true, text: "The aws:SourceVpce condition is how the role requires the request to come through a specific interface endpoint." }
    ],
    evidence: "https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_condition-keys.html"
  },
  {
    id: "o-3-2-2-01",
    task: "3.2",
    skill: "3.2.2",
    domain: 3,
    difficulty: 1,
    milestone: "M3",
    chapters: ["16"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 3", "DRAFT"],
    stem: "Nimbus Support uploaded a year of chat transcripts into the knowledge bucket. Compliance wants a report of which existing objects contain bank account numbers. They are not changing the live chat path today. Which service produces that S3 report?",
    choices: [
      { id: "A", text: "A contextual grounding check with a threshold of 0.5." },
      { id: "B", text: "An Amazon Macie sensitive data discovery job aimed at that bucket, using the managed identifier for account numbers." },
      { id: "C", text: "A CloudTrail lookup for the event name InvokeModel." },
      { id: "D", text: "A Bedrock prompt version that says please list the secret files." }
    ],
    correct: ["B"],
    why: "Macie discovery jobs analyze S3 objects and report the sensitive data they find. That is a scan of data at rest, which is the report this audit asked for.",
    optionExplanations: [
      { id: "A", correct: false, text: "Grounding scores a model reply against a source and does not inventory a bucket." },
      { id: "B", correct: true, text: "A Macie job is the discovery run that reports sensitive data already stored in the transcripts bucket." },
      { id: "C", correct: false, text: "InvokeModel events do not list which historical objects contain account numbers." },
      { id: "D", correct: false, text: "A prompt cannot open the bucket and produce a compliance inventory." }
    ],
    evidence: "https://docs.aws.amazon.com/macie/latest/user/discovery-jobs.html"
  },
  {
    id: "o-3-2-2-02",
    task: "3.2",
    skill: "3.2.2",
    domain: 3,
    difficulty: 2,
    milestone: "M3",
    chapters: ["16"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 3", "DRAFT"],
    stem: "Northwind Clinic exports discharge summaries as text files each night. Those files are copied into the knowledge bucket the next morning and then embedded. Patient names and record numbers must be removed from the text before anyone indexes it. A chat guardrail the next day would be too late for the index. Which batch step fits the nightly files?",
    choices: [
      { id: "A", text: "Run Amazon Comprehend PII redaction on the text files and index the redacted copies." },
      { id: "B", text: "Ask the embedding model to forget PII after the vectors are written." },
      { id: "C", text: "Enable CloudTrail data events and treat the event history as the redacted corpus." },
      { id: "D", text: "Set the knowledge base chunk size to 20 characters so names fall between chunks." }
    ],
    correct: ["A"],
    why: "Comprehend can detect PII in text and return a redacted copy from an asynchronous job. That copy is what should be indexed, before retrieval can put the original identifiers into a prompt.",
    optionExplanations: [
      { id: "A", correct: true, text: "Redacting the nightly text files is the step that keeps patient identifiers out of the indexed corpus." },
      { id: "B", correct: false, text: "An embedding model does not offer a later forget operation on vectors that were built from raw names." },
      { id: "C", correct: false, text: "CloudTrail events are an audit record, not a redacted document set." },
      { id: "D", correct: false, text: "A short chunk can still contain a name, and it also wrecks retrieval." }
    ],
    evidence: "https://docs.aws.amazon.com/comprehend/latest/dg/how-pii.html"
  },
  {
    id: "o-3-2-2-03",
    task: "3.2",
    skill: "3.2.2",
    domain: 3,
    difficulty: 2,
    milestone: "M7",
    chapters: ["16"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 3", "DRAFT"],
    stem: "Harbor Claims keeps a persons table in the lake that the assistant may query. The assistant role must be able to read claim status and must not receive the SSN column, even when the generated SQL asks for every column. A prompt line that says do not select SSN has already been ignored. What enforces the column rule?",
    choices: [
      { id: "A", text: "A Bedrock word filter that blocks the letters SSN in the user question." },
      { id: "B", text: "A Macie job that emails a finding the day after the query ran." },
      { id: "C", text: "A Lake Formation data filter that grants the assistant role SELECT without the SSN column." },
      { id: "D", text: "A higher grounding threshold so the model feels less sure about the SSN." }
    ],
    correct: ["C"],
    why: "Lake Formation data filters apply column-level security on the table grant. The engine omits columns the principal is not allowed to read, which a prompt instruction cannot guarantee.",
    optionExplanations: [
      { id: "A", correct: false, text: "Blocking the letters SSN in the question does not stop a SELECT * that never uses those letters." },
      { id: "B", correct: false, text: "A next-day finding does not remove the column from the query result." },
      { id: "C", correct: true, text: "A column filter on the Lake Formation grant is the control that keeps SSN out of the result set." },
      { id: "D", correct: false, text: "Grounding does not change which columns the lake returns." }
    ],
    evidence: "https://docs.aws.amazon.com/lake-formation/latest/dg/data-filtering.html"
  },
  {
    id: "o-3-2-2-04",
    task: "3.2",
    skill: "3.2.2",
    domain: 3,
    difficulty: 3,
    milestone: "M7",
    chapters: ["16"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 3", "DRAFT"],
    stem: "Lumen City must keep the model input and output for later review, in the same account and Region as the assistant. CloudTrail already shows Converse events, including who called and when. The auditor opened an event and could not find the prompt body or the completion. Which logging configuration stores those bodies?",
    choices: [
      { id: "A", text: "Turn off CloudTrail so the prompt is forced into the console event history." },
      { id: "B", text: "Write the prompt into the Name tag of the guardrail." },
      { id: "C", text: "Enable VPC flow logs and reconstruct the prompt from packet bytes." },
      { id: "D", text: "Enable model invocation logging to an S3 bucket in the same account and Region so each record can include the input and output JSON bodies." }
    ],
    correct: ["D"],
    why: "Model invocation logging is the Bedrock feature that stores request and response data for runtime calls. CloudTrail records the API activity, which is not the same store as the invocation input and output bodies.",
    optionExplanations: [
      { id: "A", correct: false, text: "Disabling CloudTrail removes the API record and still does not create an invocation log." },
      { id: "B", correct: false, text: "Resource tags are not a log of model input, and secrets do not belong in tags." },
      { id: "C", correct: false, text: "Flow logs store network metadata, not the JSON body of a TLS call." },
      { id: "D", correct: true, text: "Invocation logging to S3 in the same account and Region is how Bedrock retains the input and output bodies." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/model-invocation-logging.html"
  },
  {
    id: "o-3-2-3-01",
    task: "3.2",
    skill: "3.2.3",
    domain: 3,
    difficulty: 1,
    milestone: "M7",
    chapters: ["16"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 3", "DRAFT"],
    stem: "Cedar Bank customers paste a card number into a fee question and still need the fee answer. The bank does not want the model to see the raw number, and it does not want the whole question rejected. An output-only mask would run after the model has already received the prompt. Which guardrail action belongs on the input?",
    choices: [
      { id: "A", text: "Block the entire prompt whenever any digit appears." },
      { id: "B", text: "Mask credit-card numbers on the input with the sensitive-information filter so the model receives a PII-type placeholder instead of the digits." },
      { id: "C", text: "Detect the card number and take no action, then store the raw prompt in CloudWatch for analysts." },
      { id: "D", text: "Ask the customer to repeat the card number in the system prompt so the filter skips it." }
    ],
    correct: ["B"],
    why: "Mask mode replaces detected PII in the model request with a placeholder such as the card type. Block would stop the fee question, and an output-only mask leaves the raw number in the request.",
    optionExplanations: [
      { id: "A", correct: false, text: "Blocking every digit also blocks ordinary fee amounts and is broader than the card-number filter." },
      { id: "B", correct: true, text: "Input masking is the sensitive-information action that redacts the card number before the model sees the prompt." },
      { id: "C", correct: false, text: "Detect with no mask still sends the digits to the model and then copies them into a log." },
      { id: "D", correct: false, text: "Moving the number into the system prompt still places it in the request." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-sensitive-filters.html"
  },
  {
    id: "o-3-2-3-02",
    task: "3.2",
    skill: "3.2.3",
    domain: 3,
    difficulty: 2,
    milestone: "M7",
    chapters: ["16"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 3", "DRAFT"],
    stem: "Fieldnote Logistics masks the driver question by tagging only that question. The bill of lading retrieved into the same prompt sits outside the tags and still contains a license number, which the model then repeats. The team thought the input mask covered every string in the request. What must change before the model reads the bill?",
    choices: [
      { id: "A", text: "Redact the license number before the bill is indexed, or include the bill text in the span the sensitive-information filter evaluates. Untagged text is not processed when tags are in use." },
      { id: "B", text: "Leave the bill outside the tags and raise the grounding threshold." },
      { id: "C", text: "Store the raw license number in the guardrail description so the filter learns it." },
      { id: "D", text: "Switch the knowledge base to hybrid search, which strips PII during ranking." }
    ],
    correct: ["A"],
    why: "With input tags present, content outside the tags is not processed by the guardrail. A mask that only wraps the question never sees the license number in the retrieved bill.",
    optionExplanations: [
      { id: "A", correct: true, text: "The license number stays invisible to the mask unless the bill is redacted before indexing or placed inside the evaluated span." },
      { id: "B", correct: false, text: "A grounding threshold does not redact an identifier that was excluded from the filter." },
      { id: "C", correct: false, text: "A description field is not a mask, and it would copy the license number into the guardrail config." },
      { id: "D", correct: false, text: "Hybrid search changes how chunks are retrieved and does not redact PII." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-tagging.html"
  },
  {
    id: "o-3-2-3-03",
    task: "3.2",
    skill: "3.2.3",
    domain: 3,
    difficulty: 2,
    milestone: "M7",
    chapters: ["16"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 3", "DRAFT"],
    stem: "Pico Retail masks email addresses in the assistant reply. The refund tool still receives the raw customer email, because the model placed it in the tool arguments. The sensitive-information filter never rewrites that field. The refund API must not see the address. Where does the mask have to happen?",
    choices: [
      { id: "A", text: "In a Macie job that scans the refund API logs the next day." },
      { id: "B", text: "In the reply text only, since tool arguments are documented to use the same mask." },
      { id: "C", text: "In the knowledge base metadata filter for the color attribute." },
      { id: "D", text: "In the tool handler, before the refund call, because the sensitive-information filter does not evaluate tool call arguments." }
    ],
    correct: ["D"],
    why: "Sensitive-information filters do not mask tool call arguments, so a mask on the chat reply still leaves the email for the tool code to redact or drop.",
    optionExplanations: [
      { id: "A", correct: false, text: "A next-day Macie scan does not stop the refund call that is about to run." },
      { id: "B", correct: false, text: "The filter documentation says tool call arguments are not masked." },
      { id: "C", correct: false, text: "A metadata filter on color does not edit tool arguments." },
      { id: "D", correct: true, text: "The tool handler is the layer that can strip the email before the refund API is called." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-sensitive-filters.html"
  }
]);
