window.AIP = window.AIP || {};
AIP.registerQuestions([
  {
    id: "o-1-4-5-02",
    task: "1.4",
    skill: "1.4.5",
    domain: 1,
    difficulty: 2,
    milestone: "M3",
    chapters: ["08"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 1","DRAFT"],
    stem: "Northwind Clinic updates a handful of protocol files many times an hour. A full scan of the protocol bucket on every change costs too much, and clinicians will not wait for a nightly job. They still want the managed knowledge base rather than a hand-built index. How should those frequent edits reach the vector store?",
    choices: [
      { id: "A", text: "Submit the changed documents with the knowledge base documents API so those files are indexed without scanning the whole data source." },
      { id: "B", text: "Delete the knowledge base and create it again on every file change." },
      { id: "C", text: "Load every object in the bucket into a Lambda and re-embed the corpus on each edit." },
      { id: "D", text: "Wait for the next foundation-model upgrade and expect it to refresh clinical facts." }
    ],
    correct: ["A"],
    why: "Direct ingestion indexes the documents you submit into the knowledge base vector store, so a few protocol edits do not require a full data source scan or a new knowledge base.",
    optionExplanations: [
      { id: "A", correct: true, incorrect: false, text: "IngestKnowledgeBaseDocuments writes the submitted protocol files into the vector store without crawling the entire bucket." },
      { id: "B", correct: false, incorrect: true, text: "Recreating the knowledge base on every edit is slower and more expensive than ingesting the changed files." },
      { id: "C", correct: false, incorrect: true, text: "Re-embedding the whole bucket in Lambda repeats the full-scan cost the clinic is trying to avoid." },
      { id: "D", correct: false, incorrect: true, text: "A model upgrade does not replace vectors for protocols that changed this hour." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/kb-direct-ingestion.html"
  },
  {
    id: "o-1-4-5-03",
    task: "1.4",
    skill: "1.4.5",
    domain: 1,
    difficulty: 2,
    milestone: "M7",
    chapters: ["08"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 1","DRAFT"],
    stem: "Harbor Claims' procedure space in Confluence does not emit an event the claims account can subscribe to. Editors change pages through the day, and adjusters must see those edits within an hour. A continuous full sync every minute would exhaust the ingestion budget. Auditors want a record that a sync ran. What should the team schedule?",
    choices: [
      { id: "A", text: "Sync only when an engineer remembers, and keep no job history." },
      { id: "B", text: "Run a knowledge base ingestion job on a cadence inside the one-hour bound, and retain each job's status." },
      { id: "C", text: "Paste Confluence HTML into a system prompt and never sync the data source." },
      { id: "D", text: "Invoke a cross-Region inference profile and expect that call to refresh the vector index." }
    ],
    correct: ["B"],
    why: "Confluence updates enter the vector store when an ingestion job syncs the data source. A scheduled job inside the hour, with status retained, meets freshness and audit without a sync every minute.",
    optionExplanations: [
      { id: "A", correct: false, incorrect: true, text: "An unscheduled manual sync misses the hour target and leaves auditors with no job record." },
      { id: "B", correct: true, incorrect: false, text: "A scheduled ingestion job syncs the Confluence source often enough for the hour bound and leaves a job status for audit." },
      { id: "C", correct: false, incorrect: true, text: "Prompt text is not the index, so later wiki edits never reach retrieval." },
      { id: "D", correct: false, incorrect: true, text: "Cross-Region inference routes model calls and does not sync a data source." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/kb-data-source-sync-ingest.html"
  }
]);
