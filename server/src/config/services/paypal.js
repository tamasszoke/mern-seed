'use strict'

const config = require('./config')

/**
 *
 * PayPal Node JS SDK dependency
 */
const checkoutNodeJssdk = require('@paypal/checkout-server-sdk')

/**
 * Returns PayPal HTTP client instance with environment that has access
 * credentials context. Use this instance to invoke PayPal APIs, provided the
 * credentials have access.
 */
const client = () => {
  return new checkoutNodeJssdk.core.PayPalHttpClient(environment())
}

/**
 * Set up and return PayPal JavaScript SDK environment with PayPal access credentials.
 * This sample uses SandboxEnvironment. In production, use LiveEnvironment.
 */
const environment = () => {
  let clientId = config.paypalClientId
  let clientSecret = config.paypalClientSecret

  return new checkoutNodeJssdk.core.SandboxEnvironment(
    clientId, clientSecret
  )
}

const prettyPrint = async (jsonData, pre = '') => {
  let pretty = ''
  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
  }
  for (let key in jsonData) {
    if (jsonData.hasOwnProperty(key)) {
      if (isNaN(key)) {
        pretty += pre + capitalize(key) + ': '
      } else {
        pretty += pre + (parseInt(key) + 1) + ': '
      }
      if (typeof jsonData[key] === 'object') {
        pretty += '\n'
        pretty += await prettyPrint(jsonData[key], pre + '    ')
      } else {
        pretty += jsonData[key] + '\n'
      }
    }
  }
  return pretty
}

module.exports = {
  client: client,
  prettyPrint: prettyPrint
}
