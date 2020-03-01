import { shallowMount } from '@vue/test-utils';
import CBtn from './CBtn';

describe('CBtn', () => {
  it('should forward event listeners to the native element', () => {
    const click = jest.fn();
    const wrapper = shallowMount(CBtn, {
      listeners: {
        click,
      },
    });
    wrapper.find(CBtn).trigger('click');
    expect(click).toHaveBeenCalled();
  });
});
