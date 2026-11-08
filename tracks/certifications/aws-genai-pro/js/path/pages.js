window.AIP = window.AIP || {};

function projectById(id) {
  var list = AIP.MICRO || [];
  for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
  return null;
}

function diagram(boxes) {
  var html = '<div class="path-pills" aria-label="Architecture">';
  (boxes || []).forEach(function (box, index) {
    if (index) html += '<span class="path-sep" aria-hidden="true">→</span>';
    html += '<span class="path-pill current">' + AIP.escape(box) + "</span>";
  });
  return html + "</div>";
}

function bullets(items) {
  return "<ul>" + (items || []).map(function (line) {
    return "<li>" + AIP.escape(line) + "</li>";
  }).join("") + "</ul>";
}

function chapterLinks(ids) {
  return (ids || []).map(function (id) {
    var chapter = (AIP.CHAPTERS || []).filter(function (item) { return item.id === id; })[0];
    var label = chapter ? id + ". " + chapter.title : id;
    return '<a href="#/chapter/' + id + '">' + AIP.escape(label) + "</a>";
  }).join(", ");
}

AIP.renderMicro = function () {
  var html = '<div class="hero"><h1>Six projects</h1><p class="lede">These are the labs you will take on AWS when the pictures are easy. Each page says what you build, what you learn, and what the timed lab asks you to show. This site does not enroll you.</p></div>';
  (AIP.MICRO || []).forEach(function (item, index) {
    html += '<div class="card"><h3>' + (index + 1) + ". " + AIP.escape(item.title) + "</h3>";
    html += "<p>" + AIP.escape(item.picture) + "</p>";
    html += '<p><a class="btn" href="#/micro/' + AIP.escape(item.id) + '">Open this project</a></p></div>';
  });
  html += '<div class="card"><p>The certificate is the other door. Read the chapters, then use <a href="#/bank">Study questions</a>. The projects and the exam are separate sign-ups.</p></div>';
  return html;
};

AIP.renderProject = function (id) {
  var item = projectById(id);
  if (!item) return '<div class="card"><p>That project is not in the list.</p><p><a href="#/micro">All projects</a></p></div>';
  var list = AIP.MICRO || [];
  var index = list.indexOf(item);
  var html = '<div class="hero"><h1>' + (index + 1) + ". " + AIP.escape(item.title) + "</h1>";
  html += '<p class="lede">' + AIP.escape(item.picture) + "</p></div>";
  html += '<div class="card"><h3>What you build</h3><p>' + AIP.escape(item.build) + "</p>";
  html += diagram(item.diagram);
  if (item.minutes) html += "<p>The live lab is " + item.minutes + " minutes. It cannot be paused.</p>";
  html += '<p><a href="' + AIP.escape(item.href) + '">Open the AWS page</a> when you are ready to enroll. The lab gives a broken setup and no answer key.</p></div>';
  html += "<div class=\"card\"><h3>What you learn first</h3>" + bullets(item.learn);
  html += "<p>Chapters: " + chapterLinks(item.chapters) + "</p></div>";
  html += '<div class="card"><h3>Walk it here</h3><ol class="walk">' + (item.steps || []).map(function (step) {
    return "<li>" + AIP.escape(step) + "</li>";
  }).join("") + "</ol>";
  if (item.lab) html += '<p><a class="btn" href="#/labs/' + AIP.escape(item.lab) + '">Browser check</a></p>';
  html += "</div>";
  html += "<div class=\"card\"><h3>What the lab asks you to show</h3><p>These are the public tasks. The live lab does not tell you which button to press.</p>" + bullets(item.show) + "</div>";
  html += '<div class="chapter-actions">';
  if (index > 0) html += '<a class="btn" href="#/micro/' + AIP.escape(list[index - 1].id) + '">Previous project</a>';
  if (index >= 0 && index < list.length - 1) html += '<a class="btn primary" href="#/micro/' + AIP.escape(list[index + 1].id) + '">Next project</a>';
  html += '<a class="btn ghost" href="#/micro">All projects</a></div>';
  return html;
};
