'use strict'

const User = require('../user.model')
const crypto = require('crypto')

/**
 * Create random strings (salt)
 * @function
 * @param {number} length
 */
const createSalt = (length) => {
  return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length)
}

/**
 * Hash password with sha512
 * @function
 * @param {string} password
 * @param {string} salt
 */
const createHash = (password, salt) => {
  let hash = crypto.createHmac('sha512', salt)
  hash.update(password)
  return hash.digest('hex')
}

/**
 * Create new password
 * @function
 * @param {string} password
 */
const createPassword = (password) => {
  if (!password) {
    return false
  }
  const salt = createSalt(16)
  const hash = createHash(password, salt)
  return {
    salt,
    password: hash
  }
}

/**
 * Check current password
 * @function
 * @param {string} email
 * @param {string} password
 * @param {callback} callback
 */
const checkPassword = (email, password, callback) => {
  if (!email || !password) {
    return callback(null)
  }
  User.findOne({ email: email, active: true }, (err, user) => {
    if (!err && user && user.length !== 0) {
      const salt = user.salt
      const hash = createHash(password, salt)
      if (user.password === hash) {
        return callback(null, user)
      } else {
        return callback(new Error('Wrong password!'), null)
      }
    } else {
      return callback(err, null)
    }
  })
}

module.exports = {
  createPassword,
  checkPassword
}
