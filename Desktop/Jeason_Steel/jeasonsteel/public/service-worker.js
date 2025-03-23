const CACHE_NAME = 'jeason-steel-cache-v1';

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll([
        '/',
        '/index.html',
        '/manifest.json',
        // Add other static assets
      ]);
    })
  );
});
