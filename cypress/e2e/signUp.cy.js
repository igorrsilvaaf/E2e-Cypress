import { faker } from '@faker-js/faker/locale/en'
import cypress from 'cypress'

describe('Sign Up', () => {
  it('Sucesso ao realizar o Sign Up utilizando o mailosaur', () => {
    const emailAddress = `${faker.datatype.uuid()}@${cypress.env('MAIL_SERVER_ID')}.mailosaur.net`
    const password = Cypress.env('USER_PASSWORD')

    cy.intercept(
      'GET',
      '**/notes'
    ).as('getNotes') // as é o apelido tipo do sql

    cy.visit('/signup')

    cy.get('#email')
      .type(emailAddress)

    cy.get('#password')
      .type(password, { log: false })

    cy.get('#confirmPassword')
      .type(password, { log: false })

    cy.contains('button', 'signup')
      .click()

    cy.get('#confirmationCode')
      .should('be.visible')

    cy.mailosaurGetMessage(Cypress.env('MAILOSAUR_SERVER_ID'), {
      sentTo: emailAddress // Enviar para
    }).then(message => {
      const confirmationCode = message.html.body.match(/\d{6}/)[0]
      cy.get('#confirmationCode').type(`${confirmationCode}{enter}`)

      cy.wait('@getNotes')
      cy.contains('h1', 'Your Notes')
        .should('be.visible')
    })
  })
})