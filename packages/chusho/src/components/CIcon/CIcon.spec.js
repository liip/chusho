import { shallowMount } from '@vue/test-utils';
import CIcon from './CIcon';

describe('CIcon', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(CIcon, {
      mocks: {
        $chusho: {
          options: {
            icon: {
              width: 24,
              height: 24,
            },
          },
        },
      },
      propsData: {
        id: 'foo',
      },
    });
  });

  it('should not be focusable', () => {
    expect(wrapper.find('svg').attributes('focusable')).toBe('false');
  });

  it('should be ignored by screen readers when there’s no alt prop provided', () => {
    expect(wrapper.find('svg').attributes('aria-hidden')).toBe('true');
  });

  it('should be labelled by the alt value when provided', () => {
    const alt = 'alt text';
    const wrapper = shallowMount(CIcon, {
      mocks: {
        $chusho: {
          options: {
            icon: {
              width: 24,
              height: 24,
            },
          },
        },
      },
      propsData: {
        id: 'foo',
        alt,
      },
    });
    const id = wrapper.find('svg').attributes('aria-labelledby');
    const title = wrapper.find(`#${id}`);
    expect(title.is('title')).toBe(true);
    expect(title.text()).toBe(alt);
  });
});
