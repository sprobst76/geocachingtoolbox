const PRECACHE='gcc-v3';const RUNTIME='rt';
const ASSETS=['./','./index.html'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(PRECACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>![PRECACHE,RUNTIME].includes(k)).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.mode==='navigate'){e.respondWith(fetch(r).catch(()=>caches.match('./index.html')));return;}e.respondWith(caches.match(r).then(h=>h||fetch(r).then(res=>{const copy=res.clone();caches.open(RUNTIME).then(c=>c.put(r,copy));return res;})))});