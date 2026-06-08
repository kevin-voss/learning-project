window.DS = window.DS || {};
DS.demos = DS.demos || {};

DS.demos.nosqlBasics = function (container) {
  const UI = DS.demoUI;
  const docs = [
    { _id: '1', name: 'Maya', tags: ['admin'] },
    { _id: '2', name: 'Alex', tags: ['user', 'beta'] },
  ];
  let filter = '';

  const render = () => {
    const shown = docs.filter(d => !filter || d.name.toLowerCase().includes(filter.toLowerCase()) || d.tags.some(t => t.includes(filter)));
    container.innerHTML = UI.shell({
      title: 'Document store query',
      hint: 'NoSQL documents are JSON-like. Query by field without rigid tables.',
      stage: `
        <div class="nosql-demo">
          <input type="text" class="demo-input" placeholder="Filter by name or tag" oninput="nosqlFilter(this.value)" aria-label="Document filter">
          <pre class="nosql-docs">${UI.esc(JSON.stringify(shown, null, 2))}</pre>
        </div>`,
      inspector: UI.inspector('NoSQL', [
        ['Type', 'Document DB', 'Flexible schema'],
        ['Docs', String(shown.length), 'Matching filter'],
        ['vs SQL', 'Embed arrays', 'Joins less common'],
      ]),
    });
  };
  window.nosqlFilter = (v) => { filter = v. Render(); };
  render();
};
