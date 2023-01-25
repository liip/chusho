import '@cypress/code-coverage/support';
import { VueWrapper } from '@vue/test-utils';
import 'cypress-real-events/support';
import { mount } from 'cypress/vue';
import { ComponentPublicInstance, reactive } from 'vue';

import '../../src/assets/tailwind.css';
import chushoConfig from '../../src/chusho.config';
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

      getWrapper<T extends ComponentPublicInstance>(): Chainable<VueWrapper<T>>;
    }
  }
}

Cypress.Commands.add('mount', (component, options = {}) => {
  options.extensions = options.extensions || {};
  options.extensions.components = options.extensions.components || {};

  options.extensions.provide = options.extensions.provide || {};
  options.extensions.provide.$chusho = reactive({
    options: chushoConfig,
    openDialogs: [],
  });

  return mount(component, options).then(({ wrapper }) => {
    return cy.wrap(wrapper).as('vue');
  });
});

Cypress.Commands.add('getWrapper', () => {
  return cy.get('@vue').then((wrapper) => {
    return cy.wrap(wrapper) as unknown as VueWrapper;
  });
});
