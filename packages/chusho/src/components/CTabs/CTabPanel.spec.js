import { mount } from '@vue/test-utils';
import { h } from 'vue';

import CTabs from './CTabs';
import CTabList from './CTabList';
import CTab from './CTab';
import CTabPanels from './CTabPanels';
import CTabPanel from './CTabPanel';

describe('CTabPanel', () => {
  it('renders only the currently active panel with the right attributes', async () => {
    const wrapper = mount(CTabs, {
      props: {
        defaultTab: '2',
      },
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

    const panels = wrapper.findAllComponents(CTabPanel);
    expect(panels[0].html()).toEqual(undefined);
    expect(panels[1].html()).toEqual(
      '<div id="chusho-tabs-0-tabpanel-2" role="tabpanel" aria-labelledby="chusho-tabs-0-tab-2" tabindex="0"></div>'
    );
  });

  it('renders with config class', () => {
    const wrapper = mount(CTabs, {
      global: {
        provide: {
          $chusho: {
            options: {
              components: {
                tabPanel: {
                  class: ({ active }) => {
                    return ['tab-panel', { active }];
                  },
                },
              },
            },
          },
        },
      },
      slots: {
        default: h(CTabPanel, { id: '1' }),
      },
    });

    expect(wrapper.findComponent(CTabPanel).classes()).toEqual([
      'tab-panel',
      'active',
    ]);
  });

  it('registers itself as a tab with id', () => {
    const wrapper = mount(CTabs, {
      slots: {
        default: h(CTabPanel, { id: '1' }),
      },
    });

    expect(wrapper.vm.tabs.items.value).toEqual([
      {
        id: '1',
      },
    ]);
  });

  it('unregisters itself when unmounted', () => {
    const wrapper = mount(CTabs, {
      slots: {
        default: h(CTabPanel, { id: '1' }),
      },
    });

    expect(wrapper.vm.tabs.items.value.length).toBe(1);
    wrapper.unmount();
    expect(wrapper.vm.tabs.items.value.length).toBe(0);
  });
});
