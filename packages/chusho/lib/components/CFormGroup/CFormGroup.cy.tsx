import { ChushoUserOptions } from '../../types';

import { CFormGroup } from '.';
import { CTextField } from '../CTextField';

describe('CFormGroup', () => {
  it('applies local and global classes', () => {
    cy.mount(
      <CFormGroup
        as="div"
        class="form-group"
        data-test="form-group"
        required
        disabled
        readonly
      >
        Slot
      </CFormGroup>,
      {
        global: {
          provide: {
            $chusho: {
              options: {
                components: {
                  formGroup: {
                    class({ required, disabled, readonly }) {
                      return [
                        'config-form-group',
                        {
                          required: required,
                          disabled: disabled,
                          readonly: readonly,
                        },
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

    cy.get('[data-test="form-group"]').should(
      'have.class',
      'form-group config-form-group required disabled readonly'
    );

    cy.getWrapper().then((wrapper) => {
      wrapper.setProps({ bare: true });

      cy.get('[data-test="form-group"]').should(
        'not.have.class',
        'config-form-group required disabled readonly'
      );
    });
  });

  it('is renderless by default', () => {
    cy.mount(<CFormGroup data-test="form-group">Slot</CFormGroup>, {
      global: {
        provide: {
          $chusho: {
            options: {
              components: {
                formGroup: {
                  as: undefined,
                },
              },
            } as ChushoUserOptions,
          },
        },
      },
    });

    cy.get('[data-test="form-group"]').should('not.exist');
  });

  it('render as the element defined in the config', () => {
    cy.mount(<CFormGroup data-test="form-group">Slot</CFormGroup>, {
      global: {
        provide: {
          $chusho: {
            options: {
              components: {
                formGroup: {
                  as: 'article',
                },
              },
            } as ChushoUserOptions,
          },
        },
      },
    });

    cy.get('article[data-test="form-group"]').should('be.visible');
  });

  it('render as the element defined in as prop', () => {
    cy.mount(
      <CFormGroup as="span" data-test="form-group">
        Slot
      </CFormGroup>
    );

    cy.get('span[data-test="form-group"]').should('be.visible');
  });

  it('is renderless when “as” prop is false, overriding the config option', () => {
    cy.mount(
      <CFormGroup as={false} data-test="form-group">
        Slot
      </CFormGroup>,
      {
        global: {
          provide: {
            $chusho: {
              options: {
                components: {
                  formGroup: {
                    as: 'article',
                  },
                },
              } as ChushoUserOptions,
            },
          },
        },
      }
    );

    cy.get('[data-test="form-group"]').should('not.exist');
  });

  it('defines and provides flags as slot props', () => {
    cy.mount(
      <CFormGroup as="div">
        {({
          required,
          disabled,
          readonly,
        }: {
          required: boolean;
          disabled: boolean;
          readonly: boolean;
        }) => {
          return (
            <div>
              <span data-test="required">{String(required)}</span>
              <span data-test="disabled">{String(disabled)}</span>
              <span data-test="readonly">{String(readonly)}</span>
            </div>
          );
        }}
      </CFormGroup>
    );

    cy.get('[data-test="required"]').should('have.text', 'undefined');
    cy.get('[data-test="disabled"]').should('have.text', 'undefined');
    cy.get('[data-test="readonly"]').should('have.text', 'undefined');

    cy.getWrapper().then((wrapper) => {
      wrapper.setProps({
        required: true,
        disabled: true,
        readonly: true,
      });

      cy.get('[data-test="required"]').should('have.text', 'true');
      cy.get('[data-test="disabled"]').should('have.text', 'true');
      cy.get('[data-test="readonly"]').should('have.text', 'true');
    });

    cy.getWrapper().then((wrapper) => {
      wrapper.setProps({
        required: false,
        disabled: false,
        readonly: false,
      });

      cy.get('[data-test="required"]').should('have.text', 'false');
      cy.get('[data-test="disabled"]').should('have.text', 'false');
      cy.get('[data-test="readonly"]').should('have.text', 'false');
    });
  });

  it('inherits flags from parent formGroup', () => {
    cy.mount(
      <CFormGroup as="div" required disabled readonly>
        <CFormGroup as="div">
          {({
            required,
            disabled,
            readonly,
          }: {
            required: boolean;
            disabled: boolean;
            readonly: boolean;
          }) => {
            return (
              <div>
                <span data-test="required">{String(required)}</span>
                <span data-test="disabled">{String(disabled)}</span>
                <span data-test="readonly">{String(readonly)}</span>
              </div>
            );
          }}
        </CFormGroup>
      </CFormGroup>
    );

    cy.get('[data-test="required"]').should('have.text', 'true');
    cy.get('[data-test="disabled"]').should('have.text', 'true');
    cy.get('[data-test="readonly"]').should('have.text', 'true');
  });

  it('overrides flags from parent formGroup', () => {
    cy.mount(
      <CFormGroup as="div" required disabled readonly>
        <CFormGroup as="div" required={false} disabled={false} readonly={false}>
          {({
            required,
            disabled,
            readonly,
          }: {
            required: boolean;
            disabled: boolean;
            readonly: boolean;
          }) => {
            return (
              <div>
                <span data-test="required">{String(required)}</span>
                <span data-test="disabled">{String(disabled)}</span>
                <span data-test="readonly">{String(readonly)}</span>
              </div>
            );
          }}
        </CFormGroup>
      </CFormGroup>
    );

    cy.get('[data-test="required"]').should('have.text', 'false');
    cy.get('[data-test="disabled"]').should('have.text', 'false');
    cy.get('[data-test="readonly"]').should('have.text', 'false');
  });

  it('provides dynamic IDs to the default slot', () => {
    cy.mount(
      <CFormGroup>
        {({ ids }: { ids: Record<string, string> }) => {
          return (
            <>
              <CTextField data-test="field" aria-describedby={ids.help} />
              <div data-test="help" id={ids.help}>
                Help text
              </div>
            </>
          );
        }}
      </CFormGroup>
    );

    cy.get('[data-test="help"]').then(([help]) => {
      const id = help.getAttribute('id');
      expect(id).to.not.be.empty;
      cy.get(`[data-test="field"]`).should('have.attr', 'aria-describedby', id);
    });
  });
});
