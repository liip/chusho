import { defineComponent, h, inject, mergeProps, PropType } from 'vue';

import { SelectedItemId } from '../../composables/useSelected';
import { DollarChusho } from '../../types';
import { generateConfigClass } from '../../utils/components';
import componentMixin from '../mixins/componentMixin';
import { TabsSymbol, UseTabs } from './CTabs';

export default defineComponent({
  name: 'CTab',

  mixins: [componentMixin],

  inheritAttrs: false,

  props: {
    /**
     * The id of the Tab this button should control.
     */
    target: {
      type: [String, Number] as PropType<SelectedItemId>,
      required: true,
    },
  },

  setup() {
    const tabs = inject(TabsSymbol) as UseTabs;

    return {
      tabs,
    };
  },

  render() {
    const tabConfig = inject<DollarChusho | null>('$chusho', null)?.options
      ?.components?.tab;
    const isActive = this.target === this.tabs.selectedItem.value;
    const elementProps = {
      type: 'button',
      id: `chusho-tabs-${this.tabs.uuid}-tab-${this.target}`,
      role: 'tab',
      'aria-selected': `${isActive}`,
      'aria-controls': `chusho-tabs-${this.tabs.uuid}-tabpanel-${this.target}`,
      tabindex: isActive ? '0' : '-1',
      onClick: () => {
        if (!this.target) return;
        this.tabs.setSelectedItem(this.target);
      },
      ...generateConfigClass(tabConfig?.class, {
        ...this.$props,
        active: isActive,
      }),
    };

    return h('button', mergeProps(this.$attrs, elementProps), this.$slots);
  },
});
