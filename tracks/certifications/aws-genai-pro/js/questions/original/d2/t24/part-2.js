window.AIP = window.AIP || {};
AIP.registerQuestions([
  {
    id: "o-2-4-4-01",
    task: "2.4",
    skill: "2.4.4",
    domain: 2,
    difficulty: 1,
    milestone: "M7",
    chapters: ["05"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 2", "DRAFT"],
    stem: "Fieldnote Logistics wants easy dispatcher questions on a smaller model and unusual routing questions on a larger model in the same family. They do not want a custom scoring service. They want the least operational overhead.",
    choices: [
      { id: "A", text: "Send every question to the larger model so the application never chooses." },
      { id: "B", text: "Point the chat at a Bedrock intelligent prompt router for that model family." },
      { id: "C", text: "Ask dispatchers to pick the model from a dropdown in the browser." },
      { id: "D", text: "Fine-tune a third model and use it for both easy and unusual questions." }
    ],
    correct: ["B"],
    why: "Intelligent prompt routing exposes one endpoint that chooses a model in the family from predicted response quality and cost.",
    optionExplanations: [
      { id: "A", correct: false, text: "The larger model on every easy question removes the cost split they asked for." },
      { id: "B", correct: true, text: "The prompt router selects the family member for each request without a scoring service they operate." },
      { id: "C", correct: false, text: "A dropdown lets the caller force the expensive model and leaks the routing choice." },
      { id: "D", correct: false, text: "A fine-tune does not decide, per question, which catalog model should answer." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-routing.html"
  },
  {
    id: "o-2-4-4-02",
    task: "2.4",
    skill: "2.4.4",
    domain: 2,
    difficulty: 2,
    milestone: "M7",
    chapters: ["05"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 2", "DRAFT"],
    stem: "Pico Retail routes chats by store region, shopper tier, and whether the text is a return or a product question. Those rules change weekly, and a code deploy is too slow. Quality-based routing inside one model family is not enough, because the rules name specific model ids. They want the least operational overhead.",
    choices: [
      { id: "A", text: "Store the routing map in AWS AppConfig and have the chat function read it before calling the chosen Bedrock model." },
      { id: "B", text: "Hard-code the three rules in the Lambda source and ship a new zip every week." },
      { id: "C", text: "Use only an intelligent prompt router, which selects inside one family by predicted quality." },
      { id: "D", text: "Let the shopper pass the model id as a query string." }
    ],
    correct: ["A"],
    why: "AppConfig holds the routing map outside the function zip, so region, tier, and task rules can change without a code deploy.",
    optionExplanations: [
      { id: "A", correct: true, text: "The function reads the deployed configuration and calls the model id that map names for that shopper." },
      { id: "B", correct: false, text: "A weekly zip couples a routing change to a code release." },
      { id: "C", correct: false, text: "A prompt router optimizes inside a family by predicted quality and does not apply store tier or region rules you define." },
      { id: "D", correct: false, text: "A caller-supplied model id bypasses the retailer's routing map." }
    ],
    evidence: "https://docs.aws.amazon.com/appconfig/latest/userguide/what-is-appconfig.html"
  },
  {
    id: "o-2-4-4-03",
    task: "2.4",
    skill: "2.4.4",
    domain: 2,
    difficulty: 2,
    milestone: "M7",
    chapters: ["05"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 2", "DRAFT"],
    stem: "Aster Schools' tutoring model is busy in one EU Region during exam week. Extra capacity must stay inside the EU, and a global profile that can run in any commercial Region is not allowed. They want Bedrock to place the request, with the least operational overhead.",
    choices: [
      { id: "A", text: "Call a global cross-Region inference profile and review CloudTrail afterward for requests that left the EU." },
      { id: "B", text: "Copy each prompt to a US Region where the same model has spare capacity." },
      { id: "C", text: "Buy Provisioned Throughput in one Region and keep sending the on-demand model id." },
      { id: "D", text: "Call a geographic EU inference profile so Bedrock routes the request only among Regions in that geography." }
    ],
    correct: ["D"],
    why: "A geographic inference profile distributes requests inside its geography, which keeps exam-week overflow inside the EU.",
    optionExplanations: [
      { id: "A", correct: false, text: "A global profile may process the prompt outside the EU before anyone reads the trail." },
      { id: "B", correct: false, text: "A copy to a US Region leaves the EU boundary the school required." },
      { id: "C", correct: false, text: "Reserved capacity is unused when the call still names the on-demand model id, and it does not add EU Regions." },
      { id: "D", correct: true, text: "The EU profile routes among the EU Regions in that profile when the source Region is busy." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/cross-region-inference.html"
  }
]);
