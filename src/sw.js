import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';
import { clientsClaim, skipWaiting } from 'workbox-core';

registerRoute(
  new RegExp('https://fonts.googleapis.com'),
  new CacheFirst({ cacheName: 'google-apis' })
);

registerRoute(
  new RegExp('https://fonts.gstatic.com'),
  new CacheFirst({ cacheName: 'g-static' })
);

registerRoute(
  new RegExp(/\.(?:eot|ttf|woff|woff2)$/),
  new CacheFirst({ cacheName: 'font-icons' })
);

registerRoute(
  new RegExp(/\.(?:css|js|png|jpg|svg|gif)$/),
  new CacheFirst({ cacheName: 'assets' })
);

registerRoute(
  new RegExp('/team.html'),
  new StaleWhileRevalidate({ cacheName: 'pages' })
);

registerRoute(
  new RegExp('https://api.football-data.org'),
  new StaleWhileRevalidate({ cacheName: 'api' })
);

registerRoute(
  new RegExp('https://crests.football-data.org'),
  new StaleWhileRevalidate({ cacheName: 'emblem-team' })
);

skipWaiting();
clientsClaim();

precacheAndRoute(self.__WB_MANIFEST, { ignoreURLParametersMatching: [/.*/] });
