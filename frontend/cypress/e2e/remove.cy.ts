Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})

describe('Remove user account', () => {
  it('login successfully loads', () => {
    cy.visit('auth/login')
  })

  it('fill in login form', () => {
    cy.get('input[placeholder="Email"]').type('johndoe@example.com')
    cy.get('input[placeholder="Password"]').type('12345')
  })

  it('login, remove user, logout', () => {
    cy.contains('input', 'Login').click()
    if (cy.contains(/Logged in successfully!/gi, { timeout: 5000 })) {
      cy.visit('user/profile')
      cy.contains('div', 'Remove account').click()
      cy.contains(/Account removed successfully!/gi, {
        timeout: 5000,
      })
      cy.location('pathname').should('eq', '/')
    }
  })
})
