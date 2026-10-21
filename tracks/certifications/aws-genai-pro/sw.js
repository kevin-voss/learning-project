/* AIP-C01 PWA service worker. Register only from http(s) — not file://. */
var CACHE = "aip-c01-v8";
var FONT_CACHE = "aip-c01-fonts-v1";
var PRECACHE = [
  "./index.html",
  "./manifest.webmanifest",
  "./css/main.css",
  "./css/tokens.css",
  "./css/base.css",
  "./css/layout.css",
  "./css/components/overview.css",
  "./css/components/topic.css",
  "./css/components/topic-detail.css",
  "./css/components/quiz.css",
  "./css/components/responsive.css",
  "./js/core/ns.js",
  "./js/core/config.js",
  "./js/course/study-guide.js",
  "./js/course/chapters.js",
  "./js/core/storage.js",
  "./js/content/foundations/00-architecture-overview.js",
  "./js/content/foundations/01-genai-foundations.js",
  "./js/content/foundations/02-choosing-a-foundation-model.js",
  "./js/content/foundations/03-amazon-bedrock.js",
  "./js/content/foundations/04-prompt-engineering.js",
  "./js/content/integration-agents/05-application-integration.js",
  "./js/content/knowledge/06-data-ingestion.js",
  "./js/content/knowledge/07-embeddings.js",
  "./js/content/knowledge/08-vector-databases.js",
  "./js/content/knowledge/09-rag.js",
  "./js/content/knowledge/10-bedrock-knowledge-bases.js",
  "./js/content/integration-agents/11-agents.js",
  "./js/content/integration-agents/12-agent-tools.js",
  "./js/content/integration-agents/13-workflow-orchestration.js",
  "./js/content/integration-agents/14-memory-and-state.js",
  "./js/content/trust/15-safety-and-guardrails.js",
  "./js/content/trust/16-security-and-privacy.js",
  "./js/content/trust/17-governance.js",
  "./js/content/operate/18-evaluation.js",
  "./js/content/operate/19-observability.js",
  "./js/content/operate/20-performance.js",
  "./js/content/operate/21-cost-optimization.js",
  "./js/content/ship/22-deployment.js",
  "./js/content/ship/23-cicd.js",
  "./js/content/ship/24-troubleshooting.js",
  "./js/content/exam/25-architecture-patterns.js",
  "./js/content/exam/26-exam-decision-guide.js",
  "./js/content/exam/27-final-architecture.js",
  "./js/questions/examtopics/p01/examtopics-p01.js",
  "./js/questions/examtopics/p01/examtopics-p02.js",
  "./js/questions/examtopics/p01/examtopics-p03.js",
  "./js/questions/examtopics/p01/examtopics-p04.js",
  "./js/questions/examtopics/p01/examtopics-p05.js",
  "./js/questions/examtopics/p02/examtopics-p06.js",
  "./js/questions/examtopics/p02/examtopics-p07.js",
  "./js/questions/examtopics/p02/examtopics-p08.js",
  "./js/questions/examtopics/p02/examtopics-p09.js",
  "./js/questions/examtopics/p02/examtopics-p10.js",
  "./js/questions/examtopics/p03/examtopics-p11.js",
  "./js/questions/examtopics/p03/examtopics-p12.js",
  "./js/questions/certsafari/p01/certsafari-p01.js",
  "./js/questions/certsafari/p01/certsafari-p02.js",
  "./js/questions/certsafari/p01/certsafari-p03.js",
  "./js/questions/certsafari/p01/certsafari-p04.js",
  "./js/questions/certsafari/p01/certsafari-p05.js",
  "./js/questions/certsafari/p02/certsafari-p06.js",
  "./js/questions/certsafari/p02/certsafari-p07.js",
  "./js/questions/certsafari/p02/certsafari-p08.js",
  "./js/questions/certsafari/p02/certsafari-p09.js",
  "./js/questions/certsafari/p02/certsafari-p10.js",
  "./js/questions/certsafari/p03/certsafari-p11.js",
  "./js/questions/certsafari/p03/certsafari-p12.js",
  "./js/questions/certsafari/p03/certsafari-p13.js",
  "./js/questions/certsafari/p03/certsafari-p14.js",
  "./js/questions/certsafari/p03/certsafari-p15.js",
  "./js/questions/certsafari/p04/certsafari-p16.js",
  "./js/questions/certsafari/p04/certsafari-p17.js",
  "./js/questions/certsafari/p04/certsafari-p18.js",
  "./js/questions/certsafari/p04/certsafari-p19.js",
  "./js/questions/certsafari/p04/certsafari-p20.js",
  "./js/questions/certsafari/p05/certsafari-p21.js",
  "./js/questions/certsafari/p05/certsafari-p22.js",
  "./js/questions/certsafari/p05/certsafari-p23.js",
  "./js/questions/certsafari/p05/certsafari-p24.js",
  "./js/questions/certsafari/p05/certsafari-p25.js",
  "./js/questions/certsafari/p06/certsafari-p26.js",
  "./js/questions/certsafari/p06/certsafari-p27.js",
  "./js/questions/certsafari/p06/certsafari-p28.js",
  "./js/questions/certsafari/p06/certsafari-p29.js",
  "./js/questions/certsafari/p06/certsafari-p30.js",
  "./js/questions/certsafari/p07/certsafari-p31.js",
  "./js/questions/certsafari/p07/certsafari-p32.js",
  "./js/questions/certsafari/p07/certsafari-p33.js",
  "./js/questions/certsafari/p07/certsafari-p34.js",
  "./js/questions/certsafari/p07/certsafari-p35.js",
  "./js/questions/certsafari/p08/certsafari-p36.js",
  "./js/questions/practice.js",
  "./js/course/render.js",
  "./js/exam/question-bank.js",
  "./js/exam/bank-views.js",
  "./js/exam/quiz.js",
  "./js/exam/stats-view.js",
  "./js/core/pwa.js",
  "./js/app.js",
  "./icons/icon.svg",
  "./icons/app/icon-192.png",
  "./icons/app/icon-512.png",
  "./icons/app/icon-512-maskable.png",
  "./icons/browser/apple-touch-icon.png",
  "./icons/browser/favicon-32.png",
  "./icons/browser/favicon-48.png"
];

