describe('Collapse', () => {
  describe('default', () => {
    beforeEach(() => {
      cy.visitComponent('collapse/default');
    });

    it('renders only the CollapseBtn by default', () => {
      cy.get('[data-test="collapse-button"]').should('be.visible');
      cy.get('[data-test="collapse-content"]').should('not.exist');
    });

    it('opens the CollapseContent when clicking on the CollapseBtn', () => {
      cy.get('[data-test="collapse-button"]').trigger('click');
      cy.get('[data-test="collapse-content"]').should('be.visible');
    });

    it('links CollapseBtn with CollapseContent', () => {
      cy.get('[data-test="collapse-button"]').trigger('click');
      cy.get('[data-test="collapse-button"]').then(($el) => {
        cy.wrap($el).should(
          'have.attr',
          'aria-controls',
          Cypress.$(`[data-test="collapse-content"]`).attr('id')
        );
      });
    });
  });

  describe('controlled', () => {
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
});
