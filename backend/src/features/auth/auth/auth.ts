'use strict'

import express from 'express'
import local from './components/local'
import { show } from '../../../core/config'
import pwd from './components/pwd'
import jwt from '../jwt'
import { helper, mail } from '../../../common'
import { ClientError } from '../../../core/server/server.interface'
import { response } from '../../../core/server'

const templateDir = 'features/auth/auth/templates'

/**
 * Check login
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
    show.debug('[AUTH][CHECK] Request')
    const { token, refreshToken } = req.cookies
    if (!token || !refreshToken) {
      throw new ClientError(1001, 'parameters not found')
    }
    let result = await local.check(token, refreshToken, res)
    show.debug('[AUTH][CHECK] Success')
    return response.send(res, 200, result, false)
  } catch (err: any) {
    show.debug(`[AUTH][CHECK] Error ${err.type} ${err.code} ${err.message}`)
    if (err.type === 'client') {
      return response.send(res, 400, false, err)
    } else {
      return response.send(res, 500, false, err)
    }
  }
}

/**
 * Registration
 * @param req object
 * @param res object
 * @param next object
 * @returns object
 */
const join = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<express.Response<any, Record<string, any>> | undefined> => {
  try {
    show.debug('[AUTH][JOIN] Request')
    const { email, password } = req.body
    if (!email || !password) {
      throw new ClientError(1001, 'parameters not found')
    }
    const passwordData = pwd.create(password)
    const activationCode = helper.randomNumber(1000, 10000).toString()
    const created = new Date().toISOString()
    const data = {
      email,
      salt: passwordData.salt,
      password: passwordData.hash,
      activationCode,
      created,
      updated: created,
    }
    let result = await local.join(data)
    show.debug('[AUTH][JOIN] Success')
    await mail.send(`${templateDir}/join.ejs`, 'Join', result.email, {
      user: result,
      code: activationCode,
    })
    return response.send(res, 200, result, false)
  } catch (err: any) {
    show.debug(`[AUTH][JOIN] Error ${err.type} ${err.code} ${err.message}`)
    if (
      err.type === 'client' ||
      (err.name === 'MongoServerError' && err.code === 11000) // Duplicated record
    ) {
      return response.send(res, 400, false, err)
    } else {
      return response.send(res, 500, false, err)
    }
  }
}

/**
 * Send activation code again
 * Resending registration email
 * @param req object
 * @param res object
 * @param next object
 * @returns object
 */
const resend = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<express.Response<any, Record<string, any>>> => {
  try {
    show.debug('[AUTH][RESEND] Request')
    const { id } = req.body
    if (!id) {
      throw new ClientError(1001, 'parameters not found')
    }
    const activationCode = helper.randomNumber(1000, 10000).toString()
    let result = await local.resend(id, activationCode)
    await mail.send(`${templateDir}/join.ejs`, 'Join', result.email, {
      user: result,
      code: activationCode,
    })
    show.debug('[AUTH][RESEND] Success')
    return response.send(res, 200, result, false)
  } catch (err: any) {
    show.debug(`[AUTH][RESEND] Error ${err.type} ${err.code} ${err.message}`)
    if (err.type === 'client') {
      return response.send(res, 400, false, err)
    } else {
      return response.send(res, 500, false, err)
    }
  }
}

/**
 * Activate user
 * @param req object
 * @param res object
 * @param next object
 * @returns object
 */
const activate = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<express.Response<any, Record<string, any>>> => {
  try {
    show.debug('[AUTH][ACTIVATE] Request')
    const { id, activationCode } = req.body
    if (!id || !activationCode) {
      throw new ClientError(1001, 'parameters not found')
    }
    let result = await local.activate(id, activationCode)
    show.debug('[AUTH][ACTIVATE] Success')
    await mail.send(`${templateDir}/activate.ejs`, 'Activation', result.email, {
      user: result,
    })
    return response.send(res, 200, result, false)
  } catch (err: any) {
    show.debug(`[AUTH][ACTIVATE] Error ${err.type} ${err.code} ${err.message}`)
    if (err.type === 'client') {
      return response.send(res, 400, false, err)
    } else {
      return response.send(res, 500, false, err)
    }
  }
}

/**
 * Login
 * @param req object
 * @param res object
 * @param next object
 * @returns object
 */
