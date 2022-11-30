'use strict'

import { show } from '../../core/config'

/**
 * Socket connection
 * @param io object
 */
const init = (io: any): void => {
  io.on('connection', (socket: any): void => {
    show.debug('[SOCKET] Client connected!')

    socket.on('namespace', (message: object): void => {
      show.debug(message)
    })

    socket.on('disconnect', (): void => {
      show.debug('[SOCKET] Client disconnected!')
    })
  })
}

export default {
  init,
}

/**
 * https://socket.io/docs/emit-cheatsheet/
 */
