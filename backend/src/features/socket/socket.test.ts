'use strict'

import { expect } from 'chai'
import socket from './index'

describe('Socket', () => {
  describe('#index', () => {
    it('should get socket object', () => {
      expect(socket).to.be.an('object')
    })
  })
  describe('#init', () => {
    it('should get socket.init function', () => {
      expect(socket.init).to.be.a('function')
    })
  })
})
