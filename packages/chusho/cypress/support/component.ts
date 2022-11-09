import { VueWrapper } from '@vue/test-utils';
import { mount } from 'cypress/vue';

import '../../src/assets/tailwind.css';
import chushoConfig from '../../src/chusho.config.js';
import './commands';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      mount(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        component: any,
        options?: Parameters<typeof mount>[1]
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ): Chainable<any>;

      getWrapper(): Chainable<VueWrapper>;
    }
  }
}

Cypress.Commands.add('mount', (component, options = {}) => {
  options.extensions = options.extensions || {};
  options.extensions.components = options.extensions.components || {};

  options.extensions.provide = options.extensions.provide || {};
  options.extensions.provide.$chusho = {
    options: chushoConfig,
  };

  return mount(component, options).then((wrapper: VueWrapper) => {
    return cy.wrap(wrapper).as('vue');
  });
});

Cypress.Commands.add('getWrapper', () => {
  return cy.get('@vue').then((wrapper) => {
    return cy.wrap(wrapper) as unknown as VueWrapper;
  });
});
