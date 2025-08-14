const PRECACHE = 'gcc-precache-v1';
const RUNTIME = 'gcc-runtime';

// Passe die Liste bei neuen statischen Assets an
const PRECACHE_URLS = [
  './',
  './index.html',
  './src/core/app.js',
  './src/core/registry.js',
  './src/core/style.css'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(PRECACHE).then(cache => cache.addAll(PRECACHE_URLS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => ![PRECACHE, RUNTIME].includes(k)).map(k => caches.delete(k))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  // Navigationsanfragen: Network-first mit Fallback auf index.html (Offline)
  if (req.mode === 'navigate') {
    event.respondWith(fetch(req).catch(() => caches.match('./index.html')));
    return;
  }
  // Sonst: Cache-first mit Runtime-Aktualisierung
  event.respondWith(
    caches.match(req).then(hit => hit || fetch(req).then(res => {
      const copy = res.clone();
      caches.open(RUNTIME).then(c => c.put(req, copy));
      return res;
    }))
  );
});
