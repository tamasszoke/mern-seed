'use strict'

process.env.NODE_ENV = 'test'

const expect = require('chai').expect
const home = require('./home')

describe('Home', () => {
  it('should get home object', () => {
    expect(home).to.be.an('object')
  })
  it('should get home.index function', () => {
    expect(home.index).to.be.a('function')
  })
})
