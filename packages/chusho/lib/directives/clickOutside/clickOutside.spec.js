import { mount } from '@vue/test-utils';
import { ref } from 'vue';

import clickOutside from './clickOutside';

describe('clickOutside', () => {
  let wrapper;
  let component;
  let handler;

  describe('', () => {
    beforeEach(() => {
      handler = vi.fn();
      component = {
        template: `<button type="button" v-clickOutside="handler">Click</button>`,
        methods: {
          handler,
        },
      };
      wrapper = mount(component, {
        global: {
          directives: {
            clickOutside,
          },
        },
      });
    });

    it('should trigger handler when clicking outside', () => {
      document.body.click();
      expect(handler).toHaveBeenCalledTimes(1);
    });

    it('should not trigger handler when clicking inside', () => {
      wrapper.get('button').trigger('click');
      expect(handler).not.toHaveBeenCalled();
    });

    it('clean-up listeners when component is removed', () => {
      document.body.click();
      expect(handler).toHaveBeenCalledTimes(1);
      wrapper.unmount();
      document.body.click();
      expect(handler).toHaveBeenCalledTimes(1);
    });
  });

  it('should not trigger handler when clicking on ignored elements', async () => {
    handler = vi.fn();

    component = {
      template: `
        <button type="button" v-clickOutside="clickOutside">Click</button>
        <button type="button" ref="ignoredBtn">Ignored</button>
      `,

      setup() {
        const ignoredBtn = ref(null);
        const clickOutside = {
          handler,
          options: {
            ignore: [ignoredBtn],
          },
        };

        return {
          clickOutside,
          ignoredBtn,
        };
      },
    };

    wrapper = mount(component, {
      attachTo: document.body,
      global: {
        directives: {
          clickOutside,
        },
      },
    });

    document.body.click();
    expect(handler).toHaveBeenCalledTimes(1);
    await wrapper.get({ ref: 'ignoredBtn' }).trigger('click');
    expect(handler).toHaveBeenCalledTimes(1);

    wrapper.unmount();
  });

  it('should warn if the handler is not a function', () => {
    component = {
      template: `<button type="button" v-clickOutside="notafunction">Click</button>`,
      computed: {
        notafunction() {
          return null;
        },
      },
    };
    wrapper = mount(component, {
      global: {
        config: {
          warnHandler: () => {
            // Mute Vue warnings
          },
        },
        directives: {
          clickOutside,
        },
      },
    });

    document.body.click();

    expect('clickOutside handler must be a Function.').toHaveBeenWarned();
  });
});
