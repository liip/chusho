import { mount } from '@vue/test-utils';
import { h } from 'vue';

import { CBtn } from '../CBtn';
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
      '<button aria-expanded="false" aria-controls="chusho-toggle-1" type="button"></button>'
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

  it('forwards active state to the underlying CBtn', () => {
    const wrapper = mount(CCollapse, {
      props: {
        modelValue: true,
      },
      slots: {
        default: h(CCollapseBtn),
      },
    });

    expect(wrapper.findComponent(CBtn).props('active')).toBe(true);
  });
});
