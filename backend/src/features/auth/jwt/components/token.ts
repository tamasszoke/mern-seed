'use strict'

import express from 'express'
import jwt from 'jsonwebtoken'
import { settings } from '../../../../core/config'
import refresh from './refresh'
import { ClientError } from '../../../../core/server/server.interface'

/**
 * Check jwt token, generating new
 * token if refreshToken is valid
 * Also found at ./protect.js
 * @param token string
 * @param refreshToken string
 * @param res object
 * @returns boolean
 */
const check = async (
  token: string,
  refreshToken: string,
  res: express.Response
): Promise<boolean> => {
  try {
    verify(token)
    return true
  } catch (err: any) {
    if (err.name.toLowerCase() === 'tokenexpirederror') {
      const payload = decode(token)
      const email = payload.email || null
      await refresh.verify(email, refreshToken)
      const newToken = generate(email)
      res.cookie('token', newToken, {
        sameSite: 'none',
        secure: true,
        httpOnly: true,
      })
      // Without the lines below the user session will expire after the
      // expiration days you have set for the refresh token (default is 7 days)
      //
      // Keep the user logged in as long as both the token
      // and the refresh token is not expired (for short live refresh tokens)
      // Database query every time generating new refresh token
      // const newRefreshToken = refresh.generate(email)
      // res.cookie('refreshToken', newRefreshToken, {
      //   sameSite: 'none',
      //   secure: true,
      //   httpOnly: true,
      // })
      return true
    } else {
      throw new ClientError(1006, 'token error')
    }
  }
}

/**
 * Generate a JWT token
 * @param email string
 * @returns object
 */
const generate = (email: string): string => {
  const payload = {
    email,
  }
  const signOptions = {
    expiresIn: settings.jwt.tokenExpiresIn,
    algorithm: 'RS256',
  }
  // @ts-ignore
  const token = jwt.sign(payload, settings.jwt.secret, signOptions)
  return token
}

/**
 * Verify jwt token
 * @param token string
 * @returns object
 */
const verify = (token: string): jwt.Jwt & jwt.JwtPayload & void => {
  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length)
  }
  if (token) {
    const verifyOptions = {
      expiresIn: settings.jwt.tokenExpiresIn,
      algorithm: ['RS256'],
    }
    // @ts-ignore
    const result = jwt.verify(token, settings.jwt.public, verifyOptions)
    return result
  } else {
    throw new ClientError(1005, 'token not found')
  }
}

/**
 * Decode token, payload only
 * @param token string
 * @returns object
 */
const decode = (token: string): any => {
  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length)
  }
  const payload = jwt.decode(token)
  return payload
}

export default {
  check,
  generate,
  verify,
  decode,
}
