'use strict'

const show = require('./logging')

/**
 * Show current memory usage
 * @function
 */
const memory = () => {
  const totalAllocated = process.memoryUsage().rss
  const totalUsed = process.memoryUsage().heapUsed

  show.debug(`Memory allocated: ${Math.round(totalAllocated / 1024 / 1024 * 100) / 100} MB`)
  show.debug(`Memory used: ${Math.round(totalUsed / 1024 / 1024 * 100) / 100} MB`)
}

module.exports = {
  memory
}
