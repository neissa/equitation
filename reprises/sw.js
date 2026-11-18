// Service worker : rend la page utilisable hors ligne.
// Pré-cache la page, son code, le manifeste et toutes les grilles PDF ;
// les polices Google sont mises en cache à la première visite.
// Pour changer le contenu mis en cache, incrémenter VERSION.
const VERSION = 'reprises-v2';
const CORE = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './preliminaires.js',
  './manifest.webmanifest',
  './icon.svg',
];
const PDFS = [
  "pdf/Club 1 CCE - Poney 1 CCE.pdf",
  "pdf/Club 1 Grand Prix - Club E1 Grand Prix - Poney Elite Grand Prix.pdf",
  "pdf/Club 1 Libre - Club E1 Libre - Poney Elite Libre.pdf",
  "pdf/Club 1 Préliminaire - Poney Elite Préliminaire.pdf",
  "pdf/Club 2 Libre - Club E2 Libre - Poney 1 Libre.pdf",
  "pdf/Club 2 Préliminaire - Poney 1 Préliminaire.pdf",
  "pdf/Club 3 CCE - Poney 3 CCE.pdf",
  "pdf/Club 3 Grand Prix - Poney 2 GP - Club E3 GP.pdf",
  "pdf/Club 3 Libre - Poney 2 Libre.pdf",
  "pdf/Club 3 Préliminaire - Poney 2 Préliminaire.pdf",
  "pdf/Club 4 - Poney 3.pdf",
  "pdf/Club 4 Carrousel.pdf",
  "pdf/Club Elite CCE.pdf",
  "pdf/Club Elite Grand Prix - Club E Elite Grand Prix -.pdf",
  "pdf/Club Elite Libre - Club E Elite Libre - As Poney 1 Libre.pdf",
  "pdf/Club Elite Préliminaire - As Poney 1 préliminaire.pdf",
  "pdf/Poney 1 Grand Prix - Club E2 Grand Prix - Club 2 Grand Prix.pdf",
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(VERSION)
      .then(c => c.addAll([...CORE, ...PDFS.map(p => encodeURI(p))]))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // Cache d'abord, puis réseau (et mise en cache de la réponse).
  e.respondWith(
    caches.match(req, { ignoreSearch: true }).then(hit => hit || fetch(req).then(res => {
      if (res && (res.ok || res.type === 'opaque')) {
        const copy = res.clone();
        caches.open(VERSION).then(c => c.put(req, copy));
      }
      return res;
    }).catch(() => caches.match('./index.html')))
  );
});
