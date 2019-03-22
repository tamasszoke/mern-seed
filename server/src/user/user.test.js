'use strict'

process.env.NODE_ENV = 'test'

const expect = require('chai').expect
const user = require('./index')

describe('User', () => {
  it('should get user object', () => {
    expect(user).to.be.an('object')
  })
})
