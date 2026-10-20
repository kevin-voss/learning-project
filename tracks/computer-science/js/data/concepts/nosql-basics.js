window.DS = window.DS || {};
DS.curriculum = DS.curriculum || [];

DS.curriculum.push({
  id: 'nosql-basics',
  category: 'Databases',
  title: 'NoSQL and Document Databases',
  icon: 'fa-file-code',
  number: '41',
  subtitle: 'Flexible schemas for documents, key-value, and wide-column stores.',
  analogy: 'SQL tables are spreadsheets with strict columns. Document DBs are folders of JSON files: flexible fields per item.',
  realWorldExample: { title: 'User profiles', desc: 'Some users have social links, others have beta flags: documents store varying fields without nullable column sprawl.' },
  whatIsIt: 'NoSQL trades some relational guarantees for scale and schema flexibility. Document DBs (MongoDB) query JSON fields. Key-value stores (Redis) optimize lookups. Each makes different consistency promises.',
  whyUse: 'Choose when shape varies, horizontal scale dominates, or cache-speed matters: often alongside SQL, not instead of always.',
  demoType: 'nosql-basics',
  relatedIds: ['database-sql-fundamentals', 'database-design-scaling', 'caching-strategies'],
  keywords: ['nosql', 'document database', 'mongodb'],
  checklist: ['Contrast document store vs relational table.', 'Name one trade-off vs SQL.', 'Describe when to use both together.'],
});
