const CACHE_NAME = 'dinesh-portfolio-cache-v6';
const urlsToCache = [
    '/',
    '/index.html',
    '/style.css',
    '/script.js',
    '/manifest.json',
    '/images/icon-192x192.png',
    '/images/icon-512x512.png',
    '/resume/Dinesh_Krishnamoorthy_Resume.pdf'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('SW Install: Opened cache:', CACHE_NAME);
                const criticalAssetRequests = urlsToCache.map(url => new Request(url, { cache: 'reload' }));
                return cache.addAll(criticalAssetRequests)
                    .catch(err => {
                        console.error('SW Install: Failed to cache one or more URLs:', err);
                    });
            })
            .catch(err => {
                console.error('SW Install: Failed to open cache:', err);
            })
    );
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        console.log('SW Activate: Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    return self.clients.claim();
});

self.addEventListener('fetch', event => {
    if (event.request.method !== 'GET') {
        return; 
    }

    // Strategy for HTML: Network first, then cache
    if (event.request.mode === 'navigate' || event.request.headers.get('Accept').includes('text/html')) {
        event.respondWith(
            fetch(event.request)
                .then(networkResponse => {
                    if (networkResponse && networkResponse.ok) {
                        const responseToCache = networkResponse.clone();
                        caches.open(CACHE_NAME).then(cache => {
                            cache.put(event.request, responseToCache);
                        });
                    }
                    return networkResponse;
                })
                .catch(() => { 
                    return caches.match(event.request)
                        .then(cachedResponse => {
                            return cachedResponse || caches.match('/index.html');
                        })
                        .catch(() => {
                             return new Response("Network error: You are offline and the content is not cached.", { 
                                status: 503, 
                                statusText: "Service Unavailable",
                                headers: { 'Content-Type': 'text/plain' }
                            });
                        });
                })
        );
        return;
    }

    // Strategy for non-HTML (CSS, JS, Images, PDF): Cache first, then network
    event.respondWith(
        caches.match(event.request)
            .then(cachedResponse => {
                if (cachedResponse) {
                    return cachedResponse; 
                }
                return fetch(event.request).then(
                    networkResponse => {
                        if (!networkResponse || networkResponse.status !== 200 || (networkResponse.type !== 'basic' && networkResponse.type !== 'cors')) {
                            return networkResponse;
                        }
                        const responseToCache = networkResponse.clone();
                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                            });
                        return networkResponse;
                    }
                ).catch(error => {
                    console.warn('SW Fetch: Failed for asset:', event.request.url, error);
                });
            })
    );
});