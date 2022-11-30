Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})

describe('Recovery page', () => {
  it('successfully loads', () => {
    cy.visit('auth/recovery')
  })

  it('fill in recovery form', () => {
    cy.get('input[placeholder="Email"]').type('johndoe@example.com')
  })

  it('send recovery request', () => {
    cy.contains('input', 'Recover').click()
  })

  it('receive recovery notification', () => {
    cy.contains(/Check your emails!/gi, {
      timeout: 5000,
    })
  })
})
