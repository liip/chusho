describe('Collapse', () => {
  beforeEach(() => {
    cy.visitComponent('collapse/default');
  });

  it('renders only the CollapseBtn by default', () => {
    cy.get('[data-test="collapse-button"]').should('be.visible');
    cy.get('[data-test="collapse-content"]').should('not.be.visible');
  });

  it('opens the CollapseContent when clicking on the CollapseBtn', () => {
    cy.get('[data-test="collapse-button"]').trigger('click');
    cy.get('[data-test="collapse-content"]').should('be.visible');
  });

  it('renders the CollapseBtn with correct attributes', () => {
    cy.get('[data-test="collapse-button"]')
      .should('have.attr', 'aria-expanded', 'false')
      .should('have.class', 'border-gray-400')
      .should('not.have.class', 'text-blue-500')
      .trigger('click')
      .should('have.attr', 'aria-expanded', 'true');

    cy.get('[data-test="collapse-button"]').then(($el) => {
      cy.wrap($el).should(
        'have.attr',
        'aria-controls',
        Cypress.$(`[data-test="collapse-content"]`).attr('id')
      );
    });
  });

  it('renders the CollapseContent with correct attributes', () => {
    cy.get('[data-test="collapse-button"]').trigger('click');
    cy.get('[data-test="collapse-content"]').should(
      'have.class',
      'bg-gray-100'
    );
  });
});

describe('Collapse Controlled', () => {
  beforeEach(() => {
    cy.visitComponent('collapse/controlled');
  });

  it('renders the CollapseContent by default', () => {
    cy.get('[data-test="collapse-content"]').should('be.visible');
  });

  it('changes the label of the CollapseButton based on the model', () => {
    cy.get('[data-test="collapse-button"]')
      .should('contain', 'Close')
      .trigger('click')
      .should('contain', 'Open');
  });

  it('changes when v-model value changes', () => {
    cy.get('[data-test="collapse-button"]').trigger('click');
    cy.get('[data-test="collapse-content"]').should('not.exist');
    cy.get('[data-test="model-toggle"]').trigger('click');
    cy.get('[data-test="collapse-content"]').should('be.visible');
  });
});
