'use strict'

const login = require('./services/login')
const logout = require('./services/logout')
const { register, activate } = require('./services/registration')
const { recovery, recoveryHash } = require('./services/recovery')
const { profileUpdate, profileRemove } = require('./services/profile')
const mail = require('../common/services/email')
const { config, show } = require('../config')
const action = {}

/**
 * Check login
 */
action.checkLogin = (req, res) => {
  if (req.isAuthenticated()) {
    show.debug('Logged in!')
  } else {
    show.debug('Not logged in!')
  }
}

/**
 * Login
 */
action.login = (req, res, next) => {
  show.debug('Logging in...')
  login(req, res, next, (err, user) => {
    if (!err && user) {
      show.debug('Login success!')
      const data = {
        id: user.id,
        username: user.username,
        name: user.name,
        email: user.email,
        age: user.age,
        location: user.location
      }
      return res.json({
        type: 'login',
        success: true,
        user: data
      })
    } else if (!err && !user) {
      show.debug('User not found!')
      return res.json({
        type: 'login',
        success: false
      })
    } else {
      show.debug('Login error!')
      return res.json({
        type: 'login',
        success: false
      })
    }
  })
}

/**
 * Logout
 */
action.logout = (req, res, next) => {
  show.debug('Logging out...')
  logout(req, (err) => {
    if (!err) {
      show.debug('Logout success!')
      return res.json({
        type: 'logout',
        success: true
      })
    } else {
      show.debug('Logout failed!')
      return res.json({
        type: 'logout',
        success: false
      })
    }
  })
}

/**
 * Registration
 */
action.registration = (req, res, next) => {
  show.debug('Registrating...')
  const data = req.body
  register(data, (err, user) => {
    if (!err && user) {
      show.debug('Registration success!')
      mail.send({
        to: data.email,
        subject: 'N-R-B | Registration',
        content: '<h1>Wecome ' + data.name + '!</h1>Successfully registered!<h2><a href="' + config.url + '/activation/' + user.activation + '" target="_new">Activate account</a></h2>'
      }, (error, sent) => {
        if (!error && sent) {
          return res.json({
            type: 'registration',
            success: true
          })
        } else {
          return res.json({
            type: 'registration',
            success: true
          })
        }
      })
    } else {
      show.debug('Registration failed!')
      return res.json({
        type: 'registration',
        success: false
      })
    }
  })
}

/**
 * Activation
 */
action.activation = (req, res, next) => {
  const data = req.body
  show.debug('Activating...')
  activate(data, (err, user) => {
    if (!err && user) {
      show.debug('Activation success!')
      return res.json({
        type: 'activation',
        success: true
      })
    } else {
      show.debug('Activation failed!')
      return res.json({
        type: 'activation',
        success: false
      })
    }
  })
}

/**
 * Password reset
 */
action.recovery = (req, res, next) => {
  const data = req.body
  show.debug('Recovery...')
  if (!data.hash) {
    recovery(data, (err, user) => {
      if (!err && user) {
        mail.send({
          to: user.email,
          subject: 'N-R-B | Recovery',
          content: '<h1>Recovery</h1>Click this link to reset your password: <a href="' + config.url + '/recovery/' + user.recovery + '" target="_new">Reset password</a>'
        }, (err, sent) => {
          if (!err && sent) {
            show.debug('Recovery success!')
            return res.json({
              type: 'recovery',
              success: true
            })
          } else {
            show.debug('Recovery failed!')
            return res.json({
              type: 'recovery',
              success: false
            })
          }
        })
      } else {
        show.debug('Recovery failed!')
        return res.json({
          type: 'recovery',
          success: false
        })
      }
    })
  } else {
    recoveryHash(data, (err, user) => {
      if (!err && user) {
        show.debug('Recovery success!')
        return res.json({
          type: 'recovery',
          success: true
        })
      } else {
        show.debug('Recovery failed!')
        return res.json({
          type: 'recovery',
          success: false
        })
      }
    })
  }
}

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
