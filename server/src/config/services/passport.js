'use strict'

const passport = require('passport')

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
