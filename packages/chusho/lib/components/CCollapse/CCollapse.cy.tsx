import { ref } from 'vue';

import { ChushoUserOptions } from '../../types';

import { CCollapse, CCollapseBtn, CCollapseContent } from '.';

describe('CCollapse', () => {
  it('applies local and global classes', () => {
    cy.mount(
      <CCollapse data-test="collapse" class="collapse">
        <CCollapseBtn data-test="btn" class="btn">
          Collapse
        </CCollapseBtn>
        <CCollapseContent data-test="content" class="content">
          Content
        </CCollapseContent>
      </CCollapse>,
      {
        global: {
          provide: {
            $chusho: {
              options: {
                components: {
                  collapse: {
                    class({ active }) {
                      return ['config-collapse', { active }];
                    },
                  },
                  collapseBtn: {
                    class({ active }) {
                      return ['config-btn', { active }];
                    },
                  },
                  collapseContent: {
                    class: 'config-content',
                  },
                },
              } as ChushoUserOptions,
            },
          },
        },
      }
    );

    cy.get('[data-test="collapse"]').should(
      'have.class',
      'collapse config-collapse'
    );
    cy.get('[data-test="btn"]').should('have.class', 'btn config-btn');
    cy.get('[data-test="content"]').should('not.exist');

    cy.get('[data-test="btn"]').click();

    cy.get('[data-test="collapse"]').should(
      'have.class',
      'collapse config-collapse active'
    );
    cy.get('[data-test="btn"]').should('have.class', 'btn config-btn active');
    cy.get('[data-test="content"]').should(
      'have.class',
      'content config-content'
    );
  });

  it('applies the right attributes', () => {
    cy.mount(
      <CCollapse>
        <CCollapseBtn data-test="btn">Collapse</CCollapseBtn>
        <CCollapseContent data-test="content">Content</CCollapseContent>
      </CCollapse>
    );

    cy.get('[data-test="btn"]')
      .should('have.attr', 'aria-expanded', 'false')
      .and('have.attr', 'type', 'button')
      .click()
      .should('have.attr', 'aria-expanded', 'true')
      .then(([btn]) => {
        cy.get('[data-test="content"]').should(
          'have.attr',
          'id',
          btn.getAttribute('aria-controls')
        );
      });
  });

  it('does not render the content by default', () => {
    cy.mount(
      <CCollapse>
        <CCollapseBtn data-test="btn">Toggle</CCollapseBtn>
        <CCollapseContent data-test="content">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </CCollapseContent>
      </CCollapse>
    );

    cy.get('[data-test="btn"]').should('be.visible');
    cy.get('[data-test="content"]').should('not.exist');
  });

  it('renders the content when clicking on the button', () => {
    cy.mount(
      <CCollapse>
        <CCollapseBtn data-test="btn">Toggle</CCollapseBtn>
        <CCollapseContent data-test="content">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </CCollapseContent>
      </CCollapse>
    );

    cy.get('[data-test="btn"]').trigger('click');
    cy.get('[data-test="content"]')
      .should('be.visible')
      .and(
        'contain',
        'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
      );
  });

  it('provides `active` state in its default slot`', () => {
    cy.mount(
      <CCollapse>
        {({ active }: { active: boolean }) => (
          <>
            <CCollapseBtn data-test="btn">
              {active ? 'Close' : 'Open'}
            </CCollapseBtn>
            <CCollapseContent></CCollapseContent>
          </>
        )}
      </CCollapse>
    );

    cy.get('[data-test="btn"]')
      .should('contain', 'Open')
      .trigger('click')
      .should('contain', 'Close');
  });

  it('changes when v-model value changes', () => {
    const collapseOpen = ref(true);

    cy.mount(
      <CCollapse v-model={collapseOpen.value}>
        <CCollapseBtn data-test="btn">
          {collapseOpen.value ? 'Close' : 'Open'}
        </CCollapseBtn>
        <CCollapseContent data-test="content">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </CCollapseContent>
      </CCollapse>
    );

    cy.getWrapper().then((wrapper) => {
      wrapper.setProps({ modelValue: false });
    });
    cy.get('[data-test="content"]').should('not.exist');
    cy.getWrapper().then((wrapper) => {
      wrapper.setProps({ modelValue: true });
    });
    cy.get('[data-test="content"]').should('be.visible');
  });

  it('uses the global transition', () => {
    cy.mount(
      <CCollapse>
        <CCollapseBtn data-test="btn">Collapse</CCollapseBtn>
        <CCollapseContent data-test="content">Content</CCollapseContent>
      </CCollapse>,
      {
        global: {
          stubs: {
            transition: false,
          },
          provide: {
            $chusho: {
              options: {
                components: {
                  collapseContent: {
                    transition: { name: 'fade' },
                  },
                },
              } as ChushoUserOptions,
            },
          },
        },
      }
    );

    cy.get('[data-test="btn"]').click();
    cy.get('[data-test="content"]').should(
      'have.class',
      'fade-enter-active fade-enter-to'
    );
  });

  it('uses the props transition', () => {
    cy.mount(
      <CCollapse>
        <CCollapseBtn data-test="btn">Collapse</CCollapseBtn>
        <CCollapseContent transition={{ name: 'fade' }} data-test="content">
          Content
        </CCollapseContent>
      </CCollapse>,
      {
        global: {
          stubs: {
            transition: false,
          },
          provide: {
            $chusho: {
              options: {
                components: {
                  collapseContent: {
                    transition: undefined,
                  },
                },
              } as ChushoUserOptions,
            },
          },
        },
      }
    );

    cy.get('[data-test="btn"]').click();
    cy.get('[data-test="content"]').should(
      'have.class',
      'fade-enter-active fade-enter-to'
    );
  });
});
