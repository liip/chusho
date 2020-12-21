import { mount } from '@vue/test-utils';
import { h } from 'vue';

import CCollapse from './CCollapse';
import CCollapseBtn from './CCollapseBtn';

describe('CCollapseBtn', () => {
  it('renders with the right attributes', () => {
    const wrapper = mount(CCollapse, {
      slots: {
        default: h(CCollapseBtn),
      },
    });

    expect(wrapper.findComponent(CCollapseBtn).html()).toBe(
      '<button aria-expanded="false" aria-controls="chusho-toggle-UNIQUE_ID" type="button"></button>'
    );
  });

  it('renders without active class when closed', () => {
    const wrapper = mount(CCollapse, {
      global: {
        provide: {
          $chusho: {
            options: {
              components: {
                collapseBtn: {
                  class: ({ active }) => {
                    return { active: active };
                  },
                },
              },
            },
          },
        },
      },
      slots: {
        default: h(CCollapseBtn),
      },
    });

    expect(wrapper.findComponent(CCollapseBtn).classes()).toEqual([]);
  });

  it('renders with active class', () => {
    const wrapper = mount(CCollapse, {
      global: {
        provide: {
          $chusho: {
            options: {
              components: {
                collapseBtn: {
                  class: ({ active }) => {
                    return { active: active };
                  },
                },
              },
            },
          },
        },
      },
      slots: {
        default: h(CCollapseBtn),
      },
      props: {
        modelValue: true,
      },
    });

    expect(wrapper.findComponent(CCollapseBtn).classes()).toEqual(['active']);
  });

  it('toggles the collapse state on click', () => {
    const wrapper = mount(CCollapse, {
      slots: {
        default: h(CCollapseBtn),
      },
    });

    expect(wrapper.vm.collapse.toggle.isOpen.value).toBe(false);
    wrapper.findComponent(CCollapseBtn).trigger('click');
    expect(wrapper.vm.collapse.toggle.isOpen.value).toBe(true);
  });
});
