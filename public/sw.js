// Chargement des bibliothèques Workbox
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.0.2/workbox-sw.js');

// Vérification et initialisation de Workbox
if (workbox) {
    console.log('Workbox loaded successfully.');

    // Pré-cacher les fichiers statiques et définir les routes de mise en cache
    workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

    // Cache les pages navigables avec une stratégie Stale-While-Revalidate
    workbox.routing.registerRoute(
        // Vérifie si la requête correspond à une navigation vers une nouvelle page
        ({ request }) => request.mode === 'navigate',
        // Utilise une stratégie Stale-While-Revalidate
        new workbox.strategies.StaleWhileRevalidate({
            // Met tous les fichiers mis en cache dans un cache nommé 'pages'
            cacheName: 'pages',
            plugins: [
                // Assure que seules les réponses avec un statut 200 sont mises en cache
                new workbox.cacheableResponse.CacheableResponsePlugin({
                    statuses: [200],
                }),
            ],
        })
    );

    // Cache les requêtes CSS, JS et Web Worker avec une stratégie Stale-While-Revalidate
    workbox.routing.registerRoute(
        // Vérifie si la destination de la requête est 'style' pour les feuilles de style, 'script' pour JavaScript, ou 'worker' pour les web workers
        ({ request }) =>
            request.destination === 'style' ||
            request.destination === 'script' ||
            request.destination === 'worker',
        // Utilise une stratégie Stale-While-Revalidate
        new workbox.strategies.StaleWhileRevalidate({
            // Met tous les fichiers mis en cache dans un cache nommé 'assets'
            cacheName: 'assets',
            plugins: [
                // Assure que seules les réponses avec un statut 200 sont mises en cache
                new workbox.cacheableResponse.CacheableResponsePlugin({
                    statuses: [200],
                }),
            ],
        })
    );

    // Gestion de la mise en cache des fichiers externes
    workbox.routing.registerRoute(
        // Filtre les requêtes pour les fichiers externes (non de l'origine)
        ({ url }) => url.origin !== self.location.origin,
        // Utilise une stratégie CacheFirst pour mettre en cache les réponses
        new workbox.strategies.CacheFirst({
            // Met les fichiers externes mis en cache dans un cache nommé 'external'
            cacheName: 'external',
            plugins: [
                // Assure que seules les réponses avec un statut 200 sont mises en cache
                new workbox.cacheableResponse.CacheableResponsePlugin({
                    statuses: [200],
                }),
            ],
        })
    );

    // Écoute l'événement d'installation du service worker
    self.addEventListener('install', (event) => {
        // Passe immédiatement à l'étape d'activation du service worker
        self.skipWaiting();
    });

    // Écoute l'événement d'activation du service worker
    self.addEventListener('activate', (event) => {
        // Réclame tous les clients actifs pour ce service worker
        clients.claim();
    });
} else {
    console.error('Workbox failed to load.');
}