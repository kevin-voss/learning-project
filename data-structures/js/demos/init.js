window.DS = window.DS || {};
DS.demos = DS.demos || {};

DS.demoRunners = function (demoScenario) {
  return {
    // Short demoType aliases (used in data files)
    'array': DS.demos.array,
    'linkedlist': DS.demos['linked-list'],
    'hashtable': DS.demos['hash-table'],
    'stack': DS.demos.stack,
    'queue': DS.demos.queue,
    'tree': DS.demos.tree,
    'graph': DS.demos.graph,
    'set': DS.demos.set,
    'pointer': DS.demos.pointer,
    'recursion': DS.demos.recursion,
    'logic': DS.demos.logic,
    'search': DS.demos.search,
    'sorting': DS.demos.sorting,
    'web-foundations': DS.demos.webFoundations,
    'http': DS.demos.http,
    'linux-terminal': DS.demos.linuxTerminal,
    'database-sql': (el) => DS.demos.databaseSql(el, demoScenario),
    'encryption': (el) => DS.demos.encryption(el, demoScenario),
    'auth-identity': (el) => DS.demos.authIdentity(el, demoScenario),
    'security-threats': (el) => DS.demos.securityThreats(el, demoScenario),
    'docker-compose': DS.demos.dockerCompose,
    'observability': DS.demos.observability,
    'cloud-hosting': DS.demos.cloudHosting,
    'big-o': DS.demos.bigO,
    'memory-model': DS.demos.memoryModel,
    'heaps-priority-queues': DS.demos.heap,
    'buffers-ring-buffers': DS.demos.ringBuffer,
    'compiler-runtime': DS.demos.compilerRuntime,
    'os-kernel-queues': DS.demos.osKernelQueues,
    'cs-foundations': DS.demos.csFoundations,
    'roadmap-explorer': DS.demos.roadmapExplorer,
    'git-playground': DS.demos.gitPlayground,
    'binary-encoding': DS.demos.binaryEncoding,
    'number-bases': DS.demos.numberBases,
    'stack-heap-gc': DS.demos.stackHeapGc,
    'graph-algorithms': DS.demos.graphAlgorithms,
    'dynamic-programming-intro': DS.demos.dynamicProgramming,
    'greedy-algorithms': DS.demos.greedyAlgorithms,
    'concurrency-async': DS.demos.concurrencyAsync,
    'caching-strategies': DS.demos.cachingStrategies,
    'rest-api-design': DS.demos.restApi,
    'message-queues': DS.demos.messageQueues,
    'nosql-basics': DS.demos.nosqlBasics,
    'abstraction-apis': DS.demos.abstractionApis,
    'testing-debugging': DS.demos.testingDebugging,
    // Lesson-id fallbacks
    'arrays': DS.demos.array,
    'linked-lists': DS.demos['linked-list'],
    'stacks': DS.demos.stack,
    'queues': DS.demos.queue,
    'hash-tables': DS.demos['hash-table'],
    'references-pointers': DS.demos.pointer,
    'recursion-call-stack': DS.demos.recursion,
    'logical-operators': DS.demos.logic,
    'trees': DS.demos.tree,
    'graphs': DS.demos.graph,
    'sets': DS.demos.set,
    'searching-algorithms': DS.demos.search,
    'sorting-algorithms': DS.demos.sorting,
    'big-o-notation': DS.demos.bigO,
    'web-big-picture': DS.demos.webFoundations,
    'client-server': DS.demos.webFoundations,
    'http-requests-responses': DS.demos.http,
    'networks-ips-requests': DS.demos.webFoundations,
    'networking-http': DS.demos.webFoundations,
    'database-sql-fundamentals': (el) => DS.demos.databaseSql(el, demoScenario),
    'database-design-scaling': (el) => DS.demos.databaseSql(el, demoScenario),
    'git-collaboration': DS.demos.gitPlayground,
    'servers-deployment-devops': DS.demos.webFoundations,
    'docker-containers': DS.demos.webFoundations,
    'encryption-concepts': DS.demos.encryption,
    'web-security-threats': (el) => DS.demos.securityThreats(el, demoScenario),
  };
};

DS.initDemo = function (id, demoScenario) {
  const container = document.getElementById(`demo-${id}`);
  if (!container) return;
  const lesson = DS.curriculum.find(item => item.id === id);
  const demoType = lesson ? DS.resolveLessonView(lesson).view.demoType : null;
  const runners = DS.demoRunners(demoScenario);
  const run = runners[demoType || id];
  if (run) run(container);
};
