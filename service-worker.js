self.addEventListener('install', function (e) {
    console.log('[Service Worker] Instalado');
    e.waitUntil(
      caches.open('whatsapp-link-cache').then(function (cache) {
        return cache.addAll([
          '/',
          '/index.html',
          '/css/style.css',
          '/js/script.js',
          '/assets/favicon.ico'
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', function (e) {
    e.respondWith(
      caches.match(e.request).then(function (response) {
        return response || fetch(e.request);
      })
    );
  });
  