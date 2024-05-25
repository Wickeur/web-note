const CACHE_NAME = 'my-cache-v1';
const OFFLINE_URL = '/offline.html';

// Installation du service worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        // Mise en cache des ressources nécessaires
        return cache.addAll([
          OFFLINE_URL,
          '/', // Page d'accueil
          '/build/app.css', // Ressources CSS
          '/build/app.js', // Ressources JS
          // Ajoutez ici d'autres fichiers à mettre en cache
        ]);
      })
  );
});

// Activation du service worker
self.addEventListener('activate', (event) => {
  // Suppression des caches obsolètes
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((name) => {
          return name !== CACHE_NAME;
        }).map((name) => {
          return caches.delete(name);
        })
      );
    })
  );
});

// Écoute des événements fetch
self.addEventListener('fetch', (event) => {
  event.respondWith(
    // Recherche dans le cache
    caches.match(event.request)
      .then((response) => {
        // Renvoie la réponse du cache si elle existe
        if (response) {
          return response;
        }

        // Sinon, effectue une requête réseau
        return fetch(event.request)
          .then((response) => {
            // Vérifie si la réponse est valide
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone la réponse pour la mettre en cache
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return response;
          });
      }).catch(() => {
        // En cas d'échec, renvoie la page hors ligne
        return caches.match(OFFLINE_URL);
      })
  );
});
