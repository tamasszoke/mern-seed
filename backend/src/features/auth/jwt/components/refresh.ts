'use strict'

import User from '../../../user/user.model'
import crypto from 'crypto'
import expiration from './expiration'
import {
  ClientError,
  ServerError,
} from '../../../../core/server/server.interface'
import { settings } from '../../../../core/config'

/**
 * Generate refresh token
 * @param email string
 * @returns string
 */
const generate = async (email: string): Promise<string> => {
  const token = crypto.createHmac('sha512', email).digest('hex')
  const expires = expiration.generate(settings.jwt.refreshTokenExpiresIn)
  const refreshToken = {
    token,
    expiration: expires,
  }
  await save(email, refreshToken)
  return refreshToken.token
}

/**
 * Save refresh token to the database
 * @param email string
 * @param refreshToken object
 * @returns object
 */
const save = async (email: string, refreshToken: object) => {
  const user = await User.findOneAndUpdate(
    { email },
    {
      $set: {
        refreshToken,
      },
    },
    {
      new: true,
    }
  )
  if (!user) {
    throw new ServerError(5001, 'refresh token not saved')
  }
  return true
}

/**
 * Verify refresh jwt token
 * @param email string
 * @param refreshToken string
 * @returns object
 */
const verify = async (
  email: string,
  refreshToken: string
): Promise<boolean | Error> => {
  if (refreshToken.startsWith('Bearer ')) {
    refreshToken = refreshToken.slice(7, refreshToken.length)
  }
  if (refreshToken) {
    const user = await User.findOne({
      email,
      'refreshToken.token': refreshToken,
    })
    if (!user) {
      throw new ClientError(1002, 'account not found')
    }
    if (expiration.check(user.refreshToken.expiration) === true) {
      throw new ClientError(1007, 'refresh token expired')
    }
    return true
  } else {
    throw new ClientError(1008, 'refresh token not found')
  }
}

/**
 * Remove refresh token (logout)
 * @param refreshToken string
 * @returns object
 */
const remove = async (refreshToken: string): Promise<boolean> => {
  await User.findOneAndUpdate(
    { 'refreshToken.token': refreshToken },
    {
      $set: {
        refreshToken: null,
      },
    },
    {
      new: true,
    }
  )
  return true
}

export default {
  generate,
  save,
  verify,
  remove,
}
