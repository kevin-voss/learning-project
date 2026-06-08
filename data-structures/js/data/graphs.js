window.DS = window.DS || {};
DS.curriculum = DS.curriculum || [];

DS.curriculum.push(
{
    id: 'graphs',
    title: 'Graphs',
    icon: 'fa-circle-nodes',
    number: '07',
    subtitle: 'Nodes connected by edges in any pattern — the most flexible structure for modeling relationships.',
    analogy: 'Think of a map of friends. Alice knows Bob and Carlos. Bob knows Dana. Carlos also knows Dana. There is no single "top" person; everyone is just a node connected to other nodes. A route through the graph is a path. A loop, like Alice → Bob → Dana → Carlos → Alice, is a cycle. Google Maps works the same way: intersections are nodes, roads are edges, and route-finding is graph traversal.',
    realWorldExample: {
      title: 'Finding friends-of-friends',
      desc: 'A social app can model each person as a node and each friendship as an edge. BFS can find people one friendship away, then two friendships away, then three. DFS can follow one friendship chain deeply, which is useful for exploring connected groups or detecting loops.',
    },
    whatIsIt: 'A graph is a collection of vertices (nodes) plus edges (connections). A tree is a special graph with one root and no cycles; a graph is more general and can connect in any pattern. Edges can be directed (one-way, like "follows" on social media), undirected (two-way, like friendship), weighted (distance or cost), or unweighted. Beginners usually store a graph as an adjacency list: each node keeps a list of its direct neighbors.',
    whyUse: 'Use graphs when the important question is "how are these things connected?" BFS (Breadth-First Search) explores nearby nodes first, like ripples spreading out from a start point, so it is great for shortest path in an unweighted graph. DFS (Depth-First Search) follows one path as far as it can, then backtracks, so it is great for exploring all possibilities, detecting cycles, and solving maze-like problems.',
    whenToUse: [
      { icon: 'fa-map-location-dot', title: 'Navigation & routing', desc: 'BFS for fewest hops; weighted algorithms for real road distances.' },
      { icon: 'fa-users', title: 'Social networks', desc: 'Friend connections, recommendations, influence analysis.' },
      { icon: 'fa-diagram-project', title: 'Dependency management', desc: 'DFS helps follow chains and detect circular dependencies.' },
      { icon: 'fa-shield-halved', title: 'Network analysis', desc: 'Find reachable nodes, clusters, and important connections.' },
    ],
    codeExample: `<span class="cm">// === Graph using Adjacency List ===</span>

<span class="kw">class</span> <span class="cls">Graph</span> {
  <span class="fn">constructor</span>() {
    <span class="kw">this</span>.adjacencyList <span class="op">=</span> {};
  }

  <span class="cm">// Add a vertex — O(1)</span>
  <span class="fn">addVertex</span>(vertex) {
    <span class="kw">if</span> (<span class="op">!</span><span class="kw">this</span>.adjacencyList[vertex]) {
      <span class="kw">this</span>.adjacencyList[vertex] <span class="op">=</span> [];
    }
  }

  <span class="cm">// Add an undirected edge — O(1)</span>
  <span class="fn">addEdge</span>(v1, v2, weight <span class="op">=</span> <span class="num">1</span>) {
    <span class="kw">this</span>.adjacencyList[v1].<span class="fn">push</span>({ node: v2, weight });
    <span class="kw">this</span>.adjacencyList[v2].<span class="fn">push</span>({ node: v1, weight });
  }

  <span class="cm">// Remove an edge — O(E)</span>
  <span class="fn">removeEdge</span>(v1, v2) {
    <span class="kw">this</span>.adjacencyList[v1] <span class="op">=</span> <span class="kw">this</span>.adjacencyList[v1]
      .<span class="fn">filter</span>(e <span class="op">=></span> e.node <span class="op">!==</span> v2);
    <span class="kw">this</span>.adjacencyList[v2] <span class="op">=</span> <span class="kw">this</span>.adjacencyList[v2]
      .<span class="fn">filter</span>(e <span class="op">=></span> e.node <span class="op">!==</span> v1);
  }

  <span class="cm">// BFS — Breadth-First Search — O(V + E)</span>
  <span class="cm">// Uses a queue: visit all close neighbors before going farther away.</span>
  <span class="fn">bfs</span>(start) {
    <span class="kw">const</span> queue <span class="op">=</span> [start];
    <span class="kw">const</span> visited <span class="op">=</span> <span class="kw">new</span> <span class="cls">Set</span>([start]);
    <span class="kw">const</span> result <span class="op">=</span> [];

    <span class="kw">while</span> (queue.length) {
      <span class="kw">const</span> vertex <span class="op">=</span> queue.<span class="fn">shift</span>();
      result.<span class="fn">push</span>(vertex);
      <span class="kw">for</span> (<span class="kw">const</span> neighbor <span class="kw">of</span> <span class="kw">this</span>.adjacencyList[vertex]) {
        <span class="kw">if</span> (<span class="op">!</span>visited.<span class="fn">has</span>(neighbor.node)) {
          visited.<span class="fn">add</span>(neighbor.node);
          queue.<span class="fn">push</span>(neighbor.node);
        }
      }
    }
    <span class="kw">return</span> result;
  }

  <span class="cm">// DFS — Depth-First Search — O(V + E)</span>
  <span class="cm">// Uses recursion like a stack: go deep, then backtrack.</span>
  <span class="fn">dfs</span>(start, visited <span class="op">=</span> <span class="kw">new</span> <span class="cls">Set</span>(), result <span class="op">=</span> []) {
    visited.<span class="fn">add</span>(start);
    result.<span class="fn">push</span>(start);
    <span class="kw">for</span> (<span class="kw">const</span> neighbor <span class="kw">of</span> <span class="kw">this</span>.adjacencyList[start]) {
      <span class="kw">if</span> (<span class="op">!</span>visited.<span class="fn">has</span>(neighbor.node)) {
        <span class="kw">this</span>.<span class="fn">dfs</span>(neighbor.node, visited, result);
      }
    }
    <span class="kw">return</span> result;
  }
}

<span class="cm">// Usage: City connections</span>
<span class="kw">const</span> g <span class="op">=</span> <span class="kw">new</span> <span class="cls">Graph</span>();
[<span class="str">'NYC'</span>, <span class="str">'Chicago'</span>, <span class="str">'Denver'</span>, <span class="str">'LA'</span>, <span class="str">'Seattle'</span>].<span class="fn">forEach</span>(v <span class="op">=></span> g.<span class="fn">addVertex</span>(v));
g.<span class="fn">addEdge</span>(<span class="str">'NYC'</span>, <span class="str">'Chicago'</span>, <span class="num">790</span>);
g.<span class="fn">addEdge</span>(<span class="str">'Chicago'</span>, <span class="str">'Denver'</span>, <span class="num">920</span>);
g.<span class="fn">addEdge</span>(<span class="str">'Denver'</span>, <span class="str">'LA'</span>, <span class="num">830</span>);
g.<span class="fn">addEdge</span>(<span class="str">'Denver'</span>, <span class="str">'Seattle'</span>, <span class="num">1040</span>);
g.<span class="fn">addEdge</span>(<span class="str">'LA'</span>, <span class="str">'Seattle'</span>, <span class="num">960</span>);

console.<span class="fn">log</span>(g.<span class="fn">bfs</span>(<span class="str">'NYC'</span>));
<span class="cm">// ['NYC', 'Chicago', 'Denver', 'LA', 'Seattle']</span>
console.<span class="fn">log</span>(g.<span class="fn">dfs</span>(<span class="str">'NYC'</span>));
<span class="cm">// ['NYC', 'Chicago', 'Denver', 'LA', 'Seattle']</span>`,
    complexity: [
      { op: 'Add vertex', time: 'O(1)', badge: 'fast' },
      { op: 'Add edge', time: 'O(1)', badge: 'fast' },
      { op: 'Remove vertex', time: 'O(V + E)', badge: 'slow' },
      { op: 'Remove edge', time: 'O(E)', badge: 'mid' },
      { op: 'BFS / DFS', time: 'O(V + E)', badge: 'mid' },
      { op: 'Space (adjacency list)', time: 'O(V + E)', badge: 'mid' },
    ],
    pros: [
      'Most flexible structure — models any kind of relationship',
      'Powerful algorithms — shortest path, clustering, connectivity, flow',
      'Directed/undirected, weighted/unweighted — adapts to any scenario',
      'Trees and lists are subsets of graphs — most general structure',
      'Essential for real-world systems — maps, networks, recommendations',
    ],
    cons: [
      'Complex to implement and debug — many edge cases (cycles, disconnected parts)',
      'Algorithms can be slow on large graphs — O(V+E) can be huge',
      'Memory intensive — storing all edges takes significant space',
      'No simple traversal order — unlike arrays/lists, there\'s no "natural" order',
      'Hard to visualize — large graphs become tangled webs',
    ],
    demoType: 'graph',
    keywords: ['graph', 'vertex', 'edge', 'adjacency list', 'bfs', 'dfs', 'directed', 'undirected', 'weighted'],
  },
);
