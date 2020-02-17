import { shallowMount } from '@vue/test-utils';
import CBtn from './CBtn';

import { defaultOptions } from '@/main';

describe('CBtn', () => {
  it('should forward event listeners to the native element', () => {
    const click = jest.fn();
    const wrapper = shallowMount(CBtn, {
      mocks: {
        $chusho: {
          options: defaultOptions,
        },
      },
      listeners: {
        click,
      },
    });
    wrapper.find(CBtn).trigger('click');
    expect(click).toHaveBeenCalled();
  });
});
