// ===============================
// SERVICE WORKER – TrendCashX NFT
// ===============================

const CACHE_NAME = "trendcashx-nft-v1";
const ASSETS_TO_CACHE = [
  "/",                  // racine
  "/index.html",
  "/signup.html",
  "/login.html",
  "/style.css",
  "/web3.js",
  "/firebase.js",
  "/signup.js",
  "/login.js",
  "/manifest.json",
  "/assets/icons/icon-192.png",
  "/assets/icons/icon-512.png"
];

// Installation du Service Worker
self.addEventListener("install", (event) => {
  console.log("🛠️ Installation du Service Worker...");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("✅ Cache initialisé !");
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Activation du Service Worker
self.addEventListener("activate", (event) => {
  console.log("⚡ Service Worker activé !");
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      );
    })
  );
});

// Interception des requêtes (mode offline)
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Réponse depuis le cache ou depuis le réseau
      return response || fetch(event.request);
    })
  );
});
