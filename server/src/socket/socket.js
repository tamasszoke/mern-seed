'use strict'

/**
 * Socket connection
 */
const init = (io) => {
  const { show } = require('../config')

  io.on('connection', (socket) => {
    show.debug('Socket client connected!')

    socket.on('randomNamespace', (message) => {
      show.debug(message)
    })

    socket.on('disconnect', () => {
      show.debug('Socket client disconnected!')
    })
  })
}

module.exports = {
  init
}

/**
 * https://socket.io/docs/emit-cheatsheet/
 */
