// ***********************************************
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add('visitComponent', (id) => {
  cy.visit(`/iframe.html?id=${id}`);
});
