Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})

describe('Login page', () => {
  it('successfully loads', () => {
    cy.visit('auth/login')
  })

  it('fill in login form', () => {
    cy.get('input[placeholder="Email"]').type('johndoe@example.com')
    cy.get('input[placeholder="Password"]').type('12345')
  })

  it('send login then logout request', () => {
    cy.contains('input', 'Login').click()
    cy.contains('div', 'Logout', {
      timeout: 3000,
    })
    cy.contains('div', 'Profile', {
      timeout: 3000,
    })
    cy.contains('div', 'Logout').click({ force: true })
  })

  it('receive login then logout notification', () => {
    cy.contains(/Logged in successfully!/gi, {
      timeout: 5000,
    })
    cy.contains(/Logged out successfully!/gi, {
      timeout: 5000,
    })
  })

  it('show login button', () => {
    cy.contains('div', 'Login')
  })
})
