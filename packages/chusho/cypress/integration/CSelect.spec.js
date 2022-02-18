describe('Select', () => {
  describe('With Validation', () => {
    beforeEach(() => {
      cy.visitComponent('select/with-validation');
    });

    it('is properly validated using mouse', () => {
      cy.contains('This field is required').should('not.exist');

      cy.get('[data-test="select"]').click();
      cy.contains('Aqua').click();
      cy.get('[data-test="select"] input[type="hidden"]').should(
        'have.value',
        '#00FFFF'
      );
      cy.contains('This field is required').should('not.exist');

      cy.get('[data-test="select"]').click();
      cy.get('[data-test="select"] li:first').click();
      cy.contains('This field is required').should('be.visible');
    });

    it('is properly validated using keyboard', () => {
      cy.contains('This field is required').should('not.exist');

      cy.get('[data-test="select"]').click();
      cy.get('[data-test="select-options"]').should('be.visible');
      cy.get('[data-test="select"] li:focused').type('{enter}', {});
      cy.contains('This field is required').should('be.visible');

      cy.get('[data-test="select"]').click();
      cy.get('[data-test="select-options"]').should('be.visible');
      cy.get('[data-test="select"] li:focused').type('{downArrow}{enter}', {});
      cy.contains('This field is required').should('not.exist');
    });
  });
});
