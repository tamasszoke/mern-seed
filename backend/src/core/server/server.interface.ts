'use strict'

class ClientError extends Error {
  type: string
  code: number
  constructor(code: number, message: string) {
    super(message)
    this.type = 'client'
    this.code = code
  }
}

/**
 * ClientError code list
 *
 * 1000: route not found
 * 1001: parameters not found
 * 1002: account not found
 * 1003: account not activated
 * 1004: invalid email or password
 * 1005: token not found
 * 1006: token error
 * 1007: refresh token expired
 * 1008: refresh token not found
 */

class ServerError extends Error {
  type: string
  code: number
  constructor(code: number, message: string) {
    super(message)
    this.type = 'server'
    this.code = code
  }
}

/**
 * ServerError code list
 *
 * 5000: database connection error
 * 5001: refresh token not saved
 */

interface Response {
  success: boolean
  status: number
  result: boolean | object
  error: any
}

/**
 * Response code list
 *
 * 200: Everything worked as expected
 * 400: Bad request, often due to missing a required parameter
 * 401: Unauthorized, no valid JWT token provided
 * 404: Not found, the resource was not found
 * 500: Server error, something went wrong on the server
 */

export { ClientError, ServerError, Response }
