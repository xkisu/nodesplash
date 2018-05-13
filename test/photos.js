require('dotenv').config()

const assert = require('assert')
const { expect } = require('chai')

const NodeSplash = require('../')

const client = new NodeSplash({
  accesskey: process.env.ACCESSKEY
})

describe('client.photos', () => {
  describe('#.client', () => {
    it('should equal the instantiation client', () => {
      assert.equal(client.photos.client, client)
    })
  })

  describe('#.search - Search photos', () => {
    var result
    beforeEach(() => {
      return client.photos.search('city', {}).then((response) => {
        result = response
      })
    })
    
    it('should return an 200 status code', () => {
      assert.equal(result.status, 200)
    })

    it('should return an object', () => {
      expect(result.data).to.be.an('object')
    })

    it('response.data[\'total\'] should be a number', () => {
      expect(result.data.total).to.be.an('number')
    })

    it('response.data[\'total_pages\'] should be a number', () => {
      expect(result.data.total_pages).to.be.an('number')
    })

    it('response.data.results should be an array', () => {
      expect(result.data.results).to.be.an('array')
    })
  })

  describe('#.list - List recent photos', () => {
    var result
    beforeEach(() => {
      return client.photos.list({}).then((response) => {
        result = response
      })
    })

    it('should return an 200 status code', () => {
      assert.equal(result.status, 200)
    })

    it('should return an array', () => {
      expect(result.data).to.be.an('array')
    })

    // TODO: check that array elements match photo structure
  })

  describe('#.curated - List recent curated photos', () => {
    var result
    beforeEach(() => {
      return client.photos.curated({}).then((response) => {
        result = response
      })
    })

    it('should return an 200 status code', () => {
      assert.equal(result.status, 200)
    })

    it('should return an array', () => {
      expect(result.data).to.be.an('array')
    })

    // TODO: check that array elements match photo structure
  })

  describe('#.get - Get a photo by id', () => {
    var result
    beforeEach(() => {
      return client.photos.get('twukN12EN7c', {}).then((response) => {
        result = response
      })
    })

    it('should return an 200 status code', () => {
      assert.equal(result.status, 200)
    })

    it('should return an object', () => {
      expect(result.data).to.be.an('object')
    })

    // TODO: check that array elements match photo structure
  })

  describe('#.random - Get a random photo', () => {
    var result
    beforeEach(() => {
      return client.photos.random({}).then((response) => {
        result = response
      })
    })

    it('should return an 200 status code', () => {
      assert.equal(result.status, 200)
    })

    it('should return an object', () => {
      expect(result.data).to.be.an('object')
    })

    // TODO: check that array elements match photo structure
  })

  describe('#.random({count: 5}) - Get multiple random photos', () => {
    var result
    beforeEach(() => {
      return client.photos.random({
        count: 5
      }).then((response) => {
        result = response
      })
    })

    it('should return an 200 status code', () => {
      assert.equal(result.status, 200)
    })

    it('should return an array', () => {
      expect(result.data).to.be.an('array')
    })

    it('should contain 5 elements', () => {
      expect(result.data).to.have.length(5)
    })

    // TODO: check that array elements match photo structure
  })

  describe('#.stats - Get the statistics for a photo', () => {
    var result
    beforeEach(() => {
      return client.photos.stats('twukN12EN7c', {}).then((response) => {
        result = response
      })
    })

    it('should return an 200 status code', () => {
      assert.equal(result.status, 200)
    })

    it('should return an object', () => {
      expect(result.data).to.be.an('object')
    })

    // TODO: check that array elements match photo structure
  })

  describe('#.download - Get the download URL for a photo', () => {
    var result
    beforeEach(() => {
      return client.photos.download('twukN12EN7c').then((response) => {
        result = response
      })
    })

    it('should return an 200 status code', () => {
      assert.equal(result.status, 200)
    })

    it('should return an object', () => {
      expect(result.data).to.be.an('object')
    })
  })
})