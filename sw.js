// sw.js - 基礎離線支援版
const CACHE_NAME = 'aircon-reset-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json'
];

// 安裝時快取檔案
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// 攔截請求，優先從快取讀取
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});