const CACHE='colibri-v1';
const SHELL=['app.html','index.html','manifest.json','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL).catch(()=>null)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  const r=e.request;
  if(r.method!=='GET'||!r.url.startsWith(self.location.origin))return;
  e.respondWith(fetch(r).then(res=>{const cp=res.clone();caches.open(CACHE).then(c=>c.put(r,cp).catch(()=>null));return res;}).catch(()=>caches.match(r).then(m=>m||caches.match('app.html'))));
});
self.addEventListener('notificationclick',e=>{
  e.notification.close();
  e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(cs=>{
    for(const c of cs){if(c.url.includes('app.html'))return c.focus();}
    return self.clients.openWindow('app.html');
  }));
});
self.addEventListener('push',e=>{
  let d={title:'ColibríApp',body:'Tienes una novedad en el centro.'};
  try{ if(e.data) d=Object.assign(d,e.data.json().notification||e.data.json()); }catch(err){ if(e.data)d.body=e.data.text(); }
  e.waitUntil(self.registration.showNotification(d.title,{body:d.body,icon:'icon-192.png',badge:'icon-192.png',vibrate:[120,60,120]}));
});
