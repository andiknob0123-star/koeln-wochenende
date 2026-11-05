/* Offline-Speicher für die Köln-App.
   App-Dateien: erst Netz, bei fehlendem Netz der gespeicherte Stand.
   Schriften: einmal laden, dann aus dem Speicher. GitHub-API läuft immer übers Netz. */
var CACHE = "kw-v1";
var CORE = ["./", "index.html", "data.json", "icon-180.png"];

self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(CORE); }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET") return;
  var url = new URL(req.url);

  if (url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com") {
    e.respondWith(caches.match(req).then(function (hit) {
      return hit || fetch(req).then(function (res) {
        var copy = res.clone();
        caches.open(CACHE).then(function (c) { c.put(req, copy); });
        return res;
      });
    }));
    return;
  }

  if (url.origin !== self.location.origin) return;

  var key = url.pathname.slice(-9) === "data.json" ? new Request(url.origin + url.pathname) : req;
  e.respondWith(fetch(req).then(function (res) {
    if (res.ok) {
      var copy = res.clone();
      caches.open(CACHE).then(function (c) { c.put(key, copy); });
    }
    return res;
  }).catch(function () {
    return caches.match(key, { ignoreSearch: true }).then(function (hit) {
      if (hit) return hit;
      if (req.mode === "navigate") return caches.match("index.html");
      return Response.error();
    });
  }));
});
