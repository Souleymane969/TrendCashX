javascript
const CACHE_NAME = "trendcashx-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
];

// Installer le Service Worker et mettre en cache les fichiers
self.addEventListener("install", (event) => {
  event.waitUntil(
 caches.open(CACHE_NAME).then((cache) => {
      console.log("Mise en cache des fichiers...");
      return cache.addAll(urlsToCache);
    })
  );
});

// Intercepter les requêtes et servir les fichiers mis en cache
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Activer le nouveau Service Worker et supprimer l'ancien cache
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log("Suppression de l’ancien cache :", cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});
