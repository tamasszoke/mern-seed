'use strict'

import show from './logging'
import socket from '../../../features/socket'
import { Server } from 'socket.io'

let io: any = {}

/**
 * Start socket.io server
 * @param server object
 */
const listen = (server: object): boolean => {
  try {
    io = new Server(server)
    socket.init(io)
    show.debug('[SOCKET] Server started')
    return true
  } catch (err: any) {
    const error = err.toString()
    show.debug(error)
    return false
  }
}

/**
 * Close socket.io server
 */
const close = (): boolean => {
  try {
    io.close()
    show.debug('[SOCKET] Server closed')
    return true
  } catch (err: any) {
    const error = err.toString()
    show.debug(error)
    return false
  }
}

export default {
  listen,
  close,
}
