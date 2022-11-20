/* eslint-disable vue/one-component-per-file */
import { createApp } from 'vue';

import * as components from './components';

import * as directives from './directives';

import * as main from './chusho';

describe('Chūshō', () => {
  it('provides the result of user options merged with default options to the app', () => {
    const app = createApp({
      template: '</div>',
    });
    app.use(main.default, {
      components: {
        btn: {
          class: 'foo',
        },
      },
    });
    expect(app._context.provides.$chusho).toBe(main.$chusho);
    expect(main.$chusho).toEqual({
      options: {
        components: {
          btn: {
            class: 'foo',
          },
        },
        rtl: expect.any(Function),
      },
      openDialogs: [],
    });
  });

  it('defineConfig returns the config', () => {
    const c = {
      components: {
        btn: {
          class: 'foo',
        },
      },
    };

    const config = main.defineConfig(c);

    expect(config).toEqual(c);
  });

  it('set direction based on document dir attribute', () => {
    expect(main.$chusho.options.rtl()).toEqual(false);
    document.dir = 'rtl';
    expect(main.$chusho.options.rtl()).toEqual(true);
  });

  it('exports an object of components', () => {
    expect(main.components).toEqual(components);
  });

  it('exports components individually', () => {
    expect(main).toMatchObject(components);
  });

  it('exports an object of directives', () => {
    expect(main.directives).toEqual(directives);
  });

  it('exports directives individually', () => {
    expect(main).toMatchObject(directives);
  });

  it('exports some utils', () => {
    expect(main.mergeDeep).toEqual(expect.any(Function));
  });
});
