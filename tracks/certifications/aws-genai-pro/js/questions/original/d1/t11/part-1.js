window.AIP = window.AIP || {};
AIP.registerQuestions([
  {
    id: "o-1-1-3-01",
    task: "1.1",
    skill: "1.1.3",
    domain: 1,
    difficulty: 1,
    milestone: "M2",
    chapters: ["25"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 1","DRAFT"],
    stem: "Northwind Clinic is about to let a discharge-summary assistant leave a private pilot VPC and join the same platform review as every other production workload. Auditors want the operational excellence, security, reliability, performance, cost, and sustainability of that generative AI design checked before go-live, and the clinic wants the least operational overhead. Which review should the team run?",
    choices: [
      { id: "A", text: "Review the workload in the AWS Well-Architected Tool with the Generative AI Lens, and apply that lens guidance to the managed Bedrock design before go-live." },
      { id: "B", text: "Score the assistant in a local spreadsheet after it is already live, using criteria each squad invents for itself." },
      { id: "C", text: "Replace Amazon Bedrock with a self-managed GPU fleet so the review can ignore managed-service practices." },
      { id: "D", text: "Treat a Trusted Advisor report of unused EBS volumes as approval for the generative AI architecture." }
    ],
    correct: ["A"],
    why: "The Generative AI Lens is the Well-Architected review for foundation-model workloads, covering the six pillars the auditors named. A storage check or a one-off spreadsheet does not review the assistant, and standing up GPUs adds the operational load the clinic is trying to avoid.",
    optionExplanations: [
      { id: "A", correct: true, incorrect: false, text: "The Generative AI Lens extends the Well-Architected Framework to generative AI systems and is the standard, low-overhead review across the six pillars." },
      { id: "B", correct: false, incorrect: true, text: "A squad-made spreadsheet is not a shared Well-Architected review, and doing it after go-live misses the audit gate." },
      { id: "C", correct: false, incorrect: true, text: "Leaving a managed Bedrock assistant to run a private GPU fleet increases operations and is not required for the lens review." },
      { id: "D", correct: false, incorrect: true, text: "Unused-volume findings do not assess model operations, safety, reliability, or cost of the generative AI workload." }
    ],
    evidence: "https://docs.aws.amazon.com/wellarchitected/latest/generative-ai-lens/generative-ai-lens.html"
  }
]);
