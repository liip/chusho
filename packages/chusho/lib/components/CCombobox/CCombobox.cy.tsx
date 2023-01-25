import { defineComponent, reactive } from 'vue';

import { ChushoUserOptions } from '../../types';

import {
  CCombobox,
  CComboboxBtn,
  CComboboxInput,
  CComboboxOption,
  CComboboxOptions,
} from '.';
import { CFormGroup } from '../CFormGroup';
import { CLabel } from '../CLabel';

describe('CCombobox', () => {
  it('applies local and global classes', () => {
    const value = '0';

    cy.mount(
      <CCombobox
        v-model={value}
        open
        disabled
        data-test="combobox"
        class="combobox"
      >
        <div>
          <CComboboxInput data-test="input" class="input" />
          <CComboboxBtn data-test="btn" class="btn">
            Toggle
          </CComboboxBtn>
        </div>
        <CComboboxOptions data-test="options" class="options">
          <CComboboxOption value="0" data-test="option" class="option">
            Item
          </CComboboxOption>
          <CComboboxOption
            value="1"
            disabled
            data-test="option-2"
            class="option"
          >
            Item disabled
          </CComboboxOption>
        </CComboboxOptions>
      </CCombobox>,
      {
        global: {
          provide: {
            $chusho: {
              options: {
                components: {
                  combobox: {
                    class({ open, disabled }) {
                      return {
                        'config-combobox': true,
                        open,
                        disabled,
                      };
                    },
                  },
                  comboboxInput: {
                    class: 'config-input',
                  },
                  comboboxBtn: {
                    class({ active, disabled }) {
                      return {
                        'config-btn': true,
                        active,
                        disabled,
                      };
                    },
                  },
                  comboboxOptions: {
                    class: 'config-options',
                  },
                  comboboxOption: {
                    class({ selected, disabled }) {
                      return {
                        'config-option': true,
                        selected,
                        disabled,
                      };
                    },
                  },
                },
              } as ChushoUserOptions,
            },
          },
        },
      }
    );

    cy.get('[data-test="combobox"]').should(
      'have.attr',
      'class',
      'combobox config-combobox open disabled'
    );
    cy.get('[data-test="input"]').should(
      'have.attr',
      'class',
      'input config-input'
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

    cy.getWrapper().then((wrapper) => {
      wrapper.setProps({ bare: true });

      cy.get('[data-test="combobox"]').should(
        'not.have.class',
        'config-combobox open disabled'
      );
    });
  });

  it('applies the right attributes', () => {
    const value = '0';

    cy.mount(
      <CCombobox v-model={value} data-test="combobox">
        <div>
          <CComboboxInput name="my-combobox" data-test="input" />
          <CComboboxBtn data-test="btn">Toggle</CComboboxBtn>
        </div>
        <CComboboxOptions data-test="options">
          <CComboboxOption value="0" data-test="option">
            Item
          </CComboboxOption>
          <CComboboxOption value="1" disabled data-test="option-2">
            Item disabled
          </CComboboxOption>
        </CComboboxOptions>
      </CCombobox>
    );

    cy.get('input[data-test="input"]')
      .should('have.attr', 'type', 'text')
      .and('have.attr', 'name', 'my-combobox')
      .and('have.attr', 'aria-autocomplete', 'list')
      .and('have.attr', 'aria-expanded', 'false')
      .focus()
      .type('{DownArrow}')
      .and('have.attr', 'aria-expanded', 'true');

    cy.get('[data-test="btn"]')
      .should('have.attr', 'aria-haspopup', 'listbox')
      .and('have.attr', 'aria-expanded', 'true')
      .and('have.attr', 'type', 'button')
      .and('have.attr', 'tabindex', '-1')
      .click()
      .should('have.attr', 'aria-expanded', 'false')
      .click();

    cy.get('[data-test="options"]')
      .should('have.attr', 'role', 'listbox')
      .and('have.attr', 'tabindex', '-1')
      .then(([options]) => {
        cy.get('input[data-test="input"]').should(
          'have.attr',
          'aria-controls',
          options.id
        );
        cy.get('[data-test="btn"]').should(
          'have.attr',
          'aria-controls',
          options.id
        );
      });

    cy.get('[data-test="option"]')
      .should('have.attr', 'role', 'option')
      .and('have.attr', 'aria-selected', 'true')
      .then(([option]) => {
        cy.get('input[data-test="input"]').should(
          'have.attr',
          'aria-activedescendant',
          option.id
        );
      });

    cy.get('[data-test="option-2"]')
      .should('have.attr', 'role', 'option')
      .and('have.attr', 'aria-disabled', 'true')
      .and('have.attr', 'aria-selected', 'false');
  });

  it('stays in sync with the v-model using primitive value', () => {
    const TestCombobox = defineComponent({
      data() {
        return {
          query: null,
          val: 'One',
        };
      },

      render() {
        return (
          <CCombobox v-model={this.val} data-test="combobox">
            <div>
              <CComboboxInput data-test="input" v-model={this.query} />
              <CComboboxBtn data-test="btn">Menu</CComboboxBtn>
            </div>
            <CComboboxOptions data-test="options">
              <CComboboxOption data-test="option-1" value="One" />
              <CComboboxOption data-test="option-2" value="Two" />
              <CComboboxOption data-test="option-3" value="Three" />
            </CComboboxOptions>
          </CCombobox>
        );
      },
    });

    cy.mount(<TestCombobox />);

    cy.getWrapper<InstanceType<typeof TestCombobox>>().then((wrapper) => {
      expect(wrapper.vm.query).to.eql('One');
      expect(
        (wrapper.find('[data-test="input"]').element as HTMLInputElement).value
      ).to.eql('One');
    });

    cy.get('[data-test="btn"]').click();
    cy.get('[data-test="option-2"]').click();

    cy.getWrapper<InstanceType<typeof TestCombobox>>().then((wrapper) => {
      expect(wrapper.vm.val).to.eql('Two');
      expect(wrapper.vm.query).to.eql('Two');
      expect(
        (wrapper.find('[data-test="input"]').element as HTMLInputElement).value
      ).to.eql('Two');

      wrapper.setData({ val: 'Three' });
    });

    cy.get('[data-test="btn"]').click();
    cy.get('[data-test="option-3"]').should(
      'have.attr',
      'aria-selected',
      'true'
    );

    cy.getWrapper<InstanceType<typeof TestCombobox>>().then((wrapper) => {
      expect(wrapper.vm.val).to.eql('Three');
      expect(wrapper.vm.query).to.eql('Three');
      expect(
        (wrapper.find('[data-test="input"]').element as HTMLInputElement).value
      ).to.eql('Three');
    });
  });

  it('stays in sync with the v-model using object value', () => {
    const items = reactive([
      { id: 1, label: 'One' },
      { id: 2, label: 'Two' },
      { id: 3, label: 'Three' },
    ]);
    const TestCombobox = defineComponent({
      data(): {
        query: string | null;
        val: null | typeof items[number];
        items: typeof items;
      } {
        return {
          query: null,
          val: null,
          items: items,
        };
      },

      render() {
        return (
          <CCombobox v-model={this.val} data-test="combobox">
            <div>
              <CComboboxInput data-test="input" v-model={this.query} />
              <CComboboxBtn data-test="btn">Menu</CComboboxBtn>
            </div>
            <CComboboxOptions data-test="options">
              {this.items.map((item, i) => (
                <CComboboxOption data-test={`option-${i + 1}`} value={item}>
                  {item.label}
                </CComboboxOption>
              ))}
            </CComboboxOptions>
          </CCombobox>
        );
      },
    });

    cy.mount(<TestCombobox />);

    cy.getWrapper<InstanceType<typeof TestCombobox>>().then((wrapper) => {
      expect(wrapper.vm.query).to.eql('');
      expect(
        (wrapper.find('[data-test="input"]').element as HTMLInputElement).value
      ).to.eql('');
    });

    cy.get('[data-test="btn"]').click();
    cy.get('[data-test="option-2"]').click();

    cy.getWrapper<InstanceType<typeof TestCombobox>>().then((wrapper) => {
      expect(wrapper.vm.val).to.equal(items[1]);
      expect(wrapper.vm.query).to.eql('Two');
      expect(
        (wrapper.find('[data-test="input"]').element as HTMLInputElement).value
      ).to.eql('Two');

      // Cannot use setData as it will loose the object reference while merging
      wrapper.vm.$data.val = items[2];
    });

    cy.get('[data-test="btn"]').click();
    cy.get('[data-test="option-3"]').should(
      'have.attr',
      'aria-selected',
      'true'
    );

    cy.getWrapper<InstanceType<typeof TestCombobox>>().then((wrapper) => {
      expect(wrapper.vm.val).to.equal(items[2]);
      expect(wrapper.vm.query).to.eql('Three');
      expect(
        (wrapper.find('[data-test="input"]').element as HTMLInputElement).value
      ).to.eql('Three');
    });
  });

  it('use default displayValue to set the query/input value', () => {
    const TestCombobox = defineComponent({
      data() {
        return {
          val: 'primitive value',
        };
      },

      render() {
        return (
          <CCombobox v-model={this.val} data-test="combobox">
            <CComboboxInput data-test="input" />
          </CCombobox>
        );
      },
    });

    cy.mount(<TestCombobox />);

    cy.get('[data-test="input"]').should('have.value', 'primitive value');

    cy.getWrapper().then((wrapper) => {
      wrapper.setData({ val: { label: 'object value' } });
    });

    cy.get('[data-test="input"]').should('have.value', 'object value');
  });

  it('use custom `displayValue` to set the query/input value', () => {
    const value = { customKey: 'something else' };

    cy.mount(
      <CCombobox
        v-model={value}
        displayValue={(item: { customKey: string }) => item.customKey}
      >
        <CComboboxInput data-test="input" />
      </CCombobox>
    );

    cy.get('[data-test="input"]').should('have.value', 'something else');
  });

  it('does not open when disabled', () => {
    cy.mount(
      <CCombobox disabled>
        <div>
          <CComboboxInput data-test="input" />
          <CComboboxBtn data-test="btn">Toggle</CComboboxBtn>
        </div>
        <CComboboxOptions data-test="options">
          <CComboboxOption value="Option" />
        </CComboboxOptions>
      </CCombobox>
    );

    cy.get('[data-test="btn"]').should('be.disabled').click({ force: true });
    cy.get('[data-test="options"]').should('not.exist');

    cy.get('[data-test="input"]')
      .should('be.disabled')
      .click({ force: true })
      .trigger('keydown', { key: 'ArrowDown', force: true });
    cy.get('[data-test="options"]').should('not.exist');
  });

  it('does not open when readonly', () => {
    cy.mount(
      <CCombobox readonly>
        <div>
          <CComboboxInput data-test="input" />
          <CComboboxBtn data-test="btn">Toggle</CComboboxBtn>
        </div>
        <CComboboxOptions data-test="options">
          <CComboboxOption value="Option" />
        </CComboboxOptions>
      </CCombobox>
    );

    cy.get('[data-test="btn"]').should('be.disabled').click({ force: true });
    cy.get('[data-test="options"]').should('not.exist');

    cy.get('[data-test="input"]').should('have.attr', 'readonly');
    cy.get('[data-test="input"]')
      .click()
      .trigger('keydown', { key: 'ArrowDown', force: true });
    cy.get('[data-test="options"]').should('not.exist');
  });

  it('provides `open` state to default slot', () => {
    cy.mount(
      <CCombobox>
        {({ open }: { open: boolean }) => (
          <CComboboxBtn data-test="btn">{open ? 'Close' : 'Open'}</CComboboxBtn>
        )}
      </CCombobox>
    );

    cy.get('[data-test="btn"]').should('have.text', 'Open');
    cy.get('[data-test="btn"]').click();
    cy.get('[data-test="btn"]').should('have.text', 'Close');
  });

  describe('common behavior', () => {
    beforeEach(() => {
      cy.mount(
        <CCombobox>
          <div>
            <CComboboxInput data-test="input" />
            <CComboboxBtn data-test="btn">Toggle</CComboboxBtn>
          </div>
          <CComboboxOptions data-test="options">
            <CComboboxOption data-test="option" value="Banana" />
            <CComboboxOption data-test="option-2" value="Apple" disabled />
            <CComboboxOption data-test="option-3" value="Approximately" />
          </CComboboxOptions>
        </CCombobox>
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

    it.only('can be navigated with a keyboard', () => {
      const input = cy.get('[data-test="input"]');

      input.click().type('a');

      const options = cy.get('[data-test="options"]');
      const option = cy.get('[data-test="option"]');
      const option3 = cy.get('[data-test="option-3"]');

      options.should('be.visible');
      option.then(([o]) => {
        input.should('have.attr', 'aria-activedescendant', o.id);
      });

      // Trigger it twice to ensure it doesn't loop
      input.type('{downarrow}{downarrow}');
      option3.then(([o]) => {
        input.should('have.attr', 'aria-activedescendant', o.id);
      });

      // Trigger it twice to ensure it doesn't loop
      input.type('{uparrow}{uparrow}');
      option.then(([o]) => {
        input.should('have.attr', 'aria-activedescendant', o.id);
      });

      input.type('{end}');
      option3.then(([o]) => {
        input.should('have.attr', 'aria-activedescendant', o.id);
      });

      input.type('{home}');
      option.then(([o]) => {
        input.should('have.attr', 'aria-activedescendant', o.id);
      });

      input.type('{enter}').should('have.value', 'Banana');
      cy.get('[data-test="options"]').should('not.exist');

      input.clear().type('Another thing');
      cy.get('[data-test="options"]').should('be.visible');
      input.type('{esc}');
      cy.get('[data-test="options"]').should('not.exist');
      // Reset the field to the last selected value
      cy.get('[data-test="input"]').should('have.value', 'Banana');

      cy.get('[data-test="btn"]').click();
      cy.get('[data-test="input"]').should('be.focused');
      cy.get('[data-test="options"]').should('be.visible');
      input.trigger('keydown', { key: 'Tab' });
      cy.get('[data-test="options"]').should('not.exist');
      cy.get('[data-test="input"]').should('have.value', 'Banana');
      // Focus should not be restored on the button
      cy.get('[data-test="btn"]').should('not.be.focused');

      cy.getWrapper().then((wrapper) => {
        expect(wrapper.emitted('update:modelValue')).to.deep.equal([
          ['Banana'],
        ]);
      });
    });

    //   it('moves focus to the best match when typing and loop back', () => {
    //     cy.get('[data-test="btn"]').click();
    //     cy.get('[data-test="option"]').type('app');
    //     cy.get('[data-test="option-2"]').should('be.focused');
    //     cy.wait(500);
    //     cy.get('[data-test="option-2"]').type('Appr');
    //     cy.get('[data-test="option-3"]').should('be.focused');
    //     cy.wait(500);
    //     cy.get('[data-test="option-3"]').type('Ba');
    //     cy.get('[data-test="option"]').should('be.focused');
    //   });

    //   it('closes when clicking outside', () => {
    //     cy.get('[data-test="btn"]').click();
    //     cy.get('[data-test="options"]').should('be.visible');
    //     cy.get('body').click();
    //     cy.get('[data-test="options"]').should('not.exist');
    //   });
  });

  // describe('in a CFormGroup', () => {

  //   it('sets CSelectBtn `aria-labelledby` attribute with both the form group label ID and the select button ID', () => {
  //     cy.mount(
  //       <CFormGroup>
  //         <CLabel data-test="label">Label</CLabel>
  //         <CSelect data-test="select">
  //           <CSelectBtn data-test="btn">Trigger</CSelectBtn>
  //         </CSelect>
  //       </CFormGroup>
  //     );

  //     cy.get('[data-test="label"]').then(([label]) => {
  //       cy.get('[data-test="btn"]').then(([btn]) => {
  //         expect(btn.getAttribute('aria-labelledby')).to.equal(
  //           `${label.getAttribute('id')} ${btn.getAttribute('id')}`
  //         );
  //       });
  //     });
  //   });

  //   it('keeps its own ID when specified', () => {
  //     cy.mount(
  //       <CFormGroup>
  //         <CSelect data-test="select">
  //           <CSelectBtn id="custom" data-test="btn">
  //             Trigger
  //           </CSelectBtn>
  //         </CSelect>
  //       </CFormGroup>
  //     );

  //     cy.get('[data-test="btn"]').should('have.attr', 'id', 'custom');
  //   });

  //   it('applies correct flags as attributes', () => {
  //     cy.mount(
  //       <CFormGroup required disabled readonly>
  //         <CSelect data-test="select">
  //           <CSelectBtn data-test="btn">Trigger</CSelectBtn>
  //         </CSelect>
  //       </CFormGroup>
  //     );

  //     cy.get('[data-test="btn"]')
  //       .should('have.attr', 'disabled', 'disabled')
  //       // required and readonly are not supported on CSelectBtn
  //       .and('not.have.attr', 'required', 'required')
  //       .and('not.have.attr', 'readonly', 'readonly');
  //   });
  // });
});
