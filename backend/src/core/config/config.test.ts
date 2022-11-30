'use strict'

import { expect } from 'chai'
import config, {
  settings,
  express,
  database,
  nodemailer,
  socket,
  show,
  stats,
  swagger,
} from './index'

describe('Config', () => {
  describe('#index', () => {
    it('should get config object', () => {
      expect(config).to.be.an('object')
    })
  })
  describe('#settings', () => {
    it('should get settings object', () => {
      expect(settings).to.be.an('object')
    })
    it('should have default properties', () => {
      expect(settings).to.have.property('env')
      expect(settings).to.have.property('name')
      expect(settings).to.have.property('host')
      expect(settings).to.have.property('port')
      expect(settings).to.have.property('url')
      expect(settings).to.have.property('ssl')
      expect(settings).to.have.property('database')
      expect(settings).to.have.property('jwt')
      expect(settings).to.have.property('cookie')
      expect(settings).to.have.property('email')
      expect(settings).to.have.property('folder')
    })
  })
  describe('#express', () => {
    it('should get express object', () => {
      expect(express).to.be.an('object')
    })
    it('should get express.init function', () => {
      expect(express.init).to.be.a('function')
    })
  })
  describe('#database', () => {
    it('should get database object', () => {
      expect(database).to.be.an('object')
    })
    it('should get database.init function', () => {
      expect(database.init).to.be.a('function')
    })
    it('init function should return true', async () => {
      const db = await database.init()
      expect(db).to.be.true
    })
    it('should get database.close function', () => {
      expect(database.close).to.be.a('function')
    })
    it('close function should return true', async () => {
      const db = await database.close()
      expect(db).to.be.true
    })
  })
  describe('#nodemailer', () => {
    it('should get nodemailer object', () => {
      expect(nodemailer).to.be.an('object')
    })
  })
  describe('#socket', () => {
    it('should get socket object', () => {
      expect(socket).to.be.an('object')
    })
    it('should get socket.listen function', () => {
      expect(socket.listen).to.be.a('function')
    })
    it('should get socket.close function', () => {
      expect(socket.close).to.be.a('function')
    })
  })
  describe('#show', () => {
    it('should get show object', () => {
      expect(show).to.be.an('object')
    })
  })
  describe('#stats', () => {
    it('should get stats object', () => {
      expect(stats).to.be.an('object')
    })
    it('should get stats.memory function', () => {
      expect(stats.memory).to.be.a('function')
    })
  })
  describe('#swagger', () => {
    it('should get swagger object', () => {
      expect(swagger).to.be.an('object')
    })
    it('should get swagger.specs object', () => {
      expect(swagger.specs).to.be.an('object')
    })
  })
})
