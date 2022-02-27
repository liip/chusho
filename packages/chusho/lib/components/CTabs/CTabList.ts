import { defineComponent, h, inject, mergeProps, nextTick } from 'vue';

import { DollarChusho } from '../../types';

import componentMixin from '../mixins/componentMixin';

import useComponentConfig from '../../composables/useComponentConfig';
import { SelectedItem } from '../../composables/useSelectable';

import { generateConfigClass } from '../../utils/components';
import { calculateActiveIndex, getNextFocusByKey } from '../../utils/keyboard';

import { TabsSymbol } from './CTabs';

export default defineComponent({
  name: 'CTabList',

  mixins: [componentMixin],

  inheritAttrs: false,

  setup() {
    const chusho = inject<DollarChusho | null>('$chusho', null);
    const tabs = inject(TabsSymbol);

    return {
      config: useComponentConfig('tabList'),
      chusho,
      tabs,
    };
  },

  methods: {
    handleNavigation(e: KeyboardEvent): void {
      if (!this.tabs?.selectedItem.value) return;

      const rtl = this.chusho?.options?.rtl;
      const focus = getNextFocusByKey(e.key, rtl && rtl());

      if (focus === null) return;

      const newIndex = calculateActiveIndex<SelectedItem>(
        focus,
        {
          resolveItems: () => this.tabs?.items.value ?? [],
          resolveDisabled: () => false,
          resolveActiveIndex: () => this.tabs?.selectedItemIndex.value ?? null,
        },
        true
      );

      if (newIndex === null) return;

      e.preventDefault();

      this.tabs.setSelectedItem(this.tabs.items.value[newIndex].id);

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
    },
  },

  render() {
    const elementProps: Record<string, unknown> = {
      role: 'tablist',
      onKeydown: this.handleNavigation,
      ref: 'tabList',
      ...generateConfigClass(this.config?.class, this.$props),
    };

    return h('div', mergeProps(this.$attrs, elementProps), this.$slots);
  },
});
