const CACHE = "lvfa-authors-offline-v6";
const SHELL = ["./", "./index.html", "./styles.css", "./app.js", "./manifest.webmanifest", "./assets/logo.svg", "./assets/LV-FA_ICON.png", "./assets/LV_LOGO_WHITE.svg", "./assets/FA_LOGO_WHITE.svg", "./assets/pwa-192.png", "./assets/pwa-512.png", "./assets/apple-touch-icon.png"];
self.addEventListener("install", event => event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(SHELL)).then(() => self.skipWaiting())));
self.addEventListener("activate", event => event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
    if (response && response.ok && new URL(event.request.url).origin === location.origin) { const copy=response.clone(); caches.open(CACHE).then(c=>c.put(event.request,copy)); }
    return response;
  }).catch(() => event.request.mode === "navigate" ? caches.match("./index.html") : undefined)));
});
