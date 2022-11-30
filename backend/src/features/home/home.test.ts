'use strict'

import { expect } from 'chai'
import { settings } from '../../core/config'
import server from '../../core/server'
import home from './index'

let chai = require('chai')
let chaiHttp = require('chai-http')
let should = chai.should()
chai.use(chaiHttp)

describe('Home', () => {
  before(() => {
    process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'
    server.listen()
  })
  describe('#index', () => {
    it('should get home object', () => {
      expect(home).to.be.an('object')
    })
  })
  describe('#main', () => {
    it('should get home.main function', () => {
      expect(home.main).to.be.a('function')
    })
    it('should get standard response from /', async () => {
      const res = await chai.request(settings.url.api).get('/')
      res.should.have.status(200)
      res.body.should.be.an('object')
      res.body.success.should.be.eql(true)
    })
  })
  after(() => {
    process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '1'
    server.close()
  })
})
