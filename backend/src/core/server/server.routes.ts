'use strict'

import { Express } from 'express'

import homeRoute from '../../features/home/home.routes'
import authRoute from '../../features/auth/auth/auth.routes'
import userRoute from '../../features/user/user.routes'
import docsRoute from '../../features/docs/docs.routes'
import { error } from './index'

/**
 * Initializing routes
 * @param app Express
 */
const init = (app: Express) => {
  app.use('/', homeRoute)
  app.use('/api/auth', authRoute)
  app.use('/api/user', userRoute)
  app.use('/api/docs', docsRoute)
  app.use('*', error.routing)
  app.use(error.internal)
}

export default {
  init,
}
