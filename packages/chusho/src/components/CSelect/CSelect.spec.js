import { mount } from '@vue/test-utils';
import { h } from 'vue';

import CSelect from './CSelect';
import CSelectBtn from './CSelectBtn';

describe('CSelect', () => {
  it('provides select API', () => {
    const wrapper = mount(CSelect, {
      slots: {
        default: h(CSelectBtn),
      },
    });

    expect(wrapper.findComponent(CSelectBtn).vm.select).toEqual(
      wrapper.vm.select
    );
  });

  it('renders with config class', () => {
    const wrapper = mount(CSelect, {
      global: {
        provide: {
          $chusho: {
            options: {
              components: {
                select: {
                  class: 'select',
                },
              },
            },
          },
        },
      },
    });

    expect(wrapper.classes()).toEqual(['select']);
  });

  it.each(['Tab', 'Esc', 'Escape'])('closes when pressing %s key', (key) => {
    const wrapper = mount(CSelect, {
      props: {
        open: true,
      },
    });

    expect(wrapper.vm.select.toggle.isOpen.value).toEqual(true);
    wrapper.trigger('keydown', { key });
    expect(wrapper.vm.select.toggle.isOpen.value).toEqual(false);
  });
});
