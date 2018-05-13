const EventEmitter = require('eventemitter3')
const axios = require('axios')

const QueryPhotos = require('./lib/photos')

/**
 * Main class for creating a unsplash client
 */
class UnsplashClient extends EventEmitter {
  /**
   * Create a new Unsplash client
   * @param {Object} options 
   */
  constructor (options) {
    super()
    if (!options.accesskey) throw new Error('Property "accesskey" must be defined')

    this.axios = axios.create({
      baseURL: 'https://api.unsplash.com/',
      timeout: 1000,
      headers: {
        'Authorization': `Client-ID ${options.accesskey}`
      }
    })

    this.photos = new QueryPhotos(this)
    /* this.axios.interceptors.request.use(function (config) {
      console.log(config)
      // 401
      // Do something before request is sent
      return config
    }, function (error) {
      if (error.response.status == 401) {

      } else {
        // Do something with request error
        return Promise.reject(error)
      }
    }) */
  }

    
}

module.exports = UnsplashClient