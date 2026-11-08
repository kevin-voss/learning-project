window.AIP = window.AIP || {};

AIP.CAPSTONES = [
  { id: "v1", title: "Ground", hours: 72, cost: "$15–45 for v1–v3 together", summary: "A private knowledge base answers one policy question and cites the passage.", needs: ["M6"] },
  { id: "v2", title: "Orchestrate", hours: 72, cost: "Included in the v1–v3 range", summary: "A known workflow opens a ticket. An agent is used only when the next tool is not known.", needs: ["M6", "v1"] },
  { id: "v3", title: "Prove", hours: 72, cost: "Included in the v1–v3 range", summary: "An evaluation set gates the release. A weak retrieval score stops the deploy.", needs: ["M6", "v2"] },
  { id: "v4", title: "Operate", hours: 168, cost: "$10–25", summary: "Metrics, a cost tag, and the readiness page. Lifetime is seven days.", needs: ["M6", "M7", "v3"] }
];
