'use strict'

import express from 'express'
import profile from './components/profile'
import { settings, show } from '../../core/config'
import { ClientError } from '../../core/server/server.interface'
import { response } from '../../core/server'

/**
 * Get all user data
 * @param req object
 * @param res object
 * @param next object
 * @returns object
 */
const check = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<express.Response<any, Record<string, any>>> => {
  try {
    show.debug('[USER][PROFILE][CHECK] Request')
    const { id } = req.body
    if (!id) {
      throw new ClientError(1001, 'parameters not found')
    }
    let result = await profile.check(id)
    show.debug('[USER][PROFILE][CHECK] Success')
    return response.send(res, 200, result, false)
  } catch (err: any) {
    show.debug(
      `[USER][PROFILE][CHECK] Error ${err.type} ${err.code} ${err.message}`
    )
    if (err.type === 'client') {
      return response.send(res, 400, false, err)
    } else {
      return response.send(res, 500, false, err)
    }
  }
}

/**
 * Remove user account
 * @param req object
 * @param res object
 * @param next object
 * @returns object
 */
const remove = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<express.Response<any, Record<string, any>>> => {
  try {
    show.debug('[USER][PROFILE][REMOVE] Request')
    const { id } = req.body
    if (!id) {
      throw new ClientError(1001, 'parameters not found')
    }
    let result = await profile.remove(id)
    res.clearCookie('token', settings.cookie.options)
    res.clearCookie('refreshToken', settings.cookie.options)
    show.debug('[USER][PROFILE][REMOVE] Success')
    return response.send(res, 200, result, false)
  } catch (err: any) {
    show.debug(
      `[USER][PROFILE][REMOVE] Error ${err.type} ${err.code} ${err.message}`
    )
    if (err.type === 'client') {
      return response.send(res, 400, false, err)
    } else {
      return response.send(res, 500, false, err)
    }
  }
}

export default {
  check,
  remove,
}
