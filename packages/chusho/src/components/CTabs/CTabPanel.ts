import { defineComponent, h, inject, mergeProps, PropType } from 'vue';
import { SelectedItemId } from '../../composables/useSelected';

import { DollarChusho } from '../../types';
import { generateConfigClass } from '../../utils/components';
import componentMixin from '../mixins/componentMixin';
import { TabsSymbol, UseTabs } from './CTabs';

export default defineComponent({
  name: 'CTabPanel',

  mixins: [componentMixin],

  inheritAttrs: false,

  props: {
    /**
     * A unique ID to target the panel with CTab.
     */
    id: {
      type: [String, Number] as PropType<SelectedItemId>,
      required: true,
    },
  },

  setup(props) {
    const tabs = inject(TabsSymbol) as UseTabs;

    tabs.addItem(props.id);

    return {
      tabs,
    };
  },

  beforeUnmount() {
    this.tabs.removeItem(this.id);
  },

  render() {
    const tabPanelConfig = inject<DollarChusho | null>('$chusho', null)?.options
      ?.components?.tabPanel;
    const isActive = this.id === this.tabs.selectedItem.value;

    if (!isActive) return null;

    const elementProps = {
      id: `chusho-tabs-${this.tabs.uuid}-tabpanel-${this.id}`,
      role: 'tabpanel',
      'aria-labelledby': `chusho-tabs-${this.tabs.uuid}-tab-${this.id}`,
      tabindex: '0',
      ...generateConfigClass(tabPanelConfig?.class, {
        ...this.$props,
        active: isActive,
      }),
    };

    return h('div', mergeProps(this.$attrs, elementProps), this.$slots);
  },
});
