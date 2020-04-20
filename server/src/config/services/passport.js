'use strict'

const {
  googleClientId,
  googleClientSecret,
  githubClientId,
  githubClientSecret
} = require('./config')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy
const GitHubStrategy = require('passport-github2').Strategy
const Password = require('../../auth/services/password')
const google = require('../../auth/services/google')
const github = require('../../auth/services/github')
const User = require('../../user/user.model')
const show = require('./logging')

/**
 * Find an active user by email and password
 * @function
 * @param {string} email
 * @param {string} password
 * @param {callback} callback
 */
const findUser = (email, password, callback) => {
  Password.check(email, password, (err, user) => {
    if (!err && user) {
      return callback(null, user)
    } else {
      return callback(null)
    }
  })
}

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findOne({ id }, (err, user) => {
    if (err) {
      return done(err)
    }
    done(null, user)
  })
})

/**
 * Passport localstrategy
 */
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, (email, password, done) => {
  if (!email || !password) {
    return done(null, false)
  }
  findUser(email, password, (err, user) => {
    if (err) {
      return done(err, null)
    }
    if (!user || user === undefined || user.length === 0) {
      return done(null, false)
    }
    return done(null, user)
  })
}))

/**
 * Passport googlestrategy
 */
passport.use(new GoogleStrategy({
  clientID: googleClientId,
  clientSecret: googleClientSecret,
  callbackURL: `https://localhost:3001/api/auth/login/google/callback`
},
(accessToken, refreshToken, profile, done) => {
  process.nextTick(() => {
    const email = profile.emails[0].value
    User.findOne({ email }, (err, user) => {
      if (err) {
        return done(err, null)
      } else if (!user || user === undefined || user.length === 0) {
        show.debug('User not found, creating profile...')
        google.register({
          email,
          username: `${profile.name.givenName.toLowerCase()}${profile.name.familyName.toLowerCase()}`,
          name: `${profile.displayName}`
        }, (err, user) => {
          if (!err && user) {
            return done(null, user)
          } else {
            return done(err, null)
          }
        })
      } else {
        show.debug('User found...')
        return done(null, user)
      }
    })
  })
}))

/**
 * Passport githubstrategy
 */
passport.use(new GitHubStrategy({
  clientID: githubClientId,
  clientSecret: githubClientSecret,
  callbackURL: `https://localhost:3001/api/auth/login/github/callback`,
  scope: ['user:email']
},
(accessToken, refreshToken, profile, done) => {
  process.nextTick(() => {
    const email = profile.emails[0].value
    User.findOne({ email }, (err, user) => {
      if (err) {
        return done(err, null)
      } else if (!user || user === undefined || user.length === 0) {
        show.debug('User not found, creating profile...')
        github.register({
          email,
          username: profile.username,
          name: profile.displayName
        }, (err, user) => {
          if (!err && user) {
            return done(null, user)
          } else {
            return done(err, null)
          }
        })
      } else {
        show.debug('User found...')
        return done(null, user)
      }
    })
  })
}))

/**
 * Initialize passport
 * @function
 */
const init = (app) => {
  app.use(passport.initialize())
  app.use(passport.session())
}

module.exports = {
  init
}
