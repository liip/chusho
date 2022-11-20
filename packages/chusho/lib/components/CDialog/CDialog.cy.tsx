import { PropType, TransitionProps, defineComponent, ref } from 'vue';

import { ChushoUserOptions } from '../../types';

import { CDialog } from '.';
import { CBtn } from '../CBtn';

const TestDialog = defineComponent({
  props: {
    transition: {
      type: [Object, Boolean] as PropType<TransitionProps | false>,
      default: null,
    },
    overlay: {
      type: Object as PropType<Record<string, unknown>>,
      default: () => ({}),
    },
  },

  setup(props, { slots, attrs }) {
    const open = ref(false);
    const text = ref('');

    return () => (
      <>
        <CBtn onClick={() => (open.value = true)}>Open dialog</CBtn>

        <CDialog
          modelValue={open.value}
          onUpdate:modelValue={(value) => (open.value = value)}
          data-test="dialog"
          {...props}
          overlay={Object.assign(
            { 'data-test': 'dialog-overlay' },
            props.overlay
          )}
          {...attrs}
        >
          <header class="flex pb-3 mb-6 border-b">
            <div class="flex-1">
              <h1 class="text-lg font-semibold">Dialog title</h1>
            </div>
            <div class="ml-4">
              <CBtn
                class="p-2 leading-none"
                aria-label="Close dialog"
                bare
                data-test="close-btn"
                onClick={() => (open.value = false)}
              >
                <span>✗</span>
              </CBtn>
            </div>
          </header>

          {slots.default?.() || (
            <input
              v-model={text.value}
              type="text"
              class="w-full border px-3 py-2"
              data-test="input"
            />
          )}
        </CDialog>
      </>
    );
  },
});

