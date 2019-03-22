'use strict'

/**
 * Render index page
 */
const index = (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    res.render('index')
  } else {
    res.json('Server ready')
  }
}

module.exports = {
  index
}
