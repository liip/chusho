import { defineComponent, ref } from 'vue';

import { ChushoUserOptions } from '../../types';

import { CCheckbox } from '.';
import { CFormGroup } from '../CFormGroup';

describe('CCheckbox', () => {
  it('applies local and global classes', () => {
    cy.mount(<CCheckbox class="checkbox" data-test="checkbox" />, {
      global: {
        provide: {
          $chusho: {
            options: {
              components: {
                checkbox: {
                  class: ({ checked, disabled, required }) => {
                    return ['config-checkbox', { checked, disabled, required }];
                  },
                },
              },
            } as ChushoUserOptions,
          },
        },
      },
    });

    cy.get('[data-test="checkbox"]').should(
      'have.class',
      'checkbox config-checkbox'
    );

    cy.getWrapper().then((wrapper) => {
      wrapper.setProps({ modelValue: true, disabled: true, required: true });

      cy.get('[data-test="checkbox"]').should(
        'have.class',
        'checkbox config-checkbox checked disabled required'
      );
    });

    cy.getWrapper().then((wrapper) => {
      wrapper.setProps({ bare: true });

      cy.get('[data-test="checkbox"]').should(
        'not.have.class',
        'config-checkbox checked disabled required'
      );
    });
  });

  it('applies the right attributes', () => {
    cy.mount(<CCheckbox data-test="checkbox" id="custom" />);

    cy.get('[data-test="checkbox"]')
      .should('have.attr', 'type', 'checkbox')
      .and('have.attr', 'id', 'custom');
  });

  it('applies local flags as attributes to the input', () => {
    cy.mount(<CCheckbox disabled required data-test="checkbox" />);

    cy.get('[data-test="checkbox"]')
      .should('have.attr', 'disabled', 'disabled')
      .and('have.attr', 'required', 'required');
  });

  it('stays in sync with the v-model', () => {
    const TestCheckbox = defineComponent({
      setup() {
        return {
          val: ref(null),
        };
      },

      render() {
        return <CCheckbox v-model={this.val} data-test="checkbox" />;
      },
    });

    cy.mount(<TestCheckbox />);

    cy.get('[data-test="checkbox"]')
      .should('not.be.checked')
      .click()
      .should('be.checked');

    cy.getWrapper().then((wrapper) => {
      expect((wrapper.vm as InstanceType<typeof TestCheckbox>).val).to.eql(
        true
      );
    });

    cy.get('[data-test="checkbox"]').click().should('not.be.checked');

    cy.getWrapper().then((wrapper) => {
      expect((wrapper.vm as InstanceType<typeof TestCheckbox>).val).to.eql(
        false
      );
    });
  });

  it('uses custom trueValue and falseValue props', () => {
    const TestCheckbox = defineComponent({
      setup() {
        return {
          val: ref('off'),
        };
      },

      render() {
        return (
          <CCheckbox
            v-model={this.val}
            trueValue="on"
            falseValue="off"
            data-test="checkbox"
          />
        );
      },
    });

    cy.mount(<TestCheckbox />);

    cy.get('[data-test="checkbox"]')
      .should('not.be.checked')
      .click()
      .should('be.checked');

    cy.getWrapper().then((wrapper) => {
      expect((wrapper.vm as InstanceType<typeof TestCheckbox>).val).to.eql(
        'on'
      );
    });

    cy.get('[data-test="checkbox"]').click().should('not.be.checked');

    cy.getWrapper().then((wrapper) => {
      expect((wrapper.vm as InstanceType<typeof TestCheckbox>).val).to.eql(
        'off'
      );
    });
  });

  describe('in a CFormGroup', () => {
    it('inherits `id` attribute', () => {
      cy.mount(
        <CFormGroup>
          <CCheckbox data-test="checkbox" />
        </CFormGroup>
      );

      cy.get('[data-test="checkbox"]')
        .should('have.attr', 'id')
        .and('match', /^chusho-field-/);
    });

    it('keeps its own ID when specified', () => {
      cy.mount(
        <CFormGroup>
          <CCheckbox id="custom" data-test="checkbox" />
        </CFormGroup>
      );

      cy.get('[data-test="checkbox"]').should('have.attr', 'id', 'custom');
    });

    it('applies correct flags as attributes', () => {
      cy.mount(
        <CFormGroup required disabled readonly>
          <CCheckbox data-test="checkbox" />
        </CFormGroup>
      );

      cy.get('[data-test="checkbox"]')
        .should('have.attr', 'disabled', 'disabled')
        .and('have.attr', 'required', 'required')
        // Readonly is not supported on checkboxes
        .and('not.have.attr', 'readonly', 'readonly');
    });
  });
});
