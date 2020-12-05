import { defineComponent, h, inject, nextTick, mergeProps } from 'vue';

import { DollarChusho } from '../../types';
import { getSiblingIndexByArrowKey } from '../../utils/keyboard';
import { generateConfigClass } from '../../utils/components';
import componentMixin from '../mixins/componentMixin';
import { TabsSymbol, UseTabs } from './CTabs';

export default defineComponent({
  name: 'CTabList',

  mixins: [componentMixin],

  inheritAttrs: false,

  setup() {
    const chusho = inject<DollarChusho | null>('$chusho', null);
    const tabs = inject(TabsSymbol) as UseTabs;

    return {
      chusho,
      tabs,
    };
  },

  methods: {
    handleNavigation(e: KeyboardEvent): void {
      if (!this.tabs.currentTab.value) return;

      const activeTabIndex = this.tabs.tabs.value.indexOf(
        this.tabs.currentTab.value
      );
      const activeTabId = this.tabs.tabs.value[activeTabIndex];
      const rtl = this.chusho?.options?.rtl;
      const newIndex = getSiblingIndexByArrowKey(
        this.tabs.tabs.value,
        activeTabId,
        e.key,
        rtl && rtl()
      );

      if (newIndex !== undefined) {
        e.preventDefault();

        this.tabs.setCurrentTab(this.tabs.tabs.value[newIndex]);

        nextTick(() => {
          const tabList = this.$refs.tabList as HTMLElement | null;

          if (tabList) {
            const activeTab: HTMLElement | null = tabList.querySelector(
              '[aria-selected="true"]'
            );
            if (activeTab) {
              activeTab.focus();
            }
          }
        });
      }
    },
  },

  render() {
    const tabListConfig = this.chusho?.options?.components?.tabList;
    const elementProps: Record<string, unknown> = {
      role: 'tablist',
      onKeydown: this.handleNavigation,
      ref: 'tabList',
      ...generateConfigClass(tabListConfig?.class, this.$props),
    };

    return h('div', mergeProps(this.$attrs, elementProps), this.$slots);
  },
});
