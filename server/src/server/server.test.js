'use strict'

process.env.NODE_ENV = 'test'

const expect = require('chai').expect
const https = require('https')
const assert = require('assert')
const { config } = require('../config')
const server = require('./server')

describe('Server', () => {
  it('should get server object', () => {
    expect(server).to.be.an('object')
  })
  it('should get server.listen function', () => {
    expect(server.listen).to.be.a('function')
  })
  it('should get server.close function', () => {
    expect(server.close).to.be.a('function')
  })
  server.listen()
  it('should return 200 (self signed)', (done) => {
    process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0
    https.get(`https://${config.host}:${config.port}`, (res) => {
      assert.strict.equal(200, res.statusCode)
      done()
    })
  })
  after(() => {
    server.close()
  })
})
