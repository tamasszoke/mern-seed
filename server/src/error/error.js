'use strict'

/**
 * Error handler
 */
const handle = (err, req, res, next) => {
  res.status(err.status || 500)
  res.render('index', {
    message: err.message
  })
  next()
}

module.exports = {
  handle
}
