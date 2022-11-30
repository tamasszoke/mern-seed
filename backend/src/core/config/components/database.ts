'use strict'

import settings from './settings'
import show from './logging'
import mongoose from 'mongoose'
import { ServerError } from '../../server/server.interface'

/**
 * Connecting to database
 */
const init = async (): Promise<boolean> => {
  try {
    mongoose.set('runValidators', true)
    const db = mongoose.connection
    const url = settings.database.url
    handleError(db)
    handleConnection(db)
    await mongoose.connect(url)
    return true
  } catch (err: any) {
    const error = err.toString()
    show.debug(error)
    return false
  }
}

/**
 * Database error
 * @param db object
 */
const handleError = (db: mongoose.Connection): void => {
  db.on('error', (error: any) => {
    show.debug('[DATABASE] Connection error', error)
    throw new ServerError(5000, 'database connection error')
  })
}

/**
 * Database connected
 * @param db object
 */
const handleConnection = (db: mongoose.Connection): void => {
  db.on('connected', () => {
    show.debug('[DATABASE] Connected')
  })
}

const close = async (): Promise<boolean> => {
  try {
    await mongoose.disconnect()
    return true
  } catch (err: any) {
    const error = err.toString()
    show.debug(error)
    return false
  }
}

export default {
  init,
  close,
}
