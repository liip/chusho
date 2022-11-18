import { ChushoUserOptions } from '../../types';

import { CPicture } from '.';
import building from '../../../src/assets/images/building.jpg';
import buildingWebp from '../../../src/assets/images/building.webp';
import building2x from '../../../src/assets/images/building@2x.jpg';
import buildingWebp2x from '../../../src/assets/images/building@2x.webp';

describe('CPicture', () => {
  it('applies local and global classes to the `img` element', () => {
    cy.mount(<CPicture src={building} class="picture" data-test="picture" />, {
      global: {
        provide: {
          $chusho: {
            options: {
              components: {
                picture: {
                  class: 'config-picture',
                },
              },
            } as ChushoUserOptions,
          },
        },
      },
    });

    cy.get('img[data-test="picture"]').should(
      'have.class',
      'picture config-picture'
    );

    cy.getWrapper().then((wrapper) => {
      wrapper.setProps({ bare: true });

      cy.get('[data-test="picture"]').should(
        'not.have.class',
        'config-picture'
      );
    });
  });

  it('applies the right attributes', () => {
    cy.mount(<CPicture src={building} data-test="picture" />);

    cy.get('[data-test="picture"]').should('have.attr', 'alt', '');

    cy.getWrapper().then((wrapper) => {
      wrapper.setProps({ alt: 'Building' });

      cy.get('[data-test="picture"]').should('have.attr', 'alt', 'Building');
    });
  });

  it('renders the given sources', () => {
    cy.mount(
      <CPicture
        src={building}
        sources={[
          {
            srcset: `${buildingWebp2x} 2x, ${buildingWebp}`,
            type: 'image/webp',
          },
          {
            srcset: `${building2x} 2x, ${building}`,
            type: 'image/jpeg',
          },
        ]}
        data-test="picture"
      />
    );

    cy.get('[data-test="picture"]').should('have.attr', 'src', building);
    cy.get('picture source')
      .should('have.length', 2)
      .eq(0)
      .should('have.attr', 'srcset', `${buildingWebp2x} 2x, ${buildingWebp}`)
      .and('have.attr', 'type', 'image/webp');
    cy.get('picture source')
      .eq(1)
      .should('have.attr', 'srcset', `${building2x} 2x, ${building}`)
      .and('have.attr', 'type', 'image/jpeg');
  });
});
