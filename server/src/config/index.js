'use strict'

const config = require('./services/config')
const express = require('./services/express')
const session = require('./services/session')
const db = require('./services/database')
const smtpTransport = require('./services/nodemailer')
const socket = require('./services/socketIo')
const show = require('./services/logging')
const stats = require('./services/stats')
const passport = require('./services/passport')
const paypal = require('./services/paypal')

module.exports = {
  config,
  express,
  session,
  show,
  db,
  paypal,
  passport,
  smtpTransport,
  socket,
  stats
}