describe('CDialog', () => {
  it('applies local and global classes', () => {
    cy.mount(
      <TestDialog class="dialog" overlay={{ class: 'dialog-overlay' }} />,
      {
        global: {
          provide: {
            $chusho: {
              options: {
                components: {
                  dialog: {
                    class: 'config-dialog',
                    overlayClass: 'config-dialog-overlay',
                  },
                },
              } as ChushoUserOptions,
              openDialogs: [],
            },
          },
        },
      }
    );

    cy.contains('Open dialog').click();

    cy.get('[data-test="dialog"]')
      .should('have.class', 'dialog config-dialog')
      .parent()
      .should('have.class', 'dialog-overlay config-dialog-overlay');

    cy.getWrapper().then((wrapper) => {
      wrapper.setProps({ bare: true });

      cy.get('[data-test="dialog"]')
        .should('not.have.class', 'config-dialog')
        .parent()
        .should('not.have.class', 'config-dialog-overlay');
    });
  });

  it('applies the right attributes', () => {
    cy.mount(<TestDialog />);
    cy.contains('Open dialog').click();

    cy.get('[data-test="dialog"]')
      .should('have.attr', 'role', 'dialog')
      .and('have.attr', 'aria-modal', 'true')
      .parent()
      .should('have.attr', 'tabindex', '-1');
  });

  it('does not duplicate the dialogs root if it exists already', () => {
    const dialogsRoot = document.createElement('div');
    dialogsRoot.id = 'chusho-dialogs-portal';
    document.body.appendChild(dialogsRoot);

    cy.mount(<TestDialog />);
    cy.contains('Open dialog').click();

    cy.get('#chusho-dialogs-portal').should('have.length', 1);
  });

  describe('common behavior', () => {
    beforeEach(() => {
      cy.mount(<TestDialog />);
    });

    it('does not render the dialog by default', () => {
      cy.get('[data-test="dialog"]').should('not.exist');
    });

    it('renders the dialog in a portal while open', () => {
      cy.contains('Open dialog').click();
      cy.get('body > #chusho-dialogs-portal [data-test="dialog"]').should(
        'be.visible'
      );

      cy.get('[data-test="close-btn"]').click();
      cy.get('body > #chusho-dialogs-portal').should('be.empty');
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
      cy.focused()
        .should('have.attr', 'data-test', 'close-btn')
        .realPress('Tab');
      cy.focused().should('have.attr', 'data-test', 'input').realPress('Tab');
      cy.focused()
        .should('have.attr', 'data-test', 'close-btn')
        .realPress(['Shift', 'Tab']);
      cy.focused().should('have.attr', 'data-test', 'input');
    });

    it('restores focus after being closed', () => {
      cy.contains('Open dialog').click();
      cy.get('[data-test="dialog"]').should('be.visible');
      cy.get('body').trigger('keydown', { key: 'Escape' });
      cy.get('[data-test="dialog"]').should('not.exist');
      cy.contains('Open dialog').should('have.focus');
    });

    it('closes when pressing the ESC key', () => {
      cy.contains('Open dialog').click();
      cy.get('[data-test="dialog"]').should('be.visible');
      cy.get('body').trigger('keydown', { key: 'Escape' });
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
      cy.focused()
        .should('have.attr', 'data-test', 'close-btn')
        .realPress('Tab');
      cy.focused().should('have.attr', 'data-test', 'input').realPress('Tab');
      cy.focused()
        .should('have.attr', 'data-test', 'close-btn')
        .realPress(['Shift', 'Tab']);
      cy.focused().should('have.attr', 'data-test', 'input');
    });
  });

  describe('nested', () => {
    const TestNestedDialog = defineComponent(() => {
      const childOpen = ref(false);

      return () => (
        <div>
          <TestDialog>
            <CBtn
              data-test="nested-trigger"
              onClick={() => (childOpen.value = true)}
            >
              Open Child Dialog
            </CBtn>
          </TestDialog>

          <CDialog
            modelValue={childOpen.value}
            onUpdate:modelValue={(value) => (childOpen.value = value)}
          >
            <CBtn onClick={() => (childOpen.value = false)}>Cancel</CBtn>
          </CDialog>
        </div>
      );
    });

    beforeEach(() => {
      cy.mount(<TestNestedDialog />);
    });

    it('closes only the last dialog when pressing ESC', () => {
      cy.contains('Open dialog').click();
      cy.contains('Open Child Dialog').click();
      cy.get('[role="dialog"]').should('have.length', 2);
      cy.get('body').trigger('keydown', { key: 'Escape' });
      cy.get('[role="dialog"]').should('have.length', 1);
      cy.get('body').trigger('keydown', { key: 'Escape' });
      cy.get('[role="dialog"]').should('not.exist');
    });
  });

  describe('with transition', () => {
    it('uses the global transition', () => {
      cy.mount(<TestDialog />, {
        global: {
          stubs: {
            transition: false,
          },
          provide: {
            $chusho: {
              options: {
                components: {
                  dialog: {
                    transition: { name: 'fade' },
                  },
                },
              } as ChushoUserOptions,
              openDialogs: [],
            },
          },
        },
      });

      cy.contains('Open dialog').click();
      cy.get('[data-test="dialog-overlay"]').should(
        'have.class',
        'fade-enter-active fade-enter-to'
      );
      cy.get('body').trigger('keydown', { key: 'Escape' });
      cy.get('[data-test="dialog-overlay"]').should(
        'have.class',
        'fade-leave-active fade-leave-to'
      );
    });

    it('uses the props transition', () => {
      cy.mount(<TestDialog transition={{ name: 'fade' }} />, {
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
              openDialogs: [],
            },
          },
        },
      });

      cy.contains('Open dialog').click();
      cy.get('[data-test="dialog-overlay"]').should(
        'have.class',
        'fade-enter-active fade-enter-to'
      );
      cy.get('body').trigger('keydown', { key: 'Escape' });
      cy.get('[data-test="dialog-overlay"]').should(
        'have.class',
        'fade-leave-active fade-leave-to'
      );
    });
  });

  describe('with dynamic content', () => {
    beforeEach(() => {
      const items = ref([1]);

      function addItem() {
        items.value.push(items.value.length + 1);
      }

      function removeItem() {
        items.value.pop();
      }

      cy.mount(
        <TestDialog>
          <ul class="space-y-5">
            {items.value.map((item) => (
              <li key={item}>
                <input
                  type="text"
                  name={`item-${item}`}
                  class="w-full border px-3 py-2"
                  data-test="input"
                  value={`Input ${item}`}
                />
              </li>
            ))}
            <li class="flex justify-stretch space-x-4">
              <CBtn variant="primary" data-test="add-item" onClick={addItem}>
                Add item
              </CBtn>
              <CBtn data-test="remove-item" onClick={removeItem}>
                Remove item
              </CBtn>
            </li>
          </ul>
        </TestDialog>
      );
    });

    it('refreshes the list of focusable element when dialog content changes', () => {
      cy.contains('Open dialog').click();
      cy.contains('Add item').click();
      cy.contains('Add item').click();
      cy.get('[data-test="input"]').should('have.length', 3);
      cy.contains('Add item').realPress(['Shift', 'Tab']);
      cy.focused()
        .should('have.attr', 'name', 'item-3')
        .realPress(['Shift', 'Tab']);
      cy.focused()
        .should('have.attr', 'name', 'item-2')
        .realPress(['Shift', 'Tab']);
      cy.focused()
        .should('have.attr', 'name', 'item-1')
        .realPress(['Shift', 'Tab']);
      cy.focused()
        .should('have.attr', 'data-test', 'close-btn')
        .realPress(['Shift', 'Tab']);
      cy.focused()
        .should('have.attr', 'data-test', 'remove-item')
        .click()
        .realPress('Tab')
        .realPress('Tab');
      cy.focused().should('have.attr', 'name', 'item-1');
    });
  });
});
