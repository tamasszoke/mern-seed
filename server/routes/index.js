'use strict'

const homeRoute = require('./home')
const authRoute = require('./auth')
const userRoute = require('./user')
const paypalRoute = require('./paypal')
const errorRoute = require('./error')

/**
 * Initializing routes
 */
const init = (app) => {
  app.use('/api/auth', authRoute)
  app.use('/api/user', userRoute)
  app.use('/api/paypal', paypalRoute)
  app.use('*', homeRoute)
  app.use('*', errorRoute)
}

module.exports = {
  init
}
