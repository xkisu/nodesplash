require('dotenv').config()
const NodeSplash = require('../')

const client = new NodeSplash({
  accesskey: process.env.ACCESSKEY
})

client.photos.search('city', {
  per_page: 30
}).then(response => {
  const results = response.data.results
  for (let i = 0; i < results.length; ++i) {
    const photo = results[i]
    console.log(photo.urls.raw)
  }
})