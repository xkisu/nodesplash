# NodeSplash

A Node.JS module for interating with the https://unsplash.com/ API. Functions as a wrapper around Axios to simplify making requests to the Unsplash API.

# Installing
```
npm i xkisu/nodesplash
```

# Usage 

Create a new client
```javascript
const NodeSplash = require('nodesplash')

const client = new NodeSplash({
  accesskey: '<unsplash access key>'
})
```

Example for searching photos
```javascript
client.photos.search('city', {
  per_page: 30
}).then(response => {
  const results = response.data.results
  for (let i = 0; i < results.length; ++i) {
    const photo = results[i]
    console.log(photo.urls.raw)
  }
})
```

# Documentation

Coming soon