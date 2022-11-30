'use strict'

import express from 'express'
import swaggerUi from 'swagger-ui-express'
import { specs, styles } from '../../core/config/components/swagger'
import { settings } from '../../core/config'

const router = express.Router()

if (settings.env === 'development') {
  router.use('/', swaggerUi.serve, swaggerUi.setup(specs, styles))
}

export default router
