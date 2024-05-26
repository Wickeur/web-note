// Nom du cache pour la version actuelle de l'application
const CACHE_NAME = 'my-cache-v1';

// Liste des ressources à mettre en cache
const URLS_TO_CACHE = [
    '/',
    '/build/app.css',
    '/build/app.js', 
];

// Événement d'installation du service worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then((cache) => {
            console.log('Opened cache');
            return cache.addAll(URLS_TO_CACHE);
        })
        .catch((error) => console.error('Failed to open cache:', error))
    );
});

// Événement d'activation du service worker pour nettoyer les anciennes versions du cache
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Écoute les événements fetch pour servir les réponses du cache ou via le réseau
self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request).catch(() => {
            return caches.match(event.request)
                .then((response) => {
                    if (response) {
                        return response;
                    }
                    // Si la requête concerne une API, vous pouvez retourner une réponse JSON personnalisée
                    if (event.request.url.endsWith('/api/data')) {
                        return new Response(JSON.stringify({ error: "Network error occurred, and no cache data available." }), {
                            headers: { 'Content-Type': 'application/json' }
                        });
                    }
                    // Retourne une réponse générique pour d'autres types de requêtes si aucune correspondance n'est trouvée dans le cache
                    return new Response("Vous êtes hors ligne et les données demandées ne sont pas disponibles.", {
                        headers: { 'Content-Type': 'text/plain' }
                    });
                });
        })
    );
});
