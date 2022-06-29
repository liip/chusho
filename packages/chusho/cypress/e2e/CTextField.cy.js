describe('TextField', () => {
  describe('With Validation', () => {
    beforeEach(() => {
      cy.visitComponent('textfield/with-validation');
    });

    it('is properly validated', () => {
      cy.contains('This field is required').should('not.exist');
      cy.get('[name="field"]').type('Hello').clear().blur();
      cy.contains('This field is required').should('be.visible');
      cy.get('[name="field"]').type('Hey');
      cy.contains('This field is required').should('not.exist');
    });
  });
});
