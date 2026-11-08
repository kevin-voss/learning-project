window.AIP = window.AIP || {};
AIP.LABS = AIP.LABS || [];
AIP.LABS.push(
  {
    id: "aws-kb",
    level: 3,
    title: "Knowledge base with a four-hour lifetime",
    hours: 4,
    template: "labs/cfn/level3/kb.json",
    prompt: "Real AWS only after you type the stack name to approve deletion as well as creation. Bedrock model access is checked first."
  },
  {
    id: "aws-agent",
    level: 3,
    title: "Agent and one tool",
    hours: 4,
    template: "labs/cfn/level3/agent.json",
    prompt: "The tool role cannot read the whole account. Lifetime is four hours."
  },
  {
    id: "aws-stream",
    level: 3,
    title: "MSK and Flink path",
    hours: 2,
    template: "labs/cfn/level3/stream.json",
    prompt: "Streaming labs stop after two hours."
  }
);
