'use strict'

const User = require('../user.model')
const crypto = require('crypto')
const middleware = require('./middleware')

/**
 * Register a new user
 * @function
 * @param {object} data
 * @param {callback} callback
 */
const register = (data, callback) => {
  const { username, name, email, password } = data
  const passwordData = middleware.createPassword(password)
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

/**
 * Activate an existing user
 * @function
 * @param {object} data
 * @param {callback} callback
 */
const activate = (data, callback) => {
  const { hash } = data
  User.findOneAndUpdate({ activation: hash },
    {
      $set: {
        active: true,
        activation: null
      }
    },
    {
      new: true
    },
    (err, user) => {
      if (!err && user) {
        return callback(null, user)
      } else {
        return callback(err)
      }
    }
  )
}

module.exports = {
  register,
  activate
}
