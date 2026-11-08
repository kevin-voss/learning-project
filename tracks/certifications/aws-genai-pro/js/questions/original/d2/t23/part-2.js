window.AIP = window.AIP || {};
AIP.registerQuestions([
  {
    id: "o-2-3-5-03",
    task: "2.3",
    skill: "2.3.5",
    domain: 2,
    difficulty: 2,
    milestone: "M7",
    chapters: ["23"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 2", "DRAFT"],
    stem: "Nimbus Support wants 10 percent of chats on a new model id, with a rollback in minutes if error alarms fire, and without a new code deploy. The pipeline should still publish the configuration, and a bad value must not remain in production. They want the least operational overhead.",
    choices: [
      { id: "A", text: "Store the model id in AWS AppConfig, deploy it with a gradual strategy, and enable automatic rollback on a CloudWatch alarm." },
      { id: "B", text: "Bake the model id into the Lambda zip and redeploy the whole function for every percentage change." },
      { id: "C", text: "Edit the production Lambda environment variable by hand during the incident." },
      { id: "D", text: "Send all traffic to the new model immediately and record the old id only in a README." }
    ],
    correct: ["A"],
    why: "AppConfig deploys configuration apart from code, can roll that configuration out gradually, and can roll it back when a monitored alarm fires.",
    optionExplanations: [
      { id: "A", correct: true, text: "The model id is configuration, and the deployment strategy plus alarm rollback changes it without shipping a new function zip." },
      { id: "B", correct: false, text: "A zip redeploy mixes a routing change with a code release and is slower to reverse." },
      { id: "C", correct: false, text: "A hand edit has no validator and no automatic rollback if the alarm fires." },
      { id: "D", correct: false, text: "A full cutover with the previous id written only in a document is not a rollback path." }
    ],
    evidence: "https://docs.aws.amazon.com/appconfig/latest/userguide/what-is-appconfig.html"
  }
]);
