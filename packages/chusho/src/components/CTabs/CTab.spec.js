import { mount } from '@vue/test-utils';
import { h, nextTick } from 'vue';

import CTabs from './CTabs';
import CTabList from './CTabList';
import CTab from './CTab';
import CTabPanels from './CTabPanels';
import CTabPanel from './CTabPanel';

describe('CTab', () => {
  it('renders with the right attributes', async () => {
    const wrapper = mount(CTabs, {
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

    const tabs = wrapper.findAllComponents(CTab);
    expect(tabs[0].html()).toEqual(
      '<button type="button" id="chusho-tabs-0-tab-1" role="tab" aria-selected="true" aria-controls="chusho-tabs-0-tabpanel-1" tabindex="0"></button>'
    );
    expect(tabs[1].html()).toEqual(
      '<button type="button" id="chusho-tabs-0-tab-2" role="tab" aria-selected="false" aria-controls="chusho-tabs-0-tabpanel-2" tabindex="-1"></button>'
    );
  });

  it('renders with config class', () => {
    const wrapper = mount(CTabs, {
      global: {
        provide: {
          $chusho: {
            options: {
              components: {
                tab: {
                  class: ({ active }) => {
                    return ['tab', { active }];
                  },
                },
              },
            },
          },
        },
      },
      props: {
        defaultTab: '1',
      },
      slots: {
        default: h(CTab, { target: '1' }),
      },
    });

    expect(wrapper.findComponent(CTab).classes()).toEqual(['tab', 'active']);
  });

  it('handles click to set active tab', async () => {
    const wrapper = mount(CTabs, {
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

    expect(wrapper.vm.tabs.selectedItem.value).toBe('1');

    // Let it set the first tab as default
    await nextTick();
    await wrapper.find('[role="tab"][aria-selected="false"]').trigger('click');

    expect(wrapper.vm.tabs.selectedItem.value).toBe('2');
  });
});
