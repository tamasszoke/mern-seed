'use strict'

import ejs from 'ejs'
import path from 'path'
import { settings, nodemailer, show } from '../../core/config'
import { MailData } from '../common.interface'
import { ClientError } from '../../core/server/server.interface'

/**
 * Send email
 * @param data object
 * @returns promise
 */
const dispatch = (data: MailData): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    const { from, to, subject, content } = data
    const mailOptions = {
      from: `${settings.name} <${from}>`,
      to,
      subject,
      html: content,
    }
    nodemailer.sendMail(mailOptions, (err: any, response: any) => {
      if (!err && response) {
        resolve(true)
      } else {
        reject(false)
      }
    })
  })
}

/**
 * Email template load, send
 * Template root dir is src/features/
 * @param template string
 * @param subject string
 * @param to string
 * @param data object
 */
const send = async (
  template: string,
  subject: string,
  to: string,
  data: object
) => {
  // Errors are hidden from frontend responses currently
  // To show/handle them, remove the try-catch block and keep
  // only the content variable and the sending function
  try {
    if (!template || !subject || !to || !data) {
      throw new ClientError(1001, 'parameters not found')
    }
    const content = await ejs.renderFile(
      path.join(__dirname, '../../', template),
      { settings, data },
      { async: true }
    )
    await dispatch({
      from: settings.email.from,
      to,
      subject,
      content,
    })
  } catch (err: any) {
    show.debug(`[AUTH] Error mail ${err.type} ${err.code} ${err.message}`)
  }
}

export default { send }
