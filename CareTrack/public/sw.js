// public/sw.js
self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open('medication-cache-v1').then((cache) => {
        return cache.addAll(['/']);
      })
    );
  });
  
  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request).then((response) => response || fetch(event.request))
    );
  });