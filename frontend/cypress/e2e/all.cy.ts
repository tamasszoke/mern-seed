import type {} from 'cypress'

// Using content selectors where possible and
// Data-testid as a secondary option (not id or class)

// Disable interruption if got error response from the backend
Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})

import './home.cy'
import './join.cy'
import './activation.cy'
import './login.cy'
import './profile.cy'
import './recovery.cy'
import './reset.cy'
import './remove.cy'
