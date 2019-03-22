'use strict'

process.env.NODE_ENV = 'test'

const expect = require('chai').expect
const socket = require('./index')

describe('Socket', () => {
  it('should get socket object', () => {
    expect(socket).to.be.an('object')
  })
})
