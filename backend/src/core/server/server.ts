'use strict'

import spdy from 'spdy'
import mongoose from 'mongoose'
import { express, database, socket, settings, stats, show } from '../config'
import routes from './server.routes'

let server: any

// Disable console error messages
console.error = () => {}

/**
 * Start server, database, socket.io connection
 * Load routes, services, check memory usage
 */
const listen = (): void => {
  const app = express.init()
  database.init()
  server = spdy.createServer(settings.ssl, app)
  server.listen(settings.port, settings.host)
  show.debug(`[SERVER] Listening on https://localhost:${settings.port}`)
  routes.init(app)
  socket.listen(server)
  stats.memory()
  return server
}

/**
 * Close server, database connection
 */
const close = (): void => {
  server.close()
  mongoose.disconnect()
  show.debug('[SERVER] Down')
}

export default { listen, close }
