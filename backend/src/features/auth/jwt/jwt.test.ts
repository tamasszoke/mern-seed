'use strict'

import { expect } from 'chai'
import jwt from './index'

describe('Jwt', () => {
  describe('#index', () => {
    it('should get jwt object', () => {
      expect(jwt).to.be.an('object')
    })
  })
  describe('#token', () => {
    it('should get token object', () => {
      expect(jwt.token).to.be.an('object')
    })
    it('should get token.check function', () => {
      expect(jwt.token.check).to.be.a('function')
    })
    it('should get token.generate function', () => {
      expect(jwt.token.generate).to.be.a('function')
    })
    it('should get token.verify function', () => {
      expect(jwt.token.verify).to.be.a('function')
    })
    it('should get token.decode function', () => {
      expect(jwt.token.decode).to.be.a('function')
    })
  })
  describe('#refresh', () => {
    it('should get refresh object', () => {
      expect(jwt.refresh).to.be.an('object')
    })
    it('should get refresh.generate function', () => {
      expect(jwt.refresh.generate).to.be.a('function')
    })
    it('should get refresh.save function', () => {
      expect(jwt.refresh.save).to.be.a('function')
    })
    it('should get refresh.verify function', () => {
      expect(jwt.refresh.verify).to.be.a('function')
    })
    it('should get refresh.remove function', () => {
      expect(jwt.refresh.remove).to.be.a('function')
    })
  })
  describe('#expiration', () => {
    it('should get expiration object', () => {
      expect(jwt.expiration).to.be.an('object')
    })
    it('should get expiration.generate function', () => {
      expect(jwt.expiration.generate).to.be.a('function')
    })
    it('should get expiration.check function', () => {
      expect(jwt.expiration.check).to.be.a('function')
    })
  })
})
