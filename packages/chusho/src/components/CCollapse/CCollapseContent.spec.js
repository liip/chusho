import { mount } from '@vue/test-utils';
import { h } from 'vue';

import CCollapse from './CCollapse';
import CCollapseContent from './CCollapseContent';

describe('CCollapseContent', () => {
  it('does not render when closed', () => {
    const wrapper = mount(CCollapse, {
      slots: {
        default: h(CCollapseContent),
      },
    });

    expect(wrapper.findComponent(CCollapseContent).html()).toBe(undefined);
  });

  it('renders with the right attributes when open', () => {
    const wrapper = mount(CCollapse, {
      slots: {
        default: h(CCollapseContent),
      },
      props: {
        modelValue: true,
      },
    });

    expect(wrapper.findComponent(CCollapseContent).html()).toBe(
      '<div id="chusho-toggle-1"></div>'
    );
  });

  it('renders with config class', () => {
    const wrapper = mount(CCollapse, {
      global: {
        provide: {
          $chusho: {
            options: {
              components: {
                collapseContent: {
                  class: 'content',
                },
              },
            },
          },
        },
      },
      slots: {
        default: h(CCollapseContent),
      },
      props: {
        modelValue: true,
      },
    });

    expect(wrapper.findComponent(CCollapseContent).classes()).toEqual([
      'content',
    ]);
  });

  it('renders with transition from prop', () => {
    const wrapper = mount(CCollapse, {
      global: {
        stubs: {
          transition: false,
        },
      },
      slots: {
        default: h(CCollapseContent, {
          transition: { name: 'fade', appear: true },
        }),
      },
      props: {
        modelValue: true,
      },
    });

    expect(wrapper.find('#chusho-toggle-1').classes()).toEqual([
      'fade-enter-from',
      'fade-enter-active',
    ]);
  });
});
