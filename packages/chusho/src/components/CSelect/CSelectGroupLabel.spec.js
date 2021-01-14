import { mount } from '@vue/test-utils';
import { h } from 'vue';

import CSelectGroup from './CSelectGroup';
import CSelectGroupLabel from './CSelectGroupLabel';

describe('CSelectGroupLabel', () => {
  it('renders with the right attributes', () => {
    const wrapper = mount(CSelectGroup, {
      slots: {
        default: h(CSelectGroupLabel, null, { default: () => 'Label' }),
      },
    });

    expect(wrapper.findComponent(CSelectGroupLabel).html()).toBe(
      '<div id="chusho-select-group-label-0">Label</div>'
    );
  });

  it('renders with config class', () => {
    const wrapper = mount(CSelectGroup, {
      props: {
        open: true,
      },
      global: {
        provide: {
          $chusho: {
            options: {
              components: {
                selectGroupLabel: {
                  class: 'select-group-label',
                },
              },
            },
          },
        },
      },
      slots: {
        default: h(CSelectGroupLabel),
      },
    });

    expect(wrapper.findComponent(CSelectGroupLabel).classes()).toEqual([
      'select-group-label',
    ]);
  });
});
