const CACHE_NAME = 'mindfulness-caterina-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/embed0.html',
  '/embed1.html',
  '/embed2.html',
  '/embed3.html',
  '/embed4.html',
  '/attestato1.png',
  '/attestato2.png',
  '/attestato3.png',
  '/attestato4.png',
  '/attestato5.png',
  '/fotoprofilo.png'
];

// Install event - cache resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
