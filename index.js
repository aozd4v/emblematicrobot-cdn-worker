addEventListener('fetch', event => {
  event.respondWith(handleEvent(event))
})

async function handleEvent(event) {
  let request = event.request
  let url = new URL(request.url.replace('assets.emblematicrobot-cdn.com/', 'scarlettfireball.blob.core.windows.net/'))

  request = new Request(url, request)

  let cache = caches.default
  let response = await cache.match(request)
  
  if (!response) {
    response = await fetch(url, request)
    event.waitUntil(cache.put(request, response.clone()))
  }

  return response
}