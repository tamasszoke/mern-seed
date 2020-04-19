'use strict'

const passport = require('passport')
const crypto = require('crypto')
const Password = require('./password')
const User = require('../../user/user.model')

/**
 * Passport local authentication
 */
const login = (req, res, next, cb) => {
  passport.authenticate('local', { session: true }, (err, user, info) => {
    if (err) {
      return cb(err)
    }
    if (!user) {
      return cb(null, null)
    }
    req.logIn(user, (err) => {
      if (!err && user) {
        return cb(null, user)
      } else {
        return cb(err)
      }
    })
  })(req, res, next)
}

/**
 * Register a new user
 * @function
 * @param {object} data
 * @param {callback} callback
 */
const register = (data, callback) => {
  const { username, name, email, password } = data
  const passwordData = Password.create(password)
  const id = crypto.createHmac('sha512', email).update(name).digest('hex')
  const activationHash = crypto.randomBytes(48).toString('hex')
  if (!name || !email || !passwordData) {
    return callback(new Error('Parameters not found!'))
  }
  const user = new User({
    id,
    username,
    name,
    email,
    salt: passwordData.salt,
    password: passwordData.password,
    activation: activationHash
  })
  user.save((err, user) => {
    if (!err && user) {
      return callback(null, user)
    } else {
      return callback(err)
    }
  })
}

module.exports = {
  login,
  register
}
