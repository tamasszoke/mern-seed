'use strict'

const passport = require('passport')

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

module.exports = login
