'use strict'

const User = require('../../user/user.model')
const crypto = require('crypto')
const Password = require('./password')

/**
 * Create recovery hash
 * @function
 * @param {object} data
 * @param {callback} callback
 */
const recovery = (data, callback) => {
  const { email } = data
  const hash = crypto.randomBytes(48).toString('hex')
  User.findOneAndUpdate({ email: email },
    {
      $set: {
        recovery: hash
      }
    },
    { new: true },
    (err, user) => {
      if (!err && user) {
        return callback(null, user)
      } else {
        return callback(err)
      }
    }
  )
}

/**
 * Check recovery hash, set new password
 * @function
 * @param {object} data
 * @param {callback} callback
 */
const recoveryHash = (data, callback) => {
  const { password, hash } = data
  const passwordData = Password.create(password)
  User.findOneAndUpdate({ recovery: hash },
    {
      $set: {
        salt: passwordData.salt,
        password: passwordData.password,
        recovery: null
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
  recovery,
  recoveryHash
}
