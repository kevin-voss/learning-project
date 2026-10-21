// Topic-level practice, shown below the lessons.
Java.topics.umlDiagrams.tryIt = {
  steps: [
    'Take a paper and draw a box for a class `Pet`. Write its fields in the middle and its methods at the bottom.',
    'Draw a second box `Owner` and a line from `Owner` to `Pet` with `1` and `*` at the ends.',
    'Check: could you write the two Java classes from your drawing?'
  ],
  see: 'two boxes with three parts each, and a line that says "one owner has many pets".'
};

Java.topics.umlDiagrams.check = [
  { q: 'What are the three parts of a class box?', a: 'The name on top, the fields in the middle, the methods at the bottom.' },
  { q: 'Which diagram shows messages between objects in time order?', a: 'A sequence diagram.' },
  { q: 'Which diagram shows the states of one thing, like an order: new, paid, shipped?', a: 'A state diagram.' }
];

(function () {
  Java.renderLessonTopic({ namespace: 'umlDiagrams' });
})();
