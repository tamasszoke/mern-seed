Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})

describe('Join page', () => {
  it('successfully loads', () => {
    cy.visit('auth/join')
  })

  it('fill in join form', () => {
    cy.get('input[placeholder="Email"]').type('johndoe@example.com')
    cy.get('input[placeholder="Password"]').type('12345')
    cy.get('input[placeholder="Password again"]').type('12345')
  })

  it('send join request', () => {
    cy.contains('input', 'Join').click()
  })

  it('receive join notification', () => {
    cy.contains(/Joined successfully!/gi, {
      timeout: 5000,
    })
  })
})
