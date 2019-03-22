'use strict'

const expect = require('chai').expect
const error = require('./index')

describe('Error', () => {
  it('should get error object', () => {
    expect(error).to.be.an('object')
  })
})
