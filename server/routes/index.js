'use strict'

const homeRoute = require('./home')
const userRoute = require('./user')
const errorRoute = require('./error')

/**
 * Initialize routes
 */
const init = (app) => {
  app.use('*', homeRoute)
  app.use('/api/user', userRoute)
  app.use('*', errorRoute)
}

module.exports = {
  init
}
