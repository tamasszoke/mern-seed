'use strict'

const { show } = require('../src/config/')

const protect = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }
  show.debug('Not authorized request!')
  res.status(401).send('Not authorized request!')
}

module.exports = protect
