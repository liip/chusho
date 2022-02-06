describe('Tabs', () => {
  describe('default', () => {
    beforeEach(() => {
      cy.visitComponent('tabs/default');
    });

    it('renders only the first tab panel by default', () => {
      cy.get('[data-test="tabpanel-1"]').should('be.visible');
      cy.get('[data-test="tabpanel-2"]').should('not.exist');
      cy.get('[data-test="tabpanel-3"]').should('not.exist');
    });

    it('handle keyboard navigation properly', () => {
      cy.get('[data-test="tab-1"]')
        .focus()
        .trigger('keydown', { key: 'Right' });
      cy.get('[data-test="tab-2"]')
        .should('have.focus')
        .trigger('keydown', { key: 'Right' });
      cy.get('[data-test="tab-3"]')
        .should('have.focus')
        .trigger('keydown', { key: 'Right' });
      cy.get('[data-test="tab-1"]')
        .should('have.focus')
        .trigger('keydown', { key: 'Left' });
      cy.get('[data-test="tab-3"]')
        .should('have.focus')
        .trigger('keydown', { key: 'Home' });
      cy.get('[data-test="tab-1"]')
        .should('have.focus')
        .trigger('keydown', { key: 'End' });
      cy.get('[data-test="tab-3"]').should('have.focus');
    });
  });

  describe('controlled', () => {
    beforeEach(() => {
      cy.visitComponent('tabs/controlled');
    });

    it('display the v-model tab', () => {
      cy.get('[data-test="tab-2"]').should(
        'have.attr',
        'aria-selected',
        'true'
      );
      cy.get('[data-test="tabpanel-2"]').should('be.visible');
    });
  });

  describe('override style', () => {
    beforeEach(() => {
      cy.visitComponent('tabs/override-style');
    });

    it('display the tab based on "defaultTab" prop', () => {
      cy.get('[data-test="tab-3"]').should(
        'have.attr',
        'aria-selected',
        'true'
      );
      cy.get('[data-test="tabpanel-3"]').should('be.visible');
    });
  });

  describe('dynamic', () => {
    beforeEach(() => {
      cy.visitComponent('tabs/dynamic');
    });

    it('handles dynamically added tabs', () => {
      cy.contains('Tab 4').should('not.exist');
      cy.contains('Add tab').click();
      cy.contains('Tab 4').click();
      cy.get('[data-test="tabpanels"]').should('contain', 'Tab 4 content');
      cy.focused()
        .trigger('keydown', { key: 'Right' })
        .trigger('keydown', { key: 'Right' })
        .trigger('keydown', { key: 'Right' })
        .trigger('keydown', { key: 'Right' });
      cy.focused().should('have.attr', 'data-test', 'tab-4');
    });

    it('handles dynamically removed tabs', () => {
      cy.contains('Tab 2').click();
      cy.contains('Remove tab').click();
      cy.get('[data-test="tablist"] [data-test^="tab"]').should(
        'have.length',
        2
      );
      cy.contains('Tab 1').click().trigger('keydown', { key: 'Right' });
      cy.focused().should('have.attr', 'data-test', 'tab-2');
    });

    it('activates first tab when currently active tab is removed', () => {
      cy.contains('Tab 3').click();
      cy.contains('Remove tab').click();
      cy.contains('Tab 1').should('have.attr', 'aria-selected', 'true');
    });
  });
});
