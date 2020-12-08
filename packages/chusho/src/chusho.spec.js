/* eslint-disable vue/one-component-per-file */
import { createApp } from 'vue';
import * as main from './chusho';
import * as components2 from './components';
import * as directives2 from './directives';

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

  it('set direction based on document dir attribute', () => {
    expect(main.$chusho.options.rtl()).toEqual(false);
    document.dir = 'rtl';
    expect(main.$chusho.options.rtl()).toEqual(true);
  });

  it('exports an object of components', () => {
    expect(main.components).toEqual(components2);
  });

  it('exports components individually', () => {
    expect(main).toMatchObject(components2);
  });

  it('exports an object of directives', () => {
    expect(main.directives).toEqual(directives2);
  });

  it('exports directives individually', () => {
    expect(main).toMatchObject(directives2);
  });
});
