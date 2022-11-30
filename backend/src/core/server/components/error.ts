'use strict'

import express from 'express'
import response from './response'
import { settings, show } from '../../config/config'
import { ClientError } from '../server.interface'

/**
 * Routing error handler
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
const routing = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): express.Response<any, Record<string, any>> | undefined => {
  if (settings.env === 'production') {
    res.render('index')
  } else {
    show.debug('[ERROR]: Route not found!')
    const error = new ClientError(1000, 'route not found')
    return response.send(res, 404, false, error)
  }
}

/**
 * Global error handler middleware
 * @param err Error
 * @param req Request
 * @param res Response
 * @param next NextFunction
 * @returns
 */
const internal = (
  err: any,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  show.debug(`[ERROR] Global error ${err}`)
  return response.send(res, 500, false, err)
}

/**
 * Error handler for uncaught exceptions
 */
process.on('uncaughtException', (err, origin) => {
  show.debug(`[ERROR] Uncaught exception ${err}, origin ${origin}`)
  process.exitCode = 1 // Exit gracefully
})

/**
 * Error handler for unhandled rejected promises
 */
process.on('unhandledRejection', (reason: any, promise: any) => {
  show.debug(
    `[ERROR] Unhandled Rejection ${promise.toString()}, reason ${reason.toString()}`
  )
  process.exitCode = 1 // Exit gracefully
})

export default {
  routing,
  internal,
}
