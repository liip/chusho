import { mount } from '@vue/test-utils';

import CCollapse from './CCollapse';

describe('CCollapse', () => {
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

  it('provides active state to default slot', () => {
    const wrapper = mount(CCollapse, {
      slots: {
        default: (params) => JSON.stringify(params),
      },
    });

    expect(wrapper.html()).toBe('<div>{"active":false}</div>');
  });
});
