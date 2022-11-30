'use strict'

import express from 'express'
import jwt from '../../jwt'
import pwd from './pwd'
import User from '../../../user/user.model'
import { settings } from '../../../../core/config'
import { UserResponse, UserData } from '../auth.interface'
import { ClientError } from '../../../../core/server/server.interface'

/**
 * Local authorization
 * Find an active user by email
 * @param token string
 * @param refreshToken string
 * @param res object
 * @returns object
 */
const check = async (
  token: string,
  refreshToken: string,
  res: express.Response
): Promise<UserResponse> => {
  await jwt.token.check(token, refreshToken, res)
  const payload = jwt.token.decode(token)
  const email = payload ? payload.email : null
  const user = await User.findOne(
    {
      email,
    },
    {
      _id: 1,
      email: 1,
      active: 1,
      created: 1,
      updated: 1,
    }
  )
  if (!user) {
    throw new ClientError(1002, 'account not found')
  } else if (!user.active) {
    throw new ClientError(1003, 'account not activated')
  }
  const result = {
    id: user._id,
    email: user.email,
    created: user.created,
    updated: user.updated,
  }
  return result
}

/**
 * Register a new user
 * @param data object
 * @returns object
 */
const join = async (data: UserData): Promise<UserResponse> => {
  const user = new User(data)
  await user.save()
  const result = {
    id: user._id,
    email: user.email,
    created: user.created,
    updated: user.updated,
  }
  return result
}

/**
 * Resend activation email
 * @param id string
 * @param activationCode string
 * @returns object
 */
const resend = async (
  id: string,
  activationCode: string
): Promise<UserResponse> => {
  const updated = new Date().toISOString()
  const user = await User.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        activationCode,
        updated,
      },
    },
    { new: true }
  )
  if (!user) {
    throw new ClientError(1002, 'account not found')
  }
  const result = {
    id: user._id,
    email: user.email,
    created: user.created,
    updated: user.updated,
  }
  return result
}

/**
 * Activate user
 * @param id string
 * @param activationCode string
 * @returns object
 */
const activate = async (
  id: string,
  activationCode: string
): Promise<UserResponse> => {
  const updated = new Date().toISOString()
  const user = await User.findOneAndUpdate(
    { _id: id, activationCode },
    {
      $set: {
        active: true,
        activationCode: '',
        updated,
      },
    },
    { new: true }
  )
  if (!user) {
    throw new ClientError(1002, 'account not found')
  }
  const result = {
    id: user._id,
    email: user.email,
    created: user.created,
    updated: user.updated,
  }
  return result
}

/**
 * Local authorization
 * Find an active user by email and password
 * @param email string
 * @param password string
 * @param res object
 * @returns object
 */
const login = async (
  email: string,
  password: string,
  res: express.Response
): Promise<UserResponse> => {
  const user = await pwd.check(email, password)
  if (!user) {
    throw new ClientError(1002, 'account not found')
  } else if (!user.active) {
    throw new ClientError(1003, 'account not activated')
  }
  const token = jwt.token.generate(email)
  const refreshToken = await jwt.refresh.generate(email)
  res.cookie('token', token, settings.cookie.options)
  res.cookie('refreshToken', refreshToken, settings.cookie.options)
  const result = {
    id: user.id,
    email: user.email,
    created: user.created,
    updated: user.updated,
  }
  return result
}

/**
 * Destroy user session
 * @param refreshToken string
 * @param res object
 * @returns boolean
 */
const logout = async (
  refreshToken: string,
  res: express.Response
): Promise<boolean> => {
  await jwt.refresh.remove(refreshToken)
  res.clearCookie('token', settings.cookie.options)
  res.clearCookie('refreshToken', settings.cookie.options)
  return true
}

/**
 * Recover user account
 * Only if account is activated
 * @param email string
 * @param recoveryCode string
 * @returns object
 */
const recover = async (
  email: string,
  recoveryCode: string
): Promise<UserResponse> => {
  const updated = new Date().toISOString()
  const user = await User.findOneAndUpdate(
    { email, active: true },
    {
      $set: {
        recoveryCode,
        updated,
      },
    },
    { new: true }
  )
  if (!user) {
    throw new ClientError(1002, 'account not found')
  }
  const result = {
    id: user._id,
    email: user.email,
    created: user.created,
    updated: user.updated,
  }
  return result
}

/**
 * Set recovered account password
 * Only if account is activated
 * @param id string
 * @param recoveryCode string
 * @param password string
 * @returns object
 */
const reset = async (
  id: string,
  recoveryCode: string,
  password: string,
  salt: string
): Promise<UserResponse> => {
  const updated = new Date().toISOString()
  const user = await User.findOneAndUpdate(
    { _id: id, recoveryCode, active: true },
    {
      $set: {
        password,
        salt,
        recoveryCode: '',
        updated,
      },
    },
    { new: true }
  )
  if (!user) {
    throw new ClientError(1002, 'account not found')
  }
  const result = {
    id: user._id,
    email: user.email,
    created: user.created,
    updated: user.updated,
  }
  return result
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
}
