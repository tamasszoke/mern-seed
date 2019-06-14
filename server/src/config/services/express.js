'use strict'

const config = require('./config')
const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const cors = require('cors')

/**
 * Express configuration
 * @function
 */
const init = () => {
  const app = express()
  const corsOptions = {
    origin: true,
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Origin': true,
    'Access-Control-Allow-Headers': true,
    'Access-Control-Expose-Headers': true,
    credentials: true
  }
  app.use('/build/static', express.static(config.clientStaticFolder))
  app.use('/build', express.static(config.clientBuildFolder))
  app.set('views', config.clientBuildFolder)
  app.engine('html', require('ejs').renderFile)
  app.set('view engine', 'html')
  app.use(cookieParser(config.redisSecret))
  app.use(bodyParser.json())
  app.use(cors(corsOptions))
  app.use(helmet())
  return app
}

module.exports = {
  init
}
