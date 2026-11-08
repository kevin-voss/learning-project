window.AIP = window.AIP || {};
AIP.registerQuestions([
  {
    id: "o-2-4-1-01",
    task: "2.4",
    skill: "2.4.1",
    domain: 2,
    difficulty: 1,
    milestone: "M1",
    chapters: ["05"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 2", "DRAFT"],
    stem: "A Northwind Clinic triage screen must classify a one-sentence symptom note before the nurse can continue, and the result is a single JSON label. The nurse is waiting on that label. Tokens do not need to trickle onto the screen. They want the least operational overhead.",
    choices: [
      { id: "A", text: "Submit a batch inference job and poll Amazon S3 until the label file appears." },
      { id: "B", text: "Call the synchronous Converse API and return the label in that response." },
      { id: "C", text: "Open a bidirectional audio stream even though the note is text." },
      { id: "D", text: "Start a SageMaker asynchronous endpoint for each one-sentence note." }
    ],
    correct: ["B"],
    why: "Converse is the synchronous conversation API, so a short label comes back on the same call the nurse is waiting for.",
    optionExplanations: [
      { id: "A", correct: false, text: "Batch inference writes results to S3 later, so the nurse cannot continue on this click." },
      { id: "B", correct: true, text: "The Converse response contains the finished label before the triage screen moves on." },
      { id: "C", correct: false, text: "A bidirectional stream is for ongoing audio, not a one-shot text label." },
      { id: "D", correct: false, text: "An asynchronous endpoint adds a queue and an S3 round trip to a tiny request." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/models-api-compatibility.html"
  },
  {
    id: "o-2-4-1-02",
    task: "2.4",
    skill: "2.4.1",
    domain: 2,
    difficulty: 2,
    milestone: "M1",
    chapters: ["05"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 2", "DRAFT"],
    stem: "Harbor Claims summarizes 40,000 closed claim files overnight. No adjuster is waiting, and each file is an independent prompt. They want one submission and the completed summaries in Amazon S3. They want the least operational overhead.",
    choices: [
      { id: "A", text: "Open a WebSocket for every file and stream each summary to a browser that nobody has open." },
      { id: "B", text: "Call Converse in a loop from one Lambda and retry immediately on every throttle." },
      { id: "C", text: "Keep a GPU endpoint at peak size all day for a job that runs at night." },
      { id: "D", text: "Upload the prompts and start a Bedrock batch inference job that writes the outputs to S3." }
    ],
    correct: ["D"],
    why: "Batch inference accepts many prompts in one job and writes the completions to S3 asynchronously, which matches an overnight set of independent files.",
    optionExplanations: [
      { id: "A", correct: false, text: "Streaming to an empty browser does not store the overnight summaries." },
      { id: "B", correct: false, text: "A synchronous loop is bound by the function timeout and spends the quota on immediate retries." },
      { id: "C", correct: false, text: "Daytime GPU capacity sits idle for a job that only needs results by morning." },
      { id: "D", correct: true, text: "One batch job reads the prompt file and delivers the summaries to the output bucket." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/batch-inference.html"
  },
  {
    id: "o-2-4-1-03",
    task: "2.4",
    skill: "2.4.1",
    domain: 2,
    difficulty: 2,
    milestone: "M7",
    chapters: ["05"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 2", "DRAFT"],
    stem: "Lumen City's chat reply is ready in a few seconds and must be returned to API Gateway on that same call. A separate nightly archive can run much longer and must keep an execution history if it is retried. They want each path chosen for its wait, using a known workflow rather than an agent.",
    choices: [
      { id: "A", text: "Use a Synchronous Express workflow for the chat reply and a Standard workflow for the nightly archive." },
      { id: "B", text: "Use one Standard workflow for both and make the resident wait until the archive finishes." },
      { id: "C", text: "Use an Express workflow for the archive so it can run for a full day." },
      { id: "D", text: "Use a Standard callback for the chat and hold a task token in the browser overnight." }
    ],
    correct: ["A"],
    why: "Synchronous Express workflows return the result on the call and fit a few-second reply, while Standard workflows cover long runs and keep execution history.",
    optionExplanations: [
      { id: "A", correct: true, text: "The chat stays on sync Express, and the archive uses Standard, which can run far past five minutes and remains auditable." },
      { id: "B", correct: false, text: "The resident's reply would wait on the nightly archive." },
      { id: "C", correct: false, text: "Express workflows end at five minutes, so they cannot be the day-scale archive." },
      { id: "D", correct: false, text: "A callback pauses for an outside decision, which is not how a few-second chat reply returns." }
    ],
    evidence: "https://docs.aws.amazon.com/step-functions/latest/dg/concepts-standard-vs-express.html"
  },
  {
    id: "o-2-4-1-04",
    task: "2.4",
    skill: "2.4.1",
    domain: 2,
    difficulty: 3,
    milestone: "M7",
    chapters: ["05"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 2", "DRAFT"],
    stem: "Cedar Bank bought Provisioned Throughput for the model behind the teller chat. The application still passes the on-demand model id, and daytime calls throttle while the purchased capacity sits idle. Streaming has to keep working. They want the least operational overhead.",
    choices: [
      { id: "A", text: "Open a support case to disable throttling on the on-demand model id." },
      { id: "B", text: "Send the teller traffic through a batch inference job so it can use the provisioned model." },
      { id: "C", text: "Call InvokeModelWithResponseStream or ConverseStream with the provisioned model ARN as the model id." },
      { id: "D", text: "Buy a second Provisioned Throughput and keep calling the on-demand model id." }
    ],
    correct: ["C"],
    why: "Streaming calls use Provisioned Throughput when the provisioned model ARN is the model id. Batch inference does not run on provisioned models.",
    optionExplanations: [
      { id: "A", correct: false, text: "On-demand throttling remains while the application never addresses the capacity it bought." },
      { id: "B", correct: false, text: "Batch inference is not supported for provisioned models, and it does not stream a teller chat." },
      { id: "C", correct: true, text: "The streaming runtime APIs accept the provisioned model ARN, so the chat draws on the reserved capacity." },
      { id: "D", correct: false, text: "Another purchase stays idle if the caller still sends the on-demand model id." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/prov-thru-use.html"
  },
  {
    id: "o-2-4-2-01",
    task: "2.4",
    skill: "2.4.2",
    domain: 2,
    difficulty: 1,
    milestone: "M7",
    chapters: ["05"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 2", "DRAFT"],
    stem: "Fieldnote Logistics dispatchers see a blank panel until a long Bedrock answer finishes. They want the first words on screen while the model is still writing, through the API Gateway proxy in front of Lambda. They want streaming and the least operational overhead.",
    choices: [
      { id: "A", text: "Buffer the entire model response in Lambda and return it when the model stops." },
      { id: "B", text: "Stream the Lambda response through the API Gateway proxy integration, writing tokens out as they arrive from the model." },
      { id: "C", text: "Have the browser poll a new REST endpoint ten times a second for a growing string." },
      { id: "D", text: "Increase the Lambda memory setting and keep returning one buffered body." }
    ],
    correct: ["B"],
    why: "Lambda response streaming, including through an API Gateway proxy integration, sends partial output so the client receives the first bytes before the full answer exists.",
    optionExplanations: [
      { id: "A", correct: false, text: "Buffering hides every word until the model has finished." },
      { id: "B", correct: true, text: "The streamed function response pushes tokens through the existing proxy as soon as the function writes them." },
      { id: "C", correct: false, text: "High-rate polling is a series of new requests, not a stream of the model output." },
      { id: "D", correct: false, text: "More memory does not change a buffered response into incremental output." }
    ],
    evidence: "https://docs.aws.amazon.com/lambda/latest/dg/configuration-response-streaming.html"
  },
  {
    id: "o-2-4-2-02",
    task: "2.4",
    skill: "2.4.2",
    domain: 2,
    difficulty: 2,
    milestone: "M7",
    chapters: ["05"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 2", "DRAFT"],
    stem: "Pico Retail's shopper chat already uses the Converse message format and must show tokens while the model writes. They do not want a second, model-specific request body. They want streaming with the least operational overhead.",
    choices: [
      { id: "A", text: "Call ConverseStream with the same message format the shopper chat already builds." },
      { id: "B", text: "Call synchronous Converse and animate a spinner until the JSON body arrives." },
      { id: "C", text: "Switch the text chat to InvokeModelWithBidirectionalStream." },
      { id: "D", text: "Write each token into a DynamoDB item and let the app poll that item." }
    ],
    correct: ["A"],
    why: "ConverseStream is the streaming form of the Converse API, so the chat keeps one message format and receives tokens as events.",
    optionExplanations: [
      { id: "A", correct: true, text: "ConverseStream streams the Converse-style response without a separate native request body." },
      { id: "B", correct: false, text: "Synchronous Converse returns one completed body, so the panel stays blank until the end." },
      { id: "C", correct: false, text: "The bidirectional stream API is for full-duplex audio, not this text chat." },
      { id: "D", correct: false, text: "Polling a table adds a store and extra latency in front of tokens the stream API already emits." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/models-api-compatibility.html"
  },
  {
    id: "o-2-4-2-03",
    task: "2.4",
    skill: "2.4.2",
    domain: 2,
    difficulty: 2,
    milestone: "M7",
    chapters: ["05"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 2", "DRAFT"],
    stem: "Aster Schools' tutoring page must keep a connection open so the server can push the next sentence without a new student request. Short replies could have used a normal REST call, but long explanations must stream. They want that push path with the least operational overhead.",
    choices: [
      { id: "A", text: "Use a REST method and tell students to refresh when the explanation is long." },
      { id: "B", text: "Return HTTP 202 and poll a queue every tenth of a second." },
      { id: "C", text: "Email the full explanation after the model finishes." },
      { id: "D", text: "Use an API Gateway WebSocket route so the Lambda integration can push tokens on the open connection." }
    ],
    correct: ["D"],
    why: "A WebSocket API lets the service push data to the client without a new request, which covers a tutoring reply of unknown length.",
    optionExplanations: [
      { id: "A", correct: false, text: "A refresh still waits for a finished REST body and does not show words as they arrive." },
      { id: "B", correct: false, text: "Sub-second polling hammers the API for a stream the socket can push." },
      { id: "C", correct: false, text: "Email leaves the tutoring page without the explanation." },
      { id: "D", correct: true, text: "The WebSocket route stays open, and Lambda pushes each chunk to that connection." }
    ],
    evidence: "https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-websocket-api.html"
  },
  {
    id: "o-2-4-2-04",
    task: "2.4",
    skill: "2.4.2",
    domain: 2,
    difficulty: 3,
    milestone: "M7",
    chapters: ["05"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 2", "DRAFT"],
    stem: "Nimbus Support streams support answers that include a transcript and can exceed 6 MB. The buffered Lambda response fails at the payload limit, and time to first byte is already too slow. They want streaming to carry the larger body with the least operational overhead.",
    choices: [
      { id: "A", text: "Split the transcript across several synchronous REST calls and join the pieces in the browser." },
      { id: "B", text: "Gzip the answer inside a buffered response and hope the result stays under 6 MB." },
      { id: "C", text: "Use Lambda response streaming so the function can return more than the buffered 6 MB limit and send the first bytes before it finishes." },
      { id: "D", text: "Write the answer to an EC2 instance store and give the browser SSH access to read it." }
    ],
    correct: ["C"],
    why: "Streamed Lambda responses can exceed the 6 MB buffered payload limit, and the first bytes leave before the function has the full body.",
    optionExplanations: [
      { id: "A", correct: false, text: "Several REST calls are still buffered responses plus a client-side join." },
      { id: "B", correct: false, text: "Compression does not raise the buffered limit or start the download early." },
      { id: "C", correct: true, text: "Response streaming lifts the payload ceiling and improves time to first byte for the transcript answer." },
      { id: "D", correct: false, text: "SSH to a server is not the application API and exposes the host." }
    ],
    evidence: "https://docs.aws.amazon.com/lambda/latest/dg/configuration-response-streaming.html"
  },
  {
    id: "o-2-4-3-01",
    task: "2.4",
    skill: "2.4.3",
    domain: 2,
    difficulty: 1,
    milestone: "M7",
    chapters: ["05"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 2", "DRAFT"],
    stem: "Northwind Clinic's morning huddle sends a burst of on-demand model calls and starts receiving throttling errors. Callers must respect the per-model token and request quotas instead of retrying immediately. They want the least operational overhead.",
    choices: [
      { id: "A", text: "Back off when the runtime quota is exceeded, and queue or shed work instead of retrying in a tight loop." },
      { id: "B", text: "Create a new AWS account for each nurse so every huddle starts with a fresh quota." },
      { id: "C", text: "Set a workflow retry cap and also retry forever in the browser." },
      { id: "D", text: "Change the model id after every failure, including requests that failed input validation." }
    ],
    correct: ["A"],
    why: "On-demand inference is limited per model by tokens per minute and requests per minute, so immediate retries consume the same window faster.",
    optionExplanations: [
      { id: "A", correct: true, text: "Backoff and a queue give the per-model quota time to recover instead of multiplying calls." },
      { id: "B", correct: false, text: "An account per nurse splits audit and operations without fixing the retry behavior." },
      { id: "C", correct: false, text: "A browser loop with no limit ignores the cap on the workflow." },
      { id: "D", correct: false, text: "A new model id does not repair a bad request and sends it to a model the design did not choose." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/quotas-runtime.html"
  },
  {
    id: "o-2-4-3-02",
    task: "2.4",
    skill: "2.4.3",
    domain: 2,
    difficulty: 2,
    milestone: "M7",
    chapters: ["05"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 2", "DRAFT"],
    stem: "Harbor Claims runs a known intake workflow. Bedrock sometimes throttles the draft step, and that step is safe to retry. After a few failures the workflow must stop and record the failure. They want that limit in a known workflow rather than an agent that keeps calling the model.",
    choices: [
      { id: "A", text: "Retry the draft inside a Lambda loop with no sleep and no attempt counter." },
      { id: "B", text: "Add a Retry on the Bedrock task with IntervalSeconds, BackoffRate, and MaxAttempts, and a Catch that moves the execution to a fail state." },
      { id: "C", text: "Replace the task with an agent that calls the model again until the throttle goes away." },
      { id: "D", text: "Disable the workflow and have an adjuster paste each prompt into the console." }
    ],
    correct: ["B"],
    why: "A Step Functions retrier waits longer between attempts and stops at MaxAttempts, after which Catch handles the error instead of issuing another call.",
    optionExplanations: [
      { id: "A", correct: false, text: "A loop with no counter spends the token quota as fast as the throttle responses return." },
      { id: "B", correct: true, text: "Backoff and MaxAttempts bound the retries, and the Catch records the failure when they are exhausted." },
      { id: "C", correct: false, text: "An agent that keeps planning can issue more model calls than the workflow's attempt cap." },
      { id: "D", correct: false, text: "Console pasting removes the workflow and the retry limit with it." }
    ],
    evidence: "https://docs.aws.amazon.com/step-functions/latest/dg/concepts-error-handling.html"
  },
  {
    id: "o-2-4-3-03",
    task: "2.4",
    skill: "2.4.3",
    domain: 2,
    difficulty: 2,
    milestone: "M7",
    chapters: ["05"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 2", "DRAFT"],
    stem: "When Lumen City's primary model is throttling, new chats should use a smaller fallback model within a minute, and operators should switch back without a code deploy. A known outage must not become an agent that keeps calling the failing model. They want the least operational overhead.",
    choices: [
      { id: "A", text: "Redeploy the Lambda function with a new environment variable during the incident." },
      { id: "B", text: "Hard-code the fallback model id in a library and ship a release to change it." },
      { id: "C", text: "Try the primary model five times on every request before considering the fallback." },
      { id: "D", text: "Read the active model id from AWS AppConfig and publish a configuration change that points new chats at the fallback." }
    ],
    correct: ["D"],
    why: "AppConfig changes the configuration a running application reads, so the chat can flip model ids and flip back without a function deploy.",
    optionExplanations: [
      { id: "A", correct: false, text: "A function deploy is slower than a configuration update and risks shipping code during the outage." },
      { id: "B", correct: false, text: "A hard-coded id changes only when a new release is built and deployed." },
      { id: "C", correct: false, text: "Five immediate tries add load to the model that is already throttling." },
      { id: "D", correct: true, text: "A configuration deployment updates the model id the next chat reads, and a later deployment can point it back." }
    ],
    evidence: "https://docs.aws.amazon.com/appconfig/latest/userguide/what-is-appconfig.html"
  },
  {
    id: "o-2-4-3-04",
    task: "2.4",
    skill: "2.4.3",
    domain: 2,
    difficulty: 3,
    milestone: "M7",
    chapters: ["05"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 2", "DRAFT"],
    stem: "Cedar Bank's teller chat has steady weekday traffic that should use Provisioned Throughput, and a spillover path must keep streaming on demand when that capacity is fully used. Nightly batch jobs must stay on an on-demand model. They want the least operational overhead.",
    choices: [
      { id: "A", text: "Send both the chat and the nightly batch job to the provisioned model ARN." },
      { id: "B", text: "Drop the chat when provisioned capacity is busy and show an error page." },
      { id: "C", text: "Stream the teller chat with the provisioned model ARN, fall back to the on-demand model id on throttle, and keep batch inference on an on-demand model." },
      { id: "D", text: "Buy the Provisioned Throughput and keep sending the on-demand model id for every path." }
    ],
    correct: ["C"],
    why: "Streaming calls reach reserved capacity only when they pass the provisioned ARN, on-demand remains available as overflow, and batch inference does not run on provisioned models.",
    optionExplanations: [
      { id: "A", correct: false, text: "Batch inference is not supported for provisioned models, so the nightly job cannot share that ARN." },
      { id: "B", correct: false, text: "Dropping the chat ignores the on-demand spillover the tellers still need." },
      { id: "C", correct: true, text: "The chat streams against the provisioned ARN and can fall back to on-demand, while batch stays on a model that supports it." },
      { id: "D", correct: false, text: "Calls that send the on-demand model id never draw the reserved capacity." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/prov-thru-use.html"
  }
]);
