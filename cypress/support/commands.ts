// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
declare namespace Cypress {
  interface Chainable<Subject> {
    getToken(): Chainable<string>;
    getContactId(): Chainable<string>;
  }
}

Cypress.Commands.add('getToken', () => {
  return cy.request({
    method: "POST",
    url: "/users/login",
    body: {
      email: "mynana1057@fak.com",
      password: "mynana1057@fak.com"
    }
  }).then((response) => {
    return response.body.token;
  });
});

Cypress.Commands.add('getContactId', () => {
  cy.getToken().then((token: string) => {
    return cy.request({
      method: 'GET',
      url: '/contacts',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      const contactId = response.body[0]._id;
      return contactId;
    });
  });
});