// ***********************************************
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add('visitComponent', (path) => {
  cy.visit(`/examples/components/${path}`);

  cy.get('html').should('have.attr', 'data-test-state', 'interactive');
});
