'use strict'

const expect = require('chai').expect
const { mail } = require('./index')

describe('Common - Email', () => {
  it('should get mail object', () => {
    expect(mail).to.be.an('object')
  })
  it('should get mail.send function', () => {
    expect(mail.send).to.be.a('function')
  })
  it('should not send email, missing parameters', () => {
    mail.send('', (error, result) => {
      expect(error).to.be.an('error') &&
      expect(result).to.equal(false)
    })
  })
})
