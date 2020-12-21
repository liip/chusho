import { mount } from '@vue/test-utils';
import { h } from 'vue';

import CCollapse from './CCollapse';
import CCollapseBtn from './CCollapseBtn';
import CCollapseContent from './CCollapseContent';

import uuid from '../../utils/uuid';

jest.mock('../../utils/uuid');

describe('CCollapse', () => {
  beforeEach(() => {
    uuid.mockClear();
  });

  it('renders without active class when closed', () => {
    const wrapper = mount(CCollapse, {
      global: {
        provide: {
          $chusho: {
            options: {
              components: {
                collapse: {
                  class: ({ active }) => {
                    return { active: active };
                  },
                },
              },
            },
          },
        },
      },
    });

    expect(wrapper.classes()).toEqual([]);
  });

  it('renders with active class', () => {
    const wrapper = mount(CCollapse, {
      global: {
        provide: {
          $chusho: {
            options: {
              components: {
                collapse: {
                  class: ({ active }) => {
                    return { active: active };
                  },
                },
              },
            },
          },
        },
      },
      props: {
        modelValue: true,
      },
    });

    expect(wrapper.classes()).toEqual(['active']);
  });

  it('renders default slot', () => {
    const wrapper = mount(CCollapse, {
      slots: {
        default: 'Slot',
      },
    });

    expect(wrapper.html()).toBe('<div>Slot</div>');
  });

  it('provides collapse API', () => {
    const wrapper = mount(CCollapse, {
      slots: {
        default: h(CCollapseBtn),
      },
    });
    expect(wrapper.findComponent(CCollapseBtn).vm.collapse).toEqual(
      wrapper.vm.collapse
    );
  });

  describe('CCollapseBtn', () => {
    it('renders with the right attributes', () => {
      const wrapper = mount(CCollapse, {
        slots: {
          default: h(CCollapseBtn),
        },
      });

      expect(wrapper.findComponent(CCollapseBtn).html()).toBe(
        '<button aria-expanded="false" aria-controls="chusho-toggle-{uniqueId}" type="button"></button>'
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
        '<div id="chusho-toggle-{uniqueId}"></div>'
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

      expect(wrapper.html()).toBe(
        '<div><div id="chusho-toggle-{uniqueId}" class="fade-enter-active fade-enter-from"></div></div>'
      );
    });
  });
});
