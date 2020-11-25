import { defineComponent, h, inject, mergeProps } from 'vue';

import { DollarChusho } from '../../types';
import { generateConfigClass } from '../../utils/components';
import componentMixin from '../shared';
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
      type: [Number, String],
      required: true,
    },
  },

  setup(props, { attrs, slots }) {
    const tabs = inject(TabsSymbol) as UseTabs;

    return () => {
      const tabConfig = inject<DollarChusho | null>('$chusho', null)?.options
        ?.components?.tab;
      const isActive = props.target === tabs.currentTab.value;
      const elementProps = {
        type: 'button',
        id: `chusho-tabs-${tabs.uuid}-tab-${props.target}`,
        role: 'tab',
        'aria-selected': `${isActive}`,
        'aria-controls': `chusho-tabs-${tabs.uuid}-tabpanel-${props.target}`,
        tabindex: isActive ? '0' : '-1',
        onClick() {
          if (!props.target) return;
          tabs.setCurrentTab(props.target);
        },
        ...generateConfigClass(tabConfig?.class, {
          ...props,
          active: isActive,
        }),
      };

      return h('button', mergeProps(attrs, elementProps), slots);
    };
  },
});
