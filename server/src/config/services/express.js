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
  app.use(helmet())
  app.use(cors())
  app.use('/build/static', express.static(config.clientStaticFolder))
  app.use('/build', express.static(config.clientBuildFolder))
  app.set('views', config.clientBuildFolder)
  app.engine('html', require('ejs').renderFile)
  app.set('view engine', 'html')
  app.use(cookieParser())
  app.use(bodyParser.json())
  return app
}

module.exports = {
  init
}
