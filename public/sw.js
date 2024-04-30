self.addEventListener('install', function(event) {
    // Perform install steps
    event.waitUntil(
      caches.open('v1').then(function(cache) {
        console.log('Opened cache');
        return cache.addAll([
        //   '/',
        //   '/index.html',
        //   '/styles/main.css',
        //   '/script/main.js'
        ]);
      })
    );
  });
  