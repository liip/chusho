import { mount } from '@vue/test-utils';

import CLabel from './CLabel';

describe('CLabel', () => {
  it('renders with config class', () => {
    const wrapper = mount(CLabel, {
      global: {
        provide: {
          $chusho: {
            options: {
              components: {
                label: {
                  class: 'label',
                },
              },
            },
          },
        },
      },
    });

    expect(wrapper.classes()).toEqual(['label']);
  });

  it('renders default slot and attributes', () => {
    const wrapper = mount(CLabel, {
      attrs: {
        for: 'the-field',
      },
      slots: {
        default: 'Label',
      },
    });

    expect(wrapper.html()).toBe('<label for="the-field">Label</label>');
  });
});
