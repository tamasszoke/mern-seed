'use strict'

import { expect } from 'chai'
import { settings } from '../../../core/config'
import server from '../../../core/server'
import auth from './index'

let chai = require('chai')
let chaiHttp = require('chai-http')
let should = chai.should()
chai.use(chaiHttp)

// Disable console error messages
console.error = () => {}

describe('Auth', () => {
  before(() => {
    process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'
    server.listen()
  })
  describe('#index', () => {
    it('should get auth object', () => {
      expect(auth).to.be.an('object')
    })
  })
  describe('#check', () => {
    it('should get auth.check function', () => {
      expect(auth.check).to.be.an('function')
    })
    it('should get standard response from auth/local/check', async () => {
      const res = await chai
        .request(settings.url.api)
        .get('/api/auth/local/check')
      res.should.have.status(400)
      res.body.should.be.an('object')
      res.body.should.have.property('success')
      res.body.should.have.property('status')
      res.body.should.have.property('result')
      res.body.should.have.property('error')
    })
  })
  describe('#join', () => {
    it('should get auth.join function', () => {
      expect(auth.join).to.be.an('function')
    })
    it('should get standard response from auth/local/join', async () => {
      const res = await chai
        .request(settings.url.api)
        .put('/api/auth/local/join')
        .send({ email: '' })
      res.should.have.status(400)
      res.body.should.be.an('object')
      res.body.should.have.property('success')
      res.body.should.have.property('status')
      res.body.should.have.property('result')
      res.body.should.have.property('error')
    })
  })
  describe('#activate', () => {
    it('should get auth.activate function', () => {
      expect(auth.activate).to.be.an('function')
    })
    it('should get standard response from auth/local/activate', async () => {
      const res = await chai
        .request(settings.url.api)
        .post('/api/auth/local/activate')
        .send({ email: '' })
      res.should.have.status(400)
      res.body.should.be.an('object')
      res.body.should.have.property('success')
      res.body.should.have.property('status')
      res.body.should.have.property('result')
      res.body.should.have.property('error')
    })
  })
  describe('#login', () => {
    it('should get auth.login function', () => {
      expect(auth.login).to.be.an('function')
    })
    it('should get standard response from auth/local/login', async () => {
      const res = await chai
        .request(settings.url.api)
        .post('/api/auth/local/login')
        .send({ email: '' })
      res.should.have.status(400)
      res.body.should.be.an('object')
      res.body.should.have.property('success')
      res.body.should.have.property('status')
      res.body.should.have.property('result')
      res.body.should.have.property('error')
    })
  })
  describe('#logout', () => {
    it('should get auth.logout function', () => {
      expect(auth.logout).to.be.an('function')
    })
    it('should get standard response from auth/local/logout', async () => {
      const res = await chai
        .request(settings.url.api)
        .post('/api/auth/local/activate')
      res.should.have.status(400)
      res.body.should.be.an('object')
      res.body.should.have.property('success')
      res.body.should.have.property('status')
      res.body.should.have.property('result')
      res.body.should.have.property('error')
    })
  })
  describe('#recover', () => {
    it('should get auth.recover function', () => {
      expect(auth.recover).to.be.an('function')
    })
    it('should get standard response from auth/local/recover', async () => {
      const res = await chai
        .request(settings.url.api)
        .post('/api/auth/local/recover')
      res.should.have.status(400)
      res.body.should.be.an('object')
      res.body.should.have.property('success')
      res.body.should.have.property('status')
      res.body.should.have.property('result')
      res.body.should.have.property('error')
    })
  })
  describe('#reset', () => {
    it('should get auth.reset function', () => {
      expect(auth.reset).to.be.an('function')
    })
    it('should get standard response from auth/local/reset', async () => {
      const res = await chai
        .request(settings.url.api)
        .post('/api/auth/local/reset')
      res.should.have.status(400)
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
