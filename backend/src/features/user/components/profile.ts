'use strict'

import User from '../user.model'
import { ClientError } from '../../../core/server/server.interface'

/**
 * Get all user data by id
 * @param id string
 * @returns object
 */
const check = async (id: string): Promise<any> => {
  const result = await User.findOne({ _id: id })
  if (!result) {
    throw new ClientError(1002, 'account not found')
  }
  return result
}

/**
 * Remove user by id
 * @param id string
 * @returns object
 */
const remove = async (id: string): Promise<any> => {
  const result = await User.findOneAndRemove({ _id: id })
  if (!result) {
    throw new ClientError(1002, 'account not found')
  }
  return true
}

export default { check, remove }
export { check, remove }
