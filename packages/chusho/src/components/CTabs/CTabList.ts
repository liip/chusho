import Vue from 'vue';
import { VNodeData } from 'vue/types/umd';
import { defineComponent, createElement, inject } from '@vue/composition-api';

import { TabsSymbol, UseTabs, TabId } from './CTabs';
import TabsMixin from './mixin';
import { getSiblingIndexByArrowKey } from '../../utils/keyboard';

interface TabListProps {
  bare?: boolean;
}

export default defineComponent<TabListProps>({
  name: 'CTabList',

  mixins: [TabsMixin],

  props: {},

  setup(props, { attrs, slots, parent, refs }) {
    const tabsConfig = parent!.$chusho?.options?.components?.tabs;
    const tabs = inject(TabsSymbol) as UseTabs;

    function handleNavigation(e: KeyboardEvent): void {
      if (!tabs.currentTab.value) return;

      const activeTabIndex = tabs.tabs.value.indexOf(tabs.currentTab.value);
      const activeTabId = tabs.tabs.value[activeTabIndex];
      const rtl = parent!.$chusho?.options?.rtl;
      const newIndex = getSiblingIndexByArrowKey(
        tabs.tabs.value,
        activeTabId,
        e.key,
        rtl && rtl()
      );

      if (newIndex !== undefined) {
        e.preventDefault();

        tabs.setCurrentTab(tabs.tabs.value[newIndex]);

        Vue.nextTick(() => {
          if (refs && refs.tabList && refs.tabList instanceof Element) {
            const activeTab: HTMLElement | null = refs.tabList.querySelector(
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
      const componentData: VNodeData = {
        attrs: {
          ...attrs,
          role: 'tablist',
        },
        class: props.bare ? null : tabsConfig?.tabListClass,
        on: {
          keydown: handleNavigation,
        },
        ref: 'tabList',
      };

      return createElement(
        'div',
        componentData,
        slots.default && slots.default()
      );
    };
  },
});
