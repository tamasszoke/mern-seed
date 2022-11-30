'use strict'

import show from './logging'

/**
 * Show current memory usage
 */
const memory = (): void => {
  const totalAllocated = process.memoryUsage().rss
  const totalUsed = process.memoryUsage().heapUsed

  show.debug(
    `[STATS] Memory allocated: ${
      Math.round((totalAllocated / 1024 / 1024) * 100) / 100
    } MB`
  )
  show.debug(
    `[STATS] Memory used: ${
      Math.round((totalUsed / 1024 / 1024) * 100) / 100
    } MB`
  )
}

export default {
  memory,
}
