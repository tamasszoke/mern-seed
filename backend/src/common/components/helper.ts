'use strict'

/**
 * Checks if an object is empty
 * @function
 * @param obj object
 * @returns boolean
 */
const isEmpty = (obj: any): boolean => {
  if (!obj || obj === undefined) return true
  if (Object.entries(obj).length === 0) {
    return true
  } else {
    return false
  }
}

/**
 * Generates a number between range
 * @param min number
 * @param max number
 * @returns number
 */
const randomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export default { isEmpty, randomNumber }
