'use strict'

process.env.NODE_ENV = 'test'

const expect = require('chai').expect
const auth = require('./index')

describe('Auth', () => {
  it('should get auth object', () => {
    expect(auth).to.be.an('object')
  })
})
