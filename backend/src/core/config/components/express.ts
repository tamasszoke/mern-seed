'use strict'

import settings from './settings'
import express, { Express } from 'express'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import contentSecurityPolicy from 'helmet-csp'

/**
 * Express configuration
 * @returns object
 */
const init = (): Express => {
  const app = express()
  const corsOptions = {
    origin: true,
    credentials: true,
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Origin': true,
    'Access-Control-Allow-Headers': true,
    'Access-Control-Expose-Headers': true,
  }
  const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 200, // Limit each IP to 20 requests per windowMs
  })
  // Merged with the frontend in production
  if (settings.env === 'production') {
    // Frontend files
    app.use('/', express.static(`${settings.folder.frontend}`))
    app.use('/static', express.static(`${settings.folder.frontend}/static`))
    app.use('/images', express.static(`${settings.folder.frontend}/images`))
    app.set('views', settings.folder.public)
    app.engine('html', require('ejs').renderFile)
    app.set('view engine', 'html')
  } else {
    // API documentation files
    app.use('/public', express.static(`${settings.folder.public}`))
  }
  app.use(cookieParser(settings.cookie.secret))
  app.use(
    bodyParser.json({
      limit: '50mb',
    })
  )
  app.use(cors(corsOptions))
  app.use(helmet())
  app.use(
    contentSecurityPolicy({
      useDefaults: true,
      directives: {
        defaultSrc: ["'self'"],
        imgSrc: ["'self'", 'data:', 'storage.ko-fi.com'],
      },
      reportOnly: false,
    })
  )
  app.use('/api/auth', limiter)
  return app
}

export default {
  init,
}
