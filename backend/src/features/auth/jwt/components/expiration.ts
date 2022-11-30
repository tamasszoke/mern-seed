'use strict'

/**
 * Generate expiration timestamp from days
 * @param days number
 * @returns number
 */
const generate = (days: number): number => {
  const expiration = Number(
    new Date(new Date().getTime() + days * 24 * 60 * 60 * 1000)
  )
  return expiration
}

/**
 * Check if refresh token expired
 * @param expiration number
 * @returns boolean
 */
const check = (expiration: number): boolean => {
  if (Date.now() < expiration) {
    return false
  } else {
    return true
  }
}

export default {
  generate,
  check,
}
