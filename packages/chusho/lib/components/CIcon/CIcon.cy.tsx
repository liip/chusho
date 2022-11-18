import { ChushoUserOptions } from '../../types';

import { CIcon } from '.';

describe('CIcon', () => {
  it('applies local and global classes', () => {
    cy.mount(<CIcon id="palette" class="icon" data-test="icon" />, {
      global: {
        provide: {
          $chusho: {
            options: {
              components: {
                icon: {
                  class: 'config-icon',
                },
              },
            } as ChushoUserOptions,
          },
        },
      },
    });

    cy.get('[data-test="icon"]').should('have.class', 'icon config-icon');

    cy.getWrapper().then((wrapper) => {
      wrapper.setProps({ bare: true });

      cy.get('[data-test="icon"]').should('not.have.class', 'config-icon');
    });
  });

  it('applies the right attributes', () => {
    cy.mount(<CIcon id="palette" data-test="icon" />);

    cy.get('[data-test="icon"]')
      .should('have.attr', 'focusable', 'false')
      .and('have.attr', 'aria-hidden', 'true');
  });

  it('makes it visible and label it when `alt` is provided', () => {
    cy.mount(<CIcon id="palette" alt="Pick color" data-test="icon" />);

    cy.get('[data-test="icon"]')
      .should('have.attr', 'focusable', 'false')
      .should('not.have.attr', 'aria-hidden', 'true')
      .and('have.attr', 'aria-labelledby')
      .then((id) => {
        cy.get(`#${id}`).should('have.text', 'Pick color');
      });
  });

  it('combine sprite URL and ID as the icon source', () => {
    cy.mount(<CIcon id="palette" data-test="icon" />, {
      global: {
        provide: {
          $chusho: {
            options: {
              components: {
                icon: {
                  spriteUrl: '/icons.svg',
                },
              },
            } as ChushoUserOptions,
          },
        },
      },
    });

    cy.get('[data-test="icon"] use').should(
      'have.attr',
      'xlink:href',
      '/icons.svg#palette'
    );
  });

  it('supports icon ID without sprite URL', () => {
    cy.mount(<CIcon id="palette" data-test="icon" />, {
      global: {
        provide: {
          $chusho: {
            options: {
              components: {
                icon: {
                  spriteUrl: undefined,
                },
              },
            } as ChushoUserOptions,
          },
        },
      },
    });

    cy.get('[data-test="icon"] use').should(
      'have.attr',
      'xlink:href',
      '#palette'
    );
  });

  it('sizes the icon based on the config width/height and the scale prop', () => {
    cy.mount(<CIcon id="palette" scale={1} data-test="icon" />, {
      global: {
        provide: {
          $chusho: {
            options: {
              components: {
                icon: {
                  width: 16,
                  height: 16,
                },
              },
            } as ChushoUserOptions,
          },
        },
      },
    });

    // Scale defaults to 1
    cy.get('[data-test="icon"]').should('have.attr', 'width', '16');
    cy.get('[data-test="icon"]').should('have.attr', 'height', '16');

    cy.getWrapper().then((wrapper) => {
      wrapper.setProps({ scale: 2 });

      cy.get('[data-test="icon"]').should('have.attr', 'width', '32');
      cy.get('[data-test="icon"]').should('have.attr', 'height', '32');
    });
  });
});
