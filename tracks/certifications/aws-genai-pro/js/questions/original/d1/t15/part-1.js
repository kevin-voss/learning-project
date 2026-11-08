window.AIP = window.AIP || {};
AIP.registerQuestions([
  {
    id: "o-1-5-1-01",
    task: "1.5",
    skill: "1.5.1",
    domain: 1,
    difficulty: 1,
    milestone: "M7",
    chapters: ["09"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 1","DRAFT"],
    stem: "Lumen City's permit steps are split in the middle of a numbered instruction, so a retrieved chunk says to tighten a fitting and omits the warning in the next sentence. Inspectors need the warning kept with the step. The city wants to stay on knowledge base chunking settings rather than hand-splitting every manual. Which chunking change fits, with the least operational overhead?",
    choices: [
      { id: "A", text: "Set the maximum chunk size to one token." },
      { id: "B", text: "Disable retrieval and paste the entire permit manual into every prompt." },
      { id: "C", text: "Move from a very small fixed-size window to semantic chunking, or to a larger fixed size with overlap, so the warning stays in the same chunk as the step." },
      { id: "D", text: "Fine-tune the model on half-sentences so it prefers broken steps." }
    ],
    correct: ["C"],
    why: "Fixed-size chunking cuts on a token count and can sever a step from its warning. Semantic chunking, or a larger window with overlap, keeps that instruction together without a manual split.",
    optionExplanations: [
      { id: "A", correct: false, incorrect: true, text: "A one-token chunk guarantees the warning is separated from the instruction." },
      { id: "B", correct: false, incorrect: true, text: "Pasting the whole manual drops retrieval and blows the context budget on every inspection." },
      { id: "C", correct: true, incorrect: false, text: "Semantic chunking or a larger overlapping window is a knowledge base setting that keeps the warning with the step." },
      { id: "D", correct: false, incorrect: true, text: "Fine-tuning on broken sentences teaches the failure instead of fixing how documents are chunked." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/kb-chunking.html"
  },
  {
    id: "o-1-5-1-02",
    task: "1.5",
    skill: "1.5.1",
    domain: 1,
    difficulty: 2,
    milestone: "M7",
    chapters: ["09"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 1","DRAFT"],
    stem: "Cedar Bank fee schedules are tables. Fixed-size chunking has been cutting a row away from its column headers, so the retrieved text no longer says which fee the number is. The table for a product fits on one page and is well under 10,000 characters. They need the header context back without embedding the entire product library as one vector, because that would blow the cost of each prompt. How should chunking treat the table?",
    choices: [
      { id: "A", text: "Leave the aggressive fixed-size split in place and hope the next chunk is requested by ID." },
      { id: "B", text: "Choose no parsing and embed only the first numeric cell of each file." },
      { id: "C", text: "Set chunk overlap to zero and max tokens to the length of one word." },
      { id: "D", text: "Parse the schedule so the table is represented as a table, and use knowledge base chunking that can attach the full table as context when a row matches." }
    ],
    correct: ["D"],
    why: "When table content is parsed and the table is within the size limit, the knowledge base can attach the broader table context to a matching chunk. The header then returns with the row.",
    optionExplanations: [
      { id: "A", correct: false, incorrect: true, text: "Retrieval does not automatically fetch the next fixed-size piece by ID, so the header stays missing." },
      { id: "B", correct: false, incorrect: true, text: "Embedding a single cell drops both the header and the rest of the fee row." },
      { id: "C", correct: false, incorrect: true, text: "One-word chunks with no overlap split the table even more finely." },
      { id: "D", correct: true, incorrect: false, text: "Parsed table content lets a matching row come back with the surrounding table, which restores the column headers." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/kb-chunking.html"
  },
  {
    id: "o-1-5-1-03",
    task: "1.5",
    skill: "1.5.1",
    domain: 1,
    difficulty: 2,
    milestone: "M7",
    chapters: ["09"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 1","DRAFT"],
    stem: "Fieldnote Logistics indexes short status codes such as HOLD-QR and long damage narratives with one fixed window. The codes are being glued to unrelated paragraphs, and the embedding cost doubles when overlap stores those mixed chunks twice. They can run a Lambda during ingestion. How should the two kinds of text be chunked?",
    choices: [
      { id: "A", text: "Use a custom transformation Lambda to emit status codes as their own short documents and to split narratives on paragraph boundaries, with knowledge base chunking set so that Lambda output is what gets embedded." },
      { id: "B", text: "Set chunk overlap larger than the chunk size so every token is stored many times." },
      { id: "C", text: "Embed the whole warehouse export as a single string and skip a chunking configuration." },
      { id: "D", text: "Leave chunking unchanged and raise the generation temperature instead." }
    ],
    correct: ["A"],
    why: "A custom transformation Lambda can chunk during ingestion, which lets status codes stay atomic and narratives split on paragraphs. Overlap larger than the chunk size only multiplies embedding cost.",
    optionExplanations: [
      { id: "A", correct: true, incorrect: false, text: "The ingestion Lambda can apply a different split to codes and narratives before those pieces are embedded." },
      { id: "B", correct: false, incorrect: true, text: "Overlap larger than the chunk duplicates tokens and raises embedding cost without separating codes from narratives." },
      { id: "C", correct: false, incorrect: true, text: "One string for the whole export makes the mixed-content problem worse." },
      { id: "D", correct: false, incorrect: true, text: "Temperature changes generation and does not change how documents were chunked." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/kb-chunking.html"
  },
  {
    id: "o-1-5-2-01",
    task: "1.5",
    skill: "1.5.2",
    domain: 1,
    difficulty: 1,
    milestone: "M7",
    chapters: ["09"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 1","DRAFT"],
    stem: "Pico Retail indexed product manuals with Amazon Titan Text Embeddings V2 at the default dimension. A developer then embedded queries with a different model, and nearest-neighbor results collapsed. Reindexing is acceptable. Mixing two vector spaces in one field is not. How do they restore search without a surprise jump in ingestion cost?",
    choices: [
      { id: "A", text: "Send the query to a chat model and treat the generated sentence as if it were a vector." },
      { id: "B", text: "Embed every query with the same Titan Text Embeddings V2 model and dimension used at indexing, and reindex if either the model or the dimension changes." },
      { id: "C", text: "Average a Titan vector and a second model's vector into the same field." },
      { id: "D", text: "Change the distance metric from inside the prompt text instead of in the index." }
    ],
    correct: ["B"],
    why: "The embedding model and dimension define the vector space. Queries must use the same Titan Text Embeddings V2 setup as the index, and a change of model or dimension means a reindex, not a mix of vectors.",
    optionExplanations: [
      { id: "A", correct: false, incorrect: true, text: "A chat completion is text, not a vector in the index's embedding space." },
      { id: "B", correct: true, incorrect: false, text: "Matching the Titan model and dimension on the query path restores similarity, and a real change requires a reindex." },
      { id: "C", correct: false, incorrect: true, text: "Averaging two models' vectors mixes incompatible spaces in one field." },
      { id: "D", correct: false, incorrect: true, text: "The distance metric is an index setting, and prompt wording does not compare vectors." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/titan-embedding-models.html"
  },
  {
    id: "o-1-5-2-02",
    task: "1.5",
    skill: "1.5.2",
    domain: 1,
    difficulty: 2,
    milestone: "M7",
    chapters: ["09"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 1","DRAFT"],
    stem: "Aster Schools stores parent letters in English and Spanish in one knowledge base. The current English-only embedding model misses Spanish queries that paraphrase an English policy. They want a single index, not a translation service they must operate, and recall matters more than shrinking the vector. Least operational overhead rules out a second translation pipeline. Which embedding choice fits?",
    choices: [
      { id: "A", text: "Keep the English-only model, because vectors are language-agnostic by definition." },
      { id: "B", text: "Use the generative chat model as the embedding model to avoid a second model ID." },
      { id: "C", text: "Select a Bedrock embedding model whose supported languages include English and Spanish, then reindex the letters with that model and use it for queries too." },
      { id: "D", text: "Store Spanish letters as metadata only and embed the word document for every file." }
    ],
    correct: ["C"],
    why: "Retrieval quality follows the embedding model's language coverage. An embedding model that supports both languages, used for both indexing and queries, is what makes one index serve Spanish paraphrases.",
    optionExplanations: [
      { id: "A", correct: false, incorrect: true, text: "An English-only embedding model does not place Spanish paraphrases near the English policy." },
      { id: "B", correct: false, incorrect: true, text: "A generative chat model is not the embedding model the knowledge base uses to build the index." },
      { id: "C", correct: true, incorrect: false, text: "A bilingual embedding model, applied consistently and followed by a reindex, is how one index serves both languages." },
      { id: "D", correct: false, incorrect: true, text: "Embedding a constant word and hiding Spanish in metadata removes the letter text from similarity search." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base-supported.html"
  },
  {
    id: "o-1-5-2-03",
    task: "1.5",
    skill: "1.5.2",
    domain: 1,
    difficulty: 2,
    milestone: "M7",
    chapters: ["09"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 1","DRAFT"],
    stem: "Nimbus Support will embed about a million archived chats overnight and also embed live agent queries during the day. Both paths should use Titan Text Embeddings, and the archive job must not sit on the interactive path. Backfill cost and agent latency both matter, and the vector dimension must match. Which embedding plan fits?",
    choices: [
      { id: "A", text: "Call the batch job endpoint for each agent keystroke." },
      { id: "B", text: "Embed the archive at 256 dimensions and the live queries at 1,024 dimensions." },
      { id: "C", text: "Skip embeddings and rank archived chats by file size." },
      { id: "D", text: "Use a throughput-oriented Titan embedding batch job for the archive, and use the latency-optimized Titan invocation for live queries, with the same model ID and output dimension." }
    ],
    correct: ["D"],
    why: "Titan Text Embeddings offers batch invocation for indexing throughput and a latency-optimized path for retrieval. The model ID and dimension still have to match or the live query is not in the archive's vector space.",
    optionExplanations: [
      { id: "A", correct: false, incorrect: true, text: "The batch path is for indexing throughput, not for a keystroke-level query." },
      { id: "B", correct: false, incorrect: true, text: "Different output dimensions cannot be compared in one k-NN field." },
      { id: "C", correct: false, incorrect: true, text: "File size is not a semantic embedding and will not find the relevant chat." },
      { id: "D", correct: true, incorrect: false, text: "Batch covers the overnight archive, the low-latency invocation covers live queries, and one model and dimension keeps the vectors comparable." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/titan-embedding-models.html"
  },
  {
    id: "o-1-5-3-01",
    task: "1.5",
    skill: "1.5.3",
    domain: 1,
    difficulty: 1,
    milestone: "M7",
    chapters: ["09"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 1","DRAFT"],
    stem: "Northwind Clinic wants the nursing assistant to fetch protocol passages and show the source chunks before any answer is written. They want the managed retrieval operation rather than a workstation looping over vectors. Least operational overhead is the constraint. Which call should the app make?",
    choices: [
      { id: "A", text: "Call the knowledge base Retrieve API and return the source chunks to the application." },
      { id: "B", text: "Download the vector index and compute cosine similarity on a ward workstation." },
      { id: "C", text: "Ask the chat model for protocols it remembers from pretraining." },
      { id: "D", text: "Scan every S3 object on each question and prompt the model with the full bucket." }
    ],
    correct: ["A"],
    why: "Retrieve returns matching source chunks from the knowledge base without generating an answer and without a local similarity loop.",
    optionExplanations: [
      { id: "A", correct: true, incorrect: false, text: "The Retrieve API is the managed call that returns source chunks for the application to show." },
      { id: "B", correct: false, incorrect: true, text: "A ward workstation running cosine similarity is more to operate and takes clinical data out of the managed store." },
      { id: "C", correct: false, incorrect: true, text: "Pretraining memory is not the clinic's protocol index and does not return source chunks." },
      { id: "D", correct: false, incorrect: true, text: "Scanning the bucket on every question is slow and does not use the vector index." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/kb-test-retrieve.html"
  },
  {
    id: "o-1-5-3-02",
    task: "1.5",
    skill: "1.5.3",
    domain: 1,
    difficulty: 2,
    milestone: "M7",
    chapters: ["09"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 1","DRAFT"],
    stem: "Harbor Claims already stores embeddings in Aurora PostgreSQL with pgvector inside the claims VPC. Similarity search must not leave that private network. Results have to be filtered by line of business, and only the matching passages should be sent to Bedrock for the draft. Where should the vector query run?",
    choices: [
      { id: "A", text: "Replicate the vectors to a public OpenSearch domain for convenience." },
      { id: "B", text: "Run the pgvector similarity query in the private Aurora cluster, filter by line of business in SQL, and send only the matching passages to Bedrock." },
      { id: "C", text: "Select the ten newest rows instead of the nearest vectors." },
      { id: "D", text: "Compare embeddings in a spreadsheet and disable pgvector." }
    ],
    correct: ["B"],
    why: "pgvector on the private Aurora cluster performs the similarity search and the line-of-business filter in place. Bedrock then sees only the passages required for the draft.",
    optionExplanations: [
      { id: "A", correct: false, incorrect: true, text: "A public OpenSearch replica leaves the VPC, which breaks the private-network constraint." },
      { id: "B", correct: true, incorrect: false, text: "The nearest-neighbor query and the line-of-business filter stay in private Aurora, and only the hits go to the model." },
      { id: "C", correct: false, incorrect: true, text: "Newest rows are not the passages nearest to the query vector." },
      { id: "D", correct: false, incorrect: true, text: "A spreadsheet comparison abandons pgvector and will not meet a claims workload." }
    ],
    evidence: "https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/AuroraPostgreSQL.VectorDB.html"
  },
  {
    id: "o-1-5-3-03",
    task: "1.5",
    skill: "1.5.3",
    domain: 1,
    difficulty: 2,
    milestone: "M7",
    chapters: ["09"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 1","DRAFT"],
    stem: "Lumen City's custom OpenSearch index holds millions of permit vectors. Exact scoring across the whole index misses the inspector latency target. Queries also filter by borough. The index was created for nearest-neighbor search. Which query should they run?",
    choices: [
      { id: "A", text: "Use a match_all query and sort by document ID." },
      { id: "B", text: "Load every vector into a Lambda and compute distances in memory." },
      { id: "C", text: "Query the knn_vector field with approximate nearest neighbors, keep index.knn enabled, match the embedding dimension, and apply the borough filter." },
      { id: "D", text: "Store the vectors as comma-separated text and use a wildcard query." }
    ],
    correct: ["C"],
    why: "OpenSearch k-NN search uses a knn_vector field on an index with index.knn enabled. Approximate nearest neighbors plus a borough filter meets the latency target that a full exact scan misses.",
    optionExplanations: [
      { id: "A", correct: false, incorrect: true, text: "Sorting by document ID ignores the query vector and the borough." },
      { id: "B", correct: false, incorrect: true, text: "Loading millions of vectors into Lambda is the brute-force path that already misses the latency target." },
      { id: "C", correct: true, incorrect: false, text: "Approximate k-NN on the knn_vector field, with a matching dimension and a borough filter, is the scaled query for this index." },
      { id: "D", correct: false, incorrect: true, text: "A wildcard over comma-separated text is not a k-NN query." }
    ],
    evidence: "https://docs.aws.amazon.com/opensearch-service/latest/developerguide/knn.html"
  },
  {
    id: "o-1-5-4-01",
    task: "1.5",
    skill: "1.5.4",
    domain: 1,
    difficulty: 1,
    milestone: "M7",
    chapters: ["09"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 1","DRAFT"],
    stem: "Cedar Bank users search for exact form numbers such as SAR-17B and also for concepts such as structuring. Pure semantic search misses the form number. The knowledge base vector store supports hybrid search. They want both behaviors with the least operational overhead. Which search type should they set?",
    choices: [
      { id: "A", text: "Delete form numbers from the documents so semantic search has less text to consider." },
      { id: "B", text: "Tell users to avoid exact identifiers." },
      { id: "C", text: "Raise the generation temperature until the model invents the form text." },
      { id: "D", text: "Set the knowledge base search type to HYBRID so keyword matching and semantic retrieval run together." }
    ],
    correct: ["D"],
    why: "Hybrid search combines keyword and vector retrieval, so an exact form number and a conceptual query can both return candidates from a store that supports it.",
    optionExplanations: [
      { id: "A", correct: false, incorrect: true, text: "Deleting form numbers removes the exact token users are searching for." },
      { id: "B", correct: false, incorrect: true, text: "Asking users to stop searching for form numbers abandons the requirement." },
      { id: "C", correct: false, incorrect: true, text: "Temperature does not retrieve a document that semantic search failed to find." },
      { id: "D", correct: true, incorrect: false, text: "HYBRID is the knowledge base search type that runs keyword and semantic retrieval together." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/kb-test-config.html"
  },
  {
    id: "o-1-5-4-02",
    task: "1.5",
    skill: "1.5.4",
    domain: 1,
    difficulty: 2,
    milestone: "M7",
    chapters: ["09"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 1","DRAFT"],
    stem: "Fieldnote Logistics retrieves 40 chunks for each damage question so the right paragraph is somewhere in the list. The model then attends to a loosely related chunk, and the prompt cost is high. They want fewer, more relevant chunks before generation, and they want lower latency. What should they add?",
    choices: [
      { id: "A", text: "Rerank the retrieved chunks with a Bedrock reranker and pass only the top results to the generator." },
      { id: "B", text: "Send all 40 chunks plus the next 40 chunks by document ID." },
      { id: "C", text: "Turn retrieval off and let the model answer from memory." },
      { id: "D", text: "Rerank the entire corpus inside the browser on every query." }
    ],
    correct: ["A"],
    why: "A reranker reorders the retrieved documents by relevance to the query. Keeping only the top results cuts token cost and latency versus stuffing 40 weak chunks into the prompt.",
    optionExplanations: [
      { id: "A", correct: true, incorrect: false, text: "Bedrock rerank scores the retrieved set and lets the generator see a shorter, more relevant list." },
      { id: "B", correct: false, incorrect: true, text: "Adding more chunks increases cost and does not push the loose match down the list." },
      { id: "C", correct: false, incorrect: true, text: "Dropping retrieval leaves the model without the damage file." },
      { id: "D", correct: false, incorrect: true, text: "Reranking the whole corpus in the browser is slow and is not the managed rerank API." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/rerank.html"
  },
  {
    id: "o-1-5-4-03",
    task: "1.5",
    skill: "1.5.4",
    domain: 1,
    difficulty: 2,
    milestone: "M7",
    chapters: ["09"],
    source: "original",
    review: "draft",
    badges: ["DOMAIN 1","DRAFT"],
    stem: "Pico Retail searches fail in two ways. SKU BX-9 never enters the candidate list under semantic search alone, and when a SKU chunk is present the top hit is still a generic care label. Latency must stay interactive, so they cannot rerank the entire catalog. Which retrieval sequence fixes both failures?",
    choices: [
      { id: "A", text: "Rerank an empty candidate list and expect the SKU document to appear." },
      { id: "B", text: "Use hybrid search so the exact SKU can enter the candidate set, then rerank that set and keep the top results." },
      { id: "C", text: "Stay on semantic search only and use a larger chat model to guess SKUs." },
      { id: "D", text: "Disable keyword matching and metadata, then increase temperature." }
    ],
    correct: ["B"],
    why: "Hybrid search can retrieve the exact SKU that semantic search missed. A reranker only reorders documents it is given, so it must run on that candidate set, not on an empty list or the whole catalog.",
    optionExplanations: [
      { id: "A", correct: false, incorrect: true, text: "A reranker reorders the documents it receives and cannot invent a SKU that was never retrieved." },
      { id: "B", correct: true, incorrect: false, text: "Hybrid retrieval gets BX-9 into the candidate set, and reranking that set sinks the generic care label." },
      { id: "C", correct: false, incorrect: true, text: "A larger chat model does not repair a candidate list that omitted the SKU." },
      { id: "D", correct: false, incorrect: true, text: "Removing keyword matching keeps the exact SKU out of the set, and temperature does not rerank." }
    ],
    evidence: "https://docs.aws.amazon.com/bedrock/latest/userguide/rerank.html"
  }
]);
