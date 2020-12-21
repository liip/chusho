import { mount } from '@vue/test-utils';
import { h, nextTick } from 'vue';

import CTabs from './CTabs';
import CTabList from './CTabList';
import CTab from './CTab';
import CTabPanels from './CTabPanels';
import CTabPanel from './CTabPanel';

import uuid from '../../utils/uuid';

jest.mock('../../utils/uuid');

describe('CTabs', () => {
  beforeEach(() => {
    uuid.mockClear();
  });

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

      expect(wrapper.vm.tabs.selectedItem.value).toBe('2');
    });
  });

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
        '<button type="button" id="chusho-tabs-{uniqueId}-tab-1" role="tab" aria-selected="true" aria-controls="chusho-tabs-{uniqueId}-tabpanel-1" tabindex="0"></button>'
      );
      expect(tabs[1].html()).toEqual(
        '<button type="button" id="chusho-tabs-{uniqueId}-tab-2" role="tab" aria-selected="false" aria-controls="chusho-tabs-{uniqueId}-tabpanel-2" tabindex="-1"></button>'
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
      await wrapper
        .find('[role="tab"][aria-selected="false"]')
        .trigger('click');

      expect(wrapper.vm.tabs.selectedItem.value).toBe('2');
    });
  });

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

      expect(wrapper.findComponent(CTabPanels).classes()).toEqual([
        'tab-panels',
      ]);
    });
  });

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
        '<div id="chusho-tabs-{uniqueId}-tabpanel-2" role="tabpanel" aria-labelledby="chusho-tabs-{uniqueId}-tab-2" tabindex="0"></div>'
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
  });
});
