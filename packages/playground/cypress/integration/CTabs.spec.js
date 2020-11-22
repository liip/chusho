describe('Tabs', () => {
  beforeEach(() => {
    cy.visitComponent('tabs/default');
  });

  it('renders only the first tab panel by default', () => {
    cy.get('[data-test="tabpanel-1"]').should('be.visible');
    cy.get('[data-test="tabpanel-2"]').should('not.be.visible');
    cy.get('[data-test="tabpanel-3"]').should('not.be.visible');
  });

  it('renders the tabs with proper attributes', () => {
    cy.get('[data-test="tabs"]').should('have.class', 'tabs');
  });

  it('renders the tablist with proper attributes', () => {
    cy.get('[data-test="tablist"]')
      .should('have.attr', 'role', 'tablist')
      .and('have.attr', 'aria-label', 'Example of tabs')
      .and('have.class', 'flex mx-4');
  });

  it('renders each tab with proper attributes', () => {
    cy.get('[data-test^="tab-"]')
      .should('have.attr', 'role', 'tab')
      .each(($tab) => {
        if ($tab.is('[data-test="tab-1"]')) {
          cy.wrap($tab)
            .and('have.attr', 'aria-selected', 'true')
            .and(
              'have.attr',
              'aria-controls',
              Cypress.$(`[data-test="tabpanel-1"]`).attr('id')
            )
            .and('have.attr', 'tabindex', '0')
            .and('have.class', 'text-blue-800')
            .and('not.have.class', 'text-gray-700');
        } else {
          cy.wrap($tab)
            .and('have.attr', 'aria-selected', 'false')
            .and('have.attr', 'tabindex', '-1')
            .and('have.class', 'text-gray-700')
            .and('not.have.class', 'text-blue-700');
        }
      });
  });

  it('renders the tabpanels with proper attributes', () => {
    cy.get('[data-test="tabpanels"]').should('have.class', 'bg-gray-200');
  });

  it('renders the current tabpanel with proper attributes', () => {
    cy.get('[data-test="tabpanel-1"]').then(($el) => {
      cy.wrap($el)
        .should('have.attr', 'role', 'tabpanel')
        .and('have.attr', 'tabindex', '0')
        .and(
          'have.attr',
          'id',
          Cypress.$('[data-test="tab-1"]').attr('aria-controls')
        )
        .and(
          'have.attr',
          'aria-labelledby',
          Cypress.$('[data-test="tab-1"]').attr('id')
        )
        .and('have.class', 'tabpanel');
    });
  });

  it('handle keyboard navigation properly', () => {
    cy.get('[data-test="tab-1"]').focus().trigger('keydown', { key: 'Right' });
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

describe('Tabs Controlled', () => {
  beforeEach(() => {
    cy.visitComponent('tabs/controlled');
  });

  it('display the v-model tab', () => {
    cy.get('[data-test="tab-2"]').should('have.attr', 'aria-selected', 'true');
    cy.get('[data-test="tabpanel-2"]').should('be.visible');
  });
});

describe('Tabs Override Style', () => {
  beforeEach(() => {
    cy.visitComponent('tabs/override-style');
  });

  it('display the tab based on "defaultTab" prop', () => {
    cy.get('[data-test="tab-3"]').should('have.attr', 'aria-selected', 'true');
    cy.get('[data-test="tabpanel-3"]').should('be.visible');
  });

  it('applies locally defined classes but not config classes when bare prop is true', () => {
    cy.get('[data-test="tabs"]')
      .should('have.class', 'custom-tabs')
      .and('not.have.class', 'tabs');
    cy.get('[data-test="tablist"]')
      .should('have.class', 'mb-3')
      .and('not.have.class', 'mx-4');
    cy.get('[data-test="tab-1"][aria-selected="false"]')
      .should('have.class', 'text-red-700')
      .and('not.have.class', 'text-gray-700');
    cy.get('[data-test="tab-3"][aria-selected="true"]')
      .should('have.class', 'bg-red-700')
      .and('not.have.class', 'text-blue-800');
    cy.get('[data-test="tabpanels"]')
      .should('have.class', 'custom-tabpanels')
      .and('not.have.class', 'bg-gray-200');
    cy.get('[data-test="tabpanel-3"]')
      .should('have.class', 'custom-tabpanel')
      .and('not.have.class', 'tabpanel');
  });
});
