import { mount } from '@vue/test-utils';

import clickOutside from './clickOutside';

describe('clickOutside', () => {
  let wrapper;
  let component;
  let handler;

  describe('', () => {
    beforeEach(() => {
      handler = vi.fn();
      component = {
        template: `<button v-clickOutside="handler">Click</button>`,
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

    it('should trigger directive when clicking outside', () => {
      document.body.click();
      expect(handler).toHaveBeenCalledTimes(1);
    });

    it('should not trigger directive when clicking inside', () => {
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

  it('should warn if the hanlder is not a function', () => {
    component = {
      template: `<button v-clickOutside="notafunction">Click</button>`,
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

    expect('clickOutside value must be a Function.').toHaveBeenWarned();
  });
});
