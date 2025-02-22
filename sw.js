const CACHE_NAME = 'invizionz-cache-v1';
const ASSETS_TO_CACHE = [
    '/',
    '/index.html', 
    '/manifest.json',
    '/style.css',
    '/script.js',
    '/assets/img/logo1.png', 
    '/assets/img/logo1.png', 
];

self.addEventListener('install', (event) => {
    console.log('Service worker installed.');

    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Caching assets');
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

self.addEventListener('fetch', (event) => {
    console.log('Fetch event for ', event.request.url);
    
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            return cachedResponse || fetch(event.request);
        })
    );
});

self.addEventListener('activate', (event) => {
    console.log('Service worker activated.');
    
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