const login = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<express.Response<any, Record<string, any>> | undefined> => {
  try {
    show.debug('[AUTH][LOGIN] Request')
    const { email, password } = req.body
    if (!email || !password) {
      throw new ClientError(1001, 'parameters not found')
    }
    let result = await local.login(email, password, res)
    show.debug('[AUTH][LOGIN] Success')
    return response.send(res, 200, result, false)
  } catch (err: any) {
    show.debug(`[AUTH][LOGIN] Error ${err.type} ${err.code} ${err.message}`)
    if (err.type === 'client') {
      return response.send(res, 400, false, err)
    } else {
      return response.send(res, 500, false, err)
    }
  }
}

/**
 * Logout
 * @param req object
 * @param res object
 * @param next object
 * @returns object
 */
const logout = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<express.Response<any, Record<string, any>>> => {
  try {
    show.debug('[AUTH][LOGOUT] Request')
    const { token, refreshToken } = req.cookies
    if (!token || !refreshToken) {
      throw new ClientError(1001, 'parameters not found')
    }
    let result = await local.logout(refreshToken, res)
    show.debug('[AUTH][LOGOUT] Success')
    return response.send(res, 200, result, false)
  } catch (err: any) {
    show.debug(`[AUTH][LOGOUT] Error ${err.type} ${err.code} ${err.message}`)
    if (err.type === 'client') {
      return response.send(res, 400, false, err)
    } else {
      return response.send(res, 500, false, err)
    }
  }
}

/**
 * Recover user account
 * @param req object
 * @param res object
 * @param next object
 * @returns object
 */
const recover = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<express.Response<any, Record<string, any>>> => {
  try {
    show.debug('[AUTH][RECOVER] Request')
    const { email } = req.body
    if (!email) {
      throw new ClientError(1001, 'parameters not found')
    }
    const recoveryCode = helper.randomNumber(1000, 10000).toString()
    let result = await local.recover(email, recoveryCode)
    show.debug('[AUTH][RECOVER] Success')
    await mail.send(`${templateDir}/recover.ejs`, 'Recovery', result.email, {
      user: result,
      code: recoveryCode,
    })
    return response.send(res, 200, result, false)
  } catch (err: any) {
    show.debug(`[AUTH][RECOVER] Error ${err.type} ${err.code} ${err.message}`)
    if (err.type === 'client') {
      return response.send(res, 400, false, err)
    } else {
      return response.send(res, 500, false, err)
    }
  }
}

/**
 * Set recovered account password
 * @param req object
 * @param res object
 * @param next object
 * @returns object
 */
const reset = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<express.Response<any, Record<string, any>>> => {
  try {
    show.debug('[AUTH][RESET] Request')
    const { id, recoveryCode, password } = req.body
    if (!id || !recoveryCode || !password) {
      throw new ClientError(1001, 'parameters not found')
    }
    const passwordData = pwd.create(password)
    let result = await local.reset(
      id,
      recoveryCode,
      passwordData.hash,
      passwordData.salt
    )
    show.debug('[AUTH][RESET] Success')
    await mail.send(`${templateDir}/reset.ejs`, 'Reset', result.email, {
      user: result,
    })
    return response.send(res, 200, result, false)
  } catch (err: any) {
    show.debug(`[AUTH][RESET] Error ${err.type} ${err.code} ${err.message}`)
    if (err.type === 'client') {
      return response.send(res, 400, false, err)
    } else {
      return response.send(res, 500, false, err)
    }
  }
}

/**
 *  Route protection for authorized users
 * @param req object
 * @param res object
 * @param next object
 * @returns object
 */
const protect = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<express.Response<any, Record<string, any>> | undefined> => {
  try {
    show.debug('[AUTH][PROTECT] Request')
    const { token, refreshToken } = req.cookies
    if (!token || !refreshToken) {
      throw new ClientError(1001, 'parameters not found')
    }
    jwt.token.check(token, refreshToken, res)
    show.debug('[AUTH][PROTECT] Success')
    next()
  } catch (err: any) {
    show.debug(`[AUTH][PROTECT] Error ${err.type} ${err.code} ${err.message}`)
    if (err.type === 'client') {
      return response.send(res, 401, false, err)
    } else {
      return response.send(res, 500, false, err)
    }
  }
}

export default {
  check,
  join,
  resend,
  activate,
  login,
  logout,
  recover,
  reset,
  protect,
}
