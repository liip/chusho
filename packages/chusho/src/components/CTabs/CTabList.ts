import { defineComponent, h, inject, ref, nextTick, mergeProps } from 'vue';

import { DollarChusho } from '../../types';
import { getSiblingIndexByArrowKey } from '../../utils/keyboard';
import { generateConfigClass } from '../../utils/components';
import componentMixin from '../shared';
import { TabsSymbol, UseTabs } from './CTabs';

export default defineComponent({
  name: 'CTabList',

  mixins: [componentMixin],

  inheritAttrs: false,

  setup(props, { attrs, slots }) {
    const chushoOptions = inject<DollarChusho | null>('$chusho', null)?.options;
    const tabs = inject(TabsSymbol) as UseTabs;
    const tabList = ref<null | Element>(null);

    function handleNavigation(e: KeyboardEvent): void {
      if (!tabs.currentTab.value) return;

      const activeTabIndex = tabs.tabs.value.indexOf(tabs.currentTab.value);
      const activeTabId = tabs.tabs.value[activeTabIndex];
      const rtl = chushoOptions?.rtl;
      const newIndex = getSiblingIndexByArrowKey(
        tabs.tabs.value,
        activeTabId,
        e.key,
        rtl && rtl()
      );

      if (newIndex !== undefined) {
        e.preventDefault();

        tabs.setCurrentTab(tabs.tabs.value[newIndex]);

        nextTick(() => {
          if (tabList.value) {
            const activeTab: HTMLElement | null = tabList.value.querySelector(
              '[aria-selected="true"]'
            );
            if (activeTab) {
              activeTab.focus();
            }
          }
        });
      }
    }

    return () => {
      const tabListConfig = chushoOptions?.components?.tabList;
      const elementProps: Record<string, unknown> = {
        role: 'tablist',
        onKeydown: handleNavigation,
        ref: tabList,
        ...generateConfigClass(tabListConfig?.class, props),
      };

      return h('div', mergeProps(attrs, elementProps), slots);
    };
  },
});
