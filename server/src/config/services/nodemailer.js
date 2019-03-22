'use strict'

const config = require('./config')
const nodemailer = require('nodemailer')
const nodemailerSmtpTransport = require('nodemailer-smtp-transport')

/**
 * Reusable mail transport method (nodemailer)
 */
const smtpTransport = nodemailer.createTransport(nodemailerSmtpTransport({
  service: 'gmail',
  auth: {
    user: config.emailAddress,
    pass: config.emailPassword
  }
}))

module.exports = smtpTransport
