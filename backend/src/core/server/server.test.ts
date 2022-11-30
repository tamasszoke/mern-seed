'use strict'

import { expect } from 'chai'
import { settings } from '../../core/config'
import server from './index'

let chai = require('chai')
let chaiHttp = require('chai-http')
let should = chai.should()
chai.use(chaiHttp)

// Disable console error messages
console.error = () => {}

describe('Server', () => {
  before(() => {
    process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'
    server.listen()
  })
  describe('#index', () => {
    it('should get server object', () => {
      expect(server).to.be.an('object')
    })
  })
  describe('#listen', () => {
    it('should get server.listen function', () => {
      expect(server.listen).to.be.a('function')
    })
    it('should get standard response from /', async () => {
      // @ts-ignore
      process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'
      const res = await chai.request(settings.url.api).get('/')
      res.should.have.status(200)
      res.body.should.be.an('object')
      res.body.success.should.be.eql(true)
    })
  })
  describe('#close', () => {
    it('should get server.close function', () => {
      expect(server.close).to.be.a('function')
    })
  })
  after(() => {
    process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '1'
    server.close()
  })
})
