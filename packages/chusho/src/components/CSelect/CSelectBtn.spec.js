import { mount } from '@vue/test-utils';
import { h } from 'vue';

import CSelect from './CSelect';
import CSelectBtn from './CSelectBtn';

describe('CSelectBtn', () => {
  it('renders with the right attributes when closed', () => {
    const wrapper = mount(CSelect, {
      slots: {
        default: h(CSelectBtn, null, { default: () => 'Label' }),
      },
    });

    expect(wrapper.findComponent(CSelectBtn).html()).toBe(
      '<button aria-expanded="false" aria-controls="chusho-toggle-1" aria-haspopup="listbox" type="button">Label</button>'
    );
  });

  it('renders with the right attributes when open', () => {
    const wrapper = mount(CSelect, {
      props: {
        open: true,
      },
      slots: {
        default: h(CSelectBtn, null, { default: () => 'Label' }),
      },
    });

    expect(wrapper.findComponent(CSelectBtn).html()).toBe(
      '<button aria-expanded="true" aria-controls="chusho-toggle-1" aria-haspopup="listbox" type="button">Label</button>'
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
                selectBtn: {
                  class: ({ active }) => ['select-btn', { active }],
                },
              },
            },
          },
        },
      },
      slots: {
        default: h(CSelectBtn),
      },
    });

    expect(wrapper.findComponent(CSelectBtn).classes()).toEqual([
      'select-btn',
      'active',
    ]);
  });

  it('inherits btn classes if inheritBtnClass option is true', () => {
    const wrapper = mount(CSelect, {
      global: {
        provide: {
          $chusho: {
            options: {
              components: {
                btn: {
                  class: 'btn',
                },
                selectBtn: {
                  inheritBtnClass: true,
                  class: 'select-btn',
                },
              },
            },
          },
        },
      },
      slots: {
        default: h(CSelectBtn),
      },
    });

    expect(wrapper.findComponent(CSelectBtn).classes()).toEqual([
      'select-btn',
      'btn',
    ]);
  });

  it('does not inherit btn classes if inheritBtnClass option is false', () => {
    const wrapper = mount(CSelect, {
      global: {
        provide: {
          $chusho: {
            options: {
              components: {
                btn: {
                  class: 'btn',
                },
                selectBtn: {
                  inheritBtnClass: false,
                  class: 'select-btn',
                },
              },
            },
          },
        },
      },
      slots: {
        default: h(CSelectBtn),
      },
    });

    expect(wrapper.findComponent(CSelectBtn).classes()).toEqual(['select-btn']);
  });
});
