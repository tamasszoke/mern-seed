'use strict'

import express from 'express'
import { settings } from '../../config'
import { helper } from '../../../common'
import { Response } from '../server.interface'

/**
 * Send standard response to a request
 * @param res express.Response
 * @param status number
 * @param result object | boolean
 * @returns
 */
const send = (
  res: express.Response,
  status: number,
  result: boolean | object,
  err: any
): express.Response<any, Record<string, any>> => {
  let success = true
  let error: any = false
  if (!helper.isEmpty(err)) {
    error = {
      type: err.type,
      code: err.code,
      message: err.message,
    }
  }
  switch (status) {
    case 200:
      success = true
      break
    case 400:
      success = false
      error.message =
        settings.env === 'production' ? 'bad request' : error.message
      break
    case 401:
      success = false
      error.message =
        settings.env === 'production' ? 'unauthorized' : error.message
      break
    case 404:
      success = false
      error.message =
        settings.env === 'production' ? 'not found' : error.message
      break
    case 500:
      success = false
      error.message =
        settings.env === 'production' ? 'internal server error' : error.message
      break
    default:
      success = false
      error.message = settings.env === 'production' ? 'error' : error.message
      break
  }
  const response: Response = {
    success,
    status,
    result,
    error,
  }
  return res.status(status).json(response)
}

export default { send }
