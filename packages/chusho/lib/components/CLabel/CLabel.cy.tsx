import { ChushoUserOptions } from '../../types';

import { CLabel } from '.';
import { CFormGroup } from '../CFormGroup';
import { CTextField } from '../CTextField';

describe('CLabel', () => {
  it('applies local and global classes', () => {
    cy.mount(
      <CLabel class="label" data-test="label">
        Label
      </CLabel>,
      {
        global: {
          provide: {
            $chusho: {
              options: {
                components: {
                  label: {
                    class: 'config-label',
                  },
                },
              } as ChushoUserOptions,
            },
          },
        },
      }
    );

    cy.get('[data-test="label"]').should('have.class', 'label config-label');

    cy.getWrapper().then((wrapper) => {
      wrapper.setProps({ bare: true });

      cy.get('[data-test="label"]').should('not.have.class', 'config-label');
    });
  });

  it('renders the default slot', () => {
    cy.mount(<CLabel data-test="label">Label</CLabel>);

    cy.get('[data-test="label"]').should('contain', 'Label');
  });

  describe('in a CFormGroup', () => {
    it('inherits `id` and `for` attributes', () => {
      cy.mount(
        <CFormGroup>
          <CLabel data-test="label">Label</CLabel>
          <CTextField data-test="field" />
        </CFormGroup>
      );

      cy.get('[data-test="label"]')
        .should('have.attr', 'id')
        .and('match', /^chusho-label-/);

      cy.get('[data-test="field"]').then(([field]) => {
        const id = field.getAttribute('id');
        cy.get(`[data-test="label"]`).should('have.attr', 'for', id);
      });
    });

    it('keeps its own ID when specified', () => {
      cy.mount(
        <CFormGroup>
          <CLabel id="custom" data-test="label">
            Label
          </CLabel>
        </CFormGroup>
      );

      cy.get('[data-test="label"]').should('have.attr', 'id', 'custom');
    });
  });
});
