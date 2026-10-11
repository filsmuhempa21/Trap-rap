const CACHE_NAME = "jiska-Diablo-v3"; // CHANGE v3 -> v4 -> v5 à chaque grosse modif

self.addEventListener("install", (e) => {
  self.skipWaiting(); // force le nouveau sw direct
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(["./", "./index.html", "./manifest.json"]);
    })
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((k) => {
          if (k !== CACHE_NAME) {
            return caches.delete(k); // supprime l'ancien cache v1, v2
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  // Pour index.html : va
