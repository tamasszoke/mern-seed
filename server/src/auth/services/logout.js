'use strict'

/**
 * Destroy user session
 * @function
 * @param {object} req
 * @param {callback} callback
 */
const logout = (req, callback) => {
  try {
    req.logOut()
    return callback()
  } catch (err) {
    return callback(err)
  }
}

module.exports = logout
