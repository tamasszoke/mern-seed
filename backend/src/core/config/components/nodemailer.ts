'use strict'

import settings from './settings'
import nodemailer from 'nodemailer'
import nodemailerSmtpTransport from 'nodemailer-smtp-transport'

/**
 * Reusable mail transport method (nodemailer)
 */
const smtpTransport = nodemailer.createTransport(
  nodemailerSmtpTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: settings.email.user,
      pass: settings.email.password,
    },
  })
)

export default smtpTransport
