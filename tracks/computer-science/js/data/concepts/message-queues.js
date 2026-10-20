window.DS = window.DS || {};
DS.curriculum = DS.curriculum || [];

DS.curriculum.push({
  id: 'message-queues',
  category: 'Deployment & DevOps',
  title: 'Message Queues and Event-Driven Basics',
  icon: 'fa-envelope',
  number: '33',
  subtitle: 'Decouple producers and consumers with durable asynchronous messages.',
  analogy: 'A message queue is a to-do tray between teams: sender drops work. Worker picks it up when ready.',
  realWorldExample: { title: 'Email after signup', desc: 'Signup API enqueues send-welcome-email. A worker sends mail without blocking the HTTP response.' },
  whatIsIt: 'Queues (RabbitMQ, SQS) and logs (Kafka) buffer events. Consumers retry failures. Dead-letter queues hold poison messages. Event-driven systems react instead of polling.',
  whyUse: 'Smooths traffic spikes, isolates failures, and enables background processing.',
  demoType: 'message-queues',
  relatedIds: ['servers-deployment-devops', 'concurrency-async', 'observability'],
  keywords: ['message queue', 'worker', 'event-driven'],
  checklist: ['Explain producer vs consumer.', 'Describe why queues help during traffic spikes.', 'Name dead-letter queue purpose.'],
});
