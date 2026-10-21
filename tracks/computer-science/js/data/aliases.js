window.DS = window.DS || {};

// Old lesson ids that were merged into another lesson or removed.
// A link to #old-id opens the new home (see DS.parseHash in js/app/navigation.js).
DS.lessonAliases = [
  { id: 'networking-http', to: 'networks-ips-requests' },
  { id: 'rest-api-design', to: 'http-requests-responses/http-methods' },
  { id: 'caching-strategies', to: 'http-requests-responses/caching-headers' },
  { id: 'message-queues', to: 'queues' },
  { id: 'auth-identity', to: 'authentication-sessions' },
];
