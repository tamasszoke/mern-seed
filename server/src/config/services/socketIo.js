'use strict'

const show = require('./logging')
const socket = require('../../socket')
const socketio = require('socket.io')

/**
 * Start socket.io listening
 * @function
 * @param {object} server
 */
const listen = (server) => {
  const io = socketio.listen(server)
  socket.init(io)
  show.debug('Socket.IO connected')
}

/**
 * Close socket.io connection
 * @function
 */
const close = () => {
  socketio.close()
  show.debug('Socket.IO closed')
}

module.exports = {
  listen,
  close
}
