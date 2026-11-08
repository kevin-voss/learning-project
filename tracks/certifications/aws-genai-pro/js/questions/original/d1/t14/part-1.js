window.AIP = window.AIP || {};
AIP.registerQuestions([
  {
    id: "o-1-4-1-01",
    task: "1.4",
    skill: "1.4.1",
    domain: 1,
    difficulty: 1,
    milestone: "M3",
    chapters: ["08"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 1","DRAFT"],
    stem: "Fieldnote Logistics wants an internal assistant to search rate cards by meaning. There is no search cluster today, and only the platform team should own IAM. The assistant has to be usable this month. Which vector-store design meets that with the least operational overhead?",
    choices: [
      { id: "A", text: "Create an Amazon Bedrock knowledge base on the rate cards in S3 and use the vector store Bedrock manages for that knowledge base." },
      { id: "B", text: "Provision an OpenSearch Service domain, enable the k-NN plugin, design shards, and write a private embedding pipeline." },
      { id: "C", text: "Store each embedding as a DynamoDB item and scan the table to compute cosine similarity on every question." },
      { id: "D", text: "Leave the rate cards only in S3 and ask the model to list the bucket on every request." }
    ],
    correct: ["A"],
    why: "A Bedrock knowledge base builds and syncs a vector store for the S3 documents, so Fieldnote Logistics does not have to run a search cluster for the first assistant.",
    optionExplanations: [
      { id: "A", correct: true, incorrect: false, text: "The knowledge base is the managed path: it embeds the rate cards and stores the vectors without a cluster the team must shard." },
      { id: "B", correct: false, incorrect: true, text: "A self-managed k-NN domain is a valid store later, but it is more operational work than a managed knowledge base for this first release." },
      { id: "C", correct: false, incorrect: true, text: "A DynamoDB scan is not a vector index and will not stay fast or simple as the card set grows." },
      { id: "D", correct: false, incorrect: true, text: "Listing an S3 bucket does not retrieve by meaning and dumps file names into the prompt." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html"
  },
  {
    id: "o-1-4-1-02",
    task: "1.4",
    skill: "1.4.1",
    domain: 1,
    difficulty: 2,
    milestone: "M3",
    chapters: ["08"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 1","DRAFT"],
    stem: "Pico Retail already runs Aurora PostgreSQL for orders inside a private VPC and will not add a second search fleet. Product-manual embeddings, on the order of two million chunks, must stay in that database and support approximate nearest neighbor search. Which architecture fits the private network constraint?",
    choices: [
      { id: "A", text: "Copy the vectors to a public OpenSearch domain that is not in the VPC so setup is faster." },
      { id: "B", text: "Enable pgvector on the Aurora PostgreSQL cluster and use that cluster as the knowledge base vector store." },
      { id: "C", text: "Store the vectors in DynamoDB and scan the table for each similarity query." },
      { id: "D", text: "Download the manual bucket into the prompt and skip a vector store." }
    ],
    correct: ["B"],
    why: "Aurora PostgreSQL with pgvector can be the vector store for a Bedrock knowledge base, so the embeddings stay in the existing private database instead of a new public cluster.",
    optionExplanations: [
      { id: "A", correct: false, incorrect: true, text: "A public OpenSearch domain adds a fleet and breaks the private-network requirement." },
      { id: "B", correct: true, incorrect: false, text: "pgvector on the existing Aurora cluster keeps approximate nearest neighbor search inside the private VPC the retailer already runs." },
      { id: "C", correct: false, incorrect: true, text: "DynamoDB is not the k-NN engine for two million vectors, and a scan will miss the latency the manuals need." },
      { id: "D", correct: false, incorrect: true, text: "Putting the manuals in the prompt does not scale to two million chunks and ignores the database they already have." }
    ],
    evidence: "https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/AuroraPostgreSQL.VectorDB.html"
  },
  {
    id: "o-1-4-2-01",
    task: "1.4",
    skill: "1.4.2",
    domain: 1,
    difficulty: 1,
    milestone: "M3",
    chapters: ["08"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 1","DRAFT"],
    stem: "Aster Schools' policy bot mixes last year's enrollment rules with this year's. Each PDF in S3 is for one school year and one campus, and a parent has already selected both. Answers must use only that pair. A larger model should not be asked to ignore old text, because latency is already tight. How should retrieval be narrowed?",
    choices: [
      { id: "A", text: "Concatenate every campus and every year into one document so the model can see the full history." },
      { id: "B", text: "Fine-tune the model on last year's rules so it prefers them." },
      { id: "C", text: "Write a metadata sidecar for each object and apply a metadata filter for school year and campus at query time." },
      { id: "D", text: "Drop metadata and raise the number of retrieved chunks." }
    ],
    correct: ["C"],
    why: "Knowledge base metadata filters run during retrieval, so the campus and school year limit which chunks are returned. That is cheaper and more precise than asking a larger model to ignore old policy.",
    optionExplanations: [
      { id: "A", correct: false, incorrect: true, text: "One combined document makes it harder to exclude last year and increases the text the model must read." },
      { id: "B", correct: false, incorrect: true, text: "Fine-tuning on last year's rules teaches the outdated policy the bot is already over-retrieving." },
      { id: "C", correct: true, incorrect: false, text: "Sidecar metadata plus a query filter restricts retrieval to the selected school year and campus." },
      { id: "D", correct: false, incorrect: true, text: "More chunks without a filter adds old rules to the prompt and hurts latency." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/kb-metadata.html"
  },
  {
    id: "o-1-4-2-02",
    task: "1.4",
    skill: "1.4.2",
    domain: 1,
    difficulty: 2,
    milestone: "M3",
    chapters: ["08"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 1","DRAFT"],
    stem: "Nimbus Support articles carry an owner, a product SKU, and a last-reviewed date. Agents who search SKU NX-440 in the networking collection are getting printer articles that are semantically close. The filter has to happen in retrieval, and the owner must remain on the indexed chunk for audit. Which design fixes the precision?",
    choices: [
      { id: "A", text: "Mention the SKU only in the system prompt and hope the model drops other products." },
      { id: "B", text: "Deploy a separate foundation model for each SKU." },
      { id: "C", text: "Remove product names from the articles so embeddings become product-agnostic." },
      { id: "D", text: "Store owner, SKU, and review date as metadata attributes, and filter the vector query to the requested SKU and collection before generation." }
    ],
    correct: ["D"],
    why: "Metadata attributes on each chunk let the retriever require the SKU and collection, while the owner stays attached for audit. A system-prompt reminder cannot pull back chunks that were never filtered.",
    optionExplanations: [
      { id: "A", correct: false, incorrect: true, text: "A system prompt does not change which chunks retrieval already returned." },
      { id: "B", correct: false, incorrect: true, text: "A model per SKU is expensive and does not index the owner on the article chunk." },
      { id: "C", correct: false, incorrect: true, text: "Stripping product names makes the exact SKU even harder to isolate." },
      { id: "D", correct: true, incorrect: false, text: "Filtering on SKU and collection metadata removes the printer articles, and the owner attribute remains for audit." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/kb-metadata.html"
  },
  {
    id: "o-1-4-2-03",
    task: "1.4",
    skill: "1.4.2",
    domain: 1,
    difficulty: 2,
    milestone: "M3",
    chapters: ["08"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 1","DRAFT"],
    stem: "Northwind Clinic stores one clinical protocol per row in a CSV, with a metadata sidecar. Retrieval must filter on department and effective date, and only the protocol text should be embedded. Last quarter the date column was embedded as if it were the protocol, and search collapsed. Latency stays acceptable only if the filter runs in retrieval. How should the file be described to the knowledge base?",
    choices: [
      { id: "A", text: "Mark the protocol text as the single content field and mark department and effective date as metadata fields in the record-based metadata configuration." },
      { id: "B", text: "Embed every column, including the date, as the protocol body." },
      { id: "C", text: "Delete the sidecar and rely on alphabetical filename order." },
      { id: "D", text: "Pass the department name as the model temperature." }
    ],
    correct: ["A"],
    why: "For a record-based CSV, the knowledge base embeds the declared content field and treats the other included columns as metadata. That keeps dates and departments available as filters instead of as the vector text.",
    optionExplanations: [
      { id: "A", correct: true, incorrect: false, text: "Declaring the protocol column as content and the department and date columns as metadata embeds the right text and keeps the filters." },
      { id: "B", correct: false, incorrect: true, text: "Embedding every column repeats the failure mode that turned the date into the protocol body." },
      { id: "C", correct: false, incorrect: true, text: "Filename order is not a department or effective-date filter." },
      { id: "D", correct: false, incorrect: true, text: "Temperature is a sampling parameter and cannot filter protocol rows." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/kb-metadata.html"
  },
  {
    id: "o-1-4-3-01",
    task: "1.4",
    skill: "1.4.3",
    domain: 1,
    difficulty: 1,
    milestone: "M3",
    chapters: ["08"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 1","DRAFT"],
    stem: "Harbor Claims put a pilot corpus in an OpenSearch Serverless vector collection. Open enrollment doubled the corpus, and search latency for adjusters exceeded the target. They want search capacity to grow with load and shrink when the queue is quiet, without designing shard replicas by hand. Which change meets the latency target with the least operational overhead?",
    choices: [
      { id: "A", text: "Freeze the index and refuse new documents until next year." },
      { id: "B", text: "Set a minimum and maximum OCU for search on the vector collection and let OpenSearch Serverless scale with usage." },
      { id: "C", text: "Move the vectors into one DynamoDB partition and scan it." },
      { id: "D", text: "Turn off vector search and filter the corpus in a spreadsheet." }
    ],
    correct: ["B"],
    why: "OpenSearch Serverless scales search OCUs between the minimum and maximum you set, so the collection can absorb open enrollment and scale back down without a hand-built shard plan.",
    optionExplanations: [
      { id: "A", correct: false, incorrect: true, text: "Freezing the index leaves the latency problem in place and blocks new claim documents." },
      { id: "B", correct: true, incorrect: false, text: "Search OCU limits let the vector collection scale out under load and scale in when traffic drops." },
      { id: "C", correct: false, incorrect: true, text: "A DynamoDB scan is not a scaled vector search and will be slower at this size." },
      { id: "D", correct: false, incorrect: true, text: "A spreadsheet filter abandons nearest-neighbor search and will not meet adjuster latency." }
    ],
    evidence: "https://docs.aws.amazon.com/opensearch-service/latest/developerguide/serverless-scaling.html"
  },
  {
    id: "o-1-4-3-02",
    task: "1.4",
    skill: "1.4.3",
    domain: 1,
    difficulty: 2,
    milestone: "M3",
    chapters: ["08"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 1","DRAFT"],
    stem: "Lumen City keeps permits, council minutes, and 311 transcripts in one OpenSearch k-NN index. Permit searches are slow because the shard that also holds minutes is hot, and a mapping change for permits forces a reindex of the minutes. Each corpus has its own latency budget. How should the indexes be split?",
    choices: [
      { id: "A", text: "Force every document onto one shard and disable replicas." },
      { id: "B", text: "Store only document IDs in the index and rank every source file in Lambda memory." },
      { id: "C", text: "Put each corpus in its own k-NN index and route a query only to the index for that corpus." },
      { id: "D", text: "Shrink the embedding dimension to 2 so the index file is smaller." }
    ],
    correct: ["C"],
    why: "Separate k-NN indexes isolate shard load and mappings. A permit query then searches the permit index only, which protects the minutes corpus and its latency budget.",
    optionExplanations: [
      { id: "A", correct: false, incorrect: true, text: "A single shard with no replicas concentrates load and removes redundancy." },
      { id: "B", correct: false, incorrect: true, text: "Loading every source file into Lambda replaces the vector index with an in-memory scan." },
      { id: "C", correct: true, incorrect: false, text: "One k-NN index per corpus stops permit traffic and permit mapping changes from dragging the minutes shard with them." },
      { id: "D", correct: false, incorrect: true, text: "A two-dimensional embedding throws away retrieval quality and still leaves one mixed index." }
    ],
    evidence: "https://docs.aws.amazon.com/opensearch-service/latest/developerguide/knn.html"
  },
  {
    id: "o-1-4-3-03",
    task: "1.4",
    skill: "1.4.3",
    domain: 1,
    difficulty: 2,
    milestone: "M3",
    chapters: ["08"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 1","DRAFT"],
    stem: "Cedar Bank's knowledge base uses hierarchical chunking over a large control library. Analysts ask narrow questions, but the model has been receiving only the tiny matching fragment, so exceptions in the parent section never arrive. Sending the whole library on every question breaks the cost cap. How should retrieval use the hierarchy?",
    choices: [
      { id: "A", text: "Turn chunking off and embed each 200-page manual as one vector." },
      { id: "B", text: "Retrieve every child chunk in the library on each question." },
      { id: "C", text: "Replace the vector store with a FIFO queue of controls." },
      { id: "D", text: "Keep hierarchical chunking so search matches the child chunk, and let the knowledge base return the parent chunk as the context for generation." }
    ],
    correct: ["D"],
    why: "With hierarchical chunking, the knowledge base retrieves child chunks and can replace them with the parent chunk in the response. The model sees the surrounding control without a full-library prompt.",
    optionExplanations: [
      { id: "A", correct: false, incorrect: true, text: "One vector per manual is a coarse embedding and still risks pulling a huge document into context." },
      { id: "B", correct: false, incorrect: true, text: "Returning every child blows the cost cap the bank set." },
      { id: "C", correct: false, incorrect: true, text: "A FIFO queue does not search by meaning or preserve parent context." },
      { id: "D", correct: true, incorrect: false, text: "Child hits stay precise, and the parent chunk supplies the exception text without sending the entire library." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/kb-test-config.html"
  },
  {
    id: "o-1-4-4-01",
    task: "1.4",
    skill: "1.4.4",
    domain: 1,
    difficulty: 1,
    milestone: "M3",
    chapters: ["08"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 1","DRAFT"],
    stem: "Fieldnote Logistics writes operating procedures in Confluence, and authors edit pages through the week. The assistant should ingest those pages without a custom crawler the platform team has to patch. Sync has to be a knowledge base data source job. Which connection meets that with the least operational overhead?",
    choices: [
      { id: "A", text: "Add the Confluence data source connector to the knowledge base and sync that data source." },
      { id: "B", text: "Copy each Confluence page into a Lambda environment variable." },
      { id: "C", text: "Screenshot each page and store the images as DynamoDB items." },
      { id: "D", text: "Email the wiki to the model once a year as a single attachment." }
    ],
    correct: ["A"],
    why: "The Confluence connector is a supported knowledge base data source. A sync job ingests the space without a crawler Fieldnote Logistics would have to operate.",
    optionExplanations: [
      { id: "A", correct: true, incorrect: false, text: "The managed Confluence connector plus a data source sync is the low-overhead way to index the wiki." },
      { id: "B", correct: false, incorrect: true, text: "Environment variables are not a document store and will not track weekly wiki edits." },
      { id: "C", correct: false, incorrect: true, text: "Screenshots in DynamoDB are not a Confluence sync and are a poor fit for procedure text." },
      { id: "D", correct: false, incorrect: true, text: "A yearly email attachment will not pick up weekly edits." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/confluence-data-source-connector.html"
  },
  {
    id: "o-1-4-4-02",
    task: "1.4",
    skill: "1.4.4",
    domain: 1,
    difficulty: 2,
    milestone: "M3",
    chapters: ["08"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 1","DRAFT"],
    stem: "Pico Retail's merchandising notes live in SharePoint libraries that only the retail tenant can open. Product PDFs are already in S3 and must be searchable in the same knowledge base. Credentials must not be a long-lived key in the browser. They want the least operational overhead. Which connection pattern fits?",
    choices: [
      { id: "A", text: "Put a SharePoint admin password in the system prompt for every store associate." },
      { id: "B", text: "Add a SharePoint data source and an S3 data source to the same knowledge base, using each connector's supported authentication, then sync both." },
      { id: "C", text: "Scrape SharePoint with an unauthenticated public crawler." },
      { id: "D", text: "Export the libraries to a laptop and upload them as a new model checkpoint." }
    ],
    correct: ["B"],
    why: "A knowledge base can attach more than one data source. The SharePoint connector and the S3 connector keep tenant authentication in the data source configuration instead of in the browser.",
    optionExplanations: [
      { id: "A", correct: false, incorrect: true, text: "A password in the prompt is exposed to associates and is not a data source connection." },
      { id: "B", correct: true, incorrect: false, text: "SharePoint and S3 connectors on one knowledge base index both corpora, with credentials held by the connector rather than the browser." },
      { id: "C", correct: false, incorrect: true, text: "An unauthenticated crawler cannot read a private SharePoint tenant." },
      { id: "D", correct: false, incorrect: true, text: "A laptop export turned into a model checkpoint does not connect either source and bakes notes into weights." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/data-source-connectors.html"
  },
  {
    id: "o-1-4-4-03",
    task: "1.4",
    skill: "1.4.4",
    domain: 1,
    difficulty: 2,
    milestone: "M3",
    chapters: ["08"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 1","DRAFT"],
    stem: "Aster Schools publishes the course catalog on a public website that changes without an S3 event. Advising notes stay in a private S3 bucket and must not be placed on the internet. Both sets need to be retrievable, and the private corpus has to remain in the school's account on the private network. How should the sources be connected?",
    choices: [
      { id: "A", text: "Publish the advising notes on the public site so one crawler can see everything." },
      { id: "B", text: "Disable both sources and answer from whatever the foundation model remembers about catalogs." },
      { id: "C", text: "Use a web crawler data source for the public catalog and a separate S3 data source for the advising notes, and do not mark the private bucket as a crawl target." },
      { id: "D", text: "Make the private bucket world-readable and point the web crawler at it." }
    ],
    correct: ["C"],
    why: "The web crawler connector indexes the public catalog, and the S3 connector indexes the private notes inside the account. Splitting the sources keeps advising notes off the public web.",
    optionExplanations: [
      { id: "A", correct: false, incorrect: true, text: "Publishing advising notes breaks the requirement that they stay off the internet." },
      { id: "B", correct: false, incorrect: true, text: "Parametric memory is not the school's catalog or its private notes." },
      { id: "C", correct: true, incorrect: false, text: "A public crawl plus a private S3 data source covers both corpora without exposing the advising bucket." },
      { id: "D", correct: false, incorrect: true, text: "A world-readable bucket exposes the private notes the school must keep in-account." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/webcrawl-data-source-connector.html"
  },
  {
    id: "o-1-4-5-01",
    task: "1.4",
    skill: "1.4.5",
    domain: 1,
    difficulty: 1,
    milestone: "M3",
    chapters: ["08"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 1","DRAFT"],
    stem: "Nimbus Support replaced a troubleshooting PDF in S3 yesterday. The knowledge base still quotes the old workaround, and the object in the bucket is already the new file. They do not want to create a second knowledge base, because that cost is out of scope. What updates the index?",
    choices: [
      { id: "A", text: "Enable S3 versioning and assume the knowledge base reads every version at query time." },
      { id: "B", text: "Fine-tune the foundation model on the old PDF so it agrees with the stale index." },
      { id: "C", text: "Rename the model ID and leave the vector store as it is." },
      { id: "D", text: "Start a data source sync so the ingestion job reindexes documents that changed." }
    ],
    correct: ["D"],
    why: "A knowledge base does not treat an S3 overwrite as a live index update. A data source sync runs an ingestion job that indexes the changed document into the vector store.",
    optionExplanations: [
      { id: "A", correct: false, incorrect: true, text: "S3 versioning retains objects and does not push those versions into the vector store at query time." },
      { id: "B", correct: false, incorrect: true, text: "Fine-tuning on the old PDF preserves the outdated workaround instead of refreshing the index." },
      { id: "C", correct: false, incorrect: true, text: "The model ID is not the index, so renaming it leaves yesterday's vectors in place." },
      { id: "D", correct: true, incorrect: false, text: "StartIngestionJob-style sync is how a changed S3 object becomes a new vector in the existing knowledge base." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/kb-data-source-sync-ingest.html"
  }
]);
