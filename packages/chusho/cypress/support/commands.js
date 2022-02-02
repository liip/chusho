// ***********************************************
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add('visitComponent', (path) => {
  cy.visit(`/examples/components/${path}`);
});
