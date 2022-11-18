import { defineComponent, ref } from 'vue';

import { ChushoUserOptions } from '../../types';

import { CTextarea } from '.';
import { CFormGroup } from '../CFormGroup';

describe('CTextarea', () => {
  it('applies local and global classes', () => {
    cy.mount(<CTextarea class="textarea" data-test="textarea" />, {
      global: {
        provide: {
          $chusho: {
            options: {
              components: {
                textarea: {
                  class: ({ disabled, required, readonly }) => {
                    return [
                      'config-textarea',
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

    cy.get('[data-test="textarea"]').should(
      'have.class',
      'textarea config-textarea'
    );

    cy.getWrapper().then((wrapper) => {
      wrapper.setProps({ disabled: true, required: true, readonly: true });

      cy.get('[data-test="textarea"]').should(
        'have.class',
        'textarea config-textarea disabled required readonly'
      );
    });

    cy.getWrapper().then((wrapper) => {
      wrapper.setProps({ bare: true });

      cy.get('[data-test="textarea"]').should(
        'not.have.class',
        'config-textarea'
      );
    });
  });

  it('applies local flags as attributes to the input', () => {
    cy.mount(
      <CTextarea value="a" disabled required readonly data-test="textarea" />
    );

    cy.get('[data-test="textarea"]')
      .should('have.attr', 'disabled', 'disabled')
      .and('have.attr', 'required', 'required')
      .and('have.attr', 'readonly', 'readonly');
  });

  it('stays in sync with the v-model', () => {
    const TestTextarea = defineComponent({
      data() {
        return {
          val: 'Lorem',
        };
      },

      render() {
        return <CTextarea v-model={this.val} data-test="textarea" />;
      },
    });

    cy.mount(<TestTextarea />);

    cy.get('[data-test="textarea"]')
      .should('have.value', 'Lorem')
      .type(' ipsum dolor');

    cy.getWrapper().then((wrapper) => {
      expect((wrapper.vm as InstanceType<typeof TestTextarea>).val).to.eql(
        'Lorem ipsum dolor'
      );

      wrapper.setData({ val: 'Hello' });

      cy.get('[data-test="textarea"]').should('have.value', 'Hello');
    });
  });

  describe('in a CFormGroup', () => {
    it('inherits `id` attribute', () => {
      cy.mount(
        <CFormGroup>
          <CTextarea data-test="textarea" />
        </CFormGroup>
      );

      cy.get('[data-test="textarea"]')
        .should('have.attr', 'id')
        .and('match', /^chusho-field-/);
    });

    it('keeps its own ID when specified', () => {
      cy.mount(
        <CFormGroup>
          <CTextarea id="custom" data-test="textarea" />
        </CFormGroup>
      );

      cy.get('[data-test="textarea"]').should('have.attr', 'id', 'custom');
    });

    it('applies correct flags as attributes', () => {
      cy.mount(
        <CFormGroup required disabled readonly>
          <CTextarea data-test="textarea" />
        </CFormGroup>
      );

      cy.get('[data-test="textarea"]')
        .should('have.attr', 'disabled', 'disabled')
        .and('have.attr', 'required', 'required')
        .and('have.attr', 'readonly', 'readonly');
    });
  });
});
