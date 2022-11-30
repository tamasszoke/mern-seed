'use strict'

import { expect } from 'chai'
import common from './index'

describe('Common', () => {
  describe('#index', () => {
    it('should get common object', () => {
      expect(common).to.be.an('object')
    })
  })
  describe('#mail', () => {
    it('should get mail object', () => {
      expect(common.mail).to.be.an('object')
    })
    it('should get mail.send function', () => {
      expect(common.mail.send).to.be.a('function')
    })
  })
  describe('#helper', () => {
    it('should get helper object', () => {
      expect(common.helper).to.be.an('object')
    })
    it('should get helper.isEmpty function', () => {
      expect(common.helper.isEmpty).to.be.an('function')
    })
    it('isEmpty function should return true if empty', () => {
      const obj = {}
      expect(common.helper.isEmpty(obj)).to.be.true
    })
    it('isEmpty function should return false if non-empty', () => {
      const obj = { name: 'test' }
      expect(common.helper.isEmpty(obj)).to.be.false
    })
    it('should get randomNumber function', () => {
      expect(common.helper.randomNumber).to.be.a('function')
    })
    it('randomNumber function should return a number between 10 and 100', () => {
      const num = common.helper.randomNumber(10, 100)
      expect(num).to.be.a('number')
      expect(num).to.be.at.least(10)
      expect(num).to.be.at.most(100)
    })
  })
})
