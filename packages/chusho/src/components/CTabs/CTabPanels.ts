import { defineComponent, h, inject, mergeProps } from 'vue';

import { DollarChusho } from '../../types';
import { generateConfigClass } from '../../utils/components';
import componentMixin from '../shared';

export default defineComponent({
  name: 'CTabPanels',

  mixins: [componentMixin],

  inheritAttrs: false,

  setup(props, { attrs, slots }) {
    return () => {
      const tabPanelsConfig = inject<DollarChusho | null>('$chusho', null)
        ?.options?.components?.tabPanels;
      const elementProps: Record<string, unknown> = {
        ...generateConfigClass(tabPanelsConfig?.class, props),
      };

      return h('div', mergeProps(attrs, elementProps), slots);
    };
  },
});
