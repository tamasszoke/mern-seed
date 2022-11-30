'use strict'

import winston from 'winston'

/**
 * Logging configuration (winston)
 */
const show = winston.createLogger({
  level: 'debug',
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({
      filename: 'log/error.log',
      level: 'error',
    }),
    new winston.transports.File({
      filename: 'log/combined.log',
    }),
  ],
})

// Show logs only in development
if (!process.env.TEST && process.env.NODE_ENV === 'development') {
  show.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  )
}

export default show
