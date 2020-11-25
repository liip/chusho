import { defineComponent, h, inject, mergeProps } from 'vue';

import { DollarChusho } from '../../types';
import { generateConfigClass } from '../../utils/components';
import componentMixin from '../shared';

export default defineComponent({
  name: 'CAlert',

  mixins: [componentMixin],

  inheritAttrs: false,

  setup(props, { attrs, slots }) {
    return () => {
      const alertConfig = inject<DollarChusho | null>('$chusho', null)?.options
        ?.components?.alert;

      const extraProps: Record<string, unknown> = {
        role: 'alert',
        ...generateConfigClass(alertConfig?.class, props),
      };

      return h('div', mergeProps(attrs, extraProps), slots);
    };
  },
});
