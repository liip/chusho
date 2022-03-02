import { mount } from '@vue/test-utils';
import { h } from 'vue';

import CSelect from './CSelect';
import CSelectGroup from './CSelectGroup';
import CSelectGroupLabel from './CSelectGroupLabel';

describe('CSelectGroup', () => {
  it('provides selectGroup API', () => {
    const wrapper = mount(CSelectGroup, {
      slots: {
        default: h(CSelectGroupLabel),
      },
    });

    expect(wrapper.findComponent(CSelectGroupLabel).vm.selectGroup).toEqual(
      wrapper.vm.selectGroup
    );
  });

  it('renders with the right attributes', () => {
    const wrapper = mount(CSelect, {
      slots: {
        default: h(CSelectGroup, null, { default: () => 'Slot' }),
      },
    });

    expect(wrapper.findComponent(CSelectGroup).html()).toBe(
      '<div role="group" aria-labelledby="chusho-select-group-label-1">Slot</div>'
    );
  });

  it('renders with config class', () => {
    const wrapper = mount(CSelect, {
      props: {
        open: true,
      },
      global: {
        provide: {
          $chusho: {
            options: {
              components: {
                selectGroup: {
                  class: 'select-group',
                },
              },
            },
          },
        },
      },
      slots: {
        default: h(CSelectGroup),
      },
    });

    expect(wrapper.findComponent(CSelectGroup).classes()).toEqual([
      'select-group',
    ]);
  });
});
