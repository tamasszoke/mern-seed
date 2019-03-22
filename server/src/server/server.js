'use strict'

const {
  config,
  express,
  session,
  passport,
  db,
  show,
  stats,
  socket
} = require('../config')
const routes = require('../../routes')
const mongoose = require('mongoose')
const spdy = require('spdy')

let server = null

/**
 * Start HTTP/2 server, database, socket.io connection
 * Load routes, services, check memory usage
 * @function
 */
const listen = () => {
  const app = express.init()
  session.init(app)
  passport.init(app)
  db.init()
  server = spdy.createServer(config.sslOptions, app).listen(config.port, config.ip)
  show.debug(`Listening at https://${config.host}:${config.port}`)
  socket.listen(server)
  routes.init(app)
  stats.memory()
}

/**
 * Close server, database connection
 * @function
 */
const close = () => {
  server.close()
  mongoose.disconnect()
  show.debug('Server down')
}

module.exports = {
  listen,
  close
}
