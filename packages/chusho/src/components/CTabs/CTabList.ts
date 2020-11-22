import { defineComponent, h, inject, ref, nextTick, mergeProps } from 'vue';

import { TabsSymbol, UseTabs } from './CTabs';
import { props as sharedProps } from './shared';
import { getSiblingIndexByArrowKey } from '../../utils/keyboard';
import { DollarChusho } from '../../types';

export default defineComponent({
  name: 'CTabList',

  inheritAttrs: false,

  props: {
    ...sharedProps,
  },

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
      const tabsConfig = chushoOptions?.components?.tabs;
      const elementProps: Record<string, unknown> = {
        role: 'tablist',
        onKeydown: handleNavigation,
        ref: tabList,
      };

      if (!props.bare && tabsConfig?.tabListClass) {
        elementProps.class = tabsConfig.tabListClass;
      }

      return h('div', mergeProps(attrs, elementProps), slots);
    };
  },
});
