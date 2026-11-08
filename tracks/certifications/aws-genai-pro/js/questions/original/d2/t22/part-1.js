window.AIP = window.AIP || {};
AIP.registerQuestions([
  {
    id: "o-2-2-1-01",
    task: "2.2",
    skill: "2.2.1",
    domain: 2,
    difficulty: 1,
    milestone: "M3",
    chapters: ["22"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 2", "DRAFT"],
    stem: "Fieldnote Logistics wants a handbook chat on a foundation model that is already available in Amazon Bedrock. Traffic spikes at shift change, they do not own custom weights, and they will not run GPUs. They want the least operational overhead.",
    choices: [
      { id: "A", text: "Call the model with the Bedrock runtime InvokeModel or Converse API on demand, and keep the request glue in Lambda." },
      { id: "B", text: "Deploy that same catalog model to a SageMaker GPU endpoint that stays warm overnight." },
      { id: "C", text: "Run an EKS cluster whose only job is to proxy the Bedrock call." },
      { id: "D", text: "Download the weights into the browser and run the model on the dispatcher's laptop." }
    ],
    correct: ["A"],
    why: "On-demand InvokeModel and Converse serve a Bedrock catalog model without a GPU fleet, which matches a spiky handbook chat.",
    optionExplanations: [
      { id: "A", correct: true, text: "The runtime APIs call the managed model, and Lambda only prepares the request." },
      { id: "B", correct: false, text: "A warm GPU endpoint pays for capacity Bedrock already provides for this model." },
      { id: "C", correct: false, text: "A cluster in front of a managed API adds servers for a call that does not need them." },
      { id: "D", correct: false, text: "Shipping weights to a laptop exposes the model and cannot serve the shared chat." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/models-api-compatibility.html"
  },
  {
    id: "o-2-2-1-02",
    task: "2.2",
    skill: "2.2.1",
    domain: 2,
    difficulty: 2,
    milestone: "M3",
    chapters: ["22"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 2", "DRAFT"],
    stem: "Pico Retail must host a small returns classifier they trained themselves. Calls come in bursts separated by long idle gaps, cold starts are acceptable, and the model fits in a few gigabytes of memory with no GPU. They want the least operational overhead.",
    choices: [
      { id: "A", text: "Keep two SageMaker real-time GPU instances running at a fixed count." },
      { id: "B", text: "Call a Bedrock foundation model and leave the required classifier undeployed." },
      { id: "C", text: "Deploy the classifier to a SageMaker Serverless Inference endpoint so compute scales with requests and can drop to zero when idle." },
      { id: "D", text: "Run the classifier inside the store's browser extension." }
    ],
    correct: ["C"],
    why: "Serverless Inference manages capacity for intermittent models that fit its memory sizes, and it scales the endpoint down when there is no traffic.",
    optionExplanations: [
      { id: "A", correct: false, text: "A fixed GPU pair never scales to zero and is the wrong hardware for this CPU classifier." },
      { id: "B", correct: false, text: "Skipping the classifier ignores the requirement to host the model they trained." },
      { id: "C", correct: true, text: "A serverless endpoint provisions compute per request and scales to zero across the idle gaps." },
      { id: "D", correct: false, text: "A browser extension is not the shared production endpoint for a model the company must host." }
    ],
    evidence: "https://docs.aws.amazon.com/sagemaker/latest/dg/serverless-endpoints.html"
  },
  {
    id: "o-2-2-2-01",
    task: "2.2",
    skill: "2.2.2",
    domain: 2,
    difficulty: 1,
    milestone: "M3",
    chapters: ["22"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 2", "DRAFT"],
    stem: "Aster Schools is hosting an open-weight model larger than 40 GB on SageMaker. The instance has no local disk, and health checks fail while the container is still downloading weights. They want the endpoint to finish starting with the least operational overhead.",
    choices: [
      { id: "A", text: "Shrink the health check timeout to 30 seconds so failed hosts are replaced faster." },
      { id: "B", text: "Raise the EBS volume above the model size, and raise the model download timeout and the container startup health check timeout." },
      { id: "C", text: "Move the endpoint to Serverless Inference, which has no GPU and a 6 GB memory ceiling." },
      { id: "D", text: "Hot-link the weights from the public course website inside the container." }
    ],
    correct: ["B"],
    why: "Large model endpoints on instances without local disk need a larger volume plus longer download and health-check timeouts so a big artifact can finish loading.",
    optionExplanations: [
      { id: "A", correct: false, text: "A shorter health check fails the container while the download is still running." },
      { id: "B", correct: true, text: "VolumeSizeInGB, ModelDataDownloadTimeoutInSeconds, and the startup health check timeout are the settings that give a large model time to start." },
      { id: "C", correct: false, text: "Serverless Inference cannot hold a model of this size or provide a GPU." },
      { id: "D", correct: false, text: "A public website is not the model channel and exposes the weights." }
    ],
    evidence: "https://docs.aws.amazon.com/sagemaker/latest/dg/large-model-inference-hosting.html"
  },
  {
    id: "o-2-2-2-02",
    task: "2.2",
    skill: "2.2.2",
    domain: 2,
    difficulty: 2,
    milestone: "M3",
    chapters: ["22"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 2", "DRAFT"],
    stem: "Nimbus Support must serve an open-weight text model on GPUs they manage. The container should batch requests and scale workers on the instance. They do not want to write a model server. They want the least operational overhead for the serving stack.",
    choices: [
      { id: "A", text: "Shell out from Lambda to a Python script that loads the weights on every request." },
      { id: "B", text: "Put the model behind one EC2 instance running a hand-written Flask server with no health checks." },
      { id: "C", text: "Use SageMaker Serverless Inference for the GPU workload." },
      { id: "D", text: "Deploy a DJL Serving deep learning container on SageMaker so the container serves the artifacts, batches requests, and scales workers." }
    ],
    correct: ["D"],
    why: "DJL Serving containers on SageMaker host the artifacts with GPU support and dynamic batching, so the team does not write a server.",
    optionExplanations: [
      { id: "A", correct: false, text: "Lambda is not a GPU host, and loading the weights on every call will not finish in time." },
      { id: "B", correct: false, text: "A single Flask instance is a custom server and a single point of failure." },
      { id: "C", correct: false, text: "Serverless Inference does not provide GPUs for this model." },
      { id: "D", correct: true, text: "A DJL Serving container is the managed runtime that batches and serves the model on the SageMaker GPU instance." }
    ],
    evidence: "https://docs.aws.amazon.com/sagemaker/latest/dg/deploy-models-frameworks-djl-serving.html"
  },
  {
    id: "o-2-2-2-03",
    task: "2.2",
    skill: "2.2.2",
    domain: 2,
    difficulty: 2,
    milestone: "M3",
    chapters: ["22"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 2", "DRAFT"],
    stem: "Northwind Clinic runs a nightly model over imaging metadata payloads of several hundred megabytes. A single item can take close to an hour, and clinicians do not wait on the HTTP call. The endpoint should scale down when the queue is empty. They want the least operational overhead.",
    choices: [
      { id: "A", text: "Host the model as a SageMaker asynchronous endpoint, put each payload in Amazon S3, and call InvokeEndpointAsync." },
      { id: "B", text: "Call a real-time endpoint with the payload inline and hold the HTTP connection open for the full hour." },
      { id: "C", text: "Invoke the model through an API Gateway REST integration that must return within about 29 seconds." },
      { id: "D", text: "Start a new SageMaker training job for every image and treat the training cluster as the API." }
    ],
    correct: ["A"],
    why: "Asynchronous inference queues large S3 payloads, allows processing up to an hour, and can scale the instance count to zero when nothing is waiting.",
    optionExplanations: [
      { id: "A", correct: true, text: "InvokeEndpointAsync takes the S3 payload, queues it, and writes the result back to S3 without holding a caller connection." },
      { id: "B", correct: false, text: "A real-time call is the wrong shape for a payload of this size and a wait this long." },
      { id: "C", correct: false, text: "The REST integration times out long before an hour-long model finishes." },
      { id: "D", correct: false, text: "A training job is not the inference API and adds a new cluster for every image." }
    ],
    evidence: "https://docs.aws.amazon.com/sagemaker/latest/dg/async-inference.html"
  },
  {
    id: "o-2-2-3-01",
    task: "2.2",
    skill: "2.2.3",
    domain: 2,
    difficulty: 1,
    milestone: "M3",
    chapters: ["22"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 2", "DRAFT"],
    stem: "Harbor Claims answers thousands of short policy questions and a handful of long coverage memos. Simple prompts should land on a cheaper model in the same family, and harder prompts on a stronger one. They do not want to operate a router. They want the least operational overhead.",
    choices: [
      { id: "A", text: "Always call the largest model so no routing decision is required." },
      { id: "B", text: "Fine-tune a new model on the policy manual and retire the catalog models." },
      { id: "C", text: "Send requests to an Amazon Bedrock intelligent prompt router that predicts response quality and chooses a model in that family." },
      { id: "D", text: "Let each adjuster pass a model id query parameter from the browser." }
    ],
    correct: ["C"],
    why: "Intelligent prompt routing is a serverless endpoint that selects a model in the family from the predicted quality and cost of the response.",
    optionExplanations: [
      { id: "A", correct: false, text: "The largest model on every short question spends the budget the router is there to reduce." },
      { id: "B", correct: false, text: "Fine-tuning does not sort an easy prompt from a hard one at request time." },
      { id: "C", correct: true, text: "The prompt router picks the family member whose predicted quality is worth the cost for that prompt." },
      { id: "D", correct: false, text: "A browser parameter lets the client force the expensive model and moves the decision out of the service." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-routing.html"
  },
  {
    id: "o-2-2-3-02",
    task: "2.2",
    skill: "2.2.3",
    domain: 2,
    difficulty: 2,
    milestone: "M3",
    chapters: ["22"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 2", "DRAFT"],
    stem: "Lumen City already trusts a fallback model for most resident questions. They will pay for a stronger model in the same family only when the predicted quality gap is large enough. That threshold must live in the router configuration, not in application code. They want the least operational overhead.",
    choices: [
      { id: "A", text: "Hard-code a 100-character cutoff in Lambda and send longer text to the larger model." },
      { id: "B", text: "Configure the prompt router's fallback model and routing criteria so the fallback is used unless the quality difference justifies the other model." },
      { id: "C", text: "Run both models on every request and return whichever answer is longer." },
      { id: "D", text: "Host two SageMaker endpoints and write a custom scoring service on EKS." }
    ],
    correct: ["B"],
    why: "Routing criteria compare predicted quality with the fallback model and send the request to the other model only when the configured gap is met.",
    optionExplanations: [
      { id: "A", correct: false, text: "Character length is not response quality, and changing the cutoff requires a code deploy." },
      { id: "B", correct: true, text: "The router configuration holds the fallback model and the quality difference that triggers the stronger model." },
      { id: "C", correct: false, text: "Calling both models on every request ignores the threshold and doubles the spend." },
      { id: "D", correct: false, text: "A custom scorer on EKS is the operational overhead the managed router avoids." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-routing.html"
  }
]);
