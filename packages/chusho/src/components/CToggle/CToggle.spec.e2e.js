describe('Toggle', () => {
  beforeEach(() => {
    cy.visitComponent('toggle--default');
  });

  it('renders only the ToggleBtn by default', () => {
    cy.get('[data-test="toggle-button"]').should('be.visible');
    cy.get('[data-test="toggle-content"]').should('not.be.visible');
  });

  it('opens the ToggleContent when clicking on the ToggleBtn', () => {
    cy.get('[data-test="toggle-button"]').trigger('click');
    cy.get('[data-test="toggle-content"]').should('be.visible');
  });

  it('renders the ToggleBtn with correct attributes', () => {
    cy.get('[data-test="toggle-button"]')
      .should('have.attr', 'aria-expanded', 'false')
      .should('have.class', 'bg-blue-200')
      .trigger('click')
      .should('have.attr', 'aria-expanded', 'true');

    cy.get('[data-test="toggle-button"]').then(($el) => {
      cy.wrap($el).should(
        'have.attr',
        'aria-controls',
        Cypress.$(`[data-test="toggle-content"]`).attr('id')
      );
    });
  });

  it('renders the ToggleContent with correct attributes', () => {
    cy.get('[data-test="toggle-button"]').trigger('click');
    cy.get('[data-test="toggle-content"]').should('have.class', 'bg-gray-200');
  });
});

describe('Toggle Controlled', () => {
  beforeEach(() => {
    cy.visitComponent('toggle--controlled');
  });

  it('renders the ToggleContent by default', () => {
    cy.get('[data-test="toggle-content"]').should('be.visible');
  });

  it('changes the label of the ToggleButton based on the model', () => {
    cy.get('[data-test="toggle-button"]')
      .should('contain', 'Close')
      .trigger('click')
      .should('contain', 'Open');
  });
});
