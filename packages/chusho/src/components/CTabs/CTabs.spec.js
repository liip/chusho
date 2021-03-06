import { mount } from '@vue/test-utils';
import { h } from 'vue';

import CTabs from './CTabs';
import CTabList from './CTabList';

describe('CTabs', () => {
  it('provides tabs API', () => {
    const wrapper = mount(CTabs, {
      slots: {
        default: h(CTabList),
      },
    });

    expect(wrapper.findComponent(CTabList).vm.tabs).toEqual(wrapper.vm.tabs);
  });

  it('renders with config class', () => {
    const wrapper = mount(CTabs, {
      global: {
        provide: {
          $chusho: {
            options: {
              components: {
                tabs: {
                  class: 'tabs',
                },
              },
            },
          },
        },
      },
    });

    expect(wrapper.classes()).toEqual(['tabs']);
  });
});
