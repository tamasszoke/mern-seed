'use strict'

const config = require('./config')
const show = require('./logging')
const session = require('express-session')
const redis = require('redis')
const RedisStore = require('connect-redis')(session)
const RedisClient = redis.createClient(config.redisUrl)

const options = {
  client: RedisClient
}
const redisStore = new RedisStore(options)

RedisClient.on('error', (err) => {
  show.debug('Redis error: ' + err)
})

RedisClient.on('ready', () => {
  show.debug('Redis connected')
})

/**
 * Initialize redis for session cache
 */
const init = (app) => {
  app.use(session({
    store: redisStore,
    secret: config.redisSecret,
    saveUninitialized: true,
    resave: true,
    rolling: true,
    cookie: {
      secure: true, // true if https
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    }
  }))
}

module.exports = {
  init
}
