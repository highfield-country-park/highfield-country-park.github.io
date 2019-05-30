const version = '20190530170215';
const cacheName = `static::${version}`;

const buildContentBlob = () => {
  return ["/news/2019/05/30/forest-immersion-lets-learn-to-play-again/","/news/2019/05/29/changes-to-the-website/","/event/2019/03/20/join-our-first-volunteering-saturday-session/","/event/2019/03/19/spring-equinox-mindfulness-session/","/event/2018/12/01/night-time-mindfulness-starting-thursday-6th-december-2018/","/news/2018/11/06/new-development-to-be-resubmitted/","/news/2018/09/20/wild-awake-mindfulness-experience-blog-post/","/event/2018/08/23/art-in-the-park-tue-7th-august/","/event/2018/06/01/free-young-explorer-s-club-starting-summer-2018/","/event/2018/05/29/late-night-meditation-and-bedtime-stories-27th-june/","/about/","/events/","/blog/","/","/map/","/news/","/posts/","/volunteer/","/manifest.json","/assets/search.json","/assets/styles.css","/redirects.json","/sitemap.xml","/robots.txt","/feed.xml","", "/assets/default-offline-image.png", "/assets/scripts/fetch.js"
  ]
}

const updateStaticCache = () => {
  return caches.open(cacheName).then(cache => {
    return cache.addAll(buildContentBlob());
  });
};

const clearOldCache = () => {
  return caches.keys().then(keys => {
    // Remove caches whose name is no longer valid.
    return Promise.all(
      keys
        .filter(key => {
          return key !== cacheName;
        })
        .map(key => {
          console.log(`Service Worker: removing cache ${key}`);
          return caches.delete(key);
        })
    );
  });
};

self.addEventListener("install", event => {
  event.waitUntil(
    updateStaticCache().then(() => {
      console.log(`Service Worker: cache updated to version: ${cacheName}`);
    })
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(clearOldCache());
});

self.addEventListener("fetch", event => {
  let request = event.request;
  let url = new URL(request.url);

  // Only deal with requests from the same domain.
  if (url.origin !== location.origin) {
    return;
  }

  // Always fetch non-GET requests from the network.
  if (request.method !== "GET") {
    event.respondWith(fetch(request));
    return;
  }

  // Default url returned if page isn't cached
  let offlineAsset = "/offline/";

  if (request.url.match(/\.(jpe?g|png|gif|svg)$/)) {
    // If url requested is an image and isn't cached, return default offline image
    offlineAsset = "/assets/default-offline-image.png";
  }

  // For all urls request image from network, then fallback to cache, then fallback to offline page
  event.respondWith(
    fetch(request).catch(async () => {
      return (await caches.match(request)) || caches.match(offlineAsset);
    })
  );
  return;
});
