window.AIP = window.AIP || {};
AIP.registerQuestions([
  {
    id: "o-2-3-1-01",
    task: "2.3",
    skill: "2.3.1",
    domain: 2,
    difficulty: 1,
    milestone: "M3",
    chapters: ["23"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 2", "DRAFT"],
    stem: "When a loan packet lands in Cedar Bank's bucket, a malware scan and a summarization workflow must both start. That work must stay off the banker's chat request, and more than one consumer needs the same event. They want the least operational overhead.",
    choices: [
      { id: "A", text: "Have the chat Lambda download and summarize the packet while the banker waits on the request." },
      { id: "B", text: "Poll the bucket from a browser timer once a second." },
      { id: "C", text: "Let an agent list the bucket on every user message in case a new file appeared." },
      { id: "D", text: "Publish the object-created event on Amazon EventBridge and route it to the scan and summarization targets." }
    ],
    correct: ["D"],
    why: "EventBridge can deliver one object-created event to several targets, so the packet work starts without being pulled into the chat request.",
    optionExplanations: [
      { id: "A", correct: false, text: "Summarizing inside the chat request couples a long job to the banker's wait." },
      { id: "B", correct: false, text: "A browser poll is easy to duplicate or miss and keeps a person in the trigger path." },
      { id: "C", correct: false, text: "Listing the bucket from chat is an open-ended check for an event the bucket already emits." },
      { id: "D", correct: true, text: "The event bus routes the new object to each consumer without the chat service waiting on them." }
    ],
    evidence: "https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-what-is.html"
  },
  {
    id: "o-2-3-1-02",
    task: "2.3",
    skill: "2.3.1",
    domain: 2,
    difficulty: 2,
    milestone: "M3",
    chapters: ["23"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 2", "DRAFT"],
    stem: "Fieldnote Logistics must ask Bedrock to draft a delivery exception note and then post that note to the carrier's existing HTTPS API. The order of those two calls is fixed. They want a known workflow rather than an agent, and they do not want a custom integration service.",
    choices: [
      { id: "A", text: "Use a Step Functions state machine that calls Bedrock and then the carrier API, with retries defined on the Bedrock task." },
      { id: "B", text: "Ask the driver to paste the note into the carrier portal from the cab." },
      { id: "C", text: "Give an agent credentials for every carrier API and let it choose the order." },
      { id: "D", text: "Install the carrier SDK on each warehouse PC and call Bedrock from that PC with an IAM user key." }
    ],
    correct: ["A"],
    why: "Step Functions can call Amazon Bedrock as a task and then call the carrier API, which is the fixed sequence this note requires.",
    optionExplanations: [
      { id: "A", correct: true, text: "The state machine orders the Bedrock draft and the carrier call, and the Bedrock task can retry without a new service." },
      { id: "B", correct: false, text: "A manual paste leaves the carrier API unconnected to the draft." },
      { id: "C", correct: false, text: "An agent holding every carrier credential can reorder or skip the post." },
      { id: "D", correct: false, text: "Long-lived keys on warehouse PCs spread credentials outside the workflow." }
    ],
    evidence: "https://docs.aws.amazon.com/step-functions/latest/dg/connect-to-resource.html"
  },
  {
    id: "o-2-3-2-01",
    task: "2.3",
    skill: "2.3.2",
    domain: 2,
    difficulty: 1,
    milestone: "M3",
    chapters: ["23"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 2", "DRAFT"],
    stem: "Pico Retail's store app already enters through Amazon API Gateway. Shoppers must see draft words as the model writes them, and the phone must not hold Bedrock credentials. They want streaming and the least operational overhead.",
    choices: [
      { id: "A", text: "Raise the REST integration timeout and return the full answer in one JSON body after the model finishes." },
      { id: "B", text: "Add a WebSocket API route that invokes Lambda, and push tokens to the open connection as the model produces them." },
      { id: "C", text: "Embed a Bedrock access key in the store app and call InvokeModel from the phone." },
      { id: "D", text: "Email the finished answer five minutes after the shopper asks." }
    ],
    correct: ["B"],
    why: "A WebSocket API lets the backend push tokens to the client, while the Lambda execution role remains the only principal that calls Bedrock.",
    optionExplanations: [
      { id: "A", correct: false, text: "A single JSON body appears only after the model finishes, so the shopper still waits on a blank panel." },
      { id: "B", correct: true, text: "The WebSocket route keeps credentials on Lambda and pushes each chunk down the connection the app already holds." },
      { id: "C", correct: false, text: "A key in the phone can be extracted, and the call no longer passes through the company API." },
      { id: "D", correct: false, text: "Email is a later notification, not streaming inside the store app." }
    ],
    evidence: "https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-websocket-api.html"
  },
  {
    id: "o-2-3-2-02",
    task: "2.3",
    skill: "2.3.2",
    domain: 2,
    difficulty: 2,
    milestone: "M3",
    chapters: ["23"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 2", "DRAFT"],
    stem: "Aster Schools' student portal already calls a REST API for class search. A new Explain this error button should return one short JSON explanation on that same API. The browser must not receive model credentials, and this button is not a streaming chat. They want the least operational overhead.",
    choices: [
      { id: "A", text: "Rebuild the portal around a WebSocket chat just for this button." },
      { id: "B", text: "Stand up a SageMaker GPU endpoint for a one-sentence explanation." },
      { id: "C", text: "Add a REST method that uses the Lambda execution role to call Bedrock Converse and returns the finished JSON." },
      { id: "D", text: "Ask students to paste the error into a public chatbot website." }
    ],
    correct: ["C"],
    why: "Converse is a synchronous request-response call, so the existing REST method can return one JSON body without a new streaming stack.",
    optionExplanations: [
      { id: "A", correct: false, text: "A WebSocket rebuild is extra machinery for a call that completes as one response." },
      { id: "B", correct: false, text: "A GPU endpoint adds capacity management for a short catalog-model call." },
      { id: "C", correct: true, text: "The portal keeps its REST API, and the function role calls Converse so the browser never sees model credentials." },
      { id: "D", correct: false, text: "A public site sends the student error outside the school's API and identity path." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/models-api-compatibility.html"
  },
  {
    id: "o-2-3-3-01",
    task: "2.3",
    skill: "2.3.3",
    domain: 2,
    difficulty: 1,
    milestone: "M3",
    chapters: ["23"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 2", "DRAFT"],
    stem: "Nimbus Support's tool Lambda currently uses an administrator policy, so it can call every Bedrock model and read every bucket. The function only invokes one model and reads one prompt prefix. Apply least privilege with the least operational overhead.",
    choices: [
      { id: "A", text: "Replace the administrator policy with an execution role that allows only the invoke action on that model and read access to that prefix." },
      { id: "B", text: "Keep the administrator policy and add a code comment that says not to call anything else." },
      { id: "C", text: "Move long-term access keys into an environment variable so they are easier to find during an incident." },
      { id: "D", text: "Call sts:AssumeRole on the administrator role at the start of every invocation." }
    ],
    correct: ["A"],
    why: "Lambda assumes the function's execution role, and that role should list only the Bedrock and object actions this tool uses.",
    optionExplanations: [
      { id: "A", correct: true, text: "The narrowed execution role is what the function receives, so other models and buckets are no longer allowed." },
      { id: "B", correct: false, text: "A comment does not change the credentials the function holds." },
      { id: "C", correct: false, text: "Long-term keys in an environment variable are not an execution role and are easy to leak in logs." },
      { id: "D", correct: false, text: "Assuming an administrator role widens the call, and the function should use the role Lambda already assumes." }
    ],
    evidence: "https://docs.aws.amazon.com/lambda/latest/dg/lambda-intro-execution-role.html"
  },
  {
    id: "o-2-3-3-02",
    task: "2.3",
    skill: "2.3.3",
    domain: 2,
    difficulty: 2,
    milestone: "M3",
    chapters: ["23"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 2", "DRAFT"],
    stem: "Northwind Clinic developers sign in through the company identity provider. The chart API must call Bedrock with temporary credentials, and daily work must not use the account root user. Apply least privilege.",
    choices: [
      { id: "A", text: "Create an access key for the root user and ship it inside the mobile chart app." },
      { id: "B", text: "Share one IAM user password among the developers who deploy the chart API." },
      { id: "C", text: "Attach full Bedrock access to every developer and to the chart Lambda." },
      { id: "D", text: "Federate developers for human access, and let only the chart function's role call the Bedrock actions that API needs." }
    ],
    correct: ["D"],
    why: "People should use federation for temporary credentials, and the chart function should use a role whose policy lists only the Bedrock actions it performs.",
    optionExplanations: [
      { id: "A", correct: false, text: "A root key in the app is the broadest credential the clinic can leak." },
      { id: "B", correct: false, text: "A shared IAM user password is a long-term secret with no per-person identity." },
      { id: "C", correct: false, text: "Full Bedrock access on humans and on the function exceeds the chart API." },
      { id: "D", correct: true, text: "Federation covers the developers, and the function role is limited to the Bedrock calls the chart API makes." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/security-iam.html"
  },
  {
    id: "o-2-3-3-03",
    task: "2.3",
    skill: "2.3.3",
    domain: 2,
    difficulty: 2,
    milestone: "M3",
    chapters: ["23"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 2", "DRAFT"],
    stem: "Harbor Claims runs the claims API in a private subnet and forbids a NAT path to the public Bedrock endpoint. The function must still call the runtime API. The private path should allow only the invoke actions that API uses. Apply least privilege with the least operational overhead.",
    choices: [
      { id: "A", text: "Add an Amazon S3 gateway endpoint and treat it as the path for Bedrock runtime calls." },
      { id: "B", text: "Create an interface VPC endpoint for bedrock-runtime and attach an endpoint policy that allows only those invoke actions." },
      { id: "C", text: "Add an internet gateway and open the subnet security group to the world on port 443." },
      { id: "D", text: "Proxy the Bedrock calls through a developer's home VPN." }
    ],
    correct: ["B"],
    why: "Runtime calls from a private subnet use the bedrock-runtime interface endpoint, and an endpoint policy can limit the actions allowed on that path.",
    optionExplanations: [
      { id: "A", correct: false, text: "An S3 gateway endpoint does not serve the Bedrock runtime API." },
      { id: "B", correct: true, text: "The interface endpoint keeps the call on PrivateLink, and the endpoint policy names the invoke actions." },
      { id: "C", correct: false, text: "An internet gateway is the public path this subnet is not allowed to use." },
      { id: "D", correct: false, text: "A home VPN puts claim prompts on a personal network and is not a Bedrock interface endpoint." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/vpc-interface-endpoints.html"
  },
  {
    id: "o-2-3-4-01",
    task: "2.3",
    skill: "2.3.4",
    domain: 2,
    difficulty: 1,
    milestone: "M3",
    chapters: ["23"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 2", "DRAFT"],
    stem: "Lumen City must keep resident prompts inside the EU. A global inference profile would cost less, and legal will not allow processing in an arbitrary commercial Region. They still want Bedrock to place capacity across the EU Regions in the profile. They want the least operational overhead.",
    choices: [
      { id: "A", text: "Use a global cross-Region profile and filter the CloudTrail inference region after each call." },
      { id: "B", text: "Copy the prompts into a US data-science account where capacity is cheaper." },
      { id: "C", text: "Call a geographic EU inference profile so routing stays inside that geography." },
      { id: "D", text: "Turn off encryption in transit so cross-Region copies are easier to inspect." }
    ],
    correct: ["C"],
    why: "A geographic cross-Region profile routes only inside that geography, while a global profile can select any supported commercial Region.",
    optionExplanations: [
      { id: "A", correct: false, text: "A CloudTrail filter runs after a global profile may already have processed the prompt outside the EU." },
      { id: "B", correct: false, text: "Copying prompts into a US account leaves the EU boundary on purpose." },
      { id: "C", correct: true, text: "The EU geographic profile keeps inference inside the EU Regions defined for that profile." },
      { id: "D", correct: false, text: "Disabling encryption does not constrain which Region processes the request." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/cross-region-inference.html"
  },
  {
    id: "o-2-3-4-02",
    task: "2.3",
    skill: "2.3.4",
    domain: 2,
    difficulty: 2,
    milestone: "M3",
    chapters: ["23"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 2", "DRAFT"],
    stem: "Cedar Bank logs full prompts and completions from production. A developer wants those logs delivered to a bucket in the sandbox account so notebooks can read customer prompts. Security requires production invocation data to stay in the production account and Region. Apply least privilege.",
    choices: [
      { id: "A", text: "Keep the logging destination in the same production account and Region, and grant sandbox roles no access to that bucket." },
      { id: "B", text: "Point production logging at the sandbox bucket and allow that account to read every object." },
      { id: "C", text: "Enable public read on the production log bucket for the afternoon debugging window." },
      { id: "D", text: "Email the daily prompt export to the data-science distribution list." }
    ],
    correct: ["A"],
    why: "Model invocation logging delivers only to a destination in the same account and Region, which is also the boundary that keeps production prompts out of the sandbox.",
    optionExplanations: [
      { id: "A", correct: true, text: "A same-account, same-Region destination matches the logging rule and leaves sandbox without a copy of the prompts." },
      { id: "B", correct: false, text: "A sandbox bucket is a different account, which invocation logging does not support as a destination, and it copies customer prompts out of production." },
      { id: "C", correct: false, text: "Public read exposes the prompts beyond both the production and sandbox accounts." },
      { id: "D", correct: false, text: "Email is another uncontrolled copy of production prompts." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/model-invocation-logging.html"
  },
  {
    id: "o-2-3-4-03",
    task: "2.3",
    skill: "2.3.4",
    domain: 2,
    difficulty: 2,
    milestone: "M7",
    chapters: ["23"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 2", "DRAFT"],
    stem: "Fieldnote Logistics keeps development and production in separate VPCs. A developer wants the dev function to call the production Bedrock runtime so tests use live capacity. Production inference must not be reachable from the dev VPC. Apply least privilege.",
    choices: [
      { id: "A", text: "Share one interface endpoint from the dev VPC, with an endpoint policy that allows every principal and every action, into production." },
      { id: "B", text: "Copy the production runtime credential into the dev function's environment variables." },
      { id: "C", text: "Peer the VPCs and allow the dev role bedrock star on production model resources." },
      { id: "D", text: "Give production its own bedrock-runtime interface endpoint and an endpoint policy that allows only the production function role." }
    ],
    correct: ["D"],
    why: "An interface endpoint policy can name who may call Bedrock through that endpoint, so the dev VPC is not a path into production inference.",
    optionExplanations: [
      { id: "A", correct: false, text: "An open shared endpoint is a cross-environment path into the runtime API." },
      { id: "B", correct: false, text: "A copied credential lets dev invoke production regardless of which VPC it runs in." },
      { id: "C", correct: false, text: "Peering plus a broad Bedrock permission lets the dev role call production models." },
      { id: "D", correct: true, text: "The production endpoint policy allows the production role, so a function in the dev VPC is not a permitted caller on that path." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/vpc-interface-endpoints.html"
  },
  {
    id: "o-2-3-5-01",
    task: "2.3",
    skill: "2.3.5",
    domain: 2,
    difficulty: 1,
    milestone: "M7",
    chapters: ["23"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 2", "DRAFT"],
    stem: "Pico Retail changes prompt files as often as application code. A script on a developer laptop currently deploys whatever file happens to be on that disk. Every prompt change must build and run its tests in a managed environment before anyone can promote it. They want the least operational overhead.",
    choices: [
      { id: "A", text: "Keep the laptop script and ask developers to run the tests when they remember." },
      { id: "B", text: "Add a CodeBuild test action so the prompt tests run in a managed build and the pipeline holds the artifacts." },
      { id: "C", text: "Edit the production prompt in the console and paste it into a chat window as a spot check." },
      { id: "D", text: "Skip tests on prompt-only commits because prompts are configuration comments." }
    ],
    correct: ["B"],
    why: "CodeBuild runs the tests on demand without build servers, and a pipeline can use that project as the test action before a prompt is promoted.",
    optionExplanations: [
      { id: "A", correct: false, text: "A laptop script is not a repeatable gate, and skipped tests still ship." },
      { id: "B", correct: true, text: "The CodeBuild action runs the prompt tests in the pipeline and produces artifacts for the next stage." },
      { id: "C", correct: false, text: "A console edit bypasses the build and the tests." },
      { id: "D", correct: false, text: "Prompt files change model behavior and still belong in the test stage." }
    ],
    evidence: "https://docs.aws.amazon.com/codebuild/latest/userguide/welcome.html"
  },
  {
    id: "o-2-3-5-02",
    task: "2.3",
    skill: "2.3.5",
    domain: 2,
    difficulty: 2,
    milestone: "M7",
    chapters: ["23"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 2", "DRAFT"],
    stem: "Aster Schools will not move a new counseling prompt to production until a counselor approves the wording. Automated tests may already be green. The release path must stop and wait, as a known workflow rather than an agent that might skip the approval.",
    choices: [
      { id: "A", text: "Let the deploying developer approve the change by pushing a second commit." },
      { id: "B", text: "Add a prompt line that tells the model to ask a counselor before it answers a student." },
      { id: "C", text: "Add a manual approval action to the production stage in CodePipeline and continue only after the counselor approves." },
      { id: "D", text: "Deploy the prompt and open a ticket if a counselor complains later." }
    ],
    correct: ["C"],
    why: "A manual approval action stops the pipeline until an authorized person approves or rejects the stage.",
    optionExplanations: [
      { id: "A", correct: false, text: "Another commit is a new change, not an approval of the artifact that passed tests." },
      { id: "B", correct: false, text: "A model instruction does not stop the pipeline from publishing the prompt." },
      { id: "C", correct: true, text: "The approval action holds the production stage until the counselor approves the wording." },
      { id: "D", correct: false, text: "A ticket after release does not keep the unapproved wording out of production." }
    ],
    evidence: "https://docs.aws.amazon.com/codepipeline/latest/userguide/approvals-action-add.html"
  }
]);
