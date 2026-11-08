window.AIP = window.AIP || {};

/* Older attempts were {at, correct}. Fill mode and exposure so weights stay defined. */
AIP.migrateQuiz = function (quiz) {
  var data = quiz && typeof quiz === "object" ? quiz : { questions: {} };
  if (!data.questions || typeof data.questions !== "object" || Array.isArray(data.questions)) {
    data.questions = {};
  }
  Object.keys(data.questions).forEach(function (id) {
    var row = data.questions[id];
    if (!row || typeof row !== "object") {
      data.questions[id] = { correct: 0, wrong: 0, last: null, attempts: [] };
      return;
    }
    if (!Array.isArray(row.attempts)) row.attempts = [];
    row.attempts.forEach(function (attempt, index) {
      if (!attempt || typeof attempt !== "object") return;
      if (attempt.mode !== "mock" && attempt.mode !== "practice") attempt.mode = "practice";
      if (attempt.exp == null) attempt.exp = AIP.exposureForIndex ? AIP.exposureForIndex(index) : (index === 0 ? 1 : index === 1 ? 0.4 : 0.15);
      if (attempt.at == null) attempt.at = Date.now();
      attempt.correct = !!attempt.correct;
    });
  });
  return data;
};
