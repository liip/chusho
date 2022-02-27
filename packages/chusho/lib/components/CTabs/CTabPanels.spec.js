import { mount } from '@vue/test-utils';
import { h } from 'vue';

import CTabPanels from './CTabPanels';
import CTabs from './CTabs';

describe('CTabPanels', () => {
  it('renders with config class', () => {
    const wrapper = mount(CTabs, {
      global: {
        provide: {
          $chusho: {
            options: {
              components: {
                tabPanels: {
                  class: 'tab-panels',
                },
              },
            },
          },
        },
      },
      slots: {
        default: h(CTabPanels),
      },
    });

    expect(wrapper.findComponent(CTabPanels).classes()).toEqual(['tab-panels']);
  });
});
