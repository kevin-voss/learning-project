window.AIP = window.AIP || {};

/* Install as an app: register the service worker (http/https only) and show the install button or iPhone hint. */
(function () {
  function isStandalone() {
    return (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches) || !!window.navigator.standalone;
  }

  function isIosDevice() {
    var ua = navigator.userAgent || "";
    return /iPhone|iPad|iPod/i.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  }

  function registerPwa() {
    if (isStandalone()) document.documentElement.classList.add("standalone");
    var http = location.protocol === "http:" || location.protocol === "https:";
    if (http && "serviceWorker" in navigator) {
      navigator.serviceWorker.register("sw.js").catch(function () {});
    }
    var installBtn = document.getElementById("installBtn");
    var iosHint = document.getElementById("installIos");
    if (!http || isStandalone()) return;
    if (iosHint && isIosDevice()) iosHint.hidden = false;
    var deferred = null;
    window.addEventListener("beforeinstallprompt", function (e) {
      e.preventDefault();
      deferred = e;
      if (installBtn) installBtn.hidden = false;
      if (iosHint) iosHint.hidden = true;
    });
    if (installBtn) {
      installBtn.addEventListener("click", function () {
        if (!deferred) return;
        deferred.prompt();
        deferred.userChoice.then(function () {
          deferred = null;
          installBtn.hidden = true;
        });
      });
    }
    window.addEventListener("appinstalled", function () {
      if (installBtn) installBtn.hidden = true;
      document.documentElement.classList.add("standalone");
    });
  }

  AIP.registerPwa = registerPwa;
})();
