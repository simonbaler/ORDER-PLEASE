const CACHE_NAME = 'order-please-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/product-list.html',
  '/product-details.html',
  '/cart.html',
  '/checkout.html',
  '/login.html',
  '/products.js',
  '/orders.js',
  '/styles.css',
  '/manifest.json'
];
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});
self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
