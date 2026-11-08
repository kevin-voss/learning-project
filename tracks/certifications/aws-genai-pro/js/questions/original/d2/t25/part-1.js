window.AIP = window.AIP || {};
AIP.registerQuestions([
  {
    id: "o-2-5-1-01",
    task: "2.5",
    skill: "2.5.1",
    domain: 2,
    difficulty: 1,
    milestone: "M7",
    chapters: ["13"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 2", "DRAFT"],
    stem: "Nimbus Support sells a REST API that partners use to summarize tickets with a Bedrock model. Each partner needs a request quota, and the API key must not be the only control that decides who can call the method. They want the least operational overhead.",
    choices: [
      { id: "A", text: "Issue an API key and treat that key as both the quota id and the authorization decision." },
      { id: "B", text: "Put a long-term Bedrock key in the partner application and skip API Gateway." },
      { id: "C", text: "Attach a usage plan and API key for the partner quota, and authorize the method with IAM or a Lambda authorizer." },
      { id: "D", text: "Share one usage plan across every partner and log the caller from a free-text header." }
    ],
    correct: ["C"],
    why: "A usage plan identifies the client and applies throttling and quota, while IAM or a Lambda authorizer is what actually allows or denies the call.",
    optionExplanations: [
      { id: "A", correct: false, text: "An API key is not an authorization mechanism, and a key for one API in the plan can reach the other APIs in that plan." },
      { id: "B", correct: false, text: "A Bedrock key in the partner app removes the quota door and exposes model credentials." },
      { id: "C", correct: true, text: "The usage plan meters the partner, and IAM or the authorizer decides whether that caller may invoke the method." },
      { id: "D", correct: false, text: "One shared plan cannot tell partners apart, and a free-text header is not the authorizer." }
    ],
    evidence: "https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-api-usage-plans.html"
  },
  {
    id: "o-2-5-2-01",
    task: "2.5",
    skill: "2.5.2",
    domain: 2,
    difficulty: 1,
    milestone: "M7",
    chapters: ["13"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 2", "DRAFT"],
    stem: "Northwind Clinic has a nurse UI and a partner clinic system that must apply the same chart prompt. Both clients should call one API, and neither client should hold Bedrock credentials. They want an API-first path with the least operational overhead.",
    choices: [
      { id: "A", text: "Duplicate the prompt in the nurse UI and again in the partner system, each with its own embedded key." },
      { id: "B", text: "Expose one API Gateway method that invokes Lambda, and let that function's execution role call Bedrock for both clients." },
      { id: "C", text: "Let the partner system call Bedrock directly and keep the nurse UI on a separate model with a different prompt." },
      { id: "D", text: "Render the model response only inside the Bedrock console so there is no API to secure." }
    ],
    correct: ["B"],
    why: "One method and one execution role keep the prompt and the Bedrock permission in the API, which both the UI and the partner system call.",
    optionExplanations: [
      { id: "A", correct: false, text: "Two embedded keys and two copies of the prompt drift apart and leak credentials to each client." },
      { id: "B", correct: true, text: "Both clients use the same method, and only the Lambda role is allowed to invoke the model." },
      { id: "C", correct: false, text: "A direct partner call skips the shared prompt and puts model access in the partner account's hands." },
      { id: "D", correct: false, text: "The console is not an interface the nurse UI or the partner system can call." }
    ],
    evidence: "https://docs.aws.amazon.com/lambda/latest/dg/lambda-intro-execution-role.html"
  },
  {
    id: "o-2-5-2-02",
    task: "2.5",
    skill: "2.5.2",
    domain: 2,
    difficulty: 2,
    milestone: "M7",
    chapters: ["13"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 2", "DRAFT"],
    stem: "Harbor Claims already has an adjuster UI that talks to the claims API. A vendor asks the team to put a Bedrock access key in that UI so the page can call the model without the API. Least privilege still applies, and the UI must keep working through the existing API.",
    choices: [
      { id: "A", text: "Keep the model call in the API's Lambda execution role, and leave the browser with only its user sign-in token." },
      { id: "B", text: "Ship the Bedrock access key in the UI bundle so the page can call InvokeModel itself." },
      { id: "C", text: "Give every adjuster an IAM user key and paste it into the browser's local storage." },
      { id: "D", text: "Disable the API and instruct adjusters to use the Bedrock playground with the root account." }
    ],
    correct: ["A"],
    why: "The browser keeps a user token for the existing API, and the execution role is what Lambda uses to call Bedrock.",
    optionExplanations: [
      { id: "A", correct: true, text: "The UI calls the claims API, and the function role holds the Bedrock permission instead of the page." },
      { id: "B", correct: false, text: "A key in the bundle can be read from the browser and used outside the claims API." },
      { id: "C", correct: false, text: "Long-term IAM user keys in local storage are not least privilege and are not the API's role." },
      { id: "D", correct: false, text: "The playground plus the root account removes the API and uses the broadest identity in the account." }
    ],
    evidence: "https://docs.aws.amazon.com/lambda/latest/dg/lambda-intro-execution-role.html"
  },
  {
    id: "o-2-5-3-01",
    task: "2.5",
    skill: "2.5.3",
    domain: 2,
    difficulty: 1,
    milestone: "M7",
    chapters: ["13"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 2", "DRAFT"],
    stem: "Lumen City's permit approval always runs the same steps: draft a comment, wait for a clerk, then file the decision. The wait can last a business day. They want a known workflow rather than an agent, and the wait must outlive the clerk's browser session.",
    choices: [
      { id: "A", text: "Let an agent decide whether the clerk step is needed on each permit." },
      { id: "B", text: "Hold the permit in a browser timer until the clerk returns." },
      { id: "C", text: "Increase the model timeout and ask the model to wait quietly for a day." },
      { id: "D", text: "Pause a Step Functions task with a callback token, and continue only when the clerk's approval calls SendTaskSuccess." }
    ],
    correct: ["D"],
    why: "The callback pattern pauses the known workflow until an external approval returns the task token, which can last far longer than a browser tab.",
    optionExplanations: [
      { id: "A", correct: false, text: "An agent can skip the clerk, and this permit path is not allowed to skip that step." },
      { id: "B", correct: false, text: "A browser timer ends when the tab closes, which is before a business day is over." },
      { id: "C", correct: false, text: "A model timeout is not a durable wait, and the model cannot hold a clerk's decision." },
      { id: "D", correct: true, text: "The state machine stays paused on the task token until the clerk approval sends success." }
    ],
    evidence: "https://docs.aws.amazon.com/step-functions/latest/dg/connect-to-resource.html"
  },
  {
    id: "o-2-5-3-02",
    task: "2.5",
    skill: "2.5.3",
    domain: 2,
    difficulty: 2,
    milestone: "M7",
    chapters: ["13"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 2", "DRAFT"],
    stem: "After Cedar Bank's model writes a suspicious-activity summary, the case system, the archive, and the notification service all need to start. The chat request must return without waiting on those three consumers. They want the least operational overhead.",
    choices: [
      { id: "A", text: "Emit one event to Amazon EventBridge and let rules deliver it to the case, archive, and notification targets." },
      { id: "B", text: "Call the three downstream APIs in sequence inside the chat Lambda before returning to the banker." },
      { id: "C", text: "Ask an agent to notice the summary later by rereading the chat transcript." },
      { id: "D", text: "Have the banker forward the summary by email to the three teams." }
    ],
    correct: ["A"],
    why: "An event bus delivers one event to many targets, so the chat response is not tied to the case, archive, and notification work.",
    optionExplanations: [
      { id: "A", correct: true, text: "Rules on the bus start each consumer from the same summary event after the chat call has its result." },
      { id: "B", correct: false, text: "Sequential calls inside the chat function make the banker wait on systems that can run later." },
      { id: "C", correct: false, text: "Rereading a transcript is not a hook, and the agent might miss the summary." },
      { id: "D", correct: false, text: "Email depends on the banker and does not start the case system." }
    ],
    evidence: "https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-what-is.html"
  },
  {
    id: "o-2-5-4-01",
    task: "2.5",
    skill: "2.5.4",
    domain: 2,
    difficulty: 1,
    milestone: "M7",
    chapters: ["13"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 2", "DRAFT"],
    stem: "Fieldnote Logistics developers want help while they write the dispatch Lambda. Customer chats must keep using that function's Bedrock permission, and a developer assistant must not sit on the customer request path. Apply least privilege with the least operational overhead.",
    choices: [
      { id: "A", text: "Route customer chats through the developer's IDE assistant so the same session answers both code questions and dispatch questions." },
      { id: "B", text: "Keep customer InvokeModel calls on the Lambda execution role, and keep the coding assistant in the developer IDE." },
      { id: "C", text: "Copy the developer's IDE credentials into the production function environment." },
      { id: "D", text: "Give customers a link to the Bedrock console and let them share the developer's sign-in." }
    ],
    correct: ["B"],
    why: "Lambda assumes the function execution role for customer model calls, which stays separate from whatever assistant the developer uses while editing code.",
    optionExplanations: [
      { id: "A", correct: false, text: "The IDE assistant is a developer tool, and customer traffic would depend on a person's coding session." },
      { id: "B", correct: true, text: "Customers hit the function, the execution role calls Bedrock, and the coding assistant never joins that path." },
      { id: "C", correct: false, text: "IDE credentials in the function environment mix a person's identity into the customer runtime." },
      { id: "D", correct: false, text: "A shared console sign-in gives customers a developer identity and skips the dispatch API." }
    ],
    evidence: "https://docs.aws.amazon.com/lambda/latest/dg/lambda-intro-execution-role.html"
  },
  {
    id: "o-2-5-4-02",
    task: "2.5",
    skill: "2.5.4",
    domain: 2,
    difficulty: 2,
    milestone: "M7",
    chapters: ["13"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 2", "DRAFT"],
    stem: "A Pico Retail developer accepts a coding assistant's suggestion for the returns prompt and wants it live before lunch. The suggestion has not run the prompt tests. Production changes still have to pass a managed build. They want the least operational overhead.",
    choices: [
      { id: "A", text: "Paste the suggestion into the production prompt in the console and skip the build because it came from an assistant." },
      { id: "B", text: "Commit the suggestion and let a CodeBuild test action run the prompt tests before any deploy stage." },
      { id: "C", text: "Drop the suggestion into the shopper browser as a hard-coded string." },
      { id: "D", text: "Ask the assistant to mark the suggestion approved and treat that mark as the release gate." }
    ],
    correct: ["B"],
    why: "CodeBuild runs the tests in the pipeline, so an assistant suggestion becomes a release candidate only after that managed test action succeeds.",
    optionExplanations: [
      { id: "A", correct: false, text: "A console paste ships untested prompt text and bypasses the build." },
      { id: "B", correct: true, text: "The CodeBuild action runs the prompt tests on the commit before a later stage can deploy it." },
      { id: "C", correct: false, text: "A string in the browser is not a tested release and exposes the prompt to shoppers." },
      { id: "D", correct: false, text: "The assistant that wrote the suggestion is not the test stage." }
    ],
    evidence: "https://docs.aws.amazon.com/codebuild/latest/userguide/welcome.html"
  },
  {
    id: "o-2-5-5-01",
    task: "2.5",
    skill: "2.5.5",
    domain: 2,
    difficulty: 1,
    milestone: "M7",
    chapters: ["13"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 2", "DRAFT"],
    stem: "Aster Schools answers handbook questions from a knowledge base, and those answers never open a ticket. A separate facilities request must call a ticket API whose parameters come from the sentence. They want an agent only where a tool has to be chosen, with the least operational overhead.",
    choices: [
      { id: "A", text: "Send both the handbook and the facilities request through one agent that can call every school API." },
      { id: "B", text: "Answer handbook questions with retrieval, and use a Bedrock agent with a ticket action group only for the facilities request." },
      { id: "C", text: "Fine-tune a model on the handbook and let it invent ticket ids without a tool." },
      { id: "D", text: "Use an agent for the handbook and a second agent that ignores the ticket API." }
    ],
    correct: ["B"],
    why: "An agent is the loop that chooses an action group and fills its parameters, which the facilities ticket needs and the handbook lookup does not.",
    optionExplanations: [
      { id: "A", correct: false, text: "One agent with every school API can take actions the handbook question never required." },
      { id: "B", correct: true, text: "Retrieval answers the handbook, and the agent runs only when the request needs the ticket action group." },
      { id: "C", correct: false, text: "A fine-tune does not call the ticket API, so the facilities request never becomes a real ticket." },
      { id: "D", correct: false, text: "An agent on the handbook adds a planning loop, and a second agent that cannot call the ticket API cannot file the request." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/agents-how.html"
  },
  {
    id: "o-2-5-5-02",
    task: "2.5",
    skill: "2.5.5",
    domain: 2,
    difficulty: 2,
    milestone: "M7",
    chapters: ["13"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 2", "DRAFT"],
    stem: "Nimbus Support's refund-status path always checks identity, reads the refund, and returns the status, in that order. A separate why was I charged twice question may need any of several account tools depending on the sentence. They want a known workflow for the status path and an agent only for the open question.",
    choices: [
      { id: "A", text: "Use one agent for refund status and for the charge question so both paths can skip steps." },
      { id: "B", text: "Use a Step Functions state machine for the three status steps, and a Bedrock agent whose action groups are the account tools for the charge question." },
      { id: "C", text: "Hard-code all twelve account tools into the status path so it always calls each of them." },
      { id: "D", text: "Let the model answer the charge question from memory and skip tools entirely." }
    ],
    correct: ["B"],
    why: "The status path is a fixed sequence a state machine can run, while the charge question needs the agent loop that picks among action groups.",
    optionExplanations: [
      { id: "A", correct: false, text: "An agent on the status path can reorder or skip the identity check." },
      { id: "B", correct: true, text: "Step Functions runs the known status steps, and the agent selects among the account action groups only for the open question." },
      { id: "C", correct: false, text: "Calling every account tool on a status check does work the three-step path does not need." },
      { id: "D", correct: false, text: "A charge explanation that skips tools cannot read the account systems the question depends on." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/agents-how.html"
  },
  {
    id: "o-2-5-6-01",
    task: "2.5",
    skill: "2.5.6",
    domain: 2,
    difficulty: 1,
    milestone: "M7",
    chapters: ["13"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 2", "DRAFT"],
    stem: "Northwind Clinic developers are still building the chart Lambda and need to see time spent inside the function versus time spent calling Bedrock. They want a trace of the request while they develop, with the least operational overhead.",
    choices: [
      { id: "A", text: "Print the full prompt to the browser console on every nurse workstation." },
      { id: "B", text: "Enable active tracing so Lambda records an X-Ray segment for the function, and instrument the outbound Bedrock call as a subsegment." },
      { id: "C", text: "Turn on only the API Gateway access log and treat the total HTTP time as the model time." },
      { id: "D", text: "Email the CloudWatch log stream to the developer after each deploy." }
    ],
    correct: ["B"],
    why: "With active tracing, Lambda records a segment for the invocation, and the X-Ray SDK can add a subsegment around the outbound model call.",
    optionExplanations: [
      { id: "A", correct: false, text: "The browser console is not a trace, and it exposes the prompt on the nurse workstation." },
      { id: "B", correct: true, text: "Active tracing gives the function segment, and a subsegment separates the Bedrock call from the rest of the handler." },
      { id: "C", correct: false, text: "An access log shows one HTTP duration and cannot split function time from the model call." },
      { id: "D", correct: false, text: "Emailing a log stream is not a trace map and arrives too late to follow one request." }
    ],
    evidence: "https://docs.aws.amazon.com/xray/latest/devguide/xray-services-lambda.html"
  },
  {
    id: "o-2-5-6-02",
    task: "2.5",
    skill: "2.5.6",
    domain: 2,
    difficulty: 2,
    milestone: "M7",
    chapters: ["13"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 2", "DRAFT"],
    stem: "Harbor Claims can see that a model call was slow, and they still cannot read the prompt and completion that produced a wrong denial reason. They are building the adjuster API and need those bodies for invocations in this account and Region. Apply least privilege to the log destination.",
    choices: [
      { id: "A", text: "Enable Bedrock model invocation logging to an S3 bucket or CloudWatch Logs group in the same account and Region, and restrict who can read that destination." },
      { id: "B", text: "Rely on the X-Ray segment duration as the record of what the model was asked." },
      { id: "C", text: "Write prompts to a public S3 bucket so every developer can browse them without IAM." },
      { id: "D", text: "Turn on AWS CloudTrail data events and expect the prompt text in the trail." }
    ],
    correct: ["A"],
    why: "Model invocation logging stores the request and response bodies for runtime calls, and the destination must be in the same account and Region.",
    optionExplanations: [
      { id: "A", correct: true, text: "Invocation logging captures the input and output bodies, and a locked same-account destination keeps them off a public path." },
      { id: "B", correct: false, text: "An X-Ray duration shows time, not the prompt or the completion text." },
      { id: "C", correct: false, text: "A public bucket exposes denial prompts to anyone who can reach the URL." },
      { id: "D", correct: false, text: "CloudTrail records the API call, and it is not the invocation log that stores the model input and output bodies." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/model-invocation-logging.html"
  }
]);
