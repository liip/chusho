import { defineComponent, reactive } from 'vue';

import { ChushoUserOptions } from '../../types';

import {
  CSelect,
  CSelectBtn,
  CSelectGroup,
  CSelectGroupLabel,
  CSelectOption,
  CSelectOptions,
} from '.';
import { CFormGroup } from '../CFormGroup';
import { CLabel } from '../CLabel';

describe('CSelect', () => {
  it('applies local and global classes', () => {
    const value = '0';

    cy.mount(
      <CSelect v-model={value} open disabled data-test="select" class="select">
        <CSelectBtn data-test="btn" class="btn">
          Menu
        </CSelectBtn>
        <CSelectOptions data-test="options" class="options">
          <CSelectOption value="0" data-test="option" class="option">
            Item
          </CSelectOption>
          <CSelectOption value="1" disabled data-test="option-2" class="option">
            Item disabled
          </CSelectOption>
          <CSelectGroup data-test="group" class="group">
            <CSelectGroupLabel data-test="group-label" class="group-label">
              Group label
            </CSelectGroupLabel>
          </CSelectGroup>
        </CSelectOptions>
      </CSelect>,
      {
        global: {
          provide: {
            $chusho: {
              options: {
                components: {
                  select: {
                    class({ open, disabled }) {
                      return {
                        'config-select': true,
                        open,
                        disabled,
                      };
                    },
                  },
                  selectBtn: {
                    class({ active, disabled }) {
                      return {
                        'config-btn': true,
                        active,
                        disabled,
                      };
                    },
                  },
                  selectOptions: {
                    class: 'config-options',
                  },
                  selectOption: {
                    class({ selected, disabled }) {
                      return {
                        'config-option': true,
                        selected,
                        disabled,
                      };
                    },
                  },
                  selectGroup: {
                    class: 'config-group',
                  },
                  selectGroupLabel: {
                    class: 'config-group-label',
                  },
                },
              } as ChushoUserOptions,
            },
          },
        },
      }
    );

    cy.get('[data-test="select"]').should(
      'have.attr',
      'class',
      'select config-select open disabled'
    );
    cy.get('[data-test="btn"]').should(
      'have.attr',
      'class',
      'btn config-btn active disabled'
    );
    cy.get('[data-test="options"]').should(
      'have.attr',
      'class',
      'options config-options'
    );
    cy.get('[data-test="option"]').should(
      'have.attr',
      'class',
      'option config-option selected'
    );
    cy.get('[data-test="option-2"]').should(
      'have.attr',
      'class',
      'option config-option disabled'
    );
    cy.get('[data-test="group"]').should(
      'have.attr',
      'class',
      'group config-group'
    );
    cy.get('[data-test="group-label"]').should(
      'have.attr',
      'class',
      'group-label config-group-label'
    );

    cy.getWrapper().then((wrapper) => {
      wrapper.setProps({ bare: true });

      cy.get('[data-test="select"]').should(
        'not.have.class',
        'config-select open disabled'
      );
    });
  });

  it('applies the right attributes', () => {
    const value = '0';

    cy.mount(
      <CSelect
        v-model={value}
        name="my-select"
        input={{ 'data-test': 'input' }}
        data-test="select"
      >
        <CSelectBtn data-test="btn">Menu</CSelectBtn>
        <CSelectOptions data-test="options">
          <CSelectOption value="0" data-test="option">
            Item
          </CSelectOption>
          <CSelectOption value="1" disabled data-test="option-2">
            Item disabled
          </CSelectOption>
          <CSelectGroup data-test="group">
            <CSelectGroupLabel data-test="group-label">
              Group label
            </CSelectGroupLabel>
            <CSelectOption value="2">Group option</CSelectOption>
          </CSelectGroup>
        </CSelectOptions>
      </CSelect>
    );

    cy.get('[data-test="btn"]')
      .should('have.attr', 'aria-haspopup', 'listbox')
      .and('have.attr', 'aria-expanded', 'false')
      .and('have.attr', 'type', 'button')
      .click()
      .should('have.attr', 'aria-expanded', 'true');

    cy.get('[data-test="options"]')
      .should('have.attr', 'role', 'listbox')
      .then(([options]) => {
        cy.get('[data-test="btn"]').should(
          'have.attr',
          'aria-controls',
          options.id
        );
      });

    cy.get('[data-test="option"]')
      .should('have.attr', 'role', 'option')
      .and('have.attr', 'aria-selected', 'true')
      .and('have.attr', 'tabindex', '0');

    cy.get('[data-test="option-2"]')
      .should('have.attr', 'role', 'option')
      .and('have.attr', 'aria-disabled', 'true')
      .and('have.attr', 'aria-selected', 'false')
      .and('have.attr', 'tabindex', '-1');

    cy.get('[data-test="group"]').should('have.attr', 'role', 'group');

    cy.get('[data-test="group-label"]').then(([label]) => {
      cy.get('[data-test="group"]').should(
        'have.attr',
        'aria-labelledby',
        label.id
      );
    });

    cy.get('input[data-test="input"]')
      .should('have.attr', 'type', 'hidden')
      .should('have.attr', 'name', 'my-select');
  });

  it('stays in sync with the v-model using primitive value', () => {
    const TestSelect = defineComponent({
      data() {
        return {
          val: '1',
        };
      },

      render() {
        return (
          <CSelect v-model={this.val} data-test="select">
            <CSelectBtn data-test="btn">Menu</CSelectBtn>
            <CSelectOptions data-test="options">
              <CSelectOption data-test="option-1" value="1">
                One
              </CSelectOption>
              <CSelectOption data-test="option-2" value="2">
                Two
              </CSelectOption>
              <CSelectOption data-test="option-3" value="3">
                Three
              </CSelectOption>
            </CSelectOptions>
          </CSelect>
        );
      },
    });

    cy.mount(<TestSelect />);

    cy.get('[data-test="btn"]').click();
    cy.get('[data-test="option-1"]')
      .should('have.attr', 'aria-selected', 'true')
      .click(); // Ensure selecting the same option behaves correctly
    cy.get('[data-test="btn"]').click();
    cy.get('[data-test="option-2"]').click();

    cy.getWrapper().then((wrapper) => {
      expect((wrapper.vm as InstanceType<typeof TestSelect>).val).to.eql('2');

      wrapper.setData({ val: '3' });

      cy.get('[data-test="select"]').click();
      cy.get('[data-test="option-3"]').should(
        'have.attr',
        'aria-selected',
        'true'
      );
    });
  });

  it('stays in sync with the v-model using object value', () => {
    const items = reactive([
      { id: 1, name: 'One' },
      { id: 2, name: 'Two' },
      { id: 3, name: 'Three' },
    ]);
    const TestSelect = defineComponent({
      data() {
        return {
          items,
          val: items[0],
        };
      },

      render() {
        return (
          <CSelect v-model={this.val} data-test="select">
            <CSelectBtn data-test="btn">Menu</CSelectBtn>
            <CSelectOptions data-test="options">
              {this.items.map((item) => (
                <CSelectOption data-test={`option-${item.id}`} value={item}>
                  {item.name}
                </CSelectOption>
              ))}
            </CSelectOptions>
          </CSelect>
        );
      },
    });

    cy.mount(<TestSelect />);

    cy.get('[data-test="btn"]').click();
    cy.get('[data-test="option-1"]')
      .should('have.attr', 'aria-selected', 'true')
      .click(); // Ensure selecting the same option behaves correctly
    cy.get('[data-test="btn"]').click();
    cy.get('[data-test="option-2"]').click();

    cy.getWrapper().then((wrapper) => {
      expect((wrapper.vm as InstanceType<typeof TestSelect>).val).to.equal(
        items[1]
      );

      // Cannot use wrapper.setData as it loose the reference to the object
      (wrapper.vm as InstanceType<typeof TestSelect>).$data.val = items[2];

      cy.get('[data-test="select"]').click();
      cy.get('[data-test="option-3"]').should(
        'have.attr',
        'aria-selected',
        'true'
      );
    });
  });

  it('gets the inner value for the hidden input if the value is an object', () => {
    const value = { value: 'something' };

    cy.mount(<CSelect v-model={value}></CSelect>);

    cy.get('input').should('have.value', 'something');
  });

  it('use the custom `displayValue` function for the hidden input', () => {
    const value = { customKey: 'something else' };

    cy.mount(
      <CSelect
        v-model={value}
        displayValue={(item: { customKey: string }) => item.customKey}
      ></CSelect>
    );

    cy.get('input').should('have.value', 'something else');
  });

  it('does not open when disabled', () => {
    cy.mount(
      <CSelect disabled>
        <CSelectBtn data-test="btn">Menu</CSelectBtn>
        <CSelectOptions data-test="options">
          <CSelectOption value="option">Option</CSelectOption>
        </CSelectOptions>
      </CSelect>
    );

    cy.get('[data-test="btn"]').should('be.disabled');
    cy.get('[data-test="options"]').should('not.exist');
    cy.get('[data-test="btn"]').click({ force: true });
    cy.get('[data-test="options"]').should('not.exist');
  });

  it('provides `open` state to default slot', () => {
    cy.mount(
      <CSelect>
        {({ open }: { open: boolean }) => (
          <CSelectBtn data-test="btn">{open ? 'Close' : 'Open'}</CSelectBtn>
        )}
      </CSelect>
    );

    cy.get('[data-test="btn"]').should('have.text', 'Open');
    cy.get('[data-test="btn"]').click();
    cy.get('[data-test="btn"]').should('have.text', 'Close');
  });

  describe('common behavior', () => {
    beforeEach(() => {
      cy.mount(
        <CSelect>
          <CSelectBtn data-test="btn">Menu</CSelectBtn>
          <CSelectOptions data-test="options">
            <CSelectOption data-test="option" value="1">
              Banana
            </CSelectOption>
            <CSelectOption data-test="option-2" value="2" disabled>
              Apple
            </CSelectOption>
            <CSelectOption data-test="option-3" value="3">
              Approximately
            </CSelectOption>
          </CSelectOptions>
        </CSelect>
      );
    });

    it('renders the options when open through button', () => {
      cy.get('[data-test="options"]').should('not.exist');
      cy.get('[data-test="btn"]').click();
      cy.get('[data-test="options"]').should('be.visible');
      cy.get('[data-test="btn"]').click();
      cy.get('[data-test="options"]').should('not.exist');
    });

    it('renders the options when open through v-model', () => {
      cy.get('[data-test="options"]').should('not.exist');
      cy.getWrapper().then((wrapper) => {
        wrapper.setProps({ open: true });
      });
      cy.get('[data-test="options"]').should('be.visible');
      cy.getWrapper().then((wrapper) => {
        wrapper.setProps({ open: false });
      });
      cy.get('[data-test="options"]').should('not.exist');
    });

    it('can be navigated with a keyboard', () => {
      cy.get('[data-test="btn"]').click();

      // Move focus with arrow keys
      cy.get('[data-test="option"]')
        .should('be.focused')
        .trigger('keydown', { key: 'ArrowDown' });
      cy.get('[data-test="option-2"]')
        .should('be.focused')
        .trigger('keydown', { key: 'ArrowDown' });
      cy.get('[data-test="option-3"]')
        .should('be.focused')
        .trigger('keydown', { key: 'Home' });
      cy.get('[data-test="option"]')
        .should('be.focused')
        .trigger('keydown', { key: 'ArrowUp' });
      // Should stay on the first item; doesn’t loop
      cy.get('[data-test="option"]')
        .should('be.focused')
        // Close with ESC
        .trigger('keydown', { key: 'Escape' });
      cy.get('[data-test="options"]').should('not.exist');

      // Close with Tab
      cy.get('[data-test="btn"]').should('be.focused').click();
      cy.get('[data-test="option"]')
        .should('be.focused')
        .trigger('keydown', { key: 'Tab' });
      cy.get('[data-test="options"]').should('not.exist');

      // Focus should be on the next focusable element, not restored here
      cy.get('[data-test="btn"]').should('not.be.focused').click();

      // Selection
      cy.get('[data-test="option"]')
        .should('be.focused')
        .trigger('keydown', { key: 'ArrowDown' });
      cy.get('[data-test="option-2"]')
        .should('be.focused')
        .trigger('keydown', { key: 'Enter' });
      // Selecting a disabled option does nothing
      cy.get('[data-test="options"]').should('be.visible');

      cy.get('[data-test="option-2"]').trigger('keydown', { key: 'ArrowDown' });
      // Can be selected with Enter
      cy.get('[data-test="option-3"]').trigger('keydown', { key: 'Enter' });

      // Selecting close the dropdown
      cy.get('[data-test="options"]').should('not.exist');

      // Can be selected with Spacebar too
      cy.get('[data-test="btn"]').click();
      cy.get('[data-test="option-3"]')
        .should('be.focused')
        .trigger('keydown', { key: 'Home' });
      cy.get('[data-test="option"]')
        .should('be.focused')
        .trigger('keydown', { key: 'Spacebar' });

      cy.getWrapper().then((wrapper) => {
        expect(wrapper.emitted('update:modelValue')).to.deep.equal([
          ['3'],
          ['1'],
        ]);
      });
    });

    it('moves focus to the best match when typing and loop back', () => {
      cy.get('[data-test="btn"]').click();

      cy.get('[data-test="option"]').type('app');
      cy.get('[data-test="option-2"]').should('be.focused');

      cy.wait(500);

      cy.get('[data-test="option-2"]').type('Appr');
      cy.get('[data-test="option-3"]').should('be.focused');

      cy.wait(500);

      cy.get('[data-test="option-3"]').type('Ba');
      cy.get('[data-test="option"]').should('be.focused');
    });

    it('closes when clicking outside', () => {
      cy.get('[data-test="btn"]').click();
      cy.get('[data-test="options"]').should('be.visible');
      cy.get('body').click();
      cy.get('[data-test="options"]').should('not.exist');
    });
  });

  describe('in a CFormGroup', () => {
    it('sets CSelectBtn `aria-labelledby` attribute with both the form group label ID and the select button ID', () => {
      cy.mount(
        <CFormGroup>
          <CLabel data-test="label">Label</CLabel>
          <CSelect data-test="select">
            <CSelectBtn data-test="btn">Trigger</CSelectBtn>
          </CSelect>
        </CFormGroup>
      );

      cy.get('[data-test="label"]').then(([label]) => {
        cy.get('[data-test="btn"]').then(([btn]) => {
          expect(btn.getAttribute('aria-labelledby')).to.equal(
            `${label.getAttribute('id')} ${btn.getAttribute('id')}`
          );
        });
      });
    });

    it('keeps its own ID when specified', () => {
      cy.mount(
        <CFormGroup>
          <CSelect data-test="select">
            <CSelectBtn id="custom" data-test="btn">
              Trigger
            </CSelectBtn>
          </CSelect>
        </CFormGroup>
      );

      cy.get('[data-test="btn"]').should('have.attr', 'id', 'custom');
    });

    it('applies correct flags as attributes', () => {
      cy.mount(
        <CFormGroup required disabled readonly>
          <CSelect data-test="select">
            <CSelectBtn data-test="btn">Trigger</CSelectBtn>
          </CSelect>
        </CFormGroup>
      );

      cy.get('[data-test="btn"]')
        .should('have.attr', 'disabled', 'disabled')
        // required and readonly are not supported on CSelectBtn
        .and('not.have.attr', 'required', 'required')
        .and('not.have.attr', 'readonly', 'readonly');
    });
  });
});
