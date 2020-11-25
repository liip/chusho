import { defineComponent, h, inject, mergeProps } from 'vue';

import { DollarChusho } from '../../types';
import { generateConfigClass } from '../../utils/components';
import componentMixin from '../shared';
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
      type: [Number, String],
      required: true,
    },
  },

  setup(props, { attrs, slots }) {
    const tabs = inject(TabsSymbol) as UseTabs;

    tabs.registerTab(props.id);

    return () => {
      const tabPanelConfig = inject<DollarChusho | null>('$chusho', null)
        ?.options?.components?.tabPanel;
      const isActive = props.id === tabs.currentTab.value;

      if (!isActive) return null;

      const elementProps = {
        id: `chusho-tabs-${tabs.uuid}-tabpanel-${props.id}`,
        role: 'tabpanel',
        'aria-labelledby': `chusho-tabs-${tabs.uuid}-tab-${props.id}`,
        tabindex: '0',
        ...generateConfigClass(tabPanelConfig?.class, {
          ...props,
          active: isActive,
        }),
      };

      return h('div', mergeProps(attrs, elementProps), slots);
    };
  },
});
