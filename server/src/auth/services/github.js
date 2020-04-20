'use strict'

const passport = require('passport')
const crypto = require('crypto')
const User = require('../../user/user.model')

/**
 * Passport google authentication
 * @param {object} req
 * @param {object} res
 * @param {object} next
 */
const login = (req, res, next) => {
  passport.authenticate('github', { scope: ['user:email'], session: true })(req, res, next)
}

/**
 * Passport google callback
 * @param {object} req
 * @param {object} res
 * @param {object} next
 */
const callback = (req, res, next) => {
  passport.authenticate('github', { failureRedirect: '/login', session: true })(req, res, next)
}

/**
 * Passport google authenticated
 * @param {string} url
 * @param {object} req
 * @param {object} res
 */
const ready = (url, req, res) => {
  res.redirect(url)
}

/**
 * Register a new user with google
 * @function
 * @param {object} data
 * @param {callback} cb
 */
const register = (data, cb) => {
  const { username, name, email } = data
  const id = crypto.createHmac('sha512', email).update(name).digest('hex')
  if (!name) {
    return cb(new Error('Parameters not found!'))
  }
  const user = new User({
    id,
    email,
    username,
    name,
    activation: null,
    active: false
  })
  user.save((err, user) => {
    if (!err && user) {
      return cb(null, user)
    } else {
      return cb(err)
    }
  })
}

module.exports = {
  login,
  callback,
  ready,
  register
}
