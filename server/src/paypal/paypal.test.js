'use strict'

process.env.NODE_ENV = 'test'

const expect = require('chai').expect
const paypal = require('./paypal')

describe('Paypal', () => {
  it('should get paypal object', () => {
    expect(paypal).to.be.an('object')
  })
  it('should get paypal.complete function', () => {
    expect(paypal.complete).to.be.a('function')
  })
})
