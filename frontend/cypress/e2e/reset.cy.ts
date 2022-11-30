Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})

import mimelib from 'mimelib'

describe('Reset page', () => {
  let recoveryId
  let recoveryCode

  it('receive recovery email', () => {
    cy.request({
      method: 'GET',
      url: Cypress.env('EMAIL_API_URL'),
      headers: {
        'Api-token': Cypress.env('EMAIL_API_TOKEN'),
      },
    }).then((response) => {
      const inbox = response.body
      expect(inbox).to.be.an('array')
      expect(inbox[0].subject).to.equal('Recovery')
      expect(inbox[0].to_email).to.equal('johndoe@example.com')
      const emailId = inbox[0].id
      cy.request({
        method: 'GET',
        url: `${Cypress.env('EMAIL_API_URL')}/${emailId}/body.eml`,
        headers: {
          'Api-token': Cypress.env('EMAIL_API_TOKEN'),
        },
      }).then((response) => {
        // Decode quoted-printable body of the email
        const email = mimelib.decodeQuotedPrintable(response.body)
        recoveryId = email.match(/(?<=reset\/)[^/]+/i)[0]
        recoveryCode = email.match(/(?<=Your recovery code is <b>*)(\d{4})/i)[0]
        expect(recoveryId).to.be.a('string')
        expect(recoveryCode).to.be.a('string')
      })
    })
  })

  it('successfully loads', () => {
    cy.visit(`auth/reset/${recoveryId}`)
  })

  it('fill in reset form', () => {
    cy.get('input[placeholder="Code"]').type(recoveryCode)
    cy.get('input[placeholder="Password"]').type('12345')
    cy.get('input[placeholder="Password again"]').type('12345')
  })

  it('send reset request', () => {
    cy.contains('input', 'Save').click()
  })

  it('receive reset notification', () => {
    cy.contains(/Password updated!/gi, {
      timeout: 5000,
    })
  })

  it('receive reset email', () => {
    cy.request({
      method: 'GET',
      url: Cypress.env('EMAIL_API_URL'),
      headers: {
        'Api-token': Cypress.env('EMAIL_API_TOKEN'),
      },
    }).then((response) => {
      const inbox = response.body
      expect(inbox).to.be.an('array')
      expect(inbox[0].subject).to.equal('Reset')
      expect(inbox[0].to_email).to.equal('johndoe@example.com')
      const emailId = inbox[0].id
      cy.request({
        method: 'GET',
        url: `${Cypress.env('EMAIL_API_URL')}/${emailId}/body.eml`,
        headers: {
          'Api-token': Cypress.env('EMAIL_API_TOKEN'),
        },
      }).then((response) => {
        // Decode quoted-printable body of the email
        const email = mimelib.decodeQuotedPrintable(response.body)
        expect(email).to.be.a('string')
      })
    })
  })
})
