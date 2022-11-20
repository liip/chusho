import { ChushoUserOptions } from '../../types';

import { CBtn } from '.';

describe('CBtn', () => {
  it('applies local and global classes', () => {
    cy.mount(
      <CBtn class="btn" data-test="btn" variant="primary">
        Label
      </CBtn>,
      {
        global: {
          provide: {
            $chusho: {
              options: {
                components: {
                  btn: {
                    class({ variant }) {
                      return [
                        'config-btn',
                        { 'config-btn-primary': variant?.primary },
                      ];
                    },
                  },
                },
              } as ChushoUserOptions,
            },
          },
        },
      }
    );

    cy.get('[data-test="btn"]').should(
      'have.class',
      'btn config-btn config-btn-primary'
    );

    cy.getWrapper().then((wrapper) => {
      wrapper.setProps({ bare: true });

      cy.get('[data-test="btn"]').should(
        'not.have.class',
        'config-btn config-btn-primary'
      );
    });
  });

  it('applies the right attributes', () => {
    cy.mount(<CBtn data-test="btn">Label</CBtn>);

    cy.get('[data-test="btn"]').should('have.attr', 'type', 'button');

    cy.getWrapper().then((wrapper) => {
      wrapper.setProps({ type: 'submit' });

      cy.get('[data-test="btn"]').should('have.attr', 'type', 'submit');
    });
  });

  it('renders the slot', () => {
    cy.mount(<CBtn data-test="btn">Label</CBtn>);

    cy.get('[data-test="btn"]').should('have.text', 'Label');
  });

  it('should be a link if prop `href` is set', () => {
    cy.mount(
      <CBtn data-test="link" href="https://chusho.dev" type="button" disabled>
        Label
      </CBtn>
    );

    cy.get('a[data-test="link"]')
      .should('have.attr', 'href', 'https://chusho.dev')
      .and('not.have.attr', 'type', 'button')
      .and('not.have.attr', 'disabled', 'disabled');
  });

  it('should be a RouterLink if prop `to` is set', () => {
    cy.mount(
      <CBtn data-test="link" to="/home">
        Label
      </CBtn>,
      {
        global: {
          stubs: {
            RouterLink: true,
          },
        },
      }
    );

    cy.get('router-link-stub[data-test="link"]').should(
      'have.attr',
      'to',
      '/home'
    );
  });

  it('should be a NuxtLink if prop `to` is set in a Nuxt app', () => {
    cy.mount(
      <CBtn data-test="link" to="/home">
        Label
      </CBtn>,
      {
        global: {
          mocks: {
            $nuxt: {},
          },
          stubs: {
            NuxtLink: true,
          },
        },
      }
    );

    cy.get('nuxt-link-stub[data-test="link"]').should(
      'have.attr',
      'to',
      '/home'
    );
  });
});
