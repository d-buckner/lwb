self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(clients.claim()));

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // The SWF resolves resource paths to /resources/... (outside /lwb/).
  // Rewrite to /lwb/resources/... and normalize any double slashes.
  if (url.pathname.startsWith('/resources/')) {
    const corrected = new URL(
      '/lwb' + url.pathname.replace(/\/+/g, '/'),
      url.origin
    );
    event.respondWith(fetch(corrected));
  }
});
