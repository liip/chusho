import { DollarChusho } from '../../types';
import { defineComponent, h, inject, mergeProps } from 'vue';
import { props as sharedProps } from './shared';

export default defineComponent({
  name: 'CTabPanels',

  inheritAttrs: false,

  props: {
    ...sharedProps,
  },

  setup(props, { attrs, slots }) {
    return () => {
      const tabsConfig = inject<DollarChusho | null>('$chusho', null)?.options
        ?.components?.tabs;
      const elementProps: Record<string, unknown> = {};

      if (tabsConfig?.tabPanelsClass) {
        elementProps.class = tabsConfig.tabPanelsClass;
      }

      return h('div', mergeProps(attrs, elementProps), slots);
    };
  },
});
