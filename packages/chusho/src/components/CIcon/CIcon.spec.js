import { shallowMount, createLocalVue } from '@vue/test-utils';
import CIcon from './CIcon';

describe('CIcon', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(CIcon, {
      context: {
        props: {
          id: 'foo',
        },
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
      propsData: {
        id: 'foo',
        alt,
      },
    });
    const id = wrapper.find('svg').attributes('aria-labelledby');
    const title = wrapper.find(`#${id}`);
    expect(title.element.tagName).toBe('title');
    expect(title.text()).toBe(alt);
  });

  it('should link only the icon id when no sprite is specified', () => {
    expect(wrapper.find('use').attributes('href')).toBe('#foo');
  });

  it('should link the sprite url and the icon id when sprite is specified', () => {
    const localVue = createLocalVue();

    localVue.prototype.$chusho = {
      options: {
        components: {
          icon: {
            spriteUrl: '/path/to/icons-sprite.svg',
          },
        },
      },
    };

    wrapper = shallowMount(CIcon, {
      localVue,
      context: {
        props: {
          id: 'foo',
        },
      },
    });

    expect(wrapper.find('use').attributes('href')).toBe(
      '/path/to/icons-sprite.svg#foo'
    );
  });
});