function cleanUrl(request) {
  var url = new URL(request.url);
  url.search = "";
  url.hash = "";
  return url.href;
}

function isFontRequest(url) {
  return url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com";
}

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE).then(function (cache) {
      return cache.addAll(PRECACHE);
    }).then(function () {
      return self.skipWaiting();
    })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (key) {
        return key !== CACHE && key !== FONT_CACHE;
      }).map(function (key) {
        return caches.delete(key);
      }));
    }).then(function () {
      return self.clients.claim();
    })
  );
});

self.addEventListener("fetch", function (event) {
  var request = event.request;
  if (request.method !== "GET") return;
  var url;
  try {
    url = new URL(request.url);
  } catch (err) {
    return;
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") return;

  if (request.mode === "navigate") {
    event.respondWith(
      caches.match("./index.html").then(function (cached) {
        return cached || fetch(request);
      }).catch(function () {
        return caches.match("./index.html");
      })
    );
    return;
  }

  // Site files outside this app (the shared theme, the step bar, path.json): network first,
  // so theme updates arrive at once; the cached copy keeps the app styled offline.
  if (url.origin === self.location.origin && url.href.indexOf(self.registration.scope) !== 0) {
    event.respondWith(
      fetch(request).then(function (response) {
        if (response && response.status === 200) {
          var copy = response.clone();
          caches.open(CACHE).then(function (cache) { cache.put(cleanUrl(request), copy); });
        }
        return response;
      }).catch(function () {
        return caches.match(cleanUrl(request));
      })
    );
    return;
  }

  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(cleanUrl(request)).then(function (cached) {
        if (cached) return cached;
        return fetch(request).then(function (response) {
          if (!response || response.status !== 200 || response.type === "opaque") return response;
          var copy = response.clone();
          caches.open(CACHE).then(function (cache) {
            cache.put(cleanUrl(request), copy);
          });
          return response;
        });
      })
    );
    return;
  }

  if (isFontRequest(url)) {
    event.respondWith(
      caches.open(FONT_CACHE).then(function (cache) {
        return cache.match(request).then(function (cached) {
          var fetched = fetch(request).then(function (response) {
            if (response && response.status === 200) cache.put(request, response.clone());
            return response;
          }).catch(function () { return cached; });
          return cached || fetched;
        });
      })
    );
  }
});
