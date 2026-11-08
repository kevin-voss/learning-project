window.AIP = window.AIP || {};
AIP.registerQuestions([
  {
    id: "o-3-1-1-01",
    task: "3.1",
    skill: "3.1.1",
    domain: 3,
    difficulty: 1,
    milestone: "M2",
    chapters: ["15"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 3", "DRAFT"],
    stem: "Northwind Clinic runs a night-shift assistant for charge nurses. The written safety rule says a request for a drug dose must be refused before any model call, because a fluent answer is already too late. The current Lambda only scans the finished paragraph. Which control belongs on the input?",
    choices: [
      { id: "A", text: "Lower the temperature to 0 so the model repeats a refusal sentence it saw in training." },
      { id: "B", text: "Attach a Bedrock guardrail that evaluates the nurse prompt, including a denied topic for medication dosing, and return the blocked message when that check intervenes." },
      { id: "C", text: "Turn on a trail in CloudTrail and alert whenever InvokeModel appears in event history." },
      { id: "D", text: "Add a sentence to the system prompt that asks the model to stay silent about medicines." }
    ],
    correct: ["B"],
    why: "A guardrail evaluates the input first. When that check intervenes, Bedrock returns the blocked message and discards foundation-model inference.",
    optionExplanations: [
      { id: "A", correct: false, text: "Sampling temperature changes how tokens are chosen and does not apply a policy to the incoming prompt." },
      { id: "B", correct: true, text: "Input policies on a guardrail, including a denied topic, run before inference and can stop the model call." },
      { id: "C", correct: false, text: "CloudTrail records that an API call occurred, which is after the model has already been asked." },
      { id: "D", correct: false, text: "A system-prompt sentence is not an evaluated safety policy and can be overridden by the user text." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-how.html"
  },
  {
    id: "o-3-1-1-02",
    task: "3.1",
    skill: "3.1.1",
    domain: 3,
    difficulty: 2,
    milestone: "M2",
    chapters: ["15"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 3", "DRAFT"],
    stem: "Harbor Claims set the Insults content filter to None on prompts and to High on responses. Adjusters still get abusive customer text into the model, and only the reply is cleaned up. The claims desk wants that abusive text stopped on the way in. What should they change?",
    choices: [
      { id: "A", text: "Raise the response filter strength from High to a custom sixth level." },
      { id: "B", text: "Replace the content filter with a contextual grounding check, which scores prompts for insults." },
      { id: "C", text: "Move the same guardrail onto a VPC endpoint so network policy filters insulting words." },
      { id: "D", text: "Set an Insults filter strength on prompts so harmful user text is filtered before the model generates a reply." }
    ],
    correct: ["D"],
    why: "Content filters have separate strength for prompts and for responses. A response-only setting does not filter the user prompt.",
    optionExplanations: [
      { id: "A", correct: false, text: "Filter strength stops at High, and response strength still does not evaluate the prompt." },
      { id: "B", correct: false, text: "Contextual grounding scores a model response against a source and a query, not the tone of the user prompt." },
      { id: "C", correct: false, text: "A private endpoint changes the network path and does not classify insulting language." },
      { id: "D", correct: true, text: "Prompt-side filter strength is what blocks harmful user input before inference." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-content-filters.html"
  },
  {
    id: "o-3-1-1-03",
    task: "3.1",
    skill: "3.1.1",
    domain: 3,
    difficulty: 2,
    milestone: "M2",
    chapters: ["15"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 3", "DRAFT"],
    stem: "Lumen City wants the parks assistant to refuse requests for how to build a weapon. A custom word filter on the word gun also blocks questions about the historic cannon on the waterfront, which the parks guide is supposed to answer. The safety rule is about the subject, not one ambiguous word. Which filter matches that rule?",
    choices: [
      { id: "A", text: "Add a denied topic whose definition describes requests for instructions on building a weapon, and keep the historic-cannon questions out of that definition." },
      { id: "B", text: "Delete the waterfront page from the knowledge base so the word gun never appears in retrieval." },
      { id: "C", text: "Set every content-filter category to High, including categories that have nothing to do with weapons." },
      { id: "D", text: "Add gun, cannon, and powder as three separate profanity-list entries." }
    ],
    correct: ["A"],
    why: "A denied topic is for a subject, described with a short definition. A word filter blocks the listed string wherever it appears, including a harmless history question.",
    optionExplanations: [
      { id: "A", correct: true, text: "A precise denied-topic definition targets the forbidden subject without banning every mention of a short word." },
      { id: "B", correct: false, text: "Removing a legitimate source hides an allowed answer and still does not classify weapon-building requests." },
      { id: "C", correct: false, text: "Raising unrelated content filters blocks more harmless chat and still is not a topic definition." },
      { id: "D", correct: false, text: "Word filters match the whole word or phrase, so cannon and gun still collide with the waterfront guide." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-denied-topics.html"
  },
  {
    id: "o-3-1-1-04",
    task: "3.1",
    skill: "3.1.1",
    domain: 3,
    difficulty: 3,
    milestone: "M2",
    chapters: ["15"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 3", "DRAFT"],
    stem: "Cedar Bank uses input tags so the fraud assistant can mention scam patterns in its developer instructions without those instructions being filtered. The customer message was left outside the tags. Harmful customer requests now pass, while the developer text is the only text the guardrail reads. How should the tags be placed?",
    choices: [
      { id: "A", text: "Remove all tags so the prompt attack filter can run on the developer instructions alone." },
      { id: "B", text: "Put the tags around the developer instructions and append the customer message after the closing tag." },
      { id: "C", text: "Tag the customer message with a suffix chosen on the server for that request, and leave the developer instructions outside the tags." },
      { id: "D", text: "Publish one static tag suffix in the mobile app and let the client decide which half of the prompt is inside the tag." }
    ],
    correct: ["C"],
    why: "When input tags are present, content outside the tags is not processed by the guardrail. The untrusted customer text has to be inside the tag, and the suffix should change per request so a user cannot close the tag.",
    optionExplanations: [
      { id: "A", correct: false, text: "Removing the tags sends the developer instructions through the filters again, which is the collision the tags were added to avoid." },
      { id: "B", correct: false, text: "That is the current bug: the guardrail evaluates the developer text and skips the customer message." },
      { id: "C", correct: true, text: "Tagged customer text is evaluated, developer instructions stay outside, and a fresh server-side suffix makes the tag hard to close early." },
      { id: "D", correct: false, text: "A suffix shipped to the client is static from the attacker point of view, and the client should not choose the evaluated span." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-tagging.html"
  },
  {
    id: "o-3-1-1-05",
    task: "3.1",
    skill: "3.1.1",
    domain: 3,
    difficulty: 1,
    milestone: "M2",
    chapters: ["15"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 3", "DRAFT"],
    stem: "Fieldnote Logistics drivers have asked the yard assistant to draft threats against a warehouse crew. The safety owner wants those prompts blocked, and ordinary questions about gate hours must still go through. Which guardrail setting matches the failure?",
    choices: [
      { id: "A", text: "A sensitive-information mask for US phone numbers." },
      { id: "B", text: "A contextual grounding threshold of 0.7 with no source text supplied." },
      { id: "C", text: "A Violence content filter on user prompts, with the action set to block." },
      { id: "D", text: "An Amazon Macie discovery job on the freight-photo bucket." }
    ],
    correct: ["C"],
    why: "The Violence content filter is the category for threats of physical harm, and it can be applied to user prompts.",
    optionExplanations: [
      { id: "A", correct: false, text: "A phone-number mask looks for PII and does not classify a threat." },
      { id: "B", correct: false, text: "Grounding checks the model answer against a reference source, and it does not run as a violence filter on the prompt." },
      { id: "C", correct: true, text: "Blocking violence on the prompt stops the threatening request before the model writes the message." },
      { id: "D", correct: false, text: "Macie inspects objects already stored in S3 and does not stand in front of a live prompt." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-content-filters.html"
  },
  {
    id: "o-3-1-2-01",
    task: "3.1",
    skill: "3.1.2",
    domain: 3,
    difficulty: 1,
    milestone: "M2",
    chapters: ["15"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 3", "DRAFT"],
    stem: "Pico Retail already blocks sexual prompts. The product assistant still sometimes answers an ordinary stocking question with sexual language. Shoppers see that sentence in the chat. Which guardrail change filters the model output?",
    choices: [
      { id: "A", text: "Turn prompt strength for Sexual to None, since the input filter is already enough." },
      { id: "B", text: "Set the Sexual content filter strength on model responses so a harmful reply is blocked or replaced." },
      { id: "C", text: "Store the reply in S3 and run a weekly Macie job to delete bad chats after the shopper has read them." },
      { id: "D", text: "Increase max tokens so the model has room to apologize after the harmful sentence." }
    ],
    correct: ["B"],
    why: "Input filters and output filters are separate. A harmful reply is caught by the response-side content filter.",
    optionExplanations: [
      { id: "A", correct: false, text: "Removing the prompt filter does nothing for a reply the model has already started to generate." },
      { id: "B", correct: true, text: "Response filter strength is the control that evaluates the model text before the shopper should rely on it." },
      { id: "C", correct: false, text: "A later S3 scan does not stop the reply that is already on the screen." },
      { id: "D", correct: false, text: "A larger token budget gives the model more room to continue, not a safety policy." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-content-filters.html"
  },
  {
    id: "o-3-1-2-02",
    task: "3.1",
    skill: "3.1.2",
    domain: 3,
    difficulty: 2,
    milestone: "M2",
    chapters: ["15"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 3", "DRAFT"],
    stem: "Aster Schools forbids the study assistant from printing the name of one specific unapproved stimulant. Health-class questions about sleep still need answers, so a denied topic for all medicine is too wide. The banned string is a two-word product name. What should the guardrail use on responses?",
    choices: [
      { id: "A", text: "A grounding check with the threshold set to 1, which blocks every reply." },
      { id: "B", text: "A denied topic defined as all contents except health class." },
      { id: "C", text: "A sensitive-information filter for US social security numbers." },
      { id: "D", text: "A custom word filter that blocks that exact product name in model responses." }
    ],
    correct: ["D"],
    why: "A custom word filter blocks a listed phrase in model responses. Denied topics are for a subject definition, and the docs say not to use them as a word list or as a negative exception.",
    optionExplanations: [
      { id: "A", correct: false, text: "A grounding threshold of 1 is not a valid setting and would not target one product name." },
      { id: "B", correct: false, text: "A denied topic must not be written as a negative exception such as everything except health class." },
      { id: "C", correct: false, text: "An SSN filter looks for that identifier and will not catch a drug name." },
      { id: "D", correct: true, text: "The custom word filter is built for a short banned phrase in prompts and responses." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-word-filters.html"
  },
  {
    id: "o-3-1-2-03",
    task: "3.1",
    skill: "3.1.2",
    domain: 3,
    difficulty: 2,
    milestone: "M2",
    chapters: ["15"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 3", "DRAFT"],
    stem: "Nimbus Support must not return a customer reply that contains the two-word competitor name Blue Harbor. A denied topic is the wrong control for a short competitor name, and agents can receive the blocked message instead of a reply that prints the name. Which guardrail filter matches that name?",
    choices: [
      { id: "A", text: "Add Blue Harbor to the custom word filter so matching responses are blocked when that phrase appears." },
      { id: "B", text: "Mask email addresses and hope the phrase is classified as an email." },
      { id: "C", text: "Raise the relevance threshold to 0.99 so almost every reply is dropped." },
      { id: "D", text: "Fine-tune the model on public pages that praise Blue Harbor, then ask it to forget the name." }
    ],
    correct: ["A"],
    why: "Custom word filters match a listed phrase in model responses. That is the control for a competitor name, which the denied-topic guidance says not to handle as a topic entity.",
    optionExplanations: [
      { id: "A", correct: true, text: "A custom word filter is the phrase list for names and other short strings that must not appear in a response." },
      { id: "B", correct: false, text: "Email masking only replaces text detected as an email address." },
      { id: "C", correct: false, text: "A relevance threshold blocks answers that do not address the query, not a specific brand string." },
      { id: "D", correct: false, text: "Training on pages that use the phrase teaches the name rather than filtering the reply." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-word-filters.html"
  },
  {
    id: "o-3-1-2-04",
    task: "3.1",
    skill: "3.1.2",
    domain: 3,
    difficulty: 3,
    milestone: "M2",
    chapters: ["15"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 3", "DRAFT"],
    stem: "Northwind Clinic configured the Violence filter on model responses as Detect, which takes no action. Clinicians still see the violent wording, with only a detection flag in the trace. The clinical safety rule says the patient-facing text must be replaced by the blocked message. What change implements that rule?",
    choices: [
      { id: "A", text: "Leave Detect in place and subscribe an email alarm to the trace flag after the visit." },
      { id: "B", text: "Switch the response action from Detect to Block so a detected response is replaced with the blocked message." },
      { id: "C", text: "Set the prompt filter to Block and leave the response action on Detect." },
      { id: "D", text: "Turn off the response filter and add a second system prompt that repeats the clinic slogan." }
    ],
    correct: ["B"],
    why: "Detect records the finding and does not change the text. Block is the action that replaces a harmful model response with the configured blocked message.",
    optionExplanations: [
      { id: "A", correct: false, text: "An alarm after the visit does not change the text the clinician already saw." },
      { id: "B", correct: true, text: "Block is the guardrail action that stops the harmful response from being returned as the answer." },
      { id: "C", correct: false, text: "A prompt-side block does not rewrite a response when the response action is still Detect." },
      { id: "D", correct: false, text: "Removing the filter deletes the check, and a slogan is not an output policy." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-content-filters.html"
  },
  {
    id: "o-3-1-2-05",
    task: "3.1",
    skill: "3.1.2",
    domain: 3,
    difficulty: 1,
    milestone: "M2",
    chapters: ["15"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 3", "DRAFT"],
    stem: "Harbor Claims customers sometimes swear at the adjuster bot, and the model swears back. Compliance will accept a firm refusal, but the reply itself cannot contain profanity. The team does not want to maintain a private list of every swear word. Which guardrail feature fits?",
    choices: [
      { id: "A", text: "A regex sensitive-information filter aimed at street addresses." },
      { id: "B", text: "A knowledge base metadata filter on the claim-year attribute." },
      { id: "C", text: "The managed profanity word filter applied to model responses." },
      { id: "D", text: "A Lake Formation column grant on the claims table." }
    ],
    correct: ["C"],
    why: "The profanity word filter blocks profane words from a managed list in model responses, without a hand-written word list.",
    optionExplanations: [
      { id: "A", correct: false, text: "An address regex looks for location patterns, not profanity." },
      { id: "B", correct: false, text: "Metadata filters choose which documents are retrieved and do not edit the wording of a reply." },
      { id: "C", correct: true, text: "The managed profanity filter is the word-filter control for swear words in responses." },
      { id: "D", correct: false, text: "A column grant limits query results in a data lake and does not scan generated sentences." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-word-filters.html"
  },
  {
    id: "o-3-1-3-01",
    task: "3.1",
    skill: "3.1.3",
    domain: 3,
    difficulty: 1,
    milestone: "M2",
    chapters: ["15"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 3", "DRAFT"],
    stem: "Lumen City's pier rules say dogs stay on a leash. The assistant told a resident that pier 4 is an off-leash beach, which is not in the parks handbook. Retrieval is returning the leash rule. The city wants that invented sentence blocked. What should they turn on?",
    choices: [
      { id: "A", text: "A denied topic named Dogs, defined as any mention of pets." },
      { id: "B", text: "A word filter that blocks the word leash." },
      { id: "C", text: "A higher temperature so the model explores more beaches." },
      { id: "D", text: "A contextual grounding check that scores the reply against the retrieved handbook text and blocks answers below the threshold." }
    ],
    correct: ["D"],
    why: "The grounding check asks whether the response stays inside the reference source. New facts that are not in the source lower the grounding score and can be blocked.",
    optionExplanations: [
      { id: "A", correct: false, text: "A pet topic would also block allowed questions about the real leash rule." },
      { id: "B", correct: false, text: "Blocking the word leash hides the correct rule along with the bad answer." },
      { id: "C", correct: false, text: "Temperature does not compare the answer to the handbook." },
      { id: "D", correct: true, text: "Grounding is the guardrail check that blocks a response which is not supported by the source you pass in." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-contextual-grounding-check.html"
  },
  {
    id: "o-3-1-3-02",
    task: "3.1",
    skill: "3.1.3",
    domain: 3,
    difficulty: 2,
    milestone: "M2",
    chapters: ["15"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 3", "DRAFT"],
    stem: "Cedar Bank asked what the wire-transfer fee is. The model answered with the mortgage late fee, and that late fee really is in the fee schedule, quoted correctly. Grounding alone is letting the reply through. The banker still got the wrong product. Which check is failing to fire?",
    choices: [
      { id: "A", text: "The relevance check, because a grounded sentence can still fail to answer the user query." },
      { id: "B", text: "The prompt-attack filter, because a fee question is a jailbreak." },
      { id: "C", text: "The profanity filter, because the word fee is on the managed list." },
      { id: "D", text: "The input violence filter, because the query mentions a transfer." }
    ],
    correct: ["A"],
    why: "Grounding checks factual support in the source, while relevance checks whether the response answers the query, so a true but off-topic fee is a relevance miss.",
    optionExplanations: [
      { id: "A", correct: true, text: "Relevance is the contextual grounding score for whether the response answers the question that was asked." },
      { id: "B", correct: false, text: "A fee question is ordinary user text, not a prompt attack, and that filter does not score off-topic answers." },
      { id: "C", correct: false, text: "Profanity filtering does not decide which fee answers a question." },
      { id: "D", correct: false, text: "Violence filtering does not compare a reply to the customer question." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-contextual-grounding-check.html"
  }
]);
