describe('Dialog', () => {
  beforeEach(() => {
    cy.visitComponent('dialog/default');
  });

  it('does not render the dialog by default', () => {
    cy.get('[data-test="dialog"]').should('not.exist');
  });

  it('opens the dialog when clicking the open button', () => {
    cy.contains('Open dialog').click();
    cy.get('[data-test="dialog"]').should('be.visible');
  });

  it('has the proper attributes', () => {
    cy.contains('Open dialog').click();
    cy.get('[data-test="dialog"]')
      .should('have.attr', 'role', 'dialog')
      .and('have.class', 'w-full');
    cy.get('[data-test="dialog-overlay"]').should(
      'have.attr',
      'tabindex',
      '-1'
    );
  });

  it('focuses the close button on open', () => {
    cy.contains('Open dialog').click();
    cy.get('[data-test="close-btn"]').should('have.focus');
  });

  it('prevents access to the rest of the page to screen readers', () => {
    cy.contains('Open dialog').click();
    cy.get('body > *').each(($el) => {
      if ($el.is(':visible')) {
        cy.wrap($el).should('have.attr', 'aria-hidden', 'true');
      } else {
        cy.wrap($el).should('be.hidden');
      }
    });
  });

  it('does not activates multiple times', () => {
    cy.contains('Open dialog').click();
    cy.get('[data-test="input"]').type('Welcome');
    // If the dialog activates again when we type in the field, focus would be moved to the close button
    cy.get('[data-test="input"]').then(($el) => {
      Cypress.dom.isFocused($el);
    });
  });

  it('keep the focus within the modal when using tab', () => {
    cy.contains('Open dialog').click();
    cy.focused().should('have.attr', 'data-test', 'close-btn').tab();
    cy.focused().should('have.attr', 'data-test', 'input').tab();
    cy.focused()
      .should('have.attr', 'data-test', 'close-btn')
      .tab({ shift: true });
    cy.focused().should('have.attr', 'data-test', 'input');
  });

  it('closes when pressing the ESC key', () => {
    cy.contains('Open dialog').click();
    cy.get('[data-test="dialog"]').should('be.visible');
    cy.get('body').trigger('keydown', { keyCode: 27 });
    cy.get('[data-test="dialog"]').should('not.exist');
  });

  it('closes when clicking the overlay', () => {
    cy.contains('Open dialog').click();
    cy.get('[data-test="dialog"]').should('be.visible');
    cy.get('[data-test="dialog-overlay"]').then(($el) => {
      $el.trigger('click', { target: $el, currentTarget: $el });
    });
    cy.get('[data-test="dialog"]').should('not.exist');
  });

  it('refreshes the focusable element after being opened again', () => {
    cy.contains('Open dialog').click();
    cy.get('[data-test="dialog"]').should('be.visible');
    cy.get('[data-test="close-btn"]').click();
    cy.get('[data-test="dialog"]').should('not.exist');

    cy.contains('Open dialog').click();
    cy.focused().should('have.attr', 'data-test', 'close-btn').tab();
    cy.focused().should('have.attr', 'data-test', 'input').tab();
    cy.focused()
      .should('have.attr', 'data-test', 'close-btn')
      .tab({ shift: true });
    cy.focused().should('have.attr', 'data-test', 'input');
  });
});

describe('Dialog Nested', () => {
  beforeEach(() => {
    cy.visitComponent('dialog/nested');
  });

  it('closes only the last dialog when pressing ESC', () => {
    cy.contains('Open dialog').click();
    cy.contains('Open Child Dialog').click();
    cy.get('[role="dialog"]').should('have.length', 2);
    cy.get('body').trigger('keydown', { keyCode: 27 });
    cy.get('[role="dialog"]').should('have.length', 1);
    cy.get('body').trigger('keydown', { keyCode: 27 });
    cy.get('[role="dialog"]').should('not.exist');
  });
});

describe('Dialog Open by Default', () => {
  beforeEach(() => {
    cy.visitComponent('dialog/open-by-default');
  });

  it('should be displayed by default', () => {
    cy.get('[data-test="dialog"]').should('be.visible');
  });
});

describe('Dialog with transition', () => {
  beforeEach(() => {
    cy.visitComponent('dialog/with-transition');
  });

  it('should apply transition', () => {
    cy.contains('Open dialog').click();
    cy.get('[data-test="dialog-overlay"]').should(
      'have.class',
      'fade-enter-active'
    );
    cy.get('body').trigger('keydown', { keyCode: 27 });
    cy.get('[data-test="dialog-overlay"]').should(
      'have.class',
      'fade-leave-to'
    );
  });
});

describe('Dialog with dynamic contnet', () => {
  beforeEach(() => {
    cy.visitComponent('dialog/dynamic-content');
  });

  it('refreshes the list of focusable element when dialog content changes', () => {
    cy.get('[data-test="add-item"]').click();
    cy.get('[data-test="input"]').should('have.length', 2);
    cy.get('[data-test="add-item"]').tab({ shift: true });
    cy.focused().should('have.attr', 'name', 'item-2').tab({ shift: true });
    cy.focused().should('have.attr', 'name', 'item-1').tab({ shift: true });
    cy.focused()
      .should('have.attr', 'data-test', 'close-btn')
      .tab({ shift: true });
    cy.focused()
      .should('have.attr', 'data-test', 'remove-item')
      .click()
      .tab()
      .tab();
    cy.focused().should('have.attr', 'name', 'item-1');
  });
});
