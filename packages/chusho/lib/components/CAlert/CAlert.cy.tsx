import { ChushoUserOptions } from '../../types';

import { CAlert } from '.';

describe('CAlert', () => {
  it('applies local and global classes', () => {
    cy.mount(
      <CAlert class="alert" variant="error" data-test="alert">
        Message
      </CAlert>,
      {
        global: {
          provide: {
            $chusho: {
              options: {
                components: {
                  alert: {
                    class({ variant }) {
                      return ['config-alert', `config-alert-${variant}`];
                    },
                  },
                },
              } as ChushoUserOptions,
            },
          },
        },
      }
    );

    cy.get('[data-test="alert"]').should(
      'have.class',
      'alert config-alert config-alert-error'
    );

    cy.getWrapper().then((wrapper) => {
      wrapper.setProps({ bare: true });

      cy.get('[data-test="alert"]').should(
        'not.have.class',
        'config-alert config-alert-error'
      );
    });
  });

  it('applies the right attributes', () => {
    cy.mount(<CAlert data-test="alert">Message</CAlert>);

    cy.get('[data-test="alert"]').should('have.attr', 'role', 'alert');
  });

  it('renders the content', () => {
    cy.mount(<CAlert data-test="alert">Message</CAlert>);

    cy.get('[data-test="alert"]').should('contain', 'Message');
  });
});
