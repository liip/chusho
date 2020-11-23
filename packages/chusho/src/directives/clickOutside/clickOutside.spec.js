import { shallowMount } from '@vue/test-utils';
import clickOutside from './clickOutside';

describe('clickOutside', () => {
  let wrapper;
  let component;
  let handler;

  beforeEach(() => {
    handler = jest.fn();
    component = {
      template: `<button v-clickOutside="handler">Click</button>`,
      methods: {
        handler,
      },
    };
    wrapper = shallowMount(component, {
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
});
