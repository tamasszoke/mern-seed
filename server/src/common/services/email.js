'use strict'

const { config, smtpTransport } = require('../../config')

/**
 * Send email
 * @param {object} settings
 * @param {callback} callback
 */
const send = (settings, callback) => {
  if (!settings || !settings.to ||
    !settings.subject || !settings.content) {
    return callback(new Error('Missing parameters!'), false)
  }
  const mailOptions = {
    from: `N-R-B <${config.emailAddress}>`,
    to: settings.to,
    subject: settings.subject,
    html: settings.content
  }
  smtpTransport.sendMail(mailOptions, (err, response) => {
    // smtpTransport.close()
    if (!err && response) {
      return callback(null, true)
    } else {
      return callback(err, false)
    }
  })
}

module.exports = {
  send
}
