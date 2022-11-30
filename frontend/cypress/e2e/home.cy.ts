Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})

describe('Home page', () => {
  it('successfully loads', () => {
    cy.visit('https://localhost:3000')
  })

  it('show navbar links', () => {
    cy.contains('a', 'Home')
    cy.contains('a', 'Login')
    cy.contains('a', 'Join')
    cy.contains('a', 'Recovery')
  })

  it('show welcome', () => {
    cy.contains('div', 'Welcome')
  })
})
