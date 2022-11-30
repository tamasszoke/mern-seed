'use strict'

import express from 'express'
import { settings } from '../../core/config'
import { response } from '../../core/server'

/**
 * Render main page
 * @param req object
 * @param res object
 */
const main = (
  req: express.Request,
  res: express.Response
): express.Response<any, Record<string, any>> | undefined => {
  if (settings.env === 'production') {
    res.render('index')
  } else {
    return response.send(res, 200, true, false)
  }
}

export default {
  main,
}
