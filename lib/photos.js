/**
 * Enum for order_by options.
 * @readonly
 * @enum {string}
 */
const ORDER_BY = {
  latest: 'latest',
  oldest: 'oldest',
  popular: 'popular'
} 

/**
 * Enum for orientation options.
 * @readonly
 * @enum {string}
 */
const ORIENTATION = {
  landscape: 'landscape',
  portrait: 'portrait',
  squarish: 'squarish'
}

/**
 * Creates a new object for querying photos
 */
class QueryPhotos {
  /**
   * @param {UnsplashClient} client 
   */
  constructor (client) {
    this.client = client
  }

  /**
   * Search UnSplash photos
   * @param {string} query - The search query
   * @param {Object} options 
   * @param {number} options.page - Page number to retrive (default 1).
   * @param {number} options.per_page - Number of items per page (default 10).
   * @param {string} options.collections - Collection ID(‘s) to narrow search. If multiple, comma-separated.
   * @param {ORIENTATION} options.orientation - Filter search results by photo orientation.
   */
  search (query, options) {
    if(!query) throw new Error('Argument "query" must be defined!')
    const defaultOptions = {
      per_page: 10,
      page: 1,
      collections: undefined,
      orientation: undefined
    }
    var searchOptions = Object.assign({}, defaultOptions, options)
    searchOptions.query = query || ''

    return this.client.axios.get('/search/photos', {
      params: searchOptions
    })
  }

  /**
   * Gets the latest photos
   * @param {Object} options 
   * @param {number} options.page - Page number to retrive.
   * @param {number} options.per_page - Number of items per page.
   * @param {ORDER_BY} options.order_by - How to order the photos.
   */
  list (options) {
    const defaultOptions = {
      page: 1,
      per_page: 10,
      order_by: 'latest'
    }
    const listOptions = Object.assign({}, defaultOptions, options)
    if(!ORDER_BY[listOptions.order_by]) throw new Error('Argument "options.order_by" is not a valid value, must be one of ' + ORDER_BY.join(', '))

    return this.client.axios.get('/photos', {
      params: listOptions
    })
  }

  /**
   * Browse curated photos
   * @param {Object} options 
   * @param {number} options.page - Page number to retrive (default 1).
   * @param {number} options.per_page - Number of items per page (default 10).
   * @param {ORDER_BY} options.order_by - How to sort the photos (default 'latest').
   */
  curated (options) {
    const defaultOptions = {
      page: 1,
      per_page: 10,
      order_by: 'latest'
    }
    const listOptions = Object.assign({}, defaultOptions, options)

    return this.client.axios.get('/photos/curated', {
      params: listOptions
    })
  }

  /**
   * Gets a specific photo by id
   * @param {string} id 
   * @param {Object} options 
   * @param {string} options.id - The photo's ID, required.
   * @param {number} option.w - Image width in pixels.
   * @param {number} option.h - Image height in pixels.
   * @param {string} option.rect - 4 comma-separated integers representing x, y, width, height of the cropped rectangle.
   */
  get (id, options) {
    if(!id) throw new Error('Argument "id" must be defined')
    const defaultOptions = {
      w: undefined,
      h: undefined,
      rect: undefined
    }
    var getOptions = Object.assign({}, defaultOptions, options)
    getOptions.id = id

    return this.client.axios.get('/photos/' + id, {
      params: getOptions
    })
  }

  /**
   * Gets a random photo
   * @param {Object} options 
   * @param {string} options.collections - Public collection ID(‘s) to filter selection. If multiple, comma-separated.
   * @param {string} options.featured - Limit selection to featured photos.
   * @param {string} options.username - Limit selection to a single user.
   * @param {string} options.query - Limit selection to photos matching a search term.
   * @param {number} options.w - Image width in pixels.
   * @param {number} options.h - Image height in pixels.
   * @param {ORIENTATION} options.orientation - Filter search results by photo orientation. Valid values are landscape, portrait, and squarish.
   * @param {number} options.count - The number of photos to return. (Default: 1; max: 30).
   */
  random (options) {
    const defaultOptions = {}
    var randomOptions = Object.assign({}, defaultOptions, options)

    return this.client.axios.get('/photos/random', {
      params: randomOptions
    })
  }

  /**
   * Gets the statistics for an image
   * @param {string} id - The photo ID to retrieve stats for
   * @param {Object} options 
   * @param {string} options.resolution - The frequency of the stats. (Optional; default: “days”). Currently only 'days' is supported.
   * @param {number} options.quantity - The amount of for each stat. (Optional; default: 30).
   */
  stats (id, options) {
    if(!id) throw new Error('Argument "id" must be defined')
    const defaultOptions = {
      resolution: 'days',
      quantity: 30
    }
    var statsOptions = Object.assign({}, defaultOptions, options)
    statsOptions.id = id

    return this.client.axios.get(`/photos/${id}/statistics`, {
      params: statsOptions
    })
  }

  /**
   * Get the photo's download URL
   * @param {string} id - The photo's ID
   */
  download (id) {
    if(!id) throw new Error('Argument "id" must be defined')

    return this.client.axios.get(`/photos/${id}/download`)
  }

  // TODO: implement user auth 
  // https://unsplash.com/documentation#update-a-photo
  // https://unsplash.com/documentation#like-a-photo
  // https://unsplash.com/documentation#unlike-a-photo
}

module.exports = QueryPhotos