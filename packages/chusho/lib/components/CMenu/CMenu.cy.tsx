import { ref } from 'vue';

import { ChushoUserOptions } from '../../types';

import {
  CMenu,
  CMenuBtn,
  CMenuItem,
  CMenuLink,
  CMenuList,
  CMenuSeparator,
} from '.';

describe('CMenu', () => {
  it('applies local and global classes', () => {
    const value = '0';

    cy.mount(
      <CMenu v-model={value} open disabled data-test="menu" class="menu">
        <CMenuBtn data-test="btn" class="btn">
          Menu
        </CMenuBtn>
        <CMenuList data-test="list" class="list">
          <CMenuItem value="0" data-test="item" class="item">
            Item
          </CMenuItem>
          <CMenuItem disabled data-test="item-2" class="item">
            Item disabled
          </CMenuItem>
          <CMenuSeparator
            data-test="separator"
            class="separator"
          ></CMenuSeparator>
          <CMenuLink href="#" data-test="link" class="link">
            Link
          </CMenuLink>
          <CMenuLink disabled href="#" data-test="link-2" class="link">
            Link disabled
          </CMenuLink>
        </CMenuList>
      </CMenu>,
      {
        global: {
          provide: {
            $chusho: {
              options: {
                components: {
                  menu: {
                    class({ open, disabled }) {
                      return {
                        'config-menu': true,
                        open,
                        disabled,
                      };
                    },
                  },
                  menuBtn: {
                    class({ active, disabled }) {
                      return {
                        'config-btn': true,
                        active,
                        disabled,
                      };
                    },
                  },
                  menuList: {
                    class: 'config-list',
                  },
                  menuItem: {
                    class({ role, selected, disabled }) {
                      return {
                        'config-item': true,
                        [role]: !!role,
                        selected,
                        disabled,
                      };
                    },
                  },
                  menuLink: {
                    class({ disabled }) {
                      return {
                        'config-link': true,
                        disabled,
                      };
                    },
                  },
                  menuSeparator: {
                    class: 'config-separator',
                  },
                },
              } as ChushoUserOptions,
            },
          },
        },
      }
    );

    cy.get('[data-test="menu"]').should(
      'have.attr',
      'class',
      'menu config-menu open disabled'
    );
    cy.get('[data-test="btn"]').should(
      'have.attr',
      'class',
      'btn config-btn active disabled'
    );
    cy.get('[data-test="list"]').should(
      'have.attr',
      'class',
      'list config-list'
    );
    cy.get('[data-test="item"]').should(
      'have.attr',
      'class',
      'item config-item menuitemradio selected'
    );
    cy.get('[data-test="item-2"]').should(
      'have.attr',
      'class',
      'item config-item menuitem disabled'
    );
    cy.get('[data-test="link"]').should(
      'have.attr',
      'class',
      'link config-link'
    );
    cy.get('[data-test="link-2"]').should(
      'have.attr',
      'class',
      'link config-link disabled'
    );
    cy.get('[data-test="separator"]').should(
      'have.attr',
      'class',
      'separator config-separator'
    );

    cy.getWrapper().then((wrapper) => {
      wrapper.setProps({ bare: true });

      cy.get('[data-test="menu"]').should(
        'not.have.class',
        'config-menu open disabled'
      );
    });
  });

  it('applies the right attributes', () => {
    cy.mount(
      <CMenu>
        <CMenuBtn data-test="btn">Menu</CMenuBtn>
        <CMenuList data-test="list">
          <CMenuItem data-test="item">Item</CMenuItem>
          <CMenuItem data-test="item-disabled" disabled>
            Item disabled
          </CMenuItem>
          <CMenuSeparator data-test="separator"></CMenuSeparator>
          <CMenuLink href="#" data-test="link">
            Link
          </CMenuLink>
          <CMenuLink href="#" data-test="link-disabled" disabled>
            Link disabled
          </CMenuLink>
        </CMenuList>
      </CMenu>
    );

    cy.get('[data-test="btn"]')
      .should('have.attr', 'type', 'button')
      .should('have.attr', 'aria-expanded', 'false')
      .and('have.attr', 'aria-haspopup', 'menu')
      .click()
      .should('have.attr', 'aria-expanded', 'true')
      .then(([btn]) => {
        cy.get('[data-test="list"]')
          .should('have.attr', 'id', btn.getAttribute('aria-controls'))
          .and('have.attr', 'role', 'menu');

        cy.get('[data-test="item"]')
          .should('have.attr', 'role', 'menuitem')
          .and('have.attr', 'tabindex', '0');

        cy.get('[data-test="item-disabled"]').should(
          'have.attr',
          'aria-disabled',
          'true'
        );

        cy.get('[data-test="separator"]').should(
          'have.attr',
          'role',
          'separator'
        );

        cy.get('[data-test="link"]')
          .should('have.attr', 'role', 'menuitem')
          .and('have.attr', 'tabindex', '-1')
          .parent('li')
          .should('have.attr', 'role', 'none');

        cy.get('[data-test="link-disabled"]').should(
          'have.attr',
          'aria-disabled',
          'true'
        );
      });
  });

  it('does not open when disabled', () => {
    cy.mount(
      <CMenu disabled>
        <CMenuBtn data-test="btn">Menu</CMenuBtn>
        <CMenuList data-test="list">
          <CMenuItem>Item 0</CMenuItem>
          <CMenuItem>Item 1</CMenuItem>
          <CMenuItem>Item 2</CMenuItem>
        </CMenuList>
      </CMenu>
    );
    cy.get('[data-test="btn"]').should('be.disabled');
    cy.get('[data-test="list"]').should('not.exist');
    cy.get('[data-test="btn"]').click({ force: true });
    cy.get('[data-test="list"]').should('not.exist');
  });

  it('provides `open` state in its default slot', () => {
    cy.mount(
      <CMenu data-test="menu">
        {({ open }: { open: boolean }) => `${open}`}
      </CMenu>
    );

    cy.get('[data-test="menu"]').should('have.text', 'false');

    cy.getWrapper().then((wrapper) => {
      wrapper.setProps({ open: true });
      cy.get('[data-test="menu"]').should('have.text', 'true');
    });
  });

  describe('common behavior', () => {
    beforeEach(() => {
      cy.mount(
        <CMenu data-test="menu">
          <CMenuBtn data-test="btn">Menu</CMenuBtn>
          <CMenuList data-test="list">
            <CMenuItem data-test="list-item">Banana</CMenuItem>
            <CMenuItem data-test="list-item-2">Apple</CMenuItem>
            <CMenuSeparator />
            <CMenuLink data-test="list-link">Approximately</CMenuLink>
          </CMenuList>
        </CMenu>
      );
    });

    it('renders the list when open through button', () => {
      cy.get('[data-test="list"]').should('not.exist');
      cy.get('[data-test="btn"]').click();
      cy.get('[data-test="list"]').should('be.visible');
      cy.get('[data-test="btn"]').click();
      cy.get('[data-test="list"]').should('not.exist');
    });

    it('renders the list when open through v-model', () => {
      cy.get('[data-test="list"]').should('not.exist');
      cy.getWrapper().then((wrapper) => {
        wrapper.setProps({ open: true });
      });
      cy.get('[data-test="list"]').should('be.visible');
      cy.getWrapper().then((wrapper) => {
        wrapper.setProps({ open: false });
      });
      cy.get('[data-test="list"]').should('not.exist');
    });

    it('can be navigated with a keyboard', () => {
      cy.get('[data-test="btn"]').click();
      cy.get('[data-test="list-item"]')
        .should('be.focused')
        .trigger('keydown', { key: 'ArrowDown' });
      cy.get('[data-test="list-item-2"]')
        .should('be.focused')
        .trigger('keydown', { key: 'ArrowDown' });
      cy.get('[data-test="list-link"]')
        .should('be.focused')
        .trigger('keydown', { key: 'ArrowDown' });
      // Should loop back to the first item
      cy.get('[data-test="list-item"]')
        .should('be.focused')
        .trigger('keydown', { key: 'End' });
      cy.get('[data-test="list-link"]')
        .should('be.focused')
        .trigger('keydown', { key: 'Home' });
      cy.get('[data-test="list-item"]')
        .should('be.focused')
        .trigger('keydown', { key: 'ArrowUp' });
      cy.get('[data-test="list-link"]')
        .should('be.focused')
        .trigger('keydown', { key: 'Escape' });
      cy.get('[data-test="list"]').should('not.exist');
      cy.get('[data-test="btn"]').should('be.focused').click();
      cy.get('[data-test="list-item"]')
        .should('be.focused')
        .trigger('keydown', { key: 'Tab' });
      cy.get('[data-test="list"]').should('not.exist');
    });

    it('moves focus to the best match when typing and loop back', () => {
      cy.get('[data-test="btn"]').click();

      cy.get('[data-test="list-item"]').type('app');
      cy.get('[data-test="list-item-2"]').should('be.focused');

      cy.wait(500);

      cy.get('[data-test="list-item-2"]').type('Appr');
      cy.get('[data-test="list-link"]').should('be.focused');

      cy.wait(500);

      cy.get('[data-test="list-link"]').type('Ba');
      cy.get('[data-test="list-item"]').should('be.focused');
    });

    it('closes when clicking outside', () => {
      cy.get('[data-test="btn"]').click();
      cy.get('[data-test="list"]').should('be.visible');
      cy.get('body').click();
      cy.get('[data-test="list"]').should('not.exist');
    });
  });

  describe('with a single value', () => {
    const value = ref();

    beforeEach(() => {
      value.value = undefined;

      cy.mount(
        <CMenu open v-model={value.value}>
          <CMenuBtn>Menu</CMenuBtn>
          <CMenuList>
            <CMenuItem data-test="list-item" value={null}>
              Empty
            </CMenuItem>
            <CMenuItem data-test="list-item" value={1}>
              Item 1
            </CMenuItem>
            <CMenuItem data-test="list-item" value={2}>
              Item 2
            </CMenuItem>
          </CMenuList>
        </CMenu>
      );
    });

    it('has the right aria attributes', () => {
      cy.get('[data-test="list-item"]')
        .should('have.attr', 'role', 'menuitemradio')
        .and('have.attr', 'aria-checked', 'false');

      cy.contains('Empty').click().should('have.attr', 'aria-checked', 'true');
    });

    it('does not select any item by default', () => {
      cy.get('[data-test="list-item"]').should(
        'have.attr',
        'aria-checked',
        'false'
      );
    });

    it('updates the value when an item is selected', () => {
      cy.contains('Empty').click();
      cy.contains('Item 1').click();

      cy.getWrapper().then((wrapper) => {
        expect(wrapper.emitted('update:modelValue')).to.deep.eq([[null], [1]]);
      });
    });
  });

  describe('with multiple values', () => {
    const value = ref();

    beforeEach(() => {
      value.value = undefined;

      cy.mount(
        <CMenu open multiple v-model={value.value}>
          <CMenuBtn>Menu</CMenuBtn>
          <CMenuList>
            <CMenuItem data-test="list-item" value={null}>
              Empty
            </CMenuItem>
            <CMenuItem data-test="list-item" value={1}>
              Item 1
            </CMenuItem>
            <CMenuItem data-test="list-item" value={2}>
              Item 2
            </CMenuItem>
          </CMenuList>
        </CMenu>
      );
    });

    it('has the right aria attributes', () => {
      cy.get('[data-test="list-item"]')
        .should('have.attr', 'role', 'menuitemcheckbox')
        .and('have.attr', 'aria-checked', 'false');

      cy.contains('Empty').click().should('have.attr', 'aria-checked', 'true');
    });

    it('does not select any item by default', () => {
      cy.get('[data-test="list-item"]').should(
        'have.attr',
        'aria-checked',
        'false'
      );
    });

    it('updates the value when an item is selected', () => {
      cy.contains('Empty').click();
      cy.contains('Item 1').click();
      cy.contains('Empty').click();
      cy.contains('Item 1').click();

      cy.getWrapper().then((wrapper) => {
        expect(wrapper.emitted('update:modelValue')).to.deep.eq([
          [[null]],
          [[null, 1]],
          [[1]],
          [[]],
        ]);
      });
    });
  });
});
