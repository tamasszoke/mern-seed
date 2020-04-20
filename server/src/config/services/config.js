'use strict'

const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
let basePath = path.join(__dirname, '../../../')
const env = process.env.NODE_ENV
if (env === 'production') {
  basePath = './'
}
const envPath = path.join(basePath, `.env/${env}.config.env`)
const envConfig = require('dotenv').config({
  path: envPath
})
if (envConfig.error) {
  throw envConfig.error
}
const redisSecret = crypto.randomBytes(48).toString('hex')

/**
 * Test config
 */
const test = {
  env,
  ip: process.env.IP,
  host: process.env.HOST,
  port: process.env.PORT,
  url: `http://${process.env.CLIENT_HOST}:${process.env.CLIENT_PORT}`,
  redisUrl: process.env.REDIS_URL,
  redisSecret,
  sslOptions: {
    key: fs.readFileSync(path.join(basePath, `ssl/${process.env.SSL_KEY}`)),
    cert: fs.readFileSync(path.join(basePath, `ssl/${process.env.SSL_CRT}`))
  },
  emailAddress: process.env.EMAIL_ADDRESS,
  emailPassword: process.env.EMAIL_PASS,
  mongoUrl: `mongodb://${process.env.DB_USER}:${encodeURIComponent(process.env.DB_PASS)}@${process.env.DB_HOST}`,
  clientStaticFolder: path.join(basePath, 'client/build/static'),
  clientBuildFolder: path.join(basePath, 'client/build'),
  paypalClientId: process.env.PAYPAL_CLIENT_ID || '',
  paypalClientSecret: process.env.PAYPAL_CLIENT_SECRET || '',
  googleClientId: process.env.GOOGLE_CLIENT_ID || '',
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  githubClientId: process.env.GITHUB_CLIENT_ID || '',
  githubClientSecret: process.env.GITHUB_CLIENT_SECRET || ''
}

/**
 * Development config
 */
const development = {
  env,
  ip: process.env.IP,
  host: process.env.HOST,
  port: process.env.PORT,
  url: `http://${process.env.CLIENT_HOST}:${process.env.CLIENT_PORT}`,
  redisUrl: process.env.REDIS_URL,
  redisSecret,
  sslOptions: {
    key: fs.readFileSync(path.join(basePath, `ssl/${process.env.SSL_KEY}`)),
    cert: fs.readFileSync(path.join(basePath, `ssl/${process.env.SSL_CRT}`))
  },
  emailAddress: process.env.EMAIL_ADDRESS,
  emailPassword: process.env.EMAIL_PASS,
  mongoUrl: `mongodb://${process.env.DB_USER}:${encodeURIComponent(process.env.DB_PASS)}@${process.env.DB_HOST}`,
  clientStaticFolder: path.join(basePath, 'client/build/static'),
  clientBuildFolder: path.join(basePath, 'client/build'),
  paypalClientId: process.env.PAYPAL_CLIENT_ID || '',
  paypalClientSecret: process.env.PAYPAL_CLIENT_SECRET || '',
  googleClientId: process.env.GOOGLE_CLIENT_ID || '',
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  githubClientId: process.env.GITHUB_CLIENT_ID || '',
  githubClientSecret: process.env.GITHUB_CLIENT_SECRET || ''
}

/**
 * Production config
 */
const production = {
  env,
  ip: process.env.IP,
  host: process.env.HOST,
  port: process.env.PORT,
  url: `https://${process.env.HOST}:${process.env.PORT}`,
  redisUrl: process.env.REDIS_URL,
  redisSecret,
  sslOptions: {
    key: fs.readFileSync(path.join(basePath, `ssl/${process.env.SSL_KEY}`)),
    cert: fs.readFileSync(path.join(basePath, `ssl/${process.env.SSL_CRT}`))
  },
  emailAddress: process.env.EMAIL_ADDRESS,
  emailPassword: process.env.EMAIL_PASS,
  mongoUrl: `mongodb://${process.env.DB_USER}:${encodeURIComponent(process.env.DB_PASS)}@${process.env.DB_HOST}`,
  clientStaticFolder: path.join(basePath, 'client/static'),
  clientBuildFolder: path.join(basePath, 'client'),
  paypalClientId: process.env.PAYPAL_CLIENT_ID || '',
  paypalClientSecret: process.env.PAYPAL_CLIENT_SECRET || '',
  googleClientId: process.env.GOOGLE_CLIENT_ID || '',
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  githubClientId: process.env.GITHUB_CLIENT_ID || '',
  githubClientSecret: process.env.GITHUB_CLIENT_SECRET || ''
}

const config = {
  test,
  development,
  production
}

module.exports = config[env]
