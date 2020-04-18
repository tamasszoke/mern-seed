'use strict'

const { profileUpdate, profileRemove } = require('./services/profile')
const { show } = require('../config')
const action = {}

/**
 * Password change
 */
action.passChange = (req, res, next) => {
  show.debug('Changing password...')
  return res.json({
    type: 'passchange',
    result: 'Not implemented!'
  })
}

/**
 * Profile change
 */
action.profileUpdate = (req, res, next) => {
  const data = req.body
  show.debug('Changing profile...')
  profileUpdate(data, (err, user) => {
    if (!err && user) {
      show.debug('Profile change success!')
      const data = {
        id: user.id,
        username: user.username,
        name: user.name,
        email: user.email,
        age: user.age,
        location: user.location
      }
      return res.json({
        type: 'profileupdate',
        success: true,
        user: data
      })
    } else {
      show.debug('Profile change failed!')
      return res.json({
        type: 'profileupdate',
        success: false
      })
    }
  })
}

/**
 * Profile remove
 */
action.profileRemove = (req, res, next) => {
  const data = req.body
  show.debug('Removing user...')
  profileRemove(data, (err) => {
    if (!err) {
      show.debug('Profile remove success!')
      return res.json({
        type: 'profileremove',
        success: true
      })
    } else {
      show.debug('Profile remove failed!')
      return res.json({
        type: 'profileremove',
        success: false
      })
    }
  })
}

module.exports = action
