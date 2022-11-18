import { defineComponent, ref } from 'vue';

import { ChushoUserOptions } from '../../types';

import { CRadio } from '.';
import { CFormGroup } from '../CFormGroup';

describe('CRadio', () => {
  it('applies local and global classes', () => {
    cy.mount(<CRadio value="a" class="radio" data-test="radio" />, {
      global: {
        provide: {
          $chusho: {
            options: {
              components: {
                radio: {
                  class: ({ checked, disabled, required }) => {
                    return ['config-radio', { checked, disabled, required }];
                  },
                },
              },
            } as ChushoUserOptions,
          },
        },
      },
    });

    cy.get('[data-test="radio"]').should('have.class', 'radio config-radio');

    cy.getWrapper().then((wrapper) => {
      wrapper.setProps({ modelValue: 'a', disabled: true, required: true });

      cy.get('[data-test="radio"]').should(
        'have.class',
        'radio config-radio checked disabled required'
      );
    });

    cy.getWrapper().then((wrapper) => {
      wrapper.setProps({ bare: true });

      cy.get('[data-test="radio"]').should(
        'not.have.class',
        'config-radio checked disabled required'
      );
    });
  });

  it('applies the right attributes', () => {
    cy.mount(<CRadio value="a" data-test="radio" id="test" />);

    cy.get('[data-test="radio"]')
      .should('have.attr', 'type', 'radio')
      .and('have.attr', 'value', 'a')
      .and('have.attr', 'id', 'test');
  });

  it('applies local flags as attributes to the input', () => {
    cy.mount(<CRadio value="a" disabled required data-test="radio" />);

    cy.get('[data-test="radio"]')
      .should('have.attr', 'disabled', 'disabled')
      .and('have.attr', 'required', 'required');
  });

  it('stays in sync with the v-model', () => {
    const TestRadios = defineComponent({
      setup() {
        const val = ref(null);

        return { val };
      },

      render() {
        return (
          <div class="space-x-4">
            <label>
              <CRadio value="a" v-model={this.val} data-test="radio-1" /> A
            </label>
            <label>
              <CRadio value="b" v-model={this.val} data-test="radio-2" /> B
            </label>
          </div>
        );
      },
    });

    cy.mount(<TestRadios />);

    cy.get('[data-test="radio-1"]')
      .should('not.be.checked')
      .click()
      .should('be.checked');

    cy.getWrapper().then((wrapper) => {
      expect((wrapper.vm as InstanceType<typeof TestRadios>).val).to.eql('a');
    });

    cy.get('[data-test="radio-2"]')
      .should('not.be.checked')
      .click()
      .should('be.checked');

    cy.getWrapper().then((wrapper) => {
      expect((wrapper.vm as InstanceType<typeof TestRadios>).val).to.eql('b');
    });
  });

  describe('in a CFormGroup', () => {
    it('inherits `id` attribute', () => {
      cy.mount(
        <CFormGroup>
          <CRadio value="a" data-test="radio" />
        </CFormGroup>
      );

      cy.get('[data-test="radio"]')
        .should('have.attr', 'id')
        .and('match', /^chusho-field-/);
    });

    it('keeps its own ID when specified', () => {
      cy.mount(
        <CFormGroup>
          <CRadio value="a" id="custom" data-test="radio" />
        </CFormGroup>
      );

      cy.get('[data-test="radio"]').should('have.attr', 'id', 'custom');
    });

    it('applies correct flags as attributes', () => {
      cy.mount(
        <CFormGroup required disabled readonly>
          <CRadio value="a" data-test="radio" />
        </CFormGroup>
      );

      cy.get('[data-test="radio"]')
        .should('have.attr', 'disabled', 'disabled')
        .and('have.attr', 'required', 'required')
        // Readonly is not supported on radios
        .and('not.have.attr', 'readonly', 'readonly');
    });
  });
});
