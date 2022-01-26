import { defineComponent, h, inject, mergeProps, PropType } from 'vue';

import { SelectedItemId } from '../../composables/useSelectable';
import { DollarChusho } from '../../types';
import { generateConfigClass } from '../../utils/components';
import componentMixin from '../mixins/componentMixin';
import { TabsSymbol } from './CTabs';

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
    const tabs = inject(TabsSymbol);

    return {
      tabs,
    };
  },

  render() {
    if (!this.tabs) return null;

    const tabConfig = inject<DollarChusho | null>('$chusho', null)?.options
      ?.components?.tab;
    const isActive = this.target === this.tabs.selectedItemId.value;
    const elementProps = {
      type: 'button',
      id: `${this.tabs.uuid}-tab-${this.target}`,
      role: 'tab',
      'aria-selected': `${isActive}`,
      'aria-controls': `${this.tabs.uuid}-tabpanel-${this.target}`,
      tabindex: isActive ? '0' : '-1',
      onClick: () => {
        if (!this.target) return;
        this.tabs?.setSelectedItem(this.target);
      },
      ...generateConfigClass(tabConfig?.class, {
        ...this.$props,
        active: isActive,
      }),
    };

    return h('button', mergeProps(this.$attrs, elementProps), this.$slots);
  },
});
