import { mount } from '@vue/test-utils';
import { h, nextTick } from 'vue';

import CTabs from './CTabs';
import CTabList from './CTabList';
import CTab from './CTab';
import CTabPanels from './CTabPanels';
import CTabPanel from './CTabPanel';

describe('CTabList', () => {
  it('renders with the right attributes', () => {
    const wrapper = mount(CTabs, {
      slots: {
        default: h(CTabList),
      },
    });

    expect(wrapper.findComponent(CTabList).html()).toEqual(
      '<div role="tablist"></div>'
    );
  });

  it('renders with config class', () => {
    const wrapper = mount(CTabs, {
      global: {
        provide: {
          $chusho: {
            options: {
              components: {
                tabList: {
                  class: 'tab-list',
                },
              },
            },
          },
        },
      },
      slots: {
        default: h(CTabList),
      },
    });

    expect(wrapper.findComponent(CTabList).classes()).toEqual(['tab-list']);
  });

  it('handles keypress to change active tab', async () => {
    const wrapper = mount(CTabs, {
      attachTo: document.body,
      slots: {
        default: () => [
          h(CTabList, null, {
            default: () => [
              h(CTab, {
                target: '1',
              }),
              h(CTab, {
                target: '2',
              }),
            ],
          }),
          h(CTabPanels, null, {
            default: () => [
              h(CTabPanel, {
                id: '1',
              }),
              h(CTabPanel, {
                id: '2',
              }),
            ],
          }),
        ],
      },
    });

    // Let it set the first tab as default
    await nextTick();
    await wrapper
      .find('[role="tab"][aria-selected="true"]')
      .trigger('keydown', { key: 'ArrowRight' });
    await nextTick();

    expect(wrapper.vm.tabs.selectedItemId.value).toBe('2');
    expect(wrapper.findAllComponents(CTab)[1].vm.$el).toBe(
      document.activeElement
    );

    wrapper.unmount();
  });
});
