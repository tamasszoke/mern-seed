'use strict'

import User from '../../../user/user.model'
import crypto from 'crypto'
import { UserResponse } from '../auth.interface'
import { ClientError } from '../../../../core/server/server.interface'

interface Password {
  salt: string
  hash: string
}

/**
 * Create random strings (salt)
 * @param length number
 * @returns string
 */
const createSalt = (length: number): string => {
  const salt = crypto
    .randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length)
  return salt
}

/**
 * Hash password with sha512
 * @param password string
 * @param salt string
 * @returns string
 */
const createHash = (password: string, salt: string): string => {
  let hash = crypto.createHmac('sha512', salt).update(password).digest('hex')
  return hash
}

/**
 * Create new password
 * @param password string
 * @returns object
 */
const create = (password: string): Password => {
  const salt = createSalt(16)
  const hash = createHash(password, salt)
  const result = {
    salt,
    hash,
  }
  return result
}

/**
 * Check current password
 * @param email string
 * @param password string
 * @returns object
 */
const check = async (
  email: string,
  password: string
): Promise<UserResponse> => {
  const user = await User.findOne(
    {
      email,
    },
    {
      _id: 1,
      email: 1,
      password: 1,
      salt: 1,
      active: 1,
      created: 1,
      updated: 1,
    }
  )
  const salt = user.salt
  const hash = createHash(password, salt)
  if (user.password === hash) {
    const result = {
      id: user._id,
      email: user.email,
      active: user.active,
      created: user.created,
      updated: user.updated,
    }
    return result
  } else {
    throw new ClientError(1004, 'invalid email or password')
  }
}

export default {
  createSalt,
  createHash,
  create,
  check,
}
