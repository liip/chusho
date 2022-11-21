import { ErrorMessage, Field, Form as VeeForm } from 'vee-validate';
import { defineComponent, ref } from 'vue';

import { ChushoUserOptions } from '../../types';

import { CTextField } from '.';
import { CFormGroup } from '../CFormGroup';

describe('CTextField', () => {
  it('applies local and global classes', () => {
    cy.mount(<CTextField class="textfield" data-test="textfield" />, {
      global: {
        provide: {
          $chusho: {
            options: {
              components: {
                textField: {
                  class: ({ disabled, required, readonly }) => {
                    return [
                      'config-textfield',
                      { disabled, required, readonly },
                    ];
                  },
                },
              },
            } as ChushoUserOptions,
          },
        },
      },
    });

    cy.get('[data-test="textfield"]').should(
      'have.class',
      'textfield config-textfield'
    );

    cy.getWrapper().then((wrapper) => {
      wrapper.setProps({ disabled: true, required: true, readonly: true });

      cy.get('[data-test="textfield"]').should(
        'have.class',
        'textfield config-textfield disabled required readonly'
      );
    });

    cy.getWrapper().then((wrapper) => {
      wrapper.setProps({ bare: true });

      cy.get('[data-test="textfield"]').should(
        'not.have.class',
        'config-textfield'
      );
    });
  });

  it('applies the right attributes', () => {
    cy.mount(<CTextField data-test="textfield" />);

    cy.get('[data-test="textfield"]').should('have.attr', 'type', 'text');

    cy.getWrapper().then((wrapper) => {
      wrapper.setProps({ type: 'email' });

      cy.get('[data-test="textfield"]').should('have.attr', 'type', 'email');
    });
  });

  it('applies local flags as attributes to the input', () => {
    cy.mount(<CTextField disabled required readonly data-test="textfield" />);

    cy.get('[data-test="textfield"]')
      .should('have.attr', 'disabled', 'disabled')
      .and('have.attr', 'required', 'required')
      .and('have.attr', 'readonly', 'readonly');
  });

  it('stays in sync with the v-model', () => {
    const TestTextField = defineComponent({
      data() {
        return {
          val: 'Lorem',
        };
      },

      render() {
        return <CTextField v-model={this.val} data-test="textfield" />;
      },
    });

    cy.mount(<TestTextField />);

    cy.get('[data-test="textfield"]')
      .should('have.value', 'Lorem')
      .type(' ipsum dolor');

    cy.getWrapper().then((wrapper) => {
      expect((wrapper.vm as InstanceType<typeof TestTextField>).val).to.eql(
        'Lorem ipsum dolor'
      );

      wrapper.setData({ val: 'Hello' });

      cy.get('[data-test="textfield"]').should('have.value', 'Hello');
    });
  });

  describe('in a CFormGroup', () => {
    it('inherits `id` attribute', () => {
      cy.mount(
        <CFormGroup>
          <CTextField data-test="textfield" />
        </CFormGroup>
      );

      cy.get('[data-test="textfield"]')
        .should('have.attr', 'id')
        .and('match', /^chusho-field-/);
    });

    it('keeps its own ID when specified', () => {
      cy.mount(
        <CFormGroup>
          <CTextField id="custom" data-test="textfield" />
        </CFormGroup>
      );

      cy.get('[data-test="textfield"]').should('have.attr', 'id', 'custom');
    });

    it('applies correct flags as attributes', () => {
      cy.mount(
        <CFormGroup required disabled readonly>
          <CTextField data-test="textfield" />
        </CFormGroup>
      );

      cy.get('[data-test="textfield"]')
        .should('have.attr', 'disabled', 'disabled')
        .and('have.attr', 'required', 'required')
        .and('have.attr', 'readonly', 'readonly');
    });
  });

  describe('with validation', () => {
    it('displays error message', () => {
      cy.mount(
        defineComponent({
          setup() {
            function isRequired(val: string) {
              return val ? true : 'This field is required';
            }

            return {
              val: ref(''),
              isRequired,
            };
          },

          render() {
            return (
              <VeeForm>
                <Field name="field" rules={this.isRequired}>
                  {({ field }: { field: Record<string, unknown> }) => (
                    <CTextField v-model={this.val} {...field} />
                  )}
                </Field>
                <ErrorMessage as="div" name="field" class="mt-2 text-red-700" />
              </VeeForm>
            );
          },
        })
      );

      cy.contains('This field is required').should('not.exist');
      cy.get('[name="field"]').type('Hello').clear().blur();
      cy.contains('This field is required').should('be.visible');
      cy.get('[name="field"]').type('Hey');
      cy.contains('This field is required').should('not.exist');
    });
  });
});
