'use strict'

const User = require('../user.model')

/**
 * Update user
 * @function
 * @param {object} data
 * @param {callback} callback
 */
const update = (data, callback) => {
  const { id, username, name, email, age, location } = data
  User.findOneAndUpdate({ id, email, active: true },
    {
      $set: {
        username,
        name,
        age,
        location
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

/**
 * Remove user
 * @function
 * @param {object} data
 * @param {callback} callback
 */
const remove = (data, callback) => {
  const { id, email } = data
  User.deleteOne({ id, email }, (err) => {
    if (!err) {
      return callback(null)
    } else {
      return callback(err)
    }
  })
}

module.exports = {
  profileUpdate: update,
  profileRemove: remove
}
