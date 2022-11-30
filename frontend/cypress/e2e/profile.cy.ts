Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})

describe('Profile page', () => {
  it('successfully loads', () => {
    cy.visit('auth/login')
  })

  it('fill in login form', () => {
    cy.get('input[placeholder="Email"]').type('johndoe@example.com')
    cy.get('input[placeholder="Password"]').type('12345')
  })

  it('logs in, load user profile, then logs out', () => {
    cy.contains('input', 'Login').click()
    cy.contains('div', 'Logout', {
      timeout: 3000,
    })
    cy.contains('div', 'Profile', {
      timeout: 3000,
    })
    cy.visit('user/profile')
    cy.contains('div', 'Profile')
    cy.location('pathname').should('eq', '/user/profile', {
      timeout: 3000,
    })
    cy.contains('div', 'Logout').click({ force: true })
  })

  it('receive logout notification', () => {
    cy.contains(/Logged out successfully!/gi, {
      timeout: 5000,
    })
  })

  it('show login button', () => {
    cy.contains('div', 'Login')
  })
})
