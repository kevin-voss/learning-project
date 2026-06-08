window.DS = window.DS || {};
DS.demos = DS.demos || {};

DS.initDemo = function (id, demoScenario) {
  const container = document.getElementById(`demo-${id}`);
  if (!container) return;
  const lesson = DS.curriculum.find(item => item.id === id);
  const demoType = lesson ? DS.resolveLessonView(lesson).view.demoType : null;
  const runners = {
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
    'web-big-picture': DS.demos.webFoundations,
    'client-server': DS.demos.webFoundations,
    'http-requests-responses': DS.demos.http,
    'networks-ips-requests': DS.demos.webFoundations,
    'networking-http': DS.demos.webFoundations,
    'database-sql': (el) => DS.demos.databaseSql(el, demoScenario),
    'database-sql-fundamentals': (el) => DS.demos.databaseSql(el, demoScenario),
    'database-design-scaling': (el) => DS.demos.databaseSql(el, demoScenario),
    'git-collaboration': DS.demos.webFoundations,
    'servers-deployment-devops': DS.demos.webFoundations,
    'docker-containers': DS.demos.webFoundations,
    'docker-compose': DS.demos.dockerCompose,
    'observability': DS.demos.observability,
    'cloud-hosting': DS.demos.cloudHosting,
    'encryption-concepts': DS.demos.encryption,
    'auth-identity': (el) => DS.demos.authIdentity(el, demoScenario),
    'web-security-threats': (el) => DS.demos.securityThreats(el, demoScenario),
  };
  const run = runners[demoType || id];
  if (run) run(container);
};
