window.DS = window.DS || {};
DS.curriculum = DS.curriculum || [];

DS.curriculum.push(
  {
    id: 'caching-strategies',
    category: 'Web Basics',
    title: 'Caching Strategies',
    icon: 'fa-box-archive',
    number: '26',
    subtitle: 'Store copies closer to users to cut latency and server load.',
    analogy: 'Caching is keeping a photocopy on your desk instead of walking to the archive room every time.',
    realWorldExample: { title: 'CDN images', desc: 'A CDN edge server caches logo.png so Tokyo users do not fetch from Virginia every visit.' },
    whatIsIt: 'Browser cache, CDN, reverse proxy, and application memory cache (Redis) each trade freshness for speed. Cache-Control, ETag, and TTL define invalidation.',
    whyUse: 'Most performance wins for read-heavy sites come from caching — if you know what to invalidate.',
    demoType: 'caching-strategies',
    relatedIds: ['http-requests-responses', 'networking-http', 'cloud-hosting'],
    keywords: ['cache', 'cdn', 'cache-control'],
    checklist: ['Name three cache layers.', 'Explain cache hit vs miss.', 'Describe when stale data is acceptable.'],
  },
  {
    id: 'rest-api-design',
    category: 'Web Basics',
    title: 'REST API Design',
    icon: 'fa-plug-circle-bolt',
    number: '27',
    subtitle: 'Resources, HTTP verbs, and predictable URLs for machine clients.',
    analogy: 'REST is like a library catalog system: books are resources, GET reads, POST adds, DELETE removes — consistent nouns and verbs.',
    realWorldExample: { title: 'Mobile app backend', desc: 'GET /users/1 returns profile JSON; PATCH /users/1 updates display name with validation.' },
    whatIsIt: 'REST maps resources to URLs and uses HTTP methods semantically. JSON bodies carry data; status codes signal outcome. Versioning, pagination, and errors should be consistent.',
    whyUse: 'Clear APIs let frontend, mobile, and third parties integrate without bespoke protocols.',
    demoType: 'rest-api-design',
    relatedIds: ['http-requests-responses', 'abstraction-apis', 'authentication-sessions'],
    keywords: ['rest', 'api', 'json', 'http methods'],
    checklist: ['Map CRUD to HTTP verbs.', 'Design three endpoints for a todo resource.', 'Explain idempotent GET vs POST.'],
  }
);
