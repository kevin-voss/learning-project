window.DS = window.DS || {};
DS.demos = DS.demos || {};

DS.initDemo = function (id) {
  const container = document.getElementById(`demo-${id}`);
  if (!container) return;
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
    'networks-ips-requests': DS.demos.webFoundations,
    'networking-http': DS.demos.webFoundations,
    'database-sql': DS.demos.databaseSql,
    'git-collaboration': DS.demos.webFoundations,
    'servers-deployment-devops': DS.demos.webFoundations,
    'docker-containers': DS.demos.webFoundations,
    'encryption-concepts': DS.demos.encryption,
    'auth-security': DS.demos.webFoundations,
  };
  const run = runners[id];
  if (run) run(container);
};
