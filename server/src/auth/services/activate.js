'use strict'

const User = require('../../user/user.model')

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
  activate
}
