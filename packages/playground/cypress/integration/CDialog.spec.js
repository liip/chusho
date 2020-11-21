describe('Dialog', () => {
  beforeEach(() => {
    cy.visitComponent('dialog/default');
  });

  it('does not render the dialog by default', () => {
    cy.get('.dialog').should('not.exist');
  });

  it('opens the dialog when clicking the open button', () => {
    cy.contains('Open dialog').click();
    cy.get('.dialog').should('be.visible');
  });

  it('has the proper attributes', () => {
    cy.contains('Open dialog').click();
    cy.get('.dialog')
      .should('have.attr', 'role', 'dialog')
      .and('have.class', 'w-full');
    cy.get('.dialog-overlay').should('have.attr', 'tabindex', '-1');
  });

  it('focuses the close button on open', () => {
    cy.contains('Open dialog').click();
    cy.get('[aria-label="Close dialog"]').should('have.focus');
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
    cy.get('.text-input').type('Welcome');
    // If the dialog activates again when we type in the field, focus would be moved to the close button
    cy.get('.text-input').then(($el) => {
      Cypress.dom.isFocused($el);
    });
  });

  it('closes when pressing the ESC key', () => {
    cy.contains('Open dialog').click();
    cy.get('.dialog').should('be.visible');
    cy.get('body').trigger('keydown', { keyCode: 27 });
    cy.get('.dialog').should('not.exist');
  });

  it('closes when clicking the overlay', () => {
    cy.contains('Open dialog').click();
    cy.get('.dialog').should('be.visible');
    cy.get('.dialog-overlay').then(($el) => {
      $el.trigger('click', { target: $el, currentTarget: $el });
    });
    cy.get('.dialog').should('not.exist');
  });
});

describe('Dialog Nested', () => {
  beforeEach(() => {
    cy.visitComponent('dialog/nested');
  });

  it('closes only the last dialog when pressing ESC', () => {
    cy.contains('Open dialog').click();
    cy.contains('Open Child Dialog').click();
    cy.get('.dialog').should('have.length', 2);
    cy.get('body').trigger('keydown', { keyCode: 27 });
    cy.get('.dialog').should('have.length', 1);
    cy.get('body').trigger('keydown', { keyCode: 27 });
    cy.get('.dialog').should('not.exist');
  });
});

describe('Dialog Open by Default', () => {
  beforeEach(() => {
    cy.visitComponent('dialog/open-by-default');
  });

  it('should be displayed by default', () => {
    cy.get('.dialog').should('be.visible');
  });
});

describe('Dialog with transition', () => {
  beforeEach(() => {
    cy.visitComponent('dialog/with-transition');
  });

  it('should apply transition', () => {
    cy.contains('Open dialog').click();
    cy.get('.dialog-overlay').should('have.class', 'fade-enter-active');
    cy.get('body').trigger('keydown', { keyCode: 27 });
    cy.get('.dialog-overlay').should('have.class', 'fade-leave-to');
  });
});
