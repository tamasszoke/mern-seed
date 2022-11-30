'use strict'

import { expect } from 'chai'
import { settings } from '../../core/config'
import server from '../../core/server'
import user from './index'
import User from './user.model'

let chai = require('chai')
let chaiHttp = require('chai-http')
let should = chai.should()
chai.use(chaiHttp)

// Disable console error messages
console.error = () => {}

describe('User', () => {
  before(() => {
    process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'
    server.listen()
  })
  describe('#model', () => {
    it('should get user model', () => {
      expect(User).to.exist
    })
  })
  describe('#index', () => {
    it('should get user object', () => {
      expect(user).to.be.an('object')
    })
  })
  describe('#check', () => {
    it('should get user.check function', () => {
      expect(user.check).to.be.an('function')
    })
    it('should get standard response from user/profile/check', async () => {
      const res = await chai
        .request(settings.url.api)
        .post('/api/user/profile/check', { id: '123456789' })
      res.should.have.status(401)
      res.body.should.be.an('object')
      res.body.should.have.property('success')
      res.body.should.have.property('status')
      res.body.should.have.property('result')
      res.body.should.have.property('error')
    })
  })
  describe('#remove', () => {
    it('should get user.remove function', () => {
      expect(user.remove).to.be.an('function')
    })
    it('should get standard response from user/profile/remove', async () => {
      const res = await chai
        .request(settings.url.api)
        .post('/api/user/profile/remove', { id: '123456789' })
      res.should.have.status(401)
      res.body.should.be.an('object')
      res.body.should.have.property('success')
      res.body.should.have.property('status')
      res.body.should.have.property('result')
      res.body.should.have.property('error')
    })
  })
  after(() => {
    process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '1'
    server.close()
  })
})
