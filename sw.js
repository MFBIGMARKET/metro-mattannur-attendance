// This service worker provides basic offline capabilities for the app shell.

const CACHE_NAME = 'attendance-app-cache-v1';
const urlsToCache = [
  './', // Caches the root URL
  'index.html' // Caches the main HTML file
];

// Install event: Fires when the service worker is first installed.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event: Fires every time the app requests a resource (like the HTML file).
self.addEventListener('fetch', event => {
  // We only want to cache GET requests for the app shell.
  if (event.request.method !== 'GET') {
    return;
  }
  
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // If the resource is in the cache, return it.
        if (response) {
          return response;
        }
        // Otherwise, fetch it from the network.
        return fetch(event.request);
      })
  );
});
