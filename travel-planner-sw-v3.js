const CACHE='travel-planner-cache-v3';
const BASE='/Travel-Planner/';
const ASSETS=[BASE,BASE+'index.html',BASE+'travel-planner-manifest-v3.webmanifest',BASE+'travel-planner-touch-v3.png',BASE+'travel-planner-192-v3.png',BASE+'travel-planner-512-v3.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(fetch(e.request).then(r=>{const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return r;}).catch(()=>caches.match(e.request).then(r=>r||caches.match(BASE+'index.html'))));});
